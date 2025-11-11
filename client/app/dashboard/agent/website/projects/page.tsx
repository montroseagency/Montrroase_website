'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Globe, Calendar, DollarSign, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface WebsiteProject {
  id: string;
  client: string;
  client_name: string;
  title: string;
  description: string;
  template: string;
  template_name: string;
  domain_name: string;
  status: string;
  current_phase: number;
  total_phases: number;
  total_cost: string;
  demo_url: string;
  live_url: string;
  created_at: string;
}

export default function WebsiteProjectsPage() {
  const [projects, setProjects] = useState<WebsiteProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('/website-projects/');
      setProjects(response);
    } catch (err: any) {
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'in_progress': 'bg-blue-100 text-blue-800',
      'review': 'bg-purple-100 text-purple-800',
      'completed': 'bg-green-100 text-green-800',
      'on_hold': 'bg-gray-100 text-gray-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'on_hold':
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
      default:
        return <Calendar className="w-5 h-5 text-yellow-600" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Website Projects</h1>
        <p className="text-gray-600">Manage all your assigned website development projects</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
            </div>
            <Globe className="w-10 h-10 text-purple-600 opacity-20" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">
                {projects.filter(p => p.status === 'in_progress').length}
              </p>
            </div>
            <Clock className="w-10 h-10 text-blue-600 opacity-20" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {projects.filter(p => p.status === 'completed').length}
              </p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-600 opacity-20" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Review</p>
              <p className="text-2xl font-bold text-purple-600">
                {projects.filter(p => p.status === 'review').length}
              </p>
            </div>
            <AlertCircle className="w-10 h-10 text-purple-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Projects Assigned</h3>
          <p className="text-gray-600">
            You don't have any website projects assigned yet. Check back later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.push(`/dashboard/agent/website/projects/${project.id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{project.description}</p>
                  <p className="text-sm text-purple-600 font-medium">Client: {project.client_name}</p>
                </div>
                <div className="ml-4">
                  {getStatusIcon(project.status)}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Template</p>
                  <p className="text-sm font-medium text-gray-900">{project.template_name || 'Not selected'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Domain</p>
                  <p className="text-sm font-medium text-gray-900">{project.domain_name || 'Not configured'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Progress</p>
                  <p className="text-sm font-medium text-gray-900">
                    Phase {project.current_phase}/{project.total_phases}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Cost</p>
                  <p className="text-sm font-medium text-gray-900">${project.total_cost}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-gray-600">Project Progress</p>
                  <p className="text-sm font-medium text-gray-900">
                    {Math.round((project.current_phase / project.total_phases) * 100)}%
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${(project.current_phase / project.total_phases) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Demo →
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Live Site →
                  </a>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/dashboard/agent/website/uploads?project=${project.id}`);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Upload Version →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
