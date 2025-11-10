'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ApiService from '@/lib/api';
import Link from 'next/link';
import {
  ArrowLeft, Sparkles, Eye, DollarSign, Clock, CheckCircle,
  XCircle, AlertCircle, ExternalLink, Download, CreditCard
} from 'lucide-react';

interface WebsitePhase {
  id: string;
  phase_number: number;
  title: string;
  description: string;
  amount: number;
  status: string;
  paid_at?: string;
}

interface WebsiteProject {
  id: string;
  project_name: string;
  industry: string;
  business_goals: string;
  target_audience: string;
  desired_features: string[];
  content_requirements: string;
  design_preferences: string;
  timeline_expectations: string;
  budget_range: string;
  status: string;
  estimated_cost_min?: number;
  estimated_cost_max?: number;
  estimated_hours?: number;
  complexity_score?: number;
  demo_url?: string;
  total_amount?: number;
  completed_phases: number;
  total_phases: number;
  created_at: string;
  updated_at: string;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<WebsiteProject | null>(null);
  const [phases, setPhases] = useState<WebsitePhase[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProject();
  }, [params.id]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const [projectData, phasesData] = await Promise.all([
        ApiService.get(`/website-projects/${params.id}/`),
        ApiService.get(`/website-phases/?project=${params.id}`)
      ]);
      setProject(projectData);
      setPhases(Array.isArray(phasesData) ? phasesData : []);
    } catch (err: any) {
      setError(err.message || 'Failed to load project');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateValuation = async () => {
    try {
      setActionLoading(true);
      const response = await ApiService.post(`/website-projects/${params.id}/generate_valuation/`, {});
      setProject(response);
    } catch (err: any) {
      setError(err.message || 'Failed to generate valuation');
    } finally {
      setActionLoading(false);
    }
  };

  const handleGenerateDemo = async () => {
    try {
      setActionLoading(true);
      const response = await ApiService.post(`/website-projects/${params.id}/generate_demo/`, {});
      setProject(response);
    } catch (err: any) {
      setError(err.message || 'Failed to generate demo');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreatePhases = async () => {
    if (!project?.estimated_cost_max) return;

    try {
      setActionLoading(true);
      const response = await ApiService.post(`/website-projects/${params.id}/create_phases/`, {
        total_amount: project.estimated_cost_max
      });
      setProject(response);
      await loadProject(); // Reload to get phases
    } catch (err: any) {
      setError(err.message || 'Failed to create payment phases');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center py-16">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
          <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or has been deleted.</p>
          <Link
            href="/dashboard/client/website-builder"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_development':
        return 'bg-blue-100 text-blue-800';
      case 'demo':
      case 'valuation':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'payment_pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/client/website-builder"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project.project_name}</h1>
            <p className="text-gray-600 mt-1 capitalize">{project.industry}</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
            {formatStatus(project.status)}
          </span>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Project Progress Timeline */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Project Timeline</h2>

        <div className="space-y-4">
          {/* Questionnaire */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Questionnaire Completed</h3>
              <p className="text-sm text-gray-600">Project details submitted successfully</p>
            </div>
          </div>

          {/* Valuation */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {project.estimated_cost_min ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : project.status === 'questionnaire' ? (
                <Clock className="w-6 h-6 text-gray-400" />
              ) : (
                <Clock className="w-6 h-6 text-purple-600 animate-pulse" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">AI Valuation</h3>
              {project.estimated_cost_min ? (
                <p className="text-sm text-gray-600">
                  Estimated: ${project.estimated_cost_min.toLocaleString()} - ${project.estimated_cost_max?.toLocaleString()} ({project.estimated_hours} hours)
                </p>
              ) : (
                <p className="text-sm text-gray-600">Pending valuation</p>
              )}
            </div>
            {project.status === 'questionnaire' && (
              <button
                onClick={handleGenerateValuation}
                disabled={actionLoading}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 text-sm font-medium transition-colors"
              >
                {actionLoading ? 'Generating...' : 'Generate Valuation'}
              </button>
            )}
          </div>

          {/* Demo */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {project.demo_url ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : project.status === 'valuation' ? (
                <Clock className="w-6 h-6 text-purple-600 animate-pulse" />
              ) : (
                <Clock className="w-6 h-6 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Demo Website</h3>
              {project.demo_url ? (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  View Demo <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <p className="text-sm text-gray-600">Demo not yet generated</p>
              )}
            </div>
            {project.status === 'valuation' && !project.demo_url && (
              <button
                onClick={handleGenerateDemo}
                disabled={actionLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium transition-colors"
              >
                {actionLoading ? 'Generating...' : 'Generate Demo'}
              </button>
            )}
          </div>

          {/* Payment */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {project.total_phases > 0 ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : project.status === 'demo' ? (
                <Clock className="w-6 h-6 text-purple-600 animate-pulse" />
              ) : (
                <Clock className="w-6 h-6 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Payment Setup</h3>
              {project.total_phases > 0 ? (
                <p className="text-sm text-gray-600">{project.total_phases} payment phases created</p>
              ) : (
                <p className="text-sm text-gray-600">Payment phases not yet created</p>
              )}
            </div>
            {project.status === 'demo' && project.total_phases === 0 && (
              <button
                onClick={handleCreatePhases}
                disabled={actionLoading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm font-medium transition-colors"
              >
                {actionLoading ? 'Creating...' : 'Set Up Payments'}
              </button>
            )}
          </div>

          {/* Development */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {project.status === 'completed' ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : project.status === 'in_development' ? (
                <Clock className="w-6 h-6 text-blue-600 animate-pulse" />
              ) : (
                <Clock className="w-6 h-6 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Development</h3>
              <p className="text-sm text-gray-600">
                {project.status === 'completed' ? 'Project completed' :
                 project.status === 'in_development' ? 'In progress' :
                 'Not started'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Goals */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Business Goals</h3>
          <p className="text-gray-700">{project.business_goals}</p>
        </div>

        {/* Target Audience */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Target Audience</h3>
          <p className="text-gray-700">{project.target_audience}</p>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Desired Features</h3>
          <div className="flex flex-wrap gap-2">
            {project.desired_features.map((feature, index) => (
              <span key={index} className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Design Preferences */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Design Preferences</h3>
          <p className="text-gray-700">{project.design_preferences}</p>
        </div>

        {/* Timeline & Budget */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Timeline & Budget</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">{project.timeline_expectations}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">{project.budget_range}</span>
            </div>
          </div>
        </div>

        {/* Valuation Details */}
        {project.estimated_cost_min && (
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow p-6 border border-purple-200">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              AI Valuation
            </h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-600">Estimated Cost</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${project.estimated_cost_min.toLocaleString()} - ${project.estimated_cost_max?.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estimated Hours</p>
                <p className="text-lg font-semibold text-gray-900">{project.estimated_hours} hours</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Complexity Score</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${(project.complexity_score || 0) * 10}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{project.complexity_score}/10</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Phases */}
      {phases.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Phases</h2>

          <div className="space-y-4">
            {phases.map((phase) => (
              <div
                key={phase.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    phase.status === 'paid' ? 'bg-green-100 text-green-700' :
                    phase.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {phase.phase_number}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{phase.title}</h4>
                    <p className="text-sm text-gray-600">{phase.description}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-gray-900">${phase.amount.toFixed(2)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    phase.status === 'paid' ? 'bg-green-100 text-green-700' :
                    phase.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {phase.status.toUpperCase()}
                  </span>
                </div>

                {phase.status === 'pending' && (
                  <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Pay Now
                  </button>
                )}
              </div>
            ))}
          </div>

          {project.total_phases > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Overall Progress</span>
                <span className="text-gray-900 font-bold">
                  {project.completed_phases} / {project.total_phases} phases completed
                </span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full transition-all"
                  style={{ width: `${(project.completed_phases / project.total_phases) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
