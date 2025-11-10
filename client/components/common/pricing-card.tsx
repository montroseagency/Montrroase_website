'use client';

import Link from 'next/link';
import { useState } from 'react';

interface PricingCardProps {
  name: string;
  price: string | number;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function PricingCard({
  name,
  price,
  period = 'month',
  description,
  features,
  highlighted = false,
  badge,
  ctaText = 'Get Started',
  ctaLink = '/auth/register'
}: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Define glow color based on plan
  const getGlowColor = () => {
    if (highlighted) return 'rgba(59, 130, 246, 0.4)'; // Blue for highlighted
    if (name === 'Premium') return 'rgba(168, 85, 247, 0.4)'; // Purple
    if (name === 'Enterprise') return 'rgba(34, 197, 94, 0.4)'; // Green
    return 'rgba(59, 130, 246, 0.3)'; // Default blue
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transition: 'transform 0.3s ease-in-out',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      {/* Glow Effect - becomes brighter on hover */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${getGlowColor()}, transparent 70%)`,
          opacity: isHovered ? 0.6 : 0.3,
          filter: 'blur(20px)',
        }}
      />

      {/* Glassmorphism Card */}
      <div
        className="relative rounded-2xl p-8"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transition: 'border-color 0.3s ease-in-out',
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
        }}
      >
        {badge && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span
              className="inline-flex items-center px-4 py-2 text-white text-sm font-semibold rounded-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(168, 85, 247, 0.8))',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              }}
            >
              {badge}
            </span>
          </div>
        )}

        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">
            {name}
          </h3>
          <p className="text-gray-400 mb-6">
            {description}
          </p>
          <div className="flex items-baseline justify-center">
            {typeof price === 'number' && (
              <span className="text-5xl font-bold text-white">
                ${price}
              </span>
            )}
            {typeof price === 'string' && (
              <span className="text-5xl font-bold text-white">
                {price}
              </span>
            )}
            {period && (
              <span className="text-gray-400 ml-2">
                /{period}
              </span>
            )}
          </div>
        </div>

        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg
                className="w-6 h-6 text-green-400 mr-3 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          href={ctaLink}
          className="block w-full text-center px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          style={{
            background: highlighted
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.3))'
              : 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            backdropFilter: 'blur(8px)',
          }}
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
}