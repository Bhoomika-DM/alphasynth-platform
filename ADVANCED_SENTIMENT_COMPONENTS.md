# Advanced Sentiment Score Components

## Overview
Rebuilt the Composite Sentiment Score feature using advanced Next.js, Tailwind CSS, and Framer Motion to create a truly professional, animated, and interactive experience.

## Technology Stack
- **Next.js 14** - Server/Client components
- **Tailwind CSS** - Advanced utility classes, gradients, animations
- **Framer Motion** - Smooth animations and transitions
- **TypeScript** - Type-safe component props
- **SVG** - Custom circular gauge with gradients

## Component Architecture

### 1. CompositeSentimentScore (Main Container)
**Location:** `frontend/components/sentiment/CompositeSentimentScore.tsx`

**Features:**
- Animated container with glassmorphism effects
- Multiple layered background gradients (blue/purple)
- Blur effects and backdrop filters
- Score/Re-score button with hover animations
- AnimatePresence for smooth show/hide transitions
- Tab system with animated underline (layoutId)
- Responsive grid layouts

**Advanced Tailwind:**
```tsx
- bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-transparent
- backdrop-blur-2xl
- shadow-2xl
- rounded-3xl
- Animated background blobs with blur-3xl
```

**Framer Motion:**
```tsx
- initial/animate/exit states
- Staggered animations with delays
- Spring animations for buttons
- Layout animations for tabs
- AnimatePresence for conditional rendering
```

### 2. SentimentGauge (Circular Progress)
**Location:** `frontend/components/sentiment/SentimentGauge.tsx`

**Features:**
- Animated SVG circular progress indicator
- Dynamic color schemes (fear/neutral/greed)
- Pulsing status dot
- Animated data confidence bar
- Gradient strokes with defs/linearGradient
- Drop shadows and glows
- Hover effects with group utilities

**Advanced Techniques:**
- SVG strokeDasharray animation
- Transform -rotate-90 for starting position
- Motion.circle with strokeDashoffset animation
- Conditional gradient colors based on status
- Repeating pulse animation for status dot

**Color Schemes:**
```tsx
fear: red-500 gradients, red shadows
neutral: yellow-500 gradients, yellow shadows
greed: green-500 gradients, green shadows
```

### 3. FactorCard (Category Scores)
**Location:** `frontend/components/sentiment/FactorCard.tsx`

**Features:**
- Staggered entrance animations (index * 0.1 delay)
- Gradient backgrounds with hover effects
- Score indicator bars (5 vertical bars)
- Individual bar animations
- Glow effects on hover
- Uppercase tracking for labels

**Advanced Tailwind:**
```tsx
- group/group-hover utilities
- backdrop-blur-xl
- transition-all duration-300
- hover:shadow-xl
- tracking-widest
```

**Animations:**
- Scale animations for score numbers
- ScaleY animations for indicator bars
- Opacity transitions for hover glows
- Staggered bar animations (bar * 0.05 delay)

### 4. ImpactfulFactor (Factor List Items)
**Location:** `frontend/components/sentiment/ImpactfulFactor.tsx`

**Features:**
- Rank badge with 3D effect and glow
- Confidence level badges (high/medium/low)
- Animated deviation progress bars
- Dual-layer progress (solid + glow)
- Hover effects with gradient backgrounds
- Bottom border glow on hover

**Advanced Features:**
- whileHover scale and rotate on rank badge
- Gradient progress bars with blur glow layer
- Conditional colors based on bullish/bearish
- Truncate text with min-w-0
- Complex flex layouts with gap utilities

**Progress Bar:**
```tsx
- Base layer: bg-white/5
- Progress layer: gradient-to-r from-green-500 to-green-400
- Glow layer: blur-sm with /50 opacity
- Both layers animate width simultaneously
```

## Advanced Tailwind Features Used

