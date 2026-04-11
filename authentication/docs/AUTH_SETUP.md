# Simple Authentication Setup

## How It Works

This is a simple, straightforward authentication system with no email confirmation required.

### User Flow:

1. **Sign Up** at `/signup`
   - Enter first name, last name, email, and password
   - Click "Create Account"
   - Automatically redirected to dashboard with success message

2. **Sign In** at `/signin`
   - Enter email and password
   - Click "Sign In to AlphaSynth"
   - Redirected to dashboard with success message

3. **Dashboard** at `/dashboard`
   - Shows welcome message
   - Displays success notification when you first sign in or sign up
   - Sign out button to log out

## Important: Disable Email Confirmation in Supabase

For this simple flow to work, you MUST disable email confirmation in Supabase:

1. Go to: https://supabase.com/dashboard/project/ugvmgaaaixehyzylxkcl
2. Navigate to **Authentication** → **Providers** → **Email**
3. **Disable** the "Confirm email" toggle
4. **Enable** the "Email" provider if it's not already enabled
5. Save changes

## Testing the Authentication

### Step 1: Sign Up
1. Go to `http://localhost:3000/signup`
2. Fill in the form:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Password: password123
   - Confirm Password: password123
   - Check the terms checkbox
3. Click "Create Account"
4. You'll be redirected to the dashboard with a success message

### Step 2: Sign Out
1. Click the "Sign Out" button in the dashboard
2. You'll be redirected to the signin page

### Step 3: Sign In
1. Go to `http://localhost:3000/signin`
2. Enter the same credentials:
   - Email: john@example.com
   - Password: password123
3. Click "Sign In to AlphaSynth"
4. You'll be redirected to the dashboard with a "Successfully signed in!" message

## Success Messages

- **After Sign Up**: "Account created successfully!"
- **After Sign In**: "Successfully signed in!"

These messages appear as a toast notification in the top-right corner of the dashboard and automatically disappear after 5 seconds.

## Troubleshooting

### "Email login are disabled" error
- Go to Supabase Dashboard → Authentication → Providers
- Enable the "Email" provider

### "Invalid login credentials" error
- Make sure you've signed up first with that email
- Check that you're using the correct password
- Passwords are case-sensitive

### Can't sign up
- Make sure email confirmation is disabled in Supabase
- Check that the email isn't already registered
- Password must be at least 8 characters

### Not redirecting to dashboard
- Check browser console for errors
- Verify Supabase credentials in `.env.local`
- Make sure middleware.ts is configured correctly

## Environment Variables

Your `.env.local` should have:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ugvmgaaaixehyzylxkcl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Routes

- `/` - Home page
- `/signup` - Create new account
- `/signin` - Sign in to existing account
- `/dashboard` - Protected dashboard (requires authentication)
- `/forgot-password` - Password reset request
- `/auth/reset-password` - Password reset confirmation
- `/auth/callback` - OAuth callback handler
