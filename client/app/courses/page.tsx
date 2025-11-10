'use client';

import { useState, useCallback, memo, useRef } from 'react';
import Navigation from '@/components/marketing/navigation';
import Footer from '@/components/marketing/footer';
import InteractiveGlowBackground from '@/components/interactive-glow-background';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Accordion Component for Features
const FeaturesAccordion = memo(() => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const features = [
    {
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of real-world experience in design, development, and digital marketing. Our instructors bring practical knowledge and cutting-edge techniques directly from the field.',
      glowColor: 'rgba(59, 130, 246, 0.4)',
    },
    {
      title: 'Lifetime Access',
      description: 'Get unlimited access to all course materials forever. Watch at your own pace, revisit lessons anytime, and enjoy free updates as the course content evolves with industry trends.',
      glowColor: 'rgba(168, 85, 247, 0.4)',
    },
    {
      title: 'Professional Certificate',
      description: 'Earn a professional certificate upon completion to showcase your new skills. Our certificates are recognized by industry leaders and can be shared on LinkedIn and your professional portfolio.',
      glowColor: 'rgba(34, 197, 94, 0.4)',
    },
    {
      title: 'Hands-On Projects',
      description: 'Build real-world projects that you can add to your portfolio. Every course includes practical assignments and projects that simulate actual industry challenges.',
      glowColor: 'rgba(249, 115, 22, 0.4)',
    },
    {
      title: 'Community Support',
      description: 'Join a vibrant community of learners and get help when you need it. Connect with fellow students, share your progress, and learn from each other in our exclusive community channels.',
      glowColor: 'rgba(236, 72, 153, 0.4)',
    },
  ];

  const toggleFeature = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="space-y-0">
      {features.map((feature, index) => {
        const isActive = activeIndex === index;

        return (
          <div
            key={index}
            className="group relative border-b border-white/5 last:border-b-0"
          >
            <button
              onClick={() => toggleFeature(index)}
              className="w-full text-left py-8 transition-all duration-300 focus:outline-none"
            >
              <div className="flex items-center justify-between">
                <h3
                  className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight transition-all duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                  style={{
                    textShadow: isActive ? '0 0 20px rgba(255, 255, 255, 0.1)' : 'none',
                  }}
                >
                  {feature.title}
                </h3>
                <motion.div
                  animate={{ rotate: isActive ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`text-2xl ${isActive ? 'text-white' : 'text-gray-500'}`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </div>
            </button>

            <div
              className={`h-[1px] transition-all duration-300 ${
                isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
              style={{
                background: `linear-gradient(90deg, ${feature.glowColor}, transparent)`,
                transformOrigin: 'left',
                boxShadow: isActive ? `0 0 20px ${feature.glowColor}` : 'none',
              }}
            />

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 pb-10">
                    <p
                      className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-4xl"
                      style={{
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
});

FeaturesAccordion.displayName = 'FeaturesAccordion';

// Why Choose Montrose Section with Animated Image
const WhyChooseMontrose = memo(() => {
  const imageRef = useRef(null);
  const isInView = useInView(imageRef, { once: true, amount: 0.3 });

  return (
    <section className="relative py-32 px-6 sm:px-8 lg:px-12 overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Text Content with Accordion */}
          <div>
            <div className="mb-20">
              <h2 className="text-5xl sm:text-6xl font-black text-white mb-6">
                Why Choose{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Montrose
                </span>
              </h2>
              <p className="text-gray-400 text-xl max-w-2xl">
                Comprehensive learning experience designed to transform your skills into real-world success
              </p>
            </div>

            <FeaturesAccordion />

            <div className="mt-16 pt-8 border-t border-white/5">
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 text-white hover:text-blue-400 transition-colors duration-300 text-lg group"
              >
                <span>Get started today</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Side - Animated Image */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg">
              {/* Soft Glow Effect - Blue/Purple Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-blue-500/30 rounded-2xl blur-3xl" />
              <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/20 via-blue-500/10 to-transparent rounded-2xl blur-2xl" />

              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="/images/hero/qirje.png"
                  alt="Expert Instructors at Montrose"
                  className="w-full h-auto object-cover"
                  style={{
                    filter: 'drop-shadow(0 0 40px rgba(59, 130, 246, 0.4))',
                  }}
                />

                {/* Overlay Gradient for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
              </div>

              {/* Additional Glow Accents */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

WhyChooseMontrose.displayName = 'WhyChooseMontrose';

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
        <WhyChooseMontrose />

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
