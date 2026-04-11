'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconX, IconPlus, IconRefresh } from '@tabler/icons-react'

interface WatchlistProps {
}

interface Stock {
  symbol: string
  name: string
  price: string
  change: string
  positive: boolean
  trend: number[]
}

const initialStocks: Stock[] = [
  { symbol: 'INFY.NS', name: 'Infosys Limited', price: '₹1300.80', change: '+1.97%', positive: true, trend: [10, 15, 20, 25, 30, 35, 40, 45, 48, 52] },
  { symbol: 'TCS.NS', name: 'Tata Consultancy Services Limited', price: '₹2450.70', change: '+1.76%', positive: true, trend: [15, 20, 18, 25, 30, 28, 35, 40, 42, 48] },
  { symbol: 'HDFCBANK.NS', name: 'HDFC Bank Limited', price: '₹750.90', change: '+1.17%', positive: true, trend: [25, 22, 28, 30, 27, 32, 35, 38, 40, 45] },
  { symbol: 'ICICIBANK.NS', name: 'ICICI Bank Limited', price: '₹1215.80', change: '+0.26%', positive: true, trend: [30, 32, 31, 33, 35, 34, 36, 38, 37, 39] },
  { symbol: 'RELIANCE.NS', name: 'Reliance Industries Limited', price: '₹1350.50', change: '-1.37%', positive: false, trend: [50, 48, 45, 42, 40, 38, 35, 30, 28, 25] },
]

