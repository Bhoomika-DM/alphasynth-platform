# Google OAuth Setup Guide

## Error: "Unsupported provider: provider is not enabled"

This error means Google OAuth is not enabled in your Supabase project. Follow these steps to fix it.

## Step 1: Enable Google Provider in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/ugvmgaaaixehyzylxkcl
2. Navigate to **Authentication** → **Providers**
3. Find **Google** in the list
4. Click on **Google** to expand settings
5. **Enable** the Google provider (toggle it ON)

## Step 2: Configure Google OAuth in Supabase

In the Google provider settings, you need to add:

### Client ID
```
YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com
```

### Client Secret
```
YOUR_GOOGLE_CLIENT_SECRET
```

### Authorized Redirect URIs

For Supabase, the redirect URI should be:
```
https://ugvmgaaaixehyzylxkcl.supabase.co/auth/v1/callback
```

**Important:** This is NOT the same as your app's callback URL. Supabase handles the OAuth flow and then redirects to your app.

## Step 3: Update Google Cloud Console

You also need to configure the redirect URI in Google Cloud Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Click on your OAuth 2.0 Client ID
5. Under **Authorized redirect URIs**, add:
   ```
   https://ugvmgaaaixehyzylxkcl.supabase.co/auth/v1/callback
   ```
6. For local development, also add:
   ```
   http://localhost:3000/auth/callback
   ```
7. Click **Save**

## Step 4: Verify Your .env.local

Your `.env.local` file should have:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://ugvmgaaaixehyzylxkcl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Google OAuth (Optional - Supabase handles this)
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
```

**Note:** The Google credentials in `.env.local` are optional because Supabase manages the OAuth flow. The credentials need to be configured in Supabase Dashboard.

## Step 5: Restart Your Development Server

After making changes:

```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

## How Google OAuth Works with Supabase

1. User clicks "Sign in with Google"
2. App redirects to Supabase OAuth endpoint
3. Supabase redirects to Google login
4. User authenticates with Google
5. Google redirects back to Supabase callback: `https://ugvmgaaaixehyzylxkcl.supabase.co/auth/v1/callback`
6. Supabase processes the OAuth response
7. Supabase redirects to your app: `http://localhost:3000/auth/callback`
8. Your app handles the session and redirects to dashboard

## Testing Google OAuth

1. Go to `http://localhost:3000/signin`
2. Click "Continue with Google"
3. You should be redirected to Google login
4. After successful login, you'll be redirected back to your app
5. You should land on the dashboard

## Troubleshooting

### Error: "Unsupported provider"
- Make sure Google provider is **enabled** in Supabase Dashboard
- Check that you've saved the settings

### Error: "redirect_uri_mismatch"
- Verify the redirect URI in Google Cloud Console matches Supabase's callback URL
- Make sure you added: `https://ugvmgaaaixehyzylxkcl.supabase.co/auth/v1/callback`

### Error: "Invalid client"
- Double-check the Client ID and Client Secret in Supabase Dashboard
- Make sure there are no extra spaces or characters

### Still not working?
1. Clear browser cache and cookies
2. Try in incognito/private mode
3. Check Supabase logs in Dashboard → Logs → Auth
4. Verify your Google Cloud project is active and credentials are correct

## Current Configuration

- **Supabase Project**: ugvmgaaaixehyzylxkcl
- **App URL**: http://localhost:3000
- **Supabase Callback**: https://ugvmgaaaixehyzylxkcl.supabase.co/auth/v1/callback
- **App Callback**: http://localhost:3000/auth/callback
- **Google Client ID**: YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com

## Quick Checklist

- [ ] Google provider enabled in Supabase Dashboard
- [ ] Client ID added to Supabase
- [ ] Client Secret added to Supabase
- [ ] Supabase callback URL added to Google Cloud Console
- [ ] Settings saved in both Supabase and Google Cloud
- [ ] Development server restarted
- [ ] Tested in browser
