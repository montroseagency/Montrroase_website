'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role === 'admin') {
      router.push('/dashboard/admin/overview');
    } else {
      router.push('/dashboard/client/overview');
    }
  }, [user, router]);

  return null;
}
