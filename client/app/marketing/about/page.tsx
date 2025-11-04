import Navigation from '@/components/marketing/navigation';
import Footer from '@/components/marketing/footer';
import Section, { SectionHeader } from '@/components/common/section';
import StatCard from '@/components/common/stat-card';
import Button from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Innovation First',
      description: 'We leverage cutting-edge AI and technology to deliver solutions that are ahead of the curve.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Client-Centric',
      description: 'Your success is our success. We build long-term partnerships based on trust and results.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: 'Quality Driven',
      description: 'We never compromise on quality. Every project receives our full attention and expertise.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      title: 'Transparency',
      description: 'Clear communication, honest pricing, and no hidden fees. What you see is what you get.'
    }
  ];

  const team = [
    {
      name: 'Alex Rivera',
      role: 'Founder & CEO',
      image: '/images/team/alex.jpg',
      bio: '10+ years in digital marketing and SaaS development.'
    },
    {
      name: 'Sarah Chen',
      role: 'Head of Design',
      image: '/images/team/sarah.jpg',
      bio: 'Award-winning designer specializing in user experience.'
    },
    {
      name: 'Marcus Johnson',
      role: 'Lead Developer',
      image: '/images/team/marcus.jpg',
      bio: 'Full-stack expert with expertise in Next.js and Django.'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Growth Strategist',
      image: '/images/team/elena.jpg',
      bio: 'Data-driven marketer with proven track record of growth.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <Section background="gradient" padding="xl" className="pt-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
            We're Building the Future of{' '}
            <span className="gradient-text">Digital Business</span>
          </h1>
          <p className="text-xl text-neutral-600 leading-relaxed">
            Montrose is more than an agency — we're a technology platform that empowers businesses 
            to accelerate their online growth through integrated marketing, websites, courses, and AI-powered insights.
          </p>
        </div>
      </Section>

      {/* Mission Statement */}
      <Section padding="xl">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12 shadow-card border border-primary-100">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Our Mission</h2>
            <p className="text-lg text-neutral-700 leading-relaxed mb-6">
              To democratize access to professional digital services by combining expert human talent 
              with cutting-edge AI technology. We believe every business, regardless of size, deserves 
              enterprise-grade tools and strategies to compete in the digital economy.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-1">250+</div>
                <div className="text-sm text-neutral-600">Projects Delivered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-1">98%</div>
                <div className="text-sm text-neutral-600">Client Retention</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-1">$15M+</div>
                <div className="text-sm text-neutral-600">Client Revenue Generated</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section background="gray" padding="xl">
        <SectionHeader 
          title="Our Core Values"
          subtitle="The principles that guide everything we do."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-card border border-neutral-100 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mx-auto mb-4">
                {value.icon}
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-neutral-600">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Technology Stack */}
      <Section padding="xl">
        <SectionHeader 
          title="Built on Modern Technology"
          subtitle="We use industry-leading tools and frameworks to deliver exceptional results."
        />
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-card border border-neutral-100">
            <h3 className="text-xl font-bold text-neutral-900 mb-4">Frontend</h3>
            <ul className="space-y-2 text-neutral-700">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Next.js 14 & React 19
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                TypeScript & TailwindCSS
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Responsive & Accessible Design
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-card border border-neutral-100">
            <h3 className="text-xl font-bold text-neutral-900 mb-4">Backend</h3>
            <ul className="space-y-2 text-neutral-700">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Django REST Framework
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                PostgreSQL & Redis
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                AI/ML Integration (OpenAI)
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Team Section */}
      <Section background="gray" padding="xl">
        <SectionHeader 
          title="Meet Our Team"
          subtitle="Experienced professionals dedicated to your success."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-card border border-neutral-100 hover:shadow-card-hover transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-bold text-4xl">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-neutral-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-primary-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-neutral-600">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section padding="xl" className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6">
            Join Us on This Journey
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Ready to accelerate your business growth? Let's work together to achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-50">
                Get Started Today
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}