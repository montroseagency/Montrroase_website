'use client';

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Navigation from '@/components/marketing/navigation';
import Footer from '@/components/marketing/footer';
import InteractiveGlowBackground from '@/components/interactive-glow-background';
import SectionHeader from '@/components/services/SectionHeader';
import FeatureGrid from '@/components/services/FeatureGrid';
import CallToAction from '@/components/services/CallToAction';
import AnimatedCounter from '@/components/services/AnimatedCounter';

// 3D AI Security Core Component
const AISecurityCore = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      {/* Central glowing sphere */}
      <motion.div
        className="relative w-32 h-32"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360],
        }}
        transition={{
          scale: { duration: 3, repeat: Infinity },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
        style={{
          transform: `perspective(1000px) rotateY(${mousePosition.x * 20}deg) rotateX(${mousePosition.y * -20}deg)`,
        }}
      >
        {/* Core sphere */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.8), rgba(139, 92, 246, 0.6), rgba(16, 185, 129, 0.4))',
            boxShadow: `
              0 0 40px rgba(6, 182, 212, 0.8),
              0 0 80px rgba(139, 92, 246, 0.6),
              0 0 120px rgba(16, 185, 129, 0.4),
              inset 0 0 40px rgba(6, 182, 212, 0.4)
            `,
            filter: 'blur(2px)',
          }}
        />

        {/* Orbiting rings */}
        {[0, 60, 120].map((rotation, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              transform: `rotateZ(${rotation}deg)`,
            }}
            animate={{
              rotateX: [0, 360],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              className="absolute inset-0 rounded-full border-2"
              style={{
                borderColor: i === 0 ? 'rgba(6, 182, 212, 0.6)' : i === 1 ? 'rgba(139, 92, 246, 0.6)' : 'rgba(16, 185, 129, 0.6)',
                boxShadow: `0 0 20px ${i === 0 ? 'rgba(6, 182, 212, 0.6)' : i === 1 ? 'rgba(139, 92, 246, 0.6)' : 'rgba(16, 185, 129, 0.6)'}`,
              }}
            />
          </motion.div>
        ))}

        {/* Energy waves */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`wave-${i}`}
            className="absolute inset-0 rounded-full border-2 border-cyan-400/40"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{
              scale: [1, 2.5],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 3,
              delay: i,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>
    </div>
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

// 3D Security Card Component
const SecurityCard3D = ({
  feature,
  index,
  mousePosition,
  isInView,
  orbitalRotation,
}: {
  feature: any;
  index: number;
  mousePosition: { x: number; y: number };
  isInView: boolean;
  orbitalRotation: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate position in circle with orbital rotation
  const baseAngle = (index / 4) * Math.PI * 2 - Math.PI / 2;
  const angle = baseAngle + (orbitalRotation * Math.PI / 180);
  const radius = 280;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  // Calculate 3D rotation based on mouse
  const rotateX = mousePosition.y * -15;
  const rotateY = mousePosition.x * 15;
  const translateZ = isHovered ? 50 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, z: -200 }}
      animate={isInView ? { opacity: 1, z: 0 } : { opacity: 0, z: -200 }}
      transition={{
        duration: 1,
        delay: 0.3 + index * 0.2,
        type: "spring",
      }}
      className="absolute"
      style={{
        left: '50%',
        top: '50%',
        transform: `translate(${x}px, ${y}px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative w-64 p-6 rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(6, 18, 36, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          boxShadow: isHovered
            ? `0 20px 80px rgba(6, 182, 212, 0.4), 0 0 40px rgba(139, 92, 246, 0.3), inset 0 0 30px rgba(6, 182, 212, 0.1)`
            : `0 10px 40px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(6, 182, 212, 0.05)`,
        }}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Holographic scan lines */}
        {isHovered && (
          <>
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ y: '-100%' }}
              animate={{ y: '200%' }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background: 'linear-gradient(180deg, transparent, rgba(6, 182, 212, 0.2), transparent)',
                height: '20%',
              }}
            />

            {/* Holographic grid */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
              }}
            />

            {/* Corner indicators */}
            {[[0, 0], [0, 100], [100, 0], [100, 100]].map(([x, y], i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4"
                style={{
                  left: x === 0 ? '8px' : 'auto',
                  right: x === 100 ? '8px' : 'auto',
                  top: y === 0 ? '8px' : 'auto',
                  bottom: y === 100 ? '8px' : 'auto',
                  borderLeft: x === 0 ? '2px solid rgba(6, 182, 212, 0.8)' : 'none',
                  borderRight: x === 100 ? '2px solid rgba(6, 182, 212, 0.8)' : 'none',
                  borderTop: y === 0 ? '2px solid rgba(6, 182, 212, 0.8)' : 'none',
                  borderBottom: y === 100 ? '2px solid rgba(6, 182, 212, 0.8)' : 'none',
                  boxShadow: '0 0 10px rgba(6, 182, 212, 0.6)',
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

        {/* Icon with glow */}
        <motion.div
          className="relative w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto"
          style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(16, 185, 129, 0.3))',
            boxShadow: isHovered
              ? '0 0 40px rgba(6, 182, 212, 0.8), 0 0 60px rgba(16, 185, 129, 0.6)'
              : '0 0 20px rgba(6, 182, 212, 0.4)',
          }}
          animate={{
            rotate: isHovered ? [0, 360] : 0,
          }}
          transition={{
            duration: 20,
            repeat: isHovered ? Infinity : 0,
            ease: "linear",
          }}
        >
          {feature.icon}

          {/* Orbiting particles */}
          {isHovered && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-cyan-400"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.66,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    left: '50%',
                    top: '-10px',
                    transformOrigin: '0 42px',
                    boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)',
                  }}
                />
              ))}
            </>
          )}
        </motion.div>

        {/* Title */}
        <h3
          className="text-lg font-bold text-center mb-3 relative z-10"
          style={{
            color: '#F0FDFA',
            textShadow: isHovered ? '0 0 20px rgba(6, 182, 212, 0.6)' : '0 2px 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          {feature.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm text-gray-400 text-center leading-relaxed relative z-10"
          style={{
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
          }}
        >
          {feature.description}
        </p>

        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(135deg, rgba(6, 182, 212, ${isHovered ? 0.4 : 0}), rgba(16, 185, 129, ${isHovered ? 0.3 : 0}))`,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

// Main 3D AI Security Section
const AISecuritySection3D = ({ securityFeatures }: { securityFeatures: any[] }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [orbitalRotation, setOrbitalRotation] = useState(0);

  // Continuous orbital rotation animation
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setOrbitalRotation((prev) => (prev + 0.3) % 360);
    }, 30); // Smooth 30ms updates

    return () => clearInterval(interval);
  }, [isInView]);

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
        background: 'linear-gradient(180deg, #0A0E27 0%, #1A1B3D 50%, #000000 100%)',
        minHeight: '100vh',
      }}
    >
      {/* Animated nebula background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              background: i % 3 === 0 ? '#06B6D4' : i % 3 === 1 ? '#8B5CF6' : '#10B981',
              boxShadow: `0 0 ${Math.random() * 20 + 10}px currentColor`,
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              delay: Math.random() * 5,
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

      {/* 3D Card Layout with AI Core */}
      <div className="relative max-w-7xl mx-auto" style={{ height: '800px' }}>
        {/* AI Core in center */}
        <AISecurityCore mousePosition={mousePosition} />

        {/* Circuit connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
          <defs>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#10B981" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {securityFeatures.map((_, index) => {
            const baseAngle = (index / 4) * Math.PI * 2 - Math.PI / 2;
            const angle = baseAngle + (orbitalRotation * Math.PI / 180);
            const x = 50 + Math.cos(angle) * 35;
            const y = 50 + Math.sin(angle) * 35;

            return (
              <motion.line
                key={index}
                x1="50%"
                y1="50%"
                x2={`${x}%`}
                y2={`${y}%`}
                stroke="url(#circuitGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  delay: 0.5 + index * 0.2,
                  ease: "easeInOut",
                }}
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.8))',
                }}
              />
            );
          })}

          {/* Animated energy pulses along circuits */}
          {securityFeatures.map((_, index) => {
            const baseAngle = (index / 4) * Math.PI * 2 - Math.PI / 2;
            const angle = baseAngle + (orbitalRotation * Math.PI / 180);
            const x = 50 + Math.cos(angle) * 35;
            const y = 50 + Math.sin(angle) * 35;

            return (
              <motion.circle
                key={`pulse-${index}`}
                r="4"
                fill="rgba(6, 182, 212, 0.8)"
                cx={`${50 + (Math.cos(angle) * 35 * ((index * 0.75 * 1000) % 3000) / 3000)}%`}
                cy={`${50 + (Math.sin(angle) * 35 * ((index * 0.75 * 1000) % 3000) / 3000)}%`}
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 1))',
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3,
                  delay: index * 0.75,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </svg>

        {/* Floating 3D Cards */}
        {securityFeatures.map((feature, index) => (
          <SecurityCard3D
            key={index}
            feature={feature}
            index={index}
            mousePosition={mousePosition}
            isInView={isInView}
            orbitalRotation={orbitalRotation}
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
      logo: '☁️',
      color: 'from-orange-500 to-yellow-500',
      description: 'Global infrastructure with 99.99% availability across multiple regions.'
    },
    {
      name: 'CloudFront',
      logo: '🚀',
      color: 'from-blue-500 to-cyan-500',
      description: 'Content delivery network with edge locations worldwide for lightning-fast delivery.'
    },
    {
      name: 'Vercel',
      logo: '▲',
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
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden"
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${provider.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                  <div className="relative z-10 text-center">
                    <div className="text-6xl mb-4">{provider.logo}</div>
                    <h3 className="text-2xl font-bold text-white mb-4">{provider.name}</h3>
                    <p className="text-gray-400 leading-relaxed">{provider.description}</p>
                  </div>
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
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
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

        {/* Testimonials */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeader
              title="Trusted by"
              highlight="Growing Companies"
              description="See why businesses choose Montrose for their hosting needs."
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
                  <div className="text-3xl font-bold text-blue-400 mb-2">{testimonial.stat.value}</div>
                  <div className="text-sm text-gray-400 mb-6">{testimonial.stat.label}</div>

                  <p className="text-gray-300 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>

                  <div className="pt-6 border-t border-white/10">
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                    <div className="text-sm text-blue-400 mt-1">{testimonial.company}</div>
                  </div>
                </motion.div>
              ))}
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
