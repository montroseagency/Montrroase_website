'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AgentSettingsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to profile settings by default
    router.push('/dashboard/agent/settings/profile');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>
  );
}
