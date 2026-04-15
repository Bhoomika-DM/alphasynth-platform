'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import DashboardNavbar from '@/components/dashboard/DashboardNavbar'
import CandlestickChart from '@/components/charts/CandlestickChart'
import MonteCarloChart from '@/components/charts/MonteCarloChart'
import { IconActivity, IconSearch, IconUsers, IconShieldCheck, IconFileText } from '@tabler/icons-react'
import InferenceMindmap from '@/components/charts/InferenceMindmap'

export default function StockAnalysisPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedAct, setSelectedAct] = useState<string | null>('market')
  const [isContentExpanded, setIsContentExpanded] = useState(false)
  const [technicalSubTab, setTechnicalSubTab] = useState<'institutional' | 'candlestick'>('institutional')
  const [selectedPillarTab, setSelectedPillarTab] = useState<string>('FUNDAMENTAL')
  const [showEMA, setShowEMA] = useState(true)
  const [showRSI, setShowRSI] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M')
  const [selectedRiskTab, setSelectedRiskTab] = useState<'RED TEAM' | 'AUDITOR' | 'PORTFOLIO' | 'INFERENCE'>('RED TEAM')
  const [isAct5Unlocked, setIsAct5Unlocked] = useState(false)
  const [scenarioComputed, setScenarioComputed] = useState(false)
  const [scenarioScore, setScenarioScore] = useState(48.3)
  const [scenarioDelta, setScenarioDelta] = useState(-0.8)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  
  const ticker = searchParams.get('ticker') || 'AAPL'

  // Generate sample data based on timeframe
  const generateCandlestickData = (timeframe: string) => {
    const dataPoints: { [key: string]: number } = {
      '1D': 24,    // 24 hours (hourly data)
      '1W': 7,     // 7 days
      '1M': 30,    // 30 days
      '3M': 90,    // 90 days
      '6M': 180,   // 180 days
      '1Y': 365,   // 365 days
    }

    const points = dataPoints[timeframe] || 30
    const data = []
    let basePrice = 2400
    const today = new Date()

    for (let i = points - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      
      const randomChange = (Math.random() - 0.5) * 100
      const open = basePrice + randomChange
      const close = open + (Math.random() - 0.5) * 80
      const high = Math.max(open, close) + Math.random() * 40
      const low = Math.min(open, close) - Math.random() * 40

      data.push({
        time: date.toISOString().split('T')[0],
        open: Math.round(open * 100) / 100,
        high: Math.round(high * 100) / 100,
        low: Math.round(low * 100) / 100,
        close: Math.round(close * 100) / 100,
      })

      basePrice = close
    }

    return data
  }

  // Get candlestick data based on selected timeframe
  const candlestickData = generateCandlestickData(selectedTimeframe)

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

  // Handle URL parameter for auto-selecting act
  useEffect(() => {
    const actParam = searchParams.get('act')
    if (actParam) {
      setSelectedAct(actParam)
      setIsContentExpanded(true)
    }
  }, [searchParams])

  const acts = [
    {
      id: 'market',
      title: 'ACT 1: MARKET',
      subtitle: 'Context & Regime',
      description: 'Breadth · Sector Rotation · Volatility',
      icon: IconActivity,
      color: 'from-[#0D7C8C] to-[#5A8A4E]',
      score: 45,
      sentiment: 'NEUTRAL'
    },
    {
      id: 'setup',
      title: 'ACT 2: SETUP',
      subtitle: 'Institutional Flow',
      description: 'Money flow and positioning',
      icon: IconSearch,
      color: 'from-[#E5C76A] to-[#D4B659]',
      score: null,
      sentiment: null
    },
    {
      id: 'pillars',
      title: 'ACT 3: PILLARS',
      subtitle: 'Six-Agent Forensic',
      description: 'Deep fundamental analysis',
      icon: IconUsers,
      color: 'from-[#0D7C8C] to-[#0D7C8C]',
      score: null,
      sentiment: null
    },
    {
      id: 'risk',
      title: 'ACT 4: RISK',
      subtitle: 'Stress Test & Red Team',
      description: 'Risk assessment',
      icon: IconShieldCheck,
      color: 'from-[#C85A54] to-[#B74A44]',
      score: null,
      sentiment: null
    },
    {
      id: 'synthesis',
      title: 'ACT 5: SYNTHESIS',
      subtitle: 'Conviction & Verdict',
      description: 'Final recommendations',
      icon: IconFileText,
      color: 'from-[#0D7C8C] to-[#5A8A4E]',
      score: null,
      sentiment: null,
      locked: !isAct5Unlocked
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F9FB] via-white to-[#F8F9FB]">
        <div className="text-[#2D3748]">Loading...</div>
      </div>
    )
  }

  if (!user) return null

  const selectedActData = acts.find(act => act.id === selectedAct)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FB] via-white to-[#F8F9FB]">
      <DashboardNavbar user={user} />

      <div className="pt-24 pb-12 px-6">
        <div className="w-full">
          {/* Act Cards - Horizontal Layout */}
          <div className="grid grid-cols-5 gap-3 mb-6">
            {acts.map((act) => {
              const IconComponent = act.icon
              const isActive = selectedAct === act.id
              
              return (
                <button
                  key={act.id}
                  onClick={() => !act.locked && setSelectedAct(act.id)}
                  disabled={act.locked}
                  className={`relative rounded-xl p-4 transition-all duration-300 text-left ${
                    act.locked
                      ? 'bg-[#F8F9FB] border-2 border-[#2E4D8E]/10 opacity-50 cursor-not-allowed'
                      : isActive 
                        ? `bg-gradient-to-br ${act.color} border-2 border-transparent shadow-lg` 
                        : 'bg-white border-2 border-[#2E4D8E]/10 hover:border-[#0D7C8C]/30 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg ${
                      act.locked
                        ? 'bg-[#2E4D8E]/10'
                        : isActive ? 'bg-white/20' : `bg-gradient-to-br ${act.color}`
                    }`}>
                      {act.locked ? (
                        <svg className="w-5 h-5 text-[#718096]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      ) : (
                        <IconComponent className={`w-5 h-5 text-white`} stroke={2} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-bold tracking-wider uppercase ${
                        act.locked ? 'text-[#718096]' : isActive ? 'text-[#2D3748]' : 'text-[#0D7C8C]'
                      }`}>
                        {act.title}
                      </div>
                    </div>
                  </div>
                  <div className={`text-sm font-bold mb-1 text-[#2D3748]`}>
                    {act.subtitle}
                  </div>
                  <div className={`text-xs ${
                    isActive ? 'text-[#2D3748]' : 'text-[#718096]'
                  }`}>
                    {act.locked ? 'Complete Risk Review to unlock' : act.description}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Content Area */}
          {selectedAct && (
            <div className="bg-white border-2 border-[#2E4D8E]/10 rounded-2xl p-6">
              {/* Header with Score */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2E4D8E]/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0D7C8C]/10 rounded-lg flex items-center justify-center">
                    {selectedActData && <selectedActData.icon className="w-5 h-5 text-[#0D7C8C]" stroke={2} />}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#2D3748]">
                      {selectedActData?.title}
                    </h2>
                    <p className="text-sm text-[#718096]">
                      {selectedActData?.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {selectedActData?.score && (
                    <>
                      <span className="px-3 py-1 bg-[#E5C76A]/20 text-[#D4B659] rounded-lg text-xs font-bold uppercase">
                        {selectedActData.sentiment}
                      </span>
                      <div className="text-3xl font-black text-[#2D3748]">
                        {selectedActData.score}<span className="text-lg text-[#718096]">/100</span>
                      </div>
                    </>
                  )}
                  <button 
                    onClick={() => setIsContentExpanded(!isContentExpanded)}
                    className="p-2 hover:bg-[#F8F9FB] rounded-lg transition-all duration-200 animate-pulse"
                    style={{
                      animation: 'blink 2s ease-in-out infinite'
                    }}
                  >
                    <svg 
                      className={`w-5 h-5 text-[#0D7C8C] transition-transform duration-200 ${isContentExpanded ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content based on selected act - Collapsible */}
              {isContentExpanded && (
                <>
                  {selectedAct === 'market' && (
                    <div className="space-y-6">
                      {/* Market Breadth Section */}
                      <div>
                        <h3 className="text-xs font-bold text-[#718096] mb-3 uppercase tracking-wider">Market Breadth</h3>
                        <div className="grid grid-cols-4 gap-4">
                          <div className="p-4 bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl">
                            <div className="text-xs text-[#718096] mb-1">ADR Proxy</div>
                            <div className="text-2xl font-bold text-[#2D3748] mb-1">1.00</div>
                            <div className="text-xs text-[#718096]">Positive/Decline</div>
                          </div>
                          <div className="p-4 bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl">
                            <div className="text-xs text-[#718096] mb-1">Above 5MA/50</div>
                            <div className="text-2xl font-bold text-[#0D7C8C] mb-1">100%</div>
                            <div className="text-xs text-[#718096]">of top 50</div>
                          </div>
                          <div className="p-4 bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl">
                            <div className="text-xs text-[#718096] mb-1">Above 20MA/50</div>
                            <div className="text-2xl font-bold text-[#0D7C8C] mb-1">100%</div>
                            <div className="text-xs text-[#718096]">Long-term trend</div>
                          </div>
                          <div className="p-4 bg-[#F8F9FB] border border-[#E5C76A]/30 rounded-xl">
                            <div className="text-xs text-[#718096] mb-1">Verdict</div>
                            <div className="text-xl font-bold text-[#E5C76A]">THIN RALLY</div>
                          </div>
                        </div>
                      </div>

                      {/* Sector Rotation Section */}
                      <div>
                        <h3 className="text-xs font-bold text-[#718096] mb-3 uppercase tracking-wider">Sector Rotation (vs SPY)</h3>
                        <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-[#2D3748] font-semibold">Unknown</div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-[#718096]">1M: -0.1%</span>
                              <span className="px-2 py-1 bg-[#718096]/10 text-[#718096] rounded text-xs font-bold">NEUTRAL</span>
                            </div>
                          </div>
                          <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                            <div className="h-full bg-[#718096]" style={{ width: '50%' }} />
                          </div>
                        </div>
                      </div>

                      {/* Volatility Context Section */}
                      <div>
                        <h3 className="text-xs font-bold text-[#718096] mb-3 uppercase tracking-wider">Volatility Context (VIX)</h3>
                        <div className="grid grid-cols-4 gap-4">
                          <div className="p-4 bg-[#F8F9FB] border border-[#C85A54]/20 rounded-xl">
                            <div className="text-xs text-[#718096] mb-1">VIX Current</div>
                            <div className="text-2xl font-bold text-[#C85A54] mb-1">21.4</div>
                            <div className="text-xs text-[#718096]">Fear Index</div>
                          </div>
                          <div className="p-4 bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl">
                            <div className="text-xs text-[#718096] mb-1">52 Wk Median</div>
                            <div className="text-2xl font-bold text-[#2D3748] mb-1">17.4</div>
                            <div className="text-xs text-[#718096]">Historical baseline</div>
                          </div>
                          <div className="p-4 bg-[#F8F9FB] border border-[#C85A54]/20 rounded-xl">
                            <div className="text-xs text-[#718096] mb-1">VIX vs Median</div>
                            <div className="text-2xl font-bold text-[#C85A54] mb-1">+23.2%</div>
                            <div className="text-xs text-[#718096]">Relative deviation</div>
                          </div>
                          <div className="p-4 bg-[#F8F9FB] border border-[#C85A54]/20 rounded-xl">
                            <div className="text-xs text-[#718096] mb-1">Regime</div>
                            <div className="text-xl font-bold text-[#C85A54]">ELEVATED</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedAct === 'setup' && (
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#2E4D8E]/20">
                        <div>
                          <div className="text-xs text-[#718096] mb-1 uppercase tracking-wider">ACT 2: SETUP</div>
                          <h2 className="text-xl font-bold text-[#2D3748]">Catalyst Narrative</h2>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-[#718096] mb-1 uppercase tracking-wider">Setup Quality</div>
                          <div className="text-2xl font-black text-[#E5C76A]">20<span className="text-base text-[#718096]">/100</span></div>
                          <div className="text-xs font-bold text-[#E5C76A] uppercase">Weak Setup</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        {/* Algorithm Scans */}
                        <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-4">
                          <h3 className="text-xs font-bold text-[#718096] mb-3 uppercase tracking-wider">Algorithm Scans</h3>
                          <div>
                            <div className="text-xs text-[#718096] mb-1">Institutional Accumulation</div>
                            <div className="text-sm font-bold text-[#C85A54] mb-1">SIGNAL ABSENT</div>
                            <div className="text-xs text-[#718096]">Low volume cumulative — proceed with caution</div>
                          </div>
                        </div>

                        {/* Institutional Intent */}
                        <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-4">
                          <h3 className="text-xs font-bold text-[#718096] mb-3 uppercase tracking-wider">Institutional Intent</h3>
                          <div className="space-y-3">
                            <div className="text-center py-3">
                              <div className="text-sm font-bold text-[#E5C76A] mb-2">MIXED SIGNALS</div>
                              <div className="text-xs text-[#718096]">Sporadic intraflow but volatility. Waiting for significant institutional footprint.</div>
                            </div>
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-[#718096]">Institutional Stake</span>
                                <span className="text-sm font-bold text-[#2D3748]">0.0%</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-[#718096]">Promoter Alignment</span>
                                <span className="text-sm font-bold text-[#2D3748]">0.0%</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-[#718096]">Smart Drumbeat</span>
                                <span className="text-sm font-bold text-[#C85A54]">100.0%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Upcoming Catalysts */}
                        <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-4">
                          <h3 className="text-xs font-bold text-[#718096] mb-3 uppercase tracking-wider">Upcoming Catalysts</h3>
                          <div className="space-y-2.5">
                            <div className="pb-2.5 border-b border-[#2E4D8E]/10">
                              <div className="text-sm font-bold text-[#2D3748] mb-1">Earnings Release</div>
                              <div className="text-xs font-bold text-[#0D7C8C] mb-0.5">Distant</div>
                              <div className="text-xs text-[#718096]">Horizon: N/A days</div>
                            </div>
                            <div className="pb-2.5 border-b border-[#2E4D8E]/10">
                              <div className="text-sm font-bold text-[#2D3748] mb-1">Ex-Dividend Gap</div>
                              <div className="text-xs font-bold text-[#0D7C8C] mb-0.5">Inactive</div>
                              <div className="text-xs text-[#718096]">Horizon: N/A days</div>
                            </div>
                            <div>
                              <div className="text-sm font-bold text-[#2D3748] mb-1">Internal Verdict</div>
                              <div className="text-xs text-[#718096]">Event calendar clear — macro setup is primary driver</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedAct === 'pillars' && (
                    <div className="space-y-4">
                      {/* Tabs */}
                      <div className="flex gap-2">
                        {['FUNDAMENTAL', 'TECHNICAL', 'SENTIMENT', 'MACRO', 'GOVERNANCE', 'VALUATION'].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setSelectedPillarTab(tab)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                              selectedPillarTab === tab
                                ? 'bg-[#A855F7] text-white'
                                : 'bg-[#F8F9FB] text-[#718096] hover:bg-[#0D7C8C]/20'
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      {/* Technical Tab Content */}
                      {selectedPillarTab === 'TECHNICAL' && (
                        <>
                          {/* Sub-tabs for Technical */}
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setTechnicalSubTab('institutional')}
                              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                                technicalSubTab === 'institutional'
                                  ? 'bg-[#0D7C8C] text-[#2D3748]'
                                  : 'bg-[#F8F9FB] text-[#718096] hover:bg-[#0D7C8C]/20'
                              }`}
                            >
                              INSTITUTIONAL BASIS
                            </button>
                            <button 
                              onClick={() => setTechnicalSubTab('candlestick')}
                              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                                technicalSubTab === 'candlestick'
                                  ? 'bg-[#0D7C8C] text-[#2D3748]'
                                  : 'bg-[#F8F9FB] text-[#718096] hover:bg-[#0D7C8C]/20'
                              }`}
                            >
                              INTERACTIVE CANDLESTICK
                            </button>
                          </div>

                      {/* Technical Intelligence Dashboard - Conditional based on sub-tab */}
                      {technicalSubTab === 'institutional' ? (
                        <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-6 space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-4 border-b border-[#2E4D8E]/20">
                          <div>
                            <div className="text-xs text-[#718096] mb-1 uppercase tracking-wider">Structural Pillar</div>
                            <h3 className="text-xl font-bold text-[#2D3748]">Technical Intelligence</h3>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-[#718096] mb-1 uppercase tracking-wider">Conviction Score</div>
                            <div className="text-3xl font-black text-[#E5C76A]">50.0</div>
                          </div>
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-2 gap-6">
                          {/* Left Column */}
                          <div className="space-y-6">
                            {/* Momentum Matrix */}
                            <div>
                              <h4 className="text-xs font-bold text-[#718096] mb-3 uppercase tracking-wider flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#0D7C8C] rounded-full"></span>
                                MOMENTUM MATRIX
                              </h4>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-sm font-bold text-[#2D3748]">RSI (14)</div>
                                    <div className="text-xs text-[#718096]">Neutral Zone</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-2xl font-black text-[#2D3748]">0.0</div>
                                    <div className="text-xs text-[#718096]">VS FRIDAY BASELINE</div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between py-2 border-t border-[#2E4D8E]/10">
                                  <div className="text-sm text-[#2D3748]">MACD Beginner</div>
                                  <div className="px-2 py-1 bg-[#C85A54]/20 text-[#C85A54] rounded text-xs font-bold">NEUTRAL</div>
                                </div>
                                <div className="flex items-center justify-between py-2 border-t border-[#2E4D8E]/10">
                                  <div className="text-sm text-[#2D3748]">200 DMA Alignment</div>
                                  <div className="px-2 py-1 bg-[#C85A54]/20 text-[#C85A54] rounded text-xs font-bold">NEUTRAL</div>
                                </div>
                              </div>
                            </div>

                            {/* Detected Formations */}
                            <div>
                              <h4 className="text-xs font-bold text-[#718096] mb-3 uppercase tracking-wider flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#0D7C8C] rounded-full"></span>
                                DETECTED FORMATIONS
                              </h4>
                              <div className="text-center py-6">
                                <p className="text-sm text-[#718096]">No high-confidence patterns detected in previous days</p>
                              </div>
                            </div>
                          </div>

                          {/* Right Column */}
                          <div className="space-y-6">
                            {/* Structural Levels */}
                            <div>
                              <h4 className="text-xs font-bold text-[#718096] mb-3 uppercase tracking-wider flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#0D7C8C] rounded-full"></span>
                                STRUCTURAL LEVELS
                              </h4>
                              <div className="text-center py-6">
                                <p className="text-sm text-[#718096]">Calculating support/resistance...</p>
                              </div>
                            </div>

                            {/* Volumetric Flow */}
                            <div>
                              <h4 className="text-xs font-bold text-[#718096] mb-3 uppercase tracking-wider flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#0D7C8C] rounded-full"></span>
                                VOLUMETRIC FLOW
                              </h4>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-sm font-bold text-[#2D3748]">Relative Volume</div>
                                    <div className="text-xs text-[#718096]">vs 20-day avg</div>
                                  </div>
                                  <div className="text-3xl font-black text-[#2D3748]">1.0</div>
                                </div>
                                <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-[#0D7C8C] to-[#0D7C8C]" style={{ width: '50%' }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Market Regime Note */}
                        <div className="flex items-start gap-3 pt-4 border-t border-[#2E4D8E]/20">
                          <div className="flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4 text-[#0D7C8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <p className="text-xs text-[#718096]">
                            <span className="font-bold text-[#2D3748]">MARKET REGIME:</span> V12 decoding structural consolidation. Sideways momentum likely.
                          </p>
                        </div>
                      </div>
                      ) : (
                        /* Interactive Candlestick View */
                        <div className="space-y-4">
                          {/* Chart Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              {['1D', '1W', '1M', '3M', '6M', '1Y'].map((timeframe) => (
                                <button
                                  key={timeframe}
                                  onClick={() => setSelectedTimeframe(timeframe)}
                                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                                    selectedTimeframe === timeframe
                                      ? 'bg-[#0D7C8C] text-white'
                                      : 'bg-[#F8F9FB] text-[#718096] hover:bg-[#0D7C8C]/20'
                                  }`}
                                >
                                  {timeframe}
                                </button>
                              ))}
                            </div>
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => setShowEMA(!showEMA)}
                                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                                  showEMA
                                    ? 'bg-[#0D7C8C] text-white'
                                    : 'bg-[#F8F9FB] text-[#718096] hover:bg-[#0D7C8C]/20'
                                }`}
                              >
                                EMA
                              </button>
                              <button 
                                onClick={() => setShowRSI(!showRSI)}
                                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                                  showRSI
                                    ? 'bg-[#0D7C8C] text-white'
                                    : 'bg-[#F8F9FB] text-[#718096] hover:bg-[#0D7C8C]/20'
                                }`}
                              >
                                RSI
                              </button>
                              <button className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#F8F9FB] text-[#718096] hover:bg-[#0D7C8C]/20">
                                Volume
                              </button>
                            </div>
                          </div>

                          {/* Price Info Panel */}
                          <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-4">
                            <div className="grid grid-cols-5 gap-4">
                              <div>
                                <div className="text-xs text-[#718096] mb-1">Current Price</div>
                                <div className="text-xl font-bold text-[#2D3748]">₹2,450.50</div>
                              </div>
                              <div>
                                <div className="text-xs text-[#718096] mb-1">Change</div>
                                <div className="text-xl font-bold text-[#0D7C8C]">+45.20 (1.88%)</div>
                              </div>
                              <div>
                                <div className="text-xs text-[#718096] mb-1">Day High</div>
                                <div className="text-xl font-bold text-[#2D3748]">₹2,485.00</div>
                              </div>
                              <div>
                                <div className="text-xs text-[#718096] mb-1">Day Low</div>
                                <div className="text-xl font-bold text-[#2D3748]">₹2,420.30</div>
                              </div>
                              <div>
                                <div className="text-xs text-[#718096] mb-1">Volume</div>
                                <div className="text-xl font-bold text-[#2D3748]">1.2M</div>
                              </div>
                            </div>
                          </div>

                          {/* Candlestick Chart */}
                          <div className="bg-white border-2 border-[#2E4D8E]/10 rounded-xl p-6">
                            <CandlestickChart data={candlestickData} showRSI={showRSI} showEMA={showEMA} />
                          </div>

                          {/* Chart Legend */}
                          <div className="flex items-center gap-6 text-xs">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-[#22c55e] rounded"></div>
                              <span className="text-[#718096]">Bullish Candle</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-[#ef4444] rounded"></div>
                              <span className="text-[#718096]">Bearish Candle</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-0.5 bg-[#f97316]"></div>
                              <span className="text-[#718096]">EMA 20</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-0.5 bg-[#3b82f6]"></div>
                              <span className="text-[#718096]">EMA 50</span>
                            </div>
                          </div>
                        </div>
                      )}
                        </>
                      )}

                      {/* Fundamental Tab Content */}
                      {selectedPillarTab === 'FUNDAMENTAL' && (
                        <div className="space-y-4">
                          {/* Header */}
                          <div className="flex items-center justify-between pb-3 border-b border-[#2E4D8E]/20">
                          <div>
                            <div className="text-xs text-[#718096] mb-1 uppercase tracking-wider">Architectural Audit</div>
                            <h2 className="text-2xl font-bold text-[#2D3748]">Fundamental Performance</h2>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-[#718096] mb-1 uppercase tracking-wider">Pillar Score</div>
                            <div className="text-3xl font-black text-[#0D7C8C]">75.0</div>
                          </div>
                        </div>

                        {/* 4-Column Grid */}
                        <div className="grid grid-cols-4 gap-4">
                          {/* Profitability */}
                          <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                            <div className="flex items-center gap-2 mb-4">
                              <svg className="w-4 h-4 text-[#0D7C8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                              <h3 className="text-xs font-bold text-[#718096] uppercase tracking-wider">Profitability</h3>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <div className="text-xs text-[#718096] mb-1">ROE</div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xl font-bold text-[#2D3748]">42.64%</span>
                                  <span className="text-xs font-bold text-[#0D7C8C]">POSITIVE</span>
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-[#718096] mb-1">Net Margin</div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xl font-bold text-[#2D3748]">18.62%</span>
                                  <span className="text-xs font-bold text-[#0D7C8C]">POSITIVE</span>
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-[#718096] mb-1">Operating Margin</div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xl font-bold text-[#2D3748]">25.18%</span>
                                  <span className="text-xs font-bold text-[#0D7C8C]">POSITIVE</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Growth (YoY) */}
                          <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                            <div className="flex items-center gap-2 mb-4">
                              <svg className="w-4 h-4 text-[#0D7C8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                              </svg>
                              <h3 className="text-xs font-bold text-[#718096] uppercase tracking-wider">Growth (YoY)</h3>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <div className="text-xs text-[#718096] mb-1">Revenue</div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xl font-bold text-[#2D3748]">490.00%</span>
                                  <span className="text-xs font-bold text-[#0D7C8C]">POSITIVE</span>
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-[#718096] mb-1">Earnings</div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xl font-bold text-[#2D3748]">5.76%</span>
                                  <span className="text-xs font-bold text-[#E5C76A]">NEUTRAL</span>
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-[#718096] mb-1">FCF Conv. (TTM)</div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xl font-bold text-[#2D3748]">0.74</span>
                                  <span className="text-xs font-bold text-[#E5C76A]">NEUTRAL</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Solvency */}
                          <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                            <div className="flex items-center gap-2 mb-4">
                              <svg className="w-4 h-4 text-[#0D7C8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                              <h3 className="text-xs font-bold text-[#718096] uppercase tracking-wider">Solvency</h3>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <div className="text-xs text-[#718096] mb-1">Debt/Equity</div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xl font-bold text-[#2D3748]">9.44</span>
                                  <span className="text-xs font-bold text-[#C85A54]">NEGATIVE</span>
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-[#718096] mb-1">Current Ratio</div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xl font-bold text-[#2D3748]">2.52</span>
                                  <span className="text-xs font-bold text-[#0D7C8C]">POSITIVE</span>
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-[#718096] mb-1">Interest Cov.</div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xl font-bold text-[#2D3748]">83.07</span>
                                  <span className="text-xs font-bold text-[#0D7C8C]">POSITIVE</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Forensic */}
                          <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                            <div className="flex items-center gap-2 mb-4">
                              <svg className="w-4 h-4 text-[#0D7C8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                              </svg>
                              <h3 className="text-xs font-bold text-[#718096] uppercase tracking-wider">Forensic</h3>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <div className="text-xs text-[#718096] mb-1">Piotroski</div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xl font-bold text-[#2D3748]">7/9</span>
                                  <span className="text-xs font-bold text-[#0D7C8C]">POSITIVE</span>
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-[#718096] mb-1">Altman Z</div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xl font-bold text-[#2D3748]">-1.47</span>
                                  <span className="text-xs font-bold text-[#C85A54]">NEGATIVE</span>
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-[#718096] mb-1">Beneish M</div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xl font-bold text-[#2D3748]">13.07</span>
                                  <span className="text-xs font-bold text-[#C85A54]">NEGATIVE</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Audit Note */}
                        <div className="flex items-start gap-3 bg-[#F8F9FB] border border-[#0D7C8C]/30 rounded-lg p-4">
                          <svg className="w-5 h-5 text-[#0D7C8C] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-xs text-[#718096]">
                            Audit complete. Data integrity verified against historical filings. No manipulation flags detected in current reporting cycle.
                          </p>
                        </div>
                        </div>
                      )}

                      {/* Sentiment Tab Content */}
                      {selectedPillarTab === 'SENTIMENT' && (
                        <div className="space-y-6">
                          {/* Header */}
                          <div className="flex items-center justify-between pb-4 border-b border-[#2E4D8E]/20">
                            <div>
                              <div className="text-xs text-[#718096] mb-1 uppercase tracking-wider">Market Mood Engine</div>
                              <h2 className="text-2xl font-bold text-[#2D3748]">Sentiment Intelligence</h2>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-[#718096] mb-1 uppercase tracking-wider">Composite Mood</div>
                              <div className="text-3xl font-black text-[#E5C76A]">50.0</div>
                            </div>
                          </div>

                          {/* Four Sentiment Cards */}
                          <div className="grid grid-cols-4 gap-4">
                            {/* NEWS NLP */}
                            <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                              <div className="flex items-center gap-2 mb-3">
                                <svg className="w-4 h-4 text-[#0D7C8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                                <h3 className="text-xs font-bold text-[#718096] uppercase tracking-wider">News NLP</h3>
                              </div>
                              <div className="mb-2">
                                <div className="text-2xl font-bold text-[#2D3748] mb-1">NEUTRAL</div>
                                <div className="text-xs text-[#718096] mb-2">— STABLE</div>
                              </div>
                              <div className="text-xs text-[#718096]">Based on 3 recent reports</div>
                              <div className="mt-3 h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                                <div className="h-full bg-[#718096]" style={{ width: '50%' }} />
                              </div>
                            </div>

                            {/* ANALYST */}
                            <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                              <div className="flex items-center gap-2 mb-3">
                                <svg className="w-4 h-4 text-[#0D7C8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <h3 className="text-xs font-bold text-[#718096] uppercase tracking-wider">Analyst</h3>
                              </div>
                              <div className="mb-2">
                                <div className="text-2xl font-bold text-[#2D3748] mb-1">NEUTRAL</div>
                                <div className="text-xs text-[#718096] mb-2">— STABLE</div>
                              </div>
                              <div className="text-xs text-[#718096]">No analyst rating available</div>
                              <div className="mt-3 h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                                <div className="h-full bg-[#718096]" style={{ width: '50%' }} />
                              </div>
                            </div>

                            {/* INSIDER */}
                            <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                              <div className="flex items-center gap-2 mb-3">
                                <svg className="w-4 h-4 text-[#0D7C8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <h3 className="text-xs font-bold text-[#718096] uppercase tracking-wider">Insider</h3>
                              </div>
                              <div className="mb-2">
                                <div className="text-2xl font-bold text-[#2D3748] mb-1">NEUTRAL</div>
                                <div className="text-xs text-[#718096] mb-2">— STABLE</div>
                              </div>
                              <div className="text-xs text-[#718096]">0% Stake alignment</div>
                              <div className="mt-3 h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                                <div className="h-full bg-[#718096]" style={{ width: '50%' }} />
                              </div>
                            </div>

                            {/* CROWDING & TENSION */}
                            <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                              <div className="flex items-center gap-2 mb-3">
                                <svg className="w-4 h-4 text-[#0D7C8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <h3 className="text-xs font-bold text-[#718096] uppercase tracking-wider">Crowding & Tension</h3>
                              </div>
                              <div className="mb-2">
                                <div className="text-2xl font-bold text-[#E5C76A] mb-1">MODERATE</div>
                                <div className="text-xs text-[#718096] mb-2">— STABLE</div>
                              </div>
                              <div className="text-xs text-[#718096]">Flow & volatility burden</div>
                              <div className="mt-3 h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                                <div className="h-full bg-[#E5C76A]" style={{ width: '60%' }} />
                              </div>
                            </div>
                          </div>

                          {/* Advanced 26-Factor Matrix - Collapsible */}
                          <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                            <button 
                              onClick={() => {/* TODO: Add toggle state */}}
                              className="w-full flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-[#0D7C8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <h3 className="text-sm font-bold text-[#2D3748] uppercase tracking-wider">Advanced 26-Factor Matrix</h3>
                              </div>
                              <svg className="w-5 h-5 text-[#718096]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            <div className="mt-4 text-xs text-[#718096] text-center py-4">
                              Click to expand detailed factor analysis
                            </div>
                          </div>

                          {/* Primary Market Narratives */}
                          <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-sm font-bold text-[#2D3748] uppercase tracking-wider">Primary Market Narratives</h3>
                              <button className="px-4 py-2 bg-[#0D7C8C] text-white text-xs font-bold rounded-lg hover:bg-[#5A8A4E] transition-colors">
                                LOAD
                              </button>
                            </div>
                            <div className="text-xs text-[#718096] text-center py-4">
                              Click LOAD to fetch latest market narratives
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Macro Tab Content */}
                      {selectedPillarTab === 'MACRO' && (
                        <div className="space-y-6">
                          {/* Top Row - 4 Macro Indicators */}
                          <div className="grid grid-cols-4 gap-4">
                            {/* FED FUNDS RATE */}
                            <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                              <div className="text-xs text-[#718096] mb-2 uppercase tracking-wider">Fed Funds Rate</div>
                              <div className="text-3xl font-black text-[#2D3748] mb-1">5.25%</div>
                              <div className="text-xs font-bold text-[#C85A54]">HIGH RATE</div>
                            </div>

                            {/* CPI (INFLATION) */}
                            <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                              <div className="text-xs text-[#718096] mb-2 uppercase tracking-wider">CPI (Inflation)</div>
                              <div className="text-3xl font-black text-[#2D3748] mb-1">3.2%</div>
                              <div className="text-xs font-bold text-[#E5C76A]">MODERATE</div>
                            </div>

                            {/* BENCHMARK 10Y */}
                            <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                              <div className="text-xs text-[#718096] mb-2 uppercase tracking-wider">Benchmark 10Y</div>
                              <div className="text-3xl font-black text-[#2D3748] mb-1">4.35%</div>
                              <div className="text-xs font-bold text-[#718096]">Above NAVPERS</div>
                            </div>

                            {/* SECTOR STAGE */}
                            <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                              <div className="text-xs text-[#718096] mb-2 uppercase tracking-wider">Sector Stage</div>
                              <div className="text-3xl font-black text-[#2D3748] mb-1">UNKNOWN</div>
                              <div className="text-xs font-bold text-[#718096]">Unknown</div>
                            </div>
                          </div>

                          {/* Regime Impact Analysis */}
                          <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-6">
                            <h3 className="text-sm font-bold text-[#2D3748] uppercase tracking-wider mb-4">Regime Impact Analysis</h3>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between py-2 border-b border-[#2E4D8E]/10">
                                <div>
                                  <div className="text-sm font-bold text-[#2D3748]">Interest Rate Environment</div>
                                  <div className="text-xs text-[#E5C76A] font-bold">NEUTRAL IMPACT</div>
                                </div>
                                <div className="text-lg font-black text-[#2D3748]">15 pts</div>
                              </div>
                              <div className="flex items-center justify-between py-2 border-b border-[#2E4D8E]/10">
                                <div>
                                  <div className="text-sm font-bold text-[#2D3748]">Inflation & Pricing Power</div>
                                  <div className="text-xs text-[#E5C76A] font-bold">NEUTRAL IMPACT</div>
                                </div>
                                <div className="text-lg font-black text-[#2D3748]">10 pts</div>
                              </div>
                              <div className="flex items-center justify-between py-2 border-b border-[#2E4D8E]/10">
                                <div>
                                  <div className="text-sm font-bold text-[#2D3748]">Sector Cycle Position</div>
                                  <div className="text-xs text-[#E5C76A] font-bold">NEUTRAL IMPACT</div>
                                </div>
                                <div className="text-lg font-black text-[#2D3748]">10 pts</div>
                              </div>
                              <div className="flex items-center justify-between py-2">
                                <div>
                                  <div className="text-sm font-bold text-[#2D3748]">DXY / Currency Exposure</div>
                                  <div className="text-xs text-[#E5C76A] font-bold">NEUTRAL IMPACT</div>
                                </div>
                                <div className="text-lg font-black text-[#2D3748]">10 pts</div>
                              </div>
                            </div>
                          </div>

                          {/* Cross-Asset Correlations */}
                          <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-6">
                            <h3 className="text-sm font-bold text-[#2D3748] uppercase tracking-wider mb-4">Cross-Asset Correlations</h3>
                            <div className="grid grid-cols-2 gap-6">
                              {/* SPY (S&P500) */}
                              <div>
                                <div className="text-xs text-[#718096] mb-2 uppercase tracking-wider">SPY (S&P500)</div>
                                <div className="flex items-baseline gap-2 mb-1">
                                  <div className="text-2xl font-black text-[#2D3748]">98.96</div>
                                  <div className="text-sm font-bold text-[#0D7C8C]">▲ +0.85% (1M)</div>
                                </div>
                              </div>

                              {/* CRUDE OIL (WTI) */}
                              <div>
                                <div className="text-xs text-[#718096] mb-2 uppercase tracking-wider">Crude Oil (WTI)</div>
                                <div className="flex items-baseline gap-2 mb-1">
                                  <div className="text-2xl font-black text-[#2D3748]">399.41</div>
                                  <div className="text-sm font-bold text-[#0D7C8C]">▲ +10.81% (1M)</div>
                                </div>
                              </div>
                            </div>

                            {/* Architect Verdict */}
                            <div className="mt-6 pt-4 border-t border-[#2E4D8E]/20">
                              <div className="text-xs text-[#718096] mb-2 uppercase tracking-wider">Architect Verdict</div>
                              <p className="text-sm text-[#2D3748] italic">
                                "Dynamic macro environment; sector-driven dynamics"
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Governance Tab Content */}
                      {selectedPillarTab === 'GOVERNANCE' && (
                        <div className="space-y-6">
                          {/* Header */}
                          <div className="flex items-center justify-between pb-4 border-b border-[#C85A54]/20">
                            <div>
                              <div className="text-xs text-[#C85A54] mb-1 uppercase tracking-wider font-bold">Governance Concerns</div>
                              <h2 className="text-2xl font-bold text-[#2D3748]">Corporate Integrity & Risk Flags</h2>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-[#718096] mb-1 uppercase tracking-wider">Governance Score</div>
                              <div className="text-3xl font-black text-[#C85A54]">25<span className="text-lg text-[#718096]">/100</span></div>
                            </div>
                          </div>

                          {/* Key Governance Metrics - 4 Column Grid */}
                          <div className="grid grid-cols-4 gap-4">
                            {/* Board Independence */}
                            <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                              <div className="flex items-center gap-2 mb-4">
                                <svg className="w-4 h-4 text-[#0D7C8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <h3 className="text-xs font-bold text-[#718096] uppercase tracking-wider">Board Independence</h3>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-[#718096]">Independent Directors</span>
                                  <span className="text-sm font-bold text-[#2D3748]">45%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-[#718096]">Board Meetings/Year</span>
                                  <span className="text-sm font-bold text-[#2D3748]">8</span>
                                </div>
                                <div className="mt-3 pt-2 border-t border-[#2E4D8E]/10">
                                  <span className="text-xs font-bold text-[#E5C76A]">ADEQUATE</span>
                                </div>
                              </div>
                            </div>

                            {/* Promoter Integrity */}
                            <div className="bg-[#F8F9FB] border border-[#C85A54]/30 rounded-xl p-5">
                              <div className="flex items-center gap-2 mb-4">
                                <svg className="w-4 h-4 text-[#C85A54]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <h3 className="text-xs font-bold text-[#718096] uppercase tracking-wider">Promoter Integrity</h3>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-[#718096]">Promoter Pledge</span>
                                  <span className="text-sm font-bold text-[#C85A54]">65%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-[#718096]">Related Party Txns</span>
                                  <span className="text-sm font-bold text-[#C85A54]">15%</span>
                                </div>
                                <div className="mt-3 pt-2 border-t border-[#2E4D8E]/10">
                                  <span className="text-xs font-bold text-[#C85A54]">CONCERNING</span>
                                </div>
                              </div>
                            </div>

                            {/* Audit Quality */}
                            <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                              <div className="flex items-center gap-2 mb-4">
                                <svg className="w-4 h-4 text-[#0D7C8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="text-xs font-bold text-[#718096] uppercase tracking-wider">Audit Quality</h3>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-[#718096]">Auditor</span>
                                  <span className="text-sm font-bold text-[#2D3748]">Big 4</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-[#718096]">Opinion</span>
                                  <span className="text-sm font-bold text-[#0D7C8C]">Unqualified</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-[#718096]">Tenure</span>
                                  <span className="text-sm font-bold text-[#2D3748]">5 years</span>
                                </div>
                                <div className="mt-3 pt-2 border-t border-[#2E4D8E]/10">
                                  <span className="text-xs font-bold text-[#0D7C8C]">RELIABLE</span>
                                </div>
                              </div>
                            </div>

                            {/* Regulatory Compliance */}
                            <div className="bg-[#F8F9FB] border border-[#C85A54]/30 rounded-xl p-5">
                              <div className="flex items-center gap-2 mb-4">
                                <svg className="w-4 h-4 text-[#C85A54]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                </svg>
                                <h3 className="text-xs font-bold text-[#718096] uppercase tracking-wider">Regulatory Compliance</h3>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-[#718096]">SEBI Violations</span>
                                  <span className="text-sm font-bold text-[#C85A54]">2</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-[#718096]">Pending Litigations</span>
                                  <span className="text-sm font-bold text-[#C85A54]">3</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-[#718096]">Insider Trading</span>
                                  <span className="text-sm font-bold text-[#0D7C8C]">0</span>
                                </div>
                                <div className="mt-3 pt-2 border-t border-[#2E4D8E]/10">
                                  <span className="text-xs font-bold text-[#C85A54]">UNDER SCRUTINY</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Red Flags Section */}
                          <div className="bg-[#C85A54]/5 border-2 border-[#C85A54]/30 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                              <svg className="w-5 h-5 text-[#C85A54]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                              <h3 className="text-sm font-bold text-[#C85A54] uppercase tracking-wider">Active Red Flags</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                                <div className="w-2 h-2 bg-[#C85A54] rounded-full"></div>
                                <span className="text-sm text-[#2D3748]">Promoter Pledge {'>'} 50%</span>
                              </div>
                              <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                                <div className="w-2 h-2 bg-[#C85A54] rounded-full"></div>
                                <span className="text-sm text-[#2D3748]">High Related Party Transactions</span>
                              </div>
                              <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                                <div className="w-2 h-2 bg-[#E5C76A] rounded-full"></div>
                                <span className="text-sm text-[#2D3748]">Multiple Pending Litigations</span>
                              </div>
                              <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                                <div className="w-2 h-2 bg-[#E5C76A] rounded-full"></div>
                                <span className="text-sm text-[#2D3748]">SEBI Regulatory Actions</span>
                              </div>
                            </div>
                          </div>

                          {/* Transparency Score */}
                          <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-6">
                            <h3 className="text-sm font-bold text-[#2D3748] uppercase tracking-wider mb-4">Transparency & Disclosure</h3>
                            <div className="grid grid-cols-4 gap-4">
                              <div>
                                <div className="text-xs text-[#718096] mb-2">Disclosure Quality</div>
                                <div className="text-2xl font-black text-[#E5C76A]">60/100</div>
                              </div>
                              <div>
                                <div className="text-xs text-[#718096] mb-2">IR Communication</div>
                                <div className="text-2xl font-black text-[#0D7C8C]">75/100</div>
                              </div>
                              <div>
                                <div className="text-xs text-[#718096] mb-2">Shareholder Rights</div>
                                <div className="text-2xl font-black text-[#0D7C8C]">80/100</div>
                              </div>
                              <div>
                                <div className="text-xs text-[#718096] mb-2">Overall Score</div>
                                <div className="text-2xl font-black text-[#E5C76A]">72/100</div>
                              </div>
                            </div>
                          </div>

                          {/* Risk Assessment Note */}
                          <div className="flex items-start gap-3 bg-[#C85A54]/10 border border-[#C85A54]/30 rounded-lg p-4">
                            <svg className="w-5 h-5 text-[#C85A54] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <p className="text-xs text-[#2D3748]">
                              <span className="font-bold">RISK ALERT:</span> High promoter pledge and regulatory concerns detected. Exercise caution and consider position sizing accordingly. Monitor for further developments.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Valuation Tab Content */}
                      {selectedPillarTab === 'VALUATION' && (
                        <div className="space-y-6">
                          {/* Header */}
                          <div className="flex items-center justify-between pb-4 border-b border-[#2E4D8E]/20">
                            <div>
                              <div className="text-xs text-[#718096] mb-1 uppercase tracking-wider">Relative Multiples Analysis</div>
                              <h2 className="text-2xl font-bold text-[#2D3748]">Valuation Metrics</h2>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-black text-[#0D7C8C]">VALUATION SCORE: 75.0</div>
                            </div>
                          </div>

                          {/* Valuation Metrics */}
                          <div className="space-y-4">
                            {/* Trailing P/E Ratio */}
                            <div className="bg-[#F8F9FB] border-l-4 border-[#C85A54] rounded-lg p-5">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h3 className="text-sm font-bold text-[#2D3748]">Trailing P/E Ratio</h3>
                                  <p className="text-xs text-[#718096]">Relative to sector median</p>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-black text-[#2D3748]">N/A</div>
                                  <div className="text-xs font-bold text-[#C85A54]">SCORING: 0 pts</div>
                                </div>
                              </div>
                              <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                                <div className="h-full bg-[#C85A54]" style={{ width: '0%' }} />
                              </div>
                            </div>

                            {/* Price to Book (P/B) */}
                            <div className="bg-[#F8F9FB] border-l-4 border-[#C85A54] rounded-lg p-5">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h3 className="text-sm font-bold text-[#2D3748]">Price to Book (P/B)</h3>
                                  <p className="text-xs text-[#718096]">Asset value comparison</p>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-black text-[#2D3748]">N/A</div>
                                  <div className="text-xs font-bold text-[#C85A54]">SCORING: 0 pts</div>
                                </div>
                              </div>
                              <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                                <div className="h-full bg-[#C85A54]" style={{ width: '0%' }} />
                              </div>
                            </div>

                            {/* PEG Ratio */}
                            <div className="bg-[#F8F9FB] border-l-4 border-[#C85A54] rounded-lg p-5">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h3 className="text-sm font-bold text-[#2D3748]">PEG Ratio</h3>
                                  <p className="text-xs text-[#718096]">Growth-adjusted value</p>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-black text-[#2D3748]">N/A</div>
                                  <div className="text-xs font-bold text-[#C85A54]">SCORING: 5 pts</div>
                                </div>
                              </div>
                              <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                                <div className="h-full bg-[#C85A54]" style={{ width: '5%' }} />
                              </div>
                            </div>

                            {/* EV/EBITDA */}
                            <div className="bg-[#F8F9FB] border-l-4 border-[#0D7C8C] rounded-lg p-5">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h3 className="text-sm font-bold text-[#2D3748]">EV/EBITDA</h3>
                                  <p className="text-xs text-[#718096]">Enterprise Value Multiple</p>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-black text-[#0D7C8C]">12.92</div>
                                  <div className="text-xs font-bold text-[#0D7C8C]">SCORING: 15 pts</div>
                                </div>
                              </div>
                              <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                                <div className="h-full bg-[#0D7C8C]" style={{ width: '75%' }} />
                              </div>
                            </div>
                          </div>

                          {/* Bull & Bear Case */}
                          <div className="grid grid-cols-2 gap-4">
                            {/* Bull Case */}
                            <div className="bg-[#0D7C8C]/10 border-2 border-[#0D7C8C]/30 rounded-xl p-5">
                              <div className="flex items-center gap-2 mb-3">
                                <svg className="w-5 h-5 text-[#0D7C8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                                <h3 className="text-sm font-bold text-[#0D7C8C] uppercase tracking-wider">Bull Case Value</h3>
                              </div>
                              <p className="text-sm text-[#2D3748]">
                                "Current multiples suggest 15-20% margin of safety relative to historical forward averages."
                              </p>
                            </div>

                            {/* Bear Case */}
                            <div className="bg-[#C85A54]/10 border-2 border-[#C85A54]/30 rounded-xl p-5">
                              <div className="flex items-center gap-2 mb-3">
                                <svg className="w-5 h-5 text-[#C85A54]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                </svg>
                                <h3 className="text-sm font-bold text-[#C85A54] uppercase tracking-wider">Bear Case Value</h3>
                              </div>
                              <p className="text-sm text-[#2D3748]">
                                "Premature entry risk if terminal growth rates are revised downwards by -50bps."
                              </p>
                            </div>
                          </div>

                          {/* Valuation Summary */}
                          <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-6">
                            <h3 className="text-sm font-bold text-[#2D3748] uppercase tracking-wider mb-4">Valuation Summary</h3>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between py-2 border-b border-[#2E4D8E]/10">
                                <span className="text-sm text-[#718096]">Current Price</span>
                                <span className="text-lg font-bold text-[#2D3748]">₹2,450.50</span>
                              </div>
                              <div className="flex items-center justify-between py-2 border-b border-[#2E4D8E]/10">
                                <span className="text-sm text-[#718096]">Fair Value Estimate</span>
                                <span className="text-lg font-bold text-[#0D7C8C]">₹2,850.00</span>
                              </div>
                              <div className="flex items-center justify-between py-2 border-b border-[#2E4D8E]/10">
                                <span className="text-sm text-[#718096]">Upside Potential</span>
                                <span className="text-lg font-bold text-[#0D7C8C]">+16.3%</span>
                              </div>
                              <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-[#718096]">Recommendation</span>
                                <span className="text-lg font-bold text-[#0D7C8C]">BUY</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedAct === 'risk' && (
                    <div className="space-y-6">
                      {/* Top Alert Banner */}
                      <div className="bg-gradient-to-r from-[#C85A54] to-[#B74A44] rounded-xl p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-white font-bold text-lg uppercase tracking-wider">Adversarial Evaluation Phase</h3>
                            <p className="text-white/90 text-sm">Review adversarial flags to unlock institutional conviction synthesis</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setIsAct5Unlocked(true)}
                          className="px-6 py-3 bg-white text-[#C85A54] font-bold text-sm rounded-lg hover:bg-white/90 transition-colors uppercase tracking-wider"
                        >
                          Confirm Risk Review & Unlock Verdict
                        </button>
                      </div>

                      {/* Tabs */}
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedRiskTab('RED TEAM')}
                          className={`px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider ${
                            selectedRiskTab === 'RED TEAM'
                              ? 'bg-[#C85A54] text-white'
                              : 'bg-[#F8F9FB] text-[#718096] hover:bg-[#0D7C8C]/20'
                          }`}
                        >
                          Red Team
                        </button>
                        <button 
                          onClick={() => setSelectedRiskTab('AUDITOR')}
                          className={`px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider ${
                            selectedRiskTab === 'AUDITOR'
                              ? 'bg-[#0D7C8C] text-white'
                              : 'bg-[#F8F9FB] text-[#718096] hover:bg-[#0D7C8C]/20'
                          }`}
                        >
                          Auditor
                        </button>
                        <button 
                          onClick={() => setSelectedRiskTab('PORTFOLIO')}
                          className={`px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider ${
                            selectedRiskTab === 'PORTFOLIO'
                              ? 'bg-[#0D7C8C] text-white'
                              : 'bg-[#F8F9FB] text-[#718096] hover:bg-[#0D7C8C]/20'
                          }`}
                        >
                          Portfolio
                        </button>
                        <button 
                          onClick={() => setSelectedRiskTab('INFERENCE')}
                          className={`px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider ${
                            selectedRiskTab === 'INFERENCE'
                              ? 'bg-[#0D7C8C] text-white'
                              : 'bg-[#F8F9FB] text-[#718096] hover:bg-[#0D7C8C]/20'
                          }`}
                        >
                          Inference
                        </button>
                      </div>

                      {/* Main Content - Conditional based on selected tab */}
                      {selectedRiskTab === 'RED TEAM' && (
                        <div className="bg-white border-2 border-[#2E4D8E]/10 rounded-xl p-8">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#2E4D8E]/20">
                            <div>
                              <h2 className="text-2xl font-bold text-[#2D3748] mb-1">The Adversary's Verdict</h2>
                              <p className="text-sm text-[#718096] uppercase tracking-wider">Forensic Short-Seller Posture</p>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-[#718096] mb-1 uppercase tracking-wider">Risk Penalty</div>
                              <div className="text-4xl font-black text-[#C85A54]">-16.0 <span className="text-lg">pts</span></div>
                            </div>
                          </div>

                          {/* Two Column Layout */}
                          <div className="grid grid-cols-2 gap-8">
                            {/* Left Column - Adversarial Summary */}
                            <div className="space-y-6">
                              {/* Summary Status */}
                              <div className="bg-[#F8F9FB] border border-[#C85A54]/30 rounded-xl p-5">
                                <h3 className="text-xs font-bold text-[#C85A54] mb-3 uppercase tracking-wider">Adversarial Summary</h3>
                                <div className="text-2xl font-bold text-[#C85A54]">concerned</div>
                              </div>

                              {/* Critical Fragility */}
                              <div className="bg-[#F8F9FB] border border-[#C85A54]/30 rounded-xl p-5">
                                <h3 className="text-xs font-bold text-[#C85A54] mb-4 uppercase tracking-wider">Critical Fragility</h3>
                                <div className="space-y-3">
                                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#C85A54]/20">
                                    <div className="w-2 h-2 bg-[#C85A54] rounded-full mt-1.5"></div>
                                    <div>
                                      <div className="text-sm font-bold text-[#2D3748]">TECHNICAL</div>
                                      <div className="text-xs text-[#718096]">Severely negative risk-adjusted returns</div>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#C85A54]/20">
                                    <div className="w-2 h-2 bg-[#C85A54] rounded-full mt-1.5"></div>
                                    <div>
                                      <div className="text-sm font-bold text-[#2D3748]">TECHNICAL</div>
                                      <div className="text-xs text-[#718096]">Massive drawdown risk</div>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#C85A54]/20">
                                    <div className="w-2 h-2 bg-[#C85A54] rounded-full mt-1.5"></div>
                                    <div>
                                      <div className="text-sm font-bold text-[#2D3748]">COMPETITIVE</div>
                                      <div className="text-xs text-[#718096]">Evaporating revenue growth</div>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#C85A54]/20">
                                    <div className="w-2 h-2 bg-[#C85A54] rounded-full mt-1.5"></div>
                                    <div>
                                      <div className="text-sm font-bold text-[#2D3748]">MANAGEMENT</div>
                                      <div className="text-xs text-[#718096]">Missing earnings expectations</div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Logic Inconsistencies */}
                              <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                                <h3 className="text-xs font-bold text-[#E5C76A] mb-3 uppercase tracking-wider">Logic Inconsistencies</h3>
                                <div className="text-sm text-[#718096]">No major inconsistencies detected</div>
                              </div>
                            </div>

                            {/* Right Column - Adversarial Scenarios */}
                            <div className="space-y-4">
                              <h3 className="text-xs font-bold text-[#718096] mb-4 uppercase tracking-wider">Adversarial Scenarios</h3>
                              
                              {/* Scenario 1 - MEDIUM */}
                              <div className="bg-[#F8F9FB] border-2 border-[#E5C76A]/40 rounded-xl p-5">
                                <div className="flex items-center justify-between mb-3">
                                  <span className="px-3 py-1 bg-[#E5C76A]/20 text-[#E5C76A] text-xs font-bold rounded uppercase tracking-wider">Medium</span>
                                  <span className="text-xl font-black text-[#C85A54]">-40% Impact</span>
                                </div>
                                <h4 className="text-sm font-bold text-[#2D3748] mb-2">IT Services Demand Collapse</h4>
                                <p className="text-xs text-[#718096]">Trigger: Global economic indicators misfire if accelerating discretionary slowdown</p>
                              </div>

                              {/* Scenario 2 - HIGH */}
                              <div className="bg-[#F8F9FB] border-2 border-[#C85A54]/40 rounded-xl p-5">
                                <div className="flex items-center justify-between mb-3">
                                  <span className="px-3 py-1 bg-[#C85A54]/20 text-[#C85A54] text-xs font-bold rounded uppercase tracking-wider">High</span>
                                  <span className="text-xl font-black text-[#C85A54]">-25% Impact</span>
                                </div>
                                <h4 className="text-sm font-bold text-[#2D3748] mb-2">Margin Compression Spiral</h4>
                                <p className="text-xs text-[#718096]">Trigger: Persistent compression from 3rd-party providers in client price jamming seeking to outsource margin decline</p>
                              </div>

                              {/* Scenario 3 - MEDIUM */}
                              <div className="bg-[#F8F9FB] border-2 border-[#E5C76A]/40 rounded-xl p-5">
                                <div className="flex items-center justify-between mb-3">
                                  <span className="px-3 py-1 bg-[#E5C76A]/20 text-[#E5C76A] text-xs font-bold rounded uppercase tracking-wider">Medium</span>
                                  <span className="text-xl font-black text-[#C85A54]">-30% Impact</span>
                                </div>
                                <h4 className="text-sm font-bold text-[#2D3748] mb-2">Currency/Macro Headwinds</h4>
                                <p className="text-xs text-[#718096]">Trigger: Accelerating currency impact on developed market slowdown implying effective revenue</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* AUDITOR Tab Content */}
                      {selectedRiskTab === 'AUDITOR' && (
                        <div className="bg-white border-2 border-[#2E4D8E]/10 rounded-xl p-8">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2E4D8E]/20">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-[#0D7C8C]/10 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-[#0D7C8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                              </div>
                              <div>
                                <h2 className="text-2xl font-bold text-[#2D3748]">Forensic Audit Log</h2>
                                <p className="text-sm text-[#718096]">Cross-validation & integrity verification</p>
                              </div>
                            </div>
                            <div className="px-4 py-2 bg-[#0D7C8C]/20 border-2 border-[#0D7C8C]/40 rounded-lg">
                              <span className="text-sm font-bold text-[#0D7C8C] uppercase tracking-wider">Integrity Verified</span>
                            </div>
                          </div>

                          {/* Audit Log Entries */}
                          <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-6 mb-6">
                            <h3 className="text-xs font-bold text-[#718096] mb-4 uppercase tracking-wider">Audit Process Log</h3>
                            <div className="space-y-2 text-sm">
                              <div className="text-[#2D3748]">
                                <span className="text-[#718096]">[2024-01-15 14:32:18]</span> Initiating forensic audit sequence...
                              </div>
                              <div className="text-[#2D3748]">
                                <span className="text-[#718096]">[2024-01-15 14:32:19]</span> Cross-referencing fundamental data with RED TEAM findings...
                              </div>
                              <div className="text-[#2D3748]">
                                <span className="text-[#718096]">[2024-01-15 14:32:21]</span> Validating sentiment scores against market data...
                              </div>
                              <div className="text-[#2D3748]">
                                <span className="text-[#718096]">[2024-01-15 14:32:23]</span> Verifying technical indicators consistency...
                              </div>
                              <div className="text-[#0D7C8C] font-bold">
                                <span className="text-[#718096]">[2024-01-15 14:32:25]</span> ✓ All data sources validated
                              </div>
                            </div>
                          </div>

                          {/* Audit Summary Box */}
                          <div className="bg-[#F8F9FB] border-2 border-[#0D7C8C]/30 rounded-xl p-6 mb-6">
                            <h3 className="text-sm font-bold text-[#2D3748] mb-4 uppercase tracking-wider">Audit Summary</h3>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between py-2 border-b border-[#2E4D8E]/10">
                                <span className="text-[#718096]">Audit Status:</span>
                                <span className="text-[#0D7C8C] font-bold">PASSED</span>
                              </div>
                              <div className="flex items-center justify-between py-2 border-b border-[#2E4D8E]/10">
                                <span className="text-[#718096]">Report Final:</span>
                                <span className="text-[#2D3748]">N/A</span>
                              </div>
                              <div className="flex items-center justify-between py-2">
                                <span className="text-[#718096]">Sequential ID:</span>
                                <span className="text-[#2D3748]">AS1-2F8564</span>
                              </div>
                            </div>
                          </div>

                          {/* Convergence Alert */}
                          <div className="bg-[#E5C76A]/10 border-2 border-[#E5C76A]/40 rounded-xl p-6 mb-6">
                            <div className="flex items-center gap-3 mb-3">
                              <svg className="w-5 h-5 text-[#E5C76A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                              <h3 className="text-sm font-bold text-[#E5C76A] uppercase tracking-wider">Convergence Alert</h3>
                            </div>
                            <p className="text-[#2D3748] mb-2">No convergence fixed</p>
                            <p className="text-[#E5C76A] font-bold">(CONVICTION MODE)</p>
                          </div>

                          {/* Red Flags Verified */}
                          <div className="bg-[#0D7C8C]/10 border-2 border-[#0D7C8C]/30 rounded-xl p-6">
                            <h3 className="text-sm font-bold text-[#2D3748] mb-4 uppercase tracking-wider">Red Flags Verified</h3>
                            <div className="flex items-center gap-3">
                              <svg className="w-6 h-6 text-[#0D7C8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-[#0D7C8C] font-bold text-lg">0 FORENSIC VIOLATIONS DETECTED</span>
                            </div>
                          </div>

                          {/* Footer Note */}
                          <div className="mt-6 pt-4 border-t border-[#2E4D8E]/20">
                            <div className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-[#0D7C8C] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <p className="text-xs text-[#718096]">
                                Audit complete. All data integrity checks passed. System ready for synthesis phase.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* PORTFOLIO Tab Content */}
                      {selectedRiskTab === 'PORTFOLIO' && (
                        <div className="bg-white border-2 border-[#2E4D8E]/10 rounded-xl p-8">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2E4D8E]/20">
                            <div>
                              <h2 className="text-2xl font-bold text-[#2D3748]">Portfolio Risk Analysis</h2>
                              <p className="text-sm text-[#718096]">Concentration, correlation & impact assessment</p>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-[#718096] mb-1 uppercase tracking-wider">Portfolio Risk Score</div>
                              <div className="text-3xl font-black text-[#E5C76A]">65<span className="text-lg text-[#718096]">/100</span></div>
                            </div>
                          </div>

                          {/* Concentration Risk Analysis */}
                          <div className="mb-6">
                            <h3 className="text-sm font-bold text-[#2D3748] mb-4 uppercase tracking-wider">Concentration Risk</h3>
                            <div className="grid grid-cols-3 gap-4">
                              {/* Position Size */}
                              <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-3">
                                  <svg className="w-5 h-5 text-[#0D7C8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                  </svg>
                                  <h4 className="text-xs font-bold text-[#718096] uppercase tracking-wider">Position Size</h4>
                                </div>
                                <div className="mb-2">
                                  <div className="text-2xl font-bold text-[#2D3748]">8.5%</div>
                                  <div className="text-xs text-[#718096]">of total portfolio</div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-[#2E4D8E]/10">
                                  <span className="text-xs font-bold text-[#0D7C8C]">ACCEPTABLE</span>
                                </div>
                              </div>

                              {/* Sector Concentration */}
                              <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-3">
                                  <svg className="w-5 h-5 text-[#E5C76A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                  </svg>
                                  <h4 className="text-xs font-bold text-[#718096] uppercase tracking-wider">Sector Exposure</h4>
                                </div>
                                <div className="mb-2">
                                  <div className="text-2xl font-bold text-[#2D3748]">32%</div>
                                  <div className="text-xs text-[#718096]">IT Services sector</div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-[#2E4D8E]/10">
                                  <span className="text-xs font-bold text-[#E5C76A]">MODERATE</span>
                                </div>
                              </div>

                              {/* Diversification Score */}
                              <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-3">
                                  <svg className="w-5 h-5 text-[#0D7C8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <h4 className="text-xs font-bold text-[#718096] uppercase tracking-wider">Diversification</h4>
                                </div>
                                <div className="mb-2">
                                  <div className="text-2xl font-bold text-[#2D3748]">72/100</div>
                                  <div className="text-xs text-[#718096]">portfolio diversity</div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-[#2E4D8E]/10">
                                  <span className="text-xs font-bold text-[#0D7C8C]">GOOD</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Correlation Matrix */}
                          <div className="mb-6">
                            <h3 className="text-sm font-bold text-[#2D3748] mb-4 uppercase tracking-wider">Correlation Matrix</h3>
                            <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-6">
                              <div className="space-y-3">
                                {/* High Correlation Holdings */}
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-[#C85A54] uppercase tracking-wider">High Correlation (≥0.7)</span>
                                    <span className="text-xs font-bold text-[#C85A54]">3 Holdings</span>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#C85A54]/20">
                                      <div>
                                        <div className="text-sm font-bold text-[#2D3748]">INFY</div>
                                        <div className="text-xs text-[#718096]">IT Services</div>
                                      </div>
                                      <div className="text-right">
                                        <div className="text-lg font-bold text-[#C85A54]">0.82</div>
                                        <div className="text-xs text-[#718096]">correlation</div>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#C85A54]/20">
                                      <div>
                                        <div className="text-sm font-bold text-[#2D3748]">WIPRO</div>
                                        <div className="text-xs text-[#718096]">IT Services</div>
                                      </div>
                                      <div className="text-right">
                                        <div className="text-lg font-bold text-[#C85A54]">0.78</div>
                                        <div className="text-xs text-[#718096]">correlation</div>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#C85A54]/20">
                                      <div>
                                        <div className="text-sm font-bold text-[#2D3748]">HCLTECH</div>
                                        <div className="text-xs text-[#718096]">IT Services</div>
                                      </div>
                                      <div className="text-right">
                                        <div className="text-lg font-bold text-[#C85A54]">0.75</div>
                                        <div className="text-xs text-[#718096]">correlation</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Warning Message */}
                                <div className="flex items-start gap-3 bg-[#C85A54]/10 border border-[#C85A54]/30 rounded-lg p-4 mt-4">
                                  <svg className="w-5 h-5 text-[#C85A54] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                  </svg>
                                  <p className="text-xs text-[#2D3748]">
                                    <span className="font-bold">CORRELATION RISK:</span> High correlation with 3 IT Services holdings. Sector-wide downturn could amplify losses. Consider diversifying into uncorrelated sectors.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Risk Impact Assessment */}
                          <div>
                            <h3 className="text-sm font-bold text-[#2D3748] mb-4 uppercase tracking-wider">Risk Impact Assessment</h3>
                            <div className="grid grid-cols-2 gap-4">
                              {/* Portfolio Beta Impact */}
                              <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                                <h4 className="text-xs font-bold text-[#718096] mb-4 uppercase tracking-wider">Portfolio Beta Impact</h4>
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between py-2 border-b border-[#2E4D8E]/10">
                                    <span className="text-xs text-[#718096]">Current Portfolio Beta</span>
                                    <span className="text-sm font-bold text-[#2D3748]">1.15</span>
                                  </div>
                                  <div className="flex items-center justify-between py-2 border-b border-[#2E4D8E]/10">
                                    <span className="text-xs text-[#718096]">Stock Beta</span>
                                    <span className="text-sm font-bold text-[#2D3748]">1.22</span>
                                  </div>
                                  <div className="flex items-center justify-between py-2">
                                    <span className="text-xs text-[#718096]">New Portfolio Beta</span>
                                    <span className="text-sm font-bold text-[#E5C76A]">1.16</span>
                                  </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-[#2E4D8E]/10">
                                  <p className="text-xs text-[#718096]">Adding this position slightly increases portfolio volatility</p>
                                </div>
                              </div>

                              {/* Drawdown Risk */}
                              <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                                <h4 className="text-xs font-bold text-[#718096] mb-4 uppercase tracking-wider">Drawdown Risk</h4>
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between py-2 border-b border-[#2E4D8E]/10">
                                    <span className="text-xs text-[#718096]">Max Historical Drawdown</span>
                                    <span className="text-sm font-bold text-[#C85A54]">-28%</span>
                                  </div>
                                  <div className="flex items-center justify-between py-2 border-b border-[#2E4D8E]/10">
                                    <span className="text-xs text-[#718096]">Portfolio Impact (8.5%)</span>
                                    <span className="text-sm font-bold text-[#C85A54]">-2.4%</span>
                                  </div>
                                  <div className="flex items-center justify-between py-2">
                                    <span className="text-xs text-[#718096]">Risk Level</span>
                                    <span className="text-sm font-bold text-[#E5C76A]">MODERATE</span>
                                  </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-[#2E4D8E]/10">
                                  <p className="text-xs text-[#718096]">Position size limits potential portfolio drawdown</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Final Recommendation */}
                          <div className="mt-6 pt-6 border-t border-[#2E4D8E]/20">
                            <div className="flex items-start gap-3 bg-[#E5C76A]/10 border border-[#E5C76A]/30 rounded-lg p-5">
                              <svg className="w-6 h-6 text-[#E5C76A] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <div>
                                <h4 className="text-sm font-bold text-[#2D3748] mb-2">Portfolio Recommendation</h4>
                                <p className="text-xs text-[#2D3748]">
                                  Position size is acceptable at 8.5%, but high correlation with existing IT Services holdings increases sector concentration risk to 32%. 
                                  Consider reducing position size to 5-6% or rebalancing portfolio to add uncorrelated sectors (Pharma, FMCG, Energy) for better diversification.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* INFERENCE Tab Content */}
                      {selectedRiskTab === 'INFERENCE' && (
                        <div className="bg-white border-2 border-[#2E4D8E]/10 rounded-xl p-8">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2E4D8E]/20">
                            <div>
                              <h2 className="text-2xl font-bold text-[#2D3748]">Thesis Logic Map — Dependency Graph</h2>
                              <p className="text-sm text-[#718096]">Mapping causality cascades from macro drivers to terminal valuation</p>
                            </div>
                          </div>

                          {/* Mindmap Component */}
                          <div className="mb-6">
                            <InferenceMindmap />
                          </div>

                          {/* Bottom Section - Quote and Key Dependencies */}
                          <div className="grid grid-cols-2 gap-6 mt-6">
                            {/* Architect's Quote */}
                            <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                              <div className="flex items-start gap-2 mb-3">
                                <svg className="w-5 h-5 text-[#0D7C8C] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                              </div>
                              <p className="text-sm text-[#2D3748] leading-relaxed mb-3">
                                "TCS presents a contradictory investment case — exceptional operational metrics and balance sheet strength are overshadowed by governance red flags, growth deceleration, and valuation concerns in a moderating demand environment."
                              </p>
                              <div className="text-xs text-[#718096] font-bold">— The Architect</div>
                            </div>

                            {/* Key Dependencies */}
                            <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-5">
                              <h3 className="text-xs font-bold text-[#718096] mb-4 uppercase tracking-wider">Key Dependencies</h3>
                              <div className="space-y-2 text-xs text-[#2D3748]">
                                <div className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 bg-[#0D7C8C] rounded-full mt-1.5"></div>
                                  <span>Macro sentiment drives sector rotation</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 bg-[#0D7C8C] rounded-full mt-1.5"></div>
                                  <span>Business fundamentals impact profitability</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 bg-[#0D7C8C] rounded-full mt-1.5"></div>
                                  <span>Profitability determines valuation multiples</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 bg-[#C85A54] rounded-full mt-1.5"></div>
                                  <span>Risk factors adjust final conviction</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedAct === 'synthesis' && (
                    <div className="space-y-6">
                      {/* Top Section - Stock Info and Conviction Badge */}
                      <div className="grid grid-cols-3 gap-6">
                        {/* Stock Info */}
                        <div className="col-span-1">
                          <div className="text-sm text-[#718096] mb-2">TICKER</div>
                          <div className="text-4xl font-black text-[#2D3748] mb-1">TCS</div>
                          <div className="text-sm text-[#718096]">TCS - UNKNOWN</div>
                          <div className="mt-4">
                            <div className="text-3xl font-black text-[#2D3748]">₹2,589</div>
                            <div className="text-sm text-[#0D7C8C]">+1.16% TODAY</div>
                          </div>
                        </div>

                        {/* Alpha Score */}
                        <div className="col-span-1 flex flex-col items-center justify-center">
                          <div className="text-xs text-[#718096] mb-2 uppercase tracking-wider">Alpha Score</div>
                          <div className="text-6xl font-black text-[#C85A54]">45.3</div>
                        </div>

                        {/* Conviction Badge */}
                        <div className="col-span-1">
                          <div className="bg-gradient-to-br from-[#0D7C8C] to-[#0D7C8C] rounded-2xl p-6 text-center border-2 border-[#2E4D8E]/30">
                            <div className="text-xs text-[#2D3748] mb-3 uppercase tracking-wider font-bold">Conviction Unlocked</div>
                            <div className="relative w-32 h-32 mx-auto mb-3">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(31,41,51,0.1)" strokeWidth="8" />
                                <circle 
                                  cx="64" 
                                  cy="64" 
                                  r="56" 
                                  fill="none" 
                                  stroke="#E5C76A" 
                                  strokeWidth="8"
                                  strokeDasharray="351.86"
                                  strokeDashoffset="87.96"
                                  strokeLinecap="round"
                                />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="text-4xl font-black text-[#E5C76A]">45.3</div>
                                <div className="text-xs text-[#2D3748] uppercase font-bold">Hold</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Synthesis Paradox Engine */}
                      <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-2 h-2 bg-[#A855F7] rounded-full"></div>
                          <h3 className="text-sm font-bold text-[#2D3748] uppercase tracking-wider">Synthesis Paradox Engine</h3>
                        </div>
                        <p className="text-base text-[#2D3748] leading-relaxed">
                          <span className="font-bold">AlphaSynth Conviction Score: 45.2/100 — SELL.</span> The investment case rests on strong fundamentals, moderate technical structure, moderate sentiment, moderate macro positioning, and weak governance quality. <span className="font-bold">KEY CONTRADICTIONS:</span> Governance concerns flagged — ownership structure and oversight quality warrant closer scrutiny.
                        </p>
                      </div>

                      {/* Two Column Layout */}
                      <div className="grid grid-cols-2 gap-6">
                        {/* Left Column - Monte Carlo */}
                        <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-[#0D7C8C] rounded-full"></div>
                            <h3 className="text-sm font-bold text-[#2D3748] uppercase tracking-wider">Monte Carlo Structural Outlook</h3>
                          </div>
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-[#718096] uppercase">5,000 Simulated Paths</span>
                              <span className="text-xs font-bold text-[#2D3748]">90-Day Horizon</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3 mb-4">
                              <div className="text-center">
                                <div className="text-xs text-[#718096] mb-1">Bull Case</div>
                                <div className="text-lg font-bold text-[#0D7C8C]">₹2,850</div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs text-[#718096] mb-1">Base Case</div>
                                <div className="text-lg font-bold text-[#2D3748]">₹2,589</div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs text-[#718096] mb-1">Bear Case</div>
                                <div className="text-lg font-bold text-[#C85A54]">₹2,200</div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-white rounded-xl p-4">
                            <MonteCarloChart currentPrice={2589} paths={100} />
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="text-center p-3 bg-white rounded-lg">
                              <div className="text-xs text-[#718096] mb-1">VaR (95%)</div>
                              <div className="text-sm font-bold text-[#C85A54]">-12.3%</div>
                            </div>
                            <div className="text-center p-3 bg-white rounded-lg">
                              <div className="text-xs text-[#718096] mb-1">Upside Prob.</div>
                              <div className="text-sm font-bold text-[#0D7C8C]">58.2%</div>
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Scenario Sandbox */}
                        <div className="bg-[#F8F9FB] border border-[#E5C76A]/30 rounded-xl p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-[#E5C76A] rounded-full"></div>
                            <h3 className="text-sm font-bold text-[#2D3748] uppercase tracking-wider">Scenario Sandbox</h3>
                          </div>
                          
                          <div className="space-y-4 mb-6">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-[#718096] uppercase">Rate Change</span>
                              <span className="text-sm font-bold text-[#2D3748]">0BPS</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-[#718096] uppercase">Revenue Growth</span>
                              <div className="flex items-center gap-2">
                                <div className="w-24 h-2 bg-[#E5E7EB] rounded-full">
                                  <div className="w-1/2 h-full bg-[#E5C76A] rounded-full"></div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-[#718096] uppercase">Market VIX</span>
                              <div className="flex items-center gap-2">
                                <div className="w-24 h-2 bg-[#E5E7EB] rounded-full">
                                  <div className="w-3/4 h-full bg-[#E5C76A] rounded-full"></div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-[#718096] uppercase">Oil Price</span>
                              <div className="flex items-center gap-2">
                                <div className="w-24 h-2 bg-[#E5E7EB] rounded-full">
                                  <div className="w-1/3 h-full bg-[#E5C76A] rounded-full"></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {scenarioComputed && (
                            <div className="mb-6 p-4 bg-white rounded-xl border-2 border-[#E5C76A]">
                              <div className="text-center">
                                <div className="text-4xl font-black text-[#2D3748] mb-1">{scenarioScore}</div>
                                <div className="text-sm font-bold text-[#C85A54] mb-2">{scenarioDelta > 0 ? '+' : ''}{scenarioDelta} PTS</div>
                                <div className="text-xs text-[#718096] uppercase tracking-wider">Simulated Conviction Score</div>
                              </div>
                            </div>
                          )}

                          <div className="text-center text-xs text-[#718096] mb-4">
                            ADJUST SLIDERS TO STRESS-TEST YOUR THESIS VARIABLES
                          </div>

                          <button 
                            onClick={() => setScenarioComputed(true)}
                            className="w-full px-6 py-3 bg-[#E5C76A] text-[#2D3748] font-bold text-sm rounded-lg hover:bg-[#D4B659] transition-colors uppercase tracking-wider"
                          >
                            ▶ Compute Scenario Delta
                          </button>
                        </div>
                      </div>

                      {/* Conviction Components */}
                      <div className="bg-[#F8F9FB] border border-[#2E4D8E]/20 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                          <div className="w-2 h-2 bg-[#0D7C8C] rounded-full"></div>
                          <h3 className="text-sm font-bold text-[#2D3748] uppercase tracking-wider">Conviction Components</h3>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-bold text-[#2D3748] uppercase">Fundamental</span>
                              <span className="text-sm font-bold text-[#2D3748]">75.0%</span>
                            </div>
                            <div className="w-full h-3 bg-[#E5E7EB] rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-[#0D7C8C] to-[#0D7C8C] rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-bold text-[#2D3748] uppercase">Technical</span>
                              <span className="text-sm font-bold text-[#2D3748]">50.0%</span>
                            </div>
                            <div className="w-full h-3 bg-[#E5E7EB] rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] rounded-full" style={{ width: '50%' }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-bold text-[#2D3748] uppercase">Sentiment</span>
                              <span className="text-sm font-bold text-[#2D3748]">50.0%</span>
                            </div>
                            <div className="w-full h-3 bg-[#E5E7EB] rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-[#E5C76A] to-[#F0CA7A] rounded-full" style={{ width: '50%' }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-bold text-[#2D3748] uppercase">Macro</span>
                              <span className="text-sm font-bold text-[#2D3748]">52.5%</span>
                            </div>
                            <div className="w-full h-3 bg-[#E5E7EB] rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] rounded-full" style={{ width: '52.5%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

