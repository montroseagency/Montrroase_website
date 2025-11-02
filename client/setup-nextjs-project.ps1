# Next.js Project Structure Generator for Windows
# This script creates the complete folder and file structure for a Next.js project
# Usage: .\setup-nextjs-project-fixed.ps1

$ErrorActionPreference = "Continue"

# Colors for output
$Green = 'Green'
$Blue = 'Cyan'

Write-Host "Starting Next.js Project Structure Setup..." -ForegroundColor $Blue
Write-Host ""

# Function to create directory if it doesn't exist
function New-DirectoryIfNotExists {
    param([string]$Path)
    if (-not (Test-Path $Path)) {
        New-Item -ItemType Directory -Force -Path $Path | Out-Null
    }
}

# Function to create file if it doesn't exist
function New-FileIfNotExists {
    param([string]$Path)
    $dir = Split-Path -Parent $Path
    New-DirectoryIfNotExists $dir
    if (-not (Test-Path $Path)) {
        New-Item -ItemType File -Force -Path $Path | Out-Null
    }
}

Write-Host "Creating directories..." -ForegroundColor $Blue

# Create main app directories using escaped paths
$directories = @(
    "app\auth\login",
    "app\auth\register",
    "app\auth\verify-email",
    "app\auth\forgot-password",
    "app\auth\reset-password",
    "app\marketing",
    "app\marketing\about",
    "app\marketing\services",
    "app\marketing\portfolio",
    "app\marketing\pricing",
    "app\marketing\blog\[slug]",
    "app\marketing\contact",
    "app\marketing\faq",
    "app\marketing\terms-and-conditions",
    "app\dashboard",
    "app\dashboard\client\overview",
    "app\dashboard\client\content\[id]",
    "app\dashboard\client\content\create",
    "app\dashboard\client\calendar",
    "app\dashboard\client\analytics\[metric]",
    "app\dashboard\client\social-accounts\connect\instagram",
    "app\dashboard\client\social-accounts\connect\youtube",
    "app\dashboard\client\social-accounts\[id]",
    "app\dashboard\client\tasks\[id]",
    "app\dashboard\client\messages\[conversationId]",
    "app\dashboard\client\billing\plans",
    "app\dashboard\client\billing\invoices\[id]",
    "app\dashboard\client\billing\payment\success",
    "app\dashboard\client\billing\payment\cancel",
    "app\dashboard\client\settings\profile",
    "app\dashboard\client\settings\account",
    "app\dashboard\admin\overview",
    "app\dashboard\admin\clients\[id]\edit",
    "app\dashboard\admin\clients\create",
    "app\dashboard\admin\content\[id]\approve",
    "app\dashboard\admin\content\review",
    "app\dashboard\admin\tasks\[id]",
    "app\dashboard\admin\tasks\create",
    "app\dashboard\admin\team\[id]",
    "app\dashboard\admin\team\create",
    "app\dashboard\admin\messages\[conversationId]",
    "app\dashboard\admin\billing\invoices\[id]",
    "app\dashboard\admin\billing\payments",
    "app\dashboard\admin\billing\verification",
    "app\dashboard\admin\billing\settings",
    "app\dashboard\admin\analytics\revenue",
    "app\dashboard\admin\analytics\reports",
    "app\dashboard\admin\settings\users",
    "app\dashboard\admin\settings\system",
    "app\dashboard\admin\settings\integrations",
    "app\account\profile",
    "app\account\settings",
    "app\account\notifications",
    "app\api\auth\register",
    "app\api\auth\login",
    "app\api\auth\logout",
    "app\api\proxy\[...path]",
    "app\api\webhooks\paypal",
    "components\marketing",
    "components\dashboard\client",
    "components\dashboard\admin",
    "components\dashboard\content",
    "components\dashboard\social",
    "components\dashboard\messaging",
    "components\dashboard\billing",
    "components\dashboard\dialogs",
    "components\ui",
    "components\common",
    "lib\hooks",
    "hooks",
    "store",
    "styles",
    "public\images\services",
    "public\images\portfolio",
    "public\images\testimonials",
    "public\icons\social-media",
    "public\fonts"
)

foreach ($dir in $directories) {
    New-DirectoryIfNotExists $dir
}

Write-Host "Directories created" -ForegroundColor $Green
Write-Host ""

Write-Host "Creating page.tsx files..." -ForegroundColor $Blue

