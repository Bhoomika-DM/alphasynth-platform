'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/authentication/lib/supabase/client'
import DashboardNavbar from '@/components/dashboard/DashboardNavbar'
import AnimatedBackground from '@/components/background/AnimatedBackground'
import { motion } from 'framer-motion'

export default function BacktestPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [ticker, setTicker] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/signin')
      } else {
        setUser(user)
      }
      setLoading(false)
    }
    getUser()
  }, [router, supabase])

  const handleAnalyze = () => {
    if (!ticker.trim()) {
      setError('Please enter a ticker symbol')
      return
    }
    setAnalyzing(true)
    setError('Not enough price history (need 400+ bars)')
    setTimeout(() => {
      setAnalyzing(false)
    }, 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white font-jakarta">Loading...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <AnimatedBackground showGlobe={false} />
      
      {/* Green Gradient Bars */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around h-full opacity-20">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="w-8 bg-gradient-to-t from-green-500 via-green-600 to-transparent"
              style={{
                height: `${Math.random() * 60 + 40}%`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <DashboardNavbar user={user} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="max-w-2xl">
          {/* Input Section */}
          <div className="mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value.toUpperCase())}
                  placeholder="e.g., RELIANCE.NS  TCS"
                  className="w-full px-4 py-3 bg-[#0a0e1a] border border-white/10 rounded-xl text-white font-jakarta text-sm placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                />
              </div>
              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl text-sm font-jakarta font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Analyse
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 hover:from-green-600/30 hover:to-emerald-600/30 border border-green-500/30 rounded-xl text-sm font-jakarta font-bold text-white transition-all">
                Params
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
            >
              <div className="flex items-start gap-3">
                <span className="text-red-400 text-lg">⚠</span>
                <p className="text-sm font-jakarta text-red-400">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Status Indicator */}
          {analyzing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center py-12"
            >
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-white/10" />
                <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-red-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
