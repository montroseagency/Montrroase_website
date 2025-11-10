'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/marketing/navigation';
import Footer from '@/components/marketing/footer';
import InteractiveGlowBackground from '@/components/interactive-glow-background';
import ServiceCard from '@/components/services/ServiceCard';
import SectionHeader from '@/components/services/SectionHeader';
import FeatureGrid from '@/components/services/FeatureGrid';
import CallToAction from '@/components/services/CallToAction';
import Link from 'next/link';

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

        {/* Service Overview Cards */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
                Our{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Services
                </span>
              </h2>
              <p className="text-xl text-gray-400">
                Everything you need to succeed online, all in one place
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Montrose */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeader
              title="Why Choose"
              highlight="Montrose?"
              description="We combine cutting-edge technology with proven strategies to deliver results that matter."
              align="center"
            />

            <FeatureGrid features={whyChoose} columns={4} />
          </div>
        </section>

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
