'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

export default function MagicalHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#F8F9FB] via-[#FAFBF9] to-[#F0F4EE]">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(106, 153, 78, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(106, 153, 78, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(106, 153, 78, 0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(229, 199, 106, 0.15) 0%, transparent 70%)',
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              left: `${i * 20}%`,
              top: `${i * 15}%`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Trading Chart Lines Effect */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <motion.path
          d="M 0 400 Q 200 300 400 350 T 800 300 T 1200 350 T 1600 300"
          stroke="#2E4D8E"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 0 500 Q 200 450 400 480 T 800 450 T 1200 480 T 1600 450"
          stroke="#E5C76A"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>

      {/* Animated Candlestick Charts */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.08]">
        <div className="absolute left-[10%] top-[20%] flex gap-3">
          {[
            { height: 80, color: '#2E4D8E', delay: 0 },
            { height: 120, color: '#C85A54', delay: 0.2 },
            { height: 100, color: '#2E4D8E', delay: 0.4 },
            { height: 90, color: '#2E4D8E', delay: 0.6 },
            { height: 140, color: '#C85A54', delay: 0.8 },
            { height: 110, color: '#2E4D8E', delay: 1.0 },
          ].map((candle, i) => (
            <motion.div
              key={i}
              className="relative w-4"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ 
                duration: 1, 
                delay: candle.delay,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeOut"
              }}
            >
              {/* Wick */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 w-[2px]"
                style={{ 
                  height: `${candle.height + 20}px`,
                  backgroundColor: candle.color,
                  top: '-10px'
                }}
              />
              {/* Body */}
              <motion.div
                className="w-full rounded-sm"
                style={{ 
                  height: `${candle.height}px`,
                  backgroundColor: candle.color,
                }}
                animate={{ 
                  boxShadow: [
                    `0 0 0px ${candle.color}`,
                    `0 0 20px ${candle.color}`,
                    `0 0 0px ${candle.color}`,
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: candle.delay }}
              />
            </motion.div>
          ))}
        </div>

        {/* Second candlestick group */}
        <div className="absolute right-[15%] bottom-[25%] flex gap-3">
          {[
            { height: 70, color: '#2E4D8E', delay: 0.3 },
            { height: 95, color: '#2E4D8E', delay: 0.5 },
            { height: 85, color: '#C85A54', delay: 0.7 },
            { height: 115, color: '#2E4D8E', delay: 0.9 },
            { height: 75, color: '#C85A54', delay: 1.1 },
          ].map((candle, i) => (
            <motion.div
              key={i}
              className="relative w-4"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ 
                duration: 1, 
                delay: candle.delay,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeOut"
              }}
            >
              <div 
                className="absolute left-1/2 -translate-x-1/2 w-[2px]"
                style={{ 
                  height: `${candle.height + 20}px`,
                  backgroundColor: candle.color,
                  top: '-10px'
                }}
              />
              <motion.div
                className="w-full rounded-sm"
                style={{ 
                  height: `${candle.height}px`,
                  backgroundColor: candle.color,
                }}
                animate={{ 
                  boxShadow: [
                    `0 0 0px ${candle.color}`,
                    `0 0 20px ${candle.color}`,
                    `0 0 0px ${candle.color}`,
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: candle.delay }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Rising Line Graph Animation */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
        {/* Bullish trend line */}
        <motion.path
          d="M 100 600 L 200 550 L 300 520 L 400 480 L 500 450 L 600 400 L 700 380 L 800 350"
          stroke="#2E4D8E"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
        />
        {/* Area under the line */}
        <motion.path
          d="M 100 600 L 200 550 L 300 520 L 400 480 L 500 450 L 600 400 L 700 380 L 800 350 L 800 600 Z"
          fill="url(#gradient1)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
        
        {/* Another rising trend */}
        <motion.path
          d="M 900 650 L 1000 620 L 1100 580 L 1200 550 L 1300 520 L 1400 480 L 1500 450"
          stroke="#E5C76A"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
        />
        <motion.path
          d="M 900 650 L 1000 620 L 1100 580 L 1200 550 L 1300 520 L 1400 480 L 1500 450 L 1500 650 Z"
          fill="url(#gradient2)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatDelay: 1 }}
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2E4D8E" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2E4D8E" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E5C76A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#E5C76A" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Animated Data Points */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.08]">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              backgroundColor: i % 2 === 0 ? '#2E4D8E' : '#E5C76A',
              left: `${15 + i * 12}%`,
              top: `${30 + Math.sin(i) * 20}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 py-32"
      >
        {/* Glowing Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-[#2E4D8E]/20 shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(106, 153, 78, 0.2)" }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-[#2E4D8E]"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[14px] font-semibold text-[#2D3748]">
              Powered by Advanced AI • Real-time Analysis
            </span>
          </motion.div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-6 max-w-5xl"
        >
          <div className="text-[64px] md:text-[80px] lg:text-[96px] font-bold leading-[1.1]">
            <span className="text-[#2D3748]">Stop Searching. </span>
            <br />
            <motion.span
              className="inline-block bg-gradient-to-r from-[#2E4D8E] via-[#7BAA5F] to-[#E5C76A] bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Start Deciding.
            </motion.span>
          </div>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center text-[#718096] text-[20px] md:text-[24px] max-w-4xl mb-12 leading-relaxed"
        >
          The world's first <span className="font-semibold text-[#2E4D8E]">Sequential Conviction Engine</span>. 
          50+ professional-grade analytical modules forged into a singular, guided investment narrative.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/dashboard"
              className="group relative inline-flex items-center gap-3 px-10 py-5 text-[18px] font-semibold text-white bg-gradient-to-r from-[#2E4D8E] to-[#7BAA5F] rounded-[12px] overflow-hidden shadow-[0_8px_24px_rgba(106,153,78,0.3)] hover:shadow-[0_16px_40px_rgba(106,153,78,0.4)] transition-all duration-300"
            >
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10">Begin Your First Analysis</span>
              <motion.span
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={() => document.getElementById('markets')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-3 px-10 py-5 text-[18px] font-semibold text-[#2D3748] bg-white/80 backdrop-blur-sm border-2 border-[#2E4D8E]/30 rounded-[12px] hover:border-[#2E4D8E] hover:bg-white transition-all duration-300 shadow-lg"
            >
              Learn More
            </button>
          </motion.div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 flex flex-wrap justify-center gap-12"
        >
          {[
            { value: '50+', label: 'AI Modules' },
            { value: '10K+', label: 'Active Users' },
            { value: '99.9%', label: 'Uptime' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="text-[40px] font-bold bg-gradient-to-r from-[#2E4D8E] to-[#E5C76A] bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-[14px] text-[#718096] font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[12px] text-[#718096] font-medium">Scroll to explore</span>
            <motion.div
              className="w-6 h-10 rounded-full border-2 border-[#2E4D8E]/30 flex items-start justify-center p-2"
              whileHover={{ borderColor: 'rgba(106, 153, 78, 0.6)' }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#2E4D8E]"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
