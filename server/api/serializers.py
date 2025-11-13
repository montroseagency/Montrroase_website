# File: server/api/serializers.py
# Django REST Framework Serializers for SMMA Dashboard

from django.utils import timezone 
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import (
    ContentImage, ContentRequest, ContentRequestImage, User, Client, Task, ContentPost, PerformanceData,
    Message, Invoice, TeamMember, Project, File, Notification,
    SocialMediaAccount, RealTimeMetrics, WebsiteProject, WebsitePhase,
    Course, CourseModule, CourseLesson, CourseProgress, CourseCertificate, CoursePurchase,
    Wallet, Transaction, WalletAutoRecharge, Giveaway, GiveawayWinner, SupportTicket, TicketMessage,
    Agent, ClientServiceSettings, WebsiteVersion, Campaign, ContentSchedule, ClientAccessRequest
)

class UserSerializer(serializers.ModelSerializer):
    """User serializer for authentication and profile"""
    avatar = serializers.SerializerMethodField()
    agent_profile = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'company', 'avatar', 'bio', 'agent_profile']
        read_only_fields = ['id']

    def get_avatar(self, obj):
        """Return full URL for avatar"""
        if obj.avatar:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.avatar.url)
            return obj.avatar.url
        return None

    def get_agent_profile(self, obj):
        """Return agent profile data if user is an agent"""
        if obj.role == 'agent':
            try:
                agent = obj.agent_profile
                return {
                    'id': str(agent.id),
                    'department': agent.department,
                    'specialization': agent.specialization,
                    'is_active': agent.is_active,
                    'max_clients': agent.max_clients,
                    'current_client_count': agent.current_client_count,
                    'can_accept_clients': agent.can_accept_clients,
                }
            except:
                return None
        return None

class UserRegistrationSerializer(serializers.ModelSerializer):
    """User registration serializer - FIXED to always create client profiles"""
    password = serializers.CharField(write_only=True, min_length=8)
    name = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'name', 'role', 'company']

    def create(self, validated_data):
        name = validated_data.pop('name')
        name_parts = name.split(' ', 1)
        validated_data['first_name'] = name_parts[0]
        validated_data['last_name'] = name_parts[1] if len(name_parts) > 1 else ''
        validated_data['username'] = validated_data['email']
        
        user = User.objects.create_user(**validated_data)
        
        # ALWAYS create client profile for any user with FREE plan by default
        # This ensures every user has a client profile for billing purposes
        try:
            from django.utils import timezone
            from datetime import timedelta
            from .models import Wallet
            future_date = timezone.now().date() + timedelta(days=30)

            client = Client.objects.create(
                user=user,
                name=name,
                email=validated_data['email'],
                company=validated_data.get('company', '') or 'Unknown Company',
                package='free',  # Default FREE plan for all new users
                monthly_fee=0,
                start_date=timezone.now().date(),
                status='active',  # Set to active immediately for free plan
                payment_status='none',  # No payment required for free plan
                next_payment=None,  # No payment required for free plan
                current_plan='none',  # No plan selected initially
                paypal_subscription_id=None,
                paypal_customer_id=None,
            )

            # Create wallet for the client
            try:
                Wallet.objects.create(
                    client=client,
                    balance=0.00  # Start with zero balance
                )
                print(f"Created wallet for new user: {user.email}")
            except Exception as wallet_error:
                print(f"WARNING: Failed to create wallet for {user.email}: {wallet_error}")

            print(f"Created client profile with FREE plan for new user: {user.email}")
        except Exception as e:
            print(f"ERROR: Failed to create client profile for {user.email}: {e}")
            import traceback
            traceback.print_exc()
            # Don't fail registration if client profile creation fails
            pass
        
        return user

class UserLoginSerializer(serializers.Serializer):
    """User login serializer"""
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(username=email, password=password)
            if user:
                if not user.is_active:
                    raise serializers.ValidationError('User account is disabled.')
                data['user'] = user
            else:
                raise serializers.ValidationError('Unable to log in with provided credentials.')
        else:
            raise serializers.ValidationError('Must include email and password.')

        return data

# Agent Serializer
class AgentSerializer(serializers.ModelSerializer):
    """Agent serializer with user information"""
    user = UserSerializer(read_only=True)
    current_client_count = serializers.ReadOnlyField()
    can_accept_clients = serializers.ReadOnlyField()
    user_id = serializers.UUIDField(write_only=True, required=False)
    email = serializers.EmailField(write_only=True, required=False)
    password = serializers.CharField(write_only=True, required=False, min_length=8)
    first_name = serializers.CharField(write_only=True, required=False)
    last_name = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Agent
        fields = [
            'id', 'user', 'user_id', 'email', 'password', 'first_name', 'last_name',
            'department', 'specialization', 'is_active', 'max_clients',
            'current_client_count', 'can_accept_clients', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'current_client_count', 'can_accept_clients']

    def validate(self, data):
        """Validate that required fields are present for creation"""
        # If this is a create operation (no instance), require user fields
        if not self.instance:
            required_fields = ['email', 'password', 'first_name', 'last_name']
            missing_fields = [field for field in required_fields if not data.get(field)]

            if missing_fields:
                raise serializers.ValidationError({
                    field: 'This field is required for creating an agent.'
                    for field in missing_fields
                })

        return data

    def create(self, validated_data):
        """Create agent with user account"""
        # Extract user fields
        email = validated_data.pop('email')
        password = validated_data.pop('password')
        first_name = validated_data.pop('first_name', '')
        last_name = validated_data.pop('last_name', '')

        # Create user account
        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            role='agent'
        )

        # Create agent profile
        agent = Agent.objects.create(user=user, **validated_data)
        return agent


