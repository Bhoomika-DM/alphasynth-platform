'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  IconLock,
  IconCloud,
  IconScale,
  IconNumbers,
  IconShield,
  IconChartBar,
  IconTrendingUp,
  IconGlobe,
  IconMessage,
  IconBolt,
  IconAlertTriangle,
  IconBriefcase,
  IconUsers,
  IconTarget,
  IconAward,
  IconCheck,
  IconArrowRight,
} from '@tabler/icons-react'
import AlphaSynthHero from './AlphaSynthHero'
import AlphaSynthScrollSection from './AlphaSynthScrollSection'

gsap.registerPlugin(ScrollTrigger)

export default function AlphaSynthLandingPage() {
  const navRef = useRef<HTMLDivElement>(null)
  const trustBarRef = useRef<HTMLDivElement>(null)
  const pillarsRef = useRef<HTMLDivElement>(null)
  const deploymentRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const forceWhiteIcons = () => {
      if (trustBarRef.current) {
        const spans = trustBarRef.current.querySelectorAll('span')
        spans.forEach(span => {
          if (span instanceof HTMLElement) {
            span.style.setProperty('color', '#FFFFFF', 'important')
          }
        })
        const svgs = trustBarRef.current.querySelectorAll('svg, svg *')
        svgs.forEach(svg => {
          if (svg instanceof SVGElement) {
            svg.style.setProperty('stroke', '#FFFFFF', 'important')
            svg.style.setProperty('color', '#FFFFFF', 'important')
            svg.style.setProperty('fill', 'none', 'important')
          }
        })
      }
      
      if (pillarsRef.current) {
        const allElements = pillarsRef.current.querySelectorAll('div, h4, p, span')
        allElements.forEach(el => {
          if (el instanceof HTMLElement && !el.classList.contains('bg-white')) {
            el.style.setProperty('color', '#FFFFFF', 'important')
          }
        })
        const svgs = pillarsRef.current.querySelectorAll('svg, svg *')
        svgs.forEach(svg => {
          if (svg instanceof SVGElement) {
            svg.style.setProperty('stroke', '#FFFFFF', 'important')
            svg.style.setProperty('color', '#FFFFFF', 'important')
            svg.style.setProperty('fill', 'none', 'important')
          }
        })
      }
      
      if (deploymentRef.current) {
        const allElements = deploymentRef.current.querySelectorAll('div, span')
        allElements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.setProperty('color', '#FFFFFF', 'important')
          }
        })
      }
      
      if (footerRef.current) {
        const allElements = footerRef.current.querySelectorAll('div, p, span, a, ul, li')
        allElements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.setProperty('color', '#FFFFFF', 'important')
          }
        })
        const svgs = footerRef.current.querySelectorAll('svg, svg *')
        svgs.forEach(svg => {
          if (svg instanceof SVGElement) {
            svg.style.setProperty('stroke', '#FFFFFF', 'important')
            svg.style.setProperty('color', '#FFFFFF', 'important')
            svg.style.setProperty('fill', 'none', 'important')
          }
        })
      }
    }
    
    forceWhiteIcons()
    setTimeout(forceWhiteIcons, 100)
    setTimeout(forceWhiteIcons, 500)
    setTimeout(forceWhiteIcons, 1000)
    setTimeout(forceWhiteIcons, 2000)
    
    document.documentElement.style.scrollBehavior = 'smooth'

    const sections = document.querySelectorAll('section[id]')
    const navLinks = document.querySelectorAll('.nav-link')

    const handleScroll = () => {
      const scrollY = window.scrollY + 100

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight
        const sectionId = section.getAttribute('id')

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            link.classList.remove('active')
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active')
            }
          })
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="font-jakarta bg-white">
      TEST CONTENT
    </div>
  )
}
