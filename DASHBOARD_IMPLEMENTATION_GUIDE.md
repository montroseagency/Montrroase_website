# Dashboard Implementation Guide

This guide provides code examples and patterns for implementing the admin and client dashboards using the migrated API service and authentication context.

---

## Table of Contents
1. [Dashboard Layout Structure](#dashboard-layout-structure)
2. [Client Dashboard Implementation](#client-dashboard-implementation)
3. [Admin Dashboard Implementation](#admin-dashboard-implementation)
4. [Common Patterns](#common-patterns)
5. [Code Examples](#code-examples)

---

## Dashboard Layout Structure

### Recommended Folder Structure
```
app/dashboard/
├── layout.tsx                 # Dashboard wrapper layout
├── admin/
│   ├── layout.tsx            # Admin-specific layout
│   ├── overview/page.tsx      # Admin home/overview
│   ├── clients/
│   │   ├── page.tsx          # Clients list
│   │   ├── create/page.tsx    # Create new client
│   │   └── [id]/
│   │       ├── page.tsx       # Client details
│   │       └── edit/page.tsx  # Edit client
│   ├── content/
│   │   ├── page.tsx          # Content management
│   │   ├── [id]/page.tsx      # Content details
│   │   └── review/page.tsx    # Content approval
│   ├── tasks/page.tsx         # Task management
│   ├── invoices/page.tsx      # Invoice management
│   ├── analytics/page.tsx     # Analytics & reports
│   ├── messages/page.tsx      # Messaging
│   └── settings/page.tsx      # Admin settings
└── client/
    ├── layout.tsx            # Client-specific layout
    ├── overview/page.tsx      # Client home/overview
    ├── analytics/page.tsx     # Analytics dashboard
    ├── content/
    │   ├── page.tsx          # My content
    │   └── create/page.tsx    # Create content
    ├── tasks/page.tsx         # My tasks
    ├── billing/page.tsx       # Billing & subscription
    ├── messages/page.tsx      # Messages
    ├── social-accounts/page.tsx # Connected accounts
    └── settings/page.tsx      # Settings
```

---

## Client Dashboard Implementation

### 1. Client Overview Page (`app/dashboard/client/overview/page.tsx`)

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import { useRouter } from 'next/navigation';
import type { ClientDashboardStats } from '@/lib/types';

export default function ClientOverviewPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<ClientDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getClientDashboardStats();
        setStats(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard stats');
        console.error('Error loading stats:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.first_name}!</h1>
        <p className="text-gray-600 mt-2">Here's an overview of your social media performance</p>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* Stats Cards */}
          <StatCard
            title="Total Followers"
            value={stats.total_followers.toLocaleString()}
            icon="👥"
          />
          <StatCard
            title="Engagement Rate"
            value={`${stats.engagement_rate.toFixed(2)}%`}
            icon="📈"
          />
          <StatCard
            title="Posts This Month"
            value={stats.posts_this_month.toString()}
            icon="📝"
          />
          <StatCard
            title="Reach"
            value={stats.reach.toLocaleString()}
            icon="🌍"
          />
          <StatCard
            title="Growth Rate"
            value={`${stats.growth_rate.toFixed(2)}%`}
            icon="📊"
          />
        </div>
      )}

      {/* Next Payment Info */}
      {stats && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-2">Next Payment Due</h3>
          <p className="text-blue-700">
            ${stats.next_payment_amount.toFixed(2)} on {new Date(stats.next_payment_date).toLocaleDateString()}
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickActionCard
          href="/dashboard/client/content/create"
          title="Create Content"
          description="Add new social media content"
        />
        <QuickActionCard
          href="/dashboard/client/analytics"
          title="View Analytics"
          description="Check your performance metrics"
        />
        <QuickActionCard
          href="/dashboard/client/billing"
          title="Manage Billing"
          description="View invoices and subscription"
        />
      </div>
    </div>
  );
}

// Helper Components
function StatCard({ title, value, icon }: { title: string; value: string; icon: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  );
}

function QuickActionCard({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <a
      href={href}
      className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
    >
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm mt-1">{description}</p>
      <span className="text-purple-600 text-sm font-medium mt-4 inline-block">
        Get Started →
      </span>
    </a>
  );
}
```

### 2. Content Management Page (`app/dashboard/client/content/page.tsx`)

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import type { ContentPost } from '@/lib/types';
import Link from 'next/link';

export default function ClientContentPage() {
  const { isAuthenticated } = useAuth();
  const [content, setContent] = useState<ContentPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getContent();
        setContent(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || 'Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      loadContent();
    }
  }, [isAuthenticated]);

  const filteredContent = filterStatus === 'all'
    ? content
    : content.filter(item => item.status === filterStatus);

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      'draft': 'bg-gray-100 text-gray-800',
      'pending-approval': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-green-100 text-green-800',
      'posted': 'bg-blue-100 text-blue-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Content</h1>
          <p className="text-gray-600 mt-2">Manage and track your social media posts</p>
        </div>
        <Link
          href="/dashboard/client/content/create"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          + Create Content
        </Link>
      </div>

      {/* Filter */}
      <div className="mb-6 flex gap-2">
        {['all', 'draft', 'pending-approval', 'approved', 'posted'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg transition ${
              filterStatus === status
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">{error}</div>
      ) : filteredContent.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No content found</div>
      ) : (
        <div className="grid gap-4">
          {filteredContent.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.content.substring(0, 50)}...</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Platform: <span className="font-medium">{item.platform}</span>
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Scheduled: {new Date(item.scheduled_date).toLocaleDateString()}
              </p>
              <Link
                href={`/dashboard/client/content/${item.id}`}
                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## Admin Dashboard Implementation

### 1. Admin Overview Page (`app/dashboard/admin/overview/page.tsx`)

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import { useRouter } from 'next/navigation';
import type { DashboardStats } from '@/lib/types';

export default function AdminOverviewPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/auth/login');
      return;
    }

    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getDashboardStats();
        setStats(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [isAuthenticated, user, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <MetricCard label="Total Revenue" value={`$${stats.total_revenue.toLocaleString()}`} />
          <MetricCard label="Active Clients" value={stats.active_clients.toString()} />
          <MetricCard label="Pending Tasks" value={stats.pending_tasks.toString()} />
          <MetricCard label="Overdue Payments" value={stats.overdue_payments.toString()} />
          <MetricCard label="Followers Delivered" value={stats.total_followers_delivered.toLocaleString()} />
          <MetricCard label="Growth Rate" value={`${stats.monthly_growth_rate.toFixed(1)}%`} />
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <ActionCard href="/dashboard/admin/clients" title="Manage Clients" />
        <ActionCard href="/dashboard/admin/tasks" title="View Tasks" />
        <ActionCard href="/dashboard/admin/content" title="Review Content" />
        <ActionCard href="/dashboard/admin/invoices" title="Invoices" />
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
  );
}

function ActionCard({ href, title }: { href: string; title: string }) {
  return (
    <a href={href} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition text-center">
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <span className="text-purple-600 text-sm font-medium mt-4 inline-block">
        Go →
      </span>
    </a>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
      {message}
    </div>
  );
}
```

### 2. Client Management Page (`app/dashboard/admin/clients/page.tsx`)

```typescript
'use client';

import { useEffect, useState } from 'react';
import ApiService from '@/lib/api';
import type { Client } from '@/lib/types';
import Link from 'next/link';

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClients = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getClients();
        setClients(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || 'Failed to load clients');
      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, []);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'paused': 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
        <Link
          href="/dashboard/admin/clients/create"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          + Add Client
        </Link>
      </div>

      {loading && <p>Loading...</p>}
      {error && <div className="bg-red-50 border border-red-200 rounded p-4 text-red-700">{error}</div>}

      {!loading && clients.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monthly Fee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map(client => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{client.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${client.monthly_fee}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link href={`/dashboard/admin/clients/${client.id}`} className="text-purple-600 hover:text-purple-700">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
```

---

## Common Patterns

### 1. Protected Route Pattern

```typescript
'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';

export function withProtectedRoute<P extends object>(
  Component: React.ComponentType<P>,
  requiredRole?: 'admin' | 'client'
) {
  return function ProtectedRoute(props: P) {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/auth/login');
        return;
      }

      if (requiredRole && user?.role !== requiredRole) {
        router.push('/dashboard');
      }
    }, [isAuthenticated, user, router]);

    if (!isAuthenticated) return <div>Loading...</div>;
    if (requiredRole && user?.role !== requiredRole) return <div>Access Denied</div>;

    return <Component {...props} />;
  };
}
```

### 2. Data Fetching Hook Pattern

```typescript
'use client';

import { useState, useEffect } from 'react';
import ApiService from '@/lib/api';

export function useApi<T>(
  fetcher: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetcher();
        setData(result);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      const result = await fetcher();
      setData(result);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

// Usage
const { data: clients, loading, error, refetch } = useApi(
  () => ApiService.getClients(),
  []
);
```

### 3. Form Submission Pattern

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    await ApiService.updateClient(clientId, formData);
    setSuccess(true);
    setTimeout(() => router.push('/dashboard/admin/clients'), 2000);
  } catch (err: any) {
    setError(err.message || 'Failed to save changes');
  } finally {
    setLoading(false);
  }
};
```

---

## Code Examples

### Complete Create Content Component

```typescript
'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import ApiService from '@/lib/api';

export default function CreateContentPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    content: '',
    platform: 'instagram' as const,
    scheduled_date: '',
    image: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const contentFormData = new FormData();
      contentFormData.append('content', formData.content);
      contentFormData.append('platform', formData.platform);
      contentFormData.append('scheduled_date', formData.scheduled_date);
      if (formData.image) {
        contentFormData.append('image', formData.image);
      }

      await ApiService.createContent(contentFormData);
      router.push('/dashboard/client/content');
    } catch (err: any) {
      setError(err.message || 'Failed to create content');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create Content</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Content
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Write your content here..."
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Platform */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Platform
          </label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value as any })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="instagram">Instagram</option>
            <option value="youtube">YouTube</option>
            <option value="tiktok">TikTok</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">LinkedIn</option>
            <option value="facebook">Facebook</option>
          </select>
        </div>

        {/* Scheduled Date */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Scheduled Date
          </label>
          <input
            type="datetime-local"
            value={formData.scheduled_date}
            onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
            className="w-full"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Content'}
        </button>
      </form>
    </div>
  );
}
```

---

## Best Practices

1. **Error Handling**: Always wrap API calls in try-catch blocks
2. **Loading States**: Show loading indicators while fetching data
3. **Type Safety**: Use imported types from `@/lib/types`
4. **User Validation**: Check `user?.role` for admin-specific routes
5. **Responsive Design**: Use Tailwind's grid and responsive classes
6. **Accessibility**: Add labels to form inputs and use semantic HTML
7. **Performance**: Use `useCallback` for frequently called functions
8. **State Management**: Keep form state in component for simplicity, or use Context for shared data

---

## Testing the Implementation

1. Login as admin/client
2. Navigate to `/dashboard/admin/overview` or `/dashboard/client/overview`
3. Verify API data loads correctly
4. Test form submissions
5. Check error handling
6. Test role-based access control

This guide provides the foundation for implementing the full dashboard. Each page follows the same patterns and uses the ApiService methods documented in the migration guide.
