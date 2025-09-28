// pages/services/WebDevelopmentServices.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code,
  Palette,
  Database,
  TrendingUp,
  BarChart3,
  Zap,
  Globe,
  Star,
  CheckCircle,
  Shield,
  Target,
  Calendar,
  Smartphone,
  Server,
  Award,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const WebDevelopmentServicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'features' | 'process' | 'results'>('features');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = [
    {
      name: 'Starter',
      price: 2500,
      features: [
        '5-page responsive website',
        'Modern design & UI/UX',
        'Mobile optimization',
        'Basic SEO setup',
        'Contact form integration',
        '3 months support'
      ]
    },
    {
      name: 'Professional',
      price: 5000,
      features: [
        '10-page custom website',
        'Advanced animations',
        'CMS integration',
        'E-commerce functionality',
        'Advanced SEO',
        'Analytics setup',
        '6 months support',
        'Performance optimization'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 10000,
      features: [
        'Custom web application',
        'Database design',
        'API development',
        'User authentication',
        'Admin dashboard',
        'Third-party integrations',
        '12 months support',
        'Dedicated project manager'
      ]
    }
  ];

  const developmentMetrics = [
    { icon: Code, label: 'Lines of Code', value: '1M+', description: 'Written & maintained' },
    { icon: Globe, label: 'Websites', value: '500+', description: 'Successfully launched' },
    { icon: Zap, label: 'Load Speed', value: '<2s', description: 'Average page load' },
    { icon: BarChart3, label: 'Uptime', value: '99.9%', description: 'Service reliability' }
  ];

  const features = [
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Beautiful websites that work perfectly on all devices - desktop, tablet, and mobile.',
      details: ['Mobile-first approach', 'Cross-browser compatibility', 'Flexible grid systems']
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Lightning-fast websites optimized for speed and user experience.',
      details: ['Image optimization', 'Code minification', 'CDN integration']
    },
    {
      icon: Database,
      title: 'Backend Development',
      description: 'Robust server-side solutions with secure databases and APIs.',
      details: ['RESTful API design', 'Database optimization', 'Security implementation']
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'User-centered design that converts visitors into customers.',
      details: ['User research & testing', 'Wireframing & prototyping', 'Brand consistency']
    },
    {
      icon: Server,
      title: 'Cloud Deployment',
      description: 'Scalable cloud hosting with automated deployments and monitoring.',
      details: ['AWS/Azure deployment', 'CI/CD pipelines', 'Automated scaling']
    },
    {
      icon: Shield,
      title: 'Security & Maintenance',
      description: 'Comprehensive security measures and ongoing maintenance support.',
      details: ['SSL certificates', 'Regular updates', 'Security monitoring']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      handle: 'E-commerce Platform',
      image: '👩‍💼',
      text: 'Our new e-commerce site increased sales by 300% in the first quarter. The user experience is phenomenal.',
      followers: '300% sales increase',
      growth: 'ROI: 500%'
    },
    {
      name: 'Mike Rodriguez',
      handle: 'SaaS Application',
      image: '👨‍💻',
      text: 'Best development team we\'ve worked with. They delivered a complex SaaS platform on time and under budget.',
      followers: 'On-time delivery',
      growth: 'Under budget'
    },
    {
      name: 'Emma Thompson',
      handle: 'Corporate Website',
      image: '👩‍🎨',
      text: 'The new website perfectly represents our brand. Lead generation increased by 400% since launch.',
      followers: '400% more leads',
      growth: 'Perfect branding'
    }
  ];

  const faqs = [
    {
      question: 'How long does it take to build a website?',
      answer: 'Timeline depends on complexity. Simple websites take 2-4 weeks, while complex web applications can take 3-6 months. We provide detailed timelines during planning.'
    },
    {
      question: 'Do you provide ongoing maintenance?',
      answer: 'Yes! We offer comprehensive maintenance packages including security updates, performance monitoring, content updates, and technical support.'
    },
    {
      question: 'Can you work with our existing design?',
      answer: 'Absolutely. We can work with your existing designs, brand guidelines, or create entirely new designs based on your requirements.'
    },
    {
      question: 'What technologies do you use?',
      answer: 'We use modern technologies including React, Vue.js, Node.js, Python, PHP, and cloud platforms like AWS and Azure. We choose the best tech stack for each project.'
    },
    {
      question: 'Do you offer e-commerce development?',
      answer: 'Yes! We build custom e-commerce solutions with payment processing, inventory management, and order fulfillment capabilities.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Code className="w-12 h-12 mr-4" />
                <span className="text-2xl font-bold">Web Development</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Build Your Digital
                <span className="block text-yellow-300">Presence</span>
              </h1>
              <p className="text-xl mb-8 leading-relaxed">
                Custom web development solutions that drive results. From responsive websites to 
                complex web applications, we bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  to="/auth"
                  className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <a 
                  href="#pricing"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors text-center"
                >
                  View Pricing
                </a>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Secure Code</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  <span>Fast Performance</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  <span>Quality Guaranteed</span>
                </div>
              </div>
            </div>
            
            {/* Development Dashboard Mockup */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6">Development Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                {developmentMetrics.map((metric, index) => (
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
                <span>Project Success Rate</span>
                <div className="flex items-center text-green-300">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>98% satisfaction</span>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How We Build Your Website</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive approach combines modern technology with proven development methodologies
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              {[
                { id: 'features' as const, label: 'Features', icon: Zap },
                { id: 'process' as const, label: 'Process', icon: Calendar },
                { id: 'results' as const, label: 'Results', icon: BarChart3 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center ${
                    activeTab === tab.id
                      ? 'bg-white shadow-md text-purple-600'
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

            {activeTab === 'process' && (
              <div className="max-w-4xl mx-auto">
                <div className="space-y-8">
                  {[
                    {
                      step: 1,
                      title: 'Discovery & Planning',
                      description: 'We analyze your requirements, target audience, and business goals to create a comprehensive project plan.',
                      duration: '1-2 weeks'
                    },
                    {
                      step: 2,
                      title: 'Design & Prototyping',
                      description: 'Create wireframes, mockups, and interactive prototypes to visualize the final product.',
                      duration: '2-3 weeks'
                    },
                    {
                      step: 3,
                      title: 'Development & Testing',
                      description: 'Build the website using modern technologies with continuous testing and quality assurance.',
                      duration: '4-8 weeks'
                    },
                    {
                      step: 4,
                      title: 'Launch & Support',
                      description: 'Deploy to production and provide ongoing maintenance and support services.',
                      duration: 'Ongoing'
                    }
                  ].map((step) => (
                    <div key={step.step} className="flex items-start">
                      <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-6 flex-shrink-0">
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
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Proven Results</h3>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">300% Average ROI</div>
                        <div className="text-gray-600">Return on investment within 12 months</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <Zap className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">50% Faster Load Times</div>
                        <div className="text-gray-600">Compared to industry standards</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-3 rounded-full mr-4">
                        <Globe className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">99.9% Uptime</div>
                        <div className="text-gray-600">Reliable hosting and maintenance</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Development Plan</h2>
            <p className="text-xl text-gray-600">Start building your website today with our expert development team</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg ${
                  plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
                } transition-all duration-300 hover:shadow-xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-gray-900 mb-2">${plan.price.toLocaleString()}</div>
                    <div className="text-gray-600 mb-4">Starting price</div>
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
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Client Success Stories</h2>
            <p className="text-xl text-gray-600">See how our development services transformed their businesses</p>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our web development services</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg">
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
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Your Website?
          </h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Join hundreds of successful businesses who have transformed their online presence with our expert development team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors"
            >
              Get Free Consultation
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-white/80">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>Quick turnaround</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              <span>Secure development</span>
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-2" />
              <span>Quality guarantee</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebDevelopmentServicesPage;