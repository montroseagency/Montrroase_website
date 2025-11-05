import Navigation from '@/components/marketing/navigation';
import Footer from '@/components/marketing/footer';
import Section, { SectionHeader } from '@/components/common/section';
import FeatureCard from '@/components/common/feature-card';
import Button from '@/components/ui/button';
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
      iconColor: 'from-primary-500 to-primary-700',
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
      iconColor: 'from-accent-500 to-accent-700',
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
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <Section background="gradient" padding="xl" className="pt-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-primary-100 mb-6">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
            </span>
            <span className="text-sm font-medium text-neutral-700">
              Full-Service Digital Agency
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
            Comprehensive Services to{' '}
            <span className="gradient-text">Accelerate Your Growth</span>
          </h1>
          
          <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
            From strategy to execution, we provide everything you need to build, grow, 
            and scale your online presence. One platform, unlimited possibilities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg">
                Get Started Free
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Services Grid */}
      <Section padding="xl">
        <SectionHeader 
          title="Everything You Need in One Platform"
          subtitle="Integrated services designed to work together seamlessly, giving you the tools and support to succeed online."
        />
        
        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover border border-neutral-100 transition-all duration-300">
              <div className={`w-16 h-16 bg-gradient-to-br ${service.iconColor} rounded-xl flex items-center justify-center mb-6`}>
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                {service.title}
              </h3>
              
              <p className="text-neutral-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="space-y-3">
                <p className="text-sm font-semibold text-neutral-900 mb-3">
                  What's Included:
                </p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm text-neutral-700">
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
      </Section>

      {/* How It Works */}
      <Section background="gray" padding="xl">
        <SectionHeader 
          title="How Montrose Works"
          subtitle="A simple, proven process to take your business from zero to hero."
        />
        
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
              <div className="bg-white rounded-xl p-6 shadow-card border border-neutral-100 h-full">
                <div className="text-5xl font-bold text-primary-100 mb-4">
                  {step.step}
                </div>
                <h4 className="text-lg font-bold text-neutral-900 mb-2">
                  {step.title}
                </h4>
                <p className="text-neutral-600 text-sm">
                  {step.description}
                </p>
              </div>
              {index < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <svg className="w-6 h-6 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section padding="xl" className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join hundreds of businesses already growing with Montrose. Get started today with our 14-day free trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-50">
                Start Your Free Trial
              </Button>
            </Link>
            <Link href="/pricing">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white/10"
              >
                View Pricing Plans
              </Button>
            </Link>
          </div>
          <p className="text-primary-200 text-sm mt-6">
            No credit card required • Cancel anytime • Full access to all features
          </p>
        </div>
      </Section>

      <Footer />
    </div>
  );
}