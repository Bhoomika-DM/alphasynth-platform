'use client'

import { motion } from 'framer-motion'

interface FactorCardProps {
  category: string
  score: number
  factors: string
  color: 'blue' | 'red' | 'green' | 'sage' | 'cyan' | 'orange'
  index: number
}

export default function FactorCard({ category, score, factors, color, index }: FactorCardProps) {
  const colorClasses = {
    blue: {
      bg: 'from-blue-500/20 via-blue-500/10 to-transparent',
      border: 'border-blue-500/30 hover:border-blue-500/50',
      text: 'text-blue-400',
      glow: 'group-hover:shadow-blue-500/20'
    },
    red: {
      bg: 'from-red-500/20 via-red-500/10 to-transparent',
      border: 'border-red-500/30 hover:border-red-500/50',
      text: 'text-red-400',
      glow: 'group-hover:shadow-red-500/20'
    },
    green: {
      bg: 'from-green-500/20 via-green-500/10 to-transparent',
      border: 'border-green-500/30 hover:border-green-500/50',
      text: 'text-green-400',
      glow: 'group-hover:shadow-green-500/20'
    },
    sage: {
      bg: 'from-[#A7C4A0]/20 via-[#A7C4A0]/10 to-transparent',
      border: 'border-[#A7C4A0]/30 hover:border-[#A7C4A0]/50',
      text: 'text-[#A7C4A0]',
      glow: 'group-hover:shadow-[#A7C4A0]/20'
    },
    cyan: {
      bg: 'from-cyan-500/20 via-cyan-500/10 to-transparent',
      border: 'border-cyan-500/30 hover:border-cyan-500/50',
      text: 'text-cyan-400',
      glow: 'group-hover:shadow-cyan-500/20'
    },
    orange: {
      bg: 'from-orange-500/20 via-orange-500/10 to-transparent',
      border: 'border-orange-500/30 hover:border-orange-500/50',
      text: 'text-orange-400',
      glow: 'group-hover:shadow-orange-500/20'
    }
  }

  const classes = colorClasses[color]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`group relative p-3 bg-gradient-to-br ${classes.bg} backdrop-blur-xl border ${classes.border} rounded-xl overflow-hidden transition-all duration-300 ${classes.glow} shadow-lg hover:shadow-xl cursor-pointer`}
    >
      {/* Animated background effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${classes.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className={`text-[10px] font-jakarta font-bold ${classes.text} uppercase tracking-widest`}
          >
            {category}
          </motion.span>
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
            className={`text-3xl font-jakarta font-black ${classes.text} drop-shadow-lg`}
          >
            {score.toFixed(1)}
          </motion.span>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-jakarta text-white/50">
            Factors {factors}
          </p>
          
          {/* Score indicator bar */}
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((bar) => (
              <motion.div
                key={bar}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: bar <= score ? 1 : 0.3 }}
                transition={{ delay: index * 0.1 + bar * 0.05, duration: 0.3 }}
                className={`w-0.5 h-3 rounded-full ${bar <= score ? classes.text.replace('text-', 'bg-') : 'bg-white/10'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl ${classes.text.replace('text-', 'bg-')}/10`} />
    </motion.div>
  )
}
