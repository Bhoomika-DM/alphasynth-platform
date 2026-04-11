# Icon System

This project uses **Lucide React** as the standard icon library for consistent, modern icons throughout the application.

## Installation

```bash
npm install lucide-react
```

## Icons Used

### Authentication Pages

#### Sign In (`/signin`)
- `ArrowLeft` - Back to home navigation
- `Lock` - Sign in button icon

#### Sign Up (`/signup`)
- `ArrowLeft` - Back to home navigation
- `ArrowRight` - Create account button icon

#### Password Field Component
- `Eye` - Show password
- `EyeOff` - Hide password

### Dashboard (`/dashboard`)

#### Success Toast
- `CheckCircle2` - Success indicator
- `X` - Close button

#### Stats Cards
- `TrendingUp` - Instruments available
- `Clock` - 24/7 analysis
- `Activity` - Live market signals

### Landing Page (`/`)

#### Trust Indicators
- `Shield` - Regulated & Secure
- `Users` - Active traders count
- `Zap` - AI-Powered feature
- `ArrowRight` - Get started CTA

## Usage Example

```tsx
import { ArrowRight, CheckCircle2, Lock } from 'lucide-react'

// In your component
<ArrowRight className="w-5 h-5 text-glow-primary" />
<CheckCircle2 className="w-6 h-6" />
<Lock className="w-4 h-4" />
```

## Icon Sizing Standards

- **Small icons** (navigation, inline): `w-4 h-4` (16px)
- **Medium icons** (buttons, cards): `w-5 h-5` (20px)
- **Large icons** (feature highlights): `w-6 h-6` (24px)
- **Extra large icons** (hero sections): `w-8 h-8` (32px)

## Color Standards

- **Primary**: `text-glow-primary` (#22c55e)
- **Secondary**: `text-text-secondary` (#9ca3af)
- **Muted**: `text-text-muted` (#4b5563)
- **White**: `text-white` (#ffffff)

## Adding New Icons

1. Import from lucide-react:
```tsx
import { IconName } from 'lucide-react'
```

2. Use with consistent sizing and colors:
```tsx
<IconName className="w-5 h-5 text-glow-primary" />
```

3. Browse all available icons at: https://lucide.dev/icons/

## Special Cases

### Google Button
The Google sign-in button uses the official Google logo SVG (not from Lucide) to maintain brand consistency and recognition.

### Logo
The AlphaSynth logo uses a custom image (`/logo.jpeg`) for brand identity.

## Benefits of Lucide React

- ✅ Consistent design language
- ✅ Tree-shakeable (only imports used icons)
- ✅ Customizable with className
- ✅ Accessible by default
- ✅ TypeScript support
- ✅ Regular updates and maintenance
- ✅ 1000+ icons available
