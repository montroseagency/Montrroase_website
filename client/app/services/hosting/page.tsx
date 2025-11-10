'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/marketing/navigation';
import Footer from '@/components/marketing/footer';
import InteractiveGlowBackground from '@/components/interactive-glow-background';
import SectionHeader from '@/components/services/SectionHeader';
import FeatureGrid from '@/components/services/FeatureGrid';
import CallToAction from '@/components/services/CallToAction';
import AnimatedCounter from '@/components/services/AnimatedCounter';

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

        {/* Security & Reliability */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeader
              title="Enterprise-Grade"
              highlight="Security"
              description="Your data and applications are protected by multiple layers of security, monitoring, and backup systems."
              align="center"
            />

            <FeatureGrid features={securityFeatures} columns={4} />
          </div>
        </section>

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
