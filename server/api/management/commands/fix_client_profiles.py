from django.core.management.base import BaseCommand
from django.utils import timezone
from api.models import User, Client, Wallet


class Command(BaseCommand):
    help = 'Creates Client profiles and Wallets for users who don\'t have them'

    def handle(self, *args, **options):
        users_without_client = User.objects.filter(client_profile__isnull=True)

        self.stdout.write(f"Found {users_without_client.count()} users without client profiles")

        for user in users_without_client:
            try:
                # Create client profile with FREE plan
                client = Client.objects.create(
                    user=user,
                    name=f"{user.first_name} {user.last_name}",
                    email=user.email,
                    company=getattr(user, 'company', 'Unknown Company') or 'Unknown Company',
                    package='free',  # Default FREE plan
                    monthly_fee=0,
                    start_date=timezone.now().date(),
                    status='active',
                    payment_status='none',
                    next_payment=None,
                    current_plan='none',
                    paypal_subscription_id=None,
                    paypal_customer_id=None,
                )

                # Create wallet
                Wallet.objects.create(
                    client=client,
                    balance=0.00
                )

                self.stdout.write(
                    self.style.SUCCESS(
                        f'✓ Created client profile and wallet for {user.email}'
                    )
                )
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(
                        f'✗ Failed to create profile for {user.email}: {e}'
                    )
                )

        self.stdout.write(
            self.style.SUCCESS(
                f'\nCompleted! Processed {users_without_client.count()} users'
            )
        )
