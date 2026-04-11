# Deploy to Netlify via GitHub (Recommended)

## Why GitHub Deployment?

Netlify CLI doesn't properly support Next.js serverless functions. GitHub deployment is the official recommended method and will work perfectly.

## Quick Setup (5 minutes)

### 1. Initialize Git (if not already done)

```bash
cd D:\IntellectAlphaSynth
git init
git add .
git commit -m "Initial commit - AlphaSynth with NSE integration"
```

### 2. Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `alphasynth-dashboard`
3. Keep it Private
4. Don't initialize with README (we already have code)
5. Click "Create repository"

### 3. Push to GitHub

Copy the commands from GitHub (they'll look like this):

```bash
git remote add origin https://github.com/YOUR_USERNAME/alphasynth-dashboard.git
git branch -M main
git push -u origin main
```

### 4. Connect to Netlify

1. Go to: https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub"
4. Select your `alphasynth-dashboard` repository
5. Netlify will auto-detect Next.js settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

### 5. Add Environment Variables

In Netlify Dashboard → Site settings → Environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://ugvmgaaaixehyzylxkcl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVndm1nYWFhaXhlaHl6eWx4a2NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4NzUzMzcsImV4cCI6MjA4NTQ1MTMzN30.jyUjX_2huJxhTzKMCmKWoFIk0NIk369EzSJwOHrfFqI
NEXT_PUBLIC_SITE_URL=https://alpsyn.netlify.app
```

### 6. Trigger Redeploy

After adding env vars:
- Go to: Deploys tab
- Click "Trigger deploy" → "Deploy site"

## Done! 🎉

Your site will be live at: `https://alpsyn.netlify.app`

All features will work:
- ✅ Homepage redirects to dashboard
- ✅ Dashboard with NSE integration
- ✅ All NSE links (Market Statistics, IPO cards, View More buttons)
- ✅ Search results link to NSE
- ✅ Stock pages with dynamic routes
- ✅ Authentication (if configured)

## Future Updates

Just push to GitHub:

```bash
git add .
git commit -m "Update description"
git push
```

Netlify auto-deploys on every push!

## Alternative: Keep Site Private

If you don't want to use GitHub, you can use Vercel instead (also supports CLI deployment better):

```bash
npm install -g vercel
vercel login
vercel --prod
```

Vercel is made by the Next.js team and works perfectly with CLI deployment.

