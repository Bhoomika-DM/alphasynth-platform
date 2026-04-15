'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollSectionProps {
  id?: string
  title: string
  subtitle?: string
  description?: string
  children?: React.ReactNode
  bgColor?: string
  isDark?: boolean
}

export default function AlphaSynthScrollSection({
  id,
  title,
  subtitle,
  description,
  children,
  bgColor = 'bg-white',
  isDark = false,
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!sectionRef.current) return

    // FORCE white text on dark backgrounds using direct DOM manipulation
    if (isDark && sectionRef.current) {
      const section = sectionRef.current
      
      const forceWhiteText = () => {
        section.style.setProperty('color', '#FFFFFF', 'important')
        
        // Force all children to be white
        const allElements = section.querySelectorAll('*:not(.bg-white):not(.bg-white *):not(svg)')
        allElements.forEach((el) => {
          if (el instanceof HTMLElement && !el.classList.contains('bg-white')) {
            el.style.setProperty('color', '#FFFFFF', 'important')
          }
        })
      }
      
      // Apply immediately
      forceWhiteText()
      
      // Apply again after a short delay (in case React re-renders)
      setTimeout(forceWhiteText, 100)
      setTimeout(forceWhiteText, 500)
      setTimeout(forceWhiteText, 1000)
      
      // Watch for changes and re-apply
      const observer = new MutationObserver(forceWhiteText)
      observer.observe(section, { 
        childList: true, 
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
      })
      
      return () => observer.disconnect()
    }

    try {
      const ctx = gsap.context(() => {
        // Title animation on scroll
        if (titleRef.current) {
          gsap.from(titleRef.current, {
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 0.5,
            },
            opacity: 0,
            y: 40,
            duration: 1,
          })
        }
      }, sectionRef)

      return () => {
        ctx.revert()
      }
    } catch (error) {
      console.error('Animation error:', error)
    }
  }, [isDark])

  const textColor = isDark ? '' : 'text-[#1B2A4A]'
  const mutedColor = isDark ? '' : 'text-[#718096]'
  const labelColor = isDark ? '' : 'text-[#0D7C8C]'

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`py-24 ${bgColor} relative overflow-hidden`}
    >
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="text-center mb-16">
          {subtitle && (
            <div 
              className={`text-[11px] font-bold ${labelColor} uppercase tracking-widest mb-3`} 
              style={{ color: isDark ? '#7DD3DB' : undefined }}
            >
              {subtitle}
            </div>
          )}
          <h2
            ref={titleRef}
            className={`text-[40px] font-extrabold ${textColor} tracking-tight leading-[1.15] mb-4`}
            style={{ color: isDark ? '#FFFFFF' : undefined }}
          >
            {title}
          </h2>
          {description && (
            <p 
              className={`text-[17px] ${mutedColor} max-w-[600px] mx-auto leading-relaxed`} 
              style={{ color: isDark ? 'rgba(255, 255, 255, 0.8)' : undefined }}
            >
              {description}
            </p>
          )}
        </div>

        <div ref={contentRef}>{children}</div>
      </div>
    </section>
  )
}
