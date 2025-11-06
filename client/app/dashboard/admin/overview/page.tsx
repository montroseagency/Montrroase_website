'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import type { DashboardStats, Client, Task, ContentPost, Invoice } from '@/lib/types';
import { Users, TrendingUp, DollarSign, AlertCircle, Target, RefreshCw, CheckCircle, FileText } from 'lucide-react';
import Link from 'next/link';

export default function AdminOverviewPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [pendingContent, setPendingContent] = useState<ContentPost[]>([]);
  const [recentInvoices, setRecentInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboardData = async () => {
    try {
      setError(null);
      const [statsData, clientsData, tasksData, contentData, invoicesData] = await Promise.all([
        ApiService.getDashboardStats() as Promise<DashboardStats>,
        ApiService.getClients() as Promise<Client[]>,
        ApiService.getTasks() as Promise<Task[]>,
        ApiService.getContent() as Promise<ContentPost[]>,
        ApiService.getInvoices() as Promise<Invoice[]>,
      ]);

      setStats(statsData);
      setClients(Array.isArray(clientsData) ? clientsData : []);
      setPendingTasks(Array.isArray(tasksData) ? tasksData.filter(t => t.status === 'pending').slice(0, 5) : []);
      setPendingContent(Array.isArray(contentData) ? contentData.filter(c => c.status === 'pending-approval').slice(0, 5) : []);
      setRecentInvoices(Array.isArray(invoicesData) ? invoicesData.slice(0, 5) : []);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard');
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    const loadInitial = async () => {
      try {
        setLoading(true);
        await loadDashboardData();
      } finally {
        setLoading(false);
      }
    };

    loadInitial();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <AlertCircle className="inline-block w-5 h-5 mr-2" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your business overview.</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatCard
            icon={<DollarSign className="w-6 h-6 text-blue-600" />}
            title="Total Revenue"
            value={`$${(typeof stats.total_revenue === 'string' ? parseInt(stats.total_revenue) : stats.total_revenue).toLocaleString()}`}
            trend="+12%"
            bgColor="bg-blue-50"
          />
          <StatCard
            icon={<Users className="w-6 h-6 text-green-600" />}
            title="Active Clients"
            value={(typeof stats.active_clients === 'string' ? parseInt(stats.active_clients) : stats.active_clients).toString()}
            trend="+2"
            bgColor="bg-green-50"
          />
          <StatCard
            icon={<Target className="w-6 h-6 text-orange-600" />}
            title="Pending Tasks"
            value={(typeof stats.pending_tasks === 'string' ? parseInt(stats.pending_tasks) : stats.pending_tasks).toString()}
            bgColor="bg-orange-50"
          />
          <StatCard
            icon={<AlertCircle className="w-6 h-6 text-red-600" />}
            title="Overdue Payments"
            value={(typeof stats.overdue_payments === 'string' ? parseInt(stats.overdue_payments) : stats.overdue_payments).toString()}
            bgColor="bg-red-50"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
            title="Growth Rate"
            value={`${(typeof stats.monthly_growth_rate === 'string' ? parseFloat(stats.monthly_growth_rate) : stats.monthly_growth_rate).toFixed(1)}%`}
            bgColor="bg-purple-50"
          />
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <QuickActionCard
          href="/dashboard/admin/clients"
          title="Manage Clients"
          description="View and manage all clients"
          icon="👥"
        />
        <QuickActionCard
          href="/dashboard/admin/content"
          title="Review Content"
          description="Approve pending content"
          icon="📝"
        />
        <QuickActionCard
          href="/dashboard/admin/tasks"
          title="View Tasks"
          description="Check task assignments"
          icon="✓"
        />
        <QuickActionCard
          href="/dashboard/admin/invoices"
          title="Manage Invoices"
          description="View billing information"
          icon="💳"
        />
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Tasks */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Pending Tasks</h2>
            <Link href="/dashboard/admin/tasks" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {pendingTasks.length > 0 ? (
              pendingTasks.map(task => (
                <div key={task.id} className="p-3 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-gray-900 text-sm">{task.title}</p>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>{task.priority}</span>
                  </div>
                  <p className="text-xs text-gray-500">Client: {task.client_name}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                <CheckCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm">No pending tasks</p>
              </div>
            )}
          </div>
        </div>

        {/* Pending Content Approval */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Pending Content</h2>
            <Link href="/dashboard/admin/content" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              Review All →
            </Link>
          </div>
          <div className="space-y-3">
            {pendingContent.length > 0 ? (
              pendingContent.map(content => (
                <div key={content.id} className="p-3 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-gray-900 text-sm capitalize">{content.platform}</p>
                    <span className="text-xs px-2 py-1 rounded-full font-medium bg-yellow-100 text-yellow-800">Pending</span>
                  </div>
                  <p className="text-xs text-gray-500">Client: {content.client_name || 'Unknown'}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm">No pending content</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Performance & Financial Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Total Followers Delivered</h3>
          {stats && (
            <div>
              <p className="text-3xl font-bold text-gray-900">{(typeof stats.total_followers_delivered === 'string' ? parseInt(stats.total_followers_delivered) : stats.total_followers_delivered).toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-2">Across all client accounts</p>
            </div>
          )}
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Average Client Fee</h3>
          {stats && (
            <div>
              <p className="text-3xl font-bold text-gray-900">${((typeof stats.total_revenue === 'string' ? parseInt(stats.total_revenue) : stats.total_revenue) / Math.max(1, (typeof stats.active_clients === 'string' ? parseInt(stats.active_clients) : stats.active_clients))).toFixed(0)}</p>
              <p className="text-xs text-gray-500 mt-2">Per active client</p>
            </div>
          )}
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Recent Invoices</h3>
          <div className="space-y-2">
            {recentInvoices.length > 0 ? (
              <>
                <p className="text-3xl font-bold text-gray-900">{recentInvoices.length}</p>
                <p className="text-xs text-gray-500">Invoices this period</p>
              </>
            ) : (
              <p className="text-gray-500 text-sm">No recent invoices</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      {stats && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-purple-700 font-medium">Monthly Growth</p>
              <p className="text-2xl font-bold text-purple-900 mt-1">{(typeof stats.monthly_growth_rate === 'string' ? parseFloat(stats.monthly_growth_rate) : stats.monthly_growth_rate).toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-sm text-purple-700 font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-purple-900 mt-1">${(typeof stats.total_revenue === 'string' ? parseInt(stats.total_revenue) : stats.total_revenue).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-purple-700 font-medium">Active Clients</p>
              <p className="text-2xl font-bold text-purple-900 mt-1">{(typeof stats.active_clients === 'string' ? parseInt(stats.active_clients) : stats.active_clients)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Components
function StatCard({
  icon,
  title,
  value,
  trend,
  bgColor,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend?: string;
  bgColor: string;
}) {
  return (
    <div className={`${bgColor} rounded-lg p-6`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p className="text-xs text-green-600 font-medium mt-2">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              {trend} this month
            </p>
          )}
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
      className="bg-white rounded-lg shadow p-6 hover:shadow-lg hover:border-purple-200 transition-all border border-transparent group"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <span className="text-purple-600 text-sm font-medium mt-4 inline-block group-hover:translate-x-1 transition-transform">
        Go →
      </span>
    </Link>
  );
}
