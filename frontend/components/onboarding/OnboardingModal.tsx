'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { IconX, IconArrowLeft, IconSparkles, IconTrendingUp, IconTarget, IconShield, IconClock, IconUser } from '@tabler/icons-react'
import OnboardingCard from './OnboardingCard'
import { mainOptions, getSubOptions } from './onboarding-config'
import { createClient } from '@/lib/supabase/client'

interface OnboardingModalProps {
  onClose: () => void
  skipToStep3?: boolean
}

export default function OnboardingModal({ onClose, skipToStep3 = false }: OnboardingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(skipToStep3 ? 4 : 1)
  const [userType, setUserType] = useState<'individual' | 'institutional' | null>(null)
  const [selectedMain, setSelectedMain] = useState<string | null>(null)
  const [showTooltip, setShowTooltip] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [personaData, setPersonaData] = useState({
    // Individual fields
    experience: '',
    investmentGoal: '',
    riskTolerance: '',
    investmentHorizon: '',
    // Institutional fields
    institutionType: '',
    primaryUseCase: '',
    assetsUnderManagement: '',
    teamSize: ''
  })
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    setMounted(true)
    
    // Save original overflow values
    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow
    
    // Disable body and html scroll when modal is open
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    
    // Prevent scroll on the backdrop
    const handleBackdropWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement
      const modalContent = document.querySelector('[data-modal-content]')
      
      // If scrolling on backdrop (not modal content), prevent it
      if (!modalContent?.contains(target)) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
    
    const handleBackdropTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      const modalContent = document.querySelector('[data-modal-content]')
      
      // If scrolling on backdrop (not modal content), prevent it
      if (!modalContent?.contains(target)) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
    
    // Add listeners to window to catch all scroll events
    window.addEventListener('wheel', handleBackdropWheel, { passive: false })
    window.addEventListener('touchmove', handleBackdropTouchMove, { passive: false })
    
    return () => {
      setMounted(false)
      // Restore original overflow values
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
      window.removeEventListener('wheel', handleBackdropWheel)
      window.removeEventListener('touchmove', handleBackdropTouchMove)
    }
  }, [])

  const handleWelcomeNext = () => {
    setStep(2)
  }

  const handleUserTypeSelect = (type: 'individual' | 'institutional') => {
    setUserType(type)
    setStep(3)
  }

  const handlePersonaNext = async () => {
    // Validate based on user type
    const isIndividualComplete = userType === 'individual' && 
      personaData.experience && personaData.investmentGoal && 
      personaData.riskTolerance && personaData.investmentHorizon
    
    const isInstitutionalComplete = userType === 'institutional' && 
      personaData.institutionType && personaData.primaryUseCase && 
      personaData.assetsUnderManagement && personaData.teamSize
    
    if (isIndividualComplete || isInstitutionalComplete) {
      // Save persona data to database
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          const profileData: any = {
            user_id: user.id,
            user_type: userType,
            updated_at: new Date().toISOString()
          }

          if (userType === 'individual') {
            profileData.experience = personaData.experience
            profileData.investment_goal = personaData.investmentGoal
            profileData.risk_tolerance = personaData.riskTolerance
            profileData.investment_horizon = personaData.investmentHorizon
          } else {
            profileData.institution_type = personaData.institutionType
            profileData.primary_use_case = personaData.primaryUseCase
            profileData.assets_under_management = personaData.assetsUnderManagement
            profileData.team_size = personaData.teamSize
          }

          const { error } = await supabase
            .from('user_profiles')
            .upsert(profileData, {
              onConflict: 'user_id'
            })
          
          if (error) {
            console.error('Error saving persona data:', error)
          } else {
            console.log('Profile saved successfully!')
          }
        }
      } catch (error) {
        console.error('Error saving persona data:', error)
      }
      
      // Also save to localStorage for backward compatibility
      localStorage.setItem('userPersona', JSON.stringify({ ...personaData, userType }))
      setStep(4)
    }
  }

  const handleMainSelect = (optionId: string) => {
    setSelectedMain(optionId)
    setStep(5)
  }

  const handleFinalSelect = (route: string) => {
    router.push(route)
    onClose()
  }

  const handleBack = () => {
    if (step === 5) {
      setStep(4)
      setSelectedMain(null)
    } else if (step === 4) {
      setStep(3)
    } else if (step === 3) {
      setStep(2)
    } else if (step === 2) {
      setStep(1)
    }
  }

  // ESC key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const subOptionsData = selectedMain ? getSubOptions(selectedMain) : []

  const getStepTitle = () => {
    if (step === 1) return 'Welcome to AlphaSynth!'
    if (step === 2) return 'Who are you?'
    if (step === 3) return 'Tell us about yourself'
    if (step === 4) return 'What would you like to do today?'
    
    switch (selectedMain) {
      case 'analysis': return 'How would you like to analyze?'
      case 'market': return 'What insights are you looking for?'
      case 'portfolio': return 'What would you like to check?'
      case 'pro': return 'Select your analysis depth'
      default: return 'Choose your path'
    }
  }

  const getStepSubtitle = () => {
    if (step === 1) return "Let's get you started on your investment journey"
    if (step === 2) return "Help us understand how you'll be using AlphaSynth"
    if (step === 3) return "Help us personalize your experience"
    if (step === 4) return "Let's get you there faster — choose your destination"
    return "Select the view that matches your needs"
  }

  if (!mounted) return null

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 overflow-hidden"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        data-modal-content
        className="max-w-6xl w-full bg-white border border-[#2E4D8E]/20 
                   rounded-3xl p-10 md:p-12 relative shadow-2xl my-auto max-h-[90vh] overflow-y-auto
                   scrollbar-thin scrollbar-thumb-[#0D7C8C] scrollbar-track-gray-100"
        style={{
          '--tw-text-opacity': '1',
        } as React.CSSProperties}
      >

        {/* Close button with tooltip */}
        <div className="absolute top-8 right-8 z-10">
          <button
            onClick={onClose}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="relative p-2.5 hover:bg-[#E0F4F6] rounded-xl 
                       transition-all duration-100 group"
          >
            <IconX className="w-6 h-6 text-[#2D3748] group-hover:text-[#0D7C8C] transition-colors duration-100" stroke={1.5} />
            
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 px-3 py-1.5 
                             bg-white border border-[#E2E8F0] 
                             rounded-lg shadow-xl whitespace-nowrap"
                >
                  <div className="flex items-center gap-2">
                    <kbd className="px-2 py-0.5 bg-[#F8F9FB] border border-[#E2E8F0] 
                                   rounded text-xs font-semibold text-[#2D3748]">
                      ESC
                    </kbd>
                    <span className="text-xs text-[#2D3748]">to close</span>
                  </div>
                  {/* Arrow pointer */}
                  <div className="absolute -top-1 right-3 w-2 h-2 bg-white border-l 
                                  border-t border-[#E2E8F0] rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Back button (Steps 2, 3, 4, 5) */}
        {(step === 2 || step === 3 || step === 4 || step === 5) && (
          <button
            onClick={handleBack}
            className="absolute top-8 left-8 px-4 py-2.5 hover:bg-[#E0F4F6] rounded-xl 
                       transition-all duration-100 flex items-center gap-2 group z-10"
          >
            <IconArrowLeft className="w-5 h-5 text-[#2D3748] group-hover:text-[#0D7C8C] transition-colors duration-100" stroke={1.5} />
            <span className="text-sm font-semibold text-[#2D3748] group-hover:text-[#0D7C8C] transition-colors duration-100">
              Back
            </span>
          </button>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: step === 1 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: step === 1 ? 20 : -20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            {/* Header */}
            <div className="text-center mb-10 mt-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 150, damping: 15 }}
                className="inline-flex items-center justify-center w-16 h-16 mb-5 
                           bg-gradient-to-br from-[#0D7C8C] to-[#2E4D8E] border-2 border-[#B8860B]/30
                           rounded-2xl shadow-lg"
              >
                <IconSparkles className="w-8 h-8 text-[#FFFFFF]" stroke={2.5} />
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-3 leading-tight">
                {getStepTitle()}
              </h2>
              <p className="text-base text-[#2D3748] max-w-xl mx-auto">
                {getStepSubtitle()}
              </p>
            </div>

            {/* Step 1: Welcome Screen */}
            {step === 1 && (
              <div className="text-center space-y-6">
                <p className="text-lg text-[#2D3748] max-w-2xl mx-auto">
                  We're excited to help you make smarter investment decisions. Let's personalize your experience to match your goals.
                </p>
                <button
                  onClick={handleWelcomeNext}
                  className="px-12 py-4 bg-gradient-to-r from-[#0D7C8C] to-[#2E4D8E] border-2 border-[#B8860B] rounded-xl
                             hover:shadow-lg hover:scale-105
                             transition-all duration-200 mx-auto text-base font-bold text-[#FFFFFF]
                             shadow-md"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Step 1.5: User Type Selection */}
            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <motion.button
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleUserTypeSelect('individual')}
                  className="p-8 bg-white border-2 border-[#E2E8F0] hover:border-[#0D7C8C] rounded-2xl transition-all duration-300 text-left group hover:shadow-xl"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0D7C8C] to-[#1A6B3A] rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-all duration-300">
                    <IconUser className="w-8 h-8 text-[#FFFFFF]" stroke={2} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1B2A4A] mb-2">Individual Investor</h3>
                  <p className="text-[#2D3748] text-sm">
                    I'm investing my own money and managing my personal portfolio
                  </p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleUserTypeSelect('institutional')}
                  className="p-8 bg-white border-2 border-[#E2E8F0] hover:border-[#2E4D8E] rounded-2xl transition-all duration-300 text-left group hover:shadow-xl"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2E4D8E] to-[#B8860B] rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-all duration-300">
                    <IconShield className="w-8 h-8 text-[#FFFFFF]" stroke={2} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1B2A4A] mb-2">Institutional User</h3>
                  <p className="text-[#2D3748] text-sm">
                    I'm a professional managing client portfolios, conducting research, or working at a financial institution
                  </p>
                </motion.button>
              </div>
            )}

            {/* Step 2: Persona Questions - Progressive Display */}
            {step === 3 && userType === 'individual' && (
              <div className="space-y-10 max-w-3xl mx-auto">
                {/* Question 1: Experience Level - Always visible */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2E4D8E] to-[#0D7C8C] flex items-center justify-center shadow-lg">
                      <IconTrendingUp className="w-6 h-6 text-[#FFFFFF]" stroke={2.5} />
                    </div>
                    <label className="text-xl font-bold text-[#1B2A4A]">
                      What's your investment experience level?
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {['Beginner', 'Intermediate', 'Advanced', 'Professional'].map((level) => (
                      <motion.button
                        key={level}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPersonaData({ ...personaData, experience: level })}
                        className={`p-6 rounded-2xl border-2 transition-all duration-300 text-lg font-bold ${
                          personaData.experience === level
                            ? 'bg-[#D4F1F4] border-[#0D7C8C] text-[#1B2A4A] shadow-lg scale-105'
                            : 'bg-white border-[#E2E8F0] text-[#2D3748] hover:border-[#0D7C8C] hover:bg-[#F8F9FB] hover:shadow-md'
                        }`}
                      >
                        {level}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Question 2: Investment Goal - Shows after Q1 is answered */}
                {personaData.experience && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1A6B3A] to-[#B8860B] flex items-center justify-center shadow-lg">
                        <IconTarget className="w-6 h-6 text-[#FFFFFF]" stroke={2.5} />
                      </div>
                      <label className="text-xl font-bold text-[#1B2A4A]">
                        What's your primary investment goal?
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {['Wealth Growth', 'Income Generation', 'Capital Preservation', 'Retirement Planning'].map((goal) => (
                        <motion.button
                          key={goal}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setPersonaData({ ...personaData, investmentGoal: goal })}
                          className={`p-6 rounded-2xl border-2 transition-all duration-300 text-lg font-bold ${
                            personaData.investmentGoal === goal
                              ? 'bg-[#D4EDD9] border-[#1A6B3A] text-[#1B2A4A] shadow-lg scale-105'
                              : 'bg-white border-[#E2E8F0] text-[#2D3748] hover:border-[#1A6B3A] hover:bg-[#F8F9FB] hover:shadow-md'
                          }`}
                        >
                          {goal}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Question 3: Risk Tolerance - Shows after Q2 is answered */}
                {personaData.investmentGoal && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8C1A1A] to-[#2E4D8E] flex items-center justify-center shadow-lg">
                        <IconShield className="w-6 h-6 text-[#FFFFFF]" stroke={2.5} />
                      </div>
                      <label className="text-xl font-bold text-[#1B2A4A]">
                        How would you describe your risk tolerance?
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {['Conservative', 'Moderate', 'Aggressive', 'Very Aggressive'].map((risk) => (
                        <motion.button
                          key={risk}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setPersonaData({ ...personaData, riskTolerance: risk })}
                          className={`p-6 rounded-2xl border-2 transition-all duration-300 text-lg font-bold ${
                            personaData.riskTolerance === risk
                              ? 'bg-[#FFE4D4] border-[#B45309] text-[#1B2A4A] shadow-lg scale-105'
                              : 'bg-white border-[#E2E8F0] text-[#2D3748] hover:border-[#8C1A1A] hover:bg-[#F8F9FB] hover:shadow-md'
                          }`}
                        >
                          {risk}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Question 4: Investment Horizon - Shows after Q3 is answered */}
                {personaData.riskTolerance && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B8860B] to-[#0D7C8C] flex items-center justify-center shadow-lg">
                        <IconClock className="w-6 h-6 text-[#FFFFFF]" stroke={2.5} />
                      </div>
                      <label className="text-xl font-bold text-[#1B2A4A]">
                        What's your investment time horizon?
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {['Short-term (< 1 year)', 'Medium-term (1-5 years)', 'Long-term (5-10 years)', 'Very Long-term (10+ years)'].map((horizon) => (
                        <motion.button
                          key={horizon}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setPersonaData({ ...personaData, investmentHorizon: horizon })}
                          className={`p-6 rounded-2xl border-2 transition-all duration-300 text-lg font-bold ${
                            personaData.investmentHorizon === horizon
                              ? 'bg-[#FFF4D4] border-[#B8860B] text-[#1B2A4A] shadow-lg scale-105'
                              : 'bg-white border-[#E2E8F0] text-[#2D3748] hover:border-[#B8860B] hover:bg-[#F8F9FB] hover:shadow-md'
                          }`}
                        >
                          {horizon}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Continue Button - Shows after all questions are answered */}
                {personaData.experience && personaData.investmentGoal && personaData.riskTolerance && personaData.investmentHorizon && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-center pt-8"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePersonaNext}
                      className="px-20 py-5 bg-gradient-to-r from-[#0D7C8C] to-[#2E4D8E] border-2 border-[#B8860B] rounded-2xl
                                 hover:shadow-xl hover:scale-105
                                 transition-all duration-300 text-lg font-bold text-[#FFFFFF]
                                 shadow-lg"
                    >
                      Continue
                    </motion.button>
                  </motion.div>
                )}
              </div>
            )}

            {/* Step 2: Institutional Questions - Progressive Display */}
            {step === 3 && userType === 'institutional' && (
              <div className="space-y-10 max-w-3xl mx-auto">
                {/* Question 1: Institution Type - Always visible */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2E4D8E] to-[#0D7C8C] flex items-center justify-center shadow-lg">
                      <IconShield className="w-6 h-6 text-[#FFFFFF]" stroke={2.5} />
                    </div>
                    <label className="text-xl font-bold text-[#1B2A4A]">
                      What type of institution do you represent?
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {['Wealth Manager', 'Fund House', 'Research Firm', 'Brokerage', 'Family Office', 'Other'].map((type) => (
                      <motion.button
                        key={type}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPersonaData({ ...personaData, institutionType: type })}
                        className={`p-6 rounded-2xl border-2 transition-all duration-300 text-lg font-bold ${
                          personaData.institutionType === type
                            ? 'bg-[#D4DFED] border-[#2E4D8E] text-[#1B2A4A] shadow-lg scale-105'
                            : 'bg-white border-[#E2E8F0] text-[#2D3748] hover:border-[#2E4D8E] hover:bg-[#F8F9FB] hover:shadow-md'
                        }`}
                      >
                        {type}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Question 2: Primary Use Case - Shows after Q1 is answered */}
                {personaData.institutionType && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1A6B3A] to-[#B8860B] flex items-center justify-center shadow-lg">
                        <IconTarget className="w-6 h-6 text-[#FFFFFF]" stroke={2.5} />
                      </div>
                      <label className="text-xl font-bold text-[#1B2A4A]">
                        What's your primary use case?
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {['Client Portfolio Management', 'Research & Analysis', 'Fund Management', 'Trading & Execution'].map((useCase) => (
                        <motion.button
                          key={useCase}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setPersonaData({ ...personaData, primaryUseCase: useCase })}
                          className={`p-6 rounded-2xl border-2 transition-all duration-300 text-lg font-bold ${
                            personaData.primaryUseCase === useCase
                              ? 'bg-[#D4EDD9] border-[#1A6B3A] text-[#1B2A4A] shadow-lg scale-105'
                              : 'bg-white border-[#E2E8F0] text-[#2D3748] hover:border-[#1A6B3A] hover:bg-[#F8F9FB] hover:shadow-md'
                          }`}
                        >
                          {useCase}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Question 3: Assets Under Management - Shows after Q2 is answered */}
                {personaData.primaryUseCase && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8C1A1A] to-[#2E4D8E] flex items-center justify-center shadow-lg">
                        <IconTrendingUp className="w-6 h-6 text-[#FFFFFF]" stroke={2.5} />
                      </div>
                      <label className="text-xl font-bold text-[#1B2A4A]">
                        What's your assets under management range?
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {['< ₹10 Cr', '₹10-100 Cr', '₹100-1000 Cr', '₹1000+ Cr'].map((aum) => (
                        <motion.button
                          key={aum}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setPersonaData({ ...personaData, assetsUnderManagement: aum })}
                          className={`p-6 rounded-2xl border-2 transition-all duration-300 text-lg font-bold ${
                            personaData.assetsUnderManagement === aum
                              ? 'bg-[#FFE4D4] border-[#B45309] text-[#1B2A4A] shadow-lg scale-105'
                              : 'bg-white border-[#E2E8F0] text-[#2D3748] hover:border-[#8C1A1A] hover:bg-[#F8F9FB] hover:shadow-md'
                          }`}
                        >
                          {aum}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Question 4: Team Size - Shows after Q3 is answered */}
                {personaData.assetsUnderManagement && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B8860B] to-[#0D7C8C] flex items-center justify-center shadow-lg">
                        <IconUser className="w-6 h-6 text-[#FFFFFF]" stroke={2.5} />
                      </div>
                      <label className="text-xl font-bold text-[#1B2A4A]">
                        What's your team size?
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {['Solo', '2-10 members', '10-50 members', '50+ members'].map((size) => (
                        <motion.button
                          key={size}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setPersonaData({ ...personaData, teamSize: size })}
                          className={`p-6 rounded-2xl border-2 transition-all duration-300 text-lg font-bold ${
                            personaData.teamSize === size
                              ? 'bg-[#FFF4D4] border-[#B8860B] text-[#1B2A4A] shadow-lg scale-105'
                              : 'bg-white border-[#E2E8F0] text-[#2D3748] hover:border-[#B8860B] hover:bg-[#F8F9FB] hover:shadow-md'
                          }`}
                        >
                          {size}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Continue Button - Shows after all questions are answered */}
                {personaData.institutionType && personaData.primaryUseCase && personaData.assetsUnderManagement && personaData.teamSize && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-center pt-8"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePersonaNext}
                      className="px-20 py-5 bg-gradient-to-r from-[#0D7C8C] to-[#2E4D8E] border-2 border-[#B8860B] rounded-2xl
                                 hover:shadow-xl hover:scale-105
                                 transition-all duration-300 text-lg font-bold text-[#FFFFFF]
                                 shadow-lg"
                    >
                      Continue
                    </motion.button>
                  </motion.div>
                )}
              </div>
            )}

            {/* Step 3: Main Options */}
            {step === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                {mainOptions.map((option, index) => (
                  <OnboardingCard
                    key={option.id}
                    option={option}
                    onClick={() => handleMainSelect(option.id)}
                    index={index}
                  />
                ))}
              </div>
            )}

            {/* Step 4: Sub Options */}
            {step === 5 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                {subOptionsData.map((option, index) => (
                  <OnboardingCard
                    key={option.id}
                    option={option}
                    onClick={() => handleFinalSelect(option.route!)}
                    index={index}
                  />
                ))}
              </div>
            )}

            {/* Skip button (Step 4 only) */}
            {step === 4 && (
              <div className="text-center mt-6">
                <button
                  onClick={onClose}
                  className="px-12 py-3 bg-gradient-to-r from-[#0D7C8C] to-[#2E4D8E] border-2 border-[#B8860B]/50 rounded-xl
                             hover:shadow-lg hover:scale-105
                             transition-all duration-200 text-base font-semibold text-[#FFFFFF]
                             shadow-sm"
                >
                  Skip
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )

  return createPortal(modalContent, document.body)
}

