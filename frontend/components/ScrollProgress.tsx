'use client'

import { motion, useScroll } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0D7C8C] via-[#2E4D8E] to-[#0D7C8C] origin-left z-[100]"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
