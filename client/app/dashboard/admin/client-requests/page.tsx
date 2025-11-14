'use client';

import { useEffect, useState } from 'react';
import ApiService from '@/lib/api';
import { Users, CheckCircle, XCircle, Clock, Building, Mail, Calendar } from 'lucide-react';

interface ClientAccessRequest {
  id: string;
  agent_name: string;
  agent_department: string;
  client_name: string;
  client_company: string;
  reason: string;
  status: string;
  created_at: string;
  reviewed_at: string | null;
  reviewed_by_name: string | null;
  review_note: string;
}

export default function ClientRequestsPage() {
  const [requests, setRequests] = useState<ClientAccessRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'pending' | 'approved' | 'denied' | 'all'>('pending');
  const [processingRequest, setProcessingRequest] = useState<string | null>(null);
  const [reviewNote, setReviewNote] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await ApiService.get('/client-access-requests/');
      console.log('Client requests response:', response); // Debug log

      // Handle both paginated and non-paginated responses
      let requestsData = [];
      if (Array.isArray(response)) {
        requestsData = response;
      } else if (response && typeof response === 'object') {
        const resp = response as any;
        if (resp.results && Array.isArray(resp.results)) {
          requestsData = resp.results;
        } else if (resp.data && Array.isArray(resp.data)) {
          requestsData = resp.data;
        }
      }

      console.log('Parsed requests data:', requestsData); // Debug log
      setRequests(requestsData);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const approveRequest = async (requestId: string) => {
    try {
      setProcessingRequest(requestId);
      await ApiService.post(`/client-access-requests/${requestId}/approve/`, {
        review_note: reviewNote[requestId] || 'Approved'
      });
      alert('Request approved successfully!');
      await fetchRequests();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to approve request');
    } finally {
      setProcessingRequest(null);
    }
  };

  const denyRequest = async (requestId: string) => {
    const note = reviewNote[requestId];
    if (!note || note.trim() === '') {
      alert('Please provide a reason for denial');
      return;
    }

    try {
      setProcessingRequest(requestId);
      await ApiService.post(`/client-access-requests/${requestId}/deny/`, {
        review_note: note
      });
      alert('Request denied successfully!');
      await fetchRequests();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to deny request');
    } finally {
      setProcessingRequest(null);
    }
  };

  const filteredRequests = requests.filter((req) => {
    if (filter === 'all') return true;
    return req.status === filter;
  });

  const pendingCount = requests.filter((r) => r.status === 'pending').length;
  const approvedCount = requests.filter((r) => r.status === 'approved').length;
  const deniedCount = requests.filter((r) => r.status === 'denied').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Client Access Requests</h1>
        <p className="text-gray-600 mt-1">Review and approve agent requests to manage clients</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Requests</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{requests.length}</p>
            </div>
            <Users className="w-12 h-12 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">{pendingCount}</p>
            </div>
            <Clock className="w-12 h-12 text-orange-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Approved</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{approvedCount}</p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Denied</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{deniedCount}</p>
            </div>
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'pending'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'approved'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Approved ({approvedCount})
          </button>
          <button
            onClick={() => setFilter('denied')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'denied'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Denied ({deniedCount})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({requests.length})
          </button>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  {/* Request Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold">
                      {request.agent_name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {request.agent_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {request.agent_department} Department
                      </p>
                    </div>
                  </div>

                  {/* Request Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="font-medium">Client:</span>
                        <span className="ml-2">{request.client_name}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Building className="w-4 h-4 mr-2" />
                        <span className="font-medium">Company:</span>
                        <span className="ml-2">{request.client_company}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="font-medium">Requested:</span>
                        <span className="ml-2">
                          {new Date(request.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {request.reviewed_at && (
                        <div className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          <span className="font-medium">Reviewed:</span>
                          <span className="ml-2">
                            {new Date(request.reviewed_at).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Reason */}
                  {request.reason && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-medium mb-1">Reason:</p>
                      <p className="text-sm text-gray-700">{request.reason}</p>
                    </div>
                  )}

                  {/* Review Note (if reviewed) */}
                  {request.review_note && request.status !== 'pending' && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-600 font-medium mb-1">
                        Review Note by {request.reviewed_by_name}:
                      </p>
                      <p className="text-sm text-blue-700">{request.review_note}</p>
                    </div>
                  )}

                  {/* Actions for Pending Requests */}
                  {request.status === 'pending' && (
                    <div className="space-y-3">
                      <textarea
                        placeholder="Add a note (optional for approval, required for denial)"
                        value={reviewNote[request.id] || ''}
                        onChange={(e) =>
                          setReviewNote({ ...reviewNote, [request.id]: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => approveRequest(request.id)}
                          disabled={processingRequest === request.id}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <CheckCircle className="w-5 h-5" />
                          {processingRequest === request.id ? 'Approving...' : 'Approve'}
                        </button>
                        <button
                          onClick={() => denyRequest(request.id)}
                          disabled={processingRequest === request.id}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <XCircle className="w-5 h-5" />
                          {processingRequest === request.id ? 'Denying...' : 'Deny'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div>
                  {request.status === 'pending' && (
                    <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-sm font-medium inline-flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Pending
                    </span>
                  )}
                  {request.status === 'approved' && (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium inline-flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Approved
                    </span>
                  )}
                  {request.status === 'denied' && (
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-medium inline-flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      Denied
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No {filter !== 'all' ? filter : ''} requests
            </h3>
            <p className="text-gray-600">
              {filter === 'pending'
                ? 'No pending requests at the moment.'
                : filter === 'approved'
                ? 'No approved requests yet.'
                : filter === 'denied'
                ? 'No denied requests yet.'
                : 'No requests have been made yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
