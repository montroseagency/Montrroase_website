# server/api/services/email_templates.py
"""
Email template methods for all notification types
"""
import resend
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

# Set Resend API key from settings
resend.api_key = settings.RESEND_API_KEY


class EmailTemplates:
    """Email templates for various notification types"""

    @staticmethod
    def _send_email(to_email, subject, html_content):
        """Helper method to send email via Resend"""
        try:
            response = resend.Emails.send({
                "from": settings.EMAIL_FROM_ADDRESS,
                "to": to_email,
                "subject": subject,
                "html": html_content
            })
            logger.info(f"Email sent to {to_email}: {subject}")
            return True
        except Exception as e:
            logger.error(f"Failed to send email to {to_email}: {str(e)}")
            return False

    @staticmethod
    def _base_template(heading, content):
        """Base HTML template for emails"""
        return f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }}
                .container {{
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 10px;
                    padding: 40px;
                    text-align: center;
                }}
                .content {{
                    background: white;
                    border-radius: 8px;
                    padding: 30px;
                    margin-top: 20px;
                    text-align: left;
                }}
                h1 {{
                    color: white;
                    margin: 0;
                    font-size: 28px;
                }}
                .button {{
                    display: inline-block;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white !important;
                    padding: 15px 30px;
                    border-radius: 8px;
                    text-decoration: none;
                    margin: 20px 0;
                    font-weight: bold;
                }}
                .footer {{
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid #e5e7eb;
                    font-size: 14px;
                    color: #666;
                }}
                .highlight {{
                    background: #f3f4f6;
                    padding: 15px;
                    border-radius: 8px;
                    margin: 20px 0;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>{heading}</h1>
                <div class="content">
                    {content}
                    <div class="footer">
                        <p>Best regards,<br>The VisionBoost Team</p>
                        <p style="font-size: 12px; color: #999;">
                            This is an automated email. Please do not reply.
                        </p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        """

    # ============ PAYMENT & INVOICE EMAILS ============

    @staticmethod
    def send_payment_confirmation(email, name, amount, transaction_id):
        """Send payment confirmation email"""
        content = f"""
            <p>Hi {name},</p>
            <p>We've received your payment! Thank you for your business.</p>

            <div class="highlight">
                <p style="margin: 0;"><strong>Amount Paid:</strong> ${amount}</p>
                <p style="margin: 5px 0 0 0;"><strong>Transaction ID:</strong> {transaction_id}</p>
            </div>

            <p>Your payment has been processed successfully and will reflect in your account shortly.</p>
        """

        html = EmailTemplates._base_template("Payment Received ✅", content)
        return EmailTemplates._send_email(email, "Payment Confirmation", html)

    @staticmethod
    def send_invoice_created(email, name, invoice_number, amount, due_date, invoice_url=None):
        """Send new invoice notification"""
        content = f"""
            <p>Hi {name},</p>
            <p>A new invoice has been generated for your account.</p>

            <div class="highlight">
                <p style="margin: 0;"><strong>Invoice #:</strong> {invoice_number}</p>
                <p style="margin: 5px 0 0 0;"><strong>Amount:</strong> ${amount}</p>
                <p style="margin: 5px 0 0 0;"><strong>Due Date:</strong> {due_date}</p>
            </div>

            <p>Please make sure to pay before the due date to avoid any service interruptions.</p>

            {f'<a href="{invoice_url}" class="button">View Invoice</a>' if invoice_url else ''}
        """

        html = EmailTemplates._base_template("New Invoice 💰", content)
        return EmailTemplates._send_email(email, f"New Invoice #{invoice_number}", html)

    @staticmethod
    def send_invoice_reminder(email, name, invoice_number, amount, days_until_due):
        """Send invoice due reminder"""
        content = f"""
            <p>Hi {name},</p>
            <p>This is a friendly reminder that you have an upcoming invoice due in <strong>{days_until_due} days</strong>.</p>

            <div class="highlight">
                <p style="margin: 0;"><strong>Invoice #:</strong> {invoice_number}</p>
                <p style="margin: 5px 0 0 0;"><strong>Amount:</strong> ${amount}</p>
            </div>

            <p>Please ensure timely payment to continue enjoying uninterrupted service.</p>
        """

        html = EmailTemplates._base_template("Invoice Due Soon 📅", content)
        return EmailTemplates._send_email(email, f"Invoice Reminder - Due in {days_until_due} Days", html)

    @staticmethod
    def send_invoice_overdue(email, name, invoice_number, amount):
        """Send overdue invoice notification"""
        content = f"""
            <p>Hi {name},</p>
            <p style="color: #dc2626;"><strong>Your invoice is now overdue.</strong></p>

            <div class="highlight" style="border-left: 4px solid #dc2626;">
                <p style="margin: 0;"><strong>Invoice #:</strong> {invoice_number}</p>
                <p style="margin: 5px 0 0 0;"><strong>Amount:</strong> ${amount}</p>
            </div>

            <p>Please make payment as soon as possible to avoid service suspension.</p>
            <p>If you've already paid, please disregard this message.</p>
        """

        html = EmailTemplates._base_template("Invoice Overdue ⚠️", content)
        return EmailTemplates._send_email(email, f"Urgent: Invoice #{invoice_number} Overdue", html)

    # ============ MESSAGE NOTIFICATIONS ============

    @staticmethod
    def send_message_notification(email, name, sender_name, message_preview):
        """Notify user of new message"""
        content = f"""
            <p>Hi {name},</p>
            <p>You have a new message from <strong>{sender_name}</strong>.</p>

            <div class="highlight">
                <p style="margin: 0; font-style: italic;">"{message_preview[:100]}{'...' if len(message_preview) > 100 else ''}"</p>
            </div>

            <a href="{settings.FRONTEND_URL}/dashboard/messages" class="button">View Message</a>
        """

        html = EmailTemplates._base_template("New Message 💬", content)
        return EmailTemplates._send_email(email, f"New message from {sender_name}", html)

    # ============ TASK NOTIFICATIONS ============

    @staticmethod
    def send_task_assigned(email, name, task_title, task_description, due_date):
        """Notify user of new task assignment"""
        content = f"""
            <p>Hi {name},</p>
            <p>A new task has been assigned to you.</p>

            <div class="highlight">
                <p style="margin: 0;"><strong>Task:</strong> {task_title}</p>
                <p style="margin: 10px 0 0 0;">{task_description}</p>
                {f'<p style="margin: 10px 0 0 0;"><strong>Due Date:</strong> {due_date}</p>' if due_date else ''}
            </div>

            <a href="{settings.FRONTEND_URL}/dashboard/tasks" class="button">View Task</a>
        """

        html = EmailTemplates._base_template("New Task Assigned 📝", content)
        return EmailTemplates._send_email(email, f"New Task: {task_title}", html)

    @staticmethod
    def send_task_completed(email, name, task_title):
        """Notify admin/client that task is completed"""
        content = f"""
            <p>Hi {name},</p>
            <p>Great news! The task "<strong>{task_title}</strong>" has been marked as completed.</p>

            <a href="{settings.FRONTEND_URL}/dashboard/tasks" class="button">View Details</a>
        """

        html = EmailTemplates._base_template("Task Completed ✅", content)
        return EmailTemplates._send_email(email, f"Task Completed: {task_title}", html)

    # ============ CONTENT NOTIFICATIONS ============

    @staticmethod
    def send_content_approved(email, name, content_title):
        """Notify client that content was approved"""
        content = f"""
            <p>Hi {name},</p>
            <p>Great news! Your content "<strong>{content_title}</strong>" has been approved and is ready for posting!</p>

            <p>Your content will be published according to the schedule.</p>

            <a href="{settings.FRONTEND_URL}/dashboard/content" class="button">View Content</a>
        """

        html = EmailTemplates._base_template("Content Approved ✅", content)
        return EmailTemplates._send_email(email, f"Content Approved: {content_title}", html)

    @staticmethod
    def send_content_rejected(email, name, content_title, feedback):
        """Notify client that content needs revision"""
        content = f"""
            <p>Hi {name},</p>
            <p>Your content "<strong>{content_title}</strong>" requires some revisions before we can proceed.</p>

            <div class="highlight">
                <p style="margin: 0;"><strong>Feedback:</strong></p>
                <p style="margin: 10px 0 0 0;">{feedback}</p>
            </div>

            <p>Please make the suggested changes and resubmit.</p>

            <a href="{settings.FRONTEND_URL}/dashboard/content" class="button">Edit Content</a>
        """

        html = EmailTemplates._base_template("Content Needs Revision 📝", content)
        return EmailTemplates._send_email(email, f"Revision Required: {content_title}", html)

    @staticmethod
    def send_content_posted(email, name, content_title, post_url):
        """Notify client that content was posted"""
        content = f"""
            <p>Hi {name},</p>
            <p>Your content "<strong>{content_title}</strong>" has been posted successfully!</p>

            <p>Check it out and see how your audience engages with it.</p>

            {f'<a href="{post_url}" class="button">View Post</a>' if post_url else ''}
        """

        html = EmailTemplates._base_template("Content Posted! 🚀", content)
        return EmailTemplates._send_email(email, f"Your Content is Live: {content_title}", html)

    # ============ WEBSITE PROJECT NOTIFICATIONS ============

    @staticmethod
    def send_website_phase_completed(email, name, project_name, phase_title):
        """Notify client that website phase is completed"""
        content = f"""
            <p>Hi {name},</p>
            <p>Great progress! The "<strong>{phase_title}</strong>" phase of your website project "<strong>{project_name}</strong>" has been completed.</p>

            <p>You can now proceed with the next payment phase to continue development.</p>

            <a href="{settings.FRONTEND_URL}/dashboard/website-builder" class="button">View Project</a>
        """

        html = EmailTemplates._base_template("Website Phase Completed ✅", content)
        return EmailTemplates._send_email(email, f"Phase Completed: {project_name}", html)

    @staticmethod
    def send_website_demo_ready(email, name, project_name, demo_url):
        """Notify client that website demo is ready"""
        content = f"""
            <p>Hi {name},</p>
            <p>Exciting news! Your website demo for "<strong>{project_name}</strong>" is now ready for preview.</p>

            <p>Take a look at what we've built and let us know your thoughts!</p>

            <a href="{demo_url}" class="button">View Demo</a>
        """

        html = EmailTemplates._base_template("Your Website Demo is Ready! 🎉", content)
        return EmailTemplates._send_email(email, f"Demo Ready: {project_name}", html)

    # ============ COURSE NOTIFICATIONS ============

    @staticmethod
    def send_course_enrollment(email, name, course_title):
        """Send course enrollment confirmation"""
        content = f"""
            <p>Hi {name},</p>
            <p>Welcome! You've successfully enrolled in "<strong>{course_title}</strong>".</p>

            <p>Start learning today and unlock your potential!</p>

            <a href="{settings.FRONTEND_URL}/dashboard/courses" class="button">Start Learning</a>
        """

        html = EmailTemplates._base_template("Course Enrollment Confirmed 🎓", content)
        return EmailTemplates._send_email(email, f"Enrolled: {course_title}", html)

    @staticmethod
    def send_course_completed(email, name, course_title):
        """Congratulate user on course completion"""
        content = f"""
            <p>Hi {name},</p>
            <p>🎉 Congratulations! You've successfully completed "<strong>{course_title}</strong>"!</p>

            <p>Your certificate is now available in your dashboard.</p>

            <a href="{settings.FRONTEND_URL}/dashboard/courses/certificates" class="button">View Certificate</a>
        """

        html = EmailTemplates._base_template("Course Completed! 🎉", content)
        return EmailTemplates._send_email(email, f"Congratulations: {course_title} Completed", html)

    # ============ SUBSCRIPTION NOTIFICATIONS ============

    @staticmethod
    def send_subscription_activated(email, name, plan_name):
        """Notify client of subscription activation"""
        content = f"""
            <p>Hi {name},</p>
            <p>Welcome to <strong>{plan_name}</strong>! Your subscription is now active.</p>

            <p>You now have full access to all features included in your plan.</p>

            <a href="{settings.FRONTEND_URL}/dashboard" class="button">Get Started</a>
        """

        html = EmailTemplates._base_template("Subscription Activated! 🎉", content)
        return EmailTemplates._send_email(email, f"{plan_name} Subscription Activated", html)

    @staticmethod
    def send_subscription_renewal_reminder(email, name, plan_name, renewal_date):
        """Remind client of upcoming subscription renewal"""
        content = f"""
            <p>Hi {name},</p>
            <p>Your <strong>{plan_name}</strong> subscription will renew on <strong>{renewal_date}</strong>.</p>

            <p>Please ensure your payment method is up to date to avoid any service interruption.</p>

            <a href="{settings.FRONTEND_URL}/dashboard/settings/billing" class="button">Update Payment Method</a>
        """

        html = EmailTemplates._base_template("Subscription Renewal Reminder 🔄", content)
        return EmailTemplates._send_email(email, f"Subscription Renewal: {renewal_date}", html)
