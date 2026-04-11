# AlphaSynth Design System - Complete Guide (A-Z)

## 📋 Table of Contents
- [Overview](#overview)
- [Color Palette](#color-palette)
- [Typography](#typography)
- [Components](#components)
- [Animations](#animations)
- [Layout & Spacing](#layout--spacing)
- [Icons](#icons)
- [Background Effects](#background-effects)
- [Authentication UI](#authentication-ui)
- [Tech Stack](#tech-stack)

---

## 🎨 Overview

AlphaSynth is a premium AI-powered trading platform with a futuristic, dark-themed UI inspired by Bloomberg Terminal and modern fintech dashboards.

**Design Philosophy:**
- Dark, professional aesthetic
- Neon green accent color (#22c55e)
- Glass morphism effects
- Smooth cinematic animations
- High-end fintech look and feel

---

## 🎨 Color Palette

### Primary Colors
```css
--bg-primary: #000000           /* Pure black background */
--glow-primary: #22c55e         /* Neon green (main accent) */
--glow-secondary: #4ade80       /* Light green */
--glow-soft: #86efac            /* Soft green */
```

### Text Colors
```css
--text-primary: #ffffff         /* White (main text) */
--text-secondary: #9ca3af       /* Gray (secondary text) */
--text-muted: #4b5563          /* Dark gray (muted text) */
--text-accent: #86efac         /* Soft green (accent text) */
```

### Surface Colors
```css
--bg-surface: rgba(255,255,255,0.04)        /* Subtle surface */
--bg-surface-hover: rgba(255,255,255,0.07)  /* Hover state */
--glass-bg: rgba(0,0,0,0.6)                 /* Glass panels */
```

### Border Colors
```css
--border-default: rgba(255,255,255,0.08)    /* Default borders */
--border-glow: rgba(34,197,94,0.25)         /* Glowing borders */
```

### Input Colors
```css
--input-bg: rgba(255,255,255,0.05)          /* Input background */
--input-border: rgba(255,255,255,0.1)       /* Input border */
--input-focus: rgba(34,197,94,0.4)          /* Focus state */
```

### Status Colors
```css
--error: #ef4444                            /* Red (errors) */
--warning: #f59e0b                          /* Orange (warnings) */
```

### Tailwind Classes
```tsx
// Primary green
className="text-[#22c55e]"
className="bg-[#22c55e]"
className="border-[#22c55e]"

// Text colors
className="text-white"
className="text-text-secondary"
className="text-text-muted"

// Backgrounds
className="bg-black"
className="bg-white/5"
className="bg-glow-primary/10"
```

---

## ✍️ Typography

### Font Families

**Clash Display** - All text (headings, body, UI)
```tsx
className="font-clash"
```

**JetBrains Mono** - Code and technical elements
```tsx
className="font-jetbrains"
```

### Font Weights
```tsx
font-normal      // 400 - Body text
font-medium      // 500 - Emphasis
font-semibold    // 600 - Strong emphasis
font-bold        // 700 - Headings
font-extrabold   // 800 - Large headings
font-black       // 900 - Hero text
```

### Font Sizes
```tsx
// Headings
text-9xl         // Hero (128px)
text-7xl         // H1 (72px)
text-5xl         // H2 (48px)
text-3xl         // H3 (30px)
text-2xl         // H4 (24px)
text-xl          // H5 (20px)

// Body
text-base        // Body (16px)
text-sm          // Small (14px)
text-xs          // Extra small (12px)
```

### Typography Examples
```tsx
// Hero heading
<h1 className="text-7xl font-clash font-bold text-white">

// Subheading
<h2 className="text-3xl font-clash font-bold text-white">

// Body text
<p className="text-base font-clash text-text-secondary">

// Small text
<span className="text-sm font-clash text-text-muted">

// Technical/code
<code className="font-jetbrains text-glow-primary">
```

---

## 🧩 Components

### Buttons

**Primary Button**
```tsx
<Button variant="primary">
  Get Started
</Button>

// Styles:
- Green background (#22c55e)
- Black text
- Rounded full
- Hover: scale(1.05)
- Shadow glow effect
- Shimmer animation on hover
```

**Ghost Button**
```tsx
<Button variant="ghost">
  Sign Out
</Button>

// Styles:
- Transparent background
- White/gray border
- Hover: green border + green text
```

**Outline Green Button**
```tsx
<Button variant="outline-green">
  View Signals
</Button>

// Styles:
- Green border
- Green text
- Transparent background
- Hover: brighter green
```

### Input Fields

**Text Input**
```tsx
<InputField
  label="Email address"
  type="email"
  placeholder="Enter your email"
/>

// Styles:
- Dark background (black/20)
- White/10 border
- Rounded-xl
- Focus: green border + glow
- Clash Display font
```

**Password Input**
```tsx
<PasswordField
  label="Password"
  showStrength
/>

// Features:
- Toggle visibility (eye icon)
- Password strength meter
- Color-coded strength indicator
- Validation feedback
```

### Cards

**Glass Card**
```tsx
<div className="glass-card rounded-3xl p-11">
  Content
</div>

// Styles:
- Black/50 background
- Backdrop blur (40px)
- Subtle white border
- Green glow shadow
```

**Glass Surface**
```tsx
<div className="glass-surface rounded-2xl p-6">
  Content
</div>

// Styles:
- Black/40 background
- Backdrop blur (20px)
- Green border
- Lighter than glass-card
```

**Glass Panel**
```tsx
<div className="glass-panel">
  Content
</div>

// Styles:
- Black/60 background
- Backdrop blur (40px)
- Minimal border
- Used for sidebars
```

### Divider
```tsx
<Divider text="or sign in with email" />

// Styles:
- Horizontal line (white/7)
- Centered text
- Uppercase
- Muted color
```

### Logo
```tsx
<Logo />

// Displays:
- Logo image (/logo.jpeg)
- "Alpha" in green (#22c55e)
- "Synth" in white
- Clash Display font
```

---

## 🎬 Animations

### GSAP Animations (Intro)

**Intro Sequence**
```tsx
<Intro onComplete={() => setShowIntro(false)} />

// Features:
- 60 floating binary digits
- 6 horizontal shine lines
- 4 vertical scan lines
- Logo slide-in animation
- Glitch effect
- Glow pulse
- Subtitle fade-in
- Duration: ~4 seconds
```

### Framer Motion Animations

**Fade In Up**
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
```

**Scale In**
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
>
```

**Slide In**
```tsx
<motion.div
  initial={{ x: -200, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 1.2, ease: 'expo.out' }}
>
```

### Tailwind Animations

**Available Animations:**
```tsx
animate-aurora-drift          // Aurora band movement
animate-bar-rise             // Bar chart rise
animate-bar-breathe          // Bar pulsing
animate-globe-float          // Globe floating
animate-globe-spin           // Globe rotation
animate-dot-pulse            // Dot pulsing
animate-ring-pulse           // Ring expansion
animate-shimmer              // Button shimmer
animate-shake                // Error shake
animate-fade-in-up           // Fade in from bottom
animate-slide-in             // Slide from right
```

**Usage:**
```tsx
<div className="animate-dot-pulse">
<div className="animate-fade-in-up">
<button className="hover:animate-shimmer">
```

---

## 📐 Layout & Spacing

### Container Widths
```tsx
max-w-md        // 448px - Forms
max-w-lg        // 512px - Cards
max-w-2xl       // 672px - Content
max-w-4xl       // 896px - Dashboard
max-w-5xl       // 1024px - Landing
```

### Padding/Margin Scale
```tsx
p-4    // 16px
p-6    // 24px
p-8    // 32px
p-11   // 44px (cards)
p-14   // 56px (sections)

gap-2  // 8px
gap-4  // 16px
gap-6  // 24px
gap-8  // 32px
```

### Border Radius
```tsx
rounded-md      // 6px - Small elements
rounded-xl      // 12px - Inputs, buttons
rounded-2xl     // 16px - Cards
rounded-3xl     // 24px - Large cards
rounded-full    // 9999px - Pills, buttons
```

### Grid Layouts
```tsx
// Two columns
<div className="grid grid-cols-2 gap-4">

// Three columns
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

// Responsive
<div className="grid grid-cols-1 lg:grid-cols-2">
```

---

## 🎯 Icons

### Icon Library: Lucide React

**Installation:**
```bash
npm install lucide-react
```

**Usage:**
```tsx
import { CheckCircle2, X, TrendingUp, Lock, Eye, EyeOff } from 'lucide-react'

<CheckCircle2 className="w-5 h-5 text-glow-primary" />
<Lock className="w-4 h-4" />
```

**Common Icons Used:**
- `CheckCircle2` - Success states
- `X` - Close buttons
- `TrendingUp` - Trading/growth
- `Clock` - Time/duration
- `Activity` - Live signals
- `ArrowLeft` - Back navigation
- `ArrowRight` - Forward/next
- `Lock` - Security
- `Eye` / `EyeOff` - Password visibility
- `Shield` - Security features
- `Users` - Community
- `Zap` - AI/power
- `LogOut` - Sign out

**Icon Sizes:**
```tsx
w-4 h-4    // 16px - Small
w-5 h-5    // 20px - Medium
w-6 h-6    // 24px - Large
```

---

## 🌌 Background Effects

### Animated Background

**Components:**
1. **Bar Chart** - 25 vertical bars with varied heights
2. **Professional Globe** - 3D rotating globe
3. **Bottom Gradient** - Green gradient overlay

**Usage:**
```tsx
<AnimatedBackground showGlobe={true} />
```

**Features:**
- Pure black background
- Green gradient bars (varying opacity)
- Floating 3D globe
- Bottom green glow
- Layered z-index system

### Aurora Bands (Not currently used)
```tsx
<AuroraBands />

// Features:
- Animated gradient bands
- Slow drift animation
- Multiple layers
- Subtle glow effect
```

### Noise Overlay
```tsx
<NoiseOverlay />

// Adds subtle texture to backgrounds
```

---

## 🔐 Authentication UI

### Sign In Page

**Layout:**
- Left panel: Brand + live signals
- Right panel: Sign-in form

**Features:**
- Email/password inputs
- Google OAuth button
- Remember device checkbox
- Forgot password link
- Create account link
- Live signal preview card

### Sign Up Page

**Layout:**
- Centered form with glass card
- Full-screen animated background

**Features:**
- First name + last name
- Email + password
- Confirm password
- Password strength meter
- Terms agreement checkbox
- Google OAuth option

### Forgot Password Page

**Features:**
- Email input
- Success state with confirmation
- Back to sign-in link
- Centered layout

### Reset Password Page

**Features:**
- New password input
- Confirm password input
- Password strength indicator
- Success state with redirect

### Dashboard

**Features:**
- Welcome message
- User greeting
- Stats cards (180+ instruments, 24/7 AI, LIVE signals)
- CTA buttons
- Sign out option

---

## 🛠️ Tech Stack

### Core Framework
- **Next.js 14** - React framework (App Router)
- **React 18** - UI library
- **TypeScript** - Type safety

### Styling
- **Tailwind CSS** - Utility-first CSS
- **Custom CSS Variables** - Design tokens
- **Clash Display** - Typography (Google Fonts)
- **JetBrains Mono** - Code font

### Animation
- **GSAP** - Intro animations
- **Framer Motion** - Page transitions & interactions

### UI Components
- **Lucide React** - Icon library
- **React Globe.gl** - 3D globe visualization
- **Three.js** - 3D rendering (for globe)

### Authentication
- **Supabase Auth** - Authentication backend
- **Google OAuth** - Social login
- **Resend** - Email service

### State & Forms
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

---

## 📱 Responsive Design

### Breakpoints
```tsx
sm:   // 640px
md:   // 768px
lg:   // 1024px
xl:   // 1280px
2xl:  // 1536px
```

### Mobile-First Approach
```tsx
// Mobile default
<div className="text-base">

// Tablet and up
<div className="text-base md:text-lg">

// Desktop
<div className="text-base md:text-lg lg:text-xl">
```

### Hidden/Visible
```tsx
// Hide on mobile, show on desktop
<div className="hidden lg:flex">

// Show on mobile, hide on desktop
<div className="flex lg:hidden">
```

---

## 🎨 Design Patterns

### Glass Morphism
```tsx
background: rgba(0,0,0,0.5)
backdrop-filter: blur(40px)
border: 1px solid rgba(255,255,255,0.06)
box-shadow: 0 8px 32px rgba(0,0,0,0.4)
```

### Glow Effects
```tsx
// Text glow
text-shadow: 0 0 20px rgba(34, 197, 94, 0.5)

// Box glow
box-shadow: 0 0 20px rgba(34, 197, 94, 0.15)

// Border glow
border: 1px solid rgba(34, 197, 94, 0.3)
```

### Gradient Text
```tsx
<span className="text-gradient">
  AI Precision
</span>

// CSS:
background: linear-gradient(135deg, #22c55e, #4ade80, #86efac)
-webkit-background-clip: text
-webkit-text-fill-color: transparent
```

### Hover States
```tsx
// Scale up
hover:scale-105

// Glow increase
hover:shadow-[0_6px_25px_rgba(34,197,94,0.4)]

// Border color change
hover:border-glow-primary/30

// Background change
hover:bg-glow-primary/12
```

---

## 📦 File Structure

```
frontend/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Landing page
│   ├── globals.css                # Global styles
│   ├── signin/page.tsx            # Sign in
│   ├── signup/page.tsx            # Sign up
│   ├── dashboard/page.tsx         # Dashboard
│   ├── forgot-password/page.tsx   # Forgot password
│   └── auth/
│       ├── callback/route.ts      # OAuth callback
│       └── reset-password/page.tsx
├── components/
│   ├── auth/
│   │   ├── GoogleButton.tsx       # Google OAuth
│   │   ├── InputField.tsx         # Text input
│   │   └── PasswordField.tsx      # Password input
│   ├── ui/
│   │   ├── Button.tsx             # Button component
│   │   └── Divider.tsx            # Divider
│   ├── background/
│   │   ├── AnimatedBackground.tsx # Main background
│   │   └── ProfessionalGlobe.tsx  # 3D globe
│   ├── intro/
│   │   └── Intro.tsx              # Intro animation
│   └── Logo.tsx                   # Logo component
├── lib/
│   └── supabase/
│       ├── client.ts              # Client-side Supabase
│       └── server.ts              # Server-side Supabase
├── public/
│   └── logo.jpeg                  # Logo image
├── tailwind.config.js             # Tailwind config
├── middleware.ts                  # Auth middleware
└── package.json                   # Dependencies
```

---

## 🚀 Quick Start

### Run Development Server
```bash
cd frontend
npm run dev
```

Server runs on: **http://localhost:5173**

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
RESEND_API_KEY=your_resend_api_key
```

---

## 📝 Design Guidelines

### Do's ✅
- Use pure black (#000000) for backgrounds
- Use neon green (#22c55e) for accents
- Apply glass morphism to cards
- Use Clash Display for all text
- Add smooth animations (0.3-0.8s duration)
- Use rounded corners (xl, 2xl, 3xl)
- Apply subtle glows to interactive elements
- Keep contrast high for readability

### Don'ts ❌
- Don't use bright colors (except green accent)
- Don't use heavy shadows (use glows instead)
- Don't mix multiple accent colors
- Don't use sharp corners on cards
- Don't use slow animations (>1s)
- Don't use small font sizes (<12px)
- Don't forget hover states
- Don't use low contrast text

---

## 🎯 Brand Identity

**Name:** AlphaSynth

**Tagline:** "Synthesizing Market Intelligence"

**Logo:**
- Image: `/logo.jpeg`
- Text: "Alpha" (green) + "Synth" (white)
- Font: Clash Display Bold

**Color Scheme:**
- Primary: Neon Green (#22c55e)
- Background: Pure Black (#000000)
- Text: White (#ffffff)

**Personality:**
- Professional
- Futuristic
- Intelligent
- Powerful
- Trustworthy
- Premium

---

## 📚 Additional Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [GSAP Docs](https://greensock.com/docs/)
- [Lucide Icons](https://lucide.dev/)
- [Supabase Docs](https://supabase.com/docs)

---

**Last Updated:** March 2026
**Version:** 1.0.0
**Design System:** AlphaSynth Premium
