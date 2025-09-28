// pages/HomePage.tsx - Web Development Agency Version
import React, { useState, useEffect } from 'react';
import { Play, TrendingUp, ArrowRight, CheckCircle, Quote, Users, Clock, Shield, CreditCard, Code, Palette, Zap } from 'lucide-react';

interface HomePageProps {
  onGetStarted?: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      platform: 'Frontend',
      icon: '🎨',
      color: 'from-blue-100 to-blue-200',
      description: 'Create stunning, responsive user interfaces with modern frameworks like React, Vue, and Angular.',
      features: ['React Development', 'Responsive Design', 'UI/UX Implementation', 'Performance Optimization'],
      stats: { projects: '500+', clients: '200+', satisfaction: '99%' }
    },
    {
      platform: 'Backend',
      icon: '⚙️',
      color: 'from-green-100 to-green-200',
      description: 'Build robust, scalable server-side solutions with Node.js, Python, PHP, and cloud technologies.',
      features: ['API Development', 'Database Design', 'Cloud Integration', 'Security Implementation'],
      stats: { projects: '300+', clients: '150+', uptime: '99.9%' }
    },
    {
      platform: 'Full Stack',
      icon: '🚀',
      color: 'from-purple-500 to-pink-500',
      description: 'Complete web solutions from concept to deployment with modern tech stacks and best practices.',
      features: ['End-to-End Development', 'DevOps & Deployment', 'Maintenance & Support', 'Technical Consulting'],
      stats: { projects: '200+', clients: '100+', retention: '95%' }
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Startup Founder",
      platform: "E-commerce Platform",
      image: "👩‍💼",
      content: "They built our entire e-commerce platform in just 8 weeks. The code quality is exceptional and the site handles thousands of concurrent users flawlessly.",
      stats: "8-week delivery, 99.9% uptime"
    },
    {
      name: "Mike Rodriguez",
      role: "CTO",
      platform: "SaaS Application",
      image: "👨‍💻",
      content: "Outstanding development team! They delivered a complex SaaS application that scales beautifully. Our revenue increased 300% after launch.",
      stats: "300% revenue increase post-launch"
    },
    {
      name: "Emma Chen",
      role: "Marketing Director",
      platform: "Corporate Website",
      image: "👩‍🎨",
      content: "The new website increased our conversion rate by 250%. Beautiful design, lightning-fast performance, and perfect mobile responsiveness.",
      stats: "250% conversion rate increase"
    }
  ];

  const features = [
    { icon: Code, title: 'Clean Code', description: 'Well-structured, maintainable code following industry best practices.' },
    { icon: Clock, title: 'Fast Delivery', description: 'Agile development process with regular updates and on-time delivery.' },
    { icon: Shield, title: 'Secure Solutions', description: 'Security-first approach with comprehensive testing and protection.' },
    { icon: CreditCard, title: 'Fair Pricing', description: 'Transparent pricing with no hidden costs. Pay for value delivered.' },
    { icon: Zap, title: 'High Performance', description: 'Optimized applications that load fast and scale efficiently.' },
    { icon: Palette, title: 'Modern Design', description: 'Beautiful, user-centered designs that convert visitors to customers.' }
  ];

  const stats = [
    { number: '500+', label: 'Projects Delivered' },
    { number: '200+', label: 'Happy Clients' },
    { number: '99.9%', label: 'Uptime Guarantee' },
    { number: '24/7', label: 'Technical Support' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-20 sm:top-40 right-10 sm:right-20 w-24 h-24 sm:w-48 sm:h-48 bg-pink-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 sm:bottom-20 left-1/4 sm:left-1/3 w-12 h-12 sm:w-24 sm:h-24 bg-blue-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-100 text-green-800 text-xs sm:text-sm font-medium mb-6 sm:mb-8 animate-bounce">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              <span className="hidden sm:inline">Trusted by 200+ Companies Worldwide</span>
              <span className="sm:hidden">Trusted by 200+ Companies</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight">
              <span className="block">Build Your</span>
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent block">
                Digital Future
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl flex items-center justify-center gap-2 sm:gap-4 mt-2">
                <span>Today</span>
                <span className="animate-bounce text-lg sm:text-2xl md:text-3xl lg:text-4xl">💻</span>
              </span>
            </h1>

            {/* Subtitle */}
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-2">
              <p className="mb-2">
                Professional web development services for 
                <span className="font-semibold text-blue-600"> Frontend</span>,
                <span className="font-semibold text-green-600"> Backend</span>, and
                <span className="font-semibold text-purple-600"> Full Stack</span> solutions.
              </p>
              <p className="text-sm sm:text-base md:text-lg font-medium text-purple-700">
                Modern technology. Scalable architecture. Exceptional results.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600 mb-1">{stat.number}</div>
                  <div className="text-gray-600 text-xs sm:text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
              <button 
                onClick={onGetStarted}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 min-w-0 sm:min-w-64"
              >
                <Code className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Start Your Project</span>
              </button>
              <button className="w-full sm:w-auto border-2 border-purple-600 text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 min-w-0 sm:min-w-64">
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">View Our Portfolio</span>
                <span className="sm:hidden">Our Portfolio</span>
              </button>
            </div>

            {/* Technology Icons */}
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-500">
              <span className="text-xs sm:text-sm font-medium">Technologies we use:</span>
              <div className="flex space-x-6 sm:space-x-8 items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transform hover:scale-110 transition-transform cursor-pointer text-2xl">
                  ⚛️
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transform hover:scale-110 transition-transform cursor-pointer text-2xl">
                  🟢
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transform hover:scale-110 transition-transform cursor-pointer text-2xl">
                  🐍
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transform hover:scale-110 transition-transform cursor-pointer text-2xl">
                  ☁️
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Our Development Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              From beautiful frontends to robust backends, we deliver complete web solutions that scale with your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
                {/* Header */}
                <div className={`bg-gradient-to-r ${service.color} p-4 sm:p-6 ${service.platform === 'Full Stack' ? 'text-white' : 'text-gray-800'} relative overflow-hidden`}>
                  <div className={`absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 ${service.platform === 'Full Stack' ? 'bg-white' : 'bg-gray-300'} opacity-10 rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16`}></div>
                  <div className="relative z-10">
                    <div className="text-4xl sm:text-5xl mb-2">{service.icon}</div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{service.platform}</h3>
                    <div className="flex flex-col sm:flex-row sm:space-x-4 text-xs sm:text-sm opacity-90">
                      <span>{service.stats.projects || service.stats.clients} projects</span>
                      <span>{service.stats.satisfaction || service.stats.uptime || service.stats.retention}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">{service.description}</p>
                  
                  <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-700">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={onGetStarted}
                    className={`w-full bg-gradient-to-r ${service.color} text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform group-hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base`}
                  >
                    <span className="hidden sm:inline">Start {service.platform} Project</span>
                    <span className="sm:hidden">Get Started</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Why Choose DevCraft Agency?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              We're not just another development agency. We're your dedicated partner in building exceptional digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
                  <div className="flex justify-center mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-200">
                    <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Client Success Stories
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Real results from real clients who trusted us with their digital transformation.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-purple-200 rounded-full opacity-20 -translate-x-12 sm:-translate-x-16 -translate-y-12 sm:-translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-pink-200 rounded-full opacity-20 translate-x-16 sm:translate-x-20 translate-y-16 sm:translate-y-20"></div>
              
              <div className="relative z-10">
                <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-purple-400 mb-4 sm:mb-6 mx-auto" />
                
                <div className="text-center">
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-8 leading-relaxed font-medium px-2">
                    "{testimonials[activeTestimonial].content}"
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center mb-4 space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="text-3xl sm:text-4xl lg:text-5xl">
                      {testimonials[activeTestimonial].image}
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="font-bold text-gray-900 text-base sm:text-lg">
                        {testimonials[activeTestimonial].name}
                      </div>
                      <div className="text-purple-600 font-medium text-sm sm:text-base">
                        {testimonials[activeTestimonial].role}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        {testimonials[activeTestimonial].platform}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-100 text-green-800 px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold inline-block">
                    📈 {testimonials[activeTestimonial].stats}
                  </div>
                </div>

                {/* Testimonial Navigation */}
                <div className="flex justify-center space-x-2 mt-6 sm:mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                        index === activeTestimonial ? 'bg-purple-600' : 'bg-purple-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-lg sm:text-xl text-purple-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join hundreds of companies who've transformed their digital presence with our expert development team. Your vision starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto bg-white text-purple-600 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg hover:shadow-2xl transition-all duration-200 transform hover:scale-105"
            >
              💻 Start Your Project Today
            </button>
            <button className="w-full sm:w-auto border-2 border-white text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg hover:bg-white hover:text-purple-600 transition-all duration-200">
              💬 Schedule a Consultation
            </button>
          </div>
          <p className="text-purple-200 text-xs sm:text-sm mt-4 sm:mt-6 space-y-1 sm:space-y-0">
            <span className="block sm:inline">✅ Free consultation</span>
            <span className="hidden sm:inline"> • </span>
            <span className="block sm:inline">✅ No commitment required</span>
            <span className="hidden sm:inline"> • </span>
            <span className="block sm:inline">✅ Same-day response</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;