// pages/services/SEOServices.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search,
  TrendingUp,
  BarChart3,
  Target,
  Globe,
  Star,
  CheckCircle,
  Zap,
  Users,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Award,
  Shield
} from 'lucide-react';

const SEOServicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'features' | 'process' | 'results'>('features');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = [
    {
      name: 'Local SEO',
      price: 500,
      features: [
        'Local keyword research',
        'Google My Business optimization',
        'Local directory submissions',
        'Review management',
        'Local citation building',
        'Monthly reporting'
      ]
    },
    {
      name: 'Professional SEO',
      price: 1200,
      features: [
        'Comprehensive keyword research',
        'On-page optimization',
        'Technical SEO audit',
        'Content optimization',
        'Link building campaign',
        'Monthly analytics reports',
        'Competitor analysis',
        'Page speed optimization'
      ],
      popular: true
    },
    {
      name: 'Enterprise SEO',
      price: 2500,
      features: [
        'Large-scale SEO strategy',
        'Multiple website optimization',
        'Advanced technical SEO',
        'International SEO',
        'Custom reporting dashboard',
        'Dedicated SEO manager',
        'Monthly strategy calls',
        'Priority support'
      ]
    }
  ];

  const seoMetrics = [
    { icon: TrendingUp, label: 'Ranking Boost', value: '300%', description: 'Average improvement' },
    { icon: Users, label: 'Organic Traffic', value: '250%', description: 'Traffic increase' },
    { icon: Globe, label: 'Keywords Ranked', value: '500+', description: 'Top 10 positions' },
    { icon: BarChart3, label: 'ROI Generated', value: '400%', description: 'Return on investment' }
  ];

  const features = [
    {
      icon: Search,
      title: 'Keyword Research & Strategy',
      description: 'In-depth keyword research to target the most valuable search terms for your business.',
      details: ['Competitor keyword analysis', 'Long-tail keyword identification', 'Search intent mapping']
    },
    {
      icon: Target,
      title: 'On-Page Optimization',
      description: 'Optimize every element of your website to rank higher in search results.',
      details: ['Title tag optimization', 'Meta description crafting', 'Header structure improvement']
    },
    {
      icon: Zap,
      title: 'Technical SEO',
      description: 'Fix technical issues that prevent search engines from properly crawling your site.',
      details: ['Site speed optimization', 'Mobile responsiveness', 'Schema markup implementation']
    },
    {
      icon: Globe,
      title: 'Content Optimization',
      description: 'Create and optimize content that ranks well and engages your audience.',
      details: ['Content gap analysis', 'SEO copywriting', 'Internal linking strategy']
    },
    {
      icon: TrendingUp,
      title: 'Link Building',
      description: 'Build high-quality backlinks to increase your website\'s authority and rankings.',
      details: ['Guest posting campaigns', 'Resource page outreach', 'Broken link building']
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reporting',
      description: 'Track your SEO progress with detailed reports and actionable insights.',
      details: ['Ranking tracking', 'Traffic analysis', 'Conversion monitoring']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      handle: 'Local Restaurant Chain',
      image: '👩‍🍳',
      text: 'Our local SEO campaign increased foot traffic by 200% and online orders by 150%. Amazing results!',
      followers: '200% more traffic',
      growth: '150% online orders'
    },
    {
      name: 'David Chen',
      handle: 'E-commerce Store',
      image: '👨‍💼',
      text: 'Went from page 5 to ranking #1 for our main keywords. Revenue increased by 300% in 6 months.',
      followers: '#1 rankings',
      growth: '300% revenue boost'
    },
    {
      name: 'Lisa Rodriguez',
      handle: 'Professional Services',
      image: '👩‍⚖️',
      text: 'Professional SEO service helped us dominate our local market. Best investment we\'ve made.',
      followers: 'Market dominance',
      growth: 'Top 3 rankings'
    }
  ];

  const faqs = [
    {
      question: 'How long does it take to see SEO results?',
      answer: 'Most clients start seeing improvements in 3-6 months, with significant results typically visible after 6-12 months. SEO is a long-term investment that builds momentum over time.'
    },
    {
      question: 'Do you guarantee first page rankings?',
      answer: 'While we cannot guarantee specific rankings due to constantly changing search algorithms, we do guarantee measurable improvements in your organic visibility and traffic.'
    },
    {
      question: 'What makes your SEO different?',
      answer: 'We focus on white-hat, sustainable SEO strategies that provide long-term results. Our approach combines technical expertise with content excellence and ethical link building.'
    },
    {
      question: 'Do you work with all industries?',
      answer: 'Yes, we have experience across various industries including e-commerce, professional services, healthcare, technology, and local businesses.'
    },
    {
      question: 'What reporting do you provide?',
      answer: 'We provide detailed monthly reports including keyword rankings, organic traffic growth, backlink profile analysis, and ROI metrics with actionable recommendations.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Search className="w-12 h-12 mr-4" />
                <span className="text-2xl font-bold">SEO Services</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Dominate Search
                <span className="block text-yellow-300">Rankings</span>
              </h1>
              <p className="text-xl mb-8 leading-relaxed">
                Professional SEO services that increase your organic traffic, improve search rankings, 
                and drive qualified leads to your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  to="/auth"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  Start SEO Campaign
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <a 
                  href="#pricing"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors text-center"
                >
                  View SEO Packages
                </a>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>White-Hat SEO</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span>Proven Results</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  <span>Expert Team</span>
                </div>
              </div>
            </div>
            
            {/* SEO Metrics Dashboard */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6">SEO Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                {seoMetrics.map((metric, index) => (
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
                <span>Client Satisfaction</span>
                <div className="flex items-center text-green-300">
                  <Star className="w-4 h-4 mr-1" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Tabs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our SEO Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive SEO strategies that deliver measurable results and long-term growth
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              {[
                { id: 'features' as const, label: 'SEO Services', icon: Zap },
                { id: 'process' as const, label: 'Our Process', icon: Target },
                { id: 'results' as const, label: 'Results', icon: BarChart3 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center ${
                    activeTab === tab.id
                      ? 'bg-white shadow-md text-green-600'
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
            {activeTab === 'features' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-green-600" />
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

            {activeTab === 'process' && (
              <div className="max-w-4xl mx-auto">
                <div className="space-y-8">
                  {[
                    {
                      step: 1,
                      title: 'SEO Audit & Analysis',
                      description: 'Comprehensive analysis of your current SEO performance and competitor landscape.',
                      duration: '1 week'
                    },
                    {
                      step: 2,
                      title: 'Strategy Development',
                      description: 'Create a custom SEO strategy based on your business goals and market opportunities.',
                      duration: '1 week'
                    },
                    {
                      step: 3,
                      title: 'Implementation & Optimization',
                      description: 'Execute on-page, technical, and content optimizations across your website.',
                      duration: '2-4 weeks'
                    },
                    {
                      step: 4,
                      title: 'Monitor & Improve',
                      description: 'Continuous monitoring, reporting, and optimization to maintain and improve rankings.',
                      duration: 'Ongoing'
                    }
                  ].map((step) => (
                    <div key={step.step} className="flex items-start">
                      <div className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-6 flex-shrink-0">
                        {step.step}
                      </div>
                      <div className="flex-1 bg-white rounded-lg p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'results' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Proven SEO Results</h3>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">300% Average Growth</div>
                        <div className="text-gray-600">In organic traffic within 12 months</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <Search className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">Top 3 Rankings</div>
                        <div className="text-gray-600">For target keywords achieved</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-3 rounded-full mr-4">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">400% ROI</div>
                        <div className="text-gray-600">Return on SEO investment</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl p-8 text-white">
                  <h4 className="text-xl font-bold mb-6">Success Stories</h4>
                  <div className="space-y-4">
                    {testimonials.slice(0, 2).map((testimonial, index) => (
                      <div key={index} className="bg-white/20 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-3">{testimonial.image}</span>
                          <div>
                            <div className="font-semibold">{testimonial.name}</div>
                            <div className="text-sm opacity-80">{testimonial.handle}</div>
                          </div>
                        </div>
                        <p className="text-sm mb-2">"{testimonial.text}"</p>
                        <div className="flex justify-between text-xs">
                          <span>{testimonial.followers}</span>
                          <span className="text-green-300">{testimonial.growth}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">SEO Pricing Plans</h2>
            <p className="text-xl text-gray-600">Choose the perfect SEO package for your business needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg ${
                  plan.popular ? 'ring-2 ring-green-500 transform scale-105' : ''
                } transition-all duration-300 hover:shadow-xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-gray-900 mb-2">${plan.price}</div>
                    <div className="text-gray-600 mb-4">per month</div>
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
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">SEO Success Stories</h2>
            <p className="text-xl text-gray-600">See how our SEO services transformed their online presence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{testimonial.image}</span>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-green-500">{testimonial.handle}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{testimonial.followers}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {testimonial.growth}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">SEO Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our SEO services</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg">
                <button
                  className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-green-500"
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
      <section className="py-20 bg-gradient-to-r from-green-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Dominate Search Results?
          </h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Join hundreds of businesses who have increased their organic traffic and revenue with our proven SEO strategies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              Start SEO Campaign
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Get SEO Consultation
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-white/80">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>Results in 3-6 months</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              <span>White-hat SEO only</span>
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-2" />
              <span>Proven track record</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SEOServicesPage;