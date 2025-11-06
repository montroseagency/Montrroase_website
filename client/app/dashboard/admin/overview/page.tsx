'use client';

import { useEffect, useState } from 'react';
import ApiService from '@/lib/api';
import type { DashboardStats } from '@/lib/types';
import { Users, TrendingUp, DollarSign, AlertCircle, Target } from 'lucide-react';
import Link from 'next/link';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getDashboardStats();
        setStats(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard stats');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your business overview.</p>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            icon={<DollarSign className="w-6 h-6 text-blue-600" />}
            title="Total Revenue"
            value={`$${stats.total_revenue.toLocaleString()}`}
            bgColor="bg-blue-50"
          />
          <StatCard
            icon={<Users className="w-6 h-6 text-green-600" />}
            title="Active Clients"
            value={stats.active_clients.toString()}
            bgColor="bg-green-50"
          />
          <StatCard
            icon={<Target className="w-6 h-6 text-orange-600" />}
            title="Pending Tasks"
            value={stats.pending_tasks.toString()}
            bgColor="bg-orange-50"
          />
          <StatCard
            icon={<AlertCircle className="w-6 h-6 text-red-600" />}
            title="Overdue Payments"
            value={stats.overdue_payments.toString()}
            bgColor="bg-red-50"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
            title="Growth Rate"
            value={`${stats.monthly_growth_rate.toFixed(1)}%`}
            bgColor="bg-purple-50"
          />
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <QuickActionCard
          href="/dashboard/admin/clients"
          title="Manage Clients"
          description="View and manage all clients"
          icon="=e"
        />
        <QuickActionCard
          href="/dashboard/admin/content"
          title="Review Content"
          description="Approve pending content"
          icon="=Ý"
        />
        <QuickActionCard
          href="/dashboard/admin/tasks"
          title="View Tasks"
          description="Check task assignments"
          icon=""
        />
        <QuickActionCard
          href="/dashboard/admin/invoices"
          title="Manage Invoices"
          description="View billing information"
          icon="=°"
        />
      </div>

      {/* Additional Stats Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Performance Metrics</h2>
          <Link href="/dashboard/admin/analytics" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            View Full Analytics ’
          </Link>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Total Followers Delivered</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total_followers_delivered.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-2">Across all clients</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Average Monthly Fee</p>
              <p className="text-2xl font-bold text-gray-900">${(stats.total_revenue / 12).toFixed(0)}</p>
              <p className="text-xs text-gray-500 mt-2">Per month average</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Client Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">98%</p>
              <p className="text-xs text-green-600 mt-2">Based on feedback</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper Components
function StatCard({
  icon,
  title,
  value,
  bgColor,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  bgColor: string;
}) {
  return (
    <div className={`${bgColor} rounded-lg p-6`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="flex-shrink-0">{icon}</div>
      </div>
    </div>
  );
}

function QuickActionCard({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-lg shadow p-6 hover:shadow-lg hover:border-purple-200 transition-all border border-transparent"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <span className="text-purple-600 text-sm font-medium mt-4 inline-block">
        Go ’
      </span>
    </Link>
  );
}
