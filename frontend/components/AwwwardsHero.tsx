'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export default function AwwwardsHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const orbsRef = useRef<HTMLDivElement>(null)
  const chartsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Initial loading sequence (0s → 2s)
      const tl = gsap.timeline()
      
      // Background fade in
      tl.from(backgroundRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
      })
      
      // Orbs and charts fade in with slight delay
      tl.from([orbsRef.current, chartsRef.current], {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out'
      }, 0.3)
      
      // Headline animation (text appears with upward motion)
      tl.from(headlineRef.current?.children || [], {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      }, 0.8)
      
      // Subtitle fade in
      tl.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
      }, 1.5)
      
      // CTA buttons
      tl.from(ctaRef.current?.children || [], {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)'
      }, 2)
      
      // Stats bar
      tl.from(statsRef.current?.children || [], {
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
      }, 2.3)

      // Scroll-based animations (MOST IMPORTANT - Scroll = Animation Controller)
      // Hero content fades and moves up as user scrolls
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1, // Smooth scrubbing effect
        },
        y: -150,
        opacity: 0.3,
        scale: 0.95,
        ease: 'none'
      })

      // Background parallax (Layer 1 - slow movement)
      gsap.to(backgroundRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
        y: 100,
        ease: 'none'
      })

      // Orbs parallax (Layer 2 - medium movement)
      gsap.to(orbsRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: 200,
        ease: 'none'
      })

      // Charts parallax (Layer 3 - faster movement for depth)
      gsap.to(chartsRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
        y: 300,
        opacity: 0,
        ease: 'none'
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Layer 1: Background (slowest parallax) */}
      <div ref={backgroundRef} className="absolute inset-0 bg-gradient-to-br from-[#F8F9FB] via-[#FAFBF9] to-[#F0F4EE]">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(106, 153, 78, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(106, 153, 78, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              animation: 'gridMove 20s linear infinite',
            }}
          />
        </div>
      </div>

      {/* Layer 2: Floating Orbs (medium parallax) */}
      <div ref={orbsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-3xl animate-float"
            style={{
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(106, 153, 78, 0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(229, 199, 106, 0.15) 0%, transparent 70%)',
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              left: `${i * 20}%`,
              top: `${i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${15 + i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Layer 3: Trading Charts (fastest parallax) */}
      <div ref={chartsRef} className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.08]">
        {/* Candlestick Charts */}
        <div className="absolute left-[10%] top-[20%] flex gap-3">
          {[
            { height: 80, color: '#2E4D8E' },
            { height: 120, color: '#C85A54' },
            { height: 100, color: '#2E4D8E' },
            { height: 90, color: '#2E4D8E' },
            { height: 140, color: '#C85A54' },
            { height: 110, color: '#2E4D8E' },
          ].map((candle, i) => (
            <div
              key={i}
              className="relative w-4 animate-candlestick"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div 
                className="absolute left-1/2 -translate-x-1/2 w-[2px]"
                style={{ 
                  height: `${candle.height + 20}px`,
                  backgroundColor: candle.color,
                  top: '-10px'
                }}
              />
              <div
                className="w-full rounded-sm"
                style={{ 
                  height: `${candle.height}px`,
                  backgroundColor: candle.color,
                }}
              />
            </div>
          ))}
        </div>

        {/* Rising Line Graph */}
        <svg className="absolute right-[10%] bottom-[20%] w-[400px] h-[300px]">
          <path
            d="M 0 250 L 80 220 L 160 200 L 240 170 L 320 140 L 400 100"
            stroke="#2E4D8E"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            className="animate-draw-line"
          />
          <path
            d="M 0 250 L 80 220 L 160 200 L 240 170 L 320 140 L 400 100 L 400 250 Z"
            fill="url(#lineGradient)"
            opacity="0.3"
          />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2E4D8E" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2E4D8E" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Hero Content */}
      <div ref={heroRef} className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 py-32">
        {/* Main Headline */}
        <div ref={headlineRef} className="text-center mb-6 max-w-6xl">
          <div className="text-[72px] md:text-[96px] lg:text-[120px] font-bold leading-[1.05] tracking-tight">
            <div className="text-[#2D3748]">Interrogate</div>
            <div className="bg-gradient-to-r from-[#2E4D8E] via-[#7BAA5F] to-[#4A9B8E] bg-clip-text text-transparent animate-gradient">
              the Market.
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-center text-[#718096] text-[18px] md:text-[20px] max-w-3xl mb-12 leading-relaxed font-light"
        >
          The world's first Adversarial AI engine for high-stakes financial synthesis. 
          Zero hallucinations. Total explainability. Hard-coded for institutional rigor.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link
            href="/dashboard"
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 text-[15px] font-semibold text-white bg-[#2D3748] rounded-full overflow-hidden hover:bg-[#2A3440] hover:scale-105 transition-all duration-300 tracking-wide uppercase"
          >
            <span className="relative z-10 text-white">Institutional Access</span>
          </Link>

          <button
            onClick={() => document.getElementById('markets')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center justify-center gap-3 px-10 py-4 text-[15px] font-semibold text-[#2D3748] bg-white border border-[#E5E7EB] rounded-full hover:border-[#2E4D8E] hover:scale-105 transition-all duration-300 tracking-wide uppercase"
          >
            View Logic Trace →
          </button>
        </div>

        {/* Stats Bar */}
        <div ref={statsRef} className="flex flex-wrap justify-center gap-12">
          {[
            { value: '50+', label: 'AI Modules' },
            { value: '10K+', label: 'Active Users' },
            { value: '99.9%', label: 'Uptime' },
          ].map((stat, i) => (
            <div key={i} className="text-center hover:scale-110 transition-transform duration-300 cursor-default">
              <div className="text-[40px] font-bold bg-gradient-to-r from-[#2E4D8E] to-[#E5C76A] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-[14px] text-[#718096] font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce-slow">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[12px] text-[#718096] font-medium">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-[#2E4D8E]/30 flex items-start justify-center p-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2E4D8E] animate-scroll-dot" />
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gridMove {
          0% { background-position: 0px 0px; }
          100% { background-position: 60px 60px; }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(100px, -100px) scale(1.2); }
        }

        @keyframes candlestick {
          0%, 100% { transform: scaleY(0); opacity: 0; }
          50% { transform: scaleY(1); opacity: 1; }
        }

        @keyframes draw-line {
          0% { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
          100% { stroke-dasharray: 1000; stroke-dashoffset: 0; }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, 10px); }
        }

        @keyframes scroll-dot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(12px); opacity: 0.3; }
        }

        .animate-float {
          animation: float 15s ease-in-out infinite;
        }

        .animate-candlestick {
          animation: candlestick 3s ease-out infinite;
        }

        .animate-draw-line {
          animation: draw-line 3s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s linear infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-scroll-dot {
          animation: scroll-dot 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
