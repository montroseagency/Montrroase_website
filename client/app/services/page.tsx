import Navigation from '@/components/marketing/navigation';
import Footer from '@/components/marketing/footer';
import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      title: 'Social Media Marketing',
      description: 'Dominate TikTok, Instagram, and Facebook with data-driven campaigns that convert. Our experts manage your social presence end-to-end.',
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      iconColor: 'from-blue-500 to-blue-700',
      features: [
        'TikTok & Instagram Reels Strategy',
        'Facebook & Meta Ads Management',
        'Content Creation & Scheduling',
        'Audience Targeting & Growth',
        'Performance Analytics & Reporting',
        'Influencer Collaboration Management',
      ],
    },
    {
      title: 'Website Development',
      description: 'Custom-built websites that drive results. From landing pages to full e-commerce platforms, we create digital experiences that convert visitors into customers.',
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      iconColor: 'from-red-500 to-red-700',
      features: [
        'Custom Website Design & Development',
        'E-commerce Solutions (Shopify, WooCommerce)',
        'Responsive Mobile-First Design',
        'SEO Optimization Built-In',
        'CMS Integration (WordPress, Webflow)',
        'AI-Powered Website Valuation',
      ],
    },
    {
      title: 'Hosting & Deployment',
      description: 'Lightning-fast, secure hosting with 99.9% uptime. We handle domains, SSL certificates, and technical maintenance so you can focus on growth.',
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      iconColor: 'from-green-500 to-green-700',
      features: [
        'Domain Registration & Management',
        'SSL Certificates & Security',
        'CDN & Performance Optimization',
        '99.9% Uptime Guarantee',
        'Daily Backups & Disaster Recovery',
        '24/7 Technical Support',
      ],
    },
    {
      title: 'Professional Courses',
      description: 'Learn from industry experts with our comprehensive courses on digital marketing, web development, and business growth strategies.',
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      iconColor: 'from-purple-500 to-purple-700',
      features: [
        'Marketing Fundamentals & Strategy',
        'Social Media Growth Tactics',
        'Content Creation Masterclass',
        'Analytics & Optimization',
        'Automation & Scaling Techniques',
        'Certification Upon Completion',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-black pt-32 pb-20">

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-sm border border-blue-100 mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              <span className="text-sm font-semibold text-gray-700">
                Full-Service Digital Agency
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
              <span className="text-white block mb-2">Comprehensive Services to</span>
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent block">
                Accelerate Your Growth
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed mb-10 max-w-3xl mx-auto">
              From strategy to execution, we provide everything you need to build, grow,
              and scale your online presence. One platform, unlimited possibilities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Get Started Free
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg border-2 border-blue-100 hover:border-blue-300 transition-all"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Everything You Need in{' '}
              <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                One Platform
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              Integrated services designed to work together seamlessly, giving you the tools and support to succeed online.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-br ${service.iconColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-gray-900 mb-3">
                    What's Included:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              How{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Montrose Works
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              A simple, proven process to take your business from zero to hero.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Sign Up',
                description: 'Create your account and access your personal dashboard in minutes.',
              },
              {
                step: '02',
                title: 'Choose Services',
                description: 'Select the services you need and get an AI-powered estimate instantly.',
              },
              {
                step: '03',
                title: 'We Execute',
                description: 'Our expert team gets to work while you track progress in real-time.',
              },
              {
                step: '04',
                title: 'You Grow',
                description: 'Watch your metrics soar as we optimize and scale your online presence.',
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 h-full hover:shadow-xl transition-all duration-300">
                  <div className="text-5xl font-bold text-blue-100 mb-4">
                    {step.step}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join hundreds of businesses already growing with Montrose. Get started today with our 14-day free trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              Start Your Free Trial
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-500/20 backdrop-blur-sm text-white text-lg font-semibold rounded-xl border-2 border-white/30 hover:border-white/60 hover:-translate-y-1 transition-all"
            >
              View Pricing Plans
            </Link>
          </div>
          <p className="text-blue-200 text-sm mt-8">
            No credit card required • Cancel anytime • Full access to all features
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}