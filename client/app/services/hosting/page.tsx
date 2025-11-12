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

// Ultra-Modern Floating 3D Card Component
const FloatingSecurityCard = ({
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

  // Evenly spaced positions in a 2x2 grid with depth layers
  const positions = [
    { x: -400, y: -200, z: 30, delay: 0, floatOffset: 0, zIndex: 4, rotateZ: -2 },
    { x: 400, y: -200, z: -20, delay: 0.2, floatOffset: 0.7, zIndex: 2, rotateZ: 2 },
    { x: -400, y: 220, z: -30, delay: 0.4, floatOffset: 1.2, zIndex: 2, rotateZ: 1 },
    { x: 400, y: 220, z: 40, delay: 0.6, floatOffset: 1.8, zIndex: 4, rotateZ: -1 },
  ];

  const pos = positions[index];

  // Independent mouse parallax effect - each card responds differently
  const parallaxX = mousePosition.x * (25 + index * 8);
  const parallaxY = mousePosition.y * (25 + index * 8);

  // 3D tilt based on mouse position - enhanced on hover
  const tiltX = isHovered ? mousePosition.y * -20 : mousePosition.y * -8;
  const tiltY = isHovered ? mousePosition.x * 20 : mousePosition.x * 8;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)', y: 50 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }
          : { opacity: 0, scale: 0.8, filter: 'blur(10px)', y: 50 }
      }
      transition={{
        duration: 0.8,
        delay: pos.delay,
        type: 'spring',
        stiffness: 80,
        damping: 15,
      }}
      className="absolute"
      style={{
        left: '50%',
        top: '50%',
        zIndex: pos.zIndex,
        transform: `
          translate(-50%, -50%)
          translate3d(${pos.x + parallaxX}px, ${pos.y + parallaxY}px, ${pos.z}px)
          perspective(1500px)
          rotateX(${tiltX}deg)
          rotateY(${tiltY}deg)
          rotateZ(${pos.rotateZ + (isHovered ? 0 : pos.rotateZ * 0.5)}deg)
        `,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative w-72 p-8 rounded-3xl overflow-hidden"
        style={{
          background: isHovered
            ? 'rgba(10, 25, 47, 0.9)'
            : 'rgba(10, 25, 47, 0.75)',
          backdropFilter: 'blur(30px) saturate(180%)',
          border: `2px solid ${
            isHovered ? 'rgba(6, 182, 212, 0.8)' : 'rgba(6, 182, 212, 0.4)'
          }`,
          boxShadow: isHovered
            ? `
                0 30px 90px rgba(6, 182, 212, 0.5),
                0 0 80px rgba(139, 92, 246, 0.4),
                inset 0 0 60px rgba(6, 182, 212, 0.1),
                0 0 0 1px rgba(255, 255, 255, 0.1)
              `
            : `
                0 ${15 + pos.z}px ${50 + Math.abs(pos.z)}px rgba(0, 0, 0, ${0.6 + Math.abs(pos.z) / 100}),
                0 0 30px rgba(6, 182, 212, 0.2),
                inset 0 0 30px rgba(6, 182, 212, 0.05)
              `,
        }}
        animate={{
          y: isHovered ? 0 : [0, -18, 0],
          scale: isHovered ? 1.08 : 1 + (pos.z / 800), // Closer cards appear slightly larger
          rotate: isHovered ? 0 : [0, pos.rotateZ / 2, 0],
        }}
        transition={{
          y: {
            duration: 3.5 + pos.floatOffset,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: pos.floatOffset * 0.5,
          },
          scale: { duration: 0.3 },
          rotate: {
            duration: 4 + pos.floatOffset,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: pos.floatOffset * 0.3,
          },
        }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: `linear-gradient(135deg,
              rgba(6, 182, 212, ${isHovered ? 0.2 : 0}) 0%,
              rgba(139, 92, 246, ${isHovered ? 0.15 : 0}) 100%)`,
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Holographic scan effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl"
            initial={{ y: '-100%' }}
            animate={{ y: '200%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              background:
                'linear-gradient(180deg, transparent, rgba(6, 182, 212, 0.3), transparent)',
              height: '30%',
            }}
          />
        )}

        {/* Neon glow corners */}
        {isHovered && (
          <>
            {[
              'top-2 left-2',
              'top-2 right-2',
              'bottom-2 left-2',
              'bottom-2 right-2',
            ].map((position, i) => (
              <motion.div
                key={i}
                className={`absolute ${position} w-6 h-6`}
                style={{
                  borderTop:
                    i < 2 ? '2px solid rgba(6, 182, 212, 1)' : 'none',
                  borderBottom:
                    i >= 2 ? '2px solid rgba(6, 182, 212, 1)' : 'none',
                  borderLeft:
                    i % 2 === 0 ? '2px solid rgba(6, 182, 212, 1)' : 'none',
                  borderRight:
                    i % 2 === 1 ? '2px solid rgba(6, 182, 212, 1)' : 'none',
                  boxShadow: '0 0 20px rgba(6, 182, 212, 0.8)',
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            ))}
          </>
        )}

        {/* Icon with AI energy glow */}
        <motion.div
          className="relative w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto"
          style={{
            background:
              'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(139, 92, 246, 0.3))',
            boxShadow: isHovered
              ? '0 0 50px rgba(6, 182, 212, 1), 0 0 80px rgba(139, 92, 246, 0.8)'
              : '0 0 30px rgba(6, 182, 212, 0.5)',
          }}
          animate={{
            boxShadow: isHovered
              ? [
                  '0 0 50px rgba(6, 182, 212, 1)',
                  '0 0 70px rgba(139, 92, 246, 1)',
                  '0 0 50px rgba(6, 182, 212, 1)',
                ]
              : '0 0 30px rgba(6, 182, 212, 0.5)',
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <div className="text-3xl">{feature.icon}</div>

          {/* Orbiting particles */}
          {isHovered &&
            [...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-cyan-400"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  left: '50%',
                  top: '-8px',
                  transformOrigin: '0 48px',
                  boxShadow: '0 0 15px rgba(6, 182, 212, 1)',
                }}
              />
            ))}
        </motion.div>

        {/* Title with futuristic font */}
        <h3
          className="text-xl font-black text-center mb-4 tracking-wide"
          style={{
            color: '#F0FDFA',
            textShadow: isHovered
              ? '0 0 30px rgba(6, 182, 212, 1), 0 2px 10px rgba(0, 0, 0, 0.8)'
              : '0 2px 10px rgba(0, 0, 0, 0.8)',
            fontFamily: 'Inter, system-ui, sans-serif',
            letterSpacing: '0.05em',
          }}
        >
          {feature.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm text-gray-300 text-center leading-relaxed"
          style={{
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
          }}
        >
          {feature.description}
        </p>

        {/* Bottom glow bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
          style={{
            background:
              'linear-gradient(90deg, rgba(6, 182, 212, 0.8), rgba(139, 92, 246, 0.8))',
            boxShadow: '0 -5px 30px rgba(6, 182, 212, 0.6)',
          }}
          animate={{
            opacity: isHovered ? 1 : 0.5,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Floating Geometric Shapes
const FloatingGeometry = () => {
  const shapes = [
    { type: 'hexagon', x: 10, y: 20, size: 40, duration: 15 },
    { type: 'hexagon', x: 80, y: 70, size: 30, duration: 12 },
    { type: 'hexagon', x: 20, y: 80, size: 35, duration: 18 },
    { type: 'line', x: 40, y: 30, width: 100, duration: 10 },
    { type: 'line', x: 60, y: 60, width: 80, duration: 14 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => {
        if (shape.type === 'hexagon') {
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${shape.x}%`,
                top: `${shape.y}%`,
                width: shape.size,
                height: shape.size,
              }}
              animate={{
                y: [0, -50, 0],
                rotate: [0, 360],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: shape.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon
                  points="50 0, 95 25, 95 75, 50 100, 5 75, 5 25"
                  fill="none"
                  stroke="rgba(6, 182, 212, 0.4)"
                  strokeWidth="2"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.6))',
                  }}
                />
              </svg>
            </motion.div>
          );
        }

        return (
          <motion.div
            key={i}
            className="absolute h-0.5"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: shape.width,
              background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.6), transparent)',
              boxShadow: '0 0 10px rgba(139, 92, 246, 0.6)',
            }}
            animate={{
              scaleX: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};


// Main Ultra-Modern 3D Security Section
const AISecuritySection3D = ({ securityFeatures }: { securityFeatures: any[] }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 sm:px-8 lg:px-12 overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        background: 'linear-gradient(180deg, #050A1E 0%, #0A1628 25%, #0D1B3A 50%, #0A152E 75%, #000000 100%)',
        minHeight: '100vh',
      }}
    >
      {/* Enhanced animated nebula background with particles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 3 + 1.5,
              height: Math.random() * 3 + 1.5,
              background: i % 3 === 0 ? '#06B6D4' : i % 3 === 1 ? '#8B5CF6' : '#10B981',
              boxShadow: `0 0 ${Math.random() * 25 + 15}px currentColor`,
              filter: 'blur(0.5px)',
            }}
            animate={{
              y: [0, Math.random() * -120 - 80],
              x: [0, Math.random() * 40 - 20],
              opacity: [0, 0.9, 0.9, 0],
              scale: [0, 1.8, 1.8, 0],
            }}
            transition={{
              duration: Math.random() * 12 + 8,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Larger glowing orbs */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 60 + 40,
              height: Math.random() * 60 + 40,
              background: `radial-gradient(circle, ${
                i % 3 === 0
                  ? 'rgba(6, 182, 212, 0.15)'
                  : i % 3 === 1
                  ? 'rgba(139, 92, 246, 0.15)'
                  : 'rgba(16, 185, 129, 0.15)'
              }, transparent 70%)`,
              filter: 'blur(25px)',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <FloatingGeometry />

      {/* Section Header */}
      <motion.div
        className="relative text-center mb-32 z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-5xl sm:text-6xl font-black mb-6">
          <span className="text-white">Enterprise-Grade </span>
          <span
            className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-500 bg-clip-text text-transparent"
            style={{
              textShadow: '0 0 40px rgba(6, 182, 212, 0.5)',
            }}
          >
            AI Security
          </span>
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Your data and applications are protected by multiple layers of security, monitoring, and backup systems powered by advanced AI.
        </p>
      </motion.div>

      {/* Ultra-Modern Floating 3D Cards */}
      <div
        className="relative max-w-7xl mx-auto"
        style={{
          height: '1000px',
          minHeight: '1000px',
          perspective: '2500px',
          perspectiveOrigin: 'center center',
        }}
      >
        {securityFeatures.map((feature, index) => (
          <FloatingSecurityCard
            key={index}
            feature={feature}
            index={index}
            mousePosition={mousePosition}
            isInView={isInView}
          />
        ))}
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

  const securityFeatures = [
    {
      icon: (
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'SSL Certificates',
      description: 'Free SSL certificates for all domains with automatic renewal and HTTPS enforcement.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'DDoS Protection',
      description: 'Enterprise-grade protection against distributed denial-of-service attacks.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Web Application Firewall',
      description: 'Advanced firewall rules to block malicious traffic and prevent intrusions.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      title: 'Daily Backups',
      description: 'Automated daily backups with one-click restore and 30-day retention.'
    },
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

        {/* 3D AI Security & Reliability */}
        <AISecuritySection3D securityFeatures={securityFeatures} />

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

            {/* World Map Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Global Edge Network</h3>
                  <p className="text-gray-400">200+ locations worldwide for instant content delivery</p>
                </div>

                <div className="aspect-video bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl flex items-center justify-center relative overflow-hidden">
                  {/* Animated dots representing global locations */}
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-blue-400 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}

                  <div className="relative z-10 text-center">
                    <div className="text-5xl font-bold text-white mb-2">200+</div>
                    <div className="text-gray-400">Global Edge Locations</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Custom Dashboard */}
        <section className="py-24 relative overflow-hidden">
          {/* Animated Snake Background */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <svg
              className="absolute w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 800"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                </linearGradient>
                <filter id="snakeGlow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Main snake path */}
              <motion.path
                d="M-100,300 Q200,150 400,300 T800,300 Q1000,400 1200,300"
                stroke="url(#snakeGradient)"
                strokeWidth="3"
                fill="none"
                filter="url(#snakeGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 1, 0],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Secondary snake path */}
              <motion.path
                d="M-100,500 Q300,550 600,400 T1200,500"
                stroke="url(#snakeGradient)"
                strokeWidth="2"
                fill="none"
                filter="url(#snakeGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 1, 0],
                  opacity: [0, 0.6, 0.6, 0],
                }}
                transition={{
                  duration: 10,
                  delay: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Flowing particles along the path */}
              {[...Array(8)].map((_, i) => (
                <motion.circle
                  key={i}
                  r="4"
                  fill="#06B6D4"
                  filter="url(#snakeGlow)"
                  initial={{ opacity: 0 }}
                  animate={{
                    cx: [
                      -100 + (i * 150),
                      200 + (i * 100),
                      400 + (i * 80),
                      600 + (i * 90),
                      800 + (i * 100),
                      1200
                    ],
                    cy: [
                      300,
                      150 + Math.sin(i) * 50,
                      300 + Math.cos(i) * 40,
                      300,
                      400 + Math.sin(i) * 30,
                      300
                    ],
                    opacity: [0, 1, 1, 1, 1, 0],
                  }}
                  transition={{
                    duration: 6,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <SectionHeader
              title="Powerful"
              highlight="Dashboard"
              description="Manage your entire infrastructure from one intuitive control panel. No technical expertise required."
              align="center"
            />

            <FeatureGrid features={dashboardFeatures} columns={4} />

            {/* Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-blue-900/50 rounded-xl flex items-center justify-center relative overflow-hidden">
                  {/* Animated UI elements */}
                  <div className="absolute inset-8 grid grid-cols-3 gap-4">
                    {[...Array(9)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                        className="bg-white/10 rounded-lg border border-white/20"
                      />
                    ))}
                  </div>

                  <div className="relative z-10 text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Control Panel</h3>
                    <p className="text-gray-400">Manage everything from one place</p>
                  </div>
                </div>
              </div>
            </motion.div>
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
