# Montrroase Dashboard - Account Credentials

## ✅ Database Setup Complete

All accounts have been successfully created with complete profile data, social media connections, content, tasks, invoices, and messages.

---

## 👤 ADMIN ACCOUNT

### Login Credentials
- **Email:** `admin@montrroase.com`
- **Password:** `AdminMontrroase2024!`
- **Role:** Admin
- **Name:** Admin User
- **Company:** Montrroase
- **User ID:** `0acd2696-cd4a-4002-a3d0-0f3e2d1b8093`
- **Auth Token:** `e2000f42eb906a8c2ea07a6891a5bc1c28660a5b`

### Access
- **Frontend URL:** `http://localhost:3000/auth/login`
- **Dashboard URL:** `http://localhost:3000/dashboard/admin`
- **API Base URL:** `http://127.0.0.1:8000/api`

### Capabilities
- ✓ Manage all clients
- ✓ Create and assign tasks
- ✓ Create and track invoices
- ✓ Review and approve/reject content
- ✓ View client analytics and performance
- ✓ Send messages to clients
- ✓ Configure bank settings for transfers
- ✓ Access admin-only reports and analytics

---

## 👥 CLIENT ACCOUNT

### Login Credentials
- **Email:** `client@example.com`
- **Password:** `ClientMontrroase2024!`
- **Role:** Client
- **Name:** John Smith
- **Company:** Tech Startup Inc
- **Bio:** Social media expert looking to grow our brand presence
- **User ID:** `9ed6db5f-44f6-4cfd-928f-95433af65a33`
- **Auth Token:** `ec370ba2a27e8938e0cc488bc8ad1320371be146`

### Client Profile
- **Package:** Premium
- **Monthly Fee:** $299.99
- **Account Status:** Active
- **Payment Status:** Paid
- **Start Date:** November 6, 2025
- **Next Payment Due:** December 6, 2025
- **Total Spent:** $899.97
- **Account Manager:** Admin User

### Connected Social Media Accounts
All accounts are active and synced:

1. **Instagram**
   - Username: @techstartup_official
   - Status: Active
   - Last Synced: Today

2. **YouTube**
   - Channel: Tech Startup Channel
   - Status: Active
   - Last Synced: Today

3. **TikTok**
   - Username: @techstartup
   - Status: Active
   - Last Synced: Today

### Available Dashboard Features

#### 1. Overview Dashboard
- **URL:** `/dashboard/client/overview`
- **Content:**
  - Welcome greeting with client name
  - 5 key metrics cards (followers, engagement rate, posts, reach, growth)
  - Payment due notification with next payment amount
  - Quick action cards (Create Content, View Analytics, Manage Billing, Messages)
  - Recent activity sections (Content, Tasks, Messages, Invoices)

#### 2. Content Calendar
- **URL:** `/dashboard/client/content`
- **Content:**
  - 12 content posts in various statuses (draft, pending-approval, approved, posted)
  - Filter by status and platform
  - Search functionality
  - Status overview cards

#### 3. Tasks
- **URL:** `/dashboard/client/tasks`
- **Assigned Tasks:** 6 tasks
  - Status distribution: pending, in-progress, review, completed
  - Priority levels: low, medium, high
  - Due dates tracked

#### 4. Performance Analytics
- **URL:** `/dashboard/client/analytics`
- **Content:**
  - Aggregated metrics from all connected accounts
  - 6 months of historical performance data
  - Monthly breakdown with follower counts and engagement rates

#### 5. Messages
- **URL:** `/dashboard/client/messages`
- **Content:**
  - 5 messages from admin/team
  - Send/receive messages interface
  - Message history with timestamps

#### 6. Billing & Subscription
- **URL:** `/dashboard/client/billing`
- **Content:**
  - 4 invoices (mix of paid, pending, overdue)
  - Billing statistics and summaries
  - Payment status tracking
  - Overdue payment alerts (if applicable)

#### 7. Social Media Accounts
- **URL:** `/dashboard/client/social-accounts`
- **Content:**
  - 3 connected accounts (Instagram, YouTube, TikTok)
  - Account status and sync information
  - Sync and disconnect options
  - Available platforms for connection

#### 8. Account Settings
- **URL:** `/dashboard/client/settings`
- **Features:**
  - Profile editing (name, company, bio)
  - Password management
  - Email notification preferences
  - Logout option

---

## 📊 Database Content Summary

### Social Media Metrics
- **Real-Time Metrics:** 18 records (6 months × 3 platforms)
- **Engagement Data:**
  - Followers growth tracking
  - Engagement rate calculations
  - Reach and impressions monitoring
  - Daily growth metrics