class ClientAccessRequestSerializer(serializers.ModelSerializer):
    """Serializer for client access requests"""
    agent_name = serializers.CharField(source='agent.user.get_full_name', read_only=True)
    agent_department = serializers.CharField(source='agent.department', read_only=True)
    client_name = serializers.CharField(source='client.name', read_only=True)
    client_company = serializers.CharField(source='client.company', read_only=True)
    reviewed_by_name = serializers.CharField(source='reviewed_by.get_full_name', read_only=True)

    class Meta:
        model = ClientAccessRequest
        fields = [
            'id', 'agent', 'agent_name', 'agent_department', 'client', 'client_name',
            'client_company', 'service_type', 'reason', 'status', 'reviewed_by', 'reviewed_by_name',
            'review_note', 'created_at', 'reviewed_at'
        ]
        read_only_fields = ['id', 'agent', 'status', 'reviewed_by', 'reviewed_at', 'created_at']


class ClientAccessRequestCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating client access requests"""

    class Meta:
        model = ClientAccessRequest
        fields = ['client', 'service_type', 'reason']

    def create(self, validated_data):
        # Get agent from request context
        request = self.context.get('request')
        validated_data['agent'] = request.user.agent_profile
        return super().create(validated_data)


# ADD MISSING SOCIAL MEDIA SERIALIZERS
class SocialMediaAccountSerializer(serializers.ModelSerializer):
    """Social Media Account serializer"""
    client_name = serializers.CharField(source='client.name', read_only=True)
    
    class Meta:
        model = SocialMediaAccount
        fields = [
            'id', 'client', 'client_name', 'platform', 'account_id',
            'username', 'is_active', 'last_sync', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'last_sync']
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        
        # Get latest metrics
        try:
            latest_metrics = RealTimeMetrics.objects.filter(
                account=instance
            ).order_by('-date').first()
            
            if latest_metrics:
                data['followers_count'] = latest_metrics.followers_count
                data['engagement_rate'] = float(latest_metrics.engagement_rate)
                data['posts_count'] = latest_metrics.posts_count
            else:
                data['followers_count'] = 0
                data['engagement_rate'] = 0
                data['posts_count'] = 0
        except:
            data['followers_count'] = 0
            data['engagement_rate'] = 0
            data['posts_count'] = 0
            
        return data

class RealTimeMetricsSerializer(serializers.ModelSerializer):
    """Real-time metrics serializer"""
    account_username = serializers.CharField(source='account.username', read_only=True)
    account_platform = serializers.CharField(source='account.platform', read_only=True)
    
    class Meta:
        model = RealTimeMetrics
        fields = [
            'id', 'account', 'account_username', 'account_platform', 'date',
            'followers_count', 'following_count', 'posts_count', 'engagement_rate',
            'reach', 'impressions', 'profile_views', 'website_clicks',
            'daily_growth', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class ClientServiceSettingsSerializer(serializers.ModelSerializer):
    """Serializer for client service settings"""
    service_type_display = serializers.CharField(source='get_service_type_display', read_only=True)
    assigned_agent_name = serializers.SerializerMethodField()
    assigned_agent_department = serializers.CharField(source='assigned_agent.department', read_only=True)

    class Meta:
        model = ClientServiceSettings
        fields = [
            'id', 'client', 'service_type', 'service_type_display',
            'is_active', 'settings', 'assigned_agent', 'assigned_agent_name',
            'assigned_agent_department', 'activation_date', 'deactivation_date',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_assigned_agent_name(self, obj):
        if obj.assigned_agent:
            return f"{obj.assigned_agent.user.first_name} {obj.assigned_agent.user.last_name}"
        return None


class ClientSerializer(serializers.ModelSerializer):
    """Enhanced Client serializer with user info and classification"""
    user_id = serializers.CharField(source='user.id', read_only=True)
    user_first_name = serializers.CharField(source='user.first_name', read_only=True)
    user_last_name = serializers.CharField(source='user.last_name', read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)
    user_avatar = serializers.ImageField(source='user.avatar', read_only=True)
    assigned_agent_name = serializers.SerializerMethodField()
    assigned_agent_email = serializers.SerializerMethodField()
    service_settings = ClientServiceSettingsSerializer(many=True, read_only=True)

    # Client classification fields
    client_type = serializers.ReadOnlyField()
    has_social_accounts = serializers.ReadOnlyField()
    has_website_projects = serializers.ReadOnlyField()
    needs_marketing_agent = serializers.ReadOnlyField()
    needs_website_agent = serializers.ReadOnlyField()

    # Service-specific agent assignments
    marketing_agent_id = serializers.SerializerMethodField()
    marketing_agent_name = serializers.SerializerMethodField()
    website_agent_id = serializers.SerializerMethodField()
    website_agent_name = serializers.SerializerMethodField()

    class Meta:
        model = Client
        fields = [
            'id', 'name', 'email', 'company', 'package', 'monthly_fee',
            'start_date', 'status', 'payment_status', 'platforms',
            'assigned_agent', 'assigned_agent_name', 'assigned_agent_email',
            'next_payment', 'total_spent', 'notes',
            'created_at', 'updated_at',
            # Add user fields
            'user_id', 'user_first_name', 'user_last_name', 'user_email', 'user_avatar',
            # Multi-service fields
            'active_services', 'service_settings',
            # Client classification
            'client_type', 'has_social_accounts', 'has_website_projects',
            'needs_marketing_agent', 'needs_website_agent',
            # Service-specific agents
            'marketing_agent_id', 'marketing_agent_name',
            'website_agent_id', 'website_agent_name'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'user_id', 'user_first_name', 'user_last_name', 'user_email', 'user_avatar']

    def get_assigned_agent_name(self, obj):
        if obj.assigned_agent:
            return f"{obj.assigned_agent.user.first_name} {obj.assigned_agent.user.last_name}"
        return None

    def get_assigned_agent_email(self, obj):
        if obj.assigned_agent:
            return obj.assigned_agent.user.email
        return None

    def get_marketing_agent_id(self, obj):
        """Get marketing agent ID"""
        agent = obj.marketing_agent
        return str(agent.id) if agent else None

    def get_marketing_agent_name(self, obj):
        """Get marketing agent name"""
        agent = obj.marketing_agent
        return f"{agent.user.first_name} {agent.user.last_name}" if agent else None

    def get_website_agent_id(self, obj):
        """Get website agent ID"""
        agent = obj.website_agent
        return str(agent.id) if agent else None

    def get_website_agent_name(self, obj):
        """Get website agent name"""
        agent = obj.website_agent
        return f"{agent.user.first_name} {agent.user.last_name}" if agent else None


class TaskSerializer(serializers.ModelSerializer):
    """Task serializer"""
    client_name = serializers.CharField(source='client.name', read_only=True)
    
    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'client', 'client_name',
            'assigned_to', 'status', 'priority', 'due_date',
            'completed_at', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class ContentImageSerializer(serializers.ModelSerializer):
    """Content image serializer"""
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = ContentImage
        fields = ['id', 'image', 'image_url', 'caption', 'order', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        elif obj.image:
            return obj.image.url
        return None


class ContentPostSerializer(serializers.ModelSerializer):
    """Content post serializer"""
    client_name = serializers.CharField(source='client.name', read_only=True)
    approved_by_name = serializers.CharField(source='approved_by.get_full_name', read_only=True)
    images = ContentImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )
    social_account_username = serializers.CharField(source='social_account.username', read_only=True)
    
    class Meta:
        model = ContentPost
        fields = [
            'id', 'client', 'client_name', 'social_account', 'social_account_username',
            'platform', 'title', 'content', 'scheduled_date', 'status',
            'images', 'uploaded_images', 'admin_message', 'post_url',
            'engagement_rate', 'likes', 'comments', 'shares', 'views',
            'approved_by', 'approved_by_name', 'approved_at', 'posted_at',
            'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'client', 'created_at', 'updated_at', 
            'approved_at', 'posted_at', 'engagement_rate',
            'likes', 'comments', 'shares', 'views'
        ]
    
    def create(self, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', [])
        
        # Create the content post
        content_post = ContentPost.objects.create(**validated_data)
        
        # Handle image uploads
        for i, image in enumerate(uploaded_images):
            ContentImage.objects.create(
                content_post=content_post,
                image=image,
                order=i
            )
        
        return content_post
    
    def update(self, instance, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', None)
        
        # Update content post
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Handle new images if provided
        if uploaded_images is not None:
            # Optionally delete old images or add new ones
            for i, image in enumerate(uploaded_images):
                ContentImage.objects.create(
                    content_post=instance,
                    image=image,
                    order=instance.images.count() + i
                )
        
        return instance


class ContentRequestImageSerializer(serializers.ModelSerializer):
    """Content request image serializer"""
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ContentRequestImage
        fields = ['id', 'image', 'image_url', 'caption', 'order', 'created_at']
        read_only_fields = ['id', 'created_at']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        elif obj.image:
            return obj.image.url
        return None


class ContentRequestSerializer(serializers.ModelSerializer):
    """Content request serializer"""
    reference_images = ContentRequestImageSerializer(many=True, read_only=True)
    client_name = serializers.CharField(source='client.name', read_only=True)
    created_content_id = serializers.UUIDField(source='created_content.id', read_only=True, allow_null=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = ContentRequest
        fields = [
            'id', 'client', 'client_name', 'platform', 'title',
            'description', 'status', 'preferred_date', 'notes',
            'agent_notes', 'created_content_id', 'reference_images', 'uploaded_images',
            'created_at', 'updated_at', 'completed_at'
        ]
        read_only_fields = ['id', 'client_name', 'created_at', 'updated_at', 'completed_at', 'created_content_id']

    def create(self, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', [])
        content_request = ContentRequest.objects.create(**validated_data)

        # Create reference images
        for i, image in enumerate(uploaded_images):
            ContentRequestImage.objects.create(
                content_request=content_request,
                image=image,
                order=i
            )

        return content_request

    def update(self, instance, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', None)

        # Update content request
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Handle new images if provided
        if uploaded_images is not None:
            for i, image in enumerate(uploaded_images):
                ContentRequestImage.objects.create(
                    content_request=instance,
                    image=image,
                    order=instance.reference_images.count() + i
                )

        return instance


class PerformanceDataSerializer(serializers.ModelSerializer):
    """Performance data serializer"""
    client_name = serializers.CharField(source='client.name', read_only=True)

    class Meta:
        model = PerformanceData
        fields = [
            'id', 'client', 'client_name', 'month', 'followers',
            'engagement', 'reach', 'clicks', 'impressions',
            'growth_rate', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class MessageSerializer(serializers.ModelSerializer):
    """Message serializer"""
    sender_name = serializers.CharField(source='sender.get_full_name', read_only=True)
    receiver_name = serializers.CharField(source='receiver.get_full_name', read_only=True)
    
    class Meta:
        model = Message
        fields = [
            'id', 'sender', 'sender_name', 'receiver', 'receiver_name',
            'content', 'read', 'timestamp'
        ]
        read_only_fields = ['id', 'sender', 'timestamp']

class InvoiceSerializer(serializers.ModelSerializer):
    """Invoice serializer"""
    client_name = serializers.CharField(source='client.name', read_only=True)
    
    class Meta:
        model = Invoice
        fields = [
            'id', 'client', 'client_name', 'invoice_number', 'amount',
            'due_date', 'status', 'paid_at', 'description',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class TeamMemberSerializer(serializers.ModelSerializer):
    """Team member serializer"""
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)
    
    class Meta:
        model = TeamMember
        fields = [
            'id', 'user', 'user_name', 'user_email', 'position',
            'department', 'hourly_rate', 'is_active', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

class ProjectSerializer(serializers.ModelSerializer):
    """Project serializer"""
    client_name = serializers.CharField(source='client.name', read_only=True)
    team_member_names = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = [
            'id', 'name', 'description', 'client', 'client_name',
            'team_members', 'team_member_names', 'status', 'start_date',
            'end_date', 'budget', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_team_member_names(self, obj):
        return [member.user.get_full_name() for member in obj.team_members.all()]

class FileSerializer(serializers.ModelSerializer):
    """File serializer"""
    client_name = serializers.CharField(source='client.name', read_only=True)
    uploaded_by_name = serializers.CharField(source='uploaded_by.get_full_name', read_only=True)
    
    class Meta:
        model = File
        fields = [
            'id', 'name', 'file', 'file_type', 'client', 'client_name',
            'uploaded_by', 'uploaded_by_name', 'size', 'created_at'
        ]
        read_only_fields = ['id', 'uploaded_by', 'size', 'created_at']

class NotificationSerializer(serializers.ModelSerializer):
    """Notification serializer"""
    class Meta:
        model = Notification
        fields = [
            'id', 'user', 'title', 'message', 'notification_type',
            'read', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

# Dashboard Statistics Serializers
class DashboardStatsSerializer(serializers.Serializer):
    """Dashboard statistics serializer"""
    total_revenue = serializers.DecimalField(max_digits=10, decimal_places=2)
    active_clients = serializers.IntegerField()
    pending_tasks = serializers.IntegerField()
    overdue_payments = serializers.IntegerField()
    total_followers_delivered = serializers.IntegerField()
    monthly_growth_rate = serializers.DecimalField(max_digits=5, decimal_places=2)

class ClientDashboardStatsSerializer(serializers.Serializer):
    """Client dashboard statistics serializer"""
    total_followers = serializers.IntegerField()
    engagement_rate = serializers.DecimalField(max_digits=5, decimal_places=2)
    posts_this_month = serializers.IntegerField()
    reach = serializers.IntegerField()
    growth_rate = serializers.DecimalField(max_digits=5, decimal_places=2)
    next_payment_amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    next_payment_date = serializers.DateField()

# Bulk Operations Serializers
class BulkTaskUpdateSerializer(serializers.Serializer):
    """Bulk task update serializer"""
    task_ids = serializers.ListField(child=serializers.UUIDField())
    status = serializers.ChoiceField(choices=Task.STATUS_CHOICES, required=False)
    assigned_to = serializers.CharField(max_length=255, required=False)
    priority = serializers.ChoiceField(choices=Task.PRIORITY_CHOICES, required=False)

class BulkContentApprovalSerializer(serializers.Serializer):
    """Bulk content approval serializer"""
    content_ids = serializers.ListField(child=serializers.UUIDField())
    action = serializers.ChoiceField(choices=['approve', 'reject'])
    feedback = serializers.CharField(max_length=500, required=False)

# Analytics Serializers
class MonthlyPerformanceSerializer(serializers.Serializer):
    """Monthly performance analytics serializer"""
    month = serializers.DateField()
    total_followers = serializers.IntegerField()
    total_engagement = serializers.DecimalField(max_digits=5, decimal_places=2)
    total_reach = serializers.IntegerField()
    total_clicks = serializers.IntegerField()
    growth_rate = serializers.DecimalField(max_digits=5, decimal_places=2)

class ClientPerformanceReportSerializer(serializers.Serializer):
    """Client performance report serializer"""
    client_name = serializers.CharField()
    period = serializers.CharField()
    metrics = MonthlyPerformanceSerializer(many=True)
    summary = serializers.DictField()

# File Upload Serializers
class FileUploadSerializer(serializers.ModelSerializer):
    """File upload serializer"""
    class Meta:
        model = File
        fields = ['name', 'file', 'file_type', 'client']
    
    def create(self, validated_data):
        validated_data['uploaded_by'] = self.context['request'].user
        validated_data['size'] = validated_data['file'].size
        return super().create(validated_data)

# Additional Serializers for New Features
# Append this to serializers.py

from rest_framework import serializers
from .models import (
    WebsiteProject, WebsitePhase, Course, CourseModule, CourseLesson,
    CourseProgress, CourseCertificate, Wallet, Transaction, Giveaway,
    GiveawayWinner, SupportTicket, TicketMessage
)

# ==================== WEBSITE BUILDER SERIALIZERS ====================

class WebsitePhaseSerializer(serializers.ModelSerializer):
    """Serializer for website project phases"""
    class Meta:
        model = WebsitePhase
        fields = [
            'id', 'phase_number', 'title', 'description', 'amount',
            'status', 'deliverables', 'payment_due_date', 'paid_at',
            'started_at', 'completed_at', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class WebsiteProjectSerializer(serializers.ModelSerializer):
    """Serializer for website building projects"""
    phases = WebsitePhaseSerializer(many=True, read_only=True)
    progress_percentage = serializers.ReadOnlyField()
    client_name = serializers.SerializerMethodField()
    developer_name = serializers.SerializerMethodField()

    class Meta:
        model = WebsiteProject
        fields = [
            'id', 'client', 'client_name', 'title', 'industry', 'business_goals',
            'preferred_style', 'desired_features', 'target_audience', 'competitor_sites',
            'estimated_cost_min', 'estimated_cost_max', 'estimated_hours',
            'complexity_score', 'ai_recommendations', 'demo_url', 'demo_screenshots',
            'status', 'total_amount', 'paid_amount', 'current_phase', 'total_phases',
            'assigned_developer', 'developer_name', 'started_at', 'estimated_completion',
            'completed_at', 'created_at', 'updated_at', 'phases', 'progress_percentage'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'progress_percentage']

    def get_client_name(self, obj):
        return obj.client.name

    def get_developer_name(self, obj):
        if obj.assigned_developer:
            return f"{obj.assigned_developer.first_name} {obj.assigned_developer.last_name}"
        return None


class WebsiteProjectCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating website projects from questionnaire"""
    # Accept both frontend field names and model field names
    project_name = serializers.CharField(write_only=True, required=False)
    design_preferences = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = WebsiteProject
        fields = [
            'title', 'project_name', 'industry', 'business_goals', 'preferred_style',
            'design_preferences', 'desired_features', 'target_audience', 'competitor_sites',
            'content_requirements', 'timeline_expectations', 'budget_range', 'additional_notes'
        ]
        extra_kwargs = {
            'title': {'required': False},
            'preferred_style': {'required': False}
        }

    def validate(self, data):
        # Map frontend field names to model field names
        if 'project_name' in data:
            data['title'] = data.pop('project_name')
        if 'design_preferences' in data:
            data['preferred_style'] = data.pop('design_preferences')

        # Ensure title is set
        if not data.get('title'):
            raise serializers.ValidationError({'title': 'Project name is required'})

        return data

    def create(self, validated_data):
        # Get client from request context
        request = self.context.get('request')
        validated_data['client'] = request.user.client_profile
        validated_data['status'] = 'questionnaire'
        return super().create(validated_data)


# ==================== COURSES SERIALIZERS ====================

class CourseLessonSerializer(serializers.ModelSerializer):
    """Serializer for course lessons"""
    class Meta:
        model = CourseLesson
        fields = [
            'id', 'title', 'lesson_type', 'content', 'video_url',
            'video_duration_minutes', 'attachments', 'order', 'is_preview',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class CourseModuleSerializer(serializers.ModelSerializer):
    """Serializer for course modules"""
    lessons = CourseLessonSerializer(many=True, read_only=True)
    lesson_count = serializers.SerializerMethodField()

    class Meta:
        model = CourseModule
        fields = [
            'id', 'title', 'description', 'order', 'lessons',
            'lesson_count', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    def get_lesson_count(self, obj):
        return obj.lessons.count()


class CoursePurchaseSerializer(serializers.ModelSerializer):
    """Serializer for course purchases"""
    course_title = serializers.CharField(source='course.title', read_only=True)
    course_thumbnail = serializers.ImageField(source='course.thumbnail', read_only=True)
    has_access = serializers.BooleanField(read_only=True)

    class Meta:
        model = CoursePurchase
        fields = [
            'id', 'course', 'course_title', 'course_thumbnail',
            'amount_paid', 'payment_method', 'access_expires_at',
            'is_refunded', 'refunded_at', 'paypal_order_id',
            'purchased_at', 'last_accessed_at', 'has_access'
        ]
        read_only_fields = ['id', 'purchased_at', 'has_access']


class CourseSerializer(serializers.ModelSerializer):
    """Serializer for courses"""
    modules = CourseModuleSerializer(many=True, read_only=True)
    is_accessible = serializers.SerializerMethodField()
    user_progress = serializers.SerializerMethodField()
    is_purchased = serializers.SerializerMethodField()
    purchase_info = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'description', 'thumbnail', 'required_tier',
            'price', 'is_free', 'allow_individual_purchase',
            'duration_hours', 'difficulty_level', 'category', 'is_published',
            'display_order', 'modules', 'is_accessible', 'is_purchased',
            'purchase_info', 'user_progress', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    def get_is_purchased(self, obj):
        """Check if user has purchased this course"""
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return False

        try:
            purchase = CoursePurchase.objects.get(user=request.user, course=obj)
            return purchase.has_access
        except CoursePurchase.DoesNotExist:
            return False

    def get_purchase_info(self, obj):
        """Get purchase details if user has purchased"""
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return None

        try:
            purchase = CoursePurchase.objects.get(user=request.user, course=obj)
            return {
                'purchased_at': purchase.purchased_at,
                'amount_paid': str(purchase.amount_paid),
                'access_expires_at': purchase.access_expires_at,
                'has_access': purchase.has_access
            }
        except CoursePurchase.DoesNotExist:
            return None

    def get_is_accessible(self, obj):
        """Check if user can access this course (via subscription OR purchase)"""
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return obj.is_free

        # Check if course is free
        if obj.is_free:
            return True

        # Check if user has purchased this course
        try:
            purchase = CoursePurchase.objects.get(user=request.user, course=obj)
            if purchase.has_access:
                return True
        except CoursePurchase.DoesNotExist:
            pass

        # Check subscription tier access
        if not hasattr(request.user, 'client_profile'):
            return False

        client = request.user.client_profile
        tier_hierarchy = {'free': 0, 'starter': 1, 'pro': 2, 'premium': 3}

        user_tier = client.current_plan if client.current_plan else 'free'
        required_tier = obj.required_tier

        return tier_hierarchy.get(user_tier, 0) >= tier_hierarchy.get(required_tier, 0)

    def get_user_progress(self, obj):
        """Get user's progress in this course"""
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return None

        try:
            progress = CourseProgress.objects.get(user=request.user, course=obj)
            return {
                'completion_percentage': progress.completion_percentage,
                'completed_lessons': progress.completed_lessons,
                'current_lesson_id': str(progress.current_lesson.id) if progress.current_lesson else None
            }
        except CourseProgress.DoesNotExist:
            return None


class CourseProgressSerializer(serializers.ModelSerializer):
    """Serializer for course progress"""
    course_title = serializers.SerializerMethodField()

    class Meta:
        model = CourseProgress
        fields = [
            'id', 'course', 'course_title', 'completed_lessons',
            'current_lesson', 'completion_percentage', 'started_at',
            'last_accessed_at', 'completed_at'
        ]
        read_only_fields = ['id', 'started_at', 'last_accessed_at']

    def get_course_title(self, obj):
        return obj.course.title


class CourseCertificateSerializer(serializers.ModelSerializer):
    """Serializer for course certificates"""
    course_title = serializers.SerializerMethodField()
    user_name = serializers.SerializerMethodField()

    class Meta:
        model = CourseCertificate
        fields = [
            'id', 'course', 'course_title', 'user_name',
            'certificate_number', 'issued_at', 'certificate_url'
        ]
        read_only_fields = ['id', 'issued_at']

    def get_course_title(self, obj):
        return obj.course.title

    def get_user_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"


# ==================== WALLET & TRANSACTIONS SERIALIZERS ====================

class TransactionSerializer(serializers.ModelSerializer):
    """Serializer for wallet transactions"""
    client_name = serializers.SerializerMethodField()

    class Meta:
        model = Transaction
        fields = [
            'id', 'transaction_type', 'amount', 'status', 'description',
            'payment_method', 'payment_reference', 'related_invoice',
            'related_project', 'paid_for_service', 'created_at', 'client_name'
        ]
        read_only_fields = ['id', 'created_at']

    def get_client_name(self, obj):
        return obj.wallet.client.name


class WalletSerializer(serializers.ModelSerializer):
    """Serializer for client wallet"""
    transactions = TransactionSerializer(many=True, read_only=True)
    recent_transactions = serializers.SerializerMethodField()
    client_name = serializers.SerializerMethodField()

    class Meta:
        model = Wallet
        fields = [
            'id', 'balance', 'total_earned', 'total_spent',
            'client_name', 'transactions', 'recent_transactions',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_recent_transactions(self, obj):
        recent = obj.transactions.all()[:10]
        return TransactionSerializer(recent, many=True).data

    def get_client_name(self, obj):
        return obj.client.name


class TopUpWalletSerializer(serializers.Serializer):
    """Serializer for wallet top-up"""
    amount = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=10)
    payment_method = serializers.ChoiceField(choices=['paypal', 'stripe', 'bank_transfer'])


class WalletAutoRechargeSerializer(serializers.ModelSerializer):
    """Serializer for wallet auto-recharge configuration - Phase 7"""
    wallet_id = serializers.UUIDField(source='wallet.id', read_only=True)
    client_name = serializers.SerializerMethodField()
    should_recharge = serializers.ReadOnlyField()

    class Meta:
        model = WalletAutoRecharge
        fields = [
            'id', 'wallet', 'wallet_id', 'client_name', 'is_enabled',
            'threshold_amount', 'recharge_amount', 'payment_method_id',
            'payment_method_type', 'last_recharge_date', 'total_recharges',
            'total_recharged_amount', 'should_recharge', 'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'last_recharge_date', 'total_recharges',
            'total_recharged_amount', 'created_at', 'updated_at'
        ]

    def get_client_name(self, obj):
        return obj.wallet.client.name


class WalletAutoRechargeConfigureSerializer(serializers.ModelSerializer):
    """Serializer for configuring auto-recharge settings"""
    class Meta:
        model = WalletAutoRecharge
        fields = [
            'is_enabled', 'threshold_amount', 'recharge_amount',
            'payment_method_id', 'payment_method_type'
        ]

    def validate_threshold_amount(self, value):
        """Ensure threshold is at least $5"""
        if value < 5:
            raise serializers.ValidationError('Threshold amount must be at least $5.00')
        return value

    def validate_recharge_amount(self, value):
        """Ensure recharge amount is at least $10"""
        if value < 10:
            raise serializers.ValidationError('Recharge amount must be at least $10.00')
        return value

    def validate(self, data):
        """Ensure recharge amount is greater than threshold"""
        threshold = data.get('threshold_amount')
        recharge = data.get('recharge_amount')

        if threshold and recharge and recharge <= threshold:
            raise serializers.ValidationError({
                'recharge_amount': 'Recharge amount must be greater than threshold amount'
            })

        return data


class GiveawaySerializer(serializers.ModelSerializer):
    """Serializer for giveaway campaigns"""
    winners_count = serializers.SerializerMethodField()
    is_active = serializers.SerializerMethodField()

    class Meta:
        model = Giveaway
        fields = [
            'id', 'title', 'description', 'platform', 'reward_amount',
            'total_winners', 'status', 'start_date', 'end_date',
            'winners_count', 'is_active', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    def get_winners_count(self, obj):
        return obj.winners.count()

    def get_is_active(self, obj):
        from django.utils import timezone
        now = timezone.now()
        return obj.status == 'active' and obj.start_date <= now <= obj.end_date


class GiveawayWinnerSerializer(serializers.ModelSerializer):
    """Serializer for giveaway winners"""
    client_name = serializers.SerializerMethodField()
    giveaway_title = serializers.SerializerMethodField()

    class Meta:
        model = GiveawayWinner
        fields = [
            'id', 'giveaway', 'giveaway_title', 'client_name',
            'reward_amount', 'is_claimed', 'claimed_at', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    def get_client_name(self, obj):
        return obj.client.name

    def get_giveaway_title(self, obj):
        return obj.giveaway.title


# ==================== SUPPORT SYSTEM SERIALIZERS ====================

class TicketMessageSerializer(serializers.ModelSerializer):
    """Serializer for ticket messages"""
    sender_name = serializers.SerializerMethodField()
    sender_role = serializers.SerializerMethodField()

    class Meta:
        model = TicketMessage
        fields = [
            'id', 'sender', 'sender_name', 'sender_role', 'message',
            'attachments', 'is_system_message', 'created_at'
        ]
        read_only_fields = ['id', 'created_at', 'sender']

    def get_sender_name(self, obj):
        return f"{obj.sender.first_name} {obj.sender.last_name}"

    def get_sender_role(self, obj):
        return obj.sender.role


class SupportTicketSerializer(serializers.ModelSerializer):
    """Serializer for support tickets"""
    messages = TicketMessageSerializer(many=True, read_only=True)
    client_name = serializers.SerializerMethodField()
    assigned_to_name = serializers.SerializerMethodField()
    message_count = serializers.SerializerMethodField()
    last_message_at = serializers.SerializerMethodField()

    class Meta:
        model = SupportTicket
        fields = [
            'id', 'ticket_number', 'client', 'client_name', 'subject',
            'category', 'priority', 'status', 'assigned_to', 'assigned_to_name',
            'created_at', 'updated_at', 'resolved_at', 'closed_at',
            'messages', 'message_count', 'last_message_at'
        ]
        read_only_fields = ['id', 'ticket_number', 'created_at', 'updated_at']

    def get_client_name(self, obj):
        return obj.client.name

    def get_assigned_to_name(self, obj):
        if obj.assigned_to:
            return f"{obj.assigned_to.first_name} {obj.assigned_to.last_name}"
        return None

    def get_message_count(self, obj):
        return obj.messages.count()

    def get_last_message_at(self, obj):
        last_message = obj.messages.last()
        return last_message.created_at if last_message else None


class SupportTicketCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating support tickets"""
    initial_message = serializers.CharField(write_only=True)

    class Meta:
        model = SupportTicket
        fields = ['subject', 'category', 'priority', 'initial_message']

    def create(self, validated_data):
        initial_message = validated_data.pop('initial_message')
        request = self.context.get('request')

        # Create ticket
        ticket = SupportTicket.objects.create(
            client=request.user.client_profile,
            **validated_data
        )

        # Create initial message
        TicketMessage.objects.create(
            ticket=ticket,
            sender=request.user,
            message=initial_message
        )

        return ticket


# ==================== REDEEM CODE SERIALIZERS ====================

from .models import RedeemCode, RedeemCodeUsage

class RedeemCodeSerializer(serializers.ModelSerializer):
    """Serializer for redeem codes (admin view)"""
    created_by_name = serializers.SerializerMethodField()
    is_valid = serializers.ReadOnlyField()

    class Meta:
        model = RedeemCode
        fields = [
            'id', 'code', 'value', 'description', 'is_active',
            'usage_limit', 'times_used', 'expires_at', 'created_by',
            'created_by_name', 'created_at', 'is_valid'
        ]
        read_only_fields = ['id', 'times_used', 'created_at', 'created_by']

    def get_created_by_name(self, obj):
        if obj.created_by:
            return f"{obj.created_by.first_name} {obj.created_by.last_name}"
        return "System"


class RedeemCodeCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating redeem codes"""
    auto_generate = serializers.BooleanField(default=False, write_only=True, required=False)
    quantity = serializers.IntegerField(default=1, write_only=True, required=False, min_value=1, max_value=100)

    class Meta:
        model = RedeemCode
        fields = [
            'code', 'value', 'description', 'is_active',
            'usage_limit', 'expires_at', 'auto_generate', 'quantity'
        ]

    def validate(self, data):
        """Validate code creation"""
        if not data.get('auto_generate') and not data.get('code'):
            raise serializers.ValidationError({'code': 'Code is required if not auto-generating'})
        return data

    def create(self, validated_data):
        """Create redeem code(s)"""
        import random
        import string

        auto_generate = validated_data.pop('auto_generate', False)
        quantity = validated_data.pop('quantity', 1)
        request = self.context.get('request')

        if request:
            validated_data['created_by'] = request.user

        if auto_generate:
            # Generate multiple codes
            codes = []
            for _ in range(quantity):
                # Generate unique code
                while True:
                    code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))
                    if not RedeemCode.objects.filter(code=code).exists():
                        break

                code_obj = RedeemCode.objects.create(code=code, **validated_data)
                codes.append(code_obj)

            # Return first one (for serializer response)
            return codes[0] if codes else None
        else:
            # Create single code with provided code
            return RedeemCode.objects.create(**validated_data)


class RedeemCodeUsageSerializer(serializers.ModelSerializer):
    """Serializer for redeem code usage history"""
    code = serializers.CharField(source='redeem_code.code', read_only=True)
    value = serializers.DecimalField(source='redeem_code.value', max_digits=10, decimal_places=2, read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)

    class Meta:
        model = RedeemCodeUsage
        fields = [
            'id', 'redeem_code', 'code', 'value', 'user',
            'user_email', 'redeemed_at'
        ]
        read_only_fields = ['id', 'redeemed_at']


class RedeemCodeRedeemSerializer(serializers.Serializer):
    """Serializer for redeeming a code"""
    code = serializers.CharField(max_length=50, required=True)

    def validate_code(self, value):
        """Validate the redeem code"""
        value = value.strip().upper()

        try:
            redeem_code = RedeemCode.objects.get(code=value)
        except RedeemCode.DoesNotExist:
            raise serializers.ValidationError('Invalid redeem code')

        if not redeem_code.is_valid:
            if not redeem_code.is_active:
                raise serializers.ValidationError('This code is no longer active')
            elif redeem_code.times_used >= redeem_code.usage_limit:
                raise serializers.ValidationError('This code has reached its usage limit')
            elif redeem_code.expires_at and timezone.now() > redeem_code.expires_at:
                raise serializers.ValidationError('This code has expired')

        return value


# ==================== AGENT FEATURE SERIALIZERS ====================

class WebsiteVersionSerializer(serializers.ModelSerializer):
    """Serializer for website versions uploaded by agents"""
    agent_name = serializers.SerializerMethodField()
    project_title = serializers.SerializerMethodField()
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = WebsiteVersion
        fields = [
            'id', 'project', 'agent', 'agent_name', 'project_title',
            'version_number', 'status', 'file', 'file_url', 'file_size',
            'preview_url', 'deployment_url', 'notes', 'client_feedback',
            'technologies_used', 'changelog', 'uploaded_at', 'approved_at', 'deployed_at'
        ]
        read_only_fields = ['id', 'uploaded_at', 'approved_at', 'deployed_at']

    def get_agent_name(self, obj):
        if obj.agent and obj.agent.user:
            return f"{obj.agent.user.first_name} {obj.agent.user.last_name}"
        return None

    def get_project_title(self, obj):
        return obj.project.title if obj.project else None

    def get_file_url(self, obj):
        if obj.file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.file.url)
            return obj.file.url
        return None


class CampaignSerializer(serializers.ModelSerializer):
    """Serializer for marketing campaigns"""
    agent_name = serializers.SerializerMethodField()
    client_name = serializers.SerializerMethodField()
    performance_percentage = serializers.ReadOnlyField()
    is_active = serializers.ReadOnlyField()
    content_post_count = serializers.SerializerMethodField()

    class Meta:
        model = Campaign
        fields = [
            'id', 'client', 'agent', 'agent_name', 'client_name',
            'title', 'description', 'platform', 'status',
            'start_date', 'end_date', 'goal', 'target_audience',
            'target_reach', 'target_engagement', 'budget',
            'actual_reach', 'actual_engagement', 'actual_spend',
            'content_posts', 'content_post_count',
            'performance_percentage', 'is_active',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'performance_percentage', 'is_active']

    def get_agent_name(self, obj):
        if obj.agent and obj.agent.user:
            return f"{obj.agent.user.first_name} {obj.agent.user.last_name}"
        return None

    def get_client_name(self, obj):
        return obj.client.name if obj.client else None

    def get_content_post_count(self, obj):
        return obj.content_posts.count()


class CampaignCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating campaigns"""
    class Meta:
        model = Campaign
        fields = [
            'client', 'title', 'description', 'platform', 'status',
            'start_date', 'end_date', 'goal', 'target_audience',
            'target_reach', 'target_engagement', 'budget'
        ]


class ContentScheduleSerializer(serializers.ModelSerializer):
    """Serializer for scheduled content"""
    agent_name = serializers.SerializerMethodField()
    client_name = serializers.SerializerMethodField()
    campaign_title = serializers.SerializerMethodField()
    social_account_username = serializers.SerializerMethodField()
    approved_by_name = serializers.SerializerMethodField()
    is_overdue = serializers.ReadOnlyField()

    class Meta:
        model = ContentSchedule
        fields = [
            'id', 'client', 'agent', 'campaign', 'agent_name', 'client_name', 'campaign_title',
            'title', 'caption', 'platform', 'social_account', 'social_account_username',
            'scheduled_for', 'status', 'published_at', 'post_url', 'platform_post_id',
            'error_message', 'retry_count', 'media_files', 'hashtags', 'mentions',
            'requires_approval', 'approved_by', 'approved_by_name', 'approved_at',
            'is_overdue', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'published_at', 'is_overdue']

    def get_agent_name(self, obj):
        if obj.agent and obj.agent.user:
            return f"{obj.agent.user.first_name} {obj.agent.user.last_name}"
        return None

    def get_client_name(self, obj):
        return obj.client.name if obj.client else None

    def get_campaign_title(self, obj):
        return obj.campaign.title if obj.campaign else None

    def get_social_account_username(self, obj):
        return obj.social_account.username if obj.social_account else None

    def get_approved_by_name(self, obj):
        if obj.approved_by:
            return f"{obj.approved_by.first_name} {obj.approved_by.last_name}"
        return None


class ContentScheduleCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating scheduled content"""
    class Meta:
        model = ContentSchedule
        fields = [
            'client', 'campaign', 'title', 'caption', 'platform',
            'social_account', 'scheduled_for', 'media_files',
            'hashtags', 'mentions', 'requires_approval'
        ]