### Opacity Modifiers
```tsx
from-white/[0.08]  // Custom opacity values
bg-blue-500/20     // 20% opacity
text-white/60      // 60% opacity
```

### Backdrop Effects
```tsx
backdrop-blur-xl   // Strong blur
backdrop-blur-2xl  // Extra strong blur
```

### Gradients
```tsx
bg-gradient-to-br from-X via-Y to-Z
bg-gradient-to-r from-transparent via-X to-transparent
```

### Shadows & Glows
```tsx
shadow-2xl
shadow-blue-500/30  // Colored shadow with opacity
drop-shadow-lg
drop-shadow-2xl
```

### Group Utilities
```tsx
group
group-hover:opacity-100
group-hover:shadow-xl
```

### Animations
```tsx
animate-pulse
animate-fade-in (custom)
transition-all duration-300
```

## Framer Motion Patterns

### Container Animations
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
```

### Staggered Children
```tsx
transition={{ delay: index * 0.1, duration: 0.5 }}
```

### Button Interactions
```tsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

### SVG Animations
```tsx
<motion.circle
  initial={{ strokeDashoffset: circumference }}
  animate={{ strokeDashoffset }}
  transition={{ duration: 1.5, ease: "easeOut" }}
/>
```

### Layout Animations
```tsx
<motion.div layoutId="activeTab" />
// Automatically animates between positions
```

### AnimatePresence
```tsx
<AnimatePresence mode="wait">
  {condition && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    />
  )}
</AnimatePresence>
```

## Visual Effects

### Glassmorphism
- Semi-transparent backgrounds
- Backdrop blur
- Subtle borders
- Layered gradients

### Glow Effects
- Colored shadows
- Blur layers
- Opacity transitions
- Pulsing animations

### 3D Effects
- Multiple shadow layers
- Transform hover states
- Gradient overlays
- Depth through opacity

### Micro-interactions
- Scale on hover
- Rotate on hover
- Smooth color transitions
- Staggered animations

## Performance Optimizations

1. **Dynamic Imports**
   ```tsx
   const CandlestickChart = dynamic(() => import('@/components/charts/CandlestickChart'), { ssr: false })
   ```

2. **Conditional Rendering**
   - Only render heavy components when needed
   - AnimatePresence for smooth unmounting

3. **CSS-based Animations**
   - Tailwind transitions over JS
   - GPU-accelerated transforms

4. **Memoization Ready**
   - Pure functional components
   - Props-based rendering

## Responsive Design

- Grid layouts with responsive columns
- `grid-cols-1 lg:grid-cols-2`
- `sm:grid-cols-2` for factor cards
- Flexible gap utilities
- Mobile-first approach

## Accessibility

- Semantic HTML structure
- Proper button elements
- Keyboard navigation support
- Focus states (can be enhanced)
- ARIA labels (can be added)

## Future Enhancements

1. **Real-time Updates**
   - WebSocket integration
   - Live score updates
   - Animated transitions

2. **Interactive Charts**
   - Click factor to see details
   - Hover tooltips
   - Drill-down views

3. **Customization**
   - Theme switcher
   - Color preferences
   - Animation speed controls

4. **Advanced Animations**
   - Particle effects
   - Morphing shapes
   - 3D transforms

5. **Performance**
   - Virtual scrolling for long lists
   - Lazy loading
   - Image optimization

## Comparison: Old vs New

### Old Implementation
- Basic HTML structure
- Static styling
- No animations
- Simple hover states
- Flat design

### New Implementation
- Component-based architecture
- Advanced Tailwind utilities
- Framer Motion animations
- Complex hover effects
- Glassmorphism & depth
- Staggered animations
- SVG animations
- Gradient overlays
- Glow effects
- 3D transforms

## Usage

```tsx
import CompositeSentimentScore from '@/components/sentiment/CompositeSentimentScore'

<CompositeSentimentScore ticker="AAPL" />
```

The component is fully self-contained with all sub-components and handles its own state management.
