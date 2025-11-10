'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ApiService from '@/lib/api';
import Link from 'next/link';
import {
  ArrowLeft, Play, CheckCircle, Lock, Clock, FileText,
  ChevronDown, ChevronRight, Award, Download
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  video_url: string;
  duration_minutes: number;
  order: number;
  content_text: string;
  resources: any[];
}

interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

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
}

interface CourseProgress {
  id: string;
  course: string;
  completion_percentage: number;
  current_lesson: string | null;
  completed_lessons: string[];
}

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadCourse();
  }, [params.id]);

  const loadCourse = async () => {
    try {
      setLoading(true);
      const [courseData, contentData, progressData] = await Promise.all([
        ApiService.get(`/courses/${params.id}/`),
        ApiService.get(`/courses/${params.id}/content/`).catch(() => ({ modules: [] })),
        ApiService.get('/course-progress/').then(data =>
          Array.isArray(data) ? data.find((p: any) => p.course === params.id) : null
        ).catch(() => null)
      ]);

      setCourse(courseData);
      setModules(contentData.modules || []);
      setProgress(progressData);

      // Expand first module and set first lesson by default
      if (contentData.modules && contentData.modules.length > 0) {
        setExpandedModules(new Set([contentData.modules[0].id]));
        if (contentData.modules[0].lessons && contentData.modules[0].lessons.length > 0) {
          setCurrentLesson(contentData.modules[0].lessons[0]);
        }
      }
    } catch (err: any) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    try {
      setEnrolling(true);
      await ApiService.post(`/courses/${params.id}/enroll/`, {});
      await loadCourse(); // Reload to get progress
    } catch (err: any) {
      console.error('Error enrolling:', err);
    } finally {
      setEnrolling(false);
    }
  };

  const handleMarkComplete = async (lessonId: string) => {
    try {
      const response = await ApiService.post(`/lessons/${lessonId}/mark_complete/`, {});
      setProgress(response);
    } catch (err: any) {
      console.error('Error marking complete:', err);
    }
  };

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const isLessonCompleted = (lessonId: string) => {
    return progress?.completed_lessons?.includes(lessonId) || false;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-6 max-w-7xl mx-auto text-center py-16">
        <p className="text-gray-600">Course not found</p>
        <Link href="/dashboard/client/courses" className="text-purple-600 hover:text-purple-700 mt-4 inline-block">
          ← Back to Courses
        </Link>
      </div>
    );
  }

  if (!course.is_accessible) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <Link
          href="/dashboard/client/courses"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-6">{course.description}</p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-900">
              This course requires a <strong className="capitalize">{course.required_tier}</strong> plan or higher.
            </p>
          </div>

          <Link
            href="/dashboard/client/settings/billing"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md"
          >
            Upgrade to {course.required_tier}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto p-6">
          <Link
            href="/dashboard/client/courses"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
              <p className="text-gray-600 mt-1">{course.description}</p>
            </div>

            {progress && (
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Your Progress</p>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${progress.completion_percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-900">{progress.completion_percentage}%</span>
                </div>
                {progress.completion_percentage === 100 && (
                  <div className="mt-2 flex items-center gap-1 text-green-600 text-sm">
                    <Award className="w-4 h-4" />
                    <span>Completed!</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Not Enrolled State */}
      {!progress && (
        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <Play className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to start learning?</h2>
            <p className="text-gray-600 mb-6">Enroll in this course to access all lessons and track your progress</p>
            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 transition-all shadow-md"
            >
              {enrolling ? 'Enrolling...' : 'Enroll Now'}
            </button>
          </div>
        </div>
      )}

      {/* Course Content */}
      {progress && (
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Player & Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Player */}
              {currentLesson && (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="aspect-video bg-black flex items-center justify-center">
                    {currentLesson.video_url ? (
                      <iframe
                        src={currentLesson.video_url}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    ) : (
                      <div className="text-white text-center">
                        <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Video coming soon</p>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{currentLesson.title}</h2>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <Clock className="w-4 h-4" />
                          <span>{currentLesson.duration_minutes} minutes</span>
                        </div>
                      </div>

                      {!isLessonCompleted(currentLesson.id) && (
                        <button
                          onClick={() => handleMarkComplete(currentLesson.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Mark Complete
                        </button>
                      )}
                    </div>

                    <p className="text-gray-700">{currentLesson.description}</p>

                    {currentLesson.content_text && (
                      <div className="mt-6 prose prose-sm max-w-none">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Lesson Notes</h3>
                          <div className="text-gray-700 whitespace-pre-wrap">{currentLesson.content_text}</div>
                        </div>
                      </div>
                    )}

                    {currentLesson.resources && currentLesson.resources.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Resources</h3>
                        <div className="space-y-2">
                          {currentLesson.resources.map((resource: any, index: number) => (
                            <a
                              key={index}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <Download className="w-4 h-4 text-gray-600" />
                              <span className="text-gray-900">{resource.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Curriculum Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow overflow-hidden sticky top-6">
                <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600">
                  <h3 className="text-lg font-bold text-white">Course Content</h3>
                  <p className="text-purple-100 text-sm mt-1">
                    {progress.completed_lessons.length} / {course.total_lessons} lessons completed
                  </p>
                </div>

                <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                  {modules.map((module) => (
                    <div key={module.id} className="border-b border-gray-200">
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 text-left">
                          {expandedModules.has(module.id) ? (
                            <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-600 flex-shrink-0" />
                          )}
                          <div>
                            <p className="font-semibold text-gray-900">{module.title}</p>
                            <p className="text-xs text-gray-500">{module.lessons.length} lessons</p>
                          </div>
                        </div>
                      </button>

                      {expandedModules.has(module.id) && (
                        <div className="bg-gray-50">
                          {module.lessons.map((lesson) => {
                            const isCompleted = isLessonCompleted(lesson.id);
                            const isCurrent = currentLesson?.id === lesson.id;

                            return (
                              <button
                                key={lesson.id}
                                onClick={() => setCurrentLesson(lesson)}
                                className={`w-full flex items-center gap-3 p-4 pl-12 hover:bg-gray-100 transition-colors border-l-4 ${
                                  isCurrent ? 'border-purple-600 bg-purple-50' : 'border-transparent'
                                }`}
                              >
                                <div className="flex-shrink-0">
                                  {isCompleted ? (
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                  ) : (
                                    <Play className="w-5 h-5 text-gray-400" />
                                  )}
                                </div>
                                <div className="flex-1 text-left">
                                  <p className={`text-sm font-medium ${isCurrent ? 'text-purple-900' : 'text-gray-900'}`}>
                                    {lesson.title}
                                  </p>
                                  <p className="text-xs text-gray-500">{lesson.duration_minutes} min</p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
