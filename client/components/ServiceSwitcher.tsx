'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown, Smartphone, Globe, GraduationCap, Check } from 'lucide-react';

interface Service {
  id: 'marketing' | 'website' | 'courses';
  name: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

const services: Service[] = [
  {
    id: 'marketing',
    name: 'Marketing',
    icon: <Smartphone className="w-5 h-5" />,
    path: '/dashboard/client/marketing',
    color: 'text-purple-600'
  },
  {
    id: 'website',
    name: 'Website',
    icon: <Globe className="w-5 h-5" />,
    path: '/dashboard/client/website',
    color: 'text-blue-600'
  },
  {
    id: 'courses',
    name: 'Courses',
    icon: <GraduationCap className="w-5 h-5" />,
    path: '/dashboard/client/courses',
    color: 'text-green-600'
  }
];

interface ServiceSwitcherProps {
  activeServices?: string[];
  className?: string;
}

export default function ServiceSwitcher({ activeServices = [], className = '' }: ServiceSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determine current service based on pathname
  const getCurrentService = () => {
    if (pathname?.includes('/marketing')) return services.find(s => s.id === 'marketing');
    if (pathname?.includes('/website')) return services.find(s => s.id === 'website');
    if (pathname?.includes('/courses')) return services.find(s => s.id === 'courses');
    return null;
  };

  const currentService = getCurrentService();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleServiceSwitch = (service: Service) => {
    router.push(service.path);
    setIsOpen(false);
  };

  // Filter services to only show active ones
  const availableServices = services.filter(s => activeServices.length === 0 || activeServices.includes(s.id));

  // Don't show if no active services or only one service
  if (availableServices.length <= 1) {
    return null;
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        {currentService ? (
          <>
            <span className={currentService.color}>{currentService.icon}</span>
            <span className="font-medium text-gray-900">{currentService.name}</span>
          </>
        ) : (
          <>
            <span className="font-medium text-gray-900">Services</span>
          </>
        )}
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-2">
            <div className="text-xs font-semibold text-gray-500 uppercase px-3 py-2">
              Switch Service
            </div>
            <div className="space-y-1">
              {availableServices.map((service) => {
                const isCurrent = currentService?.id === service.id;
                const isActive = activeServices.includes(service.id);

                return (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSwitch(service)}
                    disabled={!isActive}
                    className={`
                      w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg
                      transition-colors
                      ${isCurrent
                        ? 'bg-purple-50 text-purple-600 font-medium'
                        : isActive
                        ? 'hover:bg-gray-50 text-gray-900'
                        : 'text-gray-400 cursor-not-allowed'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className={isCurrent ? 'text-purple-600' : service.color}>
                        {service.icon}
                      </span>
                      <span>{service.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {!isActive && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          Inactive
                        </span>
                      )}
                      {isCurrent && (
                        <Check className="w-4 h-4 text-purple-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* View All Services Link */}
          <div className="border-t border-gray-200 p-2">
            <button
              onClick={() => {
                router.push('/dashboard/client/services');
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              View All Services
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
