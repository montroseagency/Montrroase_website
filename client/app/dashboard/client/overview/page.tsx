'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import type { ClientDashboardStats } from '@/lib/types';
import Link from 'next/link';
import { Users, TrendingUp, FileText, Target, BarChart3, Calendar } from 'lucide-react';

export default function ClientOverviewPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<ClientDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getClientDashboardStats();
        setStats(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard');
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
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.first_name}!</h1>
        <p className="text-gray-600 mt-2">Here's your social media performance overview.</p>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            icon={<Users className="w-6 h-6 text-blue-600" />}
            title="Total Followers"
            value={stats.total_followers.toLocaleString()}
            bgColor="bg-blue-50"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6 text-green-600" />}
            title="Engagement Rate"
            value={`${stats.engagement_rate.toFixed(2)}%`}
            bgColor="bg-green-50"
          />
          <StatCard
            icon={<FileText className="w-6 h-6 text-purple-600" />}
            title="Posts This Month"
            value={stats.posts_this_month.toString()}
            bgColor="bg-purple-50"
          />
          <StatCard
            icon={<BarChart3 className="w-6 h-6 text-orange-600" />}
            title="Reach"
            value={stats.reach.toLocaleString()}
            bgColor="bg-orange-50"
          />
          <StatCard
            icon={<Target className="w-6 h-6 text-red-600" />}
            title="Growth Rate"
            value={`${stats.growth_rate.toFixed(2)}%`}
            bgColor="bg-red-50"
          />
        </div>
      )}

      {/* Payment Info Card */}
      {stats && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Next Payment Due</h3>
              <p className="text-blue-700">
                <span className="text-3xl font-bold">${stats.next_payment_amount.toFixed(2)}</span>
                <span className="text-sm ml-4">
                  Due on {new Date(stats.next_payment_date).toLocaleDateString()}
                </span>
              </p>
            </div>
            <Link
              href="/dashboard/client/billing"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              View Details ’
            </Link>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <QuickActionCard
          href="/dashboard/client/content/create"
          title="Create Content"
          description="Add new social media content for approval"
          icon={<FileText className="w-8 h-8 text-purple-600" />}
        />
        <QuickActionCard
          href="/dashboard/client/analytics"
          title="View Analytics"
          description="Check your performance metrics in detail"
          icon={<BarChart3 className="w-8 h-8 text-blue-600" />}
        />
        <QuickActionCard
          href="/dashboard/client/billing"
          title="Manage Billing"
          description="View invoices and subscription details"
          icon={<Calendar className="w-8 h-8 text-green-600" />}
        />
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Content */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Content</h2>
            <Link href="/dashboard/client/content" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View All ’
            </Link>
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
              <p className="text-sm text-gray-600">No recent content yet.</p>
              <Link href="/dashboard/client/content/create" className="text-purple-600 hover:text-purple-700 text-sm font-medium mt-2 inline-block">
                Create your first post ’
              </Link>
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Tasks</h2>
            <Link href="/dashboard/client/tasks" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View All ’
            </Link>
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
              <p className="text-sm text-gray-600">No tasks assigned yet.</p>
            </div>
          </div>
        </div>
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
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-lg shadow p-6 hover:shadow-lg hover:border-purple-200 transition-all border border-transparent"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <span className="text-purple-600 text-sm font-medium mt-4 inline-block">
        Go ’
      </span>
    </Link>
  );
}
