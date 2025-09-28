// pages/services/DomainHosting.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe,
  Server,
  Shield,
  Zap,
  Clock,
  Star,
  CheckCircle,
  Cloud,
  Database,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Award,
  Lock,
  BarChart3
} from 'lucide-react';

const DomainHostingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'domains' | 'hosting' | 'features'>('hosting');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const hostingPlans = [
    {
      name: 'Shared Hosting',
      price: 9.99,
      period: '/month',
      features: [
        '10GB SSD Storage',
        '100GB Bandwidth',
        '5 Email Accounts',
        'Free SSL Certificate',
        'cPanel Access',
        '24/7 Support',
        '99.9% Uptime',
        'Free Domain (1st year)'
      ]
    },
    {
      name: 'Business Hosting',
      price: 19.99,
      period: '/month',
      features: [
        '50GB SSD Storage',
        'Unlimited Bandwidth',
        'Unlimited Email Accounts',
        'Free SSL Certificate',
        'Advanced cPanel',
        'Priority Support',
        '99.9% Uptime',
        'Free Domain & Migration',
        'Daily Backups',
        'CDN Integration'
      ],
      popular: true
    },
    {
      name: 'VPS Hosting',
      price: 49.99,
      period: '/month',
      features: [
        '100GB SSD Storage',
        'Unlimited Bandwidth',
        'Dedicated Resources',
        'Root Access',
        'Custom Configurations',
        'Premium Support',
        '99.99% Uptime',
        'Free Managed Services',
        'Auto Scaling',
        'Advanced Security'
      ]
    }
  ];

  const domainPrices = [
    { extension: '.com', price: 12.99, popular: true },
    { extension: '.net', price: 14.99, popular: false },
    { extension: '.org', price: 13.99, popular: false },
    { extension: '.io', price: 39.99, popular: true },
    { extension: '.co', price: 29.99, popular: false },
    { extension: '.dev', price: 15.99, popular: true }
  ];

  const hostingMetrics = [
    { icon: Zap, label: 'Page Speed', value: '<1s', description: 'Load time guarantee' },
    { icon: Shield, label: 'Uptime', value: '99.99%', description: 'Service availability' },
    { icon: Server, label: 'Sites Hosted', value: '10K+', description: 'Websites powered' },
    { icon: Clock, label: 'Support', value: '24/7', description: 'Expert assistance' }
  ];

  const features = [
    {
      icon: Server,
      title: 'High-Performance Hosting',
      description: 'SSD storage, optimized servers, and global CDN for lightning-fast websites.',
      details: ['SSD NVMe storage', 'LiteSpeed web server', 'Global CDN network']
    },
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'Comprehensive security measures to protect your website and data.',
      details: ['Free SSL certificates', 'DDoS protection', 'Malware scanning']
    },
    {
      icon: Globe,
      title: 'Domain Management',
      description: 'Easy domain registration and management with competitive pricing.',
      details: ['Domain registration', 'DNS management', 'Domain privacy protection']
    },
    {
      icon: Database,
      title: 'Developer Tools',
      description: 'Advanced tools and features for developers and power users.',
      details: ['Multiple PHP versions', 'Git integration', 'Staging environments']
    },
    {
      icon: Cloud,
      title: 'Scalable Infrastructure',
      description: 'Grow your hosting resources as your website traffic increases.',
      details: ['Auto-scaling options', 'Load balancing', 'Resource monitoring']
    },
    {
      icon: Lock,
      title: 'Backup & Recovery',
      description: 'Automated backups and easy recovery options for peace of mind.',
      details: ['Daily automated backups', 'One-click restore', 'Version control']
    }
  ];

  const testimonials = [
    {
      name: 'Alex Thompson',
      handle: 'E-commerce Store',
      image: '👨‍💻',
      text: 'Migrated our store to their hosting and saw 40% faster load times. Customer support is outstanding!',
      followers: '40% faster',
      growth: '99.9% uptime'
    },
    {
      name: 'Maria Garcia',
      handle: 'Digital Agency',
      image: '👩‍💼',
      text: 'Hosting 50+ client websites with zero downtime issues. The scalability and reliability are perfect.',
      followers: '50+ websites',
      growth: 'Zero downtime'
    },
    {
      name: 'James Wilson',
      handle: 'Tech Startup',
      image: '👨‍🚀',
      text: 'From shared hosting to VPS as we grew. Seamless scaling and excellent performance throughout.',
      followers: 'Seamless scaling',
      growth: 'Perfect performance'
    }
  ];

  const faqs = [
    {
      question: 'What\'s included in the hosting plans?',
      answer: 'All plans include SSD storage, free SSL certificates, email accounts, cPanel access, 24/7 support, and a 99.9% uptime guarantee. Higher plans include additional features like unlimited bandwidth and priority support.'
    },
    {
      question: 'How long does it take to set up hosting?',
      answer: 'New hosting accounts are typically activated within 15 minutes of payment confirmation. Domain propagation may take 24-48 hours for new domains.'
    },
    {
      question: 'Do you offer website migration services?',
      answer: 'Yes! We provide free website migration for Business and VPS hosting plans. Our team will handle the entire migration process with zero downtime.'
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We offer 24/7 technical support via live chat, email, and phone. Our support team consists of experienced technicians who can help with hosting, domain, and website issues.'
    },
    {
      question: 'Can I upgrade my hosting plan later?',
      answer: 'Absolutely! You can upgrade your hosting plan at any time. Upgrades are processed immediately, and you\'ll only pay the prorated difference.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Globe className="w-12 h-12 mr-4" />
                <span className="text-2xl font-bold">Domain & Hosting</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Fast & Reliable
                <span className="block text-yellow-300">Web Hosting</span>
              </h1>
              <p className="text-xl mb-8 leading-relaxed">
                Professional web hosting with 99.99% uptime guarantee. Secure domains, 
                lightning-fast servers, and 24/7 expert support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  to="/auth"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <a 
                  href="#pricing"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors text-center"
                >
                  View Plans
                </a>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>99.99% Uptime</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  <span>SSD Storage</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
            
            {/* Hosting Metrics Dashboard */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6">Hosting Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                {hostingMetrics.map((metric, index) => (
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
                <span>Customer Satisfaction</span>
                <div className="flex items-center text-yellow-300">
                  <Star className="w-4 h-4 mr-1" />
                  <span>4.8/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Tabs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Hosting Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to get your website online and keep it running smoothly
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              {[
                { id: 'hosting' as const, label: 'Web Hosting', icon: Server },
                { id: 'domains' as const, label: 'Domain Names', icon: Globe },
                { id: 'features' as const, label: 'Features', icon: Zap }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center ${
                    activeTab === tab.id
                      ? 'bg-white shadow-md text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'hosting' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {hostingPlans.map((plan, index) => (
                  <div
                    key={index}
                    className={`relative bg-white rounded-2xl shadow-lg ${
                      plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
                    } transition-all duration-300 hover:shadow-xl`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="p-8">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                        <div className="text-4xl font-bold text-gray-900 mb-2">
                          ${plan.price}<span className="text-lg text-gray-600">{plan.period}</span>
                        </div>
                      </div>

                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        to="/auth"
                        className={`w-full py-3 px-4 rounded-lg font-semibold text-center transition-colors duration-200 block ${
                          plan.popular
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
                            : 'bg-gray-900 text-white hover:bg-gray-800'
                        }`}
                      >
                        Choose Plan
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'domains' && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Domain Registration</h3>
                  <p className="text-gray-600">Secure your perfect domain name with competitive pricing</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {domainPrices.map((domain, index) => (
                    <div key={index} className={`bg-white rounded-lg p-6 shadow-lg text-center ${
                      domain.popular ? 'ring-2 ring-blue-500' : ''
                    }`}>
                      <div className="text-2xl font-bold text-gray-900 mb-2">{domain.extension}</div>
                      <div className="text-xl font-semibold text-blue-600 mb-4">${domain.price}/year</div>
                      {domain.popular && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          Popular
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-blue-50 rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Domain Features Included:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Free DNS management</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Domain privacy protection</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Easy domain forwarding</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Email forwarding</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-500">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Trusted by thousands of websites worldwide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{testimonial.image}</span>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-blue-500">{testimonial.handle}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{testimonial.followers}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {testimonial.growth}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Get answers to common hosting and domain questions</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg">
                <button
                  className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Your Website Online?
          </h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Join thousands of websites hosted on our fast, reliable, and secure hosting platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              Start Hosting Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-white/80">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>Instant setup</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              <span>99.99% uptime</span>
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-2" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DomainHostingPage;