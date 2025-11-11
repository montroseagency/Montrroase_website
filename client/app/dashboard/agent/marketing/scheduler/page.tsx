'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Calendar, Plus, Clock, CheckCircle, XCircle, AlertCircle, Eye, ExternalLink, Instagram, Youtube } from 'lucide-react';

interface ScheduledContent {
  id: string;
  client: string;
  client_name: string;
  agent_name: string;
  campaign: string;
  campaign_title: string;
  title: string;
  caption: string;
  platform: string;
  social_account: string;
  social_account_username: string;
  scheduled_for: string;
  status: string;
  published_at: string;
  post_url: string;
  platform_post_id: string;
  error_message: string;
  retry_count: number;
  media_files: string[];
  hashtags: string[];
  mentions: string[];
  requires_approval: boolean;
  approved_by: string;
  approved_by_name: string;
  approved_at: string;
  is_overdue: boolean;
  created_at: string;
}

interface Client {
  id: string;
  name: string;
}

interface Campaign {
  id: string;
  title: string;
  client: string;
}

interface SocialAccount {
  id: string;
  platform: string;
  username: string;
}

export default function ContentSchedulerPage() {
  const [scheduledContent, setScheduledContent] = useState<ScheduledContent[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [formData, setFormData] = useState({
    client: '',
    campaign: '',
    title: '',
    caption: '',
    platform: 'instagram',
    social_account: '',
    scheduled_for: '',
    hashtags: '',
    mentions: '',
    requires_approval: true
  });

  useEffect(() => {
    fetchData();
  }, [statusFilter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = statusFilter !== 'all' ? { status: statusFilter } : {};
      const [contentData, clientsData, campaignsData, accountsData] = await Promise.all([
        api.getScheduledContent(params),
        api.getAgentClients(),
        api.getMyCampaigns(),
        api.getSocialAccounts()
      ]);
      setScheduledContent(contentData);
      setClients(clientsData);
      setCampaigns(campaignsData);
      setSocialAccounts(accountsData);
    } catch (err: any) {
      setError(err.message || 'Failed to load scheduled content');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');

      const scheduleData = {
        ...formData,
        hashtags: formData.hashtags ? formData.hashtags.split(',').map(h => h.trim()) : [],
        mentions: formData.mentions ? formData.mentions.split(',').map(m => m.trim()) : [],
        media_files: []
      };

      await api.scheduleContent(scheduleData);
      setSuccess('Content scheduled successfully!');
      setShowScheduleForm(false);
      resetForm();
      fetchData();
    } catch (err: any) {
      setError(err.message || 'Failed to schedule content');
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await api.approveScheduledContent(id);
      setSuccess('Content approved successfully!');
      fetchData();
    } catch (err: any) {
      setError(err.message || 'Failed to approve content');
    }
  };

  const handlePublish = async (id: string) => {
    const postUrl = prompt('Enter the post URL:');
    if (!postUrl) return;

    try {
      await api.publishScheduledContent(id, { post_url: postUrl });
      setSuccess('Content published successfully!');
      fetchData();
    } catch (err: any) {
      setError(err.message || 'Failed to publish content');
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this scheduled post?')) return;

    try {
      await api.cancelScheduledContent(id);
      setSuccess('Scheduled content cancelled successfully!');
      fetchData();
    } catch (err: any) {
      setError(err.message || 'Failed to cancel content');
    }
  };

  const resetForm = () => {
    setFormData({
      client: '',
      campaign: '',
      title: '',
      caption: '',
      platform: 'instagram',
      social_account: '',
      scheduled_for: '',
      hashtags: '',
      mentions: '',
      requires_approval: true
    });
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'draft': 'bg-gray-100 text-gray-800',
      'scheduled': 'bg-blue-100 text-blue-800',
      'published': 'bg-green-100 text-green-800',
      'failed': 'bg-red-100 text-red-800',
      'cancelled': 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (content: ScheduledContent) => {
    if (content.is_overdue && content.status === 'scheduled') {
      return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
    switch (content.status) {
      case 'published':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-orange-600" />;
      default:
        return <Clock className="w-5 h-5 text-blue-600" />;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="w-5 h-5 text-pink-600" />;
      case 'youtube':
        return <Youtube className="w-5 h-5 text-red-600" />;
      default:
        return <Calendar className="w-5 h-5 text-purple-600" />;
    }
  };

  const filteredCampaigns = campaigns.filter(c =>
    !formData.client || c.client === formData.client
  );

  const filteredAccounts = socialAccounts.filter(a =>
    !formData.platform || a.platform.toLowerCase() === formData.platform.toLowerCase()
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const upcomingCount = scheduledContent.filter(c => c.status === 'scheduled' && !c.is_overdue).length;
  const overdueCount = scheduledContent.filter(c => c.is_overdue).length;
  const publishedCount = scheduledContent.filter(c => c.status === 'published').length;
  const draftCount = scheduledContent.filter(c => c.status === 'draft').length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Scheduler</h1>
          <p className="text-gray-600">Schedule and manage social media posts for your clients</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Calendar
            </button>
          </div>
          <button
            onClick={() => setShowScheduleForm(!showScheduleForm)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            {showScheduleForm ? 'Cancel' : 'Schedule Post'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-blue-600">{upcomingCount}</p>
            </div>
            <Clock className="w-10 h-10 text-blue-600 opacity-20" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-red-600 opacity-20" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Published</p>
              <p className="text-2xl font-bold text-green-600">{publishedCount}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-600 opacity-20" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-gray-600">{draftCount}</p>
            </div>
            <Calendar className="w-10 h-10 text-gray-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Schedule Form */}
      {showScheduleForm && (
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Schedule New Post</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client *</label>
                <select
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value, campaign: '' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                >
                  <option value="">Select a client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign (Optional)</label>
                <select
                  value={formData.campaign}
                  onChange={(e) => setFormData({ ...formData, campaign: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  disabled={!formData.client}
                >
                  <option value="">No campaign</option>
                  {filteredCampaigns.map((campaign) => (
                    <option key={campaign.id} value={campaign.id}>
                      {campaign.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Platform *</label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value, social_account: '' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                >
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Social Account *</label>
                <select
                  value={formData.social_account}
                  onChange={(e) => setFormData({ ...formData, social_account: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                >
                  <option value="">Select an account</option>
                  {filteredAccounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.username} ({account.platform})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Post Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Post title for reference"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Date & Time *</label>
                <input
                  type="datetime-local"
                  value={formData.scheduled_for}
                  onChange={(e) => setFormData({ ...formData, scheduled_for: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Caption *</label>
              <textarea
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                rows={4}
                placeholder="Post caption..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hashtags</label>
                <input
                  type="text"
                  value={formData.hashtags}
                  onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                  placeholder="summer, sale, fashion (comma-separated)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mentions</label>
                <input
                  type="text"
                  value={formData.mentions}
                  onChange={(e) => setFormData({ ...formData, mentions: e.target.value })}
                  placeholder="@username1, @username2 (comma-separated)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="requires_approval"
                checked={formData.requires_approval}
                onChange={(e) => setFormData({ ...formData, requires_approval: e.target.checked })}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-600"
              />
              <label htmlFor="requires_approval" className="text-sm text-gray-700">
                Requires client approval before publishing
              </label>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow"
            >
              Schedule Post
            </button>
          </form>
        </div>
      )}

      {/* Content List */}
      {scheduledContent.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Scheduled Content</h3>
          <p className="text-gray-600 mb-6">Schedule your first post to get started</p>
          <button
            onClick={() => setShowScheduleForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            Schedule Post
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {scheduledContent.map((content) => (
            <div
              key={content.id}
              className={`bg-white rounded-lg shadow-sm border p-6 ${
                content.is_overdue ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getPlatformIcon(content.platform)}
                    <h3 className="text-xl font-semibold text-gray-900">{content.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(content.status)}`}>
                      {content.status.toUpperCase()}
                    </span>
                    {content.is_overdue && content.status === 'scheduled' && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        OVERDUE
                      </span>
                    )}
                  </div>
                  <p className="text-purple-600 font-medium mb-2">
                    {content.client_name}
                    {content.campaign_title && ` • ${content.campaign_title}`}
                  </p>
                  <p className="text-gray-600 mb-2">{content.caption}</p>
                </div>
                <div className="ml-4">
                  {getStatusIcon(content)}
                </div>
              </div>

              {content.hashtags && content.hashtags.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {content.hashtags.map((tag, index) => (
                      <span key={index} className="text-sm text-blue-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Platform</p>
                  <p className="text-sm font-medium text-gray-900 capitalize">{content.platform}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Account</p>
                  <p className="text-sm font-medium text-gray-900">{content.social_account_username || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Scheduled For</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(content.scheduled_for).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Approval Status</p>
                  <p className="text-sm font-medium text-gray-900">
                    {content.approved_at ? 'Approved' : content.requires_approval ? 'Pending' : 'Not Required'}
                  </p>
                </div>
              </div>

              {content.error_message && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>Error:</strong> {content.error_message}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                {content.status === 'draft' && !content.approved_at && content.requires_approval && (
                  <button
                    onClick={() => handleApprove(content.id)}
                    className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve & Schedule
                  </button>
                )}
                {content.status === 'scheduled' && (
                  <button
                    onClick={() => handlePublish(content.id)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Mark as Published
                  </button>
                )}
                {content.post_url && (
                  <a
                    href={content.post_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    View Post
                  </a>
                )}
                {(content.status === 'scheduled' || content.status === 'draft') && (
                  <button
                    onClick={() => handleCancel(content.id)}
                    className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                  >
                    <XCircle className="w-4 h-4" />
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
