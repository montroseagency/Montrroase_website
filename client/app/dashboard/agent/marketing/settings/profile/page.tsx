'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import {
  User,
  Mail,
  Briefcase,
  Save,
  AlertCircle,
  CheckCircle,
  Lock,
  Trash2,
  LogOut
} from 'lucide-react';

interface AgentProfile {
  id: string;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    company?: string;
    bio?: string;
  };
  department: string;
  specialization: string;
  max_clients: number;
  is_active: boolean;
}

export default function AgentProfileSettingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<AgentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'account'>('profile');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Profile form data
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    specialization: '',
    company: '',
    bio: '',
  });

  // Password form data
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  // Delete account confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await ApiService.get('/agents/');
      const agents = Array.isArray(response) ? response : [];
      const agentData = agents.find((agent: AgentProfile) => agent.user.email === user?.email);

      if (agentData) {
        setProfile(agentData);
        setFormData({
          first_name: agentData.user.first_name,
          last_name: agentData.user.last_name,
          specialization: agentData.specialization,
          company: agentData.user.company || '',
          bio: agentData.user.bio || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (!profile) return;

      // Update user profile
      await ApiService.updateProfile({
        first_name: formData.first_name,
        last_name: formData.last_name,
        company: formData.company,
        bio: formData.bio,
      });

      // Update agent profile
      await ApiService.put(`/agents/${profile.id}/`, {
        department: profile.department,
        specialization: formData.specialization,
        max_clients: profile.max_clients,
        is_active: profile.is_active,
      });

      showMessage('success', 'Profile updated successfully!');
      await fetchProfile();
    } catch (error: any) {
      console.error('Error updating profile:', error);
      showMessage('error', error.response?.data?.error || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.new !== passwordData.confirm) {
      showMessage('error', 'New passwords do not match');
      return;
    }

    if (passwordData.new.length < 8) {
      showMessage('error', 'Password must be at least 8 characters long');
      return;
    }

    setSaving(true);

    try {
      await ApiService.changePassword({
        current_password: passwordData.current,
        new_password: passwordData.new,
      });

      setPasswordData({ current: '', new: '', confirm: '' });
      showMessage('success', 'Password changed successfully!');
    } catch (error: any) {
      console.error('Error changing password:', error);
      showMessage('error', error.response?.data?.error || 'Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'DELETE') {
      showMessage('error', 'Please type DELETE to confirm account deletion');
      return;
    }

    setSaving(true);

    try {
      if (!profile) return;

      await ApiService.delete(`/agents/${profile.id}/`);
      showMessage('success', 'Account deleted successfully. Logging out...');

      setTimeout(async () => {
        await logout();
        router.push('/');
      }, 2000);
    } catch (error: any) {
      console.error('Error deleting account:', error);
      showMessage('error', error.response?.data?.error || 'Failed to delete account');
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
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Agent Settings</h1>
        <p className="text-gray-600 mt-1">Manage your agent profile and account settings</p>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`p-4 rounded-lg flex items-center ${
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

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 px-6 py-4 font-medium flex items-center justify-center gap-2 ${
              activeTab === 'profile'
                ? 'border-b-2 border-purple-600 text-purple-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <User className="w-4 h-4" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex-1 px-6 py-4 font-medium flex items-center justify-center gap-2 ${
              activeTab === 'security'
                ? 'border-b-2 border-purple-600 text-purple-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Lock className="w-4 h-4" />
            Security
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`flex-1 px-6 py-4 font-medium flex items-center justify-center gap-2 ${
              activeTab === 'account'
                ? 'border-b-2 border-purple-600 text-purple-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            Account
          </button>
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              {/* Profile Header */}
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

              <form onSubmit={handleProfileSubmit} className="space-y-6">
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

                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline-block w-4 h-4 mr-2" />
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline-block w-4 h-4 mr-2" />
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    required
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

                {/* Specialization */}
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

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your company name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  />
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
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>

              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    required
                    minLength={8}
                  />
                  <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters long</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    required
                    minLength={8}
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>
          )}

          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              {/* Logout Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Logout</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Sign out of your account on this device
                </p>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>

              <hr className="my-6" />

              {/* Delete Account Section */}
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-2">Delete Account</h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <AlertCircle className="inline-block w-5 h-5 mr-2 text-red-600" />
                  <p className="text-sm text-red-800">
                    Warning: This action cannot be undone. All your data, including client assignments, tasks, and messages will be permanently deleted.
                  </p>
                </div>

                {!showDeleteModal ? (
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="flex items-center gap-2 px-6 py-3 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete My Account
                  </button>
                ) : (
                  <div className="border border-red-300 rounded-lg p-6 bg-white space-y-4">
                    <p className="text-sm text-gray-700">
                      Type <strong>DELETE</strong> to confirm account deletion:
                    </p>
                    <input
                      type="text"
                      value={deleteConfirmation}
                      onChange={(e) => setDeleteConfirmation(e.target.value)}
                      placeholder="Type DELETE"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={handleDeleteAccount}
                        disabled={saving || deleteConfirmation !== 'DELETE'}
                        className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {saving ? 'Deleting...' : 'Confirm Delete'}
                      </button>
                      <button
                        onClick={() => {
                          setShowDeleteModal(false);
                          setDeleteConfirmation('');
                        }}
                        className="flex-1 px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
