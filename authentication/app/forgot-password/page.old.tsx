'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { createClient } from '@/authentication/lib/supabase/client'
import AnimatedBackground from '@/components/background/AnimatedBackground'
import InputField from '@/authentication/components/InputField'
import Button from '@/components/ui/Button'

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
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="glass-card rounded-3xl p-11 text-center space-y-8">
            {!sent ? (
              <>
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.6 }}
                  className="flex justify-center"
                >
                  <div className="w-12 h-12 bg-glow-primary/10 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-glow-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </motion.div>

                <div className="space-y-2">
                  <h1 className="text-3xl font-jakarta font-bold text-white">Reset your password</h1>
                  <p className="text-text-secondary font-jakarta">
                    Enter your email and we'll send a secure reset link.
                  </p>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-6">
                  <InputField
                    label="Email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />

                  {error && (
                    <div className="text-red-400 text-sm font-jakarta text-center">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    loading={loading}
                    className="!rounded-xl"
                  >
                    Send Reset Link
                  </Button>
                </form>

                <Link
                  href="/signin"
                  className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors font-jakarta text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Sign In
                </Link>
              </>
            ) : (
              <>
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.6 }}
                  className="flex justify-center"
                >
                  <div className="w-12 h-12 bg-glow-primary/10 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-glow-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </motion.div>

                <div className="space-y-2">
                  <h1 className="text-3xl font-jakarta font-bold text-white">Check your inbox</h1>
                  <p className="text-text-secondary font-jakarta">
                    A reset link was sent to <span className="text-white font-semibold">{email}</span>. 
                    Expires in 15 minutes.
                  </p>
                </div>

                <div className="space-y-4">
                  <Link href="/signin">
                    <Button variant="outline-green" fullWidth className="!rounded-xl">
                      Back to Sign In
                    </Button>
                  </Link>

                  <button
                    onClick={() => setSent(false)}
                    className="text-text-muted hover:text-white transition-colors font-jakarta text-sm"
                  >
                    Didn't receive it? Resend
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
