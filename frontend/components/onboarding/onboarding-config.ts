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
  IconSwords,
  IconFilter,
  IconChartLine,
  IconFileAnalytics,
  IconChartCandle,
  IconShieldCheck,
  IconChartDots,
  IconZoomScan,
  IconReportAnalytics,
  IconBuildingBank,
  IconNews,
  IconMoodDollar,
  IconCalculator,
  IconPercentage,
  IconTrendingUp2,
  IconChartArcs,
  IconAlertTriangle,
  IconBulb,
  IconShield,
  IconAdjustments,
  IconScale
} from '@tabler/icons-react'

export interface OnboardingOption {
  id: string
  icon: any
  title: string
  subtitle: string
  route?: string
  gradient: string
  isPro?: boolean
}

export const mainOptions: OnboardingOption[] = [
  {
    id: 'discover',
    icon: IconFilter,
    title: 'Discover & Screen',
    subtitle: 'Precision-built screeners cut through the noise to surface high-conviction stock ideas aligned to your strategy.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'market',
    icon: IconTrendingUp,
    title: 'Market Intelligence',
    subtitle: 'Real-time macro, sector, and sentiment insights tell you whether the market is working with you—or against you.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'fundamental',
    icon: IconFileAnalytics,
    title: 'Company & Fundamental Research',
    subtitle: 'End-to-end fundamental analysis with transparent assumptions, deep ratios, and institutional-grade valuation models.',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'technical',
    icon: IconChartCandle,
    title: 'Technical & Quantitative',
    subtitle: 'Strategy-driven technical analysis with proven signals, backtesting, and quant frameworks—not just charts.',
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    id: 'forensic',
    icon: IconMicroscope,
    title: 'Forensic & Advanced Analytics',
    subtitle: 'Advanced diagnostics and predictive models uncover risks, challenge biases, and surface hidden alpha.',
    gradient: 'from-red-500 to-pink-500',
  },
  {
    id: 'portfolio',
    icon: IconBriefcase,
    title: 'Portfolio Management & Risk Analytics',
    subtitle: 'Institutional-grade portfolio tools to measure performance, manage risk, and optimise capital allocation with precision.',
    gradient: 'from-teal-500 to-cyan-500',
  },
]


