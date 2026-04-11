'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useTransition, useState, useEffect } from 'react'
import { IconMicroscope } from '@tabler/icons-react'
import OnboardingModal from '@/components/onboarding/OnboardingModal'
import { createClient } from '@/authentication/lib/supabase/client'

export default function NavigationHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [showQuickNav, setShowQuickNav] = useState(false)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase])

  const getActiveView = () => {
    if (pathname === '/dashboard') return 'home'
    if (pathname?.includes('/trading')) return 'market'
    if (pathname?.includes('/stock-analysis')) return 'analysis'
    if (pathname?.includes('/portfolio-results')) return 'portfolio'
    return 'home'
  }

  const activeView = getActiveView()

  const handleNavigation = (path: string) => {
    startTransition(() => {
      router.push(path)
    })
  }

  const handleAnalyzeClick = () => {
    if (!user) {
      // User not authenticated, redirect to signup
      router.push('/signup?redirect=onboarding')
    } else {
      // User authenticated, show onboarding modal
      setShowQuickNav(true)
    }
  }

  return (
    <>
      {/* Quick Navigation Modal */}
      {showQuickNav && (
        <OnboardingModal onClose={() => setShowQuickNav(false)} />
      )}

      <div className="flex items-center gap-3">
        {/* Analyze Button */}
        <button
          onClick={handleAnalyzeClick}
          className="p-2.5 bg-[#A7C4A0] border border-[#6A994E]/30 rounded-md hover:bg-[#6A994E] hover:scale-105 transition-all duration-200 group"
          title="Analyze"
        >
          <span className="text-sm font-sans font-bold text-[#1F2933] group-hover:text-white transition-colors">Analyze</span>
        </button>
      </div>
    </>
  )
}