export default function Watchlist({}: WatchlistProps) {
  const [watchlistStocks, setWatchlistStocks] = useState<Stock[]>(initialStocks)
  const [newTicker, setNewTicker] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()

  const handleRemoveStock = (symbol: string) => {
    setWatchlistStocks(watchlistStocks.filter(stock => stock.symbol !== symbol))
  }

  const handleTickerClick = (symbol: string) => {
    console.log('Navigating to loading page for:', symbol)
    router.push(`/loading?ticker=${symbol}`)
  }

  const handleAddStock = () => {
    if (newTicker.trim()) {
      const newStock: Stock = {
        symbol: newTicker.toUpperCase(),
        name: `${newTicker.toUpperCase()} Company`,
        price: '₹' + (Math.random() * 3000 + 500).toFixed(2),
        change: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 5).toFixed(2) + '%',
        positive: Math.random() > 0.5,
        trend: Array.from({ length: 10 }, () => Math.random() * 50 + 10)
      }
      setWatchlistStocks([...watchlistStocks, newStock])
      setNewTicker('')
    }
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const handleAnalyseAll = () => {
    alert('Analyzing all stocks in watchlist...')
  }

  const generatePath = (trend: number[]) => {
    const width = 80
    const height = 30
    const points = trend.map((value, index) => {
      const x = (index / (trend.length - 1)) * width
      const y = height - (value / 60) * height
      return `${x},${y}`
    })
    return `M ${points.join(' L ')}`
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-2xl font-jakarta font-bold text-[#1F2933] mb-1">Watchlist</h4>
          <p className="text-base font-jakarta text-[#6B7280]">Track your favorite stocks in real time</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleAnalyseAll}
            className="px-5 py-2.5 bg-[#A7C4A0] border-2 border-[#6A994E]/30 hover:bg-[#6A994E] hover:text-white rounded-md text-sm font-jakarta font-semibold text-[#1F2933] transition-all duration-200"
          >
            Analyse all
          </button>
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2.5 hover:bg-[#F4F7F2] rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <IconRefresh className={`w-5 h-5 text-[#6B7280] group-hover:text-[#6A994E] transition-colors duration-200 ${isRefreshing ? 'animate-spin' : ''}`} stroke={1.5} />
          </button>
        </div>
      </div>

      {/* Add ticker input */}
      <div className="relative">
        <input
          type="text"
          value={newTicker}
          onChange={(e) => setNewTicker(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddStock()}
          placeholder="Add ticker (e.g. TCS, AAPL)..."
          className="w-full px-4 py-2.5 bg-white border border-[#6A994E]/20 rounded-md text-sm font-jakarta text-[#1F2933] placeholder:text-[#6B7280] focus:outline-none focus:border-[#6A994E]/40 focus:ring-1 focus:ring-[#6A994E]/20 transition-all duration-200"
        />
        <button 
          onClick={handleAddStock}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#A7C4A0] hover:bg-[#6A994E] hover:text-white border-2 border-[#6A994E]/30 rounded-md text-xs font-jakarta font-semibold text-[#1F2933] transition-all duration-200 flex items-center gap-1.5"
        >
          <IconPlus className="w-3.5 h-3.5" stroke={1.5} />
          Add
        </button>
      </div>

      {/* Ticker chips */}
      <div className="flex items-center gap-2 flex-wrap">
        {watchlistStocks.map((stock, index) => (
          <button
            key={index}
            onClick={() => handleTickerClick(stock.symbol)}
            className={`px-3 py-1.5 rounded-md text-xs font-jakarta font-semibold transition-colors duration-200 cursor-pointer border-2 ${
              stock.positive
                ? 'bg-[#6A994E]/10 text-[#6A994E] border-[#6A994E]/30 hover:bg-[#6A994E]/20'
                : 'bg-[#BC4749]/10 text-[#BC4749] border-[#BC4749]/30 hover:bg-[#BC4749]/20'
            }`}
          >
            {stock.symbol}
            <span className="ml-1.5">{stock.change}</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#6A994E]/20 rounded-xl overflow-hidden shadow-sm">
        {/* Table header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-[#F4F7F2] border-b border-[#6A994E]/10">
          <div className="col-span-2 text-sm font-jakarta font-bold text-[#1F2933] uppercase tracking-wider">Ticker</div>
          <div className="col-span-4 text-sm font-jakarta font-bold text-[#1F2933] uppercase tracking-wider">Name</div>
          <div className="col-span-2 text-sm font-jakarta font-bold text-[#1F2933] uppercase tracking-wider text-right">Price</div>
          <div className="col-span-2 text-sm font-jakarta font-bold text-[#1F2933] uppercase tracking-wider text-right">5d Change</div>
          <div className="col-span-2 text-sm font-jakarta font-bold text-[#1F2933] uppercase tracking-wider text-center">Trend</div>
        </div>

        {/* Table rows */}
        <div className="divide-y divide-[#6A994E]/10">
          {watchlistStocks.map((stock, index) => (
            <div
              key={index}
              onClick={() => handleTickerClick(stock.symbol)}
              className="grid grid-cols-12 gap-4 px-4 py-3.5 hover:bg-[#F4F7F2] transition-colors duration-200 group cursor-pointer"
            >
              {/* Ticker */}
              <div className="col-span-2 flex items-center gap-2">
                <span className="text-base font-jakarta font-semibold text-[#1F2933]">{stock.symbol}</span>
              </div>

              {/* Name */}
              <div className="col-span-4 flex items-center">
                <span className="text-sm font-jakarta text-[#6B7280]">{stock.name}</span>
              </div>

              {/* Price */}
              <div className="col-span-2 flex items-center justify-end">
                <span className="text-base font-jakarta font-semibold text-[#1F2933]">{stock.price}</span>
              </div>

              {/* 5d Change */}
              <div className="col-span-2 flex items-center justify-end">
                <span className={`text-base font-jakarta font-bold ${
                  stock.positive ? 'text-[#6A994E]' : 'text-[#BC4749]'
                }`}>
                  {stock.change}
                </span>
              </div>

              {/* Trend */}
              <div className="col-span-2 flex items-center justify-center gap-2">
                <div className="w-20 h-8">
                  <svg width="100%" height="100%" viewBox="0 0 80 30" preserveAspectRatio="none">
                    <path
                      d={generatePath(stock.trend)}
                      fill="none"
                      stroke={stock.positive ? '#6A994E' : '#BC4749'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveStock(stock.symbol)
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[#BC4749]/10 rounded transition-all duration-200"
                >
                  <IconX className="w-3.5 h-3.5 text-[#6B7280] hover:text-[#BC4749]" stroke={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
