'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import type { Task } from '@/lib/types';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function ClientTasksPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await ApiService.getTasks() as Task[];
        setTasks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error loading tasks:', err);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>;
  }

  const filteredTasks = filterStatus === 'all' ? tasks : tasks.filter(t => t.status === filterStatus);
  const priorityIcon = (p: string) => p === 'high' ? '🔴' : p === 'medium' ? '🟡' : '🟢';
  const statusCounts = {
    pending: tasks.filter(t => t.status === 'pending').length,
    'in-progress': tasks.filter(t => t.status === 'in-progress').length,
    review: tasks.filter(t => t.status === 'review').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Your Tasks</h1>
        <p className="text-gray-600 mt-2">Track and manage your assigned tasks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow"><p className="text-sm text-gray-600 mb-1">Pending</p><p className="text-2xl font-bold">{statusCounts.pending}</p></div>
        <div className="bg-white rounded-lg p-4 shadow"><p className="text-sm text-gray-600 mb-1">In Progress</p><p className="text-2xl font-bold">{statusCounts['in-progress']}</p></div>
        <div className="bg-white rounded-lg p-4 shadow"><p className="text-sm text-gray-600 mb-1">In Review</p><p className="text-2xl font-bold">{statusCounts.review}</p></div>
        <div className="bg-white rounded-lg p-4 shadow"><p className="text-sm text-gray-600 mb-1">Completed</p><p className="text-2xl font-bold">{statusCounts.completed}</p></div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg">
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="review">In Review</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredTasks.length > 0 ? filteredTasks.map(task => (
          <div key={task.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow border-l-4 border-l-purple-600">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{priorityIcon(task.priority)}</span>
                  <h3 className="font-semibold text-gray-900 text-lg">{task.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                <p className="text-xs text-gray-500">Due: {new Date(task.due_date).toLocaleDateString()}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-4 ${
                task.status === 'completed' ? 'bg-green-100 text-green-800' :
                task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                task.status === 'review' ? 'bg-purple-100 text-purple-800' :
                'bg-gray-100 text-gray-800'
              }`}>{task.status.replace('-', ' ')}</span>
            </div>
          </div>
        )) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No tasks assigned</p>
          </div>
        )}
      </div>
    </div>
  );
}
