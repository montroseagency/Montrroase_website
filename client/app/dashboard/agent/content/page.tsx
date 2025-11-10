'use client';

import { useEffect, useState } from 'react';
import ApiService from '@/lib/api';
import { FileText, Plus, Eye, Edit2, Trash2, Instagram, Youtube, Facebook } from 'lucide-react';

interface ContentPost {
  id: string;
  content: string;
  platform: 'instagram' | 'youtube' | 'tiktok' | 'facebook';
  status: 'draft' | 'pending-approval' | 'approved' | 'posted';
  scheduled_date: string;
  client_name: string;
  client: string;
  created_at: string;
}

export default function AgentContentPage() {
  const [content, setContent] = useState<ContentPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'draft' | 'pending-approval' | 'approved' | 'posted'>('all');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await ApiService.getContent();
      setContent(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContent = content.filter((post) => {
    if (filter === 'all') return true;
    return post.status === filter;
  });

  const contentByStatus = {
    draft: content.filter((c) => c.status === 'draft').length,
    pendingApproval: content.filter((c) => c.status === 'pending-approval').length,
    approved: content.filter((c) => c.status === 'approved').length,
    posted: content.filter((c) => c.status === 'posted').length,
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-5 h-5 text-pink-600" />;
      case 'youtube':
        return <Youtube className="w-5 h-5 text-red-600" />;
      case 'facebook':
        return <Facebook className="w-5 h-5 text-blue-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content</h1>
          <p className="text-gray-600 mt-1">Create and manage content for your clients</p>
        </div>
        <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Create Content</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Drafts</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{contentByStatus.draft}</p>
            </div>
            <FileText className="w-12 h-12 text-gray-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending Approval</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">{contentByStatus.pendingApproval}</p>
            </div>
            <Eye className="w-12 h-12 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Approved</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{contentByStatus.approved}</p>
            </div>
            <Eye className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Posted</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{contentByStatus.posted}</p>
            </div>
            <FileText className="w-12 h-12 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({content.length})
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'draft'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Drafts ({contentByStatus.draft})
          </button>
          <button
            onClick={() => setFilter('pending-approval')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'pending-approval'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending ({contentByStatus.pendingApproval})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'approved'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Approved ({contentByStatus.approved})
          </button>
          <button
            onClick={() => setFilter('posted')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'posted'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Posted ({contentByStatus.posted})
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.length > 0 ? (
          filteredContent.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              {/* Platform Icon and Status */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getPlatformIcon(post.platform)}
                  <span className="text-sm font-medium text-gray-900 capitalize">{post.platform}</span>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    post.status === 'posted'
                      ? 'bg-green-100 text-green-800'
                      : post.status === 'approved'
                      ? 'bg-blue-100 text-blue-800'
                      : post.status === 'pending-approval'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {post.status.replace('-', ' ')}
                </span>
              </div>

              {/* Content Preview */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 line-clamp-3">{post.content}</p>
              </div>

              {/* Client and Date */}
              <div className="mb-4 text-xs text-gray-500">
                <p>Client: {post.client_name}</p>
                <p>Scheduled: {new Date(post.scheduled_date).toLocaleDateString()}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No content found with the selected filter.</p>
          </div>
        )}
      </div>

      {content.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No content yet</h3>
          <p className="text-gray-600 mb-4">Create your first content post to get started.</p>
          <button className="inline-flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            <Plus className="w-5 h-5" />
            <span>Create Content</span>
          </button>
        </div>
      )}
    </div>
  );
}
