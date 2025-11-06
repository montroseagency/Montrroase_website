$pages = @(
    @{ path = "app/dashboard/admin/tasks/page.tsx"; title = "Task Management"; desc = "Manage and assign tasks to team members and clients." },
    @{ path = "app/dashboard/admin/invoices/page.tsx"; title = "Invoice Management"; desc = "View, create, and manage all client invoices and billing." },
    @{ path = "app/dashboard/admin/analytics/page.tsx"; title = "Analytics & Reports"; desc = "View detailed analytics and generate custom reports." },
    @{ path = "app/dashboard/admin/messages/page.tsx"; title = "Messaging"; desc = "Communicate with clients through the messaging system." },
    @{ path = "app/dashboard/admin/settings/page.tsx"; title = "Admin Settings"; desc = "Manage your admin account and system settings." },
    @{ path = "app/dashboard/client/content/page.tsx"; title = "My Content"; desc = "Submit and manage your social media content." },
    @{ path = "app/dashboard/client/content/create/page.tsx"; title = "Create Content"; desc = "Create new social media content for approval." },
    @{ path = "app/dashboard/client/tasks/page.tsx"; title = "My Tasks"; desc = "View and manage tasks assigned to you." },
    @{ path = "app/dashboard/client/analytics/page.tsx"; title = "Performance Analytics"; desc = "View your social media performance metrics." },
    @{ path = "app/dashboard/client/billing/page.tsx"; title = "Billing & Subscription"; desc = "Manage your subscription and view invoices." },
    @{ path = "app/dashboard/client/messages/page.tsx"; title = "Messages"; desc = "Communicate with your account manager." },
    @{ path = "app/dashboard/client/social-accounts/page.tsx"; title = "Social Accounts"; desc = "Manage your connected social media accounts." },
    @{ path = "app/dashboard/client/settings/page.tsx"; title = "Account Settings"; desc = "Manage your account settings and preferences." }
)

foreach ($page in $pages) {
    $fullPath = "C:\Users\User\Documents\GitHub\Montrroase_website\client\$($page.path)"
    $dir = Split-Path -Parent $fullPath
    
    # Create directory if it doesn't exist
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    
    # Create the page file
    $content = @"
'use client';

import { PlaceholderPage } from '@/components/dashboard/PlaceholderPage';

export default function Page() {
  return (
    <PlaceholderPage
      title="$($page.title)"
      description="$($page.desc) This feature is coming soon."
      backLink="/dashboard"
      backLinkText="Back to Dashboard"
    />
  );
}
"@
    
    Set-Content -Path $fullPath -Value $content -Encoding UTF8
    Write-Host "Created: $($page.path)"
}

Write-Host "All placeholder pages created successfully!"
