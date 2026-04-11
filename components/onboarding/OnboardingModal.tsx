'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { IconX, IconArrowLeft, IconSparkles, IconTrendingUp, IconTarget, IconShield, IconClock } from '@tabler/icons-react'
import OnboardingCard from './OnboardingCard'
import { mainOptions, getSubOptions } from './onboarding-config'

interface OnboardingModalProps {
  onClose: () => void
}

export default function OnboardingModal({ onClose }: OnboardingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [selectedMain, setSelectedMain] = useState<string | null>(null)
  const [showTooltip, setShowTooltip] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [personaData, setPersonaData] = useState({
    experience: '',
    investmentGoal: '',
    riskTolerance: '',
    investmentHorizon: ''
  })
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const handleWelcomeNext = () => {
    setStep(2)
  }

  const handlePersonaNext = () => {
    // Validate that all persona questions are answered
    if (personaData.experience && personaData.investmentGoal && 
        personaData.riskTolerance && personaData.investmentHorizon) {
      setStep(3)
    }
  }

  const handleMainSelect = (optionId: string) => {
    setSelectedMain(optionId)
    setStep(4)
  }

  const handleFinalSelect = (route: string) => {
    router.push(route)
    onClose()
  }

  const handleBack = () => {
    if (step === 4) {
      setStep(3)
      setSelectedMain(null)
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
    if (step === 2) return 'Tell us about yourself'
    if (step === 3) return 'What would you like to do today?'
    
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
    if (step === 2) return "Help us personalize your experience"
    if (step === 3) return "Let's get you there faster — choose your destination"
    return "Select the view that matches your needs"
  }

  if (!mounted) return null

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-6xl w-full bg-white border border-[#6A994E]/20 
                   rounded-3xl p-10 md:p-12 relative shadow-2xl my-auto"
      >

        {/* Close button with tooltip */}
        <div className="absolute top-8 right-8 z-10">
          <button
            onClick={onClose}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="relative p-2.5 hover:bg-[#F4F7F2] rounded-xl 
                       transition-all duration-100 group"
          >
            <IconX className="w-6 h-6 text-[#6B7280] group-hover:text-[#1F2933] transition-colors duration-100" stroke={1.5} />
            
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 px-3 py-1.5 
                             bg-white border border-[#6A994E]/20 
                             rounded-lg shadow-xl whitespace-nowrap"
                >
                  <div className="flex items-center gap-2">
                    <kbd className="px-2 py-0.5 bg-[#F4F7F2] border border-[#6A994E]/20 
                                   rounded text-xs font-jakarta font-semibold text-[#1F2933]">
                      ESC
                    </kbd>
                    <span className="text-xs font-jakarta text-[#6B7280]">to close</span>
                  </div>
                  {/* Arrow pointer */}
                  <div className="absolute -top-1 right-3 w-2 h-2 bg-white border-l 
                                  border-t border-[#6A994E]/20 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Back button (Steps 2, 3, 4) */}
        {(step === 2 || step === 3 || step === 4) && (
          <button
            onClick={handleBack}
            className="absolute top-8 left-8 px-4 py-2.5 hover:bg-[#F4F7F2] rounded-xl 
                       transition-all duration-100 flex items-center gap-2 group z-10"
          >
            <IconArrowLeft className="w-5 h-5 text-[#6B7280] group-hover:text-[#6A994E] transition-colors duration-100" stroke={1.5} />
            <span className="text-sm font-jakarta font-semibold text-[#6B7280] group-hover:text-[#6A994E] transition-colors duration-100">
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
                           bg-[#A7C4A0] border-2 border-[#6A994E]/30
                           rounded-2xl shadow-lg"
              >
                <IconSparkles className="w-8 h-8 text-[#1F2933]" stroke={2.5} />
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-jakarta font-bold text-[#1F2933] mb-3 leading-tight">
                {getStepTitle()}
              </h2>
              <p className="text-base font-jakarta text-[#6B7280] max-w-xl mx-auto">
                {getStepSubtitle()}
              </p>
            </div>

            {/* Step 1: Welcome Screen */}
            {step === 1 && (
              <div className="text-center space-y-6">
                <p className="text-lg font-jakarta text-[#1F2933] max-w-2xl mx-auto">
                  We're excited to help you make smarter investment decisions. Let's personalize your experience to match your goals.
                </p>
                <button
                  onClick={handleWelcomeNext}
                  className="px-12 py-4 bg-[#A7C4A0] border-2 border-[#6A994E] rounded-xl
                             hover:bg-[#6A994E] hover:shadow-lg
                             transition-all duration-200 mx-auto text-base font-jakarta font-bold text-[#1F2933]
                             shadow-md"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Step 2: Persona Questions - Progressive Display */}
            {step === 2 && (
              <div className="space-y-10 max-w-3xl mx-auto">
                {/* Question 1: Experience Level - Always visible */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                      <IconTrendingUp className="w-6 h-6 text-white" stroke={2.5} />
                    </div>
                    <label className="text-xl font-jakarta font-bold text-[#1F2933]">
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
                        className={`p-6 rounded-2xl border-2 transition-all duration-300 text-lg font-jakarta font-bold ${
                          personaData.experience === level
                            ? 'bg-[#A7C4A0] border-[#6A994E] text-[#1F2933] shadow-lg scale-105'
                            : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#A7C4A0] hover:bg-[#F4F7F2] hover:shadow-md'
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
                      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                        <IconTarget className="w-6 h-6 text-white" stroke={2.5} />
                      </div>
                      <label className="text-xl font-jakarta font-bold text-[#1F2933]">
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
                          className={`p-6 rounded-2xl border-2 transition-all duration-300 text-lg font-jakarta font-bold ${
                            personaData.investmentGoal === goal
                              ? 'bg-[#A7C4A0] border-[#6A994E] text-[#1F2933] shadow-lg scale-105'
                              : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#A7C4A0] hover:bg-[#F4F7F2] hover:shadow-md'
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
                      <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center shadow-lg">
                        <IconShield className="w-6 h-6 text-white" stroke={2.5} />
                      </div>
                      <label className="text-xl font-jakarta font-bold text-[#1F2933]">
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
                          className={`p-6 rounded-2xl border-2 transition-all duration-300 text-lg font-jakarta font-bold ${
                            personaData.riskTolerance === risk
                              ? 'bg-[#A7C4A0] border-[#6A994E] text-[#1F2933] shadow-lg scale-105'
                              : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#A7C4A0] hover:bg-[#F4F7F2] hover:shadow-md'
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
                      <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shadow-lg">
                        <IconClock className="w-6 h-6 text-white" stroke={2.5} />
                      </div>
                      <label className="text-xl font-jakarta font-bold text-[#1F2933]">
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
                          className={`p-6 rounded-2xl border-2 transition-all duration-300 text-lg font-jakarta font-bold ${
                            personaData.investmentHorizon === horizon
                              ? 'bg-[#A7C4A0] border-[#6A994E] text-[#1F2933] shadow-lg scale-105'
                              : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#A7C4A0] hover:bg-[#F4F7F2] hover:shadow-md'
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
                      className="px-20 py-5 bg-[#A7C4A0] border-2 border-[#6A994E] rounded-2xl
                                 hover:bg-[#6A994E] hover:shadow-xl
                                 transition-all duration-300 text-lg font-jakarta font-bold text-[#1F2933]
                                 shadow-lg"
                    >
                      Continue
                    </motion.button>
                  </motion.div>
                )}
              </div>
            )}

            {/* Step 3: Main Options */}
            {step === 3 && (
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
            {step === 4 && (
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

            {/* Skip button (Step 3 only) */}
            {step === 3 && (
              <div className="text-center mt-6">
                <button
                  onClick={onClose}
                  className="px-12 py-3 bg-[#A7C4A0] border-2 border-[#6A994E]/30 rounded-xl
                             hover:bg-[#6A994E] hover:text-white
                             transition-all duration-200 text-base font-jakarta font-semibold text-[#1F2933]
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
