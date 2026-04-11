# AlphaSynth Design System - Complete Style Guide

## A. Color Palette (Sage & Gold Theme)

### Primary Colors
- **Light Sage (Primary)**: `#A7C4A0`
  - Used for: All buttons, primary accents, hover states
  - Text on this color: `#1F2933` (black)

- **Dark Sage (Success/Buy)**: `#6A994E`
  - Used for: Profit indicators, BUY signals, positive trends, success states
  - Text on this color: White or `#1F2933`

- **Gold (Hold/Warning)**: `#E5B960`
  - Used for: HOLD signals, warning states, neutral indicators
  - Text on this color: `#1F2933`

- **Terracotta (Loss/Sell)**: `#BC4749`
  - Used for: Loss indicators, SELL signals, negative trends, error states
  - Text on this color: White

### Background Colors
- **Page Background**: `#F4F7F2` (light cream)
- **Card Background**: White (`#FFFFFF`)
- **Card Borders**: `#6A994E` with 10-30% opacity

### Text Colors
- **Primary Text**: `#1F2933` (black) - ALL text must be this color
- **Secondary/Muted Text**: `#6B7280` (gray)
- **Link Hover**: `#6A994E`

---

## B. Typography

### Font Family
- **Primary Font**: Plus Jakarta Sans (NOT Clash Display)
- **Fallback**: system-ui, -apple-system, sans-serif

### Font Sizes
- **H1 (Hero)**: 64px, font-bold
- **H1 (Page Title)**: 32px, font-bold
- **H2 (Section)**: 24px, font-semibold
- **H3 (Subsection)**: 20px, font-semibold
- **Body**: 16px, font-normal
- **Small**: 14px, font-normal
- **Tiny**: 12px, font-normal

### Font Weights
- **Black**: 900 (for emphasis)
- **Bold**: 700 (for headings)
- **Semibold**: 600 (for subheadings, buttons)
- **Medium**: 500 (for labels)
- **Normal**: 400 (for body text)

### Line Heights
- **Tight**: 1.1 (for large headings)
- **Snug**: 1.2 (for headings)
- **Normal**: 1.5 (for body text)
- **Relaxed**: 1.625 (for descriptions)

---

## C. Spacing System (8px Grid)

### Base Unit: 8px

### Common Spacing Values
- **xs**: 8px (gap-2, p-2)
- **sm**: 16px (gap-4, p-4)
- **md**: 24px (gap-6, p-6)
- **lg**: 32px (gap-8, p-8)
- **xl**: 48px (gap-12, p-12)
- **2xl**: 64px (gap-16, p-16)

### Component Padding
- **Cards**: 16-24px (p-4 to p-6)
- **Buttons**: 12px horizontal, 8-12px vertical
- **Modals**: 32px (p-8)
- **Page Container**: 24px (px-6)

---

## D. Button Styles

### All Buttons Must Follow This Exact Style
```css
background: #A7C4A0 (light sage)
color: #1F2933 (black text)
font-weight: 600 (semibold)
border: 2px solid #A7C4A0
border-radius: 6px (rounded-md, NOT rounded-full)
height: 40-48px
padding: 12-16px horizontal
transition: all 0.2s ease
```

### Button States
- **Default**: `bg-[#A7C4A0] text-[#1F2933] border-[#A7C4A0]`
- **Hover**: `bg-[#6A994E] border-[#6A994E] text-white`
- **Active**: Same as hover
- **Disabled**: `opacity-50 cursor-not-allowed`

### Button Variants
- **Primary**: Light sage background with black text
- **Secondary**: White background with sage border
- **Danger**: `#BC4749` background with white text

### NO Button Animations
- ❌ NO scaling (no hover:scale-105)
- ❌ NO arrows (→ symbols)
- ✅ ONLY color transitions (0.2s ease)

---

## E. Card Styles

### Standard Card
```css
background: white
border: 1px solid rgba(106, 153, 78, 0.1)
border-radius: 12px (rounded-xl)
padding: 16-24px
box-shadow: 0 1px 3px rgba(0,0,0,0.05)
```

### Card Hover State
```css
border-color: rgba(106, 153, 78, 0.3)
box-shadow: 0 4px 12px rgba(0,0,0,0.05)
transform: translateY(-2px) /* ONLY for cards, not buttons */
transition: all 0.2s ease
```

### Card Variants
- **Default**: White with subtle sage border
- **Highlighted**: Sage border with 30% opacity
- **Success**: Green border with 20% opacity
- **Warning**: Gold border with 20% opacity
- **Error**: Red border with 20% opacity

---

## F. Border Radius

### Standard Values
- **Small**: 6px (rounded-md) - buttons, inputs
- **Medium**: 10px (rounded-[10px]) - small cards
- **Large**: 12px (rounded-xl) - standard cards
- **Extra Large**: 14px (rounded-[14px]) - modals

### ❌ NEVER USE
- rounded-full (except for dots/indicators)
- rounded-3xl or larger

---

## G. Icons

### Icon Library
- **ONLY USE**: @tabler/icons-react
- **NEVER USE**: Lucide React, emojis, or other icon libraries

