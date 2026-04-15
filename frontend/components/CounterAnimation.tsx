'use client'

import { motion, useSpring, useTransform, useInView, MotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface CounterAnimationProps {
  value: number
  suffix?: string
  className?: string
}

export default function CounterAnimation({ value, suffix = '', className = '' }: CounterAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [displayValue, setDisplayValue] = useState('0')
  
  const spring = useSpring(0, { duration: 2000 })

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, spring, value])

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      setDisplayValue(Math.round(latest).toLocaleString())
    })
    return () => unsubscribe()
  }, [spring])

  return (
    <span ref={ref} className={className}>
      {displayValue}
      {suffix}
    </span>
  )
}
