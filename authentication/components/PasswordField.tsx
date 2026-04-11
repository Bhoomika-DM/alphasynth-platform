'use client'

import { useState, forwardRef } from 'react'
import { motion } from 'framer-motion'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import InputField from './InputField'

interface PasswordFieldProps {
  label: string
  error?: string
  success?: boolean
  showStrength?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  name?: string
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label, error, success, showStrength = false, value = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const getPasswordStrength = (password: string) => {
      let score = 0
      let feedback = 'Weak'
      let color = '#ef4444'

      if (password.length >= 8) score++
      if (/[A-Z]/.test(password)) score++
      if (/[0-9]/.test(password)) score++
      if (/[^A-Za-z0-9]/.test(password)) score++

      switch (score) {
        case 1:
          feedback = 'Weak'
          color = '#ef4444'
          break
        case 2:
          feedback = 'Fair'
          color = '#f59e0b'
          break
        case 3:
          feedback = 'Good'
          color = '#4ade80'
          break
        case 4:
          feedback = 'Strong'
          color = '#22c55e'
          break
      }

      return { score, feedback, color }
    }

    const strength = showStrength ? getPasswordStrength(value) : null

    const toggleVisibility = () => {
      setShowPassword(!showPassword)
    }

    const eyeIcon = (
      <button
        type="button"
        onClick={toggleVisibility}
        className="text-text-muted hover:text-text-secondary transition-colors"
        tabIndex={-1}
      >
        {showPassword ? (
          <IconEyeOff className="w-5 h-5" stroke={1.5} />
        ) : (
          <IconEye className="w-5 h-5" stroke={1.5} />
        )}
      </button>
    )

    return (
      <div className="space-y-3">
        <InputField
          ref={ref}
          label={label}
          type={showPassword ? 'text' : 'password'}
          error={error}
          success={success}
          icon={eyeIcon}
          iconPosition="right"
          value={value}
          {...props}
        />

        {showStrength && value && strength && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-2"
          >
            {/* Strength meter */}
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((segment) => (
                <div
                  key={segment}
                  className="flex-1 h-0.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: segment <= strength.score ? strength.color : 'rgba(255,255,255,0.08)',
                  }}
                />
              ))}
            </div>

            {/* Strength text */}
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-jakarta font-medium"
                style={{ color: strength.color }}
              >
                {strength.feedback}
              </span>
              <span className="text-xs font-jetbrains text-text-muted">
                8+ chars · uppercase · number · symbol
              </span>
            </div>
          </motion.div>
        )}
      </div>
    )
  }
)

PasswordField.displayName = 'PasswordField'

export default PasswordField
