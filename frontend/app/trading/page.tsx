'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import DashboardNavbar from '@/components/dashboard/DashboardNavbar'
import MarketSnapshot from '@/components/dashboard/MarketSnapshot'
import SentimentCard from '@/components/dashboard/SentimentCard'
import MarketSummary from '@/components/dashboard/MarketSummary'
import TopMovers from '@/components/dashboard/TopMovers'
import AdvancedSection from '@/components/dashboard/AdvancedSection'
import AnimatedBackground from '@/components/background/AnimatedBackground'
import NavigationHeader from '@/components/dashboard/NavigationHeader'
import MarketTrendChart from '@/components/charts/MarketTrendChart'
import ErrorBoundary from '@/components/ErrorBoundary'
import AuthModal from '@/components/auth/AuthModal'
import OnboardingModal from '@/components/onboarding/OnboardingModal'

export default function TradingDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  // Refs for sections
  const trendRef = useRef<HTMLDivElement>(null)
  const sectorRef = useRef<HTMLDivElement>(null)
  const moversRef = useRef<HTMLDivElement>(null)
  const signalsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        // Redirect to signup page with return URL
        router.push('/signup?redirect=/trading')
        return
      } else {
        setUser(user)
        
        // Check if user has EVER completed onboarding (global flag)
        const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding')
        console.log('Trading page - hasCompletedOnboarding:', hasCompletedOnboarding)
        if (!hasCompletedOnboarding) {
          console.log('Showing onboarding modal - first time user')
          setShowOnboarding(true)
        }
      }
      setLoading(false)
    }

    getUser()
  }, [router, supabase])

  const handleAuthSuccess = async () => {
    // Refresh user data after successful authentication
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    setShowAuthModal(false)
  }

  const handleCloseOnboarding = () => {
    setShowOnboarding(false)
    // Set global flag so onboarding never shows again
    localStorage.setItem('hasCompletedOnboarding', 'true')
  }

  // Handle section scrolling based on URL parameter
  useEffect(() => {
    if (!loading && user) {
      const view = searchParams.get('view')
      
      setTimeout(() => {
        switch (view) {
          case 'trend':
            trendRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            break
          case 'sector':
            sectorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            break
          case 'movers':
            moversRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            break
          case 'signals':
            signalsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            break
        }
      }, 300) // Small delay to ensure page is rendered
    }
  }, [loading, user, searchParams])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]">
        <div className="text-[#2D3748]">Loading...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <ErrorBoundary>
      {/* Onboarding Modal - Shows on first visit to trading page - OUTSIDE main container for proper z-index */}
      {showOnboarding && <OnboardingModal onClose={handleCloseOnboarding} />}
      
      <div className="min-h-screen bg-[#F8F9FB] relative">
      
      {/* Main Dashboard */}
      <div className="relative z-10">
        {/* Sticky Navbar */}
        <DashboardNavbar user={user} />

          {/* Dashboard Content */}
          <div className="px-6 py-6 space-y-6 pb-20">
            {/* Market Snapshot - Sector Performance */}
            <div ref={sectorRef}>
              <MarketSnapshot />
            </div>

            {/* Main Grid - Sentiment + Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SentimentCard />
              <MarketSummary />
            </div>

            {/* Top Movers */}
            <div ref={moversRef}>
              <TopMovers />
            </div>

            {/* 30-Day Market Trend Chart */}
            <div ref={trendRef}>
              <MarketTrendChart title="30-day chart" height={300} />
            </div>

            {/* Advanced Section - Heatmap / Watchlist / Portfolio (Advanced Signals) */}
            <div ref={signalsRef}>
              <AdvancedSection />
            </div>
          </div>
        </div>
    </div>
    </ErrorBoundary>
  )
}

