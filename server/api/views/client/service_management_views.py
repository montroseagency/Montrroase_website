# File: server/api/views/client/service_management_views.py
# Service Management Views for Multi-Service Architecture

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.utils import timezone

from api.models import Client, ClientServiceSettings, Agent
from api.serializers import ClientServiceSettingsSerializer


class ClientServiceSettingsViewSet(viewsets.ModelViewSet):
    """ViewSet for managing client service settings"""
    serializer_class = ClientServiceSettingsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Filter based on user role"""
        user = self.request.user

        if user.role == 'admin':
            # Admins can see all service settings
            return ClientServiceSettings.objects.all().select_related(
                'client', 'assigned_agent', 'assigned_agent__user'
            )
        elif user.role == 'client':
            # Clients can only see their own service settings
            try:
                client = user.client_profile
                return ClientServiceSettings.objects.filter(
                    client=client
                ).select_related('assigned_agent', 'assigned_agent__user')
            except Client.DoesNotExist:
                return ClientServiceSettings.objects.none()
        elif user.role == 'agent':
            # Agents can see settings for their assigned clients
            try:
                agent = user.agent_profile
                return ClientServiceSettings.objects.filter(
                    assigned_agent=agent
                ).select_related('client', 'assigned_agent', 'assigned_agent__user')
            except:
                return ClientServiceSettings.objects.none()

        return ClientServiceSettings.objects.none()

    @action(detail=False, methods=['get'])
    def my_services(self, request):
        """Get the current client's active services"""
        try:
            client = request.user.client_profile
            service_settings = ClientServiceSettings.objects.filter(
                client=client,
                is_active=True
            ).select_related('assigned_agent', 'assigned_agent__user')

            serializer = self.get_serializer(service_settings, many=True)

            return Response({
                'active_services': client.active_services,
                'service_settings': serializer.data
            })
        except Client.DoesNotExist:
            return Response(
                {'error': 'Client profile not found'},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=['post'])
    def activate_service(self, request):
        """Activate a service for the current client"""
        service_type = request.data.get('service_type')

        if not service_type:
            return Response(
                {'error': 'service_type is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if service_type not in ['marketing', 'website', 'courses']:
            return Response(
                {'error': 'Invalid service_type. Must be: marketing, website, or courses'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            client = request.user.client_profile

            # Add to active_services if not already there
            if service_type not in client.active_services:
                client.active_services.append(service_type)
                client.save()

            # Create or activate service settings
            service_setting, created = ClientServiceSettings.objects.get_or_create(
                client=client,
                service_type=service_type,
                defaults={
                    'is_active': True,
                    'settings': {}
                }
            )

            if not created and not service_setting.is_active:
                service_setting.is_active = True
                service_setting.activation_date = timezone.now()
                service_setting.deactivation_date = None
                service_setting.save()

            serializer = self.get_serializer(service_setting)

            return Response({
                'message': f'{service_type.capitalize()} service activated successfully',
                'service_setting': serializer.data,
                'active_services': client.active_services
            }, status=status.HTTP_200_OK)

        except Client.DoesNotExist:
            return Response(
                {'error': 'Client profile not found'},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=['post'])
    def deactivate_service(self, request):
        """Deactivate a service for the current client"""
        service_type = request.data.get('service_type')

        if not service_type:
            return Response(
                {'error': 'service_type is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            client = request.user.client_profile

            # Remove from active_services
            if service_type in client.active_services:
                client.active_services.remove(service_type)
                client.save()

            # Deactivate service settings
            try:
                service_setting = ClientServiceSettings.objects.get(
                    client=client,
                    service_type=service_type
                )
                service_setting.is_active = False
                service_setting.deactivation_date = timezone.now()
                service_setting.save()

                serializer = self.get_serializer(service_setting)

                return Response({
                    'message': f'{service_type.capitalize()} service deactivated successfully',
                    'service_setting': serializer.data,
                    'active_services': client.active_services
                }, status=status.HTTP_200_OK)
            except ClientServiceSettings.DoesNotExist:
                return Response({
                    'message': f'{service_type.capitalize()} service removed from active services',
                    'active_services': client.active_services
                }, status=status.HTTP_200_OK)

        except Client.DoesNotExist:
            return Response(
                {'error': 'Client profile not found'},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=True, methods=['patch'])
    def update_settings(self, request, pk=None):
        """Update settings for a specific service"""
        service_setting = self.get_object()

        # Only allow client to update their own settings or admin
        if request.user.role == 'client':
            if service_setting.client.user != request.user:
                return Response(
                    {'error': 'You can only update your own service settings'},
                    status=status.HTTP_403_FORBIDDEN
                )

        settings_data = request.data.get('settings', {})

        # Merge with existing settings
        service_setting.settings.update(settings_data)
        service_setting.save()

        serializer = self.get_serializer(service_setting)

        return Response({
            'message': 'Service settings updated successfully',
            'service_setting': serializer.data
        }, status=status.HTTP_200_OK)
