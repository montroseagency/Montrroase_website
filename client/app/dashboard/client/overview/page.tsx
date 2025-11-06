'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import type { ClientDashboardStats, ContentPost, Message, Invoice, SocialMediaAccount, Task } from '@/lib/types';
import Link from 'next/link';
import { Users, TrendingUp, FileText, Target, BarChart3, Calendar, MessageCircle, CreditCard, Eye, Heart, AlertCircle, RefreshCw, Plus } from 'lucide-react';

export default function ClientOverviewPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<ClientDashboardStats | null>(null);
  const [connectedAccounts, setConnectedAccounts] = useState<SocialMediaAccount[]>([]);
  const [recentContent, setRecentContent] = useState<ContentPost[]>([]);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [recentInvoices, setRecentInvoices] = useState<Invoice[]>([]);
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboardData = async () => {
    try {
      setError(null);
      const [statsData, accountsData, contentData, messagesData, invoicesData, tasksData] = await Promise.all([
        ApiService.getClientDashboardStats() as Promise<ClientDashboardStats>,
        ApiService.getConnectedAccounts() as Promise<SocialMediaAccount[]>,
        ApiService.getContent() as Promise<ContentPost[]>,
        ApiService.getMessages() as Promise<Message[]>,
        ApiService.getInvoices() as Promise<Invoice[]>,
        ApiService.getTasks() as Promise<Task[]>,
      ]);

      setStats(statsData);
      setConnectedAccounts(Array.isArray(accountsData) ? accountsData : []);
      setRecentContent(Array.isArray(contentData) ? contentData.slice(0, 5) : []);
      setRecentMessages(Array.isArray(messagesData) ? messagesData.slice(0, 3) : []);
      setRecentInvoices(Array.isArray(invoicesData) ? invoicesData.slice(0, 5) : []);
      setRecentTasks(Array.isArray(tasksData) ? tasksData.slice(0, 3) : []);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard');
      console.error('Error loading dashboard:', err);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        await loadDashboardData();
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
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
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.first_name}! 🚀</h1>
          <p className="text-gray-600 mt-2">Here's how your social media is performing.</p>
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

      {/* Connected Accounts Alert */}
      {connectedAccounts.length === 0 && (
        <div className="bg-yellow-50 border-l-4 border-l-yellow-500 p-4 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-medium text-yellow-900">Connect Your Social Media Accounts</h3>
              <p className="text-sm text-yellow-700 mt-1">
                To start tracking your performance, connect your Instagram, YouTube, or TikTok accounts.
              </p>
            </div>
            <Link
              href="/dashboard/client/social-accounts"
              className="text-yellow-600 hover:text-yellow-700 font-medium text-sm whitespace-nowrap ml-4"
            >
              Connect Now →
            </Link>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatCard
            icon={<Users className="w-6 h-6 text-blue-600" />}
            title="Total Followers"
            value={(typeof stats.total_followers === 'string' ? parseInt(stats.total_followers) : stats.total_followers).toLocaleString()}
            trend="+2.5%"
            bgColor="bg-blue-50"
          />
          <StatCard
            icon={<Heart className="w-6 h-6 text-pink-600" />}
            title="Engagement Rate"
            value={`${(typeof stats.engagement_rate === 'string' ? parseFloat(stats.engagement_rate) : stats.engagement_rate).toFixed(2)}%`}
            trend="+1.2%"
            bgColor="bg-pink-50"
          />
          <StatCard
            icon={<FileText className="w-6 h-6 text-purple-600" />}
            title="Posts This Month"
            value={(typeof stats.posts_this_month === 'string' ? parseInt(stats.posts_this_month) : stats.posts_this_month).toString()}
            bgColor="bg-purple-50"
          />
          <StatCard
            icon={<Eye className="w-6 h-6 text-orange-600" />}
            title="Monthly Reach"
            value={(typeof stats.reach === 'string' ? parseInt(stats.reach) : stats.reach).toLocaleString()}
            trend="+15%"
            bgColor="bg-orange-50"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6 text-green-600" />}
            title="Growth Rate"
            value={`${(typeof stats.growth_rate === 'string' ? parseFloat(stats.growth_rate) : stats.growth_rate).toFixed(2)}%`}
            bgColor="bg-green-50"
          />
        </div>
      )}

      {/* Payment Info Card */}
      {stats && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">Next Payment Due</h3>
              </div>
              <p className="text-blue-700">
                <span className="text-3xl font-bold">
                  ${(typeof stats.next_payment_amount === 'string' ? parseFloat(stats.next_payment_amount) : stats.next_payment_amount).toFixed(2)}
                </span>
                <span className="text-sm ml-4">
                  Due on {new Date(stats.next_payment_date).toLocaleDateString()}
                </span>
              </p>
            </div>
            <Link
              href="/dashboard/client/billing"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm whitespace-nowrap"
            >
              View Details →
            </Link>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionCard
          href="/dashboard/client/content/create"
          title="Create Content"
          description="Add new social media posts"
          icon={<FileText className="w-8 h-8 text-purple-600" />}
        />
        <QuickActionCard
          href="/dashboard/client/analytics"
          title="View Analytics"
          description="Check performance metrics"
          icon={<BarChart3 className="w-8 h-8 text-blue-600" />}
        />
        <QuickActionCard
          href="/dashboard/client/billing"
          title="Manage Billing"
          description="View invoices and plans"
          icon={<CreditCard className="w-8 h-8 text-green-600" />}
        />
        <QuickActionCard
          href="/dashboard/client/messages"
          title="Messages"
          description="Chat with your team"
          icon={<MessageCircle className="w-8 h-8 text-blue-600" />}
        />
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Content */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Content</h2>
            <Link href="/dashboard/client/content" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {recentContent.length > 0 ? (
              recentContent.map((post) => (
                <div key={post.id} className="p-3 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900 text-sm capitalize">{post.platform}</p>
                      <p className="text-xs text-gray-500">{new Date(post.scheduled_date).toLocaleDateString()}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      post.status === 'posted' ? 'bg-green-100 text-green-800' :
                      post.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                      post.status === 'pending-approval' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {post.status.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No content yet</p>
                <Link href="/dashboard/client/content/create" className="text-purple-600 hover:text-purple-700 text-sm font-medium inline-block mt-2">
                  Create first post →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Tasks</h2>
            <Link href="/dashboard/client/tasks" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <div key={task.id} className="p-3 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-gray-900 text-sm">{task.title}</p>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Due: {new Date(task.due_date).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No tasks assigned yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages and Invoices Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Messages</h2>
            <Link href="/dashboard/client/messages" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {recentMessages.length > 0 ? (
              recentMessages.map((message) => (
                <div key={message.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {message.sender_name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm">{message.sender_name}</p>
                      <p className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No messages yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Invoices</h2>
            <Link href="/dashboard/client/billing/invoices" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {recentInvoices.length > 0 ? (
              recentInvoices.map((invoice) => (
                <div key={invoice.id} className="p-3 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">#{invoice.invoice_number}</p>
                      <p className="text-xs text-gray-500">Due: {new Date(invoice.due_date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 text-sm">${invoice.amount.toFixed(2)}</p>
                      <span className={`text-xs px-2 py-1 rounded-full inline-block font-medium ${
                        invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                        invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {invoice.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No invoices yet</p>
              </div>
            )}
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
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-lg shadow p-5 hover:shadow-lg hover:border-purple-200 transition-all border border-transparent group"
    >
      <div className="mb-3">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-1 text-sm">{title}</h3>
      <p className="text-xs text-gray-600">{description}</p>
      <span className="text-purple-600 text-xs font-medium mt-3 inline-block group-hover:translate-x-1 transition-transform">
        Go →
      </span>
    </Link>
  );
}
