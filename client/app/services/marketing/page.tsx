'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/marketing/navigation';
import Footer from '@/components/marketing/footer';
import InteractiveGlowBackground from '@/components/interactive-glow-background';
import SectionHeader from '@/components/services/SectionHeader';
import FeatureGrid from '@/components/services/FeatureGrid';
import CallToAction from '@/components/services/CallToAction';
import AnimatedCounter from '@/components/services/AnimatedCounter';
import Link from 'next/link';

export default function MarketingPage() {
  const platforms = [
    {
      name: 'TikTok',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      color: 'from-pink-500 to-red-500',
    },
    {
      name: 'Instagram',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: 'from-blue-500 to-blue-700',
    },
  ];

  const analyticsFeatures = [
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Real-Time Metrics',
      description: 'Track engagement, reach, and conversions as they happen with live dashboard updates.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: 'Growth Tracking',
      description: 'Monitor follower growth, post performance, and audience demographics in one view.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'ROI Calculator',
      description: 'Measure campaign profitability with automated cost-per-acquisition and revenue tracking.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Custom Reports',
      description: 'Generate beautiful, shareable reports for clients and stakeholders in seconds.'
    },
  ];

  const aiFeatures = [
    {
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Smart Scheduling',
      description: 'AI determines the optimal posting times for maximum engagement based on your audience behavior.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
      title: 'Content Suggestions',
      description: 'Get AI-powered content ideas, caption recommendations, and hashtag strategies that work.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: 'Auto-Optimization',
      description: 'Campaigns automatically adjust budgets and targeting based on performance data in real-time.'
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, Fashion Brand',
      avatar: 'SJ',
      quote: 'Montrose transformed our social media presence. We saw a 340% increase in engagement within 3 months.',
      stats: { metric: '340%', label: 'Engagement Increase' }
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Director',
      avatar: 'MC',
      quote: 'The AI-powered insights helped us reduce our ad spend by 40% while doubling conversions. Game changer.',
      stats: { metric: '2x', label: 'Conversion Rate' }
    },
    {
      name: 'Emily Rodriguez',
      role: 'Founder, Tech Startup',
      avatar: 'ER',
      quote: 'Managing all our campaigns in one dashboard saved us 15+ hours per week. The ROI speaks for itself.',
      stats: { metric: '15h', label: 'Time Saved Weekly' }
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
            <SectionHeader
              badge="Montrose Marketing Platform"
              title="Smarter Marketing."
              highlight="Real-Time Growth."
              description="All-in-one marketing dashboard with AI-powered campaign management, real-time analytics, and intelligent optimization. Grow faster, work smarter."
              align="center"
            />

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-5xl mx-auto">
              <AnimatedCounter value={500} suffix="+" label="Active Campaigns" />
              <AnimatedCounter value={3} suffix="M+" label="Leads Generated" />
              <AnimatedCounter value={92} suffix="%" label="Avg. ROI Increase" />
              <AnimatedCounter value={24} suffix="/7" label="AI Monitoring" />
            </div>
          </div>
        </section>

        {/* Smart Campaign Management */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeader
              title="Smart Campaign"
              highlight="Management"
              description="Manage TikTok, Instagram, and Facebook from one powerful dashboard. Schedule, publish, and optimize with AI assistance."
              align="center"
            />

            <div className="grid md:grid-cols-3 gap-8">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden"
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                  {/* Icon */}
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${platform.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {platform.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4">{platform.name}</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      Full integration with advanced scheduling, analytics, and automated posting for {platform.name}.
                    </p>

                    <ul className="space-y-3">
                      {['Auto-scheduling', 'Performance tracking', 'Content library', 'Engagement automation'].map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-400">
                          <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Real-Time Analytics */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeader
              title="Real-Time"
              highlight="Analytics Panel"
              description="Live performance metrics, audience insights, and conversion tracking all in one beautiful dashboard."
              align="center"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {[
                {
                  title: 'Real-Time Metrics',
                  description: 'Track engagement, reach, and conversions as they happen with live dashboard updates.'
                },
                {
                  title: 'Growth Tracking',
                  description: 'Monitor follower growth, post performance, and audience demographics in one view.'
                },
                {
                  title: 'ROI Calculator',
                  description: 'Measure campaign profitability with automated cost-per-acquisition and revenue tracking.'
                },
                {
                  title: 'Custom Reports',
                  description: 'Generate beautiful, shareable reports for clients and stakeholders in seconds.'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: -20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 120
                  }}
                  style={{ perspective: 1500 }}
                  className="relative group"
                >
                  <motion.div
                    animate={{
                      rotateY: [0, 3, 0, -3, 0],
                      rotateX: [0, -2, 0, 2, 0],
                    }}
                    transition={{
                      duration: 6 + index,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    whileHover={{
                      scale: 1.05,
                      rotateY: 8,
                      rotateX: -5,
                      z: 50,
                      transition: { duration: 0.3 }
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="relative h-full"
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 relative overflow-hidden h-full">
                      {/* Animated snake border */}
                      <div className="absolute -inset-0.5 rounded-2xl overflow-hidden">
                        {/* Top snake */}
                        <motion.div
                          className="absolute top-0 left-0 right-0 h-0.5"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 1), rgba(168, 85, 247, 1), transparent)',
                            boxShadow: '0 0 15px rgba(59, 130, 246, 0.6)',
                          }}
                          animate={{
                            x: ['-100%', '200%'],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: index * 0.3,
                          }}
                        />

                        {/* Right snake */}
                        <motion.div
                          className="absolute top-0 right-0 bottom-0 w-0.5"
                          style={{
                            background: 'linear-gradient(180deg, transparent, rgba(168, 85, 247, 1), rgba(6, 182, 212, 1), transparent)',
                            boxShadow: '0 0 15px rgba(168, 85, 247, 0.6)',
                          }}
                          animate={{
                            y: ['-100%', '200%'],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: index * 0.3 + 0.6,
                          }}
                        />

                        {/* Bottom snake */}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5"
                          style={{
                            background: 'linear-gradient(270deg, transparent, rgba(6, 182, 212, 1), rgba(59, 130, 246, 1), transparent)',
                            boxShadow: '0 0 15px rgba(6, 182, 212, 0.6)',
                          }}
                          animate={{
                            x: ['200%', '-100%'],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: index * 0.3 + 1.2,
                          }}
                        />

                        {/* Left snake */}
                        <motion.div
                          className="absolute top-0 left-0 bottom-0 w-0.5"
                          style={{
                            background: 'linear-gradient(0deg, transparent, rgba(59, 130, 246, 1), rgba(168, 85, 247, 1), transparent)',
                            boxShadow: '0 0 15px rgba(59, 130, 246, 0.6)',
                          }}
                          animate={{
                            y: ['200%', '-100%'],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: index * 0.3 + 1.8,
                          }}
                        />
                      </div>

                      {/* 3D floating particles */}
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
                          style={{
                            left: `${20 + i * 20}%`,
                            top: `${30 + i * 15}%`,
                            transform: `translateZ(${10 + i * 5}px)`,
                            boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)',
                          }}
                          animate={{
                            y: [0, -20, 0],
                            x: [0, Math.sin(i) * 10, 0],
                            opacity: [0.3, 1, 0.3],
                            scale: [1, 2, 1],
                          }}
                          transition={{
                            duration: 2 + i * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.3,
                          }}
                        />
                      ))}

                      {/* Glowing orb on hover */}
                      <motion.div
                        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100"
                        style={{
                          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent 70%)',
                          filter: 'blur(20px)',
                          transform: 'translateZ(20px)',
                        }}
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />

                      {/* Content with 3D depth */}
                      <div className="relative z-10" style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
                        <motion.h3
                          className="text-lg font-bold text-white mb-3"
                          animate={{
                            textShadow: [
                              '0 0 10px rgba(59, 130, 246, 0.5)',
                              '0 0 20px rgba(168, 85, 247, 0.5)',
                              '0 0 10px rgba(59, 130, 246, 0.5)',
                            ]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.2,
                          }}
                        >
                          {feature.title}
                        </motion.h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>

                      {/* Rotating gradient overlay */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"
                        animate={{
                          background: [
                            'linear-gradient(45deg, rgba(59, 130, 246, 0.3), transparent)',
                            'linear-gradient(135deg, rgba(168, 85, 247, 0.3), transparent)',
                            'linear-gradient(225deg, rgba(6, 182, 212, 0.3), transparent)',
                            'linear-gradient(315deg, rgba(59, 130, 246, 0.3), transparent)',
                            'linear-gradient(45deg, rgba(59, 130, 246, 0.3), transparent)',
                          ]
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />

                      {/* Corner accent lights */}
                      {[0, 1].map((corner) => (
                        <motion.div
                          key={corner}
                          className="absolute w-3 h-3 rounded-full"
                          style={{
                            top: corner === 0 ? '10px' : 'auto',
                            bottom: corner === 1 ? '10px' : 'auto',
                            right: '10px',
                            background: 'radial-gradient(circle, rgba(59, 130, 246, 1), transparent)',
                            boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)',
                            transform: `translateZ(${15 + corner * 5}px)`,
                          }}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: corner * 0.5 + index * 0.1,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI-Driven Insights */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeader
              title="AI-Driven"
              highlight="Insights"
              description="Let artificial intelligence optimize your campaigns automatically while you focus on strategy and growth."
              align="center"
            />

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  title: 'Smart Scheduling',
                  description: 'AI determines the optimal posting times for maximum engagement based on your audience behavior.'
                },
                {
                  title: 'Content Suggestions',
                  description: 'Get AI-powered content ideas, caption recommendations, and hashtag strategies that work.'
                },
                {
                  title: 'Auto-Optimization',
                  description: 'Campaigns automatically adjust budgets and targeting based on performance data in real-time.'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className="relative group"
                >
                  <motion.div
                    className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 overflow-hidden h-full"
                    whileHover={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                  >
                    {/* Animated gradient background */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{
                        background: [
                          'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.1), transparent 50%)',
                          'radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.1), transparent 50%)',
                          'radial-gradient(circle at 0% 100%, rgba(6, 182, 212, 0.1), transparent 50%)',
                          'radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.1), transparent 50%)',
                          'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.1), transparent 50%)',
                        ]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />

                    {/* Floating particles */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400/60 rounded-full"
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${30 + i * 20}%`,
                        }}
                        animate={{
                          y: [0, -30, 0],
                          opacity: [0.3, 1, 0.3],
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 3 + i,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.5,
                        }}
                      />
                    ))}

                    {/* Glowing line accent */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      <motion.h3
                        className="text-2xl font-bold text-white mb-4"
                        animate={{
                          backgroundImage: [
                            'linear-gradient(90deg, #fff 0%, #fff 100%)',
                            'linear-gradient(90deg, #3b82f6 0%, #a855f7 50%, #06b6d4 100%)',
                            'linear-gradient(90deg, #fff 0%, #fff 100%)',
                          ],
                          backgroundClip: ['text', 'text', 'text'],
                          WebkitBackgroundClip: ['text', 'text', 'text'],
                          color: ['#fff', 'transparent', '#fff'],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5,
                        }}
                      >
                        {feature.title}
                      </motion.h3>

                      <motion.p
                        className="text-gray-400 leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
                      >
                        {feature.description}
                      </motion.p>
                    </div>

                    {/* Corner glow effect */}
                    <motion.div
                      className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100"
                      style={{
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent 70%)',
                        filter: 'blur(20px)',
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning & Courses */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <SectionHeader
                  badge="Continuous Learning"
                  title="Master Marketing"
                  highlight="While You Work"
                  description="Access expert courses directly in your dashboard. Learn strategies, tactics, and best practices from industry professionals."
                  align="left"
                />

                <div className="space-y-4 mt-8">
                  {[
                    'Social Media Strategy Fundamentals',
                    'Advanced TikTok Growth Tactics',
                    'Instagram Reels Mastery',
                    'Facebook Ads Optimization',
                    'Content Creation & Copywriting',
                    'Analytics & Data Interpretation'
                  ].map((course, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>{course}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 relative overflow-hidden">
                  {/* Snake border effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `
                        linear-gradient(90deg,
                          transparent 0%,
                          rgba(59, 130, 246, 0.8) 25%,
                          rgba(168, 85, 247, 0.8) 50%,
                          rgba(6, 182, 212, 0.8) 75%,
                          transparent 100%
                        )
                      `,
                      backgroundSize: '200% 4px',
                      backgroundRepeat: 'no-repeat',
                    }}
                    animate={{
                      backgroundPosition: [
                        '0% 0%, 100% 0%, 100% 100%, 0% 100%',
                        '100% 0%, 100% 100%, 0% 100%, 0% 0%',
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    {/* Top snake */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-1 rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), rgba(168, 85, 247, 0.8), transparent)',
                        boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
                      }}
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 0,
                      }}
                    />

                    {/* Right snake */}
                    <motion.div
                      className="absolute top-0 right-0 bottom-0 w-1 rounded-full"
                      style={{
                        background: 'linear-gradient(180deg, transparent, rgba(168, 85, 247, 0.8), rgba(6, 182, 212, 0.8), transparent)',
                        boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)',
                      }}
                      animate={{
                        y: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 0.75,
                      }}
                    />

                    {/* Bottom snake */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
                      style={{
                        background: 'linear-gradient(270deg, transparent, rgba(6, 182, 212, 0.8), rgba(168, 85, 247, 0.8), transparent)',
                        boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)',
                      }}
                      animate={{
                        x: ['100%', '-100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1.5,
                      }}
                    />

                    {/* Left snake */}
                    <motion.div
                      className="absolute top-0 left-0 bottom-0 w-1 rounded-full"
                      style={{
                        background: 'linear-gradient(0deg, transparent, rgba(59, 130, 246, 0.8), rgba(168, 85, 247, 0.8), transparent)',
                        boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
                      }}
                      animate={{
                        y: ['100%', '-100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 2.25,
                      }}
                    />
                  </motion.div>

                  <div className="aspect-square bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl flex items-center justify-center relative overflow-hidden">
                    {/* Image */}
                    <motion.img
                      src="/images/hero/aa.png"
                      alt="Marketing Platform"
                      className="w-full h-full object-cover rounded-xl relative z-10"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeader
              title="Trusted by"
              highlight="Growing Businesses"
              description="See how brands are scaling their marketing with Montrose."
              align="center"
            />

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.quote}"</p>

                  {/* Stat */}
                  <div className="bg-blue-500/10 rounded-xl p-4 mb-6">
                    <div className="text-3xl font-bold text-blue-400">{testimonial.stats.metric}</div>
                    <div className="text-sm text-gray-400">{testimonial.stats.label}</div>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeader
              title="Simple,"
              highlight="Transparent Pricing"
              description="Choose a plan that fits your business goals. All plans include core marketing features."
              align="center"
            />

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { name: 'Standard', price: '$49', accounts: '2', posts: '10' },
                { name: 'Pro', price: '$149', accounts: '5', posts: '30', popular: true },
                { name: 'Premium', price: '$299', accounts: 'Unlimited', posts: 'Unlimited' },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border ${
                    plan.popular ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-white/10'
                  } hover:border-white/30 transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-white mb-6">
                    {plan.price}
                    <span className="text-lg text-gray-400">/mo</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="text-gray-300 text-sm">{plan.accounts} Social Accounts</li>
                    <li className="text-gray-300 text-sm">{plan.posts} Posts/Month</li>
                    <li className="text-gray-300 text-sm">Real-time Analytics</li>
                    <li className="text-gray-300 text-sm">AI Optimization</li>
                  </ul>

                  <Link
                    href="/pricing"
                    className="block w-full py-3 bg-white text-black text-center font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
                  >
                    Get Started
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/pricing" className="text-blue-400 hover:text-blue-300 font-semibold">
                View Full Pricing Details →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CallToAction
          title="Ready to Transform"
          highlight="Your Marketing?"
          description="Join hundreds of businesses already growing with Montrose Marketing Platform. Start your free 14-day trial today."
          primaryButton={{
            text: "Start Free Trial",
            href: "/auth/register"
          }}
          secondaryButton={{
            text: "Schedule Demo",
            href: "/contact"
          }}
        />

        <Footer />
      </div>
    </div>
  );
}
