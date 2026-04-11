'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { IconArrowUp, IconArrowDown, IconChartBar, IconFileTypePdf } from '@tabler/icons-react'
import LightweightAreaChart from '@/components/charts/LightweightAreaChart'
import DashboardNavbar from '@/components/dashboard/DashboardNavbar'
import { createClient } from '@/authentication/lib/supabase/client'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { useStockQuote, useHistoricalData } from '@/hooks/useYahooFinance'

export default function StockDetailPage() {
  const params = useParams()
  const router = useRouter()
  const symbol = params.symbol as string
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('1D')
  const [corporateSubTab, setCorporateSubTab] = useState(0)
  const [showMoreDropdown, setShowMoreDropdown] = useState(false)
  const supabase = createClient()

  // Fetch real stock data from Yahoo Finance
  const { data: stockQuote, loading: stockLoading } = useStockQuote(symbol, 30000)
  
  // Map period to Yahoo Finance range format
  const periodToRange: { [key: string]: '1d' | '5d' | '1mo' | '3mo' | '6mo' | '1y' | '5y' } = {
    '1D': '1d',
    '1W': '5d',
    '1M': '1mo',
    '3M': '3mo',
    '6M': '6mo',
    '1Y': '1y',
    '5Y': '5y',
  }
  
  const { data: historicalData, loading: histLoading, error: histError } = useHistoricalData(symbol, periodToRange[selectedPeriod] || '1d')

  // Debug logging
  useEffect(() => {
    console.log('Historical Data:', historicalData)
    console.log('Historical Data Length:', historicalData?.length)
    console.log('Historical Error:', histError)
  }, [historicalData, histError])

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      // Allow access without authentication - just set user if logged in
      setUser(user)
      setLoading(false)
    }

    getUser()
  }, [supabase])

  // Transform real stock data to match UI format
  const stock = stockQuote ? {
    name: stockQuote.name,
    isin: 'INE000000000', // ISIN not available from Yahoo Finance
    price: stockQuote.price,
    change: stockQuote.change,
    changePercent: stockQuote.changePercent,
    prevClose: stockQuote.previousClose,
    open: stockQuote.open,
    high: stockQuote.dayHigh,
    low: stockQuote.dayLow,
    close: stockQuote.price,
    vwap: ((stockQuote.dayHigh + stockQuote.dayLow + stockQuote.price) / 3), // Approximate VWAP
    adjustedPrice: '-',
  } : {
    name: 'Loading...',
    isin: '-',
    price: 0,
    change: 0,
    changePercent: 0,
    prevClose: 0,
    open: 0,
    high: 0,
    low: 0,
    close: 0,
    vwap: 0,
    adjustedPrice: '-',
  }

  const isPositive = stock.change >= 0

  // Convert historical data to chart format
  const getChartData = () => {
    if (!historicalData || historicalData.length === 0) {
      return []
    }

    return historicalData.map(point => ({
      time: Math.floor(new Date(point.date).getTime() / 1000),
      value: point.close,
    }))
  }

  const chartData = getChartData()
  const baseValue = stock.prevClose
  
  const periods = ['1D', '1W', '1M', '3M', '6M', '1Y', '5Y']

  if (loading || stockLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7F2]">
        <div className="text-[#1F2933] font-jakarta">Loading real stock data...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F7F2]">
      {/* Dashboard Navbar */}
      <DashboardNavbar user={user} />

      {/* Main Content */}
      <div className="px-6 py-4">
        
        {/* Compact Stock Header */}
        <div className="bg-white rounded-lg border border-[#5A8A4E]/20 p-4 mb-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="text-3xl font-jakarta font-black text-[#1F2933]">
                    {stock.price.toFixed(2)}
                  </div>
                  <div className={`flex items-center gap-1 text-base font-jakarta font-semibold ${isPositive ? 'text-[#6B9E5D]' : 'text-[#C85A54]'}`}>
                    {isPositive ? <IconArrowUp className="w-4 h-4" stroke={2.5} /> : <IconArrowDown className="w-4 h-4" stroke={2.5} />}
                    {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                  </div>
                </div>
                <h1 className="text-sm font-jakarta font-bold text-[#1F2933]">
                  {stock.name} ({stock.isin})
                </h1>
              </div>
              
              <div className="border-l border-[#E5E7EB] pl-6">
                <div className="text-xs text-[#6B7280] font-jakarta mb-1">Close</div>
                <div className="text-xl font-jakarta font-bold text-[#1F2933]">{stock.close.toFixed(2)}</div>
                <div className={`text-sm font-jakarta font-semibold ${isPositive ? 'text-[#6B9E5D]' : 'text-[#C85A54]'}`}>
                  {isPositive ? '+' : ''}{(stock.close - stock.prevClose).toFixed(2)} ({((stock.close - stock.prevClose) / stock.prevClose * 100).toFixed(2)}%)
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-[#6B7280] font-jakarta mb-2">
                As on {new Date().toLocaleString('en-IN', { 
                  day: '2-digit', 
                  month: 'short', 
                  year: 'numeric', 
                  hour: '2-digit', 
                  minute: '2-digit',
                  second: '2-digit',
                  timeZone: 'Asia/Kolkata'
                })} IST
                <span className="ml-2 inline-flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#6B9E5D] rounded-full animate-pulse"></span>
                  <span className="text-[#6B9E5D] font-semibold">LIVE</span>
                </span>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-[#A7C4A0] text-[#1F2933] rounded text-xs font-jakarta font-bold">
                  EQ
                </span>
                <span className="px-3 py-1 bg-[#A7C4A0] text-[#1F2933] rounded text-xs font-jakarta font-bold">
                  T0
                </span>
              </div>
            </div>
          </div>

          {/* Additional Series Buttons */}
          <div className="flex gap-2">
            <a 
              href={`https://www.nseindia.com/get-quotes/equity?symbol=${symbol}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-[#F4F7F2] text-[#1F2933] rounded text-xs font-jakarta font-semibold hover:bg-[#E5E7EB] cursor-pointer relative z-10"
            >
              Equity
            </a>
            <a 
              href={`https://www.nseindia.com/get-quotes/derivatives?symbol=${symbol}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-[#F4F7F2] text-[#1F2933] rounded text-xs font-jakarta font-semibold hover:bg-[#E5E7EB] cursor-pointer relative z-10"
            >
              Derivatives
            </a>
            <a 
              href="https://www.nseindia.com/option-chain"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-[#F4F7F2] text-[#1F2933] rounded text-xs font-jakarta font-semibold hover:bg-[#E5E7EB] cursor-pointer relative z-10"
            >
              Option Chain
            </a>
            <a 
              href="https://www.nseindia.com/market-data/securities-lending-borrowing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-[#F4F7F2] text-[#1F2933] rounded text-xs font-jakarta font-semibold hover:bg-[#E5E7EB] cursor-pointer relative z-10"
            >
              SLB
            </a>
          </div>
        </div>

        {/* Compact OHLC + Chart + Order Book */}
        <div className="grid grid-cols-3 gap-3">
          
          {/* Left: Chart Section */}
          <div className="col-span-2 bg-white rounded-lg border border-[#5A8A4E]/20 p-4">
            
            {/* Compact OHLC in One Row */}
            <div className="grid grid-cols-7 gap-3 mb-3 text-xs">
              <div>
                <div className="text-[#6B7280] font-jakarta mb-0.5">Prev. Close</div>
                <div className="font-jakarta font-bold text-[#1F2933]">{stock.prevClose.toFixed(2)}</div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-[#6B7280] font-jakarta mb-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6B7280]"></div>
                  Open
                </div>
                <div className="font-jakarta font-bold text-[#1F2933]">{stock.open.toFixed(2)}</div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-[#6B7280] font-jakarta mb-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6B9E5D]"></div>
                  High
                </div>
                <div className="font-jakarta font-bold text-[#6B9E5D]">{stock.high.toFixed(2)}</div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-[#6B7280] font-jakarta mb-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C85A54]"></div>
                  Low
                </div>
                <div className="font-jakarta font-bold text-[#C85A54]">{stock.low.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-[#6B7280] font-jakarta mb-0.5">Close *</div>
                <div className="font-jakarta font-bold text-[#1F2933]">{stock.close.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-[#6B7280] font-jakarta mb-0.5">VWAP</div>
                <div className="font-jakarta font-bold text-[#1F2933]">{stock.vwap.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-[#6B7280] font-jakarta mb-0.5">Adjusted Price *</div>
                <div className="font-jakarta font-bold text-[#1F2933]">{stock.adjustedPrice}</div>
              </div>
            </div>

            {/* Chart with Integrated Time Buttons */}
            <div className="relative">
              <div className="absolute top-2 right-2 z-10 flex gap-1">
                {periods.map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-2 py-1 rounded text-xs font-jakarta font-semibold transition-all ${
                      selectedPeriod === period
                        ? 'bg-[#A7C4A0] text-[#1F2933]'
                        : 'bg-white/80 text-[#6B7280] hover:bg-white'
                    }`}
                  >
                    {period}
                  </button>
                ))}
                <button className="px-2 py-1 rounded text-xs font-jakarta font-semibold bg-white/80 text-[#6B7280] hover:bg-white">
                  <IconChartBar className="w-3 h-3" stroke={1.5} />
                </button>
              </div>
              
              {chartData.length > 0 ? (
                <LightweightAreaChart data={chartData} height={350} isPositive={isPositive} />
              ) : (
                <div className="flex items-center justify-center bg-[#F4F7F2] rounded-lg border border-[#5A8A4E]/10" style={{ height: '350px' }}>
                  <div className="text-center">
                    <div className="text-[#6B7280] font-jakarta mb-2">
                      {histLoading ? 'Loading chart data...' : histError ? `Error: ${histError}` : 'No chart data available'}
                    </div>
                    <div className="text-xs text-[#6B7280] font-jakarta">
                      Try selecting a different time period
                    </div>
                  </div>
                </div>
              )}
              
              <div className="text-xs text-[#6B7280] font-jakarta mt-1">
                Note: Prices on the graph are historically not adjusted for corporate actions.
              </div>
            </div>

          </div>



          {/* Right: Compact Order Book */}
          <div className="bg-white rounded-lg border border-[#5A8A4E]/20 p-4">
            <h3 className="text-base font-jakarta font-black text-[#1F2933] mb-3">Order Book</h3>
            
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#A7C4A0] text-[#1F2933]">
                  <th className="text-left py-1.5 px-2 font-jakarta font-bold">Qty</th>
                  <th className="text-center py-1.5 px-2 font-jakarta font-bold">Bid (₹)</th>
                  <th className="text-center py-1.5 px-2 font-jakarta font-bold">Ask (₹)</th>
                  <th className="text-right py-1.5 px-2 font-jakarta font-bold">Qty</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <tr key={index} className="border-b border-[#E5E7EB]">
                    <td className="py-1.5 px-2 font-jakarta text-[#1F2933] text-center">-</td>
                    <td className="py-1.5 px-2 font-jakarta text-[#1F2933] text-center">-</td>
                    <td className="py-1.5 px-2 font-jakarta text-[#1F2933] text-center">-</td>
                    <td className="py-1.5 px-2 font-jakarta text-[#1F2933] text-center">-</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 pt-3 border-t border-[#E5E7EB] space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280] font-jakarta">% Buy</span>
                <span className="text-[#6B9E5D] font-jakarta font-bold">-</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280] font-jakarta">% Sell</span>
                <span className="text-[#C85A54] font-jakarta font-bold">-</span>
              </div>
              
              <div className="text-center pt-2">
                <div className="text-[#6B7280] font-jakarta mb-0.5">Total Quantity</div>
                <div className="text-base font-jakarta font-black text-[#1F2933]">-</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stock Details Section - Below Order Book */}
        <div className="col-span-3 bg-white rounded-lg border border-[#5A8A4E]/20 overflow-hidden mt-3">
          {/* Header with Stock Info */}
          <div className="flex items-center justify-between p-4 border-b border-[#5A8A4E]/20">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#6B9E5D] rounded-full"></div>
                <div className="w-2 h-2 bg-[#E5C76A] rounded-full"></div>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-jakarta font-black text-[#1F2933]">{symbol}</span>
                  <span className="text-2xl font-jakarta font-black text-[#1F2933]">{stock.price.toFixed(2)}</span>
                  <span className={`text-sm font-jakarta font-semibold ${isPositive ? 'text-[#6B9E5D]' : 'text-[#C85A54]'}`}>
                    {isPositive ? '▲' : '▼'} {Math.abs(stock.change).toFixed(2)}({Math.abs(stock.changePercent).toFixed(2)}%)
                  </span>
                  <button className="w-5 h-5 rounded-full bg-[#F4F7F2] flex items-center justify-center hover:bg-[#E5E7EB]">
                    <span className="text-xs text-[#6B7280]">?</span>
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-[#6B7280] font-jakarta">Close</span>
                  <span className="text-sm font-jakarta font-bold text-[#1F2933]">{stock.close.toFixed(2)}</span>
                  <span className={`text-sm font-jakarta font-semibold ${(stock.close - stock.prevClose) >= 0 ? 'text-[#6B9E5D]' : 'text-[#C85A54]'}`}>
                    {(stock.close - stock.prevClose).toFixed(2)}({((stock.close - stock.prevClose) / stock.prevClose * 100).toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stock Absolute Returns & NIFTY 50 Absolute Returns */}
          <div className="grid grid-cols-2 gap-0 border-b border-[#5A8A4E]/20">
            {/* Stock Absolute Returns */}
            <div className="border-r border-[#5A8A4E]/20 p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-[#6B9E5D] rounded-full"></div>
                <span className="text-sm font-jakarta font-bold text-[#1F2933]">Stock Absolute Returns</span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                <div className="text-center">
                  <div className="text-xs text-[#6B7280] font-jakarta mb-1">1W</div>
                  <div className="px-2 py-1 bg-[#6B9E5D] rounded text-xs font-jakarta font-bold text-white">7.83%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-[#6B7280] font-jakarta mb-1">1M</div>
                  <div className="px-2 py-1 bg-[#6B9E5D] rounded text-xs font-jakarta font-bold text-white">3.55%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-[#6B7280] font-jakarta mb-1">YTD</div>
                  <div className="px-2 py-1 bg-[#C85A54] rounded text-xs font-jakarta font-bold text-white">-0.55%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-[#6B7280] font-jakarta mb-1">1Y</div>
                  <div className="px-2 py-1 bg-[#C85A54] rounded text-xs font-jakarta font-bold text-white">-21.16%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-[#6B7280] font-jakarta mb-1">3Y</div>
                  <div className="px-2 py-1 bg-[#C85A54] rounded text-xs font-jakarta font-bold text-white">-21.03%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-[#6B7280] font-jakarta mb-1">5Y</div>
                  <div className="px-2 py-1 bg-[#C85A54] rounded text-xs font-jakarta font-bold text-white">-22.25%</div>
                </div>
              </div>
            </div>

            {/* NIFTY 50 Absolute Returns */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-[#E5C76A] rounded-full"></div>
                <span className="text-sm font-jakarta font-bold text-[#1F2933]">NIFTY 50 Absolute Returns</span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                <div className="text-center">
                  <div className="text-xs text-[#6B7280] font-jakarta mb-1">1W</div>
                  <div className="px-2 py-1 bg-[#F4F7F2] rounded text-xs font-jakarta font-bold text-[#1F2933]">-</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-[#6B7280] font-jakarta mb-1">1M</div>
                  <div className="px-2 py-1 bg-[#C85A54] rounded text-xs font-jakarta font-bold text-white">-5.43%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-[#6B7280] font-jakarta mb-1">YTD</div>
                  <div className="px-2 py-1 bg-[#C85A54] rounded text-xs font-jakarta font-bold text-white">-11.56%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-[#6B7280] font-jakarta mb-1">1Y</div>
                  <div className="px-2 py-1 bg-[#C85A54] rounded text-xs font-jakarta font-bold text-white">-22.31%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-[#6B7280] font-jakarta mb-1">3Y</div>
                  <div className="px-2 py-1 bg-[#6B9E5D] rounded text-xs font-jakarta font-bold text-white">31.39%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-[#6B7280] font-jakarta mb-1">5Y</div>
                  <div className="px-2 py-1 bg-[#6B9E5D] rounded text-xs font-jakarta font-bold text-white">96.04%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Three Column Section: Trade Information, Price Information, Securities Information */}
          <div className="grid grid-cols-3 gap-0">
            
            {/* Trade Information */}
            <div className="border-r border-[#5A8A4E]/20 p-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] font-jakarta">Traded Volume (Lakhs)</span>
                  <span className="text-[#1F2933] font-jakarta font-semibold">46.17</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] font-jakarta">Total Market Cap (₹ Cr.)</span>
                  <span className="text-[#1F2933] font-jakarta font-semibold">9,20,200.18</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] font-jakarta">Impact cost</span>
                  <span className="text-[#1F2933] font-jakarta font-semibold">0.02</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] font-jakarta flex items-center gap-1">
                    Applicable Margin Rate
                    <button className="w-3 h-3 rounded-full bg-[#F4F7F2] flex items-center justify-center">
                      <span className="text-[10px] text-[#6B7280]">?</span>
                    </button>
                  </span>
                  <span className="text-[#1F2933] font-jakarta font-semibold">12.50</span>
                </div>
                <div className="pt-2 border-t border-[#E5E7EB]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280] font-jakarta">Traded Value (₹ Cr.)</span>
                    <span className="text-[#1F2933] font-jakarta font-semibold">1,139.39</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] font-jakarta">Free Float Market Cap (₹ Cr.)</span>
                  <span className="text-[#1F2933] font-jakarta font-semibold">2,59,003.18</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] font-jakarta">Face Value</span>
                  <span className="text-[#1F2933] font-jakarta font-semibold">1.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] font-jakarta flex items-center gap-1">
                    % of Deliverable / Traded Quantity
                    <button className="w-3 h-3 rounded-full bg-[#F4F7F2] flex items-center justify-center">
                      <span className="text-[10px] text-[#6B7280]">?</span>
                    </button>
                  </span>
                  <span className="text-[#1F2933] font-jakarta font-semibold">50.93%</span>
                </div>
              </div>
            </div>

            {/* Price Information */}
            <div className="border-r border-[#5A8A4E]/20 p-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] font-jakarta">Week High (52-Mar-2026)</span>
                  <span className="text-[#1F2933] font-jakarta font-semibold">3,630.50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] font-jakarta">Upper Band</span>
                  <span className="text-[#1F2933] font-jakarta font-semibold">2,793.70</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] font-jakarta">Price Band (%)</span>
                  <span className="text-[#1F2933] font-jakarta font-semibold">No Band</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] font-jakarta">Daily Volatility</span>
                  <span className="text-[#1F2933] font-jakarta font-semibold">1.41</span>
                </div>
                <div className="pt-2 border-t border-[#E5E7EB]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280] font-jakarta">52 Week Low (30-Nov-2026)</span>
                    <span className="text-[#1F2933] font-jakarta font-semibold">2,346.20</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] font-jakarta">Lower Band</span>
                  <span className="text-[#1F2933] font-jakarta font-semibold">2,285.90</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] font-jakarta">Tick Size</span>
                  <span className="text-[#1F2933] font-jakarta font-semibold">0.10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] font-jakarta">Annualised Volatility</span>
                  <span className="text-[#1F2933] font-jakarta font-semibold">26.94</span>
                </div>
              </div>
            </div>

            {/* Securities Information */}
            <div className="p-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] font-jakarta">Status</span>
                  <span className="text-[#1F2933] font-jakarta font-semibold">Listed</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] font-jakarta">Symbol P/F</span>
                  <span className="text-[#1F2933] font-jakarta font-semibold">18.86</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] font-jakarta">Date of Listing</span>
                  <span className="text-[#1F2933] font-jakarta font-semibold">25-Aug-2004</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] font-jakarta flex items-center gap-1">
                    Basic Industry
                    <button className="w-3 h-3 rounded-full bg-[#F4F7F2] flex items-center justify-center">
                      <span className="text-[10px] text-[#6B7280]">?</span>
                    </button>
                  </span>
                  <span className="text-[#1F2933] font-jakarta font-semibold text-right">Computers - Software & Consulting</span>
                </div>
                <div className="pt-2 border-t border-[#E5E7EB]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280] font-jakarta">Trading Status</span>
                    <span className="text-[#1F2933] font-jakarta font-semibold">Active</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] font-jakarta">Adjusted P/F</span>
                  <span className="text-[#1F2933] font-jakarta font-semibold">17.42</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280] font-jakarta flex items-center gap-1">
                    Index
                    <button className="w-3 h-3 rounded-full bg-[#F4F7F2] flex items-center justify-center">
                      <span className="text-[10px] text-[#6B7280]">?</span>
                    </button>
                  </span>
                  <span className="text-[#1F2933] font-jakarta font-semibold">NIFTY 50</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Corporate Announcements Tabs Section - Full Width Below Stock Details */}
        <div className="bg-white rounded-lg border border-[#5A8A4E]/20 overflow-hidden mt-3">
          <div className="p-4">
            {/* Sub-tabs for Corporate Info */}
            <div className="flex gap-0 border-b border-[#E5E7EB] mb-4 relative">
              <button 
                onClick={() => setCorporateSubTab(0)}
                className={`px-4 py-2 text-xs font-jakarta font-bold ${corporateSubTab === 0 ? 'text-[#5A8A4E]' : 'text-[#6B7280] hover:text-[#1F2933]'} relative`}
              >
                Dashboard
                {corporateSubTab === 0 && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E5C76A]"></div>}
              </button>
              <button 
                onClick={() => setCorporateSubTab(1)}
                className={`px-4 py-2 text-xs font-jakarta font-bold ${corporateSubTab === 1 ? 'text-[#5A8A4E]' : 'text-[#6B7280] hover:text-[#1F2933]'} relative`}
              >
                Announcements
                {corporateSubTab === 1 && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E5C76A]"></div>}
              </button>
              <button 
                onClick={() => setCorporateSubTab(2)}
                className={`px-4 py-2 text-xs font-jakarta font-bold ${corporateSubTab === 2 ? 'text-[#5A8A4E]' : 'text-[#6B7280] hover:text-[#1F2933]'} relative`}
              >
                Announcements XBRL
                {corporateSubTab === 2 && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E5C76A]"></div>}
              </button>
              <button 
                onClick={() => setCorporateSubTab(3)}
                className={`px-4 py-2 text-xs font-jakarta font-bold ${corporateSubTab === 3 ? 'text-[#5A8A4E]' : 'text-[#6B7280] hover:text-[#1F2933]'} relative`}
              >
                Board Meetings
                {corporateSubTab === 3 && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E5C76A]"></div>}
              </button>
              <button 
                onClick={() => setCorporateSubTab(4)}
                className={`px-4 py-2 text-xs font-jakarta font-bold ${corporateSubTab === 4 ? 'text-[#5A8A4E]' : 'text-[#6B7280] hover:text-[#1F2933]'} relative`}
              >
                Corporate Actions
                {corporateSubTab === 4 && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E5C76A]"></div>}
              </button>
              <button 
                onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                className="px-4 py-2 text-xs font-jakarta font-bold text-[#6B7280] hover:text-[#1F2933] flex items-center gap-1 relative"
              >
                More
                <span className="text-[10px]">▼</span>
              </button>
              
              {/* More Dropdown */}
              {showMoreDropdown && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-[#E5E7EB] rounded shadow-lg z-50 min-w-[250px]">
                  <button 
                    onClick={() => { setCorporateSubTab(5); setShowMoreDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-jakarta text-[#1F2933] hover:bg-[#F4F7F2]"
                  >
                    Annual Reports
                  </button>
                  <button 
                    onClick={() => { setCorporateSubTab(6); setShowMoreDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-jakarta text-[#1F2933] hover:bg-[#F4F7F2]"
                  >
                    Business Responsibility and Sustainability Report
                  </button>
                  <button 
                    onClick={() => { setCorporateSubTab(7); setShowMoreDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-jakarta text-[#1F2933] hover:bg-[#F4F7F2]"
                  >
                    Company Directory
                  </button>
                  <button 
                    onClick={() => { setCorporateSubTab(8); setShowMoreDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-jakarta text-[#1F2933] hover:bg-[#F4F7F2]"
                  >
                    Corporate Governance
                  </button>
                  <button 
                    onClick={() => { setCorporateSubTab(9); setShowMoreDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-jakarta text-[#1F2933] hover:bg-[#F4F7F2]"
                  >
                    Corporate Information
                  </button>
                  <button 
                    onClick={() => { setCorporateSubTab(10); setShowMoreDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-jakarta text-[#1F2933] hover:bg-[#F4F7F2]"
                  >
                    Daily Buy Back
                  </button>
                  <button 
                    onClick={() => { setCorporateSubTab(11); setShowMoreDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-jakarta text-[#1F2933] hover:bg-[#F4F7F2]"
                  >
                    Event Calendar
                  </button>
                  <button 
                    onClick={() => { setCorporateSubTab(12); setShowMoreDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-jakarta text-[#1F2933] hover:bg-[#F4F7F2]"
                  >
                    Financial Results
                  </button>
                </div>
              )}
            </div>

            {/* Tab Content - Corporate Announcements & Actions */}
            <div className="mt-4">
                {corporateSubTab === 0 && (
                  <div className="space-y-6">
                    {/* First Row: Corporate Announcements and Corporate Actions */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Corporate Announcements */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-jakarta font-black text-[#1F2933]">Corporate Announcements</h4>
                          <button className="text-xs font-jakarta font-semibold text-[#E5C76A] hover:text-[#D4B65A] flex items-center gap-1">
                            View More
                            <span className="text-[10px]">▶</span>
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          {[
                            {
                              title: 'Certificate under SEBI (Depositories and Participants) Regulations, 2018',
                              company: 'West Coast Paper Mills Limited has informed the Exchange abo...',
                              link: 'Read More',
                              broadcast: '07-Apr-2026 16:32:10',
                              size: '462.97 KB'
                            },
                            {
                              title: 'Trading Window',
                              company: 'West Coast Paper Mills Limited has informed the Exchange reg...',
                              link: 'Read More',
                              broadcast: '25-Mar-2026 17:12:09',
                              size: '140.03 KB'
                            },
                            {
                              title: 'Copy of Newspaper Publication',
                              company: 'West Coast Paper Mills Limited has informed the Exchange abo...',
                              link: 'Read More',
                              broadcast: '07-Mar-2026 16:44:34',
                              size: '4.70 MB'
                            }
                          ].map((item, index) => (
                            <div key={index} className="flex items-start justify-between gap-3 pb-3 border-b border-[#E5E7EB] last:border-0">
                              <div className="flex-1">
                                <div className="text-xs font-jakarta font-bold text-[#1F2933] mb-1">{item.title}</div>
                                <div className="text-[10px] text-[#6B7280] font-jakarta mb-1">
                                  {item.company} <a href="#" className="text-[#E5C76A] hover:underline">{item.link}</a>
                                </div>
                                <div className="text-[10px] text-[#6B7280] font-jakarta">
                                  <span className="font-semibold">Broadcast:</span> {item.broadcast}
                                </div>
                              </div>
                              <button className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#E5C76A] text-white rounded hover:bg-[#D4B65A] transition-colors">
                                <IconFileTypePdf className="w-4 h-4" stroke={1.5} />
                              </button>
                              <div className="text-[10px] text-[#6B7280] font-jakarta text-right">{item.size}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Corporate Actions */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-jakarta font-black text-[#1F2933]">Corporate Actions</h4>
                          <button className="text-xs font-jakarta font-semibold text-[#E5C76A] hover:text-[#D4B65A] flex items-center gap-1">
                            View More
                            <span className="text-[10px]">▶</span>
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          {[
                            {
                              purpose: 'Annual General Meeting',
                              exDate: '16-Jun-2026',
                              recordDate: '17-Jun-2026'
                            },
                            {
                              purpose: 'Dividend - Rs 25 Per Share',
                              exDate: '10-Apr-2026',
                              recordDate: '10-Apr-2026'
                            },
                            {
                              purpose: 'Interim Dividend - Rs 11 Per Share',
                              exDate: '11-Jul-2025',
                              recordDate: '15-Jul-2025'
                            }
                          ].map((item, index) => (
                            <div key={index} className="pb-3 border-b border-[#E5E7EB] last:border-0 border-l-4 border-[#E5C76A] pl-3">
                              <div className="text-xs font-jakarta font-bold text-[#1F2933] mb-2">
                                <span className="font-semibold">Purpose:</span> {item.purpose}
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-[10px]">
                                <div>
                                  <span className="font-semibold text-[#6B7280]">Ex-Date:</span>{' '}
                                  <span className="text-[#1F2933]">{item.exDate}</span>
                                </div>
                                <div>
                                  <span className="font-semibold text-[#6B7280]">Record Date:</span>{' '}
                                  <span className="text-[#1F2933]">{item.recordDate}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Second Row: Annual Reports and Business Responsibility */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Annual Reports */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-jakarta font-black text-[#1F2933]">Annual Reports</h4>
                          <button className="text-xs font-jakarta font-semibold text-[#E5C76A] hover:text-[#D4B65A] flex items-center gap-1">
                            View More
                            <span className="text-[10px]">▶</span>
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          {[
                            {
                              fromYear: '2020',
                              toYear: '2021',
                              broadcast: '-'
                            },
                            {
                              fromYear: '2019',
                              toYear: '2020',
                              broadcast: '-'
                            }
                          ].map((item, index) => (
                            <div key={index} className="p-3 border border-[#E5E7EB] rounded hover:bg-[#F4F7F2]">
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-xs font-jakarta text-[#1F2933]">
                                  <span className="font-semibold">From Year:</span> {item.fromYear} | <span className="font-semibold">To Year:</span> {item.toYear}
                                </div>
                                <button className="w-8 h-8 flex items-center justify-center bg-[#5DADE2] text-white rounded hover:bg-[#3498DB]">
                                  <IconFileTypePdf className="w-4 h-4" stroke={1.5} />
                                </button>
                              </div>
                              <div className="text-[10px] text-[#6B7280] font-jakarta">
                                <span className="font-semibold">Broadcast:</span> {item.broadcast}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Business Responsibility & Sustainability Report */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-jakarta font-black text-[#1F2933]">Business Responsibility & Sustainability Report</h4>
                          <button className="text-xs font-jakarta font-semibold text-[#E5C76A] hover:text-[#D4B65A] flex items-center gap-1">
                            View More
                            <span className="text-[10px]">▶</span>
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          {[
                            {
                              fromYear: '2024',
                              toYear: '2025',
                              submissionDate: '30-Jun-2025'
                            },
                            {
                              fromYear: '2023',
                              toYear: '2024',
                              submissionDate: '12-Jun-2024'
                            }
                          ].map((item, index) => (
                            <div key={index} className="p-3 border border-[#E5E7EB] rounded hover:bg-[#F4F7F2]">
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-xs font-jakarta text-[#1F2933]">
                                  <span className="font-semibold">From Year:</span> {item.fromYear} | <span className="font-semibold">To Year:</span> {item.toYear}
                                </div>
                                <div className="flex items-center gap-2">
                                  <button className="w-8 h-8 flex items-center justify-center bg-[#E74C3C] text-white rounded hover:bg-[#C0392B]">
                                    <IconFileTypePdf className="w-4 h-4" stroke={1.5} />
                                  </button>
                                  <button className="w-8 h-8 flex items-center justify-center bg-[#C85A54] text-white rounded hover:bg-[#B84A44]">
                                    <IconFileTypePdf className="w-4 h-4" stroke={1.5} />
                                  </button>
                                </div>
                              </div>
                              <div className="text-[10px] text-[#6B7280] font-jakarta">
                                <span className="font-semibold">Original Submission Date:</span> {item.submissionDate}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Third Row: Event Calendar and Security Status */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Event Calendar */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-jakarta font-black text-[#1F2933]">Event Calendar</h4>
                          <button className="text-xs font-jakarta font-semibold text-[#E5C76A] hover:text-[#D4B65A] flex items-center gap-1">
                            View More
                            <span className="text-[10px]">▶</span>
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          {[
                            {
                              purpose: 'Financial Results/Dividend',
                              description: 'Approval of financial results for the financial year ending March 31, 2026 and recommendation of a final dividend, if any.',
                              date: '09-Apr-2026'
                            },
                            {
                              purpose: 'Financial Results/Dividend',
                              description: 'To consider and approve the quarterly audited financial results for the period ending December 31, 2025.',
                              date: '12-Jan-2026'
                            },
                            {
                              purpose: 'Financial Results/Dividend',
                              description: 'To consider and approve the quarterly audited financial results for the period ending September 30, 2025.',
                              date: '09-Oct-2025'
                            }
                          ].map((item, index) => (
                            <div key={index} className="p-3 border border-[#E5E7EB] rounded hover:bg-[#F4F7F2]">
                              <div className="text-xs font-jakarta font-bold text-[#1F2933] mb-1">
                                <span className="font-semibold">Purpose:</span> {item.purpose}
                              </div>
                              <div className="text-[10px] text-[#6B7280] font-jakarta mb-2">
                                {item.description} <a href="#" className="text-[#E5C76A] hover:underline">...Read More</a>
                              </div>
                              <div className="text-[10px] text-[#1F2933] font-jakarta font-semibold">
                                {item.date}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Security Status */}
                      <div>
                        <div className="mb-3">
                          <h4 className="text-sm font-jakarta font-black text-[#1F2933]">Security Status</h4>
                        </div>
                        
                        <div className="border border-[#E5E7EB] rounded p-4">
                          <div className="space-y-3 text-xs">
                            <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]">
                              <span className="text-[#6B7280] font-jakarta">Board Status</span>
                              <span className="text-[#1F2933] font-jakarta font-semibold">Main</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]">
                              <span className="text-[#6B7280] font-jakarta">Trading Segment</span>
                              <span className="text-[#1F2933] font-jakarta font-semibold">Normal Market</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]">
                              <span className="text-[#6B7280] font-jakarta">Session No.</span>
                              <span className="text-[#1F2933] font-jakarta font-semibold">-</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]">
                              <span className="text-[#6B7280] font-jakarta">Class of Shares</span>
                              <span className="text-[#1F2933] font-jakarta font-semibold">Equity</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]">
                              <span className="text-[#6B7280] font-jakarta">SDD Compliance</span>
                              <span className="text-[#1F2933] font-jakarta font-semibold">-</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[#6B7280] font-jakarta">Name of Compliance Officer</span>
                              <span className="text-[#1F2933] font-jakarta font-semibold">-</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Fourth Row: Shareholding Patterns and Financial Results */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Shareholding Patterns */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-jakarta font-black text-[#1F2933]">Shareholding Patterns</h4>
                          <button className="text-xs font-jakarta font-semibold text-[#E5C76A] hover:text-[#D4B65A] flex items-center gap-1">
                            View More
                            <span className="text-[10px]">▶</span>
                          </button>
                        </div>
                        
                        {/* Time Period Selector */}
                        <div className="flex items-center gap-2 mb-4">
                          {['Q1', 'Q2', 'Q3', 'Q4'].map((quarter) => (
                            <button
                              key={quarter}
                              className="px-3 py-1.5 text-xs font-jakarta font-semibold bg-[#F4F7F2] text-[#1F2933] rounded hover:bg-[#A7C4A0] transition-colors"
                            >
                              {quarter}
                            </button>
                          ))}
                        </div>

                        {/* Recharts Donut Chart */}
                        <div className="border border-[#E5E7EB] rounded p-4">
                          <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                              <Pie
                                data={[
                                  { name: 'Promoter & Promoter Group', value: 72.05, color: '#6B9E5D' },
                                  { name: 'Public', value: 27.95, color: '#E5C76A' }
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                dataKey="value"
                                label={({ value }) => `${value.toFixed(2)}%`}
                                labelLine={false}
                              >
                                {[
                                  { name: 'Promoter & Promoter Group', value: 72.05, color: '#6B9E5D' },
                                  { name: 'Public', value: 27.95, color: '#E5C76A' }
                                ].map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>

                          {/* Legend */}
                          <div className="space-y-2 mt-2">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#6B9E5D]"></div>
                                <span className="font-jakarta text-[#1F2933]">Promoter & Promoter Group</span>
                              </div>
                              <span className="font-jakarta font-bold text-[#1F2933]">72.05%</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#E5C76A]"></div>
                                <span className="font-jakarta text-[#1F2933]">Public</span>
                              </div>
                              <span className="font-jakarta font-bold text-[#1F2933]">27.95%</span>
                            </div>
                          </div>

                          {/* Additional Info */}
                          <div className="mt-4 pt-3 border-t border-[#E5E7EB]">
                            <div className="text-xs text-[#6B7280] font-jakarta">
                              <span className="font-semibold">As on:</span> 31-Dec-2025
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Financial Results */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-jakarta font-black text-[#1F2933]">Financial Results</h4>
                          <button className="text-xs font-jakarta font-semibold text-[#E5C76A] hover:text-[#D4B65A] flex items-center gap-1">
                            View More
                            <span className="text-[10px]">▶</span>
                          </button>
                        </div>

                        {/* Quarter Selector */}
                        <div className="flex items-center gap-2 mb-4">
                          {['Q1 FY26', 'Q2 FY26', 'Q3 FY26', 'Q4 FY26'].map((quarter) => (
                            <button
                              key={quarter}
                              className="px-3 py-1.5 text-xs font-jakarta font-semibold bg-[#F4F7F2] text-[#1F2933] rounded hover:bg-[#A7C4A0] transition-colors"
                            >
                              {quarter}
                            </button>
                          ))}
                        </div>

                        {/* Recharts Vertical Bar Chart */}
                        <div className="border border-[#E5E7EB] rounded p-4">
                          <ResponsiveContainer width="100%" height={280}>
                            <BarChart
                              data={[
                                { quarter: '31 Dec 2025', totalIncome: 62419, profitBeforeTax: 15234, netProfit: 11342 },
                                { quarter: '30 Sep 2025', totalIncome: 61234, profitBeforeTax: 14890, netProfit: 11056 },
                                { quarter: '30 Jun 2025', totalIncome: 59876, profitBeforeTax: 14567, netProfit: 10823 },
                                { quarter: '31 Mar 2025', totalIncome: 60123, profitBeforeTax: 14234, netProfit: 10567 },
                                { quarter: '31 Dec 2024', totalIncome: 58934, profitBeforeTax: 13987, netProfit: 10389 }
                              ]}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <XAxis 
                                dataKey="quarter" 
                                style={{ fontFamily: 'Inter', fontSize: '10px', fill: '#6B7280' }}
                              />
                              <YAxis 
                                style={{ fontFamily: 'Inter', fontSize: '10px', fill: '#6B7280' }}
                                label={{ value: 'Amount (₹ Lakhs)', angle: -90, position: 'insideLeft', style: { fontFamily: 'Inter', fontSize: '11px', fill: '#6B7280' } }}
                              />
                              <Tooltip 
                                formatter={(value: any) => value ? `₹${(Number(value) / 100).toFixed(2)}L` : ''}
                                contentStyle={{ fontFamily: 'Inter', fontSize: '11px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}
                              />
                              <Legend 
                                wrapperStyle={{ fontFamily: 'Inter', fontSize: '11px' }}
                                iconType="circle"
                              />
                              <Bar dataKey="totalIncome" name="Total Income" fill="#6B9E5D" radius={[4, 4, 0, 0]} />
                              <Bar dataKey="profitBeforeTax" name="Profit Before Tax" fill="#E5C76A" radius={[4, 4, 0, 0]} />
                              <Bar dataKey="netProfit" name="Net Profit/Loss" fill="#5DADE2" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>

                          {/* Additional Info */}
                          <div className="mt-4 pt-3 border-t border-[#E5E7EB]">
                            <div className="text-xs text-[#6B7280] font-jakarta">
                              <span className="font-semibold">Period:</span> Oct-Dec 2025 (Q3 FY26)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Fifth Row: Board Meetings */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-jakarta font-black text-[#1F2933]">Board Meetings</h4>
                        <button className="text-xs font-jakarta font-semibold text-[#E5C76A] hover:text-[#D4B65A] flex items-center gap-1">
                          View More
                          <span className="text-[10px]">▶</span>
                        </button>
                      </div>

                      {/* Board Meetings Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          {
                            purpose: 'Board Meeting Intimation',
                            description: 'TATA CONSULTANCY SERVICES LIMITED has informed the Exchange about Board Meeting to be held on 09-Apr-2026 to consider and approve the Yearly Audited Financial results...',
                            readMore: true,
                            meetingDate: '09-Apr-2026',
                            broadcast: '23-Mar-2026 18:27:06',
                            size: '6.49 KB'
                          },
                          {
                            purpose: 'Financial Results/Dividend',
                            description: 'Approval of financial results for the financial year ending March 31, 2026 and recommendation of a final dividend, if any.',
                            readMore: true,
                            meetingDate: '09-Apr-2026',
                            broadcast: '23-Mar-2026 18:21:06',
                            size: '332.09 KB'
                          },
                          {
                            purpose: 'Board Meeting Intimation',
                            description: 'TATA CONSULTANCY SERVICES LIMITED has informed the Exchange about Board Meeting to be held on 12-Jan-2026 to consider and approve the Quarterly Audited Financial results...',
                            readMore: true,
                            meetingDate: '12-Jan-2026',
                            broadcast: '23-Dec-2025 19:27:41',
                            size: '6.01 KB'
                          },
                          {
                            purpose: 'Financial Results/Dividend',
                            description: 'To consider and approve the quarterly audited financial results for the period ending December 31, 2025.',
                            readMore: true,
                            meetingDate: '12-Jan-2026',
                            broadcast: '23-Dec-2025 19:14:39',
                            size: '291.07 KB'
                          }
                        ].map((meeting, index) => (
                          <div key={index} className="border border-[#E5E7EB] rounded p-4 hover:bg-[#F4F7F2] transition-colors">
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <div className="flex-1">
                                <div className="text-xs font-jakarta font-bold text-[#1F2933] mb-2">
                                  <span className="font-semibold">Purpose:</span> {meeting.purpose}
                                </div>
                                <div className="text-xs text-[#6B7280] font-jakarta mb-2">
                                  {meeting.description} {meeting.readMore && (
                                    <a href="#" className="text-[#E5C76A] hover:underline">Read More</a>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-1">
                                <button className="w-10 h-10 flex items-center justify-center bg-[#C85A54] text-white rounded hover:bg-[#B84A44] transition-colors">
                                  <IconFileTypePdf className="w-5 h-5" stroke={1.5} />
                                </button>
                                <div className="text-[10px] text-[#6B7280] font-jakarta">{meeting.size}</div>
                              </div>
                            </div>
                            
                            <div className="pt-2 border-t border-[#E5E7EB] space-y-1">
                              <div className="text-xs text-[#1F2933] font-jakarta">
                                <span className="font-semibold">Meeting Date:</span> {meeting.meetingDate}
                              </div>
                              <div className="text-xs text-[#6B7280] font-jakarta">
                                <span className="font-semibold">Broadcast:</span> {meeting.broadcast}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Note */}
                      <div className="mt-4 p-3 bg-[#F4F7F2] rounded border-l-4 border-[#E5C76A]">
                        <div className="text-xs font-jakarta text-[#1F2933]">
                          <span className="font-bold">Note:</span> To read all the information, please{' '}
                          <a href="#" className="text-[#E5C76A] hover:underline font-bold">Click Here</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Announcements Tab Content */}
                {corporateSubTab === 1 && (
                  <div>
                    {/* Corporate Announcements Header */}
                    <h3 className="text-lg font-jakarta font-black text-[#1F2933] mb-4">Corporate Announcements</h3>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 flex-1">
                        {/* Search Bar */}
                        <div className="flex-1 max-w-md">
                          <input
                            type="text"
                            placeholder="Search by Keyword..."
                            className="w-full px-4 py-2 text-xs font-jakarta border border-[#E5E7EB] rounded focus:outline-none focus:border-[#A7C4A0]"
                          />
                        </div>
                        
                        {/* Time Period Filters */}
                        <div className="flex items-center gap-2">
                          {['1D', '1W', '1M', '3M', '6M', '1Y'].map((period) => (
                            <button
                              key={period}
                              className="px-3 py-1.5 text-xs font-jakarta font-semibold bg-[#A7C4A0] text-[#1F2933] rounded hover:bg-[#6A994E] hover:text-white transition-colors"
                            >
                              {period}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 bg-[#E5C76A] text-[#1F2933] rounded text-xs font-jakarta font-semibold hover:bg-[#D4B65A]">
                          Convert XBRL into Excel
                        </button>
                        <button className="px-3 py-1.5 bg-white border border-[#E5E7EB] rounded text-xs font-jakarta font-semibold text-[#1F2933] hover:bg-[#F4F7F2]">
                          View More
                        </button>
                      </div>
                    </div>

                    {/* Announcements List */}
                    <div className="space-y-3">
                      {[
                        {
                          title: 'Copy of Newspaper Publication',
                          description: 'Tata Consultancy Services Limited has informed the Exchange about Copy of Newspaper Publication',
                          broadcast: '07-Apr-2026 18:11:16',
                          size: '1.33 MB',
                          borderColor: 'border-[#6A994E]'
                        },
                        {
                          title: 'Analysts/Institutional Investor Meet/Con. Call Updates',
                          description: 'Tata Consultancy Services Limited has informed the Exchange about Schedule of meet',
                          broadcast: '22-Mar-2026 13:06:42',
                          size: '1.49 MB',
                          borderColor: 'border-[#E5C76A]'
                        },
                        {
                          title: 'Updates',
                          description: 'Tata Consultancy Services Limited has informed the Exchange regarding \'Press Release - TCS and Swissport extend strategic partnership to accelerate AI-led transformation\'.',
                          broadcast: '20-Mar-2026 12:30:09',
                          size: '952.93 KB',
                          borderColor: 'border-[#E5E7EB]'
                        },
                        {
                          title: 'Updates',
                          description: 'Tata Consultancy Services Limited has informed the Exchange regarding \'Press Release -TCS and ABB strengthen strategic IT, AI, and engineering partnership\'.',
                          broadcast: '19-Mar-2026 16:37:00',
                          size: '942.93 KB',
                          borderColor: 'border-[#E5E7EB]'
                        },
                        {
                          title: 'Updates',
                          description: 'Tata Consultancy Services Limited has informed the Exchange regarding \'Press Release - Amadeus and TCS announce global strategic partnership to accelerate modern airline retailing\'.',
                          broadcast: '12-Mar-2026 14:00:09',
                          size: '1.01 MB',
                          borderColor: 'border-[#E5E7EB]'
                        }
                      ].map((item, index) => (
                        <div key={index} className={`border-l-4 ${item.borderColor} bg-[#F9FAFB] p-4 rounded-r-lg`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="text-sm font-jakarta font-bold text-[#1F2933]">{item.title}</h5>
                                <span className="text-xs text-[#6B7280] font-jakarta">
                                  Broadcast: {item.broadcast}
                                </span>
                              </div>
                              <p className="text-xs text-[#6B7280] font-jakarta">{item.description}</p>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <button className="w-8 h-8 flex items-center justify-center bg-[#E5C76A] text-white rounded hover:bg-[#D4B65A]">
                                <IconFileTypePdf className="w-4 h-4" stroke={1.5} />
                              </button>
                              <div className="text-xs text-[#6B7280] font-jakarta">{item.size}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Announcements XBRL Tab Content */}
                {corporateSubTab === 2 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-jakarta font-black text-[#1F2933]">Announcement XBRL</h4>
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 bg-[#E5C76A] text-[#1F2933] rounded text-xs font-jakarta font-semibold hover:bg-[#D4B65A]">
                          Convert XBRL into Excel
                        </button>
                        <button className="px-3 py-1.5 bg-white border border-[#E5E7EB] rounded text-xs font-jakarta font-semibold text-[#1F2933] hover:bg-[#F4F7F2]">
                          View More
                        </button>
                      </div>
                    </div>

                    {/* Announcement Type Dropdown */}
                    <div className="mb-4">
                      <label className="text-xs font-jakarta font-semibold text-[#1F2933] mb-2 block">Announcement Type</label>
                      <select className="w-full px-3 py-2 text-xs font-jakarta border border-[#E5E7EB] rounded focus:outline-none focus:border-[#A7C4A0]">
                        <option>Change in Directors/KMP/SMP/Auditor/RTA</option>
                        <option>Financial Results</option>
                        <option>Board Meetings</option>
                        <option>Dividend</option>
                      </select>
                    </div>

                    {/* XBRL Announcements Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {
                          subject: 'Change in Directors/ Key Managerial Personnel/ Auditor/ Comp...',
                          type: '-',
                          broadcast: '05-Mar-2026 15:38:23',
                          size: '9.18 KB'
                        },
                        {
                          subject: 'Change in Directors/ Key Managerial Personnel/ Auditor/ Comp...',
                          type: '-',
                          broadcast: '30-Sep-2025 17:14:39',
                          size: '4.19 KB'
                        },
                        {
                          subject: 'Change in Directors/ Key Managerial Personnel/ Auditor/ Comp...',
                          type: '-',
                          broadcast: '24-Apr-2025 21:29:12',
                          size: '9.18 KB'
                        },
                        {
                          subject: 'Change in Directors/ Key Managerial Personnel/ Auditor/ Comp...',
                          type: '-',
                          broadcast: '11-Apr-2025 21:29:12',
                          size: '9.18 KB'
                        },
                        {
                          subject: 'Change in Directors/ Key Managerial Personnel/ Auditor/ Comp...',
                          type: '-',
                          broadcast: '13-Mar-2025 19:56:25',
                          size: '9.18 KB'
                        },
                        {
                          subject: 'Change in Directors/ Key Managerial Personnel/ Auditor/ Comp...',
                          type: '-',
                          broadcast: '04-Mar-2025 19:01:51',
                          size: '9.18 KB'
                        }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 border border-[#E5E7EB] rounded hover:bg-[#F4F7F2]">
                          <div className="flex-1">
                            <div className="text-xs font-jakarta font-bold text-[#1F2933] mb-1">
                              <span className="font-semibold">Subject:</span> {item.subject}
                            </div>
                            <div className="text-xs text-[#6B7280] font-jakarta mb-1">
                              <span className="font-semibold">Type of Submission:</span> {item.type}
                            </div>
                            <div className="text-xs text-[#6B7280] font-jakarta">
                              <span className="font-semibold">Broadcast:</span> {item.broadcast}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="w-8 h-8 flex items-center justify-center bg-[#C85A54] text-white rounded hover:bg-[#B84A44]">
                              <IconFileTypePdf className="w-4 h-4" stroke={1.5} />
                            </button>
                            <div className="text-xs text-[#6B7280] font-jakarta">{item.size}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Board Meetings Tab Content */}
                {corporateSubTab === 3 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-jakarta font-black text-[#1F2933]">Board Meeting Intimation</h4>
                      <button className="px-3 py-1.5 bg-white border border-[#E5E7EB] rounded text-xs font-jakarta font-semibold text-[#1F2933] hover:bg-[#F4F7F2]">
                        View More
                      </button>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          title: 'Board Meeting Intimation',
                          meeting: '09-Apr-2026',
                          description: 'TATA CONSULTANCY SERVICES LIMITED has informed the Exchange about Board Meeting to be held on 09-Apr-2026 to consider and approve the Yearly Audited Financial results of the Company for the period end...',
                          link: 'Read More',
                          broadcast: '23-Mar-2026 18:27:06',
                          size: '6.49 KB'
                        },
                        {
                          title: 'Financial Results/Dividend',
                          meeting: '09-Apr-2026',
                          description: 'Approval of financial results for the financial year ending March 31, 2026 and recommendation of a final dividend, if any.',
                          link: '',
                          broadcast: '23-Mar-2026 18:21:06',
                          size: '332.09 KB'
                        },
                        {
                          title: 'Board Meeting Intimation',
                          meeting: '12-Jan-2026',
                          description: 'TATA CONSULTANCY SERVICES LIMITED has informed the Exchange about Board Meeting to be held on 12-Jan-2026 to consider and approve the Quarterly Audited Financial results of the Company for the period end...',
                          link: 'Read More',
                          broadcast: '23-Dec-2025 19:27:41',
                          size: '6.01 KB'
                        }
                      ].map((item, index) => (
                        <div key={index} className="p-4 border border-[#E5E7EB] rounded hover:bg-[#F4F7F2]">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="text-sm font-jakarta font-bold text-[#1F2933] mb-1">{item.title}</div>
                              <div className="text-xs text-[#6B7280] font-jakarta mb-2">
                                <span className="font-semibold">Meeting:</span> {item.meeting}
                              </div>
                              <div className="text-xs text-[#6B7280] font-jakarta mb-2">
                                {item.description} {item.link && <a href="#" className="text-[#E5C76A] hover:underline">{item.link}</a>}
                              </div>
                              <div className="text-xs text-[#6B7280] font-jakarta">
                                <span className="font-semibold">Broadcast:</span> {item.broadcast}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <button className="w-10 h-10 flex items-center justify-center bg-[#E5C76A] text-white rounded hover:bg-[#D4B65A]">
                                <IconFileTypePdf className="w-5 h-5" stroke={1.5} />
                              </button>
                              <div className="text-xs text-[#6B7280] font-jakarta">{item.size}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Corporate Actions Tab Content */}
                {corporateSubTab === 4 && (
                  <div>
                    <div className="mb-4">
                      <h4 className="text-base font-jakarta font-black text-[#1F2933]">Corporate Actions</h4>
                    </div>

                    {/* Corporate Actions Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-[#6A994E] text-white">
                            <th className="text-left py-3 px-4 font-jakarta font-bold uppercase">SERIES</th>
                            <th className="text-left py-3 px-4 font-jakarta font-bold uppercase">FACE VALUE</th>
                            <th className="text-left py-3 px-4 font-jakarta font-bold uppercase">PURPOSE</th>
                            <th className="text-center py-3 px-4 font-jakarta font-bold uppercase">EX-DATE</th>
                            <th className="text-center py-3 px-4 font-jakarta font-bold uppercase">RECORD DATE</th>
                            <th className="text-center py-3 px-4 font-jakarta font-bold uppercase">BOOK CLOSURE START DATE</th>
                            <th className="text-center py-3 px-4 font-jakarta font-bold uppercase">BOOK CLOSURE END DATE</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { series: 'EQ', faceValue: '1', purpose: 'Interim Dividend Rs 11 Per Share/ Special Dividend Rs 45 Per Share', exDate: '16-Jan-2026', recordDate: '17-Jan-2026', bcStart: '-', bcEnd: '-' },
                            { series: 'EQ', faceValue: '1', purpose: 'Interim Dividend - Rs 11 Per Share', exDate: '15-Oct-2025', recordDate: '15-Oct-2025', bcStart: '-', bcEnd: '-' },
                            { series: 'EQ', faceValue: '1', purpose: 'Interim Dividend - Rs 11 Per Share', exDate: '15-Jul-2025', recordDate: '16-Jul-2025', bcStart: '-', bcEnd: '-' },
                            { series: 'EQ', faceValue: '1', purpose: 'Dividend - Rs 30 Per Share', exDate: '04-Jun-2025', recordDate: '04-Jun-2025', bcStart: '-', bcEnd: '-' },
                            { series: 'EQ', faceValue: '1', purpose: 'Interim Dividend - Rs 10 Per Share/ Special Dividend - Rs 66 Per Share', exDate: '17-Jan-2025', recordDate: '17-Jan-2025', bcStart: '-', bcEnd: '-' },
                            { series: 'EQ', faceValue: '1', purpose: 'Interim Dividend - Rs 10 Per Share', exDate: '18-Oct-2024', recordDate: '18-Oct-2024', bcStart: '-', bcEnd: '-' },
                            { series: 'EQ', faceValue: '1', purpose: 'Interim Dividend - Rs 10 Per Share', exDate: '19-Jul-2024', recordDate: '20-Jul-2024', bcStart: '-', bcEnd: '-' },
                            { series: 'EQ', faceValue: '1', purpose: 'Dividend - Rs 25 Per Share', exDate: '16-May-2024', recordDate: '16-May-2024', bcStart: '-', bcEnd: '-' },
                            { series: 'EQ', faceValue: '1', purpose: 'Interim Dividend - Rs 9 Per Share Special Dividend - Rs 18 Per Share', exDate: '19-Jan-2024', recordDate: '19-Jan-2024', bcStart: '-', bcEnd: '-' },
                            { series: 'EQ', faceValue: '1', purpose: 'Buy Back', exDate: '24-Nov-2023', recordDate: '25-Nov-2023', bcStart: '-', bcEnd: '-' }
                          ].map((item, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'} hover:bg-[#F4F7F2]`}>
                              <td className="py-3 px-4 font-jakarta text-[#1F2933]">{item.series}</td>
                              <td className="py-3 px-4 font-jakarta text-[#1F2933]">{item.faceValue}</td>
                              <td className="py-3 px-4 font-jakarta text-[#1F2933]">{item.purpose}</td>
                              <td className="py-3 px-4 font-jakarta text-[#1F2933] text-center">{item.exDate}</td>
                              <td className="py-3 px-4 font-jakarta text-[#1F2933] text-center">{item.recordDate}</td>
                              <td className="py-3 px-4 font-jakarta text-[#1F2933] text-center">{item.bcStart}</td>
                              <td className="py-3 px-4 font-jakarta text-[#1F2933] text-center">{item.bcEnd}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-xs text-[#6B7280] font-jakarta">
                        Showing 1 to 10 of 87 items
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 flex items-center justify-center border border-[#E5E7EB] rounded text-xs font-jakarta text-[#6B7280] hover:bg-[#F4F7F2]">
                          «
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center border border-[#E5E7EB] rounded text-xs font-jakarta text-[#6B7280] hover:bg-[#F4F7F2]">
                          ‹
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center bg-[#E5C76A] text-[#1F2933] rounded text-xs font-jakarta font-bold">
                          1
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center border border-[#E5E7EB] rounded text-xs font-jakarta text-[#6B7280] hover:bg-[#F4F7F2]">
                          2
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center border border-[#E5E7EB] rounded text-xs font-jakarta text-[#6B7280] hover:bg-[#F4F7F2]">
                          3
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center border border-[#E5E7EB] rounded text-xs font-jakarta text-[#6B7280] hover:bg-[#F4F7F2]">
                          4
                        </button>
                        <span className="text-xs text-[#6B7280] font-jakarta">...</span>
                        <button className="w-8 h-8 flex items-center justify-center border border-[#E5E7EB] rounded text-xs font-jakarta text-[#6B7280] hover:bg-[#F4F7F2]">
                          9
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center border border-[#E5E7EB] rounded text-xs font-jakarta text-[#6B7280] hover:bg-[#F4F7F2]">
                          ›
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center border border-[#E5E7EB] rounded text-xs font-jakarta text-[#6B7280] hover:bg-[#F4F7F2]">
                          »
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Annual Reports Tab Content */}
                {corporateSubTab === 5 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-jakarta font-black text-[#1F2933]">Annual Reports</h4>
                      <button className="px-3 py-1.5 bg-white border border-[#E5E7EB] rounded text-xs font-jakarta font-semibold text-[#1F2933] hover:bg-[#F4F7F2]">
                        View More
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { fromYear: 2024, toYear: 2025, size: '462 KB' },
                        { fromYear: 2023, toYear: 2024, size: '690 KB' },
                        { fromYear: 2022, toYear: 2023, size: '512 KB' },
                        { fromYear: 2021, toYear: 2022, size: '445 KB' },
                        { fromYear: 2020, toYear: 2021, size: '398 KB' },
                        { fromYear: 2019, toYear: 2020, size: '523 KB' },
                        { fromYear: 2018, toYear: 2019, size: '467 KB' },
                        { fromYear: 2017, toYear: 2018, size: '412 KB' },
                        { fromYear: 2016, toYear: 2017, size: '389 KB' },
                        { fromYear: 2015, toYear: 2016, size: '356 KB' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-[#E5E7EB] rounded hover:bg-[#F4F7F2]">
                          <div className="flex-1">
                            <div className="text-sm font-jakarta font-bold text-[#1F2933]">
                              From Year: {item.fromYear} | To Year: {item.toYear}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="w-8 h-8 flex items-center justify-center bg-[#E5C76A] text-white rounded hover:bg-[#D4B65A]">
                              <IconFileTypePdf className="w-4 h-4" stroke={1.5} />
                            </button>
                            <div className="text-xs text-[#6B7280] font-jakarta">{item.size}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Business Responsibility and Sustainability Report Tab Content */}
                {corporateSubTab === 6 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-jakarta font-black text-[#1F2933]">Business Responsibility and Sustainability Report</h4>
                      <button className="px-3 py-1.5 bg-white border border-[#E5E7EB] rounded text-xs font-jakarta font-semibold text-[#1F2933] hover:bg-[#F4F7F2]">
                        View More
                      </button>
                    </div>

                    <div className="space-y-3">
                      {[
                        { fromYear: 2024, toYear: 2025, originalDate: '30-Jul-2025', latestDate: '-', pdfSize: '462 KB', xmlSize: '690 KB' },
                        { fromYear: 2023, toYear: 2024, originalDate: '18-Jul-2024', latestDate: '-', pdfSize: '512 KB', xmlSize: '445 KB' },
                        { fromYear: 2022, toYear: 2023, originalDate: '24-Jul-2023', latestDate: '-', pdfSize: '398 KB', xmlSize: '523 KB' }
                      ].map((item, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 p-3 border border-[#E5E7EB] rounded hover:bg-[#F4F7F2]">
                          <div>
                            <div className="text-xs text-[#6B7280] font-jakarta mb-1">From Year: {item.fromYear}</div>
                            <div className="text-xs text-[#6B7280] font-jakarta">To Year: {item.toYear}</div>
                          </div>
                          <div>
                            <div className="text-xs text-[#6B7280] font-jakarta mb-1">Original Submission Date:</div>
                            <div className="text-xs font-jakarta font-bold text-[#1F2933]">{item.originalDate}</div>
                          </div>
                          <div>
                            <div className="text-xs text-[#6B7280] font-jakarta mb-1">Latest Revision Date:</div>
                            <div className="text-xs font-jakarta font-bold text-[#1F2933]">{item.latestDate}</div>
                          </div>
                          <div className="flex items-center justify-end gap-2">
                            <button className="w-8 h-8 flex items-center justify-center bg-[#E5C76A] text-white rounded hover:bg-[#D4B65A]">
                              <IconFileTypePdf className="w-4 h-4" stroke={1.5} />
                            </button>
                            <div className="text-xs text-[#6B7280] font-jakarta">{item.pdfSize}</div>
                            <button className="w-8 h-8 flex items-center justify-center bg-[#C85A54] text-white rounded hover:bg-[#B84A44]">
                              <IconFileTypePdf className="w-4 h-4" stroke={1.5} />
                            </button>
                            <div className="text-xs text-[#6B7280] font-jakarta">{item.xmlSize}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 text-xs text-[#6B7280] font-jakarta">
                      Showing 1 to 3 of 3 items
                    </div>

                    <div className="mt-4 p-3 bg-[#F4F7F2] rounded border-l-4 border-[#E5C76A]">
                      <div className="text-xs font-jakarta text-[#1F2933]">
                        <span className="font-bold">Note:</span> To read all the information, please <a href="#" className="text-[#E5C76A] hover:underline font-bold">Click Here</a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
          </div>
        </div>

      </div>
    </div>
  )
}
