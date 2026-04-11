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
  const baseClasses = 'relative overflow-hidden font-jakarta font-semibold text-sm px-6 py-3 rounded-md transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7C4A0] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none'
  
  const variantClasses = {
    primary: 'bg-[#A7C4A0] text-[#1F2933] border border-[#6A994E]/20 font-semibold shadow-sm hover:bg-[#9BB594] active:bg-[#8FAF88]',
    ghost: 'bg-transparent border border-[#6A994E]/20 text-[#1F2933] hover:border-[#A7C4A0]/40 hover:bg-[#A7C4A0]/5',
    'outline-green': 'bg-white border border-[#6A994E]/30 text-[#1F2933] font-semibold hover:bg-[#F4F7F2] hover:border-[#6A994E]/40'
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