export const subOptions: Record<string, OnboardingOption[]> = {
  discover: [
    {
      id: 'screener',
      icon: IconFilter,
      title: 'Stock Screener',
      subtitle: 'Filter stocks by criteria',
      route: '/institutional-screener?tab=prebuilt',
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      id: 'automated-screener',
      icon: IconRocket,
      title: 'Automated Screener',
      subtitle: 'Pattern-based trade ideas across NIFTY-50 & Next-50',
      route: '/screener/automated',
      gradient: 'from-cyan-500 to-teal-500',
    },
    {
      id: 'manual-screener',
      icon: IconAdjustments,
      title: 'Manual Screener',
      subtitle: 'Build custom criteria and filter stocks',
      route: '/screener/manual',
      gradient: 'from-purple-500 to-indigo-500',
    },
    {
      id: 'compare',
      icon: IconGitCompare,
      title: 'Compare Stocks',
      subtitle: 'Side-by-side analysis',
      route: '/institutional-screener?tab=custom&action=compare',
      gradient: 'from-indigo-500 to-blue-500',
    },
  ],
  market: [
    {
      id: 'macro',
      icon: IconBuildingBank,
      title: 'Macro Overview',
      subtitle: 'Economic indicators & trends',
      route: '/trading?view=trend',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      id: 'sector',
      icon: IconBuilding,
      title: 'Sector Analysis',
      subtitle: 'Industry performance breakdown',
      route: '/trading?view=sector',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'sentiment',
      icon: IconMoodDollar,
      title: 'Market Sentiment',
      subtitle: 'Investor mood & positioning',
      route: '/trading?view=signals',
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      id: 'movers',
      icon: IconRocket,
      title: 'Top Movers',
      subtitle: 'Biggest gainers & losers',
      route: '/trading?view=movers',
      gradient: 'from-cyan-500 to-blue-500',
    },
  ],
  fundamental: [
    {
      id: 'financials',
      icon: IconCalculator,
      title: 'Financial Statements',
      subtitle: 'Income, balance sheet, cash flow',
      route: '/stock-analysis?ticker=TCS&act=pillars',
      gradient: 'from-purple-500 to-indigo-500',
    },
    {
      id: 'ratios',
      icon: IconPercentage,
      title: 'Key Ratios',
      subtitle: 'Profitability, liquidity, efficiency',
      route: '/stock-analysis?ticker=TCS&act=pillars',
      gradient: 'from-indigo-500 to-blue-500',
    },
    {
      id: 'valuation',
      icon: IconChartDots,
      title: 'Valuation Models',
      subtitle: 'DCF, multiples, fair value',
      route: '/stock-analysis?ticker=TCS&act=synthesis',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'earnings',
      icon: IconTrendingUp2,
      title: 'Earnings Analysis',
      subtitle: 'Growth trends & forecasts',
      route: '/stock-analysis?ticker=TCS&act=pillars',
      gradient: 'from-violet-500 to-purple-500',
    },
  ],
  technical: [
    {
      id: 'charts',
      icon: IconChartCandle,
      title: 'Technical Charts',
      subtitle: 'Price action & patterns',
      route: '/trading?view=signals',
      gradient: 'from-orange-500 to-amber-500',
    },
    {
      id: 'signals',
      icon: IconRadio,
      title: 'Trading Signals',
      subtitle: 'Buy/sell indicators',
      route: '/trading?view=signals',
      gradient: 'from-amber-500 to-yellow-500',
    },
    {
      id: 'backtest',
      icon: IconChartArcs,
      title: 'Strategy Backtesting',
      subtitle: 'Test your trading ideas',
      route: '/backtest?mode=deep',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'quant',
      icon: IconChartLine,
      title: 'Quant Models',
      subtitle: 'Statistical frameworks',
      route: '/backtest?mode=deep',
      gradient: 'from-red-500 to-orange-500',
    },
  ],
  forensic: [
    {
      id: 'golden-cross',
      icon: IconChartLine,
      title: 'Golden Cross Detection',
      subtitle: 'Technical momentum signals',
      route: '/golden-cross',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'risk',
      icon: IconAlertTriangle,
      title: 'Risk Assessment',
      subtitle: 'Identify hidden dangers',
      route: '/stock-analysis?ticker=TCS&act=risk',
      gradient: 'from-red-500 to-pink-500',
    },
    {
      id: 'quality',
      icon: IconShieldCheck,
      title: 'Quality Checks',
      subtitle: 'Earnings quality & red flags',
      route: '/stock-analysis?ticker=TCS&act=risk',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      id: 'predictive',
      icon: IconZoomScan,
      title: 'Predictive Models',
      subtitle: 'AI-powered forecasting',
      route: '/stock-analysis?ticker=TCS&act=synthesis',
      gradient: 'from-rose-500 to-red-500',
    },
  ],
  portfolio: [
    {
      id: 'performance',
      icon: IconChartPie,
      title: 'Performance Tracking',
      subtitle: 'Returns & attribution analysis',
      route: '/portfolio/performance',
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      id: 'risk',
      icon: IconShield,
      title: 'Risk Management',
      subtitle: 'VaR, drawdowns, volatility',
      route: '/portfolio/risk',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      id: 'allocation',
      icon: IconStack2,
      title: 'Asset Allocation',
      subtitle: 'Optimize your portfolio mix',
      route: '/portfolio/allocation',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      id: 'rebalance',
      icon: IconAdjustments,
      title: 'Rebalancing',
      subtitle: 'Maintain target weights',
      route: '/portfolio/rebalance',
      gradient: 'from-indigo-500 to-purple-500',
    },
  ],
}

export const getSubOptions = (mainId: string): OnboardingOption[] => {
  return subOptions[mainId] || []
}

