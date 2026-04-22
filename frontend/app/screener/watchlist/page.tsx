'use client'

import { useState } from 'react'
import ScreenerSidebar from '@/components/screener/ScreenerSidebar'
import { IconStar, IconStarFilled, IconTrendingUp, IconTrendingDown, IconRefresh, IconPlus, IconTrash } from '@tabler/icons-react'

export default function WatchlistPage() {
  const [watchlistStocks, setWatchlistStocks] = useState([
    {
      id: 1,
      symbol: 'TECHM',
      name: 'Tech Mahindra',
      price: 1462.60,
      change: -15.40,
      changePercent: -1.04,
      signal: 'SELL',
      confidence: 86,
      pattern: 'Rising Wedge',
      addedDate: '2026-04-20'
    },
    {
      id: 2,
      symbol: 'HINDUNILVR',
      name: 'Hindustan Unilever',
      price: 2368.80,
      change: 38.10,
      changePercent: 1.63,
      signal: 'BUY',
      confidence: 80,
      pattern: 'Inverse Head & Shoulders',
      addedDate: '2026-04-19'
    },
    {
      id: 3,
      symbol: 'RELIANCE',
      name: 'Reliance Industries',
      price: 2450.50,
      change: 12.30,
      changePercent: 0.50,
      signal: 'BUY',
      confidence: 78,
      pattern: 'Double Bottom',
      addedDate: '2026-04-18'
    }
  ])

  const [newStock, setNewStock] = useState('')

  const removeFromWatchlist = (id: number) => {
    setWatchlistStocks(prev => prev.filter(stock => stock.id !== id))
  }

  const addToWatchlist = () => {
    if (newStock.trim()) {
      const newId = Math.max(...watchlistStocks.map(s => s.id)) + 1
      setWatchlistStocks(prev => [...prev, {
        id: newId,
        symbol: newStock.toUpperCase(),
        name: `${newStock.toUpperCase()} Company`,
        price: 0,
        change: 0,
        changePercent: 0,
        signal: 'HOLD',
        confidence: 0,
        pattern: 'Analyzing...',
        addedDate: new Date().toISOString().split('T')[0]
      }])
      setNewStock('')
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

  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      <ScreenerSidebar />

      <div className="flex-1 ml-64">
        {/* Header */}
        <div className="bg-white border-b border-[#E2E8F0] px-8 py-6">
          <h1 className="text-3xl font-black text-[#1B2A4A] mb-2">Your Watchlist</h1>
          <p className="text-sm text-[#718096]">
            Track your favorite stocks and monitor their signals in real-time.
          </p>
        </div>

        <div className="p-8 space-y-6">
          {/* Add Stock Section */}
          <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
            <h3 className="text-lg font-bold text-[#1B2A4A] mb-4">Add Stock to Watchlist</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                  placeholder="Enter stock symbol (e.g., INFY, TCS, HDFC)"
                  className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-[#0D7C8C]"
                  onKeyPress={(e) => e.key === 'Enter' && addToWatchlist()}
                />
              </div>
              <button
                onClick={addToWatchlist}
                className="px-6 py-3 bg-[#0D7C8C] text-white rounded-lg text-sm font-bold hover:bg-[#0B6B7A] transition-all flex items-center gap-2"
              >
                <IconPlus className="w-4 h-4" />
                Add Stock
              </button>
            </div>
          </div>

          {/* Watchlist Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-bold text-[#1B2A4A]">
                Watchlist ({watchlistStocks.length} stocks)
              </h3>
              <button className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm font-bold text-[#718096] hover:border-[#0D7C8C] transition-all flex items-center gap-2">
                <IconRefresh className="w-4 h-4" />
                Refresh Prices
              </button>
            </div>
          </div>

          {/* Watchlist Table */}
          {watchlistStocks.length > 0 ? (
            <div className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8F9FB] border-b border-[#E2E8F0]">
                    <tr>
                      <th className="text-left py-4 px-6 text-xs font-bold text-[#718096] uppercase tracking-wider">STOCK</th>
                      <th className="text-right py-4 px-6 text-xs font-bold text-[#718096] uppercase tracking-wider">PRICE</th>
                      <th className="text-right py-4 px-6 text-xs font-bold text-[#718096] uppercase tracking-wider">CHANGE</th>
                      <th className="text-center py-4 px-6 text-xs font-bold text-[#718096] uppercase tracking-wider">SIGNAL</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-[#718096] uppercase tracking-wider">PATTERN</th>
                      <th className="text-center py-4 px-6 text-xs font-bold text-[#718096] uppercase tracking-wider">CONFIDENCE</th>
                      <th className="text-center py-4 px-6 text-xs font-bold text-[#718096] uppercase tracking-wider">ADDED</th>
                      <th className="text-center py-4 px-6 text-xs font-bold text-[#718096] uppercase tracking-wider">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {watchlistStocks.map((stock, index) => (
                      <tr key={stock.id} className={`border-b border-[#E2E8F0] hover:bg-[#F8F9FB] transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFC]'}`}>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <IconStarFilled className="w-5 h-5 text-[#F59E0B]" />
                            <div>
                              <div className="text-base font-bold text-[#1B2A4A]">{stock.symbol}</div>
                              <div className="text-sm text-[#718096]">{stock.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="text-sm font-bold text-[#2D3748]">₹{stock.price.toFixed(2)}</div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className={`text-sm font-bold ${getChangeColor(stock.change)} flex items-center justify-end gap-1`}>
                            {stock.change >= 0 ? <IconTrendingUp className="w-4 h-4" /> : <IconTrendingDown className="w-4 h-4" />}
                            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={`px-3 py-1 rounded text-xs font-bold ${getSignalColor(stock.signal)}`}>
                            {stock.signal}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm text-[#2D3748]">{stock.pattern}</div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center">
                            <div className="w-12 bg-[#E2E8F0] rounded-full h-2 mr-2">
                              <div 
                                className="h-2 rounded-full bg-[#0D7C8C]"
                                style={{ width: `${stock.confidence}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-bold text-[#2D3748]">{stock.confidence}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="text-sm text-[#718096]">{stock.addedDate}</div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => removeFromWatchlist(stock.id)}
                            className="p-2 text-[#EF4444] hover:bg-[#FEE2E2] rounded-lg transition-all"
                            title="Remove from watchlist"
                          >
                            <IconTrash className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-lg border border-[#E2E8F0] p-12 text-center">
              <IconStar className="w-16 h-16 text-[#718096] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1B2A4A] mb-2">Your Watchlist is Empty</h3>
              <p className="text-[#718096] mb-6">
                Add stocks to your watchlist to track their performance and signals.
              </p>
              <p className="text-sm text-[#718096]">
                Click ★ on any signal card from other screener pages to add stocks here.
              </p>
            </div>
          )}

          {/* Summary Stats */}
          {watchlistStocks.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-lg border border-[#E2E8F0] p-5">
                <div className="text-xs text-[#718096] mb-2 uppercase tracking-wide">TOTAL STOCKS</div>
                <div className="text-3xl font-black text-[#1B2A4A]">{watchlistStocks.length}</div>
              </div>
              
              <div className="bg-white rounded-lg border border-[#E2E8F0] p-5">
                <div className="text-xs text-[#718096] mb-2 uppercase tracking-wide">BUY SIGNALS</div>
                <div className="text-3xl font-black text-[#10B981]">
                  {watchlistStocks.filter(s => s.signal === 'BUY').length}
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-[#E2E8F0] p-5">
                <div className="text-xs text-[#718096] mb-2 uppercase tracking-wide">SELL SIGNALS</div>
                <div className="text-3xl font-black text-[#EF4444]">
                  {watchlistStocks.filter(s => s.signal === 'SELL').length}
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-[#E2E8F0] p-5">
                <div className="text-xs text-[#718096] mb-2 uppercase tracking-wide">AVG CONFIDENCE</div>
                <div className="text-3xl font-black text-[#1B2A4A]">
                  {watchlistStocks.length > 0 ? Math.round(watchlistStocks.reduce((acc, s) => acc + s.confidence, 0) / watchlistStocks.length) : 0}%
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}