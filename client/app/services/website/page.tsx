'use client';

import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import Navigation from '@/components/marketing/navigation';
import Footer from '@/components/marketing/footer';
import InteractiveGlowBackground from '@/components/interactive-glow-background';
import SectionHeader from '@/components/services/SectionHeader';
import FeatureGrid from '@/components/services/FeatureGrid';
import CallToAction from '@/components/services/CallToAction';
import Link from 'next/link';

// Wave Animation Card Component
const WaveCard = ({
  feature,
  index,
  isInView,
}: {
  feature: any;
  index: number;
  isInView: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, rotateY: index % 2 === 0 ? -15 : 15 }}
      animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50, rotateY: index % 2 === 0 ? -15 : 15 }}
      transition={{ duration: 0.8, delay: index * 0.15, type: "spring", stiffness: 80 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        className="relative p-8 rounded-3xl overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: isHovered
            ? '0 25px 80px rgba(139, 92, 246, 0.4), 0 0 50px rgba(59, 130, 246, 0.3)'
            : '0 10px 40px rgba(0, 0, 0, 0.4)',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? 1.05 : 1,
          rotateX: isHovered ? [0, 2, 0, -2, 0] : 0,
        }}
        transition={{
          scale: { duration: 0.3 },
          rotateX: { duration: 2, repeat: isHovered ? Infinity : 0 }
        }}
      >
        {/* Animated wave background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at ${50 + i * 10}% 50%, rgba(139, 92, 246, ${0.15 - i * 0.04}), transparent 60%)`,
              }}
              animate={{
                x: ['-100%', '100%'],
                y: ['-50%', '50%'],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                delay: i * 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Ripple effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-3xl"
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              border: '2px solid rgba(139, 92, 246, 0.5)',
            }}
          />
        )}

        {/* Glowing corners animation */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none">
          {[
            { top: 0, left: 0, rotate: 0 },
            { top: 0, right: 0, rotate: 90 },
            { bottom: 0, left: 0, rotate: 270 },
            { bottom: 0, right: 0, rotate: 180 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-20 h-20"
              style={{
                ...pos,
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), transparent)',
                filter: 'blur(20px)',
                rotate: pos.rotate,
              }}
              animate={{
                opacity: isHovered ? [0.3, 0.8, 0.3] : 0,
                scale: isHovered ? [1, 1.3, 1] : 1,
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: isHovered ? Infinity : 0,
              }}
            />
          ))}
        </div>

        {/* Floating particles */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  left: `${20 + i * 10}%`,
                  bottom: 0,
                  background: i % 2 === 0 ? 'rgba(139, 92, 246, 0.8)' : 'rgba(59, 130, 246, 0.8)',
                  boxShadow: `0 0 10px ${i % 2 === 0 ? 'rgba(139, 92, 246, 1)' : 'rgba(59, 130, 246, 1)'}`,
                }}
                animate={{
                  y: [0, -100 - Math.random() * 50],
                  x: [(Math.random() - 0.5) * 30],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        )}

        {/* Gradient border animation */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            padding: '1px',
            background: `linear-gradient(${isHovered ? 135 : 0}deg, rgba(139, 92, 246, 0.5), rgba(59, 130, 246, 0.5))`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Title */}
        <motion.h3
          className="text-2xl font-bold mb-4 relative z-10"
          style={{
            color: '#F5F7FA',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
          }}
          animate={{
            textShadow: isHovered
              ? [
                  '0 2px 10px rgba(0, 0, 0, 0.5)',
                  '0 0 20px rgba(139, 92, 246, 0.8)',
                  '0 2px 10px rgba(0, 0, 0, 0.5)',
                ]
              : '0 2px 10px rgba(0, 0, 0, 0.5)',
          }}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
        >
          {feature.title}
        </motion.h3>

        {/* Description */}
        <p
          className="text-gray-400 leading-relaxed relative z-10"
          style={{
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
          }}
        >
          {feature.description}
        </p>

        {/* Bottom wave indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1">
          <motion.div
            className="h-full"
            style={{
              background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.6), rgba(59, 130, 246, 0.6))',
              boxShadow: '0 -2px 20px rgba(139, 92, 246, 0.5)',
            }}
            animate={{
              scaleX: isHovered ? [1, 0.8, 1] : 1,
              opacity: isHovered ? [0.6, 1, 0.6] : 0.6,
            }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// Builder Cards Section Component
const BuilderCardsSection = ({ features }: { features: any[] }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
      {features.map((feature, index) => (
        <WaveCard
          key={index}
          feature={feature}
          index={index}
          isInView={isInView}
        />
      ))}
    </div>
  );
};

// 3D Dropdown Workflow Step Component
const WorkflowStepCard = ({
  step,
  index,
  isInView,
}: {
  step: any;
  index: number;
  isInView: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Gradient colors for each step
  const gradients = [
    { border: 'from-blue-400 via-cyan-400 to-blue-500', glow: 'rgba(59, 130, 246, 0.5)', number: 'from-blue-400 to-cyan-400' },
    { border: 'from-pink-400 via-purple-400 to-pink-500', glow: 'rgba(236, 72, 153, 0.5)', number: 'from-pink-400 to-purple-400' },
    { border: 'from-orange-400 via-amber-400 to-orange-500', glow: 'rgba(251, 146, 60, 0.5)', number: 'from-orange-400 to-amber-400' },
    { border: 'from-green-400 via-emerald-400 to-green-500', glow: 'rgba(34, 197, 94, 0.5)', number: 'from-green-400 to-emerald-400' },
  ];

  const gradient = gradients[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -20 }}
      transition={{ duration: 0.8, delay: index * 0.15, type: "spring" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
      className="cursor-pointer"
      style={{
        perspective: '1200px',
      }}
    >
      <motion.div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: isHovered ? 5 : 0,
          z: isHovered ? 30 : 0,
          boxShadow: isExpanded || isHovered
            ? `0 30px 80px ${gradient.glow}, 0 0 60px ${gradient.glow}`
            : '0 10px 40px rgba(0, 0, 0, 0.5)',
        }}
        transition={{
          duration: 0.4,
          type: "spring",
          stiffness: 100,
        }}
      >
        {/* Animated gradient border */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            padding: '2px',
            background: `linear-gradient(135deg, ${isExpanded || isHovered ? gradient.border : 'rgba(255,255,255,0.1), rgba(255,255,255,0.05)'})`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
          animate={{
            rotate: isExpanded ? 360 : 0,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Glowing orb background */}
        <motion.div
          className="absolute inset-0 opacity-20 blur-3xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${gradient.glow}, transparent 70%)`,
          }}
          animate={{
            scale: isExpanded || isHovered ? [1, 1.5, 1] : 1,
            opacity: isExpanded || isHovered ? [0.2, 0.4, 0.2] : 0.1,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />

        <div className="relative p-8">
          {/* Header Section */}
          <div className="flex items-center justify-between gap-6 mb-6">
            {/* Title & Expand Icon */}
            <div className="flex-1">
              <h3
                className="text-3xl font-bold text-white mb-2"
                style={{
                  textShadow: `0 0 20px ${gradient.glow}`,
                }}
              >
                {step.title}
              </h3>
              <motion.div
                className="text-gray-400 text-sm font-medium"
                animate={{
                  opacity: isExpanded ? 0 : 1,
                }}
              >
                Click to expand
              </motion.div>
            </div>

            {/* Expand Indicator */}
            <motion.div
              className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient.number} flex items-center justify-center flex-shrink-0`}
              animate={{
                rotate: isExpanded ? 180 : 0,
                scale: isExpanded ? 1.1 : 1,
              }}
              transition={{ duration: 0.4 }}
              style={{
                boxShadow: `0 0 20px ${gradient.glow}`,
              }}
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>

          {/* Description - Always Visible */}
          <p className="text-gray-300 leading-relaxed mb-4">
            {step.description}
          </p>

          {/* Expandable Content with 3D Slide Animation */}
          <motion.div
            initial={false}
            animate={{
              height: isExpanded ? 'auto' : 0,
              opacity: isExpanded ? 1 : 0,
              rotateX: isExpanded ? 0 : -90,
              transformOrigin: 'top',
            }}
            transition={{
              height: { duration: 0.6, ease: "easeOut" },
              opacity: { duration: 0.4, delay: isExpanded ? 0.2 : 0 },
              rotateX: { duration: 0.6, ease: "easeOut" },
            }}
            style={{
              overflow: 'hidden',
              transformStyle: 'preserve-3d',
            }}
          >
            <motion.div
              className="pt-6 border-t border-white/10 space-y-4"
              initial={{ y: -20 }}
              animate={{ y: isExpanded ? 0 : -20 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {step.features.map((feature: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -20 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  {/* Animated bullet */}
                  <motion.div
                    className={`w-3 h-3 rounded-full bg-gradient-to-r ${gradient.number}`}
                    animate={{
                      scale: [1, 1.3, 1],
                      boxShadow: [
                        `0 0 10px ${gradient.glow}`,
                        `0 0 20px ${gradient.glow}`,
                        `0 0 10px ${gradient.glow}`,
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                  <span className="text-white font-medium text-lg">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Depth blur effect on edges */}
          {isExpanded && (
            <>
              <div className="absolute left-0 right-0 top-0 h-20 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
              <div className="absolute left-0 right-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// 3D Why Choose Card Component
const WhyChoose3DCard = ({
  feature,
  index,
  isInView,
}: {
  feature: any;
  index: number;
  isInView: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const colors = [
    { primary: 'rgba(59, 130, 246, 0.6)', glow: 'rgba(59, 130, 246, 0.4)' },
    { primary: 'rgba(139, 92, 246, 0.6)', glow: 'rgba(139, 92, 246, 0.4)' },
    { primary: 'rgba(236, 72, 153, 0.6)', glow: 'rgba(236, 72, 153, 0.4)' },
    { primary: 'rgba(34, 197, 94, 0.6)', glow: 'rgba(34, 197, 94, 0.4)' },
  ];

  const color = colors[index % 4];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 60, rotateX: 20 }}
      transition={{ duration: 0.8, delay: index * 0.1, type: "spring", stiffness: 60 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        className="relative h-full p-8 rounded-3xl overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: isHovered ? 10 : 0,
          z: isHovered ? 50 : 0,
          scale: isHovered ? 1.05 : 1,
          boxShadow: isHovered
            ? `0 30px 80px ${color.glow}, 0 0 50px ${color.glow}`
            : '0 10px 40px rgba(0, 0, 0, 0.3)',
        }}
        transition={{
          duration: 0.4,
          type: "spring",
          stiffness: 100,
        }}
      >
        {/* Pulsing background orb */}
        <motion.div
          className="absolute inset-0 opacity-20 blur-3xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${color.primary}, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: isHovered ? [0.2, 0.4, 0.2] : 0.1,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />

        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            padding: '2px',
            background: `linear-gradient(135deg, ${color.primary}, transparent)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
          animate={{
            rotate: isHovered ? [0, 360] : 0,
          }}
          transition={{
            duration: 3,
            repeat: isHovered ? Infinity : 0,
            ease: "linear",
          }}
        />

        {/* Floating particles on hover */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  bottom: '10%',
                  background: color.primary,
                  boxShadow: `0 0 10px ${color.primary}`,
                }}
                animate={{
                  y: [0, -120 - Math.random() * 40],
                  x: [(Math.random() - 0.5) * 40],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          {/* Title with gradient */}
          <motion.h3
            className="text-2xl font-bold mb-4"
            style={{
              backgroundImage: isHovered ? `linear-gradient(135deg, ${color.primary}, white)` : 'linear-gradient(135deg, white, white)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: isHovered ? `0 0 30px ${color.glow}` : 'none',
            }}
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {feature.title}
          </motion.h3>

          {/* Description */}
          <p className="text-gray-400 leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Bottom glow bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
          style={{
            background: `linear-gradient(90deg, ${color.primary}, transparent)`,
            boxShadow: `0 -5px 20px ${color.glow}`,
          }}
          animate={{
            opacity: isHovered ? 1 : 0.5,
            scaleX: isHovered ? [1, 0.9, 1] : 1,
          }}
          transition={{
            scaleX: { duration: 2, repeat: Infinity },
          }}
        />

        {/* Corner highlights */}
        {isHovered && (
          <>
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  [i < 2 ? 'top' : 'bottom']: 8,
                  [i % 2 === 0 ? 'left' : 'right']: 8,
                  background: color.primary,
                  boxShadow: `0 0 20px ${color.primary}`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
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
      </motion.div>
    </motion.div>
  );
};

// Why Choose Section with 3D Cards
const WhyChoose3DSection = ({ features }: { features: any[] }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
      {features.map((feature, index) => (
        <WhyChoose3DCard
          key={index}
          feature={feature}
          index={index}
          isInView={isInView}
        />
      ))}
    </div>
  );
};

// Premium Quote Estimator Component
const PremiumQuoteEstimator = () => {
  const [selectedType, setSelectedType] = useState('E-commerce');
  const [pageCount, setPageCount] = useState(5);
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const [estimatedCost, setEstimatedCost] = useState(2499);
  const [displayCost, setDisplayCost] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const websiteTypes = [
    { name: 'E-commerce', basePrice: 3999 },
    { name: 'Business', basePrice: 2499 },
    { name: 'Portfolio', basePrice: 1499 },
    { name: 'Landing Page', basePrice: 999 },
  ];

  // Calculate cost based on selections
  const calculateCost = (type: string, pages: number) => {
    const typeData = websiteTypes.find(t => t.name === type);
    const baseCost = typeData?.basePrice || 2499;
    const pageCost = pages * 50;
    return baseCost + pageCost;
  };

  // Update cost when selections change
  useState(() => {
    const newCost = calculateCost(selectedType, pageCount);
    setEstimatedCost(newCost);
  });

  // Animate cost display (counting up effect)
  useState(() => {
    const interval = setInterval(() => {
      setDisplayCost(prev => {
        if (prev < estimatedCost) {
          const increment = Math.ceil((estimatedCost - prev) / 10);
          return Math.min(prev + increment, estimatedCost);
        }
        return prev;
      });
    }, 30);
    return () => clearInterval(interval);
  });

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPageCount(value);

    // Card tilt effect when slider moves
    const tiltAmount = (value - 25) / 25; // Normalize to -1 to 1
    setCardTilt({ x: tiltAmount * 2, y: tiltAmount * 1 });

    setTimeout(() => setCardTilt({ x: 0, y: 0 }), 300);
  };

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0A1628 0%, #1e1b4b 50%, #312e81 100%)',
      }}
    >
      {/* Radial light aura behind card */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="text-white">Get an Instant </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
              }}
            >
              Quote
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Answer a few questions to get an AI-powered estimate for your website project
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={isInView ? {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: cardTilt.x,
            rotateY: cardTilt.y,
          } : { opacity: 0, y: 60, scale: 0.95 }}
          transition={{ duration: 1, type: 'spring', stiffness: 60 }}
          className="relative"
          style={{
            perspective: '1500px',
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            className="relative p-10 rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 30px 90px rgba(0, 0, 0, 0.5), 0 0 80px rgba(99, 102, 241, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Floating glow effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative z-10 space-y-8">
              {/* Website Type Selection - 3D Segmented Buttons */}
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-4 tracking-wide">
                  Website Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {websiteTypes.map((type, i) => {
                    const isSelected = selectedType === type.name;
                    return (
                      <motion.button
                        key={i}
                        onClick={() => setSelectedType(type.name)}
                        className="relative px-6 py-4 rounded-xl overflow-hidden group"
                        style={{
                          background: isSelected
                            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(34, 211, 238, 0.3) 100%)'
                            : 'rgba(255, 255, 255, 0.05)',
                          border: isSelected
                            ? '2px solid rgba(59, 130, 246, 0.5)'
                            : '1px solid rgba(255, 255, 255, 0.1)',
                          boxShadow: isSelected
                            ? '0 10px 40px rgba(59, 130, 246, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
                            : '0 4px 20px rgba(0, 0, 0, 0.3)',
                          transformStyle: 'preserve-3d',
                        }}
                        whileHover={{
                          scale: 1.05,
                          z: 20,
                          boxShadow: '0 15px 50px rgba(59, 130, 246, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
                        }}
                        whileTap={{ scale: 0.98 }}
                        animate={{
                          boxShadow: isSelected
                            ? [
                                '0 10px 40px rgba(59, 130, 246, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
                                '0 10px 40px rgba(34, 211, 238, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
                                '0 10px 40px rgba(59, 130, 246, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
                              ]
                            : '0 4px 20px rgba(0, 0, 0, 0.3)',
                        }}
                        transition={{ duration: 2, repeat: isSelected ? Infinity : 0 }}
                      >
                        {/* Pulse effect on hover */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          whileHover={{
                            opacity: [0, 0.3, 0],
                            scale: [1, 1.5, 2],
                          }}
                          transition={{ duration: 0.8 }}
                          style={{
                            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)',
                          }}
                        />

                        <span
                          className="relative z-10 font-semibold text-sm"
                          style={{
                            color: isSelected ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                            textShadow: isSelected ? '0 0 20px rgba(59, 130, 246, 0.5)' : 'none',
                          }}
                        >
                          {type.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Number of Pages Slider */}
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-4 tracking-wide">
                  Number of Pages: <span className="text-cyan-400">{pageCount}</span>
                </label>

                <div className="relative">
                  {/* Glowing track */}
                  <div
                    className="absolute h-2 top-1/2 -translate-y-1/2 left-0 rounded-full overflow-hidden"
                    style={{
                      width: `${(pageCount / 50) * 100}%`,
                      background: 'linear-gradient(90deg, #3b82f6 0%, #22d3ee 100%)',
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
                    }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)',
                      }}
                    />
                  </div>

                  {/* Base track */}
                  <div
                    className="h-2 rounded-full"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                    }}
                  />

                  {/* Custom slider */}
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={pageCount}
                    onChange={handleSliderChange}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                  />

                  {/* Glowing slider thumb */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                      left: `calc(${(pageCount / 50) * 100}% - 12px)`,
                    }}
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(59, 130, 246, 0.8)',
                        '0 0 40px rgba(34, 211, 238, 0.8)',
                        '0 0 20px rgba(59, 130, 246, 0.8)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #22d3ee 100%)',
                        border: '3px solid rgba(255, 255, 255, 0.3)',
                      }}
                    />
                  </motion.div>
                </div>

                {/* Slider labels */}
                <div className="flex justify-between text-xs text-gray-500 mt-4 px-1">
                  <span>1 page</span>
                  <span>25 pages</span>
                  <span>50+ pages</span>
                </div>
              </div>

              {/* Estimated Cost Display */}
              <motion.div
                className="relative p-8 rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  boxShadow: '0 10px 40px rgba(99, 102, 241, 0.2)',
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 15px 60px rgba(99, 102, 241, 0.3)',
                }}
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 opacity-30"
                  animate={{
                    background: [
                      'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
                      'radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
                      'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
                    ],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />

                <div className="relative z-10 text-center">
                  <div className="text-sm text-gray-400 mb-3 tracking-wider uppercase">
                    Estimated Project Cost
                  </div>

                  {/* Animated cost number */}
                  <motion.div
                    className="text-6xl font-bold mb-3"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, #fff 0%, #a78bfa 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 0 40px rgba(167, 139, 250, 0.5)',
                    }}
                    key={displayCost}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    ${displayCost.toLocaleString()}
                  </motion.div>

                  <div className="text-sm text-gray-400">
                    7-day delivery included • Free revisions
                  </div>
                </div>

                {/* Glowing border animation */}
                <motion.div
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, 0.5) 50%, transparent 100%)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    padding: '1px',
                  }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Get Detailed Quote Button */}
              <motion.button
                className="relative w-full py-5 rounded-xl overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
                  boxShadow: '0 15px 50px rgba(167, 139, 250, 0.4)',
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 20px 70px rgba(236, 72, 153, 0.6)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated highlight effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ x: '-100%' }}
                  whileHover={{
                    x: '100%',
                    transition: { duration: 0.6, ease: 'easeInOut' },
                  }}
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                  }}
                />

                {/* Pulse effect on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: [0, 0.4, 0],
                    scale: [1, 1.05, 1.1],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%)',
                  }}
                />

                <span className="relative z-10 text-white font-bold text-lg tracking-wide">
                  Get Detailed Quote →
                </span>
              </motion.button>
            </div>
          </div>

          {/* Floating particles around card */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 4 + Math.random() * 6,
                height: 4 + Math.random() * 6,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 2 === 0 ? 'rgba(59, 130, 246, 0.6)' : 'rgba(139, 92, 246, 0.6)',
                boxShadow: `0 0 20px ${i % 2 === 0 ? 'rgba(59, 130, 246, 0.8)' : 'rgba(139, 92, 246, 0.8)'}`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 10 - 5, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Modern Workflow Section Component
const ModernWorkflowSection = ({ steps }: { steps: any[] }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0A0E27 0%, #1A1B3D 50%, #2D1B69 100%)',
      }}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 200 + i * 80,
              height: 200 + i * 80,
              left: `${10 + i * 20}%`,
              top: `${-10 + i * 25}%`,
              background: `radial-gradient(circle, ${
                ['rgba(59, 130, 246, 0.1)', 'rgba(236, 72, 153, 0.1)', 'rgba(251, 146, 60, 0.1)', 'rgba(34, 197, 94, 0.1)'][i % 4]
              }, transparent 70%)`,
              filter: 'blur(40px)',
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl sm:text-6xl font-black mb-6">
            <span className="text-white">Step-by-Step </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Workflow
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From discovery to launch, our process is designed for speed, quality, and collaboration.
          </p>
        </motion.div>

        {/* Workflow Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <WorkflowStepCard
              key={index}
              step={step}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* 3D Animated Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring" }}
          className="mt-24 grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.h3
              className="text-4xl md:text-5xl font-black"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Experience the Future of Web Design
            </motion.h3>

            <p className="text-xl text-gray-300 leading-relaxed">
              Watch our AI-powered builder create stunning, professional layouts in real-time. From concept to production-ready design in minutes, not weeks.
            </p>

            <div className="flex flex-wrap gap-4">
              {['Instant Generation', 'Smart Layouts', 'Live Preview'].map((tag, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <span className="text-white font-medium">{tag}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image with 3D Effects */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", stiffness: 60 }}
            className="relative"
            style={{
              perspective: '1500px',
            }}
          >
            {/* Floating orbs around image */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 60 + i * 20,
                  height: 60 + i * 20,
                  left: `${-10 + i * 15}%`,
                  top: `${10 + i * 20}%`,
                  background: `radial-gradient(circle, ${
                    ['rgba(139, 92, 246, 0.3)', 'rgba(59, 130, 246, 0.3)', 'rgba(236, 72, 153, 0.3)'][i % 3]
                  }, transparent 70%)`,
                  filter: 'blur(20px)',
                  zIndex: -1,
                }}
                animate={{
                  x: [0, 20, 0],
                  y: [0, -20, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Main image container with 3D effects */}
            <motion.div
              className="relative rounded-3xl overflow-hidden"
              style={{
                transformStyle: 'preserve-3d',
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                z: 50,
              }}
              transition={{
                duration: 0.4,
                type: "spring",
                stiffness: 100,
              }}
            >
              {/* Animated gradient border */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  padding: '3px',
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.6), rgba(59, 130, 246, 0.6), rgba(236, 72, 153, 0.6))',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  zIndex: 10,
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Glowing overlay on hover */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.4), transparent 70%)',
                  opacity: 0,
                }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Scan line effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ y: '-100%' }}
                animate={{ y: '200%' }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  background: 'linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.3), transparent)',
                  height: '30%',
                }}
              />

              {/* Image with Next.js Image component for better loading */}
              <img
                src="/images/hero/30.png"
                alt="AI Website Builder Demo"
                className="w-full h-auto rounded-3xl"
                style={{
                  boxShadow: '0 30px 100px rgba(139, 92, 246, 0.4)',
                }}
              />

              {/* Particles floating from image */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: `${20 + i * 10}%`,
                    bottom: '20%',
                    background: i % 2 === 0 ? 'rgba(139, 92, 246, 0.8)' : 'rgba(59, 130, 246, 0.8)',
                    boxShadow: `0 0 15px ${i % 2 === 0 ? 'rgba(139, 92, 246, 1)' : 'rgba(59, 130, 246, 1)'}`,
                  }}
                  animate={{
                    y: [0, -150 - Math.random() * 50],
                    x: [(Math.random() - 0.5) * 50],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                  }}
                />
              ))}
            </motion.div>

            {/* Corner accents */}
            {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((position, i) => (
              <motion.div
                key={i}
                className={`absolute ${position} w-12 h-12`}
                style={{
                  borderTop: i < 2 ? '3px solid rgba(139, 92, 246, 0.8)' : 'none',
                  borderBottom: i >= 2 ? '3px solid rgba(139, 92, 246, 0.8)' : 'none',
                  borderLeft: i % 2 === 0 ? '3px solid rgba(139, 92, 246, 0.8)' : 'none',
                  borderRight: i % 2 === 1 ? '3px solid rgba(139, 92, 246, 0.8)' : 'none',
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.6)',
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default function WebsitePage() {
  const builderFeatures = [
    {
      title: 'AI Layout Generation',
      description: 'Describe your vision and watch AI create professional layouts instantly.'
    },
    {
      title: 'Drag-and-Drop Editor',
      description: 'Intuitive visual editor with real-time preview and instant updates.'
    },
    {
      title: 'Mobile-First Design',
      description: 'Every template is optimized for mobile, tablet, and desktop devices.'
    },
    {
      title: 'Component Library',
      description: 'Hundreds of pre-built sections, blocks, and elements ready to use.'
    },
  ];

  const workflowSteps = [
    {
      number: '01',
      title: 'Discovery & Planning',
      description: 'Answer a few questions about your business, goals, and design preferences.',
      features: ['Brand questionnaire', 'Competitor analysis', 'Feature planning'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: '02',
      title: 'AI-Powered Design',
      description: 'Our AI creates multiple design concepts tailored to your brand and industry.',
      features: ['Layout generation', 'Color schemes', 'Typography selection'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      number: '03',
      title: 'Customize & Refine',
      description: 'Work with our team to perfect every detail, or use our builder yourself.',
      features: ['Real-time editing', 'Design feedback', 'Content integration'],
      color: 'from-orange-500 to-red-500'
    },
    {
      number: '04',
      title: 'Launch & Optimize',
      description: 'Deploy your site with one click and continuously optimize for performance.',
      features: ['SEO optimization', 'Performance testing', 'Analytics setup'],
      color: 'from-green-500 to-emerald-500'
    },
  ];

  const portfolioProjects = [
    {
      title: 'Luxury Fashion Brand',
      category: 'E-commerce',
      image: '🛍️',
      stats: { conversion: '+340%', traffic: '+120%' }
    },
    {
      title: 'Tech Startup',
      category: 'SaaS Landing',
      image: '🚀',
      stats: { conversion: '+280%', traffic: '+95%' }
    },
    {
      title: 'Real Estate Agency',
      category: 'Property Listings',
      image: '🏠',
      stats: { conversion: '+210%', traffic: '+150%' }
    },
    {
      title: 'Restaurant Group',
      category: 'Multi-Location',
      image: '🍽️',
      stats: { conversion: '+190%', traffic: '+85%' }
    },
    {
      title: 'Fitness Studio',
      category: 'Booking Platform',
      image: '💪',
      stats: { conversion: '+310%', traffic: '+140%' }
    },
    {
      title: 'Law Firm',
      category: 'Professional Services',
      image: '⚖️',
      stats: { conversion: '+245%', traffic: '+110%' }
    },
  ];

  const whyChoose = [
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: '3.2x Average Conversion Increase',
      description: 'Our designs are optimized for conversions, not just aesthetics.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '7-Day Average Launch Time',
      description: 'From concept to live site in a week with our AI-accelerated workflow.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: '99.9% Uptime Guarantee',
      description: 'Enterprise hosting included with every website we build.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Transparent Pricing',
      description: 'No hidden fees. One fixed price includes design, development, and hosting.'
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
              badge="Montrose Web Builder"
              title="Design That Connects"
              highlight="AI That Creates"
              description="Build stunning, high-converting websites with our AI-powered platform. From concept to launch in days, not months."
              align="center"
            />

            {/* Animated Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-5xl mx-auto">
              {[
                { value: '500+', label: 'Sites Launched' },
                { value: '3.2x', label: 'Avg Conversion Lift' },
                { value: '7', label: 'Days to Launch' },
                { value: '99.9%', label: 'Uptime' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI-Driven Builder */}
        <section className="py-24 relative overflow-hidden">
          {/* Enhanced Snake Flow Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg
              className="absolute w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1400 900"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="flowGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                  <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
                <filter id="flowGlow">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Main flowing path */}
              <motion.path
                d="M-200,200 Q100,100 300,200 T700,200 Q900,150 1100,200 T1600,200"
                stroke="url(#flowGradient1)"
                strokeWidth="4"
                fill="none"
                filter="url(#flowGlow)"
                strokeDasharray="40 20"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -300 }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Secondary flowing path */}
              <motion.path
                d="M-200,400 Q200,450 500,400 T1000,400 Q1200,350 1600,400"
                stroke="url(#flowGradient2)"
                strokeWidth="3"
                fill="none"
                filter="url(#flowGlow)"
                strokeDasharray="30 15"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: 300 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Tertiary flowing path */}
              <motion.path
                d="M-200,600 Q300,550 600,600 T1200,600 Q1400,650 1600,600"
                stroke="url(#flowGradient1)"
                strokeWidth="2.5"
                fill="none"
                filter="url(#flowGlow)"
                strokeDasharray="25 12"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -250 }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Animated flowing particles */}
              {[...Array(6)].map((_, i) => (
                <motion.circle
                  key={i}
                  r="3"
                  fill={i % 2 === 0 ? "#8B5CF6" : "#3B82F6"}
                  filter="url(#flowGlow)"
                  initial={{ opacity: 0 }}
                  animate={{
                    cx: [
                      -100 + (i * 200),
                      300 + (i * 150),
                      700 + (i * 100),
                      1100 + (i * 120),
                      1600
                    ],
                    cy: [
                      200 + (i % 3) * 200,
                      (100 + (i % 3) * 200) + Math.sin(i) * 40,
                      (200 + (i % 3) * 200) + Math.cos(i) * 35,
                      (150 + (i % 3) * 200) + Math.sin(i) * 45,
                      200 + (i % 3) * 200
                    ],
                    opacity: [0, 1, 1, 1, 0],
                  }}
                  transition={{
                    duration: 8,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </svg>

            {/* Flowing gradient orbs */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 150 + i * 30,
                  height: 150 + i * 30,
                  left: `${10 + i * 25}%`,
                  top: `${20 + i * 15}%`,
                  background: `radial-gradient(circle, ${
                    i % 2 === 0 ? 'rgba(139, 92, 246, 0.15)' : 'rgba(59, 130, 246, 0.15)'
                  }, transparent 70%)`,
                  filter: 'blur(30px)',
                }}
                animate={{
                  x: [0, 100, 0],
                  y: [0, -50, 0],
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 12 + i * 2,
                  delay: i * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <SectionHeader
              title="AI-Driven"
              highlight="Website Builder"
              description="Describe your vision and watch our AI create professional, conversion-optimized layouts in seconds."
              align="center"
            />

            <BuilderCardsSection features={builderFeatures} />
          </div>
        </section>

        {/* Modern Workflow Section */}
        <ModernWorkflowSection steps={workflowSteps} />

        {/* Portfolio Explorer */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeader
              title="Portfolio"
              highlight="Explorer"
              description="Browse successful projects across industries and see the results we've delivered for our clients."
              align="center"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300"
                >
                  {/* Image placeholder with emoji */}
                  <div className="aspect-video bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center relative overflow-hidden">
                    <div className="text-6xl">{project.image}</div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-semibold">View Case Study →</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-sm text-blue-400 mb-2">{project.category}</div>
                    <h3 className="text-xl font-bold text-white mb-4">{project.title}</h3>

                    <div className="flex gap-4">
                      <div className="flex-1 bg-green-500/10 rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-green-400">{project.stats.conversion}</div>
                        <div className="text-xs text-gray-400">Conversions</div>
                      </div>
                      <div className="flex-1 bg-blue-500/10 rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-blue-400">{project.stats.traffic}</div>
                        <div className="text-xs text-gray-400">Traffic</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                View Full Portfolio
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Montrose */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeader
              title="Why Businesses"
              highlight="Choose Montrose"
              description="We combine cutting-edge AI technology with proven design strategies to deliver websites that actually convert."
              align="center"
            />

            <WhyChoose3DSection features={whyChoose} />
          </div>
        </section>

        {/* Interactive Quote Generator */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeader
              title="Get an Instant"
              highlight="Quote"
              description="Answer a few questions to get an AI-powered estimate for your website project."
              align="center"
            />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <div className="space-y-6">
                {/* Mock form fields */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Website Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['E-commerce', 'Business', 'Portfolio', 'Landing Page'].map((type, i) => (
                      <button
                        key={i}
                        className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300 text-sm"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Number of Pages</label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    defaultValue="5"
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>1</span>
                    <span>25</span>
                    <span>50+</span>
                  </div>
                </div>

                <div className="bg-blue-500/10 rounded-xl p-6 text-center">
                  <div className="text-sm text-gray-400 mb-2">Estimated Project Cost</div>
                  <div className="text-4xl font-bold text-white mb-2">$2,499</div>
                  <div className="text-sm text-gray-400">7-day delivery included</div>
                </div>

                <button className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
                  Get Detailed Quote
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <CallToAction
          title="Let's Build Your"
          highlight="Digital Identity"
          description="Start with a free consultation and AI-powered design concepts. No commitment required."
          primaryButton={{
            text: "Start Your Project",
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
