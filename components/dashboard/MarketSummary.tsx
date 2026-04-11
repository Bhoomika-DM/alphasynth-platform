'use client'

import { useEffect, useRef } from 'react'
import { IconTrendingUp, IconTrendingDown, IconMinus } from '@tabler/icons-react'
import { gsap } from 'gsap'

interface MarketSummaryProps {
}

const newsItems = [
  {
    category: 'NIFTY',
    sentiment: 'bullish',
    title: 'Sensex surges 1372 pts, Nifty above 52,500 as markets rebound over 2%',
    time: '2 hours ago'
  },
  {
    category: 'MARKET',
    sentiment: 'bearish',
    title: 'Trump: delays US tariffs on cars for 5 days, easing Weed Asia tensions',
    time: '4 hours ago'
  },
  {
    category: 'EARNINGS',
    sentiment: 'bullish',
    title: 'FPIs record Rs 1.5a trillion outflows in March amid geopolitical headwinds',
    time: '6 hours ago'
  },
  {
    category: 'SECTOR',
    sentiment: 'neutral',
    title: 'Banking and IT sectors lead rally with Nifty Bank up 2.8%',
    time: '8 hours ago'
  },
  {
    category: 'POLICY',
    sentiment: 'bullish',
    title: 'RBI releases MPC schedule for FY 2025-27, meet meet April 6-8',
    time: '10 hours ago'
  }
]

export default function MarketSummary({}: MarketSummaryProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 0.4 }
      )
    }
  }, [])

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return <IconTrendingUp className="w-4 h-4 text-[#6A994E]" stroke={1.5} />
      case 'bearish':
        return <IconTrendingDown className="w-4 h-4 text-[#BC4749]" stroke={1.5} />
      default:
        return <IconMinus className="w-4 h-4 text-[#6B7280]" stroke={1.5} />
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      NIFTY: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      MARKET: 'bg-[#BC4749]/10 text-[#BC4749] border-[#BC4749]/20',
      EARNINGS: 'bg-[#E5B960]/10 text-[#E5B960] border-[#E5B960]/20',
      SECTOR: 'bg-[#A7C4A0]/10 text-[#A7C4A0] border-[#A7C4A0]/20',
      POLICY: 'bg-[#6A994E]/10 text-[#6A994E] border-[#6A994E]/20'
    }
    return colors[category] || 'bg-[#F4F7F2] text-[#6B7280] border-[#6A994E]/10'
  }

  return (
    <div
      ref={cardRef}
      className="relative group bg-white border border-[#6A994E]/10 rounded-xl p-8 hover:border-[#6A994E]/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="relative space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-jakarta font-bold text-[#1F2933] mb-1">Market Summary</h3>
            <p className="text-xs font-jakarta text-[#6B7280] uppercase tracking-[0.15em]">
              Latest Updates
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#6A994E]/10 border border-[#6A994E]/30 rounded-md">
            <div className="w-1.5 h-1.5 bg-[#6A994E] rounded-full animate-pulse" />
            <span className="text-xs font-jakarta font-bold text-[#6A994E] uppercase tracking-wide">
              Live
            </span>
          </div>
        </div>

        <p className="text-sm font-jakarta text-[#6B7280] leading-relaxed">
          Indian stock markets rallied sharply over 2% on March 25, 2026, with Nifty and Sensex surging as banking and IT sectors led gains 
          amid a US pause in tariffs on two major geopolitical tensions.
        </p>

        <div className="space-y-3">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="group/news relative bg-[#F4F7F2] hover:bg-white border border-[#6A994E]/10 hover:border-[#6A994E]/30 rounded-lg p-4 transition-all duration-200 cursor-pointer overflow-hidden"
            >
              <div className="relative flex items-start gap-3">
                <div className="mt-1 p-1.5 bg-white rounded-md group-hover/news:bg-[#F4F7F2] transition-colors border border-[#6A994E]/10">
                  {getSentimentIcon(item.sentiment)}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-1 border rounded-lg text-[10px] font-jakarta font-bold uppercase tracking-wider ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    <span className="text-[10px] font-jakarta text-[#6B7280]">{item.time}</span>
                  </div>
                  <p className="text-sm font-jakarta text-[#1F2933] group-hover/news:text-[#6A994E] transition-colors leading-relaxed font-medium">
                    {item.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
