# New Feature Views - Website Builder, Courses, Wallet, Support
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.utils import timezone
from decimal import Decimal

from .models import (
    WebsiteProject, WebsitePhase, Course, CourseModule, CourseLesson,
    CourseProgress, Wallet, Transaction, Giveaway, GiveawayWinner,
    SupportTicket, TicketMessage
)
from .serializers import (
    WebsiteProjectSerializer, WebsiteProjectCreateSerializer, WebsitePhaseSerializer,
    CourseSerializer, CourseModuleSerializer, CourseLessonSerializer, CourseProgressSerializer,
    WalletSerializer, TransactionSerializer, TopUpWalletSerializer, GiveawaySerializer,
    SupportTicketSerializer, SupportTicketCreateSerializer, TicketMessageSerializer
)
from .services.notification_trigger_service import NotificationTriggerService


# ==================== WEBSITE BUILDER VIEWS ====================

class WebsiteProjectViewSet(viewsets.ModelViewSet):
    """ViewSet for website building projects"""
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'admin':
            return WebsiteProject.objects.all()
        return WebsiteProject.objects.filter(client=self.request.user.client_profile)

    def get_serializer_class(self):
        if self.action == 'create':
            return WebsiteProjectCreateSerializer
        return WebsiteProjectSerializer

    def create(self, request, *args, **kwargs):
        """Override create to return full project data with id"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        project = serializer.save()

        # Use the read serializer to return the full project data including id
        output_serializer = WebsiteProjectSerializer(project, context={'request': request})
        headers = self.get_success_headers(output_serializer.data)
        return Response(output_serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=True, methods=['post'])
    def generate_valuation(self, request, pk=None):
        """Generate AI valuation for website project"""
        project = self.get_object()

        # Simple AI valuation logic (replace with actual AI service)
        complexity = len(project.desired_features)
        base_cost = 1000
        feature_cost = complexity * 200

        project.complexity_score = min(complexity, 10)
        project.estimated_cost_min = Decimal(base_cost + feature_cost * 0.8)
        project.estimated_cost_max = Decimal(base_cost + feature_cost * 1.2)
        project.estimated_hours = 40 + (complexity * 5)
        project.status = 'valuation'
        project.save()

        return Response(WebsiteProjectSerializer(project).data)

    @action(detail=True, methods=['post'])
    def generate_demo(self, request, pk=None):
        """Generate demo for website project"""
        project = self.get_object()
        project.demo_url = f"https://demo.montrose.com/{project.id}"
        project.status = 'demo'
        project.save()

        return Response(WebsiteProjectSerializer(project).data)

    @action(detail=True, methods=['post'])
    def create_phases(self, request, pk=None):
        """Create payment phases for project"""
        project = self.get_object()
        total_amount = request.data.get('total_amount')

        if not total_amount:
            return Response({'error': 'total_amount required'}, status=400)

        project.total_amount = Decimal(total_amount)
        phase_amount = Decimal(total_amount) / 3

        # Create 3 phases
        for i in range(1, 4):
            WebsitePhase.objects.create(
                project=project,
                phase_number=i,
                title=f"Phase {i}",
                description=f"Website development phase {i}",
                amount=phase_amount,
                status='pending'
            )

        project.total_phases = 3
        project.status = 'payment_pending'
        project.save()

        return Response(WebsiteProjectSerializer(project).data)


class WebsitePhaseViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for website project phases"""
    serializer_class = WebsitePhaseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'admin':
            return WebsitePhase.objects.all()
        return WebsitePhase.objects.filter(project__client=self.request.user.client_profile)


# ==================== COURSES VIEWS ====================

