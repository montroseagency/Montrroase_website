import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general',
    projectType: 'website',
    budget: 'under-5k'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactMethods = [
    {
      title: "Project Consultation",
      description: "Discuss your web development project, requirements, and get a custom quote",
      email: "projects@devcraft.com",
      responseTime: "Within 4 hours",
      color: "from-blue-500 to-blue-600",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>
      )
    },
    {
      title: "Technical Support",
      description: "Get help with existing projects, bug fixes, maintenance, or technical issues",
      email: "support@devcraft.com",
      responseTime: "Within 2 hours",
      color: "from-blue-600 to-blue-700",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      )
    },
    {
      title: "Partnership & Collaboration",
      description: "Explore partnerships, white-label services, or collaboration opportunities",
      email: "partners@devcraft.com",
      responseTime: "Within 24 hours",
      color: "from-blue-700 to-blue-800",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      )
    },
    {
      title: "Enterprise Solutions",
      description: "Large-scale web applications, custom software development, and enterprise consulting",
      email: "enterprise@devcraft.com",
      responseTime: "Within 12 hours",
      color: "from-blue-800 to-blue-900",
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
      )
    }
  ];

  const offices = [
    {
      city: "San Francisco",
      address: "123 Tech Street, Suite 400",
      zipcode: "San Francisco, CA 94105",
      phone: "+1 (555) 123-4567",
      flag: "🇺🇸"
    },
    {
      city: "London",
      address: "45 Innovation Lane",
      zipcode: "London, EC1A 1BB, UK",
      phone: "+44 20 7123 4567",
      flag: "🇬🇧"
    },
    {
      city: "Toronto",
      address: "88 Development Drive",
      zipcode: "Toronto, ON M5V 3A8",
      phone: "+1 (416) 123-4567",
      flag: "🇨🇦"
    }
  ];

  const faqs = [
    {
      question: "How quickly do you respond to project inquiries?",
      answer: "We respond to all project inquiries within 4 hours during business days. For urgent technical support, we offer 2-hour response times."
    },
    {
      question: "Do you offer free consultations?",
      answer: "Yes! We provide free 30-minute consultations to discuss your project requirements, timeline, and budget. No commitment required."
    },
    {
      question: "What is your development process?",
      answer: "We follow an agile development process with regular updates, milestone reviews, and client feedback integration throughout the project lifecycle."
    },
    {
      question: "Do you provide ongoing maintenance and support?",
      answer: "Absolutely! We offer comprehensive maintenance packages including security updates, performance monitoring, content updates, and technical support."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-200 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
            Available 24/7 for Support
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Let's Build Something
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Amazing Together
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed font-light px-2 mb-8">
            Ready to transform your digital presence? Get in touch with our expert development team for consultations, custom quotes, and technical solutions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">200+</div>
              <div className="text-blue-200 text-sm">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">99.9%</div>
              <div className="text-blue-200 text-sm">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-blue-200 text-sm">Expert Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8 sm:mb-12">Choose Your Contact Method</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${method.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4 shadow-lg`}>
                  {method.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">{method.title}</h3>
                <p className="text-blue-100 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">{method.description}</p>
                <div className="space-y-1 sm:space-y-2">
                  <a href={`mailto:${method.email}`} className="text-blue-300 hover:text-blue-200 font-medium text-xs sm:text-sm block break-all transition-colors">
                    {method.email}
                  </a>
                  <div className="text-cyan-300 text-xs font-medium flex items-center">
                    <span className="w-2 h-2 bg-cyan-300 rounded-full mr-2 animate-pulse"></span>
                    {method.responseTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Start Your Project</h2>
            <p className="text-blue-100 mb-6 sm:mb-8 text-sm sm:text-base">Tell us about your project and we'll get back to you with a custom proposal.</p>
            
            {isSubmitted && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-500/20 border border-green-400/30 rounded-lg backdrop-blur-sm">
                <div className="flex items-center text-green-200">
                  <span className="mr-2">✅</span>
                  <span className="font-medium text-xs sm:text-sm">Message sent successfully! We'll respond within 4 hours.</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-white font-medium mb-1 sm:mb-2 text-sm sm:text-base">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-sm sm:text-base text-white placeholder-blue-200 backdrop-blur-sm"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-1 sm:mb-2 text-sm sm:text-base">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-sm sm:text-base text-white placeholder-blue-200 backdrop-blur-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-white font-medium mb-1 sm:mb-2 text-sm sm:text-base">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-sm sm:text-base text-white placeholder-blue-200 backdrop-blur-sm"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-1 sm:mb-2 text-sm sm:text-base">Inquiry Type</label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-sm sm:text-base text-white backdrop-blur-sm"
                  >
                    <option value="general" className="bg-slate-800 text-white">General Inquiry</option>
                    <option value="project" className="bg-slate-800 text-white">New Project</option>
                    <option value="support" className="bg-slate-800 text-white">Technical Support</option>
                    <option value="partnership" className="bg-slate-800 text-white">Partnership</option>
                    <option value="enterprise" className="bg-slate-800 text-white">Enterprise Solutions</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-white font-medium mb-1 sm:mb-2 text-sm sm:text-base">Project Type</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-sm sm:text-base text-white backdrop-blur-sm"
                  >
                    <option value="website" className="bg-slate-800 text-white">Business Website</option>
                    <option value="ecommerce" className="bg-slate-800 text-white">E-commerce Platform</option>
                    <option value="webapp" className="bg-slate-800 text-white">Web Application</option>
                    <option value="mobile" className="bg-slate-800 text-white">Mobile App</option>
                    <option value="custom" className="bg-slate-800 text-white">Custom Software</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-medium mb-1 sm:mb-2 text-sm sm:text-base">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-sm sm:text-base text-white backdrop-blur-sm"
                  >
                    <option value="under-5k" className="bg-slate-800 text-white">Under $5,000</option>
                    <option value="5k-15k" className="bg-slate-800 text-white">$5,000 - $15,000</option>
                    <option value="15k-50k" className="bg-slate-800 text-white">$15,000 - $50,000</option>
                    <option value="50k-plus" className="bg-slate-800 text-white">$50,000+</option>
                    <option value="discuss" className="bg-slate-800 text-white">Let's Discuss</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-1 sm:mb-2 text-sm sm:text-base">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-sm sm:text-base text-white placeholder-blue-200 backdrop-blur-sm"
                  placeholder="Brief subject of your project"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-1 sm:mb-2 text-sm sm:text-base">Project Details *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 resize-none text-sm sm:text-base text-white placeholder-blue-200 backdrop-blur-sm"
                  placeholder="Please describe your project requirements, timeline, and any specific features you need..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105 shadow-lg text-sm sm:text-base"
              >
                Send Project Inquiry
              </button>
            </form>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6 sm:space-y-8">
            {/* Office Locations */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Our Development Centers</h3>
              <div className="space-y-4 sm:space-y-6">
                {offices.map((office, index) => (
                  <div key={index} className="border-b border-white/20 last:border-b-0 pb-3 sm:pb-4 last:pb-0">
                    <div className="flex items-center mb-1 sm:mb-2">
                      <span className="text-xl sm:text-2xl mr-2 sm:mr-3">{office.flag}</span>
                      <h4 className="text-base sm:text-lg font-semibold text-white">{office.city}</h4>
                    </div>
                    <p className="text-blue-100 text-xs sm:text-sm mb-1">{office.address}</p>
                    <p className="text-blue-100 text-xs sm:text-sm mb-1 sm:mb-2">{office.zipcode}</p>
                    <p className="text-cyan-300 font-medium text-xs sm:text-sm">{office.phone}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Times */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white border border-blue-500/30 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Response Promise</h3>
              <div className="space-y-2 sm:space-y-4">
                <div className="flex items-center text-sm sm:text-base">
                  <span className="mr-2 sm:mr-3">🚀</span>
                  <span>Project inquiries: 4 hours</span>
                </div>
                <div className="flex items-center text-sm sm:text-base">
                  <span className="mr-2 sm:mr-3">🛠️</span>
                  <span>Technical support: 2 hours</span>
                </div>
                <div className="flex items-center text-sm sm:text-base">
                  <span className="mr-2 sm:mr-3">🔧</span>
                  <span>Emergency fixes: 30 minutes</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-500/20 border border-red-400/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
              <h3 className="text-lg sm:text-xl font-bold text-red-200 mb-3 sm:mb-4">🚨 Emergency Support</h3>
              <p className="text-red-100 mb-3 sm:mb-4 text-sm sm:text-base">For critical website issues or security emergencies:</p>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-red-200 font-semibold text-sm sm:text-base">Emergency Hotline:</p>
                <p className="text-red-100 text-sm sm:text-base">+1 (555) 911-CODE</p>
                <p className="text-red-300 text-xs sm:text-sm">Available 24/7 for clients with support contracts</p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 text-center">Why Choose DevCraft?</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl mb-2">🔒</div>
                  <div className="text-white font-medium text-sm">Secure</div>
                  <div className="text-blue-200 text-xs">SSL & Encrypted</div>
                </div>
                <div>
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-white font-medium text-sm">Fast</div>
                  <div className="text-blue-200 text-xs">Quick Delivery</div>
                </div>
                <div>
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="text-white font-medium text-sm">Quality</div>
                  <div className="text-blue-200 text-xs">Premium Code</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8 sm:mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4 sm:space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 sm:p-6 hover:bg-white/15 transition-all duration-300">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">{faq.question}</h3>
                <p className="text-blue-100 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 sm:p-12 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
              Ready to Start Building?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join hundreds of companies who've transformed their digital presence with our expert development team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105 shadow-lg text-sm sm:text-base">
                💻 Start Your Project Today
              </button>
              <button className="border-2 border-blue-400 text-blue-200 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg hover:bg-blue-400 hover:text-white transition-all duration-200 text-sm sm:text-base">
                📅 Schedule Consultation
              </button>
            </div>
            <div className="mt-6 sm:mt-8 text-center">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-200">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  <span>Free consultation</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  <span>No commitment required</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                  <span>Same-day response</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;