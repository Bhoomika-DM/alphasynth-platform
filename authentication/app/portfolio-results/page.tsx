'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { IconScale, IconTrendingUp, IconRocket, IconWorld, IconMapPin, IconSparkles, IconInfoCircle, IconPlus, IconX, IconSearch, IconDeviceFloppy, IconClock, IconBook, IconChartBar, IconChartLine, IconMessageCircle, IconAlertTriangle, IconBulb, IconCircleFilled } from '@tabler/icons-react'
import NavigationHeader from '@/components/dashboard/NavigationHeader'
import PortfolioCockpit from '@/components/portfolio/PortfolioCockpit'

export default function AnalysisPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const baskets = searchParams.get('baskets')?.split(',') || []
  
  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [clientId, setClientId] = useState('')
  const [password, setPassword] = useState('')
  const [totp, setTotp] = useState('')
  const [apiKeyError, setApiKeyError] = useState('')
  const [apiSecretError, setApiSecretError] = useState('')
  const [clientIdError, setClientIdError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [totpError, setTotpError] = useState('')
  const [selectedBroker, setSelectedBroker] = useState<'zerodha' | 'angelone' | null>(null)
  const [isBrokerConnected, setIsBrokerConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [importedHoldings, setImportedHoldings] = useState<string[]>([])
  const [showBrokerForm, setShowBrokerForm] = useState(false)
  const [brokerStep, setBrokerStep] = useState(1) // 1: Login, 2: Token, 3: Holdings
  const [selectedStrategy, setSelectedStrategy] = useState('balanced')
  const [selectedMarket, setSelectedMarket] = useState('global')
  const [selectedBasket, setSelectedBasket] = useState<string | null>(null)
  const [isModified, setIsModified] = useState(false)
  
  // Basket definitions
  const globalBaskets = {
    'Magnificent 5': ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA'],
    'AI & Semis': ['NVDA', 'AMD', 'INTC', 'TSM', 'AVGO'],
    'Financials': ['JPM', 'BAC', 'WFC', 'GS', 'MS'],
    'Energy': ['XOM', 'CVX', 'COP', 'SLB', 'EOG'],
    'Healthcare': ['JNJ', 'UNH', 'PFE', 'ABBV', 'TMO'],
    'Consumer': ['AMZN', 'TSLA', 'HD', 'NKE', 'SBUX'],
  }
  
  const indiaBaskets = {
    'Nifty 50': ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK'],
    'Bank Nifty': ['HDFCBANK', 'ICICIBANK', 'KOTAKBANK', 'SBIN', 'AXISBANK'],
    'IT Sector': ['TCS', 'INFY', 'WIPRO', 'HCLTECH', 'TECHM'],
    'Pharma': ['SUNPHARMA', 'DRREDDY', 'CIPLA', 'DIVISLAB', 'BIOCON'],
    'Auto': ['TATAMOTORS', 'M&M', 'MARUTI', 'BAJAJ-AUTO', 'HEROMOTOCO'],
    'FMCG': ['HINDUNILVR', 'ITC', 'NESTLEIND', 'BRITANNIA', 'DABUR'],
  }
  
  const getCurrentTickers = () => {
    if (selectedBasket) {
      const baskets = selectedMarket === 'global' ? globalBaskets : indiaBaskets
      return baskets[selectedBasket as keyof typeof baskets] || []
    }
    // Default tickers when no basket selected
    return selectedMarket === 'global' 
      ? ['AAPL', 'NVDA', 'MSFT', 'TSLA']
      : ['RELIANCE', 'TCS', 'INFY', 'HDFCBANK']
  }
  
  // Command Center state
  const [isCommandCenterOpen, setIsCommandCenterOpen] = useState(false)
  const [commandInput, setCommandInput] = useState('')
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([])
  
  // Intelligence gathering state
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [showFactorInfo, setShowFactorInfo] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null)
  const [detailTab, setDetailTab] = useState('overview')
  const [sentimentScored, setSentimentScored] = useState(false)
  const [sentimentTab, setSentimentTab] = useState('summary')
  
  const analysisSteps = [
    { name: 'Intelligence Layer: Perplexity Finance Live Search', status: 'pending' },
    { name: 'Fundamental Layer: Piotroski & Altman Z Analysis', status: 'pending' },
    { name: 'Technical Layer: RSI, MACD & Golden Cross Predictions', status: 'pending' },
    { name: 'Risk Layer: Monte Carlo & VaR Portfolio Simulation', status: 'pending' },
    { name: 'Political & Regulatory Risk Assessment', status: 'pending' },
    { name: 'Macro & Geopolitical Sentiment Synthesis', status: 'pending' },
    { name: 'Constructing Grounded AI Narratives with Claude', status: 'pending' },
  ]
  
  // Validation functions
  const validateApiKey = (key: string) => {
    if (!key) {
      return 'API Key is required'
    }
    if (key.length < 10) {
      return 'API Key must be at least 10 characters'
    }
    if (!/^[a-zA-Z0-9]+$/.test(key)) {
      return 'API Key should only contain letters and numbers'
    }
    return ''
  }
  
  const validateApiSecret = (secret: string) => {
    if (!secret) {
      return 'API Secret is required'
    }
    if (secret.length < 20) {
      return 'API Secret must be at least 20 characters'
    }
    if (!/^[a-zA-Z0-9]+$/.test(secret)) {
      return 'API Secret should only contain letters and numbers'
    }
    return ''
  }
  
  const validateClientId = (id: string) => {
    if (!id) {
      return 'Client ID is required'
    }
    if (id.length < 5) {
      return 'Client ID must be at least 5 characters'
    }
    return ''
  }
  
  const validatePassword = (pwd: string) => {
    if (!pwd) {
      return 'Password is required'
    }
    if (pwd.length < 6) {
      return 'Password must be at least 6 characters'
    }
    return ''
  }
  
  const validateTotp = (code: string) => {
    if (!code) {
      return 'TOTP is required'
    }
    if (!/^\d{6}$/.test(code)) {
      return 'TOTP must be exactly 6 digits'
    }
    return ''
  }
  
  const handleApiKeyChange = (value: string) => {
    setApiKey(value)
    if (value) {
      setApiKeyError(validateApiKey(value))
    } else {
      setApiKeyError('')
    }
  }
  
  const handleApiSecretChange = (value: string) => {
    setApiSecret(value)
    if (value) {
      setApiSecretError(validateApiSecret(value))
    } else {
      setApiSecretError('')
    }
  }
  
  const handleClientIdChange = (value: string) => {
    setClientId(value)
    if (value) {
      setClientIdError(validateClientId(value))
    } else {
      setClientIdError('')
    }
  }
  
  const handlePasswordChange = (value: string) => {
    setPassword(value)
    if (value) {
      setPasswordError(validatePassword(value))
    } else {
      setPasswordError('')
    }
  }
  
  const handleTotpChange = (value: string) => {
    setTotp(value)
    if (value) {
      setTotpError(validateTotp(value))
    } else {
      setTotpError('')
    }
  }
  
  const handleBrokerConnect = async () => {
    // Validate based on selected broker
    if (selectedBroker === 'zerodha') {
      const keyError = validateApiKey(apiKey)
      const secretError = validateApiSecret(apiSecret)
      
      setApiKeyError(keyError)
      setApiSecretError(secretError)
      
      if (keyError || secretError) {
        return
      }
    } else if (selectedBroker === 'angelone') {
      const keyError = validateApiKey(apiKey)
      const clientError = validateClientId(clientId)
      const pwdError = validatePassword(password)
      const totpErr = validateTotp(totp)
      
      setApiKeyError(keyError)
      setClientIdError(clientError)
      setPasswordError(pwdError)
      setTotpError(totpErr)
      
      if (keyError || clientError || pwdError || totpErr) {
        return
      }
    }
    
    setIsConnecting(true)
    
    // Simulate API call to broker - Step 1: Login
    setTimeout(() => {
      setBrokerStep(2) // Move to token step
      setIsConnecting(false)
    }, 1500)
  }
  
  const handleTokenSubmit = () => {
    setIsConnecting(true)
    
    // Simulate token verification - Step 2: Token
    setTimeout(() => {
      setBrokerStep(3) // Move to holdings step
      setIsConnecting(false)
    }, 1500)
  }
  
  const handleImportHoldings = () => {
    setIsConnecting(true)
    
    // Simulate importing holdings - Step 3: Holdings
    setTimeout(() => {
      setIsBrokerConnected(true)
      setIsConnecting(false)
      setShowBrokerForm(false)
      setBrokerStep(1) // Reset for next time
      
      // Simulate imported holdings
      const mockHoldings = selectedBroker === 'zerodha' 
        ? ['RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'ICICIBANK']
        : ['TATAMOTORS', 'WIPRO', 'SUNPHARMA', 'AXISBANK', 'ITC']
      
      setImportedHoldings(mockHoldings)
      setSelectedMarket('india')
    }, 2000)
  }
  
  const handleBrokerDisconnect = () => {
    setIsBrokerConnected(false)
    setSelectedBroker(null)
    setApiKey('')
    setApiSecret('')
    setImportedHoldings([])
    setBrokerStep(1)
  }
  
  const handleAnalyzePortfolio = () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setCurrentStep(0)
    
    // Simulate progress through steps
    const stepDuration = 1500 // 1.5 seconds per step
    const progressInterval = 50 // Update progress every 50ms
    const progressPerStep = 100 / analysisSteps.length
    
    let currentProgress = 0
    let stepIndex = 0
    
    const interval = setInterval(() => {
      currentProgress += (progressPerStep / (stepDuration / progressInterval))
      
      if (currentProgress >= (stepIndex + 1) * progressPerStep) {
        stepIndex++
        setCurrentStep(stepIndex)
      }
      
      setAnalysisProgress(Math.min(currentProgress, 100))
      
      if (currentProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setIsAnalyzing(false)
          // Navigate to portfolio results page
          router.push('/portfolio-results')
        }, 500)
      }
    }, progressInterval)
  }
  
  const handleSendMessage = () => {
    if (!commandInput.trim()) return
    
    // Add user message
    setChatMessages([...chatMessages, { role: 'user', content: commandInput }])
    
    // Simulate AI response (replace with actual API call later)
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Based on your portfolio analysis, here's what I found regarding "${commandInput}". This is a demo response - connect to your AI backend for real analysis.`
      }])
    }, 1000)
    
    setCommandInput('')
  }
  
  // Factor weights
  const [fundamentals, setFundamentals] = useState(25)
  const [technical, setTechnical] = useState(15)
  const [macro, setMacro] = useState(15)
  const [earningsMomentum, setEarningsMomentum] = useState(20)
  const [sentiment, setSentiment] = useState(15)
  const [geopolitical, setGeopolitical] = useState(10)
  
  const totalWeight = fundamentals + technical + macro + earningsMomentum + sentiment + geopolitical
  
  const strategies = [
    { 
      id: 'balanced', 
      name: 'Balanced', 
      Icon: IconScale,
      description: 'Equal weight across all factors for diversified analysis',
      weights: { fundamentals: 20, earningsMomentum: 20, technical: 15, sentiment: 15, macro: 15, geopolitical: 15 }
    },
    { 
      id: 'deepValue', 
      name: 'Deep Value', 
      Icon: IconTrendingUp,
      description: 'Focus on fundamentals and undervalued stocks',
      weights: { fundamentals: 45, earningsMomentum: 15, technical: 10, sentiment: 10, macro: 15, geopolitical: 5 }
    },
    { 
      id: 'momentum', 
      name: 'Momentum', 
      Icon: IconRocket,
      description: 'Prioritize earnings growth and technical trends',
      weights: { fundamentals: 10, earningsMomentum: 40, technical: 30, sentiment: 10, macro: 5, geopolitical: 5 }
    },
    { 
      id: 'macroDriven', 
      name: 'Macro Driven', 
      Icon: IconWorld,
      description: 'Emphasize economic cycles and macro trends',
      weights: { fundamentals: 15, earningsMomentum: 15, technical: 10, sentiment: 10, macro: 40, geopolitical: 10 }
    },
    { 
      id: 'indiaFocused', 
      name: 'India Focused', 
      Icon: IconMapPin,
      description: 'Optimized for Indian market with geopolitical awareness',
      weights: { fundamentals: 25, earningsMomentum: 20, technical: 15, sentiment: 10, macro: 15, geopolitical: 15 }
    },
  ]
  
  const applyStrategy = (strategyId: string) => {
    setSelectedStrategy(strategyId)
    setIsModified(false)
    const strategy = strategies.find(s => s.id === strategyId)
    if (strategy) {
      setFundamentals(strategy.weights.fundamentals)
      setEarningsMomentum(strategy.weights.earningsMomentum)
      setTechnical(strategy.weights.technical)
      setSentiment(strategy.weights.sentiment)
      setMacro(strategy.weights.macro)
      setGeopolitical(strategy.weights.geopolitical)
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F7F2] text-[#1F2933]">
      {/* Header */}
      <div className="border-b border-[#6A994E]/20 bg-[#F4F7F2]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-jakarta font-black text-[#1F2933]">
              {analysisComplete ? 'Portfolio Results' : 'Custom Portfolio Analysis'}
            </h1>
            <p className="text-sm font-jakarta text-[#6B7280]">Advanced portfolio analytics and insights</p>
          </div>
          <NavigationHeader />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Broker Integration */}
        <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-jakarta font-bold text-[#1F2933] mb-1">🔗 Broker Integration</h2>
              <p className="text-sm font-jakarta text-[#6B7280]">
                {isBrokerConnected 
                  ? `Connected to ${selectedBroker === 'zerodha' ? 'Zerodha Kite' : 'AngelOne'} • ${importedHoldings.length} holdings imported`
                  : 'Import your live portfolio from Zerodha or AngelOne — then run full analysis in one click'
                }
              </p>
            </div>
            {!isBrokerConnected ? (
              <button 
                onClick={() => setShowBrokerForm(!showBrokerForm)}
                className="px-6 py-3 bg-[#A7C4A0] hover:bg-[#A7C4A0]/90 rounded-xl text-base font-jakarta font-bold text-black transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]"
              >
                {showBrokerForm ? 'Cancel' : 'Connect broker'}
              </button>
            ) : (
              <button 
                onClick={handleBrokerDisconnect}
                className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-xl text-base font-jakarta font-bold text-red-400 transition-all"
              >
                Disconnect
              </button>
            )}
          </div>

          {/* Broker Connection Form */}
          {showBrokerForm && !isBrokerConnected && (
            <div className="space-y-4 p-5 bg-white border border-[#6A994E]/20 rounded-xl">
              {/* Step Indicators */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1 rounded-lg text-xs font-jakarta font-bold ${brokerStep === 1 ? 'bg-[#A7C4A0]/20 text-[#6A994E]' : brokerStep > 1 ? 'bg-green-500/20 text-green-400' : 'bg-white text-[#6B7280]'}`}>
                    Step 1: Login
                  </div>
                  <div className="w-8 h-0.5 bg-[#F4F7F2]"></div>
                  <div className={`px-3 py-1 rounded-lg text-xs font-jakarta font-bold ${brokerStep === 2 ? 'bg-[#A7C4A0]/20 text-[#6A994E]' : brokerStep > 2 ? 'bg-green-500/20 text-green-400' : 'bg-white text-[#6B7280]'}`}>
                    Step 2: Token
                  </div>
                  <div className="w-8 h-0.5 bg-[#F4F7F2]"></div>
                  <div className={`px-3 py-1 rounded-lg text-xs font-jakarta font-bold ${brokerStep === 3 ? 'bg-[#A7C4A0]/20 text-[#6A994E]' : 'bg-white text-[#6B7280]'}`}>
                    Step 3: Holdings
                  </div>
                </div>
              </div>

              {/* Step 1: Broker Selection & Login */}
              {brokerStep === 1 && (
                <>
                  <div>
                    <label className="text-sm font-jakarta font-bold text-[#1F2933] mb-3 block">Select Broker</label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedBroker('zerodha')}
                        className={`flex-1 px-4 py-3 rounded-lg border transition-all ${
                          selectedBroker === 'zerodha'
                            ? 'bg-[#A7C4A0]/20 border-[#6A994E]/50 text-[#1F2933]'
                            : 'bg-white border-[#6A994E]/20 text-[#6B7280] hover:border-[#6A994E]/30'
                        }`}
                      >
                        <div className="text-base font-jakarta font-bold flex items-center gap-2">
                          <IconCircleFilled className="w-4 h-4 text-green-500" />
                          Zerodha Kite
                        </div>
                        <div className="text-xs text-[#6B7280] mt-1">India's largest broker</div>
                      </button>
                      <button
                        onClick={() => setSelectedBroker('angelone')}
                        className={`flex-1 px-4 py-3 rounded-lg border transition-all ${
                          selectedBroker === 'angelone'
                            ? 'bg-[#A7C4A0]/20 border-[#6A994E]/50 text-[#1F2933]'
                            : 'bg-white border-[#6A994E]/20 text-[#6B7280] hover:border-[#6A994E]/30'
                        }`}
                      >
                        <div className="text-base font-jakarta font-bold flex items-center gap-2">
                          <IconCircleFilled className="w-4 h-4 text-blue-500" />
                          AngelOne SmartAPI
                        </div>
                        <div className="text-xs text-[#6B7280] mt-1">Angel Broking platform</div>
                      </button>
                    </div>
                  </div>

                  {selectedBroker && (
                    <div className="space-y-3">
                      <div className="p-3 bg-[#A7C4A0]/10 border border-[#6A994E]/30 rounded-lg">
                        <p className="text-xs font-jakarta text-[#6A994E] leading-relaxed mb-3">
                          <strong>
                            {selectedBroker === 'zerodha' 
                              ? 'Enter your Kite API credentials' 
                              : 'Enter your AngelOne SmartAPI credentials. TOTP = 6-digit Google Authenticator code'}
                          </strong>
                        </p>
                        <a 
                          href={selectedBroker === 'zerodha' ? 'https://developers.kite.trade' : 'https://smartapi.angelbroking.com'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#F4F7F2] border border-[#6A994E]/20 hover:border-[#6A994E]/50 rounded-lg text-xs font-jakarta font-bold text-[#1F2933] transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          {selectedBroker === 'zerodha' ? 'Open Kite Developer Console' : 'Open SmartAPI Portal'}
                        </a>
                      </div>

                      {/* Zerodha Fields */}
                      {selectedBroker === 'zerodha' && (
                        <>
                          <div>
                            <label className="text-sm font-jakarta font-bold text-[#1F2933] mb-2 block">API Key (from Kite Developer Console)</label>
                            <input
                              type="text"
                              value={apiKey}
                              onChange={(e) => handleApiKeyChange(e.target.value)}
                              placeholder="API Key"
                              className={`w-full px-4 py-3 bg-white border rounded-lg text-[#1F2933] placeholder-[#6B7280] font-jakarta text-sm outline-none transition-all ${
                                apiKeyError 
                                  ? 'border-red-500/50 focus:border-red-500' 
                                  : apiKey && !apiKeyError 
                                  ? 'border-green-500/50 focus:border-green-500' 
                                  : 'border-[#6A994E]/20 focus:border-white/30'
                              }`}
                            />
                            {apiKeyError && (
                              <p className="text-xs font-jakarta text-red-400 mt-1 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {apiKeyError}
                              </p>
                            )}
                            {apiKey && !apiKeyError && (
                              <p className="text-xs font-jakarta text-green-400 mt-1 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Valid API Key
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-jakarta font-bold text-[#1F2933] mb-2 block">API Secret</label>
                            <input
                              type="password"
                              value={apiSecret}
                              onChange={(e) => handleApiSecretChange(e.target.value)}
                              placeholder="API Secret"
                              className={`w-full px-4 py-3 bg-white border rounded-lg text-[#1F2933] placeholder-[#6B7280] font-jakarta text-sm outline-none transition-all ${
                                apiSecretError 
                                  ? 'border-red-500/50 focus:border-red-500' 
                                  : apiSecret && !apiSecretError 
                                  ? 'border-green-500/50 focus:border-green-500' 
                                  : 'border-[#6A994E]/20 focus:border-white/30'
                              }`}
                            />
                            {apiSecretError && (
                              <p className="text-xs font-jakarta text-red-400 mt-1 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {apiSecretError}
                              </p>
                            )}
                            {apiSecret && !apiSecretError && (
                              <p className="text-xs font-jakarta text-green-400 mt-1 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Valid API Secret
                              </p>
                            )}
                          </div>
                        </>
                      )}

                      {/* AngelOne Fields */}
                      {selectedBroker === 'angelone' && (
                        <>
                          <div>
                            <label className="text-sm font-jakarta font-bold text-[#1F2933] mb-2 block">SmartAPI Key</label>
                            <input
                              type="text"
                              value={apiKey}
                              onChange={(e) => handleApiKeyChange(e.target.value)}
                              placeholder="SmartAPI Key"
                              className={`w-full px-4 py-3 bg-white border rounded-lg text-[#1F2933] placeholder-[#6B7280] font-jakarta text-sm outline-none transition-all ${
                                apiKeyError 
                                  ? 'border-red-500/50 focus:border-red-500' 
                                  : apiKey && !apiKeyError 
                                  ? 'border-green-500/50 focus:border-green-500' 
                                  : 'border-[#6A994E]/20 focus:border-white/30'
                              }`}
                            />
                            {apiKeyError && (
                              <p className="text-xs font-jakarta text-red-400 mt-1 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {apiKeyError}
                              </p>
                            )}
                            {apiKey && !apiKeyError && (
                              <p className="text-xs font-jakarta text-green-400 mt-1 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Valid SmartAPI Key
                              </p>
                            )}
                          </div>
                          
                          <div>
                            <label className="text-sm font-jakarta font-bold text-[#1F2933] mb-2 block">Client ID (Trading ID)</label>
                            <input
                              type="text"
                              value={clientId}
                              onChange={(e) => handleClientIdChange(e.target.value)}
                              placeholder="Client ID"
                              className={`w-full px-4 py-3 bg-white border rounded-lg text-[#1F2933] placeholder-[#6B7280] font-jakarta text-sm outline-none transition-all ${
                                clientIdError 
                                  ? 'border-red-500/50 focus:border-red-500' 
                                  : clientId && !clientIdError 
                                  ? 'border-green-500/50 focus:border-green-500' 
                                  : 'border-[#6A994E]/20 focus:border-white/30'
                              }`}
                            />
                            {clientIdError && (
                              <p className="text-xs font-jakarta text-red-400 mt-1 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {clientIdError}
                              </p>
                            )}
                            {clientId && !clientIdError && (
                              <p className="text-xs font-jakarta text-green-400 mt-1 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Valid Client ID
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="text-sm font-jakarta font-bold text-[#1F2933] mb-2 block">Password</label>
                            <input
                              type="password"
                              value={password}
                              onChange={(e) => handlePasswordChange(e.target.value)}
                              placeholder="Password"
                              className={`w-full px-4 py-3 bg-white border rounded-lg text-[#1F2933] placeholder-[#6B7280] font-jakarta text-sm outline-none transition-all ${
                                passwordError 
                                  ? 'border-red-500/50 focus:border-red-500' 
                                  : password && !passwordError 
                                  ? 'border-green-500/50 focus:border-green-500' 
                                  : 'border-[#6A994E]/20 focus:border-white/30'
                              }`}
                            />
                            {passwordError && (
                              <p className="text-xs font-jakarta text-red-400 mt-1 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {passwordError}
                              </p>
                            )}
                            {password && !passwordError && (
                              <p className="text-xs font-jakarta text-green-400 mt-1 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Valid Password
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="text-sm font-jakarta font-bold text-[#1F2933] mb-2 block">6-digit TOTP</label>
                            <input
                              type="text"
                              value={totp}
                              onChange={(e) => handleTotpChange(e.target.value)}
                              placeholder="123456"
                              maxLength={6}
                              className={`w-full px-4 py-3 bg-white border rounded-lg text-[#1F2933] placeholder-[#6B7280] font-jakarta text-sm outline-none transition-all ${
                                totpError 
                                  ? 'border-red-500/50 focus:border-red-500' 
                                  : totp && !totpError 
                                  ? 'border-green-500/50 focus:border-green-500' 
                                  : 'border-[#6A994E]/20 focus:border-white/30'
                              }`}
                            />
                            {totpError && (
                              <p className="text-xs font-jakarta text-red-400 mt-1 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {totpError}
                              </p>
                            )}
                            {totp && !totpError && (
                              <p className="text-xs font-jakarta text-green-400 mt-1 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Valid TOTP
                              </p>
                            )}
                          </div>
                        </>
                      )}

                      <button
                        onClick={handleBrokerConnect}
                        disabled={
                          isConnecting || 
                          (selectedBroker === 'zerodha' && (!apiKey || !apiSecret || !!apiKeyError || !!apiSecretError)) ||
                          (selectedBroker === 'angelone' && (!apiKey || !clientId || !password || !totp || !!apiKeyError || !!clientIdError || !!passwordError || !!totpError))
                        }
                        className="w-full px-6 py-3 bg-[#A7C4A0] hover:bg-[#A7C4A0]/90 disabled:bg-[#F4F7F2] disabled:text-[#6B7280] rounded-xl text-base font-jakarta font-bold text-black transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] disabled:shadow-none"
                      >
                        {isConnecting 
                          ? (selectedBroker === 'zerodha' ? 'Opening Kite Login...' : 'Logging in to AngelOne...') 
                          : (selectedBroker === 'zerodha' ? 'Open Kite Login →' : 'Login to AngelOne →')
                        }
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Step 2: Token */}
              {brokerStep === 2 && (
                <div className="space-y-3">
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-sm font-jakarta text-green-400 font-bold mb-2">✓ Login Successful!</p>
                    <p className="text-xs font-jakarta text-[#6B7280]">
                      You'll be redirected to Kite login. After logging in, copy the request token from the URL.
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-jakarta font-bold text-[#1F2933] mb-2 block">Request Token</label>
                    <input
                      type="text"
                      placeholder="Paste request token here"
                      className="w-full px-4 py-3 bg-white border border-[#6A994E]/20 focus:border-white/30 rounded-lg text-[#1F2933] placeholder-[#6B7280] font-jakarta text-sm outline-none transition-all"
                    />
                  </div>

                  <button
                    onClick={handleTokenSubmit}
                    disabled={isConnecting}
                    className="w-full px-6 py-3 bg-[#A7C4A0] hover:bg-[#A7C4A0]/90 disabled:bg-[#F4F7F2] disabled:text-[#6B7280] rounded-xl text-base font-jakarta font-bold text-black transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] disabled:shadow-none"
                  >
                    {isConnecting ? 'Verifying Token...' : 'Verify Token →'}
                  </button>
                </div>
              )}

              {/* Step 3: Holdings */}
              {brokerStep === 3 && (
                <div className="space-y-3">
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-sm font-jakarta text-green-400 font-bold mb-2">✓ Token Verified!</p>
                    <p className="text-xs font-jakarta text-[#6B7280]">
                      Ready to import your holdings. Click below to fetch your portfolio.
                    </p>
                  </div>

                  <div className="p-4 bg-white border border-[#6A994E]/20 rounded-lg">
                    <p className="text-xs font-jakarta text-[#6B7280] mb-2">Preview:</p>
                    <div className="flex flex-wrap gap-2">
                      {['RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'ICICIBANK'].map((stock) => (
                        <div key={stock} className="px-2 py-1 bg-[#F4F7F2] rounded text-xs font-jakarta text-[#1F2933]">
                          {stock}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleImportHoldings}
                    disabled={isConnecting}
                    className="w-full px-6 py-3 bg-[#A7C4A0] hover:bg-[#A7C4A0]/90 disabled:bg-[#F4F7F2] disabled:text-[#6B7280] rounded-xl text-base font-jakarta font-bold text-black transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] disabled:shadow-none"
                  >
                    {isConnecting ? 'Importing Holdings...' : 'Import Holdings →'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Connected Status */}
          {isBrokerConnected && (
            <div className="p-5 bg-green-500/10 border border-green-500/30 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-jakarta font-bold text-green-400">
                  Connected to {selectedBroker === 'zerodha' ? 'Zerodha Kite' : 'AngelOne'}
                </span>
              </div>
              <p className="text-xs font-jakarta text-[#6B7280]">
                Successfully imported {importedHoldings.length} holdings from your portfolio. 
                You can now customize factor weights and run analysis.
              </p>
            </div>
          )}
        </div>

        {/* Portfolio Cockpit */}
        <PortfolioCockpit onAnalyze={(holdings) => {
          console.log('Analyzing portfolio with holdings:', holdings)
          // You can add your analysis logic here
        }} />

        {/* Factor Weight Customization */}
        <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-xl font-jakarta font-bold text-[#1F2933] mb-1">Factor Weight Customisation</h2>
                <p className="text-sm font-jakarta text-[#6B7280]">Adjust how each factor contributes to the composite score. Weights auto-normalise to 100%</p>
              </div>
              <button 
                onClick={() => setShowFactorInfo(!showFactorInfo)}
                className="p-2 hover:bg-[#F4F7F2] rounded-lg transition-colors"
                title="Learn more about factor weights"
              >
                <IconInfoCircle className="w-5 h-5 text-[#6B7280] hover:text-[#1F2933]" stroke={1.5} />
              </button>
            </div>
          </div>

          {/* Info Panel */}
          {showFactorInfo && (
            <div className="mb-6 p-5 bg-blue-500/10 border border-blue-500/30 rounded-xl">
              <h3 className="text-base font-jakarta font-bold text-blue-400 mb-3 flex items-center gap-2">
                <IconBook className="w-5 h-5" stroke={1.5} />
                What is Factor Weight Customisation?
              </h3>
              <div className="space-y-3 text-sm font-jakarta text-white/80 leading-relaxed">
                <p>
                  <strong className="text-[#1F2933]">Factor-based investing</strong> means scoring stocks based on multiple criteria (factors) rather than just one metric. Each factor captures a different aspect of a stock's potential.
                </p>
                <p>
                  <strong className="text-[#1F2933]">How it works:</strong> You assign weights (percentages) to each factor based on your investment strategy. The system then calculates a composite score for each stock by combining all factors according to your weights.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="p-3 bg-white rounded-lg">
                    <div className="text-blue-400 font-bold mb-1 flex items-center gap-1.5">
                      <IconChartBar className="w-4 h-4" stroke={1.5} />
                      Fundamentals
                    </div>
                    <div className="text-xs text-[#6B7280]">Company's financial health (P/E ratio, profit margins, debt levels)</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="text-green-400 font-bold mb-1 flex items-center gap-1.5">
                      <IconTrendingUp className="w-4 h-4" stroke={1.5} />
                      Earnings Momentum
                    </div>
                    <div className="text-xs text-[#6B7280]">How fast earnings are growing (revenue growth, EPS surprises)</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="text-[#A7C4A0] font-bold mb-1 flex items-center gap-1.5">
                      <IconChartLine className="w-4 h-4" stroke={1.5} />
                      Technical
                    </div>
                    <div className="text-xs text-[#6B7280]">Price trends and patterns (RSI, MACD, moving averages)</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="text-orange-400 font-bold mb-1 flex items-center gap-1.5">
                      <IconMessageCircle className="w-4 h-4" stroke={1.5} />
                      Sentiment
                    </div>
                    <div className="text-xs text-[#6B7280]">Market mood and analyst opinions (news sentiment, upgrades)</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="text-cyan-400 font-bold mb-1 flex items-center gap-1.5">
                      <IconWorld className="w-4 h-4" stroke={1.5} />
                      Macro
                    </div>
                    <div className="text-xs text-[#6B7280]">Economic environment (interest rates, GDP, inflation)</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="text-red-400 font-bold mb-1 flex items-center gap-1.5">
                      <IconAlertTriangle className="w-4 h-4" stroke={1.5} />
                      Geopolitical
                    </div>
                    <div className="text-xs text-[#6B7280]">Political risks (elections, trade wars, regulations)</div>
                  </div>
                </div>
                <p className="mt-4">
                  <strong className="text-[#1F2933]">Example:</strong> If you set Fundamentals to 40% and Technical to 20%, a stock with Fundamental score 80 and Technical score 60 gets: (80 × 0.4) + (60 × 0.2) = 44 points from these two factors.
                </p>
                <p className="flex items-start gap-2">
                  <IconBulb className="w-4 h-4 text-[#6A994E] flex-shrink-0 mt-0.5" stroke={1.5} />
                  <span>
                    <strong className="text-[#6A994E]">Pro Tip:</strong> Use the strategy presets (Balanced, Deep Value, Momentum) to quickly apply proven factor combinations, then fine-tune to match your style!
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* Strategy Presets */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-jakarta font-bold text-white/80">Strategy Presets</h3>
              {isModified && (
                <span className="text-xs font-jakarta text-orange-400 flex items-center gap-1">
                  <IconSparkles className="w-3 h-3" stroke={1.5} />
                  Modified from preset
                </span>
              )}
            </div>
            <div className="flex gap-3 flex-wrap">
              {strategies.map((strategy) => {
                const Icon = strategy.Icon
                return (
                  <button
                    key={strategy.id}
                    onClick={() => applyStrategy(strategy.id)}
                    className={`px-4 py-2.5 rounded-lg border transition-all flex items-center gap-2 group relative ${
                      selectedStrategy === strategy.id && !isModified
                        ? 'bg-[#A7C4A0]/20 border-[#6A994E]/50 text-[#1F2933] shadow-[0_0_15px_rgba(34,197,94,0.2)]'
                        : 'bg-white border-[#6A994E]/20 text-[#6B7280] hover:border-[#6A994E]/30 hover:bg-[#F4F7F2]'
                    }`}
                    title={strategy.description}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-jakarta font-bold">{strategy.name}</span>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#F4F7F2] border border-[#6A994E]/30 rounded-lg text-xs font-jakarta text-white/90 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {strategy.description}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black"></div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            {/* Fundamentals */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-base font-jakarta font-bold text-[#1F2933]">Fundamentals</div>
                  <div className="text-xs font-jakarta text-[#6B7280]">P/E, ROE, margins</div>
                </div>
                <div className="text-2xl font-jakarta font-black text-blue-400">{fundamentals}%</div>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={fundamentals}
                  onChange={(e) => {
                    setFundamentals(Number(e.target.value))
                    setIsModified(true)
                  }}
                  className="w-full h-2 bg-[#F4F7F2] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-400 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(96,165,250,0.5)] [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-400 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #60A5FA 0%, #60A5FA ${fundamentals}%, rgba(255,255,255,0.1) ${fundamentals}%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
              </div>
            </div>

            {/* Earnings Momentum */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-base font-jakarta font-bold text-[#1F2933]">Earnings Momentum</div>
                  <div className="text-xs font-jakarta text-[#6B7280]">EPS surprises + revenue growth trend</div>
                </div>
                <div className="text-2xl font-jakarta font-black text-green-400">{earningsMomentum}%</div>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={earningsMomentum}
                  onChange={(e) => {
                    setEarningsMomentum(Number(e.target.value))
                    setIsModified(true)
                  }}
                  className="w-full h-2 bg-[#F4F7F2] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-400 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(74,222,128,0.5)] [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-400 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #4ADE80 0%, #4ADE80 ${earningsMomentum}%, rgba(255,255,255,0.1) ${earningsMomentum}%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
              </div>
            </div>

            {/* Technical */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-base font-jakarta font-bold text-[#1F2933]">Technical</div>
                  <div className="text-xs font-jakarta text-[#6B7280]">RSI, MACD, MA crossovers, Bollinger Bands</div>
                </div>
                <div className="text-2xl font-jakarta font-black text-[#A7C4A0]">{technical}%</div>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={technical}
                  onChange={(e) => {
                    setTechnical(Number(e.target.value))
                    setIsModified(true)
                  }}
                  className="w-full h-2 bg-[#F4F7F2] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#A7C4A0] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(167,196,160,0.5)] [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#A7C4A0] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #A7C4A0 0%, #A7C4A0 ${technical}%, rgba(255,255,255,0.1) ${technical}%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
              </div>
            </div>

            {/* Sentiment */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-base font-jakarta font-bold text-[#1F2933]">Sentiment</div>
                  <div className="text-xs font-jakarta text-[#6B7280]">News sentiment + analyst upgrades/downgrades balance</div>
                </div>
                <div className="text-2xl font-jakarta font-black text-orange-400">{sentiment}%</div>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sentiment}
                  onChange={(e) => {
                    setSentiment(Number(e.target.value))
                    setIsModified(true)
                  }}
                  className="w-full h-2 bg-[#F4F7F2] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-400 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(251,146,60,0.5)] [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-400 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #FB923C 0%, #FB923C ${sentiment}%, rgba(255,255,255,0.1) ${sentiment}%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
              </div>
            </div>

            {/* Macro */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-base font-jakarta font-bold text-[#1F2933]">Macro</div>
                  <div className="text-xs font-jakarta text-[#6B7280]">GDP, inflation + macro regime + beta adjustment</div>
                </div>
                <div className="text-2xl font-jakarta font-black text-cyan-400">{macro}%</div>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={macro}
                  onChange={(e) => {
                    setMacro(Number(e.target.value))
                    setIsModified(true)
                  }}
                  className="w-full h-2 bg-[#F4F7F2] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(34,211,238,0.5)] [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-cyan-400 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #22D3EE 0%, #22D3EE ${macro}%, rgba(255,255,255,0.1) ${macro}%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
              </div>
            </div>

            {/* Geopolitical */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-base font-jakarta font-bold text-[#1F2933]">Geopolitical</div>
                  <div className="text-xs font-jakarta text-[#6B7280]">Election, country, and hidden-specific risk flags</div>
                </div>
                <div className="text-2xl font-jakarta font-black text-red-400">{geopolitical}%</div>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={geopolitical}
                  onChange={(e) => {
                    setGeopolitical(Number(e.target.value))
                    setIsModified(true)
                  }}
                  className="w-full h-2 bg-[#F4F7F2] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-400 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(248,113,113,0.5)] [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-red-400 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #F87171 0%, #F87171 ${geopolitical}%, rgba(255,255,255,0.1) ${geopolitical}%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Total Weight Display */}
          <div className="mt-6 p-4 bg-white border border-[#6A994E]/20 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-jakarta text-[#6B7280]">Raw total: {totalWeight}% → normalised to 100%</span>
              <div className="flex gap-2">
                {[
                  { color: 'bg-blue-400', value: fundamentals },
                  { color: 'bg-green-400', value: earningsMomentum },
                  { color: 'bg-[#A7C4A0]', value: technical },
                  { color: 'bg-orange-400', value: sentiment },
                  { color: 'bg-cyan-400', value: macro },
                  { color: 'bg-red-400', value: geopolitical },
                ].map((bar, idx) => (
                  <div key={idx} className={`w-2 ${bar.color} rounded-full`} style={{ height: `${bar.value / 2}px` }} />
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs font-jakarta text-[#6B7280] mt-4 flex items-start gap-2">
            <IconBulb className="w-4 h-4 text-[#6A994E] flex-shrink-0 mt-0.5" stroke={1.5} />
            <span>
              <strong>Tip:</strong> Run the Factor Weight Robustness test (below) to see which factors have the highest Information Coefficient (IC) vs actual returns in your stock universe. Let empirical data drive your weights.
            </span>
          </p>
        </div>

        {/* Market Selection and Analyze Button */}
        <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setSelectedMarket('global')
                  setSelectedBasket(null)
                }}
                className={`px-4 py-2 border rounded-lg text-sm font-jakarta font-bold transition-all flex items-center gap-2 ${
                  selectedMarket === 'global'
                    ? 'bg-[#A7C4A0]/20 border-[#6A994E]/50 text-[#1F2933]'
                    : 'bg-white border-[#6A994E]/20 text-[#6B7280] hover:border-[#6A994E]/30'
                }`}
              >
                <IconWorld className="w-4 h-4" stroke={1.5} />
                Global markets
              </button>
              <button 
                onClick={() => {
                  setSelectedMarket('india')
                  setSelectedBasket(null)
                }}
                className={`px-4 py-2 border rounded-lg text-sm font-jakarta font-bold transition-all ${
                  selectedMarket === 'india'
                    ? 'bg-[#A7C4A0]/20 border-[#6A994E]/50 text-[#1F2933]'
                    : 'bg-white border-[#6A994E]/20 text-[#6B7280] hover:border-[#6A994E]/30'
                }`}
              >
                🇮🇳 India NSE
              </button>
            </div>
          </div>

          {/* Stock Tickers */}
          <div className="flex flex-wrap gap-2 mb-6">
            {getCurrentTickers().map((ticker) => (
              <div key={ticker} className="px-4 py-2 bg-[#F4F7F2]/40 border border-[#6A994E]/20 rounded-lg">
                <span className="text-sm font-jakarta font-semibold text-[#1F2933]">{ticker}</span>
              </div>
            ))}
          </div>

          {/* Basket Categories */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {selectedMarket === 'global'
              ? Object.keys(globalBaskets).map((category) => (
                  <button 
                    key={category} 
                    onClick={() => setSelectedBasket(category)}
                    className={`px-4 py-2 border rounded-lg text-sm font-jakarta transition-all ${
                      selectedBasket === category
                        ? 'bg-[#A7C4A0]/20 border-[#6A994E]/50 text-[#1F2933] font-bold'
                        : 'bg-white border-[#6A994E]/20 text-[#6B7280] hover:border-[#6A994E]/30 hover:bg-[#F4F7F2] hover:text-[#1F2933]'
                    }`}
                  >
                    {category}
                  </button>
                ))
              : Object.keys(indiaBaskets).map((category) => (
                  <button 
                    key={category} 
                    onClick={() => setSelectedBasket(category)}
                    className={`px-4 py-2 border rounded-lg text-sm font-jakarta transition-all ${
                      selectedBasket === category
                        ? 'bg-[#A7C4A0]/20 border-[#6A994E]/50 text-[#1F2933] font-bold'
                        : 'bg-white border-[#6A994E]/20 text-[#6B7280] hover:border-[#6A994E]/30 hover:bg-[#F4F7F2] hover:text-[#1F2933]'
                    }`}
                  >
                    {category}
                  </button>
                ))
            }
          </div>

          {/* Checkboxes and Analyze Button */}
          <div className="flex items-center justify-between">
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-[#6A994E]/30 bg-white checked:bg-[#A7C4A0]" />
                <span className="text-sm font-jakarta text-[#1F2933]">Monte Carlo simulation</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-[#6A994E]/30 bg-white checked:bg-[#A7C4A0]" />
                <span className="text-sm font-jakarta text-[#1F2933]">AI narrative</span>
              </label>
            </div>
            <button 
              onClick={handleAnalyzePortfolio}
              className="px-8 py-3 bg-[#A7C4A0] hover:bg-[#A7C4A0]/90 rounded-xl text-base font-jakarta font-bold text-black transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]"
            >
              Analyze portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Floating Command Center Button */}
      <button
        onClick={() => setIsCommandCenterOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-50"
      >
        <svg className="w-8 h-8 text-[#1F2933]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </button>

      {/* Intelligence Gathering Progress Modal */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="relative w-full max-w-2xl bg-white border border-[#6A994E]/20 rounded-2xl shadow-xl overflow-hidden p-8">
            
            {/* Header */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-jakarta font-black text-[#1F2933] mb-2">INTELLIGENCE GATHERING IN PROGRESS</h2>
              <p className="text-sm font-jakarta text-[#6B7280]">Analyzing your portfolio with multi-layer intelligence</p>
            </div>

            {/* Progress Steps */}
            <div className="space-y-3 mb-8">
              {analysisSteps.map((step, index) => {
                const isCompleted = index < currentStep
                const isCurrent = index === currentStep
                const isPending = index > currentStep
                
                return (
                  <div key={index} className="flex items-center gap-4">
                    {/* Status Indicator */}
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      isCompleted ? 'bg-[#6A994E]' : 
                      isCurrent ? 'bg-[#6A994E] animate-pulse' : 
                      'bg-[#E5E7EB]'
                    }`} />
                    
                    {/* Step Name */}
                    <div className="flex-1">
                      <p className={`text-sm font-jakarta ${
                        isCompleted ? 'text-[#6B7280] line-through' : 
                        isCurrent ? 'text-[#1F2933] font-semibold' : 
                        'text-[#9CA3AF]'
                      }`}>
                        {step.name}
                      </p>
                    </div>
                    
                    {/* Done Badge */}
                    {isCompleted && (
                      <span className="text-xs font-jakarta text-[#6A994E] font-semibold">done</span>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#6A994E] transition-all duration-300 ease-out"
                  style={{ width: `${analysisProgress}%` }}
                />
              </div>
              <div className="flex justify-end">
                <span className="text-xs font-jakarta text-[#6B7280] font-medium">{Math.round(analysisProgress)}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Command Center Modal */}
      {isCommandCenterOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="relative w-full max-w-3xl h-[600px] bg-white border-2 border-[#6A994E]/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            
            {/* Close button */}
            <button
              onClick={() => setIsCommandCenterOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 bg-[#F4F7F2] hover:bg-[#A7C4A0] rounded-full flex items-center justify-center transition-all z-10"
            >
              <svg className="w-5 h-5 text-[#1F2933]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="p-6 border-b border-[#6A994E]/20 bg-[#F4F7F2]">
              <h2 className="text-2xl font-jakarta font-black text-[#1F2933] mb-1">Command Center</h2>
              <p className="text-sm font-jakarta text-[#6B7280]">Portfolio: AAPL, NVDA, MSFT, TSLA · Focus: AAPL</p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
              {chatMessages.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-base font-jakarta text-[#6B7280] mb-8">
                    Ask anything about your portfolio — signals, risks, individual stocks, or macro context.
                  </p>
                  
                  {/* Suggested Questions */}
                  <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
                    <button 
                      onClick={() => setCommandInput('What is the analysis for AAPL?')}
                      className="p-3 bg-white hover:bg-[#F4F7F2] border border-[#6A994E]/20 hover:border-[#6A994E]/30 rounded-xl text-left text-sm font-jakarta text-[#1F2933] transition-all"
                    >
                      What is the analysis for AAPL?
                    </button>
                    <button 
                      onClick={() => setCommandInput('Which stocks near Fibonacci support?')}
                      className="p-3 bg-white hover:bg-[#F4F7F2] border border-[#6A994E]/20 hover:border-[#6A994E]/30 rounded-xl text-left text-sm font-jakarta text-[#1F2933] transition-all"
                    >
                      Which stocks near Fibonacci support?
                    </button>
                    <button 
                      onClick={() => setCommandInput('What is the portfolio-wide VaR?')}
                      className="p-3 bg-white hover:bg-[#F4F7F2] border border-[#6A994E]/20 hover:border-[#6A994E]/30 rounded-xl text-left text-sm font-jakarta text-[#1F2933] transition-all"
                    >
                      What is the portfolio-wide VaR?
                    </button>
                    <button 
                      onClick={() => setCommandInput('Review geopolitical exposure')}
                      className="p-3 bg-white hover:bg-[#F4F7F2] border border-[#6A994E]/20 hover:border-[#6A994E]/30 rounded-xl text-left text-sm font-jakarta text-[#1F2933] transition-all"
                    >
                      Review geopolitical exposure
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-4 rounded-2xl ${
                        message.role === 'user' 
                          ? 'bg-[#A7C4A0] text-[#1F2933] border-2 border-[#6A994E]/30' 
                          : 'bg-[#F4F7F2] text-[#1F2933] border border-[#6A994E]/20'
                      }`}>
                        <p className="text-sm font-jakarta leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-[#6A994E]/20 bg-[#F4F7F2]">
              <div className="relative">
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about your portfolio..."
                  className="w-full px-6 py-4 bg-white border border-[#6A994E]/20 focus:border-[#6A994E]/40 rounded-2xl text-[#1F2933] placeholder-[#6B7280] font-jakarta text-base outline-none transition-all pr-14"
                />
                <button 
                  onClick={handleSendMessage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#6A994E] hover:bg-[#A7C4A0] rounded-xl flex items-center justify-center transition-all"
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Ticker Detail Modal */}
      {selectedTicker && (
        <div className="fixed inset-0 bg-[#F4F7F2]/90 backdrop-blur-sm z-50 flex items-center justify-center p-6 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-gradient-to-br from-black/95 to-black/90 border border-[#6A994E]/30 rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="p-6 border-b border-[#6A994E]/20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-jakarta font-black text-[#1F2933]">{selectedTicker}</h2>
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs font-jakarta font-bold text-[#1F2933] transition-all">
                      Buy
                    </button>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs font-jakarta font-bold">
                      High Confidence
                    </span>
                  </div>
                  <p className="text-sm font-jakarta text-[#6B7280]">
                    {selectedTicker === 'AAPL' && 'Apple Inc. · Technology'}
                    {selectedTicker === 'NVDA' && 'NVIDIA Corporation · Technology'}
                    {selectedTicker === 'MSFT' && 'Microsoft Corporation · Technology'}
                    {selectedTicker === 'TSLA' && 'Tesla, Inc. · Consumer Cyclical'}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedTicker(null)}
                  className="p-2 hover:bg-[#F4F7F2] rounded-lg transition-all"
                >
                  <IconX className="w-6 h-6 text-[#1F2933]" stroke={1.5} />
                </button>
              </div>

              {/* Price Info */}
              <div className="flex items-end gap-4">
                <div className="text-4xl font-jakarta font-black text-[#1F2933]">$248.80</div>
                <div className="text-lg font-jakarta text-red-400 mb-1">-1.6% today</div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mt-6">
                {['overview', 'mindmap', 'research', 'financials'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setDetailTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-jakarta font-bold transition-all ${
                      detailTab === tab
                        ? 'bg-blue-600 text-[#1F2933]'
                        : 'bg-white text-[#6B7280] hover:bg-[#F4F7F2] hover:text-[#1F2933]'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[600px] overflow-y-auto">
              {detailTab === 'overview' && (
                <div className="space-y-6">
                  {/* AI Analysis */}
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="text-sm font-jakarta font-bold text-blue-400">AI ANALYSIS — GROUNDED</div>
                    </div>
                    <p className="text-sm font-jakarta text-white/80 leading-relaxed">
                      API connection issue: Connection error...
                    </p>
                  </div>

                  {/* Key Catalyst */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                      <div className="text-xs font-jakarta text-[#6B7280] mb-1">KEY CATALYST</div>
                      <div className="text-base font-jakarta font-bold text-[#1F2933] mb-1">Fundamental</div>
                      <p className="text-xs font-jakarta text-[#6B7280]">
                        Fundamental analysis active (see scores)
                      </p>
                    </div>
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                      <div className="text-xs font-jakarta text-[#6B7280] mb-1">KEY RISK</div>
                      <div className="text-base font-jakarta font-bold text-[#1F2933] mb-1">Check risk metrics</div>
                      <p className="text-xs font-jakarta text-[#6B7280]">tab</p>
                    </div>
                  </div>

                  {/* Interactive Chart */}
                  <div className="p-4 bg-white border border-[#6A994E]/20 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs font-jakarta text-[#6B7280]">
                        Zoom • Drag to pan • Hover for price
                      </div>
                      <div className="text-xs font-jakarta text-[#6B7280]">
                        GBM • Momentum Bias • Blended Vol % • Drift 21.2%/yr
                      </div>
                    </div>

                    {/* Time Period Buttons */}
                    <div className="flex gap-2 mb-3">
                      {['1M', '3M', '6M', '1Y', '2Y'].map((period) => (
                        <button 
                          key={period} 
                          className={`px-3 py-1.5 rounded text-xs font-jakarta font-bold transition-all ${
                            period === '6M' 
                              ? 'bg-white/20 text-[#1F2933]' 
                              : 'bg-white text-[#6B7280] hover:bg-[#F4F7F2] hover:text-[#1F2933]'
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>

                    {/* Indicator Toggles */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <button className="px-3 py-1.5 bg-white/20 border border-white/30 rounded text-xs font-jakarta font-bold text-[#1F2933]">
                        EMA 20/50
                      </button>
                      <button className="px-3 py-1.5 bg-white border border-[#6A994E]/20 rounded text-xs font-jakarta text-[#6B7280] hover:bg-[#F4F7F2]">
                        Bollinger
                      </button>
                      <button className="px-3 py-1.5 bg-white border border-[#6A994E]/20 rounded text-xs font-jakarta text-[#6B7280] hover:bg-[#F4F7F2]">
                        Volume
                      </button>
                      <button className="px-3 py-1.5 bg-white border border-[#6A994E]/20 rounded text-xs font-jakarta text-[#6B7280] hover:bg-[#F4F7F2]">
                        RSI pane
                      </button>
                      <button className="px-3 py-1.5 bg-white border border-[#6A994E]/20 rounded text-xs font-jakarta text-[#6B7280] hover:bg-[#F4F7F2]">
                        30d predict
                      </button>
                      <button className="px-3 py-1.5 bg-white border border-[#6A994E]/20 rounded text-xs font-jakarta text-[#6B7280] hover:bg-[#F4F7F2]">
                        60d predict
                      </button>
                      <button className="px-3 py-1.5 bg-white border border-[#6A994E]/20 rounded text-xs font-jakarta text-[#6B7280] hover:bg-[#F4F7F2]">
                        90d predict
                      </button>
                    </div>

                    {/* Chart placeholder - will be replaced with actual chart */}
                    <div className="h-64 bg-[#F4F7F2]/40 rounded-lg flex items-center justify-center">
                      <span className="text-[#6B7280] font-jakarta">Chart visualization</span>
                    </div>
                  </div>

                  {/* Outlook Cards - Professional Format */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* 30-Day Outlook */}
                    <div className="p-4 bg-[#F4F7F2]/40 border border-[#6A994E]/20 rounded-xl">
                      <div className="text-xs font-jakarta text-[#6B7280] mb-3 uppercase tracking-wider">30-DAY OUTLOOK</div>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-jakarta text-red-400">Bear</span>
                          <span className="text-xs font-jakarta text-red-400">$238</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-jakarta text-blue-400">Base</span>
                          <span className="text-xs font-jakarta text-blue-400">$254</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-jakarta text-green-400">Bull</span>
                          <span className="text-xs font-jakarta text-green-400">$271</span>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-[#6A994E]/20">
                        <div className="text-xs font-jakarta text-[#6B7280]">-4.4%/2.1%/+9.0%</div>
                        <div className="text-sm font-jakarta font-bold text-green-400 mt-1">P(gain): 60.3%</div>
                      </div>
                    </div>

                    {/* 60-Day Outlook */}
                    <div className="p-4 bg-[#F4F7F2]/40 border border-[#6A994E]/20 rounded-xl">
                      <div className="text-xs font-jakarta text-[#6B7280] mb-3 uppercase tracking-wider">60-DAY OUTLOOK</div>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-jakarta text-red-400">Bear</span>
                          <span className="text-xs font-jakarta text-red-400">$236</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-jakarta text-blue-400">Base</span>
                          <span className="text-xs font-jakarta text-blue-400">$259</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-jakarta text-green-400">Bull</span>
                          <span className="text-xs font-jakarta text-green-400">$284</span>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-[#6A994E]/20">
                        <div className="text-xs font-jakarta text-[#6B7280]">-5.0%/4.2%/+14.3%</div>
                        <div className="text-sm font-jakarta font-bold text-green-400 mt-1">P(gain): 64.4%</div>
                      </div>
                    </div>

                    {/* 90-Day Outlook */}
                    <div className="p-4 bg-[#F4F7F2]/40 border border-[#6A994E]/20 rounded-xl">
                      <div className="text-xs font-jakarta text-[#6B7280] mb-3 uppercase tracking-wider">90-DAY OUTLOOK</div>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-jakarta text-red-400">Bear</span>
                          <span className="text-xs font-jakarta text-red-400">$236</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-jakarta text-blue-400">Base</span>
                          <span className="text-xs font-jakarta text-blue-400">$265</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-jakarta text-green-400">Bull</span>
                          <span className="text-xs font-jakarta text-green-400">$294</span>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-[#6A994E]/20">
                        <div className="text-xs font-jakarta text-[#6B7280]">-5.1%/6.4%/+18.1%</div>
                        <div className="text-sm font-jakarta font-bold text-green-400 mt-1">P(gain): 67.4%</div>
                      </div>
                    </div>
                  </div>

                  {/* Powered by TradingView Note */}
                  <div className="text-xs font-jakarta text-[#6B7280] text-center">
                    Powered by TradingView Lightweight Charts · Prediction = probability distribution, not a price target
                  </div>

                  {/* Factor Breakdown */}
                  <div className="p-4 bg-white border border-[#6A994E]/20 rounded-xl">
                    <h3 className="text-lg font-jakarta font-bold text-[#1F2933] mb-4">Factor Breakdown</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'Fundamentals', score: 83, color: 'bg-blue-500' },
                        { name: 'Earnings Mom.', score: 72, color: 'bg-green-500' },
                        { name: 'Technical', score: 69, color: 'bg-[#A7C4A0]' },
                        { name: 'Sentiment', score: 65, color: 'bg-orange-500' },
                        { name: 'Macro Sens.', score: 89, color: 'bg-cyan-500' },
                        { name: 'Geopolitical', score: 68, color: 'bg-red-500' },
                      ].map((factor) => (
                        <div key={factor.name} className="flex items-center gap-4">
                          <div className="w-32 text-sm font-jakarta text-[#1F2933]">{factor.name}</div>
                          <div className="flex-1 h-2 bg-[#F4F7F2] rounded-full overflow-hidden">
                            <div className={`h-full ${factor.color} rounded-full`} style={{ width: `${factor.score}%` }} />
                          </div>
                          <div className="w-12 text-right text-sm font-jakarta font-bold text-[#1F2933]">{factor.score}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Multi-Factor Radar */}
                  <div className="p-4 bg-white border border-[#6A994E]/20 rounded-xl">
                    <h3 className="text-lg font-jakarta font-bold text-[#1F2933] mb-4">Multi-Factor Radar</h3>
                    <div className="h-64 bg-[#F4F7F2]/40 rounded-lg flex items-center justify-center">
                      <span className="text-[#6B7280] font-jakarta">Radar chart visualization</span>
                    </div>
                  </div>

                  {/* Piotroski & Altman Scores */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white border border-[#6A994E]/20 rounded-xl">
                      <div className="text-xs font-jakarta text-[#6B7280] mb-2">PIOTROSKI SCORE</div>
                      <div className="text-4xl font-jakarta font-black text-green-400 mb-1">7<span className="text-xl text-[#6B7280]">/9</span></div>
                      <p className="text-xs font-jakarta text-[#6B7280]">
                        A 0-9 score measuring financial strength based on profitability, leverage, and efficiency
                      </p>
                    </div>
                    <div className="p-4 bg-white border border-[#6A994E]/20 rounded-xl">
                      <div className="text-xs font-jakarta text-[#6B7280] mb-2">ALTMAN Z-SCORE</div>
                      <div className="text-4xl font-jakarta font-black text-green-400 mb-1">10.01</div>
                      <div className="text-xs font-jakarta text-green-400 mb-2">SAFE</div>
                      <p className="text-xs font-jakarta text-[#6B7280]">
                        A formula predicting bankruptcy risk: {'>'}2.99 = safe
                      </p>
                    </div>
                  </div>

                  {/* Monte Carlo Simulation */}
                  <div className="p-4 bg-white border border-[#6A994E]/20 rounded-xl">
                    <h3 className="text-lg font-jakarta font-bold text-[#1F2933] mb-2">Monte Carlo Simulation · 5,000 Paths</h3>
                    <p className="text-sm font-jakarta text-[#6B7280] mb-4">VaR (95%)</p>
                    <p className="text-sm font-jakarta text-green-400 mb-4">Probability of positive return: 65.0% · Annual vol. 28.3%</p>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-xs font-jakarta text-[#6B7280]">Bear (P10)</div>
                        <div className="text-2xl font-jakarta font-bold text-red-400">$211.00</div>
                        <div className="text-xs font-jakarta text-red-400">-15.2%</div>
                      </div>
                      <div>
                        <div className="text-xs font-jakarta text-[#6B7280]">Base (P50)</div>
                        <div className="text-2xl font-jakarta font-bold text-[#1F2933]">$262.38</div>
                        <div className="text-xs font-jakarta text-green-400">+5.4%</div>
                      </div>
                      <div>
                        <div className="text-xs font-jakarta text-[#6B7280]">Bull (P90)</div>
                        <div className="text-2xl font-jakarta font-bold text-green-400">$324.84</div>
                        <div className="text-xs font-jakarta text-green-400">+30.6%</div>
                      </div>
                    </div>
                    <div className="h-48 bg-[#F4F7F2]/40 rounded-lg flex items-center justify-center">
                      <span className="text-[#6B7280] font-jakarta">Monte Carlo paths visualization</span>
                    </div>
                  </div>
                </div>
              )}

              {detailTab === 'mindmap' && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <p className="text-[#6B7280] font-jakarta">Mindmap visualization coming soon</p>
                  </div>
                </div>
              )}

              {detailTab === 'research' && (
                <div className="space-y-6">
                  {/* Factor Breakdown */}
                  <div className="p-4 bg-white border border-[#6A994E]/20 rounded-xl">
                    <h3 className="text-lg font-jakarta font-bold text-[#1F2933] mb-4">Factor Breakdown</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'Fundamentals', score: 83, color: 'bg-blue-500' },
                        { name: 'Earnings Mom.', score: 72, color: 'bg-green-500' },
                        { name: 'Technical', score: 69, color: 'bg-[#A7C4A0]' },
                        { name: 'Sentiment', score: 65, color: 'bg-orange-500' },
                        { name: 'Macro Sens.', score: 89, color: 'bg-cyan-500' },
                        { name: 'Geopolitical', score: 68, color: 'bg-red-500' },
                      ].map((factor) => (
                        <div key={factor.name} className="flex items-center gap-4">
                          <div className="w-32 text-sm font-jakarta text-[#1F2933]">{factor.name}</div>
                          <div className="flex-1 h-2 bg-[#F4F7F2] rounded-full overflow-hidden">
                            <div className={`h-full ${factor.color} rounded-full`} style={{ width: `${factor.score}%` }} />
                          </div>
                          <div className="w-12 text-right text-sm font-jakarta font-bold text-[#1F2933]">{factor.score}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Multi-Factor Radar */}
                  <div className="p-4 bg-white border border-[#6A994E]/20 rounded-xl">
                    <h3 className="text-lg font-jakarta font-bold text-[#1F2933] mb-4">Multi-Factor Radar</h3>
                    <div className="h-64 bg-[#F4F7F2]/40 rounded-lg flex items-center justify-center">
                      <span className="text-[#6B7280] font-jakarta">Radar chart visualization</span>
                    </div>
                  </div>

                  {/* Piotroski Score */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white border border-[#6A994E]/20 rounded-xl">
                      <div className="text-xs font-jakarta text-[#6B7280] mb-2">PIOTROSKI SCORE</div>
                      <div className="text-4xl font-jakarta font-black text-green-400 mb-1">7<span className="text-xl text-[#6B7280]">/9</span></div>
                      <p className="text-xs font-jakarta text-[#6B7280]">
                        A 0-9 score measuring financial strength based on profitability, leverage, and efficiency
                      </p>
                    </div>
                    <div className="p-4 bg-white border border-[#6A994E]/20 rounded-xl">
                      <div className="text-xs font-jakarta text-[#6B7280] mb-2">ALTMAN Z-SCORE</div>
                      <div className="text-4xl font-jakarta font-black text-green-400 mb-1">10.01</div>
                      <div className="text-xs font-jakarta text-green-400 mb-2">SAFE</div>
                      <p className="text-xs font-jakarta text-[#6B7280]">
                        A formula predicting bankruptcy risk: {'>'}2.99 = safe
                      </p>
                    </div>
                  </div>

                  {/* Monte Carlo Simulation */}
                  <div className="p-4 bg-white border border-[#6A994E]/20 rounded-xl">
                    <h3 className="text-lg font-jakarta font-bold text-[#1F2933] mb-2">Monte Carlo Simulation · 5,000 Paths</h3>
                    <p className="text-sm font-jakarta text-[#6B7280] mb-4">VaR (95%)</p>
                    <p className="text-sm font-jakarta text-green-400 mb-4">Probability of positive return: 65.0% · Annual vol. 28.3%</p>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-xs font-jakarta text-[#6B7280]">Bear (P10)</div>
                        <div className="text-2xl font-jakarta font-bold text-red-400">$211.00</div>
                        <div className="text-xs font-jakarta text-red-400">-15.2%</div>
                      </div>
                      <div>
                        <div className="text-xs font-jakarta text-[#6B7280]">Base (P50)</div>
                        <div className="text-2xl font-jakarta font-bold text-[#1F2933]">$262.38</div>
                        <div className="text-xs font-jakarta text-green-400">+5.4%</div>
                      </div>
                      <div>
                        <div className="text-xs font-jakarta text-[#6B7280]">Bull (P90)</div>
                        <div className="text-2xl font-jakarta font-bold text-green-400">$324.84</div>
                        <div className="text-xs font-jakarta text-green-400">+30.6%</div>
                      </div>
                    </div>
                    <div className="h-48 bg-[#F4F7F2]/40 rounded-lg flex items-center justify-center">
                      <span className="text-[#6B7280] font-jakarta">Monte Carlo paths visualization</span>
                    </div>
                  </div>
                </div>
              )}

              {detailTab === 'financials' && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <p className="text-[#6B7280] font-jakarta">Financial data coming soon</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}




