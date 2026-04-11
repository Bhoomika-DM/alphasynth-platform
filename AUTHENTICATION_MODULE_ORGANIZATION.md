# Authentication Module Organization Guide

This document outlines how to organize all authentication-related files into a separate `authentication` folder for better module separation.

## Current Structure (Before)

```
frontend/
├── app/
│   ├── signin/page.tsx
│   ├── signup/page.tsx
│   ├── forgot-password/page.tsx
│   ├── auth/
│   │   ├── callback/route.ts
│   │   └── reset-password/page.tsx
│   └── page.tsx (landing page with auth)
├── components/
│   └── auth/
│       ├── GoogleButton.tsx
│       ├── InputField.tsx
│       └── PasswordField.tsx
├── lib/
│   └── supabase/
│       ├── client.ts
│       └── server.ts
├── middleware.ts
├── .env
├── .env.local
├── AUTH_SETUP.md
├── GOOGLE_AUTH_SETUP.md
└── RESEND_EMAIL_SETUP.md
```

## Proposed Structure (After)

```
frontend/
├── authentication/
│   ├── README.md (overview of auth module)
│   ├── pages/
│   │   ├── signin.tsx (moved from app/signin/page.tsx)
│   │   ├── signup.tsx (moved from app/signup/page.tsx)
│   │   ├── forgot-password.tsx (moved from app/forgot-password/page.tsx)
│   │   ├── reset-password.tsx (moved from app/auth/reset-password/page.tsx)
│   │   ├── callback.ts (moved from app/auth/callback/route.ts)
│   │   └── landing.tsx (auth section from app/page.tsx)
│   ├── components/
│   │   ├── GoogleButton.tsx
│   │   ├── InputField.tsx
│   │   └── PasswordField.tsx
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── server.ts
│   ├── config/
│   │   ├── .env.example
│   │   └── supabase-config.ts
│   ├── middleware/
│   │   └── auth-middleware.ts (moved from middleware.ts)
│   └── docs/
│       ├── AUTH_SETUP.md
│       ├── GOOGLE_AUTH_SETUP.md
│       └── RESEND_EMAIL_SETUP.md
└── app/
    ├── signin/ (keep for routing, import from authentication/)
    ├── signup/ (keep for routing, import from authentication/)
    └── ... (other app pages)
```

## Files to Move

### 1. Auth Pages (5 files)
- `app/signin/page.tsx` → `authentication/pages/signin.tsx`
- `app/signup/page.tsx` → `authentication/pages/signup.tsx`
- `app/forgot-password/page.tsx` → `authentication/pages/forgot-password.tsx`
- `app/auth/reset-password/page.tsx` → `authentication/pages/reset-password.tsx`
- `app/auth/callback/route.ts` → `authentication/pages/callback.ts`

### 2. Auth Components (3 files)
- `components/auth/GoogleButton.tsx` → `authentication/components/GoogleButton.tsx`
- `components/auth/InputField.tsx` → `authentication/components/InputField.tsx`
- `components/auth/PasswordField.tsx` → `authentication/components/PasswordField.tsx`

### 3. Supabase Library (2 files)
- `lib/supabase/client.ts` → `authentication/lib/supabase/client.ts`
- `lib/supabase/server.ts` → `authentication/lib/supabase/server.ts`

### 4. Auth Documentation (3 files)
- `AUTH_SETUP.md` → `authentication/docs/AUTH_SETUP.md`
- `GOOGLE_AUTH_SETUP.md` → `authentication/docs/GOOGLE_AUTH_SETUP.md`
- `RESEND_EMAIL_SETUP.md` → `authentication/docs/RESEND_EMAIL_SETUP.md`

### 5. Middleware (1 file)
- `middleware.ts` → `authentication/middleware/auth-middleware.ts`

### 6. Environment Files (reference only, don't move)
- `.env` - Keep in root (contains all env vars)
- `.env.local` - Keep in root (local overrides)
- Create `authentication/config/.env.example` with auth-specific vars

## Import Path Updates Required

### Files that import auth components:
1. `app/page.tsx` (landing page)
   - Update: `@/components/auth/*` → `@/authentication/components/*`

2. `app/dashboard/page.tsx`
   - Update: `@/lib/supabase/client` → `@/authentication/lib/supabase/client`

3. `app/trading/page.tsx`
   - Update: `@/lib/supabase/client` → `@/authentication/lib/supabase/client`

4. All other pages using Supabase
   - Update: `@/lib/supabase/*` → `@/authentication/lib/supabase/*`

### Within authentication module:
- Update all relative imports to use `@/authentication/*` prefix

## Route Updates Required

Since Next.js uses file-based routing, you have two options:

### Option A: Keep app routes, import from authentication
```typescript
// app/signin/page.tsx
export { default } from '@/authentication/pages/signin'
```

### Option B: Update all navigation links
- `/signin` → `/authentication/signin`
- `/signup` → `/authentication/signup`
- `/forgot-password` → `/authentication/forgot-password`
- `/auth/reset-password` → `/authentication/reset-password`

**Recommendation:** Use Option A to avoid breaking existing links

## Benefits of This Organization

1. **Modularity**: All auth code in one place
2. **Maintainability**: Easy to find and update auth-related code
3. **Reusability**: Can extract as separate package if needed
4. **Security**: Clear separation of auth logic
5. **Documentation**: All auth docs together
6. **Testing**: Easier to test auth module independently

## Migration Steps

1. Create `frontend/authentication/` folder structure
2. Copy files to new locations (don't delete originals yet)
3. Update import paths in copied files
4. Update import paths in files that use auth
5. Test all auth flows (signin, signup, forgot password, reset, callback)
6. Test all pages that use Supabase
7. Verify middleware still works
8. Delete original files after confirming everything works
9. Update documentation and README

## Testing Checklist

- [ ] Sign in works
- [ ] Sign up works
- [ ] Forgot password works
- [ ] Reset password works
- [ ] Google OAuth works
- [ ] Auth callback works
- [ ] Protected routes work (middleware)
- [ ] Dashboard loads user data
- [ ] Trading page loads user data
- [ ] Sign out works
- [ ] All Supabase queries work

## Notes

- Keep `.env` and `.env.local` in root (Next.js requirement)
- Middleware must stay in root or be imported from root
- Supabase client/server can be moved but update all imports
- Consider creating `authentication/index.ts` to export all auth functions
- Add `authentication/README.md` with module documentation

## Example: authentication/index.ts

```typescript
// Central export file for authentication module
export { default as SignInPage } from './pages/signin'
export { default as SignUpPage } from './pages/signup'
export { default as ForgotPasswordPage } from './pages/forgot-password'
export { default as ResetPasswordPage } from './pages/reset-password'

export { default as GoogleButton } from './components/GoogleButton'
export { default as InputField } from './components/InputField'
export { default as PasswordField } from './components/PasswordField'

export { createClient } from './lib/supabase/client'
export { createClient as createServerClient } from './lib/supabase/server'
```

## Conclusion

This organization will make the authentication module self-contained and easier to maintain. All auth-related code, components, documentation, and configuration will be in one place.
