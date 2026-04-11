'use client'

// Example Component: How to use NSE Data in your components
import { useStockQuote, useMarketStatus, useTopGainers, useIndexData } from '@/hooks/useNSEData'

export default function NSEDataExample() {
  // Fetch TCS stock quote (refreshes every 30 seconds)
  const { data: tcsQuote, loading: tcsLoading, error: tcsError, source } = useStockQuote('TCS', 30000)

  // Fetch market status (refreshes every 60 seconds)
  const { data: marketStatus, loading: marketLoading } = useMarketStatus(60000)

  // Fetch NIFTY 50 index data (refreshes every 30 seconds)
  const { data: nifty50, loading: niftyLoading } = useIndexData('NIFTY 50', 30000)

  // Fetch top gainers (refreshes every 60 seconds)
  const { data: topGainers, loading: gainersLoading } = useTopGainers(60000)

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[#1F2933]">NSE Data Integration Example</h1>

      {/* Market Status */}
      <div className="bg-white border-2 border-[#6A994E]/10 rounded-xl p-6">
        <h2 className="text-xl font-bold text-[#1F2933] mb-4">Market Status</h2>
        {marketLoading ? (
          <div className="text-[#6B7280]">Loading market status...</div>
        ) : marketStatus ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#6B7280]">Status:</span>
              <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                marketStatus.marketState === 'Open' 
                  ? 'bg-[#6B9E5D]/20 text-[#6B9E5D]' 
                  : 'bg-[#C85A54]/20 text-[#C85A54]'
              }`}>
                {marketStatus.marketState}
              </span>
            </div>
            <div className="text-sm text-[#6B7280]">
              Trade Date: {marketStatus.tradeDate}
            </div>
          </div>
        ) : (
          <div className="text-[#C85A54]">Failed to load market status</div>
        )}
      </div>

      {/* NIFTY 50 Index */}
      <div className="bg-white border-2 border-[#6A994E]/10 rounded-xl p-6">
        <h2 className="text-xl font-bold text-[#1F2933] mb-4">NIFTY 50</h2>
        {niftyLoading ? (
          <div className="text-[#6B7280]">Loading NIFTY 50...</div>
        ) : nifty50 ? (
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-[#6B7280] mb-1">Last Price</div>
              <div className="text-2xl font-bold text-[#1F2933]">
                {nifty50.last?.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#6B7280] mb-1">Change</div>
              <div className={`text-2xl font-bold ${
                nifty50.variation >= 0 ? 'text-[#6B9E5D]' : 'text-[#C85A54]'
              }`}>
                {nifty50.variation >= 0 ? '+' : ''}{nifty50.variation?.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#6B7280] mb-1">% Change</div>
              <div className={`text-2xl font-bold ${
                nifty50.percentChange >= 0 ? 'text-[#6B9E5D]' : 'text-[#C85A54]'
              }`}>
                {nifty50.percentChange >= 0 ? '+' : ''}{nifty50.percentChange?.toFixed(2)}%
              </div>
            </div>
            <div>
              <div className="text-xs text-[#6B7280] mb-1">P/E Ratio</div>
              <div className="text-2xl font-bold text-[#1F2933]">
                {nifty50.pe?.toFixed(2)}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-[#C85A54]">Failed to load NIFTY 50 data</div>
        )}
      </div>

      {/* TCS Stock Quote */}
      <div className="bg-white border-2 border-[#6A994E]/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#1F2933]">TCS Stock Quote</h2>
          {source && (
            <span className="px-3 py-1 bg-[#E5C76A]/20 text-[#E5C76A] rounded-lg text-xs font-bold uppercase">
              Source: {source}
            </span>
          )}
        </div>

        {tcsLoading ? (
          <div className="text-[#6B7280]">Loading TCS data...</div>
        ) : tcsError ? (
          <div className="text-[#C85A54]">Error: {tcsError}</div>
        ) : tcsQuote ? (
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-4">
              <div>
                <div className="text-xs text-[#6B7280] mb-1">Last Price</div>
                <div className="text-2xl font-bold text-[#1F2933]">
                  ₹{tcsQuote.lastPrice?.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#6B7280] mb-1">Change</div>
                <div className={`text-2xl font-bold ${
                  tcsQuote.change >= 0 ? 'text-[#6B9E5D]' : 'text-[#C85A54]'
                }`}>
                  {tcsQuote.change >= 0 ? '+' : ''}₹{tcsQuote.change?.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#6B7280] mb-1">% Change</div>
                <div className={`text-2xl font-bold ${
                  tcsQuote.pChange >= 0 ? 'text-[#6B9E5D]' : 'text-[#C85A54]'
                }`}>
                  {tcsQuote.pChange >= 0 ? '+' : ''}{tcsQuote.pChange?.toFixed(2)}%
                </div>
              </div>
              <div>
                <div className="text-xs text-[#6B7280] mb-1">Day High</div>
                <div className="text-2xl font-bold text-[#1F2933]">
                  ₹{tcsQuote.dayHigh?.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#6B7280] mb-1">Day Low</div>
                <div className="text-2xl font-bold text-[#1F2933]">
                  ₹{tcsQuote.dayLow?.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-[#6A994E]/10">
              <div>
                <div className="text-xs text-[#6B7280] mb-1">Open</div>
                <div className="text-lg font-bold text-[#1F2933]">
                  ₹{tcsQuote.open?.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#6B7280] mb-1">Previous Close</div>
                <div className="text-lg font-bold text-[#1F2933]">
                  ₹{tcsQuote.previousClose?.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#6B7280] mb-1">52W High</div>
                <div className="text-lg font-bold text-[#6B9E5D]">
                  ₹{tcsQuote.yearHigh?.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#6B7280] mb-1">52W Low</div>
                <div className="text-lg font-bold text-[#C85A54]">
                  ₹{tcsQuote.yearLow?.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#6A994E]/10">
              <div className="text-xs text-[#6B7280] mb-1">Volume</div>
              <div className="text-lg font-bold text-[#1F2933]">
                {tcsQuote.totalTradedVolume?.toLocaleString()}
              </div>
            </div>

            {tcsQuote.lastUpdateTime && (
              <div className="text-xs text-[#6B7280] pt-2">
                Last updated: {tcsQuote.lastUpdateTime}
              </div>
            )}
          </div>
        ) : (
          <div className="text-[#C85A54]">No data available</div>
        )}
      </div>

      {/* Top Gainers */}
      <div className="bg-white border-2 border-[#6A994E]/10 rounded-xl p-6">
        <h2 className="text-xl font-bold text-[#1F2933] mb-4">Top Gainers</h2>
        {gainersLoading ? (
          <div className="text-[#6B7280]">Loading top gainers...</div>
        ) : topGainers && topGainers.length > 0 ? (
          <div className="space-y-2">
            {topGainers.slice(0, 5).map((stock: any, index: number) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-[#F4F7F2] rounded-lg"
              >
                <div>
                  <div className="font-bold text-[#1F2933]">{stock.symbol}</div>
                  <div className="text-xs text-[#6B7280]">₹{stock.ltp?.toFixed(2)}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#6B9E5D]">
                    +{stock.netPrice?.toFixed(2)}%
                  </div>
                  <div className="text-xs text-[#6B7280]">
                    Vol: {(stock.tradedQuantity / 1000).toFixed(0)}K
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-[#C85A54]">Failed to load top gainers</div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-[#E5C76A]/10 border-2 border-[#E5C76A]/30 rounded-xl p-6">
        <h3 className="text-lg font-bold text-[#1F2933] mb-2">How This Works</h3>
        <ul className="space-y-2 text-sm text-[#1F2933]">
          <li>• Data is fetched from NSE via backend proxy server</li>
          <li>• Falls back to Yahoo Finance if NSE is unavailable</li>
          <li>• Cached for 30-60 seconds to reduce API calls</li>
          <li>• Auto-refreshes at specified intervals</li>
          <li>• Source indicator shows where data came from (NSE/Yahoo/Cache)</li>
        </ul>
      </div>
    </div>
  )
}
