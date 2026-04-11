'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface IntroProps {
  onComplete?: () => void
}

export default function Intro({ onComplete }: IntroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const alphaRef = useRef<HTMLDivElement>(null)
  const synthRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const glitchRef = useRef<HTMLDivElement>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
              setIsComplete(true)
              onComplete?.()
            }
          })
        }
      })

      // Binary numbers floating animation
      gsap.to('.binary-digit', {
        y: (i) => (i % 2 === 0 ? -150 : 150),
        opacity: 'random(0.15, 0.4)',
        duration: 'random(4, 8)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          amount: 3,
          from: 'random'
        }
      })

      // Horizontal lines animation
      gsap.to('.shine-line', {
        x: '100vw',
        duration: 'random(2, 4)',
        repeat: -1,
        ease: 'none',
        stagger: {
          amount: 2,
          repeat: -1
        }
      })

      // Vertical scan lines
      gsap.to('.vertical-line', {
        y: '100vh',
        duration: 'random(3, 5)',
        repeat: -1,
        ease: 'none',
        stagger: {
          amount: 1.5,
          repeat: -1
        }
      })

      // Main timeline
      tl.set([alphaRef.current, synthRef.current, subtitleRef.current], {
        opacity: 0
      })

      // ALPHA slides in from left
      tl.fromTo(alphaRef.current,
        {
          x: -200,
          opacity: 0,
          filter: 'blur(10px)'
        },
        {
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'expo.out'
        },
        0.5
      )

      // Glitch effect on ALPHA
      tl.to(glitchRef.current,
        {
          opacity: 1,
          x: 'random(-5, 5)',
          duration: 0.05,
          repeat: 5,
          yoyo: true
        },
        1.2
      )

      // SYNTH slides in from right
      tl.fromTo(synthRef.current,
        {
          x: 200,
          opacity: 0,
          filter: 'blur(10px)'
        },
        {
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'expo.out'
        },
        1.0
      )

      // Subtitle fade in
      tl.fromTo(subtitleRef.current,
        {
          opacity: 0,
          y: 30,
          letterSpacing: '0.5em'
        },
        {
          opacity: 1,
          y: 0,
          letterSpacing: '0.3em',
          duration: 1.2,
          ease: 'power2.out'
        },
        2.4
      )

      // Hold
      tl.to({}, { duration: 1.8 })

    }, containerRef)

    return () => ctx.revert()
  }, [onComplete, mounted])

  if (isComplete) return null
  if (!mounted) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#F4F7F2] flex items-center justify-center overflow-hidden"
    >
      {/* Animated horizontal shine lines */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`h-${i}`}
          className="shine-line absolute h-[1px] w-32 bg-gradient-to-r from-transparent via-[#6A994E]/30 to-transparent"
          style={{
            top: `${15 + i * 15}%`,
            left: '-10%',
            filter: 'blur(1px)'
          }}
        />
      ))}

      {/* Animated vertical lines */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`v-${i}`}
          className="vertical-line absolute w-[1px] h-32 bg-gradient-to-b from-transparent via-[#6A994E]/20 to-transparent"
          style={{
            left: `${20 + i * 20}%`,
            top: '-10%',
            filter: 'blur(1px)'
          }}
        />
      ))}

      {/* Binary Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="binary-digit absolute text-[#6A994E]/15 font-jetbrains text-lg font-bold pointer-events-none select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              willChange: 'transform, opacity'
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </div>
        ))}
      </div>

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(106, 153, 78, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(106, 153, 78, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8 flex-wrap">
          {/* ALPHA */}
          <div className="relative">
            <div
              ref={alphaRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-jakarta font-black tracking-tight text-[#6A994E]"
              style={{
                willChange: 'transform, opacity'
              }}
            >
              ALPHA
            </div>
            {/* Glitch overlay */}
            <div
              ref={glitchRef}
              className="absolute inset-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-jakarta font-black tracking-tight text-[#BC4749] opacity-0 mix-blend-multiply pointer-events-none"
              style={{
                transform: 'translate(2px, 2px)'
              }}
            >
              ALPHA
            </div>
          </div>

          {/* SYNTH */}
          <div
            ref={synthRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-jakarta font-black tracking-tight text-[#1F2933]"
            style={{
              willChange: 'transform, opacity'
            }}
          >
            SYNTH
          </div>
        </div>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          className="text-xs sm:text-sm md:text-base font-jetbrains tracking-[0.3em] text-[#6B7280] uppercase"
          style={{
            willChange: 'transform, opacity'
          }}
        >
          SYNTHESIZING MARKET INTELLIGENCE
        </div>

        {/* Loading bar */}
        <div className="mt-8 w-48 sm:w-64 h-[2px] bg-[#6A994E]/20 rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-gradient-to-r from-[#6A994E] via-[#A7C4A0] to-[#6A994E] animate-loading"
          />
        </div>

        {/* Pulse ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#6A994E]/10 rounded-full animate-pulse-ring pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#6A994E]/5 rounded-full animate-pulse-ring-delayed pointer-events-none" />
      </div>

      {/* Scan line effect */}
      <div
        className="absolute inset-0 pointer-events-none animate-scan"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(106, 153, 78, 0.05) 50%, transparent 100%)',
          height: '100px'
        }}
      />

      <style jsx>{`
        @keyframes loading {
          0% {
            width: 0%;
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
          100% {
            width: 100%;
            opacity: 0.5;
          }
        }

        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(calc(100vh + 100px));
          }
        }

        @keyframes pulse-ring {
          0% {
            transform: translate(-50%, -50%) scale(0.95);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.1;
          }
          100% {
            transform: translate(-50%, -50%) scale(0.95);
            opacity: 0.3;
          }
        }

        @keyframes pulse-ring-delayed {
          0% {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0.2;
          }
          50% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.05;
          }
          100% {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0.2;
          }
        }

        .animate-loading {
          animation: loading 4s ease-in-out forwards;
        }

        .animate-scan {
          animation: scan 3s linear infinite;
        }

        .animate-pulse-ring {
          animation: pulse-ring 4s ease-in-out infinite;
        }

        .animate-pulse-ring-delayed {
          animation: pulse-ring-delayed 4s ease-in-out infinite 0.5s;
        }
      `}</style>
    </div>
  )
}
