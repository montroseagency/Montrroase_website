'use client';

import { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/marketing/navigation';
import Footer from '@/components/marketing/footer';
import ImageCarousel from '@/components/image-carousel';
import MasonryParallaxGrid from '@/components/masonry-parallax-grid';
import Link from 'next/link';

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

      {/* About Preview Section - positioned after 300vh masonry grid */}
      <section className="relative py-32 px-6 sm:px-8 lg:px-12 overflow-hidden bg-black">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <h2 className="text-5xl sm:text-6xl font-black text-white leading-tight">
              We are
              <br />
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                MONTROSE
              </span>
            </h2>

            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              A multidisciplinary team blending creativity, code, and marketing to make brands unforgettable. We don't just create—we transform visions into digital experiences that captivate, engage, and convert.
            </p>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all duration-300 group"
            >
              Explore our services
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Highlights */}
      <section className="relative py-32 px-6 sm:px-8 lg:px-12 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl sm:text-6xl font-black text-white mb-16 text-center">
            What We
            <br />
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              OFFER
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🎨',
                title: 'Website Design',
                description: 'Stunning, responsive digital experiences that convert visitors into customers.',
              },
              {
                icon: '📱',
                title: 'Web Development',
                description: 'Fast, scalable, and secure websites built with cutting-edge technology.',
              },
              {
                icon: '🎯',
                title: 'Branding',
                description: 'Complete brand identity that tells your story and stands out from the competition.',
              },
              {
                icon: '⚡',
                title: 'AI Automation',
                description: 'Intelligent solutions that streamline workflows and boost productivity.',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl transition-all duration-300 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="space-y-4 relative z-10">
                  <div className="text-5xl">{service.icon}</div>
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.description}</p>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }} />

                {/* Border on hover */}
                <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/30 transition-colors duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

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
      `}</style>

      <Footer />
    </div>
  );
}
