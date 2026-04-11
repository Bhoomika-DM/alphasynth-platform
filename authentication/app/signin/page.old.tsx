'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { createClient } from '@/authentication/lib/supabase/client'
import { ArrowLeft, Lock } from 'lucide-react'
import AnimatedBackground from '@/components/background/AnimatedBackground'
import GoogleButton from '@/authentication/components/GoogleButton'
import InputField from '@/authentication/components/InputField'
import PasswordField from '@/authentication/components/PasswordField'
import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [rememberDevice, setRememberDevice] = useState(false)
  const router = useRouter()
  const supabase = createClient()

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
        // Add shake animation to form
        const form = e.target as HTMLFormElement
        form.classList.add('animate-shake')
        setTimeout(() => form.classList.remove('animate-shake'), 500)
      } else if (data?.user) {
        // Successfully signed in
        router.push('/dashboard?message=Successfully signed in!')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      <AnimatedBackground />
      
      {/* Left Brand Panel - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-between p-14">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <img 
                src="/logo.jpeg" 
                alt="AlphaSynth Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-2xl font-jakarta font-bold">
              <span className="text-[#22c55e]">Alpha</span>
              <span className="text-white">Synth</span>
            </span>
          </div>
          
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-text-muted hover:text-white transition-colors duration-100 font-jakarta text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-xs font-jetbrains text-glow-primary uppercase tracking-[0.2em] relative">
                AI-POWERED TRADING PLATFORM
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-glow-primary"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
              <h1 className="text-5xl font-jakarta font-extrabold text-white leading-tight">
                Welcome back,
              </h1>
              <h2 className="text-5xl font-jakarta font-bold text-gradient leading-tight">
                the market never sleeps.
              </h2>
            </div>
          </div>

          {/* Live Signal Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-surface rounded-2xl p-6 max-w-sm space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-glow-primary rounded-full animate-dot-pulse" />
              <span className="text-xs font-jetbrains text-glow-soft uppercase tracking-[0.15em]">
                LIVE · AI SIGNALS ACTIVE
              </span>
            </div>
            
            <div className="text-lg font-jakarta font-semibold text-white">
              3 positions synthesized
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="px-3 py-1.5 rounded-md border border-glow-primary/30 bg-glow-primary/8 text-xs font-jetbrains text-glow-primary">
                EUR/USD ▲ BUY
              </div>
              <div className="px-3 py-1.5 rounded-md border border-glow-primary/30 bg-glow-primary/8 text-xs font-jetbrains text-glow-primary">
                BTC ▲ BUY
              </div>
              <div className="px-3 py-1.5 rounded-md border border-red-500/30 bg-red-500/6 text-xs font-jetbrains text-red-400">
                GOLD ▼ SELL
              </div>
            </div>

            {/* Sparkline */}
            <svg className="w-full h-9" viewBox="0 0 200 36">
              <defs>
                <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(34,197,94,0.15)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <polyline
                points="0,30 20,25 40,20 60,15 80,18 100,12 120,8 140,10 160,6 180,4 200,2"
                fill="none"
                stroke="#22c55e"
                strokeWidth="1.5"
              />
              <polyline
                points="0,30 20,25 40,20 60,15 80,18 100,12 120,8 140,10 160,6 180,4 200,2 200,36 0,36"
                fill="url(#sparklineGradient)"
              />
            </svg>
          </motion.div>
        </div>

        <div className="flex items-center gap-5 text-xs font-jetbrains text-text-muted">
          <span>🔒 256-bit SSL</span>
          <span className="text-glow-primary">·</span>
          <span>🛡 2FA Ready</span>
          <span className="text-glow-primary">·</span>
          <span>✓ FCA Regulated</span>
        </div>
      </div>

      {/* Right Auth Panel */}
      <div className="w-full lg:w-1/2 relative z-10 glass-panel flex items-center justify-center p-6 lg:p-14">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left space-y-2">
            <h1 className="text-3xl font-jakarta font-bold text-white">Sign In</h1>
            <p className="text-text-secondary font-jakarta">
              Access your <span className="text-[#22c55e]">Alpha</span>Synth account
            </p>
          </div>

          <GoogleButton text="Continue with Google" />

          <Divider text="or sign in with email" />

          <form onSubmit={handleSignIn} className="space-y-6">
            <InputField
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-jakarta text-text-secondary">Password</span>
                <Link
                  href="/forgot-password"
                  className="text-xs font-jakarta text-glow-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              
              <PasswordField
                label=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                error={error}
                name="password"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="remember"
                checked={rememberDevice}
                onChange={(e) => setRememberDevice(e.target.checked)}
                className="w-4 h-4 rounded border-input-border bg-input-bg text-glow-primary focus:ring-glow-primary focus:ring-2"
              />
              <label htmlFor="remember" className="text-sm font-jakarta text-text-secondary">
                Remember this device for 30 days
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              icon={<Lock className="w-4 h-4" />}
              iconPosition="left"
              className="!rounded-xl"
            >
              {loading ? 'Authenticating...' : (
                <>
                  Sign In to <span className="text-[#22c55e]">Alpha</span>Synth
                </>
              )}
            </Button>
          </form>

          <div className="text-center">
            <span className="text-text-secondary font-jakarta text-sm">
              New to <span className="text-[#22c55e]">Alpha</span>Synth?{' '}
            </span>
            <Link
              href="/signup"
              className="text-glow-primary hover:underline font-jakarta text-sm"
            >
              Create an account →
            </Link>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs font-jetbrains text-text-muted">
            <span>🔒 Encrypted</span>
            <span>·</span>
            <span>🛡 Secure Auth</span>
            <span>·</span>
            <span>✓ Regulated</span>
          </div>
        </div>
      </div>
    </div>
  )
}
