# AlphaSynth - Netlify Deployment Guide

## Prerequisites
- GitHub account
- Netlify account (free tier works)
- Supabase project set up
- Your code pushed to a GitHub repository

## Step 1: Prepare Your Repository

1. Make sure all your code is committed and pushed to GitHub:
```bash
git add .
git commit -m "Ready for Netlify deployment"
git push origin main
```

## Step 2: Connect to Netlify

1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize Netlify
4. Select your repository

## Step 3: Configure Build Settings

Netlify should auto-detect Next.js. Verify these settings:

- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: 18

## Step 4: Set Environment Variables

In Netlify dashboard, go to:
**Site settings** → **Environment variables** → **Add a variable**

Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://your-site-name.netlify.app
```

### Optional (for Google OAuth):
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

## Step 5: Deploy

1. Click "Deploy site"
2. Wait for the build to complete (usually 2-5 minutes)
3. Your site will be live at `https://your-site-name.netlify.app`

## Step 6: Update Supabase Configuration

After deployment, update your Supabase project:

1. Go to your Supabase dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Add your Netlify URL to:
   - **Site URL**: `https://your-site-name.netlify.app`
   - **Redirect URLs**: 
     - `https://your-site-name.netlify.app/auth/callback`
     - `https://your-site-name.netlify.app/auth/reset-password`

## Step 7: Update Google OAuth (if using)

If you're using Google Sign-In:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to your OAuth 2.0 Client
3. Add to **Authorized JavaScript origins**:
   - `https://your-site-name.netlify.app`
4. Add to **Authorized redirect URIs**:
   - `https://your-site-name.netlify.app/auth/callback`

## Step 8: Custom Domain (Optional)

To use a custom domain:

1. In Netlify: **Domain settings** → **Add custom domain**
2. Follow the DNS configuration instructions
3. Update all environment variables and OAuth settings with your custom domain

## Troubleshooting

### Build Fails
- Check the build logs in Netlify
- Verify all environment variables are set correctly
- Make sure `netlify.toml` is in the frontend directory

### Authentication Issues
- Verify Supabase URLs are correct
- Check that redirect URLs are properly configured in Supabase
- Ensure `NEXT_PUBLIC_SITE_URL` matches your actual Netlify URL

### 404 Errors
- The `netlify.toml` file handles redirects for Next.js routing
- If issues persist, check the redirect rules in Netlify dashboard

### Environment Variables Not Working
- Environment variables must start with `NEXT_PUBLIC_` to be accessible in the browser
- After changing env vars, trigger a new deploy

## Continuous Deployment

Netlify automatically deploys when you push to your main branch:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Your site will automatically rebuild and deploy!

## Performance Tips

1. **Enable Netlify CDN**: Automatically enabled
2. **Asset Optimization**: Netlify automatically optimizes images
3. **Caching**: Configured in `netlify.toml` for optimal performance

## Monitoring

- View deployment logs: Netlify Dashboard → Deploys
- Check analytics: Netlify Dashboard → Analytics
- Monitor errors: Check browser console and Netlify logs

## Cost

- Netlify Free Tier includes:
  - 100GB bandwidth/month
  - 300 build minutes/month
  - Automatic HTTPS
  - Continuous deployment

Perfect for your AlphaSynth dashboard!

## Support

- Netlify Docs: https://docs.netlify.com/
- Netlify Community: https://answers.netlify.com/
- Next.js on Netlify: https://docs.netlify.com/frameworks/next-js/

---

Your AlphaSynth dashboard is now live! 🚀
