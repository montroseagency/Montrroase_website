'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navigation from '@/components/marketing/navigation';
import Footer from '@/components/marketing/footer';
import InteractiveGlowBackground from '@/components/interactive-glow-background';
import ServiceCard from '@/components/services/ServiceCard';
import SectionHeader from '@/components/services/SectionHeader';
import FeatureGrid from '@/components/services/FeatureGrid';
import CallToAction from '@/components/services/CallToAction';
import Link from 'next/link';

// Floating Particles Component
const FloatingParticles = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, rgba(6, 182, 212, 0.6), rgba(139, 92, 246, 0.3))`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, mousePosition.x * 20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Animated Background Orbs
const AnimatedOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15), transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: ['-25%', '25%', '-25%'],
          y: ['-10%', '10%', '-10%'],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute right-0 bottom-0 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: ['25%', '-25%', '25%'],
          y: ['10%', '-10%', '10%'],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

// Why Choose Montrose Section with 3D Parallax
const WhyChooseMontrose = ({ features }: { features: any[] }) => {
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
              Montrose?
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
              <ParallaxCard
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

// 3D Parallax Card Component
const ParallaxCard = ({
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

  // Calculate tilt based on mouse position
  const rotateX = mousePosition.y * -10; // Max 10 degrees
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
            <motion.div
              className="absolute top-0 left-0 w-2 h-2 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #06B6D4, #8B5CF6)',
                boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)',
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute top-0 right-0 w-2 h-2 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
                boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)',
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                delay: 0.5,
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-2 h-2 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #06B6D4, #8B5CF6)',
                boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)',
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                delay: 1,
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-2 h-2 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
                boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)',
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                delay: 1.5,
                repeat: Infinity,
              }}
            />
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

        {/* Icon with rotation animation */}
        <motion.div
          className="relative w-16 h-16 rounded-xl flex items-center justify-center mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(139, 92, 246, 0.3))',
            boxShadow: isHovered
              ? '0 0 30px rgba(6, 182, 212, 0.6)'
              : '0 0 20px rgba(6, 182, 212, 0.3)',
          }}
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? [0, 5, -5, 0] : 0,
          }}
          transition={{
            scale: { duration: 0.3 },
            rotate: { duration: 0.6, repeat: isHovered ? Infinity : 0 }
          }}
        >
          {/* Orbiting particles around icon */}
          {isHovered && (
            <>
              <motion.div
                className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400"
                animate={{
                  x: [0, 35, 0, -35, 0],
                  y: [35, 0, -35, 0, 35],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute w-1.5 h-1.5 rounded-full bg-violet-400"
                animate={{
                  x: [35, 0, -35, 0, 35],
                  y: [0, -35, 0, 35, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </>
          )}

          <motion.div
            animate={{
              scale: isHovered ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 1,
              repeat: isHovered ? Infinity : 0,
            }}
          >
            {feature.icon}
          </motion.div>
        </motion.div>

        {/* Title with letter animation */}
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
              ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.8), rgba(139, 92, 246, 0.8)) 1'
              : 'none',
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            rotate: isHovered ? 360 : 0,
          }}
          transition={{
            opacity: { duration: 0.3 },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          }}
        />

        {/* Ripple effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              border: '1px solid rgba(6, 182, 212, 0.5)',
            }}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{
              scale: 1.5,
              opacity: 0,
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

// Snake Services Section Component
const SnakeServicesSection = ({ services }: { services: any[] }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 sm:px-8 lg:px-12 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #040B1E 0%, #091B3D 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to succeed online, all in one place
          </p>
        </div>

        {/* Desktop Snake Layout */}
        <div className="hidden lg:block relative">
          {/* Animated Snake Path SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
          >
            <defs>
              <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Snake Path */}
            <motion.path
              d="M 150 100 Q 350 80, 550 100 Q 750 120, 950 100"
              stroke="url(#snakeGradient)"
              strokeWidth="3"
              fill="none"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Animated Glowing Dots */}
            {[0, 1, 2, 3].map((i) => (
              <motion.circle
                key={i}
                cx={150 + i * 270}
                cy={100}
                r="8"
                fill="url(#snakeGradient)"
                filter="url(#glow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  isInView
                    ? {
                        scale: [0, 1.2, 1],
                        opacity: [0, 1, 1],
                      }
                    : { scale: 0, opacity: 0 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.5 + i * 0.2,
                }}
              />
            ))}

            {/* Pulsing Animation for Dots */}
            {[0, 1, 2, 3].map((i) => (
              <motion.circle
                key={`pulse-${i}`}
                cx={150 + i * 270}
                cy={100}
                r="8"
                fill="none"
                stroke="url(#snakeGradient)"
                strokeWidth="2"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </svg>

          {/* Service Cards */}
          <div className="relative grid grid-cols-4 gap-8 pt-32">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.15 }}
                className="relative"
              >
                <Link href={service.href}>
                  <div
                    className="group relative p-6 rounded-2xl transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto"
                      style={{
                        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(139, 92, 246, 0.3))',
                        boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
                      }}
                    >
                      {service.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-3 text-center">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-400 text-center leading-relaxed">
                      {service.description}
                    </p>

                    {/* Hover Glow Effect */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.15), transparent 70%)',
                      }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Vertical Stack */}
        <div className="lg:hidden relative">
          {/* Vertical Snake Path */}
          <svg
            className="absolute left-8 top-0 h-full pointer-events-none"
            width="100"
            style={{ zIndex: 0 }}
          >
            <defs>
              <linearGradient id="snakeGradientMobile" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            <motion.line
              x1="50"
              y1="0"
              x2="50"
              y2="100%"
              stroke="url(#snakeGradientMobile)"
              strokeWidth="3"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Dots for Mobile */}
            {[0, 1, 2, 3].map((i) => (
              <motion.circle
                key={i}
                cx="50"
                cy={50 + i * 250}
                r="6"
                fill="url(#snakeGradientMobile)"
                filter="url(#glow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  isInView
                    ? {
                        scale: [0, 1.2, 1],
                        opacity: [0, 1, 1],
                      }
                    : { scale: 0, opacity: 0 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.5 + i * 0.2,
                }}
              />
            ))}
          </svg>

          {/* Service Cards - Mobile */}
          <div className="relative space-y-8 pl-24">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.15 }}
              >
                <Link href={service.href}>
                  <div
                    className="group p-6 rounded-2xl transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(139, 92, 246, 0.3))',
                        boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
                      }}
                    >
                      {service.icon}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">
                      {service.title}
                    </h3>

                    <p className="text-sm text-gray-400 leading-relaxed">
                      {service.description}
                    </p>

                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.15), transparent 70%)',
                      }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pulsing Glow Animation */}
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  );
};

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('marketing');

  const services = [
    {
      id: 'marketing',
      title: 'Digital Marketing',
      description: 'AI-powered campaigns that drive real results. Manage TikTok, Instagram, and Facebook from one intelligent dashboard with real-time analytics.',
      href: '/services/marketing',
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      id: 'website',
      title: 'Website Development',
      description: 'Build stunning, high-converting websites with our AI-driven builder. From concept to launch, we handle design, development, and optimization.',
      href: '/services/website',
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'hosting',
      title: 'Hosting & Infrastructure',
      description: 'Lightning-fast, secure hosting with 99.9% uptime. Powered by AWS, CloudFront, and Vercel for maximum performance and reliability.',
      href: '/services/hosting',
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
    },
    {
      id: 'seo',
      title: 'SEO & Optimization',
      description: 'Dominate search rankings with data-driven SEO strategies. Technical optimization, keyword intelligence, and content that converts.',
      href: '/services/seo',
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
  ];

  const whyChoose = [
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'AI-Powered Intelligence',
      description: 'Machine learning algorithms optimize every aspect of your digital presence in real-time.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      title: 'All-in-One Dashboard',
      description: 'Manage marketing, hosting, analytics, and more from a single, intuitive control center.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '24/7 Expert Support',
      description: 'Our team is always available to help you succeed, with real humans who understand your business.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Scalable Systems',
      description: 'Infrastructure that grows with your business, from startup to enterprise without limits.'
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
              badge="Full-Service Digital Agency"
              title="Empowering Digital Growth"
              highlight="Through Innovation"
              description="Transform your business with integrated services designed to maximize growth, performance, and ROI."
              align="center"
            />
          </div>
        </section>

        {/* Interactive Tabs */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {services.map((service) => (
                <motion.button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === service.id
                      ? 'bg-white/20 text-white border border-white/30 shadow-lg'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {service.title}
                </motion.button>
              ))}
            </div>

            {/* Tab Content Preview */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-6">
                  {services.find(s => s.id === activeTab)?.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {services.find(s => s.id === activeTab)?.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {services.find(s => s.id === activeTab)?.description}
                </p>
                <Link
                  href={services.find(s => s.id === activeTab)?.href || '#'}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  Learn More
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Service Overview Cards - Snake Layout */}
        <SnakeServicesSection services={services} />

        {/* Why Choose Montrose */}
        <WhyChooseMontrose features={whyChoose} />

        {/* Stats Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '500', suffix: '+', label: 'Active Clients' },
                { value: '98', suffix: '%', label: 'Client Satisfaction' },
                { value: '2', suffix: 'M+', label: 'Revenue Generated' },
                { value: '24', suffix: '/7', label: 'Expert Support' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CallToAction
          title="Start Your Journey"
          highlight="With Montrose"
          description="Join hundreds of businesses already growing with our integrated platform. Get started with a free consultation."
          primaryButton={{
            text: "Get Started Free",
            href: "/auth/register"
          }}
          secondaryButton={{
            text: "Schedule Consultation",
            href: "/contact"
          }}
        />

        <Footer />
      </div>
    </div>
  );
}
