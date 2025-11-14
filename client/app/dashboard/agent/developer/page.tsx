'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import { Users, Code, Upload, CheckCircle, BarChart3, Globe } from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  total_clients: number;
  active_clients: number;
  pending_clients: number;
  website_projects?: {
    total: number;
    in_development: number;
    review: number;
    completed: number;
  };
  versions_uploaded?: number;
  department: string;
}

export default function DeveloperAgentDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await ApiService.get('/dashboard/agent-stats/') as any;
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
          <h1 className="text-3xl font-bold text-gray-900">Developer Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.first_name}!</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-lg">
          <Code className="w-5 h-5" />
          <span className="font-medium">Website Developer</span>
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

        {/* Website Projects */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Website Projects</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats?.website_projects?.total || 0}
              </p>
              <p className="text-xs text-purple-600 mt-1">
                {stats?.website_projects?.completed || 0} completed
              </p>
            </div>
            <Globe className="w-12 h-12 text-purple-600 opacity-50" />
          </div>
        </div>

        {/* Versions Uploaded */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Versions Uploaded</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats?.versions_uploaded || 0}
              </p>
            </div>
            <Upload className="w-12 h-12 text-orange-600 opacity-50" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/agent/developer/clients"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
          >
            <Users className="w-8 h-8 text-purple-600" />
            <div>
              <p className="font-medium text-gray-900">My Clients</p>
              <p className="text-sm text-gray-600">Manage client projects</p>
            </div>
          </Link>

          <Link
            href="/dashboard/agent/marketing/website/projects"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
          >
            <Globe className="w-8 h-8 text-purple-600" />
            <div>
              <p className="font-medium text-gray-900">Projects</p>
              <p className="text-sm text-gray-600">View and manage projects</p>
            </div>
          </Link>

          <Link
            href="/dashboard/agent/marketing/website/uploads"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
          >
            <Upload className="w-8 h-8 text-purple-600" />
            <div>
              <p className="font-medium text-gray-900">Upload Version</p>
              <p className="text-sm text-gray-600">Upload website versions</p>
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
