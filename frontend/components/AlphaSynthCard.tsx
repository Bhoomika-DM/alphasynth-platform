'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CardProps {
  icon?: React.ReactNode
  title: string
  description: string
  tag?: string
  bgColor?: string
  borderColor?: string
  hoverEffect?: boolean
}

export default function AlphaSynthCard({
  icon,
  title,
  description,
  tag,
  bgColor = 'bg-white',
  borderColor = 'border-[#E2E8F0]',
  hoverEffect = true,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!cardRef.current) return

    try {
      const card = cardRef.current

      if (hoverEffect) {
        const handleMouseEnter = () => {
          gsap.to(card, {
            y: -8,
            boxShadow: '0 16px 48px rgba(27,42,74,0.1)',
            duration: 0.3,
            ease: 'power2.out',
          })
        }

        const handleMouseLeave = () => {
          gsap.to(card, {
            y: 0,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            duration: 0.3,
            ease: 'power2.out',
          })
        }

        card.addEventListener('mouseenter', handleMouseEnter)
        card.addEventListener('mouseleave', handleMouseLeave)

        return () => {
          card.removeEventListener('mouseenter', handleMouseEnter)
          card.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
    } catch (error) {
      console.error('Card animation error:', error)
    }
  }, [hoverEffect])

  return (
    <div
      ref={cardRef}
      className={`fade-in-item ${bgColor} border ${borderColor} rounded-2xl p-8 transition-all duration-300 cursor-default`}
    >
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="text-[17px] font-bold text-[#1B2A4A] mb-2">{title}</h3>
      {tag && (
        <div className="inline-block text-[10px] font-bold text-[#0D7C8C] bg-[#E0F4F6] px-2 py-1 rounded mb-3 uppercase tracking-wide">
          {tag}
        </div>
      )}
      <p className="text-[14px] text-[#718096] leading-relaxed">{description}</p>
    </div>
  )
}
