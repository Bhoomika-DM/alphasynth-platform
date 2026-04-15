'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconChartBar, IconChartCandle, IconBolt, IconSearch } from '@tabler/icons-react'

interface PatternAnalysisProps {
  ticker: string
}

export default function PatternAnalysis({ ticker }: PatternAnalysisProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleRunAnalysis = () => {
    setIsRunning(true)
    setTimeout(() => {
      setIsRunning(false)
      setShowResults(true)
    }, 2000)
  }

  const chartPatterns = [
    { name: 'Double Top', signal: 'SELL', description: 'Double peak pattern where mostly peak is formed at same level' },
    { name: 'Head & Shoulders', signal: 'SELL', description: 'Three peaks with middle peak higher' },
    { name: 'Triple Top', signal: 'SELL', description: 'Three peaks at similar levels' },
    { name: 'Double Bottom', signal: 'BUY', description: 'Double Bottom price fails to break support level' },
  ]

  const candlestickPatterns = [
    { name: 'Hammer', type: 'Bullish', description: 'Hammer — long lower wick at bottom' },
    { name: 'Morning Star', type: 'Bullish', description: 'Morning Star — reversal at bottom' },
    { name: 'Bull Engulfing', type: 'Bullish', description: 'Bull Engulfing — reversal candle at upside' },
    { name: 'Shooting Star', type: 'Bearish', description: 'Shooting Star — reversal candle at upside' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative p-6 bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-transparent backdrop-blur-2xl border border-white/[0.12] rounded-3xl shadow-2xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-yellow-500/5 to-transparent opacity-50" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-black text-white mb-1">
              {ticker} — Pattern Analysis
            </h3>
            <p className="text-xs text-white/60">
              Chart patterns · Candlestick patterns · Combination strategies
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRunAnalysis}
            disabled={isRunning}
            className={`px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-sm font-bold text-white shadow-lg ${
              isRunning ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isRunning ? 'Running...' : showResults ? 'Re-run' : 'Run pattern scan'}
          </motion.button>
        </div>

        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Chart Patterns + Candlestick Patterns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart Patterns */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconChartBar className="w-5 h-5 text-white" stroke={1.5} />
                      <span className="text-xl font-black text-white">Chart Patterns</span>
                    </div>
                    <div className="text-4xl font-black text-red-400">25</div>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="text-xs text-white/80 mb-3">
                      Scanning {ticker} for patterns
                    </div>

                    {/* Featured Pattern */}
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-white">Double Top</span>
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-bold">SELL</span>
                      </div>
                      <div className="text-xs text-white/60">
                        Double peak pattern where mostly peak is formed at same level
                      </div>
                    </div>

                    {/* Other Patterns */}
                    <div className="space-y-2">
                      {chartPatterns.slice(1).map((pattern, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-black/20 rounded-lg">
                          <span className="text-xs text-white/80">{pattern.name}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            pattern.signal === 'SELL' 
                              ? 'bg-red-500/20 text-red-400' 
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {pattern.signal}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Candlestick Patterns */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconChartCandle className="w-5 h-5 text-white" stroke={1.5} />
                      <span className="text-xl font-black text-white">Candlestick Patterns</span>
                    </div>
                    <div className="text-4xl font-black text-yellow-400">50</div>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="text-xs text-white/80 mb-3">
                      Pattern recognition in recent bars
                    </div>

                    {/* Pattern List */}
                    <div className="grid grid-cols-2 gap-2">
                      {candlestickPatterns.map((pattern, i) => (
                        <div key={i} className="p-2 bg-black/20 rounded-lg">
                          <div className="text-xs font-bold text-white mb-1">
                            {pattern.name}
                          </div>
                          <div className="text-[10px] text-white/60">
                            {pattern.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Levels Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <div className="text-xs text-white/60 mb-1">Key levels</div>
                  <div className="text-sm font-bold text-white">
                    <span className="text-red-400">$252.0</span> · <span className="text-green-400">$155.3</span>
                  </div>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <div className="text-xs text-white/60 mb-1">ma200</div>
                  <div className="text-sm font-bold text-white">
                    <span className="text-red-400">$247.7</span> · <span className="text-blue-400">$236.3</span>
                  </div>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <div className="text-xs text-white/60 mb-1">bb_lower</div>
                  <div className="text-sm font-bold text-green-400">$234.5</div>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <div className="text-xs text-white/60 mb-1">fib_382</div>
                  <div className="text-sm font-bold text-green-400">$215.3</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isRunning && (
          <div className="text-center py-12">
            <IconSearch className="w-16 h-16 mx-auto mb-4 text-white/40 animate-pulse" stroke={1.5} />
            <p className="text-white/60">Scanning for patterns...</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
