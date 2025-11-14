'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ApiService from '@/lib/api';
import { ArrowLeft, Check, X, AlertCircle, ExternalLink, Clock, Edit, ThumbsUp, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import type { ContentPost } from '@/lib/types';

const PLATFORM_ICONS = {
  instagram: '📸',
  youtube: '🎥',
  tiktok: '🎵',
  twitter: '🐦',
  linkedin: '🔗',
  facebook: '📘',
};

export default function ClientContentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const contentId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [content, setContent] = useState<ContentPost | null>(null);

  // Change request modal
  const [showChangeRequestModal, setShowChangeRequestModal] = useState(false);
  const [changeRequestMessage, setChangeRequestMessage] = useState('');

  useEffect(() => {
    if (contentId) {
      fetchContent();
    }
  }, [contentId]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const data = await ApiService.get(`/content/${contentId}/`) as ContentPost;
      setContent(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load content');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!confirm('Are you sure you want to approve this content?')) return;

    setProcessing(true);
    setError(null);
    setSuccess(null);

    try {
      await ApiService.approveContent(contentId);
      setSuccess('Content approved successfully!');
      setTimeout(() => {
        router.push('/dashboard/client/marketing/content');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to approve content');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const handleRequestChanges = async () => {
    if (!changeRequestMessage.trim()) {
      setError('Please provide a message explaining the changes needed');
      return;
    }

    setProcessing(true);
    setError(null);
    setSuccess(null);

    try {
      // Update content with admin_message and set status to draft
      await ApiService.updateContent(contentId, {
        status: 'draft',
        admin_message: changeRequestMessage,
      });

      setSuccess('Change request sent to agent!');
      setTimeout(() => {
        router.push('/dashboard/client/marketing/content');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to request changes');
      console.error(err);
    } finally {
      setProcessing(false);
      setShowChangeRequestModal(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-red-800">Content not found</p>
          <Link
            href="/dashboard/client/marketing/content"
            className="text-purple-600 hover:text-purple-700 font-medium mt-4 inline-block"
          >
            � Back to Content List
          </Link>
        </div>
      </div>
    );
  }

  const isPendingApproval = content.status === 'pending-approval';
  const isApproved = content.status === 'approved';
  const isPosted = content.status === 'posted';
  const isDraft = content.status === 'draft';

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/dashboard/client/marketing/content"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">Content Details</h1>
          <p className="text-gray-600 mt-1">Review and manage your content</p>
        </div>

        {/* Status Badge */}
        <div>
          {isDraft && (
            <span className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-800 font-medium">
              <Edit className="w-4 h-4" />
              Draft
            </span>
          )}
          {isPendingApproval && (
            <span className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium">
              <Clock className="w-4 h-4" />
              Pending Approval
            </span>
          )}
          {isApproved && (
            <span className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
              <Check className="w-4 h-4" />
              Approved
            </span>
          )}
          {isPosted && (
            <span className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-green-100 text-green-800 font-medium">
              <ExternalLink className="w-4 h-4" />
              Posted
            </span>
          )}
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-green-800">{success}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Status-Based Messages */}
      {isPendingApproval && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-900 font-medium mb-1">Approval Required</p>
          <p className="text-yellow-800 text-sm">
            Your marketing agent has submitted this content for your approval. Please review and
            approve, or request changes.
          </p>
        </div>
      )}

      {isApproved && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-900 font-medium mb-1">Content Approved</p>
          <p className="text-blue-800 text-sm">
            You approved this content on {content.approved_at && new Date(content.approved_at).toLocaleDateString()}.
            Waiting for your agent to post it.
          </p>
        </div>
      )}

      {isDraft && (
        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-orange-900 font-medium mb-1">Changes Requested</p>
          <p className="text-orange-800 text-sm">
            You requested changes to this content. Your agent will update it and resubmit for approval.
          </p>
        </div>
      )}

      {isPosted && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-900 font-medium mb-1">Content Posted Successfully!</p>
          <p className="text-green-800 text-sm mb-3">
            This content was posted on {content.posted_at && new Date(content.posted_at).toLocaleDateString()}.
          </p>
          {content.image_url && (
            <a
              href={content.image_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              View Post
            </a>
          )}
        </div>
      )}

      {/* Content Display */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        {/* Platform and Client Info */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
          <span className="text-4xl">{PLATFORM_ICONS[content.platform]}</span>
          <div>
            <p className="text-xl font-bold text-gray-900 capitalize">{content.platform}</p>
            <p className="text-sm text-gray-600">
              Scheduled for {new Date(content.scheduled_date).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Image Display */}
        {content.image_url && (
          <div className="mb-6">
            <img
              src={content.image_url}
              alt="Content"
              className="w-full max-h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Caption */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Caption:</h3>
          <p className="text-gray-900 whitespace-pre-wrap">{content.content}</p>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-600 mb-1">Created</p>
            <p className="text-sm font-semibold text-gray-900">
              {new Date(content.created_at).toLocaleDateString()}
            </p>
          </div>
          {content.approved_at && (
            <div>
              <p className="text-xs text-gray-600 mb-1">Approved</p>
              <p className="text-sm font-semibold text-gray-900">
                {new Date(content.approved_at).toLocaleDateString()}
              </p>
            </div>
          )}
          {content.posted_at && (
            <div>
              <p className="text-xs text-gray-600 mb-1">Posted</p>
              <p className="text-sm font-semibold text-gray-900">
                {new Date(content.posted_at).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Engagement Metrics (if posted) */}
      {isPosted && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-600 mb-1">Engagement Rate</p>
              <p className="text-2xl font-bold text-purple-900">
                {content.engagement_rate ? `${content.engagement_rate}%` : 'N/A'}
              </p>
            </div>
            {/* Add more metrics as available from backend */}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {isPendingApproval && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Your Decision</h3>
          <div className="flex gap-4">
            <button
              onClick={() => setShowChangeRequestModal(true)}
              disabled={processing}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <MessageSquare className="w-5 h-5" />
              Request Changes
            </button>
            <button
              onClick={handleApprove}
              disabled={processing}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <ThumbsUp className="w-5 h-5" />
              {processing ? 'Approving...' : 'Approve Content'}
            </button>
          </div>
        </div>
      )}

      {/* Change Request Modal */}
      {showChangeRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Request Changes</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Please explain what changes you'd like the agent to make to this content.
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Change Request Message <span className="text-red-500">*</span>
              </label>
              <textarea
                value={changeRequestMessage}
                onChange={(e) => setChangeRequestMessage(e.target.value)}
                placeholder="Please describe the changes needed..."
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowChangeRequestModal(false);
                  setChangeRequestMessage('');
                }}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestChanges}
                disabled={processing || !changeRequestMessage.trim()}
                className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {processing ? 'Sending...' : 'Send Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
