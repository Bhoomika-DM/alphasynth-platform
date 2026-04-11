'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { IconLayoutGrid, IconStar, IconChevronRight, IconChartBar } from '@tabler/icons-react'
import Heatmap from './Heatmap'
import Watchlist from './Watchlist'
import AnalyzeBasket from './AnalyzeBasket'

interface AdvancedSectionProps {
}

const sections = [
  { 
    id: 'heatmap', 
    label: 'Sector Performance', 
    icon: IconLayoutGrid,
    description: 'Live market overview',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/40'
  },
  { 
    id: 'watchlist', 
    label: 'Watchlist', 
    icon: IconStar,
    description: 'Tracked stocks',
    color: 'from-yellow-500/20 to-orange-500/20',
    borderColor: 'border-yellow-500/40'
  },
  { 
    id: 'analyzeBasket', 
    label: 'Analyze Basket', 
    icon: IconChartBar,
    description: 'Index baskets',
    color: 'from-[#A7C4A0]/20 to-[#6A994E]/20',
    borderColor: 'border-[#A7C4A0]/40'
  }
]

export default function AdvancedSection({}: AdvancedSectionProps) {
  const [activeSection, setActiveSection] = useState('heatmap')
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.6 }
      )
    }
  }, [])

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      )
    }
  }, [activeSection])

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      {/* Tab Navigation */}
      <div className="flex items-center gap-3 mb-6">
        {sections.map((section) => {
          const Icon = section.icon
          const isActive = activeSection === section.id
          
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`group relative px-6 py-3 rounded-xl border transition-colors duration-100 flex items-center gap-3 ${
                isActive
                  ? `bg-gradient-to-br ${section.color} ${section.borderColor}`
                  : 'bg-white/[0.03] border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.05]'
              }`}
            >
              <Icon className={`w-5 h-5 transition-colors duration-100 ${
                isActive ? 'text-white' : 'text-white/60 group-hover:text-white'
              }`} stroke={1.5} />
              <span className={`text-sm font-jakarta font-semibold transition-colors duration-100 ${
                isActive ? 'text-white' : 'text-white/60 group-hover:text-white'
              }`}>
                {section.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Main Content Area - Full Width */}
      <div
        ref={contentRef}
        className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-8"
      >
        <div className="relative">
          {activeSection === 'heatmap' && <Heatmap />}
          {activeSection === 'watchlist' && <Watchlist />}
          {activeSection === 'analyzeBasket' && <AnalyzeBasket />}
        </div>
      </div>
    </div>
  )
}
