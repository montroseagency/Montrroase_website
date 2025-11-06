# Vite-Frontend to Next.js Client Migration Guide

## Overview
This document outlines the successful migration of the Vite frontend authentication and API integration to the Next.js client application. The migration includes types, API service, authentication context, and authentication pages.

---

## ✅ Completed Tasks

### 1. **TypeScript Types Migration** ✓
**Status**: Complete
**Files Created**:
- `client/lib/types.ts` - All TypeScript type definitions
- `client/lib/events.ts` - Event type definitions

**Details**:
- Replicated 60+ type definitions from vite_frontend
- Includes: AuthUser, Client, Task, ContentPost, Invoice, Message, Notification, etc.
- Dashboard stats, performance data, OAuth, social media types
- API response types and pagination models
- Form and UI component type definitions
- Constants for platforms, task statuses, content statuses, user roles

---

### 2. **API Service Implementation** ✓
**Status**: Complete
**File Created**: `client/lib/api.ts`

**Singleton API Service with 100+ endpoints**:
- **Authentication**: login, register, logout, getCurrentUser
- **Email Verification**: sendVerificationCode, verifyAndRegister, resendVerificationCode
- **Profile Management**: updateProfile, updateProfileWithAvatar, changePassword
- **Dashboard**: getDashboardStats, getClientDashboardStats
- **Clients**: getClients, getClient, updateClient, updatePaymentStatus
- **Tasks**: getTasks, createTask, updateTask, deleteTask, bulkUpdateTasks
- **Content Management**: 13 content-related methods including approval, rejection, and bulk operations
- **Analytics**: getAnalyticsOverview, getClientPerformanceReport, getPerformanceData
- **Messaging**: sendMessage, getMessages, getConversations, markMessageRead
- **Notifications**: getNotifications, markNotificationRead, markAllNotificationsRead
- **Invoices**: getInvoices, markInvoicePaid, createInvoice
- **Social Accounts**: getConnectedAccounts, initiateOAuth, handleOAuthCallback, disconnectAccount
- **PayPal Billing**: subscription and payment methods (7 methods)
- **Bank Transfers**: bank settings and payment verification
- **File Uploads**: uploadFile with FormData support
- **Health Check**: healthCheck endpoint

**Key Features**:
- Browser-safe localStorage checks (prevents SSR errors)
- Automatic token refresh in Authorization headers
- FormData support for file uploads
- Django REST Framework pagination handling
- 401 error handling with automatic redirect to login
- Generic type safety with TypeScript generics

---

### 3. **Authentication Context** ✓
**Status**: Complete
**File Created**: `client/lib/auth-context.tsx`

**Features**:
- User state management (login/logout/register)
- Error state management
- Loading state for async operations
- Automatic session restoration on app load
- User initialization check
- Role-based authentication context
- Provider component for app-wide auth access

**Methods**:
- `login(email, password)` - Returns boolean success
- `register(userData)` - Handles 3-step registration
- `logout()` - Clears tokens and redirects to login
- All states wrapped in AuthContextType interface

---

### 4. **useAuth Hook** ✓
**Status**: Complete
**File Created**: `client/lib/hooks/useAuth.ts`

**Usage**:
```typescript
import { useAuth } from '@/lib/hooks/useAuth';

const { user, login, register, logout, loading, error, isAuthenticated } = useAuth();
```

---

### 5. **Authentication Pages & Components** ✓
**Status**: Complete

**Files Created/Updated**:
- `client/components/auth/AuthForm.tsx` - Unified auth component
- `client/app/auth/login/page.tsx` - Login page
- `client/app/auth/register/page.tsx` - Registration page

**3-Step Registration Flow**:
1. **Step 1 - Basic Info** (33%):
   - Full name input
   - Email input with validation
   - Company input (optional)
   - Form validation

2. **Step 2 - Password** (66%):
   - Password input with visibility toggle
   - Password strength indicators:
     - At least 8 characters
     - Upper & lowercase letters
     - At least one number
   - Sends verification code to email via API

3. **Step 3 - Email Verification** (100%):
   - 6-digit code input
   - Resend button with 60-second cooldown
   - Back button to previous step
   - Calls verifyAndRegister endpoint

**Login Form**:
- Email and password fields
- Remember me checkbox
- Forgot password link
- Toggle to signup
- Error display with icons

**Features**:
- Beautiful gradient UI (purple to pink)
- Progress indicators for signup
- Real-time password validation
- Form error handling
- Loading states
- Responsive design (mobile-first)
- Uses lucide-react icons

---

### 6. **Environment Configuration** ✓
**Status**: Complete
**File Created**: `client/.env.local.example`

