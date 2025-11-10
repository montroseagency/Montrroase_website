'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import Link from 'next/link';
import { Globe, Plus, Sparkles, Eye, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';

interface WebsiteProject {
  id: string;
  project_name: string;
  industry: string;
  business_goals: string;
  desired_features: string[];
  status: string;
  estimated_cost_min?: number;
  estimated_cost_max?: number;
  demo_url?: string;
  total_amount?: number;
  completed_phases: number;
  total_phases: number;
  created_at: string;
}

export default function WebsiteBuilderPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<WebsiteProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const response = await ApiService.get('/website-projects/');
        setProjects(Array.isArray(response) ? response : []);
      } catch (err: any) {
        setError(err.message || 'Failed to load projects');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_development':
      case 'demo':
      case 'valuation':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

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

  const statusCounts = {
    questionnaire: projects.filter(p => p.status === 'questionnaire').length,
    valuation: projects.filter(p => p.status === 'valuation').length,
    in_development: projects.filter(p => p.status === 'in_development').length,
    completed: projects.filter(p => p.status === 'completed').length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Website Builder</h1>
          <p className="text-gray-600 mt-2">Create professional websites with AI-powered development</p>
        </div>
        <Link
          href="/dashboard/client/website-builder/new"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Link>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-gray-600" />
            <p className="text-sm text-gray-600">Planning</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{statusCounts.questionnaire}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-purple-600" />
            <p className="text-sm text-gray-600">Valuation</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{statusCounts.valuation}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-blue-600" />
            <p className="text-sm text-gray-600">In Development</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{statusCounts.in_development}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{statusCounts.completed}</p>
        </div>
      </div>

      {/* Projects List */}
      {projects.length > 0 ? (
        <div className="space-y-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/dashboard/client/website-builder/${project.id}`}
              className="block"
            >
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition-all border border-transparent hover:border-purple-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Globe className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{project.project_name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{project.industry}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 line-clamp-2 mb-4">{project.business_goals}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.desired_features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                          {feature}
                        </span>
                      ))}
                      {project.desired_features.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                          +{project.desired_features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="ml-6 text-right flex-shrink-0">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(project.status)}
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(project.status)}`}>
                        {formatStatus(project.status)}
                      </span>
                    </div>

                    {project.estimated_cost_min && project.estimated_cost_max && (
                      <p className="text-sm text-gray-600 mt-2">
                        ${project.estimated_cost_min.toLocaleString()} - ${project.estimated_cost_max.toLocaleString()}
                      </p>
                    )}

                    {project.total_phases > 0 && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 mb-1">Progress</p>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${(project.completed_phases / project.total_phases) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">
                            {project.completed_phases}/{project.total_phases}
                          </span>
                        </div>
                      </div>
                    )}

                    {project.demo_url && (
                      <div className="mt-3 flex items-center gap-1 text-blue-600 text-sm">
                        <Eye className="w-4 h-4" />
                        <span>View Demo</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects yet</h3>
          <p className="text-gray-600 mb-6">Start your first website project with our AI-powered builder</p>
          <Link
            href="/dashboard/client/website-builder/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md"
          >
            <Plus className="w-5 h-5" />
            Create Your First Project
          </Link>
        </div>
      )}
    </div>
  );
}
