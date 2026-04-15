'use client'

import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'

interface LoadingSequenceProps {
  onComplete: () => void
}

export default function LoadingSequence({ onComplete }: LoadingSequenceProps) {
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      // Animate out
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete()
        }
      })

      tl.to(progressBarRef.current, {
        scaleX: 0,
        duration: 0.3,
        ease: 'power2.in'
      })
      .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.in'
      }, '-=0.2')
      .to(logoRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in'
      }, '-=0.2')
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      }, '-=0.3')
    }
  }, [progress, onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-gradient-to-br from-[#F8F9FB] via-[#EEF2F7] to-[#E0F4F6] flex flex-col items-center justify-center"
    >
      {/* Logo */}
      <div ref={logoRef} className="mb-12">
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-16 flex items-center justify-center bg-white rounded-xl shadow-lg border border-[#E2E8F0]">
            <img 
              src="/logo.jpeg" 
              alt="AlphaSynth Logo" 
              className="w-14 h-14 object-contain"
            />
          </div>
          <div>
            <div className="text-[32px] font-bold leading-tight">
              <span className="text-[#1B2A4A]">Alpha</span>
              <span className="text-[#0D7C8C]">Synth</span>
            </div>
            <div className="text-[10px] text-[#718096] tracking-[0.12em] uppercase leading-tight">
              Powered by Intellectus AI Labs
            </div>
          </div>
        </div>
      </div>

      {/* Loading text */}
      <div ref={textRef} className="mb-6">
        <p className="text-[#718096] text-[16px] font-medium">
          Initializing Sequential Conviction Engine...
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-[#E2E8F0] rounded-full overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-[#0D7C8C] to-[#2E4D8E] rounded-full origin-left"
          style={{
            width: `${Math.min(progress, 100)}%`,
            transition: 'width 0.1s ease-out'
          }}
        />
      </div>

      {/* Progress percentage */}
      <div className="mt-4 text-[#0D7C8C] text-[14px] font-bold">
        {Math.floor(Math.min(progress, 100))}%
      </div>
    </div>
  )
}
