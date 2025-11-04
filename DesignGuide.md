# Montrose Platform - Visual Design Guide

## 🎨 Color Palette

### Primary Colors (Professional Blue)
```
Blue 500: #3b82f6 ███████ Main brand color
Blue 600: #2563eb ███████ Hover states
Blue 700: #1d4ed8 ███████ Active states
```

### Accent Colors (Light Blue)
```
Accent 500: #0ea5e9 ███████ Secondary highlights
Accent 600: #0284c7 ███████ Accent hover
```

### Neutral Colors
```
White:    #ffffff ███████ Background
Gray 100: #f5f5f5 ███████ Light backgrounds
Gray 600: #525252 ███████ Secondary text
Gray 900: #171717 ███████ Primary text
```

## 📐 Layout Structure

### Navigation Bar (Sticky)
```
┌─────────────────────────────────────────────────┐
│ [M] Montrose    Home Features Pricing Portfolio │
│                              [Login] [Sign Up]   │
└─────────────────────────────────────────────────┘
```

**Features:**
- Sticky on scroll (becomes solid white)
- Mobile hamburger menu
- Gradient logo icon
- Active route highlighting

### Hero Section
```
┌─────────────────────────────────────────────────┐
│                                                   │
│  [BADGE] Real-Time Analytics                     │
│                                                   │
│  Grow Your Social Media                          │
│  Like Never Before                               │
│                                                   │
│  Transform your social media presence...         │
│                                                   │
│  150+        2M+         98%                     │
│  Clients     Followers   Satisfaction            │
│                                                   │
│  [Start Growing] [View Pricing]                  │
│                                                   │
│  ✓ No credit card  ✓ Cancel anytime             │
│                                                   │
└─────────────────────────────────────────────────┘
```

**Features:**
- Gradient background with subtle pattern
- Animated floating elements
- Live stats display
- Dashboard preview mockup
- Trust badges

### Feature Grid (6 Cards)
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ [📊 Icon]    │ │ [🎨 Icon]    │ │ [📈 Icon]    │
│              │ │              │ │              │
│ Real-Time    │ │ Professional │ │ Growth       │
│ Analytics    │ │ Content      │ │ Strategies   │
│              │ │              │ │              │
│ Description  │ │ Description  │ │ Description  │
│ Learn more → │ │ Learn more → │ │ Learn more → │
└──────────────┘ └──────────────┘ └──────────────┘

┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ [📅 Icon]    │ │ [👥 Icon]    │ │ [🔒 Icon]    │
│              │ │              │ │              │
│ Content      │ │ Audience     │ │ Secure &     │
│ Calendar     │ │ Insights     │ │ Reliable     │
│              │ │              │ │              │
│ Description  │ │ Description  │ │ Description  │
│ Learn more → │ │ Learn more → │ │ Learn more → │
└──────────────┘ └──────────────┘ └──────────────┘
```

**Features:**
- Hover lift effect
- Gradient icon backgrounds
- Responsive 3-column grid
- Card shadows

### CTA Section
```
┌─────────────────────────────────────────────────┐
│        [Gradient Blue Background]                │
│                                                   │
│    Ready to Transform Your Social Media?         │
│                                                   │
│    Join hundreds of businesses already growing   │
│                                                   │
│    [Start Free Trial]  [Contact Sales]           │
│                                                   │
│    No credit card • 14-day trial • Cancel any    │
│                                                   │
└─────────────────────────────────────────────────┘
```

### Footer
```
┌─────────────────────────────────────────────────┐
│ [M] Montrose                                     │
│ Social Media Growth                              │
│                                                   │
│ Description text...                              │
│                                                   │
│ [Social Icons: IG FB LI TW]                     │
│                                                   │
│ Product    Company    Legal                      │
│ Features   About      Terms                      │
│ Pricing    Contact    Privacy                    │
│ Portfolio  Blog       Cookies                    │
│ FAQ        Careers                               │
│                                                   │
│ © 2024 Montrose. All rights reserved.           │
└─────────────────────────────────────────────────┘
```

## 🎭 Component Breakdown

### 1. Navigation Component
**File:** `components/marketing/navigation.tsx`

**States:**
- Default: Transparent background
- Scrolled: White background with shadow
- Mobile: Hamburger menu

**Elements:**
- Logo (gradient M icon + text)
- Navigation links (6 items)
- CTA buttons (Login + Sign Up)
- Mobile menu toggle

### 2. Hero Component
**File:** `components/marketing/hero.tsx`

**Sections:**
- Badge with live indicator
- Main headline (gradient text)
- Subheadline
- Stats grid (3 columns)
- CTA buttons (2)
- Trust badges
- Dashboard mockup (right side)

**Animations:**
- Fade in
- Slide up
- Floating background elements
- Pulsing notifications

### 3. Footer Component
**File:** `components/marketing/footer.tsx`

**Sections:**
- Brand section with logo
- 4 link columns
- Social media icons
- Copyright bar

## 🎬 Animations

### Page Load
```
1. Navigation: Fade in (0.3s)
2. Hero content: Slide up (0.5s)
3. Dashboard mockup: Slide up with delay (0.7s)
4. Feature cards: Stagger fade in
```

### Hover Effects
```
Cards: 
- Lift 4px
- Shadow increases
- Icon scales 110%

