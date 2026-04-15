'use client'

import React, { useState } from 'react'
import { IconLock, IconEye, IconEyeOff } from '@tabler/icons-react'

interface PasswordFieldProps {
  label?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  className?: string
}

export default function PasswordField({
  label,
  value,
  onChange,
  placeholder = 'Password',
  required = true,
  className = ''
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-[#2D3748] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <IconLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718096]" stroke={1.5} />
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full h-[48px] pl-12 pr-12 bg-white border border-[#E5E7EB] rounded-lg text-[#2D3748] placeholder:text-[#718096] focus:outline-none focus:ring-2 focus:ring-[#2E4D8E] focus:border-transparent transition-all duration-200"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#718096] hover:text-[#2D3748] transition-colors"
        >
          {showPassword ? (
            <IconEyeOff className="w-5 h-5" stroke={1.5} />
          ) : (
            <IconEye className="w-5 h-5" stroke={1.5} />
          )}
        </button>
      </div>
    </div>
  )
}
