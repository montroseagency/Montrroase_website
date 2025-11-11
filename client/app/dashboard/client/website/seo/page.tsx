'use client';

import { TrendingUp, Search, BarChart3, FileText, CheckCircle, Target, Globe, Award } from 'lucide-react';

export default function SEOPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">SEO Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor and optimize your website's search engine performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">SEO Score</p>
              <p className="text-3xl font-bold text-gray-900">-</p>
            </div>
            <Award className="w-12 h-12 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Keywords Tracked</p>
              <p className="text-3xl font-bold text-blue-600">0</p>
            </div>
            <Target className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Organic Traffic</p>
              <p className="text-3xl font-bold text-green-600">0</p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Backlinks</p>
              <p className="text-3xl font-bold text-gray-900">0</p>
            </div>
            <Globe className="w-12 h-12 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <Search className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">SEO Tools Coming Soon</h3>
            <p className="text-gray-700 mb-4">
              We're developing a comprehensive SEO suite to help you rank higher in search results:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Google Search Console integration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Keyword research and tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Competitor analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>On-page SEO audits</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Backlink monitoring</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>PageSpeed insights</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Content optimization suggestions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>Rankings tracking over time</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
              <p className="text-sm text-gray-700">
                <strong className="text-green-600">Need SEO help now?</strong> Our marketing team provides SEO optimization services for all website projects. Contact support to get started.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Checklist */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">SEO Checklist</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Submit sitemap to Google Search Console</p>
              <p className="text-sm text-gray-600">Help search engines discover your content</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Optimize meta titles and descriptions</p>
              <p className="text-sm text-gray-600">Improve click-through rates from search results</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Add alt text to images</p>
              <p className="text-sm text-gray-600">Improve accessibility and image search rankings</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Improve page load speed</p>
              <p className="text-sm text-gray-600">Faster sites rank better and convert more</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Create quality content regularly</p>
              <p className="text-sm text-gray-600">Fresh content signals activity to search engines</p>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <Search className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Google Search Console</h3>
              <p className="text-sm text-gray-600">Not connected</p>
            </div>
          </div>
          <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" disabled>
            Connect (Coming Soon)
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Google Analytics</h3>
              <p className="text-sm text-gray-600">Not connected</p>
            </div>
          </div>
          <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" disabled>
            Connect (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
}
