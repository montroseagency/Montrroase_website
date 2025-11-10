'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/marketing/navigation';
import Footer from '@/components/marketing/footer';
import InteractiveGlowBackground from '@/components/interactive-glow-background';
import SectionHeader from '@/components/services/SectionHeader';
import FeatureGrid from '@/components/services/FeatureGrid';
import CallToAction from '@/components/services/CallToAction';
import Link from 'next/link';

export default function WebsitePage() {
  const builderFeatures = [
    {
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'AI Layout Generation',
      description: 'Describe your vision and watch AI create professional layouts instantly.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: 'Drag-and-Drop Editor',
      description: 'Intuitive visual editor with real-time preview and instant updates.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Mobile-First Design',
      description: 'Every template is optimized for mobile, tablet, and desktop devices.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
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
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeader
              title="AI-Driven"
              highlight="Website Builder"
              description="Describe your vision and watch our AI create professional, conversion-optimized layouts in seconds."
              align="center"
            />

            <FeatureGrid features={builderFeatures} columns={4} />

            {/* Builder Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl flex items-center justify-center relative overflow-hidden">
                  {/* Animated grid */}
                  <div className="absolute inset-0 grid grid-cols-12 gap-1 p-8">
                    {[...Array(48)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          opacity: [0.1, 0.3, 0.1],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.05,
                        }}
                        className="bg-white/5 rounded"
                      />
                    ))}
                  </div>

                  <div className="relative z-10 text-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    >
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">AI Builder Demo</h3>
                    <p className="text-gray-400">Watch layouts generate in real-time</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Workflow Timeline */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeader
              title="Step-by-Step"
              highlight="Workflow"
              description="From discovery to launch, our process is designed for speed, quality, and collaboration."
              align="center"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 h-full">
                    {/* Step number */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center text-white font-bold text-2xl mb-6`}>
                      {step.number}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400 mb-6 text-sm leading-relaxed">{step.description}</p>

                    <ul className="space-y-2">
                      {step.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Connector line */}
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-white/20 to-transparent"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

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

            <FeatureGrid features={whyChoose} columns={4} />
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
