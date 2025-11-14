'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Navigation from '@/components/marketing/navigation';
import Footer from '@/components/marketing/footer';
import InteractiveGlowBackground from '@/components/interactive-glow-background';
import SectionHeader from '@/components/services/SectionHeader';
import FeatureGrid from '@/components/services/FeatureGrid';
import CallToAction from '@/components/services/CallToAction';
import AnimatedCounter from '@/components/services/AnimatedCounter';

export default function SEOPage() {
  const technicalSEOFeatures = [
    {
      icon: (
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Page Speed Optimization',
      description: 'Lightning-fast load times with advanced caching, compression, and CDN integration.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Mobile-First Indexing',
      description: 'Optimized for Google\'s mobile-first approach with responsive design.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'Schema Markup',
      description: 'Structured data implementation for rich snippets and enhanced search visibility.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: 'Site Indexing',
      description: 'XML sitemaps, robots.txt optimization, and proper crawl management.'
    },
  ];

  const keywordFeatures = [
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'AI Keyword Research',
      description: 'Machine learning algorithms discover high-value keywords your competitors miss.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Ranking Analysis',
      description: 'Real-time position tracking across all major search engines and devices.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      title: 'Competitor Intelligence',
      description: 'Analyze competitor strategies and identify gaps in their SEO approach.'
    },
  ];

  const contentStrategy = [
    {
      title: 'Content Gap Analysis',
      description: 'Identify missing topics and opportunities in your content strategy.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'SEO Copywriting',
      description: 'Expert writers create compelling content optimized for both users and search engines.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Link Building',
      description: 'Earn high-quality backlinks from authoritative sites in your industry.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Content Refresh',
      description: 'Update existing content to maintain and improve rankings over time.',
      color: 'from-orange-500 to-red-500'
    },
  ];

  const caseStudies = [
    {
      company: 'E-Commerce Fashion',
      industry: 'Retail',
      before: { traffic: '12K', keywords: '450', revenue: '$45K' },
      after: { traffic: '85K', keywords: '2,300', revenue: '$340K' },
      timeframe: '6 months',
      highlight: '+600% Organic Traffic'
    },
    {
      company: 'B2B SaaS Platform',
      industry: 'Technology',
      before: { traffic: '8K', keywords: '320', revenue: '$120K' },
      after: { traffic: '45K', keywords: '1,800', revenue: '$890K' },
      timeframe: '8 months',
      highlight: '+640% Revenue Growth'
    },
    {
      company: 'Local Service Provider',
      industry: 'Home Services',
      before: { traffic: '3K', keywords: '180', revenue: '$28K' },
      after: { traffic: '22K', keywords: '980', revenue: '$185K' },
      timeframe: '5 months',
      highlight: '+560% Lead Volume'
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
              badge="Montrose SEO Services"
              title="Be Seen. Be Heard."
              highlight="Be First."
              description="Data-driven SEO strategies that dominate search results. Technical optimization, keyword intelligence, and content that converts."
              align="center"
            />

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-5xl mx-auto">
              <AnimatedCounter value={420} suffix="%" label="Avg Traffic Increase" />
              <AnimatedCounter value={87} suffix="%" label="First Page Rankings" />
              <AnimatedCounter value={4} suffix="x" label="ROI Multiplier" />
              <AnimatedCounter value={24} suffix="/7" label="Rank Monitoring" />
            </div>
          </div>
        </section>

        {/* Technical SEO */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeader
              title="Technical SEO"
              highlight="Optimization"
              description="Build a solid foundation with technical excellence. Speed, mobile optimization, and proper indexing."
              align="center"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {[
                {
                  title: 'Page Speed Optimization',
                  description: 'Lightning-fast load times with advanced caching, compression, and CDN integration.'
                },
                {
                  title: 'Mobile-First Indexing',
                  description: 'Optimized for Google\'s mobile-first approach with responsive design.'
                },
                {
                  title: 'Schema Markup',
                  description: 'Structured data implementation for rich snippets and enhanced search visibility.'
                },
                {
                  title: 'Site Indexing',
                  description: 'XML sitemaps, robots.txt optimization, and proper crawl management.'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{
                    y: -10,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
                  className="relative group"
                >
                  <motion.div
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 h-full relative overflow-hidden"
                    whileHover={{ borderColor: 'rgba(59, 130, 246, 0.5)' }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Animated gradient background */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1), transparent 70%)',
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />

                    {/* Floating particles */}
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100"
                        style={{
                          left: `${25 + i * 20}%`,
                          top: `${30 + i * 10}%`,
                        }}
                        animate={{
                          y: [0, -30, 0],
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0],
                        }}
                        transition={{
                          duration: 2 + i * 0.3,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut"
                        }}
                      />
                    ))}

                    {/* Wave effect on top */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), rgba(168, 85, 247, 0.8), transparent)',
                      }}
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 0.5,
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      <motion.h3
                        className="text-lg font-bold text-white mb-3"
                        animate={{
                          textShadow: [
                            '0 0 10px rgba(59, 130, 246, 0)',
                            '0 0 20px rgba(59, 130, 246, 0.6)',
                            '0 0 10px rgba(59, 130, 246, 0)',
                          ]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.3,
                        }}
                      >
                        {feature.title}
                      </motion.h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Corner accent */}
                    <motion.div
                      className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full opacity-0 group-hover:opacity-100"
                      style={{
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent 70%)',
                        filter: 'blur(15px)',
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />

                    {/* Pulsing dots */}
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute bottom-4 w-2 h-2 bg-blue-400/50 rounded-full"
                        style={{
                          right: `${20 + i * 12}px`,
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Technical Audit Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16"
            >
              <motion.div
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 relative overflow-hidden group"
                whileHover={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                transition={{ duration: 0.3 }}
              >
                {/* Snake border effect */}
                <div className="absolute -inset-0.5 rounded-2xl overflow-hidden pointer-events-none">
                  {/* Top snake */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 1), rgba(168, 85, 247, 1), transparent)',
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
                    }}
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Right snake */}
                  <motion.div
                    className="absolute top-0 right-0 bottom-0 w-1 rounded-full"
                    style={{
                      background: 'linear-gradient(180deg, transparent, rgba(168, 85, 247, 1), rgba(6, 182, 212, 1), transparent)',
                      boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)',
                    }}
                    animate={{
                      y: ['-100%', '200%'],
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
                      background: 'linear-gradient(270deg, transparent, rgba(6, 182, 212, 1), rgba(59, 130, 246, 1), transparent)',
                      boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)',
                    }}
                    animate={{
                      x: ['200%', '-100%'],
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
                      background: 'linear-gradient(0deg, transparent, rgba(59, 130, 246, 1), rgba(168, 85, 247, 1), transparent)',
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
                    }}
                    animate={{
                      y: ['200%', '-100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 2.25,
                    }}
                  />
                </div>

                {/* Mouse follow glow effect */}
                <motion.div
                  className="absolute w-64 h-64 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent 70%)',
                    filter: 'blur(40px)',
                  }}
                  animate={{
                    x: ['-10%', '110%'],
                    y: ['-10%', '110%'],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                <div className="grid md:grid-cols-3 gap-6 relative z-10">
                  {[
                    { label: 'Page Speed', score: 95, color: 'from-green-500 to-emerald-500' },
                    { label: 'Mobile Friendly', score: 98, color: 'from-blue-500 to-cyan-500' },
                    { label: 'SEO Score', score: 92, color: 'from-purple-500 to-pink-500' },
                  ].map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                        transition: { duration: 0.2 }
                      }}
                      className="text-center relative group/card cursor-pointer"
                    >
                      {/* Card glow on hover */}
                      <motion.div
                        className="absolute -inset-4 rounded-2xl opacity-0 group-hover/card:opacity-100"
                        style={{
                          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent 70%)',
                          filter: 'blur(20px)',
                        }}
                        transition={{ duration: 0.3 }}
                      />

                      <div className="relative w-32 h-32 mx-auto mb-4">
                        {/* Rotating ring on hover */}
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-blue-400/30"
                          animate={{
                            rotate: 360,
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                          }}
                        />

                        {/* Circle progress */}
                        <svg className="w-full h-full transform -rotate-90 relative z-10">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="8"
                          />
                          <motion.circle
                            cx="64"
                            cy="64"
                            r="56"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            initial={{ strokeDasharray: "0 352" }}
                            whileInView={{ strokeDasharray: `${(metric.score / 100) * 352} 352` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: index * 0.2 }}
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#3b82f6" />
                              <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.span
                            className="text-3xl font-bold text-white"
                            whileHover={{
                              scale: 1.1,
                              textShadow: '0 0 20px rgba(59, 130, 246, 0.8)',
                            }}
                          >
                            {metric.score}
                          </motion.span>
                        </div>

                        {/* Floating particles around circle */}
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover/card:opacity-100"
                            style={{
                              left: '50%',
                              top: '50%',
                            }}
                            animate={{
                              x: [0, Math.cos((i * 120) * Math.PI / 180) * 60, 0],
                              y: [0, Math.sin((i * 120) * Math.PI / 180) * 60, 0],
                              opacity: [0, 1, 0],
                              scale: [0, 1.5, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                      </div>
                      <motion.div
                        className="text-white font-semibold"
                        whileHover={{
                          color: '#60a5fa',
                          transition: { duration: 0.2 }
                        }}
                      >
                        {metric.label}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Keyword Intelligence */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeader
              title="Keyword"
              highlight="Intelligence"
              description="AI-powered keyword research and competitor analysis to dominate your niche."
              align="center"
            />

            <div className="grid md:grid-cols-3 gap-6 mt-16">
              {[
                {
                  title: 'AI Keyword Research',
                  description: 'Machine learning algorithms discover high-value keywords your competitors miss.'
                },
                {
                  title: 'Ranking Analysis',
                  description: 'Real-time position tracking across all major search engines and devices.'
                },
                {
                  title: 'Competitor Intelligence',
                  description: 'Analyze competitor strategies and identify gaps in their SEO approach.'
                }
              ].map((feature, index) => {
                const DropdownCard = () => {
                  const [isExpanded, setIsExpanded] = useState(false);

                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="relative group"
                    >
                      <motion.button
                        onClick={() => setIsExpanded(!isExpanded)}
                        onHoverStart={() => !isExpanded && setIsExpanded(true)}
                        className="w-full text-left"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 overflow-hidden cursor-pointer"
                          animate={{
                            borderColor: isExpanded
                              ? 'rgba(59, 130, 246, 0.6)'
                              : 'rgba(255, 255, 255, 0.1)',
                          }}
                          style={{
                            boxShadow: isExpanded
                              ? '0 20px 40px rgba(59, 130, 246, 0.3)'
                              : '0 10px 20px rgba(0, 0, 0, 0.2)',
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Top gradient line */}
                          <motion.div
                            className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                            style={{
                              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)',
                            }}
                            animate={{
                              opacity: isExpanded ? 1 : 0,
                              scaleX: isExpanded ? 1 : 0,
                            }}
                            transition={{ duration: 0.4 }}
                          />

                          {/* Floating particles when expanded */}
                          {isExpanded && (
                            <>
                              {[...Array(5)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="absolute w-1.5 h-1.5 rounded-full bg-blue-400"
                                  style={{
                                    left: `${15 + i * 18}%`,
                                    top: '50%',
                                  }}
                                  animate={{
                                    y: [-15, -35, -15],
                                    opacity: [0, 1, 0],
                                    scale: [0, 1.5, 0],
                                  }}
                                  transition={{
                                    duration: 2,
                                    delay: i * 0.15,
                                    repeat: Infinity,
                                  }}
                                />
                              ))}
                            </>
                          )}

                          {/* Header */}
                          <div className="flex items-center gap-4 relative z-10">
                            {/* Dropdown arrow */}
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-blue-400 text-xl flex-shrink-0"
                            >
                              ▼
                            </motion.div>

                            {/* Title */}
                            <motion.h3
                              className="text-xl font-bold text-white flex-1"
                              animate={{
                                color: isExpanded ? '#60a5fa' : '#ffffff',
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              {feature.title}
                            </motion.h3>
                          </div>

                          {/* Expandable content */}
                          <motion.div
                            initial={false}
                            animate={{
                              height: isExpanded ? 'auto' : 0,
                              opacity: isExpanded ? 1 : 0,
                            }}
                            transition={{ duration: 0.4 }}
                            className="overflow-hidden"
                          >
                            <motion.p
                              className="text-gray-300 text-sm leading-relaxed mt-4 pl-9"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{
                                opacity: isExpanded ? 1 : 0,
                                y: isExpanded ? 0 : -10,
                              }}
                              transition={{ delay: 0.1 }}
                            >
                              {feature.description}
                            </motion.p>
                          </motion.div>

                          {/* Pulsing glow on hover */}
                          <motion.div
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                            style={{
                              background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1), transparent 70%)',
                            }}
                            animate={{
                              scale: [1, 1.05, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </motion.div>
                      </motion.button>
                    </motion.div>
                  );
                };

                return <DropdownCard key={index} />;
              })}
            </div>

            {/* Keyword Research Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="space-y-4">
                  {[
                    { keyword: 'AI website builder', volume: '12,500', difficulty: 'Medium', cpc: '$4.20' },
                    { keyword: 'custom web design', volume: '8,900', difficulty: 'Low', cpc: '$6.80' },
                    { keyword: 'responsive website development', volume: '6,200', difficulty: 'Low', cpc: '$5.50' },
                    { keyword: 'SEO optimization services', volume: '15,800', difficulty: 'High', cpc: '$8.90' },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-white font-semibold mb-1">{item.keyword}</div>
                          <div className="flex gap-4 text-sm text-gray-400">
                            <span>Vol: {item.volume}/mo</span>
                            <span className={`${
                              item.difficulty === 'Low' ? 'text-green-400' :
                              item.difficulty === 'Medium' ? 'text-yellow-400' :
                              'text-red-400'
                            }`}>{item.difficulty}</span>
                            <span>CPC: {item.cpc}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            item.difficulty === 'Low' ? 'bg-green-400' :
                            item.difficulty === 'Medium' ? 'bg-yellow-400' :
                            'bg-red-400'
                          }`}></div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Strategy */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeader
              title="Content Strategy"
              highlight="& Growth"
              description="Create and optimize content that ranks, engages, and converts your target audience."
              align="center"
            />

            <div className="grid md:grid-cols-2 gap-6 mt-16">
              {[
                {
                  title: 'Content Gap Analysis',
                  description: 'Identify missing topics and opportunities in your content strategy.',
                  color: 'from-purple-500 to-pink-500'
                },
                {
                  title: 'SEO Copywriting',
                  description: 'Expert writers create compelling content optimized for both users and search engines.',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  title: 'Link Building',
                  description: 'Earn high-quality backlinks from authoritative sites in your industry.',
                  color: 'from-green-500 to-emerald-500'
                },
                {
                  title: 'Content Refresh',
                  description: 'Update existing content to maintain and improve rankings over time.',
                  color: 'from-orange-500 to-red-500'
                }
              ].map((strategy, index) => {
                const ContentDropdown = () => {
                  const [isExpanded, setIsExpanded] = useState(false);

                  return (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, rotateX: -10 }}
                      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.7,
                        delay: index * 0.15,
                        type: "spring",
                        stiffness: 100
                      }}
                      style={{ perspective: 1000 }}
                      className="relative group"
                    >
                      <motion.button
                        onClick={() => setIsExpanded(!isExpanded)}
                        onHoverStart={() => !isExpanded && setIsExpanded(true)}
                        className="w-full text-left"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border-2 border-white/10 overflow-hidden cursor-pointer"
                          animate={{
                            borderColor: isExpanded
                              ? 'rgba(168, 85, 247, 0.6)'
                              : 'rgba(255, 255, 255, 0.1)',
                          }}
                          style={{
                            boxShadow: isExpanded
                              ? '0 25px 50px rgba(168, 85, 247, 0.4), inset 0 0 30px rgba(168, 85, 247, 0.1)'
                              : '0 10px 25px rgba(0, 0, 0, 0.3)',
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          {/* Animated gradient background */}
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-br ${strategy.color} opacity-0`}
                            animate={{
                              opacity: isExpanded ? 0.15 : 0,
                            }}
                            transition={{ duration: 0.5 }}
                          />

                          {/* Ripple effect on expand */}
                          {isExpanded && (
                            <motion.div
                              className="absolute inset-0 border-2 border-purple-400/30 rounded-2xl"
                              initial={{ scale: 0.8, opacity: 1 }}
                              animate={{
                                scale: [1, 1.15, 1.3],
                                opacity: [0.5, 0.2, 0],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                              }}
                            />
                          )}

                          {/* Orbiting particles */}
                          {isExpanded && (
                            <>
                              {[...Array(6)].map((_, i) => {
                                const angle = (i / 6) * 360;
                                return (
                                  <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 rounded-full bg-purple-400"
                                    style={{
                                      left: '50%',
                                      top: '50%',
                                      boxShadow: '0 0 15px rgba(168, 85, 247, 0.8)',
                                    }}
                                    animate={{
                                      x: [
                                        0,
                                        Math.cos((angle * Math.PI) / 180) * 100,
                                        0,
                                      ],
                                      y: [
                                        0,
                                        Math.sin((angle * Math.PI) / 180) * 100,
                                        0,
                                      ],
                                      opacity: [0, 1, 0],
                                      scale: [0, 1.5, 0],
                                    }}
                                    transition={{
                                      duration: 3,
                                      delay: i * 0.2,
                                      repeat: Infinity,
                                      ease: "easeInOut"
                                    }}
                                  />
                                );
                              })}
                            </>
                          )}

                          {/* Side accent bars */}
                          <motion.div
                            className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${strategy.color}`}
                            animate={{
                              scaleY: isExpanded ? 1 : 0,
                            }}
                            transition={{ duration: 0.4 }}
                          />

                          {/* Header */}
                          <div className="flex items-center gap-4 relative z-10">
                            {/* Plus/Minus indicator */}
                            <motion.div
                              className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                              animate={{
                                backgroundColor: isExpanded
                                  ? 'rgba(168, 85, 247, 0.3)'
                                  : 'rgba(255, 255, 255, 0.1)',
                                rotate: isExpanded ? 180 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <motion.div
                                className="text-purple-400 text-2xl font-bold"
                                animate={{ rotate: isExpanded ? 45 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                +
                              </motion.div>
                            </motion.div>

                            {/* Title */}
                            <motion.h3
                              className="text-2xl font-bold flex-1"
                              animate={{
                                background: isExpanded
                                  ? `linear-gradient(90deg, #a855f7, #ec4899)`
                                  : 'linear-gradient(90deg, #ffffff, #ffffff)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: isExpanded ? 'transparent' : '#ffffff',
                              }}
                              transition={{ duration: 0.4 }}
                            >
                              {strategy.title}
                            </motion.h3>
                          </div>

                          {/* Expandable content */}
                          <motion.div
                            initial={false}
                            animate={{
                              height: isExpanded ? 'auto' : 0,
                              opacity: isExpanded ? 1 : 0,
                            }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <motion.p
                              className="text-gray-300 leading-relaxed mt-6 pl-12"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{
                                opacity: isExpanded ? 1 : 0,
                                x: isExpanded ? 0 : -20,
                              }}
                              transition={{ delay: 0.2, duration: 0.4 }}
                            >
                              {strategy.description}
                            </motion.p>
                          </motion.div>

                          {/* Glowing line animation */}
                          <motion.div
                            className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${strategy.color}`}
                            animate={{
                              scaleX: isExpanded ? 1 : 0,
                              opacity: isExpanded ? 1 : 0,
                            }}
                            transition={{ duration: 0.5 }}
                          />

                          {/* Corner sparkles */}
                          {isExpanded && (
                            <>
                              {[
                                { top: '10px', right: '10px' },
                                { top: '10px', left: '10px' },
                                { bottom: '10px', right: '10px' },
                                { bottom: '10px', left: '10px' }
                              ].map((pos, i) => (
                                <motion.div
                                  key={i}
                                  className="absolute w-3 h-3"
                                  style={pos}
                                  animate={{
                                    scale: [0, 1.5, 0],
                                    opacity: [0, 1, 0],
                                    rotate: [0, 180, 360],
                                  }}
                                  transition={{
                                    duration: 2,
                                    delay: i * 0.2,
                                    repeat: Infinity,
                                  }}
                                >
                                  <div className={`w-full h-full bg-gradient-to-br ${strategy.color} rounded-full`} />
                                </motion.div>
                              ))}
                            </>
                          )}
                        </motion.div>
                      </motion.button>
                    </motion.div>
                  );
                };

                return <ContentDropdown key={index} />;
              })}
            </div>
          </div>
        </section>

        {/* Analytics Integration */}
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
                  title="Real-Time"
                  highlight="Analytics"
                  description="Track every metric that matters. From rankings to conversions, monitor your SEO performance in real-time with intuitive dashboards."
                  align="left"
                />

                <div className="space-y-4 mt-8">
                  {[
                    'Keyword position tracking',
                    'Organic traffic analysis',
                    'Conversion rate monitoring',
                    'Backlink profile growth',
                    'Competitor comparisons',
                    'Custom performance reports'
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <div className="aspect-square bg-gradient-to-br from-green-900/50 to-blue-900/50 rounded-xl flex items-center justify-center relative overflow-hidden">
                    {/* Animated chart lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                      {[...Array(5)].map((_, i) => (
                        <motion.line
                          key={i}
                          x1={i * 100}
                          y1="400"
                          x2={i * 100}
                          y2={Math.random() * 200}
                          stroke="rgba(59, 130, 246, 0.3)"
                          strokeWidth="40"
                          initial={{ y2: 400 }}
                          animate={{ y2: [400, Math.random() * 200, Math.random() * 150] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </svg>

                    <div className="relative z-10 text-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      >
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </motion.div>
                      <h4 className="text-xl font-bold text-white mb-2">Analytics Dashboard</h4>
                      <p className="text-gray-400 text-sm">Real-time SEO metrics</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeader
              title="Proven"
              highlight="Results"
              description="Real businesses, real growth. See how our SEO strategies transformed these companies."
              align="center"
            />

            <div className="space-y-8">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <div className="grid lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                      <div className="text-sm text-blue-400 mb-2">{study.industry}</div>
                      <h3 className="text-2xl font-bold text-white mb-2">{study.company}</h3>
                      <div className="text-gray-400 text-sm">{study.timeframe}</div>
                    </div>

                    {/* Before/After Metrics */}
                    <div className="lg:col-span-2">
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { label: 'Traffic', before: study.before.traffic, after: study.after.traffic },
                          { label: 'Keywords', before: study.before.keywords, after: study.after.keywords },
                          { label: 'Revenue', before: study.before.revenue, after: study.after.revenue },
                        ].map((metric, i) => (
                          <div key={i} className="text-center">
                            <div className="text-xs text-gray-400 mb-2">{metric.label}</div>
                            <div className="space-y-1">
                              <div className="text-sm text-gray-500 line-through">{metric.before}</div>
                              <svg className="w-4 h-4 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                              </svg>
                              <div className="text-lg font-bold text-green-400">{metric.after}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Highlight */}
                    <div className="flex items-center justify-center">
                      <div className="text-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-400/30">
                        <div className="text-3xl font-bold text-white mb-2">{study.highlight}</div>
                        <div className="text-sm text-gray-400">Key Achievement</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CallToAction
          title="Boost Your Rankings"
          highlight="With Montrose"
          description="Start with a free SEO audit and discover opportunities to dominate your market. No commitment required."
          primaryButton={{
            text: "Get Free SEO Audit",
            href: "/contact"
          }}
          secondaryButton={{
            text: "View Pricing",
            href: "/pricing"
          }}
        />

        <Footer />
      </div>
    </div>
  );
}
