# File: server/api/services/wallet_payment_service.py
# Wallet Payment Service - Phase 7 Billing Enhancements
# Handles wallet payments, auto-recharge, and payment processing

from decimal import Decimal
from django.db import transaction
from django.utils import timezone
from ..models import Wallet, Transaction, WalletAutoRecharge, Client
from .notification_trigger_service import NotificationTriggerService
import logging

logger = logging.getLogger(__name__)


class WalletPaymentService:
    """Service for handling wallet payments and auto-recharge functionality"""

    @staticmethod
    def check_balance(wallet, amount):
        """
        Check if wallet has sufficient balance for a payment

        Args:
            wallet: Wallet instance
            amount: Decimal amount to check

        Returns:
            bool: True if sufficient balance, False otherwise
        """
        return wallet.balance >= amount

    @staticmethod
    @transaction.atomic
    def process_wallet_payment(wallet, amount, description, paid_for_service=''):
        """
        Process a payment from wallet balance

        Args:
            wallet: Wallet instance
            amount: Decimal amount to deduct
            description: Description of payment
            paid_for_service: What service was paid for (e.g., 'subscription', 'course_id', 'invoice_id')

        Returns:
            Transaction instance if successful

        Raises:
            ValueError: If insufficient balance
        """
        amount = Decimal(str(amount))

        # Check sufficient balance
        if not WalletPaymentService.check_balance(wallet, amount):
            raise ValueError(f'Insufficient wallet balance. Current balance: ${wallet.balance}, Required: ${amount}')

        # Create debit transaction
        transaction_obj = Transaction.objects.create(
            wallet=wallet,
            transaction_type='debit',
            amount=amount,
            status='completed',
            description=description,
            payment_method='wallet',
            paid_for_service=paid_for_service
        )

        # Update wallet balance
        wallet.balance -= amount
        wallet.total_spent += amount
        wallet.save()

        logger.info(f'Wallet payment processed: {wallet.client.name} - ${amount} for {paid_for_service}')

        # Send notification
        try:
            NotificationTriggerService.trigger_payment_success(
                client=wallet.client,
                amount=amount,
                payment_method='Wallet Balance',
                transaction_id=str(transaction_obj.id)
            )
        except Exception as e:
            logger.error(f'Failed to send payment notification: {e}')

        # Check if auto-recharge is needed
        try:
            WalletPaymentService.check_and_trigger_auto_recharge(wallet)
        except Exception as e:
            logger.error(f'Auto-recharge check failed: {e}')

        return transaction_obj

    @staticmethod
    @transaction.atomic
    def add_credits(wallet, amount, description, payment_method='paypal', payment_reference=''):
        """
        Add credits to wallet (for top-ups and auto-recharge)

        Args:
            wallet: Wallet instance
            amount: Decimal amount to add
            description: Description of credit
            payment_method: Payment method used ('paypal', 'stripe', etc.)
            payment_reference: Payment reference ID

        Returns:
            Transaction instance
        """
        amount = Decimal(str(amount))

        # Create credit transaction
        transaction_obj = Transaction.objects.create(
            wallet=wallet,
            transaction_type='credit',
            amount=amount,
            status='completed',
            description=description,
            payment_method=payment_method,
            payment_reference=payment_reference,
            paid_for_service='wallet_topup'
        )

        # Update wallet balance
        wallet.balance += amount
        wallet.total_earned += amount
        wallet.save()

        logger.info(f'Credits added to wallet: {wallet.client.name} - ${amount}')

        # Send notification
        try:
            NotificationTriggerService.trigger_payment_success(
                client=wallet.client,
                amount=amount,
                payment_method=payment_method,
                transaction_id=str(transaction_obj.id)
            )
        except Exception as e:
            logger.error(f'Failed to send credit notification: {e}')

        return transaction_obj

    @staticmethod
    def check_and_trigger_auto_recharge(wallet):
        """
        Check if auto-recharge should be triggered and process it

        Args:
            wallet: Wallet instance

        Returns:
            Transaction instance if auto-recharge was triggered, None otherwise
        """
        try:
            auto_recharge = WalletAutoRecharge.objects.get(wallet=wallet)
        except WalletAutoRecharge.DoesNotExist:
            return None

        # Check if auto-recharge is needed
        if not auto_recharge.should_recharge:
            return None

        logger.info(f'Auto-recharge triggered for {wallet.client.name}')

        try:
            # Process the auto-recharge payment via PayPal/Stripe
            transaction_obj = WalletPaymentService._process_auto_recharge_payment(
                wallet=wallet,
                auto_recharge=auto_recharge
            )

            # Update auto-recharge stats
            auto_recharge.last_recharge_date = timezone.now()
            auto_recharge.total_recharges += 1
            auto_recharge.total_recharged_amount += auto_recharge.recharge_amount
            auto_recharge.save()

            # Send notification
            try:
                NotificationTriggerService.trigger_payment_success(
                    client=wallet.client,
                    amount=auto_recharge.recharge_amount,
                    payment_method=f'Auto-Recharge ({auto_recharge.payment_method_type})',
                    transaction_id=str(transaction_obj.id)
                )
            except Exception as e:
                logger.error(f'Failed to send auto-recharge notification: {e}')

            return transaction_obj

        except Exception as e:
            logger.error(f'Auto-recharge failed for {wallet.client.name}: {e}')

            # Send failure notification
            try:
                from .notification_service import NotificationService
                NotificationService.create_notification(
                    user=wallet.client.user,
                    title='Auto-Recharge Failed',
                    message=f'Your automatic wallet recharge of ${auto_recharge.recharge_amount} failed. Please update your payment method or manually add credits.',
                    notification_type='payment'
                )
            except Exception as notify_error:
                logger.error(f'Failed to send auto-recharge failure notification: {notify_error}')

            return None

    @staticmethod
    @transaction.atomic
    def _process_auto_recharge_payment(wallet, auto_recharge):
        """
        Process the actual payment for auto-recharge via PayPal or Stripe

        Args:
            wallet: Wallet instance
            auto_recharge: WalletAutoRecharge instance

        Returns:
            Transaction instance

        Raises:
            Exception: If payment processing fails
        """
        # For now, this is a placeholder for actual payment processing
        # In production, this would call PayPal/Stripe API to charge the saved payment method

        if auto_recharge.payment_method_type == 'paypal':
            # TODO: Integrate with PayPal API to charge payment_method_id
            # payment_result = paypal_service.charge_payment_method(
            #     payment_method_id=auto_recharge.payment_method_id,
            #     amount=auto_recharge.recharge_amount
            # )
            payment_reference = f'AUTO_RECHARGE_{timezone.now().strftime("%Y%m%d%H%M%S")}'

        elif auto_recharge.payment_method_type == 'card':
            # TODO: Integrate with Stripe API to charge saved card
            # payment_result = stripe_service.charge_card(
            #     payment_method_id=auto_recharge.payment_method_id,
            #     amount=auto_recharge.recharge_amount
            # )
            payment_reference = f'AUTO_RECHARGE_{timezone.now().strftime("%Y%m%d%H%M%S")}'

        else:
            raise ValueError(f'Unsupported payment method type: {auto_recharge.payment_method_type}')

        # Add credits to wallet
        return WalletPaymentService.add_credits(
            wallet=wallet,
            amount=auto_recharge.recharge_amount,
            description=f'Auto-recharge: Balance below ${auto_recharge.threshold_amount}',
            payment_method=auto_recharge.payment_method_type,
            payment_reference=payment_reference
        )

    @staticmethod
    def get_or_create_auto_recharge(wallet):
        """
        Get or create auto-recharge configuration for a wallet

        Args:
            wallet: Wallet instance

        Returns:
            WalletAutoRecharge instance
        """
        auto_recharge, created = WalletAutoRecharge.objects.get_or_create(
            wallet=wallet,
            defaults={
                'is_enabled': False,
                'threshold_amount': Decimal('10.00'),
                'recharge_amount': Decimal('50.00'),
                'payment_method_type': 'paypal'
            }
        )

        if created:
            logger.info(f'Auto-recharge config created for {wallet.client.name}')

        return auto_recharge

    @staticmethod
    @transaction.atomic
    def configure_auto_recharge(wallet, is_enabled, threshold_amount, recharge_amount,
                               payment_method_id='', payment_method_type='paypal'):
        """
        Configure auto-recharge settings for a wallet

        Args:
            wallet: Wallet instance
            is_enabled: Boolean to enable/disable auto-recharge
            threshold_amount: Decimal amount to trigger recharge
            recharge_amount: Decimal amount to add when recharging
            payment_method_id: Payment method ID (PayPal subscription ID, Stripe card ID, etc.)
            payment_method_type: Type of payment method ('paypal', 'card')

        Returns:
            WalletAutoRecharge instance
        """
        auto_recharge = WalletPaymentService.get_or_create_auto_recharge(wallet)

        auto_recharge.is_enabled = is_enabled
        auto_recharge.threshold_amount = Decimal(str(threshold_amount))
        auto_recharge.recharge_amount = Decimal(str(recharge_amount))
        auto_recharge.payment_method_id = payment_method_id
        auto_recharge.payment_method_type = payment_method_type
        auto_recharge.save()

        logger.info(f'Auto-recharge configured for {wallet.client.name}: enabled={is_enabled}')

        return auto_recharge

    @staticmethod
    def get_payment_history(wallet, limit=50):
        """
        Get payment history for a wallet

        Args:
            wallet: Wallet instance
            limit: Maximum number of transactions to return

        Returns:
            QuerySet of Transaction instances
        """
        return wallet.transactions.all().order_by('-created_at')[:limit]

    @staticmethod
    def can_afford_service(wallet, service_cost):
        """
        Check if wallet can afford a service (considering auto-recharge)

        Args:
            wallet: Wallet instance
            service_cost: Decimal cost of service

        Returns:
            dict with keys: 'can_afford', 'current_balance', 'needs_recharge', 'after_recharge_balance'
        """
        service_cost = Decimal(str(service_cost))
        current_balance = wallet.balance
        can_afford_now = current_balance >= service_cost

        result = {
            'can_afford': can_afford_now,
            'current_balance': current_balance,
            'needs_recharge': False,
            'after_recharge_balance': current_balance
        }

        if not can_afford_now:
            try:
                auto_recharge = WalletAutoRecharge.objects.get(wallet=wallet)
                if auto_recharge.is_enabled:
                    after_recharge = current_balance + auto_recharge.recharge_amount
                    result['needs_recharge'] = True
                    result['after_recharge_balance'] = after_recharge
                    result['can_afford'] = after_recharge >= service_cost
            except WalletAutoRecharge.DoesNotExist:
                pass

        return result
