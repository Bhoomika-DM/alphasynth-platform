'use client'

import { useState } from 'react'
import { IconUpload, IconPlus, IconX, IconTrendingUp, IconAlertTriangle, IconTarget, IconDownload } from '@tabler/icons-react'

interface Holding {
  ticker: string
  quantity: number
  avgBuyPrice: number
  purchaseDate: string
}

interface PortfolioCockpitProps {
  onAnalyze?: (holdings: Holding[]) => void
}

export default function PortfolioCockpit({ onAnalyze }: PortfolioCockpitProps) {
  const [holdings, setHoldings] = useState<Holding[]>([])
  const [newHolding, setNewHolding] = useState<Holding>({
    ticker: '',
    quantity: 0,
    avgBuyPrice: 0,
    purchaseDate: ''
  })
  const [activeTab, setActiveTab] = useState<'holdings' | 'results' | 'risk' | 'attribution' | 'action'>('holdings')

  const handleAddHolding = () => {
    if (newHolding.ticker && newHolding.quantity > 0 && newHolding.avgBuyPrice > 0) {
      setHoldings([...holdings, newHolding])
      setNewHolding({ ticker: '', quantity: 0, avgBuyPrice: 0, purchaseDate: '' })
    }
  }

  const handleRemoveHolding = (index: number) => {
    setHoldings(holdings.filter((_, i) => i !== index))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        const lines = text.split('\n')
        const parsedHoldings: Holding[] = []
        
        // Skip header row
        for (let i = 1; i < lines.length; i++) {
          const [ticker, quantity, avgBuyPrice, purchaseDate] = lines[i].split(',')
          if (ticker && quantity && avgBuyPrice) {
            parsedHoldings.push({
              ticker: ticker.trim(),
              quantity: parseFloat(quantity),
              avgBuyPrice: parseFloat(avgBuyPrice),
              purchaseDate: purchaseDate?.trim() || ''
            })
          }
        }
        
        setHoldings(parsedHoldings)
      }
      reader.readAsText(file)
    }
  }

  const downloadTemplate = () => {
    const csv = 'Ticker,Quantity,Avg Buy Price (₹),Buy Date,Purchase Date (last)\nRELIANCE,10,2500,dd-mm-yyyy\nTCS,5,3500,dd-mm-yyyy'
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'portfolio_template.csv'
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-[#2D3748] mb-1">Portfolio Cockpit</h3>
          <p className="text-base text-[#718096]">
            Enter your holdings manually or upload CSV — get 6-pillar health score, risk MCR and action plan
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-[#2E4D8E]/20">
        <button
          onClick={() => setActiveTab('holdings')}
          className={`px-4 py-2.5 font-semibold text-sm transition-all duration-200 border-b-2 ${
            activeTab === 'holdings'
              ? 'border-[#2E4D8E] text-[#2E4D8E]'
              : 'border-transparent text-[#718096] hover:text-[#2D3748]'
          }`}
        >
          Holdings
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`px-4 py-2.5 font-semibold text-sm transition-all duration-200 border-b-2 ${
            activeTab === 'results'
              ? 'border-[#2E4D8E] text-[#2E4D8E]'
              : 'border-transparent text-[#718096] hover:text-[#2D3748]'
          }`}
        >
          Portfolio Results
        </button>
        <button
          onClick={() => setActiveTab('risk')}
          className={`px-4 py-2.5 font-semibold text-sm transition-all duration-200 border-b-2 ${
            activeTab === 'risk'
              ? 'border-[#2E4D8E] text-[#2E4D8E]'
              : 'border-transparent text-[#718096] hover:text-[#2D3748]'
          }`}
        >
          Risk & MCR
        </button>
        <button
          onClick={() => setActiveTab('attribution')}
          className={`px-4 py-2.5 font-semibold text-sm transition-all duration-200 border-b-2 ${
            activeTab === 'attribution'
              ? 'border-[#2E4D8E] text-[#2E4D8E]'
              : 'border-transparent text-[#718096] hover:text-[#2D3748]'
          }`}
        >
          Attribution
        </button>
        <button
          onClick={() => setActiveTab('action')}
          className={`px-4 py-2.5 font-semibold text-sm transition-all duration-200 border-b-2 ${
            activeTab === 'action'
              ? 'border-[#2E4D8E] text-[#2E4D8E]'
              : 'border-transparent text-[#718096] hover:text-[#2D3748]'
          }`}
        >
          Action Plan
        </button>
      </div>

      {/* Holdings Tab */}
      {activeTab === 'holdings' && (
        <div className="space-y-6">
          {/* CSV Upload Section */}
          <div className="bg-white border-2 border-[#2E4D8E]/20 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-[#2D3748] mb-1">
                  CSV / Excel Upload — Section 2.1
                </h4>
                <p className="text-sm text-[#718096]">
                  Bulk Import: Ticker, Quantity, Buy Price, Buy Date, Purchase Date (last)
                </p>
              </div>
              <button
                onClick={downloadTemplate}
                className="flex items-center gap-2 px-4 py-2 bg-[#F8F9FB] hover:bg-[#0D7C8C] border-2 border-[#2E4D8E]/30 rounded-md text-sm font-semibold text-[#2D3748] transition-all duration-200"
              >
                <IconDownload className="w-4 h-4" stroke={1.5} />
                Download Template
              </button>
            </div>

            <div className="border-2 border-dashed border-[#2E4D8E]/30 rounded-xl p-8 text-center hover:border-[#2E4D8E]/50 transition-all duration-200">
              <input
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload" className="cursor-pointer">
                <IconUpload className="w-12 h-12 text-[#2E4D8E] mx-auto mb-3" stroke={1.5} />
                <p className="text-base font-semibold text-[#2D3748] mb-1">
                  Drop CSV or Excel file here or click to browse
                </p>
                <p className="text-sm text-[#718096]">
                  Columns: Ticker | Quantity | Buy Price | Buy Date (optional)
                </p>
              </label>
            </div>
          </div>

          {/* Manual Entry Section */}
          <div className="bg-white border-2 border-[#2E4D8E]/20 rounded-xl p-6">
            <h4 className="text-lg font-bold text-[#2D3748] mb-4">
              Enter each position, Ticker — use NSE symbol (e.g. TCS, HDFCBANK) or add .NS for full reference symbol. Purchase price is your actual buy price (used for P&L, XIRR, and tax-aware relationship).
            </h4>

            <div className="grid grid-cols-5 gap-3 mb-4">
              <div>
                <label className="text-sm font-semibold text-[#2D3748] mb-2 block">Ticker</label>
                <input
                  type="text"
                  value={newHolding.ticker}
                  onChange={(e) => setNewHolding({ ...newHolding, ticker: e.target.value.toUpperCase() })}
                  placeholder="RELIANCE"
                  className="w-full px-3 py-2 bg-white border border-[#2E4D8E]/20 rounded-md text-sm text-[#2D3748] placeholder:text-[#718096] focus:outline-none focus:border-[#2E4D8E]/40 focus:ring-1 focus:ring-[#2E4D8E]/20"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#2D3748] mb-2 block">Quantity</label>
                <input
                  type="number"
                  value={newHolding.quantity || ''}
                  onChange={(e) => setNewHolding({ ...newHolding, quantity: parseFloat(e.target.value) || 0 })}
                  placeholder="10"
                  className="w-full px-3 py-2 bg-white border border-[#2E4D8E]/20 rounded-md text-sm text-[#2D3748] placeholder:text-[#718096] focus:outline-none focus:border-[#2E4D8E]/40 focus:ring-1 focus:ring-[#2E4D8E]/20"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#2D3748] mb-2 block">Avg Buy Price (₹)</label>
                <input
                  type="number"
                  value={newHolding.avgBuyPrice || ''}
                  onChange={(e) => setNewHolding({ ...newHolding, avgBuyPrice: parseFloat(e.target.value) || 0 })}
                  placeholder="2500"
                  className="w-full px-3 py-2 bg-white border border-[#2E4D8E]/20 rounded-md text-sm text-[#2D3748] placeholder:text-[#718096] focus:outline-none focus:border-[#2E4D8E]/40 focus:ring-1 focus:ring-[#2E4D8E]/20"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#2D3748] mb-2 block">Purchase Date (last)</label>
                <input
                  type="date"
                  value={newHolding.purchaseDate}
                  onChange={(e) => setNewHolding({ ...newHolding, purchaseDate: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#2E4D8E]/20 rounded-md text-sm text-[#2D3748] focus:outline-none focus:border-[#2E4D8E]/40 focus:ring-1 focus:ring-[#2E4D8E]/20"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleAddHolding}
                  className="w-full px-4 py-2 bg-[#0D7C8C] hover:bg-[#2E4D8E] hover:text-white border-2 border-[#2E4D8E]/30 rounded-md text-sm font-semibold text-[#2D3748] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <IconPlus className="w-4 h-4" stroke={1.5} />
                  Add
                </button>
              </div>
            </div>

            {/* Holdings Table */}
            {holdings.length > 0 && (
              <div className="border border-[#2E4D8E]/20 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#F8F9FB]">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-bold text-[#2D3748]">Ticker</th>
                      <th className="px-4 py-3 text-right text-sm font-bold text-[#2D3748]">Quantity</th>
                      <th className="px-4 py-3 text-right text-sm font-bold text-[#2D3748]">Avg Buy Price</th>
                      <th className="px-4 py-3 text-right text-sm font-bold text-[#2D3748]">Investment</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-[#2D3748]">Date</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-[#2D3748]">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2E4D8E]/10">
                    {holdings.map((holding, index) => (
                      <tr key={index} className="hover:bg-[#F8F9FB] transition-colors">
                        <td className="px-4 py-3 text-sm font-semibold text-[#2D3748]">{holding.ticker}</td>
                        <td className="px-4 py-3 text-sm text-[#2D3748] text-right">{holding.quantity}</td>
                        <td className="px-4 py-3 text-sm text-[#2D3748] text-right">₹{holding.avgBuyPrice.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-[#2D3748] text-right">
                          ₹{(holding.quantity * holding.avgBuyPrice).toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-sm text-[#718096] text-center">
                          {holding.purchaseDate || '-'}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleRemoveHolding(index)}
                            className="p-1 hover:bg-[#8C1A1A]/10 rounded transition-colors"
                          >
                            <IconX className="w-4 h-4 text-[#8C1A1A]" stroke={1.5} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {holdings.length > 0 && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => onAnalyze?.(holdings)}
                  className="px-6 py-3 bg-[#0D7C8C] hover:bg-[#2E4D8E] hover:text-white border-2 border-[#2E4D8E]/30 rounded-md text-base font-semibold text-[#2D3748] transition-all duration-200"
                >
                  Analyze Portfolio →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Other tabs placeholder */}
      {activeTab !== 'holdings' && (
        <div className="bg-white border-2 border-[#2E4D8E]/20 rounded-xl p-12 text-center">
          <p className="text-lg text-[#718096]">
            Add holdings first to see {activeTab} analysis
          </p>
        </div>
      )}
    </div>
  )
}

