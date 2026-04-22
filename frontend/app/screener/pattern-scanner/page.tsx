'use client'

import { useState } from 'react'
import ScreenerSidebar from '@/components/screener/ScreenerSidebar'
import { IconRefresh, IconFilter } from '@tabler/icons-react'

export default function PatternScannerPage() {
  const [patternFilter, setPatternFilter] = useState('all')
  const [signalFilter, setSignalFilter] = useState('all')

  // Mock pattern data based on the screenshot
  const patterns = [
    {
      id: 1,
      stock: 'Tech Mahindra',
      symbol: 'TECHM',
      pattern: 'Rising Wedge',
      signal: 'SELL',
      entry: 1462.60,
      target: 1391.36,
      stop: 1559.29,
      riskReward: '1 : 0.74',
      confidence: 86
    },
    {
      id: 2,
      stock: 'Axis Bank',
      symbol: 'AXISBANK',
      pattern: 'Inverse Head & Shoulders',
      signal: 'BUY',
      entry: 1379.60,
      target: 1467.21,
      stop: 1236.76,
      riskReward: '1 : 0.47',
      confidence: 84
    },
    {
      id: 3,
      stock: 'NTPC',
      symbol: 'NTPC',
      pattern: 'Inverse Head & Shoulders',
      signal: 'BUY',
      entry: 405.40,
      target: 437.09,
      stop: 326.81,
      riskReward: '1 : 0.40',
      confidence: 84
    },
    {
      id: 4,
      stock: 'Hindustan Unilever',
      symbol: 'HINDUNILVR',
      pattern: 'Double Bottom',
      signal: 'BUY',
      entry: 2368.80,
      target: 2568.30,
      stop: 2306.43,
      riskReward: '1 : 3.20',
      confidence: 80
    },
    {
      id: 5,
      stock: 'Reliance Industries',
      symbol: 'RELIANCE',
      pattern: 'Cup & Handle',
      signal: 'BUY',
      entry: 2450.50,
      target: 2650.75,
      stop: 2380.20,
      riskReward: '1 : 2.85',
      confidence: 78
    },
    {
      id: 6,
      stock: 'HDFC Bank',
      symbol: 'HDFCBANK',
      pattern: 'Descending Triangle',
      signal: 'SELL',
      entry: 1650.20,
      target: 1520.15,
      stop: 1720.30,
      riskReward: '1 : 1.85',
      confidence: 75
    }
  ]

  const filteredPatterns = patterns.filter(pattern => {
    if (patternFilter !== 'all' && !pattern.pattern.toLowerCase().includes(patternFilter.toLowerCase())) return false
    if (signalFilter !== 'all' && pattern.signal !== signalFilter) return false
    return true
  })

  const getSignalBadge = (signal: string) => {
    return signal === 'BUY' 
      ? 'bg-[#10B981] text-white px-3 py-1 rounded text-xs font-bold'
      : 'bg-[#EF4444] text-white px-3 py-1 rounded text-xs font-bold'
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      {/* Sidebar */}
      <ScreenerSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <div className="bg-white border-b border-[#E2E8F0] px-8 py-6">
          <h1 className="text-3xl font-black text-[#1B2A4A] mb-2">Pattern Scanner</h1>
          <p className="text-sm text-[#718096]">
            Complete breakdown of every pattern detected across the scanned universe.
          </p>
        </div>

        <div className="p-8 space-y-6">
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <select
                value={patternFilter}
                onChange={(e) => setPatternFilter(e.target.value)}
                className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#2D3748] focus:outline-none focus:border-[#0D7C8C]"
              >
                <option value="all">All Patterns</option>
                <option value="head">Head & Shoulders</option>
                <option value="wedge">Wedge</option>
                <option value="triangle">Triangle</option>
                <option value="double">Double Top/Bottom</option>
                <option value="cup">Cup & Handle</option>
              </select>

              <select
                value={signalFilter}
                onChange={(e) => setSignalFilter(e.target.value)}
                className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#2D3748] focus:outline-none focus:border-[#0D7C8C]"
              >
                <option value="all">All Signals</option>
                <option value="BUY">Buy Signals</option>
                <option value="SELL">Sell Signals</option>
              </select>
            </div>

            <button className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm font-bold text-[#718096] hover:border-[#0D7C8C] transition-all flex items-center gap-2">
              <IconRefresh className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {/* Pattern Table */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8F9FB] border-b border-[#E2E8F0]">
                  <tr>
                    <th className="text-left py-4 px-6 text-xs font-bold text-[#718096] uppercase tracking-wider">STOCK</th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-[#718096] uppercase tracking-wider">PATTERN</th>
                    <th className="text-center py-4 px-6 text-xs font-bold text-[#718096] uppercase tracking-wider">SIGNAL</th>
                    <th className="text-right py-4 px-6 text-xs font-bold text-[#718096] uppercase tracking-wider">ENTRY</th>
                    <th className="text-right py-4 px-6 text-xs font-bold text-[#718096] uppercase tracking-wider">TARGET</th>
                    <th className="text-right py-4 px-6 text-xs font-bold text-[#718096] uppercase tracking-wider">STOP</th>
                    <th className="text-center py-4 px-6 text-xs font-bold text-[#718096] uppercase tracking-wider">R:R</th>
                    <th className="text-center py-4 px-6 text-xs font-bold text-[#718096] uppercase tracking-wider">CONF.</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatterns.map((pattern, index) => (
                    <tr key={pattern.id} className={`border-b border-[#E2E8F0] hover:bg-[#F8F9FB] transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFC]'}`}>
                      <td className="py-4 px-6">
                        <div>
                          <div className="text-base font-bold text-[#1B2A4A]">{pattern.stock}</div>
                          <div className="text-sm text-[#718096]">{pattern.symbol}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-[#2D3748] font-medium">{pattern.pattern}</div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={getSignalBadge(pattern.signal)}>
                          {pattern.signal}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right text-sm font-bold text-[#2D3748]">₹{pattern.entry.toFixed(2)}</td>
                      <td className="py-4 px-6 text-right text-sm font-bold text-[#10B981]">₹{pattern.target.toFixed(2)}</td>
                      <td className="py-4 px-6 text-right text-sm font-bold text-[#EF4444]">₹{pattern.stop.toFixed(2)}</td>
                      <td className="py-4 px-6 text-center text-sm font-bold text-[#2D3748]">{pattern.riskReward}</td>
                      <td className="py-4 px-6 text-center text-sm font-bold text-[#2D3748]">{pattern.confidence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
              <div className="text-xs text-[#718096] mb-2 uppercase tracking-wide">TOTAL PATTERNS</div>
              <div className="text-3xl font-black text-[#1B2A4A]">{patterns.length}</div>
            </div>
            
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
              <div className="text-xs text-[#718096] mb-2 uppercase tracking-wide">BUY SIGNALS</div>
              <div className="text-3xl font-black text-[#10B981]">{patterns.filter(p => p.signal === 'BUY').length}</div>
            </div>
            
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
              <div className="text-xs text-[#718096] mb-2 uppercase tracking-wide">SELL SIGNALS</div>
              <div className="text-3xl font-black text-[#EF4444]">{patterns.filter(p => p.signal === 'SELL').length}</div>
            </div>
            
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
              <div className="text-xs text-[#718096] mb-2 uppercase tracking-wide">AVG CONFIDENCE</div>
              <div className="text-3xl font-black text-[#1B2A4A]">
                {Math.round(patterns.reduce((acc, p) => acc + p.confidence, 0) / patterns.length)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}