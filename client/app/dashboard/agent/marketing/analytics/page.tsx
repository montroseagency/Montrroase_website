'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { BarChart, TrendingUp, DollarSign, Users, Target, Award, Activity, Megaphone } from 'lucide-react';

interface CampaignAnalytics {
  total_campaigns: number;
  active_campaigns: number;
  completed_campaigns: number;
  draft_campaigns: number;
  total_budget: number;
  total_spend: number;
  total_reach: number;
  total_engagement: number;
  avg_performance: number;
}

interface Campaign {
  id: string;
  title: string;
  client_name: string;
  platform: string;
  status: string;
  budget: string;
  actual_spend: string;
  actual_reach: number;
  actual_engagement: number;
  performance_percentage: number;
  start_date: string;
  end_date: string;
}

export default function MarketingAnalyticsPage() {
  const [analytics, setAnalytics] = useState<CampaignAnalytics | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [analyticsData, campaignsData] = await Promise.all([
        api.getCampaignAnalytics(),
        api.getMyCampaigns()
      ]);
      setAnalytics(analyticsData as CampaignAnalytics);
      setCampaigns(campaignsData as Campaign[]);
    } catch (err: any) {
      setError(err.message || 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
          No analytics data available.
        </div>
      </div>
    );
  }

  const budgetUtilization = analytics.total_budget > 0
    ? (analytics.total_spend / analytics.total_budget) * 100
    : 0;

  const topCampaigns = [...campaigns]
    .sort((a, b) => b.performance_percentage - a.performance_percentage)
    .slice(0, 5);

  const platformBreakdown = campaigns.reduce((acc, campaign) => {
    const platform = campaign.platform || 'unknown';
    if (!acc[platform]) {
      acc[platform] = { count: 0, reach: 0, engagement: 0 };
    }
    acc[platform].count++;
    acc[platform].reach += campaign.actual_reach;
    acc[platform].engagement += campaign.actual_engagement;
    return acc;
  }, {} as { [key: string]: { count: number; reach: number; engagement: number } });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketing Analytics</h1>
        <p className="text-gray-600">Comprehensive performance insights across all your campaigns</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Megaphone className="w-10 h-10 opacity-80" />
            <div className="text-right">
              <p className="text-purple-100 text-sm mb-1">Total Campaigns</p>
              <p className="text-3xl font-bold">{analytics.total_campaigns}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-purple-100">
            <div>
              <span className="font-semibold">{analytics.active_campaigns}</span> Active
            </div>
            <div>
              <span className="font-semibold">{analytics.completed_campaigns}</span> Completed
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-10 h-10 opacity-80" />
            <div className="text-right">
              <p className="text-blue-100 text-sm mb-1">Total Budget</p>
              <p className="text-3xl font-bold">${analytics.total_budget.toLocaleString()}</p>
            </div>
          </div>
          <div className="text-sm text-blue-100">
            <span className="font-semibold">${analytics.total_spend.toLocaleString()}</span> Spent
            <span className="ml-2">({budgetUtilization.toFixed(1)}%)</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-10 h-10 opacity-80" />
            <div className="text-right">
              <p className="text-green-100 text-sm mb-1">Total Reach</p>
              <p className="text-3xl font-bold">{analytics.total_reach.toLocaleString()}</p>
            </div>
          </div>
          <div className="text-sm text-green-100">
            <span className="font-semibold">{(analytics.total_reach / analytics.total_campaigns).toFixed(0)}</span> Avg per campaign
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-10 h-10 opacity-80" />
            <div className="text-right">
              <p className="text-orange-100 text-sm mb-1">Total Engagement</p>
              <p className="text-3xl font-bold">{analytics.total_engagement.toLocaleString()}</p>
            </div>
          </div>
          <div className="text-sm text-orange-100">
            <span className="font-semibold">{(analytics.total_engagement / analytics.total_campaigns).toFixed(0)}</span> Avg per campaign
          </div>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            Budget Utilization
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Budget</span>
                <span className="text-sm font-bold text-gray-900">${analytics.total_budget.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Spend</span>
                <span className="text-sm font-bold text-blue-600">${analytics.total_spend.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Remaining</span>
                <span className="text-sm font-bold text-green-600">
                  ${(analytics.total_budget - analytics.total_spend).toLocaleString()}
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Utilization Rate</span>
                <span className="text-sm font-bold text-gray-900">{budgetUtilization.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            Campaign Status Distribution
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Active</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{analytics.active_campaigns}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Completed</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{analytics.completed_campaigns}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Draft</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{analytics.draft_campaigns}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Breakdown */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart className="w-5 h-5 text-purple-600" />
          Platform Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(platformBreakdown).map(([platform, data]) => (
            <div key={platform} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-3 capitalize">{platform}</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Campaigns</span>
                  <span className="text-sm font-bold text-gray-900">{data.count}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Reach</span>
                  <span className="text-sm font-bold text-blue-600">{data.reach.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Engagement</span>
                  <span className="text-sm font-bold text-green-600">{data.engagement.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performing Campaigns */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-600" />
          Top Performing Campaigns
        </h3>
        {topCampaigns.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No campaigns available</p>
        ) : (
          <div className="space-y-4">
            {topCampaigns.map((campaign, index) => (
              <div
                key={campaign.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    index === 2 ? 'bg-orange-600' :
                    'bg-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">{campaign.title}</h4>
                  <p className="text-xs text-gray-600">{campaign.client_name} • {campaign.platform}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Reach</p>
                      <p className="text-sm font-bold text-blue-600">{campaign.actual_reach.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Engagement</p>
                      <p className="text-sm font-bold text-green-600">{campaign.actual_engagement.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Performance</p>
                      <p className="text-sm font-bold text-purple-600">{campaign.performance_percentage.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Key Insights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-6 h-6 text-purple-600" />
            <h4 className="font-semibold text-purple-900">Reach Efficiency</h4>
          </div>
          <p className="text-2xl font-bold text-purple-900 mb-1">
            ${(analytics.total_spend / analytics.total_reach).toFixed(3)}
          </p>
          <p className="text-sm text-purple-700">Cost per reach</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h4 className="font-semibold text-blue-900">Engagement Rate</h4>
          </div>
          <p className="text-2xl font-bold text-blue-900 mb-1">
            {((analytics.total_engagement / analytics.total_reach) * 100).toFixed(2)}%
          </p>
          <p className="text-sm text-blue-700">Average across campaigns</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <Activity className="w-6 h-6 text-green-600" />
            <h4 className="font-semibold text-green-900">Avg Performance</h4>
          </div>
          <p className="text-2xl font-bold text-green-900 mb-1">
            {analytics.avg_performance.toFixed(1)}
          </p>
          <p className="text-sm text-green-700">Overall campaign success</p>
        </div>
      </div>
    </div>
  );
}
