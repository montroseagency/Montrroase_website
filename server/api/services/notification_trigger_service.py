# server/api/services/notification_trigger_service.py
"""
Unified service for triggering both in-app notifications AND email notifications
This service should be called from views/signals when events occur
"""
from .notification_service import NotificationService
from .email_templates import EmailTemplates
import logging

logger = logging.getLogger(__name__)


class NotificationTriggerService:
    """Service that triggers both in-app notifications and emails for various events"""

    # ============ PAYMENT & INVOICE TRIGGERS ============

    @staticmethod
    def trigger_payment_confirmation(user, amount, transaction_id):
        """Trigger notification + email for payment confirmation"""
        try:
            # Create in-app notification
            NotificationService.create_notification(
                user=user,
                title="Payment Received ✅",
                message=f"Your payment of ${amount} has been received and processed. Transaction ID: {transaction_id}",
                notification_type='payment_received'
            )

            # Send email
            name = f"{user.first_name} {user.last_name}".strip() or user.email
            EmailTemplates.send_payment_confirmation(user.email, name, amount, transaction_id)

            logger.info(f"Payment confirmation triggered for {user.email}")
        except Exception as e:
            logger.error(f"Error triggering payment confirmation: {e}")

    @staticmethod
    def trigger_invoice_created(user, invoice):
        """Trigger notification + email for new invoice"""
        try:
            # Create in-app notification
            NotificationService.notify_invoice_created(user, invoice)

            # Send email
            name = f"{user.first_name} {user.last_name}".strip() or user.email
            EmailTemplates.send_invoice_created(
                email=user.email,
                name=name,
                invoice_number=invoice.invoice_number,
                amount=invoice.amount,
                due_date=invoice.due_date.strftime('%B %d, %Y')
            )

            logger.info(f"Invoice created notification triggered for {user.email}")
        except Exception as e:
            logger.error(f"Error triggering invoice created notification: {e}")

    @staticmethod
    def trigger_invoice_reminder(user, invoice, days_until_due):
        """Trigger notification + email for invoice due soon"""
        try:
            # Create in-app notification
            NotificationService.notify_invoice_due_soon(user, invoice)

            # Send email
            name = f"{user.first_name} {user.last_name}".strip() or user.email
            EmailTemplates.send_invoice_reminder(
                email=user.email,
                name=name,
                invoice_number=invoice.invoice_number,
                amount=invoice.amount,
                days_until_due=days_until_due
            )

            logger.info(f"Invoice reminder triggered for {user.email}")
        except Exception as e:
            logger.error(f"Error triggering invoice reminder: {e}")

    @staticmethod
    def trigger_invoice_overdue(user, invoice):
        """Trigger notification + email for overdue invoice"""
        try:
            # Create in-app notification
            NotificationService.notify_invoice_overdue(user, invoice)

            # Send email
            name = f"{user.first_name} {user.last_name}".strip() or user.email
            EmailTemplates.send_invoice_overdue(
                email=user.email,
                name=name,
                invoice_number=invoice.invoice_number,
                amount=invoice.amount
            )

            logger.info(f"Invoice overdue notification triggered for {user.email}")
        except Exception as e:
            logger.error(f"Error triggering invoice overdue notification: {e}")

    # ============ MESSAGE TRIGGERS ============

    @staticmethod
    def trigger_message_notification(recipient_user, sender_name, message_preview):
        """Trigger notification + email for new message"""
        try:
            # Create in-app notification
            NotificationService.notify_message_received(recipient_user, sender_name)

            # Send email
            name = f"{recipient_user.first_name} {recipient_user.last_name}".strip() or recipient_user.email
            EmailTemplates.send_message_notification(
                email=recipient_user.email,
                name=name,
                sender_name=sender_name,
                message_preview=message_preview
            )

            logger.info(f"Message notification triggered for {recipient_user.email}")
        except Exception as e:
            logger.error(f"Error triggering message notification: {e}")

    # ============ TASK TRIGGERS ============

    @staticmethod
    def trigger_task_assigned(user, task):
        """Trigger notification + email for task assignment"""
        try:
            # Create in-app notification
            NotificationService.create_notification(
                user=user,
                title="New Task Assigned 📝",
                message=f"You have been assigned a new task: {task.title}",
                notification_type='task_assigned'
            )

            # Send email
            name = f"{user.first_name} {user.last_name}".strip() or user.email
            EmailTemplates.send_task_assigned(
                email=user.email,
                name=name,
                task_title=task.title,
                task_description=task.description or "",
                due_date=task.due_date.strftime('%B %d, %Y') if task.due_date else None
            )

            logger.info(f"Task assigned notification triggered for {user.email}")
        except Exception as e:
            logger.error(f"Error triggering task assigned notification: {e}")

    @staticmethod
    def trigger_task_completed(user, task):
        """Trigger notification + email for task completion"""
        try:
            # Create in-app notification
            NotificationService.create_notification(
                user=user,
                title="Task Completed ✅",
                message=f"Task '{task.title}' has been marked as completed",
                notification_type='task_completed'
            )

            # Send email
            name = f"{user.first_name} {user.last_name}".strip() or user.email
            EmailTemplates.send_task_completed(
                email=user.email,
                name=name,
                task_title=task.title
            )

            logger.info(f"Task completed notification triggered for {user.email}")
        except Exception as e:
            logger.error(f"Error triggering task completed notification: {e}")

    # ============ CONTENT TRIGGERS ============

    @staticmethod
    def trigger_content_approved(client_user, content_post):
        """Trigger notification + email for content approval"""
        try:
            # Create in-app notification
            NotificationService.notify_content_approved(client_user, content_post)

            # Send email
            name = f"{client_user.first_name} {client_user.last_name}".strip() or client_user.email
            content_title = content_post.caption[:50] + '...' if len(content_post.caption) > 50 else content_post.caption
            EmailTemplates.send_content_approved(
                email=client_user.email,
                name=name,
                content_title=content_title
            )

            logger.info(f"Content approved notification triggered for {client_user.email}")
        except Exception as e:
            logger.error(f"Error triggering content approved notification: {e}")

    @staticmethod
    def trigger_content_rejected(client_user, content_post, feedback=""):
        """Trigger notification + email for content rejection"""
        try:
            # Create in-app notification
            NotificationService.notify_content_rejected(client_user, content_post, feedback)

            # Send email
            name = f"{client_user.first_name} {client_user.last_name}".strip() or client_user.email
            content_title = content_post.caption[:50] + '...' if len(content_post.caption) > 50 else content_post.caption
            EmailTemplates.send_content_rejected(
                email=client_user.email,
                name=name,
                content_title=content_title,
                feedback=feedback or "Please review and make necessary changes."
            )

            logger.info(f"Content rejected notification triggered for {client_user.email}")
        except Exception as e:
            logger.error(f"Error triggering content rejected notification: {e}")

    @staticmethod
    def trigger_content_posted(client_user, content_post):
        """Trigger notification + email for content posting"""
        try:
            # Create in-app notification
            NotificationService.notify_content_posted(client_user, content_post)

            # Send email
            name = f"{client_user.first_name} {client_user.last_name}".strip() or client_user.email
            content_title = content_post.caption[:50] + '...' if len(content_post.caption) > 50 else content_post.caption
            EmailTemplates.send_content_posted(
                email=client_user.email,
                name=name,
                content_title=content_title,
                post_url=content_post.post_url or ""
            )

            logger.info(f"Content posted notification triggered for {client_user.email}")
        except Exception as e:
            logger.error(f"Error triggering content posted notification: {e}")

    # ============ WEBSITE PROJECT TRIGGERS ============

    @staticmethod
    def trigger_website_phase_completed(client_user, project, phase):
        """Trigger notification + email for website phase completion"""
        try:
            # Create in-app notification
            NotificationService.create_notification(
                user=client_user,
                title="Website Phase Completed ✅",
                message=f"Phase '{phase.title}' of your website project '{project.title}' has been completed!",
                notification_type='website_phase_completed'
            )

            # Send email
            name = f"{client_user.first_name} {client_user.last_name}".strip() or client_user.email
            EmailTemplates.send_website_phase_completed(
                email=client_user.email,
                name=name,
                project_name=project.title,
                phase_title=phase.title
            )

            logger.info(f"Website phase completed notification triggered for {client_user.email}")
        except Exception as e:
            logger.error(f"Error triggering website phase completed notification: {e}")

    @staticmethod
    def trigger_website_demo_ready(client_user, project):
        """Trigger notification + email for website demo ready"""
        try:
            # Create in-app notification
            NotificationService.create_notification(
                user=client_user,
                title="Website Demo Ready! 🎉",
                message=f"Your website demo for '{project.title}' is now ready for preview!",
                notification_type='website_demo_ready'
            )

            # Send email
            name = f"{client_user.first_name} {client_user.last_name}".strip() or client_user.email
            EmailTemplates.send_website_demo_ready(
                email=client_user.email,
                name=name,
                project_name=project.title,
                demo_url=project.demo_url or ""
            )

            logger.info(f"Website demo ready notification triggered for {client_user.email}")
        except Exception as e:
            logger.error(f"Error triggering website demo ready notification: {e}")

    # ============ COURSE TRIGGERS ============

    @staticmethod
    def trigger_course_enrollment(user, course):
        """Trigger notification + email for course enrollment"""
        try:
            # Create in-app notification
            NotificationService.create_notification(
                user=user,
                title="Course Enrollment Confirmed 🎓",
                message=f"You've successfully enrolled in '{course.title}'. Start learning today!",
                notification_type='course_enrollment'
            )

            # Send email
            name = f"{user.first_name} {user.last_name}".strip() or user.email
            EmailTemplates.send_course_enrollment(
                email=user.email,
                name=name,
                course_title=course.title
            )

            logger.info(f"Course enrollment notification triggered for {user.email}")
        except Exception as e:
            logger.error(f"Error triggering course enrollment notification: {e}")

    @staticmethod
    def trigger_course_completed(user, course):
        """Trigger notification + email for course completion"""
        try:
            # Create in-app notification
            NotificationService.create_notification(
                user=user,
                title="Course Completed! 🎉",
                message=f"Congratulations! You've completed '{course.title}'. Your certificate is now available.",
                notification_type='course_completed'
            )

            # Send email
            name = f"{user.first_name} {user.last_name}".strip() or user.email
            EmailTemplates.send_course_completed(
                email=user.email,
                name=name,
                course_title=course.title
            )

            logger.info(f"Course completed notification triggered for {user.email}")
        except Exception as e:
            logger.error(f"Error triggering course completed notification: {e}")

    # ============ SUBSCRIPTION TRIGGERS ============

    @staticmethod
    def trigger_subscription_activated(client_user, plan_name):
        """Trigger notification + email for subscription activation"""
        try:
            # Create in-app notification
            NotificationService.notify_subscription_activated(client_user, plan_name)

            # Send email
            name = f"{client_user.first_name} {client_user.last_name}".strip() or client_user.email
            EmailTemplates.send_subscription_activated(
                email=client_user.email,
                name=name,
                plan_name=plan_name
            )

            logger.info(f"Subscription activated notification triggered for {client_user.email}")
        except Exception as e:
            logger.error(f"Error triggering subscription activated notification: {e}")

    @staticmethod
    def trigger_subscription_renewal_reminder(client_user, plan_name, renewal_date):
        """Trigger notification + email for subscription renewal reminder"""
        try:
            # Create in-app notification
            NotificationService.notify_subscription_renewal_reminder(client_user, renewal_date)

            # Send email
            name = f"{client_user.first_name} {client_user.last_name}".strip() or client_user.email
            EmailTemplates.send_subscription_renewal_reminder(
                email=client_user.email,
                name=name,
                plan_name=plan_name,
                renewal_date=renewal_date.strftime('%B %d, %Y')
            )

            logger.info(f"Subscription renewal reminder triggered for {client_user.email}")
        except Exception as e:
            logger.error(f"Error triggering subscription renewal reminder: {e}")
