'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import NavigationHeader from '@/components/dashboard/NavigationHeader'
import { IconStack2, IconTarget, IconAdjustments, IconDownload } from '@tabler/icons-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

export default function AssetAllocationPage() {
  const router = useRouter()
  
  // Current allocation
  const currentAllocation = [
    { name: 'US Equities', value: 40, color: '#0D7C8C' },
    { name: 'International Equities', value: 25, color: '#2E4D8E' },
    { name: 'Bonds', value: 20, color: '#B8860B' },
    { name: 'Real Estate', value: 10, color: '#10B981' },
    { name: 'Cash', value: 5, color: '#718096' },
  ]

  // Target allocation
  const targetAllocation = [
    { name: 'US Equities', value: 35, color: '#0D7C8C' },
    { name: 'International Equities', value: 30, color: '#2E4D8E' },
    { name: 'Bonds', value: 20, color: '#B8860B' },
    { name: 'Real Estate', value: 10, color: '#10B981' },
    { name: 'Cash', value: 5, color: '#718096' },
  ]

  // Sector allocation
  const sectorAllocation = [
    { sector: 'Technology', current: 35, target: 30 },
    { sector: 'Financials', current: 25, target: 25 },
    { sector: 'Healthcare', current: 20, target: 20 },
    { sector: 'Consumer', current: 15, target: 20 },
    { sector: 'Energy', current: 5, target: 5 },
  ]

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* Header */}
      <div className="border-b border-[#2E4D8E]/20 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-[#1B2A4A]">Asset Allocation</h1>
            <p className="text-sm text-[#718096]">Optimize your portfolio mix</p>
          </div>
          <NavigationHeader />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#718096]">Total Assets</span>
              <IconStack2 className="w-5 h-5 text-[#0D7C8C]" />
            </div>
            <div className="text-3xl font-black text-[#1B2A4A]">$129.4K</div>
            <div className="text-sm text-[#10B981] mt-1">+29.4% YTD</div>
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#718096]">Equity Allocation</span>
              <IconTarget className="w-5 h-5 text-[#0D7C8C]" />
            </div>
            <div className="text-3xl font-black text-[#1B2A4A]">65%</div>
            <div className="text-sm text-[#718096] mt-1">Target: 65%</div>
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#718096]">Fixed Income</span>
              <IconAdjustments className="w-5 h-5 text-[#B8860B]" />
            </div>
            <div className="text-3xl font-black text-[#1B2A4A]">20%</div>
            <div className="text-sm text-[#718096] mt-1">Target: 20%</div>
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#718096]">Rebalance Needed</span>
              <IconAdjustments className="w-5 h-5 text-[#B8860B]" />
            </div>
            <div className="text-3xl font-black text-[#B8860B]">Yes</div>
            <div className="text-sm text-[#718096] mt-1">5% drift</div>
          </div>
        </div>

        {/* Allocation Charts */}
        <div className="grid grid-cols-2 gap-6">
          {/* Current Allocation */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <h2 className="text-xl font-black text-[#1B2A4A] mb-6">Current Allocation</h2>
            
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={currentAllocation}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {currentAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Target Allocation */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <h2 className="text-xl font-black text-[#1B2A4A] mb-6">Target Allocation</h2>
            
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={targetAllocation}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {targetAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Allocation */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-[#1B2A4A]">Sector Allocation vs Target</h2>
            <button className="px-4 py-2 bg-[#0D7C8C] text-white rounded-lg text-sm font-bold hover:bg-[#0A6B7A] transition-all flex items-center gap-2">
              <IconDownload className="w-4 h-4" />
              Export Report
            </button>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sectorAllocation}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="sector" stroke="#718096" />
              <YAxis stroke="#718096" />
              <Tooltip />
              <Legend />
              <Bar dataKey="current" fill="#0D7C8C" name="Current %" />
              <Bar dataKey="target" fill="#2E4D8E" name="Target %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Rebalancing Recommendations */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <h2 className="text-xl font-black text-[#1B2A4A] mb-6">Rebalancing Recommendations</h2>

          <div className="space-y-4">
            {[
              { asset: 'US Equities', action: 'Reduce', amount: '$6,470', percentage: -5, color: 'text-[#8C1A1A]' },
              { asset: 'International Equities', action: 'Increase', amount: '$6,470', percentage: +5, color: 'text-[#10B981]' },
              { asset: 'Bonds', action: 'Hold', amount: '$0', percentage: 0, color: 'text-[#718096]' },
              { asset: 'Real Estate', action: 'Hold', amount: '$0', percentage: 0, color: 'text-[#718096]' },
              { asset: 'Cash', action: 'Hold', amount: '$0', percentage: 0, color: 'text-[#718096]' },
            ].map((item) => (
              <div key={item.asset} className="flex items-center justify-between p-4 bg-[#F8F9FB] rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-base font-bold text-[#2D3748]">{item.asset}</div>
                  <div className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    item.action === 'Reduce' ? 'bg-[#8C1A1A]/20 text-[#8C1A1A]' :
                    item.action === 'Increase' ? 'bg-[#10B981]/20 text-[#10B981]' :
                    'bg-[#718096]/20 text-[#718096]'
                  }`}>
                    {item.action}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-sm text-[#718096]">{item.amount}</div>
                  <div className={`text-base font-bold ${item.color}`}>
                    {item.percentage > 0 ? '+' : ''}{item.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-[#0D7C8C]/10 border border-[#0D7C8C]/30 rounded-lg">
            <p className="text-sm text-[#2D3748]">
              <strong>Recommendation:</strong> Rebalance to reduce US equity exposure and increase international diversification. 
              This will bring your portfolio closer to target allocation and reduce concentration risk.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
