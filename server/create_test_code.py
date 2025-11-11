# Create test redeem code
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django.setup()

from api.models import RedeemCode, User
from django.utils import timezone
from datetime import timedelta

# Get admin user
admin = User.objects.get(email='admin@montrroase.com')

# Create a test code
code = RedeemCode.objects.create(
    code='TEST2024',
    value=50.00,
    description='Test code for Phase 1 demo',
    is_active=True,
    usage_limit=10,
    expires_at=timezone.now() + timedelta(days=30),
    created_by=admin
)

print(f'✅ Created test code: {code.code}')
print(f'💵 Value: ${code.value}')
print(f'📝 Description: {code.description}')
print(f'🔢 Usage limit: {code.usage_limit}')
print(f'📅 Expires: {code.expires_at}')
print(f'\n✨ You can now test this code in the wallet page!')
