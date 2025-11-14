'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ApiService from '@/lib/api';
import { ArrowLeft, Upload, X, Plus, AlertCircle, Check, Inbox } from 'lucide-react';
import Link from 'next/link';
import type { Client, SocialMediaAccount, ContentRequest } from '@/lib/types';

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

export default function CreateContentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestIdParam = searchParams?.get('request');

  const [step, setStep] = useState(0); // Start at 0 for request selection
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 0: Request Selection (Optional)
  const [contentRequests, setContentRequests] = useState<ContentRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ContentRequest | null>(null);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [skipRequest, setSkipRequest] = useState(false);

  // Step 1: Client Selection
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [loadingClients, setLoadingClients] = useState(true);

  // Step 2: Platform Selection
  const [socialAccounts, setSocialAccounts] = useState<SocialMediaAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<SocialMediaAccount | null>(null);
  const [loadingSocialAccounts, setLoadingSocialAccounts] = useState(false);

  // Step 3: Content Creation
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState('');

  // Load data on mount
  useEffect(() => {
    fetchRequests();
    fetchClients();
  }, []);

  // Handle request ID from URL parameter
  useEffect(() => {
    if (requestIdParam && contentRequests.length > 0) {
      const request = contentRequests.find(r => r.id === requestIdParam);
      if (request) {
        handleRequestSelect(request);
      }
    }
  }, [requestIdParam, contentRequests]);

  const fetchRequests = async () => {
    try {
      setLoadingRequests(true);
      const response = await ApiService.getContentRequests();
      const requests = Array.isArray(response) ? response : [];
      // Only show pending and in-progress requests
      const activeRequests = requests.filter(
        (r: ContentRequest) => r.status === 'pending' || r.status === 'in-progress'
      );
      setContentRequests(activeRequests);
    } catch (err: any) {
      console.error('Failed to load requests:', err);
    } finally {
      setLoadingRequests(false);
    }
  };

  const fetchClients = async () => {
    try {
      setLoadingClients(true);
      // Use the my-clients endpoint which only returns clients assigned to this agent
      const response = await ApiService.get('/agents/my-clients/');
      const myClients = Array.isArray(response) ? response : [];
      setClients(myClients);
    } catch (err: any) {
      setError('Failed to load clients');
      console.error(err);
    } finally {
      setLoadingClients(false);
    }
  };

  const handleRequestSelect = async (request: ContentRequest) => {
    setSelectedRequest(request);
    setTitle(request.title);
    setCaption(request.description);
    if (request.preferred_date) {
      setScheduledDate(request.preferred_date);
    }

    // Find the client from the request
    const client = clients.find(c => c.id === request.client);
    if (client) {
      setSelectedClient(client);
      // Load social accounts for this client and filter by platform
      await loadSocialAccountsForClient(client, request.platform);
      // Mark request as in-progress if it's pending
      if (request.status === 'pending') {
        try {
          await ApiService.startContentRequestProgress(request.id);
        } catch (err) {
          console.error('Failed to mark request as in-progress:', err);
        }
      }
    }
  };

  const loadSocialAccountsForClient = async (client: Client, platform?: string) => {
    setLoadingSocialAccounts(true);
    setError(null);

    try {
      const accounts = await ApiService.get(`/social-accounts/?client=${client.id}`);
      let filteredAccounts = Array.isArray(accounts) ? accounts : [];

      if (platform) {
        filteredAccounts = filteredAccounts.filter((a: SocialMediaAccount) => a.platform === platform);
      }

      setSocialAccounts(filteredAccounts);

      if (filteredAccounts.length === 0) {
        setError(`This client has no connected ${platform || ''} accounts. Please ask them to connect their accounts first.`);
      } else if (filteredAccounts.length === 1 && platform) {
        // Auto-select if there's only one account for the requested platform
        setSelectedAccount(filteredAccounts[0]);
        setStep(3);
      } else {
        setStep(2);
      }
    } catch (err: any) {
      setError('Failed to load social accounts');
      console.error(err);
    } finally {
      setLoadingSocialAccounts(false);
    }
  };

  const handleClientSelect = async (client: Client) => {
    setSelectedClient(client);
    await loadSocialAccountsForClient(client);
  };

  const handleAccountSelect = (account: SocialMediaAccount) => {
    setSelectedAccount(account);
    setStep(3);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!selectedAccount) return;

    const platform = selectedAccount.platform;
    const rules = PLATFORM_RULES[platform];

    if (images.length + files.length > rules.maxImages) {
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

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const getPlatformRules = () => {
    if (!selectedAccount) return null;
    return PLATFORM_RULES[selectedAccount.platform];
  };

  const validateForm = (): string | null => {
    if (!title.trim()) return 'Title is required';
    if (!caption.trim()) return 'Caption is required';
    if (!selectedAccount) return 'Please select a platform';

    const rules = getPlatformRules();
    if (!rules) return 'Invalid platform';

    if (caption.length > rules.maxChars) {
      return `Caption exceeds ${rules.maxChars} characters for ${selectedAccount.platform}`;
    }

    if (images.length < rules.minImages) {
      return `At least ${rules.minImages} image(s) required for ${selectedAccount.platform}`;
    }

    if (images.length > rules.maxImages) {
      return `Maximum ${rules.maxImages} images allowed for ${selectedAccount.platform}`;
    }

    return null;
  };

  const handleSubmit = async (isDraft: boolean) => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!selectedClient || !selectedAccount) {
      setError('Missing client or platform selection');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('client', selectedClient.id);
      formData.append('social_account', selectedAccount.id);
      formData.append('platform', selectedAccount.platform);
      formData.append('title', title);
      formData.append('content', caption);
      formData.append('status', isDraft ? 'draft' : 'pending-approval');

      if (scheduledDate) {
        formData.append('scheduled_date', new Date(scheduledDate).toISOString());
      } else {
        // Default to now if not specified
        formData.append('scheduled_date', new Date().toISOString());
      }

      // Append images
      images.forEach((image, index) => {
        formData.append(`images`, image);
        formData.append(`image_order_${index}`, index.toString());
      });

      const createdContent = await ApiService.createContent(formData);

      // If this content was created from a request, mark the request as completed
      if (selectedRequest) {
        try {
          await ApiService.markContentRequestCompleted(selectedRequest.id, {
            created_content_id: createdContent.id,
          });
        } catch (err) {
          console.error('Failed to mark request as completed:', err);
          // Don't fail the whole operation if this fails
        }
      }

      router.push('/dashboard/agent/marketing/content');
    } catch (err: any) {
      setError(err.message || 'Failed to create content');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loadingClients) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Content</h1>
          <p className="text-gray-600 mt-1">Create social media content for your clients</p>
        </div>
      </div>

      {/* Progress Steps - Only show when not on request selection */}
      {step > 0 && (
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step > 1 ? <Check className="w-5 h-5" /> : '1'}
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-200'}`} />
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step > 2 ? <Check className="w-5 h-5" /> : '2'}
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-purple-600' : 'bg-gray-200'}`} />
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              3
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Step 0: Select Request (Optional) */}
      {step === 0 && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Create From Request?</h2>
            <p className="text-gray-600 mb-6">
              You can create content based on a client request, or start from scratch.
            </p>

            {loadingRequests ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            ) : contentRequests.length > 0 ? (
              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-gray-900">Active Client Requests</h3>
                {contentRequests.map((request) => (
                  <button
                    key={request.id}
                    onClick={() => handleRequestSelect(request)}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-left"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{PLATFORM_ICONS[request.platform] || '📱'}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{request.title}</h4>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              request.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {request.status === 'pending' ? 'New' : 'In Progress'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{request.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>Client: {request.client_name}</span>
                          <span className="capitalize">{request.platform}</span>
                          {request.preferred_date && (
                            <span>Due: {new Date(request.preferred_date).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg mb-6">
                <Inbox className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No pending requests</p>
                <p className="text-sm text-gray-500">Create content from scratch instead</p>
              </div>
            )}

            <div className="border-t pt-6">
              <button
                onClick={() => setStep(1)}
                className="w-full px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Start From Scratch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 1: Select Client */}
      {step === 1 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Select Client</h2>
          <p className="text-gray-600 mb-6">Choose which client to create content for</p>

          {clients.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No clients assigned to you yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => handleClientSelect(client)}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {client.name?.[0] || client.email?.[0] || '?'}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{client.name || 'Unnamed Client'}</p>
                      <p className="text-sm text-gray-600">{client.email}</p>
                      <p className="text-xs text-gray-500 mt-1">{client.company}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 2: Select Platform */}
      {step === 2 && (
        <div className="bg-white rounded-lg shadow p-6">
          <button
            onClick={() => setStep(1)}
            className="text-purple-600 hover:text-purple-700 mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Change Client
          </button>

          <h2 className="text-xl font-bold text-gray-900 mb-4">Select Platform</h2>
          <p className="text-gray-600 mb-2">
            Creating content for: <span className="font-semibold">{selectedClient?.name}</span>
          </p>
          <p className="text-gray-600 mb-6">Choose a connected social media platform</p>

          {loadingSocialAccounts ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          ) : socialAccounts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No connected social accounts found</p>
              <p className="text-sm text-gray-500 mt-2">
                The client needs to connect their social media accounts first
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {socialAccounts.map((account) => (
                <button
                  key={account.id}
                  onClick={() => handleAccountSelect(account)}
                  className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
                >
                  <div className="text-4xl mb-3">{PLATFORM_ICONS[account.platform] || '📱'}</div>
                  <p className="font-semibold text-gray-900 capitalize">{account.platform}</p>
                  <p className="text-sm text-gray-600">@{account.username}</p>
                  {account.is_active ? (
                    <span className="inline-block mt-2 text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      Active
                    </span>
                  ) : (
                    <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                      Inactive
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 3: Create Content */}
      {step === 3 && (
        <div className="bg-white rounded-lg shadow p-6">
          <button
            onClick={() => setStep(2)}
            className="text-purple-600 hover:text-purple-700 mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Change Platform
          </button>

          <h2 className="text-xl font-bold text-gray-900 mb-4">Create Content</h2>
          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{selectedAccount?.platform ? PLATFORM_ICONS[selectedAccount.platform as keyof typeof PLATFORM_ICONS] : ''}</span>
              <div>
                <p className="font-semibold text-gray-900">
                  {selectedClient?.name} - {selectedAccount?.platform}
                </p>
                <p className="text-sm text-gray-600">@{selectedAccount?.username}</p>
              </div>
            </div>
          </div>

          {/* Platform Rules */}
          {selectedAccount && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900 font-medium mb-2">Platform Guidelines:</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>
                  • Max Caption: {getPlatformRules()?.maxChars.toLocaleString()} characters
                </li>
                <li>
                  • Images: {getPlatformRules()?.minImages}-{getPlatformRules()?.maxImages} allowed
                </li>
              </ul>
            </div>
          )}

          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter content title (internal use)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
              placeholder="Write your caption here..."
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images <span className="text-red-500">*</span>
            </label>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Button */}
            {images.length < (getPlatformRules()?.maxImages || 10) && (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Click to upload images</p>
                <p className="text-xs text-gray-500">
                  {images.length} / {getPlatformRules()?.maxImages} images
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => handleSubmit(true)}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Saving...' : 'Save as Draft'}
            </button>
            <button
              onClick={() => handleSubmit(false)}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Submitting...' : 'Submit for Approval'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
