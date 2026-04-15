'use client'

import React from 'react'
import { IconAlertTriangle } from '@tabler/icons-react'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#0D7C8C] rounded-[14px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-8 text-center">
            <div className="text-[#8C1A1A] text-5xl mb-4 flex justify-center">
              <IconAlertTriangle className="w-[48px] h-[48px]" stroke={1.5} />
            </div>
            <h2 className="text-[24px] font-bold text-[#2D3748] mb-3">
              Something went wrong
            </h2>
            <p className="text-[14px] text-[#718096] mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#0D7C8C] hover:bg-[#2E4D8E] border border-[#2E4D8E]/20 rounded-md text-[15px] font-semibold text-[#2D3748] transition-all duration-200 shadow-sm"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

