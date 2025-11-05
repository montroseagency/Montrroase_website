"use client";

import Navigation from '@/components/marketing/navigation';
import Footer from '@/components/marketing/footer';
import Section, { SectionHeader } from '@/components/common/section';
import PortfolioCard from '@/components/common/portfolio-card'
import Button from '@/components/ui/button';
import { useState } from 'react';

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'E-commerce', 'Business', 'Real Estate', 'Restaurant', 'Personal'];
  
  const projects = [
    {
      title: 'Luxury Fashion Store',
      category: 'E-commerce',
      description: 'High-end fashion e-commerce platform with custom product configurator and AR try-on features.',
      image: '/images/portfolio/fashion-store.jpg',
      price: '$2,499 - $3,999',
      tags: ['Shopify', 'Custom Design', 'AR Integration'],
      link: '/portfolio/luxury-fashion',
      videoUrl: 'https://example.com/video1'
    },
    {
      title: 'Tech Startup Landing',
      category: 'Business',
      description: 'Modern SaaS landing page with animated sections and lead generation forms.',
      image: '/images/portfolio/tech-startup.jpg',
      price: '$1,499 - $2,499',
      tags: ['Next.js', 'Animation', 'SEO Optimized'],
      link: '/portfolio/tech-startup',
      videoUrl: 'https://example.com/video2'
    },
    {
      title: 'Real Estate Agency',
      category: 'Real Estate',
      description: 'Property listing platform with virtual tours, mortgage calculator, and CRM integration.',
      image: '/images/portfolio/real-estate.jpg',
      price: '$3,999 - $5,999',
      tags: ['Custom CMS', 'Virtual Tours', '3D Maps'],
      link: '/portfolio/real-estate',
      videoUrl: 'https://example.com/video3'
    },
    {
      title: 'Fine Dining Restaurant',
      category: 'Restaurant',
      description: 'Elegant restaurant website with online reservations and menu management system.',
      image: '/images/portfolio/restaurant.jpg',
      price: '$999 - $1,999',
      tags: ['WordPress', 'Booking System', 'Menu Builder'],
      link: '/portfolio/restaurant',
      videoUrl: 'https://example.com/video4'
    },
    {
      title: 'Fitness Coach Portfolio',
      category: 'Personal',
      description: 'Personal brand website with booking system, blog, and client testimonials.',
      image: '/images/portfolio/fitness-coach.jpg',
      price: '$799 - $1,499',
      tags: ['Custom Design', 'Booking', 'Blog'],
      link: '/portfolio/fitness-coach',
      videoUrl: 'https://example.com/video5'
    },
    {
      title: 'Electronics Marketplace',
      category: 'E-commerce',
      description: 'Multi-vendor marketplace with advanced filtering, reviews, and payment integration.',
      image: '/images/portfolio/electronics.jpg',
      price: '$4,999 - $7,999',
      tags: ['Multi-vendor', 'Advanced Filtering', 'Payment Gateway'],
      link: '/portfolio/electronics',
      videoUrl: 'https://example.com/video6'
    },
    {
      title: 'Law Firm Website',
      category: 'Business',
      description: 'Professional law firm site with case studies, attorney profiles, and consultation booking.',
      image: '/images/portfolio/law-firm.jpg',
      price: '$1,999 - $3,499',
      tags: ['Professional Design', 'Case Studies', 'Booking'],
      link: '/portfolio/law-firm',
      videoUrl: 'https://example.com/video7'
    },
    {
      title: 'Property Development',
      category: 'Real Estate',
      description: 'Luxury property developer showcase with interactive floor plans and investment calculator.',
      image: '/images/portfolio/property-dev.jpg',
      price: '$3,499 - $5,499',
      tags: ['Interactive Plans', 'Calculator', 'Gallery'],
      link: '/portfolio/property-dev',
      videoUrl: 'https://example.com/video8'
    },
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <Section background="gradient" padding="xl" className="pt-32">
        <SectionHeader 
          badge="Our Work"
          title="Projects That Drive Real Results"
          subtitle="Explore our portfolio of successful websites and digital projects. From startups to established businesses, we've helped brands grow online."
        />
      </Section>

      {/* Stats */}
      <Section padding="md" className="relative -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: '250+', label: 'Projects Completed' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '$15M+', label: 'Revenue Generated' },
            { value: '150+', label: 'Happy Clients' },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-card border border-neutral-100 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Filter Buttons */}
      <Section padding="md">
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </Section>

      {/* Portfolio Grid */}
      <Section padding="xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <PortfolioCard key={index} {...project} />
          ))}
        </div>
      </Section>

      {/* Testimonial */}
      <Section background="gray" padding="xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote className="text-2xl font-medium text-neutral-900 mb-6">
            "Montrose transformed our online presence. Our new website increased conversions by 340% in just three months. The ROI has been incredible."
          </blockquote>
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
              SM
            </div>
            <div className="text-left">
              <p className="font-semibold text-neutral-900">Sarah Mitchell</p>
              <p className="text-neutral-600">CEO, TechFlow Solutions</p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section padding="xl" className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Let's bring your vision to life. Get a free consultation and AI-powered estimate today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-50">
              Get Free Estimate
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white/10"
            >
              Schedule Call
            </Button>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}