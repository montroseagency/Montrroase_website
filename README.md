client/
├── app/
│   ├── (auth)/                          # Auth routes group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── verify-email/
│   │   │   └── page.tsx
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   └── reset-password/
│   │       └── page.tsx
│   │
│   ├── (marketing)/                     # Public marketing pages
│   │   ├── page.tsx                     # Homepage
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   └── page.tsx
│   │   ├── portfolio/
│   │   │   └── page.tsx
│   │   ├── pricing/
│   │   │   └── page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── faq/
│   │   │   └── page.tsx
│   │   └── terms-and-conditions/
│   │       └── page.tsx
│   │
│   ├── (dashboard)/                     # Protected dashboard routes
│   │   ├── dashboard/
│   │   │   ├── page.tsx                 # Main dashboard
│   │   │   ├── layout.tsx               # Dashboard layout with sidebar
│   │   │   │
│   │   │   ├── (client)/                # Client-only routes
│   │   │   │   ├── overview/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── content/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── [id]/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── create/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── calendar/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── analytics/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [metric]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── social-accounts/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── connect/
│   │   │   │   │   │   ├── instagram/
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   └── youtube/
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── tasks/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── messages/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [conversationId]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── billing/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── plans/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── invoices/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   └── [id]/
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   └── payment/
│   │   │   │   │       ├── success/
│   │   │   │   │       │   └── page.tsx
│   │   │   │   │       └── cancel/
│   │   │   │   │           └── page.tsx
│   │   │   │   └── settings/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── profile/
│   │   │   │       │   └── page.tsx
│   │   │   │       └── account/
│   │   │   │           └── page.tsx
│   │   │   │
│   │   │   └── (admin)/                 # Admin-only routes
│   │   │       ├── overview/
│   │   │       │   └── page.tsx
│   │   │       ├── clients/
│   │   │       │   ├── page.tsx
│   │   │       │   ├── [id]/
│   │   │       │   │   ├── page.tsx
│   │   │       │   │   └── edit/
│   │   │       │   │       └── page.tsx
│   │   │       │   └── create/
│   │   │       │       └── page.tsx
│   │   │       ├── content/
│   │   │       │   ├── page.tsx
│   │   │       │   ├── [id]/
│   │   │       │   │   ├── page.tsx
│   │   │       │   │   └── approve/
│   │   │       │   │       └── page.tsx
│   │   │       │   └── review/
│   │   │       │       └── page.tsx
│   │   │       ├── tasks/
│   │   │       │   ├── page.tsx
│   │   │       │   ├── [id]/
│   │   │       │   │   └── page.tsx
│   │   │       │   └── create/
│   │   │       │       └── page.tsx
│   │   │       ├── team/
│   │   │       │   ├── page.tsx
│   │   │       │   ├── [id]/
│   │   │       │   │   └── page.tsx
│   │   │       │   └── create/
│   │   │       │       └── page.tsx
│   │   │       ├── messages/
│   │   │       │   ├── page.tsx
│   │   │       │   └── [conversationId]/
│   │   │       │       └── page.tsx
│   │   │       ├── billing/
│   │   │       │   ├── page.tsx
│   │   │       │   ├── invoices/
│   │   │       │   │   ├── page.tsx
│   │   │       │   │   └── [id]/
│   │   │       │   │       └── page.tsx
│   │   │       │   ├── payments/
│   │   │       │   │   └── page.tsx
│   │   │       │   ├── verification/
│   │   │       │   │   └── page.tsx
│   │   │       │   └── settings/
│   │   │       │       └── page.tsx
│   │   │       ├── analytics/
│   │   │       │   ├── page.tsx
│   │   │       │   ├── revenue/
│   │   │       │   │   └── page.tsx
│   │   │       │   └── reports/
│   │   │       │       └── page.tsx
│   │   │       └── settings/
│   │   │           ├── page.tsx
│   │   │           ├── users/
│   │   │           │   └── page.tsx
│   │   │           ├── system/
│   │   │           │   └── page.tsx
│   │   │           └── integrations/
│   │   │               └── page.tsx
│   │   │
│   │   └── account/
│   │       ├── page.tsx
│   │       ├── profile/
│   │       │   └── page.tsx
│   │       ├── settings/
│   │       │   └── page.tsx
│   │       └── notifications/
│   │           └── page.tsx
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/
│   │   │   │   └── route.ts
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   └── logout/
│   │   │       └── route.ts
│   │   ├── proxy/
│   │   │   └── [...path]/
│   │   │       └── route.ts              # Proxy API requests to Django
│   │   └── webhooks/
│   │       └── paypal/
│   │           └── route.ts
│   │
│   ├── globals.css                       # Global styles
│   ├── layout.tsx                        # Root layout
│   └── not-found.tsx                     # 404 page
│
├── components/
│   ├── (marketing)/                      # Marketing page components
│   │   ├── hero.tsx
│   │   ├── services.tsx
│   │   ├── about.tsx
│   │   ├── portfolio.tsx
│   │   ├── process.tsx
│   │   ├── testimonials.tsx
│   │   ├── pricing-section.tsx
│   │   ├── contact-form.tsx
│   │   ├── faq-section.tsx
│   │   ├── cta-section.tsx
│   │   ├── navigation.tsx
│   │   └── footer.tsx
│   │
│   ├── (dashboard)/                      # Dashboard components
│   │   ├── sidebar.tsx
│   │   ├── topbar.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── dashboard-grid.tsx
│   │   │
│   │   ├── client/                       # Client dashboard components
│   │   │   ├── overview-cards.tsx
│   │   │   ├── performance-chart.tsx
│   │   │   ├── recent-content.tsx
│   │   │   ├── connected-accounts.tsx
│   │   │   ├── tasks-widget.tsx
│   │   │   ├── quick-actions.tsx
│   │   │   ├── content-calendar.tsx
│   │   │   ├── analytics-dashboard.tsx
│   │   │   └── payment-info.tsx
│   │   │
│   │   ├── admin/                        # Admin dashboard components
│   │   │   ├── admin-stats.tsx
│   │   │   ├── client-list.tsx
│   │   │   ├── revenue-chart.tsx
│   │   │   ├── pending-approvals.tsx
│   │   │   ├── system-health.tsx
│   │   │   ├── recent-activities.tsx
│   │   │   └── admin-actions.tsx
│   │   │
│   │   ├── content/
│   │   │   ├── content-form.tsx
│   │   │   ├── content-card.tsx
│   │   │   ├── content-gallery.tsx
│   │   │   ├── image-uploader.tsx
│   │   │   └── content-editor.tsx
│   │   │
│   │   ├── social/
│   │   │   ├── account-card.tsx
│   │   │   ├── connect-button.tsx
│   │   │   ├── sync-status.tsx
│   │   │   └── metrics-display.tsx
│   │   │
│   │   ├── messaging/
│   │   │   ├── chat-window.tsx
│   │   │   ├── message-input.tsx
│   │   │   ├── conversation-list.tsx
│   │   │   └── message-bubble.tsx
│   │   │
│   │   ├── billing/
│   │   │   ├── plan-card.tsx
│   │   │   ├── payment-form.tsx
│   │   │   ├── invoice-table.tsx
│   │   │   ├── plan-selector.tsx
│   │   │   └── payment-method-form.tsx
│   │   │
│   │   └── dialogs/
│   │       ├── confirm-dialog.tsx
│   │       ├── task-dialog.tsx
│   │       ├── approval-dialog.tsx
│   │       └── settings-dialog.tsx
│   │
│   ├── ui/                               # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   ├── checkbox.tsx
│   │   ├── radio.tsx
│   │   ├── badge.tsx
│   │   ├── alert.tsx
│   │   ├── modal.tsx
│   │   ├── dropdown.tsx
│   │   ├── tabs.tsx
│   │   ├── tooltip.tsx
│   │   ├── progress.tsx
│   │   ├── skeleton.tsx
│   │   ├── spinner.tsx
│   │   ├── empty-state.tsx
│   │   ├── pagination.tsx
│   │   ├── table.tsx
│   │   ├── form.tsx
│   │   ├── date-picker.tsx
│   │   ├── time-picker.tsx
│   │   └── file-upload.tsx
│   │
│   └── common/                           # Shared components
│       ├── error-boundary.tsx
│       ├── loading-spinner.tsx
│       ├── error-message.tsx
│       ├── success-message.tsx
│       ├── confirmation-modal.tsx
│       └── image-with-fallback.tsx
│
├── lib/
│   ├── api.ts                            # API client functions
│   ├── auth-context.tsx                  # Auth context & hooks
│   ├── hooks/                            # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useFetch.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useClickOutside.ts
│   │   ├── useForm.ts
│   │   └── useNotification.ts
│   ├── utils.ts                          # Utility functions
│   ├── types.ts                          # TypeScript type definitions
│   ├── constants.ts                      # App constants
│   ├── validation.ts                     # Form validation schemas
│   └── formatters.ts                     # Data formatting functions
│
├── hooks/
│   ├── useDashboard.ts
│   ├── useContent.ts
│   ├── useAnalytics.ts
│   ├── useBilling.ts
│   ├── useMessages.ts
│   ├── useSocialAccounts.ts
│   └── useNotifications.ts
│
├── store/                                # State management (Zustand or Redux)
│   ├── authStore.ts
│   ├── dashboardStore.ts
│   ├── contentStore.ts
│   ├── billingStore.ts
│   └── notificationStore.ts
│
├── styles/
│   ├── globals.css
│   ├── dashboard.css
│   └── marketing.css
│
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero-bg.jpg
│   │   ├── services/
│   │   ├── portfolio/
│   │   └── testimonials/
│   ├── icons/
│   │   └── social-media/
│   └── fonts/
│
├── middleware.ts                         # Next.js middleware for auth
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local