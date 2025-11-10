'use client';

import { useEffect, useRef, memo } from 'react';

const InteractiveGlowBackground = memo(() => {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (glowRef.current) {
          const x = e.clientX;
          const y = e.clientY;
          glowRef.current.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black" style={{ zIndex: 0 }}>
      {/* Base gradient - Deep blue black */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(20, 30, 60, 1) 0%, rgb(0, 0, 0) 100%)',
        }}
      />

      {/* Large center glow - Always visible */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(37, 99, 235, 0.25) 0%, transparent 70%)',
          animation: 'pulse 6s ease-in-out infinite',
        }}
      />

      {/* Interactive cursor glow - Even smaller, tighter radius */}
      <div
        ref={glowRef}
        className="absolute w-[250px] h-[250px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(37, 99, 235, 0.3) 50%, transparent 80%)',
          filter: 'blur(30px)',
          willChange: 'transform',
        }}
      />

      {/* Top right glow - Electric blue */}
      <div
        className="absolute -top-20 -right-20 w-[600px] h-[600px]"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, rgba(37, 99, 235, 0.15) 50%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 10s ease-in-out infinite',
        }}
      />

      {/* Bottom left glow - Deep blue */}
      <div
        className="absolute -bottom-20 -left-20 w-[550px] h-[550px]"
        style={{
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.3) 0%, rgba(29, 78, 216, 0.15) 50%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 12s ease-in-out infinite reverse',
        }}
      />

      {/* Middle wave effect */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]"
        style={{
          background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.2) 0%, transparent 60%)',
          filter: 'blur(80px)',
          animation: 'wave 15s ease-in-out infinite',
        }}
      />

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, 30px);
          }
        }
        @keyframes wave {
          0%, 100% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          50% {
            transform: translate(-50%, -50%) rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
});

InteractiveGlowBackground.displayName = 'InteractiveGlowBackground';

export default InteractiveGlowBackground;
