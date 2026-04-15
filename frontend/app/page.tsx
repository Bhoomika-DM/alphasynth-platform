'use client'

import { useState } from 'react'
import Intro from '@/components/intro/Intro'
import AlphaSynthLandingPage from '@/components/AlphaSynthLandingPage'

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true)

  if (showIntro) {
    return <Intro onComplete={() => setShowIntro(false)} />
  }

  return <AlphaSynthLandingPage />
}
