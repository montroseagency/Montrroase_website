# File: server/api/views/wallet_payment_views.py
# Wallet Payment API Endpoints - Phase 7 Billing Enhancements

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from decimal import Decimal

from ..models import Wallet, WalletAutoRecharge, Transaction
from ..serializers import (
    WalletSerializer, WalletAutoRechargeSerializer,
    WalletAutoRechargeConfigureSerializer, TransactionSerializer,
    TopUpWalletSerializer
)
from ..services.wallet_payment_service import WalletPaymentService
import logging

logger = logging.getLogger(__name__)


class WalletViewSet(viewsets.ModelViewSet):
    """
    ViewSet for wallet operations including payments and auto-recharge

    Endpoints:
    - GET /api/wallet/ - Get user's wallet
    - POST /api/wallet/pay/ - Pay from wallet balance
    - POST /api/wallet/topup/ - Add credits to wallet
    - POST /api/wallet/check-affordability/ - Check if wallet can afford a service
    - GET /api/wallet/transactions/ - Get payment history
    """
    serializer_class = WalletSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Only return wallet for current user's client profile"""
        if hasattr(self.request.user, 'client_profile'):
            return Wallet.objects.filter(client=self.request.user.client_profile)
        return Wallet.objects.none()

    def list(self, request):
        """Get current user's wallet"""
        if not hasattr(request.user, 'client_profile'):
            return Response(
                {'error': 'No client profile found for this user'},
                status=status.HTTP_404_NOT_FOUND
            )

        wallet, created = Wallet.objects.get_or_create(
            client=request.user.client_profile
        )

        serializer = self.get_serializer(wallet, context={'request': request})
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def pay(self, request):
        """
        Pay from wallet balance

        Body:
        {
            "amount": 50.00,
            "description": "Payment for Pro subscription",
            "paid_for_service": "subscription"
        }
        """
        if not hasattr(request.user, 'client_profile'):
            return Response(
                {'error': 'No client profile found'},
                status=status.HTTP_404_NOT_FOUND
            )

        wallet = get_object_or_404(Wallet, client=request.user.client_profile)

        amount = request.data.get('amount')
        description = request.data.get('description', 'Wallet payment')
        paid_for_service = request.data.get('paid_for_service', '')

        if not amount:
            return Response(
                {'error': 'Amount is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            amount = Decimal(str(amount))
            if amount <= 0:
                return Response(
                    {'error': 'Amount must be greater than 0'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except (ValueError, TypeError):
            return Response(
                {'error': 'Invalid amount'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            transaction = WalletPaymentService.process_wallet_payment(
                wallet=wallet,
                amount=amount,
                description=description,
                paid_for_service=paid_for_service
            )

            return Response({
                'success': True,
                'message': 'Payment processed successfully',
                'transaction': TransactionSerializer(transaction).data,
                'new_balance': str(wallet.balance)
            }, status=status.HTTP_200_OK)

        except ValueError as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            logger.error(f'Wallet payment error: {e}')
            return Response(
                {'error': 'Payment processing failed'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['post'])
    def topup(self, request):
        """
        Add credits to wallet (after successful PayPal/Stripe payment)

        Body:
        {
            "amount": 100.00,
            "payment_method": "paypal",
            "payment_reference": "PAYPAL-ORDER-123"
        }
        """
        if not hasattr(request.user, 'client_profile'):
            return Response(
                {'error': 'No client profile found'},
                status=status.HTTP_404_NOT_FOUND
            )

        wallet = get_object_or_404(Wallet, client=request.user.client_profile)

        serializer = TopUpWalletSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        amount = serializer.validated_data['amount']
        payment_method = serializer.validated_data['payment_method']
        payment_reference = request.data.get('payment_reference', '')

        try:
            transaction = WalletPaymentService.add_credits(
                wallet=wallet,
                amount=amount,
                description=f'Wallet top-up via {payment_method}',
                payment_method=payment_method,
                payment_reference=payment_reference
            )

            return Response({
                'success': True,
                'message': 'Credits added successfully',
                'transaction': TransactionSerializer(transaction).data,
                'new_balance': str(wallet.balance)
            }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f'Wallet top-up error: {e}')
            return Response(
                {'error': 'Top-up failed'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['post'])
    def check_affordability(self, request):
        """
        Check if wallet can afford a service

        Body:
        {
            "service_cost": 50.00
        }

        Response:
        {
            "can_afford": true,
            "current_balance": 100.00,
            "needs_recharge": false,
            "after_recharge_balance": 100.00
        }
        """
        if not hasattr(request.user, 'client_profile'):
            return Response(
                {'error': 'No client profile found'},
                status=status.HTTP_404_NOT_FOUND
            )

        wallet = get_object_or_404(Wallet, client=request.user.client_profile)

        service_cost = request.data.get('service_cost')
        if not service_cost:
            return Response(
                {'error': 'service_cost is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            service_cost = Decimal(str(service_cost))
        except (ValueError, TypeError):
            return Response(
                {'error': 'Invalid service_cost'},
                status=status.HTTP_400_BAD_REQUEST
            )

        result = WalletPaymentService.can_afford_service(wallet, service_cost)

        return Response({
            'can_afford': result['can_afford'],
            'current_balance': str(result['current_balance']),
            'needs_recharge': result['needs_recharge'],
            'after_recharge_balance': str(result['after_recharge_balance'])
        })

    @action(detail=False, methods=['get'])
    def transactions(self, request):
        """
        Get payment history

        Query params:
        - limit: Number of transactions to return (default 50)
        """
        if not hasattr(request.user, 'client_profile'):
            return Response(
                {'error': 'No client profile found'},
                status=status.HTTP_404_NOT_FOUND
            )

        wallet = get_object_or_404(Wallet, client=request.user.client_profile)

        limit = request.query_params.get('limit', 50)
        try:
            limit = int(limit)
        except (ValueError, TypeError):
            limit = 50

        transactions = WalletPaymentService.get_payment_history(wallet, limit=limit)
        serializer = TransactionSerializer(transactions, many=True)

        return Response({
            'transactions': serializer.data,
            'current_balance': str(wallet.balance),
            'total_earned': str(wallet.total_earned),
            'total_spent': str(wallet.total_spent)
        })


class WalletAutoRechargeViewSet(viewsets.ModelViewSet):
    """
    ViewSet for wallet auto-recharge configuration

    Endpoints:
    - GET /api/wallet-auto-recharge/ - Get auto-recharge settings
    - POST /api/wallet-auto-recharge/configure/ - Configure auto-recharge
    - POST /api/wallet-auto-recharge/trigger/ - Manually trigger auto-recharge
    - POST /api/wallet-auto-recharge/disable/ - Disable auto-recharge
    """
    serializer_class = WalletAutoRechargeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Only return auto-recharge for current user's wallet"""
        if hasattr(self.request.user, 'client_profile'):
            return WalletAutoRecharge.objects.filter(
                wallet__client=self.request.user.client_profile
            )
        return WalletAutoRecharge.objects.none()

    def list(self, request):
        """Get current user's auto-recharge settings"""
        if not hasattr(request.user, 'client_profile'):
            return Response(
                {'error': 'No client profile found'},
                status=status.HTTP_404_NOT_FOUND
            )

        wallet = get_object_or_404(Wallet, client=request.user.client_profile)
        auto_recharge = WalletPaymentService.get_or_create_auto_recharge(wallet)

        serializer = self.get_serializer(auto_recharge)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def configure(self, request):
        """
        Configure auto-recharge settings

        Body:
        {
            "is_enabled": true,
            "threshold_amount": 10.00,
            "recharge_amount": 50.00,
            "payment_method_id": "PAYPAL-BA-123",
            "payment_method_type": "paypal"
        }
        """
        if not hasattr(request.user, 'client_profile'):
            return Response(
                {'error': 'No client profile found'},
                status=status.HTTP_404_NOT_FOUND
            )

        wallet = get_object_or_404(Wallet, client=request.user.client_profile)

        serializer = WalletAutoRechargeConfigureSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            auto_recharge = WalletPaymentService.configure_auto_recharge(
                wallet=wallet,
                is_enabled=serializer.validated_data['is_enabled'],
                threshold_amount=serializer.validated_data['threshold_amount'],
                recharge_amount=serializer.validated_data['recharge_amount'],
                payment_method_id=serializer.validated_data.get('payment_method_id', ''),
                payment_method_type=serializer.validated_data.get('payment_method_type', 'paypal')
            )

            return Response({
                'success': True,
                'message': 'Auto-recharge configured successfully',
                'auto_recharge': WalletAutoRechargeSerializer(auto_recharge).data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f'Auto-recharge configuration error: {e}')
            return Response(
                {'error': 'Configuration failed'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['post'])
    def trigger(self, request):
        """
        Manually trigger auto-recharge (useful for testing)
        """
        if not hasattr(request.user, 'client_profile'):
            return Response(
                {'error': 'No client profile found'},
                status=status.HTTP_404_NOT_FOUND
            )

        wallet = get_object_or_404(Wallet, client=request.user.client_profile)

        try:
            transaction = WalletPaymentService.check_and_trigger_auto_recharge(wallet)

            if transaction:
                return Response({
                    'success': True,
                    'message': 'Auto-recharge triggered successfully',
                    'transaction': TransactionSerializer(transaction).data,
                    'new_balance': str(wallet.balance)
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'success': False,
                    'message': 'Auto-recharge not needed or not configured'
                }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f'Manual auto-recharge trigger error: {e}')
            return Response(
                {'error': 'Auto-recharge failed'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['post'])
    def disable(self, request):
        """Disable auto-recharge"""
        if not hasattr(request.user, 'client_profile'):
            return Response(
                {'error': 'No client profile found'},
                status=status.HTTP_404_NOT_FOUND
            )

        wallet = get_object_or_404(Wallet, client=request.user.client_profile)

        try:
            auto_recharge = WalletAutoRecharge.objects.get(wallet=wallet)
            auto_recharge.is_enabled = False
            auto_recharge.save()

            return Response({
                'success': True,
                'message': 'Auto-recharge disabled successfully'
            }, status=status.HTTP_200_OK)

        except WalletAutoRecharge.DoesNotExist:
            return Response(
                {'error': 'Auto-recharge not configured'},
                status=status.HTTP_404_NOT_FOUND
            )
