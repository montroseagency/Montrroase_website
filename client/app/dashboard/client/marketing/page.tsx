'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import Link from 'next/link';
import { FileText, CheckSquare, TrendingUp, Users, ArrowRight, Calendar, MessageSquare } from 'lucide-react';

interface DashboardStats {
  total_followers: number;
  engagement_rate: number;
  posts_this_month: number;
  reach: number;
  growth_rate: number;
}

export default function MarketingOverviewPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const statsData = await ApiService.getClientDashboardStats();
        setStats(statsData);
      } catch (err: any) {
        console.error('Error loading marketing stats:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const sections = [
    {
      title: 'Content Calendar',
      description: 'Schedule and manage your social media posts across all platforms',
      icon: <FileText className="w-8 h-8" />,
      href: '/dashboard/client/marketing/content',
      color: 'from-purple-500 to-pink-500',
      stat: { label: 'Posts This Month', value: stats?.posts_this_month || 0 }
    },
    {
      title: 'Tasks',
      description: 'Track your marketing tasks and campaign assignments',
      icon: <CheckSquare className="w-8 h-8" />,
      href: '/dashboard/client/marketing/tasks',
      color: 'from-blue-500 to-cyan-500',
      stat: { label: 'Active Tasks', value: '0' }
    },
    {
      title: 'Analytics',
      description: 'View detailed performance metrics and insights',
      icon: <TrendingUp className="w-8 h-8" />,
      href: '/dashboard/client/marketing/analytics',
      color: 'from-green-500 to-emerald-500',
      stat: { label: 'Engagement Rate', value: `${stats?.engagement_rate || 0}%` }
    },
    {
      title: 'Social Accounts',
      description: 'Manage your connected social media platforms',
      icon: <Users className="w-8 h-8" />,
      href: '/dashboard/client/marketing/social-accounts',
      color: 'from-orange-500 to-red-500',
      stat: { label: 'Connected', value: '0' }
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Marketing Dashboard 📊</h1>
        <p className="text-purple-100">Manage your social media presence and campaigns</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Total Followers</p>
          <p className="text-3xl font-bold text-gray-900">{stats?.total_followers.toLocaleString() || '0'}</p>
          <p className="text-xs text-green-600 mt-1">+{stats?.growth_rate || 0}% growth</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Engagement Rate</p>
          <p className="text-3xl font-bold text-gray-900">{stats?.engagement_rate || 0}%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Total Reach</p>
          <p className="text-3xl font-bold text-gray-900">{stats?.reach.toLocaleString() || '0'}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Posts This Month</p>
          <p className="text-3xl font-bold text-gray-900">{stats?.posts_this_month || 0}</p>
        </div>
      </div>

      {/* Marketing Sections */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Marketing Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="group block"
            >
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-purple-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-4 bg-gradient-to-br ${section.color} rounded-lg text-white`}>
                    {section.icon}
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{section.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{section.description}</p>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">{section.stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{section.stat.value}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/client/marketing/content/create"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
          >
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Schedule Post</p>
              <p className="text-xs text-gray-600">Create new content</p>
            </div>
          </Link>

          <Link
            href="/dashboard/client/marketing/analytics"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
          >
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">View Analytics</p>
              <p className="text-xs text-gray-600">Check performance</p>
            </div>
          </Link>

          <Link
            href="/dashboard/client/marketing/social-accounts"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Connect Account</p>
              <p className="text-xs text-gray-600">Add social platform</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
