'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ApiService from '@/lib/api';
import Link from 'next/link';
import { GraduationCap, Lock, Play, Clock, CheckCircle, TrendingUp, BookOpen } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  required_tier: string;
  duration_hours: number;
  total_lessons: number;
  difficulty_level: string;
  tags: string[];
  is_accessible: boolean;
  is_published: boolean;
}

interface CourseProgress {
  id: string;
  course: string;
  completion_percentage: number;
  current_lesson: string | null;
  completed_lessons: string[];
  started_at: string;
  completed_at: string | null;
}

export default function CoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [progress, setProgress] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterTier, setFilterTier] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [coursesData, progressData] = await Promise.all([
          ApiService.get('/courses/'),
          ApiService.get('/course-progress/')
        ]);

        setCourses(Array.isArray(coursesData) ? coursesData : []);
        setProgress(Array.isArray(progressData) ? progressData : []);
      } catch (err: any) {
        setError(err.message || 'Failed to load courses');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const getCourseProgress = (courseId: string) => {
    return progress.find(p => p.course === courseId);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'free':
        return 'bg-gray-100 text-gray-700';
      case 'starter':
        return 'bg-blue-100 text-blue-700';
      case 'pro':
        return 'bg-purple-100 text-purple-700';
      case 'premium':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600';
      case 'intermediate':
        return 'text-yellow-600';
      case 'advanced':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const filteredCourses = courses.filter(course => {
    if (filterTier !== 'all' && course.required_tier !== filterTier) return false;
    if (filterDifficulty !== 'all' && course.difficulty_level !== filterDifficulty) return false;
    return true;
  });

  const enrolledCourses = courses.filter(c => progress.some(p => p.course === c.id));
  const completedCourses = progress.filter(p => p.completion_percentage === 100).length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
        <p className="text-gray-600 mt-2">Learn social media marketing and grow your skills</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <p className="text-sm text-gray-600">Enrolled</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <p className="text-sm text-gray-600">In Progress</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {progress.filter(p => p.completion_percentage > 0 && p.completion_percentage < 100).length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{completedCourses}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tier</label>
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Tiers</option>
              <option value="free">Free</option>
              <option value="starter">Starter</option>
              <option value="pro">Pro</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const courseProgress = getCourseProgress(course.id);
            const isLocked = !course.is_accessible;

            return (
              <Link
                key={course.id}
                href={isLocked ? '#' : `/dashboard/client/courses/${course.id}`}
                className={`block ${isLocked ? 'cursor-not-allowed' : ''}`}
              >
                <div className={`bg-white rounded-lg shadow hover:shadow-xl transition-all border border-transparent ${
                  !isLocked && 'hover:border-purple-200'
                } relative overflow-hidden`}>
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                    {course.thumbnail ? (
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                    ) : (
                      <GraduationCap className="w-16 h-16 text-white opacity-50" />
                    )}
                    {isLocked && (
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                        <div className="text-center">
                          <Lock className="w-12 h-12 text-white mx-auto mb-2" />
                          <p className="text-white text-sm font-medium">Upgrade to unlock</p>
                        </div>
                      </div>
                    )}
                    {courseProgress && courseProgress.completion_percentage > 0 && !isLocked && (
                      <div className="absolute top-2 right-2 bg-white rounded-full px-3 py-1 text-xs font-bold text-purple-600">
                        {courseProgress.completion_percentage}%
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTierColor(course.required_tier)}`}>
                        {course.required_tier.toUpperCase()}
                      </span>
                      <span className={`text-xs font-medium ${getDifficultyColor(course.difficulty_level)}`}>
                        {course.difficulty_level}
                      </span>
                    </div>

                    <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration_hours}h</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Play className="w-4 h-4" />
                        <span>{course.total_lessons} lessons</span>
                      </div>
                    </div>

                    {course.tags && course.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {course.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {courseProgress && !isLocked && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{courseProgress.completion_percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full transition-all"
                            style={{ width: `${courseProgress.completion_percentage}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {isLocked ? (
                      <Link
                        href="/dashboard/client/billing"
                        className="block w-full text-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all text-sm font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Upgrade to {course.required_tier}
                      </Link>
                    ) : courseProgress ? (
                      <div className="text-purple-600 font-medium text-sm flex items-center gap-1">
                        Continue Learning
                        <Play className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="text-blue-600 font-medium text-sm">
                        Start Course →
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No courses found matching your filters</p>
        </div>
      )}
    </div>
  );
}
