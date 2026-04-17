'use client'

import { useState } from 'react'
import Intro from '@/components/intro/Intro'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true)
  const router = useRouter()

  const handleIntroComplete = () => {
    // Hide intro first
    setShowIntro(false)
    
    // Then redirect to dashboard after a brief delay
    setTimeout(() => {
      router.push('/dashboard')
    }, 300)
  }

  if (showIntro) {
    return <Intro onComplete={handleIntroComplete} />
  }

  return null
}
