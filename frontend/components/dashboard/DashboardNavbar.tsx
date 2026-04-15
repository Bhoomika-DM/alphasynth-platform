import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { IconSearch, IconLogout, IconUser, IconChevronDown } from '@tabler/icons-react'
import Logo from '@/components/Logo'
import NavigationHeader from '@/components/dashboard/NavigationHeader'
import { createClient } from '@/lib/supabase/client'

interface DashboardNavbarProps {
  user: any | null
}

interface SearchResult {
  symbol: string
  name: string
  type: 'equity' | 'derivative' | 'etf' | 'debt' | 'index'
  price?: string
  change?: string
}

export default function DashboardNavbar({ user }: DashboardNavbarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const supabase = createClient()

  const categories = ['All', 'Equity Stocks', 'Derivatives', 'ETFs', 'Debt/Others']

  // Mock data for search - In production, this would come from an API
  const allStocks: SearchResult[] = [
    { symbol: 'TCS', name: 'Tata Consultancy Services Limited', type: 'equity', price: '3,542.30', change: '+2.28%' },
    { symbol: 'RELIANCE', name: 'Reliance Industries Limited', type: 'equity', price: '2,876.50', change: '+1.60%' },
    { symbol: 'INFY', name: 'Infosys Limited', type: 'equity', price: '1,456.75', change: '+2.26%' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Limited', type: 'equity', price: '1,645.80', change: '+1.85%' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Limited', type: 'equity', price: '1,089.40', change: '+2.70%' },
    { symbol: 'SBIN', name: 'State Bank of India', type: 'equity', price: '623.85', change: '+2.59%' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel Limited', type: 'equity', price: '1,234.50', change: '+1.45%' },
    { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Limited', type: 'equity', price: '2,345.80', change: '+2.73%' },
    { symbol: 'ITC', name: 'ITC Limited', type: 'equity', price: '456.75', change: '+1.23%' },
    { symbol: 'LT', name: 'Larsen & Toubro Limited', type: 'equity', price: '3,456.90', change: '+2.15%' },
    { symbol: 'NIFTY 50', name: 'NIFTY 50 Index', type: 'index', price: '22,968.25', change: '+1.12%' },
    { symbol: 'BANKNIFTY', name: 'Bank NIFTY Index', type: 'index', price: '52,609.10', change: '+2.06%' },
    { symbol: 'NIFTY FUT', name: 'NIFTY APR FUT', type: 'derivative', price: '22,920.00', change: '-0.59%' },
    { symbol: 'NIFTYBEES', name: 'Nippon India ETF Nifty BeES', type: 'etf', price: '229.45', change: '+1.10%' },
    { symbol: 'GOLDBEES', name: 'Nippon India ETF Gold BeES', type: 'etf', price: '58.30', change: '+0.85%' },
  ]

  // Filter results based on search query and category
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    let filtered = allStocks.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(query) ||
        stock.name.toLowerCase().includes(query)
    )

    // Filter by category
    if (selectedCategory !== 'All') {
      const categoryMap: { [key: string]: string[] } = {
        'Equity Stocks': ['equity'],
        'Derivatives': ['derivative'],
        'ETFs': ['etf'],
        'Debt/Others': ['debt', 'index'],
      }
      const types = categoryMap[selectedCategory] || []
      filtered = filtered.filter((stock) => types.includes(stock.type))
    }

    setSearchResults(filtered.slice(0, 8)) // Limit to 8 results
  }, [searchQuery, selectedCategory])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      equity: 'Equity',
      derivative: 'Derivative',
      etf: 'ETF',
      debt: 'Debt',
      index: 'Index',
    }
    return labels[type] || type
  }

  const handleResultClick = (result: SearchResult) => {
    // Open NSE page for the selected symbol in a new tab
    window.open(`https://www.nseindia.com/get-quotes/equity?symbol=${result.symbol}`, '_blank')
    setSearchQuery('')
    setIsSearchFocused(false)
  }

  const handleSignOut = async () => {
    // Clear onboarding flags so modal shows again on next login
    localStorage.removeItem('hasCompletedOnboarding')
    localStorage.removeItem('showOnboarding')
    
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#2E4D8E]/10 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with Search Bar */}
          <div className="flex items-center gap-8">
            <Logo />
            
            {/* Search Bar with Categories Dropdown */}
            <div ref={searchContainerRef} className="relative">
              <div className="relative w-[500px]">
                <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718096]" stroke={1.5} />
                <input
                  type="text"
                  placeholder="Search by Company name, Index or Symbol"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-[#2E4D8E]/20 rounded-md text-[#2D3748] text-sm placeholder:text-[#718096] focus:outline-none focus:border-[#2E4D8E]/40 focus:ring-1 focus:ring-[#2E4D8E]/20 transition-all duration-200"
                />
              </div>
              
              {/* Dropdown - Show when focused */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#2E4D8E]/20 rounded-md shadow-lg z-50 max-h-[500px] overflow-hidden">
                  {/* Category Buttons */}
                  <div className="p-3 border-b border-[#E5E7EB]">
                    <div className="flex gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                            selectedCategory === category
                              ? 'bg-[#2E4D8E] text-white'
                              : 'bg-[#F8F9FB] text-[#718096] hover:bg-[#E5E7EB]'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Search Results */}
                  <div className="max-h-[400px] overflow-y-auto table-scroll">
                    {searchQuery.trim() === '' ? (
                      <div className="p-4 text-center text-sm text-[#718096]">
                        Start typing to search for stocks, indices, or symbols
                      </div>
                    ) : searchResults.length === 0 ? (
                      <div className="p-4 text-center text-sm text-[#718096]">
                        No results found for "{searchQuery}"
                      </div>
                    ) : (
                      <div>
                        {searchResults.map((result, index) => (
                          <button
                            key={index}
                            onClick={() => handleResultClick(result)}
                            className="w-full px-4 py-3 hover:bg-[#F8F9FB] transition-colors flex items-center justify-between border-b border-[#E5E7EB] last:border-0"
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-left">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-[#2D3748]">
                                    {result.symbol}
                                  </span>
                                  <span className="px-2 py-0.5 bg-[#F8F9FB] rounded text-xs font-semibold text-[#718096]">
                                    {getTypeLabel(result.type)}
                                  </span>
                                </div>
                                <div className="text-xs text-[#718096] mt-0.5">
                                  {result.name}
                                </div>
                              </div>
                            </div>
                            {result.price && (
                              <div className="text-right">
                                <div className="text-sm font-semibold text-[#2D3748]">
                                  {result.price}
                                </div>
                                <div className={`text-xs font-semibold ${
                                  result.change?.startsWith('+') ? 'text-[#0D7C8C]' : 'text-[#C85A54]'
                                }`}>
                                  {result.change}
                                </div>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Navigation Header */}
            <NavigationHeader />

            {/* Conditional: Show User Menu OR Sign In/Sign Up buttons */}
            {user ? (
              /* User Menu with Dropdown - Only show when logged in */
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3 px-4 py-2.5 bg-white border border-[#2E4D8E]/20 hover:border-[#2E4D8E]/30 rounded-md transition-all duration-200 hover:bg-[#F8F9FB]"
                >
                  <div className="w-2 h-2 bg-[#2E4D8E] rounded-full"></div>
                  <span className="text-sm font-medium text-[#2D3748]">
                    {user?.user_metadata?.first_name || user?.email?.split('@')[0]}
                  </span>
                  <IconChevronDown 
                    className={`w-4 h-4 text-[#718096] transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} 
                    stroke={2}
                  />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-[#2E4D8E]/20 rounded-lg shadow-lg overflow-hidden z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-[#E5E7EB] bg-[#F8F9FB]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#0D7C8C] rounded-full flex items-center justify-center">
                          <IconUser className="w-5 h-5 text-[#2D3748]" stroke={2} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#2D3748]">
                            {user?.user_metadata?.first_name && user?.user_metadata?.last_name
                              ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
                              : user?.email?.split('@')[0]}
                          </div>
                          <div className="text-xs text-[#718096]">
                            {user?.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href="/profile"
                        className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[#F8F9FB] transition-colors text-left"
                      >
                        <IconUser className="w-5 h-5 text-[#2E4D8E]" stroke={1.5} />
                        <span className="text-sm font-semibold text-[#2D3748]">
                          View Profile
                        </span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[#F8F9FB] transition-colors text-left"
                      >
                        <IconLogout className="w-5 h-5 text-[#C85A54]" stroke={1.5} />
                        <span className="text-sm font-semibold text-[#C85A54]">
                          Sign Out
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  )
}