# Auth pages
@(
    "app\auth\login\page.tsx",
    "app\auth\register\page.tsx",
    "app\auth\verify-email\page.tsx",
    "app\auth\forgot-password\page.tsx",
    "app\auth\reset-password\page.tsx"
) | ForEach-Object { New-FileIfNotExists $_ }

# Marketing pages
@(
    "app\marketing\page.tsx",
    "app\marketing\about\page.tsx",
    "app\marketing\services\page.tsx",
    "app\marketing\portfolio\page.tsx",
    "app\marketing\pricing\page.tsx",
    "app\marketing\blog\page.tsx",
    "app\marketing\blog\[slug]\page.tsx",
    "app\marketing\contact\page.tsx",
    "app\marketing\faq\page.tsx",
    "app\marketing\terms-and-conditions\page.tsx"
) | ForEach-Object { New-FileIfNotExists $_ }

# Dashboard pages
@(
    "app\dashboard\page.tsx",
    "app\dashboard\layout.tsx"
) | ForEach-Object { New-FileIfNotExists $_ }

# Client dashboard pages
@(
    "app\dashboard\client\overview\page.tsx",
    "app\dashboard\client\content\page.tsx",
    "app\dashboard\client\content\[id]\page.tsx",
    "app\dashboard\client\content\create\page.tsx",
    "app\dashboard\client\calendar\page.tsx",
    "app\dashboard\client\analytics\page.tsx",
    "app\dashboard\client\analytics\[metric]\page.tsx",
    "app\dashboard\client\social-accounts\page.tsx",
    "app\dashboard\client\social-accounts\connect\instagram\page.tsx",
    "app\dashboard\client\social-accounts\connect\youtube\page.tsx",
    "app\dashboard\client\social-accounts\[id]\page.tsx",
    "app\dashboard\client\tasks\page.tsx",
    "app\dashboard\client\tasks\[id]\page.tsx",
    "app\dashboard\client\messages\page.tsx",
    "app\dashboard\client\messages\[conversationId]\page.tsx",
    "app\dashboard\client\billing\page.tsx",
    "app\dashboard\client\billing\plans\page.tsx",
    "app\dashboard\client\billing\invoices\page.tsx",
    "app\dashboard\client\billing\invoices\[id]\page.tsx",
    "app\dashboard\client\billing\payment\success\page.tsx",
    "app\dashboard\client\billing\payment\cancel\page.tsx",
    "app\dashboard\client\settings\page.tsx",
    "app\dashboard\client\settings\profile\page.tsx",
    "app\dashboard\client\settings\account\page.tsx"
) | ForEach-Object { New-FileIfNotExists $_ }

# Admin dashboard pages
@(
    "app\dashboard\admin\overview\page.tsx",
    "app\dashboard\admin\clients\page.tsx",
    "app\dashboard\admin\clients\[id]\page.tsx",
    "app\dashboard\admin\clients\[id]\edit\page.tsx",
    "app\dashboard\admin\clients\create\page.tsx",
    "app\dashboard\admin\content\page.tsx",
    "app\dashboard\admin\content\[id]\page.tsx",
    "app\dashboard\admin\content\[id]\approve\page.tsx",
    "app\dashboard\admin\content\review\page.tsx",
    "app\dashboard\admin\tasks\page.tsx",
    "app\dashboard\admin\tasks\[id]\page.tsx",
    "app\dashboard\admin\tasks\create\page.tsx",
    "app\dashboard\admin\team\page.tsx",
    "app\dashboard\admin\team\[id]\page.tsx",
    "app\dashboard\admin\team\create\page.tsx",
    "app\dashboard\admin\messages\page.tsx",
    "app\dashboard\admin\messages\[conversationId]\page.tsx",
    "app\dashboard\admin\billing\page.tsx",
    "app\dashboard\admin\billing\invoices\page.tsx",
    "app\dashboard\admin\billing\invoices\[id]\page.tsx",
    "app\dashboard\admin\billing\payments\page.tsx",
    "app\dashboard\admin\billing\verification\page.tsx",
    "app\dashboard\admin\billing\settings\page.tsx",
    "app\dashboard\admin\analytics\page.tsx",
    "app\dashboard\admin\analytics\revenue\page.tsx",
    "app\dashboard\admin\analytics\reports\page.tsx",
    "app\dashboard\admin\settings\page.tsx",
    "app\dashboard\admin\settings\users\page.tsx",
    "app\dashboard\admin\settings\system\page.tsx",
    "app\dashboard\admin\settings\integrations\page.tsx"
) | ForEach-Object { New-FileIfNotExists $_ }

