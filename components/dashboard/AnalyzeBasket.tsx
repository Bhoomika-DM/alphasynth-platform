'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconTrendingUp, IconPlus, IconX, IconChartBar } from '@tabler/icons-react'

interface AnalyzeBasketProps {
}

const indexBaskets = [
  { id: 'nifty50', name: 'NIFTY 50', stocks: 50 },
  { id: 'niftyNext50', name: 'NIFTY Next 50', stocks: 50 },
  { id: 'niftyMidcap100', name: 'NIFTY Midcap 100', stocks: 100 },
  { id: 'niftyBankNifty', name: 'NIFTY BankNifty 100', stocks: 100 },
  { id: 'niftyBank', name: 'NIFTY Bank', stocks: 12 },
  { id: 'niftyIT', name: 'NIFTY IT', stocks: 10 },
  { id: 'niftyPharma', name: 'NIFTY Pharma', stocks: 10 },
  { id: 'niftyFMCG', name: 'NIFTY FMCG', stocks: 15 },
  { id: 'niftyAuto', name: 'NIFTY Auto', stocks: 15 },
  { id: 'niftyMetal', name: 'NIFTY Metal', stocks: 15 },
  { id: 'niftyRealty', name: 'NIFTY Realty', stocks: 10 },
  { id: 'niftyEnergy', name: 'NIFTY Energy', stocks: 10 }
]

export default function AnalyzeBasket({}: AnalyzeBasketProps) {
  const [selectedBaskets, setSelectedBaskets] = useState<string[]>([])
  const router = useRouter()

  const toggleBasket = (basketId: string) => {
    if (selectedBaskets.includes(basketId)) {
      setSelectedBaskets(selectedBaskets.filter(id => id !== basketId))
    } else {
      setSelectedBaskets([...selectedBaskets, basketId])
    }
  }

  const handleCustomAnalysis = () => {
    const basketsQuery = selectedBaskets.join(',')
    router.push(`/portfolio-results?baskets=${basketsQuery}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-2xl font-jakarta font-bold text-[#1F2933] mb-1">Analyze Basket</h4>
          <p className="text-base font-jakarta text-[#6B7280]">Select index baskets to analyze performance and statistics</p>
        </div>
      </div>

      {/* India Index Baskets */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h5 className="text-lg font-jakarta font-bold text-[#1F2933] flex items-center gap-2">
            <IconChartBar className="w-5 h-5 text-[#6A994E]" stroke={1.5} />
            India Index Baskets
          </h5>
          <span className="text-sm font-jakarta text-[#6B7280]">
            {selectedBaskets.length} selected
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {indexBaskets.map((basket) => {
            const isSelected = selectedBaskets.includes(basket.id)
            return (
              <button
                key={basket.id}
                onClick={() => toggleBasket(basket.id)}
                className={`group relative p-4 rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#6A994E]/10 border-[#6A994E] shadow-md'
                    : 'bg-white border-[#6A994E]/20 hover:border-[#6A994E]/40 hover:bg-[#F4F7F2]'
                }`}
              >
                {/* Selection indicator */}
                <div className={`absolute top-2 right-2 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  isSelected
                    ? 'border-[#6A994E] bg-[#6A994E]'
                    : 'border-[#6A994E]/30 bg-transparent'
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                <div className="text-left">
                  <div className={`text-sm font-jakarta font-bold mb-1 transition-colors ${
                    isSelected ? 'text-[#6A994E]' : 'text-[#1F2933]'
                  }`}>
                    {basket.name}
                  </div>
                  <div className="text-xs font-jakarta text-[#6B7280]">
                    {basket.stocks} stocks
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Analyze Custom Portfolio Section */}
      <div className="relative bg-white border-2 border-[#6A994E]/20 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-lg font-jakarta font-bold text-[#1F2933] mb-1">Analyze a custom portfolio</h5>
            <p className="text-sm font-jakarta text-[#6B7280]">Enter any combination of symbols, names or groups</p>
          </div>
          <button
            onClick={handleCustomAnalysis}
            disabled={selectedBaskets.length === 0}
            className={`px-6 py-3 rounded-md font-jakarta font-semibold text-sm transition-all duration-200 border-2 ${
              selectedBaskets.length > 0
                ? 'bg-[#A7C4A0] border-[#6A994E]/30 text-[#1F2933] hover:bg-[#6A994E] hover:text-white'
                : 'bg-[#F4F7F2] border-[#6A994E]/10 text-[#6B7280] cursor-not-allowed'
            }`}
          >
            Custom Analysis
          </button>
        </div>
      </div>

      {/* Selected Baskets Summary */}
      {selectedBaskets.length > 0 && (
        <div className="relative bg-[#6A994E]/5 border-2 border-[#6A994E]/30 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h5 className="text-sm font-jakarta font-bold text-[#1F2933] mb-1">Selected Baskets</h5>
              <p className="text-xs font-jakarta text-[#6B7280]">
                {selectedBaskets.reduce((total, id) => {
                  const basket = indexBaskets.find(b => b.id === id)
                  return total + (basket?.stocks || 0)
                }, 0)} total stocks across {selectedBaskets.length} baskets
              </p>
            </div>
            <button
              onClick={() => setSelectedBaskets([])}
              className="text-xs font-jakarta text-[#6B7280] hover:text-[#1F2933] transition-colors"
            >
              Clear all
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {selectedBaskets.map((basketId) => {
              const basket = indexBaskets.find(b => b.id === basketId)
              if (!basket) return null
              
              return (
                <div
                  key={basketId}
                  className="flex items-center gap-2 px-3 py-2 bg-white border-2 border-[#6A994E]/30 rounded-md"
                >
                  <span className="text-xs font-jakarta font-semibold text-[#6A994E]">
                    {basket.name}
                  </span>
                  <button
                    onClick={() => toggleBasket(basketId)}
                    className="p-0.5 hover:bg-[#F4F7F2] rounded transition-colors"
                  >
                    <IconX className="w-3 h-3 text-[#6B7280] hover:text-[#1F2933]" stroke={1.5} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
