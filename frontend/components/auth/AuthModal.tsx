'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { IconX, IconMail, IconLock, IconUser } from '@tabler/icons-react'
import GoogleButton from '@/components/auth/GoogleButton'
import InputField from '@/components/auth/InputField'
import PasswordField from '@/components/auth/PasswordField'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  if (!isOpen) return null

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      })

      if (error) {
        setError(error.message)
      } else if (data?.user) {
        // Success - close modal and refresh
        if (onSuccess) {
          onSuccess()
        }
        onClose()
        router.refresh()
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

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
        // Success - close modal and refresh
        if (onSuccess) {
          onSuccess()
        }
        onClose()
        router.refresh()
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-[#F8F9FB] hover:bg-[#E5E7EB] transition-colors"
        >
          <IconX className="w-5 h-5 text-[#718096]" stroke={2} />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <img 
                  src="/logo.jpeg" 
                  alt="AlphaSynth Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[28px] font-semibold">
                <span className="text-[#2E4D8E]">Alpha</span>
                <span className="text-[#2D3748]">Synth</span>
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-[#2D3748] mb-2">
              {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-sm text-[#718096]">
              {mode === 'signup' 
                ? 'Sign up to access market insights' 
                : 'Sign in to continue to your dashboard'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-[#C85A54]/10 border border-[#C85A54]/20 rounded-lg">
              <p className="text-sm text-[#C85A54]">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={mode === 'signup' ? handleSignUp : handleSignIn} className="space-y-4">
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-3">
                <InputField
                  icon={<IconUser className="w-5 h-5" stroke={1.5} />}
                  label="First Name"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <InputField
                  icon={<IconUser className="w-5 h-5" stroke={1.5} />}
                  label="Last Name"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            )}

            <InputField
              icon={<IconMail className="w-5 h-5" stroke={1.5} />}
              label="Email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <PasswordField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#2E4D8E] hover:bg-[#5A8A4E] text-white rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : mode === 'signup' ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#E5E7EB]"></div>
            <span className="text-xs text-[#718096]">OR</span>
            <div className="flex-1 h-px bg-[#E5E7EB]"></div>
          </div>

          {/* Google Sign In */}
          <GoogleButton text={mode === 'signup' ? 'Sign up with Google' : 'Sign in with Google'} />

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#718096]">
              {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'signup' ? 'signin' : 'signup')
                  setError('')
                }}
                className="text-[#2E4D8E] font-semibold hover:underline"
              >
                {mode === 'signup' ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

