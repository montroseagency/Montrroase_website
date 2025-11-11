'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import Link from 'next/link';
import { Users, CheckSquare, FileText, MessageCircle, AlertCircle, RefreshCw, TrendingUp, Target } from 'lucide-react';

interface AgentStats {
  total_clients: number;
  active_clients?: number;
  active_tasks: number;
  completed_tasks: number;
  pending_content: number;
  unread_messages: number;
  client_capacity?: number;
  max_clients?: number;
  current_load_percentage?: number;
  capacity_used?: number;
  department?: string;
  specialization?: string;
}

interface Client {
  id: string;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  company_name: string;
  subscription_plan: string;
  is_active: boolean;
}

interface Task {
  id: string;
  title: string;
  priority: string;
  status: string;
  due_date: string;
  client_name: string;
}

export default function AgentDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<AgentStats | null>(null);
  const [recentClients, setRecentClients] = useState<Client[]>([]);
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboardData = async () => {
    try {
      setError(null);
      const [statsData, clientsData, tasksData] = await Promise.all([
        ApiService.get('/dashboard/agent-stats/'),
        ApiService.get('/agents/my-clients/'),
        ApiService.getTasks(),
      ]);

      setStats(statsData.data);
      setRecentClients(Array.isArray(clientsData.data) ? clientsData.data.slice(0, 5) : []);
      setRecentTasks(Array.isArray(tasksData) ? tasksData.slice(0, 5) : []);
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
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.first_name}!</h1>
            {stats?.department && (
              <span className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize ${
                stats.department === 'marketing'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
              }`}>
                {stats.department === 'marketing' ? '📱 Marketing Agent' : '🌐 Website Developer'}
              </span>
            )}
          </div>
          <p className="text-gray-600">Here's an overview of your assigned clients and tasks.</p>
          {stats?.specialization && (
            <p className="text-sm text-purple-600 mt-1 font-medium">🎯 {stats.specialization}</p>
          )}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<Users className="w-6 h-6 text-blue-600" />}
            title="My Clients"
            value={stats.total_clients.toString()}
            subtitle={`${stats.max_clients || stats.client_capacity || 10} max capacity`}
            bgColor="bg-blue-50"
          />
          <StatCard
            icon={<CheckSquare className="w-6 h-6 text-green-600" />}
            title="Active Tasks"
            value={stats.active_tasks.toString()}
            subtitle={`${stats.completed_tasks} completed this month`}
            bgColor="bg-green-50"
          />
          <StatCard
            icon={<FileText className="w-6 h-6 text-purple-600" />}
            title="Pending Content"
            value={stats.pending_content.toString()}
            subtitle="Awaiting approval"
            bgColor="bg-purple-50"
          />
          <StatCard
            icon={<MessageCircle className="w-6 h-6 text-orange-600" />}
            title="Unread Messages"
            value={stats.unread_messages.toString()}
            subtitle="From clients"
            bgColor="bg-orange-50"
          />
        </div>
      )}

      {/* Workload Status */}
      {stats && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-900">Current Workload</h3>
              </div>
              <p className="text-purple-700 mb-3">
                You're managing <span className="font-bold">{stats.total_clients}</span> out of{' '}
                <span className="font-bold">{stats.max_clients || stats.client_capacity || 10}</span> clients{' '}
                ({Math.round(stats.capacity_used || stats.current_load_percentage || 0)}% capacity)
              </p>
              <div className="w-full bg-purple-200 rounded-full h-2.5">
                <div
                  className="bg-purple-600 h-2.5 rounded-full transition-all"
                  style={{ width: `${Math.round(stats.capacity_used || stats.current_load_percentage || 0)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionCard
          href="/dashboard/agent/clients"
          title="My Clients"
          description="View all assigned clients"
          icon={<Users className="w-8 h-8 text-blue-600" />}
        />
        <QuickActionCard
          href="/dashboard/agent/tasks"
          title="Tasks"
          description="Manage client tasks"
          icon={<CheckSquare className="w-8 h-8 text-green-600" />}
        />
        <QuickActionCard
          href="/dashboard/agent/content"
          title="Content"
          description="Review and create content"
          icon={<FileText className="w-8 h-8 text-purple-600" />}
        />
        <QuickActionCard
          href="/dashboard/agent/messages"
          title="Messages"
          description="Chat with clients"
          icon={<MessageCircle className="w-8 h-8 text-orange-600" />}
        />
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Clients */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">My Clients</h2>
            <Link href="/dashboard/agent/clients" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {recentClients.length > 0 ? (
              recentClients.map((client) => (
                <div key={client.id} className="p-3 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {client.user.first_name} {client.user.last_name}
                      </p>
                      <p className="text-xs text-gray-500">{client.company_name || client.user.email}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                      client.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {client.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs text-purple-600 font-medium capitalize">{client.subscription_plan} Plan</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No clients assigned yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Active Tasks</h2>
            <Link href="/dashboard/agent/tasks" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
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
                  <p className="text-xs text-gray-500 mb-1">{task.client_name}</p>
                  <p className="text-xs text-gray-500">Due: {new Date(task.due_date).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No active tasks</p>
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
  subtitle,
  bgColor,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
  bgColor: string;
}) {
  return (
    <div className={`${bgColor} rounded-lg p-6`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-600 mt-2">{subtitle}</p>
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
