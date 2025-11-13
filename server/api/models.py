# File: server/api/models.py
# Django Models for SMMA Dashboard System

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from cryptography.fernet import Fernet
from django.conf import settings
import uuid
import json

class User(AbstractUser):
    """Extended User model with role-based access"""
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('client', 'Client'),
        ('agent', 'Agent'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='client')
    company = models.CharField(max_length=255, blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    bio = models.TextField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.role})"


class Agent(models.Model):
    """Agent profile for managing clients"""
    DEPARTMENT_CHOICES = [
        ('marketing', 'Marketing'),
        ('website', 'Website Development'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='agent_profile')
    department = models.CharField(max_length=50, choices=DEPARTMENT_CHOICES, default='marketing')
    specialization = models.CharField(max_length=255, blank=True, help_text='Areas of expertise')
    is_active = models.BooleanField(default=True)
    max_clients = models.IntegerField(default=10, help_text='Maximum number of clients this agent can handle')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.get_department_display()}"

    @property
    def current_client_count(self):
        """Get current number of assigned clients"""
        return self.assigned_clients.filter(status='active').count()

    @property
    def can_accept_clients(self):
        """Check if agent can accept more clients"""
        return self.is_active and self.current_client_count < self.max_clients


class SocialMediaAccount(models.Model):
    """Social media accounts connected to clients"""
    PLATFORM_CHOICES = [
        ('instagram', 'Instagram'),
        ('tiktok', 'TikTok'),
        ('youtube', 'YouTube'),
        ('twitter', 'Twitter'),
        ('linkedin', 'LinkedIn'),
        ('facebook', 'Facebook'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey('Client', on_delete=models.CASCADE, related_name='social_accounts')
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    account_id = models.CharField(max_length=255)  # Platform-specific account ID
    username = models.CharField(max_length=255)
    access_token = models.TextField()  # Encrypted
    refresh_token = models.TextField(blank=True)  # Encrypted
    token_expires_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    last_sync = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['client', 'platform', 'account_id']

    def encrypt_token(self, token):
        """Encrypt access token"""
        f = Fernet(settings.ENCRYPTION_KEY.encode())
        return f.encrypt(token.encode()).decode()

    def decrypt_token(self, encrypted_token):
        """Decrypt access token"""
        f = Fernet(settings.ENCRYPTION_KEY.encode())
        return f.decrypt(encrypted_token.encode()).decode()

    def save(self, *args, **kwargs):
        if self.access_token and not self.access_token.startswith('gAAAAA'):  # Not encrypted
            self.access_token = self.encrypt_token(self.access_token)
        if self.refresh_token and not self.refresh_token.startswith('gAAAAA'):  # Not encrypted
            self.refresh_token = self.encrypt_token(self.refresh_token)
        super().save(*args, **kwargs)

class RealTimeMetrics(models.Model):
    """Real-time metrics from social media platforms"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    account = models.ForeignKey(SocialMediaAccount, on_delete=models.CASCADE, related_name='metrics')
    date = models.DateField()
    followers_count = models.IntegerField(default=0)
    following_count = models.IntegerField(default=0)
    posts_count = models.IntegerField(default=0)
    engagement_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    reach = models.IntegerField(default=0)
    impressions = models.IntegerField(default=0)
    profile_views = models.IntegerField(default=0)
    website_clicks = models.IntegerField(default=0)
    daily_growth = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ['account', 'date']
        ordering = ['-date']

class PostMetrics(models.Model):
    """Individual post metrics from social media platforms"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    account = models.ForeignKey(SocialMediaAccount, on_delete=models.CASCADE, related_name='post_metrics')
    post_id = models.CharField(max_length=255)  # Platform-specific post ID
    caption = models.TextField(blank=True)
    media_type = models.CharField(max_length=20)  # image, video, carousel
    posted_at = models.DateTimeField()
    likes = models.IntegerField(default=0)
    comments = models.IntegerField(default=0)
    shares = models.IntegerField(default=0)
    saves = models.IntegerField(default=0)
    reach = models.IntegerField(default=0)
    impressions = models.IntegerField(default=0)
    engagement_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['account', 'post_id']
        ordering = ['-posted_at']

class Client(models.Model):
    """Enhanced Client model with PayPal integration"""
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('pending', 'Pending'),
        ('paused', 'Paused'),
        ('cancelled', 'Cancelled'),  # Added cancelled status
    ]
    
    PAYMENT_STATUS_CHOICES = [
        ('paid', 'Paid'),
        ('overdue', 'Overdue'),
        ('pending', 'Pending'),
        ('none', 'No Payment Required'),  # Added none status
    ]
    
    PLAN_CHOICES = [
        ('starter', 'Starter Plan'),
        ('pro', 'Pro Plan'),
        ('premium', 'Premium Plan'),
        ('none', 'No Plan Selected'),  # Added none option
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField('User', on_delete=models.CASCADE, related_name='client_profile')
    name = models.CharField(max_length=255)
    email = models.EmailField()
    company = models.CharField(max_length=255)
    package = models.CharField(max_length=255, default='No Plan Selected')
    monthly_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    start_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='none')
    platforms = models.JSONField(default=list)
    assigned_agent = models.ForeignKey(
        'Agent',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_clients',
        help_text='Agent assigned to manage this client'
    )
    marketing_agent = models.ForeignKey(
        'Agent',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='marketing_clients',
        help_text='Marketing agent assigned to manage social media for this client'
    )
    website_agent = models.ForeignKey(
        'Agent',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='website_clients',
        help_text='Website agent assigned to manage website projects for this client'
    )
    next_payment = models.DateField(null=True, blank=True)  # Allow null for no active subscription
    total_spent = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    # PAYPAL FIELDS (replacing Stripe fields)
    paypal_customer_id = models.CharField(max_length=255, blank=True, null=True)  # PayPal payer ID
    paypal_subscription_id = models.CharField(max_length=255, blank=True, null=True)
    current_plan = models.CharField(
        max_length=50, 
        blank=True, 
        null=True, 
        choices=PLAN_CHOICES,
        default='none'
    )
    subscription_start_date = models.DateTimeField(blank=True, null=True)
    subscription_end_date = models.DateTimeField(blank=True, null=True)
    trial_end_date = models.DateTimeField(blank=True, null=True)

    # MULTI-SERVICE ARCHITECTURE FIELDS
    active_services = models.JSONField(
        default=list,
        help_text='List of active services for this client: marketing, website, courses'
    )

    def __str__(self):
        return f"{self.name} - {self.company} ({self.get_current_plan_display()})"

    @property
    def total_followers(self):
        """Calculate total followers across all connected accounts"""
        from .models import RealTimeMetrics  # Import here to avoid circular import
        latest_metrics = RealTimeMetrics.objects.filter(
            account__client=self
        ).order_by('account', '-date').distinct('account')
        return sum(metric.followers_count for metric in latest_metrics)

    @property
    def average_engagement_rate(self):
        """Calculate average engagement rate across all accounts"""
        from .models import RealTimeMetrics  # Import here to avoid circular import
        latest_metrics = RealTimeMetrics.objects.filter(
            account__client=self
        ).order_by('account', '-date').distinct('account')
        
        if not latest_metrics:
            return 0
        
        total_engagement = sum(metric.engagement_rate for metric in latest_metrics)
        return total_engagement / len(latest_metrics)

    @property
    def has_active_subscription(self):
        """Check if client has an active PayPal subscription"""
        return bool(
            self.paypal_subscription_id and 
            self.status == 'active' and 
            self.current_plan and 
            self.current_plan != 'none'
        )

    @property
    def subscription_status_display(self):
        """Get human-readable subscription status"""
        if not self.current_plan or self.current_plan == 'none':
            return 'No Plan Selected'
        elif self.status == 'active':
            return f'Active - {self.get_current_plan_display()}'
        elif self.status == 'cancelled':
            return f'Cancelled - {self.get_current_plan_display()}'
        else:
            return f'{self.get_status_display()} - {self.get_current_plan_display()}'

    @property
    def has_social_accounts(self):
        """Check if client has connected any social media accounts"""
        return self.social_accounts.filter(is_active=True).exists()

    @property
    def has_website_projects(self):
        """Check if client has any website projects"""
        return self.website_projects.exists()

    @property
    def client_type(self):
        """
        Determine client type based on their activities:
        - 'marketing': Has social accounts but no website projects
        - 'website': Has website projects but no social accounts
        - 'full': Has both social accounts and website projects
        - 'none': Has neither (new client)
        """
        has_social = self.has_social_accounts
        has_website = self.has_website_projects

        if has_social and has_website:
            return 'full'
        elif has_social:
            return 'marketing'
        elif has_website:
            return 'website'
        else:
            return 'none'

    @property
    def needs_marketing_agent(self):
        """Check if client needs a marketing agent"""
        return self.client_type in ['marketing', 'full']

    @property
    def needs_website_agent(self):
        """Check if client needs a website agent"""
        return self.client_type in ['website', 'full']

    @property
    def marketing_agent(self):
        """Get the marketing agent assigned to this client"""
        service_setting = self.service_settings.filter(
            service_type='marketing',
            assigned_agent__isnull=False
        ).select_related('assigned_agent__user').first()
        return service_setting.assigned_agent if service_setting else None

    @property
    def website_agent(self):
        """Get the website agent assigned to this client"""
        service_setting = self.service_settings.filter(
            service_type='website',
            assigned_agent__isnull=False
        ).select_related('assigned_agent__user').first()
        return service_setting.assigned_agent if service_setting else None

    class Meta:
        ordering = ['-created_at']


class ClientServiceSettings(models.Model):
    """Service-specific settings and assignments for clients"""
    SERVICE_TYPE_CHOICES = [
        ('marketing', 'Marketing'),
        ('website', 'Website Builder'),
        ('courses', 'Courses'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='service_settings')
    service_type = models.CharField(max_length=20, choices=SERVICE_TYPE_CHOICES)
    is_active = models.BooleanField(default=True)
    settings = models.JSONField(
        default=dict,
        help_text='Service-specific configuration and preferences'
    )
    assigned_agent = models.ForeignKey(
        Agent,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='service_clients',
        help_text='Agent assigned for this specific service'
    )
    activation_date = models.DateTimeField(default=timezone.now)
    deactivation_date = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['client', 'service_type']
        ordering = ['-created_at']
        verbose_name = 'Client Service Setting'
        verbose_name_plural = 'Client Service Settings'

    def __str__(self):
        status = "Active" if self.is_active else "Inactive"
        return f"{self.client.name} - {self.get_service_type_display()} ({status})"


class SyncLog(models.Model):
    """Track synchronization logs"""
    STATUS_CHOICES = [
        ('success', 'Success'),
        ('failed', 'Failed'),
        ('in_progress', 'In Progress'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    account = models.ForeignKey(SocialMediaAccount, on_delete=models.CASCADE, related_name='sync_logs')
    sync_type = models.CharField(max_length=50)  # 'profile', 'posts', 'metrics'
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='in_progress')
    records_processed = models.IntegerField(default=0)
    error_message = models.TextField(blank=True)
    started_at = models.DateTimeField(default=timezone.now)
    completed_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        ordering = ['-started_at']


class Task(models.Model):
    """Task management for SMMA operations"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in-progress', 'In Progress'),
        ('review', 'Review'),
        ('completed', 'Completed'),
    ]
    
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='tasks')
    assigned_to = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    due_date = models.DateTimeField()
    completed_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.client.name}"

    class Meta:
        ordering = ['-created_at']


class ContentPost(models.Model):
    """Content management for social media posts - Instagram, YouTube, TikTok only"""
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('pending-approval', 'Pending Approval'),
        ('approved', 'Approved'),
        ('posted', 'Posted'),
    ]
    
    PLATFORM_CHOICES = [
        ('instagram', 'Instagram'),
        ('youtube', 'YouTube'),
        ('tiktok', 'TikTok'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='content')
    
    # Link to specific social media account
    social_account = models.ForeignKey(
        SocialMediaAccount, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='content_posts',
        help_text='Linked social media account'
    )
    
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    title = models.CharField(max_length=255, help_text='Post title')
    content = models.TextField(help_text='Post description/caption')
    scheduled_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    
    # Messages and URLs
    admin_message = models.TextField(blank=True, help_text='Message to admin from client')
    post_url = models.URLField(blank=True, null=True, help_text='URL of posted content (set by admin)')
    
    # Metrics (populated after posting)
    engagement_rate = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    likes = models.IntegerField(default=0)
    comments = models.IntegerField(default=0)
    shares = models.IntegerField(default=0)
    views = models.IntegerField(default=0)
    
    # Approval tracking
    approved_by = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True, related_name='approved_content')
    approved_at = models.DateTimeField(blank=True, null=True)
    posted_at = models.DateTimeField(blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.platform} - {self.client.name} - {self.title or self.scheduled_date.date()}"

    class Meta:
        ordering = ['-scheduled_date']

class ContentImage(models.Model):
    """Images for content posts"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    content_post = models.ForeignKey(ContentPost, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='content_images/%Y/%m/')
    caption = models.CharField(max_length=255, blank=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['order', 'created_at']

    def __str__(self):
        return f"Image {self.order} for {self.content_post.title or self.content_post.id}"

    @property
    def image_url(self):
        """Get full URL of image"""
        if self.image:
            return self.image.url
        return None


class ContentRequest(models.Model):
    """Content requests created by clients describing what content they want"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in-progress', 'In Progress'),
        ('completed', 'Completed'),
        ('rejected', 'Rejected'),
    ]

    PLATFORM_CHOICES = [
        ('instagram', 'Instagram'),
        ('youtube', 'YouTube'),
        ('tiktok', 'TikTok'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='content_requests')
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    title = models.CharField(max_length=255, help_text='Brief title for the request')
    description = models.TextField(help_text='Detailed description of content wanted')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    # Optional fields
    preferred_date = models.DateField(blank=True, null=True, help_text='Preferred posting date')
    notes = models.TextField(blank=True, help_text='Additional notes or requirements from client')

    # Tracking
    agent_notes = models.TextField(blank=True, help_text='Notes from agent')
    created_content = models.OneToOneField(
        ContentPost,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='source_request',
        help_text='The content post created from this request'
    )

    # Timestamps
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.client.name} - {self.platform} - {self.title}"


class ContentRequestImage(models.Model):
    """Reference images for content requests"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    content_request = models.ForeignKey(ContentRequest, on_delete=models.CASCADE, related_name='reference_images')
    image = models.ImageField(upload_to='content_request_images/%Y/%m/')
    caption = models.CharField(max_length=255, blank=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['order', 'created_at']

    def __str__(self):
        return f"Reference image {self.order} for {self.content_request.title}"

    @property
    def image_url(self):
        """Get full URL of image"""
        if self.image:
            return self.image.url
        return None
    
class PerformanceData(models.Model):
    """Performance analytics for clients"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='performance')
    month = models.DateField()
    followers = models.IntegerField(default=0)
    engagement = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    reach = models.IntegerField(default=0)
    clicks = models.IntegerField(default=0)
    impressions = models.IntegerField(default=0)
    growth_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.client.name} - {self.month}"

    class Meta:
        ordering = ['-month']
        unique_together = ['client', 'month']

class Message(models.Model):
    """Messaging system between admin and clients"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    content = models.TextField()
    read = models.BooleanField(default=False)
    timestamp = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"From {self.sender.username} to {self.receiver.username}"

    class Meta:
        ordering = ['-timestamp']

class Invoice(models.Model):
    """Invoice management for client billing"""
    STATUS_CHOICES = [
        ('paid', 'Paid'),
        ('pending', 'Pending'),
        ('overdue', 'Overdue'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='invoices')
    invoice_number = models.CharField(max_length=50, unique=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    due_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    paid_at = models.DateTimeField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"#{self.invoice_number} - {self.client.name}"

    class Meta:
        ordering = ['-created_at']

class AdminBankSettings(models.Model):
    """Admin bank account settings for receiving payments"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    admin_full_name = models.CharField(max_length=255, help_text="Full name for bank transfer")
    iban = models.CharField(max_length=34, help_text="IBAN number for receiving payments")
    bank_name = models.CharField(max_length=255, blank=True, help_text="Bank name (optional)")
    swift_code = models.CharField(max_length=11, blank=True, help_text="SWIFT/BIC code (optional)")
    additional_info = models.TextField(blank=True, help_text="Additional payment instructions")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Admin Bank Settings"
        verbose_name_plural = "Admin Bank Settings"
    
    def __str__(self):
        return f"Bank Settings - {self.admin_full_name}"


class PaymentVerification(models.Model):
    """Track client payment verifications"""
    STATUS_CHOICES = [
        ('pending', 'Pending Verification'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='payment_verifications')
    plan = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    client_full_name = models.CharField(max_length=255, help_text="Client's full name for verification")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    submitted_at = models.DateTimeField(default=timezone.now)
    approved_at = models.DateTimeField(blank=True, null=True)
    approved_by = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True, related_name='approved_verifications')
    notes = models.TextField(blank=True)
    
    class Meta:
        ordering = ['-submitted_at']
    
    def __str__(self):
        return f"Payment Verification - {self.client.name} - {self.status}"
    
class TeamMember(models.Model):
    """Team members working on client accounts"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='team_profile')
    position = models.CharField(max_length=255)
    department = models.CharField(max_length=100)
    hourly_rate = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.position}"

class Project(models.Model):
    """Projects for organizing client work"""
    STATUS_CHOICES = [
        ('planning', 'Planning'),
        ('active', 'Active'),
        ('paused', 'Paused'),
        ('completed', 'Completed'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField()
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='projects')
    team_members = models.ManyToManyField(TeamMember, related_name='projects')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='planning')
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    budget = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.client.name}"

    class Meta:
        ordering = ['-created_at']

class File(models.Model):
    """File storage for client assets"""
    FILE_TYPE_CHOICES = [
        ('image', 'Image'),
        ('video', 'Video'),
        ('document', 'Document'),
        ('other', 'Other'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='client_files/')
    file_type = models.CharField(max_length=20, choices=FILE_TYPE_CHOICES)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='files')
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    size = models.IntegerField()  # Size in bytes
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.name} - {self.client.name}"

    class Meta:
        ordering = ['-created_at']

class Notification(models.Model):
    """Notifications for users"""
    NOTIFICATION_TYPES = [
        # Task notifications
        ('task_assigned', 'Task Assigned'),
        ('task_completed', 'Task Completed'),
        ('task_overdue', 'Task Overdue'),

        # Payment & Invoice notifications
        ('payment_due', 'Payment Due'),
        ('payment_received', 'Payment Received'),
        ('payment_verification', 'Payment Verification'),
        ('invoice_created', 'Invoice Created'),
        ('invoice_overdue', 'Invoice Overdue'),
        ('invoice_reminder', 'Invoice Reminder'),

        # Content notifications
        ('content_submitted', 'Content Submitted'),
        ('content_approved', 'Content Approved'),
        ('content_rejected', 'Content Rejected'),
        ('content_posted', 'Content Posted'),

        # Message notifications
        ('message_received', 'Message Received'),

        # Website project notifications
        ('website_phase_completed', 'Website Phase Completed'),
        ('website_demo_ready', 'Website Demo Ready'),

        # Course notifications
        ('course_enrollment', 'Course Enrollment'),
        ('course_completed', 'Course Completed'),

        # Subscription notifications
        ('subscription_activated', 'Subscription Activated'),
        ('subscription_created', 'Subscription Created'),
        ('subscription_cancelled', 'Subscription Cancelled'),
        ('subscription_renewal', 'Subscription Renewal'),

        # User & Performance
        ('user_registered', 'User Registered'),
        ('performance_update', 'Performance Update'),

        # General
        ('general', 'General'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=255)
    message = models.TextField()
    notification_type = models.CharField(max_length=30, choices=NOTIFICATION_TYPES)  # Increased from 20 to 30
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.title} - {self.user.username}"

    class Meta:
        ordering = ['-created_at']


class ClientAccessRequest(models.Model):
    """Model for agents to request access to clients"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('denied', 'Denied'),
    ]

    SERVICE_TYPE_CHOICES = [
        ('marketing', 'Marketing'),
        ('website', 'Website Development'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='client_requests')
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='access_requests')
    service_type = models.CharField(max_length=20, choices=SERVICE_TYPE_CHOICES, default='marketing', help_text='Service type for this request')
    reason = models.TextField(help_text='Reason for requesting this client', blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    reviewed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='reviewed_requests')
    review_note = models.TextField(blank=True, help_text='Admin note for approval/denial')
    created_at = models.DateTimeField(default=timezone.now)
    reviewed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['agent', 'client', 'service_type', 'status']  # Prevent duplicate pending requests per service

    def __str__(self):
        return f"{self.agent.user.get_full_name()} → {self.client.name} ({self.service_type}) [{self.status}]"


class ImageGalleryItem(models.Model):
    """Image gallery item with layout positioning and sizing"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='gallery/')

    # Layout attributes
    grid_column = models.IntegerField(default=1)  # Width in grid units
    grid_row = models.IntegerField(default=1)    # Height in grid units
    flex_width = models.CharField(max_length=20, default='1fr')  # CSS flex value
    display_order = models.IntegerField(default=0)  # For ordering

    # Additional metadata
    alt_text = models.CharField(max_length=255, blank=True)
    caption = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f"{self.title} ({self.grid_column}x{self.grid_row})"


# ==================== WEBSITE BUILDER MODELS ====================

class WebsiteProject(models.Model):
    """Website building projects for clients"""
    STATUS_CHOICES = [
        ('questionnaire', 'Questionnaire'),
        ('valuation', 'Valuation Pending'),
        ('demo', 'Demo Generated'),
        ('payment_pending', 'Payment Pending'),
        ('in_development', 'In Development'),
        ('review', 'Under Review'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='website_projects')
    title = models.CharField(max_length=255)

    # Questionnaire responses
    industry = models.CharField(max_length=100)
    business_goals = models.TextField()
    preferred_style = models.CharField(max_length=100, blank=True)
    desired_features = models.JSONField(default=list)
    target_audience = models.TextField(blank=True)
    competitor_sites = models.TextField(blank=True)
    content_requirements = models.TextField(blank=True)
    timeline_expectations = models.CharField(max_length=100, blank=True)
    budget_range = models.CharField(max_length=100, blank=True)
    additional_notes = models.TextField(blank=True)

    # AI Valuation
    estimated_cost_min = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    estimated_cost_max = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    estimated_hours = models.IntegerField(blank=True, null=True)
    complexity_score = models.IntegerField(default=0)  # 1-10
    ai_recommendations = models.JSONField(default=dict)

    # Template Selection
    selected_template = models.ForeignKey(
        'WebsiteTemplate',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='projects',
        help_text='Selected template for this project'
    )
    template_customizations = models.JSONField(default=dict, help_text='Template customization settings')

    # Demo
    demo_url = models.URLField(blank=True, null=True)
    demo_screenshots = models.JSONField(default=list)

    # Project details
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='questionnaire')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    current_phase = models.IntegerField(default=1)
    total_phases = models.IntegerField(default=3)

    # Team assignment
    assigned_developer = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='website_projects'
    )

    # Dates
    started_at = models.DateTimeField(blank=True, null=True)
    estimated_completion = models.DateField(blank=True, null=True)
    completed_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.client.name} ({self.status})"

    @property
    def progress_percentage(self):
        """Calculate project completion percentage"""
        if self.total_amount > 0:
            return int((self.paid_amount / self.total_amount) * 100)
        return 0

    class Meta:
        ordering = ['-created_at']


class WebsitePhase(models.Model):
    """Payment phases for website projects"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('paid', 'Paid'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(WebsiteProject, on_delete=models.CASCADE, related_name='phases')
    phase_number = models.IntegerField()
    title = models.CharField(max_length=255)
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    deliverables = models.JSONField(default=list)

    # Payment
    payment_due_date = models.DateField(blank=True, null=True)
    paid_at = models.DateTimeField(blank=True, null=True)

    # Progress
    started_at = models.DateTimeField(blank=True, null=True)
    completed_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Phase {self.phase_number}: {self.title}"

    class Meta:
        ordering = ['phase_number']
        unique_together = ['project', 'phase_number']


class WebsiteTemplate(models.Model):
    """Pre-built website templates for clients to choose from"""
    CATEGORY_CHOICES = [
        ('business', 'Business'),
        ('ecommerce', 'E-Commerce'),
        ('portfolio', 'Portfolio'),
        ('blog', 'Blog'),
        ('restaurant', 'Restaurant'),
        ('healthcare', 'Healthcare'),
        ('education', 'Education'),
        ('real_estate', 'Real Estate'),
        ('agency', 'Agency'),
        ('other', 'Other'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    preview_url = models.URLField(help_text='Live preview URL')
    thumbnail_url = models.URLField(help_text='Thumbnail image URL')
    screenshots = models.JSONField(default=list, help_text='List of screenshot URLs')
    features = models.JSONField(default=list, help_text='List of template features')
    tech_stack = models.JSONField(default=list, help_text='Technologies used')
    is_active = models.BooleanField(default=True)
    complexity_score = models.IntegerField(default=5, help_text='Complexity from 1-10')
    base_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"

    class Meta:
        ordering = ['category', 'name']


class WebsiteHosting(models.Model):
    """Hosting and domain information for website projects"""
    HOSTING_PROVIDER_CHOICES = [
        ('vercel', 'Vercel'),
        ('netlify', 'Netlify'),
        ('aws', 'AWS'),
        ('digitalocean', 'DigitalOcean'),
        ('cloudflare', 'Cloudflare Pages'),
        ('other', 'Other'),
    ]

    DOMAIN_PROVIDER_CHOICES = [
        ('namecheap', 'Namecheap'),
        ('godaddy', 'GoDaddy'),
        ('cloudflare', 'Cloudflare'),
        ('google', 'Google Domains'),
        ('other', 'Other'),
    ]

    SSL_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('active', 'Active'),
        ('expired', 'Expired'),
        ('failed', 'Failed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.OneToOneField(WebsiteProject, on_delete=models.CASCADE, related_name='hosting')

    # Domain Information
    domain_name = models.CharField(max_length=255, blank=True)
    domain_provider = models.CharField(max_length=100, choices=DOMAIN_PROVIDER_CHOICES, blank=True)
    domain_purchased_at = models.DateTimeField(blank=True, null=True)
    domain_expires_at = models.DateTimeField(blank=True, null=True)
    domain_auto_renew = models.BooleanField(default=True)

    # Hosting Information
    hosting_provider = models.CharField(max_length=100, choices=HOSTING_PROVIDER_CHOICES, blank=True)
    hosting_plan = models.CharField(max_length=100, blank=True)
    hosting_url = models.URLField(blank=True, help_text='Hosting control panel URL')

    # SSL Certificate
    ssl_status = models.CharField(max_length=20, choices=SSL_STATUS_CHOICES, default='pending')
    ssl_expires_at = models.DateTimeField(blank=True, null=True)

    # DNS Configuration
    dns_configured = models.BooleanField(default=False)
    nameservers = models.JSONField(default=list, help_text='List of nameserver addresses')

    # Deployment
    deployment_url = models.URLField(blank=True, help_text='Live website URL')
    last_deployed_at = models.DateTimeField(blank=True, null=True)

    # Credentials (encrypted)
    hosting_credentials = models.JSONField(default=dict, help_text='Encrypted hosting credentials')
    domain_credentials = models.JSONField(default=dict, help_text='Encrypted domain credentials')

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Hosting for {self.project.title} - {self.domain_name or 'No domain'}"

    class Meta:
        verbose_name = 'Website Hosting'
        verbose_name_plural = 'Website Hosting'


class WebsiteSEO(models.Model):
    """SEO tracking and optimization for website projects"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.OneToOneField(WebsiteProject, on_delete=models.CASCADE, related_name='seo')

    # Google Search Console Integration
    google_search_console_connected = models.BooleanField(default=False)
    gsc_property_url = models.URLField(blank=True)

    # Keywords
    target_keywords = models.JSONField(default=list, help_text='List of target keywords')
    current_rankings = models.JSONField(default=dict, help_text='Keyword rankings data')

    # Metrics
    backlinks_count = models.IntegerField(default=0)
    domain_authority = models.IntegerField(default=0, help_text='0-100 score')
    page_speed_score = models.IntegerField(default=0, help_text='0-100 score')
    seo_score = models.IntegerField(default=0, help_text='Overall SEO score 0-100')

    # Audits
    last_audit_date = models.DateTimeField(blank=True, null=True)
    audit_results = models.JSONField(default=dict, help_text='Latest SEO audit results')

    # Issues
    critical_issues = models.IntegerField(default=0)
    warnings = models.IntegerField(default=0)
    recommendations = models.JSONField(default=list)

    # Analytics
    organic_traffic = models.IntegerField(default=0, help_text='Monthly organic visits')
    indexed_pages = models.IntegerField(default=0)

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"SEO for {self.project.title} - Score: {self.seo_score}"

    class Meta:
        verbose_name = 'Website SEO'
        verbose_name_plural = 'Website SEO'


# ==================== COURSES MODELS ====================

class Course(models.Model):
    """Educational courses for clients"""
    TIER_CHOICES = [
        ('free', 'Free'),
        ('starter', 'Starter'),
        ('pro', 'Pro'),
        ('premium', 'Premium'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    thumbnail = models.ImageField(upload_to='courses/thumbnails/', blank=True, null=True)

    # Access control
    required_tier = models.CharField(max_length=20, choices=TIER_CHOICES, default='free')

    # Pricing for individual purchase
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0, help_text='Price for individual course purchase')
    is_free = models.BooleanField(default=False, help_text='Course is free for everyone')
    allow_individual_purchase = models.BooleanField(default=True, help_text='Allow purchase without subscription')

    # Metadata
    duration_hours = models.DecimalField(max_digits=5, decimal_places=1, default=0)
    difficulty_level = models.CharField(max_length=20, default='beginner')  # beginner, intermediate, advanced
    category = models.CharField(max_length=100)  # marketing, web design, branding, etc

    # Display
    is_published = models.BooleanField(default=False)
    display_order = models.IntegerField(default=0)

    # Timestamps
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.required_tier})"

    class Meta:
        ordering = ['display_order', '-created_at']


class CourseModule(models.Model):
    """Modules within a course"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='modules')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.course.title} - Module {self.order}: {self.title}"

    class Meta:
        ordering = ['order']
        unique_together = ['course', 'order']


class CourseLesson(models.Model):
    """Individual lessons within a module"""
    LESSON_TYPE_CHOICES = [
        ('video', 'Video'),
        ('text', 'Text'),
        ('quiz', 'Quiz'),
        ('assignment', 'Assignment'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    module = models.ForeignKey(CourseModule, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=255)
    lesson_type = models.CharField(max_length=20, choices=LESSON_TYPE_CHOICES, default='video')

    # Content
    content = models.TextField(blank=True)  # Text content or description
    video_url = models.URLField(blank=True, null=True)
    video_duration_minutes = models.IntegerField(default=0)

    # Files
    attachments = models.JSONField(default=list)  # List of file URLs

    # Display
    order = models.IntegerField(default=0)
    is_preview = models.BooleanField(default=False)  # Can be viewed without subscription

    # Timestamps
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.module.course.title} - {self.title}"

    class Meta:
        ordering = ['order']


class CourseProgress(models.Model):
    """Track user progress through courses"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='course_progress')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='user_progress')
    completed_lessons = models.JSONField(default=list)  # List of lesson IDs
    current_lesson = models.ForeignKey(
        CourseLesson,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='current_users'
    )

    # Progress tracking
    started_at = models.DateTimeField(default=timezone.now)
    last_accessed_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(blank=True, null=True)
    completion_percentage = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} - {self.course.title} ({self.completion_percentage}%)"

    class Meta:
        unique_together = ['user', 'course']
        ordering = ['-last_accessed_at']


