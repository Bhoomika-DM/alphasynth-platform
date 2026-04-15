'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { IconStar } from '@tabler/icons-react'

export default function AlphaSynthHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const spanRef = useRef<HTMLSpanElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Force white color on the span
    if (spanRef.current) {
      spanRef.current.style.setProperty('color', '#FFFFFF', 'important')
    }
    
    if (typeof window === 'undefined') return
    if (!heroRef.current) return

    try {
      const ctx = gsap.context(() => {
        // Hero title animation
        if (titleRef.current) {
          gsap.from(titleRef.current, {
            duration: 1,
            opacity: 0,
            y: 30,
            ease: 'power2.out',
          })
        }

        // Subtitle animation
        if (subtitleRef.current) {
          gsap.from(subtitleRef.current, {
            duration: 1,
            opacity: 0,
            y: 20,
            delay: 0.2,
            ease: 'power2.out',
          })
        }

        // Buttons animation - set initial state to visible
        if (buttonsRef.current) {
          gsap.set(buttonsRef.current.children, { opacity: 1, y: 0 })
          gsap.from(buttonsRef.current.children, {
            duration: 0.8,
            opacity: 0,
            y: 15,
            delay: 0.4,
            stagger: 0.1,
            ease: 'power2.out',
          })
        }
      }, heroRef)

      return () => {
        ctx.revert()
      }
    } catch (error) {
      console.error('Hero animation error:', error)
    }
  }, [])

  return (
    <>
      <style jsx>{`
        .hero-btn {
          color: #FFFFFF !important;
          background-color: #1B2A4A !important;
          padding: 14px 28px !important;
          font-size: 15px !important;
          font-weight: 700 !important;
          border-radius: 8px !important;
          border: none !important;
          cursor: pointer !important;
          box-shadow: 0 4px 20px rgba(27,42,74,0.25) !important;
          display: inline-block !important;
          text-decoration: none !important;
          transition: all 0.2s ease !important;
          line-height: 1 !important;
          margin: 0 !important;
        }
        .hero-btn:hover {
          background-color: #243756 !important;
          box-shadow: 0 8px 32px rgba(27,42,74,0.3) !important;
          transform: translateY(-2px) !important;
          color: #FFFFFF !important;
        }
        .hero-btn-outline {
          color: #1B2A4A !important;
          background-color: transparent !important;
          padding: 14px 28px !important;
          font-size: 15px !important;
          font-weight: 600 !important;
          border-radius: 8px !important;
          border: 1.5px solid #E2E8F0 !important;
          cursor: pointer !important;
          display: inline-block !important;
          text-decoration: none !important;
          transition: all 0.2s ease !important;
          line-height: 1 !important;
          margin: 0 !important;
        }
        .hero-btn-outline:hover {
          background-color: #EEF2F7 !important;
          border-color: #1B2A4A !important;
          color: #1B2A4A !important;
        }
        .mockup-header-text {
          color: #FFFFFF !important;
        }
      `}</style>
      <section
        ref={heroRef}
        className="pt-[160px] pb-[100px] bg-gradient-to-br from-[#F8F9FB] via-[#EEF2F7] to-[#F0F7F8] relative overflow-visible"
      >
      <div className="absolute top-[-200px] right-[-200px] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(13,124,140,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-10">
        <div className="grid grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[rgba(13,124,140,0.08)] border border-[rgba(13,124,140,0.2)] text-[#0D7C8C] text-[12px] font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wide">
              <span className="animate-pulse">●</span>
              NSE Certified · India-First Platform
            </div>

            <h1
              ref={titleRef}
              className="text-[52px] font-extrabold text-[#1B2A4A] leading-[1.1] tracking-tight mb-6"
            >
              Research that <em className="not-italic text-[#0D7C8C]">thinks</em>
              <br />
              as rigorously
              <br />
              as you do.
            </h1>

            <p
              ref={subtitleRef}
              className="text-[18px] text-[#718096] leading-relaxed mb-10 max-w-[480px]"
            >
              AlphaSynth is the investment intelligence platform built for India's equity professionals — where every number is calculated, never guessed, and every insight is earned through evidence.
            </p>

            <div ref={buttonsRef} className="flex gap-4 mb-14">
              <a 
                href="#cta" 
                className="hero-btn"
                style={{
                  color: '#FFFFFF !important',
                  backgroundColor: '#1B2A4A',
                  padding: '14px 28px',
                  fontSize: '15px',
                  fontWeight: '700',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(27,42,74,0.25)',
                  display: 'inline-block',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  lineHeight: '1',
                  margin: '0'
                }}
              >
                Request a Demo
              </a>
              <a 
                href="/dashboard" 
                className="hero-btn-outline"
                style={{
                  color: '#FFFFFF',
                  backgroundColor: '#0D7C8C',
                  padding: '14px 28px',
                  fontSize: '15px',
                  fontWeight: '600',
                  borderRadius: '8px',
                  border: '1.5px solid #0D7C8C',
                  cursor: 'pointer',
                  display: 'inline-block',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  lineHeight: '1',
                  margin: '0'
                }}
              >
                Explore the Platform
              </a>
            </div>

            <div className="flex gap-10">
              <div>
                <div className="text-[28px] font-extrabold text-[#1B2A4A] tracking-tight">6</div>
                <div className="text-[12px] text-[#718096] mt-1">Analytical Pillars</div>
              </div>
              <div>
                <div className="text-[28px] font-extrabold text-[#1B2A4A] tracking-tight">200+</div>
                <div className="text-[12px] text-[#718096] mt-1">Calculations, All Deterministic</div>
              </div>
              <div>
                <div className="text-[28px] font-extrabold text-[#1B2A4A] tracking-tight">0</div>
                <div className="text-[12px] text-[#718096] mt-1">Hallucinated Numbers</div>
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-[0_24px_80px_rgba(27,42,74,0.12),0_4px_16px_rgba(27,42,74,0.06)] overflow-hidden border border-[#E2E8F0]">
              <div className="bg-[#1B2A4A] px-5 py-3.5 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                <span 
                  ref={spanRef} 
                  className="text-[12px] ml-2.5 font-mono mockup-header-text" 
                  key="mockup-header-white-v2"
                >
                  AlphaSynth · Quality Compounders
                </span>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-6 gap-3 text-[11px] font-semibold text-[#718096] uppercase tracking-wide pb-1.5 border-b border-[#E2E8F0]">
                  <span>#</span>
                  <span>Stock</span>
                  <span>AS Score</span>
                  <span>P/E</span>
                  <span>ROE</span>
                  <span>Signal</span>
                </div>
                {[
                  { rank: 1, name: 'ASIAN PAINTS', sector: 'Consumer Goods', score: 88, pe: '53.2', roe: '27.4%', signal: 'BUY' },
                  { rank: 2, name: 'HDFC BANK', sector: 'Banking', score: 82, pe: '19.1', roe: '17.8%', signal: 'BUY' },
                  { rank: 3, name: 'PIDILITE IND', sector: 'Chemicals', score: 76, pe: '72.4', roe: '23.1%', signal: 'HOLD' },
                ].map((stock) => (
                  <div key={stock.rank} className="grid grid-cols-6 gap-3 items-center py-2.5 border-b border-[#E2E8F0] text-[13px]">
                    <span className="text-[12px] text-[#718096] font-semibold text-center">{stock.rank}</span>
                    <div>
                      <div className="font-bold text-[#1B2A4A]">{stock.name}</div>
                      <div className="text-[11px] text-[#718096]">{stock.sector}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-[#EEF2F7] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#0D7C8C] to-[#0A9CAF]"
                          style={{ width: `${stock.score}%` }}
                        />
                      </div>
                      <span className="text-[12px] font-bold text-[#0D7C8C] min-w-[26px]">{stock.score}</span>
                    </div>
                    <span className="text-[#2D3748] font-medium">{stock.pe}</span>
                    <span className="text-[#1A6B3A] font-medium">{stock.roe}</span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${stock.signal === 'BUY' ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#FEF9C3] text-[#854D0E]'}`}>
                      {stock.signal}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Float Badge */}
            <div className="absolute bottom-[-20px] right-[-20px] bg-white rounded-3xl p-3.5 shadow-[0_8px_32px_rgba(27,42,74,0.12)] border border-[#E2E8F0] flex items-center gap-3 min-w-[200px]">
              <div className="w-10 h-10 bg-[#E0F4F6] rounded-2xl flex items-center justify-center">
                <IconStar size={20} className="text-[#0D7C8C]" />
              </div>
              <div>
                <div className="text-[11px] text-[#718096]">Portfolio Health Score</div>
                <div className="text-[16px] font-extrabold text-[#1B2A4A]">74 / 100</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
