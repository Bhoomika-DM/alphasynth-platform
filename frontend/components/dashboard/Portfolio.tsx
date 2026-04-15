'use client'

import { IconTrendingUp, IconPlus, IconRefresh } from '@tabler/icons-react'

interface PortfolioProps {
}

const portfolioHoldings = [
  { symbol: 'RELIANCE', qty: 50, avgPrice: 2350, currentPrice: 2456.80, dayChange: '+2.3%', positive: true },
  { symbol: 'TCS', qty: 25, avgPrice: 3750, currentPrice: 3892.50, dayChange: '+1.8%', positive: true },
  { symbol: 'HDFCBANK', qty: 100, avgPrice: 1580, currentPrice: 1645.30, dayChange: '+0.9%', positive: true },
  { symbol: 'INFY', qty: 75, avgPrice: 1550, currentPrice: 1523.70, dayChange: '-1.2%', positive: false },
]

export default function Portfolio({}: PortfolioProps) {
  const totalInvested = 450000
  const currentValue = 498959
  const totalPnL = currentValue - totalInvested
  const totalPnLPercent = ((totalPnL / totalInvested) * 100).toFixed(2)
  const todayPnL = 5240
  const todayPnLPercent = '+1.06%'
  
  // Calculate best performer
  const bestPerformer = portfolioHoldings.reduce((best, current) => {
    const currentGain = ((current.currentPrice - current.avgPrice) / current.avgPrice) * 100
    const bestGain = ((best.currentPrice - best.avgPrice) / best.avgPrice) * 100
    return currentGain > bestGain ? current : best
  })
  const bestPerformerGain = (((bestPerformer.currentPrice - bestPerformer.avgPrice) / bestPerformer.avgPrice) * 100).toFixed(1)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-2xl font-bold text-white mb-1">My Portfolio</h4>
          <p className="text-base text-white/80">Track your investments and returns</p>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-4 gap-4">
        {/* Total Value */}
        <div className="p-5 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl hover:border-white/20 transition-all duration-300">
          <div className="text-sm text-white/80 mb-2">Total Value</div>
          <div className="text-3xl font-black text-white">₹{(currentValue / 1000).toFixed(0)}K</div>
          <div className="text-xs text-white/60 mt-1">Invested: ₹{(totalInvested / 1000).toFixed(0)}K</div>
        </div>

        {/* Today's P&L */}
        <div className="p-5 bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-2xl hover:border-green-500/40 transition-all duration-300">
          <div className="text-sm text-white/80 mb-2">Today's P&L</div>
          <div className="text-3xl font-black text-green-400">+₹{todayPnL.toLocaleString()}</div>
          <div className="text-xs text-green-400 mt-1">{todayPnLPercent}</div>
        </div>

        {/* Total Returns */}
        <div className="p-5 bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-2xl hover:border-green-500/40 transition-all duration-300">
          <div className="text-sm text-white/80 mb-2">Total Returns</div>
          <div className="text-3xl font-black text-green-400">+₹{(totalPnL / 1000).toFixed(0)}K</div>
          <div className="flex items-center gap-1 mt-1">
            <IconTrendingUp className="w-4 h-4 text-green-400" stroke={1.5} />
            <span className="text-xs text-green-400">+{totalPnLPercent}%</span>
          </div>
        </div>

        {/* Best Performer */}
        <div className="p-5 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl hover:border-glow-primary/40 transition-all duration-300">
          <div className="text-sm text-white/80 mb-2">Best Performer</div>
          <div className="text-2xl font-black text-white">{bestPerformer.symbol}</div>
          <div className="text-xs text-glow-primary mt-1">+{bestPerformerGain}%</div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-8 gap-4 px-6 py-4 bg-white/[0.03] border-b border-white/[0.08]">
          <div className="col-span-2 text-sm font-bold text-white uppercase tracking-wider">Stock</div>
          <div className="text-sm font-bold text-white uppercase tracking-wider text-right">Qty</div>
          <div className="text-sm font-bold text-white uppercase tracking-wider text-right">Avg Price</div>
          <div className="text-sm font-bold text-white uppercase tracking-wider text-right">Current</div>
          <div className="text-sm font-bold text-white uppercase tracking-wider text-right">P&L</div>
          <div className="text-sm font-bold text-white uppercase tracking-wider text-right">% Change</div>
          <div className="text-sm font-bold text-white uppercase tracking-wider text-center">Actions</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-white/[0.05]">
          {portfolioHoldings.map((holding) => {
            const value = holding.qty * holding.currentPrice
            const invested = holding.qty * holding.avgPrice
            const pnl = value - invested
            const pnlPercent = ((pnl / invested) * 100).toFixed(1)
            const isPositive = pnl >= 0

            return (
              <div
                key={holding.symbol}
                className="grid grid-cols-8 gap-4 px-6 py-4 hover:bg-white/[0.03] transition-all duration-200"
              >
                {/* Stock */}
                <div className="col-span-2 flex items-center gap-3">
                  <div className={`w-1 h-10 rounded-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div>
                    <div className="text-base font-bold text-white">{holding.symbol}</div>
                    <div className={`text-xs ${holding.positive ? 'text-green-400' : 'text-red-400'}`}>
                      {holding.dayChange} today
                    </div>
                  </div>
                </div>

                {/* Qty */}
                <div className="flex items-center justify-end">
                  <span className="text-base text-white">{holding.qty}</span>
                </div>

                {/* Avg Price */}
                <div className="flex items-center justify-end">
                  <span className="text-base text-white/80">₹{holding.avgPrice.toLocaleString()}</span>
                </div>

                {/* Current */}
                <div className="flex items-center justify-end">
                  <span className="text-base font-semibold text-white">₹{holding.currentPrice.toLocaleString()}</span>
                </div>

                {/* P&L */}
                <div className="flex items-center justify-end">
                  <div className={`px-3 py-1 rounded-lg ${isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    <span className="text-base font-bold">
                      {isPositive ? '+' : ''}₹{Math.abs(pnl).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* % Change */}
                <div className="flex items-center justify-end">
                  <span className={`text-base font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? '+' : ''}{pnlPercent}%
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center gap-2">
                  <button className="px-3 py-1.5 bg-glow-primary/10 hover:bg-glow-primary/20 border border-glow-primary/30 rounded-lg text-xs font-bold text-glow-primary transition-all duration-200">
                    Buy
                  </button>
                  <button className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-xs font-bold text-red-400 transition-all duration-200">
                    Sell
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 px-6 py-3 bg-glow-primary hover:bg-glow-primary/90 rounded-xl text-base font-bold text-black transition-all duration-200 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]">
          <IconPlus className="w-5 h-5" stroke={1.5} />
          Add Stock
        </button>

        <div className="flex items-center gap-3 px-6 py-3 bg-white/[0.05] border border-white/[0.08] rounded-xl">
          <IconRefresh className="w-5 h-5 text-white/80" stroke={1.5} />
          <div>
            <div className="text-xs text-white/60">Rebalance Suggestion</div>
            <div className="text-sm font-bold text-white">Reduce INFY, Add IT Sector</div>
          </div>
        </div>
      </div>
    </div>
  )
}

