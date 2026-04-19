'use client'

import { useState, useEffect, useCallback } from 'react'

interface StockData {
  rank: number
  symbol: string
  company: string
  quality: number
  value: number
  growth: number
  risk: number
  emp: number
  target: number
  grade: string
  postCap: string
  roic: number
  sales: number
  ebitda: number
  fcf: number
}

interface StockResultsTableProps {
  screenerTitle: string
  screenerColor: string
  onClose: () => void
}

// Mock data - replace with actual API data
const MOCK_STOCK_DATA: StockData[] = [
  {
    rank: 1,
    symbol: 'JNJ',
    company: 'Johnson & Johnson',
    quality: 77,
    value: 65,
    growth: 45,
    risk: 25,
    emp: 85,
    target: 180,
    grade: 'A+',
    postCap: '441.2B',
    roic: 15.2,
    sales: 94.9,
    ebitda: 28.1,
    fcf: 22.5
  },
  {
    rank: 2,
    symbol: 'MSFT',
    company: 'Microsoft Corporation',
    quality: 85,
    value: 55,
    growth: 75,
    risk: 20,
    emp: 92,
    target: 420,
    grade: 'A+',
    postCap: '2.8T',
    roic: 18.7,
    sales: 211.9,
    ebitda: 89.4,
    fcf: 65.2
  },
  {
    rank: 3,
    symbol: 'AAPL',
    company: 'Apple Inc.',
    quality: 82,
    value: 48,
    growth: 68,
    risk: 22,
    emp: 88,
    target: 200,
    grade: 'A',
    postCap: '3.1T',
    roic: 26.3,
    sales: 383.3,
    ebitda: 123.7,
    fcf: 99.8
  },
  {
    rank: 4,
    symbol: 'GOOGL',
    company: 'Alphabet Inc.',
    quality: 79,
    value: 52,
    growth: 72,
    risk: 28,
    emp: 85,
    target: 165,
    grade: 'A',
    postCap: '2.1T',
    roic: 22.1,
    sales: 307.4,
    ebitda: 84.3,
    fcf: 69.5
  },
  {
    rank: 5,
    symbol: 'NVDA',
    company: 'NVIDIA Corporation',
    quality: 75,
    value: 35,
    growth: 95,
    risk: 45,
    emp: 90,
    target: 950,
    grade: 'A-',
    postCap: '2.9T',
    roic: 35.8,
    sales: 126.0,
    ebitda: 73.0,
    fcf: 58.1
  },
  {
    rank: 6,
    symbol: 'META',
    company: 'Meta Platforms Inc.',
    quality: 73,
    value: 42,
    growth: 78,
    risk: 38,
    emp: 82,
    target: 580,
    grade: 'B+',
    postCap: '1.3T',
    roic: 29.4,
    sales: 134.9,
    ebitda: 57.1,
    fcf: 43.9
  }
]

const getScoreColor = (score: number): string => {
  if (score >= 80) return '#22C55E' // Green
  if (score >= 60) return '#EAB308' // Yellow
  if (score >= 40) return '#F97316' // Orange
  return '#EF4444' // Red
}

const getGradeColor = (grade: string): string => {
  if (grade.startsWith('A')) return '#22C55E'
  if (grade.startsWith('B')) return '#EAB308'
  if (grade.startsWith('C')) return '#F97316'
  return '#EF4444'
}

