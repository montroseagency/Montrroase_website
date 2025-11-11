'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Server, Globe, CheckCircle, XCircle, Clock, AlertTriangle, ExternalLink } from 'lucide-react';

interface WebsiteProject {
  id: string;
  client_name: string;
  title: string;
  domain_name: string;
  status: string;
  live_url: string;
  demo_url: string;
  hosting_provider: string;
  hosting_status: string;
  ssl_enabled: boolean;
  last_deployed: string;
}

export default function HostingOverviewPage() {
  const [projects, setProjects] = useState<WebsiteProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('/website-projects/');
      setProjects(response);
    } catch (err: any) {
      setError(err.message || 'Failed to load hosting data');
    } finally {
      setLoading(false);
    }
  };

  const getHostingStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'active': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'suspended': 'bg-red-100 text-red-800',
      'maintenance': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getHostingStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'suspended':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'maintenance':
        return <AlertTriangle className="w-5 h-5 text-blue-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const liveProjects = projects.filter(p => p.live_url || p.hosting_status === 'active');
  const activeHosting = projects.filter(p => p.hosting_status === 'active').length;
  const sslEnabled = projects.filter(p => p.ssl_enabled).length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hosting Overview</h1>
        <p className="text-gray-600">Monitor hosting status for all your client websites</p>
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
              <p className="text-sm text-gray-600">Live Sites</p>
              <p className="text-2xl font-bold text-green-600">{liveProjects.length}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-600 opacity-20" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Hosting</p>
              <p className="text-2xl font-bold text-blue-600">{activeHosting}</p>
            </div>
            <Server className="w-10 h-10 text-blue-600 opacity-20" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">SSL Secured</p>
              <p className="text-2xl font-bold text-purple-600">{sslEnabled}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-purple-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Server className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Projects Found</h3>
          <p className="text-gray-600">
            No website projects are assigned to you yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                    {project.hosting_status && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getHostingStatusColor(project.hosting_status)}`}>
                        {project.hosting_status?.toUpperCase() || 'UNKNOWN'}
                      </span>
                    )}
                  </div>
                  <p className="text-purple-600 font-medium">Client: {project.client_name}</p>
                </div>
                <div className="ml-4">
                  {project.hosting_status && getHostingStatusIcon(project.hosting_status)}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Domain</p>
                  <p className="text-sm font-medium text-gray-900">
                    {project.domain_name || 'Not configured'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Hosting Provider</p>
                  <p className="text-sm font-medium text-gray-900">
                    {project.hosting_provider || 'Not specified'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">SSL Status</p>
                  <div className="flex items-center gap-2">
                    {project.ssl_enabled ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">Enabled</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-medium text-red-600">Disabled</span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Last Deployed</p>
                  <p className="text-sm font-medium text-gray-900">
                    {project.last_deployed ? new Date(project.last_deployed).toLocaleDateString() : 'Never'}
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live Site
                  </a>
                )}
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Demo
                  </a>
                )}
                {!project.ssl_enabled && (
                  <span className="text-sm text-amber-600 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    SSL Certificate Needed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Tips */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Hosting Best Practices
        </h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Ensure all production sites have SSL certificates enabled</li>
          <li>• Regularly monitor hosting status and uptime</li>
          <li>• Keep hosting provider credentials secure</li>
          <li>• Coordinate with clients before any maintenance windows</li>
          <li>• Document deployment procedures for each project</li>
        </ul>
      </div>
    </div>
  );
}
