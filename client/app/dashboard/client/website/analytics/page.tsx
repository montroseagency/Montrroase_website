'use client';

import { BarChart3, TrendingUp, Users, Eye, MousePointer, Clock, Globe, CheckCircle } from 'lucide-react';

export default function WebsiteAnalyticsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Website Analytics</h1>
        <p className="text-gray-600 mt-2">Track your website performance and visitor behavior</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Visitors</p>
              <p className="text-3xl font-bold text-gray-900">0</p>
              <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
            </div>
            <Users className="w-12 h-12 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Page Views</p>
              <p className="text-3xl font-bold text-blue-600">0</p>
              <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
            </div>
            <Eye className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Bounce Rate</p>
              <p className="text-3xl font-bold text-yellow-600">0%</p>
              <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
            </div>
            <MousePointer className="w-12 h-12 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg. Session</p>
              <p className="text-3xl font-bold text-green-600">0m</p>
              <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
            </div>
            <Clock className="w-12 h-12 text-green-600" />
          </div>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <BarChart3 className="w-8 h-8 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Analytics Coming Soon</h3>
            <p className="text-gray-700 mb-4">
              We're building comprehensive analytics tools to help you understand your visitors:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <span>Real-time visitor tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <span>Traffic source breakdown</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <span>Geographic location data</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <span>Device and browser stats</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <span>Page performance metrics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <span>Conversion funnel tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <span>User behavior heatmaps</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <span>Custom event tracking</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white rounded-lg border border-indigo-200">
              <p className="text-sm text-gray-700">
                <strong className="text-indigo-600">Need analytics now?</strong> We'll integrate Google Analytics or your preferred analytics tool for your website. Contact support for setup.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Traffic Overview</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">Traffic chart will appear here</p>
            <p className="text-sm text-gray-500">Once analytics is connected</p>
          </div>
        </div>
      </div>

      {/* Traffic Sources Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Traffic Sources</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Globe className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Direct</p>
                  <p className="text-sm text-gray-500">0 visitors</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">0%</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Organic Search</p>
                  <p className="text-sm text-gray-500">0 visitors</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">0%</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Social Media</p>
                  <p className="text-sm text-gray-500">0 visitors</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">0%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Pages</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">No data available</p>
            </div>
            <div className="text-center py-8">
              <Eye className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Page views will appear once analytics is active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Analytics Integration</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="font-medium text-gray-900 mb-1">Google Analytics</p>
            <p className="text-xs text-gray-500 mb-3">Not connected</p>
            <button className="w-full px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" disabled>
              Connect
            </button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="font-medium text-gray-900 mb-1">Plausible Analytics</p>
            <p className="text-xs text-gray-500 mb-3">Not connected</p>
            <button className="w-full px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" disabled>
              Connect
            </button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="font-medium text-gray-900 mb-1">Fathom Analytics</p>
            <p className="text-xs text-gray-500 mb-3">Not connected</p>
            <button className="w-full px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" disabled>
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
