# AlphaSynth - Investment Intelligence Platform

AlphaSynth is an investment intelligence platform built for India's equity professionals, providing NSE-certified data, deterministic calculations, and zero hallucinations.

## 🚀 Quick Start

All application code is in the `frontend/` folder:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:3000`

## 📁 Project Structure

```
AlphaSynth/
├── frontend/                          # 🎨 Complete Next.js Application
│   ├── app/                          # Next.js App Router pages
│   │   ├── page.tsx                  # Landing page
│   │   ├── dashboard/                # Dashboard
│   │   ├── trading/                  # Trading page
│   │   ├── signin/                   # Authentication
│   │   ├── signup/
│   │   └── api/                      # API routes (serverless)
│   ├── components/                   # React components
│   ├── hooks/                        # Custom React hooks
│   ├── lib/                          # Utilities & API clients
│   ├── public/                       # Static assets
│   ├── package.json                  # Dependencies
│   ├── next.config.js                # Next.js config
│   ├── tailwind.config.js            # Tailwind CSS config
│   ├── .env.local                    # Environment variables (credentials)
│   ├── supabase_migration_*.sql      # Database migrations
│   └── README.md                     # Detailed documentation
├── .git/                             # Git repository
├── .kiro/                            # Kiro AI configuration
└── README.md                         # This file
```

## 🔧 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: Custom components with Tabler Icons
- **Animation**: Framer Motion, GSAP
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel / Netlify

## 🎨 Features

- ✅ Modern landing page with AlphaSynth design system
- ✅ User authentication (individual & institutional)
- ✅ Onboarding flow with persona questions
- ✅ Trading dashboard with market data
- ✅ Stock analysis with Yahoo Finance integration
- ✅ Portfolio management
- ✅ Six-pillar analytical framework
- ✅ Responsive design for mobile and desktop

## 🔐 Environment Setup

1. Copy the environment template:
```bash
cd frontend
cp .env.example .env.local
```

2. Add your credentials to `frontend/.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## 🗄️ Database Setup

Run the migration files in your Supabase SQL editor:

1. `frontend/supabase_migration_user_profiles.sql`
2. `frontend/supabase_migration_add_institutional_fields.sql`

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Set root directory to `frontend`
4. Add environment variables
5. Deploy!

### Netlify

1. Push code to GitHub
2. Import project in Netlify
3. Set base directory to `frontend`
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Add environment variables
7. Deploy!

## 📖 Documentation

For detailed documentation, see [frontend/README.md](frontend/README.md)

## 🎨 Design System

AlphaSynth uses a professional color palette:

- **Navy** (#1B2A4A) - Primary
- **Teal** (#0D7C8C) - Accent
- **Gold** (#B8860B) - Highlights
- **Green** (#1A6B3A) - Success
- **Red** (#8C1A1A) - Danger

## 📝 License

Proprietary - Intellectus AI Labs Pvt. Ltd.

## 📧 Contact

For questions or support, contact the development team.

---

**Note**: This is a self-contained Next.js application. All code, configuration, and assets are in the `frontend/` folder.
