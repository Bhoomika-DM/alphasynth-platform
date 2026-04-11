'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/authentication/lib/supabase/client'
import { IconArrowLeft, IconMail, IconLock, IconUser } from '@tabler/icons-react'

export default function SignUpPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    if (!agreeTerms) {
      setError('Please agree to the Terms of Service')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: `${firstName} ${lastName}`,
            first_name: firstName,
            last_name: lastName,
          },
        },
      })

      if (error) {
        setError(error.message)
      } else if (data?.user?.identities?.length === 0) {
        setError('This email is already registered. Please sign in instead.')
      } else {
        // Set flag in localStorage to trigger onboarding
        localStorage.setItem('showOnboarding', 'true')
        router.push('/dashboard')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F7F2] flex items-center justify-center p-6">
      {/* Main Container */}
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-[#A7C4A0] rounded-[14px] p-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-[32px] font-bold text-[#1F2933] mb-2 font-jakarta">
              Create Account
            </h1>
          </div>

          {/* Google Button */}
          <button
            onClick={async () => {
              // Always trigger onboarding after Google signup
              await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                  redirectTo: `${window.location.origin}/auth/callback?redirect=onboarding`
                }
              })
            }}
            className="w-full h-[48px] bg-white rounded-[10px] flex items-center justify-center gap-3 text-[#1F2933] font-semibold font-jakarta transition-all duration-200 hover:scale-[1.02] shadow-sm mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-[1px] bg-[#6B7280]/20"></div>
            <span className="text-[14px] text-[#6B7280] font-jakarta">or</span>
            <div className="flex-1 h-[1px] bg-[#6B7280]/20"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSignUp} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[14px] font-semibold text-[#1F2933] mb-2 font-jakarta">
                  First Name
                </label>
                <div className="relative">
                  <IconUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" stroke={1.5} />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First"
                    required
                    className="w-full h-[48px] pl-12 pr-4 bg-white rounded-[10px] text-[#1F2933] placeholder:text-[#6B7280] font-jakarta focus:outline-none focus:ring-2 focus:ring-[#6A994E] transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-[#1F2933] mb-2 font-jakarta">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last"
                  required
                  className="w-full h-[48px] px-4 bg-white rounded-[10px] text-[#1F2933] placeholder:text-[#6B7280] font-jakarta focus:outline-none focus:ring-2 focus:ring-[#6A994E] transition-all duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[14px] font-semibold text-[#1F2933] mb-2 font-jakarta">
                Email
              </label>
              <div className="relative">
                <IconMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" stroke={1.5} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full h-[48px] pl-12 pr-4 bg-white rounded-[10px] text-[#1F2933] placeholder:text-[#6B7280] font-jakarta focus:outline-none focus:ring-2 focus:ring-[#6A994E] transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[14px] font-semibold text-[#1F2933] mb-2 font-jakarta">
                Password
              </label>
              <div className="relative">
                <IconLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" stroke={1.5} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  className="w-full h-[48px] pl-12 pr-4 bg-white rounded-[10px] text-[#1F2933] placeholder:text-[#6B7280] font-jakarta focus:outline-none focus:ring-2 focus:ring-[#6A994E] transition-all duration-200"
                />
              </div>
              <p className="text-[12px] text-[#6B7280] mt-1 font-jakarta">
                Minimum 8 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[14px] font-semibold text-[#1F2933] mb-2 font-jakarta">
                Confirm Password
              </label>
              <div className="relative">
                <IconLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" stroke={1.5} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className="w-full h-[48px] pl-12 pr-4 bg-white rounded-[10px] text-[#1F2933] placeholder:text-[#6B7280] font-jakarta focus:outline-none focus:ring-2 focus:ring-[#6A994E] transition-all duration-200"
                />
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-[12px] text-[#BC4749] mt-1 font-jakarta">
                  Passwords do not match
                </p>
              )}
              {confirmPassword && password === confirmPassword && (
                <p className="text-[12px] text-[#6A994E] mt-1 font-jakarta">
                  Passwords match ✓
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-2 border-[#6B7280] text-[#6A994E] focus:ring-2 focus:ring-[#6A994E]"
                required
              />
              <label htmlFor="terms" className="text-[14px] text-[#1F2933] font-jakarta">
                I agree to the{' '}
                <a href="#" className="text-[#6A994E] hover:underline font-semibold">
                  Terms of Service
                </a>
                {' '}and{' '}
                <a href="#" className="text-[#6A994E] hover:underline font-semibold">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 bg-[#BC4749]/10 border border-[#BC4749]/20 rounded-[10px] text-[14px] text-[#BC4749] font-jakarta">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !agreeTerms}
              className="w-full h-[48px] bg-[#A7C4A0] hover:bg-[#9BB594] border border-[#6A994E]/20 text-[#1F2933] rounded-md font-semibold font-jakarta transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <span className="text-[14px] text-[#6B7280] font-jakarta">
              Already have an account?{' '}
            </span>
            <Link
              href="/signin"
              className="text-[14px] text-[#6A994E] hover:underline font-semibold font-jakarta"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