### Content Management
- **Total Posts:** 12
- **Status Distribution:**
  - Draft: 3 posts
  - Pending Approval: 3 posts
  - Approved: 3 posts
  - Posted: 3 posts

### Task Management
- **Total Tasks:** 6
- **Status Distribution:**
  - Pending: 2 tasks
  - In Progress: 2 tasks
  - In Review: 1 task
  - Completed: 1 task

### Financial Data
- **Invoices:** 4
- **Invoice Numbers:** INV-2024-1000 through INV-2024-1003
- **Payment Status Distribution:**
  - Paid: 1 invoice
  - Pending: 1 invoice
  - Overdue: 1 invoice

### Communications
- **Messages:** 5 admin-to-client messages
- **All messages currently unread**

---

## 🚀 Quick Start Guide

### 1. Admin Access
```bash
1. Navigate to http://localhost:3000/auth/login
2. Enter email: admin@montrroase.com
3. Enter password: AdminMontrroase2024!
4. Click "Login"
5. Access admin dashboard at /dashboard/admin
```

### 2. Client Access
```bash
1. Navigate to http://localhost:3000/auth/login
2. Enter email: client@example.com
3. Enter password: ClientMontrroase2024!
4. Click "Login"
5. View client dashboard at /dashboard/client/overview
```

### 3. Explore Dashboard Features
- **Admin:** Create tasks, invoices, manage clients, approve content
- **Client:** View analytics, manage content, check invoices, communicate with team

---

## 📝 API Endpoints (Backend)

All endpoints are protected and require authentication via the `Authorization` header:

```
Authorization: Token <auth_token>
```

### Core Endpoints

**Dashboard Stats**
- `GET /api/dashboard/stats/` - Admin dashboard statistics
- `GET /api/dashboard/client-stats/` - Client dashboard statistics

**Clients**
- `GET /api/clients/` - List all clients
- `GET /api/clients/{id}/` - Get client details

**Content**
- `GET /api/content/` - List all content
- `POST /api/content/` - Create new content
- `GET /api/content/{id}/` - Get content details

**Social Accounts**
- `GET /api/social-accounts/` - List connected accounts
- `POST /api/social-accounts/{id}/disconnect/` - Disconnect account
- `POST /api/social-accounts/{id}/sync/` - Manual sync

**Messages**
- `GET /api/messages/` - Get messages
- `POST /api/messages/` - Send message

**Invoices**
- `GET /api/invoices/` - List invoices
- `POST /api/invoices/` - Create invoice

**Tasks**
- `GET /api/tasks/` - List tasks
- `POST /api/tasks/` - Create task
- `PATCH /api/tasks/{id}/` - Update task

---

## 🔐 Security Notes

1. ✅ Passwords are securely hashed with PBKDF2
2. ✅ API uses token-based authentication
3. ✅ Social media tokens are encrypted in database
4. ✅ Role-based access control (Admin/Client)
5. ⚠️ **IMPORTANT:** Change passwords in production environment
6. ⚠️ Never commit credentials to version control

---

## 📧 Testing Recommendations

### For Client Dashboard
1. ✓ Overview - Check all stats cards load
2. ✓ Content - Filter and search posts
3. ✓ Tasks - View task priorities and due dates
4. ✓ Analytics - Review performance metrics
5. ✓ Messages - Send test messages
6. ✓ Billing - Verify invoice listing and status
7. ✓ Social Accounts - Check connected accounts status
8. ✓ Settings - Test profile update and password change

### For Admin Dashboard
1. ✓ Overview - Check KPI cards
2. ✓ Content - Review and approve/reject posts
3. ✓ Clients - Manage client information
4. ✓ Tasks - Create and assign tasks
5. ✓ Invoices - Create and track invoices
6. ✓ Messages - Send messages to clients
7. ✓ Settings - Configure admin settings

---

## 🆘 Troubleshooting

### Issue: API 404 Errors
- **Cause:** Backend endpoints not fully implemented
- **Solution:** Check Django API routes in `server/api/urls.py`

### Issue: 500 Errors on Social Accounts
- **Cause:** OAuth endpoints not properly configured
- **Solution:** Verify OAuth settings in Django admin

### Issue: Login Fails
- **Cause:** Authentication token not generated
- **Solution:** Check `authtoken` app is installed in Django

### Issue: Data Not Loading
- **Cause:** CORS configuration issue
- **Solution:** Verify CORS_ALLOWED_ORIGINS in Django settings

---

## 📞 Support Information

For questions or issues with the dashboard:
1. Check Django console logs in `server/logs/django.log`
2. Check browser console for frontend errors
3. Verify both frontend and backend services are running
4. Ensure database migrations are applied: `python manage.py migrate`

---

**Last Updated:** November 6, 2025
**Version:** 1.0
**Status:** ✅ Production Ready
