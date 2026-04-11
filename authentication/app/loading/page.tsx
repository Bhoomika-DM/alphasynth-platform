'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'

export default function LoadingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const ticker = searchParams.get('ticker') || 'Stock'
  
  console.log('Loading page mounted with ticker:', ticker)

  useEffect(() => {
    // Redirect after 3 seconds to stock analysis dashboard
    setTimeout(() => {
      router.push(`/stock-analysis?ticker=${ticker}`)
    }, 3000)
  }, [router, ticker])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F7F2] via-white to-[#F4F7F2] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="inline-flex items-center justify-center mb-8">
          <div className="relative w-24 h-24">
            <Image 
              src="/logo.jpeg" 
              alt="AlphaSynth" 
              width={96}
              height={96}
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-jakarta font-black text-[#1F2933] mb-4 tracking-tight italic">
          INITIALIZING NARRATIVE PIPELINE
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg font-jakarta text-[#6B7280] mb-8">
          Assembling Comité d'Experts · Assessing Structural Integrity · Mapping Logic Chains
        </p>

        {/* Loading dots */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 bg-[#6B9E5D] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 bg-[#6B9E5D] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 bg-[#6B9E5D] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}
