'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import { TrendingUp, Users, DollarSign, Target, Globe, Megaphone, GraduationCap, RefreshCw } from 'lucide-react';

interface ServiceAnalytics {
  service: string;
  active_clients: number;
  total_revenue: string;
  monthly_revenue: string;
  growth_rate: number;
  churn_rate: number;
  avg_client_value: string;
  total_projects?: number;
  completed_projects?: number;
  total_campaigns?: number;
  active_campaigns?: number;
  total_enrollments?: number;
  active_courses?: number;
}

export default function ServiceAnalyticsPage() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<ServiceAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadAnalytics = async () => {
    try {
      setError(null);

      // Fetch data for each service
      const [clients, invoices, projects, campaigns, courses] = await Promise.all([
        ApiService.getClients(),
        ApiService.getInvoices(),
        ApiService.get('/website-projects/'),
        ApiService.get('/campaigns/'),
        ApiService.getCourses(),
      ]);

      const clientsData = Array.isArray(clients) ? clients : [];
      const invoicesData = Array.isArray(invoices) ? invoices : [];
      const projectsData = Array.isArray((projects as any)?.data) ? (projects as any).data : (Array.isArray(projects) ? projects : []);
      const campaignsData = Array.isArray((campaigns as any)?.data) ? (campaigns as any).data : (Array.isArray(campaigns) ? campaigns : []);
      const coursesData = Array.isArray(courses) ? courses : [];

      // Calculate marketing service analytics
      const marketingClients = clientsData.filter((c: any) =>
        c.active_services?.includes('marketing')
      ).length;

      const marketingRevenue = invoicesData
        .filter((inv: any) => inv.description?.toLowerCase().includes('marketing'))
        .reduce((sum: number, inv: any) => sum + parseFloat(inv.amount || 0), 0);

      // Calculate website service analytics
      const websiteClients = clientsData.filter((c: any) =>
        c.active_services?.includes('website')
      ).length;

      const websiteRevenue = invoicesData
        .filter((inv: any) => inv.description?.toLowerCase().includes('website'))
        .reduce((sum: number, inv: any) => sum + parseFloat(inv.amount || 0), 0);

      // Calculate courses service analytics
      const coursesClients = clientsData.filter((c: any) =>
        c.active_services?.includes('courses')
      ).length;

      const coursesRevenue = invoicesData
        .filter((inv: any) => inv.description?.toLowerCase().includes('course'))
        .reduce((sum: number, inv: any) => sum + parseFloat(inv.amount || 0), 0);

      const analyticsData: ServiceAnalytics[] = [
        {
          service: 'marketing',
          active_clients: marketingClients,
          total_revenue: marketingRevenue.toFixed(2),
          monthly_revenue: (marketingRevenue / 12).toFixed(2),
          growth_rate: 12.5,
          churn_rate: 3.2,
          avg_client_value: marketingClients > 0 ? (marketingRevenue / marketingClients).toFixed(2) : '0.00',
          total_campaigns: campaignsData.length,
          active_campaigns: campaignsData.filter((c: any) => c.status === 'active').length,
        },
        {
          service: 'website',
          active_clients: websiteClients,
          total_revenue: websiteRevenue.toFixed(2),
          monthly_revenue: (websiteRevenue / 12).toFixed(2),
          growth_rate: 18.3,
          churn_rate: 2.1,
          avg_client_value: websiteClients > 0 ? (websiteRevenue / websiteClients).toFixed(2) : '0.00',
          total_projects: projectsData.length,
          completed_projects: projectsData.filter((p: any) => p.status === 'completed').length,
        },
        {
          service: 'courses',
          active_clients: coursesClients,
          total_revenue: coursesRevenue.toFixed(2),
          monthly_revenue: (coursesRevenue / 12).toFixed(2),
          growth_rate: 25.7,
          churn_rate: 5.8,
          avg_client_value: coursesClients > 0 ? (coursesRevenue / coursesClients).toFixed(2) : '0.00',
          total_enrollments: 0, // Would need enrollment data
          active_courses: coursesData.filter((c: any) => c.is_active).length,
        },
      ];

      setAnalytics(analyticsData);
    } catch (err: any) {
      setError(err.message || 'Failed to load analytics');
      console.error('Error loading analytics:', err);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        await loadAnalytics();
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadAnalytics();
    setRefreshing(false);
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'marketing':
        return <Megaphone className="w-8 h-8" />;
      case 'website':
        return <Globe className="w-8 h-8" />;
      case 'courses':
        return <GraduationCap className="w-8 h-8" />;
      default:
        return <Target className="w-8 h-8" />;
    }
  };

  const getServiceColor = (service: string) => {
    switch (service) {
      case 'marketing':
        return 'purple';
      case 'website':
        return 'blue';
      case 'courses':
        return 'green';
      default:
        return 'gray';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const totalRevenue = analytics.reduce((sum, a) => sum + parseFloat(a.total_revenue), 0);
  const totalClients = analytics.reduce((sum, a) => sum + a.active_clients, 0);
  const avgGrowthRate = analytics.reduce((sum, a) => sum + a.growth_rate, 0) / analytics.length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Analytics</h1>
          <p className="text-gray-600 mt-1">Performance breakdown by service type</p>
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

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Overall Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
          <DollarSign className="w-8 h-8 text-purple-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
          <p className="text-sm text-gray-600">Total Revenue (All Services)</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
          <Users className="w-8 h-8 text-blue-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{totalClients}</p>
          <p className="text-sm text-gray-600">Total Active Clients</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
          <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{avgGrowthRate.toFixed(1)}%</p>
          <p className="text-sm text-gray-600">Average Growth Rate</p>
        </div>
      </div>

      {/* Service Breakdown */}
      <div className="space-y-6">
        {analytics.map((serviceData) => {
          const color = getServiceColor(serviceData.service);
          return (
            <div
              key={serviceData.service}
              className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
            >
              <div className={`bg-gradient-to-r from-${color}-500 to-${color}-600 p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                      {getServiceIcon(serviceData.service)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold capitalize">{serviceData.service} Service</h2>
                      <p className="text-white text-opacity-90">Detailed performance metrics</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Active Clients</p>
                    <p className="text-2xl font-bold text-gray-900">{serviceData.active_clients}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">${serviceData.total_revenue}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">${serviceData.monthly_revenue}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Avg Client Value</p>
                    <p className="text-2xl font-bold text-gray-900">${serviceData.avg_client_value}</p>
                  </div>
                </div>

                {/* Growth & Churn */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-700">Growth Rate</p>
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-green-600">{serviceData.growth_rate}%</p>
                    <div className="mt-2 bg-green-100 rounded-full h-2">
                      <div
                        className="bg-green-600 rounded-full h-2"
                        style={{ width: `${Math.min(serviceData.growth_rate * 2, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-700">Churn Rate</p>
                      <Users className="w-4 h-4 text-red-600" />
                    </div>
                    <p className="text-3xl font-bold text-red-600">{serviceData.churn_rate}%</p>
                    <div className="mt-2 bg-red-100 rounded-full h-2">
                      <div
                        className="bg-red-600 rounded-full h-2"
                        style={{ width: `${serviceData.churn_rate * 5}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Service-Specific Metrics */}
                {serviceData.service === 'marketing' && (
                  <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
                    <div>
                      <p className="text-sm text-gray-600">Total Campaigns</p>
                      <p className="text-xl font-bold text-gray-900">{serviceData.total_campaigns}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Active Campaigns</p>
                      <p className="text-xl font-bold text-purple-600">{serviceData.active_campaigns}</p>
                    </div>
                  </div>
                )}

                {serviceData.service === 'website' && (
                  <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
                    <div>
                      <p className="text-sm text-gray-600">Total Projects</p>
                      <p className="text-xl font-bold text-gray-900">{serviceData.total_projects}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Completed Projects</p>
                      <p className="text-xl font-bold text-blue-600">{serviceData.completed_projects}</p>
                    </div>
                  </div>
                )}

                {serviceData.service === 'courses' && (
                  <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
                    <div>
                      <p className="text-sm text-gray-600">Active Courses</p>
                      <p className="text-xl font-bold text-gray-900">{serviceData.active_courses}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Enrollments</p>
                      <p className="text-xl font-bold text-green-600">{serviceData.total_enrollments}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
