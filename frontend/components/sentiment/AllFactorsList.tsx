'use client'

import { motion } from 'framer-motion'

interface Factor {
  id: number
  name: string
  category: 'MACRO' | 'GEOPOLITICAL' | 'FLOWS' | 'SENTIMENT'
  score: number
  confidence: 'high' | 'medium' | 'low' | 'NO DATA'
  weight: string
}

const ALL_FACTORS: Factor[] = [
  { id: 1, name: 'Market Narratives', category: 'SENTIMENT', score: 1.3, confidence: 'high', weight: 'w=19%' },
  { id: 2, name: 'Circuit Breakers', category: 'MACRO', score: 4.5, confidence: 'high', weight: 'w=5%' },
  { id: 3, name: 'Market Impact of Large Orders', category: 'FLOWS', score: 3.0, confidence: 'medium', weight: 'w=8%' },
  { id: 4, name: 'Effect on Other Markets', category: 'MACRO', score: 2.3, confidence: 'high', weight: 'w=6%' },
  { id: 5, name: 'Geopolitical Events', category: 'GEOPOLITICAL', score: 3.0, confidence: 'medium', weight: 'w=7%' },
  { id: 6, name: 'Credit Rating (Reflexivity)', category: 'SENTIMENT', score: 2.2, confidence: 'medium', weight: 'w=4%' },
  { id: 7, name: 'Client Confidence (Reflexivity)', category: 'SENTIMENT', score: 3.0, confidence: 'low', weight: 'w=3%' },
  { id: 8, name: 'NLP News Trading', category: 'SENTIMENT', score: 3.0, confidence: 'high', weight: 'w=12%' },
  { id: 9, name: 'Social Media Scraping', category: 'SENTIMENT', score: 3.3, confidence: 'medium', weight: 'w=5%' },
  { id: 10, name: 'Military Conflict', category: 'GEOPOLITICAL', score: 3.5, confidence: 'medium', weight: 'w=6%' },
  { id: 11, name: 'Sanctions / Trade Wars', category: 'GEOPOLITICAL', score: 3.0, confidence: 'medium', weight: 'w=4%' },
  { id: 12, name: 'Elections', category: 'GEOPOLITICAL', score: 3.5, confidence: 'medium', weight: 'w=5%' },
  { id: 13, name: 'Regulatory / Policy Shocks', category: 'GEOPOLITICAL', score: 3.0, confidence: 'low', weight: 'w=3%' },
  { id: 14, name: 'Pandemics / Public Health', category: 'GEOPOLITICAL', score: 4.0, confidence: 'medium', weight: 'w=2%' },
  { id: 15, name: 'Terrorism', category: 'GEOPOLITICAL', score: 4.0, confidence: 'low', weight: 'w=2%' },
  { id: 16, name: 'Other Black Swan Events', category: 'GEOPOLITICAL', score: 2.5, confidence: 'medium', weight: 'w=3%' },
  { id: 17, name: 'Budget Week', category: 'MACRO', score: 3.5, confidence: 'high', weight: 'w=4%' },
  { id: 18, name: 'Index Inclusion / Exclusion', category: 'FLOWS', score: 3.0, confidence: 'low', weight: 'w=2%' },
  { id: 19, name: 'FII Inflows / Outflows', category: 'FLOWS', score: 1.8, confidence: 'medium', weight: 'w=10%' },
  { id: 20, name: 'Insurance and Pension Fund Flows', category: 'FLOWS', score: 3.0, confidence: 'NO DATA', weight: 'w=1%' },
]

const categoryColors = {
  MACRO: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', bar: 'bg-blue-500' },
  GEOPOLITICAL: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', bar: 'bg-red-500' },
  FLOWS: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', bar: 'bg-green-500' },
  SENTIMENT: { bg: 'bg-[#0D7C8C]/10', border: 'border-[#0D7C8C]/30', text: 'text-[#0D7C8C]', bar: 'bg-[#0D7C8C]' },
}

const confidenceBadge = {
  high: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  low: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  'NO DATA': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
}

export default function AllFactorsList() {
  return (
    <div className="space-y-3">
      {ALL_FACTORS.map((factor, index) => {
        const colors = categoryColors[factor.category]
        const isBullish = factor.score < 3.0
        const deviation = Math.abs(factor.score - 3.0)
        const deviationPercent = (deviation / 2) * 100 // Max deviation is 2 (from 1 to 5, neutral at 3)

        return (
          <motion.div
            key={factor.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03, duration: 0.3 }}
            className={`group relative p-3 bg-gradient-to-r from-white/[0.03] to-white/[0.01] hover:from-white/[0.08] hover:to-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/20 rounded-xl transition-all duration-300 cursor-pointer overflow-hidden`}
          >
            {/* Animated background gradient */}
            <motion.div 
              className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            <div className="relative z-10 flex items-center gap-3">
              {/* Rank badge */}
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 flex items-center justify-center ${colors.bg} ${colors.border} border rounded-lg`}>
                  <span className={`text-sm font-black ${colors.text}`}>#{factor.id}</span>
                </div>
              </div>

              {/* Factor info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-bold text-white truncate">
                    {factor.name}
                  </h4>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.03 + 0.1 }}
                    className={`px-2 py-0.5 border rounded-md text-[10px] font-bold ${confidenceBadge[factor.confidence]}`}
                  >
                    {factor.confidence}
                  </motion.div>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-white/50">
                  <span>{factor.weight}</span>
                  <span>•</span>
                  <span className={colors.text}>{factor.category}</span>
                </div>
              </div>

              {/* Score and deviation */}
              <div className="flex items-center gap-4">
                {/* Deviation bar */}
                <div className="w-24">
                  <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                    {factor.confidence !== 'NO DATA' ? (
                      <>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${deviationPercent}%` }}
                          transition={{ delay: index * 0.03 + 0.2, duration: 0.6, ease: "easeOut" }}
                          className={`absolute inset-y-0 left-0 rounded-full ${
                            isBullish 
                              ? 'bg-gradient-to-r from-green-500 to-green-400' 
                              : 'bg-gradient-to-r from-red-500 to-red-400'
                          }`}
                        />
                        {/* Glow effect */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${deviationPercent}%` }}
                          transition={{ delay: index * 0.03 + 0.2, duration: 0.6, ease: "easeOut" }}
                          className={`absolute inset-y-0 left-0 rounded-full blur-sm ${
                            isBullish ? 'bg-green-500/50' : 'bg-red-500/50'
                          }`}
                        />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gray-500/20 rounded-full" />
                    )}
                  </div>
                </div>

                {/* Score */}
                <div className="text-right w-12">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.03 + 0.2, type: "spring" }}
                    className={`text-xl font-black ${
                      factor.confidence === 'NO DATA' 
                        ? 'text-gray-400' 
                        : isBullish 
                          ? 'text-green-400' 
                          : 'text-red-400'
                    } drop-shadow-lg`}
                  >
                    {factor.confidence === 'NO DATA' ? '—' : factor.score.toFixed(1)}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Bottom glow on hover */}
            <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-${colors.text.replace('text-', '')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          </motion.div>
        )
      })}
    </div>
  )
}

