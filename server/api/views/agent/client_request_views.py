# File: server/api/views/agent/client_request_views.py
# Agent Client Access Request Views

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.utils import timezone

from ...models import Client, ClientAccessRequest, Agent, User, Notification, ClientServiceSettings
from ...serializers import ClientAccessRequestSerializer, ClientAccessRequestCreateSerializer, ClientSerializer, AgentSerializer


class ClientAccessRequestViewSet(viewsets.ModelViewSet):
    """ViewSet for client access requests"""
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Filter requests based on user role"""
        if self.request.user.role == 'admin':
            # Admins see all requests
            return ClientAccessRequest.objects.all()
        elif self.request.user.role == 'agent':
            # Agents see only their own requests
            try:
                return ClientAccessRequest.objects.filter(agent=self.request.user.agent_profile)
            except:
                return ClientAccessRequest.objects.none()
        return ClientAccessRequest.objects.none()

    def get_serializer_class(self):
        if self.action == 'create':
            return ClientAccessRequestCreateSerializer
        return ClientAccessRequestSerializer

    def create(self, request, *args, **kwargs):
        """Create a new client access request"""
        # Check if user is an agent
        if request.user.role != 'agent':
            return Response({
                'error': 'Only agents can request client access'
            }, status=status.HTTP_403_FORBIDDEN)

        try:
            agent = request.user.agent_profile
        except:
            return Response({
                'error': 'Agent profile not found'
            }, status=status.HTTP_404_NOT_FOUND)

        # Check if agent can accept more clients
        if not agent.can_accept_clients:
            return Response({
                'error': f'You have reached your maximum client limit ({agent.max_clients})'
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        client = serializer.validated_data['client']
        service_type = serializer.validated_data['service_type']

        # Validate that service_type matches agent's department
        if service_type != agent.department:
            return Response({
                'error': f'You can only request access for {agent.get_department_display()} services. This request is for {service_type}.'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Validate that client is eligible for this service type based on their classification
        client_type = client.client_type

        # Marketing agents can only request marketing or full clients
        if agent.department == 'marketing' and client_type not in ['marketing', 'full']:
            return Response({
                'error': f'This client is not eligible for marketing services. Client type: {client_type}. Please connect a social media account first.'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Website agents can only request website or full clients
        if agent.department == 'website' and client_type not in ['website', 'full']:
            return Response({
                'error': f'This client is not eligible for website services. Client type: {client_type}. Please start a website project first.'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Check if client already has an agent assigned for this service
        existing_service = ClientServiceSettings.objects.filter(
            client=client,
            service_type=service_type,
            assigned_agent__isnull=False
        ).first()

        if existing_service:
            return Response({
                'error': f'This client already has an agent assigned for {service_type} services: {existing_service.assigned_agent.user.get_full_name()}'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Check if there's already a pending request for this client and service
        existing_request = ClientAccessRequest.objects.filter(
            agent=agent,
            client=client,
            service_type=service_type,
            status='pending'
        ).first()

        if existing_request:
            return Response({
                'error': f'You already have a pending request for this client ({service_type} service)'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Create the request
        access_request = serializer.save()

        # Notify all admins
        admins = User.objects.filter(role='admin')
        for admin in admins:
            Notification.objects.create(
                user=admin,
                title='New Client Access Request',
                message=f'{agent.user.get_full_name()} ({agent.get_department_display()}) has requested access to {client.name} for {service_type} services',
                notification_type='general'
            )

        return Response(
            ClientAccessRequestSerializer(access_request).data,
            status=status.HTTP_201_CREATED
        )

    @action(detail=False, methods=['get'])
    def available_clients(self, request):
        """Get list of clients that don't have an agent for the requesting agent's service type"""
        if request.user.role != 'agent':
            return Response({
                'error': 'Only agents can view available clients'
            }, status=status.HTTP_403_FORBIDDEN)

        try:
            agent = request.user.agent_profile
        except:
            return Response({
                'error': 'Agent profile not found'
            }, status=status.HTTP_404_NOT_FOUND)

        # Get all clients
        all_clients = Client.objects.filter(status='active')
        available_clients = []

        for client in all_clients:
            # Check if client has an agent for this service type
            service_setting = ClientServiceSettings.objects.filter(
                client=client,
                service_type=agent.department,
                assigned_agent__isnull=False
            ).first()

            # Client is available if no agent assigned for this service
            if not service_setting:
                available_clients.append(client)

        serializer = ClientSerializer(available_clients, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def pending_requests(self, request):
        """Get all pending requests (admin only)"""
        if request.user.role != 'admin':
            return Response({
                'error': 'Only admins can view all pending requests'
            }, status=status.HTTP_403_FORBIDDEN)

        # Optional service_type filter
        service_type = request.query_params.get('service_type', None)

        pending = ClientAccessRequest.objects.filter(status='pending')
        if service_type:
            pending = pending.filter(service_type=service_type)

        serializer = self.get_serializer(pending, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        """Approve a client access request (admin only)"""
        if request.user.role != 'admin':
            return Response({
                'error': 'Only admins can approve requests'
            }, status=status.HTTP_403_FORBIDDEN)

        access_request = self.get_object()

        if access_request.status != 'pending':
            return Response({
                'error': f'This request has already been {access_request.status}'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Check if client already has an agent for this service
        existing_service = ClientServiceSettings.objects.filter(
            client=access_request.client,
            service_type=access_request.service_type,
            assigned_agent__isnull=False
        ).first()

        if existing_service:
            return Response({
                'error': f'This client already has an agent for {access_request.service_type} services'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Get or create ClientServiceSettings for this service
        service_settings, created = ClientServiceSettings.objects.get_or_create(
            client=access_request.client,
            service_type=access_request.service_type,
            defaults={'is_active': True}
        )

        # Assign the agent to this service
        service_settings.assigned_agent = access_request.agent
        service_settings.is_active = True
        service_settings.save()

        # Also update Client.assigned_agent if it's empty (for backwards compatibility)
        if not access_request.client.assigned_agent:
            access_request.client.assigned_agent = access_request.agent
            access_request.client.save()

        # Update request status
        access_request.status = 'approved'
        access_request.reviewed_by = request.user
        access_request.reviewed_at = timezone.now()
        access_request.review_note = request.data.get('review_note', '')
        access_request.save()

        # Notify the agent
        Notification.objects.create(
            user=access_request.agent.user,
            title='Client Access Request Approved',
            message=f'Your request to access {access_request.client.name} for {access_request.service_type} services has been approved!',
            notification_type='general'
        )

        return Response({
            'message': 'Request approved successfully',
            'request': ClientAccessRequestSerializer(access_request).data
        })

    @action(detail=True, methods=['post'])
    def deny(self, request, pk=None):
        """Deny a client access request (admin only)"""
        if request.user.role != 'admin':
            return Response({
                'error': 'Only admins can deny requests'
            }, status=status.HTTP_403_FORBIDDEN)

        access_request = self.get_object()

        if access_request.status != 'pending':
            return Response({
                'error': f'This request has already been {access_request.status}'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Update request status
        access_request.status = 'denied'
        access_request.reviewed_by = request.user
        access_request.reviewed_at = timezone.now()
        access_request.review_note = request.data.get('review_note', 'Request denied')
        access_request.save()

        # Notify the agent
        Notification.objects.create(
            user=access_request.agent.user,
            title='Client Access Request Denied',
            message=f'Your request to access {access_request.client.name} has been denied. Reason: {access_request.review_note}',
            notification_type='general'
        )

        return Response({
            'message': 'Request denied successfully',
            'request': ClientAccessRequestSerializer(access_request).data
        })

    @action(detail=False, methods=['post'])
    def assign_client(self, request):
        """Assign a client to an agent (admin only)"""
        if request.user.role != 'admin':
            return Response({
                'error': 'Only admins can assign clients'
            }, status=status.HTTP_403_FORBIDDEN)

        agent_id = request.data.get('agent_id')
        client_id = request.data.get('client_id')

        if not agent_id or not client_id:
            return Response({
                'error': 'agent_id and client_id are required'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Get agent and client
        agent = get_object_or_404(Agent, id=agent_id)
        client = get_object_or_404(Client, id=client_id)

        # Check if agent can accept more clients
        if not agent.can_accept_clients:
            return Response({
                'error': f'Agent {agent.user.get_full_name()} has reached maximum client limit ({agent.max_clients})'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Check if client already has an agent
        if client.assigned_agent:
            return Response({
                'error': f'Client is already assigned to {client.assigned_agent.user.get_full_name()}'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Assign the client
        client.assigned_agent = agent
        client.save()

        # Notify the agent
        Notification.objects.create(
            user=agent.user,
            title='New Client Assigned',
            message=f'You have been assigned a new client: {client.name}',
            notification_type='general'
        )

        return Response({
            'message': f'Client {client.name} assigned to {agent.user.get_full_name()} successfully',
            'client': ClientSerializer(client).data
        })

    @action(detail=False, methods=['post'])
    def transfer_client(self, request):
        """Transfer a client from one agent to another (admin only)"""
        if request.user.role != 'admin':
            return Response({
                'error': 'Only admins can transfer clients'
            }, status=status.HTTP_403_FORBIDDEN)

        client_id = request.data.get('client_id')
        new_agent_id = request.data.get('new_agent_id')

        if not client_id or not new_agent_id:
            return Response({
                'error': 'client_id and new_agent_id are required'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Get client and new agent
        client = get_object_or_404(Client, id=client_id)
        new_agent = get_object_or_404(Agent, id=new_agent_id)

        # Check if client has a current agent
        if not client.assigned_agent:
            return Response({
                'error': 'Client is not currently assigned to any agent'
            }, status=status.HTTP_400_BAD_REQUEST)

        old_agent = client.assigned_agent

        # Check if agents are from the same department
        if old_agent.department != new_agent.department:
            return Response({
                'error': f'Cannot transfer client between different departments. Old agent is {old_agent.get_department_display()}, new agent is {new_agent.get_department_display()}'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Check if new agent can accept more clients
        if not new_agent.can_accept_clients:
            return Response({
                'error': f'Agent {new_agent.user.get_full_name()} has reached maximum client limit ({new_agent.max_clients})'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Transfer the client
        client.assigned_agent = new_agent
        client.save()

        # Notify both agents
        Notification.objects.create(
            user=old_agent.user,
            title='Client Transferred',
            message=f'Client {client.name} has been transferred to {new_agent.user.get_full_name()}',
            notification_type='general'
        )

        Notification.objects.create(
            user=new_agent.user,
            title='New Client Transferred',
            message=f'Client {client.name} has been transferred to you from {old_agent.user.get_full_name()}',
            notification_type='general'
        )

        return Response({
            'message': f'Client {client.name} transferred from {old_agent.user.get_full_name()} to {new_agent.user.get_full_name()} successfully',
            'client': ClientSerializer(client).data
        })

    @action(detail=False, methods=['post'])
    def unassign_client(self, request):
        """Unassign a client from an agent (admin only)"""
        if request.user.role != 'admin':
            return Response({
                'error': 'Only admins can unassign clients'
            }, status=status.HTTP_403_FORBIDDEN)

        client_id = request.data.get('client_id')

        if not client_id:
            return Response({
                'error': 'client_id is required'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Get client
        client = get_object_or_404(Client, id=client_id)

        # Check if client has an assigned agent
        if not client.assigned_agent:
            return Response({
                'error': 'Client is not currently assigned to any agent'
            }, status=status.HTTP_400_BAD_REQUEST)

        old_agent = client.assigned_agent

        # Unassign the client
        client.assigned_agent = None
        client.save()

        # Notify the agent
        Notification.objects.create(
            user=old_agent.user,
            title='Client Unassigned',
            message=f'Client {client.name} has been unassigned from you',
            notification_type='general'
        )

        return Response({
            'message': f'Client {client.name} unassigned from {old_agent.user.get_full_name()} successfully',
            'client': ClientSerializer(client).data
        })

    @action(detail=False, methods=['get'])
    def agents_with_requests(self, request):
        """Get all agents with their pending client requests (admin only)"""
        if request.user.role != 'admin':
            return Response({
                'error': 'Only admins can view this information'
            }, status=status.HTTP_403_FORBIDDEN)

        # Get all agents
        agents = Agent.objects.all().select_related('user').prefetch_related('client_requests', 'assigned_clients')

        agents_data = []
        for agent in agents:
            # Get pending requests for this agent
            pending_requests = ClientAccessRequest.objects.filter(
                agent=agent,
                status='pending'
            ).select_related('client')

            # Serialize agent data
            agent_data = AgentSerializer(agent).data

            # Add pending requests
            agent_data['pending_requests'] = ClientAccessRequestSerializer(pending_requests, many=True).data
            agent_data['pending_requests_count'] = pending_requests.count()

            # Add service-specific assigned clients count
            service_clients_count = ClientServiceSettings.objects.filter(
                assigned_agent=agent,
                is_active=True
            ).count()
            agent_data['service_clients_count'] = service_clients_count

            # Keep backwards compatibility
            agent_data['assigned_clients_count'] = agent.assigned_clients.filter(status='active').count()

            agents_data.append(agent_data)

        return Response(agents_data)
