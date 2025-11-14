'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ApiService from '@/lib/api';
import { ContentRequest } from '@/lib/types';
import { ArrowLeft, Calendar, FileText, CheckCircle, Clock, XCircle, AlertCircle, MessageSquare, Plus, PlayCircle } from 'lucide-react';
import Link from 'next/link';

const PLATFORM_ICONS = {
  instagram: '📸',
  youtube: '🎥',
  tiktok: '🎵',
};

const STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    color: 'text-yellow-700 bg-yellow-50 border-yellow-200',
    icon: Clock,
  },
  'in-progress': {
    label: 'In Progress',
    color: 'text-blue-700 bg-blue-50 border-blue-200',
    icon: Clock,
  },
  completed: {
    label: 'Completed',
    color: 'text-green-700 bg-green-50 border-green-200',
    icon: CheckCircle,
  },
  rejected: {
    label: 'Rejected',
    color: 'text-red-700 bg-red-50 border-red-200',
    icon: XCircle,
  },
};

export default function AgentRequestDetailPage() {
  const router = useRouter();
  const params = useParams();
  const requestId = params?.id as string;

  const [request, setRequest] = useState<ContentRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Reject modal state
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    if (requestId) {
      fetchRequestDetail();
    }
  }, [requestId]);

  const fetchRequestDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ApiService.getContentRequest(requestId) as ContentRequest;
      setRequest(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load request details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartProgress = async () => {
    if (!request) return;

    try {
      setActionLoading(true);
      await ApiService.startContentRequestProgress(request.id);
      await fetchRequestDetail(); // Refresh
    } catch (err: any) {
      setError(err.message || 'Failed to start progress');
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!request || !rejectReason.trim()) {
      setError('Please provide a reason for rejection');
      return;
    }

    try {
      setActionLoading(true);
      await ApiService.rejectContentRequest(request.id, { agent_notes: rejectReason });
      setShowRejectModal(false);
      await fetchRequestDetail(); // Refresh
    } catch (err: any) {
      setError(err.message || 'Failed to reject request');
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateContent = () => {
    if (!request) return;
    // Navigate to create content page with request ID as parameter
    router.push(`/dashboard/agent/marketing/content/create?request=${request.id}`);
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading request details...</p>
        </div>
      </div>
    );
  }

  if (error && !request) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 font-medium">Failed to load request</p>
            <p className="text-red-700 text-sm mt-1">{error}</p>
            <Link
              href="/dashboard/agent/marketing/content"
              className="text-red-700 underline text-sm mt-2 inline-block"
            >
              Back to Content
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!request) {
    return null;
  }

  const StatusIcon = STATUS_CONFIG[request.status].icon;
  const statusConfig = STATUS_CONFIG[request.status];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/dashboard/agent/marketing/content"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">Client Request Details</h1>
          <p className="text-gray-600 mt-1">Review and process this content request</p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Status Badge */}
      <div className="mb-6">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${statusConfig.color}`}>
          <StatusIcon className="w-5 h-5" />
          <span className="font-medium">{statusConfig.label}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Request Info Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">{PLATFORM_ICONS[request.platform]}</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{request.title}</h2>
                <p className="text-gray-600">
                  <span className="capitalize">{request.platform}</span> • {request.client_name}
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Client Description</h3>
              <p className="text-gray-800 whitespace-pre-wrap">{request.description}</p>
            </div>

            {request.notes && (
              <div className="border-t pt-4 mt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Additional Notes</h3>
                <p className="text-gray-800 whitespace-pre-wrap">{request.notes}</p>
              </div>
            )}
          </div>

          {/* Reference Images */}
          {request.reference_images && request.reference_images.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reference Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {request.reference_images.map((image, index) => (
                  <a
                    key={image.id}
                    href={image.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-square rounded-lg overflow-hidden border border-gray-200 hover:border-purple-500 transition-colors"
                  >
                    <img
                      src={image.image_url}
                      alt={image.caption || `Reference ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        View Full Size
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Agent Notes (if already added) */}
          {request.agent_notes && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Your Notes</h3>
                  <p className="text-purple-800 whitespace-pre-wrap">{request.agent_notes}</p>
                </div>
              </div>
            </div>
          )}

          {/* Created Content Link */}
          {request.status === 'completed' && request.created_content_id && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Content Created!</h3>
                  <p className="text-green-800 mb-4">
                    You have successfully created content for this request.
                  </p>
                  <Link
                    href={`/dashboard/agent/marketing/content/${request.created_content_id}/edit`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    View Content
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              {request.status === 'pending' && (
                <>
                  <button
                    onClick={handleStartProgress}
                    disabled={actionLoading}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <PlayCircle className="w-4 h-4" />
                    {actionLoading ? 'Starting...' : 'Start Working'}
                  </button>
                  <button
                    onClick={() => setShowRejectModal(true)}
                    disabled={actionLoading}
                    className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject Request
                  </button>
                </>
              )}

              {(request.status === 'pending' || request.status === 'in-progress') && (
                <button
                  onClick={handleCreateContent}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create Content
                </button>
              )}

              {request.status === 'completed' && request.created_content_id && (
                <Link
                  href={`/dashboard/agent/marketing/content/${request.created_content_id}/edit`}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  View Content
                </Link>
              )}
            </div>
          </div>

          {/* Timeline Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                </div>
                <div className="flex-1 pb-4">
                  <p className="font-medium text-gray-900">Request Submitted</p>
                  <p className="text-sm text-gray-600">
                    {new Date(request.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              {(request.status === 'in-progress' || request.status === 'completed' || request.status === 'rejected') && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                    {(request.status === 'completed' || request.status === 'rejected') && (
                      <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-medium text-gray-900">Agent Started</p>
                    <p className="text-sm text-gray-600">Work in progress</p>
                  </div>
                </div>
              )}

              {request.status === 'completed' && request.completed_at && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Content Created</p>
                    <p className="text-sm text-gray-600">
                      {new Date(request.completed_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              )}

              {request.status === 'rejected' && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <XCircle className="w-4 h-4 text-red-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Request Rejected</p>
                    <p className="text-sm text-gray-600">Unable to fulfill</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Request Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Details</h3>
            <div className="space-y-3">
              {request.preferred_date && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Preferred Date</p>
                    <p className="text-gray-900 font-medium">
                      {new Date(request.preferred_date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Request ID</p>
                  <p className="text-gray-900 font-mono text-sm">{request.id.slice(0, 8)}...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Reject Request</h3>
            <p className="text-gray-600 mb-4">
              Please provide a reason for rejecting this request. This will be shared with the client.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Explain why you cannot fulfill this request..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason('');
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoading || !rejectReason.trim()}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? 'Rejecting...' : 'Reject Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