class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for courses"""
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Course.objects.filter(is_published=True)

    @action(detail=True, methods=['post'])
    def enroll(self, request, pk=None):
        """Enroll user in course"""
        course = self.get_object()

        # Check if already enrolled
        progress, created = CourseProgress.objects.get_or_create(
            user=request.user,
            course=course
        )

        if created:
            return Response({'message': 'Successfully enrolled'}, status=201)
        return Response({'message': 'Already enrolled'})

    @action(detail=True, methods=['get'])
    def content(self, request, pk=None):
        """Get course content (modules and lessons)"""
        course = self.get_object()

        # Check access
        serializer = self.get_serializer(course)
        if not serializer.data.get('is_accessible'):
            return Response({'error': 'Upgrade your plan to access this course'}, status=403)

        modules = CourseModuleSerializer(course.modules.all(), many=True).data
        return Response({'modules': modules})

    @action(detail=True, methods=['post'])
    def purchase(self, request, pk=None):
        """Purchase a course individually"""
        from api.models import CoursePurchase, Wallet, Transaction
        from api.serializers import CoursePurchaseSerializer
        from decimal import Decimal

        course = self.get_object()

        # Check if course allows individual purchase
        if not course.allow_individual_purchase:
            return Response({
                'error': 'This course is only available through subscription'
            }, status=400)

        # Check if user already purchased
        existing_purchase = CoursePurchase.objects.filter(
            user=request.user,
            course=course
        ).first()

        if existing_purchase and existing_purchase.has_access:
            return Response({
                'error': 'You already have access to this course'
            }, status=400)

        # Get payment method
        payment_method = request.data.get('payment_method', 'paypal')

        if payment_method == 'wallet':
            # Pay from wallet
            try:
                client = request.user.client_profile
                wallet = client.wallet

                if wallet.balance < course.price:
                    return Response({
                        'error': f'Insufficient balance. You have ${wallet.balance}, need ${course.price}'
                    }, status=400)

                # Deduct from wallet
                wallet.balance -= course.price
                wallet.total_spent += course.price
                wallet.save()

                # Create purchase record
                purchase = CoursePurchase.objects.create(
                    user=request.user,
                    course=course,
                    amount_paid=course.price,
                    payment_method='wallet'
                )

                # Create transaction record
                Transaction.objects.create(
                    wallet=wallet,
                    transaction_type='debit',
                    amount=course.price,
                    description=f'Purchased course: {course.title}',
                    reference_id=str(purchase.id)
                )

                # 🔔 NEW: Notify user of course enrollment (in-app + email)
                NotificationTriggerService.trigger_course_enrollment(
                    user=request.user,
                    course=course
                )

                serializer = CoursePurchaseSerializer(purchase)
                return Response({
                    'message': 'Course purchased successfully',
                    'purchase': serializer.data
                }, status=201)

            except Exception as e:
                return Response({
                    'error': str(e)
                }, status=500)

        elif payment_method == 'paypal':
            # For PayPal, return the amount to charge
            # Frontend will handle PayPal checkout
            return Response({
                'amount': str(course.price),
                'course_id': str(course.id),
                'course_title': course.title,
                'message': 'Proceed with PayPal payment'
            })

        else:
            return Response({
                'error': 'Invalid payment method'
            }, status=400)

    @action(detail=True, methods=['post'])
    def confirm_paypal_purchase(self, request, pk=None):
        """Confirm PayPal purchase and create purchase record"""
        from api.models import CoursePurchase
        from api.serializers import CoursePurchaseSerializer

        course = self.get_object()

        paypal_order_id = request.data.get('paypal_order_id')
        paypal_payer_id = request.data.get('paypal_payer_id')

        if not paypal_order_id:
            return Response({'error': 'PayPal order ID required'}, status=400)

        # Create purchase record
        purchase = CoursePurchase.objects.create(
            user=request.user,
            course=course,
            amount_paid=course.price,
            payment_method='paypal',
            paypal_order_id=paypal_order_id,
            paypal_payer_id=paypal_payer_id or ''
        )

        # 🔔 NEW: Notify user of course enrollment (in-app + email)
        NotificationTriggerService.trigger_course_enrollment(
            user=request.user,
            course=course
        )

        serializer = CoursePurchaseSerializer(purchase)
        return Response({
            'message': 'Purchase confirmed successfully',
            'purchase': serializer.data
        }, status=201)

    @action(detail=False, methods=['get'])
    def my_purchases(self, request):
        """Get all courses purchased by current user"""
        from api.models import CoursePurchase
        from api.serializers import CoursePurchaseSerializer

        purchases = CoursePurchase.objects.filter(
            user=request.user
        ).select_related('course').order_by('-purchased_at')

        serializer = CoursePurchaseSerializer(purchases, many=True)
        return Response(serializer.data)


class CourseLessonViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for course lessons"""
    serializer_class = CourseLessonSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CourseLesson.objects.all()

    @action(detail=True, methods=['post'])
    def mark_complete(self, request, pk=None):
        """Mark lesson as completed"""
        lesson = self.get_object()
        course = lesson.module.course

        progress, _ = CourseProgress.objects.get_or_create(
            user=request.user,
            course=course
        )

        if str(lesson.id) not in progress.completed_lessons:
            progress.completed_lessons.append(str(lesson.id))
            progress.current_lesson = lesson

            # Calculate completion percentage
            total_lessons = CourseLesson.objects.filter(module__course=course).count()
            completed_count = len(progress.completed_lessons)
            progress.completion_percentage = int((completed_count / total_lessons) * 100)

            if progress.completion_percentage == 100:
                progress.completed_at = timezone.now()

                # 🔔 NEW: Notify user of course completion (in-app + email)
                NotificationTriggerService.trigger_course_completed(
                    user=request.user,
                    course=course
                )

            progress.save()

        return Response(CourseProgressSerializer(progress).data)


class CourseProgressViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for course progress"""
    serializer_class = CourseProgressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CourseProgress.objects.filter(user=self.request.user)


# ==================== WALLET VIEWS ====================

class WalletViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for wallet"""
    serializer_class = WalletSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'admin':
            return Wallet.objects.all()
        return Wallet.objects.filter(client=self.request.user.client_profile)

    @action(detail=False, methods=['get'])
    def my_wallet(self, request):
        """Get current user's wallet"""
        wallet, _ = Wallet.objects.get_or_create(client=request.user.client_profile)
        return Response(WalletSerializer(wallet).data)

    @action(detail=False, methods=['post'])
    def topup(self, request):
        """Top up wallet balance"""
        serializer = TopUpWalletSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        wallet, _ = Wallet.objects.get_or_create(client=request.user.client_profile)
        amount = serializer.validated_data['amount']
        payment_method = serializer.validated_data['payment_method']

        # Create transaction
        transaction = Transaction.objects.create(
            wallet=wallet,
            transaction_type='topup',
            amount=amount,
            status='completed',
            description=f'Wallet top-up via {payment_method}',
            payment_method=payment_method
        )

        # Update wallet balance
        wallet.balance += amount
        wallet.save()

        return Response({
            'message': 'Top-up successful',
            'transaction': TransactionSerializer(transaction).data,
            'new_balance': wallet.balance
        })


class TransactionViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for transactions"""
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'admin':
            return Transaction.objects.all()
        return Transaction.objects.filter(wallet__client=self.request.user.client_profile)


class GiveawayViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for giveaways"""
    serializer_class = GiveawaySerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Giveaway.objects.filter(status='active')

    @action(detail=False, methods=['get'])
    def my_wins(self, request):
        """Get user's giveaway wins"""
        wins = GiveawayWinner.objects.filter(client=request.user.client_profile)
        from .serializers import GiveawayWinnerSerializer
        return Response(GiveawayWinnerSerializer(wins, many=True).data)

    @action(detail=True, methods=['post'])
    def claim_reward(self, request, pk=None):
        """Claim giveaway reward"""
        win = get_object_or_404(GiveawayWinner, giveaway_id=pk, client=request.user.client_profile)

        if win.is_claimed:
            return Response({'error': 'Reward already claimed'}, status=400)

        wallet, _ = Wallet.objects.get_or_create(client=request.user.client_profile)

        # Create transaction
        transaction = Transaction.objects.create(
            wallet=wallet,
            transaction_type='giveaway',
            amount=win.reward_amount,
            status='completed',
            description=f'Giveaway reward: {win.giveaway.title}'
        )

        # Update wallet
        wallet.balance += win.reward_amount
        wallet.total_earned += win.reward_amount
        wallet.save()

        # Mark as claimed
        win.is_claimed = True
        win.claimed_at = timezone.now()
        win.transaction = transaction
        win.save()

        return Response({'message': 'Reward claimed successfully', 'new_balance': wallet.balance})


# ==================== SUPPORT VIEWS ====================

class SupportTicketViewSet(viewsets.ModelViewSet):
    """ViewSet for support tickets"""
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'admin':
            return SupportTicket.objects.all()
        return SupportTicket.objects.filter(client=self.request.user.client_profile)

    def get_serializer_class(self):
        if self.action == 'create':
            return SupportTicketCreateSerializer
        return SupportTicketSerializer

    @action(detail=True, methods=['post'])
    def add_message(self, request, pk=None):
        """Add message to ticket"""
        ticket = self.get_object()

        message = TicketMessage.objects.create(
            ticket=ticket,
            sender=request.user,
            message=request.data.get('message'),
            attachments=request.data.get('attachments', [])
        )

        ticket.updated_at = timezone.now()
        ticket.save()

        return Response(TicketMessageSerializer(message).data, status=201)

    @action(detail=True, methods=['post'])
    def close(self, request, pk=None):
        """Close ticket"""
        ticket = self.get_object()
        ticket.status = 'closed'
        ticket.closed_at = timezone.now()
        ticket.save()

        return Response({'message': 'Ticket closed'})
