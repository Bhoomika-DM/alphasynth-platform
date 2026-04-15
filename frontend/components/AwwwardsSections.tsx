'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

interface Section {
  id: number
  title: string
  subtitle: string
  description: string
  color: string
  textColor: string
  borderColor: string
}

interface AwwwardsSectionsProps {
  sections: Section[]
}

export default function AwwwardsSections({ sections }: AwwwardsSectionsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Scene-based storytelling - each section is a "scene"
      sectionsRef.current.forEach((section, index) => {
        if (!section) return

        // Scene entrance animation
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
            // markers: true, // Uncomment for debugging
          },
          opacity: 0,
          y: 100,
          scale: 0.9,
          ease: 'power2.out'
        })

        // Scene exit animation (fade out as it leaves)
        gsap.to(section, {
          scrollTrigger: {
            trigger: section,
            start: 'bottom 60%',
            end: 'bottom 20%',
            scrub: 1,
          },
          opacity: 0.3,
          scale: 0.95,
          ease: 'power2.in'
        })

        // Layered motion - background moves slower than content
        const background = section.querySelector('.section-background')
        if (background) {
          gsap.to(background, {
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
            y: -50,
            ease: 'none'
          })
        }

        // Content moves at normal speed
        const content = section.querySelector('.section-content')
        if (content) {
          gsap.from(content, {
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 1,
            },
            y: 60,
            opacity: 0,
            ease: 'power2.out'
          })
        }

        // Micro-interactions - small details animate independently
        const microElements = section.querySelectorAll('.micro-element')
        microElements.forEach((el, i) => {
          gsap.from(el, {
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              end: 'top 40%',
              scrub: 1,
            },
            y: 30,
            opacity: 0,
            scale: 0.8,
            ease: 'back.out(1.7)',
            delay: i * 0.1
          })
        })
      })

      // Continuous background animation
      const backgrounds = containerRef.current?.querySelectorAll('.section-background')
      backgrounds?.forEach((bg) => {
        gsap.to(bg, {
          backgroundPosition: '100% 100%',
          duration: 20,
          repeat: -1,
          ease: 'none'
        })
      })

    }, containerRef)

    return () => ctx.revert()
  }, [sections])

  return (
    <div ref={containerRef} className="relative py-32 bg-white">
      {/* Section Title */}
      <div className="text-center mb-24 px-8">
        <div className="text-[12px] tracking-[0.2em] uppercase text-[#E5C76A] font-semibold mb-6">
          The Four-Pillar Engine
        </div>
        <h2 className="text-[56px] md:text-[72px] font-bold text-[#2D3748] leading-tight">
          Clinical Interrogation.
        </h2>
      </div>

      {/* Sections as Clean Cards */}
      <div className="max-w-7xl mx-auto px-8 space-y-24">
        {sections.map((section, index) => (
          <div
            key={section.id}
            ref={(el) => { sectionsRef.current[index] = el }}
            className="relative"
          >
            {/* Card Container */}
            <div className="bg-[#FAFBF9] rounded-[20px] p-12 md:p-16 border border-[#E5E7EB] hover:border-[#2E4D8E]/30 transition-all duration-500">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="text-[11px] tracking-[0.2em] uppercase text-[#2E4D8E] font-semibold mb-3">
                    {section.subtitle}
                  </div>
                  <h3 className="text-[36px] md:text-[48px] font-bold text-[#2D3748] leading-tight">
                    {section.title}
                  </h3>
                </div>
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-full text-[18px] font-bold"
                  style={{
                    backgroundColor: `${section.borderColor}15`,
                    color: section.borderColor,
                  }}
                >
                  {section.id}
                </div>
              </div>

              {/* Description */}
              <p className="text-[16px] md:text-[18px] text-[#718096] leading-relaxed max-w-3xl">
                {section.description}
              </p>

              {/* Decorative Line */}
              <div className="mt-8 pt-8 border-t border-[#E5E7EB]">
                <div className="flex items-center gap-2 text-[12px] text-[#9CA3AF] uppercase tracking-wider">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: section.borderColor }} />
                  Agent #{section.id}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
