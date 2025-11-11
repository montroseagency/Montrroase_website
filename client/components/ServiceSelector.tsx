'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Smartphone,
  Globe,
  GraduationCap,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface Service {
  id: 'marketing' | 'website' | 'courses';
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  path: string;
}

interface ServiceSelectorProps {
  activeServices?: string[];
  onServiceSelect?: (serviceId: string) => void;
}

const services: Service[] = [
  {
    id: 'marketing',
    name: 'Marketing Services',
    description: 'Manage your social media presence, content, and campaigns across all platforms',
    icon: <Smartphone className="w-8 h-8" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200 hover:border-purple-400',
    path: '/dashboard/client/marketing'
  },
  {
    id: 'website',
    name: 'Website Builder',
    description: 'Create, manage, and optimize your website with our professional development team',
    icon: <Globe className="w-8 h-8" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200 hover:border-blue-400',
    path: '/dashboard/client/website'
  },
  {
    id: 'courses',
    name: 'Learning Center',
    description: 'Access premium courses and educational content to grow your skills',
    icon: <GraduationCap className="w-8 h-8" />,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200 hover:border-green-400',
    path: '/dashboard/client/courses'
  }
];

export default function ServiceSelector({ activeServices = [], onServiceSelect }: ServiceSelectorProps) {
  const router = useRouter();

  const handleServiceClick = (service: Service) => {
    if (onServiceSelect) {
      onServiceSelect(service.id);
    } else {
      router.push(service.path);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => {
        const isActive = activeServices.includes(service.id);

        return (
          <div
            key={service.id}
            onClick={() => handleServiceClick(service)}
            className={`
              relative p-6 rounded-lg border-2 cursor-pointer
              transition-all duration-200 transform hover:scale-105
              ${service.borderColor}
              ${isActive ? 'shadow-lg' : 'shadow-md hover:shadow-xl'}
            `}
          >
            {/* Active Badge */}
            {isActive && (
              <div className="absolute top-4 right-4">
                <CheckCircle2 className={`w-6 h-6 ${service.color}`} />
              </div>
            )}

            {/* Icon */}
            <div className={`${service.bgColor} ${service.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}>
              {service.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {service.name}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4">
              {service.description}
            </p>

            {/* Action Button */}
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${service.color}`}>
                {isActive ? 'Active' : 'View Details'}
              </span>
              <ArrowRight className={`w-5 h-5 ${service.color}`} />
            </div>

            {/* Status Indicator */}
            {!isActive && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Contact support to activate this service
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