# Account pages
@(
    "app\account\page.tsx",
    "app\account\profile\page.tsx",
    "app\account\settings\page.tsx",
    "app\account\notifications\page.tsx"
) | ForEach-Object { New-FileIfNotExists $_ }

# API routes
@(
    "app\api\auth\register\route.ts",
    "app\api\auth\login\route.ts",
    "app\api\auth\logout\route.ts",
    "app\api\proxy\[...path]\route.ts",
    "app\api\webhooks\paypal\route.ts"
) | ForEach-Object { New-FileIfNotExists $_ }

Write-Host "Page files created" -ForegroundColor $Green
Write-Host ""

Write-Host "Creating component files..." -ForegroundColor $Blue

# Marketing components
@(
    "components\marketing\hero.tsx",
    "components\marketing\services.tsx",
    "components\marketing\about.tsx",
    "components\marketing\portfolio.tsx",
    "components\marketing\process.tsx",
    "components\marketing\testimonials.tsx",
    "components\marketing\pricing-section.tsx",
    "components\marketing\contact-form.tsx",
    "components\marketing\faq-section.tsx",
    "components\marketing\cta-section.tsx",
    "components\marketing\navigation.tsx",
    "components\marketing\footer.tsx"
) | ForEach-Object { New-FileIfNotExists $_ }

# Dashboard components
@(
    "components\dashboard\sidebar.tsx",
    "components\dashboard\topbar.tsx",
    "components\dashboard\breadcrumb.tsx",
    "components\dashboard\dashboard-grid.tsx"
) | ForEach-Object { New-FileIfNotExists $_ }

# Client dashboard components
@(
    "components\dashboard\client\overview-cards.tsx",
    "components\dashboard\client\performance-chart.tsx",
    "components\dashboard\client\recent-content.tsx",
    "components\dashboard\client\connected-accounts.tsx",
    "components\dashboard\client\tasks-widget.tsx",
    "components\dashboard\client\quick-actions.tsx",
    "components\dashboard\client\content-calendar.tsx",
    "components\dashboard\client\analytics-dashboard.tsx",
    "components\dashboard\client\payment-info.tsx"
) | ForEach-Object { New-FileIfNotExists $_ }

# Admin dashboard components
@(
    "components\dashboard\admin\admin-stats.tsx",
    "components\dashboard\admin\client-list.tsx",
    "components\dashboard\admin\revenue-chart.tsx",
    "components\dashboard\admin\pending-approvals.tsx",
    "components\dashboard\admin\system-health.tsx",
    "components\dashboard\admin\recent-activities.tsx",
    "components\dashboard\admin\admin-actions.tsx"
) | ForEach-Object { New-FileIfNotExists $_ }

# Content components
@(
    "components\dashboard\content\content-form.tsx",
    "components\dashboard\content\content-card.tsx",
    "components\dashboard\content\content-gallery.tsx",
    "components\dashboard\content\image-uploader.tsx",
    "components\dashboard\content\content-editor.tsx"
) | ForEach-Object { New-FileIfNotExists $_ }

# Social components
@(
    "components\dashboard\social\account-card.tsx",
    "components\dashboard\social\connect-button.tsx",
    "components\dashboard\social\sync-status.tsx",
    "components\dashboard\social\metrics-display.tsx"
) | ForEach-Object { New-FileIfNotExists $_ }

# Messaging components
@(
    "components\dashboard\messaging\chat-window.tsx",
    "components\dashboard\messaging\message-input.tsx",
    "components\dashboard\messaging\conversation-list.tsx",
    "components\dashboard\messaging\message-bubble.tsx"
) | ForEach-Object { New-FileIfNotExists $_ }

# Billing components
@(
    "components\dashboard\billing\plan-card.tsx",
    "components\dashboard\billing\payment-form.tsx",
    "components\dashboard\billing\invoice-table.tsx",
    "components\dashboard\billing\plan-selector.tsx",
    "components\dashboard\billing\payment-method-form.tsx"
) | ForEach-Object { New-FileIfNotExists $_ }

# Dialog components
@(
    "components\dashboard\dialogs\confirm-dialog.tsx",
    "components\dashboard\dialogs\task-dialog.tsx",
    "components\dashboard\dialogs\approval-dialog.tsx",
    "components\dashboard\dialogs\settings-dialog.tsx"
) | ForEach-Object { New-FileIfNotExists $_ }

