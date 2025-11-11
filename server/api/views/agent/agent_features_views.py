# server/api/views/agent/agent_features_views.py
# Service-specific features for website and marketing agents

from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.db.models import Q, Count, Sum, Avg
from datetime import timedelta

from ...models import (
    Agent, Client, WebsiteProject, WebsiteVersion, Campaign,
    ContentPost, RealTimeMetrics, ContentSchedule
)
from ...serializers import (
    WebsiteVersionSerializer, CampaignSerializer, CampaignCreateSerializer,
    WebsiteProjectSerializer, ContentPostSerializer, ContentScheduleSerializer,
    ContentScheduleCreateSerializer
)


# ==================== WEBSITE AGENT FEATURES ====================

class WebsiteVersionViewSet(viewsets.ModelViewSet):
    """ViewSet for website versions - Website agents upload and manage versions"""
    serializer_class = WebsiteVersionSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_queryset(self):
        """Filter versions based on user role"""
        user = self.request.user

        if user.role == 'admin':
            # Admins see all versions
            return WebsiteVersion.objects.all().select_related('project', 'agent__user')

        elif user.role == 'agent':
            # Website agents see only their assigned projects' versions
            try:
                agent = Agent.objects.get(user=user, department='website')
                assigned_clients = Client.objects.filter(assigned_agent=agent)
                return WebsiteVersion.objects.filter(
                    project__client__in=assigned_clients
                ).select_related('project', 'agent__user')
            except Agent.DoesNotExist:
                return WebsiteVersion.objects.none()

        elif user.role == 'client':
            # Clients see only their own projects' versions
            try:
                client = Client.objects.get(user=user)
                return WebsiteVersion.objects.filter(
                    project__client=client
                ).select_related('project', 'agent__user')
            except Client.DoesNotExist:
                return WebsiteVersion.objects.none()

        return WebsiteVersion.objects.none()

    def perform_create(self, serializer):
        """Set agent when creating version"""
        user = self.request.user

        if user.role != 'agent':
            raise permissions.PermissionDenied('Only agents can upload website versions')

        try:
            agent = Agent.objects.get(user=user, department='website')
            serializer.save(agent=agent)
        except Agent.DoesNotExist:
            raise permissions.PermissionDenied('Only website agents can upload versions')

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        """Approve a website version (admin or client)"""
        version = self.get_object()

        if request.user.role not in ['admin', 'client']:
            return Response(
                {'error': 'Only admins or clients can approve versions'},
                status=status.HTTP_403_FORBIDDEN
            )

        version.status = 'approved'
        version.approved_at = timezone.now()
        version.save()

        return Response({
            'message': 'Version approved successfully',
            'version': WebsiteVersionSerializer(version, context={'request': request}).data
        })

    @action(detail=True, methods=['post'])
    def deploy(self, request, pk=None):
        """Deploy a website version (agents only)"""
        version = self.get_object()

        if request.user.role != 'agent':
            return Response(
                {'error': 'Only agents can deploy versions'},
                status=status.HTTP_403_FORBIDDEN
            )

        if version.status != 'approved':
            return Response(
                {'error': 'Only approved versions can be deployed'},
                status=status.HTTP_400_BAD_REQUEST
            )

        deployment_url = request.data.get('deployment_url')
        if not deployment_url:
            return Response(
                {'error': 'deployment_url is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        version.status = 'deployed'
        version.deployment_url = deployment_url
        version.deployed_at = timezone.now()
        version.save()

        return Response({
            'message': 'Version deployed successfully',
            'version': WebsiteVersionSerializer(version, context={'request': request}).data
        })

    @action(detail=True, methods=['post'])
    def add_feedback(self, request, pk=None):
        """Add client feedback to a version"""
        version = self.get_object()

        if request.user.role != 'client':
            return Response(
                {'error': 'Only clients can add feedback'},
                status=status.HTTP_403_FORBIDDEN
            )

        feedback = request.data.get('feedback')
        if not feedback:
            return Response(
                {'error': 'feedback is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        version.client_feedback = feedback
        version.save()

        return Response({
            'message': 'Feedback added successfully',
            'version': WebsiteVersionSerializer(version, context={'request': request}).data
        })

    @action(detail=False, methods=['get'])
    def my_uploads(self, request):
        """Get all versions uploaded by the current agent"""
        if request.user.role != 'agent':
            return Response(
                {'error': 'Only agents can access this endpoint'},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            agent = Agent.objects.get(user=request.user, department='website')
            versions = WebsiteVersion.objects.filter(agent=agent).select_related('project')
            serializer = self.get_serializer(versions, many=True)
            return Response(serializer.data)
        except Agent.DoesNotExist:
            return Response([])


# ==================== MARKETING AGENT FEATURES ====================

class CampaignViewSet(viewsets.ModelViewSet):
    """ViewSet for marketing campaigns - Marketing agents create and manage campaigns"""
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [JSONParser]

    def get_serializer_class(self):
        if self.action == 'create':
            return CampaignCreateSerializer
        return CampaignSerializer

    def get_queryset(self):
        """Filter campaigns based on user role"""
        user = self.request.user

        if user.role == 'admin':
            # Admins see all campaigns
            return Campaign.objects.all().select_related('client', 'agent__user').prefetch_related('content_posts')

        elif user.role == 'agent':
            # Marketing agents see only their assigned clients' campaigns
            try:
                agent = Agent.objects.get(user=user, department='marketing')
                assigned_clients = Client.objects.filter(assigned_agent=agent)
                return Campaign.objects.filter(
                    client__in=assigned_clients
                ).select_related('client', 'agent__user').prefetch_related('content_posts')
            except Agent.DoesNotExist:
                return Campaign.objects.none()

        elif user.role == 'client':
            # Clients see only their own campaigns
            try:
                client = Client.objects.get(user=user)
                return Campaign.objects.filter(
                    client=client
                ).select_related('client', 'agent__user').prefetch_related('content_posts')
            except Client.DoesNotExist:
                return Campaign.objects.none()

        return Campaign.objects.none()

    def perform_create(self, serializer):
        """Set agent when creating campaign"""
        user = self.request.user

        if user.role != 'agent':
            raise permissions.PermissionDenied('Only agents can create campaigns')

        try:
            agent = Agent.objects.get(user=user, department='marketing')
            serializer.save(agent=agent)
        except Agent.DoesNotExist:
            raise permissions.PermissionDenied('Only marketing agents can create campaigns')

    @action(detail=True, methods=['post'])
    def add_content(self, request, pk=None):
        """Add content posts to a campaign"""
        campaign = self.get_object()

        if request.user.role != 'agent':
            return Response(
                {'error': 'Only agents can add content to campaigns'},
                status=status.HTTP_403_FORBIDDEN
            )

        content_post_ids = request.data.get('content_post_ids', [])
        if not content_post_ids:
            return Response(
                {'error': 'content_post_ids is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Validate that content posts belong to the same client
        content_posts = ContentPost.objects.filter(
            id__in=content_post_ids,
            client=campaign.client
        )

        if content_posts.count() != len(content_post_ids):
            return Response(
                {'error': 'Some content posts do not belong to this client'},
                status=status.HTTP_400_BAD_REQUEST
            )

        campaign.content_posts.add(*content_posts)

        return Response({
            'message': f'{content_posts.count()} posts added to campaign',
            'campaign': CampaignSerializer(campaign, context={'request': request}).data
        })

    @action(detail=True, methods=['post'])
    def update_metrics(self, request, pk=None):
        """Update campaign performance metrics"""
        campaign = self.get_object()

        if request.user.role not in ['admin', 'agent']:
            return Response(
                {'error': 'Only admins or agents can update metrics'},
                status=status.HTTP_403_FORBIDDEN
            )

        actual_reach = request.data.get('actual_reach')
        actual_engagement = request.data.get('actual_engagement')
        actual_spend = request.data.get('actual_spend')

        if actual_reach is not None:
            campaign.actual_reach = actual_reach
        if actual_engagement is not None:
            campaign.actual_engagement = actual_engagement
        if actual_spend is not None:
            campaign.actual_spend = actual_spend

        campaign.save()

        return Response({
            'message': 'Metrics updated successfully',
            'campaign': CampaignSerializer(campaign, context={'request': request}).data
        })

    @action(detail=True, methods=['post'])
    def change_status(self, request, pk=None):
        """Change campaign status"""
        campaign = self.get_object()

        if request.user.role not in ['admin', 'agent']:
            return Response(
                {'error': 'Only admins or agents can change campaign status'},
                status=status.HTTP_403_FORBIDDEN
            )

        new_status = request.data.get('status')
        if not new_status:
            return Response(
                {'error': 'status is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if new_status not in dict(Campaign.STATUS_CHOICES).keys():
            return Response(
                {'error': 'Invalid status'},
                status=status.HTTP_400_BAD_REQUEST
            )

        campaign.status = new_status
        campaign.save()

        return Response({
            'message': f'Campaign status changed to {new_status}',
            'campaign': CampaignSerializer(campaign, context={'request': request}).data
        })

    @action(detail=False, methods=['get'])
    def my_campaigns(self, request):
        """Get all campaigns created by the current agent"""
        if request.user.role != 'agent':
            return Response(
                {'error': 'Only agents can access this endpoint'},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            agent = Agent.objects.get(user=request.user, department='marketing')
            campaigns = Campaign.objects.filter(agent=agent).select_related('client').prefetch_related('content_posts')
            serializer = self.get_serializer(campaigns, many=True)
            return Response(serializer.data)
        except Agent.DoesNotExist:
            return Response([])

    @action(detail=False, methods=['get'])
    def analytics(self, request):
        """Get aggregated campaign analytics for the agent"""
        if request.user.role != 'agent':
            return Response(
                {'error': 'Only agents can access this endpoint'},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            agent = Agent.objects.get(user=request.user, department='marketing')
            campaigns = Campaign.objects.filter(agent=agent)

            # Calculate aggregated metrics
            total_campaigns = campaigns.count()
            active_campaigns = campaigns.filter(status='active').count()
            completed_campaigns = campaigns.filter(status='completed').count()

            aggregated = campaigns.aggregate(
                total_budget=Sum('budget'),
                total_spend=Sum('actual_spend'),
                total_reach=Sum('actual_reach'),
                total_engagement=Sum('actual_engagement'),
                avg_performance=Avg('actual_reach')
            )

            analytics = {
                'total_campaigns': total_campaigns,
                'active_campaigns': active_campaigns,
                'completed_campaigns': completed_campaigns,
                'draft_campaigns': campaigns.filter(status='draft').count(),
                'total_budget': float(aggregated['total_budget'] or 0),
                'total_spend': float(aggregated['total_spend'] or 0),
                'total_reach': aggregated['total_reach'] or 0,
                'total_engagement': aggregated['total_engagement'] or 0,
                'avg_performance': float(aggregated['avg_performance'] or 0),
            }

            return Response(analytics)

        except Agent.DoesNotExist:
            return Response({'error': 'Agent profile not found'}, status=status.HTTP_404_NOT_FOUND)


class ContentScheduleViewSet(viewsets.ModelViewSet):
    """ViewSet for content scheduling - Marketing agents schedule posts"""
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [JSONParser]

    def get_serializer_class(self):
        if self.action == 'create':
            return ContentScheduleCreateSerializer
        return ContentScheduleSerializer

    def get_queryset(self):
        """Filter scheduled content based on user role"""
        user = self.request.user

        if user.role == 'admin':
            # Admins see all scheduled content
            return ContentSchedule.objects.all().select_related(
                'client', 'agent__user', 'campaign', 'social_account'
            )

        elif user.role == 'agent':
            # Marketing agents see only their assigned clients' scheduled content
            try:
                agent = Agent.objects.get(user=user, department='marketing')
                assigned_clients = Client.objects.filter(assigned_agent=agent)
                return ContentSchedule.objects.filter(
                    client__in=assigned_clients
                ).select_related('client', 'agent__user', 'campaign', 'social_account')
            except Agent.DoesNotExist:
                return ContentSchedule.objects.none()

        elif user.role == 'client':
            # Clients see only their own scheduled content
            try:
                client = Client.objects.get(user=user)
                return ContentSchedule.objects.filter(
                    client=client
                ).select_related('client', 'agent__user', 'campaign', 'social_account')
            except Client.DoesNotExist:
                return ContentSchedule.objects.none()

        return ContentSchedule.objects.none()

    def perform_create(self, serializer):
        """Set agent when creating scheduled content"""
        user = self.request.user

        if user.role != 'agent':
            raise permissions.PermissionDenied('Only agents can schedule content')

        try:
            agent = Agent.objects.get(user=user, department='marketing')
            serializer.save(agent=agent)
        except Agent.DoesNotExist:
            raise permissions.PermissionDenied('Only marketing agents can schedule content')

    @action(detail=False, methods=['get'])
    def calendar(self, request):
        """Get scheduled content for calendar view"""
        queryset = self.filter_queryset(self.get_queryset())

        # Filter by date range if provided
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        if start_date:
            queryset = queryset.filter(scheduled_for__gte=start_date)
        if end_date:
            queryset = queryset.filter(scheduled_for__lte=end_date)

        # Filter by status if provided
        status_filter = request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        """Approve scheduled content (admin or client)"""
        schedule = self.get_object()

        if request.user.role not in ['admin', 'client']:
            return Response(
                {'error': 'Only admins or clients can approve scheduled content'},
                status=status.HTTP_403_FORBIDDEN
            )

        schedule.approved_by = request.user
        schedule.approved_at = timezone.now()
        schedule.status = 'scheduled'
        schedule.save()

        return Response({
            'message': 'Content approved and scheduled successfully',
            'schedule': ContentScheduleSerializer(schedule, context={'request': request}).data
        })

    @action(detail=True, methods=['post'])
    def publish(self, request, pk=None):
        """Manually publish scheduled content (agents only)"""
        schedule = self.get_object()

        if request.user.role != 'agent':
            return Response(
                {'error': 'Only agents can publish content'},
                status=status.HTTP_403_FORBIDDEN
            )

        if schedule.status not in ['scheduled', 'draft']:
            return Response(
                {'error': 'Only scheduled or draft content can be published'},
                status=status.HTTP_400_BAD_REQUEST
            )

        post_url = request.data.get('post_url')
        platform_post_id = request.data.get('platform_post_id')

        if not post_url:
            return Response(
                {'error': 'post_url is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        schedule.status = 'published'
        schedule.post_url = post_url
        schedule.platform_post_id = platform_post_id
        schedule.published_at = timezone.now()
        schedule.save()

        return Response({
            'message': 'Content published successfully',
            'schedule': ContentScheduleSerializer(schedule, context={'request': request}).data
        })

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """Cancel scheduled content"""
        schedule = self.get_object()

        if request.user.role not in ['admin', 'agent', 'client']:
            return Response(
                {'error': 'You do not have permission to cancel scheduled content'},
                status=status.HTTP_403_FORBIDDEN
            )

        if schedule.status == 'published':
            return Response(
                {'error': 'Cannot cancel already published content'},
                status=status.HTTP_400_BAD_REQUEST
            )

        schedule.status = 'cancelled'
        schedule.save()

        return Response({
            'message': 'Scheduled content cancelled successfully',
            'schedule': ContentScheduleSerializer(schedule, context={'request': request}).data
        })

    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Get upcoming scheduled content (next 7 days)"""
        queryset = self.filter_queryset(self.get_queryset())
        now = timezone.now()
        week_later = now + timedelta(days=7)

        upcoming = queryset.filter(
            scheduled_for__gte=now,
            scheduled_for__lte=week_later,
            status='scheduled'
        ).order_by('scheduled_for')

        serializer = self.get_serializer(upcoming, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def overdue(self, request):
        """Get overdue scheduled content"""
        queryset = self.filter_queryset(self.get_queryset())
        overdue = queryset.filter(
            scheduled_for__lt=timezone.now(),
            status='scheduled'
        ).order_by('scheduled_for')

        serializer = self.get_serializer(overdue, many=True)
        return Response(serializer.data)
