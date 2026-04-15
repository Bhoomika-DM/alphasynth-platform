'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface SentimentCardProps {
}

export default function SentimentCard({}: SentimentCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 }
      )
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="relative group bg-white border border-[#2E4D8E]/10 rounded-xl p-6 hover:border-[#2E4D8E]/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="relative space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-[#2D3748] mb-1">Market Sentiment</h3>
            <p className="text-sm text-[#718096] uppercase tracking-[0.15em]">
              Real-time Analysis
            </p>
          </div>
          <div className="px-3 py-1.5 bg-[#2E4D8E]/10 border border-[#2E4D8E]/30 rounded-md">
            <span className="text-sm font-bold text-[#2E4D8E] uppercase tracking-wide">
              Live
            </span>
          </div>
        </div>

        {/* Main Sentiment Display */}
        <div className="relative p-5 bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-[#2D3748] uppercase tracking-wider mb-2 font-semibold">Market Signal</div>
              <div className="flex items-center gap-3">
                <div className="text-6xl font-black text-[#2E4D8E]">
                  72
                </div>
                <div className="flex flex-col gap-1">
                  <div className="px-3 py-1.5 bg-[#2E4D8E]/20 border border-[#2E4D8E]/40 rounded-md">
                    <span className="text-base font-bold text-[#2E4D8E]">BULLISH</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-[#2E4D8E]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base font-bold text-[#2E4D8E]">+1.72%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Visual Indicator */}
            <div className="flex flex-col items-end gap-2">
              <div className="text-sm text-[#2D3748] uppercase tracking-wider font-semibold">Strength</div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((bar) => (
                  <div
                    key={bar}
                    className={`w-2 rounded-full ${
                      bar <= 4 ? 'bg-[#2E4D8E]' : 'bg-[#E5E7EB]'
                    }`}
                    style={{ height: `${bar * 8 + 16}px` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sentiment Scale */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-[#718096] uppercase tracking-wider">
              <span>Bearish</span>
              <span>Neutral</span>
              <span>Bullish</span>
            </div>
            <div className="relative h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
              <div className="absolute inset-0 flex">
                <div className="w-1/3 bg-gradient-to-r from-[#8C1A1A] to-[#D62828]" />
                <div className="w-1/3 bg-gradient-to-r from-[#B8860B] to-[#F0CA7A]" />
                <div className="w-1/3 bg-gradient-to-r from-[#0D7C8C] to-[#2E4D8E]" />
              </div>
              {/* Position Indicator */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-1 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-1000"
                style={{ left: '72%' }}
              />
            </div>
            <div className="flex justify-between text-xs text-[#2D3748] uppercase tracking-wider font-medium">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
        </div>

        {/* Stock Distribution */}
        <div className="grid grid-cols-3 gap-3">
          {/* Bullish Stocks */}
          <div className="p-4 bg-[#F8F9FB] border border-[#2E4D8E]/10 rounded-lg hover:border-[#2E4D8E]/30 transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-[#2D3748] uppercase tracking-wider font-semibold">Bullish</div>
              <div className="w-2 h-2 bg-[#2E4D8E] rounded-full animate-pulse" />
            </div>
            <div className="text-4xl font-black text-[#2E4D8E]">41</div>
            <div className="text-xs text-[#718096] mt-1">trending up</div>
          </div>

          {/* Neutral Stocks */}
          <div className="p-4 bg-[#F8F9FB] border border-[#B8860B]/10 rounded-lg hover:border-[#B8860B]/30 transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-[#2D3748] uppercase tracking-wider font-semibold">Neutral</div>
              <div className="w-2 h-2 bg-[#B8860B] rounded-full animate-pulse" />
            </div>
            <div className="text-4xl font-black text-[#B8860B]">1</div>
            <div className="text-xs text-[#718096] mt-1">sideways</div>
          </div>

          {/* Bearish Stocks */}
          <div className="p-4 bg-[#F8F9FB] border border-[#8C1A1A]/10 rounded-lg hover:border-[#8C1A1A]/30 transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-[#2D3748] uppercase tracking-wider font-semibold">Bearish</div>
              <div className="w-2 h-2 bg-[#8C1A1A] rounded-full animate-pulse" />
            </div>
            <div className="text-4xl font-black text-[#8C1A1A]">5</div>
            <div className="text-xs text-[#718096] mt-1">trending down</div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Market Breadth */}
          <div className="p-4 bg-[#F8F9FB] border border-[#2E4D8E]/10 rounded-lg hover:border-[#2E4D8E]/30 transition-all duration-200">
            <div className="text-sm text-[#2D3748] uppercase tracking-wider mb-2 font-semibold">Advance/Decline</div>
            <div className="flex items-baseline gap-1">
              <div className="text-3xl font-black text-[#2D3748]">8.2</div>
              <div className="text-sm text-[#718096]">ratio</div>
            </div>
            <div className="text-xs text-[#718096] mt-1">strong buying pressure</div>
          </div>

          {/* Volume Trend */}
          <div className="p-4 bg-[#F8F9FB] border border-[#2E4D8E]/10 rounded-lg hover:border-[#2E4D8E]/30 transition-all duration-200">
            <div className="text-sm text-[#2D3748] uppercase tracking-wider mb-2 font-semibold">Volume</div>
            <div className="flex items-baseline gap-1">
              <div className="text-3xl font-black text-[#2D3748]">142%</div>
              <div className="text-sm text-[#2E4D8E]">↑</div>
            </div>
            <div className="text-xs text-[#718096] mt-1">above 20-day avg</div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#F8F9FB] rounded-lg border border-[#2E4D8E]/10">
          <span className="text-sm text-[#2D3748] font-medium">Nifty 50 avg change</span>
          <span className="text-base font-bold text-[#2E4D8E]">+1.72%</span>
        </div>
      </div>
    </div>
  )
}

