'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ScreenerSidebar from '@/components/screener/ScreenerSidebar'
import { IconRefresh, IconBell, IconTrendingUp, IconTrendingDown, IconClock } from '@tabler/icons-react'

export default function AlertsPage() {
  const router = useRouter()
  const [confidenceFilter, setConfidenceFilter] = useState('65')

  // Mock alerts data based on the screenshot
  const alerts = [
    {
      id: 1,
      symbol: 'TECHM',
      name: 'Tech Mahindra',
      type: 'SELL SIGNAL',
      confidence: 86,
      description: 'Price is grinding higher but momentum is fading — a tired uptrend. OBV (falling) confirms the divergence.',
      entry: 1462.60,
      target: 1391.36,
      stop: 1559.29,
      riskReward: '1 : 0.74',
      timestamp: '2 hours ago',
      status: 'active',
      color: 'red'
    },
    {
      id: 2,
      symbol: 'AXISBANK',
      name: 'Axis Bank',
      type: 'FORMING',
      confidence: 84,
      description: 'Bullish reversal in play. Three valleys — middle one deepest — show buyers stepping in stronger each time. Breakout confirmed: institutional buying detected.',
      entry: 1379.60,
      target: 1467.21,
      stop: 1236.76,
      riskReward: '1 : 0.47',
      timestamp: '4 hours ago',
      status: 'forming',
      color: 'orange'
    },
    {
      id: 3,
      symbol: 'HINDUNILVR',
      name: 'Hindustan Unilever',
      type: 'BUY SIGNAL',
      confidence: 80,
      description: 'Inverse Head & Shoulders pattern completed with strong volume confirmation. Institutional buying detected at support levels.',
      entry: 2368.80,
      target: 2568.30,
      stop: 2306.43,
      riskReward: '1 : 3.20',
      timestamp: '6 hours ago',
      status: 'active',
      color: 'green'
    },
    {
      id: 4,
      symbol: 'RELIANCE',
      name: 'Reliance Industries',
      type: 'BUY SIGNAL',
      confidence: 78,
      description: 'Double bottom pattern with bullish divergence on RSI. Strong support at current levels with increasing volume.',
      entry: 2450.50,
      target: 2650.75,
      stop: 2380.20,
      riskReward: '1 : 2.85',
      timestamp: '1 day ago',
      status: 'active',
      color: 'green'
    }
  ]

  const filteredAlerts = alerts.filter(alert => alert.confidence >= parseInt(confidenceFilter))

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'BUY SIGNAL':
        return <IconTrendingUp className="w-5 h-5 text-[#10B981]" />
      case 'SELL SIGNAL':
        return <IconTrendingDown className="w-5 h-5 text-[#EF4444]" />
      case 'FORMING':
        return <IconClock className="w-5 h-5 text-[#F59E0B]" />
      default:
        return <IconBell className="w-5 h-5 text-[#718096]" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'BUY SIGNAL':
        return 'border-l-[#10B981] bg-[#10B981]/5'
      case 'SELL SIGNAL':
        return 'border-l-[#EF4444] bg-[#EF4444]/5'
      case 'FORMING':
        return 'border-l-[#F59E0B] bg-[#F59E0B]/5'
      default:
        return 'border-l-[#718096] bg-[#718096]/5'
    }
  }

  const getSignalBadgeColor = (type: string) => {
    switch (type) {
      case 'BUY SIGNAL':
        return 'bg-[#10B981] text-white'
      case 'SELL SIGNAL':
        return 'bg-[#EF4444] text-white'
      case 'FORMING':
        return 'bg-[#F59E0B] text-white'
      default:
        return 'bg-[#718096] text-white'
    }
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      {/* Sidebar */}
      <ScreenerSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <div className="bg-white border-b border-[#E2E8F0] px-8 py-6">
          <h1 className="text-3xl font-black text-[#1B2A4A] mb-2">High-Conviction Alerts</h1>
          <p className="text-sm text-[#718096]">
            Plain-English summaries of the strongest breakouts & breakdowns right now.
          </p>
        </div>

        <div className="p-8 space-y-6">
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm text-[#718096]">Filter signals by conviction:</div>
              <select
                value={confidenceFilter}
                onChange={(e) => setConfidenceFilter(e.target.value)}
                className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#2D3748] focus:outline-none focus:border-[#0D7C8C]"
              >
                <option value="0">All confidence levels</option>
                <option value="65">65%+ (recommended)</option>
                <option value="75">75%+ (high)</option>
                <option value="85">85%+ (very high)</option>
              </select>
            </div>

            <button className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm font-bold text-[#718096] hover:border-[#0D7C8C] transition-all flex items-center gap-2">
              <IconRefresh className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {/* Alerts List */}
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`bg-white rounded-lg border-l-4 p-6 hover:shadow-md transition-all ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-black text-[#1B2A4A]">{alert.symbol}</h3>
                      <span className="text-sm text-[#718096]">{alert.name}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded text-xs font-bold ${getSignalBadgeColor(alert.type)}`}>
                      {alert.type} · {alert.confidence}%
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[#2D3748] mb-4 leading-relaxed">{alert.description}</p>

                {/* Price Levels - Simple inline format */}
                <div className="text-sm text-[#718096]">
                  <span className="font-semibold text-[#2D3748]">Entry</span> ₹{alert.entry.toFixed(2)} · 
                  <span className="font-semibold text-[#10B981] ml-2">Target</span> ₹{alert.target.toFixed(2)} · 
                  <span className="font-semibold text-[#EF4444] ml-2">Stop</span> ₹{alert.stop.toFixed(2)} · 
                  <span className="font-semibold text-[#2D3748] ml-2">R:R</span> {alert.riskReward}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredAlerts.length === 0 && (
            <div className="text-center py-12">
              <IconBell className="w-16 h-16 text-[#718096] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1B2A4A] mb-2">No alerts match your criteria</h3>
              <p className="text-[#718096]">Try adjusting your confidence filter to see more alerts.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}