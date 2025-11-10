'use client';

import Navigation from '@/components/marketing/navigation';
import Footer from '@/components/marketing/footer';
import InteractiveGlowBackground from '@/components/interactive-glow-background';
import PricingCard from '@/components/common/pricing-card';

export default function PricingPage() {
  const plans = [
    {
      name: 'Standard',
      price: 49,
      period: 'month',
      description: 'Perfect for small businesses getting started',
      features: [
        'Dashboard Access',
        '2 Social Media Accounts',
        'Basic Analytics',
        '10 Posts per Month',
        'Email Support',
        'Fundamentals Courses',
        '$10 Ad Credit'
      ],
      ctaText: 'Start Standard',
      ctaLink: '/auth/register?plan=standard'
    },
    {
      name: 'Pro',
      price: 149,
      period: 'month',
      description: 'For growing businesses ready to scale',
      features: [
        'Everything in Standard',
        '5 Social Media Accounts',
        'Advanced Analytics & Insights',
        '30 Posts per Month',
        'Priority Support',
        'Strategy & Content Courses',
        'Basic Website Builder Access',
        '$50 Ad Credit',
        'Monthly Strategy Call'
      ],
      highlighted: true,
      badge: 'Most Popular',
      ctaText: 'Start Pro',
      ctaLink: '/auth/register?plan=pro'
    },
    {
      name: 'Premium',
      price: 299,
      period: 'month',
      description: 'For established businesses demanding results',
      features: [
        'Everything in Pro',
        'Unlimited Social Accounts',
        'Real-Time Analytics Dashboard',
        'Unlimited Posts',
        '24/7 Premium Support',
        'Optimization & Analytics Courses',
        'Full Website Builder Access',
        '$100 Ad Credit',
        'Bi-Weekly Strategy Calls',
        'Custom Integrations',
        'White-Label Reports'
      ],
      ctaText: 'Start Premium',
      ctaLink: '/auth/register?plan=premium'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large teams with unique requirements',
      features: [
        'Everything in Premium',
        'Dedicated Account Manager',
        'Custom AI Solutions',
        'Automation & Scaling Courses',
        'API Access',
        'Custom Training Programs',
        'Unlimited Ad Credits',
        'Weekly Strategy Sessions',
        'Advanced Security Features',
        'SLA Guarantee',
        'Custom Contracts'
      ],
      ctaText: 'Contact Sales',
      ctaLink: '/contact'
    }
  ];

  const addons = [
    {
      name: 'Extra Social Account',
      price: '$15/month',
      description: 'Add unlimited social media accounts to your plan'
    },
    {
      name: 'Premium Website',
      price: 'From $999',
      description: 'Custom-designed website with advanced features'
    },
    {
      name: 'Ad Campaign Management',
      price: '$299/month',
      description: 'Expert-managed advertising campaigns across all platforms'
    },
    {
      name: 'Content Creation',
      price: '$199/month',
      description: 'Professional photo and video content creation services'
    }
  ];

  const faqs = [
    {
      question: 'Can I change my plan later?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any charges.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and can set up invoicing for Enterprise plans.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! All plans come with a 14-day free trial. No credit card required to start.'
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'Your data remains accessible for 30 days after cancellation. You can export all your data anytime from your dashboard.'
    },
    {
      question: 'Do you offer discounts for annual billing?',
      answer: 'Yes! Save 20% when you pay annually. Contact our sales team for custom Enterprise pricing.'
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <InteractiveGlowBackground />

      <div className="relative" style={{ zIndex: 1 }}>
        <Navigation />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20">
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
            <div className="text-center max-w-4xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full border border-white/20">
                <span className="text-sm font-semibold text-white">
                  Simple, Transparent Pricing
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-tight tracking-tighter">
                <span className="text-white block mb-2">
                  PLANS THAT SCALE
                </span>
                <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent block">
                  WITH SUCCESS
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                Start free, upgrade when ready. All plans include access to our powerful dashboard and expert support.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {plans.map((plan, index) => (
                <PricingCard key={index} {...plan} />
              ))}
            </div>

            <div className="text-center mt-12">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-green-400/10 text-green-400 text-sm font-semibold rounded-full border border-green-400/20">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                14-Day Money-Back Guarantee
              </span>
            </div>
          </div>
        </section>

        {/* Add-ons Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
                Add-Ons &{' '}
                <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  Extras
                </span>
              </h2>
              <p className="text-xl text-gray-400">
                Enhance your plan with additional services tailored to your needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {addons.map((addon, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {addon.name}
                  </h3>
                  <p className="text-2xl font-bold text-blue-400 mb-3">
                    {addon.price}
                  </p>
                  <p className="text-sm text-gray-400">
                    {addon.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
                Compare{' '}
                <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  Features
                </span>
              </h2>
              <p className="text-xl text-gray-400">
                See what's included in each plan
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white/5 backdrop-blur-sm border-b border-white/10">
                    <th className="text-left p-6 text-white font-bold text-lg">Features</th>
                    <th className="text-center p-6 text-white font-bold text-lg">Standard</th>
                    <th className="text-center p-6 text-white font-bold text-lg">Pro</th>
                    <th className="text-center p-6 text-white font-bold text-lg">Premium</th>
                    <th className="text-center p-6 text-white font-bold text-lg">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Dashboard Access', standard: true, pro: true, premium: true, enterprise: true },
                    { feature: 'Social Media Accounts', standard: '2', pro: '5', premium: 'Unlimited', enterprise: 'Unlimited' },
                    { feature: 'Posts per Month', standard: '10', pro: '30', premium: 'Unlimited', enterprise: 'Unlimited' },
                    { feature: 'Basic Analytics', standard: true, pro: true, premium: true, enterprise: true },
                    { feature: 'Advanced Analytics & Insights', standard: false, pro: true, premium: true, enterprise: true },
                    { feature: 'Real-Time Analytics Dashboard', standard: false, pro: false, premium: true, enterprise: true },
                    { feature: 'Email Support', standard: true, pro: false, premium: false, enterprise: false },
                    { feature: 'Priority Support', standard: false, pro: true, premium: false, enterprise: false },
                    { feature: '24/7 Premium Support', standard: false, pro: false, premium: true, enterprise: true },
                    { feature: 'Fundamentals Courses', standard: true, pro: false, premium: false, enterprise: false },
                    { feature: 'Strategy & Content Courses', standard: false, pro: true, premium: false, enterprise: false },
                    { feature: 'Optimization & Analytics Courses', standard: false, pro: false, premium: true, enterprise: false },
                    { feature: 'Automation & Scaling Courses', standard: false, pro: false, premium: false, enterprise: true },
                    { feature: 'Website Builder Access', standard: false, pro: 'Basic', premium: 'Full', enterprise: 'Full' },
                    { feature: 'Ad Credits', standard: '$10', pro: '$50', premium: '$100', enterprise: 'Unlimited' },
                    { feature: 'Strategy Calls', standard: false, pro: 'Monthly', premium: 'Bi-Weekly', enterprise: 'Weekly' },
                    { feature: 'Custom Integrations', standard: false, pro: false, premium: true, enterprise: true },
                    { feature: 'White-Label Reports', standard: false, pro: false, premium: true, enterprise: true },
                    { feature: 'Dedicated Account Manager', standard: false, pro: false, premium: false, enterprise: true },
                    { feature: 'Custom AI Solutions', standard: false, pro: false, premium: false, enterprise: true },
                    { feature: 'API Access', standard: false, pro: false, premium: false, enterprise: true },
                    { feature: 'Custom Training Programs', standard: false, pro: false, premium: false, enterprise: true },
                    { feature: 'Advanced Security Features', standard: false, pro: false, premium: false, enterprise: true },
                    { feature: 'SLA Guarantee', standard: false, pro: false, premium: false, enterprise: true },
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
                      <td className="p-6 text-gray-300 font-medium">{row.feature}</td>
                      <td className="p-6 text-center">
                        {typeof row.standard === 'boolean' ? (
                          row.standard ? (
                            <svg className="w-6 h-6 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )
                        ) : (
                          <span className="text-white font-semibold">{row.standard}</span>
                        )}
                      </td>
                      <td className="p-6 text-center">
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? (
                            <svg className="w-6 h-6 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )
                        ) : (
                          <span className="text-white font-semibold">{row.pro}</span>
                        )}
                      </td>
                      <td className="p-6 text-center">
                        {typeof row.premium === 'boolean' ? (
                          row.premium ? (
                            <svg className="w-6 h-6 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )
                        ) : (
                          <span className="text-white font-semibold">{row.premium}</span>
                        )}
                      </td>
                      <td className="p-6 text-center">
                        {typeof row.enterprise === 'boolean' ? (
                          row.enterprise ? (
                            <svg className="w-6 h-6 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )
                        ) : (
                          <span className="text-white font-semibold">{row.enterprise}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
                Frequently Asked{' '}
                <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
              <p className="text-xl text-gray-400">
                Got questions? We've got answers.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 group hover:border-white/30 transition-all duration-300">
                  <summary className="font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                    {faq.question}
                    <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="text-gray-400 mt-4 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