class CourseCertificate(models.Model):
    """Certificates awarded for course completion"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='certificates')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='certificates')
    certificate_number = models.CharField(max_length=100, unique=True)
    issued_at = models.DateTimeField(default=timezone.now)
    certificate_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"Certificate {self.certificate_number} - {self.user.username}"

    class Meta:
        unique_together = ['user', 'course']
        ordering = ['-issued_at']


class CoursePurchase(models.Model):
    """Track individual course purchases by users"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='course_purchases')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='purchases')
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50, default='paypal', help_text='paypal, wallet, etc')

    # Access control
    access_expires_at = models.DateTimeField(null=True, blank=True, help_text='Null = lifetime access')
    is_refunded = models.BooleanField(default=False)
    refunded_at = models.DateTimeField(null=True, blank=True)
    refund_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    # PayPal integration
    paypal_order_id = models.CharField(max_length=255, blank=True, help_text='PayPal order ID')
    paypal_payer_id = models.CharField(max_length=255, blank=True, help_text='PayPal payer ID')

    # Timestamps
    purchased_at = models.DateTimeField(default=timezone.now)
    last_accessed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.course.title} (${self.amount_paid})"

    @property
    def has_access(self):
        """Check if user still has access to this course"""
        if self.is_refunded:
            return False
        if self.access_expires_at is None:
            return True  # Lifetime access
        return timezone.now() < self.access_expires_at

    class Meta:
        unique_together = ['user', 'course']
        ordering = ['-purchased_at']
        verbose_name = 'Course Purchase'
        verbose_name_plural = 'Course Purchases'


# ==================== WALLET & TRANSACTIONS MODELS ====================

class Wallet(models.Model):
    """Client wallet for credits and transactions"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.OneToOneField(Client, on_delete=models.CASCADE, related_name='wallet')
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_earned = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # From giveaways
    total_spent = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.client.name} - ${self.balance}"


class Transaction(models.Model):
    """Transaction history for wallet"""
    TYPE_CHOICES = [
        ('topup', 'Top Up'),
        ('payment', 'Payment'),
        ('refund', 'Refund'),
        ('giveaway', 'Giveaway Bonus'),
        ('bonus', 'Bonus'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name='transactions')
    transaction_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='completed')
    description = models.TextField()

    # Payment gateway info
    payment_method = models.CharField(max_length=50, blank=True)  # stripe, paypal, bank_transfer
    payment_reference = models.CharField(max_length=255, blank=True)

    # Related objects
    related_invoice = models.ForeignKey(
        Invoice,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='wallet_transactions'
    )
    related_project = models.ForeignKey(
        WebsiteProject,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='wallet_transactions'
    )

    # Phase 7: Service tracking
    paid_for_service = models.CharField(
        max_length=100,
        blank=True,
        help_text='What service was paid for: course_id, subscription, invoice_id, etc.'
    )

    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.transaction_type} - ${self.amount} - {self.wallet.client.name}"

    class Meta:
        ordering = ['-created_at']


class WalletAutoRecharge(models.Model):
    """Auto-recharge configuration for client wallets - Phase 7"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    wallet = models.OneToOneField(Wallet, on_delete=models.CASCADE, related_name='auto_recharge')

    # Configuration
    is_enabled = models.BooleanField(default=False, help_text='Enable/disable auto-recharge')
    threshold_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=10.00,
        help_text='Recharge when balance falls below this amount'
    )
    recharge_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=50.00,
        help_text='Amount to add when auto-recharging'
    )

    # Payment method (PayPal subscription or saved card)
    payment_method_id = models.CharField(
        max_length=255,
        blank=True,
        help_text='PayPal subscription ID or saved payment method ID'
    )
    payment_method_type = models.CharField(
        max_length=50,
        choices=[('paypal', 'PayPal'), ('card', 'Credit Card')],
        default='paypal'
    )

    # Tracking
    last_recharge_date = models.DateTimeField(null=True, blank=True)
    total_recharges = models.IntegerField(default=0)
    total_recharged_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    # Timestamps
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        status = "Enabled" if self.is_enabled else "Disabled"
        return f"Auto-Recharge ({status}) - {self.wallet.client.name}"

    @property
    def should_recharge(self):
        """Check if wallet balance is below threshold"""
        if not self.is_enabled:
            return False
        return self.wallet.balance < self.threshold_amount

    class Meta:
        verbose_name = 'Wallet Auto-Recharge'
        verbose_name_plural = 'Wallet Auto-Recharges'


