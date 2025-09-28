// pages/services/WebApplications.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Monitor,
  Database,
  Cloud,
  Settings,
  Users,
  Star,
  CheckCircle,
  Zap,
  Shield,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Award,
  Code,
  Smartphone,
  Globe
} from 'lucide-react';

const WebApplicationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'features' | 'process' | 'results'>('features');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = [
    {
      name: 'Starter App',
      price: 5000,
      features: [
        'Simple web application',
        'User authentication',
        'Basic dashboard',
        'Database integration',
        'Mobile responsive',
        '3 months support'
      ]
    },
    {
      name: 'Business App',
      price: 12000,
      features: [
        'Advanced web application',
        'Multi-user system',
        'Admin panel',
        'API development',
        'Third-party integrations',
        'Advanced analytics',
        '6 months support',
        'Custom workflows'
      ],
      popular: true
    },
    {
      name: 'Enterprise App',
      price: 25000,
      features: [
        'Complex web application',
        'Microservices architecture',
        'Advanced security features',
        'Custom integrations',
        'Scalable infrastructure',
        'Real-time features',
        '12 months support',
        'Dedicated project manager',
        'Load balancing & optimization'
      ]
    }
  ];

  const appMetrics = [
    { icon: Users, label: 'Active Users', value: '10K+', description: 'Concurrent users supported' },
    { icon: Zap, label: 'Performance', value: '<100ms', description: 'Response time' },
    { icon: Shield, label: 'Security', value: '99.9%', description: 'Uptime guarantee' },
    { icon: Cloud, label: 'Scalability', value: '100x', description: 'Growth capacity' }
  ];

  const features = [
    {
      icon: Code,
      title: 'Custom Development',
      description: 'Tailored web applications built to meet your specific business requirements.',
      details: ['React/Vue.js frontend', 'Node.js/Python backend', 'Custom business logic']
    },
    {
      icon: Database,
      title: 'Database Design',
      description: 'Robust database architecture that scales with your business growth.',
      details: ['PostgreSQL/MongoDB', 'Data modeling', 'Performance optimization']
    },
    {
      icon: Users,
      title: 'User Management',
      description: 'Complete user authentication and authorization systems.',
      details: ['Role-based access', 'OAuth integration', 'Security compliance']
    },
    {
      icon: Cloud,
      title: 'Cloud Deployment',
      description: 'Scalable cloud infrastructure with automated deployment pipelines.',
      details: ['AWS/Azure hosting', 'Auto-scaling', 'Load balancing']
    },
    {
      icon: Settings,
      title: 'API Development',
      description: 'RESTful APIs and GraphQL endpoints for seamless integrations.',
      details: ['REST API design', 'GraphQL implementation', 'API documentation']
    },
    {
      icon: Shield,
      title: 'Security & Testing',
      description: 'Comprehensive security measures and thorough testing protocols.',
      details: ['Security audits', 'Automated testing', 'Vulnerability scanning']
    }
  ];

  const testimonials = [
    {
      name: 'Michael Zhang',
      handle: 'SaaS Platform',
      image: '👨‍💻',
      text: 'Our custom web application handles 50,000+ users seamlessly. The architecture is solid and scales beautifully.',
      followers: '50K+ users',
      growth: '99.9% uptime'
    },
    {
      name: 'Jennifer Adams',
      handle: 'Healthcare Platform',
      image: '👩‍⚕️',
      text: 'Built a HIPAA-compliant patient management system that revolutionized our practice. Exceptional work!',
      followers: 'HIPAA compliant',
      growth: '300% efficiency'
    },
    {
      name: 'Robert Taylor',
      handle: 'Fintech Application',
      image: '👨‍💼',
      text: 'The trading platform they built handles millions in transactions daily. Security and performance are top-notch.',
      followers: 'Million$ daily',
      growth: 'Bank-grade security'
    }
  ];

  const faqs = [
    {
      question: 'What types of web applications do you build?',
      answer: 'We build various types including SaaS platforms, e-commerce applications, content management systems, CRM systems, project management tools, and custom business applications.'
    },
    {
      question: 'How long does it take to develop a web application?',
      answer: 'Development time varies based on complexity. Simple applications take 2-3 months, while complex enterprise solutions can take 6-12 months. We provide detailed timelines during planning.'
    },
    {
      question: 'What technologies do you use?',
      answer: 'We use modern technologies including React, Vue.js, Node.js, Python, PostgreSQL, MongoDB, AWS, Azure, and other cutting-edge tools based on project requirements.'
    },
    {
      question: 'Do you provide ongoing maintenance?',
      answer: 'Yes, we offer comprehensive maintenance packages including bug fixes, security updates, performance monitoring, feature enhancements, and technical support.'
    },
    {
      question: 'Can you integrate with existing systems?',
      answer: 'Absolutely! We specialize in creating applications that integrate seamlessly with existing business systems, third-party APIs, and legacy software.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Monitor className="w-12 h-12 mr-4" />
                <span className="text-2xl font-bold">Web Applications</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Build Powerful
                <span className="block text-yellow-300">Web Apps</span>
              </h1>
              <p className="text-xl mb-8 leading-relaxed">
                Custom web applications that scale with your business. From simple tools to 
                complex enterprise platforms, we bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  to="/auth"
                  className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  Start Your App
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <a 
                  href="#pricing"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors text-center"
                >
                  View Packages
                </a>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Secure by Design</span>
                </div>
                <div className="flex items-center">
                  <Cloud className="w-4 h-4 mr-2" />
                  <span>Cloud Native</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  <span>Scalable Architecture</span>
                </div>
              </div>
            </div>
            
            {/* App Metrics Dashboard */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6">Application Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                {appMetrics.map((metric, index) => (
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
                <div className="flex items-center text-yellow-300">
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How We Build Web Applications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive approach delivers scalable, secure, and user-friendly web applications
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              {[
                { id: 'features' as const, label: 'Features', icon: Zap },
                { id: 'process' as const, label: 'Process', icon: Settings },
                { id: 'results' as const, label: 'Results', icon: Monitor }
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
                    <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-purple-600" />
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
                      title: 'Requirements & Planning',
                      description: 'Deep dive into your business needs, user requirements, and technical specifications.',
                      duration: '1-2 weeks'
                    },
                    {
                      step: 2,
                      title: 'Design & Architecture',
                      description: 'Create user experience designs and technical architecture for optimal performance.',
                      duration: '2-3 weeks'
                    },
                    {
                      step: 3,
                      title: 'Development & Integration',
                      description: 'Build the application using modern technologies with continuous integration.',
                      duration: '6-16 weeks'
                    },
                    {
                      step: 4,
                      title: 'Testing & Deployment',
                      description: 'Comprehensive testing, security audits, and seamless cloud deployment.',
                      duration: '2-3 weeks'
                    }
                  ].map((step) => (
                    <div key={step.step} className="flex items-start">
                      <div className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-6 flex-shrink-0">
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
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Application Results</h3>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <Users className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">10K+ Concurrent Users</div>
                        <div className="text-gray-600">Handling high traffic loads seamlessly</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <Zap className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">Sub-100ms Response</div>
                        <div className="text-gray-600">Lightning-fast application performance</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-3 rounded-full mr-4">
                        <Shield className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">99.9% Uptime</div>
                        <div className="text-gray-600">Reliable and secure infrastructure</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-8 text-white">
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
                          <span className="text-yellow-300">{testimonial.growth}</span>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Web Application Packages</h2>
            <p className="text-xl text-gray-600">Choose the perfect package for your application needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg ${
                  plan.popular ? 'ring-2 ring-purple-500 transform scale-105' : ''
                } transition-all duration-300 hover:shadow-xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-gray-900 mb-2">${plan.price.toLocaleString()}</div>
                    <div className="text-gray-600 mb-4">starting price</div>
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
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Application Success Stories</h2>
            <p className="text-xl text-gray-600">See how our web applications transformed their businesses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{testimonial.image}</span>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-purple-500">{testimonial.handle}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{testimonial.followers}</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
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
            <p className="text-xl text-gray-600">Everything you need to know about our web application services</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg">
                <button
                  className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
      <section className="py-20 bg-gradient-to-r from-purple-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Your Web Application?
          </h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Join hundreds of businesses who have transformed their operations with our custom web applications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              Start Your Application
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
              <span>3-6 month delivery</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              <span>Enterprise security</span>
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-2" />
              <span>Scalable architecture</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebApplicationsPage;