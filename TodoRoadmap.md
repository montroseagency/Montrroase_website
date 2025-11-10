

🧭 1. System Overview
Montrose Platform = One dashboard, multiple services, each with its own mini-ecosystem:
Marketing


Website Builder + Hosting + SEO


Courses


Support


Billing / Wallet / Notifications


Admin Panel




🧩 2. Dashboard Architecture
🌐 Main Dashboard (Shared for all users)
Purpose: Entry point to all services after login.
Sections:
Overview


Personalized greeting


Account summary


Balance & plan type (Standard, Pro, Premium)


Quick links: Marketing / Websites / Courses / Support


Notifications summary (last 5)


Wallet & Billing


Add funds (Stripe/PayPal integration)


Redeem codes


Payment history


Auto-renew options


Notifications Center


Top icon (live notifications)


Dedicated page: grouped by date & service (Payments, Messages, Analytics, Updates)


Email notification integration


Settings


Account info


Profile image / company logo


Billing info


Connected services


API keys / integrations (optional)



💼 3. Sub-Dashboards (Service Modules)
🧠 A. Marketing Dashboard
Modules:
Overview: Campaigns summary, reach, impressions


Content: Schedule posts, manage creative assets


Tasks: Assignments per campaign


Analytics: Graphs on engagement & conversions


Performance: KPIs & trend metrics


Social Connector: Instagram / Facebook / TikTok API linking


Chat: One-on-one with marketing agent



🧱 B. Website Builder + Hosting + SEO Dashboard
Phases & Pages:
AI Q&A / Template Wizard


Client answers questions → AI generates template preview


Free until template accepted


Template Creation Phase


Choose design style, layout, color palette


Auto-generated Figma-like preview


Domain & Hosting


Domain search & purchase


Hosting server selection (Basic / Business / Premium)


Connection verification


Website Overview


Files, live status, traffic


Project status (Development → Deployed)


Analytics & Performance


Page load, visitor stats, uptime monitor


SEO Tools


Keywords suggestions


Page speed & rank tracker


Support


Direct chat with assigned developer


Upload project versions / feedback



🎓 C. Courses Dashboard
Pages:
Overview


Current plan (Standard / Pro / Premium)


Recommended courses


My Courses


List of unlocked courses


Locked ones with “Upgrade Plan” or “Buy Individually”


Progress Tracker


Percentage, time watched, test results


Support


Ask tutor questions


Report course issues


Billing


Course purchases, subscription renewal



🧑‍💼 4. Admin Dashboard (Hierarchy)
🧱 Administrator
Full control of all services


Manages agents (assigns clients)


Views analytics (system-wide)


Approves domains & hosting


Views total revenue, balance, and client activity


Manages all notifications and support messages


👨‍💻 Website Agents
Access to Website dashboard modules


Upload versions, assist clients, handle support


Limited to assigned clients


📈 Marketing Agents
Access to marketing-related dashboards


Create & monitor campaigns


Communicate with assigned clients


Upload content and performance data


🧍‍♂️ Client
Access to only subscribed services


Communicates with assigned agent


Can view analytics, messages, notifications



🧰 5. Technical Implementation Plan
🏗️ Backend (Django REST)
Apps:
users → authentication, roles, permissions


wallet → balance, transactions, redeem codes


notifications → universal notification model


marketing → campaigns, analytics, tasks


website → templates, hosting, domains, SEO


courses → progress, lessons, purchases


support → tickets, messages, chat system




⚙️ Frontend (Next.js)


UI Components:
Sidebar (links to services)


Topbar (notifications, balance, user avatar)


Dynamic ServiceLoader (fetches sub-dashboard)


Socket-based chat for real-time support


Charts (Recharts / Chart.js)



🔔 6. Notifications & Wallet Flow
Notification Triggers:
Payment success/failure


Message received


Hosting/domain update


Course progress or new content


Admin broadcast message


Wallet Features:
Add funds (PayPal / Stripe)


Redeem code (admin-generated)


Auto payments for renewals


Transaction history with timestamps



🪄 7. Automation & AI Integration Ideas
AI Q&A Builder: GPT-based questionnaire for web template planning


AI Analytics Summaries: Convert data to plain insights for clients


AI SEO Assistant: Suggests titles, descriptions, keywords


AI Course Tutor: Auto Q&A helper in course dashboard



🧱 8. Development Roadmap (Phases)
Phase
Module
Description
1
Core Dashboard + Auth
User system, role permissions, base layout
2
Marketing Dashboard
Current system integration
3
Website Builder
AI template + hosting + SEO + analytics
4
Courses Dashboard
Subscriptions, video system
5
Support System
Live chat, ticketing
6
Notifications + Wallet
Email + in-dashboard notifications, balance
7
Admin Dashboard
Full hierarchy + agent management
8
Polishing + Automation
AI tools, analytics, email triggers