class Giveaway(models.Model):
    """Giveaway campaigns for social media"""
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('ended', 'Ended'),
        ('processing', 'Processing Winners'),
        ('completed', 'Completed'),
    ]

    PLATFORM_CHOICES = [
        ('instagram', 'Instagram'),
        ('tiktok', 'TikTok'),
        ('facebook', 'Facebook'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)

    # Reward
    reward_amount = models.DecimalField(max_digits=10, decimal_places=2)
    total_winners = models.IntegerField(default=1)

    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')

    # Dates
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.platform}"

    class Meta:
        ordering = ['-created_at']


class GiveawayWinner(models.Model):
    """Winners of giveaway campaigns"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    giveaway = models.ForeignKey(Giveaway, on_delete=models.CASCADE, related_name='winners')
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='giveaway_wins')
    reward_amount = models.DecimalField(max_digits=10, decimal_places=2)

    # Status
    is_claimed = models.BooleanField(default=False)
    claimed_at = models.DateTimeField(blank=True, null=True)
    transaction = models.ForeignKey(
        Transaction,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='giveaway_win'
    )

    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.giveaway.title} - {self.client.name}"

    class Meta:
        unique_together = ['giveaway', 'client']
        ordering = ['-created_at']


# ==================== SUPPORT SYSTEM MODELS ====================

class SupportTicket(models.Model):
    """Support tickets for client issues"""
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('waiting_client', 'Waiting for Client'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
    ]

    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]

    CATEGORY_CHOICES = [
        ('technical', 'Technical Issue'),
        ('billing', 'Billing'),
        ('feature_request', 'Feature Request'),
        ('general', 'General Inquiry'),
        ('project_update', 'Project Update Request'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ticket_number = models.CharField(max_length=20, unique=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='support_tickets')

    # Ticket details
    subject = models.CharField(max_length=255)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='general')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')

    # Assignment
    assigned_to = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_tickets'
    )

    # Timestamps
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    resolved_at = models.DateTimeField(blank=True, null=True)
    closed_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"#{self.ticket_number} - {self.subject}"

    def generate_ticket_number(self):
        """Generate unique ticket number"""
        import random
        import string
        while True:
            number = 'TKT-' + ''.join(random.choices(string.digits, k=6))
            if not SupportTicket.objects.filter(ticket_number=number).exists():
                return number

    def save(self, *args, **kwargs):
        if not self.ticket_number:
            self.ticket_number = self.generate_ticket_number()
        super().save(*args, **kwargs)

    class Meta:
        ordering = ['-created_at']


class TicketMessage(models.Model):
    """Messages within a support ticket"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ticket = models.ForeignKey(SupportTicket, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ticket_messages')
    message = models.TextField()

    # Attachments
    attachments = models.JSONField(default=list)

    # System message flag
    is_system_message = models.BooleanField(default=False)

    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Message in {self.ticket.ticket_number} from {self.sender.username}"

    class Meta:
        ordering = ['created_at']


