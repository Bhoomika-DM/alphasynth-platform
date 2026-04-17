'use client'

import { useState } from 'react'
import ScreenerCard from '@/components/institutional-screener/ScreenerCard'

const SCREENERS = [
  {
    id: 'quality-compounders',
    title: 'Quality Compounders',
    description: 'High ROE, ROCE conversion with low average debt for buy-and-hold compounders.',
    emoji: '⭐',
    factors: ['ROE > 15%', 'ROCE > 12%', 'Revenue CAGR > 10%', 'EPS CAGR > 10%', 'Debt/Equity < 0.5'],
    bgColor: '#FFFFFF',
    borderColor: '#0D7C8C',
    accentColor: '#0D7C8C',
  },
  {
    id: 'deep-value',
    title: 'Deep Value',
    description: 'Cheap on PE, EV/EBITDA, FCF Yield with a quality floor. Mean-reversion focused.',
    emoji: '🎯',
    factors: ['P/E < 12', 'EV/EBITDA < 8', 'FCF Yield > 5%', 'Current Ratio > 1.5', 'Debt/Equity < 0.8'],
    bgColor: '#FFFFFF',
    borderColor: '#1A6B3A',
    accentColor: '#1A6B3A',
  },
  {
    id: 'growth-leaders',
    title: 'Growth Leaders',
    description: 'Companies accelerating revenue and EPS with strong expansion. GARP strategy.',
    emoji: '📈',
    factors: ['Revenue CAGR > 20%', 'EPS CAGR > 15%', '12M Momentum > 20%', 'P/E < 25', 'ROE > 12%'],
    bgColor: '#FFFFFF',
    borderColor: '#B8860B',
    accentColor: '#B8860B',
  },
  {
    id: 'momentum-leaders',
    title: 'Momentum Leaders',
    description: 'Stocks with sustained price momentum, volume confirmation, 52-week breakouts.',
    emoji: '⚡',
    factors: ['12M Momentum > 30%', 'Volatility < 30%', 'P/E < 20', 'Revenue CAGR > 10%', 'Current Ratio > 1.2'],
    bgColor: '#FFFFFF',
    borderColor: '#2E4D8E',
    accentColor: '#2E4D8E',
  },
  {
    id: 'multibagger-early',
    title: 'Multibagger Early',
    description: 'High-growth small/mid caps with strong ROE, low debt, and early momentum.',
    emoji: '🚀',
    factors: ['Revenue CAGR > 25%', 'EPS CAGR > 20%', 'P/E < 30', 'ROE > 10%', 'Debt/Equity < 1.0'],
    bgColor: '#FFFFFF',
    borderColor: '#B45309',
    accentColor: '#B45309',
  },
  {
    id: 'low-risk-alpha',
    title: 'Low Risk Alpha',
    description: 'Low volatility, low beta with quality fundamentals. Defensive portfolio.',
    emoji: '🛡️',
    factors: ['Volatility < 20%', 'Dividend Yield > 2%', 'Debt/Equity < 0.4', 'Current Ratio > 1.8', 'ROE > 12%'],
    bgColor: '#FFFFFF',
    borderColor: '#0D7C8C',
    accentColor: '#0D7C8C',
  },
]

export default function ScreenerPage() {
  const [activeTab, setActiveTab] = useState<'prebuilt' | 'custom'>('prebuilt')

  return (
    <div style={{ backgroundColor: '#F8F9FB', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div className="max-w-full mx-auto px-6 py-4">
          <h1 className="text-sm font-bold text-[#1B2A4A] tracking-wide">
            INSTITUTIONAL SCREENER
          </h1>
          <p style={{ color: '#718096', fontSize: '12px', marginTop: '4px' }}>
            Click any model to instantly rank the universe
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div className="max-w-full mx-auto px-6">
          <div className="flex gap-8">
            {[
              { id: 'prebuilt', label: 'Screener' },
              { id: 'custom', label: 'Compare' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="px-4 py-3 font-medium border-b-2 transition-all text-sm"
                style={{
                  color: activeTab === tab.id ? '#1B2A4A' : '#718096',
                  borderColor: activeTab === tab.id ? '#0D7C8C' : 'transparent',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - 50/50 Split */}
      <div className="max-w-full mx-auto px-6 py-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {activeTab === 'prebuilt' && (
          <div className="flex gap-6">
            {/* Left: Screener Cards - 50% */}
            <div className="w-1/2">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p style={{ color: '#718096', fontSize: '12px' }}>
                    Prebuilt Screeners
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span style={{ color: '#718096', fontSize: '11px' }}>Top</span>
                    <input
                      type="number"
                      defaultValue="2"
                      className="w-10 px-2 py-1 rounded text-[#1B2A4A] text-xs border"
                      style={{
                        backgroundColor: '#F8F9FB',
                        borderColor: '#E2E8F0',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    />
                    <span style={{ color: '#718096', fontSize: '11px' }}>stocks</span>
                  </div>
                  <button
                    className="px-3 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: '#F8F9FB',
                      color: '#718096',
                      border: '1px solid #E2E8F0',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    Custom Screener
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {SCREENERS.map((screener) => (
                  <ScreenerCard key={screener.id} {...screener} />
                ))}
              </div>
            </div>

            {/* Right: Logic Builder - 50% */}
            <div className="w-1/2">
              <div className="p-6 rounded-lg" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <h3 className="text-[#1B2A4A] font-bold text-sm mb-5">
                  Logic Builder
                </h3>

                {/* Describe Criteria */}
                <div className="mb-5">
                  <p style={{ color: '#718096', fontSize: '11px', marginBottom: '8px' }}>
                    Describe your criteria
                  </p>
                  <input
                    type="text"
                    placeholder="e.g. 'high quality, low debt, strong g'"
                    className="w-full px-3 py-2 rounded text-xs border"
                    style={{
                      backgroundColor: '#F8F9FB',
                      borderColor: '#E2E8F0',
                      color: '#1B2A4A',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  />
                </div>

                {/* Parse Button */}
                <button
                  className="w-full px-3 py-2 rounded text-xs font-bold text-white mb-5"
                  style={{
                    backgroundColor: '#0D7C8C',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  Parse Natural Language
                </button>

                {/* Manual Factor Filters */}
                <div className="mb-5 pt-5 border-t" style={{ borderColor: '#E2E8F0' }}>
                  <p style={{ color: '#718096', fontSize: '11px', marginBottom: '8px' }}>
                    Manual Factor Filters
                  </p>
                  <button
                    className="w-full px-3 py-2 rounded text-xs font-medium"
                    style={{
                      backgroundColor: '#F8F9FB',
                      color: '#718096',
                      border: '1px solid #E2E8F0',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    + Add Filter
                  </button>
                </div>

                {/* Rank Results By */}
                <div className="mb-5 pt-5 border-t" style={{ borderColor: '#E2E8F0' }}>
                  <p style={{ color: '#718096', fontSize: '11px', marginBottom: '8px' }}>
                    RANK RESULTS BY
                  </p>
                  <button
                    className="w-full px-3 py-2 rounded text-xs font-medium text-left"
                    style={{
                      backgroundColor: '#F8F9FB',
                      color: '#1B2A4A',
                      border: '1px solid #E2E8F0',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    ⭐ Quality Compounders
                  </button>
                </div>

                {/* Run Screener Button */}
                <button
                  className="w-full px-3 py-3 rounded text-xs font-bold text-white"
                  style={{
                    backgroundColor: '#0D7C8C',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  ▶ Run Screener
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'custom' && (
          <div className="text-center py-12">
            <p style={{ color: '#718096' }}>
              Compare Models coming soon...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
