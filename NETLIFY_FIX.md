# Fix "Page Not Found" Error on Netlify

## The Problem
Your site deployed but shows "Page not found" - this is a routing issue with Next.js on Netlify.

## The Solution

### Step 1: Push Updated Configuration
I've updated the `netlify.toml` file. Now push it to GitHub:

```bash
cd frontend
git add netlify.toml
git commit -m "Fix Netlify routing configuration"
git push origin main
```

### Step 2: Redeploy on Netlify
Netlify will automatically redeploy when you push. Wait 3-5 minutes.

OR manually trigger a redeploy:
1. Go to Netlify Dashboard
2. Click "Deploys" tab
3. Click "Trigger deploy" → "Deploy site"

### Step 3: Check Build Settings
Make sure these are set in Netlify:

**Site Settings → Build & Deploy → Build Settings:**
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `.next`

**Site Settings → Build & Deploy → Environment:**
Add the Next.js plugin if not already added:
- Go to "Plugins"
- Search for "@netlify/plugin-nextjs"
- Install it

### Step 4: Verify Environment Variables
Make sure you have these set:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
```

## Alternative: Use Netlify CLI (Faster)

If you want to test locally before deploying:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link your site
netlify link

# Deploy
netlify deploy --prod
```

## Still Not Working?

### Option A: Change Output Mode
Update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [],
  },
}

module.exports = nextConfig
```

Then push and redeploy.

### Option B: Use Vercel Instead
Next.js works perfectly on Vercel (made by the same team):
1. Go to https://vercel.com/
2. Import your GitHub repo
3. Set base directory to `frontend`
4. Deploy!

## Expected Result
After redeploying, your site should show the dashboard at:
`https://your-site.netlify.app/`

And the dashboard should be at:
`https://your-site.netlify.app/dashboard`

---

## Quick Fix Commands
```bash
# From your project root
cd frontend
git add .
git commit -m "Fix Netlify deployment"
git push origin main
# Wait for auto-deploy or trigger manually in Netlify dashboard
```

Your site should work after this! 🚀
