'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import { Agent, Client, ClientAccessRequest } from '@/lib/types';
import {
  Users,
  UserPlus,
  UserMinus,
  ArrowRightLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  RefreshCw
} from 'lucide-react';

export default function TeamManagementPage() {
  const { user } = useAuth();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedAgents, setExpandedAgents] = useState<Set<string>>(new Set());
  const [processingAction, setProcessingAction] = useState<string | null>(null);
  const [serviceTab, setServiceTab] = useState<'all' | 'marketing' | 'website'>('all');

  // State for modals
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const loadData = async () => {
    try {
      setError(null);
      const [agentsData, clientsData] = await Promise.all([
        ApiService.getAgentsWithRequests(),
        ApiService.getClients(),
      ]);

      setAgents(Array.isArray(agentsData) ? agentsData : []);
      setAllClients(Array.isArray(clientsData) ? clientsData : []);
    } catch (err: any) {
      setError(err.message || 'Failed to load team data');
      console.error('Error loading team data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleAgentExpanded = (agentId: string) => {
    const newExpanded = new Set(expandedAgents);
    if (newExpanded.has(agentId)) {
      newExpanded.delete(agentId);
    } else {
      newExpanded.add(agentId);
    }
    setExpandedAgents(newExpanded);
  };

  const handleApproveRequest = async (request: ClientAccessRequest) => {
    setProcessingAction(request.id);
    try {
      await ApiService.approveClientRequest(request.id);
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to approve request');
    } finally {
      setProcessingAction(null);
    }
  };

  const handleDenyRequest = async (request: ClientAccessRequest) => {
    const reason = prompt('Reason for denial (optional):');
    if (reason === null) return; // User cancelled

    setProcessingAction(request.id);
    try {
      await ApiService.denyClientRequest(request.id, reason || 'Request denied by admin');
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to deny request');
    } finally {
      setProcessingAction(null);
    }
  };

  const handleAssignClient = async (agentId: string, clientId: string) => {
    setProcessingAction(`assign-${clientId}`);
    try {
      await ApiService.assignClientToAgent(agentId, clientId);
      await loadData();
      setShowAssignModal(false);
      setSelectedAgent(null);
    } catch (err: any) {
      alert(err.message || 'Failed to assign client');
    } finally {
      setProcessingAction(null);
    }
  };

  const handleTransferClient = async (clientId: string, newAgentId: string) => {
    setProcessingAction(`transfer-${clientId}`);
    try {
      await ApiService.transferClient(clientId, newAgentId);
      await loadData();
      setShowTransferModal(false);
      setSelectedClient(null);
    } catch (err: any) {
      alert(err.message || 'Failed to transfer client');
    } finally {
      setProcessingAction(null);
    }
  };

  const handleUnassignClient = async (clientId: string) => {
    if (!confirm('Are you sure you want to unassign this client?')) return;

    setProcessingAction(`unassign-${clientId}`);
    try {
      await ApiService.unassignClient(clientId);
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to unassign client');
    } finally {
      setProcessingAction(null);
    }
  };

  const getUnassignedClients = () => {
    return allClients.filter(client => !client.assigned_agent);
  };

  const getAgentClients = (agentId: string) => {
    return allClients.filter(client => client.assigned_agent?.id === agentId);
  };

  const getAvailableAgentsForTransfer = (currentAgentId: string) => {
    const currentAgent = agents.find(a => a.id === currentAgentId);
    if (!currentAgent) return [];

    return agents.filter(
      agent =>
        agent.id !== currentAgentId &&
        agent.department === currentAgent.department &&
        agent.is_active &&
        agent.can_accept_clients
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
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-600 mt-1">Manage agent assignments and client requests</p>
        </div>
        <div className="flex gap-3">
          <a
            href="/dashboard/admin/client-requests"
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            View All Client Requests
          </a>
          <button
            onClick={loadData}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
          <Users className="w-8 h-8 text-blue-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{agents.length}</p>
          <p className="text-sm text-gray-600">Total Agents</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
          <UserPlus className="w-8 h-8 text-green-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {agents.reduce((sum, agent) => sum + (agent.pending_requests_count || 0), 0)}
          </p>
          <p className="text-sm text-gray-600">Pending Requests</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
          <CheckCircle className="w-8 h-8 text-purple-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {agents.reduce((sum, agent) => sum + (agent.assigned_clients_count || 0), 0)}
          </p>
          <p className="text-sm text-gray-600">Assigned Clients</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
          <AlertCircle className="w-8 h-8 text-orange-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{getUnassignedClients().length}</p>
          <p className="text-sm text-gray-600">Unassigned Clients</p>
        </div>
      </div>

      {/* Service Tabs */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setServiceTab('all')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              serviceTab === 'all'
                ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            All Requests
            <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-xs">
              {agents.reduce((sum, agent) => sum + (agent.pending_requests_count || 0), 0)}
            </span>
          </button>
          <button
            onClick={() => setServiceTab('marketing')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              serviceTab === 'marketing'
                ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            📱 Marketing Requests
            <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-xs">
              {agents
                .filter(a => a.department === 'marketing')
                .reduce((sum, agent) => sum + (agent.pending_requests?.filter(r => r.service_type === 'marketing').length || 0), 0)}
            </span>
          </button>
          <button
            onClick={() => setServiceTab('website')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              serviceTab === 'website'
                ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            💻 Website Requests
            <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-xs">
              {agents
                .filter(a => a.department === 'website')
                .reduce((sum, agent) => sum + (agent.pending_requests?.filter(r => r.service_type === 'website').length || 0), 0)}
            </span>
          </button>
        </div>
      </div>

      {/* Agents List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          {serviceTab === 'all' ? 'All Agents' : `${serviceTab.charAt(0).toUpperCase() + serviceTab.slice(1)} Agents`}
        </h2>

        {agents
          .filter(agent => serviceTab === 'all' || agent.department === serviceTab)
          .map((agent) => (
          <div
            key={agent.id}
            className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
          >
            {/* Agent Header */}
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {agent.user.first_name} {agent.user.last_name}
                    </h3>
                    {!agent.is_active && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                        Inactive
                      </span>
                    )}
                    {(agent.pending_requests_count || 0) > 0 && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                        {agent.pending_requests_count} pending request{agent.pending_requests_count !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{agent.user.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full capitalize">
                      {agent.department}
                    </span>
                    {agent.specialization && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {agent.specialization}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-600">Clients</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {agent.assigned_clients_count || 0} / {agent.max_clients}
                  </p>
                  <div className="mt-2 w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 rounded-full h-2"
                      style={{
                        width: `${Math.min(((agent.assigned_clients_count || 0) / agent.max_clients) * 100, 100)}%`
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => {
                    setSelectedAgent(agent);
                    setShowAssignModal(true);
                  }}
                  disabled={!agent.can_accept_clients}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <UserPlus className="w-4 h-4" />
                  Assign Client
                </button>

                {(agent.pending_requests_count || 0) > 0 && (
                  <button
                    onClick={() => toggleAgentExpanded(agent.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
                  >
                    <AlertCircle className="w-4 h-4" />
                    View Requests ({agent.pending_requests_count})
                    {expandedAgents.has(agent.id) ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Pending Requests */}
            {expandedAgents.has(agent.id) && agent.pending_requests && agent.pending_requests.length > 0 && (
              <div className="border-t border-gray-200 bg-gray-50 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Pending Client Requests</h4>
                <div className="space-y-3">
                  {agent.pending_requests
                    .filter(request => serviceTab === 'all' || request.service_type === serviceTab)
                    .map((request) => (
                    <div
                      key={request.id}
                      className="bg-white rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-semibold text-gray-900">{request.client.name}</h5>
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                              request.service_type === 'marketing'
                                ? 'bg-pink-100 text-pink-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {request.service_type === 'marketing' ? '📱 Marketing' : '💻 Website'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{request.client.company}</p>
                          {request.reason && (
                            <p className="text-sm text-gray-500 mt-2 italic">&quot;{request.reason}&quot;</p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">
                            Requested {new Date(request.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApproveRequest(request)}
                            disabled={processingAction === request.id}
                            className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleDenyRequest(request)}
                            disabled={processingAction === request.id}
                            className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                          >
                            <XCircle className="w-4 h-4" />
                            Deny
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Assigned Clients */}
            {getAgentClients(agent.id).length > 0 && (
              <div className="border-t border-gray-200 bg-gray-50 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Assigned Clients ({getAgentClients(agent.id).length})</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getAgentClients(agent.id).map((client) => (
                    <div
                      key={client.id}
                      className="bg-white rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900">{client.name}</h5>
                          <p className="text-sm text-gray-600">{client.company}</p>
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded mt-2 ${
                            client.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {client.status}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => {
                              setSelectedClient(client);
                              setShowTransferModal(true);
                            }}
                            disabled={getAvailableAgentsForTransfer(agent.id).length === 0}
                            className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title={getAvailableAgentsForTransfer(agent.id).length === 0 ? 'No available agents for transfer' : 'Transfer to another agent'}
                          >
                            <ArrowRightLeft className="w-3 h-3" />
                            Transfer
                          </button>
                          <button
                            onClick={() => handleUnassignClient(client.id)}
                            disabled={processingAction === `unassign-${client.id}`}
                            className="flex items-center gap-1 px-2 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors disabled:opacity-50"
                          >
                            <UserMinus className="w-3 h-3" />
                            Unassign
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {agents.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No agents found</p>
          </div>
        )}
      </div>

      {/* Assign Client Modal */}
      {showAssignModal && selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Assign Client to {selectedAgent.user.first_name} {selectedAgent.user.last_name}
            </h3>

            <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
              {getUnassignedClients().filter(c => c.status === 'active').map((client) => (
                <div
                  key={client.id}
                  className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleAssignClient(selectedAgent.id, client.id)}
                >
                  <h4 className="font-semibold text-gray-900">{client.name}</h4>
                  <p className="text-sm text-gray-600">{client.company}</p>
                  <p className="text-xs text-gray-500 mt-1">{client.email}</p>
                </div>
              ))}
              {getUnassignedClients().length === 0 && (
                <p className="text-center text-gray-500 py-4">No unassigned clients available</p>
              )}
            </div>

            <button
              onClick={() => {
                setShowAssignModal(false);
                setSelectedAgent(null);
              }}
              className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Transfer Client Modal */}
      {showTransferModal && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Transfer {selectedClient.name}
            </h3>

            <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
              {getAvailableAgentsForTransfer(selectedClient.assigned_agent!.id).map((agent) => (
                <div
                  key={agent.id}
                  className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleTransferClient(selectedClient.id, agent.id)}
                >
                  <h4 className="font-semibold text-gray-900">
                    {agent.user.first_name} {agent.user.last_name}
                  </h4>
                  <p className="text-sm text-gray-600">{agent.user.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded capitalize">
                      {agent.department}
                    </span>
                    <span className="text-xs text-gray-500">
                      {agent.assigned_clients_count || 0}/{agent.max_clients} clients
                    </span>
                  </div>
                </div>
              ))}
              {getAvailableAgentsForTransfer(selectedClient.assigned_agent!.id).length === 0 && (
                <p className="text-center text-gray-500 py-4">No available agents for transfer</p>
              )}
            </div>

            <button
              onClick={() => {
                setShowTransferModal(false);
                setSelectedClient(null);
              }}
              className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
