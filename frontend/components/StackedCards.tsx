'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface Card {
  id: number
  title: string
  subtitle: string
  description: string
  color: string
  textColor: string
  borderColor: string
}

interface StackedCardsProps {
  cards: Card[]
}

export default function StackedCards({ cards }: StackedCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  return (
    <div ref={containerRef} className="relative" style={{ height: `${cards.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {cards.map((card, index) => {
          const start = index / cards.length
          const end = (index + 1) / cards.length

          return (
            <Card
              key={card.id}
              card={card}
              index={index}
              progress={scrollYProgress}
              range={[start, end]}
              totalCards={cards.length}
            />
          )
        })}
      </div>
    </div>
  )
}

function Card({ 
  card, 
  index, 
  progress, 
  range, 
  totalCards 
}: { 
  card: Card
  index: number
  progress: any
  range: number[]
  totalCards: number
}) {
  const isLast = index === totalCards - 1
  
  // Calculate when this card should be visible
  // Ensure keyframes are monotonically increasing (no negative values)
  const opacityStart = Math.max(0, range[0] - 0.1)
  const opacityMidEnd = Math.max(opacityStart + 0.01, range[1] - 0.1)
  
  const opacity = useTransform(
    progress,
    [opacityStart, range[0], opacityMidEnd, range[1]],
    [0, 1, 1, isLast ? 1 : 0]
  )
  
  const scale = useTransform(
    progress,
    [range[0], range[1]],
    [1, isLast ? 1 : 0.85]
  )
  
  const y = useTransform(
    progress,
    [range[0], range[1]],
    [0, isLast ? 0 : -50]
  )

  return (
    <motion.div
      style={{
        opacity,
        scale,
        y,
        zIndex: totalCards - index,
        position: 'absolute',
        inset: 0,
      }}
      className="flex items-center justify-center px-8"
    >
      <motion.div
        className="w-full max-w-4xl rounded-[24px] p-12 shadow-2xl border-2"
        style={{
          backgroundColor: card.color,
          borderColor: card.borderColor,
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-start gap-8">
          <motion.div
            className="flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center text-white text-[32px] font-bold shadow-lg"
            style={{ backgroundColor: card.borderColor }}
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.6 }}
          >
            {card.id}
          </motion.div>
          <div>
            <h3 className="text-[36px] font-bold mb-3" style={{ color: card.textColor }}>
              {card.title}
            </h3>
            <p className="text-[20px] font-semibold mb-4 opacity-80" style={{ color: card.textColor }}>
              {card.subtitle}
            </p>
            <p className="text-[18px] leading-relaxed opacity-70" style={{ color: card.textColor }}>
              {card.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
