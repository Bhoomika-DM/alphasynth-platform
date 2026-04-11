# Authentication Module Migration Checklist

Use this checklist when moving the authentication module to a new project.

## Pre-Migration

- [ ] **Backup current project** (just in case!)
- [ ] **Document current Supabase credentials** (you'll need new ones)
- [ ] **List all custom modifications** you made to the auth module

## File Copy

- [ ] Copy entire `authentication/` folder to new project
- [ ] Copy `components/background/AnimatedBackground.tsx` (or replace with your own)
- [ ] Copy `components/ui/Button.tsx` (or replace with your own)
- [ ] Copy `components/ui/Divider.tsx` (or replace with your own)

## Dependencies

- [ ] Install `@supabase/ssr`
- [ ] Install `@supabase/supabase-js`
- [ ] Install `framer-motion`
- [ ] Install `lucide-react`
- [ ] Install `@supabase/auth-helpers-nextjs` (if using older Next.js)

Run:
```bash
npm install @supabase/ssr @supabase/supabase-js framer-motion lucide-react
```

## Supabase Setup

- [ ] Create new Supabase project at [supabase.com](https://supabase.com)
- [ ] Copy Project URL from Settings > API
- [ ] Copy Anon Key from Settings > API
- [ ] Enable Email authentication in Authentication > Providers
- [ ] (Optional) Enable Google OAuth in Authentication > Providers
- [ ] Set Site URL in Authentication > URL Configuration
- [ ] Add callback URLs:
  - Development: `http://localhost:3000/auth/callback`
  - Production: `https://yourdomain.com/auth/callback`

## Environment Variables

Create `.env.local` in project root:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional: Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
```

- [ ] Add `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] (Optional) Add `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- [ ] Add `.env.local` to `.gitignore`

## Configuration Files

### tsconfig.json
- [ ] Verify path aliases are set:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### tailwind.config.js
- [ ] Add authentication folder to content:
```javascript
content: [
  './authentication/**/*.{js,ts,jsx,tsx}',
  // ... other paths
]
```

- [ ] Add required colors:
```javascript
colors: {
  'glow-primary': '#22c55e',
  'glow-secondary': '#10b981',
  'text-muted': 'rgba(255, 255, 255, 0.6)',
  'text-secondary': 'rgba(255, 255, 255, 0.7)',
  'input-bg': 'rgba(255, 255, 255, 0.05)',
  'input-border': 'rgba(255, 255, 255, 0.1)',
}
```

- [ ] Add required fonts:
```javascript
fontFamily: {
  jakarta: ['Plus Jakarta Sans', 'sans-serif'],
  jetbrains: ['JetBrains Mono', 'monospace'],
}
```

### next.config.js (Optional)
- [ ] Add redirects if you want `/signin` instead of `/authentication/app/signin`

## Middleware Setup

- [ ] Copy `authentication/middleware.ts` to root `middleware.ts` (or merge with existing)
- [ ] Update protected routes list if needed
- [ ] Update redirect paths if needed

## Customization

- [ ] Update logo in signin/signup pages
- [ ] Update company name ("AlphaSynth" → your name)
- [ ] Update brand colors if needed
- [ ] Update font families if needed
- [ ] Customize email templates in Supabase dashboard

## Testing

### Local Testing
- [ ] Start dev server: `npm run dev`
- [ ] Test signup flow
  - [ ] Can create new account
  - [ ] Receives confirmation email (check Supabase logs)
  - [ ] Can verify email
- [ ] Test signin flow
  - [ ] Can sign in with email/password
  - [ ] Redirects to dashboard
  - [ ] Session persists on refresh
- [ ] Test password reset
  - [ ] Can request reset email
  - [ ] Receives reset email
  - [ ] Can set new password
- [ ] Test Google OAuth (if enabled)
  - [ ] Can sign in with Google
  - [ ] Creates user account
  - [ ] Redirects correctly
- [ ] Test protected routes
  - [ ] Dashboard requires authentication
  - [ ] Redirects to signin when not authenticated
- [ ] Test logout
  - [ ] Can sign out
  - [ ] Session cleared
  - [ ] Redirects to home/signin

### Production Testing
- [ ] Deploy to staging/production
- [ ] Update Supabase redirect URLs for production domain
- [ ] Test all flows in production environment
- [ ] Verify email delivery works
- [ ] Check SSL/HTTPS is working
- [ ] Test on mobile devices

## Security Checklist

- [ ] Environment variables are not committed to git
- [ ] Supabase RLS (Row Level Security) policies are set up
- [ ] Rate limiting is configured (Supabase has built-in protection)
- [ ] Email verification is required (optional but recommended)
- [ ] Password requirements are enforced (min 8 characters)
- [ ] HTTPS is enabled in production
- [ ] Callback URLs are restricted to your domains only

## Documentation

- [ ] Update `CREDENTIALS.md` with new project credentials
- [ ] Document any custom modifications
- [ ] Update team on new authentication setup
- [ ] Add authentication docs to project README

## Post-Migration

- [ ] Delete old authentication code from previous location (if applicable)
- [ ] Update any hardcoded references to old auth paths
- [ ] Test all user flows end-to-end
- [ ] Monitor Supabase logs for errors
- [ ] Set up error tracking (Sentry, LogRocket, etc.)

## Rollback Plan

If something goes wrong:
- [ ] Keep old Supabase project active during migration
- [ ] Have backup of old authentication code
- [ ] Document rollback steps
- [ ] Test rollback procedure

## Success Criteria

✅ Users can sign up
✅ Users can sign in
✅ Users can reset password
✅ Protected routes work correctly
✅ Sessions persist correctly
✅ Email delivery works
✅ No console errors
✅ Mobile responsive
✅ Production deployment successful

---

## Quick Command Reference

```bash
# Install dependencies
npm install @supabase/ssr @supabase/supabase-js framer-motion lucide-react

# Start dev server
npm run dev

# Build for production
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# Check for linting errors
npm run lint
```

## Need Help?

- Supabase Docs: https://supabase.com/docs/guides/auth
- Next.js Auth: https://nextjs.org/docs/authentication
- This project's docs: `authentication/docs/`
