# server/api/views/agent_views.py
# Views for agent management

from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from ..models import Agent, Client, User
from ..serializers import AgentSerializer, ClientSerializer


class AgentViewSet(viewsets.ModelViewSet):
    """ViewSet for managing agents (admin only)"""
    serializer_class = AgentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Filter agents based on user role"""
        user = self.request.user

        # Only admins can view agents
        if user.role == 'admin':
            return Agent.objects.all().select_related('user')

        # Agents can view their own profile
        elif user.role == 'agent':
            return Agent.objects.filter(user=user)

        # Clients cannot view agents
        return Agent.objects.none()

    def create(self, request, *args, **kwargs):
        """Create a new agent (admin only)"""
        if request.user.role != 'admin':
            return Response(
                {'error': 'Only admins can create agents'},
                status=status.HTTP_403_FORBIDDEN
            )

        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        """Update agent (admin only)"""
        if request.user.role != 'admin':
            return Response(
                {'error': 'Only admins can update agents'},
                status=status.HTTP_403_FORBIDDEN
            )

        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        """Delete agent (admin only)"""
        if request.user.role != 'admin':
            return Response(
                {'error': 'Only admins can delete agents'},
                status=status.HTTP_403_FORBIDDEN
            )

        agent = self.get_object()
        # Also delete the associated user account
        user = agent.user
        agent.delete()
        user.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['get'])
    def assigned_clients(self, request, pk=None):
        """Get all clients assigned to this agent"""
        agent = self.get_object()
        clients = Client.objects.filter(assigned_agent=agent)
        serializer = ClientSerializer(clients, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def assign_client(self, request, pk=None):
        """Assign a client to this agent (admin only)"""
        if request.user.role != 'admin':
            return Response(
                {'error': 'Only admins can assign clients to agents'},
                status=status.HTTP_403_FORBIDDEN
            )

        agent = self.get_object()
        client_id = request.data.get('client_id')

        if not client_id:
            return Response(
                {'error': 'client_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            client = Client.objects.get(id=client_id)

            # Check if agent can accept more clients
            if not agent.can_accept_clients:
                return Response(
                    {'error': 'Agent has reached maximum client capacity'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            client.assigned_agent = agent
            client.save()

            return Response({
                'message': 'Client assigned successfully',
                'agent': AgentSerializer(agent).data,
                'client': ClientSerializer(client, context={'request': request}).data
            })

        except Client.DoesNotExist:
            return Response(
                {'error': 'Client not found'},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=True, methods=['post'])
    def unassign_client(self, request, pk=None):
        """Unassign a client from this agent (admin only)"""
        if request.user.role != 'admin':
            return Response(
                {'error': 'Only admins can unassign clients from agents'},
                status=status.HTTP_403_FORBIDDEN
            )

        agent = self.get_object()
        client_id = request.data.get('client_id')

        if not client_id:
            return Response(
                {'error': 'client_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            client = Client.objects.get(id=client_id, assigned_agent=agent)
            client.assigned_agent = None
            client.save()

            return Response({
                'message': 'Client unassigned successfully',
                'client': ClientSerializer(client, context={'request': request}).data
            })

        except Client.DoesNotExist:
            return Response(
                {'error': 'Client not found or not assigned to this agent'},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=['get'])
    def available_agents(self, request):
        """Get list of agents that can accept more clients (admin only)"""
        if request.user.role != 'admin':
            return Response(
                {'error': 'Only admins can view available agents'},
                status=status.HTTP_403_FORBIDDEN
            )

        # Get agents that are active and have capacity
        agents = Agent.objects.filter(is_active=True).select_related('user')
        available = [agent for agent in agents if agent.can_accept_clients]

        serializer = AgentSerializer(available, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def stats(self, request, pk=None):
        """Get agent statistics"""
        agent = self.get_object()

        # Calculate statistics
        assigned_clients = Client.objects.filter(assigned_agent=agent)
        active_clients = assigned_clients.filter(status='active').count()
        total_clients = assigned_clients.count()

        stats = {
            'agent_id': str(agent.id),
            'agent_name': f"{agent.user.first_name} {agent.user.last_name}",
            'department': agent.department,
            'total_clients': total_clients,
            'active_clients': active_clients,
            'max_clients': agent.max_clients,
            'capacity_percentage': (total_clients / agent.max_clients * 100) if agent.max_clients > 0 else 0,
            'can_accept_clients': agent.can_accept_clients,
            'is_active': agent.is_active,
        }

        return Response(stats)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_agent_dashboard_stats(request):
    """Get dashboard statistics for logged-in agent"""
    user = request.user

    if user.role != 'agent':
        return Response(
            {'error': 'Only agents can access this endpoint'},
            status=status.HTTP_403_FORBIDDEN
        )

    try:
        agent = Agent.objects.get(user=user)

        # Get assigned clients
        assigned_clients = Client.objects.filter(assigned_agent=agent)
        active_clients = assigned_clients.filter(status='active')

        stats = {
            'total_clients': assigned_clients.count(),
            'active_clients': active_clients.count(),
            'pending_clients': assigned_clients.filter(status='pending').count(),
            'capacity_used': (assigned_clients.count() / agent.max_clients * 100) if agent.max_clients > 0 else 0,
            'max_clients': agent.max_clients,
            'department': agent.department,
            'specialization': agent.specialization,
        }

        # Add service-specific metrics (Phase 6)
        if agent.department == 'website':
            from ..models import WebsiteProject, WebsiteVersion
            # Website agent metrics
            website_projects = WebsiteProject.objects.filter(client__in=assigned_clients)
            stats['website_projects'] = {
                'total': website_projects.count(),
                'in_development': website_projects.filter(status='in_development').count(),
                'review': website_projects.filter(status='review').count(),
                'completed': website_projects.filter(status='completed').count(),
            }
            stats['versions_uploaded'] = WebsiteVersion.objects.filter(agent=agent).count()

        elif agent.department == 'marketing':
            from ..models import ContentPost, Campaign
            # Marketing agent metrics
            content_posts = ContentPost.objects.filter(client__in=assigned_clients)
            campaigns = Campaign.objects.filter(agent=agent)
            stats['content_posts'] = {
                'total': content_posts.count(),
                'draft': content_posts.filter(status='draft').count(),
                'pending': content_posts.filter(status='pending').count(),
                'approved': content_posts.filter(status='approved').count(),
                'posted': content_posts.filter(status='posted').count(),
            }
            stats['campaigns'] = {
                'total': campaigns.count(),
                'active': campaigns.filter(status='active').count(),
                'completed': campaigns.filter(status='completed').count(),
            }

        return Response(stats)

    except Agent.DoesNotExist:
        return Response(
            {'error': 'Agent profile not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_clients(request):
    """Get clients assigned to the logged-in agent"""
    user = request.user

    if user.role != 'agent':
        return Response(
            {'error': 'Only agents can access this endpoint'},
            status=status.HTTP_403_FORBIDDEN
        )

    try:
        agent = Agent.objects.get(user=user)
        clients = Client.objects.filter(assigned_agent=agent).select_related('user')
        serializer = ClientSerializer(clients, many=True, context={'request': request})
        return Response(serializer.data)

    except Agent.DoesNotExist:
        return Response(
            {'error': 'Agent profile not found'},
            status=status.HTTP_404_NOT_FOUND
        )
