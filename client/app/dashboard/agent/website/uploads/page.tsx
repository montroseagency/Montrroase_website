'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { Upload, CheckCircle, XCircle, Clock, Eye, ExternalLink, MessageSquare, Download } from 'lucide-react';

interface WebsiteVersion {
  id: string;
  project: string;
  project_title: string;
  agent: string;
  agent_name: string;
  version_number: string;
  file: string;
  file_url: string;
  status: string;
  notes: string;
  client_feedback: string;
  technologies_used: string[];
  changelog: string;
  preview_url: string;
  deployment_url: string;
  uploaded_at: string;
  approved_at: string;
  deployed_at: string;
}

interface WebsiteProject {
  id: string;
  title: string;
  client_name: string;
}

export default function WebsiteUploadsPage() {
  const searchParams = useSearchParams();
  const preselectedProject = searchParams?.get('project');

  const [versions, setVersions] = useState<WebsiteVersion[]>([]);
  const [projects, setProjects] = useState<WebsiteProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    project: preselectedProject || '',
    version_number: '',
    file: null as File | null,
    notes: '',
    technologies_used: '',
    changelog: '',
    preview_url: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [versionsData, projectsData] = await Promise.all([
        api.getMyWebsiteUploads(),
        api.get('/website-projects/')
      ]);
      setVersions(versionsData as WebsiteVersion[]);
      setProjects(projectsData as WebsiteProject[]);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.project || !formData.version_number || !formData.file) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setUploading(true);
      setError('');

      const uploadFormData = new FormData();
      uploadFormData.append('project', formData.project);
      uploadFormData.append('version_number', formData.version_number);
      uploadFormData.append('file', formData.file);
      uploadFormData.append('notes', formData.notes);
      uploadFormData.append('changelog', formData.changelog);
      if (formData.preview_url) {
        uploadFormData.append('preview_url', formData.preview_url);
      }
      if (formData.technologies_used) {
        const techArray = formData.technologies_used.split(',').map(t => t.trim());
        uploadFormData.append('technologies_used', JSON.stringify(techArray));
      }

      await api.uploadWebsiteVersion(uploadFormData);
      setSuccess('Website version uploaded successfully!');
      setShowUploadForm(false);
      setFormData({
        project: '',
        version_number: '',
        file: null,
        notes: '',
        technologies_used: '',
        changelog: '',
        preview_url: ''
      });
      fetchData();
    } catch (err: any) {
      setError(err.message || 'Failed to upload version');
    } finally {
      setUploading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'uploaded': 'bg-yellow-100 text-yellow-800',
      'testing': 'bg-blue-100 text-blue-800',
      'approved': 'bg-green-100 text-green-800',
      'deployed': 'bg-purple-100 text-purple-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'deployed':
        return <CheckCircle className="w-5 h-5 text-purple-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
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

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Website Uploads</h1>
          <p className="text-gray-600">Upload and manage website versions for your projects</p>
        </div>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow flex items-center gap-2"
        >
          <Upload className="w-5 h-5" />
          {showUploadForm ? 'Cancel Upload' : 'Upload New Version'}
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      {/* Upload Form */}
      {showUploadForm && (
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload New Website Version</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project *
                </label>
                <select
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title} - {project.client_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Version Number *
                </label>
                <input
                  type="text"
                  value={formData.version_number}
                  onChange={(e) => setFormData({ ...formData, version_number: e.target.value })}
                  placeholder="e.g., v1.0, v2.1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website Files (ZIP) *
              </label>
              <input
                type="file"
                accept=".zip"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              />
              <p className="mt-2 text-sm text-gray-500">Upload a ZIP file containing all website files</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview URL (Optional)
              </label>
              <input
                type="url"
                value={formData.preview_url}
                onChange={(e) => setFormData({ ...formData, preview_url: e.target.value })}
                placeholder="https://preview.example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technologies Used
              </label>
              <input
                type="text"
                value={formData.technologies_used}
                onChange={(e) => setFormData({ ...formData, technologies_used: e.target.value })}
                placeholder="React, Next.js, Tailwind (comma-separated)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes for Client
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                placeholder="Any notes or instructions for the client..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Changelog
              </label>
              <textarea
                value={formData.changelog}
                onChange={(e) => setFormData({ ...formData, changelog: e.target.value })}
                rows={4}
                placeholder="What's new in this version..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload Version'}
            </button>
          </form>
        </div>
      )}

      {/* Versions List */}
      {versions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Uploads Yet</h3>
          <p className="text-gray-600 mb-6">
            Upload your first website version to get started
          </p>
          <button
            onClick={() => setShowUploadForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            Upload Version
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {versions.map((version) => (
            <div
              key={version.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{version.version_number}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(version.status)}`}>
                      {version.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-purple-600 font-medium mb-2">{version.project_title}</p>
                  {version.notes && (
                    <p className="text-sm text-gray-600">{version.notes}</p>
                  )}
                </div>
                <div className="ml-4">
                  {getStatusIcon(version.status)}
                </div>
              </div>

              {version.technologies_used && version.technologies_used.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Technologies:</p>
                  <div className="flex flex-wrap gap-2">
                    {version.technologies_used.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {version.changelog && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Changelog:</p>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{version.changelog}</p>
                </div>
              )}

              {version.client_feedback && (
                <div className="mb-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900 mb-1">Client Feedback:</p>
                      <p className="text-sm text-yellow-800">{version.client_feedback}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Uploaded</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(version.uploaded_at).toLocaleDateString()}
                  </p>
                </div>
                {version.approved_at && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Approved</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(version.approved_at).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {version.deployed_at && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Deployed</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(version.deployed_at).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                {version.file_url && (
                  <a
                    href={version.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    Download Files
                  </a>
                )}
                {version.preview_url && (
                  <a
                    href={version.preview_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    View Preview
                  </a>
                )}
                {version.deployment_url && (
                  <a
                    href={version.deployment_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live Site
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
