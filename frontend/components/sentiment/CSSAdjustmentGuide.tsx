'use client'

import { motion } from 'framer-motion'
import { IconChartBar } from '@tabler/icons-react'

interface CSSRange {
  range: string
  label: string
  sentiment: string
  buySignal: string
  sellSignal: string
  description: string
  color: string
  bgColor: string
  borderColor: string
  isHighlight?: boolean
}

const CSS_RANGES: CSSRange[] = [
  {
    range: '1.0-1.5',
    label: 'Extreme Fear / Panic',
    sentiment: '+0.5 to +0.7',
    buySignal: 'BUY signals: 80%+ (highest)',
    sellSignal: 'SELL signals: Skip entirely',
    description: 'Contrarian BUY window — multi-factor panic = deep undervaluation',
    color: 'text-red-400',
    bgColor: 'from-red-500/20 to-red-500/5',
    borderColor: 'border-red-500/30'
  },
  {
    range: '1.5-2.0',
    label: 'Strong Bearish',
    sentiment: '+0.3 to +0.5',
    buySignal: 'BUY signals: High reliability',
    sellSignal: 'SELL signals: Reduce position size',
    description: 'Significant undervaluation — accumulate quality stocks',
    color: 'text-orange-400',
    bgColor: 'from-orange-500/20 to-orange-500/5',
    borderColor: 'border-orange-500/30'
  },
  {
    range: '2.0-2.5',
    label: 'Moderately Bearish',
    sentiment: '+0.1 to +0.3',
    buySignal: 'BUY signals: Above avg, bullish bias',
    sellSignal: 'SELL signals: Normal with caution',
    description: 'Modest undervaluation — selective buying opportunities',
    color: 'text-yellow-400',
    bgColor: 'from-yellow-500/20 to-yellow-500/5',
    borderColor: 'border-yellow-500/30'
  },
  {
    range: '2.5-3.5',
    label: 'YOU ARE HERE — Neutral',
    sentiment: '0',
    buySignal: 'BUY signals: Standard',
    sellSignal: 'SELL signals: Standard',
    description: 'Sentiment balanced — fundamentals fairly priced',
    color: 'text-white',
    bgColor: 'from-white/10 to-white/5',
    borderColor: 'border-yellow-500/50',
    isHighlight: true
  },
  {
    range: '3.5-4.0',
    label: 'Moderately Bullish',
    sentiment: '-0.1 to -0.3',
    buySignal: 'BUY signals: Normal with caution',
    sellSignal: 'SELL signals: Above avg reliability',
    description: 'Modest overvaluation — avoid chasing momentum',
    color: 'text-green-400',
    bgColor: 'from-green-500/20 to-green-500/5',
    borderColor: 'border-green-500/30'
  },
  {
    range: '4.0-4.5',
    label: 'Strong Bullish',
    sentiment: '-0.3 to -0.5',
    buySignal: 'BUY signals: Reduce size',
    sellSignal: 'SELL signals: High reliability',
    description: 'Significant overvaluation — reduce positions, raise cash',
    color: 'text-blue-400',
    bgColor: 'from-blue-500/20 to-blue-500/5',
    borderColor: 'border-blue-500/30'
  },
  {
    range: '4.5-5.0',
    label: 'Extreme Greed / Euphoria',
    sentiment: '-0.5 to -0.7',
    buySignal: 'BUY signals: Skip entirely',
    sellSignal: 'SELL signals: 80%+ (highest)',
    description: 'Multi-factor euphoria = bubble risk. Contrarian SELL window',
    color: 'text-[#0D7C8C]',
    bgColor: 'from-[#0D7C8C]/20 to-[#0D7C8C]/5',
    borderColor: 'border-[#0D7C8C]/30'
  }
]

export default function CSSAdjustmentGuide() {
  return (
    <div className="space-y-4">
      {/* Header explanation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-white/5 border border-white/10 rounded-xl"
      >
        <p className="text-sm text-white/80 leading-relaxed mb-3">
          The CSS adjusts the Fundamental Analysis score (Section 4G of the document). Final Score = FA Score + CSS Adjustment. High conviction entries: FA ≥4.0 AND CSS ≤2.0
        </p>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-white/60">Highest conviction entry:</span>
            <span className="text-green-400 ml-2">FA Score ≥4.0 AND CSS ≤2.0 (strong fundamentals in fearful market)</span>
          </div>
          <div>
            <span className="text-white/60">Highest conviction exit:</span>
            <span className="text-red-400 ml-2">FA Score ≤3.5 AND CSS ≥4.0 (weak fundamentals in euphoric market)</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-white/10">
          <span className="text-yellow-400 font-bold">Black Swan rule:</span>
          <span className="text-white/70 ml-2">When ≥5 independent factors are simultaneously extreme, reduce ALL positions by 50% regardless of FA/TA signals</span>
        </div>
      </motion.div>

      {/* CSS Ranges */}
      <div className="space-y-3">
        {CSS_RANGES.map((range, index) => (
          <motion.div
            key={range.range}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className={`relative p-4 bg-gradient-to-r ${range.bgColor} backdrop-blur-xl border ${range.borderColor} rounded-xl transition-all duration-300 ${
              range.isHighlight ? 'ring-2 ring-yellow-500/50 shadow-lg shadow-yellow-500/20' : 'hover:border-opacity-60'
            }`}
          >
            {range.isHighlight && (
              <div className="absolute -top-2 -right-2 px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full animate-pulse">
                CURRENT
              </div>
            )}

            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-lg font-black ${range.color}`}>
                      CSS {range.range}
                    </span>
                    <span className={`text-base font-bold ${range.color}`}>
                      {range.label}
                    </span>
                  </div>
                  <div className="text-xs text-white/60">
                    Sentiment: {range.sentiment}
                  </div>
                </div>
              </div>

              {/* Signals */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-black/20 rounded-lg">
                  <div className="text-xs text-green-400 font-bold mb-1">
                    {range.buySignal}
                  </div>
                </div>
                <div className="p-3 bg-black/20 rounded-lg">
                  <div className="text-xs text-red-400 font-bold mb-1">
                    {range.sellSignal}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="text-sm text-white/70 italic">
                {range.description}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl"
      >
        <div className="flex items-center gap-2 mb-2">
          <IconChartBar className="w-4 h-4 text-blue-400" stroke={1.5} />
          <div className="text-xs text-blue-400 font-bold">How to Use This Guide:</div>
        </div>
        <ul className="space-y-1 text-xs text-white/70">
          <li>• Check current CSS score (2.7 = Neutral zone)</li>
          <li>• Compare with your stock's FA score</li>
          <li>• Follow the buy/sell signal reliability for that CSS range</li>
          <li>• Adjust position sizes based on conviction level</li>
          <li>• Monitor for Black Swan conditions (≥5 extreme factors)</li>
        </ul>
      </motion.div>
    </div>
  )
}

