// components/Navbar.tsx - Web Development Agency Version
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Code, ChevronDown } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const services = [
    { name: 'Web Development', href: '/services/web-development', description: 'Custom websites and web applications' },
    { name: 'SEO Services', href: '/services/seo', description: 'Search engine optimization and ranking' },
    { name: 'Web Applications', href: '/services/web-applications', description: 'Complex web apps and SaaS platforms' },
    { name: 'Domain & Hosting', href: '/services/domain-hosting', description: 'Domain registration and web hosting' },
    { name: 'Platform Development', href: '/services/platform', description: 'Custom platforms and marketplaces' },
    { name: 'E-commerce Solutions', href: '/services/ecommerce', description: 'Online shopping websites and stores' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">DevCraft</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              <div
                className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border transition-all duration-200 ${
                  isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                }`}
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <div className="py-2">
                  {services.map((service) => (
                    <Link
                      key={service.name}
                      to={service.href}
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-sm font-medium text-gray-900">{service.name}</div>
                      <div className="text-xs text-gray-500">{service.description}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
              How It Works
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-blue-600 transition-colors">
              Cart
            </Link>
            <Link
              to="/auth"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
          <Link
            to="/"
            className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          
          {/* Mobile Services */}
          <div className="px-3 py-2">
            <div className="text-gray-600 font-medium mb-2">Services</div>
            <div className="pl-4 space-y-1">
              {services.map((service) => (
                <Link
                  key={service.name}
                  to={service.href}
                  className="block py-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/how-it-works"
            className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            How It Works
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/cart"
            className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Cart
          </Link>
          <Link
            to="/auth"
            className="block mx-3 mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
            onClick={() => setIsOpen(false)}
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};