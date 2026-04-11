'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface HeatmapProps {
}

export default function Heatmap({}: HeatmapProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [selectedPeriod, setSelectedPeriod] = useState('1D')

  const periods = ['1D', '1W', '1M', '3M', '6M', '1Y', 'ALL']

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.4 }
      )
    }
  }, [])

  // Dynamic sector data based on selected time period
  const getSectorData = (period: string) => {
    const dataByPeriod: Record<string, any[]> = {
      '1D': [
        { name: 'Metals & Mining', change: 3.5, stocks: 'JSW, Tata Steel', volume: 'Med', trend: 'up' },
        { name: 'Infrastructure', change: 3.2, stocks: 'L&T, Adani Ent', volume: 'Med', trend: 'up' },
        { name: 'Banking & Finance', change: 2.4, stocks: 'HDFC, ICICI, SBI', volume: 'High', trend: 'up' },
        { name: 'IT & Tech', change: 2.3, stocks: 'TCS, Infy, HCL', volume: 'High', trend: 'up' },
        { name: 'Auto', change: 1.7, stocks: 'M&M, Tata Motors', volume: 'Med', trend: 'up' },
        { name: 'Pharma', change: 0.8, stocks: 'Sun, Dr Reddy', volume: 'Low', trend: 'up' },
        { name: 'FMCG', change: 0.5, stocks: 'HUL, ITC, Nestle', volume: 'Low', trend: 'up' },
        { name: 'Telecom', change: 0.0, stocks: 'Airtel, Jio', volume: 'Med', trend: 'neutral' },
        { name: 'Real Estate', change: -0.2, stocks: 'DLF, Godrej Prop', volume: 'Low', trend: 'neutral' },
        { name: 'Energy & Oil', change: -1.2, stocks: 'Reliance, ONGC', volume: 'High', trend: 'down' },
      ],
      '1W': [
        { name: 'IT & Tech', change: 5.8, stocks: 'TCS, Infy, HCL', volume: 'High', trend: 'up' },
        { name: 'Banking & Finance', change: 4.2, stocks: 'HDFC, ICICI, SBI', volume: 'High', trend: 'up' },
        { name: 'Pharma', change: 3.1, stocks: 'Sun, Dr Reddy', volume: 'Med', trend: 'up' },
        { name: 'Auto', change: 2.5, stocks: 'M&M, Tata Motors', volume: 'Med', trend: 'up' },
        { name: 'FMCG', change: 1.8, stocks: 'HUL, ITC, Nestle', volume: 'Low', trend: 'up' },
        { name: 'Metals & Mining', change: 1.2, stocks: 'JSW, Tata Steel', volume: 'Med', trend: 'up' },
        { name: 'Infrastructure', change: 0.5, stocks: 'L&T, Adani Ent', volume: 'Low', trend: 'up' },
        { name: 'Telecom', change: -0.3, stocks: 'Airtel, Jio', volume: 'Med', trend: 'neutral' },
        { name: 'Real Estate', change: -1.5, stocks: 'DLF, Godrej Prop', volume: 'Low', trend: 'down' },
        { name: 'Energy & Oil', change: -2.8, stocks: 'Reliance, ONGC', volume: 'High', trend: 'down' },
      ],
      '1M': [
        { name: 'Banking & Finance', change: 8.5, stocks: 'HDFC, ICICI, SBI', volume: 'High', trend: 'up' },
        { name: 'IT & Tech', change: 7.2, stocks: 'TCS, Infy, HCL', volume: 'High', trend: 'up' },
        { name: 'Auto', change: 6.3, stocks: 'M&M, Tata Motors', volume: 'Med', trend: 'up' },
        { name: 'Pharma', change: 4.7, stocks: 'Sun, Dr Reddy', volume: 'Med', trend: 'up' },
        { name: 'Infrastructure', change: 3.8, stocks: 'L&T, Adani Ent', volume: 'Med', trend: 'up' },
        { name: 'FMCG', change: 2.1, stocks: 'HUL, ITC, Nestle', volume: 'Low', trend: 'up' },
        { name: 'Telecom', change: 0.8, stocks: 'Airtel, Jio', volume: 'Med', trend: 'up' },
        { name: 'Metals & Mining', change: -1.2, stocks: 'JSW, Tata Steel', volume: 'Med', trend: 'down' },
        { name: 'Real Estate', change: -2.5, stocks: 'DLF, Godrej Prop', volume: 'Low', trend: 'down' },
        { name: 'Energy & Oil', change: -3.4, stocks: 'Reliance, ONGC', volume: 'High', trend: 'down' },
      ],
      '3M': [
        { name: 'Auto', change: 12.8, stocks: 'M&M, Tata Motors', volume: 'High', trend: 'up' },
        { name: 'Banking & Finance', change: 11.5, stocks: 'HDFC, ICICI, SBI', volume: 'High', trend: 'up' },
        { name: 'Infrastructure', change: 9.2, stocks: 'L&T, Adani Ent', volume: 'Med', trend: 'up' },
        { name: 'IT & Tech', change: 8.7, stocks: 'TCS, Infy, HCL', volume: 'High', trend: 'up' },
        { name: 'Pharma', change: 5.3, stocks: 'Sun, Dr Reddy', volume: 'Med', trend: 'up' },
        { name: 'FMCG', change: 3.9, stocks: 'HUL, ITC, Nestle', volume: 'Low', trend: 'up' },
        { name: 'Telecom', change: 2.1, stocks: 'Airtel, Jio', volume: 'Med', trend: 'up' },
        { name: 'Real Estate', change: 0.5, stocks: 'DLF, Godrej Prop', volume: 'Low', trend: 'up' },
        { name: 'Metals & Mining', change: -2.8, stocks: 'JSW, Tata Steel', volume: 'Med', trend: 'down' },
        { name: 'Energy & Oil', change: -4.2, stocks: 'Reliance, ONGC', volume: 'High', trend: 'down' },
      ],
      '6M': [
        { name: 'Banking & Finance', change: 18.3, stocks: 'HDFC, ICICI, SBI', volume: 'High', trend: 'up' },
        { name: 'Auto', change: 16.5, stocks: 'M&M, Tata Motors', volume: 'High', trend: 'up' },
        { name: 'IT & Tech', change: 14.2, stocks: 'TCS, Infy, HCL', volume: 'High', trend: 'up' },
        { name: 'Infrastructure', change: 12.7, stocks: 'L&T, Adani Ent', volume: 'Med', trend: 'up' },
        { name: 'Pharma', change: 8.9, stocks: 'Sun, Dr Reddy', volume: 'Med', trend: 'up' },
        { name: 'FMCG', change: 6.2, stocks: 'HUL, ITC, Nestle', volume: 'Low', trend: 'up' },
        { name: 'Telecom', change: 4.5, stocks: 'Airtel, Jio', volume: 'Med', trend: 'up' },
        { name: 'Real Estate', change: 2.8, stocks: 'DLF, Godrej Prop', volume: 'Low', trend: 'up' },
        { name: 'Metals & Mining', change: -1.5, stocks: 'JSW, Tata Steel', volume: 'Med', trend: 'down' },
        { name: 'Energy & Oil', change: -3.8, stocks: 'Reliance, ONGC', volume: 'High', trend: 'down' },
      ],
      '1Y': [
        { name: 'Banking & Finance', change: 28.5, stocks: 'HDFC, ICICI, SBI', volume: 'High', trend: 'up' },
        { name: 'Auto', change: 24.8, stocks: 'M&M, Tata Motors', volume: 'High', trend: 'up' },
        { name: 'IT & Tech', change: 22.3, stocks: 'TCS, Infy, HCL', volume: 'High', trend: 'up' },
        { name: 'Infrastructure', change: 19.7, stocks: 'L&T, Adani Ent', volume: 'Med', trend: 'up' },
        { name: 'Pharma', change: 15.2, stocks: 'Sun, Dr Reddy', volume: 'Med', trend: 'up' },
        { name: 'Telecom', change: 12.8, stocks: 'Airtel, Jio', volume: 'Med', trend: 'up' },
        { name: 'FMCG', change: 9.5, stocks: 'HUL, ITC, Nestle', volume: 'Low', trend: 'up' },
        { name: 'Real Estate', change: 6.3, stocks: 'DLF, Godrej Prop', volume: 'Low', trend: 'up' },
        { name: 'Metals & Mining', change: 3.2, stocks: 'JSW, Tata Steel', volume: 'Med', trend: 'up' },
        { name: 'Energy & Oil', change: -2.5, stocks: 'Reliance, ONGC', volume: 'High', trend: 'down' },
      ],
      'ALL': [
        { name: 'IT & Tech', change: 45.8, stocks: 'TCS, Infy, HCL', volume: 'High', trend: 'up' },
        { name: 'Banking & Finance', change: 42.3, stocks: 'HDFC, ICICI, SBI', volume: 'High', trend: 'up' },
        { name: 'Auto', change: 38.5, stocks: 'M&M, Tata Motors', volume: 'High', trend: 'up' },
        { name: 'Pharma', change: 32.7, stocks: 'Sun, Dr Reddy', volume: 'Med', trend: 'up' },
        { name: 'Infrastructure', change: 28.9, stocks: 'L&T, Adani Ent', volume: 'Med', trend: 'up' },
        { name: 'Telecom', change: 24.5, stocks: 'Airtel, Jio', volume: 'Med', trend: 'up' },
        { name: 'FMCG', change: 18.2, stocks: 'HUL, ITC, Nestle', volume: 'Low', trend: 'up' },
        { name: 'Real Estate', change: 12.8, stocks: 'DLF, Godrej Prop', volume: 'Low', trend: 'up' },
        { name: 'Metals & Mining', change: 8.5, stocks: 'JSW, Tata Steel', volume: 'Med', trend: 'up' },
        { name: 'Energy & Oil', change: 5.2, stocks: 'Reliance, ONGC', volume: 'High', trend: 'up' },
      ],
    }
    return dataByPeriod[period] || dataByPeriod['1D']
  }

  const sectors = getSectorData(selectedPeriod)

  const getChangeColor = (change: number) => {
    if (change > 2) return 'text-green-400 bg-green-500/10'
    if (change > 0) return 'text-green-400 bg-green-500/5'
    if (change === 0) return 'text-yellow-400 bg-yellow-500/10'
    if (change > -1) return 'text-yellow-400 bg-yellow-500/5'
    if (change < -1) return 'text-red-400 bg-red-500/10'
    return 'text-red-400 bg-red-500/5'
  }

  const getBarColor = (change: number) => {
    if (change > 0) return 'bg-green-500'
    if (change === 0) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getVolumeColor = (volume: string) => {
    if (volume === 'High') return 'bg-green-500'
    if (volume === 'Med') return 'bg-yellow-500'
    return 'bg-gray-500'
  }

  return (
    <div ref={cardRef} className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-2xl font-jakarta font-bold text-white mb-1">Sector Performance</h4>
          <p className="text-base font-jakarta text-white/80">Live market overview</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Time Period Filters */}
          <div className="flex items-center gap-1 p-1 bg-white border border-[#6A994E]/10 rounded-md">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-md text-sm font-jakarta font-semibold transition-all duration-200 ${
                  selectedPeriod === period
                    ? 'bg-[#A7C4A0] text-[#1F2933] border border-[#6A994E]/20'
                    : 'text-[#6B7280] hover:text-[#1F2933] hover:bg-[#F4F7F2]'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-white/[0.03] border-b border-white/[0.08]">
          <div className="text-sm font-jakarta font-bold text-white uppercase tracking-wider">Sector</div>
          <div className="text-sm font-jakarta font-bold text-white uppercase tracking-wider">Change</div>
          <div className="text-sm font-jakarta font-bold text-white uppercase tracking-wider">Top Stocks</div>
          <div className="text-sm font-jakarta font-bold text-white uppercase tracking-wider">Volume</div>
          <div className="text-sm font-jakarta font-bold text-white uppercase tracking-wider">Trend</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-white/[0.05]">
          {sectors.map((sector, idx) => (
            <div
              key={sector.name}
              className="grid grid-cols-5 gap-4 px-6 py-4 hover:bg-white/[0.03] transition-all duration-200 group"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {/* Sector Name */}
              <div className="flex items-center gap-3">
                <div className={`w-1 h-8 rounded-full ${getBarColor(sector.change)}`} />
                <span className="text-base font-jakarta font-semibold text-white">{sector.name}</span>
              </div>

              {/* Change */}
              <div className="flex items-center">
                <div className={`px-3 py-1.5 rounded-lg ${getChangeColor(sector.change)}`}>
                  <span className="text-base font-jakarta font-bold">
                    {sector.change > 0 ? '+' : ''}{sector.change}%
                  </span>
                </div>
              </div>

              {/* Top Stocks */}
              <div className="flex items-center">
                <span className="text-sm font-jakarta text-white/80">{sector.stocks}</span>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${getVolumeColor(sector.volume)}`} />
                <span className="text-sm font-jakarta text-white">{sector.volume}</span>
              </div>

              {/* Trend */}
              <div className="flex items-center">
                {sector.trend === 'up' ? (
                  <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                ) : sector.trend === 'neutral' ? (
                  <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-5 gap-4">
        <div className="p-4 bg-white border border-[#6A994E]/20 rounded-lg">
          <div className="text-sm font-jakarta text-[#6B7280] mb-1 font-medium">Top Gainer</div>
          <div className="text-xl font-jakarta font-black text-[#6A994E]">
            {sectors.reduce((max, s) => s.change > max.change ? s : max).name.split(' ')[0]} {sectors.reduce((max, s) => s.change > max.change ? s : max).change > 0 ? '+' : ''}{sectors.reduce((max, s) => s.change > max.change ? s : max).change}%
          </div>
        </div>
        <div className="p-4 bg-white border border-[#BC4749]/20 rounded-lg">
          <div className="text-sm font-jakarta text-[#6B7280] mb-1 font-medium">Top Loser</div>
          <div className="text-xl font-jakarta font-black text-[#BC4749]">
            {sectors.reduce((min, s) => s.change < min.change ? s : min).name.split(' ')[0]} {sectors.reduce((min, s) => s.change < min.change ? s : min).change}%
          </div>
        </div>
        <div className="p-4 bg-white border border-[#6A994E]/20 rounded-lg">
          <div className="text-sm font-jakarta text-[#6B7280] mb-1 font-medium">Advancing</div>
          <div className="text-xl font-jakarta font-black text-[#1F2933]">{sectors.filter(s => s.change > 0).length} sectors</div>
        </div>
        <div className="p-4 bg-white border border-[#E5B960]/20 rounded-lg">
          <div className="text-sm font-jakarta text-[#6B7280] mb-1 font-medium">Neutral</div>
          <div className="text-xl font-jakarta font-black text-[#E5B960]">{sectors.filter(s => s.change === 0).length} sectors</div>
        </div>
        <div className="p-4 bg-white border border-[#BC4749]/20 rounded-lg">
          <div className="text-sm font-jakarta text-[#6B7280] mb-1 font-medium">Declining</div>
          <div className="text-xl font-jakarta font-black text-[#1F2933]">{sectors.filter(s => s.change < 0).length} sector{sectors.filter(s => s.change < 0).length !== 1 ? 's' : ''}</div>
        </div>
      </div>
    </div>
  )
}
