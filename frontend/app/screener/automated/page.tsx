'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ScreenerSidebar from '@/components/screener/ScreenerSidebar'
import { IconRefresh, IconStar, IconRocket, IconAdjustments, IconSearch } from '@tabler/icons-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts'

export default function AutomatedScreenerPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('All')
  const [showApiModal, setShowApiModal] = useState(false)
  const [selectedDataSource, setSelectedDataSource] = useState('CSV')
  const [uploadedFile, setUploadedFile] = useState('')

  // Mock data for charts - different for each tab
  const getChartDataForTab = (tab: string) => {
    const dataVariations = {
      'All': {
        alphaDistribution: [
          { name: '0-20', value: 15 },
          { name: '20-40', value: 25 },
          { name: '40-60', value: 35 },
          { name: '60-80', value: 20 },
          { name: '80-100', value: 5 },
        ],
        sectorWeights: [
          { name: 'Banks', value: 25, color: '#0088FE' },
          { name: 'IT', value: 20, color: '#00C49F' },
          { name: 'Chemicals', value: 15, color: '#FFBB28' },
          { name: 'Infrastructure', value: 12, color: '#FF8042' },
          { name: 'Telecom', value: 10, color: '#8884D8' },
          { name: 'Energy', value: 8, color: '#82CA9D' },
          { name: 'Auto', value: 6, color: '#FFC658' },
          { name: 'Pharma', value: 4, color: '#FF7C7C' },
        ],
        universeStats: { total: 76, records: 72, failed: 4 }
      },
      'Quality': {
        alphaDistribution: [
          { name: '0-20', value: 5 },
          { name: '20-40', value: 10 },
          { name: '40-60', value: 25 },
          { name: '60-80', value: 35 },
          { name: '80-100', value: 25 },
        ],
        sectorWeights: [
          { name: 'IT', value: 35, color: '#00C49F' },
          { name: 'FMCG', value: 25, color: '#0088FE' },
          { name: 'Pharma', value: 20, color: '#FF7C7C' },
          { name: 'Banks', value: 15, color: '#FFBB28' },
          { name: 'Auto', value: 5, color: '#FFC658' },
        ],
        universeStats: { total: 45, records: 43, failed: 2 }
      },
      'Value': {
        alphaDistribution: [
          { name: '0-20', value: 30 },
          { name: '20-40', value: 35 },
          { name: '40-60', value: 20 },
          { name: '60-80', value: 10 },
          { name: '80-100', value: 5 },
        ],
        sectorWeights: [
          { name: 'Banks', value: 40, color: '#0088FE' },
          { name: 'Energy', value: 25, color: '#82CA9D' },
          { name: 'Infrastructure', value: 20, color: '#FF8042' },
          { name: 'Auto', value: 10, color: '#FFC658' },
          { name: 'Telecom', value: 5, color: '#8884D8' },
        ],
        universeStats: { total: 38, records: 35, failed: 3 }
      },
      'Growth': {
        alphaDistribution: [
          { name: '0-20', value: 8 },
          { name: '20-40', value: 15 },
          { name: '40-60', value: 30 },
          { name: '60-80', value: 32 },
          { name: '80-100', value: 15 },
        ],
        sectorWeights: [
          { name: 'IT', value: 45, color: '#00C49F' },
          { name: 'Chemicals', value: 25, color: '#FFBB28' },
          { name: 'Pharma', value: 15, color: '#FF7C7C' },
          { name: 'FMCG', value: 10, color: '#0088FE' },
          { name: 'Auto', value: 5, color: '#FFC658' },
        ],
        universeStats: { total: 52, records: 50, failed: 2 }
      },
      'Momentum': {
        alphaDistribution: [
          { name: '0-20', value: 10 },
          { name: '20-40', value: 20 },
          { name: '40-60', value: 40 },
          { name: '60-80', value: 25 },
          { name: '80-100', value: 5 },
        ],
        sectorWeights: [
          { name: 'IT', value: 30, color: '#00C49F' },
          { name: 'Banks', value: 25, color: '#0088FE' },
          { name: 'Auto', value: 20, color: '#FFC658' },
          { name: 'Energy', value: 15, color: '#82CA9D' },
          { name: 'Pharma', value: 10, color: '#FF7C7C' },
        ],
        universeStats: { total: 41, records: 39, failed: 2 }
      },
      'Multi': {
        alphaDistribution: [
          { name: '0-20', value: 12 },
          { name: '20-40', value: 18 },
          { name: '40-60', value: 28 },
          { name: '60-80', value: 30 },
          { name: '80-100', value: 12 },
        ],
        sectorWeights: [
          { name: 'IT', value: 28, color: '#00C49F' },
          { name: 'Banks', value: 22, color: '#0088FE' },
          { name: 'FMCG', value: 18, color: '#FFBB28' },
          { name: 'Pharma', value: 16, color: '#FF7C7C' },
          { name: 'Energy', value: 16, color: '#82CA9D' },
        ],
        universeStats: { total: 58, records: 55, failed: 3 }
      },
      'Turn': {
        alphaDistribution: [
          { name: '0-20', value: 25 },
          { name: '20-40', value: 30 },
          { name: '40-60', value: 25 },
          { name: '60-80', value: 15 },
          { name: '80-100', value: 5 },
        ],
        sectorWeights: [
          { name: 'Banks', value: 35, color: '#0088FE' },
          { name: 'Infrastructure', value: 25, color: '#FF8042' },
          { name: 'Energy', value: 20, color: '#82CA9D' },
          { name: 'Auto', value: 15, color: '#FFC658' },
          { name: 'Telecom', value: 5, color: '#8884D8' },
        ],
        universeStats: { total: 29, records: 26, failed: 3 }
      },
      'Low Risk': {
        alphaDistribution: [
          { name: '0-20', value: 5 },
          { name: '20-40', value: 15 },
          { name: '40-60', value: 45 },
          { name: '60-80', value: 30 },
          { name: '80-100', value: 5 },
        ],
        sectorWeights: [
          { name: 'FMCG', value: 40, color: '#0088FE' },
          { name: 'IT', value: 30, color: '#00C49F' },
          { name: 'Pharma', value: 20, color: '#FF7C7C' },
          { name: 'Banks', value: 10, color: '#FFBB28' },
        ],
        universeStats: { total: 32, records: 31, failed: 1 }
      },

    }
    
    return dataVariations[tab as keyof typeof dataVariations] || dataVariations['All']
  }

  const currentData = getChartDataForTab(activeTab)

  const qualityMomentumData = [
    { x: 65, y: 75, name: 'NESTLBIND' },
    { x: 70, y: 80, name: 'COALINDIA' },
  ]

  const screenerResults = [
    { rank: 11, symbol: 'PERSISTENT', company: 'Persistent Systems', score: 65, price: 32.5, roe: 0.8, actual: 6.5, projected: 1.0, estimate: 32.5, dividend: 20.0, low: 1.1, high: 462.00 },
    { rank: 12, symbol: 'BRITANNIA', company: 'Britannia Industries', score: 63, price: 68.5, roe: 0.8, actual: 3.5, projected: 1.0, estimate: 8.0, dividend: 15.0, low: 0.7, high: 4160.0 },
    { rank: 13, symbol: 'IRCTC', company: 'Indian Railway Catering & Tourism', score: 62, price: 55.5, roe: 0.9, actual: 2.5, projected: 1.0, estimate: 35.5, dividend: 20.0, low: 0.9, high: 850.00 },
    { rank: 14, symbol: 'TCS', company: 'Tata Consultancy Services', score: 60, price: 49.2, roe: 0.9, actual: 2.1, projected: 1.0, estimate: 8.3, dividend: 14.5, low: 0.8, high: 4118.85 },
    { rank: 15, symbol: 'IOC', company: 'Indian Oil Corp', score: 61, price: 76.5, roe: 0.7, actual: 12.5, projected: 1.0, estimate: 22.5, dividend: 12.0, low: 1.1, high: 142.50 },
  ]

  const universeStats = {
    total: 76,
    records: 72,
    failed: 4
  }

  const tabs = ['All', 'Quality', 'Value', 'Growth', 'Momentum', 'Multi', 'Turn', 'Low Risk']

  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      <ScreenerSidebar />

      <div className="flex-1 ml-64">
        <div className="bg-white border-b border-[#E2E8F0] px-8 py-6">
          <h1 className="text-3xl font-black text-[#1B2A4A] mb-2">Automated Screener</h1>
          <p className="text-sm text-[#718096]">
            AI-powered stock screening with customizable filters and automated pattern detection.
          </p>
        </div>

        <div className="p-8 space-y-6">
          {/* Top Tabs */}
          <div className="flex items-center gap-2 bg-white rounded-lg p-2 border border-[#E2E8F0]">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-[#0D7C8C] text-white'
                    : 'text-[#718096] hover:text-[#2D3748] hover:bg-[#F8F9FB]'
                }`}
              >
                {tab}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <button 
                onClick={() => setShowApiModal(true)}
                className="px-4 py-2 bg-[#0D7C8C] text-white rounded-md text-sm font-bold hover:bg-[#0B6B7A] transition-colors"
              >
                Use API
              </button>
            </div>
          </div>

          {/* Universe Stats */}
          <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
            <div className="text-sm text-[#718096] mb-2">Universe Stats</div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-[#1B2A4A]">{currentData.universeStats.total}</span>
                <span className="text-sm text-[#718096]">TOTAL</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-[#10B981]">{currentData.universeStats.records}</span>
                <span className="text-sm text-[#718096]">RECORDS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-[#EF4444]">{currentData.universeStats.failed}</span>
                <span className="text-sm text-[#718096]">FAILED</span>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Filters and Conviction Signals */}
            <div className="col-span-3 space-y-6">
              {/* Active Model Profile */}
              <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
                <h3 className="text-sm font-bold text-[#1B2A4A] mb-3">ACTIVE MODEL PROFILE</h3>
                <div className="space-y-2">
                  <div className="text-sm text-[#718096]">☑ Quality Compounders</div>
                  <div className="text-sm text-[#718096]">Coffee Can Style — Low</div>
                  <div className="text-sm text-[#718096]">churn, high governance</div>
                  <div className="text-sm text-[#718096]">ROE(%) ≥ 20%</div>
                  <div className="text-sm text-[#718096]">FCF / PAT ≥ 1%</div>
                  <div className="text-sm text-[#718096]">Accrual Ratio ≤ 15%</div>
                  <div className="text-sm text-[#718096]">Promoter Stability ≥ 70%</div>
                  <div className="text-sm text-[#718096]">Revenue CAGR-5Y (%) ≥ 10%</div>
                  <div className="text-sm text-[#718096]">Dividend Growth-5Y (%) ≥ 5%</div>
                  <div className="text-sm text-[#718096]">Low Beta ≤ 1.0%</div>
                </div>
                <div className="mt-3 pt-3 border-t border-[#E2E8F0]">
                  <div className="text-xs text-[#EF4444]">⚫ DISQUALIFIED</div>
                  <div className="bg-[#FEE2E2] p-2 rounded mt-2">
                    <div className="text-sm text-[#EF4444]">AUROPHARMAA Pharma</div>
                    <div className="text-xs text-[#EF4444]">Removed disqualified 58 + 50%</div>
                  </div>
                  <div className="bg-[#FEE2E2] p-2 rounded mt-2">
                    <div className="text-sm text-[#EF4444]">WHIRLPOOL Consumer</div>
                    <div className="text-xs text-[#EF4444]">Disc</div>
                  </div>
                  <div className="bg-[#FEE2E2] p-2 rounded mt-2">
                    <div className="text-sm text-[#EF4444]">DLF Real Estate</div>
                    <div className="text-xs text-[#EF4444]">Removed disqualified 58 + 50%</div>
                  </div>
                  <div className="bg-[#FEE2E2] p-2 rounded mt-2">
                    <div className="text-sm text-[#EF4444]">BHEL Infrastructure</div>
                    <div className="text-xs text-[#EF4444]">Removed disqualified 58 + 50%</div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-[#718096]">
                  // Screener refreshed
                </div>
              </div>

              {/* Conviction Signals */}
              <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
                <h3 className="text-sm font-bold text-[#1B2A4A] mb-3">★ Conviction Signals</h3>
                <div className="text-xs text-[#718096] mb-3">Top-tier multi-factor alpha</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-[#E2E8F0] rounded-lg p-3">
                    <div className="text-sm font-bold text-[#1B2A4A] mb-1">MAZDOCK</div>
                    <div className="text-xs text-[#718096] mb-2">Mazagon Dock</div>
                    <div className="text-2xl font-black text-[#0D7C8C] mb-1">73</div>
                    <div className="text-xs text-[#0D7C8C]">ALPHA SCORE</div>
                    <div className="text-xs text-[#718096] mt-2">Momentum | Dividend #1</div>
                  </div>
                  <div className="border border-[#E2E8F0] rounded-lg p-3">
                    <div className="text-sm font-bold text-[#1B2A4A] mb-1">BAJFINANCE</div>
                    <div className="text-xs text-[#718096] mb-2">Bajaj Finance</div>
                    <div className="text-2xl font-black text-[#0D7C8C] mb-1">73</div>
                    <div className="text-xs text-[#0D7C8C]">ALPHA SCORE</div>
                    <div className="text-xs text-[#718096] mt-2">NIFTY | Standard #7</div>
                  </div>
                  <div className="border border-[#E2E8F0] rounded-lg p-3">
                    <div className="text-sm font-bold text-[#1B2A4A] mb-1">MUTHOOTFIN</div>
                    <div className="text-xs text-[#718096] mb-2">Muthoot Finance</div>
                    <div className="text-2xl font-black text-[#0D7C8C] mb-1">67</div>
                    <div className="text-xs text-[#0D7C8C]">ALPHA SCORE</div>
                    <div className="text-xs text-[#718096] mt-2">NIFTY | Standard #5</div>
                  </div>
                  <div className="border border-[#E2E8F0] rounded-lg p-3">
                    <div className="text-sm font-bold text-[#1B2A4A] mb-1">DIVISLAB</div>
                    <div className="text-xs text-[#718096] mb-2">Divi's Labs</div>
                    <div className="text-2xl font-black text-[#0D7C8C] mb-1">61</div>
                    <div className="text-xs text-[#0D7C8C]">ALPHA SCORE</div>
                    <div className="text-xs text-[#718096] mt-2">Pharma | Standard #4</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Analytics and Results */}
            <div className="col-span-9 space-y-6">
              {/* Institutional Analytics */}
              <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
                <h3 className="text-lg font-bold text-[#1B2A4A] mb-4">☑ Institutional Analytics</h3>
                
                <div className="grid grid-cols-3 gap-6">
                  {/* Alpha Distribution Chart */}
                  <div>
                    <h4 className="text-sm font-bold text-[#718096] mb-3">ALPHA DISTRIBUTION</h4>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={currentData.alphaDistribution}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="name" 
                            tick={{ fontSize: 10 }}
                            axisLine={false}
                          />
                          <YAxis 
                            tick={{ fontSize: 10 }}
                            axisLine={false}
                          />
                          <Tooltip />
                          <Bar dataKey="value" fill="#0D7C8C" radius={[2, 2, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Sector Weights Pie Chart */}
                  <div>
                    <h4 className="text-sm font-bold text-[#718096] mb-3">SECTOR WEIGHTS</h4>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={currentData.sectorWeights}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {currentData.sectorWeights.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-xs mt-2">
                      {currentData.sectorWeights.map((sector, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: sector.color }}></div>
                          <span className="text-[#718096]">{sector.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Signals Radar Comparison */}
                  <div>
                    <h4 className="text-sm font-bold text-[#718096] mb-3">TOP SIGNALS RADAR COMPARISON</h4>
                    <div className="h-48 bg-[#F8F9FB] rounded-lg flex items-center justify-center relative">
                      <div className="absolute inset-4 border border-[#E2E8F0] rounded-full"></div>
                      <div className="absolute inset-8 border border-[#E2E8F0] rounded-full"></div>
                      <div className="absolute inset-12 border border-[#E2E8F0] rounded-full"></div>
                      <div className="text-xs text-[#718096] text-center">
                        <div>Radar Chart</div>
                        <div>Comparison</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Table */}
              <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 relative">
                    <IconSearch className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#718096]" />
                    <input
                      type="text"
                      placeholder="Search symbol or industry..."
                      className="w-full pl-10 pr-4 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-[#0D7C8C]"
                    />
                  </div>
                  <div className="text-sm text-[#718096]">Top 20 shown out of 72 #s</div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#1B2A4A] text-white">
                        <th className="text-left py-3 px-2 text-xs font-bold uppercase">#</th>
                        <th className="text-left py-3 px-2 text-xs font-bold uppercase">SYMBOL ↑</th>
                        <th className="text-left py-3 px-2 text-xs font-bold uppercase">COMPANY</th>
                        <th className="text-center py-3 px-2 text-xs font-bold uppercase">SCORE ↑</th>
                        <th className="text-right py-3 px-2 text-xs font-bold uppercase">PRICE ↑</th>
                        <th className="text-right py-3 px-2 text-xs font-bold uppercase">ROE ↑</th>
                        <th className="text-right py-3 px-2 text-xs font-bold uppercase">ACTUAL ↑</th>
                        <th className="text-right py-3 px-2 text-xs font-bold uppercase">PROJECTED ↑</th>
                        <th className="text-right py-3 px-2 text-xs font-bold uppercase">ESTIMATE ↑</th>
                        <th className="text-right py-3 px-2 text-xs font-bold uppercase">DIVIDEND ↑</th>
                        <th className="text-right py-3 px-2 text-xs font-bold uppercase">LOW ↑</th>
                        <th className="text-right py-3 px-2 text-xs font-bold uppercase">52 CAP ↑</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#E2E8F0] hover:bg-[#F8F9FB]">
                        <td className="py-3 px-2 text-sm text-[#718096]">1</td>
                        <td className="py-3 px-2 text-sm font-bold text-[#1B2A4A]">HINDALCO</td>
                        <td className="py-3 px-2 text-sm text-[#718096]">Hindalco Industries</td>
                        <td className="py-3 px-2 text-center text-sm font-bold text-[#1B2A4A]">80</td>
                        <td className="py-3 px-2 text-right text-sm text-[#718096]">14.0</td>
                        <td className="py-3 px-2 text-right text-sm text-[#718096]">0.6</td>
                        <td className="py-3 px-2 text-right text-sm text-[#718096]">11.0</td>
                        <td className="py-3 px-2 text-right text-sm text-[#718096]">0.9</td>
                        <td className="py-3 px-2 text-right text-sm text-[#718096]">10.5</td>
                        <td className="py-3 px-2 text-right text-sm text-[#718096]">5.0</td>
                        <td className="py-3 px-2 text-right text-sm text-[#718096]">1.3</td>
                        <td className="py-3 px-2 text-right text-sm text-[#718096]">₹1185.0</td>
                      </tr>
                      <tr className="border-b border-[#E2E8F0] hover:bg-[#F8F9FB]">
                        <td className="py-3 px-2 text-sm text-[#718096]">2</td>
                        <td className="py-3 px-2 text-sm font-bold text-[#1B2A4A]">NESTLIND</td>
                        <td className="py-3 px-2 text-sm text-[#718096]">Nestle India</td>
                        <td className="py-3 px-2 text-center text-sm font-bold text-[#1B2A4A]">76</td>
                        <td className="py-3 px-2 text-right text-sm text-[#718096]">89.0</td>
                        <td className="py-3 px-2 text-right text-sm text-[#718096]">0.9</td>
                        <td className="py-3 px-2 text-right text-sm text-[#718096]">2.0</td>
                        <td className="py-3 px-2 text-right text-sm text-[#718096]">1.0</td>
                        <td className="py-3 px-2 text-right text-sm text-[#718096]">9.5</td>
                        <td className="py-3 px-2 text-right text-sm text-[#718096]">19.0</td>
                        <td className="py-3 px-2 text-right text-sm text-[#718096]">0.6</td>
                        <td className="py-3 px-2 text-right text-sm text-[#718096]">₹4130.0</td>
                      </tr>
                      {screenerResults.map((result, index) => (
                        <tr key={index} className="border-b border-[#E2E8F0] hover:bg-[#F8F9FB]">
                          <td className="py-3 px-2 text-sm text-[#718096]">{result.rank}</td>
                          <td className="py-3 px-2 text-sm font-bold text-[#1B2A4A]">{result.symbol}</td>
                          <td className="py-3 px-2 text-sm text-[#718096]">{result.company}</td>
                          <td className="py-3 px-2 text-center text-sm font-bold text-[#1B2A4A]">{result.score}</td>
                          <td className="py-3 px-2 text-right text-sm text-[#718096]">{result.price}</td>
                          <td className="py-3 px-2 text-right text-sm text-[#718096]">{result.roe}</td>
                          <td className="py-3 px-2 text-right text-sm text-[#718096]">{result.actual}</td>
                          <td className="py-3 px-2 text-right text-sm text-[#718096]">{result.projected}</td>
                          <td className="py-3 px-2 text-right text-sm text-[#718096]">{result.estimate}</td>
                          <td className="py-3 px-2 text-right text-sm text-[#718096]">{result.dividend}</td>
                          <td className="py-3 px-2 text-right text-sm text-[#718096]">{result.low}</td>
                          <td className="py-3 px-2 text-right text-sm text-[#718096]">₹{result.high}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-2 gap-6">
                {/* Quality x Momentum Overlay */}
                <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-orange-500">📊</span>
                    <h3 className="text-lg font-bold text-[#1B2A4A]">Quality x Momentum Overlay</h3>
                  </div>
                  <div className="text-sm text-[#718096] mb-4">Stocks that satisfy top 10% of quality and momentum metrics</div>
                  
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart data={qualityMomentumData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          type="number" 
                          dataKey="x" 
                          name="Quality" 
                          domain={[60, 80]}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis 
                          type="number" 
                          dataKey="y" 
                          name="Momentum" 
                          domain={[70, 85]}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          cursor={{ strokeDasharray: '3 3' }}
                          formatter={(value, name) => [value, name]}
                          labelFormatter={(label) => `Stock: ${label}`}
                        />
                        <Scatter 
                          dataKey="y" 
                          fill="#0D7C8C"
                          name="Stocks"
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#0D7C8C] rounded-full"></div>
                      <span className="text-sm font-bold text-[#0D7C8C]">NESTLBIND</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#10B981] rounded-full"></div>
                      <span className="text-sm font-bold text-[#10B981]">COALINDIA</span>
                    </div>
                  </div>
                </div>

                {/* DII Accumulation Footprint */}
                <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-blue-500">🏛️</span>
                    <h3 className="text-lg font-bold text-[#1B2A4A]">DII Accumulation Footprint</h3>
                  </div>
                  <div className="text-sm text-[#718096] mb-4">Domestic institutional investors' concentrated stakeholder accumulation</div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {['INFY', 'TECHM', 'HINDUNILVR', 'HDFCBANK', 'ICICIBANK', 'DIVISLAB', 'HINDUNILVR', 'NAVINFLUOR', 'VOLTAS'].map((stock, index) => (
                      <div key={index} className="bg-[#F59E0B] text-white text-xs font-bold px-2 py-1 rounded text-center">
                        {stock}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API Modal */}
      {showApiModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            {/* Header with Logo */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#17A2B8] to-[#0D7C8C] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">α</span>
                </div>
                <h2 className="text-xl font-bold text-[#0D3B47]">Institutional Pipeline</h2>
              </div>
              <button 
                onClick={() => setShowApiModal(false)}
                className="text-[#A0AEC0] hover:text-[#0D3B47] text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Step 1: Select Data Source */}
              <div>
                <h3 className="text-sm font-bold text-[#0D3B47] mb-4">Select Data Source</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['CSV', 'Kite', 'Option', 'NSE', 'BSE'].map((source) => (
                    <button
                      key={source}
                      onClick={() => {
                        setSelectedDataSource(source)
                        setUploadedFile('')
                      }}
                      className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                        selectedDataSource === source
                          ? 'bg-[#17A2B8] text-white border-[#17A2B8]'
                          : 'bg-white border-[#E2E8F0] text-[#0D3B47] hover:border-[#17A2B8]'
                      }`}
                    >
                      {source === 'CSV' ? '📄 CSV' : source}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: CSV Upload */}
              {selectedDataSource === 'CSV' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#0D3B47]">Upload File</h3>
                  <label
                    htmlFor="csv-upload"
                    onDragOver={(e) => {
                      e.preventDefault()
                      e.currentTarget.classList.add('bg-[#E0F7FA]', 'border-[#17A2B8]')
                    }}
                    onDragLeave={(e) => {
                      e.currentTarget.classList.remove('bg-[#E0F7FA]', 'border-[#17A2B8]')
                    }}
                    onDrop={(e) => {
                      e.preventDefault()
                      e.currentTarget.classList.remove('bg-[#E0F7FA]', 'border-[#17A2B8]')
                      const files = e.dataTransfer.files
                      if (files.length > 0) {
                        setUploadedFile(files[0].name)
                      }
                    }}
                    className="border-2 border-dashed border-[#E2E8F0] rounded-lg p-6 text-center hover:border-[#17A2B8] transition-all cursor-pointer bg-[#F8FAFB]"
                  >
                    {uploadedFile ? (
                      <div className="text-[#17A2B8]">
                        <div className="text-2xl mb-2">✓</div>
                        <div className="text-sm font-medium">{uploadedFile}</div>
                      </div>
                    ) : (
                      <div className="text-[#718096]">
                        <div className="text-2xl mb-2">📁</div>
                        <div className="text-sm">Drag & drop CSV</div>
                        <div className="text-xs text-[#A0AEC0] mt-1">or click to browse</div>
                      </div>
                    )}
                  </label>
                  <input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    onChange={(e) => {
                      if (e.target.files?.length) {
                        setUploadedFile(e.target.files[0].name)
                      }
                    }}
                    className="hidden"
                  />
                </div>
              )}

              {/* Step 2: Kite Credentials */}
              {selectedDataSource === 'Kite' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#0D3B47]">Kite Credentials</h3>
                  <input
                    type="password"
                    placeholder="API Key"
                    className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-[#17A2B8] focus:ring-1 focus:ring-[#17A2B8]"
                  />
                  <input
                    type="text"
                    placeholder="Access Token"
                    className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-[#17A2B8] focus:ring-1 focus:ring-[#17A2B8]"
                  />
                </div>
              )}

              {/* Step 2: Option Credentials */}
              {selectedDataSource === 'Option' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#0D3B47]">Option Credentials</h3>
                  <input
                    type="password"
                    placeholder="API Key"
                    className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-[#17A2B8] focus:ring-1 focus:ring-[#17A2B8]"
                  />
                  <input
                    type="password"
                    placeholder="Secret Key"
                    className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-[#17A2B8] focus:ring-1 focus:ring-[#17A2B8]"
                  />
                </div>
              )}

              {/* Step 2: NSE Credentials */}
              {selectedDataSource === 'NSE' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#0D3B47]">NSE Login</h3>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-[#17A2B8] focus:ring-1 focus:ring-[#17A2B8]"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-[#17A2B8] focus:ring-1 focus:ring-[#17A2B8]"
                  />
                </div>
              )}

              {/* Step 2: BSE Credentials */}
              {selectedDataSource === 'BSE' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#0D3B47]">BSE Login</h3>
                  <input
                    type="text"
                    placeholder="Client ID"
                    className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-[#17A2B8] focus:ring-1 focus:ring-[#17A2B8]"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-[#17A2B8] focus:ring-1 focus:ring-[#17A2B8]"
                  />
                </div>
              )}

              {/* Action Button */}
              <button 
                onClick={() => setShowApiModal(false)}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#17A2B8] to-[#0D7C8C] text-white rounded-lg font-bold hover:from-[#0D7C8C] hover:to-[#0B6B7A] transition-all mt-6 shadow-md"
              >
                Apply & Sync
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}