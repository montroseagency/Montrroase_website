'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import { User, Mail, Briefcase, Save, AlertCircle, CheckCircle } from 'lucide-react';

interface AgentProfile {
  id: string;
  user: {
    email: string;
    first_name: string;
    last_name: string;
  };
  department: string;
  specialization: string;
  max_clients: number;
  is_active: boolean;
}

export default function AgentProfileSettingsPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<AgentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    specialization: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // Get the current agent's profile
      const response = await ApiService.get('/agents/');
      // ApiService.get returns data directly (after handling pagination)
      const agents = Array.isArray(response) ? response : [];
      const agentData = agents.find((agent: AgentProfile) => agent.user.email === user?.email);

      if (agentData) {
        setProfile(agentData);
        setFormData({
          first_name: agentData.user.first_name,
          last_name: agentData.user.last_name,
          specialization: agentData.specialization,
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      if (!profile) return;

      // Update agent profile
      await ApiService.put(`/agents/${profile.id}/`, {
        department: profile.department,
        specialization: formData.specialization,
        max_clients: profile.max_clients,
        is_active: profile.is_active,
      });

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: error.response?.data?.error || 'Failed to update profile' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <AlertCircle className="inline-block w-5 h-5 mr-2" />
          Profile not found. Please contact an administrator.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 mt-1">Manage your agent profile information</p>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 mr-2" />
          ) : (
            <AlertCircle className="w-5 h-5 mr-2" />
          )}
          {message.text}
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-3xl font-bold">
            {profile.user.first_name.charAt(0)}{profile.user.last_name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {profile.user.first_name} {profile.user.last_name}
            </h2>
            <p className="text-sm text-gray-600 capitalize">{profile.department} Agent</p>
            <span
              className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${
                profile.is_active
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {profile.is_active ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email (read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="inline-block w-4 h-4 mr-2" />
              Email
            </label>
            <input
              type="email"
              value={profile.user.email}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          {/* First Name (read-only in edit mode) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline-block w-4 h-4 mr-2" />
              First Name
            </label>
            <input
              type="text"
              value={formData.first_name}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Last Name (read-only in edit mode) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline-block w-4 h-4 mr-2" />
              Last Name
            </label>
            <input
              type="text"
              value={formData.last_name}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Department (read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Briefcase className="inline-block w-4 h-4 mr-2" />
              Department
            </label>
            <input
              type="text"
              value={profile.department === 'marketing' ? 'Marketing' : 'Website Development'}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed capitalize"
            />
            <p className="text-xs text-gray-500 mt-1">Contact an administrator to change your department</p>
          </div>

          {/* Specialization (editable) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specialization
            </label>
            <input
              type="text"
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              placeholder="e.g., Instagram Marketing, SEO, React Development"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">Your area of expertise</p>
          </div>

          {/* Max Clients (read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client Capacity
            </label>
            <input
              type="number"
              value={profile.max_clients}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">Contact an administrator to change your client capacity</p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Profile Information</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Your email, name, department, and client capacity are managed by administrators</li>
          <li>• You can update your specialization to reflect your current expertise</li>
          <li>• Contact an administrator if you need to change restricted fields</li>
        </ul>
      </div>
    </div>
  );
}