Buttons:
- Lift 2px
- Shadow increases
- Subtle scale

Links:
- Color change
- Underline animation
```

### Scroll Effects
```
Navigation:
- Background: transparent → white
- Shadow: none → soft shadow
- Transition: 300ms
```

## 📱 Responsive Breakpoints

### Mobile (< 640px)
- Stack all elements vertically
- Hamburger menu
- Single column feature grid
- Simplified hero layout

### Tablet (640px - 1024px)
- 2-column feature grid
- Condensed navigation
- Adjusted spacing

### Desktop (> 1024px)
- Full navigation menu
- 3-column feature grid
- Side-by-side hero layout
- Maximum width: 1280px

## 🔤 Typography Scale

```
Hero Headline:    60px (desktop), 36px (mobile)
Section Headline: 40px (desktop), 28px (mobile)
Card Title:       20px
Body Text:        16px
Small Text:       14px
Tiny Text:        12px
```

**Fonts:**
- Headings: Poppins (display font)
- Body: Inter (sans-serif)
- Weight range: 300-900

## 🎨 Component Colors

### Feature Cards
```
Analytics:     Blue (#3b82f6)
Content:       Light Blue (#0ea5e9)
Growth:        Green (#10b981)
Calendar:      Purple (#8b5cf6)
Audience:      Orange (#f97316)
Security:      Pink (#ec4899)
```

### Button Styles
```
Primary:   Blue gradient + white text + shadow
Secondary: White + blue text + border
Ghost:     Transparent + blue text
```

## 📊 Dashboard Mockup (Hero)

```
┌────────────────────────────────────┐
│ Analytics Dashboard        [Live]  │
├────────────────────────────────────┤
│                                     │
│ ┌─────────┐  ┌─────────┐          │
│ │Followers│  │Engagement│          │
│ │  24.5K  │  │   8.4%   │          │
│ │ +12.5%  │  │  +3.2%   │          │
│ └─────────┘  └─────────┘          │
│                                     │
│ [Bar Chart Visualization]          │
│ ▂▅▃▇▅█▆                           │
│                                     │
└────────────────────────────────────┘

Floating Cards:
┌──────────────┐  ┌──────────────────┐
│ ✓ Content    │  │ 📈 Growth Rate   │
│   Posted     │  │    +15.3%        │
│   Instagram  │  │    this week     │
└──────────────┘  └──────────────────┘
```

## 🎯 Key Visual Elements

1. **Gradient Backgrounds**
   - Hero: Blue gradient with pattern
   - CTA: Deep blue gradient
   - Cards: Subtle color gradients

2. **Shadows**
   - Cards: Soft shadow (card)
   - Hover: Enhanced shadow (card-hover)
   - Buttons: Colored shadow matching brand

3. **Icons**
   - Feature cards: White on gradient background
   - Navigation: Line-style SVG icons
   - Social media: Filled brand icons

4. **Badges**
   - Live indicator: Pulsing green dot
   - Trust badges: Check icon + text
   - Status: Rounded pill shape

## 🚀 Performance

- All images: Optimized Next.js Image
- Fonts: Google Fonts with preload
- CSS: Tailwind (purged in production)
- Animations: Hardware accelerated
- Bundle size: < 200kb gzipped

---

## 📸 Preview URLs

When deployed, pages will be:
```
/                  → Homepage (implemented)
/services          → Features page (next)
/pricing           → Pricing page (next)
/portfolio         → Portfolio page (next)
/about             → About page (next)
/contact           → Contact page (next)
/auth/login        → Login page (next)
/auth/register     → Register page (next)
/dashboard         → Client dashboard (next)
```

## ✨ What Makes This Professional

1. **Clean Design**: No clutter, Facebook-style simplicity
2. **Professional Colors**: Blue/white trusted combination
3. **Clear CTAs**: Obvious next steps for users
4. **Social Proof**: Stats and trust indicators
5. **Modern UI**: Smooth animations, hover effects
6. **Responsive**: Perfect on all devices
7. **Fast**: Optimized for performance
8. **Accessible**: Keyboard navigation, ARIA labels

---

This design positions Montrose as a **professional platform** (not a generic agency website), focusing on:
- Real capabilities (dashboard, analytics)
- Trust and credibility (stats, security)
- Clear value proposition (growth, engagement)
- Modern technology (real-time, automated)