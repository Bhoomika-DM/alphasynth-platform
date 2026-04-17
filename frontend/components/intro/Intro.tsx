'use client'

import { useState, useEffect, useRef } from 'react'

interface IntroProps {
  onComplete?: () => void
}

export default function Intro({ onComplete }: IntroProps) {
  const [isComplete, setIsComplete] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const completedRef = useRef(false)

  useEffect(() => {
    // Auto-complete after 8 seconds as fallback
    const timer = setTimeout(() => {
      completeIntro()
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  const completeIntro = () => {
    if (completedRef.current) return // Prevent multiple calls
    completedRef.current = true
    setIsComplete(true)
    onComplete?.()
  }

  const handleVideoEnd = () => {
    completeIntro()
  }

  const handleVideoError = () => {
    // If video fails to load, complete intro after short delay
    setTimeout(completeIntro, 500)
  }

  const handleCanPlay = () => {
    // Ensure video plays when it's ready
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // If autoplay fails, complete intro
        completeIntro()
      })
    }
  }

  if (isComplete) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-[#1B2A4A] flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        loop={false}
        onEnded={handleVideoEnd}
        onError={handleVideoError}
        onCanPlay={handleCanPlay}
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
