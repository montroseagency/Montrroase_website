'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Wallet, Settings, DollarSign, CreditCard, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface WalletData {
  id: string;
  balance: string;
  total_earned: string;
  total_spent: string;
}

interface AutoRechargeSettings {
  id: string;
  is_enabled: boolean;
  threshold_amount: string;
  recharge_amount: string;
  payment_method_id: string;
  payment_method_type: 'paypal' | 'card';
  last_recharge_date: string | null;
  total_recharges: number;
  total_recharged_amount: string;
  should_recharge: boolean;
}

interface Transaction {
  id: string;
  transaction_type: 'credit' | 'debit';
  amount: string;
  status: string;
  description: string;
  payment_method: string;
  paid_for_service: string;
  created_at: string;
}

export default function WalletSettingsPage() {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [autoRecharge, setAutoRecharge] = useState<AutoRechargeSettings | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state for auto-recharge configuration
  const [formData, setFormData] = useState({
    is_enabled: false,
    threshold_amount: '10.00',
    recharge_amount: '50.00',
    payment_method_type: 'paypal' as 'paypal' | 'card',
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [walletData, autoRechargeData, transactionsData] = await Promise.all([
        api.getWallet(),
        api.getAutoRechargeSettings(),
        api.getWalletTransactions(20),
      ]);

      // Handle wallet response
      const typedWalletData = walletData as any;
      const walletInfo = typedWalletData.results?.[0] || typedWalletData[0] || typedWalletData;
      setWallet(walletInfo);

      // Handle auto-recharge response
      const typedAutoRechargeData = autoRechargeData as any;
      const autoRechargeInfo = typedAutoRechargeData.results?.[0] || typedAutoRechargeData[0] || typedAutoRechargeData;
      setAutoRecharge(autoRechargeInfo);

      if (autoRechargeInfo) {
        setFormData({
          is_enabled: autoRechargeInfo.is_enabled,
          threshold_amount: autoRechargeInfo.threshold_amount,
          recharge_amount: autoRechargeInfo.recharge_amount,
          payment_method_type: autoRechargeInfo.payment_method_type,
        });
      }

      // Handle transactions response
      const typedTransactionsData = transactionsData as any;
      const txList = typedTransactionsData.transactions || typedTransactionsData.results || typedTransactionsData;
      setTransactions(txList);
    } catch (err: any) {
      setError(err.message || 'Failed to load wallet data');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAutoRecharge = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setSaving(true);
      await api.configureAutoRecharge({
        is_enabled: formData.is_enabled,
        threshold_amount: parseFloat(formData.threshold_amount),
        recharge_amount: parseFloat(formData.recharge_amount),
        payment_method_type: formData.payment_method_type,
      });

      setSuccess('Auto-recharge settings saved successfully!');
      fetchData();
    } catch (err: any) {
      setError(err.message || 'Failed to save auto-recharge settings');
    } finally {
      setSaving(false);
    }
  };

  const handleDisableAutoRecharge = async () => {
    try {
      setSaving(true);
      await api.disableAutoRecharge();
      setSuccess('Auto-recharge disabled successfully!');
      fetchData();
    } catch (err: any) {
      setError(err.message || 'Failed to disable auto-recharge');
    } finally {
      setSaving(false);
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
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Wallet Settings</h1>
        <p className="text-gray-600">Manage your wallet balance and auto-recharge configuration</p>
      </div>

      {/* Alerts */}
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

      {/* Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Wallet className="w-10 h-10 opacity-80" />
            <div className="text-right">
              <p className="text-purple-100 text-sm mb-1">Current Balance</p>
              <p className="text-3xl font-bold">${wallet ? parseFloat(wallet.balance).toFixed(2) : '0.00'}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-10 h-10 opacity-80" />
            <div className="text-right">
              <p className="text-green-100 text-sm mb-1">Total Earned</p>
              <p className="text-3xl font-bold">${wallet ? parseFloat(wallet.total_earned).toFixed(2) : '0.00'}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <CreditCard className="w-10 h-10 opacity-80" />
            <div className="text-right">
              <p className="text-blue-100 text-sm mb-1">Total Spent</p>
              <p className="text-3xl font-bold">${wallet ? parseFloat(wallet.total_spent).toFixed(2) : '0.00'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-Recharge Configuration */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Settings className="w-6 h-6 text-purple-600" />
          Auto-Recharge Configuration
        </h2>

        {autoRecharge && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-semibold text-gray-900 flex items-center gap-2">
                  {autoRecharge.is_enabled ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-600">Enabled</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="text-red-600">Disabled</span>
                    </>
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Recharges</p>
                <p className="font-semibold text-gray-900">{autoRecharge.total_recharges}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Recharged</p>
                <p className="font-semibold text-gray-900">${parseFloat(autoRecharge.total_recharged_amount).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Recharge</p>
                <p className="font-semibold text-gray-900">
                  {autoRecharge.last_recharge_date
                    ? new Date(autoRecharge.last_recharge_date).toLocaleDateString()
                    : 'Never'}
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSaveAutoRecharge} className="space-y-6">
          {/* Enable/Disable Toggle */}
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div>
              <label className="text-sm font-medium text-gray-900">Enable Auto-Recharge</label>
              <p className="text-sm text-gray-600">Automatically add credits when balance is low</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={formData.is_enabled}
                onChange={(e) => setFormData({ ...formData, is_enabled: e.target.checked })}
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* Threshold Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Threshold Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={formData.threshold_amount}
              onChange={(e) => setFormData({ ...formData, threshold_amount: e.target.value })}
              disabled={!formData.is_enabled}
            />
            <p className="mt-1 text-sm text-gray-500">
              Trigger auto-recharge when balance falls below this amount (min $5.00)
            </p>
          </div>

          {/* Recharge Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recharge Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="10"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={formData.recharge_amount}
              onChange={(e) => setFormData({ ...formData, recharge_amount: e.target.value })}
              disabled={!formData.is_enabled}
            />
            <p className="mt-1 text-sm text-gray-500">
              Amount to add when auto-recharge is triggered (min $10.00)
            </p>
          </div>

          {/* Payment Method Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={formData.payment_method_type}
              onChange={(e) => setFormData({ ...formData, payment_method_type: e.target.value as 'paypal' | 'card' })}
              disabled={!formData.is_enabled}
            >
              <option value="paypal">PayPal</option>
              <option value="card">Credit Card</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>

            {autoRecharge?.is_enabled && (
              <button
                type="button"
                onClick={handleDisableAutoRecharge}
                disabled={saving}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Disable Auto-Recharge
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <RefreshCw className="w-6 h-6 text-blue-600" />
          Recent Transactions
        </h2>

        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No transactions yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(tx.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          tx.transaction_type === 'credit'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {tx.transaction_type === 'credit' ? 'Credit' : 'Debit'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{tx.description}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{tx.paid_for_service || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                      <span className={tx.transaction_type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                        {tx.transaction_type === 'credit' ? '+' : '-'}${parseFloat(tx.amount).toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
