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
    // Try to play video immediately when component mounts
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          // Set volume to 0 to ensure muted
          videoRef.current.volume = 0
          videoRef.current.muted = true
          
          // Try to play
          await videoRef.current.play()
          console.log('Video playing successfully')
        } catch (error) {
          console.error('Video autoplay failed:', error)
          // If autoplay fails, complete intro after short delay
          setTimeout(completeIntro, 500)
        }
      }
    }

    playVideo()

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

  const handleVideoError = (e: any) => {
    console.error('Video error:', e)
    // If video fails to load, complete intro after short delay
    setTimeout(completeIntro, 500)
  }

  const handleCanPlay = () => {
    // Ensure video plays when it's ready
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Play on canplay failed:', error)
        // If autoplay fails, complete intro
        completeIntro()
      })
    }
  }

  const handleLoadedData = () => {
    // Try to play when video data is loaded
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Play on loadeddata failed:', error)
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
        preload="auto"
        onEnded={handleVideoEnd}
        onError={handleVideoError}
        onCanPlay={handleCanPlay}
        onLoadedData={handleLoadedData}
        className="w-[70%] max-w-5xl h-auto rounded-2xl shadow-2xl"
        style={{ 
          border: '4px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        <source src="/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Skip button for user control */}
      <button
        onClick={completeIntro}
        className="absolute bottom-8 right-8 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm transition-all border border-white/20"
      >
        Skip Intro
      </button>
    </div>
  )
}
