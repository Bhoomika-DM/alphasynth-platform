'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ScreenerSidebar from '@/components/screener/ScreenerSidebar'
import { IconArrowLeft, IconStar, IconStarFilled, IconTrendingUp, IconTrendingDown } from '@tabler/icons-react'

export default function ScreenerStockDetailPage() {
  const router = useRouter()
  const [selectedStock] = useState('HINDUNILVR') // Default stock for demo

  // Mock stock data
  const stockData = {
    symbol: 'HINDUNILVR',
    name: 'Hindustan Unilever',
    price: 2368.80,
    change: 38.10,
    changePercent: 1.63,
    signal: 'BUY',
    confidence: 80,
    pattern: 'Inverse Head & Shoulders',
    entry: 2368.80,
    target: 2568.30,
    stop: 2306.43,
    riskReward: '1:3.20',
    sector: 'FMCG',
    inWatchlist: true,
    analysis: 'Bullish reversal in play. Three valleys — middle one deepest — show buyers stepping in stronger each time. Breakout confirmed: institutional buying detected.',
    technicals: {
      rsi: 58.4,
      macd: 'Bullish',
      volume: 'Above Average',
      support: 2306.43,
      resistance: 2568.30
    }
  }

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'BUY':
        return 'bg-[#10B981] text-white'
      case 'SELL':
        return 'bg-[#EF4444] text-white'
      case 'HOLD':
        return 'bg-[#718096] text-white'
      default:
        return 'bg-[#718096] text-white'
    }
  }

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'
  }

  const viewFullStockDetail = () => {
    router.push(`/stock/${selectedStock}`)
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      <ScreenerSidebar />

      <div className="flex-1 ml-64">
        {/* Header */}
        <div className="bg-white border-b border-[#E2E8F0] px-8 py-6">
          <div className="flex items-center gap-4 mb-2">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-[#F8F9FB] rounded-lg transition-all"
            >
              <IconArrowLeft className="w-5 h-5 text-[#718096]" />
            </button>
            <h1 className="text-3xl font-black text-[#1B2A4A]">Stock Analysis</h1>
          </div>
          <p className="text-sm text-[#718096]">
            Detailed technical analysis and pattern recognition for {stockData.name}.
          </p>
        </div>

        <div className="p-8 space-y-6">
          {/* Stock Overview Card */}
          <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-black text-[#1B2A4A]">{stockData.symbol}</h2>
                    <button className="p-1 hover:bg-[#F8F9FB] rounded transition-all">
                      {stockData.inWatchlist ? (
                        <IconStarFilled className="w-6 h-6 text-[#F59E0B]" />
                      ) : (
                        <IconStar className="w-6 h-6 text-[#718096]" />
                      )}
                    </button>
                  </div>
                  <p className="text-lg text-[#718096] mb-2">{stockData.name}</p>
                  <span className="text-sm px-3 py-1 bg-[#F8F9FB] text-[#718096] rounded">{stockData.sector}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-4xl font-black text-[#1B2A4A] mb-2">₹{stockData.price.toFixed(2)}</div>
                <div className={`text-lg font-bold flex items-center justify-end gap-2 ${getChangeColor(stockData.change)}`}>
                  {stockData.change >= 0 ? <IconTrendingUp className="w-5 h-5" /> : <IconTrendingDown className="w-5 h-5" />}
                  {stockData.change >= 0 ? '+' : ''}{stockData.change.toFixed(2)} ({stockData.changePercent.toFixed(2)}%)
                </div>
              </div>
            </div>

            {/* Signal Badge */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`px-4 py-2 rounded-lg text-sm font-bold ${getSignalColor(stockData.signal)}`}>
                {stockData.signal} SIGNAL · {stockData.confidence}% CONFIDENCE
              </div>
            </div>

            {/* Pattern Analysis */}
            <div className="bg-[#F8F9FB] rounded-lg p-4 mb-6">
              <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">Pattern Verdict</h3>
              <div className="text-sm font-bold text-[#2D3748] mb-2">{stockData.pattern}</div>
              <p className="text-sm text-[#718096] leading-relaxed">{stockData.analysis}</p>
            </div>

            {/* Trading Levels */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-[#F8F9FB] rounded-lg">
                <div className="text-xs text-[#718096] mb-1">ENTRY</div>
                <div className="text-lg font-bold text-[#2D3748]">₹{stockData.entry.toFixed(2)}</div>
              </div>
              <div className="text-center p-4 bg-[#ECFDF5] rounded-lg">
                <div className="text-xs text-[#718096] mb-1">TARGET</div>
                <div className="text-lg font-bold text-[#10B981]">₹{stockData.target.toFixed(2)}</div>
              </div>
              <div className="text-center p-4 bg-[#FEF2F2] rounded-lg">
                <div className="text-xs text-[#718096] mb-1">STOP LOSS</div>
                <div className="text-lg font-bold text-[#EF4444]">₹{stockData.stop.toFixed(2)}</div>
              </div>
              <div className="text-center p-4 bg-[#F8F9FB] rounded-lg">
                <div className="text-xs text-[#718096] mb-1">RISK:REWARD</div>
                <div className="text-lg font-bold text-[#2D3748]">{stockData.riskReward}</div>
              </div>
            </div>

            {/* Confidence Meter */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[#2D3748]">Signal Confidence</span>
                <span className="text-sm font-bold text-[#2D3748]">{stockData.confidence}%</span>
              </div>
              <div className="w-full bg-[#E2E8F0] rounded-full h-3">
                <div 
                  className="bg-[#0D7C8C] h-3 rounded-full transition-all"
                  style={{ width: `${stockData.confidence}%` }}
                ></div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={viewFullStockDetail}
              className="w-full px-6 py-3 bg-[#0D7C8C] text-white rounded-lg text-sm font-bold hover:bg-[#0B6B7A] transition-all"
            >
              View Full Stock Details & Chart
            </button>
          </div>

          {/* Technical Indicators */}
          <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
            <h3 className="text-lg font-bold text-[#1B2A4A] mb-4">Technical Indicators</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-4 border border-[#E2E8F0] rounded-lg">
                <div className="text-xs text-[#718096] mb-1">RSI (14)</div>
                <div className="text-lg font-bold text-[#2D3748]">{stockData.technicals.rsi}</div>
                <div className="text-xs text-[#10B981]">Neutral</div>
              </div>
              
              <div className="text-center p-4 border border-[#E2E8F0] rounded-lg">
                <div className="text-xs text-[#718096] mb-1">MACD</div>
                <div className="text-lg font-bold text-[#10B981]">{stockData.technicals.macd}</div>
                <div className="text-xs text-[#10B981]">Positive</div>
              </div>
              
              <div className="text-center p-4 border border-[#E2E8F0] rounded-lg">
                <div className="text-xs text-[#718096] mb-1">VOLUME</div>
                <div className="text-lg font-bold text-[#F59E0B]">{stockData.technicals.volume}</div>
                <div className="text-xs text-[#F59E0B]">Strong</div>
              </div>
              
              <div className="text-center p-4 border border-[#E2E8F0] rounded-lg">
                <div className="text-xs text-[#718096] mb-1">SUPPORT</div>
                <div className="text-lg font-bold text-[#EF4444]">₹{stockData.technicals.support.toFixed(0)}</div>
                <div className="text-xs text-[#718096]">Key Level</div>
              </div>
              
              <div className="text-center p-4 border border-[#E2E8F0] rounded-lg">
                <div className="text-xs text-[#718096] mb-1">RESISTANCE</div>
                <div className="text-lg font-bold text-[#10B981]">₹{stockData.technicals.resistance.toFixed(0)}</div>
                <div className="text-xs text-[#718096]">Target Zone</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/screener/alerts')}
              className="p-4 bg-white border border-[#E2E8F0] rounded-lg text-left hover:border-[#0D7C8C] transition-all"
            >
              <div className="text-sm font-bold text-[#1B2A4A] mb-1">Set Price Alert</div>
              <div className="text-xs text-[#718096]">Get notified when price hits target levels</div>
            </button>
            
            <button
              onClick={() => router.push('/screener/watchlist')}
              className="p-4 bg-white border border-[#E2E8F0] rounded-lg text-left hover:border-[#0D7C8C] transition-all"
            >
              <div className="text-sm font-bold text-[#1B2A4A] mb-1">Add to Watchlist</div>
              <div className="text-xs text-[#718096]">Track this stock in your watchlist</div>
            </button>
            
            <button
              onClick={() => router.push('/screener/pattern-scanner')}
              className="p-4 bg-white border border-[#E2E8F0] rounded-lg text-left hover:border-[#0D7C8C] transition-all"
            >
              <div className="text-sm font-bold text-[#1B2A4A] mb-1">Similar Patterns</div>
              <div className="text-xs text-[#718096]">Find stocks with similar patterns</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}