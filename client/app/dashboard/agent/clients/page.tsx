'use client';

import { useEffect, useState } from 'react';
import ApiService from '@/lib/api';
import { Users, Mail, Building, Calendar, CheckCircle, XCircle, MessageCircle, FileText } from 'lucide-react';
import Link from 'next/link';

interface Client {
  id: string;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  company_name: string;
  industry: string;
  subscription_plan: string;
  is_active: boolean;
  created_at: string;
}

export default function AgentClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await ApiService.get('/agents/my-clients/');
      if (
        response &&
        typeof response === 'object' &&
        'data' in response &&
        Array.isArray((response as any).data)
      ) {
        setClients((response.data as Client[]));
      } else {
        setClients([]);
        console.error('Unexpected response structure when fetching clients:', response);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter((client) => {
    if (filter === 'active') return client.is_active;
    if (filter === 'inactive') return !client.is_active;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Clients</h1>
        <p className="text-gray-600 mt-1">Manage your assigned clients</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Clients</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{clients.length}</p>
            </div>
            <Users className="w-12 h-12 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Clients</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {clients.filter((c) => c.is_active).length}
              </p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Inactive Clients</p>
              <p className="text-3xl font-bold text-red-600 mt-1">
                {clients.filter((c) => !c.is_active).length}
              </p>
            </div>
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({clients.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'active'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Active ({clients.filter((c) => c.is_active).length})
          </button>
          <button
            onClick={() => setFilter('inactive')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'inactive'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Inactive ({clients.filter((c) => !c.is_active).length})
          </button>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              {/* Client Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold">
                    {client.user.first_name.charAt(0)}{client.user.last_name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {client.user.first_name} {client.user.last_name}
                    </h3>
                    {client.is_active ? (
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 inline-block mt-1">
                        Active
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800 inline-block mt-1">
                        Inactive
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Client Details */}
              <div className="space-y-2 mb-4">
                {client.company_name && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Building className="w-4 h-4 mr-2" />
                    {client.company_name}
                  </div>
                )}
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {client.user.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Joined {new Date(client.created_at).toLocaleDateString()}
                </div>
              </div>

              {/* Plan Badge */}
              <div className="mb-4">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-purple-100 text-purple-800 capitalize">
                  {client.subscription_plan} Plan
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Link
                  href={`/dashboard/agent/messages?client=${client.id}`}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Message
                </Link>
                <Link
                  href={`/dashboard/agent/tasks?client=${client.id}`}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <FileText className="w-4 h-4" />
                  Tasks
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No clients found with the selected filter.</p>
          </div>
        )}
      </div>

      {filteredClients.length === 0 && clients.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No clients assigned yet</h3>
          <p className="text-gray-600">Your assigned clients will appear here once an admin assigns them to you.</p>
        </div>
      )}
    </div>
  );
}