### Icon Naming Convention
- All icons must have `Icon` prefix: `IconSearch`, `IconX`, `IconPlus`

### Icon Sizing
- **Small**: 16px (w-4 h-4)
- **Medium**: 20-22px (w-5 h-5 or w-[22px] h-[22px])
- **Large**: 24px (w-6 h-6)

### Icon Stroke Width
- **ALL icons must use**: `stroke={1.5}` for consistency

### Icon Colors
- **Default**: `#6B7280` (gray)
- **Active**: `#1F2933` (black)
- **Accent**: `#6A994E` (sage)
- **Success**: `#6A994E`
- **Warning**: `#E5B960`
- **Error**: `#BC4749`

---

## H. Shadows

### Standard Shadows
- **Small**: `0 1px 3px rgba(0,0,0,0.05)`
- **Medium**: `0 4px 12px rgba(0,0,0,0.05)`
- **Large**: `0 8px 24px rgba(0,0,0,0.08)`

### NO Glow Effects
- ❌ NO colored glows
- ❌ NO shadow-[0_0_20px_rgba(...)]
- ✅ ONLY subtle gray shadows

---

## I. Animations & Transitions

### Allowed Animations
- **Color transitions**: `transition-colors duration-200`
- **All properties**: `transition-all duration-200`
- **Fade in**: `opacity` transitions only
- **Card hover**: `translateY(-2px)` for cards only

### ❌ FORBIDDEN Animations
- NO scaling on buttons (hover:scale-105)
- NO profit pulse animations
- NO gold glow effects
- NO loss shake animations
- NO icon scaling
- NO continuous animations
- NO transform animations on buttons

### Transition Timing
- **Standard**: 200ms (duration-200)
- **Easing**: ease or ease-in-out

---

## J. Form Elements

### Input Fields
```css
height: 48px
padding: 12px 16px
background: white
border: 1px solid rgba(106, 153, 78, 0.2)
border-radius: 10px (rounded-[10px])
font-size: 16px
color: #1F2933
```

### Input States
- **Focus**: `border-[#6A994E] ring-2 ring-[#6A994E]/20`
- **Error**: `border-[#BC4749] ring-2 ring-[#BC4749]/20`
- **Disabled**: `opacity-50 cursor-not-allowed`

### Placeholder Text
- **Color**: `#6B7280`
- **Style**: `placeholder:text-[#6B7280]`

---

## K. Navigation

### Navbar
- **Background**: `bg-white/95 backdrop-blur-xl`
- **Border**: `border-b border-[#6A994E]/10`
- **Height**: Auto (py-4)
- **Sticky**: `sticky top-0 z-50`

### Navigation Links
- **Default**: `text-[#6B7280]`
- **Hover**: `text-[#1F2933]`
- **Active**: `text-[#6A994E]`
- **Underline**: Bottom border on hover

---

## L. Data Visualization

### Chart Colors
- **Profit/Gain**: `#6A994E` (dark sage)
- **Loss/Decline**: `#BC4749` (terracotta)
- **Neutral/Hold**: `#E5B960` (gold)
- **Primary Line**: `#6A994E`
- **Secondary Line**: `#A7C4A0`
- **Grid Lines**: `rgba(107, 114, 128, 0.1)`

### Chart Text
- **ALL text**: `#1F2933` (black)
- **Axis labels**: `#6B7280` (gray)
- **Values**: `#1F2933` (black)

---

## M. Status Indicators

### Signal Colors
- **BUY**: `#6A994E` (dark sage)
- **HOLD**: `#E5B960` (gold)
- **SELL**: `#BC4749` (terracotta)

### Trend Indicators
- **Positive**: `#6A994E` with IconTrendingUp
- **Negative**: `#BC4749` with IconTrendingDown
- **Neutral**: `#6B7280` with IconMinus

### Badges
```css
padding: 4px 12px
border-radius: 6px
font-size: 12px
font-weight: 600
```

---

## N. Modal/Dialog Styles

### Modal Container
```css
background: white
border-radius: 14px (rounded-[14px])
padding: 32px (p-8)
box-shadow: 0 8px 24px rgba(0,0,0,0.08)
max-width: 600px
```

### Modal Overlay
```css
background: rgba(0, 0, 0, 0.5)
backdrop-filter: blur(4px)
```

---

## O. Table Styles

### Table Header
```css
background: #F4F7F2
border-bottom: 1px solid rgba(106, 153, 78, 0.1)
padding: 12px 16px
font-weight: 600
text-transform: uppercase
font-size: 12px
letter-spacing: 0.05em
color: #1F2933
```

### Table Row
```css
border-bottom: 1px solid rgba(106, 153, 78, 0.05)
padding: 16px
hover:background: #F4F7F2
transition: background 0.2s ease
```

---

## P. Loading States

### Spinner
- **Color**: `#6A994E`
- **Size**: 24px (w-6 h-6)
- **Animation**: `animate-spin`

### Skeleton
- **Background**: `#F4F7F2`
- **Animation**: Pulse effect
- **Border radius**: Match component

