'use client';

import { useEffect, useState } from 'react';
import { Bell, Check, CheckCheck, Filter, Calendar, DollarSign, FileText, MessageSquare, TrendingUp, XCircle } from 'lucide-react';
import ApiService from '@/lib/api';

interface Notification {
  id: string;
  title: string;
  message: string;
  notification_type: string;
  read: boolean;
  created_at: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response: any = await ApiService.getNotifications();
      const notifs = response.results || response;
      setNotifications(Array.isArray(notifs) ? notifs : []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await ApiService.markNotificationRead(id);
      setNotifications(notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await ApiService.markAllNotificationsRead();
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'task_assigned':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'payment_due':
        return <DollarSign className="w-5 h-5 text-red-600" />;
      case 'content_approved':
        return <CheckCheck className="w-5 h-5 text-green-600" />;
      case 'message_received':
        return <MessageSquare className="w-5 h-5 text-purple-600" />;
      case 'performance_update':
        return <TrendingUp className="w-5 h-5 text-orange-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case 'task_assigned':
        return 'bg-blue-50 border-blue-200';
      case 'payment_due':
        return 'bg-red-50 border-red-200';
      case 'content_approved':
        return 'bg-green-50 border-green-200';
      case 'message_received':
        return 'bg-purple-50 border-purple-200';
      case 'performance_update':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  // Group notifications by date
  const groupedNotifications = notifications.reduce((acc, notif) => {
    const date = new Date(notif.created_at).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(notif);
    return acc;
  }, {} as Record<string, Notification[]>);

  // Filter notifications
  const filteredGrouped = Object.entries(groupedNotifications).reduce((acc, [date, notifs]) => {
    const filtered = notifs.filter(n => {
      if (filter === 'all') return true;
      if (filter === 'unread') return !n.read;
      return n.notification_type === filter;
    });
    if (filtered.length > 0) {
      acc[date] = filtered;
    }
    return acc;
  }, {} as Record<string, Notification[]>);

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-1">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <CheckCheck className="w-5 h-5" />
              <span>Mark All Read</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex items-center space-x-2 overflow-x-auto">
          <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              filter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              filter === 'unread'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </button>
          <button
            onClick={() => setFilter('payment_due')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              filter === 'payment_due'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Payments
          </button>
          <button
            onClick={() => setFilter('task_assigned')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              filter === 'task_assigned'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tasks
          </button>
          <button
            onClick={() => setFilter('message_received')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              filter === 'message_received'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Messages
          </button>
          <button
            onClick={() => setFilter('content_approved')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              filter === 'content_approved'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Content
          </button>
        </div>
      </div>

      {/* Notifications Grouped by Date */}
      <div className="space-y-6">
        {Object.entries(filteredGrouped).length > 0 ? (
          Object.entries(filteredGrouped).map(([date, notifs]) => (
            <div key={date} className="space-y-3">
              {/* Date Header */}
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-4 h-4" />
                <h2 className="font-semibold">
                  {new Date(notifs[0].created_at).toDateString() === new Date().toDateString()
                    ? 'Today'
                    : new Date(notifs[0].created_at).toDateString() === new Date(Date.now() - 86400000).toDateString()
                    ? 'Yesterday'
                    : date}
                </h2>
              </div>

              {/* Notifications */}
              <div className="space-y-2">
                {notifs.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => !notification.read && markAsRead(notification.id)}
                    className={`
                      p-4 rounded-lg border-2 transition-all cursor-pointer
                      ${notification.read ? 'bg-white border-gray-200' : `${getNotificationBgColor(notification.notification_type)} shadow-md`}
                      hover:shadow-lg
                    `}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`p-2 rounded-lg ${notification.read ? 'bg-gray-100' : 'bg-white'}`}>
                        {getNotificationIcon(notification.notification_type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className={`font-semibold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-1.5"></div>
                          )}
                        </div>
                        <p className={`text-sm mt-1 ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-gray-500">
                            {new Date(notification.created_at).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                          {notification.read && (
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              Read
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">
              {filter === 'all'
                ? "You don't have any notifications yet"
                : `No ${filter === 'unread' ? 'unread' : filter.replace('_', ' ')} notifications`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
