'use client';

import { Server, CheckCircle, Shield, Zap, Database, Activity, Globe, Lock } from 'lucide-react';

export default function HostingPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Hosting Management</h1>
        <p className="text-gray-600 mt-2">Monitor and manage your website hosting</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Sites</p>
              <p className="text-3xl font-bold text-gray-900">0</p>
            </div>
            <Server className="w-12 h-12 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Uptime</p>
              <p className="text-3xl font-bold text-green-600">100%</p>
            </div>
            <Activity className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Storage Used</p>
              <p className="text-3xl font-bold text-blue-600">0 GB</p>
            </div>
            <Database className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">SSL Status</p>
              <p className="text-3xl font-bold text-green-600">
                <Lock className="w-8 h-8 inline" />
              </p>
            </div>
            <Shield className="w-12 h-12 text-green-600" />
          </div>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Server className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Hosting Control Panel Coming Soon</h3>
            <p className="text-gray-700 mb-4">
              We're building a powerful hosting management system with the following features:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span>One-click deployment to multiple hosting providers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span>Automatic SSL certificate management</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span>Real-time server monitoring and alerts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span>Automated backups and restore</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span>CDN integration for faster load times</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span>FTP/SFTP access management</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700">
                <strong className="text-blue-600">Need hosting now?</strong> Our team handles all hosting setup and deployment for your website projects. Contact support for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hosting Providers Preview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Supported Hosting Providers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg text-center hover:border-purple-300 transition-colors">
            <Globe className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Vercel</p>
            <p className="text-xs text-gray-500">Coming Soon</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center hover:border-purple-300 transition-colors">
            <Globe className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Netlify</p>
            <p className="text-xs text-gray-500">Coming Soon</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center hover:border-purple-300 transition-colors">
            <Globe className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">AWS</p>
            <p className="text-xs text-gray-500">Coming Soon</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center hover:border-purple-300 transition-colors">
            <Globe className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">DigitalOcean</p>
            <p className="text-xs text-gray-500">Coming Soon</p>
          </div>
        </div>
      </div>

      {/* Performance Metrics Placeholder */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
            <Zap className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-1">Avg Load Time</p>
            <p className="text-2xl font-bold text-gray-900">-</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
            <Activity className="w-12 h-12 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-1">Requests/Day</p>
            <p className="text-2xl font-bold text-gray-900">-</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
            <Database className="w-12 h-12 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-1">Bandwidth Used</p>
            <p className="text-2xl font-bold text-gray-900">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}
