'use client';

import { useEffect, useState } from 'react';
import ApiService from '@/lib/api';
import { Users, Mail, Building, Calendar, CheckCircle, XCircle, MessageCircle, FileText } from 'lucide-react';
import Link from 'next/link';

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  package: string;
  status: string;
  user_first_name: string;
  user_last_name: string;
  user_email: string;
  created_at: string;
  is_assigned_to_me: boolean;
  is_available: boolean;
  assigned_agent_name: string | null;
  has_marketing_agent?: boolean;
  has_website_agent?: boolean;
  marketing_agent_name?: string | null;
  website_agent_name?: string | null;
  active_services?: string[];
  // Client classification
  client_type?: 'marketing' | 'website' | 'full' | 'none';
  has_social_accounts?: boolean;
  has_website_projects?: boolean;
  needs_marketing_agent?: boolean;
  needs_website_agent?: boolean;
}

export default function AgentClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'my' | 'available' | 'assigned'>('all');
  const [requestingAccess, setRequestingAccess] = useState<string | null>(null);
  const [agentDepartment, setAgentDepartment] = useState<'marketing' | 'website' | null>(null);

  // Helper function to get client type badge
  const getClientTypeBadge = (clientType?: string) => {
    switch (clientType) {
      case 'marketing':
        return (
          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 inline-flex items-center gap-1">
            📱 Marketing Client
          </span>
        );
      case 'website':
        return (
          <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800 inline-flex items-center gap-1">
            💻 Website Client
          </span>
        );
      case 'full':
        return (
          <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800 inline-flex items-center gap-1">
            🌟 Full Service
          </span>
        );
      case 'none':
      default:
        return (
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 inline-flex items-center gap-1">
            ⚪ New Client
          </span>
        );
    }
  };

  useEffect(() => {
    fetchAgentProfile();
    fetchClients();
  }, []);

  const fetchAgentProfile = async () => {
    try {
      const user = await ApiService.getMe();
      if (user.agent_profile) {
        setAgentDepartment(user.agent_profile.department);
      }
    } catch (error) {
      console.error('Error fetching agent profile:', error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await ApiService.get('/agents/my-clients/');
      // ApiService.get returns data directly (after handling pagination)
      const clientsData = Array.isArray(response) ? response : [];
      setClients(clientsData);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  const requestAccess = async (clientId: string) => {
    if (!agentDepartment) {
      alert('Unable to determine your department. Please try again.');
      return;
    }

    try {
      setRequestingAccess(clientId);
      await ApiService.post('/client-access-requests/', {
        client: clientId,
        service_type: agentDepartment,
        reason: `Requesting access to manage this client for ${agentDepartment} services`
      });
      alert(`Access request sent for ${agentDepartment} services! Admin will review your request.`);
      await fetchClients();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to request access');
    } finally {
      setRequestingAccess(null);
    }
  };

  const filteredClients = clients.filter((client) => {
    if (filter === 'my') return client.is_assigned_to_me;
    if (filter === 'available') return client.is_available;
    if (filter === 'assigned') return !client.is_available && !client.is_assigned_to_me;
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
        <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
        <p className="text-gray-600 mt-1">View all clients and request access to manage them</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
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
              <p className="text-gray-600 text-sm">My Clients</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {clients.filter((c) => c.is_assigned_to_me).length}
              </p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Available</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {clients.filter((c) => c.is_available).length}
              </p>
            </div>
            <Users className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Assigned to Others</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">
                {clients.filter((c) => !c.is_available && !c.is_assigned_to_me).length}
              </p>
            </div>
            <XCircle className="w-12 h-12 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex gap-2 flex-wrap">
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
            onClick={() => setFilter('my')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'my'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            My Clients ({clients.filter((c) => c.is_assigned_to_me).length})
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'available'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Available ({clients.filter((c) => c.is_available).length})
          </button>
          <button
            onClick={() => setFilter('assigned')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'assigned'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Assigned to Others ({clients.filter((c) => !c.is_available && !c.is_assigned_to_me).length})
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
                    {client.user_first_name?.charAt(0) || 'U'}{client.user_last_name?.charAt(0) || 'N'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {client.user_first_name} {client.user_last_name}
                    </h3>
                    {client.status === 'active' ? (
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
                {client.company && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Building className="w-4 h-4 mr-2" />
                    {client.company}
                  </div>
                )}
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {client.user_email || client.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Joined {new Date(client.created_at).toLocaleDateString()}
                </div>
              </div>

              {/* Plan Badge and Client Type */}
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-purple-100 text-purple-800 capitalize">
                  {client.package} Plan
                </span>
                {getClientTypeBadge(client.client_type)}
              </div>

              {/* Service-Specific Assignment Status */}
              <div className="mb-3 space-y-2">
                {/* My Assignment Status */}
                {client.is_assigned_to_me && (
                  <div>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 inline-flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      My Client ({agentDepartment})
                    </span>
                  </div>
                )}

                {/* Marketing Agent Info */}
                {client.has_marketing_agent && (
                  <div className="text-xs text-gray-600">
                    📱 Marketing: {client.is_assigned_to_me && agentDepartment === 'marketing' ? 'You' : client.marketing_agent_name}
                  </div>
                )}

                {/* Website Agent Info */}
                {client.has_website_agent && (
                  <div className="text-xs text-gray-600">
                    💻 Website: {client.is_assigned_to_me && agentDepartment === 'website' ? 'You' : client.website_agent_name}
                  </div>
                )}

                {/* Availability for My Service */}
                {client.is_available && (
                  <div>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 inline-flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Available for {agentDepartment}
                    </span>
                  </div>
                )}

                {!client.is_available && !client.is_assigned_to_me && (
                  <div>
                    <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-800 inline-flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {agentDepartment === 'marketing' ? client.marketing_agent_name : client.website_agent_name} has {agentDepartment}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {client.is_assigned_to_me ? (
                  <>
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
                  </>
                ) : client.is_available ? (
                  <button
                    onClick={() => requestAccess(client.id)}
                    disabled={requestingAccess === client.id}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Users className="w-4 h-4" />
                    {requestingAccess === client.id ? 'Requesting...' : 'Request Access'}
                  </button>
                ) : (
                  <div className="w-full px-3 py-2 bg-gray-100 text-gray-500 rounded-lg text-sm text-center">
                    Assigned to another agent
                  </div>
                )}
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

      {clients.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No clients in the system</h3>
          <p className="text-gray-600">Clients will appear here once they are added to the system.</p>
        </div>
      )}

      {clients.length > 0 && filteredClients.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No clients match this filter</h3>
          <p className="text-gray-600">Try selecting a different filter to view clients.</p>
        </div>
      )}
    </div>
  );
}