---

## Q. Responsive Breakpoints

### Tailwind Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Mobile-First Approach
- Design for mobile first
- Add complexity at larger breakpoints
- Hide/show elements responsively

---

## R. Accessibility

### Color Contrast
- **Text on white**: Must be `#1F2933` (black) for WCAG AAA
- **Text on sage**: Must be `#1F2933` (black)
- **Text on dark sage**: Can be white
- **Minimum contrast ratio**: 7:1 for normal text

### Focus States
- **All interactive elements**: Must have visible focus ring
- **Focus ring**: `ring-2 ring-[#6A994E]/50`

### Icon Accessibility
- **All icons**: Must have `stroke={1.5}` for visibility
- **Icon buttons**: Must have aria-label or title

---

## S. Performance Guidelines

### Transitions
- **Maximum duration**: 300ms
- **Preferred duration**: 200ms
- **Use**: `transition-all duration-200 ease`

### Images
- **Format**: WebP with fallback
- **Lazy loading**: Use for below-fold images
- **Optimization**: Compress all images

---

## T. Component Patterns

### Card with Icon
```jsx
<div className="bg-white border border-[#6A994E]/10 rounded-xl p-6">
  <div className="flex items-center gap-3 mb-4">
    <IconName className="w-6 h-6 text-[#6A994E]" stroke={1.5} />
    <h3 className="text-xl font-semibold text-[#1F2933]">Title</h3>
  </div>
  <p className="text-[#6B7280]">Description</p>
</div>
```

### Button Pattern
```jsx
<button className="px-6 py-3 bg-[#A7C4A0] border-2 border-[#A7C4A0] rounded-md text-[#1F2933] font-semibold transition-all duration-200 hover:bg-[#6A994E] hover:border-[#6A994E] hover:text-white">
  Button Text
</button>
```

---

## U. Logo Usage

### Logo Components
- **Text "Synth"**: `#1F2933` (black)
- **Text "Alpha"**: `#6A994E` (dark sage)
- **Tagline**: `#6B7280` (gray), 9px, uppercase, tracking-[0.15em]

### Logo Sizes
- **Navbar**: 24px text
- **Hero**: 32-48px text
- **Footer**: 20px text

---

## V. Authentication Pages

### Auth Card Style
```css
background: #A7C4A0 (light sage)
border-radius: 14px
padding: 32px
box-shadow: 0 4px 12px rgba(0,0,0,0.05)
max-width: 448px
```

### Auth Inputs
- **Height**: 48px
- **Background**: White
- **Border**: None or subtle
- **Border radius**: 10px

### NO Elements on Auth Pages
- ❌ NO "Back to Home" links
- ❌ NO promotional text
- ❌ NO security badges
- ❌ NO arrows on buttons

---

## W. Dashboard Specific

### Dashboard Background
- **Color**: `#F4F7F2`
- **NO AnimatedBackground component**
- **NO glassmorphism effects**

### Dashboard Cards
- **Background**: White
- **Border**: `border-[#6A994E]/10`
- **Padding**: 24px (p-6)
- **Spacing**: 16-24px gaps

---

## X. Market Data Display

### Price Display
- **Font size**: 32px (text-[32px])
- **Font weight**: 900 (font-black)
- **Color**: `#1F2933` (black)

### Change Indicators
- **Positive**: `text-[#6A994E]` with "+" prefix
- **Negative**: `text-[#BC4749]` with "-" prefix
- **Format**: "+2.3%" or "-1.5%"

---

## Y. Error States

### Error Messages
```css
background: rgba(188, 71, 73, 0.1)
border: 1px solid rgba(188, 71, 73, 0.2)
border-radius: 10px
padding: 16px
color: #BC4749
font-size: 14px
```

### Error Icons
- **Icon**: IconAlertTriangle or IconAlertCircle
- **Color**: `#BC4749`
- **Size**: 20px

---

## Z. Development Notes

### Critical Rules
1. **ALL text must be black** (`#1F2933`) throughout the app
2. **ALL buttons must be sage** (`#A7C4A0`) with black text
3. **ALL icons must be Tabler** with `stroke={1.5}`
4. **NO scaling animations** on any elements
5. **NO emojis** - use Tabler icons only
6. **Font is Plus Jakarta Sans** - NOT Clash Display
7. **Dev server runs on port 5173**
8. **Application focus**: Indian Stock Markets ONLY

### After Making Changes
```bash
cd frontend
rm -rf .next
npm run dev
```

### Icon Import Pattern
```jsx
import { IconName } from '@tabler/icons-react'

<IconName className="w-5 h-5 text-[#6A994E]" stroke={1.5} />
```

### Color Usage Quick Reference
- Buttons: `#A7C4A0`
- Profit/Buy: `#6A994E`
- Hold: `#E5B960`
- Loss/Sell: `#BC4749`
- Background: `#F4F7F2`
- Text: `#1F2933`
- Muted: `#6B7280`

---

**Document Version**: 1.0  
**Last Updated**: Current Session  
**Application**: AlphaSynth - AI-Powered Trading Analytics for Indian Markets
