'use client';

import Navigation from '@/components/marketing/navigation';
import Footer from '@/components/marketing/footer';
import InteractiveGlowBackground from '@/components/interactive-glow-background';
import Link from 'next/link';

export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      title: 'Modern Web Design Masterclass',
      description: 'Master the art of creating stunning, responsive websites that captivate and convert. Learn from industry professionals.',
      instructor: 'Sarah Mitchell',
      country: 'United States',
      image: '/images/hero/dashboard.png',
      price: '$499',
      duration: '12 weeks',
      level: 'Beginner to Advanced',
      students: '2,450+',
    },
    {
      id: 2,
      title: 'Full-Stack Development Bootcamp',
      description: 'Build scalable web applications from front-end to back-end with cutting-edge technologies and best practices.',
      instructor: 'Alex Rivera',
      country: 'Spain',
      image: '/images/hero/app.png',
      price: '$799',
      duration: '16 weeks',
      level: 'Intermediate',
      students: '1,890+',
    },
    {
      id: 3,
      title: 'Brand Identity & Design',
      description: 'Create memorable brand experiences that tell compelling stories and stand out in crowded markets.',
      instructor: 'Emma Chen',
      country: 'Singapore',
      image: '/images/hero/furniture.png',
      price: '$399',
      duration: '8 weeks',
      level: 'Beginner',
      students: '3,200+',
    },
    {
      id: 4,
      title: 'AI Automation Mastery',
      description: 'Harness the power of AI to streamline workflows and boost productivity exponentially with modern tools.',
      instructor: 'Marcus Williams',
      country: 'United Kingdom',
      image: '/images/hero/modernhouse.png',
      price: '$599',
      duration: '10 weeks',
      level: 'Advanced',
      students: '1,560+',
    },
    {
      id: 5,
      title: 'Advanced Animation Techniques',
      description: 'Bring your designs to life with sophisticated animations, micro-interactions, and motion design principles.',
      instructor: 'Lucia Santos',
      country: 'Brazil',
      image: '/images/hero/travel.png',
      price: '$449',
      duration: '6 weeks',
      level: 'Intermediate',
      students: '2,100+',
    },
    {
      id: 6,
      title: 'Digital Marketing Strategy',
      description: 'Learn proven strategies to grow your audience, increase engagement, and drive conversions across all platforms.',
      instructor: 'David Park',
      country: 'South Korea',
      image: '/images/hero/dashboard.png',
      price: '$549',
      duration: '10 weeks',
      level: 'All Levels',
      students: '4,200+',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <InteractiveGlowBackground />

      <div className="relative" style={{ zIndex: 1 }}>
        <Navigation />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20">
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
            <div className="text-center max-w-4xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full border border-white/20">
                <span className="text-sm font-semibold text-white">
                  Learn From Experts
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-tight tracking-tighter">
                <span className="text-white block mb-2">
                  MASTER YOUR
                </span>
                <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent block">
                  CRAFT
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                Learn directly from Montrose experts who teach design, web development, branding, and automation — crafted to turn your skills into real-world success.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  Browse Courses
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-lg border border-white/20 hover:border-white/40 transition-colors duration-300"
                >
                  Get Matched
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { value: '15K+', label: 'Active Students' },
                { value: '50+', label: 'Expert Instructors' },
                { value: '100+', label: 'Courses Available' },
                { value: '4.9/5', label: 'Average Rating' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
                Popular{' '}
                <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  Courses
                </span>
              </h2>
              <p className="text-xl text-gray-400">
                Transform your skills with our comprehensive learning programs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-semibold">
                      {course.level}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {course.title}
                    </h3>

                    <p className="text-sm text-gray-400 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="font-medium text-white">{course.instructor}</span>
                      <span>/</span>
                      <span>{course.country}</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-400">{course.duration}</div>
                        <div className="text-xs text-gray-500">{course.students} students</div>
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {course.price}
                      </div>
                    </div>

                    <Link
                      href="/auth/register"
                      className="block w-full py-3 bg-white/10 hover:bg-white/20 text-white text-center font-semibold rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
                Why Choose{' '}
                <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  Montrose
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Expert Instructors',
                  description: 'Learn from industry professionals with years of real-world experience',
                  icon: '🎓',
                },
                {
                  title: 'Lifetime Access',
                  description: 'Get unlimited access to course materials, forever',
                  icon: '♾️',
                },
                {
                  title: 'Certificate',
                  description: 'Earn a professional certificate upon completion',
                  icon: '🏆',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center hover:border-white/30 transition-all duration-300"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="relative rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div className="text-center py-20 px-6">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                  Start Learning
                  <br />
                  <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                    TODAY
                  </span>
                </h2>
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                  Join thousands of students already mastering their craft with Montrose courses
                </p>
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  Browse All Courses
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
