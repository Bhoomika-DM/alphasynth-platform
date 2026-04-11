# Netlify CLI Deployment Guide

## Quick Deploy Commands

Run these commands in order:

```bash
# 1. Install Netlify CLI globally (one-time setup)
npm install -g netlify-cli

# 2. Login to Netlify (opens browser)
netlify login

# 3. Navigate to frontend folder
cd D:\IntellectAlphaSynth\frontend

# 4. Deploy to production
netlify deploy --prod
```

## What Happens During Deploy

### When you run `netlify deploy --prod`:

1. **Site Selection Prompt**
   - Choose: "Create & configure a new site"
   - Enter a site name (e.g., "alphasynth-dashboard")
   - Choose your team

2. **Publish Directory Prompt**
   - Enter: `.next`
   - This is where your built files are located

3. **Upload Process**
   - Netlify uploads all files from `.next` folder
   - Takes 1-3 minutes depending on connection
   - Shows progress bar

4. **Success!**
   - You'll get a live URL: `https://your-site-name.netlify.app`
   - Site is immediately accessible

## After Deployment

### Add Environment Variables

1. Go to: https://app.netlify.com
2. Select your site
3. Go to: Site settings → Environment variables
4. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://your-site-name.netlify.app
```

5. Click "Save"
6. Redeploy: `netlify deploy --prod` (to apply env vars)

### Update Supabase Redirect URLs

In Supabase Dashboard:
1. Authentication → URL Configuration
2. Add Site URL: `https://your-site-name.netlify.app`
3. Add Redirect URLs:
   - `https://your-site-name.netlify.app/auth/callback`
   - `https://your-site-name.netlify.app/auth/reset-password`

## Verify Deployment

Test these features:
- ✅ Homepage redirects to dashboard
- ✅ Dashboard loads with market data
- ✅ NSE links work (Market Statistics, IPO cards, View More buttons)
- ✅ Search results link to NSE pages
- ✅ Stock pages load and tabs link to NSE

## Future Updates

To update your site:

```bash
cd D:\IntellectAlphaSynth\frontend
npm run build
netlify deploy --prod
```

That's it! No Git required.

## Troubleshooting

### "Command not found: netlify"
- Restart PowerShell after installing netlify-cli
- Or use: `npx netlify-cli deploy --prod`

### "No site selected"
- Run: `netlify link`
- Choose your site from the list

### Build files not found
- Make sure you ran `npm run build` first
- Check that `.next` folder exists

## Your Site Will Be Live! 🎉

URL format: `https://[your-site-name].netlify.app`

All features working:
- Dashboard with NSE integration
- Search linking to NSE
- Stock pages with NSE tabs
- All clickable cards and buttons
- Public access (no login required)

