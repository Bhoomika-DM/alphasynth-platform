'use client'

import { motion } from 'framer-motion'

interface ImpactfulFactorProps {
  rank: number
  name: string
  weight: string
  confidence: 'high' | 'medium' | 'low'
  score: number
  deviation: number
  index: number
}

export default function ImpactfulFactor({ rank, name, weight, confidence, score, deviation, index }: ImpactfulFactorProps) {
  const isBullish = score < 3.0
  const deviationPercent = (Math.abs(deviation) / 5) * 100

  const confidenceBadge = {
    high: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    low: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="group relative p-6 bg-gradient-to-r from-white/[0.03] to-white/[0.01] hover:from-white/[0.08] hover:to-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/20 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-r ${isBullish ? 'from-green-500/5 to-transparent' : 'from-red-500/5 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div className="relative z-10 flex items-center gap-4">
        {/* Rank badge */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="relative flex-shrink-0"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg shadow-blue-500/30">
            <span className="text-lg font-black text-white">{rank}</span>
          </div>
          {/* Rank glow */}
          <div className="absolute inset-0 bg-blue-500/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>

        {/* Factor info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h4 className="text-lg font-black text-white leading-tight mb-1">
                {name}
              </h4>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <span className="font-semibold">{weight}</span>
                <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                <span className="text-xs">confidence: {confidence}</span>
              </div>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.08 + 0.2 }}
              className={`px-3 py-1 border rounded-lg text-xs font-bold uppercase tracking-wider ${confidenceBadge[confidence]}`}
            >
              {confidence}
            </motion.div>
          </div>
        </div>

        {/* Score and deviation */}
        <div className="flex items-center gap-8">
          {/* Score */}
          <div className="text-center">
            <div className="text-xs text-white/50 uppercase tracking-widest mb-2 font-bold">Score</div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.08 + 0.3, type: "spring" }}
              className={`text-3xl font-black ${isBullish ? 'text-green-400' : 'text-red-400'} drop-shadow-lg`}
            >
              {score.toFixed(1)}
            </motion.div>
            <div className={`text-xs font-semibold mt-1 ${isBullish ? 'text-green-400/70' : 'text-red-400/70'}`}>
              {isBullish ? 'BULLISH' : 'BEARISH'}
            </div>
          </div>

          {/* Deviation bar */}
          <div className="w-44">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-white/50 uppercase tracking-widest font-bold">Deviation</div>
              <div className="text-sm font-bold text-white">
                {deviation.toFixed(1)}
              </div>
            </div>
            <div className="relative h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${deviationPercent}%` }}
                transition={{ delay: index * 0.08 + 0.4, duration: 0.8, ease: "easeOut" }}
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
                transition={{ delay: index * 0.08 + 0.4, duration: 0.8, ease: "easeOut" }}
                className={`absolute inset-y-0 left-0 rounded-full blur-sm ${
                  isBullish ? 'bg-green-500/50' : 'bg-red-500/50'
                }`}
              />
              {/* Progress indicator */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-xs font-bold text-white/80">
                  {deviationPercent.toFixed(0)}%
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-white/40">
              <span>0.0</span>
              <span>5.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom glow on hover */}
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${
        isBullish 
          ? 'from-transparent via-green-500 to-transparent' 
          : 'from-transparent via-red-500 to-transparent'
      } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    </motion.div>
  )
}

