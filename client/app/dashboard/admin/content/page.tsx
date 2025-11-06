'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import type { ContentPost } from '@/lib/types';
import { Check, X, Eye, RefreshCw, AlertCircle, CheckCircle, FileText } from 'lucide-react';

export default function AdminContentPage() {
  const { user } = useAuth();
  const [content, setContent] = useState<ContentPost[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContent, setSelectedContent] = useState<ContentPost | null>(null);
  const [showModal, setShowModal] = useState(false);

  const loadContent = async () => {
    try {
      setError(null);
      const contentData = await ApiService.getContent() as ContentPost[];
      setContent(Array.isArray(contentData) ? contentData : []);
    } catch (err: any) {
      setError(err.message || 'Failed to load content');
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    const loadInitial = async () => {
      try {
        setLoading(true);
        await loadContent();
      } finally {
        setLoading(false);
      }
    };

    loadInitial();
  }, []);

  useEffect(() => {
    let filtered = content;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    if (platformFilter !== 'all') {
      filtered = filtered.filter(c => c.platform === platformFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.client_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredContent(filtered);
  }, [content, statusFilter, platformFilter, searchQuery]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadContent();
    setRefreshing(false);
  };

  const handleApprove = async (contentId: string) => {
    try {
      await ApiService.updateContent(contentId, { status: 'approved' });
      await loadContent();
      setShowModal(false);
      alert('Content approved successfully!');
    } catch (err: any) {
      alert('Error approving content: ' + err.message);
    }
  };

  const handleReject = async (contentId: string) => {
    try {
      await ApiService.updateContent(contentId, { status: 'draft' });
      await loadContent();
      setShowModal(false);
      alert('Content rejected successfully!');
    } catch (err: any) {
      alert('Error rejecting content: ' + err.message);
    }
  };

  const handleMarkAsPosted = async (contentId: string) => {
    try {
      await ApiService.updateContent(contentId, { status: 'posted' });
      await loadContent();
      setShowModal(false);
      alert('Content marked as posted!');
    } catch (err: any) {
      alert('Error marking content as posted: ' + err.message);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'pending-approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'posted':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformEmoji = (platform: string) => {
    const emojis: { [key: string]: string } = {
      instagram: '📸',
      youtube: '🎥',
      tiktok: '🎵',
      twitter: '𝕏',
      linkedin: '💼',
      facebook: '👍',
    };
    return emojis[platform] || '📱';
  };

  const statusCounts = {
    draft: content.filter(c => c.status === 'draft').length,
    pending: content.filter(c => c.status === 'pending-approval').length,
    approved: content.filter(c => c.status === 'approved').length,
    posted: content.filter(c => c.status === 'posted').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error && content.length === 0) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <AlertCircle className="inline-block w-5 h-5 mr-2" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600 mt-2">Review and approve client content submissions</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Status Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard
          label="Draft"
          count={statusCounts.draft}
          color="bg-gray-50"
          textColor="text-gray-800"
          icon="📝"
        />
        <StatusCard
          label="Pending Review"
          count={statusCounts.pending}
          color="bg-yellow-50"
          textColor="text-yellow-800"
          icon="⏳"
        />
        <StatusCard
          label="Approved"
          count={statusCounts.approved}
          color="bg-green-50"
          textColor="text-green-800"
          icon="✓"
        />
        <StatusCard
          label="Posted"
          count={statusCounts.posted}
          color="bg-blue-50"
          textColor="text-blue-800"
          icon="📤"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="pending-approval">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="posted">Posted</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Platforms</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
              <option value="tiktok">TikTok</option>
              <option value="twitter">Twitter/X</option>
              <option value="linkedin">LinkedIn</option>
              <option value="facebook">Facebook</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search content or client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Content List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Posts</h2>
          <div className="space-y-3">
            {filteredContent.length > 0 ? (
              filteredContent.map(post => (
                <div
                  key={post.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedContent(post);
                    setShowModal(true);
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{getPlatformEmoji(post.platform)}</span>
                        <p className="font-medium text-gray-900 capitalize">{post.platform}</p>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusBadgeColor(
                          post.status
                        )}`}
                      >
                        {post.status === 'pending-approval' ? 'Pending Review' : post.status}
                      </span>
                      <Eye className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Client: {post.client_name}</span>
                    <span>Scheduled: {new Date(post.scheduled_date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-lg font-medium">No content found</p>
                <p className="text-sm">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Detail Modal */}
      {showModal && selectedContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Content Review</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Client: {selectedContent.client_name}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 border-t pt-4">
                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase">Platform</p>
                  <p className="text-sm text-gray-900 mt-1">
                    {getPlatformEmoji(selectedContent.platform)} {selectedContent.platform}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase">Content</p>
                  <p className="text-sm text-gray-900 mt-1 break-words">{selectedContent.content}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-600 uppercase">Status</p>
                    <p className="text-sm text-gray-900 mt-1 capitalize">
                      {selectedContent.status === 'pending-approval' ? 'Pending Review' : selectedContent.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600 uppercase">Scheduled Date</p>
                    <p className="text-sm text-gray-900 mt-1">
                      {new Date(selectedContent.scheduled_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {selectedContent.engagement_rate && (
                  <div>
                    <p className="text-xs font-medium text-gray-600 uppercase">Engagement Rate</p>
                    <p className="text-sm text-gray-900 mt-1">{selectedContent.engagement_rate.toFixed(2)}%</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="border-t pt-4 flex gap-2 justify-end">
                {selectedContent.status === 'pending-approval' && (
                  <>
                    <button
                      onClick={() => handleReject(selectedContent.id)}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprove(selectedContent.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      Approve
                    </button>
                  </>
                )}
                {selectedContent.status === 'approved' && (
                  <button
                    onClick={() => handleMarkAsPosted(selectedContent.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark as Posted
                  </button>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Components
function StatusCard({
  label,
  count,
  color,
  textColor,
  icon,
}: {
  label: string;
  count: number;
  color: string;
  textColor: string;
  icon: string;
}) {
  return (
    <div className={`${color} rounded-lg p-6`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium ${textColor}`}>{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{count}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
}
