# Generated manually for agent functionality

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_course_giveaway_supportticket_websiteproject_wallet_and_more'),
    ]

    operations = [
        # Add 'agent' to User role choices
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(
                max_length=10,
                choices=[('admin', 'Admin'), ('client', 'Client'), ('agent', 'Agent')],
                default='client'
            ),
        ),

        # Create Agent model
        migrations.CreateModel(
            name='Agent',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('department', models.CharField(
                    max_length=50,
                    choices=[
                        ('marketing', 'Marketing'),
                        ('website', 'Website Development'),
                        ('support', 'Support'),
                        ('general', 'General'),
                    ],
                    default='general'
                )),
                ('specialization', models.CharField(blank=True, max_length=255, help_text='Areas of expertise')),
                ('is_active', models.BooleanField(default=True)),
                ('max_clients', models.IntegerField(default=10, help_text='Maximum number of clients this agent can handle')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='agent_profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),

        # Add assigned_agent field to Client model
        migrations.AddField(
            model_name='client',
            name='assigned_agent',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name='assigned_clients',
                to='api.agent',
                help_text='Agent assigned to manage this client'
            ),
        ),
    ]
