'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import Link from 'next/link';
import { TrendingUp, Globe, GraduationCap, HelpCircle, ArrowRight, Bell, Wallet as WalletIcon, DollarSign } from 'lucide-react';

interface DashboardStats {
  total_followers: number;
  engagement_rate: number;
  posts_this_month: number;
  reach: number;
  growth_rate: number;
  next_payment_amount?: number;
  next_payment_date?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  notification_type: string;
  created_at: string;
  is_read: boolean;
}

export default function ClientDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [statsData, notificationsData] = await Promise.all([
          ApiService.getClientDashboardStats(),
          ApiService.getNotifications()
        ]);
        setStats(statsData as DashboardStats);
        setNotifications(Array.isArray(notificationsData) ? notificationsData.slice(0, 5) : []);
      } catch (err: any) {
        console.error('Error loading dashboard:', err);
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

  const services = [
    {
      title: 'Marketing',
      description: 'Manage your content, campaigns, and social media analytics',
      icon: <TrendingUp className="w-8 h-8" />,
      href: '/dashboard/client/marketing',
      color: 'from-purple-500 to-pink-500',
      stats: [
        { label: 'Followers', value: stats?.total_followers.toLocaleString() || '0' },
        { label: 'Engagement', value: `${stats?.engagement_rate || 0}%` },
        { label: 'Posts', value: stats?.posts_this_month || 0 }
      ]
    },
    {
      title: 'Website Builder',
      description: 'Create and manage professional websites with AI assistance',
      icon: <Globe className="w-8 h-8" />,
      href: '/dashboard/client/website-builder',
      color: 'from-blue-500 to-cyan-500',
      stats: [
        { label: 'Projects', value: '0' },
        { label: 'Active', value: '0' },
        { label: 'Completed', value: '0' }
      ]
    },
    {
      title: 'Courses',
      description: 'Learn and grow with our comprehensive course library',
      icon: <GraduationCap className="w-8 h-8" />,
      href: '/dashboard/client/courses',
      color: 'from-green-500 to-emerald-500',
      stats: [
        { label: 'Enrolled', value: '0' },
        { label: 'In Progress', value: '0' },
        { label: 'Completed', value: '0' }
      ]
    },
    {
      title: 'Support',
      description: 'Get help and communicate with our support team',
      icon: <HelpCircle className="w-8 h-8" />,
      href: '/dashboard/client/support',
      color: 'from-orange-500 to-red-500',
      stats: [
        { label: 'Open Tickets', value: '0' },
        { label: 'Resolved', value: '0' },
        { label: 'Messages', value: '0' }
      ]
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.first_name || 'User'}! 👋</h1>
        <p className="text-purple-100">Here's what's happening with your account today</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Reach</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.reach.toLocaleString() || '0'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <WalletIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Growth Rate</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.growth_rate || 0}%</p>
            </div>
          </div>
        </div>

        {stats?.next_payment_amount && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Next Payment</p>
                <p className="text-2xl font-bold text-gray-900">${stats.next_payment_amount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Services Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group block"
            >
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-purple-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-4 bg-gradient-to-br ${service.color} rounded-lg text-white`}>
                    {service.icon}
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  {service.stats.map((stat, index) => (
                    <div key={index}>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                      <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Notifications */}
      {notifications.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-bold text-gray-900">Recent Notifications</h2>
            </div>
            <Link
              href="/dashboard/client/notifications"
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${notification.is_read ? 'bg-gray-300' : 'bg-purple-600'}`} />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{notification.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{new Date(notification.created_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-lg p-6 text-white">
        <h2 className="text-xl font-bold mb-4">Need Help?</h2>
        <p className="text-gray-300 mb-6">Our team is here to assist you with any questions or concerns.</p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/dashboard/client/support"
            className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Contact Support
          </Link>
          <Link
            href="/dashboard/client/courses"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
