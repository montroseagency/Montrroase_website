#!/usr/bin/env python
"""
Script to create test notifications for testing the notification system
Usage: python create_test_notifications.py
"""

import os
import django
import sys

# Add the project root to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django.setup()

from api.models import Notification, User
from django.utils import timezone

def create_test_notifications():
    """Create test notifications for all users"""

    # Get all users
    users = User.objects.all()

    if not users.exists():
        print("❌ No users found in database. Please create users first.")
        return

    notification_types = [
        {
            'type': 'task_assigned',
            'title': 'New Task Assigned',
            'message': 'You have been assigned a new task: Update client website'
        },
        {
            'type': 'payment_due',
            'title': 'Payment Due',
            'message': 'Your monthly subscription payment of $299.00 is due in 3 days'
        },
        {
            'type': 'content_approved',
            'title': 'Content Approved',
            'message': 'Your Instagram post "Summer Sale Campaign" has been approved'
        },
        {
            'type': 'message_received',
            'title': 'New Message',
            'message': 'You have a new message from John Doe'
        },
        {
            'type': 'performance_update',
            'title': 'Performance Report',
            'message': 'Your monthly performance report is now available'
        }
    ]

    created_count = 0

    for user in users:
        # Create 2-3 notifications for each user
        for i, notif_data in enumerate(notification_types[:3]):
            notification = Notification.objects.create(
                user=user,
                notification_type=notif_data['type'],
                title=notif_data['title'],
                message=notif_data['message'],
                read=(i > 0)  # First notification is unread
            )
            created_count += 1
            print(f"✅ Created {notif_data['type']} notification for {user.email}")

    print(f"\n🎉 Successfully created {created_count} test notifications!")
    print(f"👤 Notifications created for {users.count()} users")
    print("\n📝 Summary:")
    print(f"   - {Notification.objects.filter(read=False).count()} unread notifications")
    print(f"   - {Notification.objects.filter(read=True).count()} read notifications")
    print(f"   - {Notification.objects.count()} total notifications")

if __name__ == '__main__':
    print("🔔 Creating Test Notifications...")
    print("-" * 50)
    create_test_notifications()
    print("-" * 50)
    print("✨ Done!")
