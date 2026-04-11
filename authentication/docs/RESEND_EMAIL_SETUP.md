# Resend Email Setup for Supabase

## Overview
Configure Resend as your email provider for Supabase authentication emails (password reset, email verification, etc.)

## Your Resend API Key
```
re_UzjYobuG_Nr2z9D4NFg4YNMZd8dTYRnmc
```

## Step 1: Configure Resend SMTP in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/ugvmgaaaixehyzylxkcl
2. Navigate to **Project Settings** → **Auth** → **SMTP Settings**
3. Enable **Custom SMTP**
4. Enter the following details:

### SMTP Configuration

**Sender email:**
```
noreply@yourdomain.com
```
(Replace with your verified domain in Resend)

**Sender name:**
```
AlphaSynth
```

**Host:**
```
smtp.resend.com
```

**Port:**
```
465
```
(Use 465 for SSL or 587 for TLS)

**Username:**
```
resend
```

**Password (API Key):**
```
re_UzjYobuG_Nr2z9D4NFg4YNMZd8dTYRnmc
```

**Enable SSL:** ✅ Yes (if using port 465)

5. Click **Save**

## Step 2: Verify Domain in Resend

Before emails will work, you need to verify your domain in Resend:

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Add your domain
3. Add the DNS records Resend provides to your domain registrar
4. Wait for verification (usually takes a few minutes)

## Step 3: Test Email Sending

After configuration:

1. Go to `/forgot-password` on your app
2. Enter an email address
3. Click "Send Reset Link"
4. Check if the email arrives

## Email Templates

Supabase uses these email templates (you can customize them in Supabase Dashboard):

### Password Reset Email
- **Subject:** Reset Your Password
- **Template:** Project Settings → Auth → Email Templates → Reset Password

### Email Verification
- **Subject:** Confirm Your Email
- **Template:** Project Settings → Auth → Email Templates → Confirm Signup

### Magic Link
- **Subject:** Your Magic Link
- **Template:** Project Settings → Auth → Email Templates → Magic Link

## Customizing Email Templates

1. Go to Supabase Dashboard → **Project Settings** → **Auth** → **Email Templates**
2. Select the template you want to customize
3. Edit the HTML/text content
4. Use variables like:
   - `{{ .ConfirmationURL }}` - Reset/confirmation link
   - `{{ .Token }}` - OTP token
   - `{{ .SiteURL }}` - Your site URL
5. Click **Save**

## Current Configuration

- **App URL:** http://localhost:3000
- **Password Reset Redirect:** http://localhost:3000/auth/reset-password
- **Email Confirmation Redirect:** http://localhost:3000/auth/callback

## Troubleshooting

### Emails not sending
- Verify domain is confirmed in Resend
- Check SMTP credentials are correct
- Ensure sender email matches verified domain
- Check Supabase logs: Dashboard → Logs → Auth

### Emails going to spam
- Add SPF, DKIM, and DMARC records (provided by Resend)
- Use a verified domain (not @gmail.com)
- Warm up your domain by sending gradually

### Reset link not working
- Check redirect URL is correct
- Verify auth callback route exists
- Check browser console for errors

## Alternative: Use Resend API Directly

If you want more control, you can use Resend API directly instead of SMTP:

```bash
npm install resend
```

Then create an API route:

```typescript
// app/api/send-reset-email/route.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { email, resetLink } = await request.json()
  
  const { data, error } = await resend.emails.send({
    from: 'AlphaSynth <noreply@yourdomain.com>',
    to: email,
    subject: 'Reset Your Password',
    html: `<p>Click here to reset: <a href="${resetLink}">${resetLink}</a></p>`
  })
  
  return Response.json({ data, error })
}
```

## Production Checklist

- [ ] Domain verified in Resend
- [ ] SMTP configured in Supabase
- [ ] Email templates customized
- [ ] Test emails sending successfully
- [ ] SPF/DKIM/DMARC records added
- [ ] Sender email matches verified domain
- [ ] Production URLs updated in Supabase

## Support

- **Resend Docs:** https://resend.com/docs
- **Supabase SMTP Docs:** https://supabase.com/docs/guides/auth/auth-smtp
- **Your Resend Dashboard:** https://resend.com/emails
