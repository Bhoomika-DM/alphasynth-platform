'use client'

import ScreenerSidebar from '@/components/screener/ScreenerSidebar'

export default function GlossaryPage() {
  const glossaryTerms = [
    {
      term: 'OBV',
      title: 'On-Balance Volume',
      description: 'On-Balance Volume — a running total that goes up on buying days and down on selling days. When OBV and price move in sync, money is quietly accumulating.'
    },
    {
      term: 'NECKLINE',
      title: 'Neckline',
      description: 'The trigger level of a pattern — once price decisively closes through it, the pattern is confirmed and the trade is on.'
    },
    {
      term: 'DOW THEORY',
      title: 'Dow Theory',
      description: 'A 100+ year old framework that classifies markets into long-term (primary), counter-trend (secondary), and short-term trends. It tells us whether the larger tide supports the trade.'
    },
    {
      term: 'STOP-LOSS',
      title: 'Stop-Loss',
      description: 'The price at which we accept the trade was wrong and exit to protect capital. Always use BEFORE entering.'
    },
    {
      term: 'TARGET',
      title: 'Target',
      description: 'The price the pattern projects we should aim for, calculated by classical pattern geometry.'
    },
    {
      term: 'RISK REWARD',
      title: 'Risk Reward',
      description: 'How much we risk for each rupee of expected profit. 1:2 means risking ₹1 to make ₹2.'
    },
    {
      term: 'BREAKOUT',
      title: 'Breakout',
      description: 'Price crossing above resistance (bullish) or below support (bearish) — the moment of pattern confirmation.'
    },
    {
      term: 'CONFIDENCE',
      title: 'Confidence',
      description: 'AlphaSynth\'s grade for the signal. Blending pattern strength, volume confirmation, OBV alignment and Dow context. A+ is recommended, 75+ is high conviction.'
    },
    {
      term: 'HEAD & SHOULDERS',
      title: 'Head & Shoulders',
      description: 'A topping pattern: three peaks in a row where the middle one is highest. Once the "neckline" connecting the two valleys breaks down, the trend usually reverses.'
    },
    {
      term: 'CUP & HANDLE',
      title: 'Cup & Handle',
      description: 'A long U-shaped base with a brief shallow pullback ("handle") at the rim — one of the most powerful continuation buy setups when it breaks out.'
    },
    {
      term: 'VOLUME CONFIRMATION',
      title: 'Volume Confirmation',
      description: 'A breakout on heavy volume = real conviction. A breakout on weak volume = often a fake-out.'
    },
    {
      term: 'DOUBLE TOP',
      title: 'Double Top',
      description: 'Two peaks at roughly the same level with a valley between them. When price breaks below the valley low, it signals a trend reversal.'
    },
    {
      term: 'DOUBLE BOTTOM',
      title: 'Double Bottom',
      description: 'Two troughs at roughly the same level with a peak between them. When price breaks above the peak high, it signals a trend reversal upward.'
    },
    {
      term: 'TRIANGLE',
      title: 'Triangle',
      description: 'A consolidation pattern where price moves between converging trend lines. Breakout direction usually follows the prior trend.'
    },
    {
      term: 'WEDGE',
      title: 'Wedge',
      description: 'A pattern where price moves between two converging lines sloping in the same direction. Rising wedges are typically bearish, falling wedges bullish.'
    },
    {
      term: 'SUPPORT',
      title: 'Support',
      description: 'A price level where buying interest emerges to halt or reverse a decline. Previous lows often act as support.'
    },
    {
      term: 'RESISTANCE',
      title: 'Resistance',
      description: 'A price level where selling interest emerges to halt or reverse an advance. Previous highs often act as resistance.'
    },
    {
      term: 'MOMENTUM',
      title: 'Momentum',
      description: 'The rate of change in price movement. Strong momentum confirms the direction of the trend and pattern breakouts.'
    },
    {
      term: 'RSI',
      title: 'Relative Strength Index',
      description: 'A momentum oscillator that measures the speed and change of price movements. Values above 70 suggest overbought conditions, below 30 suggest oversold.'
    },
    {
      term: 'MACD',
      title: 'Moving Average Convergence Divergence',
      description: 'A trend-following momentum indicator that shows the relationship between two moving averages of a security\'s price.'
    },
    {
      term: 'BOLLINGER BANDS',
      title: 'Bollinger Bands',
      description: 'A volatility indicator consisting of a moving average and two standard deviation lines. Price touching the bands can signal overbought/oversold conditions.'
    },
    {
      term: 'FIBONACCI',
      title: 'Fibonacci Retracement',
      description: 'Horizontal lines that indicate areas of support or resistance at key Fibonacci levels before the price continues in the original direction.'
    },
    {
      term: 'CANDLESTICK',
      title: 'Candlestick Pattern',
      description: 'A type of price chart that displays the high, low, open, and closing prices of a security for a specific period, forming patterns that can predict future movements.'
    },
    {
      term: 'TREND LINE',
      title: 'Trend Line',
      description: 'A straight line that connects two or more price points and extends into the future to act as a line of support or resistance.'
    },
    {
      term: 'VOLATILITY',
      title: 'Volatility',
      description: 'A statistical measure of the dispersion of returns for a given security or market index. Higher volatility means greater price swings.'
    }
  ]

  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      <ScreenerSidebar />

      <div className="flex-1 ml-64">
        {/* Header */}
        <div className="bg-white border-b border-[#E2E8F0] px-8 py-6">
          <h1 className="text-3xl font-black text-[#1B2A4A] mb-2">Glossary</h1>
          <p className="text-sm text-[#718096]">
            Every term on AlphaSynth in one place — written for real humans.
          </p>
        </div>

        <div className="p-8">
          {/* Glossary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {glossaryTerms.map((item, index) => (
              <div key={index} className="bg-white rounded-lg border border-[#E2E8F0] p-6 hover:shadow-md transition-all">
                <div className="mb-3">
                  <div className="text-xs font-bold text-[#0D7C8C] uppercase tracking-wider mb-1">
                    {item.term}
                  </div>
                  <h3 className="text-lg font-bold text-[#1B2A4A]">{item.title}</h3>
                </div>
                <p className="text-sm text-[#718096] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
              <p className="text-sm text-[#718096]">
                Can't find a term? <span className="text-[#0D7C8C] font-semibold">Contact us</span> and we'll add it to the glossary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}