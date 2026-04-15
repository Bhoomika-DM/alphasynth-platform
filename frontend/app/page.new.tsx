'use client'

import { useState } from 'react'
import Link from 'next/link'
import { IconShield, IconUsers, IconBolt, IconArrowRight } from '@tabler/icons-react'
import Intro from '@/components/intro/Intro'

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true)

  if (showIntro) {
    return <Intro onComplete={() => setShowIntro(false)} />
  }

  return (
    <main className="relative min-h-screen bg-[#F8F9FB]">
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-8 py-6">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="relative w-8 h-8">
                <img 
                  src="/logo.jpeg" 
                  alt="AlphaSynth Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[24px] font-semibold">
                <span className="text-[#2E4D8E]">Alpha</span>
                <span className="text-[#2D3748]">Synth</span>
              </span>
            </div>
            <div className="text-[9px] text-[#718096] tracking-[0.15em] uppercase pl-11">
              Powered by Intellectus AI Labs
            </div>
          </div>

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {['Markets', 'Platforms', 'About Us', 'Partnerships'].map((link) => (
              <Link
                key={link}
                href="#"
                className="text-[#718096] hover:text-[#2D3748] text-[16px] font-medium transition-all duration-200 relative group"
              >
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#2E4D8E] group-hover:w-full transition-all duration-200" />
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <button className="flex items-center gap-2 text-[#718096] hover:text-[#2D3748] text-[16px] transition-colors duration-200">
              <span className="w-4 h-4 rounded-full bg-[#0D7C8C]"></span>
              <span>EN</span>
            </button>

            {/* Login Button */}
            <Link
              href="/signin"
              className="px-6 py-2 text-[16px] font-semibold text-[#2D3748] border-2 border-[#0D7C8C] hover:border-[#2E4D8E] rounded-[10px] transition-all duration-200"
            >
              Login
            </Link>

            {/* Sign Up Button */}
            <Link
              href="/signup"
              className="px-7 py-2 text-[16px] font-semibold text-white bg-[#2E4D8E] rounded-[10px] transition-all duration-200 hover:scale-[1.02] shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-20">
          {/* Main Heading */}
          <h1 className="text-center mb-6 max-w-5xl">
            <div className="text-[64px] md:text-[72px] lg:text-[80px] font-bold text-[#2D3748] leading-[1.1]">
              Trade Smarter with
            </div>
            <div className="text-[64px] md:text-[72px] lg:text-[80px] font-bold leading-[1.1] mt-2 text-[#2E4D8E]">
              AI Precision
            </div>
          </h1>

          {/* Subtext */}
          <p className="text-center text-[#718096] text-[20px] max-w-2xl mb-12 leading-relaxed">
            AI-powered insights across Forex, Stocks, Crypto, and more.
          </p>

          {/* CTA Button */}
          <Link
            href="/signup"
            className="inline-flex items-center gap-3 px-10 py-4 text-[16px] font-semibold text-white bg-[#2E4D8E] rounded-[10px] transition-all duration-200 hover:scale-[1.02] shadow-[0_8px_24px_rgba(106,153,78,0.2)]"
          >
            <span>Get Started</span>
            <IconArrowRight className="w-[22px] h-[22px]" stroke={1.5} />
          </Link>

          {/* Trust Indicators */}
          <div className="flex items-center gap-6 mt-16 text-[14px] text-[#718096]">
            <div className="flex items-center gap-2">
              <IconShield className="w-[22px] h-[22px] text-[#2E4D8E]" stroke={1.5} />
              <span>Regulated & Secure</span>
            </div>
            <span className="text-[#0D7C8C]">•</span>
            <div className="flex items-center gap-2">
              <IconUsers className="w-[22px] h-[22px] text-[#2E4D8E]" stroke={1.5} />
              <span>10K+ Active Traders</span>
            </div>
            <span className="text-[#0D7C8C]">•</span>
            <div className="flex items-center gap-2">
              <IconBolt className="w-[22px] h-[22px] text-[#2E4D8E]" stroke={1.5} />
              <span>AI-Powered</span>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full">
            {[
              {
                title: 'Real-Time Analysis',
                description: 'Get instant AI-powered market insights',
                icon: IconBolt
              },
              {
                title: 'Multi-Asset Support',
                description: 'Trade Forex, Stocks, Crypto & more',
                icon: IconUsers
              },
              {
                title: 'Secure & Regulated',
                description: 'Bank-level security & compliance',
                icon: IconShield
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-[#0D7C8C] rounded-[14px] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-200 hover:scale-[1.02]"
              >
                <feature.icon className="w-[32px] h-[32px] text-[#2E4D8E] mb-4" stroke={1.5} />
                <h3 className="text-[20px] font-semibold text-[#2D3748] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[14px] text-[#718096]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="py-8 px-8 border-t border-[#0D7C8C]">
          <div className="flex items-center justify-between text-[14px] text-[#718096]">
            <div>© 2026 AlphaSynth. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-[#2D3748] transition-colors duration-200">
                Privacy
              </Link>
              <Link href="#" className="hover:text-[#2D3748] transition-colors duration-200">
                Terms
              </Link>
              <Link href="#" className="hover:text-[#2D3748] transition-colors duration-200">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}

