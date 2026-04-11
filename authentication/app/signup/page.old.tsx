'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/authentication/lib/supabase/client'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import AnimatedBackground from '@/components/background/AnimatedBackground'
import GoogleButton from '@/authentication/components/GoogleButton'
import InputField from '@/authentication/components/InputField'
import PasswordField from '@/authentication/components/PasswordField'
import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'

export default function SignUpPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
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
        // Successfully signed up - redirect to dashboard
        router.push('/dashboard?message=Account created successfully!')
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
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-6 lg:p-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <img 
                  src="/logo.jpeg" 
                  alt="AlphaSynth Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-jakarta font-bold">
                <span className="text-[#22c55e]">Alpha</span>
                <span className="text-white">Synth</span>
              </span>
            </div>
            
            <Link 
              href="/"
              className="text-text-muted hover:text-white transition-colors duration-100 font-jakarta text-xs"
            >
              <ArrowLeft className="w-4 h-4 inline mr-1" />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-6 pb-12">
          <div className="w-full max-w-lg">
            <div className="glass-card rounded-3xl p-11">
              <form onSubmit={handleSignUp} className="space-y-7">
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-jakarta font-bold text-white">Create your account</h1>
                  <p className="text-text-secondary font-jakarta">
                    Join 50,000+ traders on <span className="text-[#22c55e]">Alpha</span>Synth.
                  </p>
                </div>

                <GoogleButton text="Sign Up with Google" redirectTo="/dashboard" />

                <Divider text="or register with email" />

                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      required
                    />
                    <InputField
                      label="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      required
                    />
                  </div>

                  <InputField
                    label="Email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />

                  <PasswordField
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    showStrength
                  />

                  <PasswordField
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    success={confirmPassword && password === confirmPassword ? true : undefined}
                    error={confirmPassword && password !== confirmPassword ? 'Passwords do not match' : undefined}
                  />

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-1 w-4.5 h-4.5 rounded border-input-border bg-input-bg text-glow-primary focus:ring-glow-primary focus:ring-2"
                      required
                    />
                    <label htmlFor="terms" className="text-sm font-jakarta text-text-secondary">
                      I agree to the{' '}
                      <a href="#" className="text-glow-primary hover:underline">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-glow-primary hover:underline">Privacy Policy</a>
                    </label>
                  </div>

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
                    disabled={!agreeTerms}
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                    className="!rounded-xl"
                  >
                    Create Account
                  </Button>

                  <div className="text-center">
                    <span className="text-text-secondary font-jakarta text-sm">
                      Already have an account?{' '}
                    </span>
                    <Link
                      href="/signin"
                      className="text-glow-primary hover:underline font-jakarta text-sm"
                    >
                      Sign in →
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
