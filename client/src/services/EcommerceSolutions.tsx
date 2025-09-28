// pages/services/EcommerceSolutions.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart,
  CreditCard,
  Package,
  TrendingUp,
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
  Smartphone,
  BarChart3
} from 'lucide-react';

const EcommerceSolutionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'features' | 'process' | 'results'>('features');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = [
    {
      name: 'Starter Store',
      price: 7500,
      features: [
        'Basic e-commerce website',
        'Up to 100 products',
        'Payment gateway integration',
        'Order management',
        'Basic analytics',
        'Mobile responsive',
        '6 months support'
      ]
    },
    {
      name: 'Business Store',
      price: 15000,
      features: [
        'Advanced e-commerce platform',
        'Unlimited products',
        'Multi-payment options',
        'Inventory management',
        'Customer accounts',
        'Advanced analytics',
        'SEO optimization',
        'Email marketing integration',
        '12 months support'
      ],
      popular: true
    },
    {
      name: 'Enterprise Store',
      price: 35000,
      features: [
        'Custom e-commerce solution',
        'Multi-vendor marketplace',
        'Advanced integrations',
        'Custom workflows',
        'B2B functionality',
        'API development',
        'Performance optimization',
        'Dedicated account manager',
        '24 months support'
      ]
    }
  ];

  const ecommerceMetrics = [
    { icon: ShoppingCart, label: 'Stores Built', value: '500+', description: 'E-commerce websites' },
    { icon: TrendingUp, label: 'Revenue Generated', value: '$50M+', description: 'Client sales volume' },
    { icon: Users, label: 'Customers Served', value: '1M+', description: 'Online shoppers' },
    { icon: BarChart3, label: 'Conversion Rate', value: '3.5%', description: 'Average improvement' }
  ];

  const features = [
    {
      icon: ShoppingCart,
      title: 'Product Management',
      description: 'Comprehensive product catalog with advanced management features.',
      details: ['Product variants & options', 'Inventory tracking', 'Bulk import/export']
    },
    {
      icon: CreditCard,
      title: 'Payment Processing',
      description: 'Secure payment gateway integration with multiple payment options.',
      details: ['Credit/debit cards', 'Digital wallets', 'Buy now, pay later']
    },
    {
      icon: Package,
      title: 'Order Management',
      description: 'Complete order fulfillment system from purchase to delivery.',
      details: ['Order tracking', 'Shipping integration', 'Return management']
    },
    {
      icon: Smartphone,
      title: 'Mobile Commerce',
      description: 'Optimized mobile shopping experience for all devices.',
      details: ['Responsive design', 'Touch-friendly interface', 'Mobile payments']
    },
    {
      icon: TrendingUp,
      title: 'Analytics & Reports',
      description: 'Detailed insights into sales performance and customer behavior.',
      details: ['Sales analytics', 'Customer insights', 'Performance reports']
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security with PCI compliance and data protection.',
      details: ['SSL encryption', 'PCI compliance', 'Fraud protection']
    }
  ];

  const testimonials = [
    {
      name: 'Jennifer Walsh',
      handle: 'Fashion Boutique',
      image: '👗',
      text: 'Our online store sales increased 400% after the redesign. The user experience is incredible and conversions are through the roof.',
      followers: '400% sales increase',
      growth: 'Incredible UX'
    },
    {
      name: 'Robert Martinez',
      handle: 'Electronics Store',
      image: '📱',
      text: 'Built a multi-vendor marketplace that now handles $1M monthly. The platform scales perfectly with our growth.',
      followers: '$1M monthly',
      growth: 'Perfect scaling'
    },
    {
      name: 'Amanda Foster',
      handle: 'Health & Beauty',
      image: '💄',
      text: 'The subscription commerce features transformed our business model. Recurring revenue grew 300% in 6 months.',
      followers: '300% recurring revenue',
      growth: 'Business transformation'
    }
  ];

  const faqs = [
    {
      question: 'What e-commerce platforms do you work with?',
      answer: 'We build custom e-commerce solutions and also work with platforms like Shopify, WooCommerce, Magento, and others based on your specific needs and requirements.'
    },
    {
      question: 'How long does it take to build an e-commerce store?',
      answer: 'Development time varies: Basic stores take 4-6 weeks, advanced stores take 8-12 weeks, and custom enterprise solutions can take 3-6 months.'
    },
    {
      question: 'Do you handle payment gateway integration?',
      answer: 'Yes, we integrate with all major payment gateways including Stripe, PayPal, Square, and others. We ensure secure, PCI-compliant payment processing.'
    },
    {
      question: 'Can you migrate my existing store?',
      answer: 'Absolutely! We provide seamless migration services from any platform, ensuring zero downtime and data integrity throughout the process.'
    },
    {
      question: 'What ongoing support do you provide?',
      answer: 'We offer comprehensive support including security updates, performance monitoring, feature enhancements, and technical assistance based on your support plan.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-600 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <ShoppingCart className="w-12 h-12 mr-4" />
                <span className="text-2xl font-bold">E-commerce Solutions</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Sell More
                <span className="block text-yellow-300">Online</span>
              </h1>
              <p className="text-xl mb-8 leading-relaxed">
                Professional e-commerce websites that convert visitors into customers. 
                Complete online stores with payment processing, inventory management, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  to="/auth"
                  className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  Start Selling
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <a 
                  href="#pricing"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-600 transition-colors text-center"
                >
                  View Packages
                </a>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>PCI Compliant</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  <span>Fast Loading</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  <span>High Converting</span>
                </div>
              </div>
            </div>
            
            {/* E-commerce Metrics Dashboard */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6">E-commerce Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                {ecommerceMetrics.map((metric, index) => (
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete E-commerce Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to start selling online and grow your business
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              {[
                { id: 'features' as const, label: 'E-commerce Features', icon: Zap },
                { id: 'process' as const, label: 'Development Process', icon: Package },
                { id: 'results' as const, label: 'Success Stories', icon: TrendingUp }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center ${
                    activeTab === tab.id
                      ? 'bg-white shadow-md text-orange-600'
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
                    <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-orange-600" />
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
                      title: 'Store Planning & Design',
                      description: 'Plan your store structure, design user experience, and create conversion-focused layouts.',
                      duration: '1-2 weeks'
                    },
                    {
                      step: 2,
                      title: 'Development & Integration',
                      description: 'Build your store with payment gateways, inventory systems, and third-party integrations.',
                      duration: '4-8 weeks'
                    },
                    {
                      step: 3,
                      title: 'Testing & Optimization',
                      description: 'Comprehensive testing of all features, payment flows, and performance optimization.',
                      duration: '1-2 weeks'
                    },
                    {
                      step: 4,
                      title: 'Launch & Growth',
                      description: 'Go live with your store and implement growth strategies for increased sales.',
                      duration: 'Ongoing'
                    }
                  ].map((step) => (
                    <div key={step.step} className="flex items-start">
                      <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-6 flex-shrink-0">
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
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">E-commerce Success</h3>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">$50M+ Revenue</div>
                        <div className="text-gray-600">Generated for our clients</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <ShoppingCart className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">3.5% Conversion Rate</div>
                        <div className="text-gray-600">Average improvement achieved</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-3 rounded-full mr-4">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">1M+ Customers</div>
                        <div className="text-gray-600">Served across all platforms</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 text-white">
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">E-commerce Packages</h2>
            <p className="text-xl text-gray-600">Choose the perfect package to start selling online</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg ${
                  plan.popular ? 'ring-2 ring-orange-500 transform scale-105' : ''
                } transition-all duration-300 hover:shadow-xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
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
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">E-commerce Success Stories</h2>
            <p className="text-xl text-gray-600">See how our stores drive real business results</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{testimonial.image}</span>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-orange-500">{testimonial.handle}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{testimonial.followers}</span>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
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
            <p className="text-xl text-gray-600">Everything you need to know about our e-commerce services</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg">
                <button
                  className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Selling Online?
          </h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Join thousands of successful online stores that trust our e-commerce solutions to drive their sales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth"
              className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              Launch Your Store
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-600 transition-colors"
            >
              Get Free Quote
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-white/80">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>6-12 week delivery</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              <span>PCI compliant</span>
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-2" />
              <span>Conversion optimized</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EcommerceSolutionsPage;