**Environment Variables**:
```
NEXT_PUBLIC_API_URL=https://montrose.agency/api
# For local development:
# NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

**Setup Instructions**:
1. Copy `.env.local.example` to `.env.local`
2. Update `NEXT_PUBLIC_API_URL` with your backend URL
3. Make sure AuthProvider is wrapping your app (already done in root layout)

---

### 7. **Root Layout Update** ✓
**Status**: Complete
**File Updated**: `client/app/layout.tsx`

**Changes**:
- Added `AuthProvider` wrapper around all children
- Enables `useAuth` hook throughout the app
- Provides authentication context to all routes

---

## 🔄 Migration Architecture

### Flow Diagram
```
User Browser
    ↓
Next.js Client (React 19)
    ↓
AuthProvider (Context)
    ↓
Pages/Components use useAuth()
    ↓
AuthForm (Login/Register)
    ↓
ApiService (Singleton)
    ↓
Backend API (Django)
```

### Data Flow
1. **Initialization**: App loads → AuthProvider checks localStorage for token
2. **Token Recovery**: If token exists → `getCurrentUser()` called → User state restored
3. **Login**: User submits credentials → `login()` called → Token stored → User redirected to dashboard
4. **Registration (3-step)**:
   - Step 1-2: Form data validated locally
   - Step 2: `sendVerificationCode()` → Email sent
   - Step 3: `verifyAndRegister()` → Account created → Token received → Redirected to dashboard
5. **Logout**: `logout()` → API call → Token cleared → Redirected to login page

---

## 🚀 Quick Start

### Setup
1. **Install dependencies**:
   ```bash
   cd client
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your API URL
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Access application**:
   - Home: http://localhost:3000
   - Login: http://localhost:3000/auth/login
   - Register: http://localhost:3000/auth/register

### Testing Authentication
1. Navigate to http://localhost:3000/auth/register
2. Complete 3-step signup:
   - Enter name, email, company
   - Create password (8+ chars, mixed case, numbers)
   - Enter 6-digit code from email
3. Or navigate to login and enter credentials

---

## 📁 File Structure

```
client/
├── lib/
│   ├── api.ts                    # API service (100+ endpoints)
│   ├── auth-context.tsx          # Auth provider & useAuth hook
│   ├── types.ts                  # All TypeScript definitions
│   ├── events.ts                 # Event type definitions
│   └── hooks/
│       └── useAuth.ts            # Auth hook export
├── components/
│   └── auth/
│       └── AuthForm.tsx          # Unified login/register form
├── app/
│   ├── layout.tsx                # Root layout with AuthProvider
│   └── auth/
│       ├── login/page.tsx        # Login page
│       └── register/page.tsx     # Registration page
└── .env.local.example            # Environment template
```

---

## 🔧 API Service Usage

### Basic Usage
```typescript
import ApiService from '@/lib/api';

// Authentication
const loginResponse = await ApiService.login('user@example.com', 'password');
const user = await ApiService.getCurrentUser();
await ApiService.logout();

// Client operations
const clients = await ApiService.getClients();
const singleClient = await ApiService.getClient('client-id');

// Content management
const content = await ApiService.getContent();
const approved = await ApiService.approveContent('content-id');

// Tasks
const tasks = await ApiService.getTasks();
const created = await ApiService.createTask({ title: 'New Task', ... });

// Analytics
const stats = await ApiService.getDashboardStats();
const performance = await ApiService.getAnalyticsOverview();
```

### Advanced Features
```typescript
// FormData for file uploads
const formData = new FormData();
formData.append('file', file);
await ApiService.uploadFile(file, 'client-id', 'image');

// Content with images
const contentFormData = new FormData();
contentFormData.append('content', 'Post content');
contentFormData.append('image', imageFile);
await ApiService.createContent(contentFormData);

// Paginated data
const allData = await ApiService.getAllPaginatedData('/clients/', 10);

// Message handling (special cases for admin)
if (user.role === 'admin') {
  await ApiService.sendMessage('client-id', 'Message');
} else {
  await ApiService.sendMessage('admin', 'Message to admin');
}
```

---

## 🔐 Token Management

**Automatic**:
- Token stored in `localStorage` with key `auth_token`
- User data stored in `localStorage` with key `user`
- Token automatically added to all requests
- Invalid token (401 error) triggers redirect to login

**Manual Control**:
```typescript
// Set token manually
ApiService.setToken('your-token');

// Check authentication status
const isAuthenticated = ApiService.isAuthenticated();

// Get token
const token = ApiService.getToken();

// Clear token
ApiService.clearToken();
```

---

