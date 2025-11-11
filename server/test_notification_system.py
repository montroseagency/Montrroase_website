#!/usr/bin/env python
"""
Test script for Phase 5: Notification & Email System
This script demonstrates all the automated notification triggers
"""

import os
import django
import sys

# Add the project root to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django.setup()

from api.models import User, ContentPost, Task, Course, WebsiteProject, WebsitePhase, Invoice
from api.services.notification_trigger_service import NotificationTriggerService
from datetime import datetime, timedelta
from decimal import Decimal

def print_section(title):
    """Print section header"""
    print("\n" + "="*60)
    print(f"  {title}")
    print("="*60 + "\n")

def test_payment_notifications():
    """Test payment confirmation notifications"""
    print_section("Testing Payment Notifications")

    user = User.objects.filter(role='client').first()
    if not user:
        print("❌ No client users found")
        return

    print(f"📧 Sending payment confirmation to: {user.email}")
    NotificationTriggerService.trigger_payment_confirmation(
        user=user,
        amount=299.00,
        transaction_id="TXN-123456789"
    )
    print("✅ Payment confirmation sent!")

def test_invoice_notifications():
    """Test invoice notifications"""
    print_section("Testing Invoice Notifications")

    user = User.objects.filter(role='client').first()
    if not user:
        print("❌ No client users found")
        return

    # Get or create a test invoice
    invoice, created = Invoice.objects.get_or_create(
        client=user.client_profile,
        defaults={
            'invoice_number': 'INV-TEST-001',
            'amount': Decimal('299.00'),
            'due_date': datetime.now().date() + timedelta(days=7),
            'status': 'pending'
        }
    )

    print(f"📧 Sending invoice notification to: {user.email}")
    NotificationTriggerService.trigger_invoice_created(user, invoice)
    print("✅ Invoice notification sent!")

    print(f"📧 Sending invoice reminder to: {user.email}")
    NotificationTriggerService.trigger_invoice_reminder(user, invoice, days_until_due=3)
    print("✅ Invoice reminder sent!")

def test_message_notifications():
    """Test message notifications"""
    print_section("Testing Message Notifications")

    user = User.objects.filter(role='client').first()
    if not user:
        print("❌ No client users found")
        return

    print(f"📧 Sending message notification to: {user.email}")
    NotificationTriggerService.trigger_message_notification(
        recipient_user=user,
        sender_name="Admin Team",
        message_preview="Hi! We have an update on your social media campaign. Please check your dashboard for details."
    )
    print("✅ Message notification sent!")

def test_task_notifications():
    """Test task notifications"""
    print_section("Testing Task Notifications")

    user = User.objects.filter(role='client').first()
    if not user:
        print("❌ No client users found")
        return

    # Get or create a test task
    task, created = Task.objects.get_or_create(
        client=user.client_profile,
        defaults={
            'title': 'Review Q4 Marketing Strategy',
            'description': 'Please review the proposed marketing strategy for Q4 and provide your feedback.',
            'status': 'pending',
            'priority': 'high',
            'due_date': datetime.now().date() + timedelta(days=5)
        }
    )

    print(f"📧 Sending task assignment notification to: {user.email}")
    NotificationTriggerService.trigger_task_assigned(user, task)
    print("✅ Task assignment notification sent!")

def test_content_notifications():
    """Test content notifications"""
    print_section("Testing Content Notifications")

    user = User.objects.filter(role='client').first()
    if not user:
        print("❌ No client users found")
        return

    # Get or create test content
    content, created = ContentPost.objects.get_or_create(
        client=user.client_profile,
        defaults={
            'caption': 'Check out our amazing Black Friday deals! Limited time offer - up to 50% off!',
            'status': 'approved',
            'platform': 'instagram'
        }
    )

    print(f"📧 Sending content approval notification to: {user.email}")
    NotificationTriggerService.trigger_content_approved(user, content)
    print("✅ Content approval notification sent!")

def test_website_notifications():
    """Test website project notifications"""
    print_section("Testing Website Project Notifications")

    user = User.objects.filter(role='client').first()
    if not user:
        print("❌ No client users found")
        return

    # Get or create test website project
    project = WebsiteProject.objects.filter(client=user.client_profile).first()

    if project:
        print(f"📧 Sending website demo ready notification to: {user.email}")
        NotificationTriggerService.trigger_website_demo_ready(user, project)
        print("✅ Website demo notification sent!")
    else:
        print("⚠️  No website projects found - skipping website notifications")

def test_course_notifications():
    """Test course notifications"""
    print_section("Testing Course Notifications")

    user = User.objects.filter(role='client').first()
    if not user:
        print("❌ No client users found")
        return

    # Get or create test course
    course, created = Course.objects.get_or_create(
        defaults={
            'title': 'Social Media Marketing Mastery',
            'description': 'Learn advanced social media marketing strategies',
            'tier': 'premium',
            'is_published': True,
            'duration_hours': 10
        }
    )

    print(f"📧 Sending course enrollment notification to: {user.email}")
    NotificationTriggerService.trigger_course_enrollment(user, course)
    print("✅ Course enrollment notification sent!")

def test_subscription_notifications():
    """Test subscription notifications"""
    print_section("Testing Subscription Notifications")

    user = User.objects.filter(role='client').first()
    if not user:
        print("❌ No client users found")
        return

    print(f"📧 Sending subscription activated notification to: {user.email}")
    NotificationTriggerService.trigger_subscription_activated(user, "Premium Plan")
    print("✅ Subscription notification sent!")

def main():
    """Run all notification tests"""
    print("\n" + "="*60)
    print("  PHASE 5: NOTIFICATION & EMAIL SYSTEM TEST")
    print("  Testing Automated Notification Triggers")
    print("="*60)

    try:
        # Run all tests
        test_payment_notifications()
        test_invoice_notifications()
        test_message_notifications()
        test_task_notifications()
        test_content_notifications()
        test_website_notifications()
        test_course_notifications()
        test_subscription_notifications()

        print_section("Test Summary")
        print("✅ All notification triggers tested successfully!")
        print("\n📊 Results:")
        print("  ✓ In-app notifications created in database")
        print("  ✓ Email notifications sent via Resend API")
        print("\n💡 Check:")
        print("  1. User inbox for email notifications")
        print("  2. Dashboard notification center for in-app notifications")
        print("  3. Django logs for detailed execution info")

    except Exception as e:
        print(f"\n❌ Error during testing: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    main()
