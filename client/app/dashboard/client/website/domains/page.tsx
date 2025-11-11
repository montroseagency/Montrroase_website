'use client';

import { useState } from 'react';
import { Globe, Search, Plus, CheckCircle, Clock, AlertCircle, ExternalLink } from 'lucide-react';

export default function DomainsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    setSearching(true);
    // TODO: Implement domain search API call
    setTimeout(() => setSearching(false), 1000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Domain Management</h1>
        <p className="text-gray-600 mt-2">Search, register, and manage your domains</p>
      </div>

      {/* Domain Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Search for a Domain</h2>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter domain name (e.g., mywebsite.com)"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={!searchQuery || searching}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {searching ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Globe className="w-8 h-8 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Domain Services Coming Soon</h3>
            <p className="text-gray-700 mb-4">
              We're building a comprehensive domain management system for you. Soon you'll be able to:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                <span>Search and register new domains</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                <span>Manage DNS settings and records</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                <span>Transfer existing domains</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                <span>Auto-renew and expiration management</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                <span>SSL certificate management</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-white rounded-lg border border-purple-200">
              <p className="text-sm text-gray-700">
                <strong className="text-purple-600">Need a domain now?</strong> Contact our support team and we'll help you register and configure your domain manually.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Domains</p>
              <p className="text-3xl font-bold text-gray-900">0</p>
            </div>
            <Globe className="w-12 h-12 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Expiring Soon</p>
              <p className="text-3xl font-bold text-yellow-600">0</p>
            </div>
            <Clock className="w-12 h-12 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">DNS Records</p>
              <p className="text-3xl font-bold text-gray-900">0</p>
            </div>
            <ExternalLink className="w-12 h-12 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
