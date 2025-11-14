'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Megaphone, Plus, TrendingUp, DollarSign, Users, Target, Calendar, Edit, Trash2, BarChart } from 'lucide-react';

interface Campaign {
  id: string;
  client: string;
  client_name: string;
  agent_name: string;
  title: string;
  description: string;
  platform: string;
  status: string;
  start_date: string;
  end_date: string;
  goal: string;
  target_audience: string;
  target_reach: number;
  target_engagement: number;
  budget: string;
  actual_reach: number;
  actual_engagement: number;
  actual_spend: string;
  content_post_count: number;
  performance_percentage: number;
  is_active: boolean;
  created_at: string;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  const [formData, setFormData] = useState({
    client: '',
    title: '',
    description: '',
    platform: 'instagram',
    status: 'draft',
    start_date: '',
    end_date: '',
    goal: '',
    target_audience: '',
    target_reach: '',
    target_engagement: '',
    budget: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [campaignsData, clientsData] = await Promise.all([
        api.getMyCampaigns(),
        api.getAgentClients()
      ]);
      setCampaigns(campaignsData as Campaign[]);
      setClients(clientsData as any[]);
    } catch (err: any) {
      setError(err.message || 'Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');

      const campaignData = {
        ...formData,
        target_reach: parseInt(formData.target_reach) || 0,
        target_engagement: parseInt(formData.target_engagement) || 0,
        budget: parseFloat(formData.budget) || 0
      };

      if (editingCampaign) {
        await api.updateCampaign(editingCampaign.id, campaignData);
        setSuccess('Campaign updated successfully!');
      } else {
        await api.createCampaign(campaignData);
        setSuccess('Campaign created successfully!');
      }

      setShowCreateForm(false);
      setEditingCampaign(null);
      resetForm();
      fetchData();
    } catch (err: any) {
      setError(err.message || 'Failed to save campaign');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return;

    try {
      await api.deleteCampaign(id);
      setSuccess('Campaign deleted successfully!');
      fetchData();
    } catch (err: any) {
      setError(err.message || 'Failed to delete campaign');
    }
  };

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setFormData({
      client: campaign.client,
      title: campaign.title,
      description: campaign.description,
      platform: campaign.platform,
      status: campaign.status,
      start_date: campaign.start_date.split('T')[0],
      end_date: campaign.end_date.split('T')[0],
      goal: campaign.goal,
      target_audience: campaign.target_audience,
      target_reach: campaign.target_reach.toString(),
      target_engagement: campaign.target_engagement.toString(),
      budget: campaign.budget
    });
    setShowCreateForm(true);
  };

  const resetForm = () => {
    setFormData({
      client: '',
      title: '',
      description: '',
      platform: 'instagram',
      status: 'draft',
      start_date: '',
      end_date: '',
      goal: '',
      target_audience: '',
      target_reach: '',
      target_engagement: '',
      budget: ''
    });
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'draft': 'bg-gray-100 text-gray-800',
      'scheduled': 'bg-yellow-100 text-yellow-800',
      'active': 'bg-green-100 text-green-800',
      'paused': 'bg-orange-100 text-orange-800',
      'completed': 'bg-blue-100 text-blue-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPlatformIcon = (platform: string) => {
    return <Megaphone className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const activeCampaigns = campaigns.filter(c => c.is_active).length;
  const totalBudget = campaigns.reduce((sum, c) => sum + parseFloat(c.budget), 0);
  const totalSpend = campaigns.reduce((sum, c) => sum + parseFloat(c.actual_spend), 0);
  const totalReach = campaigns.reduce((sum, c) => sum + c.actual_reach, 0);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketing Campaigns</h1>
          <p className="text-gray-600">Create and manage marketing campaigns for your clients</p>
        </div>
        <button
          onClick={() => {
            setShowCreateForm(!showCreateForm);
            setEditingCampaign(null);
            resetForm();
          }}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {showCreateForm ? 'Cancel' : 'New Campaign'}
        </button>
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
              <p className="text-sm text-gray-600">Total Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
            </div>
            <Megaphone className="w-10 h-10 text-purple-600 opacity-20" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">{activeCampaigns}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-600 opacity-20" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-blue-600">${totalBudget.toLocaleString()}</p>
            </div>
            <DollarSign className="w-10 h-10 text-blue-600 opacity-20" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Reach</p>
              <p className="text-2xl font-bold text-purple-600">{totalReach.toLocaleString()}</p>
            </div>
            <Users className="w-10 h-10 text-purple-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Create/Edit Form */}
      {showCreateForm && (
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client *</label>
                <select
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Summer Sale 2025"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Platform *</label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                >
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                  <option value="multi_platform">Multi-Platform</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                >
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                <input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Reach</label>
                <input
                  type="number"
                  value={formData.target_reach}
                  onChange={(e) => setFormData({ ...formData, target_reach: e.target.value })}
                  placeholder="10000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Engagement</label>
                <input
                  type="number"
                  value={formData.target_engagement}
                  onChange={(e) => setFormData({ ...formData, target_engagement: e.target.value })}
                  placeholder="5000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="500.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                <input
                  type="text"
                  value={formData.target_audience}
                  onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                  placeholder="e.g., Women 25-40, interested in fashion"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Campaign description..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Goal</label>
              <textarea
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                rows={2}
                placeholder="e.g., Increase brand awareness by 50%"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow"
            >
              {editingCampaign ? 'Update Campaign' : 'Create Campaign'}
            </button>
          </form>
        </div>
      )}

      {/* Campaigns List */}
      {campaigns.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Megaphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Campaigns Yet</h3>
          <p className="text-gray-600 mb-6">Create your first marketing campaign to get started</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            Create Campaign
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getPlatformIcon(campaign.platform)}
                    <h3 className="text-xl font-semibold text-gray-900">{campaign.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-purple-600 font-medium mb-2">Client: {campaign.client_name}</p>
                  {campaign.description && (
                    <p className="text-gray-600 mb-2">{campaign.description}</p>
                  )}
                  {campaign.goal && (
                    <p className="text-sm text-gray-500">Goal: {campaign.goal}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(campaign)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(campaign.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Platform</p>
                  <p className="text-sm font-medium text-gray-900 capitalize">{campaign.platform}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Duration</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(campaign.start_date).toLocaleDateString()} - {new Date(campaign.end_date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Budget / Spend</p>
                  <p className="text-sm font-medium text-gray-900">
                    ${campaign.budget} / ${campaign.actual_spend}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Content Posts</p>
                  <p className="text-sm font-medium text-gray-900">{campaign.content_post_count}</p>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-purple-600" />
                    <p className="text-sm font-medium text-gray-700">Reach</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{campaign.actual_reach.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Target: {campaign.target_reach.toLocaleString()}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <p className="text-sm font-medium text-gray-700">Engagement</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{campaign.actual_engagement.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Target: {campaign.target_engagement.toLocaleString()}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart className="w-4 h-4 text-green-600" />
                    <p className="text-sm font-medium text-gray-700">Performance</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{campaign.performance_percentage.toFixed(1)}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.min(campaign.performance_percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
