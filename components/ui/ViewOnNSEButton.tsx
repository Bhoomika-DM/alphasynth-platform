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
    primary: `bg-[#A7C4A0] border-2 border-[#6A994E]/30 text-[#1F2933] 
              hover:bg-[#6A994E] hover:text-white font-bold`,
    secondary: `bg-white border-2 border-[#6A994E]/30 text-[#6B9E5D] 
                hover:bg-[#F4F7F2] font-semibold`,
    link: `text-[#6B9E5D] hover:text-[#6A994E] hover:underline font-semibold`
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
