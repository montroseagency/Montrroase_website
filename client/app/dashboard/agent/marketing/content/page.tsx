'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import type { ContentPost, ContentRequest } from '@/lib/types';
import Link from 'next/link';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Edit,
  ExternalLink,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Inbox,
  LayoutGrid,
} from 'lucide-react';

const PLATFORM_ICONS = {
  instagram: '📸',
  youtube: '🎥',
  tiktok: '🎵',
  twitter: '🐦',
  linkedin: '💼',
  facebook: '📘',
};

export default function AgentContentPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'requests' | 'content'>('requests');

  // Content Posts State
  const [content, setContent] = useState<ContentPost[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentPost[]>([]);

  // Content Requests State
  const [requests, setRequests] = useState<ContentRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<ContentRequest[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters for Content
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [filterClient, setFilterClient] = useState<string>('all');

  // Filters for Requests
  const [requestSearchQuery, setRequestSearchQuery] = useState('');
  const [requestFilterStatus, setRequestFilterStatus] = useState<string>('all');
  const [requestFilterPlatform, setRequestFilterPlatform] = useState<string>('all');
  const [requestFilterClient, setRequestFilterClient] = useState<string>('all');

  // Unique clients for filter
  const [clients, setClients] = useState<Array<{ id: string; name: string }>>([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [content, searchQuery, filterStatus, filterPlatform, filterClient]);

  useEffect(() => {
    applyRequestFilters();
  }, [requests, requestSearchQuery, requestFilterStatus, requestFilterPlatform, requestFilterClient]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load content posts
      const contentData = await ApiService.getContent();
      const contentArray = Array.isArray(contentData) ? contentData : [];
      setContent(contentArray);

      // Load content requests
      const requestsData = await ApiService.getContentRequests();
      const requestsArray = Array.isArray(requestsData) ? requestsData : [];
      setRequests(requestsArray);

      // Extract unique clients from both sources
      const allClients = [...contentArray, ...requestsArray];
      const uniqueClients = allClients.reduce((acc: any[], item: any) => {
        if (!acc.find((c) => c.id === item.client)) {
          acc.push({ id: item.client, name: item.client_name || 'Unknown Client' });
        }
        return acc;
      }, []);
      setClients(uniqueClients);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = content;

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.platform?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter((item) => item.status === filterStatus);
    }

    if (filterPlatform !== 'all') {
      filtered = filtered.filter((item) => item.platform === filterPlatform);
    }

    if (filterClient !== 'all') {
      filtered = filtered.filter((item) => item.client === filterClient);
    }

    setFilteredContent(filtered);
  };

  const applyRequestFilters = () => {
    let filtered = requests;

    if (requestSearchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(requestSearchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(requestSearchQuery.toLowerCase()) ||
          item.client_name?.toLowerCase().includes(requestSearchQuery.toLowerCase()) ||
          item.platform?.toLowerCase().includes(requestSearchQuery.toLowerCase())
      );
    }

    if (requestFilterStatus !== 'all') {
      filtered = filtered.filter((item) => item.status === requestFilterStatus);
    }

    if (requestFilterPlatform !== 'all') {
      filtered = filtered.filter((item) => item.platform === requestFilterPlatform);
    }

    if (requestFilterClient !== 'all') {
      filtered = filtered.filter((item) => item.client === requestFilterClient);
    }

    setFilteredRequests(filtered);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-800 font-medium">
            <Edit className="w-3 h-3" />
            Draft
          </span>
        );
      case 'pending-approval':
        return (
          <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium">
            <Clock className="w-3 h-3" />
            Pending Approval
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
            <ExternalLink className="w-3 h-3" />
            Posted
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-800 font-medium">
            {status}
          </span>
        );
    }
  };

  const statusCounts = {
    draft: content.filter((c) => c.status === 'draft').length,
    'pending-approval': content.filter((c) => c.status === 'pending-approval').length,
    approved: content.filter((c) => c.status === 'approved').length,
    posted: content.filter((c) => c.status === 'posted').length,
  };

  const requestStatusCounts = {
    pending: requests.filter((r) => r.status === 'pending').length,
    'in-progress': requests.filter((r) => r.status === 'in-progress').length,
    completed: requests.filter((r) => r.status === 'completed').length,
    rejected: requests.filter((r) => r.status === 'rejected').length,
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
            <Clock className="w-3 h-3" />
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
        return (
          <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-800 font-medium">
            {status}
          </span>
        );
    }
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
          <p className="text-gray-600 mt-2">
            {activeTab === 'requests'
              ? 'Review and process client content requests'
              : 'Create and manage social media content for your clients'}
          </p>
        </div>
        <Link
          href="/dashboard/agent/marketing/content/create"
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Content
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
          <div className="flex gap-2 p-2">
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'requests'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Inbox className="w-4 h-4" />
              Client Requests
              {requestStatusCounts.pending > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-yellow-500 text-white text-xs rounded-full">
                  {requestStatusCounts.pending}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'content'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              My Content
            </button>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      {activeTab === 'requests' ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{requestStatusCounts.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{requestStatusCounts['in-progress']}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{requestStatusCounts.completed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">{requestStatusCounts.rejected}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Draft</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.draft}</p>
              </div>
              <Edit className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Approval</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts['pending-approval']}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.approved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Posted</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.posted}</p>
              </div>
              <ExternalLink className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        {activeTab === 'requests' ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
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

            {/* Client Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
              <select
                value={requestFilterClient}
                onChange={(e) => setRequestFilterClient(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Clients</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={requestFilterStatus}
                onChange={(e) => setRequestFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Platform Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
              <select
                value={requestFilterPlatform}
                onChange={(e) => setRequestFilterPlatform(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Platforms</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="tiktok">TikTok</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
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

            {/* Client Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
              <select
                value={filterClient}
                onChange={(e) => setFilterClient(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Clients</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
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

            {/* Platform Filter */}
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
        )}
      </div>

      {/* Requests List */}
      {activeTab === 'requests' && (
        <>
          {filteredRequests.length > 0 ? (
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{PLATFORM_ICONS[request.platform] || '📱'}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">{request.title}</h3>
                            {getRequestStatusBadge(request.status)}
                          </div>
                          <p className="text-sm text-gray-600">
                            {request.client_name || 'Unknown Client'} •{' '}
                            {new Date(request.created_at).toLocaleDateString()}
                            {request.preferred_date && ` • Preferred: ${new Date(request.preferred_date).toLocaleDateString()}`}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 line-clamp-2 mb-2">{request.description}</p>

                      {request.reference_images && request.reference_images.length > 0 && (
                        <div className="mt-3 flex gap-2">
                          {request.reference_images.slice(0, 3).map((img, idx) => (
                            <img
                              key={img.id}
                              src={img.image_url}
                              alt={`Reference ${idx + 1}`}
                              className="w-16 h-16 object-cover rounded border border-gray-200"
                            />
                          ))}
                          {request.reference_images.length > 3 && (
                            <div className="w-16 h-16 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                              <span className="text-sm text-gray-600">
                                +{request.reference_images.length - 3}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="ml-4 flex-shrink-0 flex flex-col gap-2">
                      <Link
                        href={`/dashboard/agent/marketing/content/requests/${request.id}`}
                        className="flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
                      >
                        <FileText className="w-4 h-4" />
                        View Details
                      </Link>
                      {request.status === 'completed' && request.created_content_id && (
                        <Link
                          href={`/dashboard/agent/marketing/content/${request.created_content_id}/edit`}
                          className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Content
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <Inbox className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                {requestSearchQuery || requestFilterStatus !== 'all' || requestFilterPlatform !== 'all' || requestFilterClient !== 'all'
                  ? 'No requests found matching your filters'
                  : 'No content requests yet'}
              </p>
              <p className="text-sm text-gray-500">
                Client requests will appear here when they submit content ideas
              </p>
            </div>
          )}
        </>
      )}

      {/* Content List */}
      {activeTab === 'content' && (
        <>
          {filteredContent.length > 0 ? (
            <div className="space-y-4">
              {filteredContent.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{PLATFORM_ICONS[post.platform] || '📱'}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900 capitalize">{post.platform}</p>
                        {getStatusBadge(post.status)}
                      </div>
                      <p className="text-sm text-gray-600">
                        {post.client_name || 'Unknown Client'} •{' '}
                        {new Date(post.scheduled_date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 line-clamp-2 mb-2">{post.content}</p>

                  {/* Show change request badge if status is draft and has admin message */}
                  {post.status === 'draft' && (
                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-200 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-orange-800">Changes Requested</span>
                    </div>
                  )}
                </div>

                <div className="ml-4 flex-shrink-0 flex flex-col gap-2">
                  {post.status === 'posted' && post.image_url && (
                    <a
                      href={post.image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Post
                    </a>
                  )}
                  <Link
                    href={`/dashboard/agent/marketing/content/${post.id}/edit`}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>
                </div>
              </div>

              {/* Engagement Metrics for Posted Content */}
              {post.status === 'posted' && (
                <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Engagement</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {post.engagement_rate ? `${post.engagement_rate}%` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Posted</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {post.posted_at
                        ? new Date(post.posted_at).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Approved By</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {post.approved_by_name || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Approved</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {post.approved_at
                        ? new Date(post.approved_at).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">
            {searchQuery || filterStatus !== 'all' || filterPlatform !== 'all' || filterClient !== 'all'
              ? 'No content found matching your filters'
              : 'No content created yet'}
          </p>
          <Link
            href="/dashboard/agent/marketing/content/create"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Create your first content →
          </Link>
        </div>
      )}
        </>
      )}
    </div>
  );
}
