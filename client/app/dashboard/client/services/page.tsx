'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import ServiceSelector from '@/components/ServiceSelector';
import { Loader2, AlertCircle } from 'lucide-react';

interface ServiceSetting {
  id: string;
  service_type: string;
  service_type_display: string;
  is_active: boolean;
  assigned_agent_name: string | null;
  assigned_agent_department: string | null;
}

interface ServicesData {
  active_services: string[];
  service_settings: ServiceSetting[];
}

export default function ClientServicesPage() {
  const router = useRouter();
  const [servicesData, setServicesData] = useState<ServicesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getMyServices();
      setServicesData(response as ServicesData);
    } catch (err: any) {
      console.error('Error fetching services:', err);
      setError(err.message || 'Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-red-800 font-semibold">Error Loading Services</h3>
              <p className="text-red-600 text-sm mt-1">{error}</p>
              <button
                onClick={fetchServices}
                className="mt-3 text-sm text-red-700 hover:text-red-800 underline"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to Your Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Select a service to get started or manage your active services
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ServiceSelector activeServices={servicesData?.active_services || []} />
      </div>

      {/* Active Service Details */}
      {servicesData && servicesData.service_settings.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Your Active Services
            </h2>
            <div className="space-y-4">
              {servicesData.service_settings
                .filter(setting => setting.is_active)
                .map((setting) => (
                  <div
                    key={setting.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {setting.service_type_display}
                      </h3>
                      {setting.assigned_agent_name && (
                        <p className="text-sm text-gray-600 mt-1">
                          Assigned Agent: {setting.assigned_agent_name}
                          {setting.assigned_agent_department && (
                            <span className="ml-2 text-gray-500">
                              ({setting.assigned_agent_department})
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        const serviceMap: Record<string, string> = {
                          marketing: '/dashboard/client/marketing',
                          website: '/dashboard/client/website',
                          courses: '/dashboard/client/courses'
                        };
                        router.push(serviceMap[setting.service_type] || '/dashboard/client');
                      }}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Open Dashboard
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Need Help?
          </h3>
          <p className="text-blue-700 text-sm mb-4">
            If you'd like to activate additional services or have questions about your current services,
            please contact our support team.
          </p>
          <button
            onClick={() => router.push('/dashboard/client/support')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
