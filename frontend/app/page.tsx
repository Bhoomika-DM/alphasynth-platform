'use client'

import { useState, useEffect } from 'react'
import Intro from '@/components/intro/Intro'

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true)

  const handleIntroComplete = () => {
    // Redirect to the static HTML landing page
    window.location.href = '/index.html'
  }

  if (showIntro) {
    return <Intro onComplete={handleIntroComplete} />
  }

  return null
}
