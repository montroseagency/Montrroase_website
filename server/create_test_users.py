import os
import django
import sys

# Add the server directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django.setup()

from django.contrib.auth import get_user_model
from api.models import Client, Agent, Wallet

User = get_user_model()

def create_test_users():
    print("Creating test users...")

    # 1. Create Admin User
    admin_email = "admin@test.com"
    if not User.objects.filter(email=admin_email).exists():
        admin = User.objects.create_user(
            username=admin_email,
            email=admin_email,
            password="admin123",
            first_name="Admin",
            last_name="User",
            role="admin"
        )
        print(f"✅ Created admin: {admin_email} / admin123")
    else:
        print(f"⚠️  Admin already exists: {admin_email}")

    # 2. Create Marketing Agent
    marketing_agent_email = "marketing.agent@test.com"
    if not User.objects.filter(email=marketing_agent_email).exists():
        marketing_user = User.objects.create_user(
            username=marketing_agent_email,
            email=marketing_agent_email,
            password="agent123",
            first_name="Sarah",
            last_name="Marketing",
            role="agent"
        )
        Agent.objects.create(
            user=marketing_user,
            department="marketing",
            specialization="Social Media Marketing, Instagram Growth",
            max_clients=10,
            is_active=True
        )
        print(f"✅ Created marketing agent: {marketing_agent_email} / agent123")
    else:
        print(f"⚠️  Marketing agent already exists: {marketing_agent_email}")

    # 3. Create Website Development Agent
    website_agent_email = "web.agent@test.com"
    if not User.objects.filter(email=website_agent_email).exists():
        web_user = User.objects.create_user(
            username=website_agent_email,
            email=website_agent_email,
            password="agent123",
            first_name="John",
            last_name="Developer",
            role="agent"
        )
        Agent.objects.create(
            user=web_user,
            department="website",
            specialization="Full Stack Development, React, Django",
            max_clients=8,
            is_active=True
        )
        print(f"✅ Created website agent: {website_agent_email} / agent123")
    else:
        print(f"⚠️  Website agent already exists: {website_agent_email}")

    # 4. Create Test Clients
    from datetime import date

    clients_data = [
        {
            "email": "client1@test.com",
            "first_name": "Alice",
            "last_name": "Johnson",
            "company": "Alice's Boutique",
            "package": "premium"
        },
        {
            "email": "client2@test.com",
            "first_name": "Bob",
            "last_name": "Smith",
            "company": "Bob's Tech Solutions",
            "package": "pro"
        },
        {
            "email": "client3@test.com",
            "first_name": "Charlie",
            "last_name": "Brown",
            "company": "Charlie's Consulting",
            "package": "starter"
        }
    ]

    for client_data in clients_data:
        if not User.objects.filter(email=client_data["email"]).exists():
            user = User.objects.create_user(
                username=client_data["email"],
                email=client_data["email"],
                password="client123",
                first_name=client_data["first_name"],
                last_name=client_data["last_name"],
                role="client"
            )

            client = Client.objects.create(
                user=user,
                name=f"{client_data['first_name']} {client_data['last_name']}",
                email=client_data["email"],
                company=client_data["company"],
                package=client_data["package"],
                status='active',
                start_date=date.today(),
                monthly_fee=99.99
            )

            # Create wallet for client
            Wallet.objects.create(
                client=client,
                balance=100.00
            )

            print(f"✅ Created client: {client_data['email']} / client123")
        else:
            print(f"⚠️  Client already exists: {client_data['email']}")

    print("\n" + "="*50)
    print("TEST ACCOUNTS SUMMARY")
    print("="*50)
    print("\n👤 ADMIN:")
    print("   Email: admin@test.com")
    print("   Password: admin123")
    print("\n🎨 MARKETING AGENT:")
    print("   Email: marketing.agent@test.com")
    print("   Password: agent123")
    print("\n💻 WEBSITE AGENT:")
    print("   Email: web.agent@test.com")
    print("   Password: agent123")
    print("\n👥 CLIENTS:")
    print("   1. client1@test.com / client123 (Alice's Boutique)")
    print("   2. client2@test.com / client123 (Bob's Tech Solutions)")
    print("   3. client3@test.com / client123 (Charlie's Consulting)")
    print("\n" + "="*50)
    print("All test accounts created successfully!")
    print("You can now log in at http://localhost:3000")
    print("="*50 + "\n")

if __name__ == "__main__":
    create_test_users()
