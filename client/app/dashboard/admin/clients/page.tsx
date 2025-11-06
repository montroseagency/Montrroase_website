'use client';

import { useEffect, useState } from 'react';
import ApiService from '@/lib/api';
import type { Client } from '@/lib/types';
import Link from 'next/link';
import { Plus, Search, Filter } from 'lucide-react';

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const loadClients = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getClients();
        const clientsArray = Array.isArray(data) ? data : [];
        setClients(clientsArray);
        setFilteredClients(clientsArray);
      } catch (err: any) {
        setError(err.message || 'Failed to load clients');
      } finally {
        setLoading(false);
      }
    };

    loadClients();
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-2">Manage all your clients and their accounts</p>
        </div>
        <Link
          href="/dashboard/admin/clients/create"
          className="inline-flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Client</span>
        </Link>
      </div>

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

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-6">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      )}

      {/* Clients Table */}
      {!loading && filteredClients.length > 0 && (
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
                      ${client.monthly_fee.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        href={`/dashboard/admin/clients/${client.id}`}
                        className="text-purple-600 hover:text-purple-700 font-medium"
                      >
                        View
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
      {!loading && filteredClients.length === 0 && !error && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter !== 'all' ? 'No clients match your filters.' : 'No clients yet.'}
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <Link
              href="/dashboard/admin/clients/create"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Create your first client ’
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
