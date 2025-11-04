# 📋 Montrose Platform - Implementation Roadmap

## ✅ What's Already Done

### Phase 0: Foundation (COMPLETE ✅)
- [x] Tailwind config with Montrose theme
- [x] Global CSS with professional styling
- [x] Root layout with SEO
- [x] Navigation component (desktop + mobile)
- [x] Hero section with animations
- [x] Footer component
- [x] Homepage with features section
- [x] Package.json with dependencies
- [x] Documentation (README, Design Guide, Quick Start)

## 🎯 What to Build Next

### Phase 1: Marketing Pages (Priority: HIGH)

#### 1.1 Services/Features Page (`/services`)
**File**: `app/marketing/services/page.tsx`

**Content to include**:
- Platform overview
- Real-time analytics feature showcase
- Content management system demo
- Social media integrations (Instagram, YouTube, TikTok)
- Automated reporting
- Growth strategies explanation

**Components needed**:
- `components/marketing/services.tsx` (main showcase)
- Feature detail cards
- Platform screenshots/mockups
- Integration logos

**Estimated time**: 4-6 hours

---

#### 1.2 Pricing Page (`/pricing`)
**File**: `app/marketing/pricing/page.tsx`

**Content to include**:
```
Starter Plan - $100/month
- 12 posts (photos/reels)
- 12 interactive stories
- Organic growth strategies
- Monthly reports
- Instagram only

Pro Plan - $250/month ⭐ MOST POPULAR
- 20 posts + reels
- Advanced campaigns
- Growth strategy + blog optimization
- Enhanced reports
- Instagram + 1 platform

Premium Plan - $400/month
- Instagram + Facebook + TikTok
- 30+ posts (design, reels, carousel)
- Premium advertising with budget
- Professional management
- Full-service package
```

**Components needed**:
- `components/marketing/pricing-section.tsx`
- Pricing cards with feature comparison
- FAQ section
- CTA to start trial

**Estimated time**: 3-4 hours

---

#### 1.3 Portfolio Page (`/portfolio`)
**File**: `app/marketing/portfolio/page.tsx`

**Content to include**:
- Client success stories
- Before/after metrics showcase
- Industry-specific case studies
- Growth statistics
- Client testimonials

**Components needed**:
- `components/marketing/portfolio.tsx`
- Case study cards
- Metrics visualizations
- Testimonial carousel

**Estimated time**: 4-5 hours

---

#### 1.4 About Page (`/about`)
**File**: `app/marketing/about/page.tsx`

**Content to include**:
- Company mission statement
- Why choose Montrose
- Team introduction (if applicable)
- Company values
- Contact information

**Components needed**:
- `components/marketing/about.tsx`
- Team member cards
- Timeline/history component
- Values showcase

**Estimated time**: 2-3 hours

---

#### 1.5 Contact Page (`/contact`)
**File**: `app/marketing/contact/page.tsx`

**Content to include**:
- Contact form
- Email/phone contact info
- Business inquiry form
- Support channels
- Location (if applicable)

**Components needed**:
- `components/marketing/contact-form.tsx`
- Form validation
- Success/error messages
- Contact info cards

**Backend integration**:
```typescript
POST /api/contact/ (you'll need to create this endpoint)
{
  name: string,
  email: string,
  message: string,
  subject: string
}
```

**Estimated time**: 3-4 hours

---

### Phase 2: Authentication (Priority: HIGH)

#### 2.1 Login Page (`/auth/login`)
**File**: `app/auth/login/page.tsx`

**Features**:
- Email + password form
- "Remember me" checkbox
- "Forgot password" link
- Social login (optional)
- Loading states
- Error handling

**Backend integration**:
```typescript
POST /api/auth/login/
{
  email: string,
  password: string
}
Response: {
  user: User,
  token: string
}
```

**Estimated time**: 3-4 hours

---

#### 2.2 Register Page (`/auth/register`)
**File**: `app/auth/register/page.tsx`

**Features**:
- Multi-step form:
  1. Email verification code request
  2. Code verification
  3. Account details (name, password, company)
- Password strength indicator
- Terms acceptance
- Loading states

**Backend integration**:
```typescript
// Step 1: Send verification code
POST /api/auth/send-verification-code/
{ email: string, name: string }

// Step 2: Verify and register
POST /api/auth/verify-and-register/
{
  email: string,
  verification_code: string,
  password: string,
  name: string,
  company: string
}
```

**Estimated time**: 5-6 hours

---

#### 2.3 Email Verification Page
**File**: `app/auth/verify-email/page.tsx`

**Features**:
- Code input (6 digits)
- Resend code button
- Timer countdown
- Auto-submit on complete

**Estimated time**: 2-3 hours

---

#### 2.4 Password Reset Flow
**Files**: 
- `app/auth/forgot-password/page.tsx`
- `app/auth/reset-password/page.tsx`

**Estimated time**: 3-4 hours

---

### Phase 3: API Integration (Priority: HIGH)

#### 3.1 Create API Client
**File**: `lib/api.ts`

```typescript
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Auth interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);
```

**Estimated time**: 2 hours

---

#### 3.2 Create Auth Context
**File**: `lib/auth-context.tsx`

