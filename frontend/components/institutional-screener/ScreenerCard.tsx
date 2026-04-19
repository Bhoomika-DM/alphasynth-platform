'use client'

import { useState } from 'react'
import { Info } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

interface ScreenerCardProps {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ size?: number; stroke?: number; color?: string }>
  factors: string[]
  accentColor: string
  bgColor: string
  borderColor: string
  onResultsClick?: () => void
}

// Factor weightages for each screener
const FACTOR_SCALES: Record<string, Record<string, number>> = {
  'quality-compounders': {
    'ROE > 15%': 100,
    'ROCE > 12%': 95,
    'Revenue CAGR > 10%': 85,
    'EPS CAGR > 10%': 90,
    'Debt/Equity < 0.5': 88,
  },
  'deep-value': {
    'P/E < 12': 100,
    'EV/EBITDA < 8': 98,
    'FCF Yield > 5%': 92,
    'Current Ratio > 1.5': 85,
    'Debt/Equity < 0.8': 80,
  },
  'growth-leaders': {
    'Revenue CAGR > 20%': 100,
    'EPS CAGR > 15%': 98,
    '12M Momentum > 20%': 90,
    'P/E < 25': 85,
    'ROE > 12%': 80,
  },
  'momentum-leaders': {
    '12M Momentum > 30%': 100,
    'Volatility < 30%': 92,
    'P/E < 20': 85,
    'Revenue CAGR > 10%': 75,
    'Current Ratio > 1.2': 70,
  },
  'multibagger-early': {
    'Revenue CAGR > 25%': 100,
    'EPS CAGR > 20%': 98,
    'P/E < 30': 90,
    'ROE > 10%': 85,
    'Debt/Equity < 1.0': 80,
  },
  'turnaround': {
    'ROE Improving': 100,
    'Margin Recovery': 95,
    'Debt Reduction': 90,
    'Early Momentum': 85,
    'P/E < 15': 80,
  },
  'low-risk-alpha': {
    'Volatility < 20%': 100,
    'Dividend Yield > 2%': 95,
    'Debt/Equity < 0.4': 92,
    'Current Ratio > 1.8': 88,
    'ROE > 12%': 85,
  },
}

export default function ScreenerCard({
  id,
  title,
  description,
  icon: Icon,
  factors,
  accentColor,
  bgColor,
  borderColor,
  onResultsClick,
}: ScreenerCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const scales = FACTOR_SCALES[id] || {}

  const handleCardClick = () => {
    if (!isExpanded) {
      setIsLoading(true)
      // Simulate API call delay
      setTimeout(() => {
        setIsLoading(false)
        // Trigger the parent callback
        if (onResultsClick) {
          onResultsClick()
        }
      }, 1500)
    }
  }

  return (
    <div
      className="rounded-2xl border transition-all duration-300 overflow-hidden hover:shadow-xl hover:scale-105 cursor-pointer group"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        borderWidth: '2px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        boxShadow: `0 4px 20px ${accentColor}10`,
      }}
    >
        {/* Collapsed View */}
        <div
          className="p-6 min-h-[220px] flex flex-col justify-between relative"
          onClick={handleCardClick}
        >
        {/* Accent bar at top */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
          style={{ backgroundColor: accentColor }}
        />

        <div>
          <div className="flex items-start justify-between mb-4 mt-2">
            <div
              className="p-3 rounded-xl transition-all group-hover:scale-110"
              style={{
                backgroundColor: `${accentColor}15`,
              }}
            >
              <Icon size={28} color={accentColor} stroke={1.5} />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
              className="p-2 rounded-lg transition-all hover:scale-110"
              style={{
                backgroundColor: `${accentColor}10`,
              }}
            >
              <Info
                size={18}
                style={{
                  color: accentColor,
                }}
              />
            </button>
          </div>

          <h3 className="text-lg font-bold mb-2 text-[#1B2A4A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {title}
          </h3>

          <p className="text-sm mb-4 text-[#718096] line-clamp-3 leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {description}
          </p>
        </div>

        {!isExpanded && (
          <div className="flex flex-wrap gap-2">
            {factors.slice(0, 2).map((factor, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: `${accentColor}15`,
                  color: accentColor,
                  border: `1.5px solid ${accentColor}40`,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {factor}
              </span>
            ))}
            {factors.length > 2 && (
              <span className="text-xs px-3 py-1.5 text-[#718096] font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                +{factors.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Click to Run Screener Hint */}
        {!isExpanded && !isLoading && (
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all">
            <div 
              className="px-2 py-1 rounded text-xs font-semibold"
              style={{
                backgroundColor: accentColor,
                color: 'white'
              }}
            >
              Click to run →
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-2xl">
            <div className="text-center">
              <div 
                className="w-8 h-8 border-3 border-t-transparent rounded-full animate-spin mx-auto mb-2"
                style={{ borderColor: accentColor, borderTopColor: 'transparent' }}
              />
              <div className="text-sm font-semibold" style={{ color: accentColor }}>
                Running screener...
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Expanded View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t"
            style={{ borderColor: `${borderColor}40` }}
          >
            <div className="p-6 space-y-4">
              <div className="text-xs font-bold text-[#1B2A4A] mb-4 uppercase tracking-widest" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                📊 Factor Weightage
              </div>

              {factors.map((factor, idx) => {
                const scale = scales[factor] || 75
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-sm font-semibold"
                        style={{
                          color: accentColor,
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                      >
                        {factor}
                      </span>
                      <span
                        className="text-sm font-bold px-2.5 py-1 rounded-lg"
                        style={{
                          color: accentColor,
                          backgroundColor: `${accentColor}15`,
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                      >
                        {scale}%
                      </span>
                    </div>
                    <div
                      className="w-full h-2 rounded-full overflow-hidden"
                      style={{
                        backgroundColor: `${accentColor}20`,
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${scale}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: accentColor,
                          boxShadow: `0 0 12px ${accentColor}60`,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
