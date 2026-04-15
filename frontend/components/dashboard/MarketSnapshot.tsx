'use client'

import { useEffect, useRef } from 'react'
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react'
import { gsap } from 'gsap'

interface MarketSnapshotProps {
}

const marketData = [
  { name: 'NIFTY 50', value: '22,912', change: '+1.16%', positive: true, yahooSymbol: '^NSEI', trend: [20, 25, 22, 28, 35, 32, 40, 38, 45, 50] },
  { name: 'SENSEX', value: '74,168', change: '+1.48%', positive: true, yahooSymbol: '^BSESN', trend: [15, 20, 18, 25, 30, 28, 35, 40, 42, 48] },
  { name: 'BANK NIFTY', value: '52,086', change: '+0.71%', positive: true, yahooSymbol: '^NSEBANK', trend: [25, 22, 28, 30, 27, 32, 35, 38, 40, 45] },
  { name: 'NIFTY IT', value: '29,649', change: '+1.92%', positive: true, yahooSymbol: '^CNXIT', trend: [10, 15, 20, 25, 30, 35, 40, 45, 48, 52] },
  { name: 'NIFTY MIDCAP', value: '15,412', change: '+0.56%', positive: true, yahooSymbol: 'NIFTYMIDCAP.NS', trend: [30, 28, 32, 35, 33, 38, 40, 42, 44, 46] },
  { name: 'INDIA VIX', value: '24.74', change: '-0.85%', positive: false, yahooSymbol: '^INDIAVIX', trend: [50, 48, 45, 42, 40, 38, 35, 30, 28, 25] },
]

export default function MarketSnapshot({}: MarketSnapshotProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.market-card')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        }
      )
    }
  }, [])

  const generatePath = (trend: number[]) => {
    const width = 100
    const height = 60
    const points = trend.map((value, index) => {
      const x = (index / (trend.length - 1)) * width
      const y = height - (value / 60) * height
      return `${x},${y}`
    })
    return `M ${points.join(' L ')}`
  }

  return (
    <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {marketData.map((item, index) => (
        <a
          key={index}
          href={`https://finance.yahoo.com/quote/${item.yahooSymbol}`}
          target="_blank"
          rel="noopener noreferrer"
          className="market-card group relative bg-white border border-[#2E4D8E]/10 rounded-lg p-4 hover:border-[#2E4D8E]/30 hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-0.5 overflow-hidden block"
        >
          <div className="relative flex items-center gap-4">
            {/* Left side - Data */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-[10px] text-[#718096] uppercase tracking-[0.1em] font-semibold">
                  {item.name}
                </div>
                {item.positive ? (
                  <div className="w-1.5 h-1.5 bg-[#2E4D8E] rounded-full animate-pulse" />
                ) : (
                  <div className="w-1.5 h-1.5 bg-[#8C1A1A] rounded-full animate-pulse" />
                )}
              </div>
              
              <div className={`text-2xl font-bold tracking-tight text-[#2D3748]`}>
                {item.value}
              </div>
              
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold ${
                item.positive 
                  ? 'bg-[#2E4D8E]/10 text-[#2E4D8E] border border-[#2E4D8E]/20' 
                  : 'bg-[#8C1A1A]/10 text-[#8C1A1A] border border-[#8C1A1A]/20'
              }`}>
                {item.positive ? (
                  <IconTrendingUp className="w-3.5 h-3.5" stroke={1.5} />
                ) : (
                  <IconTrendingDown className="w-3.5 h-3.5" stroke={1.5} />
                )}
                {item.change}
              </div>
            </div>

            {/* Right side - Mini trend chart */}
            <div className="w-24 h-16 flex-shrink-0">
              <svg width="100%" height="100%" viewBox="0 0 100 60" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={item.positive ? '#2E4D8E' : '#8C1A1A'} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={item.positive ? '#2E4D8E' : '#8C1A1A'} stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Area fill */}
                <path
                  d={`${generatePath(item.trend)} L 100,60 L 0,60 Z`}
                  fill={`url(#gradient-${index})`}
                />
                {/* Line */}
                <path
                  d={generatePath(item.trend)}
                  fill="none"
                  stroke={item.positive ? '#2E4D8E' : '#8C1A1A'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}

