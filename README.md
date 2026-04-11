# AlphaSynth Authentication System

A complete, production-ready authentication system built with Next.js 14, Supabase, and a stunning animated background system. Features Google OAuth, email/password authentication, multi-step signup, and a premium trading platform UI.

## 🚀 Features

### Authentication Flows
- **Google OAuth** - One-click sign in/up with Google
- **Email/Password** - Traditional authentication with validation
- **Multi-step Signup** - Account → Profile → Email Verification
- **Password Reset** - Secure password recovery flow
- **Session Management** - Automatic session refresh and protection

### UI/UX Design
- **6-Layer Animated Background** - Aurora bands, particle constellation, vertical bars, globe, noise overlay
- **Glass Morphism** - Premium frosted glass effects throughout
- **Typography System** - Clash Display, Cabinet Grotesk, JetBrains Mono
- **Responsive Design** - Mobile-first approach with desktop enhancements
- **Accessibility** - ARIA labels, focus management, keyboard navigation

### Technical Stack
- **Next.js 14** - App Router, Server Components, Middleware
- **Supabase** - Authentication, database, real-time subscriptions
- **TypeScript** - Full type safety throughout
- **Tailwind CSS** - Utility-first styling with custom design system
- **Framer Motion** - Smooth animations and transitions
- **React Hook Form + Zod** - Form validation and management

## 📁 Project Structure

```
alphasynth-auth/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with fonts
│   ├── page.tsx                 # Landing page
│   ├── globals.css              # Global styles and animations
│   ├── signin/page.tsx          # Sign in page
│   ├── signup/page.tsx          # Multi-step signup
│   ├── forgot-password/page.tsx # Password reset
│   ├── auth/
│   │   ├── callback/route.ts    # OAuth callback handler
│   │   └── reset-password/page.tsx
│   └── dashboard/page.tsx       # Protected dashboard
├── components/
│   ├── background/              # 6-layer animation system
│   │   ├── AnimatedBackground.tsx
│   │   ├── ParticleCanvas.tsx
│   │   ├── AuroraBands.tsx
│   │   ├── VerticalBars.tsx
│   │   ├── Globe.tsx
│   │   └── NoiseOverlay.tsx
│   ├── auth/                    # Authentication components
│   │   ├── GoogleButton.tsx
│   │   ├── InputField.tsx
│   │   ├── PasswordField.tsx
│   │   ├── StepProgress.tsx
│   │   ├── CustomSelect.tsx
│   │   ├── ChipSelect.tsx
│   │   ├── RadioCard.tsx
│   │   └── SuccessScreen.tsx
│   └── ui/                      # Reusable UI components
│       ├── Button.tsx
│       └── Divider.tsx
├── lib/
│   └── supabase/               # Supabase configuration
│       ├── client.ts           # Browser client
│       └── server.ts           # Server client
├── middleware.ts               # Session management
└── Configuration files...
```

## 🛠 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings → API to get your credentials
3. Enable Google OAuth in Authentication → Providers
4. Set up redirect URLs:
   - Site URL: `http://localhost:3000` (development)
   - Redirect URLs: `http://localhost:3000/auth/callback`

### 3. Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `https://your-project.supabase.co/auth/v1/callback`
6. Add credentials to Supabase dashboard

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🎨 Design System

### Colors
- **Primary Green**: `#22c55e` - Success, growth, money
- **Secondary Green**: `#4ade80` - Highlights, accents
- **Soft Green**: `#86efac` - Text accents, subtle highlights
- **Glass Effects**: Various opacity levels of black with backdrop blur

### Typography
- **Headings**: Clash Display (700, 800) - Bold, modern headlines
- **UI Text**: Cabinet Grotesk (400-700) - Clean, readable interface text
- **Data/Code**: JetBrains Mono (400-700) - Numbers, tickers, code

### Animation System
The 6-layer background creates a living financial environment:

1. **Base Gradient** - Subtle radial gradient on body
2. **Aurora Bands** - 3 floating, morphing light bands
3. **Particle Constellation** - 90 connected dots with twinkling
4. **Vertical Bars** - 18 animated trading chart bars
5. **Globe** - Rotating 3D-style globe with hot spots
6. **Noise Overlay** - Film grain texture for premium feel

## 🔐 Authentication Features

### Sign In
- Email/password validation
- Google OAuth integration
- "Remember device" option
- Forgot password link
- Real-time error handling

### Sign Up (3 Steps)
1. **Account Info** - Name, email, password with strength meter
2. **Trading Profile** - Experience, markets, account type, capital
3. **Email Verification** - Confirmation with resend functionality

### Security
- Password strength validation (8+ chars, uppercase, number, symbol)
- Email verification required
- Session management with automatic refresh
- Protected routes with middleware
- CSRF protection via Supabase

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Update Supabase redirect URLs to production domain

### Other Platforms
- Update `NEXT_PUBLIC_SUPABASE_URL` for your domain
- Ensure redirect URLs are configured in Supabase
- Set up proper environment variables

## 📱 Mobile Responsiveness

- **Breakpoints**: Mobile-first design with `lg:` prefix for desktop
- **Touch Targets**: Minimum 48px height for all interactive elements
- **Navigation**: Collapsible mobile menu, simplified layouts
- **Forms**: Single-column layout on mobile, optimized input sizes

## ♿ Accessibility

- **ARIA Labels**: All form inputs and interactive elements
- **Focus Management**: Visible focus rings, logical tab order
- **Screen Readers**: Semantic HTML, descriptive text
- **Color Contrast**: WCAG AA compliant color combinations
- **Keyboard Navigation**: Full keyboard accessibility

## 🔧 Customization

### Changing Colors
Update CSS variables in `app/globals.css`:

```css
:root {
  --glow-primary: #your-color;
  --glow-secondary: #your-color;
  /* ... */
}
```

### Modifying Animations
- **Aurora Bands**: Adjust timing in `components/background/AuroraBands.tsx`
- **Particles**: Change count/behavior in `components/background/ParticleCanvas.tsx`
- **Bars**: Modify heights array in `components/background/VerticalBars.tsx`

### Button Variants
Add new variants in `components/ui/Button.tsx`:

```typescript
const variantClasses = {
  // existing variants...
  'your-variant': 'your-classes'
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Supabase Connection Error**
   - Verify environment variables
   - Check Supabase project status
   - Ensure correct API keys

2. **Google OAuth Not Working**
   - Verify redirect URLs in Google Console
   - Check Supabase OAuth configuration
   - Ensure domain matches exactly

3. **Animations Not Smooth**
   - Check browser hardware acceleration
   - Reduce particle count for lower-end devices
   - Consider `prefers-reduced-motion` media query

4. **Build Errors**
   - Clear `.next` folder and rebuild
   - Check TypeScript errors
   - Verify all imports are correct

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For issues and questions:
- Check the troubleshooting section
- Review Supabase documentation
- Open an issue on GitHub

---

Built with ❤️ for the AlphaSynth trading platform.