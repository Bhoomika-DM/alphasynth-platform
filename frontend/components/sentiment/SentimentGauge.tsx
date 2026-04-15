'use client'

import { motion } from 'framer-motion'

interface SentimentGaugeProps {
  score: number // 0-5
  status: 'fear' | 'neutral' | 'greed'
}

export default function SentimentGauge({ score, status }: SentimentGaugeProps) {
  const percentage = (score / 5) * 100
  const circumference = 2 * Math.PI * 70
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const statusColors = {
    fear: { bg: 'from-red-500/20 via-red-500/10 to-transparent', text: 'text-red-400', dot: 'bg-red-500', glow: 'shadow-red-500/50' },
    neutral: { bg: 'from-yellow-500/20 via-yellow-500/10 to-transparent', text: 'text-yellow-400', dot: 'bg-yellow-500', glow: 'shadow-yellow-500/50' },
    greed: { bg: 'from-green-500/20 via-green-500/10 to-transparent', text: 'text-green-400', dot: 'bg-green-500', glow: 'shadow-green-500/50' }
  }

  const colors = statusColors[status]

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative p-6 bg-gradient-to-br ${colors.bg} backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group hover:border-white/20 transition-all duration-300`}
    >
      {/* Animated background glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Circular gauge */}
      <div className="relative flex items-center justify-center mb-4">
        <div className="relative w-36 h-36">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="72"
              cy="72"
              r="60"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="10"
            />
            {/* Animated progress circle */}
            <motion.circle
              cx="72"
              cy="72"
              r="60"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="drop-shadow-lg"
            />
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={status === 'fear' ? '#ef4444' : status === 'neutral' ? '#f59e0b' : '#22c55e'} />
                <stop offset="100%" stopColor={status === 'fear' ? '#dc2626' : status === 'neutral' ? '#eab308' : '#16a34a'} />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center score */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className={`text-5xl font-black ${colors.text} drop-shadow-2xl ${colors.glow} shadow-2xl`}
              >
                {score.toFixed(1)}
              </motion.div>
              <div className="text-[10px] text-white/40 mt-0.5">out of 5.0</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Status indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-center space-y-2"
      >
        <div className="flex items-center justify-center gap-2">
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className={`w-3 h-3 ${colors.dot} rounded-full ${colors.glow} shadow-lg`}
          />
          <span className={`text-lg font-bold ${colors.text} uppercase tracking-wide`}>
            {status}
          </span>
        </div>
        
        <div className="text-xs text-white/60">
          {score < 2 ? 'Extreme Fear' : score < 2.5 ? 'Fear' : score < 3.5 ? 'Neutral' : score < 4.5 ? 'Greed' : 'Extreme Greed'}
        </div>

        {/* Data confidence */}
        <div className="pt-3 border-t border-white/10 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] text-white/50">
            <span>Data confidence:</span>
            <span className="text-white/70">28% live</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '28%' }}
              transition={{ delay: 1.2, duration: 1 }}
              className={`h-full bg-gradient-to-r ${colors.bg.replace('to-transparent', `to-${status === 'fear' ? 'red' : status === 'neutral' ? 'yellow' : 'green'}-500`)}`}
            />
          </div>
          <div className="text-[10px] text-white/40">
            {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* FA Score adjustment */}
        <div className="pt-3 border-t border-white/10">
          <div className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">
            FA Score Adjustment
          </div>
          <div className={`text-2xl font-black ${colors.text}`}>
            0.00
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

