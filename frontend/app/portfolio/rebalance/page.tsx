'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import NavigationHeader from '@/components/dashboard/NavigationHeader'
import { IconAdjustments, IconRefresh, IconCheck, IconAlertCircle, IconDownload } from '@tabler/icons-react'

export default function RebalancingPage() {
  const router = useRouter()
  const [rebalanceMethod, setRebalanceMethod] = useState('threshold')
  
  // Mock holdings data
  const holdings = [
    { 
      symbol: 'AAPL', 
      name: 'Apple Inc.', 
      currentValue: 52000, 
      currentWeight: 40, 
      targetWeight: 35, 
      drift: 5,
      action: 'Sell',
      amount: 6470
    },
    { 
      symbol: 'MSFT', 
      name: 'Microsoft Corp.', 
      currentValue: 32500, 
      currentWeight: 25, 
      targetWeight: 30, 
      drift: -5,
      action: 'Buy',
      amount: 6470
    },
    { 
      symbol: 'GOOGL', 
      name: 'Alphabet Inc.', 
      currentValue: 25880, 
      currentWeight: 20, 
      targetWeight: 20, 
      drift: 0,
      action: 'Hold',
      amount: 0
    },
    { 
      symbol: 'AMZN', 
      name: 'Amazon.com Inc.', 
      currentValue: 12940, 
      currentWeight: 10, 
      targetWeight: 10, 
      drift: 0,
      action: 'Hold',
      amount: 0
    },
    { 
      symbol: 'NVDA', 
      name: 'NVIDIA Corp.', 
      currentValue: 6470, 
      currentWeight: 5, 
      targetWeight: 5, 
      drift: 0,
      action: 'Hold',
      amount: 0
    },
  ]

  const totalValue = holdings.reduce((sum, h) => sum + h.currentValue, 0)

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* Header */}
      <div className="border-b border-[#2E4D8E]/20 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-[#1B2A4A]">Portfolio Rebalancing</h1>
            <p className="text-sm text-[#718096]">Maintain target weights</p>
          </div>
          <NavigationHeader />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#718096]">Portfolio Value</span>
              <IconAdjustments className="w-5 h-5 text-[#0D7C8C]" />
            </div>
            <div className="text-3xl font-black text-[#1B2A4A]">${(totalValue / 1000).toFixed(1)}K</div>
            <div className="text-sm text-[#10B981] mt-1">+29.4% YTD</div>
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#718096]">Max Drift</span>
              <IconAlertCircle className="w-5 h-5 text-[#B8860B]" />
            </div>
            <div className="text-3xl font-black text-[#B8860B]">5%</div>
            <div className="text-sm text-[#718096] mt-1">AAPL position</div>
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#718096]">Last Rebalance</span>
              <IconRefresh className="w-5 h-5 text-[#718096]" />
            </div>
            <div className="text-3xl font-black text-[#1B2A4A]">90d</div>
            <div className="text-sm text-[#718096] mt-1">Jan 21, 2026</div>
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#718096]">Trades Needed</span>
              <IconCheck className="w-5 h-5 text-[#10B981]" />
            </div>
            <div className="text-3xl font-black text-[#1B2A4A]">2</div>
            <div className="text-sm text-[#718096] mt-1">Buy & Sell</div>
          </div>
        </div>

        {/* Rebalancing Method */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <h2 className="text-xl font-black text-[#1B2A4A] mb-6">Rebalancing Method</h2>

          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setRebalanceMethod('threshold')}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                rebalanceMethod === 'threshold'
                  ? 'border-[#0D7C8C] bg-[#0D7C8C]/10'
                  : 'border-[#E2E8F0] hover:border-[#0D7C8C]/50'
              }`}
            >
              <div className="text-lg font-black text-[#1B2A4A] mb-2">Threshold-Based</div>
              <div className="text-sm text-[#718096]">Rebalance when drift exceeds 5%</div>
            </button>

            <button
              onClick={() => setRebalanceMethod('calendar')}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                rebalanceMethod === 'calendar'
                  ? 'border-[#0D7C8C] bg-[#0D7C8C]/10'
                  : 'border-[#E2E8F0] hover:border-[#0D7C8C]/50'
              }`}
            >
              <div className="text-lg font-black text-[#1B2A4A] mb-2">Calendar-Based</div>
              <div className="text-sm text-[#718096]">Rebalance quarterly</div>
            </button>

            <button
              onClick={() => setRebalanceMethod('hybrid')}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                rebalanceMethod === 'hybrid'
                  ? 'border-[#0D7C8C] bg-[#0D7C8C]/10'
                  : 'border-[#E2E8F0] hover:border-[#0D7C8C]/50'
              }`}
            >
              <div className="text-lg font-black text-[#1B2A4A] mb-2">Hybrid</div>
              <div className="text-sm text-[#718096]">Quarterly + 5% threshold</div>
            </button>
          </div>
        </div>

        {/* Rebalancing Plan */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-[#1B2A4A]">Rebalancing Plan</h2>
            <button className="px-4 py-2 bg-[#0D7C8C] text-white rounded-lg text-sm font-bold hover:bg-[#0A6B7A] transition-all flex items-center gap-2">
              <IconDownload className="w-4 h-4" />
              Export Plan
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E2E8F0]">
                  <th className="text-left py-3 px-4 text-sm font-bold text-[#718096] uppercase">Symbol</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-[#718096] uppercase">Name</th>
                  <th className="text-right py-3 px-4 text-sm font-bold text-[#718096] uppercase">Current Value</th>
                  <th className="text-center py-3 px-4 text-sm font-bold text-[#718096] uppercase">Current %</th>
                  <th className="text-center py-3 px-4 text-sm font-bold text-[#718096] uppercase">Target %</th>
                  <th className="text-center py-3 px-4 text-sm font-bold text-[#718096] uppercase">Drift</th>
                  <th className="text-center py-3 px-4 text-sm font-bold text-[#718096] uppercase">Action</th>
                  <th className="text-right py-3 px-4 text-sm font-bold text-[#718096] uppercase">Amount</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding) => (
                  <tr key={holding.symbol} className="border-b border-[#E2E8F0] hover:bg-[#F8F9FB] transition-colors">
                    <td className="py-4 px-4 text-base font-bold text-[#1B2A4A]">{holding.symbol}</td>
                    <td className="py-4 px-4 text-sm text-[#718096]">{holding.name}</td>
                    <td className="py-4 px-4 text-right text-base font-bold text-[#1B2A4A]">
                      ${holding.currentValue.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-center text-sm text-[#718096]">{holding.currentWeight}%</td>
                    <td className="py-4 px-4 text-center text-sm text-[#718096]">{holding.targetWeight}%</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`text-sm font-bold ${
                        holding.drift > 0 ? 'text-[#8C1A1A]' : 
                        holding.drift < 0 ? 'text-[#10B981]' : 'text-[#718096]'
                      }`}>
                        {holding.drift > 0 ? '+' : ''}{holding.drift}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        holding.action === 'Sell' ? 'bg-[#8C1A1A]/20 text-[#8C1A1A]' :
                        holding.action === 'Buy' ? 'bg-[#10B981]/20 text-[#10B981]' :
                        'bg-[#718096]/20 text-[#718096]'
                      }`}>
                        {holding.action}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-base font-bold text-[#1B2A4A]">
                      {holding.amount > 0 ? `$${holding.amount.toLocaleString()}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Execute Rebalancing */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-[#1B2A4A] mb-1">Ready to Rebalance?</h3>
              <p className="text-sm text-[#718096]">
                This will execute 2 trades to bring your portfolio back to target allocation
              </p>
            </div>
            <button className="px-8 py-4 bg-[#0D7C8C] text-white rounded-xl text-base font-bold hover:bg-[#0A6B7A] transition-all shadow-lg">
              Execute Rebalancing
            </button>
          </div>

          <div className="mt-4 p-4 bg-[#B8860B]/10 border border-[#B8860B]/30 rounded-lg">
            <p className="text-sm text-[#2D3748]">
              <strong>Note:</strong> Review all trades carefully before execution. Consider tax implications and transaction costs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
