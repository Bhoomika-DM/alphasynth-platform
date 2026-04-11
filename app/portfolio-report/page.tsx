'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/authentication/lib/supabase/client'
import DashboardNavbar from '@/components/dashboard/DashboardNavbar'
import AnimatedBackground from '@/components/background/AnimatedBackground'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts'
import CompositeSentimentScore from '@/components/sentiment/CompositeSentimentScore'
import VisualTechnicalAnalysis from '@/components/sentiment/VisualTechnicalAnalysis'
import { IconX } from '@tabler/icons-react'

export default function PortfolioReportPage() {
  const searchParams = useSearchParams()
  const baskets = searchParams.get('baskets')?.split(',') || []
  const router = useRouter()
  const supabase = createClient()
  
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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
  
  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [selectedBroker, setSelectedBroker] = useState('zerodha')
  const [selectedStrategy, setSelectedStrategy] = useState('balanced')
  
  // Ticker detail modal state
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null)
  const [detailTab, setDetailTab] = useState('overview')
  const [sentimentScored, setSentimentScored] = useState(false)
  
  // Factor weights
  const [fundamentals, setFundamentals] = useState(25)
  const [technical, setTechnical] = useState(15)
  const [macro, setMacro] = useState(15)
  const [earningsMomentum, setEarningsMomentum] = useState(20)
  const [sentiment, setSentiment] = useState(15)
  const [geopolitical, setGeopolitical] = useState(10)
  
  const totalWeight = fundamentals + technical + macro + earningsMomentum + sentiment + geopolitical
  
  // Mock portfolio performance data
  const portfolioData = [
    { date: 'Jan', portfolio: 100000, benchmark: 100000 },
    { date: 'Feb', portfolio: 102500, benchmark: 101200 },
    { date: 'Mar', portfolio: 105800, benchmark: 103500 },
    { date: 'Apr', portfolio: 103200, benchmark: 102800 },
    { date: 'May', portfolio: 108500, benchmark: 105200 },
    { date: 'Jun', portfolio: 112300, benchmark: 107800 },
    { date: 'Jul', portfolio: 115600, benchmark: 109500 },
    { date: 'Aug', portfolio: 113800, benchmark: 108200 },
    { date: 'Sep', portfolio: 118200, benchmark: 111500 },
    { date: 'Oct', portfolio: 121500, benchmark: 113800 },
    { date: 'Nov', portfolio: 125800, benchmark: 116200 },
    { date: 'Dec', portfolio: 129400, benchmark: 118500 },
  ]

  // Radar chart data
  const radarData = [
    { factor: 'Fundamentals', value: 85, fullMark: 100 },
    { factor: 'Earnings Mom.', value: 72, fullMark: 100 },
    { factor: 'Technical', value: 65, fullMark: 100 },
    { factor: 'Sentiment', value: 68, fullMark: 100 },
    { factor: 'Macro', value: 58, fullMark: 100 },
    { factor: 'Geopolitical', value: 45, fullMark: 100 },
  ]

  // Pie chart data
  const pieData = [
    { name: 'Buy', value: 4, color: '#22c55e' },
    { name: 'Hold', value: 0, color: '#FCD34D' },
    { name: 'Sell', value: 0, color: '#F87171' },
  ]
  
  const strategies = [
    { id: 'balanced', name: 'Balanced', icon: '⚖️' },
    { id: 'deepValue', name: 'Deep Value', icon: '📊' },
    { id: 'momentum', name: 'Momentum', icon: '🚀' },
    { id: 'macroDriven', name: 'Macro Driven', icon: '🌍' },
    { id: 'indiaFocused', name: 'India Focused', icon: '🇮🇳' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white font-jakarta">Loading...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Animated Background */}
      <AnimatedBackground showGlobe={false} />
      
      {/* Dashboard Navbar */}
      <DashboardNavbar user={user} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Broker Integration */}
        <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-jakarta font-bold text-white mb-1">Broker Integration</h2>
              <p className="text-sm font-jakarta text-white/60">Import your live portfolio from Zerodha or AngelOne</p>
            </div>
            <button className="text-sm font-jakarta text-white/60 hover:text-white">Collapse ▲</button>
          </div>

          {/* Broker Selection */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setSelectedBroker('zerodha')}
              className={`flex-1 p-4 rounded-xl border transition-all ${
                selectedBroker === 'zerodha'
                  ? 'bg-glow-primary/10 border-glow-primary/50'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="text-base font-jakarta font-bold text-white">Zerodha Kite</div>
            </button>
            <button
              onClick={() => setSelectedBroker('angelone')}
              className={`flex-1 p-4 rounded-xl border transition-all ${
                selectedBroker === 'angelone'
                  ? 'bg-glow-primary/10 border-glow-primary/50'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="text-base font-jakarta font-bold text-white">AngelOne SmartAPI</div>
            </button>
          </div>

          {/* Steps */}
          <div className="flex items-center gap-3 mb-6">
            <div className="px-4 py-2 bg-glow-primary/20 border border-glow-primary/40 rounded-lg">
              <span className="text-sm font-jakarta font-bold text-glow-primary">Step 1: Login</span>
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
              <span className="text-sm font-jakarta text-white/60">Step 2: Token</span>
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
              <span className="text-sm font-jakarta text-white/60">Step 3: Holdings</span>
            </div>
          </div>

          {/* API Credentials */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-jakarta text-white mb-2">API Key (from Kite Developer Console)</label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-glow-primary focus:ring-2 focus:ring-glow-primary/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-jakarta text-white mb-2">API Secret</label>
              <input
                type="password"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
                placeholder="Enter your API secret"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-glow-primary focus:ring-2 focus:ring-glow-primary/20 outline-none transition-all"
              />
            </div>
            <button className="px-6 py-3 bg-glow-primary hover:bg-glow-primary/90 rounded-xl text-base font-jakarta font-bold text-black transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              Open Kite Login →
            </button>
          </div>

          <p className="text-xs font-jakarta text-white/40 mt-4">
            Enter your Kite API credentials from <a href="https://developers.kite.trade" target="_blank" className="text-glow-primary hover:underline">developers.kite.trade</a>
          </p>
        </div>

        {/* Selected Baskets */}
        {baskets.length > 0 && (
          <div className="bg-gradient-to-br from-glow-primary/10 to-transparent border border-glow-primary/30 rounded-2xl p-6">
            <h3 className="text-lg font-jakarta font-bold text-white mb-4">Selected Baskets for Analysis</h3>
            <div className="flex flex-wrap gap-2">
              {baskets.map((basket) => (
                <div key={basket} className="px-4 py-2 bg-black/40 border border-glow-primary/30 rounded-lg">
                  <span className="text-sm font-jakarta font-semibold text-glow-primary">{basket}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Factor Weight Customization */}
        <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-jakarta font-bold text-white mb-1">Factor Weight Customisation</h2>
              <p className="text-sm font-jakarta text-white/60">Adjust how each factor contributes to the composite score. Weights auto-normalise to 100%</p>
            </div>
            <button className="px-6 py-3 bg-glow-primary hover:bg-glow-primary/90 rounded-xl text-base font-jakarta font-bold text-black transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              Apply & Re-score →
            </button>
          </div>

          {/* Strategy Presets */}
          <div className="flex gap-3 mb-8">
            {strategies.map((strategy) => (
              <button
                key={strategy.id}
                onClick={() => setSelectedStrategy(strategy.id)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  selectedStrategy === strategy.id
                    ? 'bg-glow-primary/20 border-glow-primary/50 text-white'
                    : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                }`}
              >
                <span className="text-sm font-jakarta font-bold">{strategy.icon} {strategy.name}</span>
              </button>
            ))}
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            {/* Fundamentals */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-base font-jakarta font-bold text-white">Fundamentals</div>
                  <div className="text-xs font-jakarta text-white/60">P/E, ROE, margins</div>
                </div>
                <div className="text-2xl font-jakarta font-black text-blue-400">{fundamentals}%</div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={fundamentals}
                onChange={(e) => setFundamentals(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-400 [&::-webkit-slider-thumb]:cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #60A5FA 0%, #60A5FA ${fundamentals}%, rgba(255,255,255,0.1) ${fundamentals}%, rgba(255,255,255,0.1) 100%)`
                }}
              />
            </div>

            {/* Earnings Momentum */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-base font-jakarta font-bold text-white">Earnings Momentum</div>
                  <div className="text-xs font-jakarta text-white/60">EPS surprises + revenue growth trend</div>
                </div>
                <div className="text-2xl font-jakarta font-black text-green-400">{earningsMomentum}%</div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={earningsMomentum}
                onChange={(e) => setEarningsMomentum(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-400 [&::-webkit-slider-thumb]:cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #4ADE80 0%, #4ADE80 ${earningsMomentum}%, rgba(255,255,255,0.1) ${earningsMomentum}%, rgba(255,255,255,0.1) 100%)`
                }}
              />
            </div>

            {/* Technical */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-base font-jakarta font-bold text-white">Technical</div>
                  <div className="text-xs font-jakarta text-white/60">RSI, MACD, MA crossovers, Bollinger Bands</div>
                </div>
                <div className="text-2xl font-jakarta font-black text-[#A7C4A0]">{technical}%</div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={technical}
                onChange={(e) => setTechnical(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#A7C4A0] [&::-webkit-slider-thumb]:cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #A7C4A0 0%, #A7C4A0 ${technical}%, rgba(255,255,255,0.1) ${technical}%, rgba(255,255,255,0.1) 100%)`
                }}
              />
            </div>

            {/* Sentiment */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-base font-jakarta font-bold text-white">Sentiment</div>
                  <div className="text-xs font-jakarta text-white/60">News sentiment + analyst upgrades/downgrades balance</div>
                </div>
                <div className="text-2xl font-jakarta font-black text-orange-400">{sentiment}%</div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sentiment}
                onChange={(e) => setSentiment(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-400 [&::-webkit-slider-thumb]:cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #FB923C 0%, #FB923C ${sentiment}%, rgba(255,255,255,0.1) ${sentiment}%, rgba(255,255,255,0.1) 100%)`
                }}
              />
            </div>

            {/* Macro */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-base font-jakarta font-bold text-white">Macro</div>
                  <div className="text-xs font-jakarta text-white/60">GDP, inflation + macro regime + beta adjustment</div>
                </div>
                <div className="text-2xl font-jakarta font-black text-cyan-400">{macro}%</div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={macro}
                onChange={(e) => setMacro(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #22D3EE 0%, #22D3EE ${macro}%, rgba(255,255,255,0.1) ${macro}%, rgba(255,255,255,0.1) 100%)`
                }}
              />
            </div>

            {/* Geopolitical */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-base font-jakarta font-bold text-white">Geopolitical</div>
                  <div className="text-xs font-jakarta text-white/60">Election, country, and hidden-specific risk flags</div>
                </div>
                <div className="text-2xl font-jakarta font-black text-red-400">{geopolitical}%</div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={geopolitical}
                onChange={(e) => setGeopolitical(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-400 [&::-webkit-slider-thumb]:cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #F87171 0%, #F87171 ${geopolitical}%, rgba(255,255,255,0.1) ${geopolitical}%, rgba(255,255,255,0.1) 100%)`
                }}
              />
            </div>
          </div>

          {/* Total Weight Display */}
          <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-jakarta text-white/60">Raw total: {totalWeight}% → normalised to 100%</span>
              <div className="flex gap-2">
                {[
                  { color: 'bg-blue-400', value: fundamentals },
                  { color: 'bg-green-400', value: earningsMomentum },
                  { color: 'bg-[#A7C4A0]', value: technical },
                  { color: 'bg-orange-400', value: sentiment },
                  { color: 'bg-cyan-400', value: macro },
                  { color: 'bg-red-400', value: geopolitical },
                ].map((bar, idx) => (
                  <div key={idx} className={`w-2 ${bar.color} rounded-full`} style={{ height: `${bar.value / 2}px` }} />
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs font-jakarta text-white/40 mt-4">
            💡 Tip: Run the Factor Weight Robustness test (below) to see which factors have the highest Information Coefficient (IC) vs actual returns in your stock universe. Let empirical data drive your weights.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-6 gap-4">
          {/* Composite Score */}
          <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6">
            <div className="text-xs font-jakarta text-white/60 mb-2 uppercase">Composite Score</div>
            <div className="text-4xl font-jakarta font-black text-glow-primary mb-2">70<span className="text-xl text-white/60">/100</span></div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-glow-primary" style={{ width: '70%' }} />
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6">
            <div className="text-xs font-jakarta text-white/60 mb-2 uppercase">Recommendation</div>
            <div className="text-2xl font-jakarta font-black text-glow-primary mb-1">Buy More</div>
            <div className="text-xs font-jakarta text-white/60">• High Confidence</div>
          </div>

          {/* 30-Day Outlook */}
          <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6">
            <div className="text-xs font-jakarta text-white/60 mb-2 uppercase">30-Day Outlook</div>
            <div className="flex items-center gap-2 mb-1">
              <div className="text-2xl font-jakarta font-black text-glow-primary">↑ Bullish</div>
            </div>
            <div className="text-xs font-jakarta text-white/60">4 holdings · avg 70/100</div>
          </div>

          {/* Top Pick */}
          <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6">
            <div className="text-xs font-jakarta text-white/60 mb-2 uppercase">Top Pick</div>
            <div className="text-2xl font-jakarta font-black text-glow-primary mb-1">MSFT</div>
            <div className="text-xs font-jakarta text-white/60">Watch: TSLA</div>
          </div>

          {/* Macro Regime */}
          <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6">
            <div className="text-xs font-jakarta text-white/60 mb-2 uppercase">Macro Regime</div>
            <div className="text-xl font-jakarta font-black text-white mb-1">Goldilocks</div>
            <div className="text-xs font-jakarta text-white/60">FSCR 4.53% · CPI 3.1%</div>
          </div>

          {/* Portfolio Risk */}
          <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6">
            <div className="text-xs font-jakarta text-white/60 mb-2 uppercase">Portfolio Risk</div>
            <div className="flex items-center gap-3 mb-1">
              <div className="text-2xl font-jakarta font-black text-white">1.61</div>
              <div className="text-sm font-jakarta text-white/60">β</div>
              <div className="text-2xl font-jakarta font-black text-white">0.50</div>
            </div>
          </div>
        </div>

        {/* Holdings Breakdown */}
        <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-jakarta font-bold text-white mb-1">Holdings Breakdown</h2>
              <p className="text-sm font-jakarta text-white/60">Imported portfolio with factor scores and recommendations</p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-jakarta font-bold text-white/60 uppercase">Ticker</th>
                  <th className="text-left py-3 px-4 text-sm font-jakarta font-bold text-white/60 uppercase">Symbol</th>
                  <th className="text-center py-3 px-4 text-sm font-jakarta font-bold text-white/60 uppercase">Score</th>
                  <th className="text-center py-3 px-4 text-sm font-jakarta font-bold text-white/60 uppercase">Fund</th>
                  <th className="text-center py-3 px-4 text-sm font-jakarta font-bold text-white/60 uppercase">Earn</th>
                  <th className="text-center py-3 px-4 text-sm font-jakarta font-bold text-white/60 uppercase">Tech</th>
                  <th className="text-center py-3 px-4 text-sm font-jakarta font-bold text-white/60 uppercase">Sent</th>
                  <th className="text-center py-3 px-4 text-sm font-jakarta font-bold text-white/60 uppercase">Macro</th>
                  <th className="text-center py-3 px-4 text-sm font-jakarta font-bold text-white/60 uppercase">Geo</th>
                  <th className="text-right py-3 px-4 text-sm font-jakarta font-bold text-white/60 uppercase">Price</th>
                  <th className="text-right py-3 px-4 text-sm font-jakarta font-bold text-white/60 uppercase">Change</th>
                  <th className="text-left py-3 px-4 text-sm font-jakarta font-bold text-white/60 uppercase">Catalyst</th>
                </tr>
              </thead>
              <tbody>
                {/* AAPL */}
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <button className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 rounded-lg text-xs font-jakarta font-bold text-blue-400 transition-colors">
                        Buy
                      </button>
                      <div onClick={() => setSelectedTicker('AAPL')} className="cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="text-base font-jakarta font-bold text-white">AAPL</div>
                        <div className="text-xs font-jakarta text-white/60">Apple Inc.</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm font-jakarta text-white">AAPL</td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-xl font-jakarta font-black text-orange-400">68</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400" style={{ width: '85%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">85</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-green-400" style={{ width: '72%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">72</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#A7C4A0]" style={{ width: '45%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">45</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-400" style={{ width: '58%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">58</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400" style={{ width: '62%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">62</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-red-400" style={{ width: '40%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">40</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-base font-jakarta font-bold text-white">$252.89</td>
                  <td className="py-4 px-4 text-right text-base font-jakarta font-bold text-green-400">+0.1%</td>
                  <td className="py-4 px-4 text-sm font-jakarta text-white/60">Foldable iPhone launch expec...</td>
                </tr>

                {/* NVDA */}
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <button className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 rounded-lg text-xs font-jakarta font-bold text-blue-400 transition-colors">
                        Buy
                      </button>
                      <div onClick={() => setSelectedTicker('NVDA')} className="cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="text-base font-jakarta font-bold text-white">NVDA</div>
                        <div className="text-xs font-jakarta text-white/60">NVIDIA Corporation</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm font-jakarta text-white">NVDA</td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-xl font-jakarta font-black text-green-400">73</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400" style={{ width: '82%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">82</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-green-400" style={{ width: '90%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">90</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#A7C4A0]" style={{ width: '65%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">65</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-400" style={{ width: '78%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">78</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400" style={{ width: '55%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">55</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-red-400" style={{ width: '35%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">35</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-base font-jakarta font-bold text-white">$171.24</td>
                  <td className="py-4 px-4 text-right text-base font-jakarta font-bold text-red-400">-4.2%</td>
                  <td className="py-4 px-4 text-sm font-jakarta text-white/60">$1 billion in orders for Blackw...</td>
                </tr>

                {/* MSFT */}
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <button className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 rounded-lg text-xs font-jakarta font-bold text-blue-400 transition-colors">
                        Buy
                      </button>
                      <div onClick={() => setSelectedTicker('MSFT')} className="cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="text-base font-jakarta font-bold text-white">MSFT</div>
                        <div className="text-xs font-jakarta text-white/60">Microsoft Corporation</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm font-jakarta text-white">MSFT</td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-xl font-jakarta font-black text-green-400">76</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400" style={{ width: '88%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">88</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-green-400" style={{ width: '85%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">85</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#A7C4A0]" style={{ width: '52%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">52</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-400" style={{ width: '70%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">70</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400" style={{ width: '60%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">60</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-red-400" style={{ width: '38%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">38</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-base font-jakarta font-bold text-white">$365.97</td>
                  <td className="py-4 px-4 text-right text-base font-jakarta font-bold text-red-400">-1.5%</td>
                  <td className="py-4 px-4 text-sm font-jakarta text-white/60">Azure commitments from Ope...</td>
                </tr>

                {/* TSLA */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <button className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 rounded-lg text-xs font-jakarta font-bold text-blue-400 transition-colors">
                        Buy
                      </button>
                      <div onClick={() => setSelectedTicker('TSLA')} className="cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="text-base font-jakarta font-bold text-white">TSLA</div>
                        <div className="text-xs font-jakarta text-white/60">Tesla Inc.</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm font-jakarta text-white">TSLA</td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-xl font-jakarta font-black text-orange-400">63</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400" style={{ width: '55%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">55</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-green-400" style={{ width: '68%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">68</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#A7C4A0]" style={{ width: '48%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">48</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-400" style={{ width: '62%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">62</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400" style={{ width: '58%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">58</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-red-400" style={{ width: '45%' }} />
                      </div>
                      <span className="text-xs font-jakarta text-white/60">45</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-base font-jakarta font-bold text-white">$372.11</td>
                  <td className="py-4 px-4 text-right text-base font-jakarta font-bold text-red-400">-3.6%</td>
                  <td className="py-4 px-4 text-sm font-jakarta text-white/60">Successful April 2026 Cybert...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>


      </div>

      {/* Ticker Detail Modal */}
      {selectedTicker && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-gradient-to-br from-black/95 to-black/90 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-jakarta font-black text-white">{selectedTicker}</h2>
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs font-jakarta font-bold text-white transition-all">
                      Buy
                    </button>
                  </div>
                  <p className="text-sm font-jakarta text-white/60">
                    {selectedTicker === 'AAPL' && 'Apple Inc. · Technology'}
                    {selectedTicker === 'NVDA' && 'NVIDIA Corporation · Technology'}
                    {selectedTicker === 'MSFT' && 'Microsoft Corporation · Technology'}
                    {selectedTicker === 'TSLA' && 'Tesla, Inc. · Consumer Cyclical'}
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setSelectedTicker(null)
                    setSentimentScored(false)
                    setDetailTab('overview')
                  }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all"
                >
                  <IconX className="w-6 h-6 text-white" stroke={1.5} />
                </button>
              </div>

              {/* Price Info */}
              <div className="mt-4">
                <div className="text-4xl font-jakarta font-black text-white">$248.80</div>
                <div className="text-lg font-jakarta text-red-400 mb-1">-1.6% today</div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mt-6">
                {['overview', 'mindmap', 'research', 'financials'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setDetailTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-jakarta font-bold transition-all ${
                      detailTab === tab
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[600px] overflow-y-auto">
              {detailTab === 'overview' && (
                <div className="space-y-6">
                  {/* AI Analysis */}
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="text-sm font-jakarta font-bold text-blue-400">AI ANALYSIS — GROUNDED</div>
                    </div>
                    <p className="text-sm font-jakarta text-white/80 leading-relaxed">
                      API connection issue: Connection error...
                    </p>
                  </div>

                  {/* Key Catalyst & Risk */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                      <div className="text-xs font-jakarta text-white/60 mb-1">KEY CATALYST</div>
                      <div className="text-base font-jakarta font-bold text-white mb-1">Fundamental</div>
                      <p className="text-xs font-jakarta text-white/70">
                        Fundamental analysis active (see scores)
                      </p>
                    </div>
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                      <div className="text-xs font-jakarta text-white/60 mb-1">KEY RISK</div>
                      <div className="text-base font-jakarta font-bold text-white mb-1">Check risk metrics</div>
                      <p className="text-xs font-jakarta text-white/70">tab</p>
                    </div>
                  </div>

                  {/* Factor Breakdown */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <h3 className="text-lg font-jakarta font-bold text-white mb-4">Factor Breakdown</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'Fundamentals', score: 83, color: 'bg-blue-500' },
                        { name: 'Earnings Mom.', score: 72, color: 'bg-green-500' },
                        { name: 'Technical', score: 69, color: 'bg-[#A7C4A0]' },
                        { name: 'Sentiment', score: 65, color: 'bg-orange-500' },
                        { name: 'Macro Sens.', score: 89, color: 'bg-cyan-500' },
                        { name: 'Geopolitical', score: 68, color: 'bg-red-500' },
                      ].map((factor) => (
                        <div key={factor.name} className="flex items-center gap-4">
                          <div className="w-32 text-sm font-jakarta text-white">{factor.name}</div>
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className={`h-full ${factor.color} rounded-full`} style={{ width: `${factor.score}%` }} />
                          </div>
                          <div className="w-12 text-right text-sm font-jakarta font-bold text-white">{factor.score}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Monte Carlo Simulation */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <h3 className="text-lg font-jakarta font-bold text-white mb-2">Monte Carlo Simulation · 5,000 Paths</h3>
                    <p className="text-sm font-jakarta text-white/60 mb-4">VaR (95%)</p>
                    <p className="text-sm font-jakarta text-green-400 mb-4">Probability of positive return: 65.0% · Annual vol. 28.3%</p>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-xs font-jakarta text-white/60">Bear (P10)</div>
                        <div className="text-2xl font-jakarta font-bold text-red-400">$211.00</div>
                        <div className="text-xs font-jakarta text-red-400">-15.2%</div>
                      </div>
                      <div>
                        <div className="text-xs font-jakarta text-white/60">Base (P50)</div>
                        <div className="text-2xl font-jakarta font-bold text-white">$262.38</div>
                        <div className="text-xs font-jakarta text-green-400">+5.4%</div>
                      </div>
                      <div>
                        <div className="text-xs font-jakarta text-white/60">Bull (P90)</div>
                        <div className="text-2xl font-jakarta font-bold text-green-400">$324.84</div>
                        <div className="text-xs font-jakarta text-green-400">+30.6%</div>
                      </div>
                    </div>
                    <div className="h-48 bg-black/40 rounded-lg flex items-center justify-center">
                      <span className="text-white/40 font-jakarta">Monte Carlo paths visualization</span>
                    </div>
                  </div>

                  {/* Composite Sentiment Score */}
                  <div className="mt-6">
                    <CompositeSentimentScore 
                      ticker={selectedTicker}
                      onScoreComplete={() => setSentimentScored(true)}
                    />
                  </div>

                  {/* Visual Technical Analysis */}
                  {sentimentScored && (
                    <div className="mt-6">
                      <VisualTechnicalAnalysis ticker={selectedTicker} />
                    </div>
                  )}
                </div>
              )}

              {detailTab === 'mindmap' && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <p className="text-white/60 font-jakarta">Mindmap visualization coming soon</p>
                  </div>
                </div>
              )}

              {detailTab === 'research' && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <p className="text-white/60 font-jakarta">Deep research coming soon</p>
                  </div>
                </div>
              )}

              {detailTab === 'financials' && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <p className="text-white/60 font-jakarta">Financial data coming soon</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

