'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'ghost' | 'outline-green'
  children: ReactNode
  loading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}

export default function Button({
  variant = 'primary',
  children,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'relative overflow-hidden font-semibold text-sm px-6 py-3 rounded-md transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D7C8C] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none'
  
  const variantClasses = {
    primary: 'bg-[#1B2A4A] text-white border border-[#1B2A4A]/20 font-semibold shadow-sm hover:bg-[#2E4D8E] active:bg-[#0D7C8C]',
    ghost: 'bg-transparent border border-[#0D7C8C]/20 text-[#1B2A4A] hover:border-[#0D7C8C]/40 hover:bg-[#E0F4F6]/5',
    'outline-green': 'bg-white border border-[#0D7C8C]/30 text-[#1B2A4A] font-semibold hover:bg-[#EEF2F7] hover:border-[#0D7C8C]/40'
  }

  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
      disabled={disabled || loading}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      <div className="relative flex items-center justify-center gap-2">
        {loading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
          </>
        )}
      </div>
    </motion.button>
  )
}