## 🎯 What Still Needs Implementation

Based on the vite_frontend structure, the following still need to be implemented in Next.js:

### 1. **Admin Dashboard** (`/dashboard/admin/`)
- Overview/home page with stats
- Client management interface
- Invoice and billing management
- Content approval workflow
- Task management
- Messaging system
- Analytics and reports
- Team/user settings

### 2. **Client Dashboard** (`/dashboard/client/`)
- Overview/home page with personal stats
- Content submission and tracking
- Billing and subscription management
- Messaging with admin
- Performance analytics
- Task list
- Social media accounts management
- Settings

### 3. **Components to Migrate**
- Dashboard layout with sidebar/topbar
- Chart/analytics components
- Data tables and lists
- Modal dialogs
- Payment forms (PayPal integration)
- Social media connection flow
- Calendar view for content

### 4. **Additional Pages**
- Password reset flow
- Account settings
- Social media oauth callbacks
- Email verification (already have signup version)

---

## 🧪 Testing Checklist

- [ ] **Login Flow**
  - [ ] Valid credentials → Redirect to dashboard
  - [ ] Invalid credentials → Error message
  - [ ] Token persists on page refresh

- [ ] **Registration Flow**
  - [ ] Step 1 validation (name, email required)
  - [ ] Step 2 validation (8+ chars, mixed case, numbers)
  - [ ] Email verification code received
  - [ ] Invalid code → Error message
  - [ ] Resend code → Works with cooldown
  - [ ] Account created → Logged in automatically

- [ ] **API Service**
  - [ ] All endpoints accessible with auth token
  - [ ] FormData uploads work correctly
  - [ ] Pagination handling works
  - [ ] 401 errors redirect to login
  - [ ] Error messages display correctly

- [ ] **State Management**
  - [ ] useAuth hook available throughout app
  - [ ] User state updates on login
  - [ ] Loading states display correctly
  - [ ] Errors clear appropriately

---

## 📝 Next Steps

1. **Create Dashboard Layouts**
   - Admin dashboard sidebar/topbar
   - Client dashboard sidebar/topbar
   - Dashboard provider/context if needed

2. **Implement Dashboard Pages**
   - Start with overview/home pages
   - Move to specific features (clients, tasks, content, etc.)
   - Use the existing ApiService methods

3. **Add Protected Routes**
   - Middleware to protect `/dashboard` routes
   - Redirect unauthenticated users to login
   - Role-based access control (admin vs client)

4. **Implement Remaining Features**
   - OAuth social media connection
   - PayPal payment integration
   - Real-time notifications (WebSocket?)
   - File upload management
   - Analytics charts and visualizations

5. **Testing & Deployment**
   - Unit tests for components
   - Integration tests for API calls
   - E2E tests for critical flows
   - Deploy to production

---

## 🎨 Design System

The authentication forms use:
- **Colors**: Purple (#6366f1) to Pink (#ec4899) gradient
- **Typography**: Inter (sans) and Poppins (display)
- **Spacing**: Tailwind CSS utilities
- **Icons**: lucide-react (Eye, EyeOff, AlertCircle, CheckCircle, Arrow icons)
- **Responsive**: Mobile-first, px-4 for mobile, responsive padding

---

## 📖 Related Files in Vite Frontend

Reference files used for this migration:
- `vite_frontend/src/types/index.ts`
- `vite_frontend/src/types/events.ts`
- `vite_frontend/src/services/ApiService.ts`
- `vite_frontend/src/context/AuthContext.tsx`
- `vite_frontend/src/pages/auth/AuthForm.tsx`

These can be referenced for understanding the original implementation and patterns.

---

## 🤝 Support

For questions or issues:
1. Check that `.env.local` has correct `NEXT_PUBLIC_API_URL`
2. Verify backend API is running and accessible
3. Check browser console for error messages
4. Review API responses in Network tab of DevTools

---

## 📅 Migration Summary

| Component | Files | Status | Lines of Code |
|-----------|-------|--------|---------------|
| Types | 2 | ✓ Complete | 500+ |
| API Service | 1 | ✓ Complete | 800+ |
| Auth Context | 1 | ✓ Complete | 180+ |
| Auth Hook | 1 | ✓ Complete | 15 |
| Auth Form | 1 | ✓ Complete | 500+ |
| Auth Pages | 2 | ✓ Complete | 30 |
| Config | 1 | ✓ Complete | 5 |
| **Total** | **9 files** | **✓ Complete** | **2,000+ LOC** |

**Estimated Effort for Remaining Dashboard**: 2,000+ additional lines of code and components.

---

## License
This migration maintains the same license as the original Montrose project.