# ==================== REDEEM CODE SYSTEM ====================

class RedeemCode(models.Model):
    """Redeem codes for wallet credits"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.CharField(max_length=50, unique=True, help_text='Unique redemption code')
    value = models.DecimalField(max_digits=10, decimal_places=2, help_text='Credit amount')
    description = models.TextField(blank=True, help_text='Internal description of the code purpose')

    # Usage tracking
    is_active = models.BooleanField(default=True)
    usage_limit = models.IntegerField(default=1, help_text='How many times this code can be used')
    times_used = models.IntegerField(default=0)

    # Expiration
    expires_at = models.DateTimeField(null=True, blank=True)

    # Audit
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='created_redeem_codes')
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.code} - ${self.value}"

    @property
    def is_valid(self):
        """Check if code is still valid"""
        if not self.is_active:
            return False
        if self.times_used >= self.usage_limit:
            return False
        if self.expires_at and timezone.now() > self.expires_at:
            return False
        return True

    def can_be_redeemed(self):
        """Check if code can be redeemed"""
        return self.is_valid


class RedeemCodeUsage(models.Model):
    """Track redeem code usage"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    redeem_code = models.ForeignKey(RedeemCode, on_delete=models.CASCADE, related_name='usages')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='redeemed_codes')
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name='redeem_usages')
    transaction = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    redeemed_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-redeemed_at']
        unique_together = ['redeem_code', 'user']

    def __str__(self):
        return f"{self.user.email} redeemed {self.redeem_code.code}"


