import Navigation from '@/components/marketing/navigation';
import Footer from '@/components/marketing/footer';
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
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-sm border border-blue-100">
              <span className="text-sm font-semibold text-gray-700">
                Simple, Transparent Pricing
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent block mb-2">
                Plans That Scale
              </span>
              <span className="text-gray-900 block">With Your Success</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Start free, upgrade when ready. All plans include access to our powerful dashboard and expert support.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>

          {/* Guarantee Badge */}
          <div className="text-center mt-12">
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 text-green-700 text-sm font-semibold rounded-full border border-green-200 shadow-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              14-Day Money-Back Guarantee
            </span>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Add-Ons & Extras
            </h2>
            <p className="text-xl text-gray-600">
              Enhance your plan with additional services tailored to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addons.map((addon, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {addon.name}
                </h3>
                <p className="text-2xl font-bold text-blue-600 mb-3">
                  {addon.price}
                </p>
                <p className="text-sm text-gray-600">
                  {addon.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Feature Comparison
            </h2>
            <p className="text-xl text-gray-600">
              See exactly what's included in each plan.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-md border border-gray-100">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-4 text-left font-bold text-gray-900">Feature</th>
                  <th className="p-4 text-center font-bold text-gray-900">Standard</th>
                  <th className="p-4 text-center font-bold text-gray-900 bg-blue-50">Pro</th>
                  <th className="p-4 text-center font-bold text-gray-900">Premium</th>
                  <th className="p-4 text-center font-bold text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Dashboard Access', true, true, true, true],
                  ['Social Media Accounts', '2', '5', 'Unlimited', 'Unlimited'],
                  ['Posts per Month', '10', '30', 'Unlimited', 'Unlimited'],
                  ['Analytics', 'Basic', 'Advanced', 'Real-Time', 'Custom'],
                  ['Support', 'Email', 'Priority', '24/7', 'Dedicated'],
                  ['Course Access', 'Fundamentals', 'Strategy', 'Optimization', 'All + Custom'],
                  ['Website Builder', false, 'Basic', 'Full', 'Full + Custom'],
                  ['Ad Credits', '$10', '$50', '$100', 'Unlimited'],
                  ['Strategy Calls', false, 'Monthly', 'Bi-Weekly', 'Weekly'],
                  ['API Access', false, false, false, true],
                ].map(([feature, standard, pro, premium, enterprise], index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 text-gray-700">{feature}</td>
                    <td className="p-4 text-center">
                      {typeof standard === 'boolean' ? (
                        standard ? (
                          <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )
                      ) : (
                        <span className="text-gray-700">{standard}</span>
                      )}
                    </td>
                    <td className="p-4 text-center bg-blue-50/50">
                      {typeof pro === 'boolean' ? (
                        pro ? (
                          <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )
                      ) : (
                        <span className="text-gray-700 font-medium">{pro}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof premium === 'boolean' ? (
                        premium ? (
                          <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )
                      ) : (
                        <span className="text-gray-700">{premium}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof enterprise === 'boolean' ? (
                        enterprise ? (
                          <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )
                      ) : (
                        <span className="text-gray-700">{enterprise}</span>
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
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 group">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  {faq.question}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="text-gray-600 mt-4 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
