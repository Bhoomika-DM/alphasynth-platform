'use client'

import { useState, useEffect } from 'react'

interface IntroProps {
  onComplete?: () => void
}

export default function Intro({ onComplete }: IntroProps) {
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Auto-complete after 5 seconds if video doesn't end
    const timer = setTimeout(() => {
      setIsComplete(true)
      onComplete?.()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onComplete])

  const handleVideoEnd = () => {
    setIsComplete(true)
    onComplete?.()
  }

  if (isComplete) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-[#1B2A4A] flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        muted
        playsInline
        loop={false}
        onEnded={handleVideoEnd}
        className="w-[70%] max-w-5xl h-auto rounded-2xl shadow-2xl"
        style={{ 
          border: '4px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        <source src="/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}


