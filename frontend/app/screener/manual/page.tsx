'use client'

import { useState } from 'react'
import ScreenerSidebar from '@/components/screener/ScreenerSidebar'
import { IconSearch, IconFilter, IconRefresh, IconPlus } from '@tabler/icons-react'

export default function ManualScreenerPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('')

  // Proven screen templates
  const templates = [
    { id: 'quality', name: 'Quality Compounders', description: 'High ROE, consistent growth, low debt' },
    { id: 'value', name: 'Value Picks', description: 'Low P/E, P/B with strong fundamentals' },
    { id: 'growth', name: 'Growth Stories', description: 'High revenue growth, expanding margins' },
    { id: 'dividend', name: 'Dividend Aristocrats', description: 'Consistent dividend payers, high yield' },
    { id: 'momentum', name: 'Momentum Plays', description: 'Strong price momentum, institutional buying' },
    { id: 'turnaround', name: 'Turnaround Candidates', description: 'Improving fundamentals, management changes' }
  ]

  // Mock results data
  const results = [
    { symbol: 'TCS', company: 'Tata Consultancy Services', sector: 'IT', price: 4118.85, conviction: 85, signal: 'BUY' },
    { symbol: 'INFY', company: 'Infosys', sector: 'IT', price: 1789.30, conviction: 82, signal: 'BUY' },
    { symbol: 'HCLTECH', company: 'HCL Technologies', sector: 'IT', price: 1456.75, conviction: 78, signal: 'HOLD' },
    { symbol: 'WIPRO', company: 'Wipro', sector: 'IT', price: 567.20, conviction: 75, signal: 'BUY' },
    { symbol: 'TECHM', company: 'Tech Mahindra', sector: 'IT', price: 1462.60, conviction: 72, signal: 'SELL' },
    { symbol: 'LTIM', company: 'LTIMindtree', sector: 'IT', price: 6234.50, conviction: 70, signal: 'HOLD' }
  ]

  const getConvictionColor = (conviction: number) => {
    if (conviction >= 80) return 'bg-[#10B981]'
    if (conviction >= 70) return 'bg-[#F59E0B]'
    return 'bg-[#EF4444]'
  }

  const getSignalBadge = (signal: string) => {
    switch (signal) {
      case 'BUY':
        return 'bg-[#10B981] text-white px-3 py-1 rounded text-xs font-bold'
      case 'SELL':
        return 'bg-[#EF4444] text-white px-3 py-1 rounded text-xs font-bold'
      case 'HOLD':
        return 'bg-[#718096] text-white px-3 py-1 rounded text-xs font-bold'
      default:
        return 'bg-[#718096] text-white px-3 py-1 rounded text-xs font-bold'
    }
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      <ScreenerSidebar />

      <div className="flex-1 ml-64">
        {/* Header */}
        <div className="bg-white border-b border-[#E2E8F0] px-8 py-6">
          <h1 className="text-3xl font-black text-[#1B2A4A] mb-2">Manual Screener</h1>
          <p className="text-sm text-[#718096]">
            Build custom screens with natural language search and proven templates.
          </p>
        </div>

        <div className="p-8 space-y-6">
          {/* Search Section */}
          <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
            <h3 className="text-lg font-bold text-[#1B2A4A] mb-4">Natural Language Search</h3>
            <div className="relative">
              <IconSearch className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-[#718096]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., 'Find IT companies with ROE > 20% and debt to equity < 0.5'"
                className="w-full pl-12 pr-4 py-4 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-[#0D7C8C] bg-[#F8F9FB]"
              />
            </div>
            <div className="flex items-center gap-2 mt-4">
              <button className="px-4 py-2 bg-[#0D7C8C] text-white rounded-lg text-sm font-bold hover:bg-[#0B6B7A] transition-all">
                Search
              </button>
              <button className="px-4 py-2 bg-white border border-[#E2E8F0] text-[#718096] rounded-lg text-sm font-bold hover:border-[#0D7C8C] transition-all">
                Clear
              </button>
            </div>
          </div>

          {/* Proven Templates */}
          <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
            <h3 className="text-lg font-bold text-[#1B2A4A] mb-4">Proven Screen Templates</h3>
            <div className="grid grid-cols-3 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-[#0D7C8C] ${
                    selectedTemplate === template.id
                      ? 'border-[#0D7C8C] bg-[#0D7C8C]/5'
                      : 'border-[#E2E8F0]'
                  }`}
                >
                  <h4 className="text-sm font-bold text-[#1B2A4A] mb-2">{template.name}</h4>
                  <p className="text-xs text-[#718096]">{template.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#1B2A4A]">Screening Results</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#718096]">{results.length} stocks found</span>
                <button className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm font-bold text-[#718096] hover:border-[#0D7C8C] transition-all flex items-center gap-2">
                  <IconRefresh className="w-4 h-4" />
                  Refresh
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8F9FB] border-b border-[#E2E8F0]">
                  <tr>
                    <th className="text-left py-4 px-6 text-xs font-bold text-[#718096] uppercase tracking-wider">SYMBOL</th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-[#718096] uppercase tracking-wider">COMPANY</th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-[#718096] uppercase tracking-wider">SECTOR</th>
                    <th className="text-right py-4 px-6 text-xs font-bold text-[#718096] uppercase tracking-wider">PRICE</th>
                    <th className="text-center py-4 px-6 text-xs font-bold text-[#718096] uppercase tracking-wider">CONVICTION</th>
                    <th className="text-center py-4 px-6 text-xs font-bold text-[#718096] uppercase tracking-wider">SIGNAL</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={result.symbol} className={`border-b border-[#E2E8F0] hover:bg-[#F8F9FB] transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFC]'}`}>
                      <td className="py-4 px-6">
                        <div className="text-base font-bold text-[#1B2A4A]">{result.symbol}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-[#2D3748]">{result.company}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-[#718096]">{result.sector}</div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="text-sm font-bold text-[#2D3748]">₹{result.price.toFixed(2)}</div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-16 bg-[#E2E8F0] rounded-full h-2 mr-2">
                            <div 
                              className={`h-2 rounded-full ${getConvictionColor(result.conviction)}`}
                              style={{ width: `${result.conviction}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-[#2D3748]">{result.conviction}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={getSignalBadge(result.signal)}>
                          {result.signal}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}