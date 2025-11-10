'use client';

import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import Link from 'next/link';
import {
  HelpCircle, Plus, Search, MessageSquare, Clock, CheckCircle,
  XCircle, AlertCircle, Send, Phone, Video, MoreVertical,
  RefreshCw, Filter
} from 'lucide-react';

interface SupportTicket {
  id: string;
  ticket_number: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  created_at: string;
  updated_at: string;
  message_count: number;
}

interface Message {
  id: string;
  sender: string;
  sender_name: string;
  receiver: string;
  receiver_name: string;
  content: string;
  read: boolean;
  timestamp: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'offline' | 'away';
}

export default function SupportPage() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<SupportTicket[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'messages'>('overview');

  // Ticket states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    category: 'general',
    priority: 'medium',
    description: ''
  });

  // Message states
  const [sending, setSending] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [messageSearchTerm, setMessageSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagePollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    loadAllData();

    // Poll messages every 30 seconds when on messages tab
    if (activeTab === 'messages') {
      messagePollingRef.current = setInterval(fetchMessages, 30000);
    }

    return () => {
      if (messagePollingRef.current) {
        clearInterval(messagePollingRef.current);
      }
    };
  }, [activeTab]);

  useEffect(() => {
    filterTickets();
  }, [tickets, searchQuery, filterStatus, filterCategory]);

  useEffect(() => {
    if (activeTab === 'messages') {
      scrollToBottom();
    }
  }, [messages, activeTab]);

  const loadAllData = async () => {
    try {
      setLoading(true);
      await Promise.all([loadTickets(), fetchMessages(), fetchTeamMembers()]);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadTickets = async () => {
    try {
      const response = await ApiService.get('/support-tickets/');
      setTickets(Array.isArray(response) ? response : []);
    } catch (err: any) {
      console.error('Error loading tickets:', err);
    }
  };

  const fetchMessages = async () => {
    try {
      const data = await ApiService.getMessages();
      let messagesArray: Message[] = [];
      if (Array.isArray(data)) {
        messagesArray = data;
      } else if (data && typeof data === 'object' && 'results' in data) {
        messagesArray = (data as any).results || [];
      }
      messagesArray.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      setMessages(messagesArray);

      // Mark unread messages as read
      const unreadMessages = messagesArray.filter(msg => !msg.read && msg.receiver === user?.id);
      for (const msg of unreadMessages) {
        try {
          await ApiService.markMessageRead(msg.id);
        } catch (error) {
          console.error('Failed to mark message as read:', error);
        }
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      setTeamMembers([
        { id: 'admin-1', name: 'Sarah Johnson', role: 'Account Manager', status: 'online' },
        { id: 'admin-2', name: 'Mike Wilson', role: 'Content Strategist', status: 'away' },
        { id: 'admin-3', name: 'Emma Davis', role: 'Social Media Specialist', status: 'online' },
      ]);
    } catch (error) {
      console.error('Failed to fetch team members:', error);
    }
  };

  const filterTickets = () => {
    let filtered = tickets;

    if (searchQuery) {
      filtered = filtered.filter(ticket =>
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.ticket_number.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === filterStatus);
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(ticket => ticket.category === filterCategory);
    }

    setFilteredTickets(filtered);
  };

  const handleCreateTicket = async () => {
    try {
      setCreating(true);
      await ApiService.post('/support-tickets/', formData);
      await loadTickets();
      setShowCreateModal(false);
      setFormData({ subject: '', category: 'general', priority: 'medium', description: '' });
    } catch (err: any) {
      console.error('Error creating ticket:', err);
      alert('Failed to create ticket');
    } finally {
      setCreating(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      setSending(true);
      await ApiService.sendMessage('admin', newMessage.trim());
      setNewMessage('');
      await fetchMessages();
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
        return <HelpCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;

    return date.toLocaleDateString();
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2);
  };

  const getStatusIndicatorColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const filteredMessages = messages.filter(msg =>
    msg.content.toLowerCase().includes(messageSearchTerm.toLowerCase()) ||
    msg.sender_name.toLowerCase().includes(messageSearchTerm.toLowerCase())
  );

  const statusCounts = {
    open: tickets.filter(t => t.status === 'open').length,
    in_progress: tickets.filter(t => t.status === 'in_progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    closed: tickets.filter(t => t.status === 'closed').length,
  };

  const unreadMessages = messages.filter(m => !m.read && m.receiver === user?.id).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
          <p className="text-gray-600 mt-2">Get help from our support team via tickets or live chat</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          New Ticket
        </button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4 text-blue-600" />
            <p className="text-sm text-gray-600">Open</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{statusCounts.open}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-yellow-600" />
            <p className="text-sm text-gray-600">In Progress</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{statusCounts.in_progress}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <p className="text-sm text-gray-600">Resolved</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{statusCounts.resolved}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center gap-2 mb-1">
            <XCircle className="w-4 h-4 text-gray-600" />
            <p className="text-sm text-gray-600">Closed</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{statusCounts.closed}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-4 shadow text-white">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-4 h-4" />
            <p className="text-sm text-purple-100">Messages</p>
          </div>
          <p className="text-2xl font-bold">{messages.length}</p>
          {unreadMessages > 0 && (
            <p className="text-xs mt-1 text-purple-100">{unreadMessages} unread</p>
          )}
        </div>
      </div>

      {/* Team Status Bar */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-purple-900">Your Support Team:</span>
            </div>
            <div className="flex items-center gap-3">
              {teamMembers.slice(0, 3).map((member) => (
                <div key={member.id} className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {getInitials(member.name)}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusIndicatorColor(member.status)} rounded-full border-2 border-white`}></div>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-purple-900">{member.name}</p>
                    <p className="text-xs text-purple-700">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
              {teamMembers.filter(m => m.status === 'online').length} online
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'tickets'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              All Tickets ({tickets.length})
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'messages'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Live Chat
              {unreadMessages > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                  {unreadMessages}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <div className="border border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <HelpCircle className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">Create Support Ticket</h4>
                      <p className="text-sm text-gray-600 mb-4">Submit a ticket for non-urgent issues and get a detailed response</p>
                      <button
                        onClick={() => setShowCreateModal(true)}
                        className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1"
                      >
                        Create Ticket <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <MessageSquare className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">Live Chat</h4>
                      <p className="text-sm text-gray-600 mb-4">Chat directly with our team for immediate assistance</p>
                      <button
                        onClick={() => setActiveTab('messages')}
                        className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1"
                      >
                        Start Chatting <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Tickets */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Tickets</h3>
                {tickets.slice(0, 3).length > 0 ? (
                  <div className="space-y-3">
                    {tickets.slice(0, 3).map((ticket) => (
                      <Link
                        key={ticket.id}
                        href={`/dashboard/client/support/${ticket.id}`}
                        className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(ticket.status)}
                            <div>
                              <p className="font-medium text-gray-900">{ticket.subject}</p>
                              <p className="text-sm text-gray-600">#{ticket.ticket_number}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(ticket.status)}`}>
                              {formatStatus(ticket.status)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">No tickets yet</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tickets Tab */}
          {activeTab === 'tickets' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search tickets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">All Statuses</option>
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    <option value="general">General</option>
                    <option value="billing">Billing</option>
                    <option value="technical">Technical</option>
                    <option value="account">Account</option>
                    <option value="feature_request">Feature Request</option>
                  </select>
                </div>
              </div>

              {/* Tickets List */}
              {filteredTickets.length > 0 ? (
                <div className="space-y-4">
                  {filteredTickets.map((ticket) => (
                    <Link
                      key={ticket.id}
                      href={`/dashboard/client/support/${ticket.id}`}
                      className="block"
                    >
                      <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all border border-transparent hover:border-purple-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {getStatusIcon(ticket.status)}
                              <h3 className="font-semibold text-gray-900 text-lg">{ticket.subject}</h3>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                #{ticket.ticket_number}
                              </span>
                              <span className="capitalize">{ticket.category.replace(/_/g, ' ')}</span>
                              <span>•</span>
                              <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(ticket.status)}`}>
                                {formatStatus(ticket.status)}
                              </span>
                              <span className={`text-xs px-3 py-1 rounded-full font-medium ${getPriorityColor(ticket.priority)}`}>
                                {ticket.priority.toUpperCase()}
                              </span>
                              {ticket.message_count > 0 && (
                                <span className="text-xs flex items-center gap-1 text-gray-600">
                                  <MessageSquare className="w-3 h-3" />
                                  {ticket.message_count} messages
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="text-sm text-purple-600 font-medium ml-4">
                            View →
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No support tickets found</p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Create your first ticket →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="bg-white rounded-xl border overflow-hidden" style={{ height: '600px' }}>
              <div className="flex flex-col h-full">
                {/* Chat Header */}
                <div className="p-4 border-b bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-6 h-6 text-purple-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Team Chat</h3>
                        <p className="text-sm text-gray-600">
                          {teamMembers.filter(m => m.status === 'online').length} team members online
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={async () => {
                          setRefreshing(true);
                          await fetchMessages();
                          setRefreshing(false);
                        }}
                        disabled={refreshing}
                        className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                      >
                        <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {filteredMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <MessageSquare className="w-16 h-16 text-gray-300 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Start a conversation</h3>
                      <p className="text-gray-600 mb-6">Send a message to your support team. They're here to help!</p>
                    </div>
                  ) : (
                    filteredMessages.map((message) => {
                      const isOwnMessage = message.sender === user?.id;

                      return (
                        <div key={message.id} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                            <div className={`flex items-end gap-2 ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
                              {!isOwnMessage && (
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                  {getInitials(message.sender_name)}
                                </div>
                              )}
                              <div>
                                <div className={`px-4 py-2 rounded-lg ${isOwnMessage ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                                  {!isOwnMessage && <p className="text-xs font-medium mb-1 text-gray-600">{message.sender_name}</p>}
                                  <p className="text-sm">{message.content}</p>
                                  <p className={`text-xs mt-1 ${isOwnMessage ? 'text-purple-200' : 'text-gray-500'}`}>
                                    {formatTime(message.timestamp)}
                                    {isOwnMessage && message.read && (
                                      <CheckCircle className="w-3 h-3 inline ml-1 text-green-400" />
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t bg-white">
                  <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                    <div className="flex-1">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none"
                        rows={1}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e as any);
                          }
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!newMessage.trim() || sending}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                      {sending ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </form>
                  <p className="text-xs text-gray-500 mt-2">
                    Press Enter to send, Shift+Enter for new line
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Create Support Ticket</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Brief description of your issue"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="general">General</option>
                    <option value="billing">Billing</option>
                    <option value="technical">Technical</option>
                    <option value="account">Account</option>
                    <option value="feature_request">Feature Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority *
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide details about your issue..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTicket}
                disabled={!formData.subject || !formData.description || creating}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                {creating ? 'Creating...' : 'Create Ticket'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
