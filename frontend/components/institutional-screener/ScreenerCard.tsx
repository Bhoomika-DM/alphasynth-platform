'use client'

import { useState } from 'react'
import { Info } from 'lucide-react'

interface ScreenerCardProps {
  id: string
  title: string
  description: string
  emoji: string
  factors: string[]
  accentColor: string
  bgColor: string
  borderColor: string
}

export default function ScreenerCard({
  id,
  title,
  description,
  emoji,
  factors,
  accentColor,
  bgColor,
  borderColor,
}: ScreenerCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className="rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg border"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="text-2xl">{emoji}</div>
        <button className="p-1 rounded hover:bg-[#F8F9FB] transition-colors">
          <Info size={14} style={{ color: accentColor }} />
        </button>
      </div>

      <h3 className="text-sm font-bold mb-1 text-[#1B2A4A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {title}
      </h3>

      <p className="text-xs mb-3 text-[#718096] line-clamp-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {description}
      </p>

      <div className="flex flex-wrap gap-1">
        {factors.slice(0, 2).map((factor, idx) => (
          <span
            key={idx}
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: `${accentColor}15`,
              color: accentColor,
              border: `1px solid ${accentColor}30`,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {factor}
          </span>
        ))}
        {factors.length > 2 && (
          <span className="text-xs px-2 py-0.5 text-[#718096]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            +{factors.length - 2} more
          </span>
        )}
      </div>
    </div>
  )
}
