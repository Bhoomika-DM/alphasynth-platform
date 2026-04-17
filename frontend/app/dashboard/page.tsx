'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { IconCircleCheck, IconX, IconTrendingUp, IconArrowUp, IconArrowDown, IconChevronLeft, IconChevronRight, IconChartBar, IconChartLine, IconChartArcs, IconFileTypePdf, IconDownload, IconFileTypeXml } from '@tabler/icons-react'
import ErrorBoundary from '@/components/ErrorBoundary'
import LightweightAreaChart from '@/components/charts/LightweightAreaChart'
import DashboardNavbar from '@/components/dashboard/DashboardNavbar'
import OnboardingModal from '@/components/onboarding/OnboardingModal'
import { useMultipleIndices, useBatchQuotes, useTopMovers } from '@/hooks/useYahooFinance'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('1D')
  const [niftyStartIndex, setNiftyStartIndex] = useState(0)
  const [corporateTab, setCorporateTab] = useState(0) // 0: Announcement, 1: Action, 2: Financial Results
  const [referenceRatesTab, setReferenceRatesTab] = useState(0) // 0: Currency Spot Rates, 1: Interest Rates, 2: Commodity Spot Rates
  const [currencySnapshotTab, setCurrencySnapshotTab] = useState(0) // 0: INR Contracts, 1: Cross Currency Contracts
  const [selectedIndexId, setSelectedIndexId] = useState(0) // Default to NIFTY 50 (index 0)
  const [marketSnapshotTab, setMarketSnapshotTab] = useState(0) // 0: Gainers, 1: Losers, 2: Most Active(Value), 3: Most Active(Volume), 4: ETFs(Volume)
  const [shouldAutoAnalyze, setShouldAutoAnalyze] = useState(false)
  const [isFirstLogin, setIsFirstLogin] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const message = searchParams.get('message')

  // Fetch real NSE data using Yahoo Finance
  const indexSymbols = ['NIFTY 50', 'NIFTY NEXT 50', 'NIFTY FIN SERVICE', 'NIFTY BANK', 'NIFTY 100', 'NIFTY MIDCAP 100']
  const { data: indicesData, loading: indicesLoading } = useMultipleIndices(indexSymbols, 30000)
  
  const stockSymbols = ['HDFCLIFE', 'HINDALCO', 'HINDUNILVR', 'RELIANCE', 'TCS', 'INFY', 'ICICIBANK', 'SBIN']
  const { data: stocksData, loading: stocksLoading } = useBatchQuotes(stockSymbols, 30000)
  
  const { data: gainersData, loading: gainersLoading } = useTopMovers('gainers', 60000)
  const { data: losersData, loading: losersLoading } = useTopMovers('losers', 60000)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      // Allow access without authentication - just set user if logged in
      setUser(user)
      
      if (user && message) {
        setShowMessage(true)
        setTimeout(() => setShowMessage(false), 5000)
      }

      // Check localStorage for onboarding flag (set after signup)
      const shouldShowOnboardingFromStorage = localStorage.getItem('showOnboarding')
      // Also check URL parameter (for backward compatibility)
      const shouldShowOnboardingFromUrl = searchParams.get('showOnboarding')
      
      // Check if user has EVER completed onboarding
      const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding')
      
      // Check if this is first login (user just completed onboarding)
      const isFirstLoginSession = localStorage.getItem('isFirstLoginSession')
      
      if ((shouldShowOnboardingFromStorage === 'true' || shouldShowOnboardingFromUrl === 'true') && !hasCompletedOnboarding) {
        // Clear the flag immediately
        localStorage.removeItem('showOnboarding')
        // Mark as first login session
        localStorage.setItem('isFirstLoginSession', 'true')
        // Open modal after a short delay
        setTimeout(() => {
          setShowOnboarding(true)
        }, 300)
      } else if (isFirstLoginSession === 'true' && hasCompletedOnboarding === 'true') {
        // Auto-trigger analyze on first login after onboarding
        setIsFirstLogin(true)
        localStorage.removeItem('isFirstLoginSession')
      }
      
      setLoading(false)
    }

    getUser()
  }, [message, supabase, searchParams])

  // Auto-trigger analyze after onboarding completes or on first login
  useEffect(() => {
    if (shouldAutoAnalyze || isFirstLogin) {
      // Delay to allow UI to settle
      const timer = setTimeout(() => {
        // Navigate to portfolio-results with default NIFTY 50 basket
        router.push('/portfolio-results?baskets=nifty50')
        setShouldAutoAnalyze(false)
        setIsFirstLogin(false)
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [shouldAutoAnalyze, isFirstLogin, router])

  const handleSignOut = async () => {
    // Clear onboarding flags so modal shows again on next login
    localStorage.removeItem('hasCompletedOnboarding')
    localStorage.removeItem('showOnboarding')
    
    await supabase.auth.signOut()
    router.push('/signin')
  }

  const handlePrevNifty = () => {
    setNiftyStartIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNextNifty = () => {
    setNiftyStartIndex((prev) => Math.min(niftyIndices.length - 5, prev + 1))
  }

  // Generate chart data based on selected period and selected index
  const getChartData = (period: string, indexId: number) => {
    const now = Math.floor(Date.now() / 1000)
    const data: { time: number; value: number }[] = []
    
    // Get base value from selected index
    const selectedIndex = niftyIndices[indexId]
    const baseValue = selectedIndex.value - selectedIndex.change // Calculate starting value
    
    switch (period) {
      case '1D': // Intraday - 1 minute intervals for last 6 hours
        const startTime1D = now - (6 * 60 * 60) // 6 hours ago
        for (let i = 0; i < 360; i++) { // 360 minutes = 6 hours
          const time = startTime1D + (i * 60)
          // Create wave patterns like real market data
          const wave1 = Math.sin(i / 30) * (baseValue * 0.006)
          const wave2 = Math.cos(i / 50) * (baseValue * 0.003)
          const noise = (Math.random() - 0.5) * (baseValue * 0.0015)
          const trend = i * (selectedIndex.change / 360) // Gradual trend to reach current value
          data.push({ time, value: baseValue + wave1 + wave2 + noise + trend })
        }
        break
        
      case '1M': // 1 Month - Daily data for 30 days
        for (let i = 30; i >= 0; i--) {
          const time = now - (i * 24 * 60 * 60)
          const monthBaseValue = baseValue * 0.96 // Start 4% lower
          const wave1 = Math.sin(i / 5) * (baseValue * 0.012)
          const wave2 = Math.cos(i / 8) * (baseValue * 0.006)
          const noise = (Math.random() - 0.5) * (baseValue * 0.004)
          const trend = (30 - i) * (baseValue * 0.04 / 30)
          data.push({ time, value: monthBaseValue + wave1 + wave2 + noise + trend })
        }
        break
        
      case '3M': // 3 Months - Daily data for 90 days
        for (let i = 90; i >= 0; i--) {
          const time = now - (i * 24 * 60 * 60)
          const quarterBaseValue = baseValue * 0.90 // Start 10% lower
          const wave1 = Math.sin(i / 10) * (baseValue * 0.02)
          const wave2 = Math.cos(i / 15) * (baseValue * 0.01)
          const noise = (Math.random() - 0.5) * (baseValue * 0.006)
          const trend = (90 - i) * (baseValue * 0.10 / 90)
          data.push({ time, value: quarterBaseValue + wave1 + wave2 + noise + trend })
        }
        break
        
      case '6M': // 6 Months - Daily data for 180 days
        for (let i = 180; i >= 0; i--) {
          const time = now - (i * 24 * 60 * 60)
          const halfYearBaseValue = baseValue * 0.85 // Start 15% lower
          const wave1 = Math.sin(i / 20) * (baseValue * 0.028)
          const wave2 = Math.cos(i / 25) * (baseValue * 0.014)
          const noise = (Math.random() - 0.5) * (baseValue * 0.008)
          const trend = (180 - i) * (baseValue * 0.15 / 180)
          data.push({ time, value: halfYearBaseValue + wave1 + wave2 + noise + trend })
        }
        break
        
      case '1Y': // 1 Year - Daily data for 365 days
        for (let i = 365; i >= 0; i--) {
          const time = now - (i * 24 * 60 * 60)
          const yearBaseValue = baseValue * 0.75 // Start 25% lower
          const wave1 = Math.sin(i / 30) * (baseValue * 0.04)
          const wave2 = Math.cos(i / 40) * (baseValue * 0.02)
          const noise = (Math.random() - 0.5) * (baseValue * 0.01)
          const trend = (365 - i) * (baseValue * 0.25 / 365)
          data.push({ time, value: yearBaseValue + wave1 + wave2 + noise + trend })
        }
        break
        
      default:
        return data
    }
    
    return data
  }

  if (loading || indicesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]">
        <div className="relative z-10 text-[#2D3748]">Loading real market data...</div>
      </div>
    )
  }

  // AlphaSynth Color Palette
  const colors = {
    sageGreen: '#0D7C8C',      // Teal for positive values
    sageDark: '#1B2A4A',       // Navy for headers
    gold: '#B8860B',           // Gold for accents
    terracotta: '#8C1A1A',     // Red for losses
    background: '#F8F9FB',     // Off-white background
    text: '#2D3748',           // Body text
    gray: '#718096',           // Muted text
  }

  // Transform real data from Yahoo Finance to match our UI format
  const niftyIndices = indicesData.map((indexData, idx) => {
    if (!indexData) {
      // Fallback data if API fails
      return {
        name: indexSymbols[idx],
        value: 0,
        change: 0,
        changePercent: 0,
        open: 0,
        high: 0,
        low: 0,
        previousClose: 0,
      }
    }
    return {
      name: indexData.name,
      value: indexData.value,
      change: indexData.change,
      changePercent: indexData.changePercent,
      open: indexData.open,
      high: indexData.high,
      low: indexData.low,
      previousClose: indexData.previousClose,
    }
  })

  // Transform stock ticker data
  const stockTickers = stocksData.map((stock, idx) => {
    if (!stock) {
      return {
        symbol: stockSymbols[idx],
        price: 0,
        change: 0,
        changePercent: 0,
      }
    }
    return {
      symbol: stock.symbol,
      price: stock.price,
      change: stock.change,
      changePercent: stock.changePercent,
    }
  })

  // Market snapshot data - use real gainers/losers
  const marketSnapshotGainers = gainersData.slice(0, 5).map(stock => ({
    symbol: stock.symbol,
    ltp: stock.price,
    change: stock.change,
    changePercent: stock.changePercent,
    volume: stock.volume ? (stock.volume / 100000) : 0, // Convert to lakhs (keep as number)
    value: stock.volume ? ((stock.price * stock.volume) / 10000000) : 0, // Estimate value in crores (keep as number)
  }))

  const marketSnapshotLosers = losersData.slice(0, 5).map(stock => ({
    symbol: stock.symbol,
    ltp: stock.price,
    change: stock.change,
    changePercent: stock.changePercent,
    volume: stock.volume ? (stock.volume / 100000) : 0, // Keep as number
    value: stock.volume ? ((stock.price * stock.volume) / 10000000) : 0, // Keep as number
  }))

  // Safety check - ensure we have data
  if (niftyIndices.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]">
        <div className="relative z-10 text-[#2D3748]">Unable to load market data. Please refresh.</div>
      </div>
    )
  }

  const visibleNiftyIndices = niftyIndices.slice(niftyStartIndex, niftyStartIndex + 5)

  const marketStats = {
    stockTraded: 3345,
    advances: 2506,
    declines: 741,
    unchanged: 98,
    week52High: 40,
    week52Low: 53,
    upperCircuit: 4,
    lowerCircuit: 8,
    registeredInvestors: '25,51,40,583',
    marketCap: '₹ 426.38 Tn ₹ 4.58',
    date: '06-Apr-2026'
  }

  const marketTurnover = [
    { product: 'Equity', volume: '513.69 Cr', value: '1,16,112.39', openInterest: '-', updatedAt: '16:00' },
    { product: 'Equity Derivatives', volume: '13.60 Cr', value: '2,62,828.16', openInterest: '2.02 Cr', updatedAt: '15:30' },
    { product: 'Currency Derivatives', volume: '5.30 L', value: '4,989.03', openInterest: '19.67 L', updatedAt: '17:00' },
    { product: 'Interest Rate Derivatives', volume: '66', value: '1.26', openInterest: '39.63 K', updatedAt: '16:11' },
    { product: 'Commodity Derivatives', volume: '32.45 K', value: '211.08', openInterest: '4.75 K', updatedAt: '23:33' },
    { product: 'Debt', volume: '-', value: '30,250.47', openInterest: '-', updatedAt: '17:16' },
    { product: 'Mutual Fund', volume: '-', value: '4,009.82', openInterest: '-', updatedAt: '15:30' },
  ]

  // Market Snapshot Data for Different Tabs - Keep mock data for tabs we don't have real data for (numbers not strings)
  const marketSnapshotMostActiveValue = [
    { symbol: 'HDFCBANK', ltp: 817.50, change: 45.50, changePercent: 5.89, volume: 702.70, value: 5690.92 },
    { symbol: 'ICICIBANK', ltp: 1309.10, change: 63.60, changePercent: 5.11, volume: 251.49, value: 3286.98 },
    { symbol: 'SBIN', ltp: 1065.00, change: 34.60, changePercent: 3.36, volume: 285.34, value: 3048.94 },
    { symbol: 'LT', ltp: 4010.00, change: 286.70, changePercent: 7.70, volume: 73.68, value: 2943.63 },
    { symbol: 'RELIANCE', ltp: 1349.40, change: 44.80, changePercent: 3.43, volume: 218.18, value: 2930.14 },
  ]

  const marketSnapshotMostActiveVolume = [
    { symbol: 'HDFCBANK', ltp: 817.50, change: 45.50, changePercent: 5.89, volume: 702.70, value: 5690.92 },
    { symbol: 'ETERNAL', ltp: 244.40, change: 12.43, changePercent: 5.36, volume: 618.02, value: 1508.64 },
    { symbol: 'ONGC', ltp: 285.85, change: -0.80, changePercent: -0.28, volume: 420.71, value: 1182.32 },
    { symbol: 'TATASTEEL', ltp: 204.25, change: 6.12, changePercent: 3.09, volume: 370.18, value: 757.14 },
    { symbol: 'KOTAKBANK', ltp: 379.50, change: 16.55, changePercent: 4.56, volume: 301.62, value: 1146.03 },
  ]

  const marketSnapshotETFs = [
    { symbol: 'NIFTYBEES', ltp: 272.00, change: 10.53, changePercent: 4.03, volume: 202.03, value: 546.78 },
    { symbol: 'SETFNIF50', ltp: 257.39, change: 9.96, changePercent: 4.03, volume: 30.88, value: 79.19 },
    { symbol: 'NIFTYIETF', ltp: 270.57, change: 10.12, changePercent: 3.89, volume: 25.24, value: 68.09 },
    { symbol: 'BSLNIFTY', ltp: 27.90, change: 1.00, changePercent: 3.72, volume: 9.16, value: 2.55 },
    { symbol: 'HDFCNIFTY', ltp: 269.67, change: 10.53, changePercent: 4.06, volume: 5.81, value: 15.61 },
  ]

  // Get current market snapshot data based on selected tab
  const getCurrentMarketSnapshotData = () => {
    switch (marketSnapshotTab) {
      case 0: return marketSnapshotGainers
      case 1: return marketSnapshotLosers
      case 2: return marketSnapshotMostActiveValue
      case 3: return marketSnapshotMostActiveVolume
      case 4: return marketSnapshotETFs
      default: return marketSnapshotGainers
    }
  }

  const currentMarketSnapshot = getCurrentMarketSnapshotData()

  const selectedIndex = niftyIndices[selectedIndexId]
  const chartData = getChartData(selectedPeriod, selectedIndexId)
  
  // Calculate if the overall change is positive (profit) or negative (loss)
  const isPositiveChange = selectedIndex.changePercent > 0

  const periods = ['1D', '1M', '3M', '6M', '1Y']

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#F8F9FB]">
      
      {/* Onboarding Modal */}
      {showOnboarding && (
        <OnboardingModal onClose={() => {
          setShowOnboarding(false)
          localStorage.setItem('hasCompletedOnboarding', 'true')
          // Auto-trigger analyze after onboarding completes
          setShouldAutoAnalyze(true)
        }} />
      )}
      
      {/* Dashboard Navbar with Quick Navigate */}
      <DashboardNavbar user={user} />
      
      {/* Success Message Toast */}
      {showMessage && message && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in">
          <div className="bg-[#0D7C8C] rounded-lg shadow-lg p-4 flex items-center gap-3 border border-[#0D7C8C]/20">
            <IconCircleCheck className="w-5 h-5 text-white" stroke={1.5} />
            <p className="text-white font-semibold">{message}</p>
            <button onClick={() => setShowMessage(false)} className="text-white/70 hover:text-white">
              <IconX className="w-5 h-5" stroke={1.5} />
            </button>
          </div>
        </div>
      )}
      
      {/* Top Ticker - Stocks */}
      <div className="bg-white border-b border-[#E2E8F0] py-2 overflow-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div className="flex items-center gap-4 animate-scroll">
          {[...stockTickers, ...stockTickers].map((stock, idx) => (
            <a
              key={`stock-${idx}`}
              href={`https://www.nseindia.com/get-quotes/equity?symbol=${stock.symbol}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 whitespace-nowrap hover:bg-[#EEF2F7] px-3 py-1 rounded transition-colors cursor-pointer"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <div className="w-0.5 h-6 bg-[#1B2A4A]"></div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#1B2A4A]">{stock.symbol}</span>
                <span className="text-sm font-semibold text-[#2D3748]">{stock.price.toFixed(2)}</span>
                <span className={`text-sm font-semibold ${stock.changePercent >= 0 ? 'text-[#1A6B3A]' : 'text-[#8C1A1A]'}`}>
                  {stock.changePercent >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* NIFTY Indices Ticker */}
      <div className="bg-white border-b border-[#E2E8F0] py-3 relative z-10" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div className="px-6 flex items-center gap-4">
          {/* Left Arrow */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handlePrevNifty()
            }}
            disabled={niftyStartIndex === 0}
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all z-20 ${
              niftyStartIndex === 0
                ? 'bg-[#E2E8F0] text-[#A0AEC0] cursor-not-allowed'
                : 'bg-[#0D7C8C] text-white hover:bg-[#0A6B7A] cursor-pointer active:scale-95'
            }`}
            type="button"
            aria-label="Previous NIFTY indices"
          >
            <IconChevronLeft className="w-5 h-5" stroke={2.5} />
          </button>

          {/* NIFTY Indices Grid */}
          <div className="flex-1 grid grid-cols-5 gap-4">
            {visibleNiftyIndices.map((index, idx) => {
              const actualIndexId = niftyStartIndex + idx
              const isSelected = actualIndexId === selectedIndexId
              return (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setSelectedIndexId(actualIndexId)
                  }}
                  className={`text-center p-2 rounded transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-[#E0F4F6] border-2 border-[#0D7C8C] shadow-md' 
                      : 'bg-transparent hover:bg-[#F8F9FB] border-2 border-transparent'
                  }`}
                  type="button"
                  aria-label={`Select ${index.name}`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <div className={`text-xs font-bold uppercase mb-1 ${
                    isSelected ? 'text-[#0D7C8C]' : 'text-[#718096]'
                  }`}>
                    {index.name}
                  </div>
                  <div className="text-lg font-black text-[#1B2A4A] mb-0.5">
                    {index.value.toLocaleString()}
                  </div>
                  <div className={`text-sm font-semibold ${index.changePercent >= 0 ? 'text-[#1A6B3A]' : 'text-[#8C1A1A]'}`}>
                    {index.changePercent >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleNextNifty()
            }}
            disabled={niftyStartIndex >= niftyIndices.length - 5}
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all z-20 ${
              niftyStartIndex >= niftyIndices.length - 5
                ? 'bg-[#E2E8F0] text-[#A0AEC0] cursor-not-allowed'
                : 'bg-[#0D7C8C] text-white hover:bg-[#0A6B7A] cursor-pointer active:scale-95'
            }`}
            type="button"
            aria-label="Next NIFTY indices"
          >
            <IconChevronRight className="w-5 h-5" stroke={2.5} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 space-y-6">
        
        {/* Row 1: Selected NIFTY Index Chart + Market Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {/* Selected NIFTY Index with Compact NSE Layout */}
          <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 shadow-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {/* Header Row: Title + Updated Time */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#1B2A4A] uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {selectedIndex.name}
                </h3>
                <IconTrendingUp className="w-4 h-4 text-[#1A6B3A]" stroke={1.5} />
              </div>
              <div className="text-xs text-[#718096]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Updated: {new Date().toLocaleString('en-IN', { 
                  day: '2-digit', 
                  month: 'short', 
                  year: 'numeric', 
                  hour: '2-digit', 
                  minute: '2-digit',
                  timeZone: 'Asia/Kolkata'
                })} IST
                <span className="ml-2 inline-flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#1A6B3A] rounded-full animate-pulse"></span>
                  <span className="text-[#1A6B3A] font-semibold">LIVE</span>
                </span>
              </div>
            </div>

            {/* Price Row: Large Price + OHLC Data + Time Buttons */}
            <div className="flex items-center justify-between mb-3 gap-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {/* Left: Price and Change */}
              <div className="flex-shrink-0">
                <div className="text-2xl font-black text-[#1B2A4A] leading-none mb-1">
                  {selectedIndex.value.toLocaleString('en-IN', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                </div>
                <div className={`text-sm font-semibold ${selectedIndex.changePercent >= 0 ? 'text-[#1A6B3A]' : 'text-[#8C1A1A]'}`}>
                  {selectedIndex.changePercent >= 0 ? '+' : ''}{selectedIndex.change.toFixed(2)} ({selectedIndex.changePercent.toFixed(2)}%)
                </div>
              </div>

              {/* Middle: OHLC Data */}
              <div className="flex items-center gap-6 flex-shrink-0" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <div className="w-2 h-2 rounded-full bg-[#2E4D8E]"></div>
                    <div className="text-xs text-[#718096]">Open</div>
                  </div>
                  <div className="text-sm text-[#2E4D8E] font-semibold">
                    {selectedIndex.open ? selectedIndex.open.toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '-'}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <div className="w-2 h-2 rounded-full bg-[#1A6B3A]"></div>
                    <div className="text-xs text-[#718096]">High</div>
                  </div>
                  <div className="text-sm text-[#1A6B3A] font-semibold">
                    {selectedIndex.high ? selectedIndex.high.toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '-'}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <div className="w-2 h-2 rounded-full bg-[#8C1A1A]"></div>
                    <div className="text-xs text-[#718096]">Low</div>
                  </div>
                  <div className="text-sm text-[#8C1A1A] font-semibold">
                    {selectedIndex.low ? selectedIndex.low.toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '-'}
                  </div>
                </div>
              </div>

              {/* Right: Time Period Buttons */}
              <div className="flex gap-1.5 flex-shrink-0" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {periods.map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      selectedPeriod === period
                        ? 'bg-[#0D7C8C] text-white'
                        : 'bg-[#F8F9FB] text-[#718096] hover:bg-[#E2E8F0]'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Chart - Full Width */}
            <LightweightAreaChart data={chartData} height={320} isPositive={isPositiveChange} />
          </div>

          {/* Market Statistics */}
          <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 shadow-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black text-[#1B2A4A]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Market Statistics</h3>
              <div className="text-sm text-[#718096]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>As on {marketStats.date} 16:00 IST</div>
            </div>
            
            {/* Top Row: 4 Main Stats with Colored Left Borders - Now Clickable */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              <a 
                href="https://www.nseindia.com/market-data/stocks-traded" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#F8F9FB] rounded-lg p-3 border-l-4 border-[#718096] hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="text-xs text-[#718096] mb-1">Stock Traded</div>
                <div className="text-2xl font-black text-[#718096]">{marketStats.stockTraded}</div>
              </a>
              <a 
                href="https://www.nseindia.com/market-data/advance-decline-market-breadth" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#E8F5E9] rounded-lg p-3 border-l-4 border-[#1A6B3A] hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="text-xs text-[#718096] mb-1">Advances</div>
                <div className="text-2xl font-black text-[#1A6B3A]">{marketStats.advances}</div>
              </a>
              <a 
                href="https://www.nseindia.com/market-data/advance-decline-market-breadth" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#FEF2F2] rounded-lg p-3 border-l-4 border-[#8C1A1A] hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="text-xs text-[#718096] mb-1">Declines</div>
                <div className="text-2xl font-black text-[#8C1A1A]">{marketStats.declines}</div>
              </a>
              <a 
                href="https://www.nseindia.com/market-data/advance-decline-market-breadth" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#F8F9FB] rounded-lg p-3 border-l-4 border-[#718096] hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="text-xs text-[#718096] mb-1">Unchanged</div>
                <div className="text-2xl font-black text-[#718096]">{marketStats.unchanged}</div>
              </a>
            </div>

            {/* Middle Row: 52 Week Stats + Logo + Circuit Stats - Now Clickable */}
            <div className="bg-[#F8F9FB] rounded-lg p-4 mb-4">
              <div className="grid grid-cols-5 gap-4 items-center">
                <a 
                  href="https://www.nseindia.com/market-data/52-week-high-equity-market" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:bg-white rounded-lg p-2 transition-all cursor-pointer"
                >
                  <div className="text-xs text-[#718096] mb-1">No. of Stocks at</div>
                  <div className="text-sm font-bold text-[#2D3748] mb-1">52 Week High</div>
                  <div className="flex items-center gap-1">
                    <IconArrowUp className="w-4 h-4 text-[#16a34a]" stroke={2} />
                    <span className="text-2xl font-black text-[#16a34a]">{marketStats.week52High}</span>
                  </div>
                </a>
                
                <a 
                  href="https://www.nseindia.com/market-data/52-week-low-equity-market" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:bg-white rounded-lg p-2 transition-all cursor-pointer"
                >
                  <div className="text-xs text-[#718096] mb-1">No. of Stocks at</div>
                  <div className="text-sm font-bold text-[#2D3748] mb-1">52 Week Low</div>
                  <div className="flex items-center gap-1">
                    <IconArrowDown className="w-4 h-4 text-[#dc2626]" stroke={2} />
                    <span className="text-2xl font-black text-[#dc2626]">{marketStats.week52Low}</span>
                  </div>
                </a>

                {/* Center Logo */}
                <div className="flex items-center justify-center">
                  <div className="relative w-24 h-24 flex items-center justify-center bg-white rounded-xl shadow-md border-2 border-[#0D7C8C]/30 p-3">
                    <img src="/logo.jpeg" alt="AlphaSynth" className="w-full h-full object-contain" />
                  </div>
                </div>

                <a 
                  href="https://www.nseindia.com/market-data/upper-band-hitters" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:bg-white rounded-lg p-2 transition-all cursor-pointer"
                >
                  <div className="text-xs text-[#718096] mb-1">No. of Stocks in</div>
                  <div className="text-sm font-bold text-[#2D3748] mb-1">Upper Circuit</div>
                  <div className="text-2xl font-black text-[#16a34a]">{marketStats.upperCircuit}</div>
                </a>

                <a 
                  href="https://www.nseindia.com/market-data/lower-band-hitters" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:bg-white rounded-lg p-2 transition-all cursor-pointer"
                >
                  <div className="text-xs text-[#718096] mb-1">No. of Stocks in</div>
                  <div className="text-sm font-bold text-[#2D3748] mb-1">Lower Circuit</div>
                  <div className="text-2xl font-black text-[#dc2626]">{marketStats.lowerCircuit}</div>
                </a>
              </div>
            </div>

            {/* Bottom Row: Registered Investors + Market Cap - Now Clickable */}
            <div className="grid grid-cols-2 gap-3">
              <a 
                href="https://www.nseindia.com/registered-investors" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#F8F9FB] rounded-lg p-4 border-l-4 border-[#E5C76A] hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="text-sm text-[#4A5568] font-bold mb-2">Registered Investors</div>
                <div className="text-2xl font-black text-[#4A5568]">{marketStats.registeredInvestors}</div>
              </a>
              <div className="bg-[#F8F9FB] rounded-lg p-4 border-l-4 border-[#E5C76A]">
                <div className="text-sm text-[#4A5568] font-bold mb-2">Market Capitalization</div>
                <div className="text-lg font-black text-[#4A5568]">{marketStats.marketCap}</div>
                <div className="text-xs text-[#718096] mt-1">{marketStats.date}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Market Turnover + Market Snapshot */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Market Turnover */}
          <div className="bg-white rounded-lg border border-[#5A8A4E]/20 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#5A8A4E]/20">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-black text-[#2D3748]">Market Turnover</h3>
                <span className="text-sm text-[#718096]">As on {marketStats.date}</span>
              </div>
              <a 
                href="https://www.nseindia.com/market-data/live-market-indices" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-md text-sm font-semibold text-[#2D3748] hover:bg-[#F8F9FB] transition-colors flex items-center gap-2 cursor-pointer relative z-10"
              >
                View More
                <span className="text-[#E5C76A]">▶</span>
              </a>
            </div>
            
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#1B2A4A]" style={{ color: '#FFFFFF' }}>
                    <th className="text-left py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>PRODUCTS</th>
                    <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>
                      <div style={{ color: '#FFFFFF' }}>VOLUME</div>
                      <div className="text-xs font-normal" style={{ color: '#FFFFFF' }}>(SHARES/CONTRACTS)</div>
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>
                      <div style={{ color: '#FFFFFF' }}>VALUE</div>
                      <div className="text-xs font-normal" style={{ color: '#FFFFFF' }}>(₹ CRORES)</div>
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>
                      <div style={{ color: '#FFFFFF' }}>OPEN INTEREST</div>
                      <div className="text-xs font-normal" style={{ color: '#FFFFFF' }}>(CONTRACTS)</div>
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>UPDATED AT</th>
                  </tr>
                </thead>
                <tbody>
                  {marketTurnover.map((item, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'} hover:bg-[#F8F9FB] transition-colors`}>
                      <td className="py-3 px-4 text-sm text-[#2D3748]">{item.product}</td>
                      <td className="py-3 px-4 text-sm text-[#2D3748] text-right">{item.volume}</td>
                      <td className="py-3 px-4 text-sm text-[#2D3748] text-right">{item.value}</td>
                      <td className="py-3 px-4 text-sm text-[#2D3748] text-right">{item.openInterest}</td>
                      <td className="py-3 px-4 text-sm text-[#718096] text-right">{item.updatedAt}</td>
                    </tr>
                  ))}
                  {/* Total Row */}
                  <tr className="bg-[#F8F9FB] border-t-2 border-[#5A8A4E]/30">
                    <td className="py-3 px-4 text-sm font-black text-[#2D3748]">Total</td>
                    <td className="py-3 px-4 text-sm font-black text-[#2D3748] text-right">145.34 Cr</td>
                    <td className="py-3 px-4 text-sm font-black text-[#2D3748] text-right">92,659.03</td>
                    <td className="py-3 px-4 text-sm font-black text-[#2D3748] text-right">2.63 Cr</td>
                    <td className="py-3 px-4 text-sm text-right"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Market Snapshot */}
          <div className="bg-white rounded-lg border border-[#5A8A4E]/20 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#5A8A4E]/20">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-black text-[#2D3748]">Market Snapshot</h3>
                <span className="text-sm text-[#718096]">As on {marketStats.date} 16:00 IST</span>
              </div>
              <a 
                href="https://www.nseindia.com/market-data/live-equity-market" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-md text-sm font-semibold text-[#2D3748] hover:bg-[#F8F9FB] transition-colors flex items-center gap-2 cursor-pointer relative z-10"
              >
                View More
                <span className="text-[#E5C76A]">▶</span>
              </a>
            </div>

            {/* Tabs */}
            <div className="flex gap-0 border-b-2 border-[#E5E7EB] px-4">
              {['Gainers', 'Losers', 'Most Active(Value)', 'Most Active(Volume)', 'ETFs(Volume)'].map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setMarketSnapshotTab(index)}
                  className={`px-4 py-3 text-sm font-bold transition-all relative ${
                    marketSnapshotTab === index
                      ? 'text-[#5A8A4E]'
                      : 'text-[#718096] hover:text-[#2D3748]'
                  }`}
                >
                  {tab}
                  {marketSnapshotTab === index && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E5C76A]"></div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#1B2A4A]" style={{ color: '#FFFFFF' }}>
                    <th className="text-left py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>SYMBOL</th>
                    <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>LTP</th>
                    <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>CHNG</th>
                    <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>%CHNG</th>
                    <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>
                      <div style={{ color: '#FFFFFF' }}>VOLUME</div>
                      <div className="text-xs font-normal" style={{ color: '#FFFFFF' }}>(Lakhs)</div>
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>
                      <div style={{ color: '#FFFFFF' }}>VALUE</div>
                      <div className="text-xs font-normal" style={{ color: '#FFFFFF' }}>(₹ Crores)</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentMarketSnapshot.map((stock, index) => {
                    const isPositive = stock.change >= 0
                    return (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'} hover:bg-[#F8F9FB] transition-colors`}>
                        <td className="py-3 px-4 text-sm font-semibold text-[#5A8A4E]">{stock.symbol}</td>
                        <td className="py-3 px-4 text-sm text-[#2D3748] text-right font-semibold">{stock.ltp.toFixed(2)}</td>
                        <td className={`py-3 px-4 text-sm text-right font-semibold ${isPositive ? 'text-[#0D7C8C]' : 'text-[#C85A54]'}`}>
                          {isPositive ? '+' : ''}{stock.change.toFixed(2)}
                        </td>
                        <td className={`py-3 px-4 text-sm text-right font-semibold ${isPositive ? 'text-[#0D7C8C]' : 'text-[#C85A54]'}`}>
                          {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-sm text-[#2D3748] text-right">{stock.volume.toFixed(2)}</td>
                        <td className="py-3 px-4 text-sm text-[#2D3748] text-right">{stock.value.toFixed(2)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer Note */}
            <div className="px-4 py-3 bg-[#F9FAFB] border-t border-[#E5E7EB]">
              <p className="text-xs text-[#718096] italic">
                *Data shown above represents only Nifty 50 stocks.
              </p>
            </div>
          </div>
        </div>

        {/* Row 3: Most Active Contracts - Three Tables Side by Side */}
        <div className="bg-white rounded-lg border border-[#5A8A4E]/20 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#5A8A4E]/20">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-black text-[#2D3748]">Most Active Contracts</h3>
              <span className="text-sm text-[#718096]">As on 07-Apr-2026 11:41 IST</span>
            </div>
            <a 
              href="https://www.nseindia.com/market-data/live-derivatives-market" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-md text-sm font-semibold text-[#2D3748] hover:bg-[#F8F9FB] transition-colors flex items-center gap-2 cursor-pointer relative z-10"
            >
              View More
              <span className="text-[#E5C76A]">▶</span>
            </a>
          </div>

          {/* Three Tables Side by Side with Scrollbars */}
          <div className="grid grid-cols-3 gap-0">
            
            {/* Most Active Calls */}
            <div className="border-r border-[#5A8A4E]/20">
              <div className="bg-[#F8F9FB] px-4 py-2 border-b border-[#5A8A4E]/20">
                <h4 className="text-sm font-bold text-[#2D3748]">Most Active Calls</h4>
              </div>
              <div className="max-h-[400px] overflow-y-auto table-scroll">
                <table className="w-full">
                  <thead className="sticky top-0 z-10">
                    <tr className="bg-[#1B2A4A]" style={{ color: '#FFFFFF' }}>
                      <th className="text-left py-2 px-3 text-xs font-bold uppercase" style={{ color: '#FFFFFF' }}>CONTRACT</th>
                      <th className="text-right py-2 px-3 text-xs font-bold uppercase" style={{ color: '#FFFFFF' }}>LTP</th>
                      <th className="text-right py-2 px-3 text-xs font-bold uppercase" style={{ color: '#FFFFFF' }}>CHNG</th>
                      <th className="text-right py-2 px-3 text-xs font-bold uppercase" style={{ color: '#FFFFFF' }}>%CHNG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { contract: 'NIFTY 07APR26 23000.00 CE', ltp: 30.70, chng: -138.20, chngPercent: -81.82 },
                      { contract: 'NIFTY 07APR26 22900.00 CE', ltp: 62.00, chng: -160.70, chngPercent: -72.16 },
                      { contract: 'NIFTY 07APR26 23200.00 CE', ltp: 6.00, chng: -79.90, chngPercent: -93.02 },
                      { contract: 'NIFTY 07APR26 23100.00 CE', ltp: 13.75, chng: -108.95, chngPercent: -88.79 },
                      { contract: 'NIFTY 07APR26 22950.00 CE', ltp: 43.95, chng: -150.65, chngPercent: -77.42 },
                      { contract: 'NIFTY 07APR26 23300.00 CE', ltp: 2.50, chng: -52.30, chngPercent: -95.44 },
                      { contract: 'NIFTY 07APR26 22850.00 CE', ltp: 78.40, chng: -145.80, chngPercent: -65.03 },
                      { contract: 'NIFTY 07APR26 23050.00 CE', ltp: 21.15, chng: -122.45, chngPercent: -85.27 },
                      { contract: 'NIFTY 07APR26 22800.00 CE', ltp: 95.60, chng: -132.90, chngPercent: -58.16 },
                      { contract: 'NIFTY 07APR26 23150.00 CE', ltp: 9.25, chng: -95.75, chngPercent: -91.19 },
                      { contract: 'NIFTY 07APR26 22750.00 CE', ltp: 115.30, chng: -118.20, chngPercent: -50.62 },
                      { contract: 'NIFTY 07APR26 23250.00 CE', ltp: 4.10, chng: -68.40, chngPercent: -94.35 },
                      { contract: 'NIFTY 07APR26 22700.00 CE', ltp: 138.75, chng: -102.55, chngPercent: -42.50 },
                      { contract: 'NIFTY 07APR26 23400.00 CE', ltp: 1.20, chng: -38.90, chngPercent: -97.01 },
                      { contract: 'NIFTY 07APR26 22650.00 CE', ltp: 165.20, chng: -88.30, chngPercent: -34.84 },
                    ].map((item, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}>
                        <td className="py-2 px-3 text-xs text-[#4A5568]">{item.contract}</td>
                        <td className="py-2 px-3 text-xs text-[#2D3748] text-right">{item.ltp.toFixed(2)}</td>
                        <td className="py-2 px-3 text-xs text-[#C85A54] text-right">{item.chng.toFixed(2)}</td>
                        <td className="py-2 px-3 text-xs text-[#C85A54] text-right">{item.chngPercent.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Most Active Puts */}
            <div className="border-r border-[#5A8A4E]/20">
              <div className="bg-[#F8F9FB] px-4 py-2 border-b border-[#5A8A4E]/20">
                <h4 className="text-sm font-bold text-[#2D3748]">Most Active Puts</h4>
              </div>
              <div className="max-h-[400px] overflow-y-auto table-scroll">
                <table className="w-full">
                  <thead className="sticky top-0 z-10">
                    <tr className="bg-[#1B2A4A]" style={{ color: '#FFFFFF' }}>
                      <th className="text-left py-2 px-3 text-xs font-bold uppercase" style={{ color: '#FFFFFF' }}>CONTRACT</th>
                      <th className="text-right py-2 px-3 text-xs font-bold uppercase" style={{ color: '#FFFFFF' }}>LTP</th>
                      <th className="text-right py-2 px-3 text-xs font-bold uppercase" style={{ color: '#FFFFFF' }}>CHNG</th>
                      <th className="text-right py-2 px-3 text-xs font-bold uppercase" style={{ color: '#FFFFFF' }}>%CHNG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { contract: 'NIFTY 07APR26 22800.00 PE', ltp: 57.10, chng: -56.50, chngPercent: -49.74 },
                      { contract: 'NIFTY 07APR26 22700.00 PE', ltp: 26.75, chng: -59.70, chngPercent: -69.06 },
                      { contract: 'NIFTY 07APR26 22500.00 PE', ltp: 5.50, chng: -44.40, chngPercent: -88.98 },
                      { contract: 'NIFTY 07APR26 22900.00 PE', ltp: 106.10, chng: -43.70, chngPercent: -29.17 },
                      { contract: 'NIFTY 07APR26 22600.00 PE', ltp: 11.85, chng: -54.15, chngPercent: -82.05 },
                      { contract: 'NIFTY 07APR26 22400.00 PE', ltp: 2.30, chng: -32.80, chngPercent: -93.45 },
                      { contract: 'NIFTY 07APR26 22950.00 PE', ltp: 142.35, chng: -35.25, chngPercent: -19.85 },
                      { contract: 'NIFTY 07APR26 22550.00 PE', ltp: 7.90, chng: -48.60, chngPercent: -86.01 },
                      { contract: 'NIFTY 07APR26 23000.00 PE', ltp: 185.70, chng: -28.40, chngPercent: -13.27 },
                      { contract: 'NIFTY 07APR26 22300.00 PE', ltp: 0.95, chng: -24.15, chngPercent: -96.22 },
                      { contract: 'NIFTY 07APR26 22750.00 PE', ltp: 38.25, chng: -62.85, chngPercent: -62.16 },
                      { contract: 'NIFTY 07APR26 23100.00 PE', ltp: 235.40, chng: -22.10, chngPercent: -8.58 },
                      { contract: 'NIFTY 07APR26 22650.00 PE', ltp: 18.60, chng: -56.90, chngPercent: -75.36 },
                      { contract: 'NIFTY 07APR26 22200.00 PE', ltp: 0.40, chng: -18.70, chngPercent: -97.91 },
                      { contract: 'NIFTY 07APR26 22850.00 PE', ltp: 82.45, chng: -51.25, chngPercent: -38.34 },
                    ].map((item, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}>
                        <td className="py-2 px-3 text-xs text-[#4A5568]">{item.contract}</td>
                        <td className="py-2 px-3 text-xs text-[#2D3748] text-right">{item.ltp.toFixed(2)}</td>
                        <td className="py-2 px-3 text-xs text-[#C85A54] text-right">{item.chng.toFixed(2)}</td>
                        <td className="py-2 px-3 text-xs text-[#C85A54] text-right">{item.chngPercent.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Most Active Contracts by OI */}
            <div>
              <div className="bg-[#F8F9FB] px-4 py-2 border-b border-[#5A8A4E]/20">
                <h4 className="text-sm font-bold text-[#2D3748]">Most Active Contracts by OI</h4>
              </div>
              <div className="max-h-[400px] overflow-y-auto table-scroll">
                <table className="w-full">
                  <thead className="sticky top-0 z-10">
                    <tr className="bg-[#1B2A4A]" style={{ color: '#FFFFFF' }}>
                      <th className="text-left py-2 px-3 text-xs font-bold uppercase" style={{ color: '#FFFFFF' }}>CONTRACT</th>
                      <th className="text-right py-2 px-3 text-xs font-bold uppercase" style={{ color: '#FFFFFF' }}>LTP</th>
                      <th className="text-right py-2 px-3 text-xs font-bold uppercase" style={{ color: '#FFFFFF' }}>CHNG</th>
                      <th className="text-right py-2 px-3 text-xs font-bold uppercase" style={{ color: '#FFFFFF' }}>%CHNG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { contract: 'NIFTY 07APR26 23000.00 CE', ltp: 30.70, chng: -138.20, chngPercent: -81.82 },
                      { contract: 'NIFTY APR FUT', ltp: 22920.00, chng: -137.00, chngPercent: -0.59 },
                      { contract: 'NIFTY 07APR26 22500.00 PE', ltp: 5.50, chng: -44.40, chngPercent: -88.98 },
                      { contract: 'NIFTY 07APR26 22800.00 PE', ltp: 57.10, chng: -56.50, chngPercent: -49.74 },
                      { contract: 'NIFTY 07APR26 23500.00 CE', ltp: 0.85, chng: -26.05, chngPercent: -96.84 },
                      { contract: 'NIFTY 07APR26 22900.00 CE', ltp: 62.00, chng: -160.70, chngPercent: -72.16 },
                      { contract: 'NIFTY 07APR26 22700.00 PE', ltp: 26.75, chng: -59.70, chngPercent: -69.06 },
                      { contract: 'NIFTY MAY FUT', ltp: 23045.50, chng: -142.30, chngPercent: -0.61 },
                      { contract: 'NIFTY 07APR26 23100.00 CE', ltp: 13.75, chng: -108.95, chngPercent: -88.79 },
                      { contract: 'NIFTY 07APR26 22600.00 PE', ltp: 11.85, chng: -54.15, chngPercent: -82.05 },
                      { contract: 'BANKNIFTY APR FUT', ltp: 52485.00, chng: -1055.50, chngPercent: -1.97 },
                      { contract: 'NIFTY 07APR26 22950.00 CE', ltp: 43.95, chng: -150.65, chngPercent: -77.42 },
                      { contract: 'NIFTY 07APR26 22900.00 PE', ltp: 106.10, chng: -43.70, chngPercent: -29.17 },
                      { contract: 'NIFTY 07APR26 23200.00 CE', ltp: 6.00, chng: -79.90, chngPercent: -93.02 },
                      { contract: 'FINNIFTY APR FUT', ltp: 24485.75, chng: -578.25, chngPercent: -2.31 },
                    ].map((item, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}>
                        <td className="py-2 px-3 text-xs text-[#4A5568]">{item.contract}</td>
                        <td className="py-2 px-3 text-xs text-[#2D3748] text-right">{item.ltp.toFixed(2)}</td>
                        <td className="py-2 px-3 text-xs text-[#C85A54] text-right">{item.chng.toFixed(2)}</td>
                        <td className="py-2 px-3 text-xs text-[#C85A54] text-right">{item.chngPercent.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

        {/* Row 4: Corporate Info + IPO Tracker */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Corporate Info */}
          <div className="bg-white rounded-lg border border-[#5A8A4E]/20 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#5A8A4E]/20">
              <h3 className="text-xl font-black text-[#2D3748]">Corporate Info</h3>
              <a 
                href="https://www.nseindia.com/companies-listing/corporate-filings-announcements" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-md text-sm font-semibold text-[#2D3748] hover:bg-[#F8F9FB] transition-colors flex items-center gap-2 cursor-pointer relative z-10"
              >
                View More
                <span className="text-[#E5C76A]">▶</span>
              </a>
            </div>

            {/* Tabs */}
            <div className="flex gap-0 border-b-2 border-[#E5E7EB] px-4">
              {['Corporate Announcement', 'Corporate Action', 'Financial Results'].map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setCorporateTab(index)}
                  className={`px-4 py-3 text-sm font-bold transition-all relative ${
                    corporateTab === index
                      ? 'text-[#5A8A4E]'
                      : 'text-[#718096] hover:text-[#2D3748]'
                  }`}
                >
                  {tab}
                  {corporateTab === index && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E5C76A]"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
              {/* Corporate Announcement Tab */}
              {corporateTab === 0 && (
                <>
                  {[
                    { company: 'City Union Bank Limited (CUB)', subject: 'Certificate under SEBI (Depositories and Participants) Regul...', date: '07-Apr-2026 11:11:18' },
                    { company: 'CSL Finance Limited (CSLFINANCE)', subject: 'Certificate under SEBI (Depositories and Participants) Regul...', date: '07-Apr-2026 11:10:10' },
                    { company: 'Avantel Limited (AVANTEL)', subject: 'Disclosure under SEBI Takeover Regulations', date: '07-Apr-2026 11:08:53' },
                    { company: 'Suba Hotels Limited (SUBAHOTELS)', subject: 'Certificate under SEBI (Depositories and Participants) Regul...', date: '07-Apr-2026 11:07:42' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start justify-between gap-4 pb-4 border-b border-[#E5E7EB] last:border-0">
                      <div className="flex-1">
                        <div className="text-sm font-bold text-[#2D3748] mb-1">{item.company}</div>
                        <div className="text-xs text-[#718096] mb-1">
                          <span className="font-semibold">Subject:</span> {item.subject}
                        </div>
                        <div className="text-xs text-[#718096]">
                          <span className="font-semibold">Broadcast Date:</span> {item.date}
                        </div>
                      </div>
                      <button className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-white border border-[#E5E7EB] rounded hover:bg-[#F8F9FB] transition-colors">
                        <IconFileTypePdf className="w-6 h-6 text-[#dc2626]" stroke={1.5} />
                      </button>
                    </div>
                  ))}
                </>
              )}

              {/* Corporate Action Tab */}
              {corporateTab === 1 && (
                <>
                  {[
                    { company: 'Falcon Technoprojects India Limited (FALCONTECH)', purpose: 'RIGHTS 4:1 @ PREMIUM RS 0/-', series: 'SM', exDate: '18-Mar-2026', recordDate: '18-Mar-2026' },
                    { company: 'Sunrest Lifescience Limited (SUNREST)', purpose: 'RIGHTS 1:1 @ PREMIUM RS 25/-', series: 'SM', exDate: '23-Mar-2026', recordDate: '23-Mar-2026' },
                    { company: 'Varun Beverages Limited (VBL)', purpose: 'Dividend - Re 0.50 Per Share', series: 'EQ', exDate: '08-Apr-2026', recordDate: '08-Apr-2026' },
                  ].map((item, index) => (
                    <div key={index} className="pb-4 border-b border-[#E5E7EB] last:border-0 border-l-4 border-[#E5C76A] pl-3">
                      <div className="text-sm font-bold text-[#2D3748] mb-2">{item.company}</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><span className="font-semibold text-[#718096]">Purpose:</span> <span className="text-[#2D3748]">{item.purpose}</span></div>
                        <div><span className="font-semibold text-[#718096]">Series:</span> <span className="text-[#2D3748]">{item.series}</span></div>
                        <div><span className="font-semibold text-[#718096]">Ex-Date:</span> <span className="text-[#2D3748]">{item.exDate}</span></div>
                        <div><span className="font-semibold text-[#718096]">Record Date:</span> <span className="text-[#2D3748]">{item.recordDate}</span></div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Financial Results Tab */}
              {corporateTab === 2 && (
                <>
                  {[
                    { company: 'Mold-Tek Technologies Limited (MOLDTECH)', audited: 'Un-Audited', cumulative: 'Consolidated', broadcastDate: '31-Mar-2026 18:32:15' },
                    { company: 'Indus Fila Limited (INDUSFILA)', audited: 'Un-Audited', cumulative: 'Standalone', broadcastDate: '31-Mar-2026 11:34:04' },
                    { company: 'ARSS Infrastructure Projects Limited (ARSSINFRA)', audited: 'Un-Audited', cumulative: 'Standalone', broadcastDate: '28-Mar-2026 11:40:14' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start justify-between gap-4 pb-4 border-b border-[#E5E7EB] last:border-0 border-l-4 border-[#0D7C8C] pl-3">
                      <div className="flex-1">
                        <div className="text-sm font-bold text-[#2D3748] mb-2">{item.company}</div>
                        <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                          <div><span className="font-semibold text-[#718096]">Audited/Unaudited:</span> <span className="text-[#2D3748]">{item.audited}</span></div>
                          <div><span className="font-semibold text-[#718096]">Cumulative/Non-Cumulative:</span> <span className="text-[#2D3748]">{item.cumulative}</span></div>
                        </div>
                        <div className="text-xs"><span className="font-semibold text-[#718096]">Broadcast Date:</span> <span className="text-[#2D3748]">{item.broadcastDate}</span></div>
                      </div>
                      <button className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-white border border-[#E5E7EB] rounded hover:bg-[#F8F9FB] transition-colors">
                        <IconFileTypeXml className="w-6 h-6 text-[#16a34a]" stroke={1.5} />
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* IPO Tracker */}
          <div className="bg-white rounded-lg border border-[#5A8A4E]/20 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#5A8A4E]/20">
              <h3 className="text-xl font-black text-[#2D3748]">IPO Tracker</h3>
              <a 
                href="https://www.nseindia.com/products/content/equities/ipos/homepage_ipo.htm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-md text-sm font-semibold text-[#2D3748] hover:bg-[#F8F9FB] transition-colors flex items-center gap-2 cursor-pointer relative z-10"
              >
                View More
                <span className="text-[#E5C76A]">▶</span>
              </a>
            </div>

            {/* IPO Stats Grid */}
            <div className="p-4 grid grid-cols-2 gap-4">
              {/* IPOs in the Year */}
              <a 
                href="https://www.nseindia.com/products/content/equities/ipos/homepage_ipo.htm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-[#E8EAF6] to-[#C5CAE9] rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-lg transition-all duration-200 relative z-10"
              >
                <div>
                  <div className="text-3xl font-black text-[#4A5568] mb-1">219</div>
                  <div className="text-xs text-[#718096]">IPOs in the Year</div>
                </div>
                <IconChartBar className="w-12 h-12 text-[#5B4B8A] opacity-60" stroke={1.5} />
              </a>

              {/* IPOs on NSE SME Segment */}
              <a 
                href="https://www.nseindia.com/products/content/equities/ipos/homepage_ipo.htm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-[#E8EAF6] to-[#C5CAE9] rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-lg transition-all duration-200 relative z-10"
              >
                <div>
                  <div className="text-3xl font-black text-[#4A5568] mb-1">109</div>
                  <div className="text-xs text-[#718096]">IPOs on NSE SME Segment</div>
                </div>
                <IconChartBar className="w-12 h-12 text-[#5B4B8A] opacity-60" stroke={1.5} />
              </a>

              {/* IPOs in Gain w.r.t. Issue Price */}
              <a 
                href="https://www.nseindia.com/products/content/equities/ipos/homepage_ipo.htm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-lg transition-all duration-200 relative z-10"
              >
                <div>
                  <div className="text-3xl font-black text-[#0D7C8C] mb-1">84</div>
                  <div className="text-xs text-[#718096]">IPOs in Gain w.r.t. Issue Price</div>
                </div>
                <IconChartLine className="w-12 h-12 text-[#0D7C8C] opacity-60" stroke={1.5} />
              </a>

              {/* IPOs in Loss w.r.t. Issue Price */}
              <a 
                href="https://www.nseindia.com/products/content/equities/ipos/homepage_ipo.htm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-[#FFEBEE] to-[#FFCDD2] rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-lg transition-all duration-200 relative z-10"
              >
                <div>
                  <div className="text-3xl font-black text-[#C85A54] mb-1">135</div>
                  <div className="text-xs text-[#718096]">IPOs in Loss w.r.t. Issue Price</div>
                </div>
                <IconChartLine className="w-12 h-12 text-[#C85A54] opacity-60" stroke={1.5} />
              </a>

              {/* IPOs in Gain on Listing Date */}
              <a 
                href="https://www.nseindia.com/products/content/equities/ipos/homepage_ipo.htm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-lg transition-all duration-200 relative z-10"
              >
                <div>
                  <div className="text-3xl font-black text-[#0D7C8C] mb-1">137</div>
                  <div className="text-xs text-[#718096]">IPOs in Gain on Listing Date</div>
                </div>
                <IconChartLine className="w-12 h-12 text-[#0D7C8C] opacity-60" stroke={1.5} />
              </a>

              {/* IPOs in Loss on Listing Date */}
              <a 
                href="https://www.nseindia.com/products/content/equities/ipos/homepage_ipo.htm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-[#FFEBEE] to-[#FFCDD2] rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-lg transition-all duration-200 relative z-10"
              >
                <div>
                  <div className="text-3xl font-black text-[#C85A54] mb-1">82</div>
                  <div className="text-xs text-[#718096]">IPOs in Loss on Listing Date</div>
                </div>
                <IconChartLine className="w-12 h-12 text-[#C85A54] opacity-60" stroke={1.5} />
              </a>
            </div>
          </div>

        </div>

        {/* Row 5: Reference Rates + Currency Snapshot */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Reference Rates */}
          <div className="bg-white rounded-lg border border-[#5A8A4E]/20 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#5A8A4E]/20">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-black text-[#2D3748]">Reference Rates</h3>
                <span className="text-sm text-[#718096]">As on 06-Apr-2026 13:00:00 IST</span>
              </div>
              <a 
                href="https://www.nseindia.com/all-reports" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-md text-sm font-semibold text-[#2D3748] hover:bg-[#F8F9FB] transition-colors flex items-center gap-2 cursor-pointer relative z-10"
              >
                View More
                <span className="text-[#E5C76A]">▶</span>
              </a>
            </div>

            {/* Tabs */}
            <div className="flex gap-0 border-b-2 border-[#E5E7EB] px-4">
              {['Currency Spot Rates', 'Interest Rates', 'Commodity Spot Rates'].map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setReferenceRatesTab(index)}
                  className={`px-4 py-3 text-sm font-bold transition-all relative ${
                    referenceRatesTab === index
                      ? 'text-[#5A8A4E]'
                      : 'text-[#718096] hover:text-[#2D3748]'
                  }`}
                >
                  {tab}
                  {referenceRatesTab === index && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E5C76A]"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content with Scrollbar */}
            <div className="max-h-[400px] overflow-y-auto table-scroll">
              {/* Currency Spot Rates Tab */}
              {referenceRatesTab === 0 && (
                <table className="w-full">
                  <thead className="sticky top-0 z-10">
                    <tr className="bg-[#1B2A4A]" style={{ color: '#FFFFFF' }}>
                      <th className="text-left py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>CURRENCY</th>
                      <th className="text-center py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>UNIT</th>
                      <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>TODAY'S VALUE</th>
                      <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>PREVIOUS DAY VALUE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { currency: 'USD', flag: '🇺🇸', unit: '$ 1', today: '₹ 93.0591', previous: '₹ 93.2088' },
                      { currency: 'YEN', flag: '🇯🇵', unit: '¥ 100', today: '₹ 58.3200', previous: '₹ 58.4900' },
                      { currency: 'GBP', flag: '🇬🇧', unit: '£ 1', today: '₹ 122.9919', previous: '₹ 123.1854' },
                      { currency: 'EURO', flag: '🇪🇺', unit: '€ 1', today: '₹ 107.2588', previous: '₹ 107.4828' },
                      { currency: 'AUD', flag: '🇦🇺', unit: '$ 1', today: '₹ 61.4523', previous: '₹ 61.6234' },
                      { currency: 'CAD', flag: '🇨🇦', unit: '$ 1', today: '₹ 68.7845', previous: '₹ 68.9123' },
                      { currency: 'CHF', flag: '🇨🇭', unit: 'Fr 1', today: '₹ 105.3421', previous: '₹ 105.5678' },
                      { currency: 'CNY', flag: '🇨🇳', unit: '¥ 1', today: '₹ 12.8934', previous: '₹ 12.9456' },
                      { currency: 'SGD', flag: '🇸🇬', unit: '$ 1', today: '₹ 69.2341', previous: '₹ 69.3789' },
                      { currency: 'HKD', flag: '🇭🇰', unit: '$ 1', today: '₹ 11.9234', previous: '₹ 11.9678' },
                    ].map((item, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'} hover:bg-[#F8F9FB] transition-colors`}>
                        <td className="py-3 px-4 text-sm text-[#2D3748] flex items-center gap-2">
                          <span className="text-lg">{item.flag}</span>
                          <span className="font-semibold">{item.currency}</span>
                        </td>
                        <td className="py-3 px-4 text-sm text-[#2D3748] text-center">{item.unit}</td>
                        <td className="py-3 px-4 text-sm text-[#2D3748] text-right font-semibold">{item.today}</td>
                        <td className="py-3 px-4 text-sm text-[#718096] text-right">{item.previous}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Interest Rates Tab */}
              {referenceRatesTab === 1 && (
                <table className="w-full">
                  <thead className="sticky top-0 z-10">
                    <tr className="bg-[#1B2A4A]" style={{ color: '#FFFFFF' }}>
                      <th className="text-left py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>UNDERLYING</th>
                      <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>PRICE</th>
                      <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>YIELD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { underlying: '633GS2035', price: '96.1000', yield: '6.9147' },
                      { underlying: '648GS2035', price: '100.3500', yield: '6.4301' },
                      { underlying: '668GS2040', price: '93.6700', yield: '7.4049' },
                      { underlying: '679GS2034', price: '98.2500', yield: '7.0674' },
                      { underlying: '727GS2026', price: '100.0300', yield: '7.2078' },
                      { underlying: '723GS2039', price: '99.4000', yield: '7.3019' },
                      { underlying: '601GS2030', price: '97.5000', yield: '6.6872' },
                      { underlying: '718GS2037', price: '99.8500', yield: '7.1976' },
                      { underlying: '664GS2035', price: '95.2300', yield: '7.5234' },
                      { underlying: '691GS2031', price: '98.7800', yield: '6.8945' },
                      { underlying: '702GS2028', price: '99.1200', yield: '7.0123' },
                      { underlying: '735GS2042', price: '94.5600', yield: '7.6789' },
                    ].map((item, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'} hover:bg-[#F8F9FB] transition-colors`}>
                        <td className="py-3 px-4 text-sm text-[#4A5568] font-semibold">{item.underlying}</td>
                        <td className="py-3 px-4 text-sm text-[#2D3748] text-right font-semibold">{item.price}</td>
                        <td className="py-3 px-4 text-sm text-[#2D3748] text-right font-semibold">{item.yield}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Commodity Spot Rates Tab */}
              {referenceRatesTab === 2 && (
                <table className="w-full">
                  <thead className="sticky top-0 z-10">
                    <tr className="bg-[#1B2A4A]" style={{ color: '#FFFFFF' }}>
                      <th className="text-left py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>SYMBOL</th>
                      <th className="text-center py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>UNIT</th>
                      <th className="text-center py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>UPDATED DATE</th>
                      <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>SPOT PRICE (IN ₹)<br/>POLLED AT 12:30 HRS</th>
                      <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>SPOT PRICE (IN ₹)<br/>POLLED AT 16:30 HRS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { symbol: 'ELECMBL', unit: '1 MWh', date: '06-APR-2026', price1230: '-', price1630: '2,547.40' },
                      { symbol: 'GOLD', unit: '10 Grams', date: '06-APR-2026', price1230: '1,47,600.00', price1630: '1,48,136.00' },
                      { symbol: 'GOLD1G', unit: '1 Grams', date: '06-APR-2026', price1230: '14,819.00', price1630: '14,873.00' },
                      { symbol: 'GOLD10G', unit: '10 Grams', date: '06-APR-2026', price1230: '1,48,193.00', price1630: '1,48,732.00' },
                      { symbol: 'GOLDGUINEA', unit: '8 Grams', date: '06-APR-2026', price1230: '1,18,555.00', price1630: '1,18,985.00' },
                      { symbol: 'GOLDM', unit: '10 Grams', date: '06-APR-2026', price1230: '1,47,600.00', price1630: '1,48,136.00' },
                      { symbol: 'SILVER', unit: '1 Kg', date: '06-APR-2026', price1230: '2,31,399.00', price1630: '2,33,565.00' },
                      { symbol: 'SILVERM', unit: '1 Kg', date: '06-APR-2026', price1230: '2,31,399.00', price1630: '2,33,565.00' },
                      { symbol: 'SILVERMIC', unit: '1 Kg', date: '06-APR-2026', price1230: '2,31,399.00', price1630: '2,33,565.00' },
                      { symbol: 'CRUDEOIL', unit: '1 Barrel', date: '07-APR-2026', price1230: '10,461.00', price1630: '-' },
                      { symbol: 'NATURALGAS', unit: '1 MMBtu', date: '07-APR-2026', price1230: '245.30', price1630: '246.80' },
                      { symbol: 'COPPER', unit: '1 Kg', date: '06-APR-2026', price1230: '845.60', price1630: '847.20' },
                    ].map((item, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'} hover:bg-[#F8F9FB] transition-colors`}>
                        <td className="py-3 px-4 text-sm text-[#4A5568] font-semibold">{item.symbol}</td>
                        <td className="py-3 px-4 text-sm text-[#2D3748] text-center">{item.unit}</td>
                        <td className="py-3 px-4 text-sm text-[#2D3748] text-center">{item.date}</td>
                        <td className="py-3 px-4 text-sm text-[#2D3748] text-right font-semibold">{item.price1230}</td>
                        <td className="py-3 px-4 text-sm text-[#2D3748] text-right font-semibold">{item.price1630}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Currency Snapshot */}
          <div className="bg-white rounded-lg border border-[#5A8A4E]/20 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#5A8A4E]/20">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-black text-[#2D3748]">Currency Snapshot</h3>
                <span className="text-sm text-[#718096]">As on 07-Apr-2026 12:13 IST</span>
              </div>
              <a 
                href="https://www.nseindia.com/market-data/currency-derivatives" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-md text-sm font-semibold text-[#2D3748] hover:bg-[#F8F9FB] transition-colors flex items-center gap-2 cursor-pointer relative z-10"
              >
                View More
                <span className="text-[#E5C76A]">▶</span>
              </a>
            </div>

            {/* Tabs */}
            <div className="flex gap-0 border-b-2 border-[#E5E7EB] px-4">
              {['INR Contracts', 'Cross Currency Contracts'].map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setCurrencySnapshotTab(index)}
                  className={`px-4 py-3 text-sm font-bold transition-all relative ${
                    currencySnapshotTab === index
                      ? 'text-[#5A8A4E]'
                      : 'text-[#718096] hover:text-[#2D3748]'
                  }`}
                >
                  {tab}
                  {currencySnapshotTab === index && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E5C76A]"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content with Scrollbar */}
            <div className="max-h-[400px] overflow-y-auto table-scroll">
              {/* INR Contracts Tab */}
              {currencySnapshotTab === 0 && (
                <table className="w-full">
                  <thead className="sticky top-0 z-10">
                    <tr className="bg-[#1B2A4A]" style={{ color: '#FFFFFF' }}>
                      <th className="text-left py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>CONTRACTS</th>
                      <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>LTP</th>
                      <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>%CHNG</th>
                      <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>
                        <div style={{ color: '#FFFFFF' }}>VOLUME</div>
                        <div className="text-xs font-normal" style={{ color: '#FFFFFF' }}>(Contracts)</div>
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>
                        <div style={{ color: '#FFFFFF' }}>TURNOVER</div>
                        <div className="text-xs font-normal" style={{ color: '#FFFFFF' }}>(₹ Crores)</div>
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>OPEN INTEREST</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { contract: 'USDINR 26MAY26 FUT', ltp: '93.9600', change: 0.1226, volume: '1,12,478', turnover: '1,112.88', oi: '1,73,434' },
                      { contract: 'USDINR 26APR26 FUT', ltp: '93.4500', change: 0.0635, volume: '1,05,308', turnover: '984.10', oi: '18,95,557' },
                      { contract: 'EURINR 28APR26 FUT', ltp: '108.2800', change: -0.1153, volume: '1,850', turnover: '20.03', oi: '27,413' },
                      { contract: 'USDINR 28APR26 92 PE', ltp: '0.0300', change: -14.2857, volume: '1,445', turnover: '0.00', oi: '1,954' },
                      { contract: 'GBPINR 28APR26 FUT', ltp: '122.5400', change: 0.0823, volume: '845', turnover: '10.35', oi: '12,567' },
                      { contract: 'JPYINR 28APR26 FUT', ltp: '58.1200', change: -0.0456, volume: '623', turnover: '3.62', oi: '8,934' },
                      { contract: 'USDINR 28MAY26 93 CE', ltp: '0.5600', change: 12.3456, volume: '2,345', turnover: '1.31', oi: '5,678' },
                      { contract: 'USDINR 28MAY26 94 CE', ltp: '0.2800', change: 8.7654, volume: '1,234', turnover: '0.35', oi: '3,456' },
                      { contract: 'EURINR 28MAY26 FUT', ltp: '108.7500', change: 0.1567, volume: '1,567', turnover: '17.04', oi: '23,456' },
                      { contract: 'GBPINR 28MAY26 FUT', ltp: '123.1200', change: 0.1234, volume: '734', turnover: '9.04', oi: '11,234' },
                    ].map((item, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'} hover:bg-[#F8F9FB] transition-colors`}>
                        <td className="py-3 px-4 text-sm text-[#4A5568] font-semibold">{item.contract}</td>
                        <td className="py-3 px-4 text-sm text-[#2D3748] text-right font-semibold">{item.ltp}</td>
                        <td className={`py-3 px-4 text-sm text-right font-semibold ${item.change >= 0 ? 'text-[#0D7C8C]' : 'text-[#C85A54]'}`}>
                          {item.change >= 0 ? '+' : ''}{item.change.toFixed(4)}
                        </td>
                        <td className="py-3 px-4 text-sm text-[#2D3748] text-right">{item.volume}</td>
                        <td className="py-3 px-4 text-sm text-[#2D3748] text-right">{item.turnover}</td>
                        <td className="py-3 px-4 text-sm text-[#2D3748] text-right">{item.oi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Cross Currency Contracts Tab */}
              {currencySnapshotTab === 1 && (
                <table className="w-full">
                  <thead className="sticky top-0 z-10">
                    <tr className="bg-[#1B2A4A]" style={{ color: '#FFFFFF' }}>
                      <th className="text-left py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>CONTRACTS</th>
                      <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>LTP</th>
                      <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>%CHNG</th>
                      <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>
                        <div style={{ color: '#FFFFFF' }}>VOLUME</div>
                        <div className="text-xs font-normal" style={{ color: '#FFFFFF' }}>(Contracts)</div>
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>
                        <div style={{ color: '#FFFFFF' }}>TURNOVER</div>
                        <div className="text-xs font-normal" style={{ color: '#FFFFFF' }}>(₹ Crores)</div>
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-bold uppercase" style={{ color: '#FFFFFF' }}>OPEN INTEREST</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { contract: 'USDJPY 28APR26 FUT', ltp: '-', change: 0, volume: '-', turnover: '-', oi: '-' },
                      { contract: 'EURUSD 28APR26 FUT', ltp: '1.1561', change: 0.0234, volume: '-', turnover: '-', oi: '505' },
                      { contract: 'GBPUSD 28APR26 FUT', ltp: '1.3246', change: 0.0156, volume: '-', turnover: '-', oi: '10' },
                      { contract: 'AUDUSD 28APR26 FUT', ltp: '0.6623', change: -0.0089, volume: '-', turnover: '-', oi: '234' },
                      { contract: 'USDCAD 28APR26 FUT', ltp: '1.3512', change: 0.0067, volume: '-', turnover: '-', oi: '156' },
                      { contract: 'USDCHF 28APR26 FUT', ltp: '0.8834', change: -0.0045, volume: '-', turnover: '-', oi: '89' },
                      { contract: 'NZDUSD 28APR26 FUT', ltp: '0.6145', change: 0.0123, volume: '-', turnover: '-', oi: '67' },
                      { contract: 'EURGBP 28APR26 FUT', ltp: '0.8723', change: -0.0034, volume: '-', turnover: '-', oi: '45' },
                      { contract: 'EURJPY 28APR26 FUT', ltp: '186.45', change: 0.0567, volume: '-', turnover: '-', oi: '123' },
                      { contract: 'GBPJPY 28APR26 FUT', ltp: '213.78', change: 0.0789, volume: '-', turnover: '-', oi: '78' },
                    ].map((item, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'} hover:bg-[#F8F9FB] transition-colors`}>
                        <td className="py-3 px-4 text-sm text-[#4A5568] font-semibold">{item.contract}</td>
                        <td className="py-3 px-4 text-sm text-[#2D3748] text-right font-semibold">{item.ltp}</td>
                        <td className={`py-3 px-4 text-sm text-right font-semibold ${item.change >= 0 ? 'text-[#0D7C8C]' : 'text-[#C85A54]'}`}>
                          {item.ltp === '-' ? '-' : (item.change >= 0 ? '+' : '') + item.change.toFixed(4)}
                        </td>
                        <td className="py-3 px-4 text-sm text-[#2D3748] text-right">{item.volume}</td>
                        <td className="py-3 px-4 text-sm text-[#2D3748] text-right">{item.turnover}</td>
                        <td className="py-3 px-4 text-sm text-[#2D3748] text-right">{item.oi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
    </ErrorBoundary>
  )
}







