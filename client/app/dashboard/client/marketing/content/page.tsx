'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import type { ContentPost, SocialMediaAccount } from '@/lib/types';
import Link from 'next/link';
import { FileText, Plus, Filter, Search, AlertCircle } from 'lucide-react';

export default function ClientContentPage() {
  const { user } = useAuth();
  const [content, setContent] = useState<ContentPost[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentPost[]>([]);
  const [connectedAccounts, setConnectedAccounts] = useState<SocialMediaAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [contentData, accountsData] = await Promise.all([
          ApiService.getContent() as Promise<ContentPost[]>,
          ApiService.getConnectedAccounts() as Promise<SocialMediaAccount[]>,
        ]);

        setContent(Array.isArray(contentData) ? contentData : []);
        setConnectedAccounts(Array.isArray(accountsData) ? accountsData : []);
      } catch (err: any) {
        setError(err.message || 'Failed to load content');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter content based on search and filters
  useEffect(() => {
    let filtered = content;

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.platform.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    if (filterPlatform !== 'all') {
      filtered = filtered.filter(item => item.platform === filterPlatform);
    }

    setFilteredContent(filtered);
  }, [content, searchQuery, filterStatus, filterPlatform]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const statusCounts = {
    draft: content.filter(c => c.status === 'draft').length,
    'pending-approval': content.filter(c => c.status === 'pending-approval').length,
    approved: content.filter(c => c.status === 'approved').length,
    posted: content.filter(c => c.status === 'posted').length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Calendar</h1>
          <p className="text-gray-600 mt-2">Manage and schedule your social media content</p>
        </div>
        <Link
          href="/dashboard/client/content/create"
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Content
        </Link>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-sm text-gray-600 mb-1">Draft</p>
          <p className="text-2xl font-bold text-gray-900">{statusCounts.draft}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-sm text-gray-600 mb-1">Pending Approval</p>
          <p className="text-2xl font-bold text-gray-900">{statusCounts['pending-approval']}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-sm text-gray-600 mb-1">Approved</p>
          <p className="text-2xl font-bold text-gray-900">{statusCounts.approved}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-sm text-gray-600 mb-1">Posted</p>
          <p className="text-2xl font-bold text-gray-900">{statusCounts.posted}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="pending-approval">Pending Approval</option>
              <option value="approved">Approved</option>
              <option value="posted">Posted</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Platforms</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
              <option value="tiktok">TikTok</option>
              <option value="twitter">Twitter</option>
              <option value="linkedin">LinkedIn</option>
              <option value="facebook">Facebook</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content List */}
      {filteredContent.length > 0 ? (
        <div className="space-y-4">
          {filteredContent.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">
                      {post.platform === 'instagram' ? '📸' :
                       post.platform === 'youtube' ? '🎥' :
                       post.platform === 'tiktok' ? '🎵' :
                       post.platform === 'twitter' ? '🐦' :
                       post.platform === 'linkedin' ? '💼' :
                       post.platform === 'facebook' ? '📘' : '📱'}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900 capitalize">{post.platform}</p>
                      <p className="text-sm text-gray-500">{new Date(post.scheduled_date).toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 line-clamp-2">{post.content}</p>
                </div>
                <div className="ml-4 text-right flex-shrink-0">
                  <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${
                    post.status === 'posted' ? 'bg-green-100 text-green-800' :
                    post.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                    post.status === 'pending-approval' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {post.status.replace('-', ' ')}
                  </span>
                  <Link
                    href={`/dashboard/client/content/${post.id}`}
                    className="block text-purple-600 hover:text-purple-700 text-sm font-medium mt-3"
                  >
                    View →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No content found</p>
          <Link
            href="/dashboard/client/content/create"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Create your first post →
          </Link>
        </div>
      )}
    </div>
  );
}
