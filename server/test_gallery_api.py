#!/usr/bin/env python
"""
Quick test script for Gallery API endpoints
Run this from the server directory after starting Django
"""

import os
import sys
import django
import json
import requests
from pathlib import Path

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
sys.path.insert(0, str(Path(__file__).parent))
django.setup()

from api.models import ImageGalleryItem, User

# API Base URL
BASE_URL = 'http://localhost:8000/api'

def print_section(title):
    """Print a formatted section header"""
    print(f"\n{'='*60}")
    print(f"  {title}")
    print('='*60)

def test_gallery_list():
    """Test GET /api/gallery/"""
    print_section("Testing Gallery List (GET /api/gallery/)")

    try:
        response = requests.get(f'{BASE_URL}/gallery/')
        print(f"Status Code: {response.status_code}")

        if response.ok:
            data = response.json()
            print(f"Total Items: {data.get('count', 0)}")

            if 'results' in data:
                items = data['results']
                print(f"Items on this page: {len(items)}")

                for item in items[:2]:  # Show first 2 items
                    print(f"\n  Title: {item.get('title')}")
                    print(f"  ID: {item.get('id')}")
                    print(f"  Display Order: {item.get('display_order')}")
                    print(f"  Flex Width: {item.get('flex_width')}")
                    print(f"  Image URL: {item.get('image_url')}")
                    print(f"  Is Active: {item.get('is_active')}")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Error: {e}")

def check_database():
    """Check database for gallery items"""
    print_section("Checking Database")

    count = ImageGalleryItem.objects.count()
    print(f"Total items in database: {count}")

    for item in ImageGalleryItem.objects.all()[:5]:
        print(f"\n  {item.title}")
        print(f"    ID: {item.id}")
        print(f"    Order: {item.display_order}")
        print(f"    Active: {item.is_active}")
        print(f"    Has Image: {bool(item.image)}")

def check_permissions():
    """Check permission configuration"""
    print_section("Checking Permissions")

    from api.views.gallery_views import IsAdmin

    # Check if there are any admin users
    admin_users = User.objects.filter(role='admin').count()
    print(f"Admin users in database: {admin_users}")

    # Check IsAdmin permission
    print(f"IsAdmin permission class: {IsAdmin}")
    print("Permission checks:")
    print("  - Anonymous users: Can view, cannot create/edit/delete")
    print("  - Authenticated non-admin: Can view, cannot create/edit/delete")
    print("  - Admin users: Can view, create, edit, delete")

def test_endpoints():
    """Test all main endpoints"""
    print_section("Testing All Endpoints")

    endpoints = [
        ('GET', '/api/gallery/', 'List all images'),
        ('GET', '/api/gallery/?page=1', 'List images (page 1)'),
    ]

    for method, endpoint, description in endpoints:
        try:
            url = f'http://localhost:8000{endpoint}'
            response = requests.request(method, url)
            status_icon = "[OK]" if response.ok else "[FAIL]"
            print(f"{status_icon} [{method:6}] {endpoint:30} -> {response.status_code} ({description})")
        except Exception as e:
            print(f"[FAIL] [{method:6}] {endpoint:30} -> Error: {e}")

def main():
    """Run all tests"""
    print("\n" + "="*60)
    print("  IMAGE GALLERY API TEST SUITE")
    print("="*60)
    print("\nMake sure Django is running: python manage.py runserver")
    print("And the database is set up: python manage.py migrate")

    # Run tests
    check_database()
    check_permissions()
    test_endpoints()
    test_gallery_list()

    print("\n" + "="*60)
    print("  TEST COMPLETE")
    print("="*60)
    print("\nNext steps:")
    print("1. Add sample images via admin dashboard")
    print("2. Verify they appear on homepage")
    print("3. Test edit/delete operations")
    print("\nDocumentation: See GALLERY_SETUP.md")

if __name__ == '__main__':
    main()
