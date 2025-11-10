'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface CallToActionProps {
  title: string;
  highlight?: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
}

export default function CallToAction({
  title,
  highlight,
  description,
  primaryButton,
  secondaryButton
}: CallToActionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative py-24"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.08) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {/* Animated gradient overlay */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)',
              backgroundSize: '200% 100%',
            }}
          />

          <div className="relative text-center py-20 px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight"
            >
              {title}
              {highlight && (
                <>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    {highlight}
                  </span>
                </>
              )}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href={primaryButton.href}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {primaryButton.text}
              </Link>
              {secondaryButton && (
                <Link
                  href={secondaryButton.href}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  {secondaryButton.text}
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
