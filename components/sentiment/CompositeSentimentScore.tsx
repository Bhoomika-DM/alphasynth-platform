'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SentimentGauge from './SentimentGauge'
import FactorCard from './FactorCard'
import ImpactfulFactor from './ImpactfulFactor'
import AllFactorsList from './AllFactorsList'
import CSSAdjustmentGuide from './CSSAdjustmentGuide'

interface CompositeSentimentScoreProps {
  ticker: string
  onScoreComplete?: () => void
}

export default function CompositeSentimentScore({ ticker, onScoreComplete }: CompositeSentimentScoreProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'all20' | 'guide'>('summary')
  const [showDetails, setShowDetails] = useState(false)
  const [isRunning, setIsRunning] = useState(false)

  const handleRunSentiment = () => {
    if (showDetails) {
      // Re-run: hide content, show loading, then show again
      setShowDetails(false)
      setIsRunning(true)
      setTimeout(() => {
        setIsRunning(false)
        setShowDetails(true)
        onScoreComplete?.()
      }, 1500)
    } else {
      // First run: show loading, then show content
      setIsRunning(true)
      setTimeout(() => {
        setIsRunning(false)
        setShowDetails(true)
        onScoreComplete?.()
      }, 1500)
    }
  }

  const factorCategories = [
    { category: 'MACRO', score: 2.9, factors: '1,2,4,17', color: 'blue' as const },
    { category: 'GEOPOLITICAL', score: 3.3, factors: '5,10-16', color: 'red' as const },
    { category: 'FLOWS', score: 2.8, factors: '3,18-20', color: 'green' as const },
    { category: 'SENTIMENT', score: 2.9, factors: '6-9', color: 'sage' as const }
  ]

  const impactfulFactors = [
    { rank: 1, name: 'Market Narratives', weight: 'w=19%', confidence: 'high' as const, score: 1.3, deviation: 1.7 },
    { rank: 2, name: 'Circuit Breakers', weight: 'w=5%', confidence: 'high' as const, score: 4.5, deviation: 1.5 },
    { rank: 19, name: 'FII Inflows / Outflows', weight: 'w=10%', confidence: 'medium' as const, score: 1.8, deviation: 1.2 },
    { rank: 14, name: 'Pandemics / Public Health', weight: 'w=2%', confidence: 'medium' as const, score: 4.0, deviation: 1.0 },
    { rank: 15, name: 'Terrorism', weight: 'w=2%', confidence: 'low' as const, score: 4.0, deviation: 1.0 }
  ]

  const tabs = [
    { id: 'summary' as const, label: 'Score Summary' },
    { id: 'all20' as const, label: 'All 20 Factors' },
    { id: 'guide' as const, label: 'CSS Adjustment Guide' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative p-6 bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-transparent backdrop-blur-2xl border border-white/[0.12] rounded-3xl shadow-2xl overflow-hidden"
    >
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-[#A7C4A0]/5 to-transparent opacity-50" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#A7C4A0]/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-jakarta font-black text-white mb-1 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              {ticker} — Composite Sentiment Score
            </h3>
            <p className="text-xs font-jakarta text-white/60 leading-relaxed max-w-2xl">
              20-factor weighted framework · CSS 1.0 (extreme fear) → 5.0 (extreme greed) · Fully deterministic
            </p>
          </motion.div>

          {/* Green Gradient Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRunSentiment}
            disabled={isRunning}
            className={`px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl text-sm font-jakarta font-bold text-white shadow-lg transition-all duration-300 ${
              isRunning ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isRunning ? 'Running...' : showDetails ? 'Re-run' : 'Run'}
          </motion.button>
        </div>

        {/* Scored content */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Gauge and Factor Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {/* Sentiment Gauge - Takes 2 columns */}
                <div className="lg:col-span-2">
                  <SentimentGauge score={2.7} status="neutral" />
                </div>

                {/* Factor Category Cards - Takes 3 columns, 2x2 grid */}
                <div className="lg:col-span-3 grid grid-cols-2 gap-3">
                  {factorCategories.map((factor, index) => (
                    <FactorCard key={factor.category} {...factor} index={index} />
                  ))}
                </div>
              </div>

              {/* Buy/Sell Signal Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/* Buy Signal */}
                <div className="group relative p-4 bg-gradient-to-br from-green-500/20 via-green-500/10 to-transparent backdrop-blur-xl border border-green-500/30 hover:border-green-500/50 rounded-2xl transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="text-[10px] font-jakarta text-green-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      BUY SIGNAL
                    </div>
                    <div className="text-xs font-jakarta font-bold text-white/80 mb-1">
                      RELIABILITY AT THIS CSS
                    </div>
                    <div className="text-xl font-jakarta font-black text-green-400">
                      standard
                    </div>
                  </div>
                </div>

                {/* Sell Signal */}
                <div className="group relative p-4 bg-gradient-to-br from-red-500/20 via-red-500/10 to-transparent backdrop-blur-xl border border-red-500/30 hover:border-red-500/50 rounded-2xl transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="text-[10px] font-jakarta text-red-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                      SELL SIGNAL
                    </div>
                    <div className="text-xs font-jakarta font-bold text-white/80 mb-1">
                      RELIABILITY AT THIS CSS
                    </div>
                    <div className="text-xl font-jakarta font-black text-red-400">
                      standard
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Tabs */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="border-b border-white/10"
              >
                <div className="flex gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative px-6 py-3 text-sm font-jakarta font-bold transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'text-white'
                          : 'text-white/50 hover:text-white/80'
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-[#A7C4A0]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === 'summary' && (
                  <motion.div
                    key="summary"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-xs font-jakarta text-white/50 uppercase tracking-widest">
                      MOST IMPACTFUL FACTORS (BY DEVIATION FROM NEUTRAL 3.0)
                    </div>

                    <div className="space-y-4">
                      {impactfulFactors.map((factor, index) => (
                        <ImpactfulFactor key={factor.rank} {...factor} index={index} />
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'all20' && (
                  <motion.div
                    key="all20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="text-xs font-jakarta text-white/50 uppercase tracking-widest mb-4">
                      ALL 20 SENTIMENT FACTORS
                    </div>
                    <AllFactorsList />
                  </motion.div>
                )}

                {activeTab === 'guide' && (
                  <motion.div
                    key="guide"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CSSAdjustmentGuide />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
