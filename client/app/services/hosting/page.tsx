'use client';

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Navigation from '@/components/marketing/navigation';
import Footer from '@/components/marketing/footer';
import InteractiveGlowBackground from '@/components/interactive-glow-background';
import SectionHeader from '@/components/services/SectionHeader';
import FeatureGrid from '@/components/services/FeatureGrid';
import CallToAction from '@/components/services/CallToAction';
import AnimatedCounter from '@/components/services/AnimatedCounter';

// Floating Particles Background Component
const FloatingParticles = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -30 - Math.random() * 50],
            x: [0, (Math.random() - 0.5) * 50 + mousePosition.x * 30],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
};

// Animated Orbs Background
const AnimatedOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 200 + i * 100,
            height: 200 + i * 100,
            left: `${20 + i * 15}%`,
            top: `${10 + i * 20}%`,
            background: `radial-gradient(circle, ${
              i % 2 === 0 ? 'rgba(6, 182, 212, 0.1)' : 'rgba(139, 92, 246, 0.1)'
            }, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// 3D Parallax Card Component
const ParallaxHostingCard = ({
  feature,
  index,
  mousePosition,
  isInView,
}: {
  feature: any;
  index: number;
  mousePosition: { x: number; y: number };
  isInView: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [localMousePos, setLocalMousePos] = useState({ x: 0.5, y: 0.5 });

  const rotateX = mousePosition.y * -10;
  const rotateY = mousePosition.x * 10;

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setLocalMousePos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleCardMouseMove}
      className="relative group"
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        className="relative p-8 rounded-2xl transition-all duration-300 overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: isHovered
            ? '0 20px 60px rgba(6, 182, 212, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)'
            : '0 8px 32px rgba(0, 0, 0, 0.3)',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1))',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)`,
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: isHovered ? ['0% 0%', '200% 200%'] : '0% 0%',
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
        />

        {/* Magnetic cursor spotlight */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15), transparent 70%)',
            filter: 'blur(30px)',
            left: `${localMousePos.x * 100}%`,
            top: `${localMousePos.y * 100}%`,
            transform: 'translate(-50%, -50%)',
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Pulsing corners */}
        {isHovered && (
          <>
            {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y], i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  [x === 0 ? 'left' : 'right']: 0,
                  [y === 0 ? 'top' : 'bottom']: 0,
                  background: 'linear-gradient(135deg, #06B6D4, #8B5CF6)',
                  boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)',
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.5,
                  repeat: Infinity,
                }}
              />
            ))}
          </>
        )}

        {/* Glow overlay on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.15), rgba(139, 92, 246, 0.1), transparent 70%)',
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Title */}
        <h3
          className="text-2xl font-bold mb-4 relative z-10"
          style={{
            color: '#F5F7FA',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          {feature.title}
        </h3>

        {/* Description */}
        <p
          className="text-gray-400 leading-relaxed relative z-10"
          style={{
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
          }}
        >
          {feature.description}
        </p>

        {/* Animated border on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            border: '2px solid transparent',
            borderImage: isHovered
              ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.5), rgba(139, 92, 246, 0.5)) 1'
              : 'none',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Why Choose Montrose Hosting Section
const WhyChooseHosting = ({ features }: { features: any[] }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x, y });
    setCursorPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 sm:px-8 lg:px-12 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #040B1E 0%, #0A1F3E 100%)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated Background Elements */}
      <AnimatedOrbs />
      <FloatingParticles mousePosition={mousePosition} />

      {/* Radial gradient that follows cursor */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08), transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: cursorPosition.x - 192,
          y: cursorPosition.y - 192,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            <span className="text-white">Why Choose </span>
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Montrose Hosting?
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            We combine cutting-edge technology with proven strategies to deliver results that matter.
          </p>
        </motion.div>

        {/* Cards Grid with Connecting Lines */}
        <div className="relative">
          {/* Connecting Lines SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {/* Horizontal line connecting top cards */}
            <motion.line
              x1="25%" y1="30%" x2="75%" y2="30%"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />

            {/* Horizontal line connecting bottom cards */}
            <motion.line
              x1="25%" y1="70%" x2="75%" y2="70%"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.5, delay: 0.7 }}
            />

            {/* Vertical connecting lines */}
            <motion.line
              x1="25%" y1="35%" x2="25%" y2="65%"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.5, delay: 0.9 }}
            />
            <motion.line
              x1="75%" y1="35%" x2="75%" y2="65%"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.5, delay: 1.1 }}
            />

            {/* Glowing dots at intersections */}
            {[[25, 30], [75, 30], [25, 70], [75, 70]].map(([x, y], i) => (
              <motion.circle
                key={i}
                cx={`${x}%`}
                cy={`${y}%`}
                r="4"
                fill="url(#lineGradient)"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: [0, 1.5, 1], opacity: [0, 1, 0.8] } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.8, delay: 1.3 + i * 0.1 }}
              />
            ))}
          </svg>

          {/* Cards - 2x2 Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {features.map((feature, index) => (
              <ParallaxHostingCard
                key={index}
                feature={feature}
                index={index}
                mousePosition={mousePosition}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function HostingPage() {
  const performanceMetrics = [
    { value: 99.9, suffix: '%', label: 'Uptime Guarantee' },
    { value: 45, suffix: 'ms', label: 'Avg Response Time' },
    { value: 10, suffix: 'x', label: 'Speed Improvement' },
    { value: 24, suffix: '/7', label: 'Monitoring' },
  ];

  const cloudProviders = [
    {
      name: 'AWS',
      image: '/images/hero/11.png',
      color: 'from-orange-500 to-yellow-500',
      description: 'Global infrastructure with 99.99% availability across multiple regions.'
    },
    {
      name: 'CloudFront',
      image: '/images/hero/12.png',
      color: 'from-blue-500 to-cyan-500',
      description: 'Content delivery network with edge locations worldwide for lightning-fast delivery.'
    },
    {
      name: 'Vercel',
      image: '/images/hero/13.png',
      color: 'from-gray-700 to-black',
      description: 'Optimized for modern frameworks with automatic deployment and scaling.'
    },
  ];

  const dashboardFeatures = [
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Real-Time Analytics',
      description: 'Monitor traffic, bandwidth usage, and performance metrics in real-time.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'One-Click Management',
      description: 'Deploy, scale, and manage your hosting with simple, intuitive controls.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Auto-Scaling',
      description: 'Automatically scale resources based on traffic spikes and demand.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Domain Management',
      description: 'Register, transfer, and manage all your domains from one dashboard.'
    },
  ];

  const testimonials = [
    {
      company: 'TechFlow Inc.',
      quote: "Migrating to Montrose hosting reduced our load times by 80%. The performance is incredible.",
      author: 'James Wilson',
      role: 'CTO',
      stat: { value: '80%', label: 'Faster Load Times' }
    },
    {
      company: 'E-Commerce Plus',
      quote: "We've had zero downtime in 18 months. The reliability and support are unmatched.",
      author: 'Maria Garcia',
      role: 'Operations Director',
      stat: { value: '100%', label: 'Uptime Achieved' }
    },
    {
      company: 'Creative Agency',
      quote: "The auto-scaling saved us during our product launch. Handled 50x traffic without issues.",
      author: 'Alex Thompson',
      role: 'Founder',
      stat: { value: '50x', label: 'Traffic Handled' }
    },
  ];

  const whyChooseFeatures = [
    {
      title: 'Lightning-Fast Performance',
      description: 'Experience blazing-fast load times with our globally distributed CDN and optimized infrastructure. Your applications run 10x faster than traditional hosting.'
    },
    {
      title: 'Enterprise Security',
      description: 'Bank-level security with SSL certificates, DDoS protection, and automated daily backups. Your data is protected 24/7 with real-time monitoring.'
    },
    {
      title: 'Seamless Scalability',
      description: 'Automatically scale resources based on traffic demands. Handle sudden spikes effortlessly with our intelligent auto-scaling infrastructure.'
    },
    {
      title: '24/7 Expert Support',
      description: 'Get help whenever you need it with our round-the-clock support team. Fast response times and expert solutions to keep you running smoothly.'
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
              badge="Montrose Hosting & Infrastructure"
              title="Reliable. Scalable."
              highlight="Lightning-Fast."
              description="Enterprise-grade hosting powered by AWS, CloudFront, and Vercel. Built for performance, security, and growth."
              align="center"
            />

            {/* Animated Server Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10">
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className="h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-400/30"
                    />
                  ))}
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 border-2 border-blue-400/30 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Performance Overview */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeader
              title="Performance"
              highlight="That Matters"
              description="Lightning-fast servers, global CDN, and optimized infrastructure for maximum speed and reliability."
              align="center"
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {performanceMetrics.map((metric, index) => (
                <AnimatedCounter
                  key={index}
                  value={metric.value}
                  suffix={metric.suffix}
                  label={metric.label}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Montrose Hosting */}
        <WhyChooseHosting features={whyChooseFeatures} />

        {/* Cloud Integration */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeader
              title="Powered by"
              highlight="Industry Leaders"
              description="We partner with the world's best cloud providers to deliver unmatched performance and reliability."
              align="center"
            />

            <div className="grid md:grid-cols-3 gap-8">
              {cloudProviders.map((provider, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-cyan-400/50 transition-all duration-500 overflow-hidden shadow-2xl hover:shadow-cyan-500/20"
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${provider.color} opacity-0 group-hover:opacity-15 transition-opacity duration-700`}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-xl" />
                  </div>

                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Image with animations */}
                    <motion.div
                      className="mb-8 relative w-full h-64 flex items-center justify-center"
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 3 + index * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {/* Glow behind image */}
                      <motion.div
                        className="absolute inset-0 blur-3xl opacity-30"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        style={{
                          background: `radial-gradient(circle, ${
                            index === 0 ? 'rgba(251, 146, 60, 0.4)' :
                            index === 1 ? 'rgba(59, 130, 246, 0.4)' :
                            'rgba(148, 163, 184, 0.4)'
                          }, transparent 70%)`
                        }}
                      />

                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 2 }}
                        transition={{ duration: 0.4, type: "spring" }}
                      >
                        <Image
                          src={provider.image}
                          alt={provider.name}
                          width={350}
                          height={256}
                          className="object-contain drop-shadow-2xl"
                          style={{ maxHeight: '256px', width: 'auto' }}
                          unoptimized
                        />
                      </motion.div>
                    </motion.div>

                    {/* Text content with animations */}
                    <motion.h3
                      className="text-3xl font-black text-white mb-4 tracking-tight"
                      style={{
                        textShadow: '0 2px 20px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      {provider.name}
                    </motion.h3>
                    <motion.p
                      className="text-gray-300 leading-relaxed text-base"
                      style={{
                        textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      {provider.description}
                    </motion.p>
                  </div>

                  {/* Bottom shine effect */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    animate={{
                      opacity: [0, 1, 0],
                      scaleX: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* Testimonials - Modern Dropdown Style */}
        <section className="py-24 relative overflow-hidden">
          {/* Deep Navy & Purple Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E27] via-[#1A1B3D] to-[#2D1B69] opacity-90" />

          {/* Animated purple glow orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute w-96 h-96 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent 70%)',
                top: '10%',
                left: '20%',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute w-96 h-96 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent 70%)',
                bottom: '20%',
                right: '10%',
              }}
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <SectionHeader
              title="Trusted by"
              highlight="Growing Companies"
              description="See why businesses choose Montrose for their hosting needs."
              align="center"
            />

            {/* Two Column Layout: Dropdowns + Image */}
            <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Dropdowns */}
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => {
                  const [isExpanded, setIsExpanded] = useState(false);

                  return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="relative group"
                  >
                    {/* Dropdown Tab */}
                    <motion.button
                      onClick={() => setIsExpanded(!isExpanded)}
                      onHoverStart={() => !isExpanded && setIsExpanded(true)}
                      className="w-full text-left"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 overflow-hidden cursor-pointer"
                        style={{
                          boxShadow: isExpanded
                            ? '0 20px 60px rgba(139, 92, 246, 0.4), 0 0 40px rgba(6, 182, 212, 0.3)'
                            : '0 10px 30px rgba(0, 0, 0, 0.3)',
                        }}
                        animate={{
                          borderColor: isExpanded
                            ? 'rgba(6, 182, 212, 0.8)'
                            : 'rgba(255, 255, 255, 0.1)',
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Neon glow accent line on hover/expand */}
                        <motion.div
                          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                          style={{
                            background: 'linear-gradient(90deg, #06B6D4, #8B5CF6, #10B981)',
                          }}
                          animate={{
                            opacity: isExpanded ? 1 : 0,
                            scaleX: isExpanded ? 1 : 0.5,
                          }}
                          transition={{ duration: 0.4 }}
                        />

                        {/* Floating particles */}
                        {isExpanded && (
                          <>
                            {[...Array(6)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 rounded-full bg-cyan-400"
                                style={{
                                  left: `${20 + i * 15}%`,
                                  top: '50%',
                                }}
                                animate={{
                                  y: [-20, -40, -20],
                                  opacity: [0, 1, 0],
                                  scale: [0, 1.5, 0],
                                }}
                                transition={{
                                  duration: 2,
                                  delay: i * 0.2,
                                  repeat: Infinity,
                                }}
                              />
                            ))}
                          </>
                        )}

                        {/* Header with metric */}
                        <div className="flex items-center gap-4 relative z-10">
                          {/* Expand indicator - Left side */}
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-cyan-400 text-2xl flex-shrink-0"
                          >
                            ▼
                          </motion.div>

                          {/* Metric */}
                          <div className="flex-1">
                            <motion.div
                              className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                              style={{
                                textShadow: '0 0 30px rgba(6, 182, 212, 0.5)',
                              }}
                            >
                              {testimonial.stat.value}
                            </motion.div>
                            <div className="text-sm text-gray-400 font-medium">
                              {testimonial.stat.label}
                            </div>
                          </div>
                        </div>

                        {/* Expanded Content */}
                        <motion.div
                          initial={false}
                          animate={{
                            height: isExpanded ? 'auto' : 0,
                            opacity: isExpanded ? 1 : 0,
                          }}
                          transition={{
                            height: { duration: 0.4, ease: "easeInOut" },
                            opacity: { duration: 0.3, delay: isExpanded ? 0.1 : 0 },
                          }}
                          style={{ overflow: 'hidden' }}
                        >
                          <motion.div
                            className="mt-6 pt-6 border-t border-white/10"
                            initial={{ y: -20 }}
                            animate={{ y: isExpanded ? 0 : -20 }}
                            transition={{ duration: 0.4 }}
                          >
                            {/* Testimonial quote */}
                            <motion.p
                              className="text-gray-300 leading-relaxed italic text-lg mb-6"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: isExpanded ? 1 : 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              "{testimonial.quote}"
                            </motion.p>

                            {/* Author info with glass panel effect */}
                            <motion.div
                              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{
                                opacity: isExpanded ? 1 : 0,
                                x: isExpanded ? 0 : -20,
                              }}
                              transition={{ delay: 0.3 }}
                            >
                              {/* Avatar placeholder */}
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-white">
                                {testimonial.author.charAt(0)}
                              </div>

                              <div>
                                <div className="font-bold text-white">{testimonial.author}</div>
                                <div className="text-sm text-gray-400">
                                  {testimonial.role} — <span className="text-cyan-400">{testimonial.company}</span>
                                </div>
                              </div>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </motion.button>
                  </motion.div>
                );
              })}
              </div>

              {/* Right: Animated 3D Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative lg:block hidden"
              >
                {/* 3D Floating Container */}
                <motion.div
                  className="relative"
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                  }}
                  animate={{
                    rotateY: [0, 10, 0, -10, 0],
                    rotateX: [0, -5, 0, 5, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Glowing orb behind image */}
                  <motion.div
                    className="absolute inset-0 blur-3xl opacity-40"
                    style={{
                      background: 'radial-gradient(circle, rgba(6, 182, 212, 0.6), rgba(139, 92, 246, 0.4), transparent 70%)',
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Floating Image with 3D effects */}
                  <motion.div
                    className="relative z-10"
                    animate={{
                      y: [0, -20, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        rotateY: 15,
                        rotateX: -10,
                      }}
                      transition={{
                        duration: 0.5,
                        type: "spring",
                      }}
                      style={{
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <Image
                        src="/images/hero/14.png"
                        alt="Montrose Hosting Platform"
                        width={600}
                        height={600}
                        className="rounded-3xl shadow-2xl"
                        style={{
                          filter: 'drop-shadow(0 25px 50px rgba(6, 182, 212, 0.3))',
                        }}
                        unoptimized
                      />
                    </motion.div>
                  </motion.div>

                  {/* Orbiting particles around image */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full"
                      style={{
                        background: i % 2 === 0 ? '#06B6D4' : '#8B5CF6',
                        boxShadow: `0 0 20px ${i % 2 === 0 ? '#06B6D4' : '#8B5CF6'}`,
                        left: '50%',
                        top: '50%',
                      }}
                      animate={{
                        x: [
                          0,
                          Math.cos((i * Math.PI * 2) / 8) * 280,
                          0,
                        ],
                        y: [
                          0,
                          Math.sin((i * Math.PI * 2) / 8) * 280,
                          0,
                        ],
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: 4,
                        delay: i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}

                  {/* Rotating rings around image */}
                  {[0, 1].map((ringIndex) => (
                    <motion.div
                      key={ringIndex}
                      className="absolute inset-0 rounded-full border-2 pointer-events-none"
                      style={{
                        borderColor: ringIndex === 0 ? 'rgba(6, 182, 212, 0.3)' : 'rgba(139, 92, 246, 0.3)',
                        boxShadow: `0 0 30px ${ringIndex === 0 ? 'rgba(6, 182, 212, 0.5)' : 'rgba(139, 92, 246, 0.5)'}`,
                        transform: `scale(${1.1 + ringIndex * 0.1})`,
                      }}
                      animate={{
                        rotate: ringIndex === 0 ? [0, 360] : [360, 0],
                        scale: [1.1 + ringIndex * 0.1, 1.2 + ringIndex * 0.1, 1.1 + ringIndex * 0.1],
                      }}
                      transition={{
                        rotate: {
                          duration: 20 + ringIndex * 5,
                          repeat: Infinity,
                          ease: "linear",
                        },
                        scale: {
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                    />
                  ))}

                  {/* Corner accent lights */}
                  {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((position, i) => (
                    <motion.div
                      key={i}
                      className={`absolute ${position} w-20 h-20`}
                      style={{
                        background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(6, 182, 212, 0.4)' : 'rgba(139, 92, 246, 0.4)'}, transparent 70%)`,
                        filter: 'blur(20px)',
                      }}
                      animate={{
                        opacity: [0.3, 0.7, 0.3],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CallToAction
          title="Get Your Site Hosted"
          highlight="With Montrose"
          description="Experience enterprise-grade hosting with the simplicity of a managed service. Start with a free migration."
          primaryButton={{
            text: "Start Free Trial",
            href: "/auth/register"
          }}
          secondaryButton={{
            text: "Talk to Sales",
            href: "/contact"
          }}
        />

        <Footer />
      </div>
    </div>
  );
}
