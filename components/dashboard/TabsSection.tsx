'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Heatmap from './Heatmap'
import Watchlist from './Watchlist'
import Portfolio from './Portfolio'

interface TabsSectionProps {
  liveMode: boolean
}
import { IconChartBar, IconStar, IconBriefcase } from '@tabler/icons-react'

const tabs = [
  { id: 'heatmap', label: 'Sector Heatmap', Icon: IconChartBar },
  { id: 'watchlist', label: 'Watchlist', Icon: IconStar },
  { id: 'portfolio', label: 'Portfolio', Icon: IconBriefcase }
]

export default function TabsSection({ liveMode }: TabsSectionProps) {
  const [activeTab, setActiveTab] = useState('heatmap')
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
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, [activeTab])

  return (
    <div
      ref={containerRef}
      className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(34,197,94,0.08)]"
    >
      {/* Glow Orb */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-glow-primary/20 rounded-full blur-3xl pointer-events-none" />
      
      {/* Tabs Header */}
      <div className="relative border-b border-white/10 px-6 py-5 bg-gradient-to-r from-black/40 to-transparent">
        <div className="flex items-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.Icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3.5 rounded-xl font-jakarta font-semibold text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-br from-glow-primary/20 to-glow-primary/5 text-glow-primary border border-glow-primary/40 shadow-[0_0_20px_rgba(34,197,94,0.2)]'
                    : 'text-text-secondary hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className="inline-block w-4 h-4 mr-2" stroke={1.5} />
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-glow-primary to-transparent" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div ref={contentRef} className="p-6">
        {activeTab === 'heatmap' && <Heatmap />}
        {activeTab === 'watchlist' && <Watchlist />}
        {activeTab === 'portfolio' && <Portfolio />}
      </div>
    </div>
  )
}
