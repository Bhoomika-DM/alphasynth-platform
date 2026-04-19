'use client'

import { useState, useEffect } from 'react'
import { IconStar, IconTarget, IconTrendingUp, IconBolt, IconRocket, IconShield, IconRefresh, IconFilter, IconSettings, IconChartBar, IconTable, IconFileSpreadsheet, IconChartLine, IconDownload } from '@tabler/icons-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LineChart, Line, ComposedChart } from 'recharts'
import ScreenerCard from '@/components/institutional-screener/ScreenerCard'

const SCREENERS = [
  {
    id: 'quality-compounders',
    title: 'Quality Compounders',
    description: 'High ROE, ROCE conversion with low average debt for buy-and-hold compounders.',
    icon: IconStar,
    factors: ['ROE > 15%', 'ROCE > 12%', 'Revenue CAGR > 10%', 'EPS CAGR > 10%', 'Debt/Equity < 0.5'],
    bgColor: '#FFFFFF',
    borderColor: '#0D7C8C',
    accentColor: '#0D7C8C',
  },
  {
    id: 'deep-value',
    title: 'Deep Value',
    description: 'Cheap on PE, EV/EBITDA, FCF Yield with a quality floor. Mean-reversion focused.',
    icon: IconTarget,
    factors: ['P/E < 12', 'EV/EBITDA < 8', 'FCF Yield > 5%', 'Current Ratio > 1.5', 'Debt/Equity < 0.8'],
    bgColor: '#FFFFFF',
    borderColor: '#1A6B3A',
    accentColor: '#1A6B3A',
  },
  {
    id: 'growth-leaders',
    title: 'Growth Leaders',
    description: 'Companies accelerating revenue and EPS with strong expansion. GARP strategy.',
    icon: IconTrendingUp,
    factors: ['Revenue CAGR > 20%', 'EPS CAGR > 15%', '12M Momentum > 20%', 'P/E < 25', 'ROE > 12%'],
    bgColor: '#FFFFFF',
    borderColor: '#B8860B',
    accentColor: '#B8860B',
  },
  {
    id: 'momentum-leaders',
    title: 'Momentum Leaders',
    description: 'Stocks with sustained price momentum, volume confirmation, 52-week breakouts.',
    icon: IconBolt,
    factors: ['12M Momentum > 30%', 'Volatility < 30%', 'P/E < 20', 'Revenue CAGR > 10%', 'Current Ratio > 1.2'],
    bgColor: '#FFFFFF',
    borderColor: '#2E4D8E',
    accentColor: '#2E4D8E',
  },
  {
    id: 'multibagger-early',
    title: 'Multibagger Early',
    description: 'High-growth small/mid caps with strong ROE, low debt, and early momentum.',
    icon: IconRocket,
    factors: ['Revenue CAGR > 25%', 'EPS CAGR > 20%', 'P/E < 30', 'ROE > 10%', 'Debt/Equity < 1.0'],
    bgColor: '#FFFFFF',
    borderColor: '#B45309',
    accentColor: '#B45309',
  },
  {
    id: 'turnaround',
    title: 'Turnaround',
    description: 'Improving ROE, margin recovery, debt reduction. Early-stage recovery plays.',
    icon: IconRefresh,
    factors: ['ROE Improving', 'Margin Recovery', 'Debt Reduction', 'Early Momentum', 'P/E < 15'],
    bgColor: '#FFFFFF',
    borderColor: '#5B21B6',
    accentColor: '#5B21B6',
  },
  {
    id: 'low-risk-alpha',
    title: 'Low Risk Alpha',
    description: 'Low volatility, low beta with quality fundamentals. Defensive portfolio.',
    icon: IconShield,
    factors: ['Volatility < 20%', 'Dividend Yield > 2%', 'Debt/Equity < 0.4', 'Current Ratio > 1.8', 'ROE > 12%'],
    bgColor: '#FFFFFF',
    borderColor: '#0D7C8C',
    accentColor: '#0D7C8C',
  },
]

