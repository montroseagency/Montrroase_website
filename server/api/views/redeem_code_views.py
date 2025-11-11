# server/api/views/redeem_code_views.py
# Views for redeem code management and redemption

from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db import transaction, models
from django.utils import timezone

from ..models import RedeemCode, RedeemCodeUsage, Wallet, Transaction
from ..serializers import (
    RedeemCodeSerializer, RedeemCodeCreateSerializer,
    RedeemCodeUsageSerializer, RedeemCodeRedeemSerializer
)


class RedeemCodeViewSet(viewsets.ModelViewSet):
    """ViewSet for managing redeem codes (admin only)"""
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Filter based on user role"""
        user = self.request.user

        # Only admins can view/manage redeem codes
        if user.role == 'admin':
            return RedeemCode.objects.all().select_related('created_by')

        return RedeemCode.objects.none()

    def get_serializer_class(self):
        """Return appropriate serializer"""
        if self.action == 'create':
            return RedeemCodeCreateSerializer
        return RedeemCodeSerializer

    def create(self, request, *args, **kwargs):
        """Create redeem code(s) - admin only"""
        if request.user.role != 'admin':
            return Response(
                {'error': 'Only admins can create redeem codes'},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        # Check if auto-generating multiple codes
        auto_generate = request.data.get('auto_generate', False)
        quantity = int(request.data.get('quantity', 1))

        if auto_generate and quantity > 1:
            # Generate multiple codes
            import random
            import string

            codes = []
            for _ in range(quantity):
                # Generate unique code
                while True:
                    code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))
                    if not RedeemCode.objects.filter(code=code).exists():
                        break

                code_obj = RedeemCode.objects.create(
                    code=code,
                    value=request.data.get('value'),
                    description=request.data.get('description', ''),
                    is_active=request.data.get('is_active', True),
                    usage_limit=request.data.get('usage_limit', 1),
                    expires_at=request.data.get('expires_at'),
                    created_by=request.user
                )
                codes.append(code_obj)

            # Return all generated codes
            return Response(
                {
                    'message': f'{quantity} codes generated successfully',
                    'codes': RedeemCodeSerializer(codes, many=True).data
                },
                status=status.HTTP_201_CREATED
            )
        else:
            # Create single code
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        """Update redeem code - admin only"""
        if request.user.role != 'admin':
            return Response(
                {'error': 'Only admins can update redeem codes'},
                status=status.HTTP_403_FORBIDDEN
            )
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        """Delete redeem code - admin only"""
        if request.user.role != 'admin':
            return Response(
                {'error': 'Only admins can delete redeem codes'},
                status=status.HTTP_403_FORBIDDEN
            )
        return super().destroy(request, *args, **kwargs)

    @action(detail=True, methods=['get'])
    def usage_history(self, request, pk=None):
        """Get usage history for a redeem code"""
        if request.user.role != 'admin':
            return Response(
                {'error': 'Only admins can view usage history'},
                status=status.HTTP_403_FORBIDDEN
            )

        code = self.get_object()
        usages = RedeemCodeUsage.objects.filter(redeem_code=code).select_related('user', 'wallet')
        serializer = RedeemCodeUsageSerializer(usages, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get redeem code statistics - admin only"""
        if request.user.role != 'admin':
            return Response(
                {'error': 'Only admins can view statistics'},
                status=status.HTTP_403_FORBIDDEN
            )

        total_codes = RedeemCode.objects.count()
        active_codes = RedeemCode.objects.filter(is_active=True).count()
        used_codes = RedeemCode.objects.filter(times_used__gt=0).count()
        expired_codes = RedeemCode.objects.filter(
            is_active=True,
            expires_at__lt=timezone.now()
        ).count()

        total_value_redeemed = RedeemCodeUsage.objects.aggregate(
            total=models.Sum('redeem_code__value')
        )['total'] or 0

        return Response({
            'total_codes': total_codes,
            'active_codes': active_codes,
            'used_codes': used_codes,
            'expired_codes': expired_codes,
            'total_value_redeemed': float(total_value_redeemed)
        })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def redeem_code(request):
    """Redeem a code and add credits to user's wallet"""
    user = request.user

    # Validate input
    serializer = RedeemCodeRedeemSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    code_str = serializer.validated_data['code'].upper()

    try:
        with transaction.atomic():
            # Get the redeem code
            redeem_code = RedeemCode.objects.select_for_update().get(code=code_str)

            # Check if valid
            if not redeem_code.is_valid:
                return Response(
                    {'error': 'This code is not valid'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Check if user already redeemed this code
            if RedeemCodeUsage.objects.filter(redeem_code=redeem_code, user=user).exists():
                return Response(
                    {'error': 'You have already redeemed this code'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Get or create wallet for user
            if hasattr(user, 'client_profile'):
                wallet, created = Wallet.objects.get_or_create(
                    client=user.client_profile,
                    defaults={'balance': 0, 'total_earned': 0, 'total_spent': 0}
                )
            else:
                return Response(
                    {'error': 'Only clients can redeem codes'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Create transaction
            trans = Transaction.objects.create(
                wallet=wallet,
                transaction_type='bonus',
                amount=redeem_code.value,
                status='completed',
                description=f'Redeemed code: {redeem_code.code}',
                payment_method='redeem_code'
            )

            # Update wallet balance
            wallet.balance += redeem_code.value
            wallet.total_earned += redeem_code.value
            wallet.save()

            # Create usage record
            RedeemCodeUsage.objects.create(
                redeem_code=redeem_code,
                user=user,
                wallet=wallet,
                transaction=trans
            )

            # Update redeem code usage count
            redeem_code.times_used += 1
            redeem_code.save()

            return Response({
                'message': 'Code redeemed successfully',
                'amount': float(redeem_code.value),
                'new_balance': float(wallet.balance),
                'transaction_id': str(trans.id)
            }, status=status.HTTP_200_OK)

    except RedeemCode.DoesNotExist:
        return Response(
            {'error': 'Invalid redeem code'},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {'error': f'Failed to redeem code: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_redeemed_codes(request):
    """Get list of codes redeemed by current user"""
    user = request.user
    usages = RedeemCodeUsage.objects.filter(user=user).select_related('redeem_code')
    serializer = RedeemCodeUsageSerializer(usages, many=True)
    return Response(serializer.data)
