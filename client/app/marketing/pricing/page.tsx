import Navigation from '@/components/marketing/navigation';
import Footer from '@/components/marketing/footer';
import Section, { SectionHeader } from '@/components/common/section';
import PricingCard from '@/components/common/pricing-card';
import Badge from '@/components/ui/badge';

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
      <Section background="gradient" padding="xl" className="pt-32">
        <SectionHeader 
          badge="Simple, Transparent Pricing"
          title="Plans That Scale With Your Success"
          subtitle="Start free, upgrade when ready. All plans include access to our powerful dashboard and expert support."
        />
      </Section>

      {/* Pricing Cards */}
      <Section padding="xl" className="relative -mt-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>

        {/* Guarantee Badge */}
        <div className="text-center mt-12">
          <Badge variant="success" size="lg">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            14-Day Money-Back Guarantee
          </Badge>
        </div>
      </Section>

      {/* Add-ons Section */}
      <Section background="gray" padding="xl">
        <SectionHeader 
          title="Add-Ons & Extras"
          subtitle="Enhance your plan with additional services tailored to your needs."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {addons.map((addon, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-card border border-neutral-100">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                {addon.name}
              </h3>
              <p className="text-2xl font-bold text-primary-600 mb-3">
                {addon.price}
              </p>
              <p className="text-sm text-neutral-600">
                {addon.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Comparison Table */}
      <Section padding="xl">
        <SectionHeader 
          title="Feature Comparison"
          subtitle="See exactly what's included in each plan."
        />
        
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl shadow-card border border-neutral-100">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="p-4 text-left font-bold text-neutral-900">Feature</th>
                <th className="p-4 text-center font-bold text-neutral-900">Standard</th>
                <th className="p-4 text-center font-bold text-neutral-900 bg-primary-50">Pro</th>
                <th className="p-4 text-center font-bold text-neutral-900">Premium</th>
                <th className="p-4 text-center font-bold text-neutral-900">Enterprise</th>
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
                <tr key={index} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="p-4 text-neutral-700">{feature}</td>
                  <td className="p-4 text-center">
                    {typeof standard === 'boolean' ? (
                      standard ? (
                        <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-neutral-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )
                    ) : (
                      <span className="text-neutral-700">{standard}</span>
                    )}
                  </td>
                  <td className="p-4 text-center bg-primary-50/50">
                    {typeof pro === 'boolean' ? (
                      pro ? (
                        <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-neutral-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )
                    ) : (
                      <span className="text-neutral-700 font-medium">{pro}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {typeof premium === 'boolean' ? (
                      premium ? (
                        <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-neutral-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )
                    ) : (
                      <span className="text-neutral-700">{premium}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {typeof enterprise === 'boolean' ? (
                      enterprise ? (
                        <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-neutral-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )
                    ) : (
                      <span className="text-neutral-700">{enterprise}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section background="gray" padding="xl">
        <SectionHeader 
          title="Frequently Asked Questions"
          subtitle="Got questions? We've got answers."
        />
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="bg-white rounded-xl p-6 shadow-card border border-neutral-100 group">
              <summary className="font-semibold text-neutral-900 cursor-pointer list-none flex items-center justify-between">
                {faq.question}
                <svg className="w-5 h-5 text-neutral-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-neutral-600 mt-4">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  );
}