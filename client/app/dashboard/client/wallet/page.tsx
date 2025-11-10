'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import {
  Wallet, ArrowUpCircle, ArrowDownCircle, Gift, TrendingUp,
  CreditCard, DollarSign, Calendar, Award, Plus, Download
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

export default function WalletPage() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [wins, setWins] = useState<GiveawayWin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [processingTopUp, setProcessingTopUp] = useState(false);

  useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    try {
      setLoading(true);
      const [walletData, transactionsData, giveawaysData, winsData] = await Promise.all([
        ApiService.get('/wallet/my_wallet/'),
        ApiService.get('/transactions/'),
        ApiService.get('/giveaways/'),
        ApiService.get('/giveaways/my_wins/')
      ]);

      setWallet(walletData);
      setTransactions(Array.isArray(transactionsData) ? transactionsData : []);
      setGiveaways(Array.isArray(giveawaysData) ? giveawaysData : []);
      setWins(Array.isArray(winsData) ? winsData : []);
    } catch (err: any) {
      console.error('Error loading wallet:', err);
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

      await loadWalletData();
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
      await loadWalletData();
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

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Wallet</h1>
        <p className="text-gray-600 mt-2">Manage your balance and transactions</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Balance */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-lg p-6 text-white col-span-1 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                <Wallet className="w-8 h-8" />
              </div>
              <div>
                <p className="text-purple-100 text-sm">Available Balance</p>
                <h2 className="text-4xl font-bold">${wallet?.balance.toFixed(2) || '0.00'}</h2>
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

          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-purple-400 border-opacity-30">
            <div>
              <p className="text-purple-100 text-sm">Total Earned</p>
              <p className="text-2xl font-bold">${wallet?.total_earned.toFixed(2) || '0.00'}</p>
            </div>
            <div>
              <p className="text-purple-100 text-sm">Total Spent</p>
              <p className="text-2xl font-bold">${wallet?.total_spent.toFixed(2) || '0.00'}</p>
            </div>
          </div>
        </div>

        {/* Unclaimed Rewards */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <Gift className="w-5 h-5 text-yellow-600" />
            <h3 className="font-semibold text-gray-900">Unclaimed Rewards</h3>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-900">{unclaimedWins.length}</p>
            <p className="text-sm text-gray-600 mt-1">
              ${unclaimedWins.reduce((sum, w) => sum + w.reward_amount, 0).toFixed(2)} to claim
            </p>
          </div>
          {unclaimedWins.length > 0 && (
            <button
              onClick={() => document.getElementById('giveaways')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-4 w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium"
            >
              Claim Now
            </button>
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {transactions.length > 0 ? (
            transactions.slice(0, 10).map((transaction) => (
              <div key={transaction.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
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
                    ${transaction.amount.toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No transactions yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Giveaways & Rewards */}
      <div id="giveaways" className="space-y-6">
        {/* Unclaimed Wins */}
        {unclaimedWins.length > 0 && (
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg shadow border-2 border-yellow-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-yellow-600" />
              <h2 className="text-xl font-bold text-gray-900">Congratulations! You Won!</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unclaimedWins.map((win) => (
                <div key={win.id} className="bg-white rounded-lg p-4 border-2 border-yellow-300">
                  <h3 className="font-semibold text-gray-900 mb-2">{win.giveaway.title}</h3>
                  <p className="text-2xl font-bold text-yellow-600 mb-3">${win.reward_amount.toFixed(2)}</p>
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
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Active Giveaways</h2>
            <p className="text-sm text-gray-600 mt-1">Participate and win rewards</p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {giveaways.length > 0 ? (
              giveaways.map((giveaway) => (
                <div key={giveaway.id} className="border border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Gift className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{giveaway.title}</h3>
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
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No active giveaways at the moment</p>
              </div>
            )}
          </div>
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
