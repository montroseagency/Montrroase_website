'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Globe,
  Layout,
  Server,
  Search,
  BarChart3,
  Settings,
  ArrowRight,
  Loader2,
  PlusCircle
} from 'lucide-react';

interface QuickStat {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

export default function WebsiteOverviewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 500);
  }, []);

  const quickStats: QuickStat[] = [
    {
      label: 'Active Projects',
      value: '0',
      icon: <Layout className="w-5 h-5" />,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      label: 'Domains',
      value: '0',
      icon: <Globe className="w-5 h-5" />,
      color: 'text-green-600 bg-green-50'
    },
    {
      label: 'Hosted Sites',
      value: '0',
      icon: <Server className="w-5 h-5" />,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      label: 'SEO Score',
      value: '0',
      icon: <Search className="w-5 h-5" />,
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  const websiteFeatures = [
    {
      title: 'Website Projects',
      description: 'Manage all your website development projects',
      icon: <Layout className="w-6 h-6" />,
      path: '/dashboard/client/website-builder',
      color: 'text-blue-600 bg-blue-50 border-blue-200'
    },
    {
      title: 'Domain Management',
      description: 'Register and manage your domain names',
      icon: <Globe className="w-6 h-6" />,
      path: '/dashboard/client/website/domains',
      color: 'text-green-600 bg-green-50 border-green-200'
    },
    {
      title: 'Hosting & Deployment',
      description: 'View hosting status and deployment information',
      icon: <Server className="w-6 h-6" />,
      path: '/dashboard/client/website/hosting',
      color: 'text-purple-600 bg-purple-50 border-purple-200'
    },
    {
      title: 'SEO Dashboard',
      description: 'Track your website SEO performance and rankings',
      icon: <Search className="w-6 h-6" />,
      path: '/dashboard/client/website/seo',
      color: 'text-orange-600 bg-orange-50 border-orange-200'
    },
    {
      title: 'Analytics',
      description: 'View website traffic and user behavior analytics',
      icon: <BarChart3 className="w-6 h-6" />,
      path: '/dashboard/client/website/analytics',
      color: 'text-cyan-600 bg-cyan-50 border-cyan-200'
    },
    {
      title: 'Settings',
      description: 'Configure your website settings and preferences',
      icon: <Settings className="w-6 h-6" />,
      path: '/dashboard/client/website/settings',
      color: 'text-gray-600 bg-gray-50 border-gray-200'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Website Builder</h1>
              </div>
              <p className="text-blue-100">
                Create and manage your professional websites
              </p>
            </div>
            <Link
              href="/dashboard/client/website-builder/new"
              className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              <PlusCircle className="w-5 h-5" />
              New Project
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Website Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Website Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websiteFeatures.map((feature, index) => (
            <Link key={index} href={feature.path}>
              <div className={`bg-white border-2 ${feature.color} rounded-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105`}>
                <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                <div className="flex items-center text-blue-600 font-medium">
                  <span>Open</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Getting Started Guide */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Website Development Process</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Answer Questionnaire</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Complete our AI-powered questionnaire to help us understand your website needs and goals.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Choose Template & Domain</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Select from our professional templates and register your domain name.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Development & Launch</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Our team will build your website and deploy it to your hosting environment.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">SEO & Analytics</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Monitor your website performance, track SEO rankings, and optimize for growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
