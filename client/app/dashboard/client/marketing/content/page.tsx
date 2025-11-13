'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import type { ContentPost, ContentRequest } from '@/lib/types';
import Link from 'next/link';
import { FileText, Plus, Search, Clock, CheckCircle, XCircle, AlertCircle, Edit2, Eye } from 'lucide-react';

const PLATFORM_ICONS = {
  instagram: '📸',
  youtube: '🎥',
  tiktok: '🎵',
  twitter: '🐦',
  linkedin: '💼',
  facebook: '📘',
};

export default function ClientContentPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'requests' | 'posts'>('requests');

  // Requests state
  const [requests, setRequests] = useState<ContentRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<ContentRequest[]>([]);
  const [requestSearchQuery, setRequestSearchQuery] = useState('');
  const [requestStatusFilter, setRequestStatusFilter] = useState<string>('all');

  // Posts state
  const [posts, setPosts] = useState<ContentPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<ContentPost[]>([]);
  const [postSearchQuery, setPostSearchQuery] = useState('');
  const [postStatusFilter, setPostStatusFilter] = useState<string>('all');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyRequestFilters();
  }, [requests, requestSearchQuery, requestStatusFilter]);

  useEffect(() => {
    applyPostFilters();
  }, [posts, postSearchQuery, postStatusFilter]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [requestsData, postsData] = await Promise.all([
        ApiService.getContentRequests(),
        ApiService.getContent(),
      ]);

      setRequests(Array.isArray(requestsData) ? requestsData : []);
      // Only show posts that are pending approval or later (not drafts from agent)
      setPosts(
        Array.isArray(postsData)
          ? postsData.filter((p: ContentPost) => p.status !== 'draft')
          : []
      );
    } catch (err: any) {
      setError(err.message || 'Failed to load content');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyRequestFilters = () => {
    let filtered = requests;

    if (requestSearchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(requestSearchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(requestSearchQuery.toLowerCase())
      );
    }

    if (requestStatusFilter !== 'all') {
      filtered = filtered.filter((item) => item.status === requestStatusFilter);
    }

    setFilteredRequests(filtered);
  };

  const applyPostFilters = () => {
    let filtered = posts;

    if (postSearchQuery) {
      filtered = filtered.filter((item) =>
        item.content.toLowerCase().includes(postSearchQuery.toLowerCase())
      );
    }

    if (postStatusFilter !== 'all') {
      filtered = filtered.filter((item) => item.status === postStatusFilter);
    }

    setFilteredPosts(filtered);
  };

  const getRequestStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
            <Edit2 className="w-3 h-3" />
            In Progress
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-green-100 text-green-800 font-medium">
            <CheckCircle className="w-3 h-3" />
            Completed
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-red-100 text-red-800 font-medium">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      default:
        return <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const getPostStatusBadge = (status: string) => {
    switch (status) {
      case 'pending-approval':
        return (
          <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium">
            <Clock className="w-3 h-3" />
            Needs Approval
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
            <CheckCircle className="w-3 h-3" />
            Approved
          </span>
        );
      case 'posted':
        return (
          <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-green-100 text-green-800 font-medium">
            <CheckCircle className="w-3 h-3" />
            Posted
          </span>
        );
      default:
        return <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const requestStatusCounts = {
    pending: requests.filter((r) => r.status === 'pending').length,
    'in-progress': requests.filter((r) => r.status === 'in-progress').length,
    completed: requests.filter((r) => r.status === 'completed').length,
    rejected: requests.filter((r) => r.status === 'rejected').length,
  };

  const postStatusCounts = {
    'pending-approval': posts.filter((p) => p.status === 'pending-approval').length,
    approved: posts.filter((p) => p.status === 'approved').length,
    posted: posts.filter((p) => p.status === 'posted').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600 mt-2">Manage your content requests and approve posts from your agent</p>
        </div>
        <Link
          href="/dashboard/client/marketing/content/create"
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Request Content
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'requests'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                My Requests ({requests.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'posts'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Eye className="w-5 h-5" />
                Posts to Approve ({postStatusCounts['pending-approval']})
              </div>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Requests Tab */}
          {activeTab === 'requests' && (
            <div className="space-y-6">
              {/* Request Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-sm text-yellow-600 mb-1">Pending</p>
                  <p className="text-2xl font-bold text-yellow-900">{requestStatusCounts.pending}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600 mb-1">In Progress</p>
                  <p className="text-2xl font-bold text-blue-900">{requestStatusCounts['in-progress']}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600 mb-1">Completed</p>
                  <p className="text-2xl font-bold text-green-900">{requestStatusCounts.completed}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-sm text-red-600 mb-1">Rejected</p>
                  <p className="text-2xl font-bold text-red-900">{requestStatusCounts.rejected}</p>
                </div>
              </div>

              {/* Request Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search requests..."
                      value={requestSearchQuery}
                      onChange={(e) => setRequestSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={requestStatusFilter}
                    onChange={(e) => setRequestStatusFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Request List */}
              {filteredRequests.length > 0 ? (
                <div className="space-y-4">
                  {filteredRequests.map((request) => (
                    <Link
                      key={request.id}
                      href={`/dashboard/client/marketing/content/requests/${request.id}`}
                      className="block bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{PLATFORM_ICONS[request.platform]}</span>
                            <div>
                              <p className="font-bold text-gray-900">{request.title}</p>
                              <p className="text-sm text-gray-600 capitalize">{request.platform}</p>
                            </div>
                          </div>
                          <p className="text-gray-700 line-clamp-2 mb-2">{request.description}</p>
                          <p className="text-xs text-gray-500">
                            Created {new Date(request.created_at).toLocaleDateString()}
                            {request.preferred_date && ` • Preferred: ${new Date(request.preferred_date).toLocaleDateString()}`}
                          </p>
                        </div>
                        <div className="ml-4">{getRequestStatusBadge(request.status)}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No content requests found</p>
                  <Link
                    href="/dashboard/client/marketing/content/create"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Create your first request →
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div className="space-y-6">
              {/* Post Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-sm text-yellow-600 mb-1">Pending Approval</p>
                  <p className="text-2xl font-bold text-yellow-900">{postStatusCounts['pending-approval']}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600 mb-1">Approved</p>
                  <p className="text-2xl font-bold text-blue-900">{postStatusCounts.approved}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600 mb-1">Posted</p>
                  <p className="text-2xl font-bold text-green-900">{postStatusCounts.posted}</p>
                </div>
              </div>

              {/* Post Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search posts..."
                      value={postSearchQuery}
                      onChange={(e) => setPostSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={postStatusFilter}
                    onChange={(e) => setPostStatusFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending-approval">Pending Approval</option>
                    <option value="approved">Approved</option>
                    <option value="posted">Posted</option>
                  </select>
                </div>
              </div>

              {/* Post List */}
              {filteredPosts.length > 0 ? (
                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/dashboard/client/marketing/content/${post.id}`}
                      className="block bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">{PLATFORM_ICONS[post.platform]}</span>
                            <div>
                              <p className="font-medium text-gray-900 capitalize">{post.platform}</p>
                              <p className="text-sm text-gray-600">
                                Scheduled: {new Date(post.scheduled_date).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-700 line-clamp-2">{post.content}</p>
                        </div>
                        <div className="ml-4">{getPostStatusBadge(post.status)}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No posts to review</p>
                  <p className="text-sm text-gray-500">
                    Posts created by your agent will appear here for approval
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
