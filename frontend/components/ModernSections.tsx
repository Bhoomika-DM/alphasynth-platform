'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface Section {
  id: number
  title: string
  subtitle: string
  description: string
  color: string
  textColor: string
  borderColor: string
}

interface ModernSectionsProps {
  sections: Section[]
}

export default function ModernSections({ sections }: ModernSectionsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Horizontal Scroll Container */}
        <motion.div 
          className="flex h-full"
          style={{
            x: useTransform(scrollYProgress, [0, 1], ['0%', '-80%'])
          }}
        >
          {sections.map((section, index) => (
            <SectionCard 
              key={section.id} 
              section={section} 
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function SectionCard({ 
  section, 
  index,
  progress
}: { 
  section: Section
  index: number
  progress: any
}) {
  const start = index / 5
  const end = (index + 1) / 5

  // Ensure keyframes are monotonically increasing (no negative values)
  const opacityStart = Math.max(0, start - 0.1)
  const opacityEnd = Math.min(1, end + 0.1)

  const opacity = useTransform(
    progress,
    [opacityStart, start, end, opacityEnd],
    [0.3, 1, 1, 0.3]
  )

  const scale = useTransform(
    progress,
    [start, end],
    [0.9, 1]
  )

  return (
    <motion.div
      style={{ opacity, scale }}
      className="flex-shrink-0 w-screen h-full flex items-center justify-center px-16"
    >
      <motion.div
        className="w-full max-w-3xl rounded-[32px] p-16 shadow-2xl border-2 relative overflow-hidden"
        style={{
          backgroundColor: section.color,
          borderColor: section.borderColor,
        }}
        whileHover={{ scale: 1.02, y: -10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Animated Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, ${section.borderColor} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10">
          {/* Number Badge */}
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 rounded-full text-white text-[40px] font-bold shadow-xl mb-8"
            style={{ backgroundColor: section.borderColor }}
            whileHover={{ rotate: 360, scale: 1.15 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {section.id}
          </motion.div>

          {/* Content */}
          <motion.h3 
            className="text-[48px] font-bold mb-4 leading-tight"
            style={{ color: section.textColor }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {section.title}
          </motion.h3>
          
          <motion.p 
            className="text-[24px] font-semibold mb-6 opacity-80"
            style={{ color: section.textColor }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {section.subtitle}
          </motion.p>
          
          <motion.p 
            className="text-[18px] leading-relaxed opacity-70"
            style={{ color: section.textColor }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {section.description}
          </motion.p>

          {/* Progress Indicator */}
          <motion.div 
            className="mt-8 flex gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[1, 2, 3, 4, 5].map((dot) => (
              <div
                key={dot}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: dot === section.id ? section.borderColor : section.textColor,
                  opacity: dot === section.id ? 1 : 0.3,
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