```typescript
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { api } from './api';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'client' | 'admin';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { data } = await api.get('/auth/me/');
        setUser(data);
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login/', { email, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

  const register = async (registerData: any) => {
    const { data } = await api.post('/auth/verify-and-register/', registerData);
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

**Estimated time**: 3 hours

---

### Phase 4: Dashboard UI (Priority: MEDIUM)

#### 4.1 Dashboard Layout
**File**: `app/dashboard/layout.tsx`

**Features**:
- Sidebar navigation
- Top bar with user menu
- Breadcrumbs
- Logout button
- Protected route logic

**Estimated time**: 4-5 hours

---

#### 4.2 Client Overview Dashboard
**File**: `app/dashboard/client/overview/page.tsx`

**Features**:
- Stats cards (followers, engagement, growth)
- Chart showing follower growth
- Recent content list
- Connected accounts
- Quick actions

**Backend integration**:
```typescript
GET /api/dashboard/client-stats/
GET /api/social-accounts/
GET /api/content/?limit=5
```

**Estimated time**: 6-8 hours

---

#### 4.3 Social Account Connection
**Files**:
- `app/dashboard/client/social-accounts/page.tsx`
- `app/dashboard/client/social-accounts/connect/instagram/page.tsx`
- `app/dashboard/client/social-accounts/connect/youtube/page.tsx`

**Features**:
- List connected accounts
- Connect Instagram button
- Connect YouTube button
- OAuth flow handling
- Disconnect functionality

**Backend integration**:
```typescript
GET  /api/oauth/instagram/initiate/
GET  /api/oauth/instagram/callback/
GET  /api/oauth/youtube/initiate/
GET  /api/oauth/youtube/callback/
POST /api/social-accounts/{id}/disconnect/
```

**Estimated time**: 8-10 hours

---

#### 4.4 Content Management
**File**: `app/dashboard/client/content/page.tsx`

**Features**:
- Content list/calendar view
- Create content button
- Filter by platform/status
- Upload images
- Schedule posts

**Backend integration**:
```typescript
GET    /api/content/
POST   /api/content/
PATCH  /api/content/{id}/
DELETE /api/content/{id}/
```

**Estimated time**: 10-12 hours

---

#### 4.5 Analytics Page
**File**: `app/dashboard/client/analytics/page.tsx`

**Features**:
- Growth charts
- Engagement metrics
- Post performance
- Audience insights
- Date range selector

**Backend integration**:
```typescript
GET /api/metrics/realtime/
GET /api/performance/
GET /api/analytics/overview/
```

**Estimated time**: 8-10 hours

---

### Phase 5: Billing Integration (Priority: MEDIUM)

#### 5.1 Pricing Page with PayPal
**File**: `app/dashboard/client/billing/plans/page.tsx`

**Features**:
- Plan selection
- PayPal subscription creation
- Payment approval flow
- Subscription management

**Backend integration**:
```typescript
GET  /api/billing/plans/
POST /api/billing/create-subscription/
POST /api/billing/approve-subscription/
POST /api/billing/cancel-subscription/
```

**Estimated time**: 6-8 hours

---

#### 5.2 Billing Dashboard
**File**: `app/dashboard/client/billing/page.tsx`

**Features**:
- Current subscription details
- Payment history
- Invoice list
- Upgrade/downgrade options

**Backend integration**:
```typescript
GET /api/billing/subscription/
GET /api/invoices/
```

**Estimated time**: 4-5 hours

---

### Phase 6: Admin Dashboard (Priority: LOW)

#### 6.1 Admin Overview
**File**: `app/dashboard/admin/overview/page.tsx`

**Features**:
- Total revenue
- Active clients
- Pending tasks
- System health

**Estimated time**: 6-8 hours

---

#### 6.2 Client Management
**File**: `app/dashboard/admin/clients/page.tsx`

**Features**:
- Client list
- Search/filter
- Client details
- Edit client info

**Estimated time**: 8-10 hours

---

#### 6.3 Content Approval
**File**: `app/dashboard/admin/content/review/page.tsx`

**Features**:
- Pending content list
- Approve/reject buttons
- Bulk actions
- Add feedback

**Estimated time**: 6-8 hours

---

## 📊 Estimated Timeline

### Week 1: Marketing Pages
- Day 1-2: Services page
- Day 3: Pricing page
- Day 4: Portfolio page
- Day 5: About + Contact pages

### Week 2: Authentication
- Day 1-2: API client + Auth context
- Day 3-4: Login + Register pages
- Day 5: Email verification + Password reset

### Week 3: Client Dashboard
- Day 1-2: Dashboard layout + Overview
- Day 3-4: Social account connections
- Day 5: Content management (part 1)

### Week 4: Dashboard Features
- Day 1-2: Content management (part 2)
- Day 3-4: Analytics page
- Day 5: Billing integration

### Week 5+: Admin Dashboard
- Polish and testing
- Admin features
- Bug fixes
- Performance optimization

## 🎯 Priority Order

1. **CRITICAL** (Do First):
   - Marketing pages (Services, Pricing)
   - Authentication (Login, Register)
   - API integration
   - Basic client dashboard

2. **HIGH** (Do Second):
   - Social account connections
   - Content management
   - Analytics page
   - Billing integration

3. **MEDIUM** (Do Third):
   - Advanced dashboard features
   - Admin dashboard basics
   - Notifications system

4. **LOW** (Do Last):
   - Advanced admin features
   - Additional integrations
   - Nice-to-have features

## ✅ Definition of Done

For each page/feature, ensure:
- [ ] Responsive on mobile, tablet, desktop
- [ ] Follows Montrose design system
- [ ] Connected to backend API
- [ ] Loading states implemented
- [ ] Error handling in place
- [ ] Tested on real data
- [ ] Accessible (keyboard navigation, ARIA)
- [ ] SEO optimized (meta tags)

## 🚀 Getting Started Tomorrow

**Start here**:
1. Copy all files from `/mnt/user-data/outputs/` to your `client/` directory
2. Run `npm install`
3. Run `npm run dev`
4. Verify homepage loads correctly
5. Start building the `/services` page

**First task** (4-6 hours):
Create `app/marketing/services/page.tsx` showcasing your platform features:
- Real-time analytics
- Content management
- Social integrations
- Automated reporting
- Growth strategies

Good luck! 🎉