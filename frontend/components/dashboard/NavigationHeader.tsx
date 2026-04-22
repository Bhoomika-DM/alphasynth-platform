'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useTransition, useState, useEffect } from 'react'
import { IconMicroscope } from '@tabler/icons-react'
import OnboardingModal from '@/components/onboarding/OnboardingModal'
import { createClient } from '@/lib/supabase/client'

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

  const handleMarketClick = () => {
    if (!user) {
      // User not authenticated, redirect to signup with trading redirect
      router.push('/signup?redirect=/trading')
    } else {
      // User authenticated, show onboarding modal
      setShowQuickNav(true)
    }
  }

  return (
    <>
      {/* Quick Navigation Modal - Skip to Step 3 */}
      {showQuickNav && (
        <OnboardingModal 
          onClose={() => setShowQuickNav(false)} 
          skipToStep3={true}
        />
      )}

      <div className="flex items-center gap-3 relative z-20">
        {/* Analyze Button */}
        <button
          onClick={handleMarketClick}
          className="relative z-10 px-4 py-2.5 bg-[#0D7C8C] border border-[#2E4D8E]/30 rounded-md hover:bg-[#2E4D8E] hover:scale-105 transition-all duration-200 group cursor-pointer shadow-sm"
          title="Analyze"
          type="button"
        >
          <span className="text-sm font-bold text-[#FFFFFF] group-hover:text-white transition-colors pointer-events-none">Analyze</span>
        </button>
      </div>
    </>
  )
}

