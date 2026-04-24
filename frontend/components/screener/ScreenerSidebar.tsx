'use client'

import { useRouter, usePathname } from 'next/navigation'
import { IconSparkles, IconBell, IconRadar, IconRocket, IconAdjustments, IconStar, IconFileText, IconBook, IconUser } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import Logo from '@/components/Logo'

export default function ScreenerSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const workspaceItems = [
    { id: 'top-signals', icon: IconSparkles, label: 'Top Signals', route: '/screener/top-signals' },
    { id: 'alerts', icon: IconBell, label: 'Alerts', route: '/screener/alerts' },
    { id: 'pattern-scanner', icon: IconRadar, label: 'Pattern Scanner', route: '/screener/pattern-scanner' },
    { id: 'automated-screener', icon: IconRocket, label: 'Automated Screener', route: '/screener/automated' },
    { id: 'manual-screener', icon: IconAdjustments, label: 'Manual Screener', route: '/screener/manual' },
    { id: 'watchlist', icon: IconStar, label: 'Watchlist', route: '/screener/watchlist' },
    { id: 'stock-detail', icon: IconFileText, label: 'Stock Detail', route: '/stock/HINDUNILVR' },
  ]

  const referenceItems = [
    { id: 'glossary', icon: IconBook, label: 'Glossary', route: '/screener/glossary' },
    { id: 'about', icon: IconUser, label: 'About', route: '/screener/about' },
  ]

  if (!mounted) {
    return null
  }

  return (
    <div className="w-64 h-screen bg-[#1B2A4A] text-white flex flex-col fixed left-0 top-0 z-50">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Logo />
      </div>

      {/* Workspace Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-4">
          <div className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">
            Workspace
          </div>
          <div className="space-y-1">
            {workspaceItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.route
              
              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.route)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0D7C8C] text-white shadow-lg'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    isActive 
                      ? 'bg-white/20' 
                      : 'bg-white/10 group-hover:bg-white/15'
                  }`}>
                    <Icon className="w-5 h-5" stroke={1.5} />
                  </div>
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Reference Section */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">
            Reference
          </div>
          <div className="space-y-1">
            {referenceItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.route
              
              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.route)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0D7C8C] text-white shadow-lg'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    isActive 
                      ? 'bg-white/20' 
                      : 'bg-white/90 text-[#1B2A4A] hover:bg-white'
                  }`}>
                    <Icon className="w-5 h-5" stroke={1.5} />
                  </div>
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
