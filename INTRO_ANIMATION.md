# Premium Animated Intro - AlphaSynth

## Overview
A cinematic, premium animated intro sequence for AlphaSynth - an AI-powered stock trading platform. Built with GSAP for smooth, professional animations.

## Features

### Visual Design
- Pure black background (#000000)
- Neon green glow accents (#22c55e)
- Floating binary numbers (0s and 1s) with slow motion
- Minimal, high-end fintech aesthetic
- Fully responsive design

### Animations (GSAP Timeline)

1. **Binary Background**
   - 80 floating binary digits
   - Random motion with low opacity
   - Continuous slow animation

2. **Logo Animation**
   - "ALPHA" slides in from left (1.2s, expo.out)
   - "SYNTH" slides in from right (1.2s, expo.out)
   - Blur effect on entrance
   - Glitch effect on "ALPHA" (3 flashes)
   - Glow pulse animation on both words

3. **Subtitle**
   - "SYNTHESIZING MARKET INTELLIGENCE"
   - Fades in after logo (1s, power2.out)
   - Upward motion effect

4. **Loading Bar**
   - Animated progress bar
   - Gradient fill (3s duration)

5. **Scan Line Effect**
   - Vertical scan line moving continuously
   - Subtle green glow

6. **Exit Animation**
   - Entire intro fades out (0.8s)
   - Triggers onComplete callback

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- GSAP (GreenSock Animation Platform)
- Tailwind CSS
- Lucide React (icons)

## Installation

```bash
npm install gsap
```

## Usage

```tsx
import Intro from '@/components/intro/Intro'

export default function Page() {
  const [showIntro, setShowIntro] = useState(true)

  if (showIntro) {
    return <Intro onComplete={() => setShowIntro(false)} />
  }

  return <YourMainContent />
}
```

## File Structure

```
frontend/
├── components/
│   └── intro/
│       └── Intro.tsx
└── app/
    └── page.tsx (updated to show intro)
```

## Animation Timeline

```
0.0s  - Binary digits start floating
0.5s  - ALPHA slides in from left
1.0s  - SYNTH slides in from right
1.2s  - Glitch effect on ALPHA
1.8s  - Glow pulse on both words
2.2s  - Subtitle fades in
3.7s  - Hold
4.5s  - Fade out entire intro
```

## Customization

### Duration
Change the hold duration in the timeline:
```tsx
tl.to({}, { duration: 1.5 }) // Change 1.5 to your desired seconds
```

### Colors
Update in Intro.tsx:
```tsx
// Neon green: text-glow-primary (#22c55e)
// Background: bg-black (#000000)
```

### Binary Count
Change the number of floating digits:
```tsx
const binaryDigits = Array.from({ length: 80 }, ...) // Change 80
```

## Performance
- Uses GSAP's optimized animation engine
- GPU-accelerated transforms
- Cleanup on unmount (gsap.context)
- No memory leaks

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes
- Intro plays once on initial page load
- Uses z-index 9999 to overlay everything
- Automatically cleans up after completion
- Responsive across all screen sizes
