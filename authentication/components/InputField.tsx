'use client'

import { InputHTMLAttributes, forwardRef, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  success?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, success, icon, iconPosition = 'right', className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-jakarta text-text-secondary">
          {label}
        </label>
        
        <div className="relative">
          <input
            ref={ref}
            className={`
              w-full px-4.5 py-3.5 rounded-xl font-jakarta text-[15px] text-white
              bg-black/20 border transition-all duration-200 ease-out
              placeholder:text-text-muted backdrop-blur-sm
              focus:outline-none focus:ring-2 focus:ring-glow-primary/20
              ${error 
                ? 'border-red-500/50 focus:border-red-500/70 focus:ring-red-500/10' 
                : success 
                  ? 'border-glow-primary/30 focus:border-glow-primary/50 focus:bg-glow-primary/5'
                  : 'border-white/10 focus:border-glow-primary/30 focus:bg-glow-primary/5'
              }
              ${iconPosition === 'right' && icon ? 'pr-12' : ''}
              ${iconPosition === 'left' && icon ? 'pl-12' : ''}
              ${className}
            `}
            {...props}
          />
          
          {icon && (
            <div className={`
              absolute top-1/2 transform -translate-y-1/2 text-text-muted
              ${iconPosition === 'right' ? 'right-4' : 'left-4'}
            `}>
              {icon}
            </div>
          )}
          
          {success && !icon && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-glow-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-red-500"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-jakarta">{error}</span>
          </motion.div>
        )}
      </div>
    )
  }
)

InputField.displayName = 'InputField'

export default InputField
