# File: server/api/views/gallery_views.py
# Views for Image Gallery Management

from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from api.models import ImageGalleryItem
from api.serializers import ImageGalleryItemSerializer
from django.shortcuts import get_object_or_404


class IsAdmin(permissions.BasePermission):
    """Permission to check if user is admin"""
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'admin'


class ImageGalleryViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing image gallery items
    - Admins can create, update, delete images
    - Everyone can view the gallery
    """
    serializer_class = ImageGalleryItemSerializer
    parser_classes = (JSONParser, MultiPartParser, FormParser)

    def get_queryset(self):
        """
        For list/retrieve actions, only show active items.
        For update/delete actions, show all items (for admin operations).
        """
        queryset = ImageGalleryItem.objects.all().order_by('display_order')

        # For list and retrieve (public views), filter to active only
        if self.action in ['list', 'retrieve']:
            queryset = queryset.filter(is_active=True)

        return queryset

    def get_permissions(self):
        """Set permissions based on action"""
        if self.action in ['list', 'retrieve', 'gallery']:
            # Anyone can view
            return [permissions.AllowAny()]
        elif self.action in ['create', 'update', 'partial_update', 'destroy', 'reorder', 'toggle_active']:
            # Only authenticated admins can modify
            return [permissions.IsAuthenticated(), IsAdmin()]
        return [permissions.AllowAny()]

    @action(detail=False, methods=['get'])
    def gallery(self, request):
        """Get all active gallery items"""
        items = self.get_queryset()
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def reorder(self, request):
        """Reorder gallery items"""
        if not request.user.is_authenticated or request.user.role != 'admin':
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        items_order = request.data.get('items', [])

        for idx, item_data in enumerate(items_order):
            item_id = item_data.get('id')
            try:
                item = ImageGalleryItem.objects.get(id=item_id)
                item.display_order = idx
                item.save()
            except ImageGalleryItem.DoesNotExist:
                return Response(
                    {'error': f'Item {item_id} not found'},
                    status=status.HTTP_404_NOT_FOUND
                )

        items = self.get_queryset()
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def toggle_active(self, request, pk=None):
        """Toggle active status of a gallery item"""
        if not request.user.is_authenticated or request.user.role != 'admin':
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        item = self.get_object()
        item.is_active = not item.is_active
        item.save()

        serializer = self.get_serializer(item)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        """Create a new gallery item"""
        if not request.user.is_authenticated or request.user.role != 'admin':
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        print(f"DEBUG: Create request data: {request.data}")
        print(f"DEBUG: Title: {request.data.get('title')}")
        print(f"DEBUG: Caption: {request.data.get('caption')}")
        print(f"DEBUG: Alt text: {request.data.get('alt_text')}")

        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        """Update a gallery item"""
        if not request.user.is_authenticated or request.user.role != 'admin':
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        print(f"DEBUG: Update request data: {request.data}")
        print(f"DEBUG: Title: {request.data.get('title')}")
        print(f"DEBUG: Caption: {request.data.get('caption')}")

        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        """Delete a gallery item"""
        if not request.user.is_authenticated or request.user.role != 'admin':
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        return super().destroy(request, *args, **kwargs)
