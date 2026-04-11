# Authentication Module

A complete, production-ready authentication system built with Next.js 14, Supabase, and TypeScript.

## Features

✅ **Email/Password Authentication**
- Sign up with email verification
- Sign in with remember me option
- Password reset flow
- Secure session management

✅ **OAuth Integration**
- Google Sign-In ready
- Easy to add more providers (GitHub, Facebook, etc.)

✅ **Security**
- Password strength validation
- Email verification
- Protected routes with middleware
- Secure cookie-based sessions
- CSRF protection

✅ **User Experience**
- Beautiful glassmorphism UI
- Smooth animations with Framer Motion
- Form validation with helpful error messages
- Loading states and success feedback
- Mobile responsive

✅ **Developer Experience**
- TypeScript for type safety
- Modular component structure
- Well-documented code
- Easy to customize
- Portable to other projects

## Quick Start

### 1. Install Dependencies
```bash
npm install @supabase/ssr @supabase/supabase-js framer-motion lucide-react
```

### 2. Set Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Configure Supabase
1. Create project at [supabase.com](https://supabase.com)
2. Enable Email authentication
3. Add callback URL: `http://localhost:3000/auth/callback`

### 4. Start Development
```bash
npm run dev
```

Visit:
- Sign Up: `http://localhost:3000/signup`
- Sign In: `http://localhost:3000/signin`

## File Structure

```
authentication/
├── app/                          # Auth pages
│   ├── signin/page.tsx          # Sign in page
│   ├── signup/page.tsx          # Sign up page
│   ├── forgot-password/page.tsx # Password reset request
│   ├── reset-password/page.tsx  # Password reset form
│   └── callback/route.ts        # OAuth callback handler
├── components/                   # Reusable components
│   ├── GoogleButton.tsx         # Google OAuth button
│   ├── InputField.tsx           # Text input component
│   └── PasswordField.tsx        # Password input with strength meter
├── lib/                         # Supabase clients
│   └── supabase/
│       ├── client.ts            # Client-side Supabase client
│       └── server.ts            # Server-side Supabase client
├── docs/                        # Documentation
│   ├── AUTH_SETUP.md           # Setup guide
│   ├── GOOGLE_AUTH_SETUP.md    # Google OAuth guide
│   └── RESEND_EMAIL_SETUP.md   # Email service guide
├── middleware.ts                # Route protection
├── CREDENTIALS.md               # Your credentials (gitignored)
├── .env.example                 # Environment template
├── README.md                    # This file
├── PORTABILITY_GUIDE.md        # How to move to another project
└── MIGRATION_CHECKLIST.md      # Step-by-step migration guide
```

## Usage

### Protecting Routes

The middleware automatically protects routes. Edit `middleware.ts`:

```typescript
// Protect dashboard route
if (request.nextUrl.pathname.startsWith('/dashboard')) {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}
```

### Getting Current User

```typescript
import { createClient } from '@/authentication/lib/supabase/client'

const supabase = createClient()
const { data: { user } } = await supabase.auth.getUser()
```

### Sign Out

```typescript
const supabase = createClient()
await supabase.auth.signOut()
router.push('/signin')
```

## Customization

### Change Brand Colors

Edit the pages to replace `#22c55e` (green) with your brand color:
- `signin/page.tsx`
- `signup/page.tsx`
- `forgot-password/page.tsx`
- `reset-password/page.tsx`

### Change Logo

Replace logo references in:
- `signin/page.tsx` - Line with `<img src="/logo.jpeg" />`
- `signup/page.tsx` - Line with `<img src="/logo.jpeg" />`

### Change Company Name

Find and replace "AlphaSynth" with your company name in all auth pages.

### Customize Email Templates

Go to Supabase Dashboard → Authentication → Email Templates

## Adding More OAuth Providers

### GitHub Example

1. Enable GitHub in Supabase Dashboard
2. Get GitHub OAuth credentials
3. Add to `GoogleButton.tsx` or create `GitHubButton.tsx`:

```typescript
const handleGitHubSignIn = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth client ID | No |

## Dependencies

```json
{
  "@supabase/ssr": "^0.0.10",
  "@supabase/supabase-js": "^2.38.4",
  "framer-motion": "^10.16.4",
  "lucide-react": "^0.294.0"
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security Best Practices

✅ **Implemented**
- Password hashing (handled by Supabase)
- Secure session cookies
- CSRF protection
- Email verification
- Rate limiting (Supabase built-in)

⚠️ **Recommended**
- Enable 2FA in Supabase
- Set up monitoring/logging
- Regular security audits
- Keep dependencies updated

## Troubleshooting

### "Cannot find module '@/authentication/...'"
Check `tsconfig.json` has path aliases configured.

### "Invalid redirect URL"
Add your callback URL to Supabase dashboard under Authentication → URL Configuration.

### Email not sending
Check Supabase logs and verify email provider is configured.

### Session not persisting
Ensure cookies are enabled and middleware is properly configured.

## Moving to Another Project

See `PORTABILITY_GUIDE.md` for detailed instructions on moving this module to a different project.

## Documentation

- [Setup Guide](docs/AUTH_SETUP.md)
- [Google OAuth Setup](docs/GOOGLE_AUTH_SETUP.md)
- [Email Service Setup](docs/RESEND_EMAIL_SETUP.md)
- [Portability Guide](PORTABILITY_GUIDE.md)
- [Migration Checklist](MIGRATION_CHECKLIST.md)

## Support

- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- Issues: Check Supabase logs and browser console

## License

This authentication module is part of your project and follows your project's license.

---

**Built with ❤️ using Next.js 14, Supabase, and TypeScript**
