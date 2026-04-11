# Authentication Module Portability Guide

## Can I move this to another project?

**YES!** This authentication module is designed to be portable, but you need to set up a few things in the new project.

## What You Need to Copy

### 1. The Entire Authentication Folder
```
frontend/authentication/
├── app/                    # Auth pages (signin, signup, etc.)
├── components/             # Auth UI components
├── lib/                    # Supabase client/server setup
├── docs/                   # Setup documentation
├── middleware.ts           # Route protection
├── CREDENTIALS.md          # Your credentials (update for new project)
└── .env.example           # Environment variables template
```

### 2. Dependencies Required
Add these to your `package.json`:
```json
{
  "dependencies": {
    "@supabase/ssr": "^0.0.10",
    "@supabase/supabase-js": "^2.38.4",
    "framer-motion": "^10.16.4",
    "lucide-react": "^0.294.0"
  }
}
```

### 3. Environment Variables
Create `.env.local` in your new project root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# For Google OAuth (optional)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

## Setup Steps for New Project

### Step 1: Copy Files
```bash
# Copy the entire authentication folder
cp -r frontend/authentication /path/to/new-project/frontend/authentication
```

### Step 2: Install Dependencies
```bash
cd /path/to/new-project/frontend
npm install @supabase/ssr @supabase/supabase-js framer-motion lucide-react
```

### Step 3: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your project URL and anon key from Settings > API
4. Add them to `.env.local`

### Step 4: Configure Supabase Authentication
In your Supabase dashboard:
1. Go to Authentication > Providers
2. Enable Email provider
3. (Optional) Enable Google OAuth and configure redirect URLs
4. Set Site URL to your app URL (e.g., `http://localhost:3000`)
5. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://yourdomain.com/auth/callback` (production)

### Step 5: Update Next.js Config
Add to `next.config.js`:
```javascript
module.exports = {
  // ... other config
  async redirects() {
    return [
      {
        source: '/signin',
        destination: '/authentication/app/signin',
        permanent: false,
      },
      {
        source: '/signup',
        destination: '/authentication/app/signup',
        permanent: false,
      },
    ]
  },
}
```

### Step 6: Copy Middleware (if not using authentication folder structure)
If you want routes at root level (`/signin` instead of `/authentication/app/signin`):

1. Copy `authentication/middleware.ts` to root `middleware.ts`
2. Update the matcher config as needed

### Step 7: Copy Required UI Components
The auth module depends on these shared components:
```
components/
├── background/AnimatedBackground.tsx
├── ui/Button.tsx
└── ui/Divider.tsx
```

Copy these to your new project or replace with your own components.

### Step 8: Update Tailwind Config
Ensure your `tailwind.config.js` includes:
```javascript
module.exports = {
  content: [
    './authentication/**/*.{js,ts,jsx,tsx}',
    // ... other paths
  ],
  theme: {
    extend: {
      colors: {
        'glow-primary': '#22c55e',
        'glow-secondary': '#10b981',
        'text-muted': 'rgba(255, 255, 255, 0.6)',
        'text-secondary': 'rgba(255, 255, 255, 0.7)',
        'input-bg': 'rgba(255, 255, 255, 0.05)',
        'input-border': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        jetbrains: ['JetBrains Mono', 'monospace'],
      },
    },
  },
}
```

## What's Portable vs What's Not

### ✅ Fully Portable (No Changes Needed)
- All authentication logic
- Supabase client/server setup
- Form validation
- Password strength checking
- Email verification flow
- Password reset flow
- Session management

### ⚠️ Needs Customization
- **Branding**: Update logo, colors, company name
- **Styling**: Adjust to match your design system
- **Routes**: Update redirect URLs in middleware
- **Email templates**: Customize in Supabase dashboard
- **Error messages**: Localize or customize text

### ❌ Project-Specific (Won't Work Without Changes)
- **AnimatedBackground**: Uses your specific background component
- **Button/Divider**: Uses your UI component library
- **Font families**: Uses Plus Jakarta Sans and JetBrains Mono
- **Color scheme**: Uses green (#22c55e) as primary color

## Quick Start Checklist

- [ ] Copy `authentication/` folder to new project
- [ ] Install dependencies (`@supabase/ssr`, `@supabase/supabase-js`, etc.)
- [ ] Create Supabase project and get credentials
- [ ] Add environment variables to `.env.local`
- [ ] Configure Supabase authentication providers
- [ ] Copy or replace UI components (Button, Divider, AnimatedBackground)
- [ ] Update Tailwind config with required colors and fonts
- [ ] Test signup flow
- [ ] Test signin flow
- [ ] Test password reset flow
- [ ] Test Google OAuth (if enabled)

## Common Issues

### Issue: "Cannot find module '@/authentication/...'"
**Solution**: Ensure your `tsconfig.json` has path aliases:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Issue: "Supabase client not initialized"
**Solution**: Check that environment variables are set correctly in `.env.local`

### Issue: "Redirect URL not allowed"
**Solution**: Add your callback URL to Supabase dashboard under Authentication > URL Configuration

### Issue: Styling looks broken
**Solution**: Ensure Tailwind config includes the authentication folder in content paths

## Production Deployment

Before deploying to production:

1. **Update environment variables** on your hosting platform
2. **Add production URLs** to Supabase redirect allowlist
3. **Configure email templates** in Supabase dashboard
4. **Enable 2FA** (optional but recommended)
5. **Set up rate limiting** to prevent abuse
6. **Test all flows** in production environment

## Support

For detailed setup instructions, see:
- `docs/AUTH_SETUP.md` - Basic authentication setup
- `docs/GOOGLE_AUTH_SETUP.md` - Google OAuth configuration
- `docs/RESEND_EMAIL_SETUP.md` - Email service setup
- `CREDENTIALS.md` - Your current credentials (update for new project)

## Summary

**Yes, this auth module is portable!** Just copy the folder, install dependencies, create a new Supabase project, and update the environment variables. The core authentication logic is completely reusable across projects.
