'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import {
  IconLock,
  IconCloud,
  IconScale,
  IconNumbers,
  IconShield,
} from '@tabler/icons-react'

export default function ProfessionalLanding() {
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

    return () => observer.disconnect()
  }, [])

  return (
    <div className="font-jakarta">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
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
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/96 backdrop-blur-xl border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between px-[60px] h-[68px]">
          <Link href="/" className="flex items-center gap-3">
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

          <div className="flex gap-9">
            <a href="#platform" className="text-[14px] font-medium text-[#718096] hover:text-[#1B2A4A] transition-colors">Platform</a>
            <a href="#pillars" className="text-[14px] font-medium text-[#718096] hover:text-[#1B2A4A] transition-colors">Six Pillars</a>
            <a href="#deployment" className="text-[14px] font-medium text-[#718096] hover:text-[#1B2A4A] transition-colors">Deployment</a>
            <a href="#roles" className="text-[14px] font-medium text-[#718096] hover:text-[#1B2A4A] transition-colors">For Your Team</a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/signin" className="text-[14px] font-medium text-[#1B2A4A] px-4 py-2 rounded-md hover:bg-[#EEF2F7] transition-colors">
              Sign in
            </Link>
            <Link href="#cta" className="text-[14px] font-semibold text-white bg-[#1B2A4A] px-6 py-2.5 rounded-lg hover:bg-[#243756] transition-all shadow-[0_2px_8px_rgba(27,42,74,0.2)]">
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
                <Link href="#cta" className="text-[15px] font-bold text-white bg-[#1B2A4A] px-7 py-3.5 rounded-lg hover:bg-[#243756] transition-all shadow-[0_4px_20px_rgba(27,42,74,0.25)]">
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
            
            {/* Dashboard Preview - Placeholder */}
            <div className="bg-white rounded-2xl shadow-[0_24px_80px_rgba(27,42,74,0.12)] border border-[#E2E8F0] overflow-hidden">
              <div className="bg-[#1B2A4A] px-5 py-3.5 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                <span className="text-[12px] text-white/50 ml-2 font-mono">AlphaSynth · Quality Compounders</span>
              </div>
              <div className="p-5">
                <div className="text-[11px] font-bold text-[#718096] uppercase tracking-wide mb-4">Top Stocks</div>
                {[
                  { name: 'ASIAN PAINTS', sector: 'Consumer Goods', score: 88 },
                  { name: 'HDFC BANK', sector: 'Banking', score: 82 },
                  { name: 'PIDILITE IND', sector: 'Chemicals', score: 76 }
                ].map((stock, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 border-b border-[#E2E8F0] last:border-0">
                    <span className="text-[12px] font-semibold text-[#718096] w-6">{i + 1}</span>
                    <div className="flex-1">
                      <div className="text-[13px] font-bold text-[#1B2A4A]">{stock.name}</div>
                      <div className="text-[11px] text-[#718096]">{stock.sector}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 w-16 bg-[#EEF2F7] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#0D7C8C] to-[#0A9CAF] rounded-full" style={{ width: `${stock.score}%` }} />
                      </div>
                      <span className="text-[12px] font-bold text-[#0D7C8C] w-6">{stock.score}</span>
                    </div>
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

      {/* CTA Section */}
      <section id="cta" className="py-30 text-center">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="text-[11px] font-bold text-[#0D7C8C] uppercase tracking-[1.5px] mb-3">Get Started</div>
          <h2 className="text-[48px] font-extrabold text-[#1B2A4A] tracking-tight leading-tight mb-5">
            Ready to build the research<br/>infrastructure you deserve?
          </h2>
          <p className="text-[17px] text-[#718096] max-w-[600px] mx-auto mb-12 leading-relaxed">
            AlphaSynth is available for pilot deployment to select Indian investment firms. Onboarding takes two to four weeks. Your team is productive from day one.
          </p>
          <div className="flex gap-5 justify-center items-center flex-wrap">
            <Link href="/dashboard" className="text-[16px] font-bold text-white bg-[#1B2A4A] px-9 py-4 rounded-xl hover:bg-[#243756] transition-all shadow-[0_4px_24px_rgba(27,42,74,0.25)]">
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
              <p className="text-[14px] text-white/45 leading-relaxed max-w-[280px]">
                Investment intelligence platform for India's equity professionals. NSE-certified data. Deterministic calculations. Zero hallucinations. Deployed in your AWS environment.
              </p>
              <div className="flex gap-3 mt-5">
                <span className="text-[11px] text-white/35 bg-white/5 px-2.5 py-1 rounded border border-white/8">NSE Certified</span>
                <span className="text-[11px] text-white/35 bg-white/5 px-2.5 py-1 rounded border border-white/8">SEBI Compliant</span>
              </div>
            </div>
            
            <div>
              <div className="text-[12px] font-bold text-white/50 uppercase tracking-wide mb-5">Platform</div>
              <div className="flex flex-col gap-2.5">
                <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">Discover & Screen</a>
                <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">Market Intelligence</a>
                <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">Company Research</a>
              </div>
            </div>
            
            <div>
              <div className="text-[12px] font-bold text-white/50 uppercase tracking-wide mb-5">Company</div>
              <div className="flex flex-col gap-2.5">
                <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">About Intellectus AI Labs</a>
                <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">Architecture Overview</a>
                <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">Security & Compliance</a>
              </div>
            </div>
            
            <div>
              <div className="text-[12px] font-bold text-white/50 uppercase tracking-wide mb-5">Legal</div>
              <div className="flex flex-col gap-2.5">
                <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-[14px] text-white/55 hover:text-white transition-colors">Privacy Policy</a>
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
    </div>
  )
}
