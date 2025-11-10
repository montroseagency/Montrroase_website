'use client';

import Link from 'next/link';
import { User, DollarSign, ArrowRight } from 'lucide-react';

export default function SettingsPage() {
  const sections = [
    {
      title: 'Profile Settings',
      description: 'Manage your account information, password, and notification preferences',
      icon: <User className="w-8 h-8" />,
      href: '/dashboard/client/settings/profile',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Billing & Wallet',
      description: 'View your subscription, manage payments, and check your wallet balance',
      icon: <DollarSign className="w-8 h-8" />,
      href: '/dashboard/client/settings/billing',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account preferences and billing</p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="group block"
          >
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-purple-200 p-8">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-4 bg-gradient-to-br ${section.color} rounded-lg text-white`}>
                  {section.icon}
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{section.title}</h3>
              <p className="text-gray-600 text-sm">{section.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
