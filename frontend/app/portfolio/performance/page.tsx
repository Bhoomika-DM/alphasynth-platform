'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import NavigationHeader from '@/components/dashboard/NavigationHeader'
import { IconChartPie, IconTrendingUp, IconArrowUp, IconArrowDown, IconCalendar, IconDownload } from '@tabler/icons-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export default function PerformanceTrackingPage() {
  const router = useRouter()
  const [selectedPeriod, setSelectedPeriod] = useState('1Y')
  
  // Mock performance data
  const performanceData = [
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

  const periods = ['1M', '3M', '6M', '1Y', 'YTD', 'All']

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* Header */}
      <div className="border-b border-[#2E4D8E]/20 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-[#1B2A4A]">Performance Tracking</h1>
            <p className="text-sm text-[#718096]">Returns & attribution analysis</p>
          </div>
          <NavigationHeader />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#718096]">Total Return</span>
              <IconTrendingUp className="w-5 h-5 text-[#10B981]" />
            </div>
            <div className="text-3xl font-black text-[#1B2A4A]">+29.4%</div>
            <div className="text-sm text-[#10B981] mt-1">+$29,400</div>
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#718096]">vs Benchmark</span>
              <IconArrowUp className="w-5 h-5 text-[#10B981]" />
            </div>
            <div className="text-3xl font-black text-[#10B981]">+10.9%</div>
            <div className="text-sm text-[#718096] mt-1">Outperformance</div>
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#718096]">Sharpe Ratio</span>
              <IconChartPie className="w-5 h-5 text-[#0D7C8C]" />
            </div>
            <div className="text-3xl font-black text-[#1B2A4A]">1.85</div>
            <div className="text-sm text-[#718096] mt-1">Risk-adjusted</div>
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#718096]">Max Drawdown</span>
              <IconArrowDown className="w-5 h-5 text-[#8C1A1A]" />
            </div>
            <div className="text-3xl font-black text-[#8C1A1A]">-8.2%</div>
            <div className="text-sm text-[#718096] mt-1">Apr 2026</div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-[#1B2A4A]">Portfolio Performance</h2>
            <div className="flex gap-2">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
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

          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0D7C8C" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0D7C8C" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#718096" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#718096" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="date" stroke="#718096" />
              <YAxis stroke="#718096" />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="portfolio" stroke="#0D7C8C" fillOpacity={1} fill="url(#portfolioGradient)" name="Portfolio" />
              <Area type="monotone" dataKey="benchmark" stroke="#718096" fillOpacity={1} fill="url(#benchmarkGradient)" name="Benchmark" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Attribution Analysis */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-[#1B2A4A]">Return Attribution</h2>
            <button className="px-4 py-2 bg-[#0D7C8C] text-white rounded-lg text-sm font-bold hover:bg-[#0A6B7A] transition-all flex items-center gap-2">
              <IconDownload className="w-4 h-4" />
              Export Report
            </button>
          </div>

          <div className="space-y-4">
            {[
              { name: 'Stock Selection', contribution: 12.5, color: 'bg-[#10B981]' },
              { name: 'Sector Allocation', contribution: 8.3, color: 'bg-[#0D7C8C]' },
              { name: 'Market Timing', contribution: 5.1, color: 'bg-[#2E4D8E]' },
              { name: 'Currency Effect', contribution: 2.4, color: 'bg-[#B8860B]' },
              { name: 'Other Factors', contribution: 1.1, color: 'bg-[#718096]' },
            ].map((factor) => (
              <div key={factor.name} className="flex items-center gap-4">
                <div className="w-48 text-sm font-bold text-[#2D3748]">{factor.name}</div>
                <div className="flex-1 h-8 bg-[#F8F9FB] rounded-lg overflow-hidden">
                  <div className={`h-full ${factor.color} flex items-center justify-end px-3`} style={{ width: `${(factor.contribution / 12.5) * 100}%` }}>
                    <span className="text-sm font-bold text-white">+{factor.contribution}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
