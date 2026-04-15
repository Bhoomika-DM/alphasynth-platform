'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  IconLock,
  IconCloud,
  IconScale,
  IconNumbers,
  IconShield,
  IconChartBar,
  IconTrendingUp,
  IconGlobe,
  IconMessage,
  IconBolt,
  IconAlertTriangle,
  IconBriefcase,
  IconUsers,
  IconTarget,
  IconAward,
  IconCheck,
  IconArrowRight,
} from '@tabler/icons-react'
import AlphaSynthHero from './AlphaSynthHero'
import AlphaSynthScrollSection from './AlphaSynthScrollSection'

gsap.registerPlugin(ScrollTrigger)

export default function AlphaSynthLandingPage() {
  const navRef = useRef<HTMLDivElement>(null)
  const trustBarRef = useRef<HTMLDivElement>(null)
  const pillarsRef = useRef<HTMLDivElement>(null)
  const deploymentRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'

    const sections = document.querySelectorAll('section[id]')
    const navLinks = document.querySelectorAll('.nav-link')

    const handleScroll = () => {
      const scrollY = window.scrollY + 100

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight
        const sectionId = section.getAttribute('id')

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            link.classList.remove('active')
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active')
            }
          })
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="font-jakarta bg-white">
      {/* Navigation */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-white/96 backdrop-blur-xl border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between px-[60px] h-[68px] max-w-[1440px] mx-auto w-full">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center">
              <img src="/logo.jpeg" alt="AlphaSynth Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-[18px] font-extrabold text-[#1B2A4A] tracking-tight">
              Alpha<span className="text-[#0D7C8C]">Synth</span>
            </span>
          </Link>

          <div className="flex gap-9">
            <a href="#platform" className="nav-link text-[14px] font-medium text-[#718096] hover:text-[#1B2A4A] transition-colors">Platform</a>
            <a href="#pillars" className="nav-link text-[14px] font-medium text-[#718096] hover:text-[#1B2A4A] transition-colors">Six Pillars</a>
            <a href="#deployment" className="nav-link text-[14px] font-medium text-[#718096] hover:text-[#1B2A4A] transition-colors">Deployment</a>
            <a href="#roles" className="nav-link text-[14px] font-medium text-[#718096] hover:text-[#1B2A4A] transition-colors">For Your Team</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <AlphaSynthHero />

      {/* Trust Bar */}
      <div ref={trustBarRef} className="bg-[#1B2A4A] py-5">
        <div className="flex items-center justify-center gap-0 flex-wrap">
          {[
            { icon: <IconLock size={20} style={{ color: '#1B2A4A', stroke: '#1B2A4A' }} />, text: 'Data via Global Data Feed', highlight: 'NSE Certified' },
            { icon: <IconCloud size={20} style={{ color: '#1B2A4A', stroke: '#1B2A4A' }} />, text: 'Deployed into', highlight: 'Your AWS Environment' },
            { icon: <IconScale size={20} style={{ color: '#1B2A4A', stroke: '#1B2A4A' }} />, text: 'Maker-Checker Workflow', highlight: 'SEBI Compliant' },
            { icon: <IconNumbers size={20} style={{ color: '#1B2A4A', stroke: '#1B2A4A' }} />, text: '— Every Number Calculated', highlight: 'Zero Hallucinations' },
            { icon: <IconShield size={20} style={{ color: '#1B2A4A', stroke: '#1B2A4A' }} />, text: 'Source Code in', highlight: 'Independent Escrow' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 px-9 py-2 border-r border-white/12 last:border-r-0">
              <span className="bg-white rounded-lg p-2 flex items-center justify-center">{item.icon}</span>
              <span className="text-[13px] font-semibold" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                <span style={{ color: '#FFFFFF' }}>{item.highlight}</span> {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Problem Section */}
      <AlphaSynthScrollSection
        id="problem"
        subtitle="The Problem We Solve"
        title="Indian equity research deserves better infrastructure."
        description="The tools used by most research teams today are fragmented, generic, and dangerously dependent on data that cannot be verified at the point of use."
      >
        <div className="grid grid-cols-3 gap-8 mt-16">
          {[
            { num: '01', title: 'Fragmented Workflows', desc: 'Analysts toggle between Excel models, third-party charting platforms, BSE filing portals, and chat threads for every single research note.' },
            { num: '02', title: 'AI That Invents Numbers', desc: 'Generic AI tools will confidently quote a company\'s P/E ratio, ROE, or target price — with no source, no formula, and no guarantee of accuracy.' },
            { num: '03', title: 'No Compliance Architecture', desc: 'SEBI Research Analyst Regulations require conflict-of-interest disclosures, maker-checker workflows, and audit trails.' },
          ].map((card, idx) => (
            <div key={idx} className="fade-in-item bg-white border border-[#E2E8F0] rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8C1A1A] to-[#C0392B]" />
              <div className="text-5xl font-extrabold text-[#EEF2F7] font-mono mb-4">{card.num}</div>
              <h3 className="text-[18px] font-bold text-[#1B2A4A] mb-3">{card.title}</h3>
              <p className="text-[14px] text-[#718096] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </AlphaSynthScrollSection>

      {/* Differentiators Section */}
      <AlphaSynthScrollSection
        id="platform"
        bgColor="bg-[#F8F9FB]"
        subtitle="Why AlphaSynth"
        title="Five decisions that make this platform different."
        description="These are not features. They are architectural commitments — choices that cannot be quietly removed in a future update."
      >
        <div className="grid grid-cols-3 gap-7 mt-16">
          {[
            { icon: <IconNumbers size={24} style={{ color: '#2E4D8E', stroke: '#2E4D8E' }} />, title: 'Deterministic Calculation Engine', desc: 'Every ratio, score, attribution figure, and VaR estimate is computed by a versioned Python formula library.', tag: 'Zero Hallucination Guarantee', bgIcon: 'bg-white' },
            { icon: <IconGlobe size={24} style={{ color: '#0D7C8C', stroke: '#0D7C8C' }} />, title: 'Built for India, Not Adapted for It', desc: 'AlphaSynth is built ground-up for NSE and BSE — not a global platform retrofitted for Indian data.', tag: 'NSE Certified Data', bgIcon: 'bg-white' },
            { icon: <IconShield size={24} style={{ color: '#B8860B', stroke: '#B8860B' }} />, title: 'Your Data Never Leaves Your Environment', desc: 'AlphaSynth is deployed directly into your AWS account using Infrastructure as Code.', tag: 'AWS Client Deployment', bgIcon: 'bg-white' },
            { icon: <IconScale size={24} style={{ color: '#1A6B3A', stroke: '#1A6B3A' }} />, title: 'Compliance Is Not an Add-On', desc: 'The SEBI RA Regulations 2014 maker-checker workflow is a first-class feature, not a checkbox.', tag: 'SEBI RA Compliant', bgIcon: 'bg-white' },
            { icon: <IconBriefcase size={24} style={{ color: '#0D7C8C', stroke: '#0D7C8C' }} />, title: 'AI That Knows What It Doesn\'t Know', desc: 'AlphaSynth uses Claude (Anthropic) and Perplexity for narrative intelligence — never for numbers.', tag: 'Grounded AI Layer', bgIcon: 'bg-white' },
            { icon: <IconTarget size={24} style={{ color: '#2E4D8E', stroke: '#2E4D8E' }} />, title: 'Guided Research, Not Just Data', desc: 'A contextual suggestion engine watches where you are in the research workflow and nudges you deeper.', tag: 'Guided Intelligence', bgIcon: 'bg-white' },
          ].map((card, idx) => (
            <div key={idx} className="fade-in-item bg-white border border-[#E2E8F0] rounded-2xl p-8 hover:shadow-[0_16px_48px_rgba(27,42,74,0.1)] hover:border-[#0D7C8C] transition-all duration-300 cursor-default">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${card.bgIcon}`}>{card.icon}</div>
              <h3 className="text-[17px] font-bold text-[#1B2A4A] mb-2">{card.title}</h3>
              <p className="text-[14px] text-[#718096] leading-relaxed mb-4">{card.desc}</p>
              <div className="inline-block text-[10px] font-bold text-[#0D7C8C] bg-[#E0F4F6] px-2 py-1 rounded uppercase tracking-wide">{card.tag}</div>
            </div>
          ))}
        </div>
      </AlphaSynthScrollSection>

      {/* Six Pillars Section */}
      <AlphaSynthScrollSection
        id="pillars"
        bgColor="bg-[#1B2A4A]"
        isDark
        subtitle="The Analytical Framework"
        title="Six pillars. One score. Complete conviction."
        description="Most platforms give you one lens — fundamental or technical. AlphaSynth synthesises six independent analytical dimensions into a single composite score."
      >
        <div ref={pillarsRef} className="grid grid-cols-6 gap-4 mt-16">
          {[
            { num: '01', icon: <IconChartBar size={28} style={{ color: '#1B2A4A', stroke: '#1B2A4A' }} />, name: 'Fundamental', desc: 'E-I-C framework. 27 financial ratios. DCF, SOTP, relative valuation.' },
            { num: '02', icon: <IconTrendingUp size={28} style={{ color: '#1B2A4A', stroke: '#1B2A4A' }} />, name: 'Technical', desc: '12 institutional combination strategies. Elliott Wave. Harmonic patterns.' },
            { num: '03', icon: <IconGlobe size={28} style={{ color: '#1B2A4A', stroke: '#1B2A4A' }} />, name: 'Macroeconomic', desc: 'GDP, inflation, RBI policy, fiscal deficit, FII/DII flows.' },
            { num: '04', icon: <IconMessage size={28} style={{ color: '#1B2A4A', stroke: '#1B2A4A' }} />, name: 'Sentiment', desc: '20-factor model. News NLP. FII behaviour. Put/call ratios.' },
            { num: '05', icon: <IconBolt size={28} style={{ color: '#1B2A4A', stroke: '#1B2A4A' }} />, name: 'Earnings Momentum', desc: 'Consensus EPS revisions. Beat/miss streak. PEG ratio.' },
            { num: '06', icon: <IconShield size={28} style={{ color: '#1B2A4A', stroke: '#1B2A4A' }} />, name: 'Geopolitical', desc: 'Active conflict risk. Supply chain disruption scoring.' },
          ].map((pillar, idx) => (
            <div key={idx} className="fade-in-item bg-white/6 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 hover:border-[#0D7C8C]/50 transition-all duration-300 cursor-default">
              <div className="text-[10px] font-bold uppercase tracking-widest mb-3 font-mono pillar-num">Pillar {pillar.num}</div>
              <div className="mb-3 flex justify-center">
                <div className="bg-white rounded-xl p-3 inline-flex items-center justify-center">
                  {pillar.icon}
                </div>
              </div>
              <h4 className="text-[14px] font-bold mb-2 pillar-name">{pillar.name}</h4>
              <p className="text-[12px] leading-relaxed pillar-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Score Showcase */}
        <div className="flex items-center justify-center gap-6 mt-16 flex-wrap">
          {[
            { num: '84', label: 'FUNDAMENTAL', color: 'border-[#FFFFFF] bg-[rgba(13,124,140,0.2)]' },
            { num: '72', label: 'TECHNICAL', color: 'border-[#FFFFFF] bg-[rgba(13,124,140,0.2)]' },
            { num: '61', label: 'MACRO', color: 'border-[#D4A017] bg-[rgba(184,134,11,0.2)]' },
            { num: '78', label: 'SENTIMENT', color: 'border-[#FFFFFF] bg-[rgba(13,124,140,0.2)]' },
            { num: '65', label: 'EARNINGS', color: 'border-[#D4A017] bg-[rgba(184,134,11,0.2)]' },
            { num: '80', label: 'GEOPOLITICAL', color: 'border-[#FFFFFF] bg-[rgba(13,124,140,0.2)]' },
          ].map((score, idx) => (
            <div key={idx}>
              <div className={`w-20 h-20 rounded-full border-2 ${score.color} flex flex-col items-center justify-center font-mono`}>
                <div className="text-2xl font-bold score-number">{score.num}</div>
                <div className="text-[9px] mt-1 score-label">{score.label}</div>
              </div>
            </div>
          ))}
          <div className="text-2xl font-light score-equals">=</div>
          <div className="bg-gradient-to-br from-[#0D7C8C] to-[#0A9CAF] rounded-2xl px-8 py-6 text-center">
            <div className="text-5xl font-extrabold font-mono score-final-number">74</div>
            <div className="text-[12px] mt-2 uppercase tracking-widest score-final-label">AlphaSynth Score</div>
            <div className="text-[14px] font-bold bg-white/15 px-3 py-1 rounded mt-3 inline-block score-final-badge">STRONG BUY</div>
          </div>
        </div>
      </AlphaSynthScrollSection>

      {/* CTA Section */}
      <section id="cta" className="py-32 text-center">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="text-[11px] font-bold text-[#0D7C8C] uppercase tracking-widest mb-4">Get Started</div>
          <h2 className="text-[48px] font-extrabold text-[#1B2A4A] tracking-tight mb-6">
            Ready to build the research<br />infrastructure you deserve?
          </h2>
          <p className="text-[17px] text-[#718096] max-w-[700px] mx-auto mb-12 leading-relaxed">
            AlphaSynth is available for pilot deployment to select Indian investment firms. Onboarding takes two to four weeks. Your team is productive from day one.
          </p>
          <div className="flex gap-5 justify-center flex-wrap mb-6">
            <button className="font-bold px-9 py-4 rounded-xl transition-all shadow-[0_4px_24px_rgba(27,42,74,0.25)] hover:shadow-[0_8px_40px_rgba(27,42,74,0.3)] hover:-translate-y-0.5 whitespace-nowrap bg-[#1B2A4A] text-white">Request a Demo</button>
            <button className="font-bold px-9 py-4 rounded-xl transition-all shadow-[0_4px_24px_rgba(27,42,74,0.25)] hover:shadow-[0_8px_40px_rgba(27,42,74,0.3)] hover:-translate-y-0.5 whitespace-nowrap bg-[#1B2A4A] text-white">Download Platform Overview</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerRef} className="bg-[#1B2A4A] py-16">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="grid grid-cols-4 gap-16 mb-12">
            <div>
              <div className="text-[22px] font-extrabold mb-4 text-white">
                Alpha<span className="text-[#FFFFFF]">Synth</span>
              </div>
              <p className="text-[14px] leading-relaxed mb-5 max-w-[280px] text-white/65">
                Investment intelligence platform for India's equity professionals. NSE-certified data. Deterministic calculations. Zero hallucinations.
              </p>
            </div>
            {[
              { title: 'Platform', links: ['Discover & Screen', 'Market Intelligence', 'Company Research', 'Technical Analysis', 'Portfolio Management'] },
              { title: 'Company', links: ['About Intellectus AI Labs', 'Architecture Overview', 'Security & Compliance', 'Code Escrow Policy', 'Careers'] },
              { title: 'Legal', links: ['Terms of Service', 'Privacy Policy', 'SEBI RA Disclosure', 'Data Processing Agreement', 'Contact'] },
            ].map((col, idx) => (
              <div key={idx}>
                <div className="text-[12px] font-bold uppercase tracking-widest mb-5 text-white/70">{col.title}</div>
                <ul className="space-y-2.5">
                  {col.links.map((link, lidx) => (
                    <li key={lidx}>
                      <a href="#" className="text-[14px] transition-colors hover:text-white text-white/75">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/8 pt-7 flex justify-between items-center">
            <p className="text-[13px] text-white/55">© 2025 Intellectus AI Labs Pvt. Ltd. AlphaSynth is a registered product. All calculations are deterministic and verifiable.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
