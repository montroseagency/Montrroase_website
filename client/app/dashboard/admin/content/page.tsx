'use client';

import { PlaceholderPage } from '@/components/dashboard/PlaceholderPage';

export default function AdminContentPage() {
  return (
    <PlaceholderPage
      title="Content Management"
      description="Manage and approve all client content submissions. This section will allow you to review, approve, reject, and track social media content."
      backLink="/dashboard/admin/overview"
      backLinkText="Back to Dashboard"
    />
  );
}
