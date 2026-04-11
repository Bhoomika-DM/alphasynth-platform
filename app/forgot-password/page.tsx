'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/authentication/lib/supabase/client'
import { IconArrowLeft, IconMail, IconCircleCheck, IconLock, IconShield } from '@tabler/icons-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        setError(error.message)
      } else {
        setSent(true)
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
        {/* Back Button */}
        <Link 
          href="/signin"
          className="inline-flex items-center gap-2 text-[#6B7280] hover:text-[#1F2933] transition-colors duration-200 mb-8 font-jakarta text-sm"
        >
          <IconArrowLeft className="w-4 h-4" stroke={1.5} />
          Back to Sign In
        </Link>

        {/* Card */}
        <div className="bg-[#A7C4A0] rounded-[14px] p-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          {!sent ? (
            <>
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#E5B960]/10 rounded-full flex items-center justify-center">
                  <IconMail className="w-8 h-8 text-[#E5B960]" stroke={1.5} />
                </div>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-[32px] font-bold text-[#1F2933] mb-2 font-jakarta">
                  Reset Password
                </h1>
                <p className="text-[16px] text-[#6B7280] font-jakarta">
                  Enter your email to receive a reset link
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleResetPassword} className="space-y-5">
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

                {/* Error */}
                {error && (
                  <div className="p-4 bg-[#BC4749]/10 border border-[#BC4749]/20 rounded-[10px] text-[14px] text-[#BC4749] font-jakarta">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[48px] bg-[#A7C4A0] hover:bg-[#9BB594] border border-[#6A994E]/20 text-[#1F2933] rounded-md font-semibold font-jakarta transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#E5B960]/10 rounded-full flex items-center justify-center">
                  <IconCircleCheck className="w-8 h-8 text-[#E5B960]" stroke={1.5} />
                </div>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-[32px] font-bold text-[#1F2933] mb-2 font-jakarta">
                  Check Your Email
                </h1>
                <p className="text-[16px] text-[#6B7280] font-jakarta">
                  We sent a reset link to{' '}
                  <span className="font-semibold text-[#1F2933]">{email}</span>
                </p>
                <p className="text-[14px] text-[#6B7280] font-jakarta mt-2">
                  Link expires in 15 minutes
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <Link href="/signin">
                  <button className="w-full h-[48px] bg-[#A7C4A0] hover:bg-[#9BB594] border border-[#6A994E]/20 text-[#1F2933] rounded-md font-semibold font-jakarta transition-all duration-200 shadow-sm">
                    Back to Sign In
                  </button>
                </Link>

                <button
                  onClick={() => setSent(false)}
                  className="w-full text-[14px] text-[#6B7280] hover:text-[#1F2933] font-jakarta transition-colors duration-200"
                >
                  Didn't receive it? Resend
                </button>
              </div>
            </>
          )}
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-4 mt-6 text-[14px] text-[#6B7280] font-jakarta">
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
