'use client';

import { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/marketing/navigation';
import Footer from '@/components/marketing/footer';
import ImageCarousel from '@/components/image-carousel';
import MasonryParallaxGrid from '@/components/masonry-parallax-grid';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Courses Section Component
function CoursesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const courses = [
    {
      id: 1,
      title: 'Modern Web Design',
      description: 'Master the art of creating stunning, responsive websites that captivate and convert.',
      instructor: 'Sarah Mitchell',
      country: 'United States',
      image: '/images/hero/dashboard.png',
      glowColor: 'rgba(168, 85, 247, 0.4)',
    },
    {
      id: 2,
      title: 'Full-Stack Development',
      description: 'Build scalable web applications from front-end to back-end with cutting-edge technology.',
      instructor: 'Alex Rivera',
      country: 'Spain',
      image: '/images/hero/app.png',
      glowColor: 'rgba(59, 130, 246, 0.4)',
    },
    {
      id: 3,
      title: 'Brand Identity Design',
      description: 'Create memorable brand experiences that tell compelling stories and stand out.',
      instructor: 'Emma Chen',
      country: 'Singapore',
      image: '/images/hero/furniture.png',
      glowColor: 'rgba(249, 115, 22, 0.4)',
    },
    {
      id: 4,
      title: 'AI Automation Mastery',
      description: 'Harness the power of AI to streamline workflows and boost productivity exponentially.',
      instructor: 'Marcus Williams',
      country: 'United Kingdom',
      image: '/images/hero/modernhouse.png',
      glowColor: 'rgba(34, 197, 94, 0.4)',
    },
    {
      id: 5,
      title: 'Advanced Animation',
      description: 'Bring your designs to life with sophisticated animations and micro-interactions.',
      instructor: 'Lucia Santos',
      country: 'Brazil',
      image: '/images/hero/travel.png',
      glowColor: 'rgba(236, 72, 153, 0.4)',
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative py-32 px-6 sm:px-8 lg:px-12 bg-black overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header with Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6"
              style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                letterSpacing: '-0.02em',
              }}
            >
              Get help from our{' '}
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                courses
              </span>
            </h2>
            <p
              className="text-lg sm:text-xl text-gray-400 leading-relaxed"
              style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              Learn directly from Montrose experts who teach design, web development, branding, and automation — crafted to turn your skills into real-world success.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
              style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              Get Matched
            </Link>
            <Link
              href="/courses"
              className="px-6 py-3 bg-gray-800 text-white rounded-full font-semibold hover:bg-gray-700 transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              }}
            >
              View All Courses
            </Link>
          </div>
        </div>

        {/* Horizontal Scrolling Gallery */}
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/30 group"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/30 group"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative flex-shrink-0 w-[340px] sm:w-[380px] snap-start"
              >
                <div className="relative h-full rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer">
                  {/* Card Image */}
                  <div className="relative h-72 overflow-hidden bg-gray-900">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                  </div>

                  {/* Card Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                    <h3
                      className="text-2xl font-bold text-white transition-colors duration-300"
                      style={{
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                      }}
                    >
                      {course.title}
                    </h3>
                    <p
                      className="text-sm text-gray-300 leading-relaxed"
                      style={{
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                      }}
                    >
                      {course.description}
                    </p>

                    {/* Instructor Info */}
                    <div
                      className="flex items-center gap-2 pt-2 text-sm text-gray-400"
                      style={{
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                      }}
                    >
                      <span className="font-medium text-white">{course.instructor}</span>
                      <span>/</span>
                      <span>{course.country}</span>
                    </div>
                  </div>

                  {/* Hover Glow Border */}
                  <div
                    className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/30 transition-all duration-500 pointer-events-none"
                  />
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      boxShadow: `0 0 40px ${course.glowColor}`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Service Accordion Component
function ServiceAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const services = [
    {
      title: 'AI',
      description: 'Generate site layouts and advanced components in seconds with AI, so you can skip the blank canvas and start designing with confidence.',
      glowColor: 'rgba(168, 85, 247, 0.3)',
    },
    {
      title: 'Design',
      description: 'Stunning, responsive digital experiences that convert visitors into customers. Beautiful interfaces crafted with precision and purpose.',
      glowColor: 'rgba(59, 130, 246, 0.3)',
    },
    {
      title: 'CMS',
      description: 'Complete brand identity that tells your story and stands out from the competition. Build your content empire with powerful tools.',
      glowColor: 'rgba(249, 115, 22, 0.3)',
    },
    {
      title: 'Collaborate',
      description: 'Intelligent solutions that streamline workflows and boost productivity. Work together seamlessly with your team in real-time.',
      glowColor: 'rgba(34, 197, 94, 0.3)',
    },
  ];

  return (
    <div className="space-y-0">
      {services.map((service, index) => {
        const isActive = activeIndex === index;

        return (
          <div
            key={index}
            className="group relative border-b border-white/5 last:border-b-0"
          >
            {/* Service Title - Always Visible */}
            <button
              onClick={() => setActiveIndex(isActive ? null : index)}
              className="w-full text-left py-8 transition-all duration-300 focus:outline-none"
            >
              <h3
                className={`text-3xl sm:text-4xl font-bold tracking-tight transition-all duration-500 ${
                  isActive
                    ? 'text-white translate-x-0'
                    : 'text-gray-500 hover:text-gray-300 hover:translate-x-1'
                }`}
                style={{
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  letterSpacing: '-0.02em',
                }}
              >
                {service.title}
              </h3>
            </button>

            {/* Glowing Divider - Shows when active */}
            <div
              className={`h-[1px] transition-all duration-500 ${
                isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
              style={{
                background: `linear-gradient(90deg, ${service.glowColor}, transparent)`,
                boxShadow: isActive ? `0 0 20px ${service.glowColor}` : 'none',
                transformOrigin: 'left',
              }}
            />

            {/* Expanded Content */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div
                className={`pt-8 pb-12 transition-all duration-500 ${
                  isActive ? 'translate-y-0' : '-translate-y-4'
                }`}
              >
                <p
                  className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6 max-w-2xl"
                  style={{
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    lineHeight: '1.7',
                  }}
                >
                  {service.description}
                </p>

                {/* Learn More Link */}
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-all duration-300 group/link text-base font-medium"
                >
                  <span>Learn more</span>
                  <svg
                    className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [cursorGlow, setCursorGlow] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse position for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setCursorGlow({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Parallax transform values
  const parallaxX = (mousePosition.x - window.innerWidth / 2) * 0.01;
  const parallaxY = (mousePosition.y - window.innerHeight / 2) * 0.01;

  // Images are now hardcoded in the ImageCarousel component
  // for precise layout control

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black overflow-hidden">
      {/* Custom Cursor Glow */}
      <div
        className="fixed w-80 h-80 pointer-events-none z-0 opacity-30"
        style={{
          left: `${cursorGlow.x - 160}px`,
          top: `${cursorGlow.y - 160}px`,
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)',
          filter: 'blur(40px)',
          transition: 'all 0.2s ease-out',
        }}
      />

      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
        {/* Animated Particle Field Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)`,
              }}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          {/* Main Headline */}
          <div className="space-y-8 mb-12">
            <h1
              className="text-6xl sm:text-7xl lg:text-8xl font-black leading-tight tracking-tighter text-white"
              style={{
                transform: `translate(${parallaxX * 0.2}px, ${parallaxY * 0.2}px)`,
                transition: 'transform 0.2s ease-out',
                textShadow: '0 0 40px rgba(255, 255, 255, 0.1)',
              }}
            >
              DESIGN THAT
              <br />
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                CONNECTS
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto opacity-90">
              Building brands that move, inspire & convert. We craft digital experiences that resonate with your audience and drive real results.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              href="/auth/register"
              className="group relative px-8 py-4 rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/20"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start a Project
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link
              href="/auth/register"
              className="group px-8 py-4 rounded-lg font-semibold text-white border border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/5"
            >
              Join Courses
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm animate-pulse">
            <span>Scroll to explore</span>
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Framer-style Masonry Parallax Grid */}
      <section className="relative py-20 bg-black">
        <MasonryParallaxGrid
          parallaxSpeeds={[0.3, 0.5, 0.7]}
          autoScroll={false}
          gap="1rem"
          cardRadius={10}
          className="min-h-[600px]"
        />
      </section>

      {/* About Preview Section - Reimagined Premium Introduction */}
      <section className="relative py-40 sm:py-48 lg:py-56 px-6 sm:px-8 lg:px-12 overflow-hidden bg-black">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient Orbs */}
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-glow"
            style={{ animationDuration: '8s' }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse-glow"
            style={{ animationDuration: '6s', animationDelay: '2s' }}
          />

          {/* Subtle Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="space-y-12">
            {/* "We are" Label - Fade in first */}
            <div className="overflow-hidden">
              <p
                className="text-lg sm:text-xl text-gray-500 font-medium tracking-wider uppercase animate-fade-in-up"
                style={{
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  animationDelay: '0.2s',
                  opacity: 0,
                  animationFillMode: 'forwards',
                }}
              >
                We are
              </p>
            </div>

            {/* MONTROSE - Dynamic appearance with scale and glow */}
            <div className="overflow-hidden">
              <h2
                className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter leading-none animate-scale-in"
                style={{
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  background: 'linear-gradient(135deg, #ffffff 0%, #e5e5e5 50%, #ffffff 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 80px rgba(255,255,255,0.1)',
                  animationDelay: '0.4s',
                  opacity: 0,
                  animationFillMode: 'forwards',
                }}
              >
                MONTROSE
              </h2>
            </div>

            {/* Glowing Divider */}
            <div className="flex justify-center py-4">
              <div
                className="h-[1px] w-32 animate-expand-width"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.6), rgba(239, 68, 68, 0.6), transparent)',
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
                  animationDelay: '0.8s',
                  opacity: 0,
                  animationFillMode: 'forwards',
                }}
              />
            </div>

            {/* Expanded Premium Copy - Staggered fade-in */}
            <div className="max-w-4xl space-y-6">
              <p
                className="text-xl sm:text-2xl lg:text-3xl text-white leading-relaxed font-light animate-fade-in-up"
                style={{
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  lineHeight: '1.6',
                  animationDelay: '1s',
                  opacity: 0,
                  animationFillMode: 'forwards',
                }}
              >
                A multidisciplinary collective where creativity meets technology. We craft digital experiences that don't just exist—they resonate, inspire, and transform.
              </p>

              <p
                className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed font-light animate-fade-in-up"
                style={{
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  lineHeight: '1.7',
                  animationDelay: '1.2s',
                  opacity: 0,
                  animationFillMode: 'forwards',
                }}
              >
                From visionary startups to established enterprises, we partner with ambitious brands ready to break boundaries. Our philosophy is simple: exceptional design paired with flawless execution creates unforgettable impact.
              </p>

              <p
                className="text-lg sm:text-xl text-gray-400 leading-relaxed font-light animate-fade-in-up"
                style={{
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  lineHeight: '1.7',
                  animationDelay: '1.4s',
                  opacity: 0,
                  animationFillMode: 'forwards',
                }}
              >
                We don't follow trends—we set them. Every project is an opportunity to push creative limits, challenge conventions, and deliver solutions that stand the test of time.
              </p>
            </div>

            {/* Premium CTA Button - Animated */}
            <div
              className="pt-8 animate-fade-in-up"
              style={{
                animationDelay: '1.6s',
                opacity: 0,
                animationFillMode: 'forwards',
              }}
            >
              <Link
                href="/services"
                className="group relative inline-flex items-center gap-3 px-10 py-5 overflow-hidden rounded-full transition-all duration-500 hover:scale-105"
              >
                {/* Animated Gradient Border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-red-600 to-purple-600 opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                <div className="absolute inset-[1px] rounded-full bg-black" />

                {/* Button Content */}
                <span
                  className="relative text-lg font-semibold text-white z-10"
                  style={{
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  }}
                >
                  Explore our services
                </span>
                <svg
                  className="relative w-5 h-5 text-white group-hover:translate-x-2 transition-transform duration-500 z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                  background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Highlights - Framer Sidebar Style */}
      <section className="relative py-32 px-6 sm:px-8 lg:px-12 bg-black">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="mb-20">
            <h2 className="text-5xl sm:text-6xl font-black text-white mb-4">
              What We
              <br />
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                OFFER
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl">
              Comprehensive solutions crafted to elevate your brand and drive growth
            </p>
          </div>

          {/* Accordion Services */}
          <ServiceAccordion />

          {/* View All Services Link */}
          <div className="mt-16 pt-8 border-t border-white/5">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors duration-300 group text-lg"
            >
              <span>View all services</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <CoursesSection />

      {/* CTA Section */}
      <section className="relative py-32 px-6 sm:px-8 lg:px-12 overflow-hidden bg-black">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="relative max-w-3xl mx-auto text-center z-10">
          <div
            className="p-12 rounded-2xl transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 60px rgba(255,255,255,0.05)',
            }}
          >
            <h2 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">
              Let's build something
              <br />
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                EXTRAORDINARY
              </span>
            </h2>

            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Ready to transform your vision into reality? Let's collaborate and create something remarkable together.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/auth/register"
                className="group px-8 py-4 bg-gradient-to-r from-white/20 to-white/10 rounded-lg font-semibold text-white border border-white/30 hover:border-white/60 transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 text-center"
              >
                Start a Project
              </Link>

              <Link
                href="/pricing"
                className="group px-8 py-4 bg-transparent rounded-lg font-semibold text-white border border-white/20 hover:border-white/40 transition-all duration-300 text-center"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.2);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes expand-width {
          from {
            opacity: 0;
            width: 0;
          }
          to {
            opacity: 1;
            width: 8rem;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 1s ease-out;
        }

        .animate-expand-width {
          animation: expand-width 1s ease-out;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <Footer />
    </div>
  );
}
