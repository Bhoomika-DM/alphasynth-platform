// Onboarding flow configuration - Premium trading platform style
import { 
  IconSearch, 
  IconTrendingUp, 
  IconBriefcase, 
  IconBrain,
  IconBolt,
  IconGitCompare,
  IconTarget,
  IconMicroscope,
  IconChartBar,
  IconBuilding,
  IconRocket,
  IconRadio,
  IconChartPie,
  IconCurrencyDollar,
  IconStack2,
  IconSettings,
  IconFlask,
  IconMoodSmile,
  IconDice5,
  IconSwords
} from '@tabler/icons-react'

export interface OnboardingOption {
  id: string
  icon: any
  title: string
  subtitle: string
  route?: string
  gradient: string
}

export const mainOptions: OnboardingOption[] = [
  {
    id: 'analysis',
    icon: IconSearch,
    title: 'Screen Stocks',
    subtitle: 'AI-powered stock discovery',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'market',
    icon: IconTrendingUp,
    title: 'Check Market Trends',
    subtitle: 'Real-time market insights',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'portfolio',
    icon: IconBriefcase,
    title: 'Review My Portfolio',
    subtitle: 'Track performance & returns',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'pro',
    icon: IconBrain,
    title: 'Advanced Research',
    subtitle: 'Deep analysis & backtesting',
    gradient: 'from-orange-500 to-red-500',
  },
]

export const subOptions: Record<string, OnboardingOption[]> = {
  analysis: [
    {
      id: 'quick',
      icon: IconBolt,
      title: 'Quick Picks',
      subtitle: 'Fast AI recommendations',
      route: '/stock-analysis?ticker=AAPL',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'compare',
      icon: IconGitCompare,
      title: 'Compare Stocks',
      subtitle: 'Side-by-side analysis',
      route: '/stock-analysis?ticker=AAPL',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      id: 'opportunities',
      icon: IconTarget,
      title: 'Best Opportunities',
      subtitle: 'Top-rated stocks today',
      route: '/stock-analysis?ticker=AAPL',
      gradient: 'from-green-500 to-teal-500',
    },
    {
      id: 'deep',
      icon: IconMicroscope,
      title: 'Deep Analysis',
      subtitle: 'Comprehensive research',
      route: '/backtest?mode=deep',
      gradient: 'from-purple-500 to-violet-500',
    },
  ],
  market: [
    {
      id: 'trend',
      icon: IconChartBar,
      title: 'Market Trend',
      subtitle: 'Overall market direction',
      route: '/trading?view=trend',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      id: 'sector',
      icon: IconBuilding,
      title: 'Sector Performance',
      subtitle: 'Industry breakdown',
      route: '/trading?view=sector',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'movers',
      icon: IconRocket,
      title: 'Top Movers',
      subtitle: 'Biggest gainers & losers',
      route: '/trading?view=movers',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      id: 'signals',
      icon: IconRadio,
      title: 'Advanced Signals',
      subtitle: 'Technical indicators',
      route: '/trading?view=signals',
      gradient: 'from-purple-500 to-pink-500',
    },
  ],
  portfolio: [
    {
      id: 'performance',
      icon: IconChartPie,
      title: 'Performance',
      subtitle: 'Overall returns & metrics',
      route: '/portfolio-results?view=performance',
      gradient: 'from-green-500 to-teal-500',
    },
    {
      id: 'returns',
      icon: IconCurrencyDollar,
      title: 'Gains/Loss',
      subtitle: 'Profit & loss breakdown',
      route: '/portfolio-results?view=returns',
      gradient: 'from-emerald-500 to-green-500',
    },
    {
      id: 'allocation',
      icon: IconStack2,
      title: 'Allocation',
      subtitle: 'Asset distribution',
      route: '/portfolio-results?view=allocation',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      id: 'optimize',
      icon: IconSettings,
      title: 'Optimization',
      subtitle: 'Improve your portfolio',
      route: '/portfolio-results?view=optimize',
      gradient: 'from-purple-500 to-violet-500',
    },
  ],
  pro: [
    {
      id: 'deep',
      icon: IconFlask,
      title: 'Deep Dive',
      subtitle: 'Comprehensive analysis',
      route: '/stock-analysis?ticker=TCS&act=pillars',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      id: 'scenario',
      icon: IconMoodSmile,
      title: 'Scenario Analysis',
      subtitle: 'What-if modeling',
      route: '/stock-analysis?ticker=TCS&act=synthesis',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 'simulation',
      icon: IconDice5,
      title: 'Monte Carlo',
      subtitle: 'Probability simulation',
      route: '/stock-analysis?ticker=TCS&act=synthesis',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      id: 'strategy',
      icon: IconSwords,
      title: 'Strategy Testing',
      subtitle: 'Backtest your ideas',
      route: '/stock-analysis?ticker=TCS&act=risk',
      gradient: 'from-green-500 to-emerald-500',
    },
  ],
}

export const getSubOptions = (mainId: string): OnboardingOption[] => {
  return subOptions[mainId] || []
}
