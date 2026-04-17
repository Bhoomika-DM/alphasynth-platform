'use client'

import { motion } from 'framer-motion'
import { OnboardingOption } from './onboarding-config'
import { IconArrowRight } from '@tabler/icons-react'

interface OnboardingCardProps {
  option: OnboardingOption
  onClick: () => void
  index: number
}

// Tinted/pastel color mapping for each gradient
const getTintedColor = (gradient: string) => {
  if (gradient.includes('blue') && gradient.includes('cyan')) return { bg: 'bg-[#D4F1F4]', icon: 'text-[#0D7C8C]' } // Light teal
  if (gradient.includes('green') && gradient.includes('emerald')) return { bg: 'bg-[#D4EDD9]', icon: 'text-[#1A6B3A]' } // Light green
  if (gradient.includes('purple') && gradient.includes('indigo')) return { bg: 'bg-[#E8E4FF]', icon: 'text-[#5B21B6]' } // Light purple
  if (gradient.includes('orange') && gradient.includes('amber')) return { bg: 'bg-[#FFE4D4]', icon: 'text-[#B45309]' } // Light orange
  if (gradient.includes('red') && gradient.includes('pink')) return { bg: 'bg-[#FFE4E6]', icon: 'text-[#DC2626]' } // Light red/pink
  if (gradient.includes('teal') && gradient.includes('cyan')) return { bg: 'bg-[#D4F1F4]', icon: 'text-[#0D7C8C]' } // Light teal
  // Default fallback
  return { bg: 'bg-[#D4F1F4]', icon: 'text-[#0D7C8C]' }
}

export default function OnboardingCard({ option, onClick, index }: OnboardingCardProps) {
  const Icon = option.icon
  const tintedColor = getTintedColor(option.gradient)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
      whileHover={{ 
        scale: 1.02,
        y: -4,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative p-7 bg-white border-2 border-[#2E4D8E]/20 rounded-2xl cursor-pointer 
                 transition-all duration-200 hover:border-[#2E4D8E]/40 hover:shadow-xl overflow-hidden"
    >
      <div className="relative flex items-start gap-5">
        {/* Icon with tinted background */}
        <div className={`flex-shrink-0 w-16 h-16 rounded-xl ${tintedColor.bg}
                        flex items-center justify-center shadow-md group-hover:shadow-lg 
                        transition-all duration-200`}>
          <Icon className={`w-8 h-8 ${tintedColor.icon}`} strokeWidth={2.5} />
        </div>
        
        {/* Content */}
        <div className="flex-1 pt-1">
          <h3 className="text-xl font-bold text-[#2D3748] mb-2 
                         group-hover:text-[#2E4D8E] transition-colors duration-200">
            {option.title}
          </h3>
          <p className="text-sm text-[#718096] leading-relaxed">
            {option.subtitle}
          </p>
        </div>

        {/* Arrow indicator */}
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 
                        transition-all duration-200 group-hover:translate-x-1">
          <IconArrowRight className="w-6 h-6 text-[#2E4D8E]" stroke={1.5} />
        </div>
      </div>

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${option.gradient} 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />
    </motion.div>
  )
}

