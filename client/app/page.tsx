'use client';

import { useState, useCallback, memo, useEffect, useRef } from 'react';
import Navigation from '@/components/marketing/navigation';
import Footer from '@/components/marketing/footer';
import MasonryParallaxGrid from '@/components/masonry-parallax-grid';
import InteractiveGlowBackground from '@/components/interactive-glow-background';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

// Optimized Courses Section Component
const CoursesSection = memo(() => {
  const courses = [
    {
      id: 1,
      title: 'Modern Web Design',
      description: 'Master the art of creating stunning, responsive websites that captivate and convert.',
      instructor: 'Sarah Mitchell',
      country: 'United States',
      image: '/images/hero/ChatGPT Image Nov 10, 2025, 10_32_20 PM.png',
      glowColor: 'rgba(168, 85, 247, 0.4)',
    },
    {
      id: 2,
      title: 'Full-Stack Development',
      description: 'Build scalable web applications from front-end to back-end with cutting-edge technology.',
      instructor: 'Alex Rivera',
      country: 'Spain',
      image: '/images/hero/ChatGPT Image Nov 10, 2025, 10_35_41 PM.png',
      glowColor: 'rgba(59, 130, 246, 0.4)',
    },
    {
      id: 3,
      title: 'Brand Identity Design',
      description: 'Create memorable brand experiences that tell compelling stories and stand out.',
      instructor: 'Emma Chen',
      country: 'Singapore',
      image: '/images/hero/ChatGPT Image Nov 10, 2025, 10_39_56 PM.png',
      glowColor: 'rgba(249, 115, 22, 0.4)',
    },
    {
      id: 4,
      title: 'AI Automation Mastery',
      description: 'Harness the power of AI to streamline workflows and boost productivity exponentially.',
      instructor: 'Marcus Williams',
      country: 'United Kingdom',
      image: '/images/hero/ChatGPT Image Nov 10, 2025, 10_43_41 PM.png',
      glowColor: 'rgba(34, 197, 94, 0.4)',
    },
    {
      id: 5,
      title: 'Advanced Animation',
      description: 'Bring your designs to life with sophisticated animations and micro-interactions.',
      instructor: 'Lucia Santos',
      country: 'Brazil',
      image: '/images/hero/ChatGPT Image Nov 10, 2025, 10_45_54 PM.png',
      glowColor: 'rgba(236, 72, 153, 0.4)',
    },
    {
      id: 6,
      title: 'Digital Marketing Excellence',
      description: 'Master the strategies and tools to grow your brand and reach your audience effectively.',
      instructor: 'David Park',
      country: 'South Korea',
      image: '/images/hero/ChatGPT Image Nov 10, 2025, 10_52_08 PM.png',
      glowColor: 'rgba(244, 63, 94, 0.4)',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = 380 + 24; // card width + gap
      container.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  }, []);

  const scroll = useCallback((direction: 'left' | 'right') => {
    let nextIndex = currentIndex;
    if (direction === 'right') {
      nextIndex = currentIndex >= courses.length - 1 ? 0 : currentIndex + 1;
    } else {
      nextIndex = currentIndex <= 0 ? courses.length - 1 : currentIndex - 1;
    }
    scrollToIndex(nextIndex);
  }, [currentIndex, courses.length, scrollToIndex]);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      scroll('right');
    }, 5000);

    return () => clearInterval(interval);
  }, [scroll]);

  return (
    <section className="relative py-32 px-6 sm:px-8 lg:px-12 overflow-hidden">

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
              Get help from our{' '}
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                courses
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed">
              Learn directly from Montrose experts who teach design, web development, branding, and automation — crafted to turn your skills into real-world success.
            </p>
          </div>

          <div className="flex gap-4 flex-shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Get Matched
            </Link>
            <Link
              href="/courses"
              className="px-6 py-3 bg-gray-800 text-white rounded-full font-semibold hover:bg-gray-700 transition-colors duration-300"
            >
              View All Courses
            </Link>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 border border-white/10 hover:border-white/30"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 border border-white/10 hover:border-white/30"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {courses.map((course) => (
              <div
                key={course.id}
                className="group relative flex-shrink-0 w-[340px] sm:w-[380px] snap-start"
              >
                <div className="relative h-full rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
                  <div className="relative h-72 overflow-hidden bg-gray-900">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                    <h3 className="text-2xl font-bold text-white transition-colors duration-300">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-sm text-gray-400">
                      <span className="font-medium text-white">{course.instructor}</span>
                      <span>/</span>
                      <span>{course.country}</span>
                    </div>
                  </div>

                  <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/30 transition-colors duration-300 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

CoursesSection.displayName = 'CoursesSection';

// Optimized Service Accordion Component
const ServiceAccordion = memo(() => {
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

  const toggleService = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="space-y-0">
      {services.map((service, index) => {
        const isActive = activeIndex === index;

        return (
          <div
            key={index}
            className="group relative border-b border-white/5 last:border-b-0"
          >
            <button
              onClick={() => toggleService(index)}
              className="w-full text-left py-8 transition-all duration-300 focus:outline-none"
            >
              <h3
                className={`text-3xl sm:text-4xl font-bold tracking-tight transition-all duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {service.title}
              </h3>
            </button>

            <div
              className={`h-[1px] transition-all duration-300 ${
                isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
              style={{
                background: `linear-gradient(90deg, ${service.glowColor}, transparent)`,
                transformOrigin: 'left',
              }}
            />

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className={`pt-8 pb-12 transition-all duration-300 ${isActive ? 'translate-y-0' : '-translate-y-4'}`}>
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6 max-w-2xl">
                  {service.description}
                </p>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors duration-300 text-base font-medium"
                >
                  <span>Learn more</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

ServiceAccordion.displayName = 'ServiceAccordion';

// About Section Component with Animated Image
const AboutSection = memo(() => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-32 md:py-40 lg:py-56 px-4 sm:px-6 lg:px-12 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            <p className="text-base sm:text-lg lg:text-xl text-gray-500 font-medium tracking-wider uppercase">
              We are
            </p>

            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #e5e5e5 50%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MONTROSE
            </h2>

            <div className="flex justify-start py-2 sm:py-4">
              <div
                className="h-[1px] w-24 sm:w-32"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.6), rgba(239, 68, 68, 0.6), transparent)',
                }}
              />
            </div>

            <div className="space-y-4 sm:space-y-6">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white leading-relaxed font-light">
                A multidisciplinary collective where creativity meets technology. We craft digital experiences that don't just exist—they resonate, inspire, and transform.
              </p>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed font-light">
                From visionary startups to established enterprises, we partner with ambitious brands ready to break boundaries. Our philosophy is simple: exceptional design paired with flawless execution creates unforgettable impact.
              </p>

              <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed font-light">
                We don't follow trends—we set them. Every project is an opportunity to push creative limits, challenge conventions, and deliver solutions that stand the test of time.
              </p>
            </div>

            <div className="pt-4 sm:pt-8">
              <Link
                href="/services"
                className="group relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 overflow-hidden rounded-full transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-red-600 to-purple-600 opacity-50 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                <div className="absolute inset-[1px] rounded-full bg-black" />

                <span className="relative text-base sm:text-lg font-semibold text-white z-10">
                  Explore our services
                </span>
                <svg className="relative w-4 h-4 sm:w-5 sm:h-5 text-white z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Side - Animated Image - Now visible on mobile */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex justify-center items-center mt-8 lg:mt-0"
          >
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-cyan-400/10 to-transparent rounded-2xl blur-2xl" />
              <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/15 via-transparent to-transparent rounded-2xl blur-xl" />

              {/* Image Container */}
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="/images/hero/okar.png"
                  alt="Montrose Analytics"
                  className="w-full h-auto object-cover"
                  style={{
                    filter: 'drop-shadow(0 0 40px rgba(59, 130, 246, 0.3))',
                  }}
                />

                {/* Reflection Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Additional Glow Accents */}
              <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-blue-400/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-20 h-20 sm:w-32 sm:h-32 bg-cyan-400/15 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

// Main HomePage Component
export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <InteractiveGlowBackground />

      <div className="relative" style={{ zIndex: 1 }}>
        <Navigation />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20">
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="space-y-8 mb-12">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-tight tracking-tighter text-white">
              DESIGN THAT
              <br />
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                CONNECTS
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
              Building brands that move, inspire & convert. We craft digital experiences that resonate with your audience and drive real results.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              href="/auth/register"
              className="group relative px-8 py-4 rounded-lg font-semibold text-white overflow-hidden transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start a Project
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>

            <Link
              href="/auth/register"
              className="px-8 py-4 rounded-lg font-semibold text-white border border-white/20 hover:border-white/40 transition-colors duration-300 hover:bg-white/5"
            >
              Join Courses
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <span>Scroll to explore</span>
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          </div>
        </section>

        {/* Masonry Grid */}
        <section className="relative py-20 bg-black">
          <MasonryParallaxGrid
            parallaxSpeeds={[0.3, 0.5, 0.7]}
            autoScroll={false}
            gap="1rem"
            cardRadius={10}
            className="min-h-[600px]"
          />
        </section>

        {/* About Section */}
        <AboutSection />

        {/* Services Section */}
        <section className="relative py-32 px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
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

            <ServiceAccordion />

            <div className="mt-16 pt-8 border-t border-white/5">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors duration-300 text-lg"
              >
                <span>View all services</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <CoursesSection />

        {/* CTA Section */}
        <section className="relative py-32 px-6 sm:px-8 lg:px-12 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-20" />
          </div>

          <div className="relative max-w-3xl mx-auto text-center z-10">
            <div
              className="p-12 rounded-2xl transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
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
                  className="px-8 py-4 bg-gradient-to-r from-white/20 to-white/10 rounded-lg font-semibold text-white border border-white/30 hover:border-white/60 transition-colors duration-300 text-center"
                >
                  Start a Project
                </Link>

                <Link
                  href="/pricing"
                  className="px-8 py-4 bg-transparent rounded-lg font-semibold text-white border border-white/20 hover:border-white/40 transition-colors duration-300 text-center"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        <style jsx>{`
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
    </div>
  );
}
