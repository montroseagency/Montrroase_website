'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-2xl">M</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                Montrose
              </span>
              <p className="text-xs text-neutral-600 font-medium tracking-wide">
                Social Media Growth
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-primary-600 bg-primary-50'
                    : isScrolled
                    ? 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50'
                    : 'text-neutral-800 hover:text-primary-600 hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/auth/login"
              className="px-5 py-2.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              Log In
            </Link>
            <Link
              href="/auth/register"
              className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold rounded-lg shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-neutral-700 hover:bg-primary-50 transition-colors duration-200"
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
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200 shadow-lg animate-slide-down">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2 border-t border-neutral-200">
              <Link
                href="/auth/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-center text-base font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-200"
              >
                Log In
              </Link>
              <Link
                href="/auth/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-center text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}