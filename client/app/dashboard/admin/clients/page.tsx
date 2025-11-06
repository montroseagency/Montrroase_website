'use client';

import { useEffect, useState } from 'react';
import ApiService from '@/lib/api';
import type { Client } from '@/lib/types';
import Link from 'next/link';
import { Plus, Search, Filter, Eye, Edit, DollarSign, Users, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showModal, setShowModal] = useState(false);

  const loadClients = async () => {
    try {
      setError(null);
      const data = await ApiService.getClients();
      const clientsArray = Array.isArray(data) ? data : [];
      setClients(clientsArray);
    } catch (err: any) {
      setError(err.message || 'Failed to load clients');
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    const loadInitial = async () => {
      try {
        setLoading(true);
        await loadClients();
      } finally {
        setLoading(false);
      }
    };

    loadInitial();
  }, []);

  // Filter clients based on search and status
  useEffect(() => {
    let filtered = clients;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredClients(filtered);
  }, [searchTerm, statusFilter, clients]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadClients();
    setRefreshing(false);
  };

  const handleUpdatePaymentStatus = async (clientId: string, status: string) => {
    try {
      await ApiService.updateClient(clientId, { payment_status: status });
      await loadClients();
      setShowModal(false);
      alert('Payment status updated successfully!');
    } catch (err: any) {
      alert('Error updating payment status: ' + err.message);
    }
  };

  const clientStats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    totalRevenue: clients.reduce((sum, c) => {
      const fee = typeof c.monthly_fee === 'string' ? parseFloat(c.monthly_fee) : (c.monthly_fee || 0);
      return sum + fee;
    }, 0),
    pending: clients.filter(c => c.payment_status === 'pending').length,
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string }> = {
      'active': { bg: 'bg-green-100', text: 'text-green-800' },
      'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      'paused': { bg: 'bg-gray-100', text: 'text-gray-800' },
    };
    const style = styles[status] || styles['pending'];
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPaymentBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string }> = {
      'paid': { bg: 'bg-green-50', text: 'text-green-700' },
      'pending': { bg: 'bg-yellow-50', text: 'text-yellow-700' },
      'overdue': { bg: 'bg-red-50', text: 'text-red-700' },
    };
    const style = styles[status] || styles['pending'];
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${style.bg} ${style.text}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-2">Manage all your clients and their accounts</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <Link
            href="/dashboard/admin/clients/create"
            className="inline-flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Client</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Users className="w-6 h-6 text-blue-600" />}
          title="Total Clients"
          value={clientStats.total.toString()}
          bgColor="bg-blue-50"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-green-600" />}
          title="Active Clients"
          value={clientStats.active.toString()}
          bgColor="bg-green-50"
        />
        <StatCard
          icon={<DollarSign className="w-6 h-6 text-purple-600" />}
          title="Monthly Revenue"
          value={`$${clientStats.totalRevenue.toLocaleString()}`}
          bgColor="bg-purple-50"
        />
        <StatCard
          icon={<AlertCircle className="w-6 h-6 text-yellow-600" />}
          title="Pending Payments"
          value={clientStats.pending.toString()}
          bgColor="bg-yellow-50"
        />
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <AlertCircle className="inline-block w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="paused">Paused</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clients Table */}
      {filteredClients.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monthly Fee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">{client.name}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {client.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {client.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(client.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPaymentBadge(client.payment_status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${(typeof client.monthly_fee === 'string' ? parseFloat(client.monthly_fee) : client.monthly_fee).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedClient(client);
                          setShowModal(true);
                        }}
                        className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <Link
                        href={`/dashboard/admin/clients/${client.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{filteredClients.length}</span> of{' '}
              <span className="font-medium">{clients.length}</span> clients
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredClients.length === 0 && !error && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter !== 'all' ? 'No clients match your filters.' : 'No clients yet.'}
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <Link
              href="/dashboard/admin/clients/create"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Create your first client
            </Link>
          )}
        </div>
      )}

      {/* Client Detail Modal */}
      {showModal && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedClient.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{selectedClient.company}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-600 uppercase">Email</p>
                    <p className="text-sm text-gray-900 mt-1">{selectedClient.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600 uppercase">Status</p>
                    <p className="text-sm text-gray-900 mt-1 capitalize">{selectedClient.status}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-600 uppercase">Monthly Fee</p>
                    <p className="text-sm text-gray-900 mt-1">${(typeof selectedClient.monthly_fee === 'string' ? parseFloat(selectedClient.monthly_fee) : selectedClient.monthly_fee).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600 uppercase">Payment Status</p>
                    <p className="text-sm text-gray-900 mt-1 capitalize">{selectedClient.payment_status}</p>
                  </div>
                </div>

                {selectedClient.package && (
                  <div>
                    <p className="text-xs font-medium text-gray-600 uppercase">Package</p>
                    <p className="text-sm text-gray-900 mt-1 capitalize">{selectedClient.package}</p>
                  </div>
                )}

                {selectedClient.total_spent !== undefined && (
                  <div>
                    <p className="text-xs font-medium text-gray-600 uppercase">Total Spent</p>
                    <p className="text-sm text-gray-900 mt-1">${(typeof selectedClient.total_spent === 'string' ? parseFloat(selectedClient.total_spent) : selectedClient.total_spent).toFixed(2)}</p>
                  </div>
                )}
              </div>

              {/* Payment Status Update */}
              <div className="border-t pt-4 space-y-3">
                <p className="text-sm font-medium text-gray-900">Update Payment Status</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdatePaymentStatus(selectedClient.id, 'paid')}
                    className="flex-1 px-3 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                  >
                    Mark Paid
                  </button>
                  <button
                    onClick={() => handleUpdatePaymentStatus(selectedClient.id, 'pending')}
                    className="flex-1 px-3 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors text-sm font-medium"
                  >
                    Mark Pending
                  </button>
                  <button
                    onClick={() => handleUpdatePaymentStatus(selectedClient.id, 'overdue')}
                    className="flex-1 px-3 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                  >
                    Mark Overdue
                  </button>
                </div>
              </div>

              <div className="border-t pt-4 flex gap-2 justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <Link
                  href={`/dashboard/admin/clients/${selectedClient.id}`}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Edit Full Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Components
function StatCard({
  icon,
  title,
  value,
  bgColor,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  bgColor: string;
}) {
  return (
    <div className={`${bgColor} rounded-lg p-6`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="flex-shrink-0">{icon}</div>
      </div>
    </div>
  );
}
