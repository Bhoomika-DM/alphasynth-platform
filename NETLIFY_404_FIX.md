# Fix "Page not found" Error on Netlify

## The Issue
Your site deployed successfully but shows "Page not found" because environment variables are missing.

## Quick Fix Steps

### 1. Add Environment Variables in Netlify

1. Go to: https://app.netlify.com/sites/alpsyn/settings/env
2. Click "Add a variable"
3. Add these THREE variables:

```
Variable 1:
Key: NEXT_PUBLIC_SUPABASE_URL
Value: [Your Supabase URL from .env.local]

Variable 2:
Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: [Your Supabase Anon Key from .env.local]

Variable 3:
Key: NEXT_PUBLIC_SITE_URL
Value: https://alpsyn.netlify.app
```

4. Click "Save" after adding all three

### 2. Get Your Supabase Values

Check your local `.env.local` file:
```bash
cat .env.local
```

Copy the values for:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Redeploy

After adding the environment variables, redeploy:
```bash
netlify deploy --prod
```

OR trigger a redeploy from Netlify dashboard:
- Go to: https://app.netlify.com/sites/alpsyn/deploys
- Click "Trigger deploy" → "Deploy site"

### 4. Wait 2-3 Minutes

The site will rebuild with the environment variables and should work!

## Alternative: Skip Environment Variables (Quick Test)

If you don't have Supabase set up yet, you can test without it:

1. Remove the Supabase client initialization temporarily
2. The dashboard should load (without auth features)
3. All NSE links will still work

## What Should Work After Fix

✅ Homepage redirects to dashboard
✅ Dashboard loads with market data
✅ All NSE links work (Market Statistics, IPO cards, View More buttons)
✅ Search results link to NSE pages
✅ Stock pages load
✅ Authentication (if Supabase is configured)

## Still Having Issues?

The 404 might also be a routing issue. Try accessing:
- https://alpsyn.netlify.app/dashboard (directly)

If that works, the issue is with the homepage redirect.

