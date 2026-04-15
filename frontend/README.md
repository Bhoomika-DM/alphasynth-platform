# AlphaSynth Frontend

This folder contains the Next.js frontend application for AlphaSynth.

## Structure

```
frontend/
├── app/                    # Next.js 13+ App Router pages
│   ├── page.tsx           # Landing page
│   ├── dashboard/         # Dashboard page
│   ├── trading/           # Trading page
│   ├── signin/            # Sign in page
│   ├── signup/            # Sign up page
│   ├── profile/           # User profile
│   ├── stock/             # Stock analysis pages
│   └── ...
├── components/            # React components
│   ├── AlphaSynthLandingPage.tsx
│   ├── AlphaSynthHero.tsx
│   ├── dashboard/
│   ├── onboarding/
│   └── ...
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── public/                # Static assets
├── assets/                # Images and media
├── .next/                 # Next.js build output (generated)
├── node_modules/          # Dependencies (generated)
├── middleware.ts          # Next.js middleware
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts

## Getting Started

### Install Dependencies
```bash
cd frontend
npm install
```

### Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Tabler Icons
- **Animation**: Framer Motion, GSAP
- **Authentication**: Supabase Auth
- **State Management**: React Context + Hooks

## Design System

The app uses the AlphaSynth design system with the following color palette:

- **Navy**: #1B2A4A (Primary)
- **Teal**: #0D7C8C (Accent)
- **Gold**: #B8860B (Highlights)
- **Green**: #1A6B3A (Success)
- **Red**: #8C1A1A (Danger)
- **Amber**: #B45309 (Warning)

## Key Features

- Landing page with hero, trust bar, six pillars, and CTA sections
- User authentication (sign up, sign in, password reset)
- Onboarding flow for individual and institutional users
- Trading dashboard with market data
- Stock analysis with Yahoo Finance integration
- Portfolio management
- Responsive design for mobile and desktop
