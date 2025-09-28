// pages/services/PlatformDevelopment.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers,
  Users,
  Settings,
  BarChart3,
  Globe,
  Star,
  CheckCircle,
  Zap,
  Shield,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Award,
  Network,
  Smartphone
} from 'lucide-react';

const PlatformDevelopmentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'features' | 'process' | 'results'>('features');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = [
    {
      name: 'Marketplace Starter',
      price: 15000,
      features: [
        'Basic marketplace platform',
        'User registration & profiles',
        'Product/service listings',
        'Payment processing',
        'Admin dashboard',
        'Mobile responsive',
        '6 months support'
      ]
    },
    {
      name: 'Business Platform',
      price: 35000,
      features: [
        'Advanced marketplace features',
        'Multi-vendor support',
        'Commission management',
        'Advanced analytics',
        'API integrations',
        'Custom workflows',
        'Multi-language support',
        '12 months support',
        'Dedicated project manager'
      ],
      popular: true
    },
    {
      name: 'Enterprise Platform',
      price: 75000,
      features: [
        'Complex multi-sided platform',
        'Advanced user management',
        'Custom integrations',
        'White-label solutions',
        'Advanced security features',
        'Real-time analytics',
        'Scalable architecture',
        '24 months support',
        'Dedicated development team'
      ]
    }
  ];

  const platformMetrics = [
    { icon: Users, label: 'Platform Users', value: '100K+', description: 'Active users supported' },
    { icon: BarChart3, label: 'Transactions', value: '$10M+', description: 'Monthly volume' },
    { icon: Globe, label: 'Global Reach', value: '50+', description: 'Countries served' },
    { icon: Zap, label: 'Performance', value: '99.9%', description: 'Uptime guarantee' }
  ];

  const features = [
    {
      icon: Network,
      title: 'Multi-Sided Marketplaces',
      description: 'Connect buyers and sellers with sophisticated matching algorithms and workflows.',
      details: ['User matching systems', 'Transaction management', 'Rating & review systems']
    },
    {
      icon: Users,
      title: 'User Management',
      description: 'Comprehensive user onboarding, profiles, and role-based access control.',
      details: ['Multi-role user system', 'KYC/verification', 'Social authentication']
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Real-time analytics dashboard with business intelligence and reporting.',
      details: ['Custom dashboards', 'Performance metrics', 'Predictive analytics']
    },
    {
      icon: Settings,
      title: 'Admin Controls',
      description: 'Powerful admin panel with comprehensive platform management tools.',
      details: ['Content moderation', 'User management', 'Commission settings']
    },
    {
      icon: Globe,
      title: 'Scalable Architecture',
      description: 'Built to scale from thousands to millions of users with cloud infrastructure.',
      details: ['Microservices architecture', 'Auto-scaling', 'Global CDN']
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security with compliance for various industries.',
      details: ['Data encryption', 'GDPR compliance', 'Security audits']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Kim',
      handle: 'Freelance Marketplace',
      image: '👩‍💼',
      text: 'Built a thriving freelance platform that now handles $2M in monthly transactions. The architecture scales perfectly.',
      followers: '$2M monthly',
      growth: 'Perfect scaling'
    },
    {
      name: 'Marcus Chen',
      handle: 'B2B Platform',
      image: '👨‍💻',
      text: 'Our B2B marketplace connects 10,000+ suppliers with buyers globally. The platform is robust and reliable.',
      followers: '10K+ suppliers',
      growth: 'Global reach'
    },
    {
      name: 'Lisa Rodriguez',
      handle: 'Service Platform',
      image: '👩‍🎨',
      text: 'Created a service booking platform that revolutionized our industry. User experience is exceptional.',
      followers: 'Industry leader',
      growth: 'Revolutionary UX'
    }
  ];

  const faqs = [
    {
      question: 'What types of platforms can you build?',
      answer: 'We build various platforms including marketplaces, social networks, learning platforms, booking systems, SaaS platforms, and custom multi-sided platforms tailored to your business model.'
    },
    {
      question: 'How long does platform development take?',
      answer: 'Platform development typically takes 6-18 months depending on complexity. We provide detailed project timelines and milestones during the planning phase.'
    },
    {
      question: 'Do you handle payment processing integration?',
      answer: 'Yes, we integrate with major payment processors like Stripe, PayPal, and others. We also handle complex scenarios like split payments, escrow, and multi-party transactions.'
    },
    {
      question: 'Can the platform scale as my business grows?',
      answer: 'Absolutely! We build platforms with scalable architecture that can grow from hundreds to millions of users. Our cloud infrastructure automatically scales with demand.'
    },
    {
      question: 'What ongoing support do you provide?',
      answer: 'We provide comprehensive support including bug fixes, feature enhancements, security updates, performance monitoring, and technical assistance based on your support plan.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Layers className="w-12 h-12 mr-4" />
                <span className="text-2xl font-bold">Platform Development</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Build Powerful
                <span className="block text-yellow-300">Platforms</span>
              </h1>
              <p className="text-xl mb-8 leading-relaxed">
                Create sophisticated multi-sided platforms, marketplaces, and business ecosystems 
                that connect users and drive growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  to="/auth"
                  className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  Start Platform
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <a 
                  href="#pricing"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-colors text-center"
                >
                  View Packages
                </a>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Enterprise Security</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  <span>Scalable Architecture</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  <span>Proven Success</span>
                </div>
              </div>
            </div>
            
            {/* Platform Metrics Dashboard */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6">Platform Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                {platformMetrics.map((metric, index) => (
                  <div key={index} className="bg-white/20 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <metric.icon className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">{metric.label}</span>
                    </div>
                    <div className="text-2xl font-bold mb-1">{metric.value}</div>
                    <div className="text-xs opacity-80">{metric.description}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between text-sm">
                <span>Success Rate</span>
                <div className="flex items-center text-yellow-300">
                  <Star className="w-4 h-4 mr-1" />
                  <span>98% Launch Success</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Platform Features That Drive Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Build feature-rich platforms with everything you need to create thriving digital ecosystems
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-1 rounded-lg">
              {[
                { key: 'features', label: 'Core Features' },
                { key: 'process', label: 'Development Process' },
                { key: 'results', label: 'Results' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'features' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                      <feature.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'process' && (
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {[
                  {
                    step: '01',
                    title: 'Discovery & Planning',
                    description: 'We analyze your business model, user needs, and technical requirements to design the optimal platform architecture.',
                    duration: '2-4 weeks'
                  },
                  {
                    step: '02',
                    title: 'Design & Prototyping',
                    description: 'Create user experience designs and interactive prototypes to validate the platform concept and user flows.',
                    duration: '3-6 weeks'
                  },
                  {
                    step: '03',
                    title: 'Core Development',
                    description: 'Build the platform foundation with user management, core features, and essential integrations.',
                    duration: '8-16 weeks'
                  },
                  {
                    step: '04',
                    title: 'Advanced Features',
                    description: 'Implement advanced functionality like analytics, AI features, and custom integrations.',
                    duration: '6-12 weeks'
                  },
                  {
                    step: '05',
                    title: 'Testing & Launch',
                    description: 'Comprehensive testing, performance optimization, and smooth launch with ongoing support.',
                    duration: '2-4 weeks'
                  }
                ].map((phase, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mr-6 flex-shrink-0">
                      {phase.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {phase.duration}
                        </div>
                      </div>
                      <p className="text-gray-600">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'results' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Success Metrics</h3>
                <div className="space-y-6">
                  {[
                    { metric: 'User Engagement', value: '300%', description: 'Average increase in user engagement' },
                    { metric: 'Transaction Volume', value: '500%', description: 'Growth in platform transactions' },
                    { metric: 'Time to Market', value: '60%', description: 'Faster than traditional development' },
                    { metric: 'Platform Uptime', value: '99.9%', description: 'Guaranteed system reliability' }
                  ].map((result, index) => (
                    <div key={index} className="flex items-center">
                      <div className="text-3xl font-bold text-indigo-600 mr-4 w-20">{result.value}</div>
                      <div>
                        <div className="font-semibold text-gray-900">{result.metric}</div>
                        <div className="text-gray-600 text-sm">{result.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Platform Types Built</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'Marketplaces',
                    'Social Networks',
                    'Learning Platforms',
                    'Booking Systems',
                    'SaaS Platforms',
                    'B2B Exchanges',
                    'Service Platforms',
                    'Community Platforms'
                  ].map((type, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg text-center">
                      <div className="font-semibold text-gray-900">{type}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Platform Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our platform development has transformed businesses across industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">{testimonial.image}</div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.handle}</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-indigo-600 font-medium">{testimonial.followers}</span>
                  <span className="text-green-600 font-medium">{testimonial.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Platform Development Packages
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the perfect package for your platform vision and business goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`relative bg-gray-800 p-8 rounded-2xl ${plan.popular ? 'border-2 border-yellow-400' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="text-4xl font-bold mb-2">
                    ${plan.price.toLocaleString()}
                  </div>
                  <div className="text-gray-400">One-time investment</div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/auth"
                  className={`block w-full text-center py-4 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular 
                      ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about platform development
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-8 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Your Platform?
          </h2>
          <p className="text-xl mb-8 leading-relaxed">
            Transform your business idea into a thriving digital platform that connects users and drives growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/auth"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Start Your Platform
            </Link>
            <Link 
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Schedule Consultation
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-2" />
              <span>Proven Success</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlatformDevelopmentPage;