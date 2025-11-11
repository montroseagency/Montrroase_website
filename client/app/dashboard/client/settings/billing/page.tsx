'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import type { Invoice } from '@/lib/types';
import {
  Wallet, ArrowUpCircle, ArrowDownCircle, Gift, TrendingUp,
  CreditCard, DollarSign, Calendar, Award, Plus, Download,
  AlertCircle, FileText, ChevronRight
} from 'lucide-react';

interface WalletData {
  id: string;
  balance: number;
  total_earned: number;
  total_spent: number;
  created_at: string;
}

interface Transaction {
  id: string;
  transaction_type: string;
  amount: number;
  status: string;
  description: string;
  payment_method?: string;
  created_at: string;
}

interface Giveaway {
  id: string;
  title: string;
  description: string;
  prize_description: string;
  entry_requirement: string;
  start_date: string;
  end_date: string;
  status: string;
}

interface GiveawayWin {
  id: string;
  giveaway: Giveaway;
  reward_amount: number;
  is_claimed: boolean;
  won_at: string;
  claimed_at?: string;
}

export default function BillingWalletPage() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [wins, setWins] = useState<GiveawayWin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [processingTopUp, setProcessingTopUp] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'invoices' | 'transactions' | 'giveaways'>('overview');

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [walletData, transactionsData, invoicesData, giveawaysData, winsData] = await Promise.all([
        ApiService.get('/wallet/my_wallet/'),
        ApiService.get('/transactions/'),
        ApiService.getInvoices(),
        ApiService.get('/giveaways/'),
        ApiService.get('/giveaways/my_wins/')
      ]);

      setWallet(walletData as WalletData);
      setTransactions(Array.isArray(transactionsData) ? transactionsData : []);
      setInvoices(Array.isArray(invoicesData) ? invoicesData : []);
      setGiveaways(Array.isArray(giveawaysData) ? giveawaysData : []);
      setWins(Array.isArray(winsData) ? winsData : []);
    } catch (err: any) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTopUp = async () => {
    const amount = parseFloat(topUpAmount);
    if (!amount || amount <= 0) return;

    try {
      setProcessingTopUp(true);
      await ApiService.post('/wallet/topup/', {
        amount,
        payment_method: paymentMethod
      });

      await loadAllData();
      setShowTopUpModal(false);
      setTopUpAmount('');
    } catch (err: any) {
      console.error('Error topping up:', err);
      alert('Failed to top up wallet');
    } finally {
      setProcessingTopUp(false);
    }
  };

  const handleClaimReward = async (giveawayId: string) => {
    try {
      await ApiService.post(`/giveaways/${giveawayId}/claim_reward/`, {});
      await loadAllData();
    } catch (err: any) {
      console.error('Error claiming reward:', err);
      alert('Failed to claim reward');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'topup':
        return <ArrowUpCircle className="w-5 h-5 text-green-600" />;
      case 'payment':
      case 'website_payment':
        return <ArrowDownCircle className="w-5 h-5 text-red-600" />;
      case 'giveaway':
      case 'referral_bonus':
        return <Gift className="w-5 h-5 text-purple-600" />;
      default:
        return <DollarSign className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'topup':
      case 'giveaway':
      case 'referral_bonus':
        return 'text-green-600';
      case 'payment':
      case 'website_payment':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const unclaimedWins = wins.filter(w => !w.is_claimed);
  const invoiceStats = {
    total: invoices.reduce((s, i) => s + (Number(i.amount) || 0), 0),
    paid: invoices.filter(i => i.status === 'paid').reduce((s, i) => s + (Number(i.amount) || 0), 0),
    pending: invoices.filter(i => i.status === 'pending').reduce((s, i) => s + (Number(i.amount) || 0), 0),
    overdue: invoices.filter(i => i.status === 'overdue').length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Billing & Wallet</h1>
        <p className="text-gray-600 mt-2">Manage your subscription, payments, and wallet balance</p>
      </div>

      {/* Main Balance Card */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-lg p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white bg-opacity-20 rounded-lg">
              <Wallet className="w-10 h-10" />
            </div>
            <div>
              <p className="text-purple-100 text-sm">Available Balance</p>
              <h2 className="text-5xl font-bold">${wallet?.balance ? Number(wallet.balance).toFixed(2) : '0.00'}</h2>
            </div>
          </div>
          <button
            onClick={() => setShowTopUpModal(true)}
            className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Top Up
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-purple-400 border-opacity-30">
          <div>
            <p className="text-purple-100 text-sm mb-1">Total Earned</p>
            <p className="text-2xl font-bold">${wallet?.total_earned ? Number(wallet.total_earned).toFixed(2) : '0.00'}</p>
          </div>
          <div>
            <p className="text-purple-100 text-sm mb-1">Total Spent</p>
            <p className="text-2xl font-bold">${wallet?.total_spent ? Number(wallet.total_spent).toFixed(2) : '0.00'}</p>
          </div>
          <div>
            <p className="text-purple-100 text-sm mb-1">Unclaimed Rewards</p>
            <p className="text-2xl font-bold">{unclaimedWins.length}</p>
          </div>
          <div>
            <p className="text-purple-100 text-sm mb-1">Pending Invoices</p>
            <p className="text-2xl font-bold">{invoiceStats.overdue}</p>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {invoiceStats.overdue > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-900">You have {invoiceStats.overdue} overdue invoice{invoiceStats.overdue > 1 ? 's' : ''}</p>
            <p className="text-sm text-red-700">Please settle your payment to avoid service interruption</p>
          </div>
        </div>
      )}

      {unclaimedWins.length > 0 && (
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg shadow border-2 border-yellow-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-6 h-6 text-yellow-600" />
            <h2 className="text-xl font-bold text-gray-900">Congratulations! You have unclaimed rewards!</h2>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-700">
              Total rewards: <span className="text-2xl font-bold text-yellow-600">
                ${unclaimedWins.reduce((sum, w) => sum + (Number(w.reward_amount) || 0), 0).toFixed(2)}
              </span>
            </p>
            <button
              onClick={() => setActiveTab('giveaways')}
              className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all font-medium"
            >
              Claim Now
            </button>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Total Billed</p>
          <p className="text-2xl font-bold text-gray-900">${(invoiceStats.total || 0).toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Paid</p>
          <p className="text-2xl font-bold text-green-600">${(invoiceStats.paid || 0).toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">${(invoiceStats.pending || 0).toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">Transactions</p>
          <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'invoices'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Invoices ({invoices.length})
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'transactions'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Transactions ({transactions.length})
            </button>
            <button
              onClick={() => setActiveTab('giveaways')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'giveaways'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Giveaways {unclaimedWins.length > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-yellow-500 text-white text-xs rounded-full">
                  {unclaimedWins.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription & Plans</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <FileText className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">View Plans</h4>
                        <p className="text-sm text-gray-600 mb-4">Upgrade or downgrade your subscription</p>
                        <button className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1">
                          View Plans <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <CreditCard className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">Payment Methods</h4>
                        <p className="text-sm text-gray-600 mb-4">Manage your payment information</p>
                        <button className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1">
                          Manage Methods <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg">
                          {getTransactionIcon(transaction.transaction_type)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-xs text-gray-500">{new Date(transaction.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className={`text-lg font-bold ${getTransactionColor(transaction.transaction_type)}`}>
                        {transaction.transaction_type === 'topup' || transaction.transaction_type === 'giveaway' ? '+' : '-'}
                        ${(Number(transaction.amount) || 0).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Invoices Tab */}
          {activeTab === 'invoices' && (
            <div>
              {invoices.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {invoices.map(invoice => (
                    <div key={invoice.id} className="py-4 flex items-center justify-between hover:bg-gray-50 transition-colors px-4 -mx-4">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Invoice #{invoice.invoice_number}</p>
                        <p className="text-sm text-gray-600">Due: {new Date(invoice.due_date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right mr-6">
                        <p className="font-semibold text-gray-900">${(Number(invoice.amount) || 0).toFixed(2)}</p>
                        <span className={`text-xs px-2 py-1 rounded-full inline-block font-medium ${
                          invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                          invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>{invoice.status}</span>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No invoices yet</p>
                </div>
              )}
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-600">Showing {transactions.length} transactions</p>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
              {transactions.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="py-4 flex items-center justify-between hover:bg-gray-50 transition-colors px-4 -mx-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getTransactionIcon(transaction.transaction_type)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(transaction.created_at).toLocaleDateString()}
                            </span>
                            {transaction.payment_method && (
                              <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded capitalize">
                                {transaction.payment_method}
                              </span>
                            )}
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              transaction.status === 'completed' ? 'bg-green-100 text-green-700' :
                              transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {transaction.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${getTransactionColor(transaction.transaction_type)}`}>
                          {transaction.transaction_type === 'topup' || transaction.transaction_type === 'giveaway' ? '+' : '-'}
                          ${(Number(transaction.amount) || 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No transactions yet</p>
                </div>
              )}
            </div>
          )}

          {/* Giveaways Tab */}
          {activeTab === 'giveaways' && (
            <div className="space-y-6">
              {/* Unclaimed Wins */}
              {unclaimedWins.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Wins - Claim Now!</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {unclaimedWins.map((win) => (
                      <div key={win.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border-2 border-yellow-300">
                        <h4 className="font-semibold text-gray-900 mb-2">{win.giveaway.title}</h4>
                        <p className="text-3xl font-bold text-yellow-600 mb-3">${(Number(win.reward_amount) || 0).toFixed(2)}</p>
                        <p className="text-sm text-gray-600 mb-4">Won on {new Date(win.won_at).toLocaleDateString()}</p>
                        <button
                          onClick={() => handleClaimReward(win.giveaway.id)}
                          className="w-full px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all font-medium"
                        >
                          Claim Reward
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Active Giveaways */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Giveaways</h3>
                {giveaways.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {giveaways.map((giveaway) => (
                      <div key={giveaway.id} className="border border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Gift className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{giveaway.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{giveaway.description}</p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 mb-4">
                          <p className="text-sm text-purple-700 font-medium mb-1">Prize</p>
                          <p className="font-semibold text-gray-900">{giveaway.prize_description}</p>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Ends: {new Date(giveaway.end_date).toLocaleDateString()}</span>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            {giveaway.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No active giveaways at the moment</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top Up Modal */}
      {showTopUpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Top Up Wallet</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (USD)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    placeholder="0.00"
                    min="1"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="paypal">PayPal</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm text-purple-900">
                  <strong>Total:</strong> ${parseFloat(topUpAmount || '0').toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowTopUpModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleTopUp}
                disabled={!topUpAmount || parseFloat(topUpAmount) <= 0 || processingTopUp}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                {processingTopUp ? 'Processing...' : 'Add Funds'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
