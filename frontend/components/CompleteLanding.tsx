'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import {
  IconNumbers,
  IconWorld,
  IconBuilding,
  IconScale,
  IconRobot,
  IconTarget,
  IconChartBar,
  IconTrendingUp,
  IconGlobe,
  IconMessage,
  IconBolt,
  IconShield,
  IconLock,
  IconCloud,
  IconBulb,
  IconBriefcase,
  IconMicroscope,
  IconEdit,
  IconTrophy,
  IconFlame,
  IconChartDots,
} from '@tabler/icons-react'

export default function CompleteLanding() {
  useEffect(() => {
    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))

    // Active nav highlighting
    const sections = document.querySelectorAll('section[id]')
    const handleScroll = () => {
      const y = window.scrollY + 100
      sections.forEach(s => {
        const top = (s as HTMLElement).offsetTop
        const bottom = top + (s as HTMLElement).offsetHeight
        if (y >= top && y < bottom) {
          document.querySelectorAll('.nav-links a').forEach(a => {
            const href = a.getAttribute('href')
            if (href === '#' + s.id) {
              (a as HTMLElement).style.color = '#1B2A4A'
              (a as HTMLElement).style.fontWeight = '700'
            } else {
              (a as HTMLElement).style.color = ''
              (a as HTMLElement).style.fontWeight = ''
            }
          })
        }
      })
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {/* Inline CSS for complete styling */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        :root {
          --navy: #1B2A4A;
          --teal: #0D7C8C;
          --teal-l: #E0F4F6;
          --gold: #B8860B;
          --gold-l: #FFF8E1;
          --green: #1A6B3A;
          --green-l: #E8F5E9;
          --red: #8C1A1A;
          --white: #FFFFFF;
          --off: #F8F9FB;
          --light: #EEF2F7;
          --border: #E2E8F0;
          --body: #2D3748;
          --muted: #718096;
        }
        
        html { scroll-behavior: smooth; }
        
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: var(--body);
          background: var(--white);
          -webkit-font-smoothing: antialiased;
        }
        
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        .fade-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
        .delay-4 { transition-delay: 0.4s; }
        .delay-5 { transition-delay: 0.5s; }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/96 backdrop-blur-xl border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between px-[60px] h-[68px]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#1B2A4A] rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 15L8 9L11 12L16 5" stroke="#0D7C8C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="16" cy="5" r="2" fill="#C9A84C"/>
              </svg>
            </div>
            <span className="text-[18px] font-extrabold text-[#1B2A4A] tracking-tight">
              Alpha<span className="text-[#0D7C8C]">Synth</span>
            </span>
          </Link>

          <div className="nav-links flex gap-9">
            <a href="#platform" className="text-[14px] font-medium text-[#718096] hover:text-[#1B2A4A] transition-colors">Platform</a>
            <a href="#pillars" className="text-[14px] font-medium text-[#718096] hover:text-[#1B2A4A] transition-colors">Six Pillars</a>
            <a href="#deployment" className="text-[14px] font-medium text-[#718096] hover:text-[#1B2A4A] transition-colors">Deployment</a>
            <a href="#roles" className="text-[14px] font-medium text-[#718096] hover:text-[#1B2A4A] transition-colors">For Your Team</a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/signin" className="text-[14px] font-medium text-[#1B2A4A] px-4 py-2 rounded-md hover:bg-[#EEF2F7] transition-colors">
              Sign in
            </Link>
            <Link href="#cta" className="text-[14px] font-semibold text-white bg-[#1B2A4A] px-[22px] py-2.5 rounded-lg hover:bg-[#243756] transition-all shadow-[0_2px_8px_rgba(27,42,74,0.2)]">
              Request Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-[160px] pb-[100px] bg-gradient-to-br from-[#F8F9FB] via-[#EEF2F7] to-[#F0F7F8] relative overflow-hidden">
        <div className="absolute top-[-200px] right-[-200px] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(13,124,140,0.06)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="grid grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[rgba(13,124,140,0.08)] border border-[rgba(13,124,140,0.2)] text-[#0D7C8C] text-[12px] font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wide">
                <span className="animate-pulse">●</span>
                NSE Certified · India-First Platform
              </div>
              
              <h1 className="text-[52px] font-extrabold text-[#1B2A4A] leading-[1.1] tracking-tight mb-6">
                Research that <em className="not-italic text-[#0D7C8C]">thinks</em><br/>
                as rigorously<br/>
                as you do.
              </h1>
              
              <p className="text-[18px] text-[#718096] leading-relaxed mb-10 max-w-[480px]">
                AlphaSynth is the investment intelligence platform built for India's equity professionals — where every number is calculated, never guessed, and every insight is earned through evidence.
              </p>
              
              <div className="flex gap-4 mb-14">
                <Link href="#cta" className="text-[15px] font-bold text-white bg-[#1B2A4A] px-7 py-3.5 rounded-lg hover:bg-[#243756] transition-all shadow-[0_4px_20px_rgba(27,42,74,0.25)] hover:translate-y-[-2px]">
                  Request a Demo
                </Link>
                <Link href="#platform" className="text-[15px] font-semibold text-[#1B2A4A] border-[1.5px] border-[#E2E8F0] px-7 py-3.5 rounded-lg hover:border-[#1B2A4A] hover:bg-[#EEF2F7] transition-all">
                  Explore the Platform
                </Link>
              </div>
              
              <div className="flex gap-10">
                <div>
                  <div className="text-[28px] font-extrabold text-[#1B2A4A] tracking-tight">6</div>
                  <div className="text-[12px] text-[#718096]">Analytical Pillars</div>
                </div>
                <div>
                  <div className="text-[28px] font-extrabold text-[#1B2A4A] tracking-tight">200+</div>
                  <div className="text-[12px] text-[#718096]">Calculations, All Deterministic</div>
                </div>
                <div>
                  <div className="text-[28px] font-extrabold text-[#1B2A4A] tracking-tight">0</div>
                  <div className="text-[12px] text-[#718096]">Hallucinated Numbers</div>
                </div>
              </div>
            </div>
            
            {/* Dashboard Preview */}
            <div className="bg-white rounded-2xl shadow-[0_24px_80px_rgba(27,42,74,0.12)] border border-[#E2E8F0] overflow-hidden">
              <div className="bg-[#1B2A4A] px-5 py-3.5 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                <span className="text-[12px] text-white/50 ml-2 font-mono">AlphaSynth · Quality Compounders</span>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-[32px_1fr_80px_60px_60px_70px] gap-3 text-[11px] font-semibold text-[#718096] uppercase tracking-wide pb-1.5 border-b border-[#E2E8F0]">
                  <span>#</span><span>Stock</span><span>AS Score</span><span>P/E</span><span>ROE</span><span>Signal</span>
                </div>
                {[
                  { rank: 1, name: 'ASIAN PAINTS', sector: 'Consumer Goods', score: 88, pe: '53.2', roe: '27.4%', signal: 'BUY', signalColor: '#DCFCE7' },
                  { rank: 2, name: 'HDFC BANK', sector: 'Banking', score: 82, pe: '19.1', roe: '17.8%', signal: 'BUY', signalColor: '#DCFCE7' },
                  { rank: 3, name: 'PIDILITE IND', sector: 'Chemicals', score: 76, pe: '72.4', roe: '23.1%', signal: 'HOLD', signalColor: '#FEF9C3' },
                  { rank: 4, name: 'TITAN COMPANY', sector: 'Consumer Goods', score: 71, pe: '87.3', roe: '22.5%', signal: 'HOLD', signalColor: '#FEF9C3' }
                ].map((stock) => (
                  <div key={stock.rank} className="grid grid-cols-[32px_1fr_80px_60px_60px_70px] gap-3 items-center py-2.5 border-b border-[#E2E8F0] last:border-0 text-[13px]">
                    <span className="text-[12px] font-semibold text-[#718096] text-center">{stock.rank}</span>
                    <div>
                      <div className="text-[13px] font-bold text-[#1B2A4A]">{stock.name}</div>
                      <div className="text-[11px] text-[#718096]">{stock.sector}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-[#EEF2F7] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#0D7C8C] to-[#0A9CAF] rounded-full" style={{ width: `${stock.score}%` }} />
                      </div>
                      <span className="text-[12px] font-bold text-[#0D7C8C] w-6">{stock.score}</span>
                    </div>
                    <span className="text-[12px] font-medium">{stock.pe}</span>
                    <span className="text-[12px] font-medium text-[#1A6B3A]">{stock.roe}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded" style={{ background: stock.signalColor, color: stock.signal === 'BUY' ? '#15803D' : '#854D0E' }}>{stock.signal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-[#1B2A4A] py-5">
        <div className="flex items-center justify-center gap-0 flex-wrap">
          {[
            { icon: <IconLock size={16} className="text-white" />, text: 'NSE Certified', highlight: 'Data via Global Data Feed' },
            { icon: <IconCloud size={16} className="text-white" />, text: 'Deployed into', highlight: 'Your AWS Environment' },
            { icon: <IconScale size={16} className="text-white" />, text: 'SEBI Compliant', highlight: 'Maker-Checker Workflow' },
            { icon: <IconNumbers size={16} className="text-white" />, text: 'Zero Hallucinations', highlight: '— Every Number Calculated' },
            { icon: <IconShield size={16} className="text-white" />, text: 'Source Code in', highlight: 'Independent Escrow' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 px-9 py-2 border-r border-white/10 last:border-0">
              <span className="text-base">{item.icon}</span>
              <span className="text-[13px] font-semibold text-white/85">
                {item.text} <span className="text-[#7DD3DB]">{item.highlight}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Problem Section */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="text-center mb-15 fade-up">
            <div className="text-[11px] font-bold text-[#0D7C8C] uppercase tracking-[1.5px] mb-3">The Problem We Solve</div>
            <h2 className="text-[40px] font-extrabold text-[#1B2A4A] tracking-tight leading-tight mb-4">
              Indian equity research deserves<br/>better infrastructure.
            </h2>
            <p className="text-[17px] text-[#718096] max-w-[600px] mx-auto leading-relaxed">
              The tools used by most research teams today are fragmented, generic, and dangerously dependent on data that cannot be verified at the point of use.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-15">
            {[
              {
                num: '01',
                title: 'Fragmented Workflows',
                text: 'Analysts toggle between Excel models, third-party charting platforms, BSE filing portals, and chat threads for every single research note. There is no unified workspace where fundamental, technical, macro, and sentiment data converge.'
              },
              {
                num: '02',
                title: 'AI That Invents Numbers',
                text: 'Generic AI tools will confidently quote a company\'s P/E ratio, ROE, or target price — with no source, no formula, and no guarantee of accuracy. In investment research, a hallucinated number is not an inconvenience. It is a liability.'
              },
              {
                num: '03',
                title: 'No Compliance Architecture',
                text: 'SEBI Research Analyst Regulations require conflict-of-interest disclosures, maker-checker workflows, and audit trails. Most platforms treat these as afterthoughts. AlphaSynth treats them as architecture.'
              }
            ].map((problem, i) => (
              <div key={i} className={`bg-white border border-[#E2E8F0] rounded-2xl p-8 relative overflow-hidden fade-up delay-${i + 1}`}>
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#8C1A1A] to-[#C0392B]" />
                <div className="text-[48px] font-extrabold text-[#EEF2F7] font-mono mb-4">{problem.num}</div>
                <h3 className="text-[18px] font-bold text-[#1B2A4A] mb-3">{problem.title}</h3>
                <p className="text-[14px] text-[#718096] leading-relaxed">{problem.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section id="platform" className="py-24 bg-[#F8F9FB]">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="text-center mb-15 fade-up">
            <div className="text-[11px] font-bold text-[#0D7C8C] uppercase tracking-[1.5px] mb-3">Why AlphaSynth</div>
            <h2 className="text-[40px] font-extrabold text-[#1B2A4A] tracking-tight leading-tight mb-4">
              Five decisions that make<br/>this platform different.
            </h2>
            <p className="text-[17px] text-[#718096] max-w-[600px] mx-auto leading-relaxed">
              These are not features. They are architectural commitments — choices that cannot be quietly removed in a future update.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-7 mt-15">
            {[
              {
                icon: <IconNumbers size={24} className="text-white" />,
                bg: 'bg-[#1B2A4A]',
                title: 'Deterministic Calculation Engine',
                text: 'Every ratio, score, attribution figure, and VaR estimate is computed by a versioned Python formula library. Same inputs, same outputs, always. The engine is separate from the AI layer — they cannot interact. Change a formula and the version increments; all downstream calculations rerun automatically.',
                tag: 'Zero Hallucination Guarantee'
              },
              {
                icon: <IconWorld size={24} className="text-[#0D7C8C]" />,
                bg: 'bg-[#E0F4F6]',
                title: 'Built for India, Not Adapted for It',
                text: 'AlphaSynth is built ground-up for NSE and BSE — not a global platform retrofitted for Indian data. NSE-certified data from Global Data Feed. SEBI regulatory workflows. Nifty 50, Bank Nifty, and all 12 sector indices. Indian corporate governance standards, IndAS accounting, and CRISIL/ICRA credit frameworks.',
                tag: 'NSE Certified Data'
              },
              {
                icon: <IconBuilding size={24} className="text-[#B8860B]" />,
                bg: 'bg-[#FFF8E1]',
                title: 'Your Data Never Leaves Your Environment',
                text: 'AlphaSynth is deployed directly into your AWS account using Infrastructure as Code. You own the infrastructure. You hold the encryption keys. Intellectus AI Labs operates the software — your portfolio data, research notes, and proprietary models never transit our servers. True data sovereignty for financial institutions.',
                tag: 'AWS Client Deployment'
              },
              {
                icon: <IconScale size={24} className="text-[#1A6B3A]" />,
                bg: 'bg-[#E8F5E9]',
                title: 'Compliance Is Not an Add-On',
                text: 'The SEBI RA Regulations 2014 maker-checker workflow is a first-class feature, not a checkbox. Every recommendation goes through mandatory conflict-of-interest disclosure, Checker review with historical accuracy data, and an immutable audit trail. Seven-year data retention, cryptographically hashed log chains, and downloadable compliance reports.',
                tag: 'SEBI RA Compliant'
              },
              {
                icon: <IconRobot size={24} className="text-[#0D7C8C]" />,
                bg: 'bg-[#E0F4F6]',
                title: 'AI That Knows What It Doesn\'t Know',
                text: 'AlphaSynth uses Claude (Anthropic) and Perplexity for narrative intelligence — never for numbers. Every LLM response is grounded in pre-computed, verified data. If data is unavailable, the platform says so. "Insufficient data for this analysis" is a valid and respected answer. The alternative — confident fiction — is not acceptable here.',
                tag: 'Grounded AI Layer'
              },
              {
                icon: <IconTarget size={24} className="text-white" />,
                bg: 'bg-[#1B2A4A]',
                title: 'Guided Research, Not Just Data',
                text: 'A contextual suggestion engine watches where you are in the research workflow and nudges you deeper. "You have completed the P&L analysis. The Operating Cash Flow / PAT ratio is 0.62 — below sector median. Would you like to examine the working capital quality?" AlphaSynth improves the analyst, not just the output.',
                tag: 'Guided Intelligence'
              }
            ].map((diff, i) => (
              <div key={i} className={`bg-white border border-[#E2E8F0] rounded-2xl p-8 hover:translate-y-[-4px] hover:shadow-[0_16px_48px_rgba(27,42,74,0.1)] hover:border-[#0D7C8C] transition-all duration-300 cursor-default fade-up delay-${(i % 3) + 1}`}>
                <div className={`w-[52px] h-[52px] rounded-xl ${diff.bg} flex items-center justify-center text-2xl mb-5`}>
                  {diff.icon}
                </div>
                <h3 className="text-[17px] font-bold text-[#1B2A4A] mb-2.5">{diff.title}</h3>
                <p className="text-[14px] text-[#718096] leading-relaxed mb-4">{diff.text}</p>
                <span className="inline-block text-[10px] font-bold text-[#0D7C8C] bg-[#E0F4F6] px-2 py-1 rounded uppercase tracking-wide">{diff.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Six Pillars Section */}
      <section id="pillars" className="py-24 bg-[#1B2A4A] relative overflow-hidden">
        <div className="absolute top-[-100px] left-1/2 transform -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(circle,rgba(13,124,140,0.15)_0%,transparent_65%)] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-10 relative z-10">
          <div className="text-center mb-15 fade-up">
            <div className="text-[11px] font-bold text-[#7DD3DB] uppercase tracking-[1.5px] mb-3">The Analytical Framework</div>
            <h2 className="text-[40px] font-extrabold text-white tracking-tight leading-tight mb-4">
              Six pillars. One score.<br/>Complete conviction.
            </h2>
            <p className="text-[17px] text-white/60 max-w-[600px] mx-auto leading-relaxed">
              Most platforms give you one lens — fundamental or technical. AlphaSynth synthesises six independent analytical dimensions into a single composite score that captures the full picture.
            </p>
          </div>

          <div className="grid grid-cols-6 gap-4 mt-15">
            {[
              { num: 'Pillar 01', icon: <IconChartBar size={28} className="text-white" />, name: 'Fundamental', desc: 'E-I-C framework. 27 financial ratios. DCF, SOTP, relative valuation. Forensic accounting. DuPont decomposition.' },
              { num: 'Pillar 02', icon: <IconTrendingUp size={28} className="text-white" />, name: 'Technical', desc: '12 institutional combination strategies. Elliott Wave. Harmonic patterns. 20+ indicators across all timeframes.' },
              { num: 'Pillar 03', icon: <IconGlobe size={28} className="text-white" />, name: 'Macroeconomic', desc: 'GDP, inflation, RBI policy, fiscal deficit, FII/DII flows, currency, and global index correlation — all scored.' },
              { num: 'Pillar 04', icon: <IconMessage size={28} className="text-white" />, name: 'Sentiment', desc: '20-factor model. News NLP. FII behaviour. Put/call ratios. Social signal intensity. Geopolitical risk index.' },
              { num: 'Pillar 05', icon: <IconBolt size={28} className="text-white" />, name: 'Earnings Momentum', desc: 'Consensus EPS revisions over 30/60/90 days. Beat/miss streak. Management guidance tracker. PEG ratio.' },
              { num: 'Pillar 06', icon: <IconShield size={28} className="text-white" />, name: 'Geopolitical', desc: 'Active conflict risk. Supply chain disruption scoring. Commodity cycle overlay. Sector-specific exposure matrix.' }
            ].map((pillar, i) => (
              <div key={i} className={`bg-white/6 border border-white/10 rounded-2xl p-7 text-center hover:bg-white/10 hover:border-[rgba(13,124,140,0.5)] hover:translate-y-[-4px] transition-all duration-300 cursor-default fade-up delay-${(i % 3) + 1}`}>
                <div className="text-[10px] font-bold text-[#0D7C8C] uppercase tracking-wide mb-3 font-mono">{pillar.num}</div>
                <div className="text-[28px] mb-3.5">{pillar.icon}</div>
                <h3 className="text-[14px] font-bold text-white mb-2">{pillar.name}</h3>
                <p className="text-[12px] text-white/50 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* Score Showcase */}
          <div className="flex items-center justify-center gap-6 mt-12 flex-wrap fade-up">
            {[
              { score: 84, label: 'FUNDAMENTAL', color: 'high' },
              { score: 72, label: 'TECHNICAL', color: 'high' },
              { score: 61, label: 'MACRO', color: 'mid' },
              { score: 78, label: 'SENTIMENT', color: 'high' },
              { score: 65, label: 'EARNINGS', color: 'mid' },
              { score: 80, label: 'GEOPOLITICAL', color: 'high' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6">
                <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center font-mono ${
                  item.color === 'high' 
                    ? 'bg-[rgba(13,124,140,0.2)] border-2 border-[rgba(13,124,140,0.5)] text-[#7DD3DB]'
                    : 'bg-[rgba(184,134,11,0.2)] border-2 border-[rgba(184,134,11,0.4)] text-[#D4A017]'
                }`}>
                  <span className="text-[22px] font-bold leading-none">{item.score}</span>
                  <span className="text-[9px] mt-0.5 opacity-70">{item.label}</span>
                </div>
                {i < 5 && <span className="text-white/30 text-xl">+</span>}
              </div>
            ))}
            <span className="text-white/30 text-[28px] font-light">=</span>
            <div className="bg-gradient-to-br from-[#0D7C8C] to-[#0A9CAF] rounded-2xl px-8 py-5 text-center text-white">
              <div className="text-[48px] font-extrabold font-mono leading-none">74</div>
              <div className="text-[12px] mt-1 opacity-80 uppercase tracking-wide">AlphaSynth Score</div>
              <div className="text-[14px] font-bold bg-white/15 px-3 py-1 rounded-md mt-2.5 inline-block">STRONG BUY</div>
            </div>
          </div>

          <p className="text-center mt-10 text-[14px] text-white/40 fade-up">
            Each pillar is scored 0–100 independently. The composite score is a <strong className="text-white/80">weighted synthesis</strong> — not an average. Pillar weights are calibrated to the prevailing market regime.
          </p>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="text-center mb-15 fade-up">
            <div className="text-[11px] font-bold text-[#0D7C8C] uppercase tracking-[1.5px] mb-3">The Platform</div>
            <h2 className="text-[40px] font-extrabold text-[#1B2A4A] tracking-tight leading-tight mb-4">
              Six modules. One workspace.
            </h2>
            <p className="text-[17px] text-[#718096] max-w-[600px] mx-auto leading-relaxed">
              Every module is purpose-built for the equity research workflow — from the first idea to the published recommendation.
            </p>
          </div>

          {/* Feature 1: Discover & Screen */}
          <div className="grid grid-cols-2 gap-16 items-start mt-15 fade-up">
            <div>
              <div className="inline-block text-[11px] font-bold text-[#0D7C8C] uppercase tracking-wide mb-3 bg-[#E0F4F6] px-2.5 py-1 rounded">Section I</div>
              <h3 className="text-[32px] font-extrabold text-[#1B2A4A] tracking-tight leading-tight mb-4">Discover & Screen</h3>
              <p className="text-[15px] text-[#718096] leading-relaxed mb-8">
                Seven precision-engineered screener models surface high-conviction opportunities from the NSE universe. Stop scrolling through 5,000 stocks. Let the engine find what matches your thesis.
              </p>
              <ul className="flex flex-col gap-3.5 mb-6">
                {[
                  { title: 'Quality Compounders', desc: 'ROE >15%, low debt, consistent earnings growth, strong moat. The Buffett-style compounder screen.' },
                  { title: 'Deep Value', desc: 'Stocks trading at a >30% margin of safety to their Graham number. Undervalued and overlooked.' },
                  { title: 'Growth Leaders', desc: 'Revenue and PAT CAGR >20%. High-growth businesses in secular tailwind sectors.' },
                  { title: 'Momentum Leaders, Multibagger Early, Low Risk Alpha', desc: 'Three more models for three distinct mandates.' },
                  { title: 'Custom Scan Builder', desc: 'Type "ROE above 15% and PE below 20" in plain English. AI converts to filters. Save, schedule, and alert.' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-[#E0F4F6] text-[#0D7C8C] rounded-full flex items-center justify-center text-[11px] font-bold mt-0.5">✓</div>
                    <span className="text-[14px] text-[#2D3748] leading-relaxed">
                      <strong className="text-[#1B2A4A]">{item.title}</strong> — {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2.5 flex-wrap">
                <span className="text-[12px] font-semibold px-3 py-1.5 rounded-md bg-[#E0F4F6] text-[#0D7C8C]">Institutional Intent Scans</span>
                <span className="text-[12px] font-semibold px-3 py-1.5 rounded-md bg-[#E0F4F6] text-[#0D7C8C]">Chart Pattern Detection</span>
                <span className="text-[12px] font-semibold px-3 py-1.5 rounded-md bg-[#E0F4F6] text-[#0D7C8C]">IPO Analysis</span>
                <span className="text-[12px] font-semibold px-3 py-1.5 rounded-md bg-[#E0F4F6] text-[#0D7C8C]">Big Bull Tracker</span>
              </div>
            </div>
            <div className="bg-[#F8F9FB] border border-[#E2E8F0] rounded-2xl overflow-hidden">
              <div className="bg-[#1B2A4A] px-4 py-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                <span className="text-[11px] text-white/40 ml-2 font-mono">Six-Pillar Radar · ASIAN PAINTS</span>
              </div>
              <div className="p-5">
                <div className="text-[11px] font-bold text-[#718096] uppercase tracking-wide mb-4">Research Depth Score — 72%</div>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Fundamental', score: 84, width: 84, color: 'from-[#0D7C8C] to-[#0A9CAF]' },
                    { label: 'Technical', score: 72, width: 72, color: 'from-[#0D7C8C] to-[#0A9CAF]' },
                    { label: 'Macroeconomic', score: 61, width: 61, color: 'from-[#B8860B] to-[#D4A017]' },
                    { label: 'Sentiment', score: 78, width: 78, color: 'from-[#0D7C8C] to-[#0A9CAF]' },
                    { label: 'Earnings Mom.', score: 65, width: 65, color: 'from-[#B8860B] to-[#D4A017]' },
                    { label: 'Geopolitical', score: 80, width: 80, color: 'from-[#0D7C8C] to-[#0A9CAF]' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-[13px]">
                      <span className="w-[120px] text-[#718096] flex-shrink-0">{item.label}</span>
                      <div className="flex-1 h-2 bg-[#EEF2F7] rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${item.color} rounded-full`} style={{ width: `${item.width}%` }} />
                      </div>
                      <span className="w-8 text-right font-bold text-[12px] text-[#1B2A4A]">{item.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#E2E8F0] my-15" />

          {/* Feature 2: Market Intelligence */}
          <div className="grid grid-cols-2 gap-16 items-start fade-up" style={{ direction: 'rtl' }}>
            <div style={{ direction: 'ltr' }}>
              <div className="inline-block text-[11px] font-bold text-[#0D7C8C] uppercase tracking-wide mb-3 bg-[#E0F4F6] px-2.5 py-1 rounded">Section II</div>
              <h3 className="text-[32px] font-extrabold text-[#1B2A4A] tracking-tight leading-tight mb-4">Market Intelligence</h3>
              <p className="text-[15px] text-[#718096] leading-relaxed mb-8">
                Every great stock idea lives inside a market context. AlphaSynth builds that context before you even open a company page — so you know whether the tide is with you or against you.
              </p>
              <ul className="flex flex-col gap-3.5 mb-6">
                {[
                  { title: 'Index Breadth Analytics', desc: 'Advance/Decline, % constituents above 200-DMA, Dow Theory confirmations across all 12 Nifty sectors.' },
                  { title: 'Delivery Volume Intelligence', desc: 'Institutional vs. speculative activity at a glance. Unusual delivery spikes flagged before the breakout.' },
                  { title: 'Economic Analysis (E-I-C Framework)', desc: 'GDP, inflation, RBI rate decisions, fiscal deficit, FPI flows — synthesised into an economic scorecard.' },
                  { title: 'Sector Deep-Dives', desc: '12 Nifty sectors, 64 sector-specific KPIs, Porter\'s Five Forces, PESTLE, BCG, SCP. Industry attractiveness scored 1–35.' },
                  { title: 'Earnings Dashboard', desc: 'Market-wide results season tracker. Net revision ratio. Sector-wise earnings quality ranking.' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-[#E0F4F6] text-[#0D7C8C] rounded-full flex items-center justify-center text-[11px] font-bold mt-0.5">✓</div>
                    <span className="text-[14px] text-[#2D3748] leading-relaxed">
                      <strong className="text-[#1B2A4A]">{item.title}</strong> — {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2.5 flex-wrap">
                <span className="text-[12px] font-semibold px-3 py-1.5 rounded-md bg-[#E0F4F6] text-[#0D7C8C]">20-Factor Sentiment Model</span>
                <span className="text-[12px] font-semibold px-3 py-1.5 rounded-md bg-[#E0F4F6] text-[#0D7C8C]">Macro Regime Alerts</span>
                <span className="text-[12px] font-semibold px-3 py-1.5 rounded-md bg-[#E0F4F6] text-[#0D7C8C]">FII/DII Monitor</span>
              </div>
            </div>
            <div style={{ direction: 'ltr' }} className="bg-[#F8F9FB] border border-[#E2E8F0] rounded-2xl overflow-hidden">
              <div className="bg-[#1B2A4A] px-4 py-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                <span className="text-[11px] text-white/40 ml-2 font-mono">Market Intelligence · Live</span>
              </div>
              <div className="p-5">
                {[
                  { key: 'Nifty 50 Breadth', val: '68% above 200-DMA', pos: true },
                  { key: 'Advance / Decline', val: '1,847 / 623', pos: true },
                  { key: 'Net Revision Ratio', val: '0.71 — Optimistic', pos: true },
                  { key: 'FII Flow (30-day)', val: '+₹12,400 Cr Net Buy', pos: true },
                  { key: 'India VIX', val: '13.4 — Low Fear', pos: false },
                  { key: 'Macro Regime', val: 'EXPANSION', pos: true },
                  { key: 'Economic Scorecard', val: 'Favourable (5/7)', pos: true }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2.5 border-b border-[#E2E8F0] last:border-0 text-[13px]">
                    <span className="text-[#718096]">{item.key}</span>
                    <span className={`font-bold ${item.pos ? 'text-[#1A6B3A]' : 'text-[#1B2A4A]'}`}>{item.val}</span>
                  </div>
                ))}
                <div className="mt-4 p-3 bg-[#E0F4F6] rounded-lg text-[12px] text-[#0D7C8C] font-semibold">
                  <IconBulb size={16} className="inline mr-2 text-[#0D7C8C]" />
                  Guided Insight: Broad-based bull with positive FII flows. Cyclical sectors historically outperform in this regime. 3 of your watchlist stocks are in leading sectors.
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#E2E8F0] my-15" />

          {/* Feature 3: Company Research */}
          <div className="grid grid-cols-2 gap-16 items-start fade-up">
            <div>
              <div className="inline-block text-[11px] font-bold text-[#0D7C8C] uppercase tracking-wide mb-3 bg-[#E0F4F6] px-2.5 py-1 rounded">Section III</div>
              <h3 className="text-[32px] font-extrabold text-[#1B2A4A] tracking-tight leading-tight mb-4">Company & Fundamental Research</h3>
              <p className="text-[15px] text-[#718096] leading-relaxed mb-8">
                The deepest layer. From business model to balance sheet to valuation — every number calculated, every assumption visible, every conclusion traceable.
              </p>
              <ul className="flex flex-col gap-3.5">
                {[
                  { title: 'Full E-I-C Framework', desc: 'Economy → Industry → Company analysis with structured templates and AI-assisted narrative generation grounded in your calculations.' },
                  { title: '27-Ratio Suite', desc: 'Profitability, returns, leverage, liquidity, efficiency, valuation. DuPont 5-factor decomposition. Peer comparison ranked within sector.' },
                  { title: 'Valuation Engine', desc: 'Multi-scenario DCF (FCFF, FCFE, DDM). SOTP. Relative valuation. WACC from first principles. Terminal value sensitivity matrix.' },
                  { title: 'Forensic Accounting', desc: 'Beneish M-Score, Piotroski F-Score, Altman Z-Score, Sloan Ratio. Automated red flags before you read a single note.' },
                  { title: 'Corporate Actions Tracker', desc: 'Dividends, buybacks, rights issues, mergers, demergers. Automatic EPS adjustment. Historical corporate action log.' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-[#E0F4F6] text-[#0D7C8C] rounded-full flex items-center justify-center text-[11px] font-bold mt-0.5">✓</div>
                    <span className="text-[14px] text-[#2D3748] leading-relaxed">
                      <strong className="text-[#1B2A4A]">{item.title}</strong> — {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#F8F9FB] border border-[#E2E8F0] rounded-2xl overflow-hidden">
              <div className="bg-[#1B2A4A] px-4 py-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                <span className="text-[11px] text-white/40 ml-2 font-mono">Valuation Engine · HDFC Bank</span>
              </div>
              <div className="p-5">
                <div className="text-[11px] font-bold text-[#718096] uppercase tracking-wide mb-4">Multi-Model Valuation (FY26E)</div>
                {[
                  { key: 'DCF (FCFE, 3-stage)', val: '₹1,820' },
                  { key: 'DDM (H-Model, g=14%)', val: '₹1,745' },
                  { key: 'Relative (P/B 2.8×, Peers avg 2.6×)', val: '₹1,680' },
                  { key: 'Blended Fair Value', val: '₹1,760', pos: true },
                  { key: 'Current Market Price', val: '₹1,612' },
                  { key: 'Margin of Safety', val: '+9.2% Upside', pos: true },
                  { key: 'Piotroski F-Score', val: '8 / 9 — Strong', pos: true }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2.5 border-b border-[#E2E8F0] last:border-0 text-[13px]">
                    <span className="text-[#718096]">{item.key}</span>
                    <span className={`font-bold ${item.pos ? 'text-[#1A6B3A]' : 'text-[#1B2A4A]'}`}>{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="h-px bg-[#E2E8F0] my-15" />

          {/* Features 4 & 5 - Two Column Cards */}
          <div className="grid grid-cols-2 gap-8 fade-up">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8">
              <div className="inline-block text-[11px] font-bold text-[#0D7C8C] uppercase tracking-wide mb-3 bg-[#E0F4F6] px-2.5 py-1 rounded">Section IV</div>
              <h3 className="text-[24px] font-extrabold text-[#1B2A4A] tracking-tight leading-tight mb-4">Technical & Quantitative</h3>
              <p className="text-[14px] text-[#718096] leading-relaxed mb-5">
                Institutional-grade technical analysis. Not just charts — strategies. 12 pre-built combination strategies (RSI Divergence + Bollinger Squeeze, Dow Theory + OBV + RSI, and 10 more), each with historical win rates. Backtesting engine with Monte Carlo and walk-forward optimisation. Elliott Wave and Harmonic pattern detection.
              </p>
              <div className="flex gap-2.5 flex-wrap">
                <span className="text-[12px] font-semibold px-3 py-1.5 rounded-md bg-[#E0F4F6] text-[#0D7C8C]">12 Combo Strategies</span>
                <span className="text-[12px] font-semibold px-3 py-1.5 rounded-md bg-[#E0F4F6] text-[#0D7C8C]">80-88% Win Rate (Dow Theory)</span>
                <span className="text-[12px] font-semibold px-3 py-1.5 rounded-md bg-[#E0F4F6] text-[#0D7C8C]">Backtesting Engine</span>
              </div>
            </div>
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8">
              <div className="inline-block text-[11px] font-bold text-[#0D7C8C] uppercase tracking-wide mb-3 bg-[#E0F4F6] px-2.5 py-1 rounded">Section V</div>
              <h3 className="text-[24px] font-extrabold text-[#1B2A4A] tracking-tight leading-tight mb-4">Forensic & Advanced Analytics</h3>
              <p className="text-[14px] text-[#718096] leading-relaxed mb-5">
                The tools most platforms don't have. Forensic accounting layer catches manipulation before it reaches your model. Sentiment engine runs 20 factors. Red Team Analysis challenges your Buy thesis systematically. Predictive analytics surfaces breakout probability scores and earnings surprise signals.
              </p>
              <div className="flex gap-2.5 flex-wrap">
                <span className="text-[12px] font-semibold px-3 py-1.5 rounded-md bg-[#E0F4F6] text-[#0D7C8C]">Beneish M-Score</span>
                <span className="text-[12px] font-semibold px-3 py-1.5 rounded-md bg-[#E0F4F6] text-[#0D7C8C]">Red Team Analysis</span>
                <span className="text-[12px] font-semibold px-3 py-1.5 rounded-md bg-[#E0F4F6] text-[#0D7C8C]">20-Factor Sentiment</span>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#E2E8F0] my-15" />

          {/* Feature 6: Portfolio Management */}
          <div className="grid grid-cols-2 gap-16 items-start fade-up" style={{ direction: 'rtl' }}>
            <div style={{ direction: 'ltr' }}>
              <div className="inline-block text-[11px] font-bold text-[#0D7C8C] uppercase tracking-wide mb-3 bg-[#E0F4F6] px-2.5 py-1 rounded">Section VI</div>
              <h3 className="text-[32px] font-extrabold text-[#1B2A4A] tracking-tight leading-tight mb-4">Portfolio Management<br/>& Risk Analytics</h3>
              <p className="text-[15px] text-[#718096] leading-relaxed mb-8">
                AlphaSynth's portfolio module transforms you from a stock analyst into a portfolio architect — with the tools to manage risk, attribute returns, and rebalance with precision.
              </p>
              <ul className="flex flex-col gap-3.5">
                {[
                  { title: 'Portfolio Health Score (0–100)', desc: 'A composite metric across six dimensions: Diversification, Quality, Risk, Momentum, Valuation, and Liquidity. No other Indian platform offers this.' },
                  { title: 'Brinson Performance Attribution', desc: 'Decompose returns into Allocation Effect, Selection Effect, and Interaction Effect. Know whether your alpha came from sector calls or stock picks.' },
                  { title: 'VaR, CVaR & Stress Testing', desc: 'Historical, parametric, and Monte Carlo methods. Six pre-built stress scenarios including 2008, 2020, and 2016 demonetisation.' },
                  { title: 'Tax-Aware Rebalancing Engine', desc: 'Quantitative rebalancing that prioritises LTCG positions, minimises transaction costs, and respects Liquidity Score constraints for illiquid holdings.' },
                  { title: 'Fixed Income Analytics', desc: 'Portfolio YTM, modified duration, credit rating tracker, and yield curve inversion monitor for multi-asset portfolios.' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-[#E0F4F6] text-[#0D7C8C] rounded-full flex items-center justify-center text-[11px] font-bold mt-0.5">✓</div>
                    <span className="text-[14px] text-[#2D3748] leading-relaxed">
                      <strong className="text-[#1B2A4A]">{item.title}</strong> — {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ direction: 'ltr' }} className="bg-[#F8F9FB] border border-[#E2E8F0] rounded-2xl overflow-hidden">
              <div className="bg-[#1B2A4A] px-4 py-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                <span className="text-[11px] text-white/40 ml-2 font-mono">Portfolio Dashboard · June 2025</span>
              </div>
              <div className="grid grid-cols-2 gap-3 p-5">
                {[
                  { label: 'Portfolio Value', val: '₹4.2Cr', change: '+18.4% YTD', up: true },
                  { label: 'Health Score', val: '74', change: 'Strong', up: true },
                  { label: 'Alpha vs Nifty', val: '+6.4%', change: 'Annualised', up: true },
                  { label: 'Portfolio VaR (95%)', val: '-2.8%', change: '1-day 95% conf.', up: false }
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-[#E2E8F0] rounded-xl p-4">
                    <div className="text-[11px] text-[#718096] mb-1.5">{item.label}</div>
                    <div className="text-[22px] font-extrabold text-[#1B2A4A] font-mono">{item.val}</div>
                    <div className={`text-[12px] mt-1 font-semibold ${item.up ? 'text-[#1A6B3A]' : 'text-[#718096]'}`}>{item.change}</div>
                  </div>
                ))}
              </div>
              <div className="mx-5 mb-5 p-3 bg-[#E0F4F6] rounded-lg text-[12px] text-[#0D7C8C]">
                <strong>Rebalancing Alert:</strong> INFY has drifted to 14.2% (target: 8%). Tax-aware sell order suggested: 380 shares (LTCG eligible).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zero Hallucination Section */}
      <section className="py-24 bg-gradient-to-br from-[#1B2A4A] to-[#243756]">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="text-center mb-15 fade-up">
            <div className="text-[11px] font-bold text-[#7DD3DB] uppercase tracking-[1.5px] mb-3">The Trust Architecture</div>
            <h2 className="text-[40px] font-extrabold text-white tracking-tight leading-tight mb-4">
              How we guarantee every<br/>number is accurate.
            </h2>
            <p className="text-[17px] text-white/60 max-w-[700px] mx-auto leading-relaxed">
              The Zero Hallucination Framework is a five-gate sequence that governs every interaction between your data and the AI layer. It is not a feature — it is the architecture.
            </p>
          </div>

          <div className="grid grid-cols-5 gap-0 mt-15 relative fade-up">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/8 transform -translate-y-1/2" />
            {[
              { num: 'G1', title: 'Data Presence Check', text: 'Does source data exist? If not, the system returns "Insufficient data" — no LLM call is made.' },
              { num: 'G2', title: 'Calculation Completion', text: 'Pre-computed numbers must be verified by the Deterministic Engine before the AI layer sees them.' },
              { num: 'G3', title: 'Structured Prompt Injection', text: 'The LLM receives only verified numbers. Template: "The calculated ROE is X. Write an interpretation." It cannot invent.' },
              { num: 'G4', title: 'Output Schema Validation', text: 'Every numerical claim in the LLM response is cross-checked against pre-computed values. Off-schema responses are rejected.' },
              { num: 'G5', title: 'Confidence Scoring', text: 'AI outputs a confidence score. Score <3 appends a disclaimer. Low confidence is displayed, not suppressed.' }
            ].map((step, i) => (
              <div key={i} className="text-center px-4 relative">
                <div className="w-12 h-12 rounded-full bg-[#0D7C8C] text-white flex items-center justify-center text-[14px] font-extrabold mx-auto mb-4 relative z-10 shadow-[0_0_0_6px_rgba(13,124,140,0.2)]">
                  {step.num}
                </div>
                <h4 className="text-[13px] font-bold text-white mb-2">{step.title}</h4>
                <p className="text-[12px] text-white/45 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="bg-[rgba(13,124,140,0.12)] border border-[rgba(13,124,140,0.3)] rounded-2xl p-9 mt-14 text-center fade-up">
            <p className="text-[18px] font-semibold text-white leading-relaxed">
              <em className="not-italic text-[#7DD3DB]">If AlphaSynth does not have the data to answer a question, it says so.</em><br/>
              Every number you see has a Calculation ID that traces to a source data row, a formula version, and a timestamp.<br/>
              This is the standard we hold ourselves to — and the standard your research deserves.
            </p>
          </div>
        </div>
      </section>

      {/* Deployment Section */}
      <section id="deployment" className="py-24 bg-[#F8F9FB]">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="grid grid-cols-2 gap-20 items-center">
            <div>
              <div className="text-[11px] font-bold text-[#0D7C8C] uppercase tracking-[1.5px] mb-3 fade-up">Enterprise Deployment</div>
              <h2 className="text-[40px] font-extrabold text-[#1B2A4A] tracking-tight leading-tight mb-4 fade-up">
                In your environment.<br/>On your terms.
              </h2>
              <p className="text-[17px] text-[#718096] leading-relaxed mb-12 fade-up">
                AlphaSynth is not a SaaS platform that holds your data. It deploys into your AWS account using Infrastructure as Code. You own everything. We operate the software.
              </p>
              <div className="flex flex-col gap-8">
                {[
                  { num: '1', title: 'You provide your AWS account', text: 'Share your AWS Account ID and a designated IAM role. No additional cloud infrastructure to procure — if you have AWS, you are ready.' },
                  { num: '2', title: 'We deploy via CDK in under 30 minutes', text: 'One command deploys the full AlphaSynth stack — VPC, databases, services, API, and frontend — into your account. Your encryption keys. Your VPC. Your data never transits our servers.' },
                  { num: '3', title: 'Updates roll without downtime', text: 'New platform versions deploy as rolling updates via your account\'s CI/CD pipeline. Zero downtime. Full version history. Rollback in one command if needed.' }
                ].map((step, i) => (
                  <div key={i} className={`flex gap-6 items-start fade-up delay-${i + 1}`}>
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#1B2A4A] text-white flex items-center justify-center text-[16px] font-extrabold">
                      {step.num}
                    </div>
                    <div>
                      <h4 className="text-[17px] font-bold text-[#1B2A4A] mb-1.5">{step.title}</h4>
                      <p className="text-[14px] text-[#718096] leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#1B2A4A] rounded-[20px] p-10 relative overflow-hidden fade-up">
              <div className="absolute top-[-50px] right-[-50px] w-[250px] h-[250px] bg-[radial-gradient(circle,rgba(13,124,140,0.2)_0%,transparent_70%)]" />
              <div className="relative z-10 space-y-4">
                {[
                  { title: 'Deployment Region', value: 'ap-south-1 (Mumbai)', sub: 'Data sovereignty — all data stays in India' },
                  { title: 'Encryption', value: 'AWS KMS — Customer Managed Keys', sub: 'You hold the keys. We cannot access your data.' },
                  { title: 'Compliance Logs', value: '7-Year Immutable Audit Trail', sub: 'Cryptographically hashed. SEBI RA Regulation compliant.' },
                  { title: 'Infrastructure as Code', value: 'AWS CDK (TypeScript)', sub: 'Your DevOps team can read, audit, and extend every resource.' }
                ].map((item, i) => (
                  <div key={i} className="bg-white/8 border border-white/15 rounded-xl p-5">
                    <div className="text-[12px] font-bold text-white/50 uppercase tracking-wide mb-2">{item.title}</div>
                    <div className="text-[15px] font-semibold text-white mb-1">{item.value}</div>
                    <div className="text-[12px] text-white/40">{item.sub}</div>
                  </div>
                ))}
                <div className="text-[12px] text-white/40 text-center pt-5 border-t border-white/8">
                  <span className="text-white/70">Source code held in independent escrow</span> (NCC Group / Iron Mountain). Release triggered by clearly defined conditions. Your investment in the platform is protected.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section id="roles" className="py-24">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="text-center mb-14 fade-up">
            <div className="text-[11px] font-bold text-[#0D7C8C] uppercase tracking-[1.5px] mb-3">Built for Your Team</div>
            <h2 className="text-[40px] font-extrabold text-[#1B2A4A] tracking-tight leading-tight mb-4">
              Every role has a purpose.<br/>Every action is tracked.
            </h2>
            <p className="text-[17px] text-[#718096] max-w-[600px] mx-auto leading-relaxed">
              AlphaSynth is not one-size-fits-all. Role-based access ensures every member of your team sees exactly what they need — and nothing they shouldn't.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-7">
            {[
              {
                icon: <IconBriefcase size={32} className="text-[#1B2A4A]" />,
                title: 'CIO / Fund Manager',
                subtitle: 'Strategic Oversight',
                text: 'Portfolio-level intelligence, attribution, and risk management. See the health of every portfolio and the quality of every analyst\'s recommendations — historically verified.',
                features: [
                  'Portfolio Health Score across all mandates',
                  'Analyst recommendation accuracy tracking',
                  'Brinson attribution by sector and stock',
                  'VaR, CVaR, and stress test reports'
                ]
              },
              {
                icon: <IconMicroscope size={32} className="text-[#1B2A4A]" />,
                title: 'Senior Research Analyst',
                subtitle: 'Checker / Approver',
                text: 'Before approving any recommendation, see the full research trail, the analyst\'s historical hit rate, and the six-pillar conviction score. Approve, reject, or modify with a full audit trail.',
                features: [
                  'Maker-checker approval workflow',
                  'Analyst historical accuracy overlay',
                  'SEBI conflict-of-interest disclosure verification',
                  'One-click report approval with digital signature'
                ]
              },
              {
                icon: <IconEdit size={32} className="text-[#1B2A4A]" />,
                title: 'Research Analyst',
                subtitle: 'Maker / Creator',
                text: 'The full AlphaSynth toolkit — all six sections, guided suggestions, module chatbots, and research report generation. AlphaSynth improves your analysis by nudging you deeper at every step.',
                features: [
                  'Full access to all six platform sections',
                  'Guided suggestions based on analysis gaps',
                  'Module chatbots with persistent memory',
                  'Research depth score and badge system'
                ]
              }
            ].map((role, i) => (
              <div key={i} className={`border border-[#E2E8F0] rounded-2xl p-8 bg-white hover:shadow-[0_12px_40px_rgba(27,42,74,0.08)] hover:translate-y-[-3px] transition-all duration-300 fade-up delay-${i + 1}`}>
                <div className="text-[32px] mb-4">{role.icon}</div>
                <h3 className="text-[18px] font-bold text-[#1B2A4A] mb-2">{role.title}</h3>
                <div className="text-[13px] text-[#0D7C8C] font-semibold mb-4">{role.subtitle}</div>
                <p className="text-[14px] text-[#718096] leading-relaxed mb-5">{role.text}</p>
                <div className="flex flex-col gap-2">
                  {role.features.map((feature, j) => (
                    <div key={j} className="text-[13px] text-[#2D3748] flex gap-2">
                      <span className="text-[#0D7C8C] flex-shrink-0">→</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="py-20 bg-gradient-to-br from-[#0D7C8C] to-[#0A9CAF]">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="grid grid-cols-2 gap-20 items-center">
            <div>
              <div className="text-[11px] font-bold text-white/50 uppercase tracking-[1.5px] mb-3">Research Excellence</div>
              <h2 className="text-[36px] font-extrabold text-white tracking-tight leading-tight mb-4">
                Great research<br/>should feel like it.
              </h2>
              <p className="text-[16px] text-white/75 leading-relaxed mb-8">
                AlphaSynth gamifies the research process — not to make it a game, but to make depth rewarding, consistency visible, and quality measurable. The best analysts in your organisation will stand out.
              </p>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { icon: <IconTarget size={24} className="text-white" />, title: 'Research Depth Score', text: 'Each stock has a completeness score (0–100%). Completing all six analytical pillars unlocks the full conviction badge.' },
                  { icon: <IconTrophy size={24} className="text-white" />, title: 'Accuracy Leaderboard', text: 'Monthly ranking by recommendation hit rate within your organisation. Resets to zero every month.' },
                  { icon: <IconFlame size={24} className="text-white" />, title: 'Research Streak', text: 'Daily active analysis streak. Gamified consistency — because the best analysts don\'t take days off during earnings season.' },
                  { icon: <IconShield size={24} className="text-white" />, title: 'Achievement Badges', text: 'Forensic Investigator. Macro Watcher. Portfolio Architect. Badges signal genuine analytical capability, not just usage.' }
                ].map((feat, i) => (
                  <div key={i} className="bg-white/10 rounded-xl p-5">
                    <div className="text-[24px] mb-2.5">{feat.icon}</div>
                    <h4 className="text-[14px] font-bold text-white mb-1.5">{feat.title}</h4>
                    <p className="text-[12px] text-white/65 leading-relaxed">{feat.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2.5 flex-wrap">
                <div className="bg-white/20 border border-white/20 rounded-full px-4 py-2 flex items-center gap-2 text-[13px] font-semibold text-white">
                  <IconShield size={16} className="text-white" />
                  Forensic Investigator
                </div>
                <div className="bg-white/20 border border-white/20 rounded-full px-4 py-2 flex items-center gap-2 text-[13px] font-semibold text-white">
                  <IconChartDots size={16} className="text-white" />
                  Valuation Master
                </div>
                <div className="bg-white/12 border border-white/20 rounded-full px-4 py-2 flex items-center gap-2 text-[13px] font-semibold text-white">
                  <IconGlobe size={16} className="text-white" />
                  Macro Watcher
                </div>
              </div>
              <div className="flex gap-2.5 flex-wrap">
                <div className="bg-white/20 border border-white/20 rounded-full px-4 py-2 flex items-center gap-2 text-[13px] font-semibold text-white">
                  <IconMicroscope size={16} className="text-white" />
                  Deep Dive · 50 stocks
                </div>
                <div className="bg-white/12 border border-white/20 rounded-full px-4 py-2 flex items-center gap-2 text-[13px] font-semibold text-white">
                  <IconTrophy size={16} className="text-white" />
                  Top Analyst
                </div>
              </div>
              <div className="bg-white/10 rounded-2xl p-5 flex justify-between items-center mt-1">
                <div>
                  <div className="text-[12px] text-white/65">Research Streak</div>
                  <div className="text-[36px] font-extrabold text-white font-mono">14 days</div>
                </div>
                <div className="text-right">
                  <div className="text-[12px] text-white/65">Hit Rate (90 days)</div>
                  <div className="text-[36px] font-extrabold text-white font-mono">73%</div>
                </div>
              </div>
              <div className="bg-white/10 rounded-2xl p-5">
                <div className="flex justify-between text-[12px] text-white/65 mb-3">
                  <span>Research Depth · RELIANCE</span>
                  <span className="text-white font-bold">72% complete</span>
                </div>
                <div className="h-2 bg-white/15 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-white rounded-full" style={{ width: '72%' }} />
                </div>
                <div className="flex justify-between text-[10px]">
                  {['Economy ✓', 'Industry ✓', 'Financials ✓', 'Valuation ✓', 'Forensic', 'Sentiment'].map((step, i) => (
                    <div key={i} className={`text-center ${i < 4 ? 'text-white/80 font-semibold' : 'text-white/40'}`}>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-30 text-center bg-[#F8F9FB]">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="text-[11px] font-bold text-[#0D7C8C] uppercase tracking-[1.5px] mb-3">Get Started</div>
          <h2 className="text-[48px] font-extrabold text-[#1B2A4A] tracking-tight leading-tight mb-5">
            Ready to build the research<br/>infrastructure you deserve?
          </h2>
          <p className="text-[17px] text-[#718096] max-w-[600px] mx-auto mb-12 leading-relaxed">
            AlphaSynth is available for pilot deployment to select Indian investment firms. Onboarding takes two to four weeks. Your team is productive from day one.
          </p>
          <div className="flex gap-5 justify-center items-center flex-wrap">
            <Link href="/dashboard" className="text-[16px] font-bold text-white bg-[#1B2A4A] px-9 py-4 rounded-xl hover:bg-[#243756] transition-all shadow-[0_4px_24px_rgba(27,42,74,0.25)] hover:translate-y-[-2px]">
              Request a Demo
            </Link>
            <Link href="#" className="text-[16px] font-semibold text-[#1B2A4A] border-2 border-[#E2E8F0] px-9 py-4 rounded-xl hover:border-[#1B2A4A] transition-all">
              Download Platform Overview
            </Link>
          </div>
          <p className="text-[13px] text-[#718096] mt-5">
            Competitive pricing structured for Indian fund houses. Per-seat and enterprise licensing available.{' '}
            <a href="#" className="text-[#0D7C8C]">Talk to us about your team size →</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1B2A4A] py-15">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="grid grid-cols-4 gap-15 mb-12">
            <div>
              <div className="text-[22px] font-extrabold text-white mb-4">
                Alpha<span className="text-[#7DD3DB]">Synth</span>
              </div>
              <p className="text-[14px] text-white/45 leading-relaxed max-w-[280px] mb-5">
                Investment intelligence platform for India's equity professionals. NSE-certified data. Deterministic calculations. Zero hallucinations. Deployed in your AWS environment.
              </p>
              <div className="flex gap-3">
                <span className="text-[11px] text-white/35 bg-white/5 px-2.5 py-1 rounded border border-white/8">NSE Certified</span>
                <span className="text-[11px] text-white/35 bg-white/5 px-2.5 py-1 rounded border border-white/8">SEBI Compliant</span>
                <span className="text-[11px] text-white/35 bg-white/5 px-2.5 py-1 rounded border border-white/8">AWS Deployed</span>
              </div>
            </div>
            
            <div>
              <div className="text-[12px] font-bold text-white/50 uppercase tracking-wide mb-5">Platform</div>
              <div className="flex flex-col gap-2.5">
                <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">Discover & Screen</a>
                <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">Market Intelligence</a>
                <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">Company Research</a>
                <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">Technical Analysis</a>
                <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">Portfolio Management</a>
              </div>
            </div>
            
            <div>
              <div className="text-[12px] font-bold text-white/50 uppercase tracking-wide mb-5">Company</div>
              <div className="flex flex-col gap-2.5">
                <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">About Intellectus AI Labs</a>
                <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">Architecture Overview</a>
                <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">Security & Compliance</a>
                <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">Code Escrow Policy</a>
                <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">Careers</a>
              </div>
            </div>
            
            <div>
              <div className="text-[12px] font-bold text-white/50 uppercase tracking-wide mb-5">Legal</div>
              <div className="flex flex-col gap-2.5">
                <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">SEBI RA Disclosure</a>
                <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">Data Processing Agreement</a>
                <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/8 pt-7 flex justify-between items-center">
            <div className="text-[13px] text-white/35">
              © 2025 Intellectus AI Labs Pvt. Ltd. AlphaSynth is a registered product. All calculations are deterministic and verifiable. Not an investment advisor.
            </div>
            <div className="flex gap-3">
              <span className="text-[11px] text-white/35 bg-white/5 px-2.5 py-1 rounded border border-white/8">ap-south-1 (Mumbai)</span>
              <span className="text-[11px] text-white/35 bg-white/5 px-2.5 py-1 rounded border border-white/8">v2.0</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
