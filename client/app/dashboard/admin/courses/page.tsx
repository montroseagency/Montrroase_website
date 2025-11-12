'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import { Plus, Edit, Trash2, Eye, DollarSign, BookOpen, Users, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  is_free: boolean;
  allow_individual_purchase: boolean;
  tier: string;
  duration_weeks: number;
  is_active: boolean;
  created_at: string;
  total_modules?: number;
  total_lessons?: number;
  total_enrollments?: number;
}

export default function AdminCoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '0.00',
    is_free: false,
    allow_individual_purchase: true,
    tier: 'free',
    duration_weeks: 4,
    is_active: true,
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getCourses();
      setCourses(Array.isArray(response) ? response : []);
    } catch (err: any) {
      setError(err.message || 'Failed to load courses');
      console.error('Error loading courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        // Update existing course
        await ApiService.updateCourse(editingCourse.id, formData);
      } else {
        // Create new course
        await ApiService.createCourse(formData);
      }
      setShowCreateModal(false);
      setEditingCourse(null);
      resetForm();
      loadCourses();
    } catch (err: any) {
      alert(err.message || 'Failed to save course');
    }
  };

  const handleDelete = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      await ApiService.deleteCourse(courseId);
      loadCourses();
    } catch (err: any) {
      alert(err.message || 'Failed to delete course');
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price,
      is_free: course.is_free,
      allow_individual_purchase: course.allow_individual_purchase,
      tier: course.tier,
      duration_weeks: course.duration_weeks,
      is_active: course.is_active,
    });
    setShowCreateModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '0.00',
      is_free: false,
      allow_individual_purchase: true,
      tier: 'free',
      duration_weeks: 4,
      is_active: true,
    });
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600 mt-1">Create and manage courses for your platform</p>
        </div>
        <button
          onClick={() => {
            setEditingCourse(null);
            resetForm();
            setShowCreateModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Course
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
          <BookOpen className="w-8 h-8 text-blue-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
          <p className="text-sm text-gray-600">Total Courses</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
          <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {courses.filter(c => c.is_active).length}
          </p>
          <p className="text-sm text-gray-600">Active Courses</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
          <DollarSign className="w-8 h-8 text-purple-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {courses.filter(c => c.allow_individual_purchase).length}
          </p>
          <p className="text-sm text-gray-600">Purchasable</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
          <Users className="w-8 h-8 text-orange-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {courses.reduce((sum, c) => sum + (c.total_enrollments || 0), 0)}
          </p>
          <p className="text-sm text-gray-600">Total Enrollments</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className={`h-2 ${course.is_active ? 'bg-green-500' : 'bg-gray-400'}`} />
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  course.is_free ? 'bg-green-100 text-green-800' :
                  course.tier === 'premium' ? 'bg-purple-100 text-purple-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {course.is_free ? 'FREE' : course.tier.toUpperCase()}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-semibold text-gray-900">
                    {course.is_free ? 'Free' : `$${course.price}`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold text-gray-900">{course.duration_weeks} weeks</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Individual Purchase:</span>
                  {course.allow_individual_purchase ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600" />
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && !loading && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-4">No courses yet</p>
          <button
            onClick={() => {
              setEditingCourse(null);
              resetForm();
              setShowCreateModal(true);
            }}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Create Your First Course
          </button>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingCourse ? 'Edit Course' : 'Create New Course'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tier *
                  </label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="free">Free</option>
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (weeks) *
                  </label>
                  <input
                    type="number"
                    value={formData.duration_weeks}
                    onChange={(e) => setFormData({ ...formData, duration_weeks: parseInt(e.target.value) })}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (USD) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.is_free}
                    onChange={(e) => setFormData({ ...formData, is_free: e.target.checked })}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">This is a free course</span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.allow_individual_purchase}
                    onChange={(e) => setFormData({ ...formData, allow_individual_purchase: e.target.checked })}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">Allow individual purchase (outside subscription)</span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">Course is active and visible</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {editingCourse ? 'Update Course' : 'Create Course'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingCourse(null);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
