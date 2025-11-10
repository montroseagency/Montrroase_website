// client/components/marketing/navigation.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Courses', href: '/courses' },
    { name: 'Pricing', href: '/pricing' },
  ];

  const servicesDropdown = [
    { name: 'Digital Marketing', href: '/services/marketing', icon: '📈' },
    { name: 'Website Development', href: '/services/website', icon: '💻' },
    { name: 'Hosting & Infrastructure', href: '/services/hosting', icon: '☁️' },
    { name: 'SEO & Optimization', href: '/services/seo', icon: '🔍' },
  ];

  const isActive = (href: string) => {
    if (href.startsWith('#')) return false;
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
          <div className="px-5 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center group">
                <img
                  src="/logo.png"
                  alt="Montrose Logo"
                  className="h-10 w-auto transform group-hover:scale-105 transition-all duration-200"
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                {/* Services Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <Link
                    href="/services"
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      isActive('/services')
                        ? 'text-white bg-white/15 border border-white/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    Services
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>

                  {/* Dropdown Menu */}
                  {isServicesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg overflow-hidden">
                      {servicesDropdown.map((service, index) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                            index !== servicesDropdown.length - 1 ? 'border-b border-white/10' : ''
                          } ${
                            isActive(service.href)
                              ? 'text-white bg-white/20'
                              : 'text-gray-300 hover:text-white hover:bg-white/15'
                          }`}
                        >
                          <span className="text-lg">{service.icon}</span>
                          <span>{service.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Other Navigation Links */}
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? 'text-white bg-white/15 border border-white/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="hidden lg:flex items-center space-x-3">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-semibold text-white hover:text-gray-200 transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="px-5 py-2 text-sm font-semibold text-black bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  Get Started
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="lg:hidden mt-6 pt-6 border-t border-white/10 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="space-y-2">
                  {/* Services Section */}
                  <div>
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className={`flex items-center justify-between w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                        isActive('/services')
                          ? 'text-white bg-white/20 border border-white/30'
                          : 'text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20'
                      }`}
                    >
                      <span>Services</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Services Submenu */}
                    {isServicesOpen && (
                      <div className="ml-4 mt-2 space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
                        {servicesDropdown.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsServicesOpen(false);
                            }}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                              isActive(service.href)
                                ? 'text-white bg-white/15'
                                : 'text-gray-400 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            <span>{service.icon}</span>
                            <span>{service.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Other Navigation Links */}
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                        isActive(item.href)
                          ? 'text-white bg-white/20 border border-white/30'
                          : 'text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}

                  {/* CTA Buttons */}
                  <div className="pt-4 space-y-2">
                    <Link
                      href="/auth/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 text-sm font-bold text-black bg-white rounded-xl hover:bg-gray-100 transition-all duration-300 text-center shadow-lg"
                    >
                      Get Started
                    </Link>
                    <Link
                      href="/auth/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 text-sm font-semibold text-white bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 text-center border border-white/20 hover:border-white/30"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}