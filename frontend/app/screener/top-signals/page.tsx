'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ScreenerSidebar from '@/components/screener/ScreenerSidebar'
import { IconStar, IconStarFilled, IconTrendingUp, IconTrendingDown, IconRefresh } from '@tabler/icons-react'

export default function TopSignalsPage() {
  const router = useRouter()
  const [selectedFilters, setSelectedFilters] = useState({
    buy: false,
    sell: false,
    watch: false
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSector, setSelectedSector] = useState('all')
  const [selectedConfidence, setSelectedConfidence] = useState('70')

  // Mock signals data matching the original
  const signals = [
    {
      id: 1,
      symbol: 'TECHM',
      name: 'Tech Mahindra',
      sector: 'IT',
      price: 1462.60,
      change: -15.40,
      changePercent: -1.04,
      signal: 'SELL',
      confidence: 86,
      pattern: 'Rising Wedge',
      entry: 1463,
      target: 1391,
      stop: 1559,
      inWatchlist: true
    },
    {
      id: 2,
      symbol: 'HINDUNILVR',
      name: 'Hindustan Unilever',
      sector: 'FMCG',
      price: 2368.80,
      change: 38.10,
      changePercent: 1.63,
      signal: 'BUY',
      confidence: 80,
      pattern: 'Inverse Head & Shoulders',
      entry: 2369,
      target: 2568,
      stop: 2306,
      inWatchlist: true
    },
    {
      id: 3,
      symbol: 'RELIANCE',
      name: 'Reliance Industries',
      sector: 'Energy',
      price: 2450.50,
      change: 12.30,
      changePercent: 0.50,
      signal: 'BUY',
      confidence: 78,
      pattern: 'Double Bottom',
      entry: 2451,
      target: 2651,
      stop: 2380,
      inWatchlist: false
    }
  ]

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: !prev[filter as keyof typeof prev]
    }))
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      <ScreenerSidebar />

      <div className="flex-1 ml-64">
        {/* Header */}
        <div className="bg-white px-8 py-6">
          <h1 className="text-2xl font-black text-[#1B2A4A] mb-2">Today's Top Signals</h1>
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#718096]">
              Pattern-based trade ideas across NIFTY-500 & Next-100. Each card is ready to act on — no chart-reading required.
            </p>
            <button className="px-6 py-2 bg-[#0D7C8C] text-white rounded text-sm font-bold hover:bg-[#0B6B7A] transition-all">
              Run Full Scan
            </button>
          </div>
        </div>

        <div className="px-8 py-6 space-y-6">
          {/* Statistics Row */}
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-xs text-[#718096] uppercase tracking-wide mb-1">PATTERNS DETECTED</div>
              <div className="text-4xl font-black text-[#1B2A4A] mb-1">71</div>
              <div className="text-xs text-[#718096]">last scan</div>
            </div>
            
            <div className="text-center">
              <div className="text-xs text-[#10B981] uppercase tracking-wide mb-1 font-bold">● BULLISH (BUY)</div>
              <div className="text-4xl font-black text-[#10B981] mb-1">1</div>
              <div className="text-xs text-[#718096]">high-conviction signals</div>
            </div>
            
            <div className="text-center">
              <div className="text-xs text-[#EF4444] uppercase tracking-wide mb-1 font-bold">● BEARISH (SELL)</div>
              <div className="text-4xl font-black text-[#EF4444] mb-1">1</div>
              <div className="text-xs text-[#718096]">high-conviction signals</div>
            </div>
            
            <div className="text-center">
              <div className="text-xs text-[#F59E0B] uppercase tracking-wide mb-1 font-bold">● FORMING (WATCH)</div>
              <div className="text-4xl font-black text-[#F59E0B] mb-1">69</div>
              <div className="text-xs text-[#718096]">approaching breakout</div>
            </div>
          </div>

          {/* Search and Filter Row */}
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="Search by stock, pattern, or sector..."
              className="flex-1 max-w-md px-4 py-2 border border-[#E2E8F0] rounded text-sm focus:outline-none focus:border-[#0D7C8C]"
            />
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => toggleFilter('buy')}
                className={`px-4 py-2 rounded text-sm font-bold transition-all ${
                  selectedFilters.buy 
                    ? 'bg-[#10B981] text-white' 
                    : 'bg-white border border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-white'
                }`}
              >
                ● BUY
              </button>
              <button 
                onClick={() => toggleFilter('sell')}
                className={`px-4 py-2 rounded text-sm font-bold transition-all ${
                  selectedFilters.sell 
                    ? 'bg-[#EF4444] text-white' 
                    : 'bg-white border border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white'
                }`}
              >
                ● SELL
              </button>
              <button 
                onClick={() => toggleFilter('watch')}
                className={`px-4 py-2 rounded text-sm font-bold transition-all ${
                  selectedFilters.watch 
                    ? 'bg-[#F59E0B] text-white' 
                    : 'bg-white border border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white'
                }`}
              >
                ● WATCH
              </button>
              
              <select className="px-4 py-2 bg-white border border-[#E2E8F0] rounded text-sm focus:outline-none focus:border-[#0D7C8C]">
                <option>All sectors</option>
                <option>IT</option>
                <option>Banking</option>
                <option>FMCG</option>
                <option>Energy</option>
              </select>
              
              <select className="px-4 py-2 bg-white border border-[#E2E8F0] rounded text-sm focus:outline-none focus:border-[#0D7C8C]">
                <option>70%+ (high)</option>
                <option>65%+ (recommended)</option>
                <option>80%+ (very high)</option>
                <option>85%+ (expert)</option>
              </select>
            </div>
          </div>

          {/* Signal Cards */}
          <div className="grid grid-cols-3 gap-6">
            {signals.map((signal) => (
              <div key={signal.id} className={`bg-white rounded-lg border-2 overflow-hidden ${
                signal.signal === 'BUY' ? 'border-[#10B981]' :
                signal.signal === 'SELL' ? 'border-[#EF4444]' :
                'border-[#F59E0B]'
              }`}>
                {/* Header */}
                <div className="p-4 border-b border-[#E2E8F0]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-[#1B2A4A]">{signal.symbol}</h3>
                      <button>
                        {signal.inWatchlist ? (
                          <IconStarFilled className="w-5 h-5 text-[#F59E0B]" />
                        ) : (
                          <IconStar className="w-5 h-5 text-[#718096]" />
                        )}
                      </button>
                    </div>
                    <div className={`px-3 py-1 rounded text-xs font-bold ${
                      signal.signal === 'BUY' ? 'bg-[#10B981] text-white' :
                      signal.signal === 'SELL' ? 'bg-[#EF4444] text-white' :
                      'bg-[#F59E0B] text-white'
                    }`}>
                      {signal.signal} · {signal.confidence}%
                    </div>
                  </div>
                  <div className="text-sm text-[#718096] mb-1">{signal.name}</div>
                  <div className="text-xs text-[#718096]">{signal.sector}</div>
                </div>

                {/* Price */}
                <div className="p-4 border-b border-[#E2E8F0]">
                  <div className="text-2xl font-black text-[#1B2A4A] mb-1">₹{signal.price.toFixed(2)}</div>
                  <div className={`text-sm font-bold flex items-center gap-1 ${
                    signal.change >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'
                  }`}>
                    {signal.change >= 0 ? <IconTrendingUp className="w-4 h-4" /> : <IconTrendingDown className="w-4 h-4" />}
                    {signal.change >= 0 ? '+' : ''}{signal.change.toFixed(2)} ({signal.changePercent.toFixed(2)}%)
                  </div>
                </div>

                {/* Pattern */}
                <div className="p-4 border-b border-[#E2E8F0]">
                  <div className="text-xs text-[#718096] mb-1">Pattern Detected</div>
                  <div className="text-sm font-bold text-[#2D3748]">{signal.pattern}</div>
                </div>

                {/* Trading Levels */}
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                    <div>
                      <div className="text-[#718096] mb-1">Entry</div>
                      <div className="font-bold text-[#2D3748]">₹{signal.entry}</div>
                    </div>
                    <div>
                      <div className="text-[#718096] mb-1">Target</div>
                      <div className="font-bold text-[#10B981]">₹{signal.target}</div>
                    </div>
                    <div>
                      <div className="text-[#718096] mb-1">Stop</div>
                      <div className="font-bold text-[#EF4444]">₹{signal.stop}</div>
                    </div>
                  </div>
                  
                  {/* Confidence Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[#718096]">Confidence</span>
                      <span className="text-xs font-bold text-[#2D3748]">{signal.confidence}%</span>
                    </div>
                    <div className="w-full bg-[#E2E8F0] rounded-full h-2">
                      <div 
                        className="bg-[#0D7C8C] h-2 rounded-full transition-all"
                        style={{ width: `${signal.confidence}%` }}
                      ></div>
                    </div>
                  </div>

                  <button 
                    onClick={() => router.push(`/stock/${signal.symbol}`)}
                    className="w-full px-4 py-2 bg-[#0D7C8C] text-white rounded text-sm font-bold hover:bg-[#0B6B7A] transition-all"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}