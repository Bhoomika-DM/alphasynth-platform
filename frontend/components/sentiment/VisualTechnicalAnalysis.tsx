'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { IconChartBar, IconTrendingUp, IconChartCandle, IconAlertTriangle } from '@tabler/icons-react'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts'
import PatternAnalysis from './PatternAnalysis'

interface VisualTechnicalAnalysisProps {
  ticker: string
}

export default function VisualTechnicalAnalysis({ ticker }: VisualTechnicalAnalysisProps) {
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [isRunning, setIsRunning] = useState(false)

  const handleRunAnalysis = () => {
    if (showAnalysis) {
      // Re-run: hide content, show loading, then show again
      setShowAnalysis(false)
      setIsRunning(true)
      setTimeout(() => {
        setIsRunning(false)
        setShowAnalysis(true)
      }, 1500)
    } else {
      // First run: show loading, then show content
      setIsRunning(true)
      setTimeout(() => {
        setIsRunning(false)
        setShowAnalysis(true)
      }, 1500)
    }
  }

  // Radar chart data
  const radarData = [
    { metric: 'Trend', value: 65 },
    { metric: 'Momentum', value: 58 },
    { metric: 'Volume', value: 72 },
    { metric: 'Volatility', value: 45 },
    { metric: 'Support', value: 68 },
  ]

  // Fibonacci levels
  const fibLevels = [
    { level: '0.786', price: 241.2, type: 'ALL' },
    { level: '0.618', price: 239.8, type: 'BUY' },
    { level: '0.500', price: 238.5, type: 'BUY' },
    { level: '0.382', price: 237.2, type: 'BUY' },
    { level: '0.236', price: 235.8, type: 'BUY' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative p-6 bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-transparent backdrop-blur-2xl border border-white/[0.12] rounded-3xl shadow-2xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-transparent opacity-50" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-black text-white mb-1">
              {ticker} — Visual Technical Analysis
            </h3>
            <p className="text-xs text-white/60">
              5-category weighted framework · Hover any metric for its plain-English description
            </p>
          </div>

          {/* Run Analysis Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRunAnalysis}
            disabled={isRunning}
            className={`ml-4 px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl text-sm font-bold text-white shadow-lg transition-all duration-300 ${
              isRunning ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isRunning ? 'Running...' : showAnalysis ? 'Re-run' : 'Run'}
          </motion.button>
        </div>

        {/* Analysis Content - Show when button is clicked */}
        {showAnalysis && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
              {/* Top Section: Composite Score + Radar */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Composite TA Score */}
                <div className="p-4 bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/30 rounded-xl">
                  <div className="text-xs text-white/60 mb-3">Composite TA Score</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-white/80 mb-1">
                        Analyzed chart of AAPL
                      </div>
                      <div className="text-xs text-white/60">
                        Higher = stronger buy signs
                      </div>
                    </div>
                    <div className="relative w-24 h-24">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="48" cy="48" r="40" fill="none" stroke="#ffffff10" strokeWidth="8" />
                        <circle 
                          cx="48" 
                          cy="48" 
                          r="40" 
                          fill="none" 
                          stroke="#ef4444" 
                          strokeWidth="8"
                          strokeDasharray={`${(38 / 100) * 251} 251`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-3xl font-black text-red-400">38</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 px-3 py-1 bg-red-500/20 rounded-lg text-center">
                    <span className="text-sm font-bold text-red-400">SELL</span>
                  </div>
                </div>

                {/* Radar Chart */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="text-xs text-white/60 mb-2">
                    Further from center = stronger signal
                  </div>
                  <ResponsiveContainer width="100%" height={180}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#ffffff20" />
                      <PolarAngleAxis 
                        dataKey="metric" 
                        tick={{ fill: '#ffffff80', fontSize: 10 }}
                      />
                      <Radar 
                        dataKey="value" 
                        stroke="#3b82f6" 
                        fill="#3b82f6" 
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Indicators & Oscillators + Elliott Wave */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Indicators & Oscillators */}
                <div className="p-4 bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/30 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <IconChartBar className="w-4 h-4 text-white" stroke={1.5} />
                      <span className="text-sm font-bold text-white">Indicators & Oscillators</span>
                    </div>
                    <div className="text-3xl font-black text-red-400">47</div>
                  </div>
                  <div className="text-xs text-white/60 mb-3">30% of composite</div>

                  <div className="space-y-2">
                    {[
                      { name: '200 EMA', value: '$250.3', signal: 'SELL', desc: '200-day exponential moving average' },
                      { name: 'MA Crossover', value: 'above 200', signal: 'HOLD', desc: 'Bullish (buy) when price crosses above the 200-day MA' },
                      { name: 'RSI (14)', value: '<30', signal: 'NEUTRAL', desc: 'Relative Strength Index' },
                      { name: 'RSI Divergence', value: 'none', signal: 'HOLD', desc: 'Bearish Strength Index' },
                      { name: 'MACD', value: '-0.61', signal: 'NEUTRAL', desc: 'Moving Average Convergence' },
                      { name: 'Bollinger', value: 'middle', signal: 'NEUTRAL', desc: 'Bands show volatility' },
                    ].map((indicator, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-black/20 rounded-lg hover:bg-black/30 transition-all">
                        <div className="flex-1">
                          <div className="text-xs text-white">{indicator.name}</div>
                          <div className="text-[10px] text-white/50">{indicator.desc}</div>
                        </div>
                        <div className="text-xs text-white/80 mr-2">{indicator.value}</div>
                        <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          indicator.signal === 'SELL' ? 'bg-red-500/20 text-red-400' :
                          indicator.signal === 'HOLD' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {indicator.signal}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Elliott Wave & Fibonacci */}
                <div className="p-4 bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/30 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <IconTrendingUp className="w-4 h-4 text-white" stroke={1.5} />
                      <span className="text-sm font-bold text-white">Elliott Wave & Fibonacci</span>
                    </div>
                    <div className="text-3xl font-black text-red-400">35</div>
                  </div>
                  <div className="text-xs text-white/60 mb-3">30% of composite</div>

                  <div className="space-y-3">
                    <div className="p-2 bg-black/20 rounded-lg">
                      <div className="text-xs text-white mb-1">Trend</div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/80">downtrend</span>
                        <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-[10px] font-bold">SELL</span>
                      </div>
                      <div className="text-[10px] text-white/50 mt-1">
                        Wave 2 — Corrective wave, entry points in an uptrend pair
                      </div>
                    </div>

                    <div className="p-2 bg-black/20 rounded-lg">
                      <div className="text-xs text-white mb-1">Wave position</div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/80">unknown</span>
                        <span className="px-2 py-0.5 bg-gray-500/20 text-gray-400 rounded text-[10px] font-bold">NEUTRAL</span>
                      </div>
                      <div className="text-[10px] text-white/50 mt-1">
                        Wave 3 — the strongest and most powerful wave
                      </div>
                    </div>

                    <div className="p-2 bg-black/20 rounded-lg">
                      <div className="text-xs text-white mb-1">Strategy</div>
                      <div className="text-xs text-white/80">none</div>
                      <div className="text-[10px] text-white/50 mt-1">
                        Wave 5 and ABC correction — final impulse wave followed by correction
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-white">Nearest support</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white">$0.0</span>
                          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-[10px] font-bold">BUY</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white">Nearest resist.</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white">$0.0</span>
                          <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-[10px] font-bold">SELL</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="text-xs text-white mb-2">Fib zone: unknown</div>
                      <div className="text-xs text-white mb-2">Fibonacci levels</div>
                      <div className="space-y-1">
                        {fibLevels.map((fib, i) => (
                          <div key={i} className="flex items-center justify-between text-[10px]">
                            <span className="text-white/60">{fib.level}</span>
                            <span className="text-white">${fib.price}</span>
                            <span className={`px-2 py-0.5 rounded font-bold ${
                              fib.type === 'BUY' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
                            }`}>
                              {fib.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart Patterns + Candlestick Patterns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/30 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconChartBar className="w-4 h-4 text-white" stroke={1.5} />
                      <span className="text-sm font-bold text-white">Chart Patterns</span>
                    </div>
                    <div className="text-3xl font-black text-red-400">25</div>
                  </div>
                  <div className="text-xs text-white/60 mt-1">20% of composite</div>
                </div>

                <div className="p-4 bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/30 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconChartCandle className="w-4 h-4 text-white" stroke={1.5} />
                      <span className="text-sm font-bold text-white">Candlestick Patterns</span>
                    </div>
                    <div className="text-3xl font-black text-yellow-400">50</div>
                  </div>
                  <div className="text-xs text-white/60 mt-1">20% of composite</div>
                </div>
              </div>

              {/* Warning */}
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                <div className="flex items-center gap-2">
                  <IconAlertTriangle className="w-4 h-4 text-yellow-400" />
                  <div className="text-xs text-yellow-400 font-bold">
                    BB Squeeze — explosive move imminent, direction unknown
                  </div>
                </div>
              </div>
            </motion.div>
        )}

        {/* Pattern Analysis Section */}
        {showAnalysis && (
          <div className="mt-6">
            <PatternAnalysis ticker={ticker} />
          </div>
        )}
      </div>
    </motion.div>
  )
}

