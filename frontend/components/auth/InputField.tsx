'use client'

import React from 'react'

interface InputFieldProps {
  icon?: React.ReactNode
  label?: string
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  className?: string
}

export default function InputField({
  icon,
  label,
  type,
  placeholder,
  value,
  onChange,
  required = false,
  className = ''
}: InputFieldProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-[#2D3748] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#718096]">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full h-[48px] ${icon ? 'pl-12' : 'pl-4'} pr-4 bg-white border border-[#E5E7EB] rounded-lg text-[#2D3748] placeholder:text-[#718096] focus:outline-none focus:ring-2 focus:ring-[#2E4D8E] focus:border-transparent transition-all duration-200`}
        />
      </div>
    </div>
  )
}
