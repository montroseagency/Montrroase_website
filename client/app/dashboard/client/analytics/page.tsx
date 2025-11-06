'use client';

import { useEffect, useState } from 'react';
import ApiService from '@/lib/api';
import type { PerformanceData, SocialMediaAccount } from '@/lib/types';
import { BarChart3, TrendingUp, Users, Eye } from 'lucide-react';

export default function ClientAnalyticsPage() {
  const [performance, setPerformance] = useState<PerformanceData[]>([]);
  const [accounts, setAccounts] = useState<SocialMediaAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [perfData, accsData] = await Promise.all([
          ApiService.getPerformanceData() as Promise<PerformanceData[]>,
          ApiService.getConnectedAccounts() as Promise<SocialMediaAccount[]>,
        ]);
        setPerformance(Array.isArray(perfData) ? perfData : []);
        setAccounts(Array.isArray(accsData) ? accsData : []);
      } catch (err) {
        console.error('Error loading analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Performance Analytics</h1>
        <p className="text-gray-600 mt-2">Track your social media metrics and growth</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Followers</p>
              <p className="text-2xl font-bold">{accounts.reduce((sum, a) => sum + (a.account_id ? 1000 : 0), 0).toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Average Engagement</p>
              <p className="text-2xl font-bold">3.2%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Reach</p>
              <p className="text-2xl font-bold">{performance.reduce((sum, p) => sum + p.reach, 0).toLocaleString()}</p>
            </div>
            <Eye className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Growth Rate</p>
              <p className="text-2xl font-bold">+12.5%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Performance</h2>
        <div className="space-y-4">
          {performance.slice(0, 6).map(data => (
            <div key={data.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
              <div>
                <p className="font-medium text-gray-900">{new Date(data.month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                <p className="text-sm text-gray-600">Followers: {data.followers.toLocaleString()} | Reach: {data.reach.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{data.engagement.toFixed(1)}%</p>
                <p className="text-sm text-green-600">+{data.growth_rate.toFixed(1)}% growth</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
