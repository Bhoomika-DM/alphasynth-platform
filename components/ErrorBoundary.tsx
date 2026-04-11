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
        <div className="min-h-screen bg-[#F4F7F2] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#A7C4A0] rounded-[14px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-8 text-center">
            <div className="text-[#BC4749] text-5xl mb-4 flex justify-center">
              <IconAlertTriangle className="w-[48px] h-[48px]" stroke={1.5} />
            </div>
            <h2 className="text-[24px] font-jakarta font-bold text-[#1F2933] mb-3">
              Something went wrong
            </h2>
            <p className="text-[14px] font-jakarta text-[#6B7280] mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#A7C4A0] hover:bg-[#9BB594] border border-[#6A994E]/20 rounded-md text-[15px] font-jakarta font-semibold text-[#1F2933] transition-all duration-200 shadow-sm"
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
