'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ApiService from '@/lib/api';

export default function AgentDashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const redirectToDepartmentDashboard = async () => {
      try {
        // Get user info with agent_profile
        const user = await ApiService.getMe() as any;

        if (user.agent_profile) {
          const department = user.agent_profile.department;

          // Redirect based on department
          if (department === 'marketing') {
            router.replace('/dashboard/agent/marketing');
          } else if (department === 'website') {
            router.replace('/dashboard/agent/developer');
          } else {
            // Fallback - unknown department
            console.error('Unknown agent department:', department);
            router.replace('/dashboard/agent/marketing'); // Default fallback
          }
        } else {
          // No agent profile found
          console.error('No agent profile found');
          router.replace('/dashboard');
        }
      } catch (error) {
        console.error('Error fetching agent profile:', error);
        router.replace('/dashboard');
      }
    };

    redirectToDepartmentDashboard();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
