/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter'],
        jakarta: ['Inter'],
        mono: ['JetBrains Mono'],
      },
      colors: {
        // New Design System Colors
        'primary': '#6A994E',
        'accent': '#E9C46A',
        'bg': '#F4F7F2',
        'surface': '#A7C4A0',
        'danger': '#BC4749',
        'text': '#1F2933',
        'muted': '#6B7280',
        
        // Old colors (keeping for backward compatibility)
        'bg-primary': '#000000',
        'bg-surface': 'rgba(255,255,255,0.04)',
        'bg-surface-hover': 'rgba(255,255,255,0.07)',
        'glow-primary': '#22c55e',
        'glow-secondary': '#4ade80',
        'glow-soft': '#86efac',
        'text-primary': '#ffffff',
        'text-secondary': '#ffffff',
        'text-muted': '#ffffff',
        'text-accent': '#86efac',
        'border-default': 'rgba(255,255,255,0.08)',
        'border-glow': 'rgba(34,197,94,0.25)',
        'glass-bg': 'rgba(0,0,0,0.6)',
        'input-bg': 'rgba(255,255,255,0.05)',
        'input-border': 'rgba(255,255,255,0.1)',
        'input-focus': 'rgba(34,197,94,0.4)',
      },
      fontSize: {
        'xs': '0.875rem',    // 14px (was 12px)
        'sm': '1rem',        // 16px (was 14px)
        'base': '1.125rem',  // 18px (was 16px)
        'lg': '1.25rem',     // 20px (was 18px)
        'xl': '1.5rem',      // 24px (was 20px)
        '2xl': '1.875rem',   // 30px (was 24px)
        '3xl': '2.25rem',    // 36px (was 30px)
        '4xl': '3rem',       // 48px (was 36px)
        '5xl': '3.75rem',    // 60px (was 48px)
        '6xl': '4.5rem',     // 72px (was 60px)
        '7xl': '6rem',       // 96px (was 72px)
        '8xl': '8rem',       // 128px (was 96px)
        '9xl': '10rem',      // 160px (was 128px)
      },
      animation: {
        'aurora-drift': 'auroraDrift 18s ease-in-out infinite alternate',
        'aurora-drift-reverse': 'auroraDrift 24s ease-in-out infinite alternate-reverse',
        'aurora-drift-deep': 'auroraDrift 30s ease-in-out infinite',
        'bar-rise': 'barRise 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'bar-breathe': 'barBreathe 4s ease-in-out infinite',
        'globe-float': 'globeFloat 9s ease-in-out infinite',
        'globe-spin': 'globeSpin 80s linear infinite',
        'dot-pulse': 'dotPulse 2s ease-in-out infinite',
        'ring-pulse': 'ringPulse 2.2s ease-out infinite',
        'shimmer': 'shimmer 0.5s ease-out',
        'shake': 'shake 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.4s ease-out forwards',
        'confetti-fall': 'confettiFall 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'slide-in': 'slideIn 0.3s ease-out forwards',
      },
      keyframes: {
        auroraDrift: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(40px, -30px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.97)' },
          '100%': { transform: 'translate(30px, -15px) scale(1.03)' },
        },
        barRise: {
          'from': { transform: 'scaleY(0)', opacity: '0' },
          'to': { transform: 'scaleY(1)', opacity: '1' },
        },
        barBreathe: {
          '0%, 100%': { opacity: '1', transform: 'scaleY(1)' },
          '50%': { opacity: '0.6', transform: 'scaleY(0.94)' },
        },
        globeFloat: {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0px)' },
          '50%': { transform: 'translateX(-50%) translateY(-16px)' },
        },
        globeSpin: {
          'from': { transform: 'rotateY(0deg)' },
          'to': { transform: 'rotateY(360deg)' },
        },
        dotPulse: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        ringPulse: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%) skewX(-20deg)' },
          '100%': { transform: 'translateX(200%) skewX(-20deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-8px)' },
          '40%': { transform: 'translateX(8px)' },
          '60%': { transform: 'translateX(-6px)' },
          '80%': { transform: 'translateX(6px)' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        confettiFall: {
          '0%': { transform: 'translateY(-20px) translateX(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) translateX(var(--drift)) rotate(var(--rotation))', opacity: '0' },
        },
        slideIn: {
          'from': { transform: 'translateX(100%)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}