// client/components/marketing/navigation.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Services', href: '/services' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  const isActive = (href: string) => {
    if (href.startsWith('#')) return false;
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="px-6 py-6 mx-auto relative z-10 max-w-7xl">
      <div className="items-center justify-between flex">
        {/* Logo */}
        <Link href="/" className="items-center flex space-x-2">
          <div className="w-10 h-10 bg-sky-600 dark:bg-sky-500 rounded-lg items-center justify-center flex">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">Montrose</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="md:flex items-center hidden space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`transition-colors ${
                isActive(item.href)
                  ? 'text-sky-600 dark:text-sky-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="items-center flex space-x-4">
          <Link
            href="/auth/login"
            className="hidden dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors md:block px-6 py-2.5 text-gray-700 font-medium"
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="hover:bg-sky-700 dark:hover:bg-sky-600 transition-all px-6 py-2.5 bg-sky-600 dark:bg-sky-500 text-white rounded-lg shadow-lg shadow-sky-500/30"
          >
            Get Started
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
        <div className="md:hidden mt-6 space-y-4 pb-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/20'
                  : 'text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/auth/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors font-medium"
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}