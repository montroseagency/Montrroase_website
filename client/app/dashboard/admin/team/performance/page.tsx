'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import { TrendingUp, Users, CheckSquare, Star, Award, Target, RefreshCw } from 'lucide-react';

interface AgentPerformance {
  id: string;
  name: string;
  email: string;
  department: string;
  specialization: string;
  is_active: boolean;
  total_clients: number;
  active_clients: number;
  max_clients: number;
  workload_percentage: number;
  completed_tasks: number;
  pending_tasks: number;
  total_tasks: number;
  task_completion_rate: number;
  avg_task_completion_time: number;
  client_satisfaction: number;
  total_projects?: number;
  completed_projects?: number;
  total_campaigns?: number;
  active_campaigns?: number;
}

export default function EmployeePerformancePage() {
  const { user } = useAuth();
  const [agents, setAgents] = useState<AgentPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [filterDepartment, setFilterDepartment] = useState<string>('all');

  const loadPerformanceData = async () => {
    try {
      setError(null);

      // Fetch agents, clients, and tasks data
      const [agentsResponse, clientsData, tasksData, projectsData, campaignsData] = await Promise.all([
        ApiService.get('/agents/'),
        ApiService.getClients(),
        ApiService.getTasks(),
        ApiService.get('/website-projects/').catch(() => ({ data: [] })),
        ApiService.get('/campaigns/').catch(() => ({ data: [] })),
      ]);

      const agentsData = Array.isArray((agentsResponse as any)?.results)
        ? (agentsResponse as any).results
        : Array.isArray(agentsResponse)
        ? agentsResponse
        : [];

      const clients = Array.isArray(clientsData) ? clientsData : [];
      const tasks = Array.isArray(tasksData) ? tasksData : [];
      const projects = Array.isArray((projectsData as any)?.data) ? (projectsData as any).data : (Array.isArray(projectsData) ? projectsData : []);
      const campaigns = Array.isArray((campaignsData as any)?.data) ? (campaignsData as any).data : (Array.isArray(campaignsData) ? campaignsData : []);

      // Calculate performance metrics for each agent
      const performanceData: AgentPerformance[] = agentsData.map((agent: any) => {
        // Count clients assigned to this agent
        const agentClients = clients.filter((c: any) => c.assigned_agent?.id === agent.id);
        const activeClients = agentClients.filter((c: any) => c.is_active).length;

        // Count tasks
        const agentTasks = tasks.filter((t: any) =>
          agentClients.some((c: any) => c.id === t.client || c.user?.id === t.client)
        );
        const completedTasks = agentTasks.filter((t: any) => t.status === 'completed').length;
        const pendingTasks = agentTasks.filter((t: any) => t.status === 'pending').length;
        const totalTasks = agentTasks.length;
        const taskCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        // Department-specific metrics
        let departmentMetrics = {};
        if (agent.department === 'website') {
          const agentProjects = projects.filter((p: any) =>
            agentClients.some((c: any) => c.id === p.client || c.user?.id === p.client)
          );
          departmentMetrics = {
            total_projects: agentProjects.length,
            completed_projects: agentProjects.filter((p: any) => p.status === 'completed').length,
          };
        } else if (agent.department === 'marketing') {
          const agentCampaigns = campaigns.filter((c: any) =>
            agentClients.some((client: any) => client.id === c.client || client.user?.id === c.client)
          );
          departmentMetrics = {
            total_campaigns: agentCampaigns.length,
            active_campaigns: agentCampaigns.filter((c: any) => c.status === 'active').length,
          };
        }

        // Calculate workload percentage
        const workloadPercentage = agent.max_clients > 0
          ? (agent.current_client_count / agent.max_clients) * 100
          : 0;

        // Mock client satisfaction (in real app, would come from surveys/ratings)
        const clientSatisfaction = 4.2 + Math.random() * 0.8;

        // Mock avg task completion time in days (in real app, would calculate from task data)
        const avgTaskCompletionTime = 2 + Math.random() * 3;

        return {
          id: agent.id,
          name: `${agent.user.first_name} ${agent.user.last_name}`,
          email: agent.user.email,
          department: agent.department,
          specialization: agent.specialization || 'General',
          is_active: agent.is_active,
          total_clients: agent.current_client_count || 0,
          active_clients: activeClients,
          max_clients: agent.max_clients || 10,
          workload_percentage: Math.min(workloadPercentage, 100),
          completed_tasks: completedTasks,
          pending_tasks: pendingTasks,
          total_tasks: totalTasks,
          task_completion_rate: Math.min(taskCompletionRate, 100),
          avg_task_completion_time: avgTaskCompletionTime,
          client_satisfaction: Math.min(clientSatisfaction, 5.0),
          ...departmentMetrics,
        };
      });

      setAgents(performanceData);
    } catch (err: any) {
      setError(err.message || 'Failed to load performance data');
      console.error('Error loading performance data:', err);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        await loadPerformanceData();
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadPerformanceData();
    setRefreshing(false);
  };

  const filteredAgents = filterDepartment === 'all'
    ? agents
    : agents.filter(a => a.department === filterDepartment);

  // Calculate team averages
  const avgWorkload = agents.length > 0
    ? agents.reduce((sum, a) => sum + a.workload_percentage, 0) / agents.length
    : 0;
  const avgTaskCompletion = agents.length > 0
    ? agents.reduce((sum, a) => sum + a.task_completion_rate, 0) / agents.length
    : 0;
  const avgSatisfaction = agents.length > 0
    ? agents.reduce((sum, a) => sum + a.client_satisfaction, 0) / agents.length
    : 0;

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
          <h1 className="text-3xl font-bold text-gray-900">Employee Performance</h1>
          <p className="text-gray-600 mt-1">Track agent productivity and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Departments</option>
            <option value="marketing">Marketing</option>
            <option value="website">Website Development</option>
          </select>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Team Averages */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
          <Users className="w-8 h-8 text-blue-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{agents.length}</p>
          <p className="text-sm text-gray-600">Total Agents</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
          <Target className="w-8 h-8 text-purple-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{avgWorkload.toFixed(1)}%</p>
          <p className="text-sm text-gray-600">Avg Workload</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
          <CheckSquare className="w-8 h-8 text-green-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{avgTaskCompletion.toFixed(1)}%</p>
          <p className="text-sm text-gray-600">Avg Task Completion</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
          <Star className="w-8 h-8 text-orange-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{avgSatisfaction.toFixed(1)}</p>
          <p className="text-sm text-gray-600">Avg Satisfaction</p>
        </div>
      </div>

      {/* Agents Performance Cards */}
      <div className="space-y-4">
        {filteredAgents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
                  {!agent.is_active && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                      Inactive
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{agent.email}</p>
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
              <div className="flex items-center gap-2 text-orange-500">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-lg font-bold">{agent.client_satisfaction.toFixed(1)}</span>
              </div>
            </div>

            {/* Performance Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Active Clients</p>
                <p className="text-lg font-bold text-gray-900">
                  {agent.active_clients} / {agent.max_clients}
                </p>
                <div className="mt-2 bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-purple-600 rounded-full h-1.5"
                    style={{ width: `${agent.workload_percentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{agent.workload_percentage.toFixed(0)}% capacity</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Tasks</p>
                <p className="text-lg font-bold text-gray-900">
                  {agent.completed_tasks} / {agent.total_tasks}
                </p>
                <div className="mt-2 bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-green-600 rounded-full h-1.5"
                    style={{ width: `${agent.task_completion_rate}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{agent.task_completion_rate.toFixed(0)}% completed</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Pending Tasks</p>
                <p className="text-lg font-bold text-orange-600">{agent.pending_tasks}</p>
                <p className="text-xs text-gray-500 mt-1">needs attention</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Avg Completion Time</p>
                <p className="text-lg font-bold text-blue-600">{agent.avg_task_completion_time.toFixed(1)}</p>
                <p className="text-xs text-gray-500 mt-1">days per task</p>
              </div>
            </div>

            {/* Department-Specific Metrics */}
            {agent.department === 'marketing' && agent.total_campaigns !== undefined && (
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Marketing Metrics</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Total Campaigns</p>
                    <p className="text-lg font-bold text-gray-900">{agent.total_campaigns}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Active Campaigns</p>
                    <p className="text-lg font-bold text-purple-600">{agent.active_campaigns}</p>
                  </div>
                </div>
              </div>
            )}

            {agent.department === 'website' && agent.total_projects !== undefined && (
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Website Development Metrics</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Total Projects</p>
                    <p className="text-lg font-bold text-gray-900">{agent.total_projects}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Completed Projects</p>
                    <p className="text-lg font-bold text-blue-600">{agent.completed_projects}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredAgents.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No agents found for the selected filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