# UI components
@(
    "components\ui\button.tsx",
    "components\ui\card.tsx",
    "components\ui\input.tsx",
    "components\ui\label.tsx",
    "components\ui\textarea.tsx",
    "components\ui\select.tsx",
    "components\ui\checkbox.tsx",
    "components\ui\radio.tsx",
    "components\ui\badge.tsx",
    "components\ui\alert.tsx",
    "components\ui\modal.tsx",
    "components\ui\dropdown.tsx",
    "components\ui\tabs.tsx",
    "components\ui\tooltip.tsx",
    "components\ui\progress.tsx",
    "components\ui\skeleton.tsx",
    "components\ui\spinner.tsx",
    "components\ui\empty-state.tsx",
    "components\ui\pagination.tsx",
    "components\ui\table.tsx",
    "components\ui\form.tsx",
    "components\ui\date-picker.tsx",
    "components\ui\time-picker.tsx",
    "components\ui\file-upload.tsx"
) | ForEach-Object { New-FileIfNotExists $_ }

# Common components
@(
    "components\common\error-boundary.tsx",
    "components\common\loading-spinner.tsx",
    "components\common\error-message.tsx",
    "components\common\success-message.tsx",
    "components\common\confirmation-modal.tsx",
    "components\common\image-with-fallback.tsx"
) | ForEach-Object { New-FileIfNotExists $_ }

Write-Host "Component files created" -ForegroundColor $Green
Write-Host ""

Write-Host "Creating lib files..." -ForegroundColor $Blue

# Lib files
@(
    "lib\api.ts",
    "lib\auth-context.tsx",
    "lib\utils.ts",
    "lib\types.ts",
    "lib\constants.ts",
    "lib\validation.ts",
    "lib\formatters.ts",
    "lib\hooks\useAuth.ts",
    "lib\hooks\useFetch.ts",
    "lib\hooks\useLocalStorage.ts",
    "lib\hooks\useDebounce.ts",
    "lib\hooks\useMediaQuery.ts",
    "lib\hooks\useClickOutside.ts",
    "lib\hooks\useForm.ts",
    "lib\hooks\useNotification.ts"
) | ForEach-Object { New-FileIfNotExists $_ }

Write-Host "Lib files created" -ForegroundColor $Green
Write-Host ""

Write-Host "Creating hooks files..." -ForegroundColor $Blue

# Hooks files
@(
    "hooks\useDashboard.ts",
    "hooks\useContent.ts",
    "hooks\useAnalytics.ts",
    "hooks\useBilling.ts",
    "hooks\useMessages.ts",
    "hooks\useSocialAccounts.ts",
    "hooks\useNotifications.ts"
) | ForEach-Object { New-FileIfNotExists $_ }

Write-Host "Hooks files created" -ForegroundColor $Green
Write-Host ""

Write-Host "Creating store files..." -ForegroundColor $Blue

# Store files
@(
    "store\authStore.ts",
    "store\dashboardStore.ts",
    "store\contentStore.ts",
    "store\billingStore.ts",
    "store\notificationStore.ts"
) | ForEach-Object { New-FileIfNotExists $_ }

Write-Host "Store files created" -ForegroundColor $Green
Write-Host ""

Write-Host "Creating style files..." -ForegroundColor $Blue

# Style files
@(
    "styles\globals.css",
    "styles\dashboard.css",
    "styles\marketing.css"
) | ForEach-Object { New-FileIfNotExists $_ }

Write-Host "Style files created" -ForegroundColor $Green
Write-Host ""

Write-Host "Creating configuration files..." -ForegroundColor $Blue

# Middleware
New-FileIfNotExists "middleware.ts"

Write-Host "Configuration files created" -ForegroundColor $Green
Write-Host ""

Write-Host "Project structure setup complete!" -ForegroundColor $Green
Write-Host ""
Write-Host "Summary:" -ForegroundColor $Blue
Write-Host "   - Created all app routes (auth, marketing, dashboard)"
Write-Host "   - Created component structure (marketing, dashboard, ui, common)"
Write-Host "   - Created lib utilities and hooks"
Write-Host "   - Created state management (store)"
Write-Host "   - Created style files"
Write-Host ""
Write-Host "Next steps:" -ForegroundColor $Blue
Write-Host "   1. Add content to your page.tsx files"
Write-Host "   2. Implement components"
Write-Host "   3. Configure your environment variables"
Write-Host "   4. Start your development server: npm run dev"