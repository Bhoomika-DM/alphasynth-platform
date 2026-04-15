'use client'

import { IconExternalLink } from '@tabler/icons-react'

interface ViewOnNSEButtonProps {
  url: string
  label?: string
  variant?: 'primary' | 'secondary' | 'link'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function ViewOnNSEButton({ 
  url, 
  label = 'View on NSE',
  variant = 'primary',
  size = 'md',
  className = ''
}: ViewOnNSEButtonProps) {
  
  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  // Variant classes
  const variantClasses = {
    primary: `bg-[#1B2A4A] border-2 border-[#0D7C8C]/30 text-white 
              hover:bg-[#0D7C8C] hover:text-white font-bold`,
    secondary: `bg-white border-2 border-[#0D7C8C]/30 text-[#0D7C8C] 
                hover:bg-[#EEF2F7] font-semibold`,
    link: `text-[#0D7C8C] hover:text-[#1B2A4A] hover:underline font-semibold`
  }

  if (variant === 'link') {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} ${variantClasses[variant]} 
                    transition-all duration-200 ${className}`}
      >
        <span>{label}</span>
        <IconExternalLink className="w-4 h-4" stroke={2} />
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-md 
                  ${sizeClasses[size]} ${variantClasses[variant]} 
                  transition-all duration-200 ${className}`}
    >
      <span>{label}</span>
      <IconExternalLink className="w-4 h-4" stroke={2} />
    </button>
  )
}

