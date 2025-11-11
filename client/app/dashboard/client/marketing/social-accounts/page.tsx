'use client';

import { useEffect, useState } from 'react';
import ApiService from '@/lib/api';
import type { SocialMediaAccount } from '@/lib/types';
import { Link as LinkIcon, RefreshCw, LogOut } from 'lucide-react';

export default function ClientSocialAccountsPage() {
  const [accounts, setAccounts] = useState<SocialMediaAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState<string | null>(null);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const data = await ApiService.getConnectedAccounts() as SocialMediaAccount[];
      setAccounts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error loading accounts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async (accountId: string) => {
    setSyncing(accountId);
    try {
      await ApiService.triggerManualSync(accountId);
      await loadAccounts();
    } catch (err) {
      console.error('Error syncing:', err);
    } finally {
      setSyncing(null);
    }
  };

  const handleDisconnect = async (accountId: string) => {
    if (!confirm('Are you sure you want to disconnect this account?')) return;
    try {
      await ApiService.disconnectAccount(accountId);
      await loadAccounts();
    } catch (err) {
      console.error('Error disconnecting:', err);
    }
  };

  const handleConnect = async (platform: string) => {
    try {
      const response = await ApiService.initiateOAuth(platform) as any;
      if (response.oauth_url) {
        window.open(response.oauth_url, `${platform}_oauth`, 'width=500,height=600,scrollbars=yes,resizable=yes');
        setTimeout(loadAccounts, 2000);
      }
    } catch (err) {
      console.error('Error initiating OAuth:', err);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>;
  }

  const platforms: ('instagram' | 'youtube' | 'tiktok' | 'twitter' | 'linkedin' | 'facebook')[] = ['instagram', 'youtube', 'tiktok', 'twitter', 'linkedin', 'facebook'];
  const connected = accounts.map(a => a.platform);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Social Media Accounts</h1>
        <p className="text-gray-600 mt-2">Connect and manage your social media accounts</p>
      </div>

      {accounts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Connected Accounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accounts.map(account => (
              <div key={account.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-gray-900 capitalize">{account.platform}</p>
                    <p className="text-sm text-gray-600">@{account.username}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${account.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {account.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-4">Last synced: {account.last_sync ? new Date(account.last_sync).toLocaleDateString() : 'Never'}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSync(account.id)}
                    disabled={syncing === account.id}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${syncing === account.id ? 'animate-spin' : ''}`} />
                    Sync
                  </button>
                  <button
                    onClick={() => handleDisconnect(account.id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <LogOut className="w-3 h-3" />
                    Disconnect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Available Platforms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map(platform => (
            <div key={platform} className={`rounded-lg p-6 border-2 ${connected.includes(platform) ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-white'}`}>
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold text-gray-900 capitalize">{platform}</p>
                {connected.includes(platform) && <span className="text-green-600 text-sm font-medium">✓ Connected</span>}
              </div>
              {!connected.includes(platform) && (
                <button
                  onClick={() => handleConnect(platform)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <LinkIcon className="w-4 h-4" />
                  Connect {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
