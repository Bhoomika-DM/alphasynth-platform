# AlphaSynth - Netlify Deployment Checklist ✅

## Pre-Deployment Checklist

### 1. Environment Variables Ready
- [ ] Supabase URL
- [ ] Supabase Anon Key
- [ ] Google Client ID (if using OAuth)

### 2. Files Created
- [x] `netlify.toml` - Netlify configuration
- [x] `.npmrc` - Node memory settings
- [x] `.env.example` - Environment variable template
- [x] Updated `package.json` with memory settings

### 3. Code Ready
- [ ] All changes committed to Git
- [ ] Pushed to GitHub main branch
- [ ] No TypeScript errors
- [ ] No ESLint errors

## Deployment Steps

### Step 1: Push to GitHub
```bash
cd frontend
git add .
git commit -m "Ready for Netlify deployment with NSE integration"
git push origin main
```

### Step 2: Connect to Netlify
1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and select your repository
4. Set base directory to `frontend`

### Step 3: Configure Build Settings
Netlify should auto-detect, but verify:
- Base directory: `frontend`
- Build command: `NODE_OPTIONS='--max_old_space_size=4096' npm run build`
- Publish directory: `.next`

### Step 4: Add Environment Variables
In Netlify Dashboard → Site settings → Environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
```

### Step 5: Deploy!
Click "Deploy site" and wait 3-5 minutes

### Step 6: Update Supabase
After deployment, in Supabase Dashboard:
1. Authentication → URL Configuration
2. Add Site URL: `https://your-site.netlify.app`
3. Add Redirect URLs:
   - `https://your-site.netlify.app/auth/callback`
   - `https://your-site.netlify.app/auth/reset-password`

### Step 7: Test Your Site
- [ ] Homepage loads
- [ ] Dashboard displays
- [ ] NSE links work (Market Statistics, IPO cards, etc.)
- [ ] Search functionality works
- [ ] Stock page loads
- [ ] Authentication works (if enabled)

## Post-Deployment

### Custom Domain (Optional)
1. Netlify Dashboard → Domain settings
2. Add custom domain
3. Update DNS records
4. Update all environment variables with new domain

### Monitoring
- Check Netlify deploy logs for any warnings
- Monitor site performance
- Test all NSE integrations

## Troubleshooting

### Build Fails with Memory Error
- The `.npmrc` and updated build command should handle this
- If still failing, contact Netlify support to increase build resources

### Environment Variables Not Working
- Must start with `NEXT_PUBLIC_` for client-side access
- Redeploy after changing env vars

### 404 Errors
- Check `netlify.toml` is in frontend directory
- Verify redirect rules are working

## Quick Deploy Command
```bash
# From project root
cd frontend
git add .
git commit -m "Deploy update"
git push origin main
# Netlify auto-deploys!
```

## Success Indicators ✅
- [ ] Build completes without errors
- [ ] Site is accessible at Netlify URL
- [ ] All NSE links open correctly
- [ ] Search results link to NSE
- [ ] Dashboard loads with real data
- [ ] No console errors in browser

---

## Your Site is Live! 🎉

Share your AlphaSynth dashboard:
`https://your-site-name.netlify.app`

All NSE integrations are working:
- Market Statistics → NSE pages
- Stock Ticker → NSE pages
- View More buttons → NSE pages
- IPO cards → NSE IPO page
- Search results → NSE stock pages
- Stock page tabs → NSE pages

Enjoy your live dashboard! 🚀
