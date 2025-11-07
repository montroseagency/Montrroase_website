# Generated migration for ImageGalleryItem model

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImageGalleryItem',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('image', models.ImageField(upload_to='gallery/')),
                ('grid_column', models.IntegerField(default=1)),
                ('grid_row', models.IntegerField(default=1)),
                ('flex_width', models.CharField(default='1fr', max_length=20)),
                ('display_order', models.IntegerField(default=0)),
                ('alt_text', models.CharField(blank=True, max_length=255)),
                ('caption', models.TextField(blank=True)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['display_order'],
            },
        ),
    ]
