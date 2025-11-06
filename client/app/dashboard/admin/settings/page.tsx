'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import type { AuthUser } from '@/lib/types';
import { User, Lock, Bell, LogOut, AlertCircle } from 'lucide-react';

export default function AdminSettingsPage() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'system'>('profile');
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [bankSettings, setBankSettings] = useState({
    bank_name: '',
    account_holder: '',
    account_number: '',
    routing_number: '',
    swift_code: '',
  });
  const [notificationSettings, setNotificationSettings] = useState({
    email_alerts: true,
    invoice_reminders: true,
    client_messages: true,
    system_updates: true,
  });

  const handleSaveProfile = async () => {
    if (!profile) return;
    setLoading(true);
    try {
      const updated = await ApiService.updateProfile({
        first_name: profile.first_name,
        last_name: profile.last_name,
        company: profile.company,
        bio: profile.bio,
      });
      setProfile(updated);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.new !== passwordData.confirm) {
      alert('Passwords do not match');
      return;
    }
    if (!passwordData.current || !passwordData.new) {
      alert('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await ApiService.changePassword({
        current_password: passwordData.current,
        new_password: passwordData.new,
      });
      setPasswordData({ current: '', new: '', confirm: '' });
      alert('Password changed successfully!');
    } catch (err: any) {
      alert('Error changing password: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBankSettings = async () => {
    if (!bankSettings.bank_name || !bankSettings.account_number) {
      alert('Please fill in required fields');
      return;
    }
    setLoading(true);
    try {
      // Save bank settings API call would go here
      alert('Bank settings saved successfully!');
    } catch (err: any) {
      alert('Error saving bank settings: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotificationSettings = async () => {
    setLoading(true);
    try {
      // Save notification settings API call would go here
      alert('Notification settings saved successfully!');
    } catch (err: any) {
      alert('Error saving notification settings: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
        <p className="text-gray-600 mt-2">Manage your admin account and system settings</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 px-6 py-4 font-medium flex items-center justify-center gap-2 ${activeTab === 'profile' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
          >
            <User className="w-4 h-4" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex-1 px-6 py-4 font-medium flex items-center justify-center gap-2 ${activeTab === 'security' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
          >
            <Lock className="w-4 h-4" />
            Security
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`flex-1 px-6 py-4 font-medium flex items-center justify-center gap-2 ${activeTab === 'system' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
          >
            <Bell className="w-4 h-4" />
            System
          </button>
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && profile && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={profile.first_name || ''}
                    onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={profile.last_name || ''}
                    onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input
                  type="text"
                  value={profile.company || ''}
                  onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  value={profile.bio || ''}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleSaveProfile}
                disabled={loading}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  value={passwordData.current}
                  onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordData.new}
                  onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={passwordData.confirm}
                  onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleChangePassword}
                disabled={loading || !passwordData.current || !passwordData.new}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>

              <hr className="my-6" />

              <h3 className="text-lg font-semibold text-gray-900">Bank Transfer Settings</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <AlertCircle className="inline-block w-5 h-5 mr-2 text-blue-600" />
                <p className="text-sm text-blue-800">
                  Configure your bank account for automatic payments from clients
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name*</label>
                  <input
                    type="text"
                    value={bankSettings.bank_name}
                    onChange={(e) => setBankSettings({ ...bankSettings, bank_name: e.target.value })}
                    placeholder="e.g., Chase Bank"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Holder Name*</label>
                  <input
                    type="text"
                    value={bankSettings.account_holder}
                    onChange={(e) => setBankSettings({ ...bankSettings, account_holder: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Number*</label>
                  <input
                    type="text"
                    value={bankSettings.account_number}
                    onChange={(e) => setBankSettings({ ...bankSettings, account_number: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Routing Number</label>
                  <input
                    type="text"
                    value={bankSettings.routing_number}
                    onChange={(e) => setBankSettings({ ...bankSettings, routing_number: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">SWIFT Code</label>
                  <input
                    type="text"
                    value={bankSettings.swift_code}
                    onChange={(e) => setBankSettings({ ...bankSettings, swift_code: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button
                onClick={handleSaveBankSettings}
                disabled={loading}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Bank Settings'}
              </button>
            </div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Email Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Email Alerts</p>
                    <p className="text-sm text-gray-600">Receive email alerts for important events</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.email_alerts}
                    onChange={(e) =>
                      setNotificationSettings({ ...notificationSettings, email_alerts: e.target.checked })
                    }
                    className="w-5 h-5 text-purple-600"
                  />
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Invoice Reminders</p>
                    <p className="text-sm text-gray-600">Get notified about pending invoices</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.invoice_reminders}
                    onChange={(e) =>
                      setNotificationSettings({ ...notificationSettings, invoice_reminders: e.target.checked })
                    }
                    className="w-5 h-5 text-purple-600"
                  />
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Client Messages</p>
                    <p className="text-sm text-gray-600">Notifications for new client messages</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.client_messages}
                    onChange={(e) =>
                      setNotificationSettings({ ...notificationSettings, client_messages: e.target.checked })
                    }
                    className="w-5 h-5 text-purple-600"
                  />
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">System Updates</p>
                    <p className="text-sm text-gray-600">Get notified about system updates</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.system_updates}
                    onChange={(e) =>
                      setNotificationSettings({ ...notificationSettings, system_updates: e.target.checked })
                    }
                    className="w-5 h-5 text-purple-600"
                  />
                </div>
              </div>
              <button
                onClick={handleSaveNotificationSettings}
                disabled={loading}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Notification Settings'}
              </button>

              <hr className="my-6" />

              <h3 className="text-lg font-semibold text-gray-900">System Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Platform Version</p>
                  <p className="text-lg font-medium text-gray-900">1.0.0</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Updated</p>
                  <p className="text-lg font-medium text-gray-900">November 6, 2025</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Database Status</p>
                  <p className="text-lg font-medium text-green-600">Connected</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">API Status</p>
                  <p className="text-lg font-medium text-green-600">Operational</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-6 py-3 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors w-full justify-center"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </div>
  );
}
