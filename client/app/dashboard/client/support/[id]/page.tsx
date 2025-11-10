'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import Link from 'next/link';
import {
  ArrowLeft, Send, Paperclip, User, Bot, AlertCircle,
  Clock, CheckCircle, XCircle
} from 'lucide-react';

interface TicketMessage {
  id: string;
  sender: {
    id: string;
    first_name: string;
    last_name: string;
    role: string;
  };
  message: string;
  attachments: any[];
  created_at: string;
}

interface SupportTicket {
  id: string;
  ticket_number: string;
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  created_at: string;
  updated_at: string;
  closed_at?: string;
  messages: TicketMessage[];
}

export default function TicketDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [ticket, setTicket] = useState<SupportTicket | null>(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadTicket();
  }, [params.id]);

  useEffect(() => {
    scrollToBottom();
  }, [ticket?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadTicket = async () => {
    try {
      setLoading(true);
      const response = await ApiService.get(`/support-tickets/${params.id}/`);
      setTicket(response);
    } catch (err: any) {
      console.error('Error loading ticket:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      setSending(true);
      await ApiService.post(`/support-tickets/${params.id}/add_message/`, {
        message: newMessage
      });
      setNewMessage('');
      await loadTicket();
    } catch (err: any) {
      console.error('Error sending message:', err);
      alert('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleCloseTicket = async () => {
    if (!confirm('Are you sure you want to close this ticket?')) return;

    try {
      await ApiService.post(`/support-tickets/${params.id}/close/`, {});
      await loadTicket();
    } catch (err: any) {
      console.error('Error closing ticket:', err);
      alert('Failed to close ticket');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="p-6 max-w-7xl mx-auto text-center py-16">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ticket Not Found</h2>
        <p className="text-gray-600 mb-6">The ticket you're looking for doesn't exist or has been deleted.</p>
        <Link
          href="/dashboard/client/support"
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          ← Back to Support
        </Link>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-5 h-5 text-blue-600" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'closed':
        return <XCircle className="w-5 h-5 text-gray-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto p-6">
          <Link
            href="/dashboard/client/support"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Support
          </Link>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {getStatusIcon(ticket.status)}
                <h1 className="text-2xl font-bold text-gray-900">{ticket.subject}</h1>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
                <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                  #{ticket.ticket_number}
                </span>
                <span className="capitalize">{ticket.category.replace(/_/g, ' ')}</span>
                <span>•</span>
                <span>Created {new Date(ticket.created_at).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(ticket.status)}`}>
                  {formatStatus(ticket.status)}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority.toUpperCase()}
                </span>
              </div>
            </div>

            {ticket.status !== 'closed' && (
              <button
                onClick={handleCloseTicket}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Close Ticket
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {/* Initial Description */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">You</span>
                      <span className="text-xs text-gray-500">
                        {new Date(ticket.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-6 space-y-6 max-h-[600px] overflow-y-auto">
                {ticket.messages && ticket.messages.length > 0 ? (
                  ticket.messages.map((message) => {
                    const isSupport = message.sender.role === 'admin';

                    return (
                      <div key={message.id} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isSupport ? 'bg-blue-100' : 'bg-purple-100'
                          }`}>
                            {isSupport ? (
                              <Bot className="w-5 h-5 text-blue-600" />
                            ) : (
                              <User className="w-5 h-5 text-purple-600" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-gray-900">
                              {isSupport ? 'Support Team' : 'You'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(message.created_at).toLocaleString()}
                            </span>
                          </div>
                          <div className={`rounded-lg p-4 ${
                            isSupport ? 'bg-blue-50' : 'bg-gray-50'
                          }`}>
                            <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No messages yet. Our support team will respond soon!</p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              {ticket.status !== 'closed' && (
                <div className="p-6 border-t border-gray-200">
                  <div className="flex gap-3">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Type your message..."
                      rows={3}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || sending}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 self-end"
                    >
                      <Send className="w-4 h-4" />
                      {sending ? 'Sending...' : 'Send'}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Press Enter to send, Shift+Enter for new line
                  </p>
                </div>
              )}

              {ticket.status === 'closed' && (
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-2 text-gray-700">
                    <XCircle className="w-5 h-5" />
                    <span className="font-medium">
                      This ticket was closed on {new Date(ticket.closed_at || ticket.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Ticket Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase mb-3">Ticket Details</h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(ticket.status)}`}>
                      {formatStatus(ticket.status)}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Priority</p>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Category</p>
                    <p className="text-sm text-gray-900 capitalize">{ticket.category.replace(/_/g, ' ')}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Created</p>
                    <p className="text-sm text-gray-900">{new Date(ticket.created_at).toLocaleString()}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Last Updated</p>
                    <p className="text-sm text-gray-900">{new Date(ticket.updated_at).toLocaleString()}</p>
                  </div>

                  {ticket.closed_at && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Closed</p>
                      <p className="text-sm text-gray-900">{new Date(ticket.closed_at).toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 uppercase mb-3">Need More Help?</h3>
                <Link
                  href="/dashboard/client/support"
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  Create another ticket →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