# ==================== AGENT FEATURE MODELS ====================

class WebsiteVersion(models.Model):
    """Track website versions uploaded by website agents"""
    STATUS_CHOICES = [
        ('uploaded', 'Uploaded'),
        ('testing', 'Testing'),
        ('approved', 'Approved'),
        ('deployed', 'Deployed'),
        ('rejected', 'Rejected'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(WebsiteProject, on_delete=models.CASCADE, related_name='versions')
    agent = models.ForeignKey(Agent, on_delete=models.SET_NULL, null=True, related_name='uploaded_versions')

    version_number = models.CharField(max_length=50, help_text='e.g., v1.0, v1.1, v2.0')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='uploaded')

    # File storage
    file = models.FileField(upload_to='website_versions/%Y/%m/', help_text='Zip file containing website files')
    file_size = models.BigIntegerField(help_text='File size in bytes')

    # URLs
    preview_url = models.URLField(blank=True, help_text='URL where this version can be previewed')
    deployment_url = models.URLField(blank=True, help_text='Live deployment URL')

    # Notes and feedback
    notes = models.TextField(blank=True, help_text='Agent notes about this version')
    client_feedback = models.TextField(blank=True, help_text='Client feedback on this version')

    # Technical details
    technologies_used = models.JSONField(default=list, help_text='List of technologies/frameworks used')
    changelog = models.TextField(blank=True, help_text='List of changes in this version')

    # Timestamps
    uploaded_at = models.DateTimeField(default=timezone.now)
    approved_at = models.DateTimeField(blank=True, null=True)
    deployed_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        ordering = ['-uploaded_at']
        unique_together = ['project', 'version_number']

    def __str__(self):
        return f"{self.project.title} - {self.version_number}"


class Campaign(models.Model):
    """Marketing campaigns managed by marketing agents"""
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('scheduled', 'Scheduled'),
        ('active', 'Active'),
        ('paused', 'Paused'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    PLATFORM_CHOICES = [
        ('instagram', 'Instagram'),
        ('youtube', 'YouTube'),
        ('tiktok', 'TikTok'),
        ('multi', 'Multi-Platform'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='campaigns')
    agent = models.ForeignKey(Agent, on_delete=models.SET_NULL, null=True, related_name='campaigns')

    # Campaign details
    title = models.CharField(max_length=255)
    description = models.TextField()
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')

    # Dates
    start_date = models.DateField()
    end_date = models.DateField()

    # Goals and metrics
    goal = models.TextField(help_text='Campaign objective/goal')
    target_audience = models.TextField(blank=True)
    target_reach = models.IntegerField(default=0, help_text='Target reach/impressions')
    target_engagement = models.IntegerField(default=0, help_text='Target engagement count')
    budget = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    # Actual performance (updated as campaign runs)
    actual_reach = models.IntegerField(default=0)
    actual_engagement = models.IntegerField(default=0)
    actual_spend = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    # Content
    content_posts = models.ManyToManyField(ContentPost, blank=True, related_name='campaigns')

    # Timestamps
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} - {self.client.name}"

    @property
    def is_active(self):
        """Check if campaign is currently active"""
        return self.status == 'active' and timezone.now().date() >= self.start_date and timezone.now().date() <= self.end_date

    @property
    def performance_percentage(self):
        """Calculate overall performance percentage"""
        if self.target_reach == 0:
            return 0
        reach_pct = (self.actual_reach / self.target_reach) * 100 if self.target_reach > 0 else 0
        engagement_pct = (self.actual_engagement / self.target_engagement) * 100 if self.target_engagement > 0 else 0
        return (reach_pct + engagement_pct) / 2


class ContentSchedule(models.Model):
    """Content scheduling system for marketing agents"""
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('scheduled', 'Scheduled'),
        ('published', 'Published'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
    ]

    PLATFORM_CHOICES = [
        ('instagram', 'Instagram'),
        ('youtube', 'YouTube'),
        ('tiktok', 'TikTok'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='scheduled_content')
    agent = models.ForeignKey(Agent, on_delete=models.SET_NULL, null=True, related_name='scheduled_content')
    campaign = models.ForeignKey(Campaign, on_delete=models.SET_NULL, null=True, blank=True, related_name='scheduled_posts')

    # Content details
    title = models.CharField(max_length=255)
    caption = models.TextField()
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    social_account = models.ForeignKey(
        SocialMediaAccount,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='scheduled_posts'
    )

    # Scheduling
    scheduled_for = models.DateTimeField(help_text='When to publish this content')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')

    # Publishing
    published_at = models.DateTimeField(blank=True, null=True)
    post_url = models.URLField(blank=True, help_text='URL of published post')
    platform_post_id = models.CharField(max_length=255, blank=True, help_text='Platform-specific post ID')

    # Error handling
    error_message = models.TextField(blank=True)
    retry_count = models.IntegerField(default=0)

    # Media attachments (stored as file paths or URLs)
    media_files = models.JSONField(default=list, help_text='List of media file paths')

    # Hashtags and mentions
    hashtags = models.JSONField(default=list, help_text='List of hashtags')
    mentions = models.JSONField(default=list, help_text='List of @mentions')

    # Approval workflow
    requires_approval = models.BooleanField(default=True)
    approved_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='approved_scheduled_content'
    )
    approved_at = models.DateTimeField(blank=True, null=True)

    # Timestamps
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['scheduled_for']

    def __str__(self):
        return f"{self.title} - {self.client.name} - {self.scheduled_for}"

    @property
    def is_overdue(self):
        """Check if scheduled post is overdue"""
        return self.status == 'scheduled' and timezone.now() > self.scheduled_for