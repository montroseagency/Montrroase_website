'use client';

import { PlaceholderPage } from '@/components/dashboard/PlaceholderPage';

export default function Page() {
  return (
    <PlaceholderPage
      title="My Tasks"
      description="View and manage tasks assigned to you. This feature is coming soon."
      backLink="/dashboard"
      backLinkText="Back to Dashboard"
    />
  );
}