export default function ScreenerPage() {
  const [activeTab, setActiveTab] = useState<'prebuilt' | 'custom'>('prebuilt')
  const [isRankDropdownOpen, setIsRankDropdownOpen] = useState(false)
  const [selectedRankBy, setSelectedRankBy] = useState(SCREENERS[0])
  const [isManualFiltersOpen, setIsManualFiltersOpen] = useState(false)
  const [isMarketDropdownOpen, setIsMarketDropdownOpen] = useState(false)
  const [selectedMarket, setSelectedMarket] = useState('US Large Caps (S&P 500)')
  const [selectedModels, setSelectedModels] = useState<string[]>([
    SCREENERS[0].id,
    SCREENERS[1].id,
    SCREENERS[2].id,
  ])
  const [isComparisonRunning, setIsComparisonRunning] = useState(false)
  const [rightPanelTab, setRightPanelTab] = useState<'screener' | 'results'>('screener')
  const [hasResults, setHasResults] = useState(false)
  const [selectedScreener, setSelectedScreener] = useState(SCREENERS[0])
  const [viewMode, setViewMode] = useState<'table' | 'heatmap'>('table')
  const [highlightPanel, setHighlightPanel] = useState(false)

  // Check URL parameters for tab navigation and auto-trigger screener
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const tab = params.get('tab')
      const screenerId = params.get('screener')
      const panel = params.get('panel')
      const action = params.get('action')
      
      // Set active tab
      if (tab === 'custom' || tab === 'prebuilt') {
        setActiveTab(tab)
      }
      
      // Handle "High-Conviction Ideas" - Auto-run Quality Compounders screener
      if (screenerId && tab === 'prebuilt') {
        const screener = SCREENERS.find(s => s.id === screenerId)
        if (screener) {
          setSelectedScreener(screener)
          setRightPanelTab('results')
          setHasResults(true)
        }
      }
      
      // Handle "Compare Stocks" - Open Compare tab
      if (action === 'compare' && tab === 'custom') {
        // Already on compare tab, could pre-select some models
        setSelectedModels([
          SCREENERS[0].id,
          SCREENERS[1].id,
          SCREENERS[2].id,
        ])
      }
      
      // Handle "Logic Builder" - Open Custom Screener panel with highlight
      if (panel === 'custom' && tab === 'prebuilt') {
        setRightPanelTab('screener')
        setHasResults(false)
        setHighlightPanel(true)
        
        // Remove highlight after animation
        setTimeout(() => {
          setHighlightPanel(false)
        }, 3000)
      }
    }
  }, [])

  // Stock data for export
  const stockData = [
    { rank: 1, symbol: 'MA', company: 'Mastercard Incorporated', score: 77, industry: 'CREDIT SERVICES', timeFrame: '3L-5y', quality: 68, value: 58, growth: 72, risk: 45, emp: 85 },
    { rank: 2, symbol: 'NFLX', company: 'Netflix Inc.', score: 76, industry: 'ENTERTAINMENT', timeFrame: '1L-7y', quality: 77, value: 58, growth: 68, risk: 52, emp: 82 },
    { rank: 3, symbol: 'V', company: 'Visa Inc.', score: 72, industry: 'CREDIT SERVICES', timeFrame: '2M-5y', quality: 75, value: 58, growth: 65, risk: 48, emp: 80 },
    { rank: 4, symbol: 'ADBE', company: 'Adobe Inc.', score: 72, industry: 'SOFTWARE-APPLICATION', timeFrame: '1A-5y', quality: 80, value: 58, growth: 62, risk: 42, emp: 78 },
    { rank: 5, symbol: 'NVDA', company: 'NVIDIA Corporation', score: 70, industry: 'SEMICONDUCTORS', timeFrame: '2L-3y', quality: 75, value: 35, growth: 95, risk: 65, emp: 90 },
    { rank: 6, symbol: 'MSFT', company: 'Microsoft Corporation', score: 69, industry: 'SOFTWARE-INFRASTRUCTURE', timeFrame: '3L-7y', quality: 85, value: 55, growth: 75, risk: 38, emp: 92 },
    { rank: 7, symbol: 'AAPL', company: 'Apple Inc.', score: 68, industry: 'CONSUMER ELECTRONICS', timeFrame: '2M-5y', quality: 82, value: 48, growth: 68, risk: 35, emp: 88 },
    { rank: 8, symbol: 'GOOGL', company: 'Alphabet Inc.', score: 67, industry: 'INTERNET CONTENT', timeFrame: '1L-5y', quality: 79, value: 52, growth: 72, risk: 42, emp: 85 },
    { rank: 9, symbol: 'META', company: 'Meta Platforms Inc.', score: 66, industry: 'SOCIAL MEDIA', timeFrame: '1A-3y', quality: 73, value: 42, growth: 78, risk: 55, emp: 82 },
    { rank: 10, symbol: 'TSLA', company: 'Tesla Inc.', score: 65, industry: 'AUTO MANUFACTURERS', timeFrame: '2L-5y', quality: 68, value: 38, growth: 85, risk: 72, emp: 78 },
    { rank: 11, symbol: 'AMZN', company: 'Amazon.com Inc.', score: 64, industry: 'INTERNET RETAIL', timeFrame: '3L-7y', quality: 71, value: 45, growth: 82, risk: 48, emp: 86 },
    { rank: 12, symbol: 'CRM', company: 'Salesforce Inc.', score: 63, industry: 'SOFTWARE-APPLICATION', timeFrame: '1L-5y', quality: 72, value: 44, growth: 71, risk: 52, emp: 79 },
    { rank: 13, symbol: 'UNH', company: 'UnitedHealth Group', score: 62, industry: 'HEALTHCARE PLANS', timeFrame: '2M-5y', quality: 81, value: 62, growth: 55, risk: 38, emp: 87 },
    { rank: 14, symbol: 'JPM', company: 'JPMorgan Chase & Co.', score: 61, industry: 'BANKS-DIVERSIFIED', timeFrame: '1A-5y', quality: 75, value: 67, growth: 52, risk: 45, emp: 80 },
    { rank: 15, symbol: 'HD', company: 'The Home Depot Inc.', score: 60, industry: 'HOME IMPROVEMENT', timeFrame: '2L-5y', quality: 78, value: 59, growth: 48, risk: 42, emp: 83 },
    { rank: 16, symbol: 'PG', company: 'Procter & Gamble Co.', score: 59, industry: 'HOUSEHOLD PRODUCTS', timeFrame: '3L-7y', quality: 84, value: 64, growth: 42, risk: 32, emp: 89 },
    { rank: 17, symbol: 'WMT', company: 'Walmart Inc.', score: 58, industry: 'DISCOUNT STORES', timeFrame: '2M-5y', quality: 70, value: 71, growth: 38, risk: 35, emp: 76 },
    { rank: 18, symbol: 'KO', company: 'The Coca-Cola Company', score: 57, industry: 'BEVERAGES-NON-ALCOHOLIC', timeFrame: '3L-7y', quality: 82, value: 68, growth: 35, risk: 28, emp: 88 },
    { rank: 19, symbol: 'DIS', company: 'The Walt Disney Company', score: 56, industry: 'ENTERTAINMENT', timeFrame: '1L-5y', quality: 69, value: 52, growth: 58, risk: 48, emp: 74 },
    { rank: 20, symbol: 'NKE', company: 'Nike Inc.', score: 55, industry: 'FOOTWEAR & ACCESSORIES', timeFrame: '2L-5y', quality: 76, value: 55, growth: 62, risk: 45, emp: 81 },
  ]

  // CSV Export Function
  const handleExportCSV = () => {
    // Create CSV header
    const headers = ['Rank', 'Symbol', 'Company', 'Score', 'Industry', 'Time Frame', 'Quality', 'Value', 'Growth', 'Risk', 'EMP']
    
    // Create CSV rows
    const rows = stockData.map(stock => [
      stock.rank,
      stock.symbol,
      `"${stock.company}"`, // Wrap in quotes to handle commas
      stock.score,
      `"${stock.industry}"`,
      stock.timeFrame,
      stock.quality,
      stock.value,
      stock.growth,
      stock.risk,
      stock.emp
    ])
    
    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `${selectedScreener.title.replace(/\s+/g, '_')}_Top_20_Stocks.csv`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const MARKET_OPTIONS = [
    'US Large Caps (S&P 500)',
    'India Nifty 50',
    'US - India Combined',
  ]

  const MANUAL_FILTERS = [
    { name: 'ROE', unit: '%', min: 0, max: 100 },
    { name: 'ROCE', unit: '%', min: 0, max: 100 },
    { name: 'P/E Ratio', unit: 'x', min: 0, max: 100 },
    { name: 'EV/EBITDA', unit: 'x', min: 0, max: 50 },
    { name: 'Revenue CAGR', unit: '%', min: 0, max: 100 },
    { name: 'EPS CAGR', unit: '%', min: 0, max: 100 },
    { name: '12M Momentum', unit: '%', min: -100, max: 100 },
    { name: 'Volatility', unit: '%', min: 0, max: 100 },
    { name: 'FCF Yield', unit: '%', min: 0, max: 50 },
    { name: 'Dividend Yield', unit: '%', min: 0, max: 20 },
    { name: 'Current Ratio', unit: 'x', min: 0, max: 10 },
    { name: 'Debt / Equity', unit: 'x', min: 0, max: 5 },
  ]

  return (
    <div style={{ backgroundColor: '#F8F9FB', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div className="max-w-full mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-sm font-medium tracking-wide" style={{ color: '#1B2A4A' }}>
              INSTITUTIONAL SCREENER
            </h1>
            <p style={{ color: '#718096', fontSize: '12px', marginTop: '4px' }}>
              Click any model to instantly rank the universe
            </p>
          </div>
          
          {/* Market Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMarketDropdownOpen(!isMarketDropdownOpen)}
              className="px-4 py-2 rounded-lg border flex items-center gap-2 transition-all hover:opacity-90"
              style={{
                backgroundColor: '#1B2A4A',
                borderColor: '#1B2A4A',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: '500',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              <span>{selectedMarket}</span>
              <IconFilter size={16} stroke={1.5} color="#FFFFFF" />
            </button>

            {isMarketDropdownOpen && (
              <div
                className="absolute top-full right-0 mt-2 rounded-lg border overflow-hidden shadow-lg z-20"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E2E8F0',
                  minWidth: '200px',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {MARKET_OPTIONS.map((market, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedMarket(market)
                      setIsMarketDropdownOpen(false)
                    }}
                    className="w-full px-4 py-3 text-sm font-medium text-left transition-all hover:bg-[#E0F4F6]"
                    style={{
                      color: '#1B2A4A',
                      borderBottom: idx < MARKET_OPTIONS.length - 1 ? '1px solid #E2E8F0' : 'none',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {market}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ backgroundColor: '#1B2A4A', borderBottom: '1px solid #E2E8F0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
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
                  color: activeTab === tab.id ? '#FFFFFF' : '#A0AEC0',
                  borderColor: activeTab === tab.id ? '#0D7C8C' : 'transparent',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - 60/40 Split */}
      <div className="max-w-full mx-auto px-6 py-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {activeTab === 'prebuilt' && (
          <div className="flex gap-6">
            {/* Left: Screener Cards - Dynamic width */}
            <div style={{ width: hasResults ? '35%' : '60%', transition: 'width 0.3s ease' }}>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-medium mb-1" style={{ color: '#1B2A4A' }}>Prebuilt Screeners</h2>
                  <p style={{ color: '#718096', fontSize: '12px' }}>
                    Click any model to instantly rank the universe
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg border" style={{ backgroundColor: '#1B2A4A', borderColor: '#1B2A4A' }}>
                    <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: '500' }}>Top</span>
                    <input
                      type="number"
                      defaultValue="20"
                      className="w-12 px-1 py-0 rounded text-xs border-0 text-center font-semibold"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        backgroundColor: '#FFFFFF',
                        color: '#1B2A4A',
                      }}
                    />
                    <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: '500' }}>stocks</span>
                  </div>
                </div>
              </div>

              <div className={`grid ${hasResults ? 'grid-cols-2' : 'grid-cols-3'} gap-4`} style={{ transition: 'all 0.3s ease' }}>
                {SCREENERS.map((screener) => (
                  <ScreenerCard 
                    key={screener.id} 
                    {...screener} 
                    onResultsClick={() => {
                      setRightPanelTab('results')
                      setHasResults(true)
                      setSelectedScreener(screener)
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right: Logic Builder / Results - Dynamic width */}
            <div style={{ width: hasResults ? '65%' : '40%', transition: 'width 0.3s ease' }}>
              {/* Tabs for Logic Builder */}
              <div className="mb-3 flex gap-2">
                <button
                  onClick={() => setRightPanelTab('screener')}
                  className="px-4 py-2 rounded-lg text-sm font-normal transition-all"
                  style={{
                    backgroundColor: rightPanelTab === 'screener' ? '#1B2A4A' : '#F8F9FB',
                    color: rightPanelTab === 'screener' ? '#FFFFFF' : '#718096',
                    border: rightPanelTab === 'screener' ? 'none' : '1px solid #E2E8F0',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  Custom Screener
                </button>
                <button
                  onClick={() => setRightPanelTab('results')}
                  className="px-4 py-2 rounded-lg text-sm font-normal transition-all"
                  style={{
                    backgroundColor: rightPanelTab === 'results' ? '#1B2A4A' : '#F8F9FB',
                    color: rightPanelTab === 'results' ? '#FFFFFF' : '#718096',
                    border: rightPanelTab === 'results' ? 'none' : '1px solid #E2E8F0',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  Results (20)
                </button>
              </div>

              <div className={`p-6 rounded-lg sticky top-6 transition-all duration-300 ${
                highlightPanel ? 'ring-4 ring-[#0D7C8C] ring-opacity-50 animate-pulse' : ''
              }`} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {rightPanelTab === 'screener' ? (
                  <>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-[#E8E4FF] flex items-center justify-center">
                        <IconSettings size={18} color="#5B21B6" stroke={1.5} />
                      </div>
                      <h3 className="text-base font-normal text-[#1B2A4A]">
                        Logic Builder
                      </h3>
                    </div>

                    {/* Describe Criteria */}
                    <div className="mb-6">
                      <label style={{ color: '#718096', fontSize: '12px', fontWeight: '500', display: 'block', marginBottom: '8px' }}>
                        Describe your criteria
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 'high quality, low debt, strong growth'"
                        className="w-full px-4 py-3 rounded-lg text-sm border transition-all focus:outline-none focus:ring-2 focus:ring-[#0D7C8C]/20"
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
                      className="w-full px-4 py-3 rounded-lg text-sm font-bold text-white mb-6 transition-all hover:shadow-lg active:scale-95"
                      style={{
                        backgroundColor: '#0D7C8C',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      Parse Natural Language
                    </button>

                    {/* Manual Factor Filters */}
                    <div className="mb-6 pt-6 border-t" style={{ borderColor: '#E2E8F0' }}>
                      <button
                        onClick={() => setIsManualFiltersOpen(!isManualFiltersOpen)}
                        className="w-full flex items-center justify-between mb-3"
                      >
                        <label style={{ color: '#718096', fontSize: '12px', fontWeight: '600' }}>
                          Manual Factor Filters
                        </label>
                        <span
                          style={{
                            color: '#0D7C8C',
                            transform: isManualFiltersOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease',
                          }}
                        >
                          ▼
                        </span>
                      </button>

                      {isManualFiltersOpen && (
                        <div
                          style={{
                            maxHeight: '280px',
                            overflowY: 'scroll',
                            overflowX: 'hidden',
                            paddingRight: '8px',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#0D7C8C #E2E8F0',
                            WebkitOverflowScrolling: 'touch',
                          }}
                          onWheel={(e) => {
                            e.stopPropagation()
                          }}
                        >
                          <style>{`
                            .manual-filters-container::-webkit-scrollbar {
                              width: 8px;
                            }
                            .manual-filters-container::-webkit-scrollbar-track {
                              background: #E2E8F0;
                              border-radius: 4px;
                            }
                            .manual-filters-container::-webkit-scrollbar-thumb {
                              background: #0D7C8C;
                              border-radius: 4px;
                            }
                            .manual-filters-container::-webkit-scrollbar-thumb:hover {
                              background: #0A6B7A;
                            }
                          `}</style>
                          <div className="manual-filters-container space-y-3">
                            {MANUAL_FILTERS.map((filter, idx) => (
                              <div key={idx} className="space-y-1.5 pb-2">
                                <div className="flex items-center justify-between">
                                  <label style={{ color: '#1B2A4A', fontSize: '12px', fontWeight: '500' }}>
                                    {filter.name}
                                  </label>
                                  <span style={{ color: '#718096', fontSize: '11px' }}>
                                    {filter.unit}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="number"
                                    placeholder="Min"
                                    min={filter.min}
                                    max={filter.max}
                                    className="flex-1 px-2 py-1.5 rounded text-xs border"
                                    style={{
                                      backgroundColor: '#F8F9FB',
                                      borderColor: '#E2E8F0',
                                      color: '#1B2A4A',
                                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    }}
                                  />
                                  <span style={{ color: '#718096', fontSize: '11px' }}>to</span>
                                  <input
                                    type="number"
                                    placeholder="Max"
                                    min={filter.min}
                                    max={filter.max}
                                    className="flex-1 px-2 py-1.5 rounded text-xs border"
                                    style={{
                                      backgroundColor: '#F8F9FB',
                                      borderColor: '#E2E8F0',
                                      color: '#1B2A4A',
                                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Rank Results By */}
                    <div className="mb-6 pt-6 border-t relative" style={{ borderColor: '#E2E8F0' }}>
                      <label style={{ color: '#718096', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '10px' }}>
                        Rank Results By
                      </label>
                      <button
                        onClick={() => setIsRankDropdownOpen(!isRankDropdownOpen)}
                        className="w-full px-4 py-3 rounded-lg text-sm font-medium text-left flex items-center gap-3 transition-all hover:bg-[#E0F4F6]"
                        style={{
                          backgroundColor: '#F8F9FB',
                          color: '#1B2A4A',
                          border: '1px solid #E2E8F0',
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                      >
                        <selectedRankBy.icon size={16} color={selectedRankBy.accentColor} stroke={1.5} />
                        <span>{selectedRankBy.title}</span>
                        <span className="ml-auto text-xs">▼</span>
                      </button>

                      {/* Dropdown Menu */}
                      {isRankDropdownOpen && (
                        <div
                          className="absolute top-full left-0 right-0 mt-2 rounded-lg border overflow-hidden shadow-lg z-10"
                          style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#E2E8F0',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                          }}
                        >
                          {SCREENERS.map((screener, idx) => (
                            <button
                              key={screener.id}
                              onClick={() => {
                                setSelectedRankBy(screener)
                                setIsRankDropdownOpen(false)
                              }}
                              className="w-full px-4 py-3 text-sm font-medium text-left flex items-center gap-3 transition-all"
                              style={{
                                color: '#1B2A4A',
                                backgroundColor: selectedRankBy.id === screener.id ? '#E0F4F6' : '#FFFFFF',
                                borderBottom: idx < SCREENERS.length - 1 ? '1px solid #E2E8F0' : 'none',
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                              }}
                              onMouseEnter={(e) => {
                                if (selectedRankBy.id !== screener.id) {
                                  e.currentTarget.style.backgroundColor = '#F8F9FB'
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (selectedRankBy.id !== screener.id) {
                                  e.currentTarget.style.backgroundColor = '#FFFFFF'
                                }
                              }}
                            >
                              <screener.icon size={16} color={screener.accentColor} stroke={1.5} />
                              <span>{screener.title}</span>
                              {selectedRankBy.id === screener.id && (
                                <span className="ml-auto text-xs" style={{ color: screener.accentColor }}>✓</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Run Screener Button */}
                    <button
                      onClick={() => {
                        setRightPanelTab('results')
                        setHasResults(true)
                      }}
                      className="w-full px-4 py-3 rounded-lg text-sm font-normal text-white transition-all hover:shadow-lg active:scale-95"
                      style={{
                        backgroundColor: '#0D7C8C',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      ▶ Run Screener
                    </button>
                  </>
                ) : (
                  <>
                    {/* Results Tab Content */}
                    {!hasResults ? (
                      <>
                        <div className="flex items-center gap-2 mb-6">
                          <div className="w-8 h-8 rounded-lg bg-[#E0F4F6] flex items-center justify-center">
                            <IconChartBar size={18} color="#0D7C8C" stroke={1.5} />
                          </div>
                          <h3 className="text-base font-normal text-[#1B2A4A]">
                            Screener Results
                          </h3>
                        </div>

                        <div className="mb-6">
                          <p style={{ color: '#718096', fontSize: '12px', marginBottom: '16px' }}>
                            Click any screener card to see results, or run a custom screener to populate this view.
                          </p>
                          
                          <div className="bg-[#F8F9FB] rounded-lg p-4 border border-[#E2E8F0]">
                            <div className="text-center">
                              <IconTable size={32} color="#718096" stroke={1.5} className="mx-auto mb-2" />
                              <p className="text-sm font-normal text-[#1B2A4A] mb-1">No Results Yet</p>
                              <p className="text-xs text-[#718096]">
                                Select a screener from the left to see stock results
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Results Table Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${selectedScreener.accentColor}15` }}>
                              <selectedScreener.icon size={18} color={selectedScreener.accentColor} stroke={1.5} />
                            </div>
                            <div>
                              <h3 className="text-sm font-normal" style={{ color: '#1B2A4A' }}>
                                {selectedScreener.title}
                              </h3>
                              <p className="text-xs" style={{ color: '#1B2A4A' }}>Top 20 stocks</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setViewMode('table')}
                              className="p-2 rounded-lg hover:bg-[#F8F9FB] transition-all"
                              title="Table View"
                              style={{ 
                                color: viewMode === 'table' ? '#0D7C8C' : '#718096',
                                backgroundColor: viewMode === 'table' ? '#E0F4F6' : 'transparent'
                              }}
                            >
                              <IconTable size={16} stroke={1.5} />
                            </button>
                            <button
                              onClick={() => setViewMode('heatmap')}
                              className="p-2 rounded-lg hover:bg-[#F8F9FB] transition-all"
                              title="Heatmap View"
                              style={{ 
                                color: viewMode === 'heatmap' ? '#0D7C8C' : '#718096',
                                backgroundColor: viewMode === 'heatmap' ? '#E0F4F6' : 'transparent'
                              }}
                            >
                              <IconChartBar size={16} stroke={1.5} />
                            </button>
                            <button
                              onClick={handleExportCSV}
                              className="p-2 rounded-lg hover:bg-[#F8F9FB] transition-all"
                              title="Download CSV"
                              style={{ color: '#718096' }}
                            >
                              <IconDownload size={16} stroke={1.5} />
                            </button>
                          </div>
                        </div>

                        {/* Conditional View: Table or Heatmap */}
                        {viewMode === 'table' ? (
                          /* Inline Results Table with Horizontal Scroll */
                          <div 
                            className="overflow-x-auto overflow-y-auto rounded-lg border border-[#E2E8F0]"
                            style={{
                              maxHeight: 'calc(100vh - 300px)',
                              scrollbarWidth: 'thin',
                              scrollbarColor: `${selectedScreener.accentColor} #E2E8F0`,
                              overscrollBehavior: 'contain',
                            }}
                            onWheel={(e) => {
                              e.stopPropagation()
                            }}
                            onTouchMove={(e) => {
                              e.stopPropagation()
                            }}
                          >
                          <style jsx>{`
                            div::-webkit-scrollbar {
                              width: 6px;
                              height: 6px;
                            }
                            div::-webkit-scrollbar-track {
                              background: #E2E8F0;
                              border-radius: 3px;
                            }
                            div::-webkit-scrollbar-thumb {
                              background: ${selectedScreener.accentColor};
                              border-radius: 3px;
                            }
                          `}</style>
                          <table className="w-full min-w-[1200px]" style={{ fontSize: '11px' }}>
                            <thead style={{ backgroundColor: '#1B2A4A', position: 'sticky', top: 0, zIndex: 10 }}>
                              <tr>
                                <th className="px-3 py-2 text-left font-normal uppercase tracking-wider" style={{ minWidth: '50px', color: '#FFFFFF' }}>#</th>
                                <th className="px-3 py-2 text-left font-normal uppercase tracking-wider" style={{ minWidth: '120px', color: '#FFFFFF' }}>Ticker</th>
                                <th className="px-3 py-2 text-left font-normal uppercase tracking-wider" style={{ minWidth: '80px', color: '#FFFFFF' }}>Score</th>
                                <th className="px-3 py-2 text-left font-normal uppercase tracking-wider" style={{ minWidth: '120px', color: '#FFFFFF' }}>Industry</th>
                                <th className="px-3 py-2 text-left font-normal uppercase tracking-wider" style={{ minWidth: '80px', color: '#FFFFFF' }}>Time Frame</th>
                                <th className="px-3 py-2 text-left font-normal uppercase tracking-wider" style={{ minWidth: '70px', color: '#FFFFFF' }}>Quality</th>
                                <th className="px-3 py-2 text-left font-normal uppercase tracking-wider" style={{ minWidth: '70px', color: '#FFFFFF' }}>Value</th>
                                <th className="px-3 py-2 text-left font-normal uppercase tracking-wider" style={{ minWidth: '70px', color: '#FFFFFF' }}>Growth</th>
                                <th className="px-3 py-2 text-left font-normal uppercase tracking-wider" style={{ minWidth: '70px', color: '#FFFFFF' }}>Risk</th>
                                <th className="px-3 py-2 text-left font-normal uppercase tracking-wider" style={{ minWidth: '70px', color: '#FFFFFF' }}>EMP</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                              {[
                                { rank: 1, symbol: 'MA', company: 'Mastercard Incorporated', score: 77, industry: 'CREDIT SERVICES', timeFrame: '3L-5y', quality: 68, value: 58, growth: 72, risk: 45, emp: 85 },
                                { rank: 2, symbol: 'NFLX', company: 'Netflix Inc.', score: 76, industry: 'ENTERTAINMENT', timeFrame: '1L-7y', quality: 77, value: 58, growth: 68, risk: 52, emp: 82 },
                                { rank: 3, symbol: 'V', company: 'Visa Inc.', score: 72, industry: 'CREDIT SERVICES', timeFrame: '2M-5y', quality: 75, value: 58, growth: 65, risk: 48, emp: 80 },
                                { rank: 4, symbol: 'ADBE', company: 'Adobe Inc.', score: 72, industry: 'SOFTWARE-APPLICATION', timeFrame: '1A-5y', quality: 80, value: 58, growth: 62, risk: 42, emp: 78 },
                                { rank: 5, symbol: 'NVDA', company: 'NVIDIA Corporation', score: 70, industry: 'SEMICONDUCTORS', timeFrame: '2L-3y', quality: 75, value: 35, growth: 95, risk: 65, emp: 90 },
                                { rank: 6, symbol: 'MSFT', company: 'Microsoft Corporation', score: 69, industry: 'SOFTWARE-INFRASTRUCTURE', timeFrame: '3L-7y', quality: 85, value: 55, growth: 75, risk: 38, emp: 92 },
                                { rank: 7, symbol: 'AAPL', company: 'Apple Inc.', score: 68, industry: 'CONSUMER ELECTRONICS', timeFrame: '2M-5y', quality: 82, value: 48, growth: 68, risk: 35, emp: 88 },
                                { rank: 8, symbol: 'GOOGL', company: 'Alphabet Inc.', score: 67, industry: 'INTERNET CONTENT', timeFrame: '1L-5y', quality: 79, value: 52, growth: 72, risk: 42, emp: 85 },
                                { rank: 9, symbol: 'META', company: 'Meta Platforms Inc.', score: 66, industry: 'SOCIAL MEDIA', timeFrame: '1A-3y', quality: 73, value: 42, growth: 78, risk: 55, emp: 82 },
                                { rank: 10, symbol: 'TSLA', company: 'Tesla Inc.', score: 65, industry: 'AUTO MANUFACTURERS', timeFrame: '2L-5y', quality: 68, value: 38, growth: 85, risk: 72, emp: 78 },
                                { rank: 11, symbol: 'AMZN', company: 'Amazon.com Inc.', score: 64, industry: 'INTERNET RETAIL', timeFrame: '3L-7y', quality: 71, value: 45, growth: 82, risk: 48, emp: 86 },
                                { rank: 12, symbol: 'CRM', company: 'Salesforce Inc.', score: 63, industry: 'SOFTWARE-APPLICATION', timeFrame: '1L-5y', quality: 72, value: 44, growth: 71, risk: 52, emp: 79 },
                                { rank: 13, symbol: 'UNH', company: 'UnitedHealth Group', score: 62, industry: 'HEALTHCARE PLANS', timeFrame: '2M-5y', quality: 81, value: 62, growth: 55, risk: 38, emp: 87 },
                                { rank: 14, symbol: 'JPM', company: 'JPMorgan Chase & Co.', score: 61, industry: 'BANKS-DIVERSIFIED', timeFrame: '1A-5y', quality: 75, value: 67, growth: 52, risk: 45, emp: 80 },
                                { rank: 15, symbol: 'HD', company: 'The Home Depot Inc.', score: 60, industry: 'HOME IMPROVEMENT', timeFrame: '2L-5y', quality: 78, value: 59, growth: 48, risk: 42, emp: 83 },
                                { rank: 16, symbol: 'PG', company: 'Procter & Gamble Co.', score: 59, industry: 'HOUSEHOLD PRODUCTS', timeFrame: '3L-7y', quality: 84, value: 64, growth: 42, risk: 32, emp: 89 },
                                { rank: 17, symbol: 'WMT', company: 'Walmart Inc.', score: 58, industry: 'DISCOUNT STORES', timeFrame: '2M-5y', quality: 70, value: 71, growth: 38, risk: 35, emp: 76 },
                                { rank: 18, symbol: 'KO', company: 'The Coca-Cola Company', score: 57, industry: 'BEVERAGES-NON-ALCOHOLIC', timeFrame: '3L-7y', quality: 82, value: 68, growth: 35, risk: 28, emp: 88 },
                                { rank: 19, symbol: 'DIS', company: 'The Walt Disney Company', score: 56, industry: 'ENTERTAINMENT', timeFrame: '1L-5y', quality: 69, value: 52, growth: 58, risk: 48, emp: 74 },
                                { rank: 20, symbol: 'NKE', company: 'Nike Inc.', score: 55, industry: 'FOOTWEAR & ACCESSORIES', timeFrame: '2L-5y', quality: 76, value: 55, growth: 62, risk: 45, emp: 81 },
                              ].map((stock) => (
                                <tr key={stock.rank} className="hover:bg-[#F8F9FB] transition-colors cursor-pointer">
                                  <td className="px-3 py-3 whitespace-nowrap">
                                    <span className="font-bold" style={{ color: '#1B2A4A' }}>{stock.rank}</span>
                                  </td>
                                  <td className="px-3 py-3 whitespace-nowrap">
                                    <div>
                                      <div className="font-bold" style={{ color: '#1B2A4A' }}>{stock.symbol}</div>
                                      <div className="text-[10px]" style={{ color: '#1B2A4A' }}>{stock.company}</div>
                                    </div>
                                  </td>
                                  <td className="px-3 py-3 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold" style={{ color: '#1B2A4A' }}>{stock.score}</span>
                                      <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div 
                                          className="h-full rounded-full" 
                                          style={{ 
                                            width: `${stock.score}%`, 
                                            backgroundColor: selectedScreener.accentColor 
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-3 py-3 whitespace-nowrap">
                                    <span 
                                      className="px-2 py-1 rounded text-[10px] font-semibold"
                                      style={{ 
                                        backgroundColor: `${selectedScreener.accentColor}15`,
                                        color: selectedScreener.accentColor
                                      }}
                                    >
                                      {stock.industry}
                                    </span>
                                  </td>
                                  <td className="px-3 py-3 whitespace-nowrap" style={{ color: '#1B2A4A' }}>{stock.timeFrame}</td>
                                  <td className="px-3 py-3 whitespace-nowrap font-semibold" style={{ color: selectedScreener.accentColor }}>{stock.quality}</td>
                                  <td className="px-3 py-3 whitespace-nowrap font-semibold" style={{ color: selectedScreener.accentColor }}>{stock.value}</td>
                                  <td className="px-3 py-3 whitespace-nowrap font-semibold" style={{ color: selectedScreener.accentColor }}>{stock.growth}</td>
                                  <td className="px-3 py-3 whitespace-nowrap font-semibold" style={{ color: selectedScreener.accentColor }}>{stock.risk}</td>
                                  <td className="px-3 py-3 whitespace-nowrap font-semibold" style={{ color: selectedScreener.accentColor }}>{stock.emp}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        ) : (
                          /* Heatmap View - Table Style */
                          <div>
                            {/* Color Legend */}
                            <div className="flex items-center justify-end gap-4 mb-3 px-2">
                              <span className="text-xs font-normal" style={{ color: '#718096' }}>Score:</span>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#1A6B3A' }}></div>
                                  <span className="text-xs" style={{ color: '#1B2A4A' }}>≥80</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#22C55E' }}></div>
                                  <span className="text-xs" style={{ color: '#1B2A4A' }}>65-79</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#B8860B' }}></div>
                                  <span className="text-xs" style={{ color: '#1B2A4A' }}>50-64</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#EAB308' }}></div>
                                  <span className="text-xs" style={{ color: '#1B2A4A' }}>35-49</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#DC2626' }}></div>
                                  <span className="text-xs" style={{ color: '#1B2A4A' }}>&lt;35</span>
                                </div>
                              </div>
                            </div>

                            <div 
                              className="overflow-x-auto overflow-y-auto rounded-lg border border-[#E2E8F0]"
                              style={{
                                maxHeight: 'calc(100vh - 280px)',
                                minHeight: '600px',
                                scrollbarWidth: 'thin',
                                scrollbarColor: `#0D7C8C #E2E8F0`,
                                overscrollBehavior: 'contain',
                              }}
                              onWheel={(e) => {
                                e.stopPropagation()
                              }}
                              onTouchMove={(e) => {
                                e.stopPropagation()
                              }}
                            >
                              <style jsx>{`
                                div::-webkit-scrollbar {
                                  width: 6px;
                                  height: 6px;
                                }
                                div::-webkit-scrollbar-track {
                                  background: #E2E8F0;
                                  border-radius: 3px;
                                }
                                div::-webkit-scrollbar-thumb {
                                  background: #0D7C8C;
                                  border-radius: 3px;
                                }
                              `}</style>
                              
                              {/* Table-style Heatmap */}
                              <table className="w-full" style={{ backgroundColor: '#1B2A4A', borderCollapse: 'separate', borderSpacing: '2px' }}>
                                <thead>
                                  <tr>
                                    <th className="sticky left-0 z-20 px-3 py-3 text-left text-xs font-normal" style={{ backgroundColor: '#1B2A4A', color: '#FFFFFF', minWidth: '100px' }}>
                                      Metric
                                    </th>
                                    {['MA', 'NFLX', 'V', 'ADBE', 'NVDA', 'MSFT', 'AAPL', 'GOOGL', 'META', 'TSLA', 'AMZN', 'CRM', 'UNH', 'JPM', 'HD', 'PG', 'WMT', 'KO', 'DIS', 'NKE'].map((symbol) => (
                                      <th key={symbol} className="px-2 py-3 text-center text-xs font-normal" style={{ backgroundColor: '#1B2A4A', color: '#FFFFFF', minWidth: '60px' }}>
                                        {symbol}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {[
                                    { metric: 'ROE', values: [96, 81, 82, 86, 88, 95, 83, 100, 89, 68, 65, 56, 46, 39, 70, 61, 72, 68, 55, 76] },
                                    { metric: 'ROCE', values: [96, 86, 91, 95, 79, 98, 71, 32, 93, 77, 59, 82, 89, 52, 88, 75, 70, 82, 69, 73] },
                                    { metric: 'P/E', values: [45, 38, 42, 48, 52, 41, 39, 35, 44, 58, 47, 51, 43, 49, 46, 40, 44, 42, 50, 47] },
                                    { metric: 'EV/EBITDA', values: [52, 45, 48, 51, 58, 47, 44, 41, 49, 62, 53, 56, 50, 54, 52, 46, 50, 48, 55, 53] },
                                    { metric: 'Rev CAGR', values: [89, 88, 72, 67, 81, 28, 53, 26, 98, 82, 96, 56, 18, 95, 86, 25, 45, 38, 52, 68] },
                                    { metric: 'EPS CAGR', values: [92, 85, 78, 73, 84, 32, 58, 29, 95, 79, 93, 61, 22, 91, 83, 28, 48, 42, 56, 71] },
                                    { metric: '12M Mom', values: [68, 72, 65, 70, 88, 75, 62, 78, 71, 85, 69, 73, 66, 74, 67, 63, 70, 68, 64, 76] },
                                    { metric: '6M Mom', values: [65, 68, 62, 67, 82, 71, 59, 74, 68, 79, 66, 70, 63, 71, 64, 60, 67, 65, 61, 73] },
                                    { metric: 'Vol', values: [79, 21, 82, 38, 47, 63, 93, 68, 11, 61, 7, 88, 25, 9, 37, 89, 72, 85, 45, 78] },
                                    { metric: 'Beta', values: [85, 42, 88, 55, 68, 75, 92, 72, 38, 65, 28, 82, 48, 35, 58, 91, 78, 87, 62, 80] },
                                    { metric: 'D/E', values: [12, 65, 63, 68, 23, 29, 54, 58, 25, 79, 35, 56, 52, 94, 98, 46, 88, 71, 62, 75] },
                                    { metric: 'FCF Yld', values: [68, 72, 65, 70, 58, 62, 75, 71, 68, 55, 78, 66, 72, 69, 74, 67, 70, 73, 65, 71] },
                                    { metric: 'P/B', values: [52, 48, 55, 51, 45, 49, 58, 54, 50, 42, 60, 53, 56, 54, 57, 51, 55, 56, 50, 54] },
                                    { metric: 'Curr Ratio', values: [78, 82, 75, 80, 72, 76, 85, 79, 74, 68, 88, 77, 81, 80, 83, 76, 79, 82, 73, 80] },
                                    { metric: 'Model Score', values: [77, 76, 72, 72, 68, 67, 66, 65, 64, 64, 64, 62, 62, 62, 62, 59, 58, 57, 56, 55] },
                                  ].map((row, rowIdx) => {
                                    const getHeatmapColor = (score: number) => {
                                      if (score >= 80) return '#1A6B3A'
                                      if (score >= 65) return '#22C55E'
                                      if (score >= 50) return '#B8860B'
                                      if (score >= 35) return '#EAB308'
                                      return '#DC2626'
                                    }

                                    return (
                                      <tr key={rowIdx}>
                                        <td className="sticky left-0 z-10 px-3 py-3 text-xs font-normal" style={{ backgroundColor: '#1B2A4A', color: '#FFFFFF' }}>
                                          {row.metric}
                                        </td>
                                        {row.values.map((value, colIdx) => (
                                          <td 
                                            key={colIdx} 
                                            className="px-2 py-3 text-center text-xs font-normal cursor-pointer transition-all hover:scale-105"
                                            style={{ 
                                              backgroundColor: getHeatmapColor(value),
                                              color: '#FFFFFF',
                                              minWidth: '60px'
                                            }}
                                          >
                                            {value}
                                          </td>
                                        ))}
                                      </tr>
                                    )
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'custom' && (
          <div className="space-y-6">
            {/* Model Comparison Header */}
            <div>
              <h2 className="text-2xl font-normal text-[#1B2A4A] mb-2">Model Comparison</h2>
              <p style={{ color: '#718096', fontSize: '14px' }}>
                Compare which stocks appear across multiple models and analyse portfolio overlap
              </p>
            </div>

            {/* Model Selection Section */}
            <div
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E2E8F0',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <label style={{ color: '#718096', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Select Models to Compare
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-[#F8F9FB] px-3 py-2 rounded-lg border border-[#E2E8F0]">
                    <span style={{ color: '#718096', fontSize: '12px', fontWeight: '500' }}>Top</span>
                    <input
                      type="number"
                      defaultValue="20"
                      className="w-12 px-1 py-0 rounded text-[#1B2A4A] text-xs border-0 bg-transparent text-center font-semibold"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    />
                  </div>
                  <button
                    onClick={() => setIsComparisonRunning(true)}
                    disabled={selectedModels.length < 2}
                    className="px-6 py-2 rounded-lg text-sm font-normal text-white transition-all hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: selectedModels.length >= 2 ? '#5B21B6' : '#A0AEC0',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    ⇄ Compare
                  </button>
                </div>
              </div>

              {/* Model Selection Buttons */}
              <div className="flex flex-wrap gap-3">
                {SCREENERS.map((screener) => {
                  const isSelected = selectedModels.includes(screener.id)
                  return (
                    <button
                      key={screener.id}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedModels(selectedModels.filter(id => id !== screener.id))
                        } else {
                          setSelectedModels([...selectedModels, screener.id])
                        }
                      }}
                      className="px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all hover:shadow-md flex items-center gap-2"
                      style={{
                        backgroundColor: isSelected ? `${screener.accentColor}15` : '#FFFFFF',
                        borderColor: screener.borderColor,
                        borderWidth: isSelected ? '2px' : '2px',
                        color: screener.accentColor,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        boxShadow: isSelected ? `0 0 12px ${screener.accentColor}30` : 'none',
                      }}
                    >
                      <screener.icon size={16} stroke={1.5} />
                      {screener.title}
                      {isSelected && <span className="ml-1">✓</span>}
                    </button>
                  )
                })}
              </div>
            </div>

            {!isComparisonRunning ? (
              /* Empty State */
              <div
                className="rounded-2xl border-2 p-12 text-center"
                style={{
                  backgroundColor: selectedModels.length >= 2 ? '#E0F4F6' : '#F8F9FB',
                  borderColor: selectedModels.length >= 2 ? '#0D7C8C' : '#E2E8F0',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                <div className="text-5xl mb-4">⇄</div>
                <p style={{ color: selectedModels.length >= 2 ? '#0D7C8C' : '#718096', fontSize: '14px', fontWeight: selectedModels.length >= 2 ? '600' : '400' }}>
                  {selectedModels.length >= 2 
                    ? `${selectedModels.length} models selected - Ready to compare!` 
                    : 'Select 2+ models and click Compare'}
                </p>
              </div>
            ) : (
              /* Comparison Results */
              <div className="space-y-6">
                {/* Portfolio Overlap Matrix */}
                <div
                  className="rounded-2xl border-2 p-6"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  <h3 className="text-lg font-bold text-[#1B2A4A] mb-4">Portfolio Overlap Matrix (# shared stocks in top 20)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr>
                          <th style={{ color: '#718096', textAlign: 'left', padding: '8px', borderBottom: '1px solid #E2E8F0' }}>Model</th>
                          {selectedModels.map((modelId) => {
                            const model = SCREENERS.find(s => s.id === modelId)
                            return (
                              <th key={modelId} style={{ color: model?.accentColor, textAlign: 'center', padding: '8px', borderBottom: '1px solid #E2E8F0', fontWeight: '600' }}>
                                {model?.title}
                              </th>
                            )
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {selectedModels.map((modelId, rowIdx) => {
                          const model = SCREENERS.find(s => s.id === modelId)
                          return (
                            <tr key={modelId}>
                              <td style={{ color: model?.accentColor, padding: '8px', borderBottom: '1px solid #E2E8F0', fontWeight: '600' }}>
                                {model?.title}
                              </td>
                              {selectedModels.map((compareModelId, colIdx) => {
                                let overlapValue = 20
                                if (modelId === compareModelId) {
                                  overlapValue = 20
                                } else if (rowIdx < colIdx) {
                                  // Generate consistent values for upper triangle
                                  overlapValue = Math.floor(Math.random() * 12) + 8
                                } else {
                                  // Mirror the upper triangle for lower triangle
                                  overlapValue = Math.floor(Math.random() * 12) + 8
                                }
                                return (
                                  <td 
                                    key={compareModelId} 
                                    style={{ 
                                      color: '#1B2A4A', 
                                      textAlign: 'center', 
                                      padding: '8px', 
                                      borderBottom: '1px solid #E2E8F0',
                                      backgroundColor: modelId === compareModelId ? '#E0F4F6' : 'transparent',
                                      fontWeight: modelId === compareModelId ? '700' : '500'
                                    }}
                                  >
                                    {overlapValue}
                                  </td>
                                )
                              })}
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Top Stocks by Combined Score */}
                <div
                  className="rounded-2xl border-2 p-6"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  <h3 className="text-lg font-normal text-[#1B2A4A] mb-4">Top Stocks by Combined Score Across Models</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart
                      data={['JNJ', 'ADBE', 'LLY', 'AVGO', 'NFLX', 'MA', 'NVDA', 'GOOGL', 'ACN', 'MCO', 'AAPL', 'MSFT', 'DIS', 'WMT', 'QCOM'].map((stock) => ({
                        name: stock,
                        ...Object.fromEntries(
                          selectedModels.map((modelId) => [
                            SCREENERS.find(s => s.id === modelId)?.title || '',
                            Math.floor(Math.random() * 30) + 50,
                          ])
                        ),
                      }))}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="name" stroke="#718096" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#718096" style={{ fontSize: '12px' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px',
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                        cursor={{ fill: 'rgba(13, 124, 140, 0.1)' }}
                      />
                      <Legend wrapperStyle={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
                      {selectedModels.map((modelId) => {
                        const model = SCREENERS.find(s => s.id === modelId)
                        return (
                          <Bar
                            key={modelId}
                            dataKey={model?.title || ''}
                            fill={model?.accentColor}
                            radius={[8, 8, 0, 0]}
                          />
                        )
                      })}
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Individual Model Results */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedModels.map((modelId) => {
                    const model = SCREENERS.find(s => s.id === modelId)
                    const chartData = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'TSLA', 'META', 'NFLX', 'ADBE', 'CRM'].map((stock) => ({
                      name: stock,
                      score: Math.floor(Math.random() * 40) + 60,
                    }))
                    return (
                      <div
                        key={modelId}
                        className="rounded-2xl border-2 p-6"
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderColor: model?.borderColor,
                          borderTop: `4px solid ${model?.accentColor}`,
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <model.icon size={20} color={model?.accentColor} stroke={1.5} />
                          <h4 className="text-base font-bold" style={{ color: model?.accentColor }}>
                            {model?.title}
                          </h4>
                        </div>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart
                            data={chartData}
                            margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                            layout="vertical"
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis type="number" stroke="#718096" style={{ fontSize: '11px' }} />
                            <YAxis dataKey="name" type="category" stroke="#718096" style={{ fontSize: '11px' }} width={50} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: '#FFFFFF',
                                border: `1px solid ${model?.accentColor}`,
                                borderRadius: '8px',
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                              }}
                              cursor={{ fill: `${model?.accentColor}10` }}
                            />
                            <Bar dataKey="score" fill={model?.accentColor} radius={[0, 8, 8, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )
                  })}
                </div>

                {/* Back Button */}
                <button
                  onClick={() => setIsComparisonRunning(false)}
                  className="px-6 py-2 rounded-lg text-sm font-bold transition-all hover:shadow-lg"
                  style={{
                    backgroundColor: '#F8F9FB',
                    color: '#0D7C8C',
                    border: '1px solid #E2E8F0',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  ← Back to Selection
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
