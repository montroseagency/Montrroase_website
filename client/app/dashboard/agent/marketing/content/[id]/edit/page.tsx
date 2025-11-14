'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ApiService from '@/lib/api';
import { ArrowLeft, Upload, X, AlertCircle, Check, ExternalLink, Clock } from 'lucide-react';
import Link from 'next/link';
import type { ContentPost } from '@/lib/types';

interface PlatformRules {
  maxChars: number;
  maxImages: number;
  minImages: number;
}

const PLATFORM_RULES: Record<string, PlatformRules> = {
  instagram: { maxChars: 2200, maxImages: 10, minImages: 1 },
  tiktok: { maxChars: 300, maxImages: 1, minImages: 1 },
  youtube: { maxChars: 5000, maxImages: 1, minImages: 1 },
  twitter: { maxChars: 280, maxImages: 4, minImages: 1 },
  linkedin: { maxChars: 3000, maxImages: 9, minImages: 1 },
  facebook: { maxChars: 63206, maxImages: 10, minImages: 1 },
};

const PLATFORM_ICONS = {
  instagram: '📸',
  youtube: '🎥',
  tiktok: '🎵',
  twitter: '🐦',
  linkedin: '💼',
  facebook: '📘',
};

export default function EditContentPage() {
  const router = useRouter();
  const params = useParams();
  const contentId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Content data
  const [content, setContent] = useState<ContentPost | null>(null);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState('');
  const [postUrl, setPostUrl] = useState('');
  const [likes, setLikes] = useState('');
  const [comments, setComments] = useState('');
  const [shares, setShares] = useState('');
  const [views, setViews] = useState('');

  // Mark as posted modal
  const [showMarkPostedModal, setShowMarkPostedModal] = useState(false);

  useEffect(() => {
    if (contentId) {
      fetchContent();
    }
  }, [contentId]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      // Use the content endpoint with ID
      const data = await ApiService.get(`/content/${contentId}/`) as any;
      setContent(data);
      setTitle(data.title || '');
      setCaption(data.content || '');
      setScheduledDate(
        data.scheduled_date
          ? new Date(data.scheduled_date).toISOString().slice(0, 16)
          : ''
      );
      // Handle existing images if they exist
      if (data.image_url) {
        setExistingImageUrls([data.image_url]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load content');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!content) return;

    const platform = content.platform;
    const rules = PLATFORM_RULES[platform];
    const totalImages = existingImageUrls.length + images.length + files.length;

    if (totalImages > rules.maxImages) {
      setError(`Maximum ${rules.maxImages} images allowed for ${platform}`);
      return;
    }

    setImages([...images, ...files]);

    // Generate previews
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    setError(null);
  };

  const removeNewImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImageUrls(existingImageUrls.filter((_, i) => i !== index));
  };

  const getPlatformRules = () => {
    if (!content) return null;
    return PLATFORM_RULES[content.platform];
  };

  const validateForm = (): string | null => {
    if (!title.trim()) return 'Title is required';
    if (!caption.trim()) return 'Caption is required';

    const rules = getPlatformRules();
    if (!rules) return 'Invalid platform';

    if (caption.length > rules.maxChars) {
      return `Caption exceeds ${rules.maxChars} characters for ${content?.platform}`;
    }

    const totalImages = existingImageUrls.length + images.length;
    if (totalImages < rules.minImages) {
      return `At least ${rules.minImages} image(s) required for ${content?.platform}`;
    }

    if (totalImages > rules.maxImages) {
      return `Maximum ${rules.maxImages} images allowed for ${content?.platform}`;
    }

    return null;
  };

  const handleUpdate = async (newStatus?: string) => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', caption);
      if (newStatus) {
        formData.append('status', newStatus);
      }

      if (scheduledDate) {
        formData.append('scheduled_date', new Date(scheduledDate).toISOString());
      }

      // Append new images
      images.forEach((image) => {
        formData.append(`images`, image);
      });

      // If all existing images were removed, we might need to handle that
      // depending on backend implementation

      await ApiService.updateContent(contentId, formData);

      setSuccess('Content updated successfully!');
      setTimeout(() => {
        router.push('/dashboard/agent/marketing/content');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to update content');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleMarkAsPosted = async () => {
    if (!postUrl.trim()) {
      setError('Post URL is required');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await ApiService.markContentPosted(contentId, {
        post_url: postUrl,
        likes: likes ? parseInt(likes) : undefined,
        comments: comments ? parseInt(comments) : undefined,
        shares: shares ? parseInt(shares) : undefined,
        views: views ? parseInt(views) : undefined,
      });

      setSuccess('Content marked as posted!');
      setTimeout(() => {
        router.push('/dashboard/agent/marketing/content');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to mark as posted');
      console.error(err);
    } finally {
      setSaving(false);
      setShowMarkPostedModal(false);
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
            href="/dashboard/agent/marketing/content"
            className="text-purple-600 hover:text-purple-700 font-medium mt-4 inline-block"
          >
            ← Back to Content List
          </Link>
        </div>
      </div>
    );
  }

  const canEdit = content.status === 'draft';
  const isPendingApproval = content.status === 'pending-approval';
  const isApproved = content.status === 'approved';
  const isPosted = content.status === 'posted';

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/dashboard/agent/marketing/content"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">Edit Content</h1>
          <p className="text-gray-600 mt-1">
            {content.client_name} • {content.platform}
          </p>
        </div>

        {/* Status Badge */}
        <div>
          {content.status === 'draft' && (
            <span className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-800 font-medium">
              Draft
            </span>
          )}
          {content.status === 'pending-approval' && (
            <span className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium">
              <Clock className="w-4 h-4" />
              Pending Approval
            </span>
          )}
          {content.status === 'approved' && (
            <span className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
              <Check className="w-4 h-4" />
              Approved
            </span>
          )}
          {content.status === 'posted' && (
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

      {/* Status-Based Message */}
      {isPendingApproval && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-900 font-medium mb-1">Waiting for Client Approval</p>
          <p className="text-blue-800 text-sm">
            This content has been submitted and is awaiting approval from the client. You cannot
            edit it until the client approves or requests changes.
          </p>
        </div>
      )}

      {isApproved && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-900 font-medium mb-1">Content Approved!</p>
          <p className="text-green-800 text-sm">
            The client has approved this content. You can now post it and mark it as posted.
          </p>
        </div>
      )}

      {isPosted && content.image_url && (
        <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-purple-900 font-medium mb-2">Content Posted</p>
          <a
            href={content.image_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-700 hover:text-purple-800 flex items-center gap-2 text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            View Posted Content
          </a>
        </div>
      )}

      {/* Edit Form */}
      <div className="bg-white rounded-lg shadow p-6">
        {/* Platform Info */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg flex items-center gap-3">
          <span className="text-3xl">{PLATFORM_ICONS[content.platform]}</span>
          <div>
            <p className="font-semibold text-gray-900 capitalize">{content.platform}</p>
            <p className="text-sm text-gray-600">{content.client_name}</p>
          </div>
        </div>

        {/* Platform Rules */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900 font-medium mb-2">Platform Guidelines:</p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Max Caption: {getPlatformRules()?.maxChars.toLocaleString()} characters</li>
            <li>
              • Images: {getPlatformRules()?.minImages}-{getPlatformRules()?.maxImages} allowed
            </li>
          </ul>
        </div>

        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={!canEdit}
            placeholder="Enter content title (internal use)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        {/* Caption */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Caption <span className="text-red-500">*</span>
          </label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            disabled={!canEdit}
            placeholder="Write your caption here..."
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <div className="flex justify-between mt-2">
            <p
              className={`text-sm ${
                caption.length > (getPlatformRules()?.maxChars || 0)
                  ? 'text-red-600'
                  : 'text-gray-600'
              }`}
            >
              {caption.length} / {getPlatformRules()?.maxChars.toLocaleString()} characters
            </p>
          </div>
        </div>

        {/* Images */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Images <span className="text-red-500">*</span>
          </label>

          {/* Existing Images */}
          {existingImageUrls.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Current Images:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {existingImageUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Existing ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    {canEdit && (
                      <button
                        onClick={() => removeExistingImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">New Images:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`New ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeNewImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Button */}
          {canEdit &&
            existingImageUrls.length + images.length < (getPlatformRules()?.maxImages || 10) && (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Click to upload images</p>
                <p className="text-xs text-gray-500">
                  {existingImageUrls.length + images.length} / {getPlatformRules()?.maxImages}{' '}
                  images
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
        </div>

        {/* Scheduled Date */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Scheduled Date (Optional)
          </label>
          <input
            type="datetime-local"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            disabled={!canEdit}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {canEdit && (
            <>
              <button
                onClick={() => handleUpdate('draft')}
                disabled={saving}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {saving ? 'Saving...' : 'Save Draft'}
              </button>
              <button
                onClick={() => handleUpdate('pending-approval')}
                disabled={saving}
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {saving ? 'Submitting...' : 'Submit for Approval'}
              </button>
            </>
          )}

          {isApproved && (
            <button
              onClick={() => setShowMarkPostedModal(true)}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Mark as Posted
            </button>
          )}
        </div>
      </div>

      {/* Mark as Posted Modal */}
      {showMarkPostedModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Mark Content as Posted</h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Post URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={postUrl}
                  onChange={(e) => setPostUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Likes</label>
                  <input
                    type="number"
                    value={likes}
                    onChange={(e) => setLikes(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
                  <input
                    type="number"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Shares</label>
                  <input
                    type="number"
                    value={shares}
                    onChange={(e) => setShares(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Views</label>
                  <input
                    type="number"
                    value={views}
                    onChange={(e) => setViews(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowMarkPostedModal(false)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleMarkAsPosted}
                disabled={saving}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {saving ? 'Saving...' : 'Mark as Posted'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