export default function StockResultsTable({ screenerTitle, screenerColor, onClose }: StockResultsTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof StockData>('rank')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleClose = useCallback(() => {
    // Restore body scroll before closing
    document.body.style.overflow = 'unset'
    onClose()
  }, [onClose])

  // Prevent background scrolling when modal is open
  useEffect(() => {
    // Disable body scroll
    document.body.style.overflow = 'hidden'
    
    // Add escape key listener
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }
    
    document.addEventListener('keydown', handleEscapeKey)
    
    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [handleClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop, not the modal content
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleSort = (column: keyof StockData) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const sortedData = [...MOCK_STOCK_DATA].sort((a, b) => {
    const aVal = a[sortColumn]
    const bVal = b[sortColumn]
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
    }
    
    const aStr = String(aVal).toLowerCase()
    const bStr = String(bVal).toLowerCase()
    
    if (sortDirection === 'asc') {
      return aStr < bStr ? -1 : aStr > bStr ? 1 : 0
    } else {
      return aStr > bStr ? -1 : aStr < bStr ? 1 : 0
    }
  })

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden"
        style={{ border: `2px solid ${screenerColor}` }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Header */}
        <div 
          className="px-6 py-4 border-b flex items-center justify-between"
          style={{ 
            backgroundColor: `${screenerColor}10`,
            borderColor: `${screenerColor}30`
          }}
        >
          <div>
            <h2 className="text-xl font-bold text-[#1B2A4A]">
              {screenerTitle} Results
            </h2>
            <p className="text-sm text-[#718096] mt-1">
              Top 20 stocks ranked by {screenerTitle.toLowerCase()} criteria
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-white transition-all"
            style={{ color: screenerColor }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Table Container with Horizontal Scroll */}
        <div 
          className="overflow-auto max-h-[calc(90vh-120px)] table-scroll-container"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: `${screenerColor} #E2E8F0`,
            WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
            overscrollBehavior: 'contain' // Prevent background scroll
          }}
          onWheel={(e) => {
            // Prevent event from bubbling up to prevent background scroll
            e.stopPropagation()
          }}
          onTouchMove={(e) => {
            // Prevent background scroll on touch devices
            e.stopPropagation()
          }}
        >
          <style jsx>{`
            .table-scroll-container::-webkit-scrollbar {
              width: 8px;
              height: 8px;
            }
            .table-scroll-container::-webkit-scrollbar-track {
              background: #E2E8F0;
              border-radius: 4px;
            }
            .table-scroll-container::-webkit-scrollbar-thumb {
              background: ${screenerColor};
              border-radius: 4px;
            }
            .table-scroll-container::-webkit-scrollbar-thumb:hover {
              background: ${screenerColor}CC;
            }
            .table-scroll-container::-webkit-scrollbar-corner {
              background: #E2E8F0;
            }
          `}</style>
          <table className="w-full min-w-[1600px]">
            <thead 
              className="sticky top-0 z-10"
              style={{ backgroundColor: '#F8F9FB' }}
            >
              <tr>
                <th 
                  className="px-4 py-3 text-left text-xs font-bold text-[#718096] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-all sticky left-0 z-20"
                  onClick={() => handleSort('symbol')}
                  style={{ 
                    minWidth: '180px',
                    backgroundColor: '#F8F9FB',
                    borderRight: '1px solid #E2E8F0'
                  }}
                >
                  Stock {sortColumn === 'symbol' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-bold text-[#718096] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-all"
                  onClick={() => handleSort('quality')}
                  style={{ minWidth: '80px' }}
                >
                  Quality {sortColumn === 'quality' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-bold text-[#718096] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-all"
                  onClick={() => handleSort('value')}
                  style={{ minWidth: '80px' }}
                >
                  Value {sortColumn === 'value' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-bold text-[#718096] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-all"
                  onClick={() => handleSort('growth')}
                  style={{ minWidth: '80px' }}
                >
                  Growth {sortColumn === 'growth' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-bold text-[#718096] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-all"
                  onClick={() => handleSort('risk')}
                  style={{ minWidth: '80px' }}
                >
                  Risk {sortColumn === 'risk' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-bold text-[#718096] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-all"
                  onClick={() => handleSort('emp')}
                  style={{ minWidth: '80px' }}
                >
                  EMP {sortColumn === 'emp' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-bold text-[#718096] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-all"
                  onClick={() => handleSort('target')}
                  style={{ minWidth: '90px' }}
                >
                  Target {sortColumn === 'target' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-bold text-[#718096] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-all"
                  onClick={() => handleSort('grade')}
                  style={{ minWidth: '80px' }}
                >
                  Grade {sortColumn === 'grade' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-bold text-[#718096] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-all"
                  onClick={() => handleSort('postCap')}
                  style={{ minWidth: '100px' }}
                >
                  Mkt Cap {sortColumn === 'postCap' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-bold text-[#718096] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-all"
                  onClick={() => handleSort('roic')}
                  style={{ minWidth: '80px' }}
                >
                  ROIC {sortColumn === 'roic' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-bold text-[#718096] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-all"
                  onClick={() => handleSort('sales')}
                  style={{ minWidth: '90px' }}
                >
                  Sales {sortColumn === 'sales' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-bold text-[#718096] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-all"
                  onClick={() => handleSort('ebitda')}
                  style={{ minWidth: '90px' }}
                >
                  EBITDA {sortColumn === 'ebitda' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-bold text-[#718096] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-all"
                  onClick={() => handleSort('fcf')}
                  style={{ minWidth: '80px' }}
                >
                  FCF {sortColumn === 'fcf' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((stock, index) => (
                <tr 
                  key={`${stock.symbol}-${index}`}
                  className="hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <td 
                    className="px-4 py-4 whitespace-nowrap sticky left-0 z-10 bg-white border-r hover:bg-gray-50"
                    style={{ borderColor: '#E2E8F0' }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: screenerColor }}
                      >
                        {stock.rank}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#1B2A4A]">{stock.symbol}</div>
                        <div className="text-xs text-[#718096] truncate max-w-[120px]">{stock.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold"
                      style={{ 
                        backgroundColor: `${getScoreColor(stock.quality)}20`,
                        color: getScoreColor(stock.quality)
                      }}
                    >
                      {stock.quality}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold"
                      style={{ 
                        backgroundColor: `${getScoreColor(stock.value)}20`,
                        color: getScoreColor(stock.value)
                      }}
                    >
                      {stock.value}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold"
                      style={{ 
                        backgroundColor: `${getScoreColor(stock.growth)}20`,
                        color: getScoreColor(stock.growth)
                      }}
                    >
                      {stock.growth}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold"
                      style={{ 
                        backgroundColor: `${getScoreColor(100 - stock.risk)}20`,
                        color: getScoreColor(100 - stock.risk)
                      }}
                    >
                      {stock.risk}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold"
                      style={{ 
                        backgroundColor: `${getScoreColor(stock.emp)}20`,
                        color: getScoreColor(stock.emp)
                      }}
                    >
                      {stock.emp}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-[#1B2A4A]">
                    ${stock.target}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold"
                      style={{ 
                        backgroundColor: `${getGradeColor(stock.grade)}20`,
                        color: getGradeColor(stock.grade)
                      }}
                    >
                      {stock.grade}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-[#1B2A4A]">
                    {stock.postCap}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-[#1B2A4A]">
                    {stock.roic}%
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-[#1B2A4A]">
                    ${stock.sales}B
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-[#1B2A4A]">
                    ${stock.ebitda}B
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-[#1B2A4A]">
                    ${stock.fcf}B
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div 
          className="px-6 py-4 border-t flex items-center justify-between"
          style={{ 
            backgroundColor: '#F8F9FB',
            borderColor: '#E2E8F0'
          }}
        >
          <div className="text-sm text-[#718096]">
            Showing {sortedData.length} stocks • Scroll horizontally to see all {14} columns
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:shadow-md"
              style={{
                backgroundColor: screenerColor,
                color: 'white'
              }}
            >
              📊 Export CSV
            </button>
            <button
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:shadow-md"
              style={{
                backgroundColor: 'white',
                color: screenerColor,
                border: `1px solid ${screenerColor}`
              }}
            >
              📈 View Charts
            </button>
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-gray-100"
              style={{
                backgroundColor: 'white',
                color: '#718096',
                border: '1px solid #E2E8F0'
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}