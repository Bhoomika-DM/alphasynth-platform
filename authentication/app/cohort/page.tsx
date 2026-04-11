'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/authentication/lib/supabase/client'
import DashboardNavbar from '@/components/dashboard/DashboardNavbar'
import AnimatedBackground from '@/components/background/AnimatedBackground'

export default function CohortPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/signin')
      } else {
        setUser(user)
      }
      setLoading(false)
    }

    getUser()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white font-jakarta">Loading...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-black relative">
      {/* Animated Background */}
      <AnimatedBackground showGlobe={false} />
      
      {/* Dashboard Navbar */}
      <DashboardNavbar user={user} />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-jakarta font-black text-white mb-4">
            Cohort Analysis
          </h1>
          <p className="text-lg font-jakarta text-white/60">
            Cohort Analysis screening module remains active and optimized.
          </p>
        </div>
      </div>
    </div>
  )
}
