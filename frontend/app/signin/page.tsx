'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { IconArrowLeft, IconLock, IconMail, IconShield } from '@tabler/icons-react'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [rememberDevice, setRememberDevice] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const redirectTo = searchParams.get('redirect') || '/dashboard'

  // Check for error in URL params (from OAuth callback)
  useEffect(() => {
    const errorParam = searchParams.get('error')
    if (errorParam) {
      const errorMessages: Record<string, string> = {
        'no_code': 'Authentication failed: No authorization code received',
        'auth_exception': 'Authentication error occurred. Please try again.',
        'auth_failed': 'Authentication failed. Please try again.'
      }
      setError(errorMessages[errorParam] || decodeURIComponent(errorParam))
    }
  }, [searchParams])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else if (data?.user) {
        // Redirect to the intended page
        router.push(redirectTo)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center p-6">
      {/* Main Container */}
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-[#718096] hover:text-[#2D3748] transition-colors duration-200 mb-8 text-sm"
        >
          <IconArrowLeft className="w-4 h-4" stroke={1.5} />
          Back to Home
        </Link>

        {/* Card */}
        <div className="bg-[#0D7C8C] rounded-[14px] p-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-[32px] font-bold text-[#FFFFFF] mb-2">
              Welcome Back
            </h1>
            <p className="text-[16px] text-[#E0F4F6]">
              Sign in to continue trading
            </p>
          </div>

          {/* Google Button */}
          <button
            onClick={async () => {
              await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                  redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`
                }
              })
            }}
            className="w-full h-[48px] bg-white rounded-[10px] flex items-center justify-center gap-3 text-[#2D3748] font-semibold transition-all duration-200 hover:scale-[1.02] shadow-sm mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-[1px] bg-[#718096]/20"></div>
            <span className="text-[14px] text-[#718096]">or</span>
            <div className="flex-1 h-[1px] bg-[#718096]/20"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-[14px] font-semibold text-[#FFFFFF] mb-2">
                Email
              </label>
              <div className="relative">
                <IconMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718096]" stroke={1.5} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full h-[48px] pl-12 pr-4 bg-white rounded-[10px] text-[#2D3748] placeholder:text-[#718096] focus:outline-none focus:ring-2 focus:ring-[#2E4D8E] transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[14px] font-semibold text-[#FFFFFF]">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[14px] text-[#FFFFFF] hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <IconLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718096]" stroke={1.5} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full h-[48px] pl-12 pr-4 bg-white rounded-[10px] text-[#2D3748] placeholder:text-[#718096] focus:outline-none focus:ring-2 focus:ring-[#2E4D8E] transition-all duration-200"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="remember"
                checked={rememberDevice}
                onChange={(e) => setRememberDevice(e.target.checked)}
                className="w-5 h-5 rounded border-2 border-[#FFFFFF] text-[#2E4D8E] focus:ring-2 focus:ring-[#FFFFFF]"
              />
              <label htmlFor="remember" className="text-[14px] text-[#FFFFFF]">
                Remember me for 30 days
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 bg-[#8C1A1A]/10 border border-[#8C1A1A]/20 rounded-[10px] text-[14px] text-[#8C1A1A]">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[48px] bg-[#2E4D8E] hover:bg-[#1B2A4A] border border-[#FFFFFF]/20 text-[#FFFFFF] rounded-md font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <span className="text-[14px] text-[#E0F4F6]">
              Don't have an account?{' '}
            </span>
            <Link
              href={`/signup?redirect=${encodeURIComponent(redirectTo)}`}
              className="text-[14px] text-[#FFFFFF] hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-4 mt-6 text-[14px] text-[#2D3748]">
          <span className="flex items-center gap-1">
            <IconLock className="w-[16px] h-[16px]" stroke={1.5} />
            Secure
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <IconShield className="w-[16px] h-[16px]" stroke={1.5} />
            256-bit SSL
          </span>
        </div>
      </div>
    </div>
  )
}

