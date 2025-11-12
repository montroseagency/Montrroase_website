'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import { Users, TrendingUp, Calendar, CheckCircle, BarChart3, Megaphone } from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  total_clients: number;
  active_clients: number;
  pending_clients: number;
  content_posts?: {
    total: number;
    draft: number;
    pending: number;
    approved: number;
    posted: number;
  };
  campaigns?: {
    total: number;
    active: number;
    completed: number;
  };
  department: string;
}

export default function MarketingAgentDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await ApiService.get('/dashboard/agent-stats/');
      setStats(response.data || response);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketing Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.first_name}!</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
          <Megaphone className="w-5 h-5" />
          <span className="font-medium">Marketing Agent</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Clients */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Clients</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.total_clients || 0}</p>
            </div>
            <Users className="w-12 h-12 text-blue-600 opacity-50" />
          </div>
        </div>

        {/* Active Clients */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Active Clients</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.active_clients || 0}</p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-600 opacity-50" />
          </div>
        </div>

        {/* Content Posts */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Content Posts</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats?.content_posts?.total || 0}
              </p>
              <p className="text-xs text-purple-600 mt-1">
                {stats?.content_posts?.posted || 0} posted
              </p>
            </div>
            <BarChart3 className="w-12 h-12 text-purple-600 opacity-50" />
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Active Campaigns</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats?.campaigns?.active || 0}
              </p>
              <p className="text-xs text-orange-600 mt-1">
                {stats?.campaigns?.total || 0} total
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-orange-600 opacity-50" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/agent/marketing/clients"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
          >
            <Users className="w-8 h-8 text-purple-600" />
            <div>
              <p className="font-medium text-gray-900">My Clients</p>
              <p className="text-sm text-gray-600">Manage client relationships</p>
            </div>
          </Link>

          <Link
            href="/dashboard/agent/marketing/campaigns"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
          >
            <Megaphone className="w-8 h-8 text-purple-600" />
            <div>
              <p className="font-medium text-gray-900">Campaigns</p>
              <p className="text-sm text-gray-600">Create and manage campaigns</p>
            </div>
          </Link>

          <Link
            href="/dashboard/agent/marketing/scheduler"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
          >
            <Calendar className="w-8 h-8 text-purple-600" />
            <div>
              <p className="font-medium text-gray-900">Content Scheduler</p>
              <p className="text-sm text-gray-600">Schedule social media posts</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <p className="text-gray-600">No recent activity to display</p>
        </div>
      </div>
    </div>
  );
}
