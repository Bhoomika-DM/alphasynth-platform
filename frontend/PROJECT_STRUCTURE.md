# AlphaSynth Project Structure

## ✅ Complete Self-Contained Application

Everything you need is in this `frontend/` folder!

## 📁 Folder Structure

```
frontend/
├── 📱 SOURCE CODE
│   ├── app/                          # Next.js pages (App Router)
│   │   ├── page.tsx                  # Landing page
│   │   ├── layout.tsx                # Root layout
│   │   ├── globals.css               # Global styles
│   │   ├── dashboard/                # Dashboard page
│   │   ├── trading/                  # Trading page
│   │   ├── signin/                   # Sign in page
│   │   ├── signup/                   # Sign up page
│   │   ├── profile/                  # User profile
│   │   ├── stock/[symbol]/           # Stock detail pages
│   │   ├── backtest/                 # Backtesting
│   │   ├── cohort/                   # Cohort analysis
│   │   ├── portfolio-report/         # Portfolio reports
│   │   ├── portfolio-results/        # Portfolio results
│   │   ├── stock-analysis/           # Stock analysis
│   │   ├── forgot-password/          # Password reset
│   │   └── api/                      # API routes (serverless)
│   │       ├── market/               # Market data endpoints
│   │       └── yahoo-proxy/          # Yahoo Finance proxy
│   │
│   ├── components/                   # React components
│   │   ├── AlphaSynthLandingPage.tsx # Main landing page
│   │   ├── AlphaSynthHero.tsx        # Hero section
│   │   ├── AlphaSynthScrollSection.tsx
│   │   ├── dashboard/                # Dashboard components
│   │   ├── onboarding/               # Onboarding modal
│   │   ├── charts/                   # Chart components
│   │   ├── sentiment/                # Sentiment analysis
│   │   ├── portfolio/                # Portfolio components
│   │   ├── intro/                    # Intro video
│   │   ├── background/               # Background effects
│   │   └── ui/                       # UI components
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useYahooFinance.ts        # Yahoo Finance data
│   │   └── ...
│   │
│   ├── lib/                          # Utilities & API clients
│   │   ├── supabase/                 # Supabase client (empty - uses auth module)
│   │   ├── nseApi.ts                 # NSE API client (not used)
│   │   ├── nseLinks.ts               # NSE links mapping
│   │   └── yahooFinance.ts           # Yahoo Finance client
│   │
│   ├── public/                       # Static files
│   │   └── logo.jpeg                 # AlphaSynth logo
│   │
│   └── assets/                       # Images and media
│       └── logo.jpeg
│
├── ⚙️ CONFIGURATION
│   ├── package.json                  # Dependencies & scripts
│   ├── package-lock.json             # Locked dependencies
│   ├── next.config.js                # Next.js configuration
│   ├── tailwind.config.js            # Tailwind CSS config
│   ├── postcss.config.js             # PostCSS config
│   ├── tsconfig.json                 # TypeScript config
│   ├── middleware.ts                 # Next.js middleware (auth)
│   ├── next-env.d.ts                 # Next.js types
│   └── .npmrc                        # NPM configuration
│
├── 🔐 CREDENTIALS
│   ├── .env.local                    # ⭐ MAIN CREDENTIALS FILE
│   ├── .env.example                  # Template for credentials
│   └── .env                          # Additional env vars
│
├── 🗄️ DATABASE
│   ├── supabase_migration_user_profiles.sql
│   └── supabase_migration_add_institutional_fields.sql
│
├── 🚀 DEPLOYMENT
│   ├── netlify.toml                  # Netlify configuration
│   ├── vercel.json                   # Vercel configuration
│   ├── .netlify/                     # Netlify build artifacts
│   └── .vercel/                      # Vercel build artifacts
│
├── 🔨 BUILD OUTPUT
│   ├── .next/                        # Next.js build (generated)
│   └── node_modules/                 # Dependencies (generated)
│
├── 📝 DOCUMENTATION
│   ├── README.md                     # Main documentation
│   └── PROJECT_STRUCTURE.md          # This file
│
└── 🔧 OTHER
    └── .gitignore                    # Git ignore rules
```

## 🔑 Key Files

### Essential Configuration
- **package.json** - All dependencies and scripts
- **next.config.js** - Next.js settings
- **tailwind.config.js** - Design system colors
- **.env.local** - ⭐ **ALL CREDENTIALS HERE**

### Main Entry Points
- **app/page.tsx** - Landing page
- **app/layout.tsx** - Root layout with fonts
- **app/globals.css** - Global styles & design system

### Authentication
- **middleware.ts** - Auth middleware (protects routes)
- **app/signin/page.tsx** - Sign in page
- **app/signup/page.tsx** - Sign up page

### Core Components
- **components/AlphaSynthLandingPage.tsx** - Main landing page
- **components/dashboard/** - Dashboard components
- **components/onboarding/** - Onboarding flow

## 🚀 Quick Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🔐 Credentials Location

**ALL CREDENTIALS ARE IN:** `frontend/.env.local`

This file contains:
- Supabase URL & Keys
- Google OAuth credentials
- Resend API key for emails

## 🗄️ Database Setup

Run these SQL files in your Supabase SQL editor:
1. `supabase_migration_user_profiles.sql`
2. `supabase_migration_add_institutional_fields.sql`

## 📦 What's NOT Needed

The following were removed as they're not used:
- ❌ `backend/` folder - Not used (Next.js API routes instead)
- ❌ Root `.env` files - Duplicates (use frontend/.env.local)
- ❌ Temp files - Cleaned up

## ✅ Self-Contained

This `frontend/` folder is **100% self-contained**. You can:
- Copy it anywhere
- Deploy it independently
- Run it without any external dependencies (except Supabase)

## 🎯 Next Steps

1. **Install dependencies**: `npm install`
2. **Check credentials**: Verify `frontend/.env.local` has all keys
3. **Run database migrations**: Execute SQL files in Supabase
4. **Start dev server**: `npm run dev`
5. **Open browser**: `http://localhost:3000`

---

**Everything you need is here!** 🎉
