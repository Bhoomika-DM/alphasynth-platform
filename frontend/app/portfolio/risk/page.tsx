'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import NavigationHeader from '@/components/dashboard/NavigationHeader'
import { IconShield, IconAlertTriangle, IconTrendingDown, IconChartLine, IconDownload } from '@tabler/icons-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export default function RiskManagementPage() {
  const router = useRouter()
  
  // Mock VaR data
  const varData = [
    { date: 'Jan', var95: -2.5, var99: -4.2 },
    { date: 'Feb', var95: -2.8, var99: -4.5 },
    { date: 'Mar', var95: -3.1, var99: -5.0 },
    { date: 'Apr', var95: -2.9, var99: -4.7 },
    { date: 'May', var95: -2.6, var99: -4.3 },
    { date: 'Jun', var95: -2.4, var99: -4.0 },
  ]

  // Mock drawdown data
  const drawdownData = [
    { date: 'Jan', drawdown: 0 },
    { date: 'Feb', drawdown: -1.2 },
    { date: 'Mar', drawdown: -2.5 },
    { date: 'Apr', drawdown: -8.2 },
    { date: 'May', drawdown: -3.1 },
    { date: 'Jun', drawdown: -1.5 },
    { date: 'Jul', drawdown: 0 },
    { date: 'Aug', drawdown: -2.8 },
    { date: 'Sep', drawdown: 0 },
    { date: 'Oct', drawdown: 0 },
    { date: 'Nov', drawdown: 0 },
    { date: 'Dec', drawdown: 0 },
  ]

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* Header */}
      <div className="border-b border-[#2E4D8E]/20 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-[#1B2A4A]">Risk Management</h1>
            <p className="text-sm text-[#718096]">VaR, drawdowns, volatility analysis</p>
          </div>
          <NavigationHeader />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Risk Metrics Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#718096]">Portfolio Beta</span>
              <IconChartLine className="w-5 h-5 text-[#0D7C8C]" />
            </div>
            <div className="text-3xl font-black text-[#1B2A4A]">1.24</div>
            <div className="text-sm text-[#718096] mt-1">vs Market</div>
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#718096]">Volatility (σ)</span>
              <IconTrendingDown className="w-5 h-5 text-[#8C1A1A]" />
            </div>
            <div className="text-3xl font-black text-[#1B2A4A]">18.5%</div>
            <div className="text-sm text-[#718096] mt-1">Annualized</div>
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#718096]">VaR (95%)</span>
              <IconAlertTriangle className="w-5 h-5 text-[#B8860B]" />
            </div>
            <div className="text-3xl font-black text-[#8C1A1A]">-2.4%</div>
            <div className="text-sm text-[#718096] mt-1">1-day horizon</div>
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#718096]">CVaR (95%)</span>
              <IconShield className="w-5 h-5 text-[#8C1A1A]" />
            </div>
            <div className="text-3xl font-black text-[#8C1A1A]">-3.8%</div>
            <div className="text-sm text-[#718096] mt-1">Expected shortfall</div>
          </div>
        </div>

        {/* Value at Risk Chart */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-[#1B2A4A]">Value at Risk (VaR) Trend</h2>
            <button className="px-4 py-2 bg-[#0D7C8C] text-white rounded-lg text-sm font-bold hover:bg-[#0A6B7A] transition-all flex items-center gap-2">
              <IconDownload className="w-4 h-4" />
              Export Report
            </button>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={varData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="date" stroke="#718096" />
              <YAxis stroke="#718096" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="var95" stroke="#B8860B" strokeWidth={2} name="VaR 95%" />
              <Line type="monotone" dataKey="var99" stroke="#8C1A1A" strokeWidth={2} name="VaR 99%" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Drawdown Analysis */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <h2 className="text-xl font-black text-[#1B2A4A] mb-6">Drawdown Analysis</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={drawdownData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="date" stroke="#718096" />
              <YAxis stroke="#718096" />
              <Tooltip />
              <Bar dataKey="drawdown" fill="#8C1A1A" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Concentration */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <h2 className="text-xl font-black text-[#1B2A4A] mb-6">Risk Concentration</h2>

          <div className="space-y-4">
            {[
              { name: 'Technology', exposure: 35, risk: 'High' },
              { name: 'Financials', exposure: 25, risk: 'Medium' },
              { name: 'Healthcare', exposure: 20, risk: 'Medium' },
              { name: 'Consumer', exposure: 15, risk: 'Low' },
              { name: 'Energy', exposure: 5, risk: 'Low' },
            ].map((sector) => (
              <div key={sector.name} className="flex items-center gap-4">
                <div className="w-32 text-sm font-bold text-[#2D3748]">{sector.name}</div>
                <div className="flex-1 h-8 bg-[#F8F9FB] rounded-lg overflow-hidden">
                  <div 
                    className={`h-full flex items-center justify-end px-3 ${
                      sector.risk === 'High' ? 'bg-[#8C1A1A]' : 
                      sector.risk === 'Medium' ? 'bg-[#B8860B]' : 'bg-[#10B981]'
                    }`} 
                    style={{ width: `${sector.exposure}%` }}
                  >
                    <span className="text-sm font-bold text-white">{sector.exposure}%</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  sector.risk === 'High' ? 'bg-[#8C1A1A]/20 text-[#8C1A1A]' :
                  sector.risk === 'Medium' ? 'bg-[#B8860B]/20 text-[#B8860B]' : 'bg-[#10B981]/20 text-[#10B981]'
                }`}>
                  {sector.risk}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
