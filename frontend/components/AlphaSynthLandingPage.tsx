'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function AlphaSynthLandingPage() {
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

    // Smooth active nav
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
              ;(a as HTMLElement).style.color = '#1B2A4A'
              ;(a as HTMLElement).style.fontWeight = '700'
            } else {
              ;(a as HTMLElement).style.color = ''
              ;(a as HTMLElement).style.fontWeight = ''
            }
          })
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="font-jakarta bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/96 backdrop-blur-[12px] border-b border-[#E2E8F0]">
        <div className="nav-inner">
          <Link href="/" className="logo">
            <div className="logo-mark">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 15L8 9L11 12L16 5" stroke="#0D7C8C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="16" cy="5" r="2" fill="#C9A84C"/>
              </svg>
            </div>
            <span className="logo-text">Alpha<span>Synth</span></span>
          </Link>
          <div className="nav-links">
            <a href="#platform">Platform</a>
            <a href="#pillars">Six Pillars</a>
            <a href="#deployment">Deployment</a>
            <a href="#roles">For Your Team</a>
          </div>
          <div className="nav-cta">
            <Link href="/signin" className="btn-ghost">Sign in</Link>
            <a href="#cta" className="btn-primary">Request Demo</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-eyebrow">NSE Certified · India-First Platform</div>
              <h1>Research that <em>thinks</em><br/>as rigorously<br/>as you do.</h1>
              <p className="hero-sub">AlphaSynth is the investment intelligence platform built for India's equity professionals — where every number is calculated, never guessed, and every insight is earned through evidence.</p>
              <div className="hero-actions">
                <a href="#cta" className="btn-hero">Request a Demo</a>
                <a href="#platform" className="btn-outline">Explore the Platform</a>
              </div>
              <div className="hero-stats">
                <div>
                  <div className="hero-stat-num">6</div>
                  <div className="hero-stat-label">Analytical Pillars</div>
                </div>
                <div>
                  <div className="hero-stat-num">200+</div>
                  <div className="hero-stat-label">Calculations, All Deterministic</div>
                </div>
                <div>
                  <div className="hero-stat-num">0</div>
                  <div className="hero-stat-label">Hallucinated Numbers</div>
                </div>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="hero-visual">
              <div className="dashboard-card">
                <div className="dash-header">
                  <div className="dash-dot" style={{background:'#FF5F56'}}></div>
                  <div className="dash-dot" style={{background:'#FFBD2E'}}></div>
                  <div className="dash-dot" style={{background:'#27C93F'}}></div>
                  <span style={{fontSize:'12px',color:'rgba(255,255,255,0.5)',marginLeft:'10px',fontFamily:'var(--mono)'}}>AlphaSynth · Quality Compounders</span>
                </div>
                <div className="dash-body">
                  <div className="screener-row header">
                    <span>#</span><span>Stock</span><span>AS Score</span><span>P/E</span><span>ROE</span><span>Signal</span>
                  </div>
                  <div className="screener-row">
                    <span className="rank">1</span>
                    <div><div className="stock-name">ASIAN PAINTS</div><div className="stock-sector">Consumer Goods</div></div>
                    <div className="score-bar-wrap"><div className="score-bar-bg"><div className="score-bar-fill" style={{width:'88%'}}></div></div><span className="score-num">88</span></div>
                    <span className="metric">53.2</span><span className="metric green">27.4%</span><span className="pill pill-buy">BUY</span>
                  </div>
                  <div className="screener-row">
                    <span className="rank">2</span>
                    <div><div className="stock-name">HDFC BANK</div><div className="stock-sector">Banking</div></div>
                    <div className="score-bar-wrap"><div className="score-bar-bg"><div className="score-bar-fill" style={{width:'82%'}}></div></div><span className="score-num">82</span></div>
                    <span className="metric">19.1</span><span className="metric green">17.8%</span><span className="pill pill-buy">BUY</span>
                  </div>
                  <div className="screener-row">
                    <span className="rank">3</span>
                    <div><div className="stock-name">PIDILITE IND</div><div className="stock-sector">Chemicals</div></div>
                    <div className="score-bar-wrap"><div className="score-bar-bg"><div className="score-bar-fill" style={{width:'76%'}}></div></div><span className="score-num">76</span></div>
                    <span className="metric">72.4</span><span className="metric green">23.1%</span><span className="pill pill-hold">HOLD</span>
                  </div>
                  <div className="screener-row">
                    <span className="rank">4</span>
                    <div><div className="stock-name">TITAN COMPANY</div><div className="stock-sector">Consumer Goods</div></div>
                    <div className="score-bar-wrap"><div className="score-bar-bg"><div className="score-bar-fill" style={{width:'71%'}}></div></div><span className="score-num">71</span></div>
                    <span className="metric">87.3</span><span className="metric green">22.5%</span><span className="pill pill-hold">HOLD</span>
                  </div>
                </div>
              </div>
              <div className="float-badge">
                <div className="float-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L12.39 7.26L18 8.18L14 12.08L14.97 18L10 15.27L5.03 18L6 12.08L2 8.18L7.61 7.26L10 2Z" fill="#0D7C8C"/></svg>
                </div>
                <div>
                  <div className="float-label">Portfolio Health Score</div>
                  <div className="float-value">74 / 100</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="trust-bar">
        <div className="trust-items">
          <div className="trust-item"><span className="trust-icon">🔐</span><span className="trust-text"><span>NSE Certified</span> Data via Global Data Feed</span></div>
          <div className="trust-item"><span className="trust-icon">☁️</span><span className="trust-text">Deployed into <span>Your AWS Environment</span></span></div>
          <div className="trust-item"><span className="trust-icon">⚖️</span><span className="trust-text"><span>SEBI Compliant</span> Maker-Checker Workflow</span></div>
          <div className="trust-item"><span className="trust-icon">🔢</span><span className="trust-text"><span>Zero Hallucinations</span> — Every Number Calculated</span></div>
          <div className="trust-item"><span className="trust-icon">🔒</span><span className="trust-text">Source Code in <span>Independent Escrow</span></span></div>
        </div>
      </div>

      {/* Problem */}
      <section className="section">
        <div className="container">
          <div className="center fade-up">
            <div className="section-label">The Problem We Solve</div>
            <h2 className="section-title">Indian equity research deserves<br/>better infrastructure.</h2>
            <p className="section-sub">The tools used by most research teams today are fragmented, generic, and dangerously dependent on data that cannot be verified at the point of use.</p>
          </div>
          <div className="problem-grid">
            <div className="problem-card fade-up delay-1">
              <div className="problem-num">01</div>
              <div className="problem-title">Fragmented Workflows</div>
              <p className="problem-text">Analysts toggle between Excel models, third-party charting platforms, BSE filing portals, and chat threads for every single research note. There is no unified workspace where fundamental, technical, macro, and sentiment data converge.</p>
            </div>
            <div className="problem-card fade-up delay-2">
              <div className="problem-num">02</div>
              <div className="problem-title">AI That Invents Numbers</div>
              <p className="problem-text">Generic AI tools will confidently quote a company's P/E ratio, ROE, or target price — with no source, no formula, and no guarantee of accuracy. In investment research, a hallucinated number is not an inconvenience. It is a liability.</p>
            </div>
            <div className="problem-card fade-up delay-3">
              <div className="problem-num">03</div>
              <div className="problem-title">No Compliance Architecture</div>
              <p className="problem-text">SEBI Research Analyst Regulations require conflict-of-interest disclosures, maker-checker workflows, and audit trails. Most platforms treat these as afterthoughts. AlphaSynth treats them as architecture.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="section section-alt" id="platform">
        <div className="container">
          <div className="center fade-up">
            <div className="section-label">Why AlphaSynth</div>
            <h2 className="section-title">Five decisions that make<br/>this platform different.</h2>
            <p className="section-sub">These are not features. They are architectural commitments — choices that cannot be quietly removed in a future update.</p>
          </div>
          <div className="diff-grid">
            <div className="diff-card fade-up delay-1">
              <div className="diff-icon navy-bg">🔢</div>
              <div className="diff-title">Deterministic Calculation Engine</div>
              <p className="diff-text">Every ratio, score, attribution figure, and VaR estimate is computed by a versioned Python formula library. Same inputs, same outputs, always. The engine is separate from the AI layer — they cannot interact. Change a formula and the version increments; all downstream calculations rerun automatically.</p>
              <div className="diff-tag">Zero Hallucination Guarantee</div>
            </div>
            <div className="diff-card fade-up delay-2">
              <div className="diff-icon teal-bg">🇮🇳</div>
              <div className="diff-title">Built for India, Not Adapted for It</div>
              <p className="diff-text">AlphaSynth is built ground-up for NSE and BSE — not a global platform retrofitted for Indian data. NSE-certified data from Global Data Feed. SEBI regulatory workflows. Nifty 50, Bank Nifty, and all 12 sector indices. Indian corporate governance standards, IndAS accounting, and CRISIL/ICRA credit frameworks.</p>
              <div className="diff-tag">NSE Certified Data</div>
            </div>
            <div className="diff-card fade-up delay-3">
              <div className="diff-icon gold-bg">🏛️</div>
              <div className="diff-title">Your Data Never Leaves Your Environment</div>
              <p className="diff-text">AlphaSynth is deployed directly into your AWS account using Infrastructure as Code. You own the infrastructure. You hold the encryption keys. Intellectus AI Labs operates the software — your portfolio data, research notes, and proprietary models never transit our servers. True data sovereignty for financial institutions.</p>
              <div className="diff-tag">AWS Client Deployment</div>
            </div>
            <div className="diff-card fade-up delay-1">
              <div className="diff-icon green-bg">⚖️</div>
              <div className="diff-title">Compliance Is Not an Add-On</div>
              <p className="diff-text">The SEBI RA Regulations 2014 maker-checker workflow is a first-class feature, not a checkbox. Every recommendation goes through mandatory conflict-of-interest disclosure, Checker review with historical accuracy data, and an immutable audit trail. Seven-year data retention, cryptographically hashed log chains, and downloadable compliance reports.</p>
              <div className="diff-tag">SEBI RA Compliant</div>
            </div>
            <div className="diff-card fade-up delay-2">
              <div className="diff-icon teal-bg">🤖</div>
              <div className="diff-title">AI That Knows What It Doesn't Know</div>
              <p className="diff-text">AlphaSynth uses Claude (Anthropic) and Perplexity for narrative intelligence — never for numbers. Every LLM response is grounded in pre-computed, verified data. If data is unavailable, the platform says so. "Insufficient data for this analysis" is a valid and respected answer. The alternative — confident fiction — is not acceptable here.</p>
              <div className="diff-tag">Grounded AI Layer</div>
            </div>
            <div className="diff-card fade-up delay-3">
              <div className="diff-icon navy-bg">🎯</div>
              <div className="diff-title">Guided Research, Not Just Data</div>
              <p className="diff-text">A contextual suggestion engine watches where you are in the research workflow and nudges you deeper. "You have completed the P&L analysis. The Operating Cash Flow / PAT ratio is 0.62 — below sector median. Would you like to examine the working capital quality?" AlphaSynth improves the analyst, not just the output.</p>
              <div className="diff-tag">Guided Intelligence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Six Pillars */}
      <section className="pillars-wrap" id="pillars">
        <div className="container">
          <div className="center fade-up">
            <div className="section-label">The Analytical Framework</div>
            <h2 className="section-title">Six pillars. One score.<br/>Complete conviction.</h2>
            <p className="section-sub">Most platforms give you one lens — fundamental or technical. AlphaSynth synthesises six independent analytical dimensions into a single composite score that captures the full picture.</p>
          </div>
          <div className="pillar-grid">
            <div className="pillar-card fade-up delay-1">
              <div className="pillar-num">Pillar 01</div>
              <span className="pillar-icon">📊</span>
              <div className="pillar-name">Fundamental</div>
              <p className="pillar-desc">E-I-C framework. 27 financial ratios. DCF, SOTP, relative valuation. Forensic accounting. DuPont decomposition.</p>
            </div>
            <div className="pillar-card fade-up delay-2">
              <div className="pillar-num">Pillar 02</div>
              <span className="pillar-icon">📈</span>
              <div className="pillar-name">Technical</div>
              <p className="pillar-desc">12 institutional combination strategies. Elliott Wave. Harmonic patterns. 20+ indicators across all timeframes.</p>
            </div>
            <div className="pillar-card fade-up delay-3">
              <div className="pillar-num">Pillar 03</div>
              <span className="pillar-icon">🌏</span>
              <div className="pillar-name">Macroeconomic</div>
              <p className="pillar-desc">GDP, inflation, RBI policy, fiscal deficit, FII/DII flows, currency, and global index correlation — all scored.</p>
            </div>
            <div className="pillar-card fade-up delay-1">
              <div className="pillar-num">Pillar 04</div>
              <span className="pillar-icon">💬</span>
              <div className="pillar-name">Sentiment</div>
              <p className="pillar-desc">20-factor model. News NLP. FII behaviour. Put/call ratios. Social signal intensity. Geopolitical risk index.</p>
            </div>
            <div className="pillar-card fade-up delay-2">
              <div className="pillar-num">Pillar 05</div>
              <span className="pillar-icon">⚡</span>
              <div className="pillar-name">Earnings Momentum</div>
              <p className="pillar-desc">Consensus EPS revisions over 30/60/90 days. Beat/miss streak. Management guidance tracker. PEG ratio.</p>
            </div>
            <div className="pillar-card fade-up delay-3">
              <div className="pillar-num">Pillar 06</div>
              <span className="pillar-icon">🛡️</span>
              <div className="pillar-name">Geopolitical</div>
              <p className="pillar-desc">Active conflict risk. Supply chain disruption scoring. Commodity cycle overlay. Sector-specific exposure matrix.</p>
            </div>
          </div>

          {/* Score synthesis visual */}
          <div className="score-showcase fade-up mt-48">
            <div className="score-circle sc-high"><span className="score-circle-num">84</span><span className="score-circle-lbl">FUNDAMENTAL</span></div>
            <span className="arrow-right">+</span>
            <div className="score-circle sc-high"><span className="score-circle-num">72</span><span className="score-circle-lbl">TECHNICAL</span></div>
            <span className="arrow-right">+</span>
            <div className="score-circle sc-mid"><span className="score-circle-num">61</span><span className="score-circle-lbl">MACRO</span></div>
            <span className="arrow-right">+</span>
            <div className="score-circle sc-high"><span className="score-circle-num">78</span><span className="score-circle-lbl">SENTIMENT</span></div>
            <span className="arrow-right">+</span>
            <div className="score-circle sc-mid"><span className="score-circle-num">65</span><span className="score-circle-lbl">EARNINGS</span></div>
            <span className="arrow-right">+</span>
            <div className="score-circle sc-high"><span className="score-circle-num">80</span><span className="score-circle-lbl">GEOPOLITICAL</span></div>
            <span className="arrow-right" style={{fontSize:'28px',fontWeight:'300'}}>=</span>
            <div className="composite-score">
              <div className="composite-num">74</div>
              <div className="composite-label">AlphaSynth Score</div>
              <div className="composite-rec">STRONG BUY</div>
            </div>
          </div>
          <p className="pillar-note">Each pillar is scored 0–100 independently. The composite score is a <strong>weighted synthesis</strong> — not an average. Pillar weights are calibrated to the prevailing market regime.</p>
        </div>
      </section>

      {/* Platform Features */}
      <section className="section">
        <div className="container">
          <div className="center fade-up">
            <div className="section-label">The Platform</div>
            <h2 className="section-title">Six modules. One workspace.</h2>
            <p className="section-sub">Every module is purpose-built for the equity research workflow — from the first idea to the published recommendation.</p>
          </div>

          {/* Feature 1: Discover & Screen */}
          <div className="mt-60 feature-block fade-up">
            <div>
              <div className="feature-label">Section I</div>
              <h3 className="feature-title">Discover &amp; Screen</h3>
              <p className="feature-sub">Seven precision-engineered screener models surface high-conviction opportunities from the NSE universe. Stop scrolling through 5,000 stocks. Let the engine find what matches your thesis.</p>
              <ul className="feature-list">
                <li><span><strong>Quality Compounders</strong> — ROE &gt;15%, low debt, consistent earnings growth, strong moat. The Buffett-style compounder screen.</span></li>
                <li><span><strong>Deep Value</strong> — Stocks trading at a &gt;30% margin of safety to their Graham number. Undervalued and overlooked.</span></li>
                <li><span><strong>Growth Leaders</strong> — Revenue and PAT CAGR &gt;20%. High-growth businesses in secular tailwind sectors.</span></li>
                <li><span><strong>Momentum Leaders, Multibagger Early, Low Risk Alpha</strong> — Three more models for three distinct mandates.</span></li>
                <li><span><strong>Custom Scan Builder</strong> — Type "ROE above 15% and PE below 20" in plain English. AI converts to filters. Save, schedule, and alert.</span></li>
              </ul>
              <div className="tag-row">
                <span className="tag teal">Institutional Intent Scans</span>
                <span className="tag teal">Chart Pattern Detection</span>
                <span className="tag teal">IPO Analysis</span>
                <span className="tag teal">Big Bull Tracker</span>
              </div>
            </div>
            <div className="feature-visual">
              <div className="fv-header">
                <div className="fv-dot" style={{background:'#FF5F56'}}></div>
                <div className="fv-dot" style={{background:'#FFBD2E'}}></div>
                <div className="fv-dot" style={{background:'#27C93F'}}></div>
                <span style={{fontSize:'11px',color:'rgba(255,255,255,0.4)',marginLeft:'8px',fontFamily:'var(--mono)'}}>Six-Pillar Radar · ASIAN PAINTS</span>
              </div>
              <div className="fv-body">
                <div className="fv-title">Research Depth Score — 72%</div>
                <div className="radar-wrap">
                  <div className="radar-item"><span className="radar-label">Fundamental</span><div className="radar-bar"><div className="radar-fill" style={{width:'84%',background:'linear-gradient(90deg,#0D7C8C,#0A9CAF)'}}></div></div><span className="radar-score">84</span></div>
                  <div className="radar-item"><span className="radar-label">Technical</span><div className="radar-bar"><div className="radar-fill" style={{width:'72%',background:'linear-gradient(90deg,#0D7C8C,#0A9CAF)'}}></div></div><span className="radar-score">72</span></div>
                  <div className="radar-item"><span className="radar-label">Macroeconomic</span><div className="radar-bar"><div className="radar-fill" style={{width:'61%',background:'linear-gradient(90deg,#B8860B,#D4A017)'}}></div></div><span className="radar-score">61</span></div>
                  <div className="radar-item"><span className="radar-label">Sentiment</span><div className="radar-bar"><div className="radar-fill" style={{width:'78%',background:'linear-gradient(90deg,#0D7C8C,#0A9CAF)'}}></div></div><span className="radar-score">78</span></div>
                  <div className="radar-item"><span className="radar-label">Earnings Mom.</span><div className="radar-bar"><div className="radar-fill" style={{width:'65%',background:'linear-gradient(90deg,#B8860B,#D4A017)'}}></div></div><span className="radar-score">65</span></div>
                  <div className="radar-item"><span className="radar-label">Geopolitical</span><div className="radar-bar"><div className="radar-fill" style={{width:'80%',background:'linear-gradient(90deg,#0D7C8C,#0A9CAF)'}}></div></div><span className="radar-score">80</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="divider mt-60" style={{marginBottom:'60px'}}></div>

          {/* Feature 2: Market Intelligence */}
          <div className="feature-block fade-up" style={{direction:'rtl'}}>
            <div style={{direction:'ltr'}}>
              <div className="feature-label">Section II</div>
              <h3 className="feature-title">Market Intelligence</h3>
              <p className="feature-sub">Every great stock idea lives inside a market context. AlphaSynth builds that context before you even open a company page — so you know whether the tide is with you or against you.</p>
              <ul className="feature-list">
                <li><span><strong>Index Breadth Analytics</strong> — Advance/Decline, % constituents above 200-DMA, Dow Theory confirmations across all 12 Nifty sectors.</span></li>
                <li><span><strong>Delivery Volume Intelligence</strong> — Institutional vs. speculative activity at a glance. Unusual delivery spikes flagged before the breakout.</span></li>
                <li><span><strong>Economic Analysis (E-I-C Framework)</strong> — GDP, inflation, RBI rate decisions, fiscal deficit, FPI flows — synthesised into an economic scorecard.</span></li>
                <li><span><strong>Sector Deep-Dives</strong> — 12 Nifty sectors, 64 sector-specific KPIs, Porter's Five Forces, PESTLE, BCG, SCP. Industry attractiveness scored 1–35.</span></li>
                <li><span><strong>Earnings Dashboard</strong> — Market-wide results season tracker. Net revision ratio. Sector-wise earnings quality ranking.</span></li>
              </ul>
              <div className="tag-row">
                <span className="tag teal">20-Factor Sentiment Model</span>
                <span className="tag teal">Macro Regime Alerts</span>
                <span className="tag teal">FII/DII Monitor</span>
              </div>
            </div>
            <div style={{direction:'ltr'}} className="feature-visual">
              <div className="fv-header">
                <div className="fv-dot" style={{background:'#FF5F56'}}></div>
                <div className="fv-dot" style={{background:'#FFBD2E'}}></div>
                <div className="fv-dot" style={{background:'#27C93F'}}></div>
                <span style={{fontSize:'11px',color:'rgba(255,255,255,0.4)',marginLeft:'8px',fontFamily:'var(--mono)'}}>Market Intelligence · Live</span>
              </div>
              <div className="fv-body">
                <div className="metric-row"><span className="metric-key">Nifty 50 Breadth</span><span className="metric-val pos">68% above 200-DMA</span></div>
                <div className="metric-row"><span className="metric-key">Advance / Decline</span><span className="metric-val pos">1,847 / 623</span></div>
                <div className="metric-row"><span className="metric-key">Net Revision Ratio</span><span className="metric-val pos">0.71 — Optimistic</span></div>
                <div className="metric-row"><span className="metric-key">FII Flow (30-day)</span><span className="metric-val pos">+₹12,400 Cr Net Buy</span></div>
                <div className="metric-row"><span className="metric-key">India VIX</span><span className="metric-val">13.4 — Low Fear</span></div>
                <div className="metric-row"><span className="metric-key">Macro Regime</span><span className="metric-val pos">EXPANSION</span></div>
                <div className="metric-row"><span className="metric-key">Economic Scorecard</span><span className="metric-val pos">Favourable (5/7)</span></div>
                <div style={{marginTop:'16px',padding:'12px',background:'var(--teal-l)',borderRadius:'8px',fontSize:'12px',color:'var(--teal)',fontWeight:'600'}}>
                  💡 Guided Insight: Broad-based bull with positive FII flows. Cyclical sectors historically outperform in this regime. 3 of your watchlist stocks are in leading sectors.
                </div>
              </div>
            </div>
          </div>

          <div className="divider mt-60" style={{marginBottom:'60px'}}></div>

          {/* Feature 3: Company Research */}
          <div className="feature-block fade-up">
            <div>
              <div className="feature-label">Section III</div>
              <h3 className="feature-title">Company &amp; Fundamental Research</h3>
              <p className="feature-sub">The deepest layer. From business model to balance sheet to valuation — every number calculated, every assumption visible, every conclusion traceable.</p>
              <ul className="feature-list">
                <li><span><strong>Full E-I-C Framework</strong> — Economy → Industry → Company analysis with structured templates and AI-assisted narrative generation grounded in your calculations.</span></li>
                <li><span><strong>27-Ratio Suite</strong> — Profitability, returns, leverage, liquidity, efficiency, valuation. DuPont 5-factor decomposition. Peer comparison ranked within sector.</span></li>
                <li><span><strong>Valuation Engine</strong> — Multi-scenario DCF (FCFF, FCFE, DDM). SOTP. Relative valuation. WACC from first principles. Terminal value sensitivity matrix.</span></li>
                <li><span><strong>Forensic Accounting</strong> — Beneish M-Score, Piotroski F-Score, Altman Z-Score, Sloan Ratio. Automated red flags before you read a single note.</span></li>
                <li><span><strong>Corporate Actions Tracker</strong> — Dividends, buybacks, rights issues, mergers, demergers. Automatic EPS adjustment. Historical corporate action log.</span></li>
              </ul>
            </div>
            <div className="feature-visual">
              <div className="fv-header">
                <div className="fv-dot" style={{background:'#FF5F56'}}></div>
                <div className="fv-dot" style={{background:'#FFBD2E'}}></div>
                <div className="fv-dot" style={{background:'#27C93F'}}></div>
                <span style={{fontSize:'11px',color:'rgba(255,255,255,0.4)',marginLeft:'8px',fontFamily:'var(--mono)'}}>Valuation Engine · HDFC Bank</span>
              </div>
              <div className="fv-body">
                <div className="fv-title">Multi-Model Valuation (FY26E)</div>
                <div className="metric-row"><span className="metric-key">DCF (FCFE, 3-stage)</span><span className="metric-val">₹1,820</span></div>
                <div className="metric-row"><span className="metric-key">DDM (H-Model, g=14%)</span><span className="metric-val">₹1,745</span></div>
                <div className="metric-row"><span className="metric-key">Relative (P/B 2.8×, Peers avg 2.6×)</span><span className="metric-val">₹1,680</span></div>
                <div className="metric-row"><span className="metric-key">Blended Fair Value</span><span className="metric-val pos">₹1,760</span></div>
                <div className="metric-row"><span className="metric-key">Current Market Price</span><span className="metric-val">₹1,612</span></div>
                <div className="metric-row"><span className="metric-key">Margin of Safety</span><span className="metric-val pos">+9.2% Upside</span></div>
                <div className="metric-row"><span className="metric-key">Piotroski F-Score</span><span className="metric-val pos">8 / 9 — Strong</span></div>
              </div>
            </div>
          </div>

          <div className="divider mt-60" style={{marginBottom:'60px'}}></div>

          {/* Feature 4 & 5 combined card row */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'32px'}} className="fade-up">
            <div className="diff-card">
              <div className="feature-label">Section IV</div>
              <h3 className="feature-title" style={{fontSize:'24px'}}>Technical &amp; Quantitative</h3>
              <p className="diff-text" style={{marginBottom:'20px'}}>Institutional-grade technical analysis. Not just charts — strategies. 12 pre-built combination strategies (RSI Divergence + Bollinger Squeeze, Dow Theory + OBV + RSI, and 10 more), each with historical win rates. Backtesting engine with Monte Carlo and walk-forward optimisation. Elliott Wave and Harmonic pattern detection.</p>
              <div className="tag-row">
                <span className="tag teal">12 Combo Strategies</span>
                <span className="tag teal">80-88% Win Rate (Dow Theory)</span>
                <span className="tag teal">Backtesting Engine</span>
              </div>
            </div>
            <div className="diff-card">
              <div className="feature-label">Section V</div>
              <h3 className="feature-title" style={{fontSize:'24px'}}>Forensic &amp; Advanced Analytics</h3>
              <p className="diff-text" style={{marginBottom:'20px'}}>The tools most platforms don't have. Forensic accounting layer catches manipulation before it reaches your model. Sentiment engine runs 20 factors. Red Team Analysis challenges your Buy thesis systematically. Predictive analytics surfaces breakout probability scores and earnings surprise signals.</p>
              <div className="tag-row">
                <span className="tag teal">Beneish M-Score</span>
                <span className="tag teal">Red Team Analysis</span>
                <span className="tag teal">20-Factor Sentiment</span>
              </div>
            </div>
          </div>

          <div className="divider mt-60" style={{marginBottom:'60px'}}></div>

          {/* Feature 6: Portfolio Management */}
          <div className="feature-block fade-up" style={{direction:'rtl'}}>
            <div style={{direction:'ltr'}}>
              <div className="feature-label">Section VI</div>
              <h3 className="feature-title">Portfolio Management<br/>&amp; Risk Analytics</h3>
              <p className="feature-sub">AlphaSynth's portfolio module transforms you from a stock analyst into a portfolio architect — with the tools to manage risk, attribute returns, and rebalance with precision.</p>
              <ul className="feature-list">
                <li><span><strong>Portfolio Health Score (0–100)</strong> — A composite metric across six dimensions: Diversification, Quality, Risk, Momentum, Valuation, and Liquidity. No other Indian platform offers this.</span></li>
                <li><span><strong>Brinson Performance Attribution</strong> — Decompose returns into Allocation Effect, Selection Effect, and Interaction Effect. Know whether your alpha came from sector calls or stock picks.</span></li>
                <li><span><strong>VaR, CVaR &amp; Stress Testing</strong> — Historical, parametric, and Monte Carlo methods. Six pre-built stress scenarios including 2008, 2020, and 2016 demonetisation.</span></li>
                <li><span><strong>Tax-Aware Rebalancing Engine</strong> — Quantitative rebalancing that prioritises LTCG positions, minimises transaction costs, and respects Liquidity Score constraints for illiquid holdings.</span></li>
                <li><span><strong>Fixed Income Analytics</strong> — Portfolio YTM, modified duration, credit rating tracker, and yield curve inversion monitor for multi-asset portfolios.</span></li>
              </ul>
            </div>
            <div style={{direction:'ltr'}} className="feature-visual">
              <div className="fv-header">
                <div className="fv-dot" style={{background:'#FF5F56'}}></div>
                <div className="fv-dot" style={{background:'#FFBD2E'}}></div>
                <div className="fv-dot" style={{background:'#27C93F'}}></div>
                <span style={{fontSize:'11px',color:'rgba(255,255,255,0.4)',marginLeft:'8px',fontFamily:'var(--mono)'}}>Portfolio Dashboard · June 2025</span>
              </div>
              <div className="portfolio-grid">
                <div className="p-metric"><div className="p-metric-label">Portfolio Value</div><div className="p-metric-val">₹4.2Cr</div><div className="p-metric-change up">+18.4% YTD</div></div>
                <div className="p-metric"><div className="p-metric-label">Health Score</div><div className="p-metric-val">74/100</div><div className="p-metric-change up">↑ 6 this month</div></div>
                <div className="p-metric"><div className="p-metric-label">Alpha vs Nifty</div><div className="p-metric-val">+6.4%</div><div className="p-metric-change up">Annualised</div></div>
                <div className="p-metric"><div className="p-metric-label">Portfolio VaR (95%)</div><div className="p-metric-val">-2.8%</div><div className="p-metric-change">1-day 95% conf.</div></div>
              </div>
              <div style={{padding:'0 16px 16px',fontSize:'12px',color:'var(--teal)',background:'var(--teal-l)',margin:'0 20px 20px',borderRadius:'8px',padding:'12px'}}>
                <strong>Rebalancing Alert:</strong> INFY has drifted to 14.2% (target: 8%). Tax-aware sell order suggested: 380 shares (LTCG eligible).
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Zero Hallucination */}
      <section className="zh-section">
        <div className="container">
          <div className="center fade-up">
            <div className="section-label">The Trust Architecture</div>
            <h2 className="section-title">How we guarantee every<br/>number is accurate.</h2>
            <p className="section-sub">The Zero Hallucination Framework is a five-gate sequence that governs every interaction between your data and the AI layer. It is not a feature — it is the architecture.</p>
          </div>
          <div className="zh-grid fade-up mt-48">
            <div className="zh-step">
              <div className="zh-step-num active">G1</div>
              <div className="zh-step-title">Data Presence Check</div>
              <p className="zh-step-text">Does source data exist? If not, the system returns "Insufficient data" — no LLM call is made.</p>
            </div>
            <div className="zh-step">
              <div className="zh-step-num active">G2</div>
              <div className="zh-step-title">Calculation Completion</div>
              <p className="zh-step-text">Pre-computed numbers must be verified by the Deterministic Engine before the AI layer sees them.</p>
            </div>
            <div className="zh-step">
              <div className="zh-step-num active">G3</div>
              <div className="zh-step-title">Structured Prompt Injection</div>
              <p className="zh-step-text">The LLM receives only verified numbers. Template: "The calculated ROE is X. Write an interpretation." It cannot invent.</p>
            </div>
            <div className="zh-step">
              <div className="zh-step-num active">G4</div>
              <div className="zh-step-title">Output Schema Validation</div>
              <p className="zh-step-text">Every numerical claim in the LLM response is cross-checked against pre-computed values. Off-schema responses are rejected.</p>
            </div>
            <div className="zh-step">
              <div className="zh-step-num active">G5</div>
              <div className="zh-step-title">Confidence Scoring</div>
              <p className="zh-step-text">AI outputs a confidence score. Score &lt;3 appends a disclaimer. Low confidence is displayed, not suppressed.</p>
            </div>
          </div>
          <div className="zh-guarantee fade-up">
            <p><em>If AlphaSynth does not have the data to answer a question, it says so.</em><br/>Every number you see has a Calculation ID that traces to a source data row, a formula version, and a timestamp.<br/>This is the standard we hold ourselves to — and the standard your research deserves.</p>
          </div>
        </div>
      </section>

      {/* Deployment */}
      <section className="section section-alt" id="deployment">
        <div className="container">
          <div className="deploy-grid">
            <div>
              <div className="section-label fade-up">Enterprise Deployment</div>
              <h2 className="section-title fade-up">In your environment.<br/>On your terms.</h2>
              <p className="section-sub fade-up">AlphaSynth is not a SaaS platform that holds your data. It deploys into your AWS account using Infrastructure as Code. You own everything. We operate the software.</p>
              <div className="deploy-steps mt-48">
                <div className="deploy-step fade-up delay-1">
                  <div className="step-num">1</div>
                  <div>
                    <div className="step-content-title">You provide your AWS account</div>
                    <p className="step-content-text">Share your AWS Account ID and a designated IAM role. No additional cloud infrastructure to procure — if you have AWS, you are ready.</p>
                  </div>
                </div>
                <div className="deploy-step fade-up delay-2">
                  <div className="step-num">2</div>
                  <div>
                    <div className="step-content-title">We deploy via CDK in under 30 minutes</div>
                    <p className="step-content-text">One command deploys the full AlphaSynth stack — VPC, databases, services, API, and frontend — into your account. Your encryption keys. Your VPC. Your data never transits our servers.</p>
                  </div>
                </div>
                <div className="deploy-step fade-up delay-3">
                  <div className="step-num">3</div>
                  <div>
                    <div className="step-content-title">Updates roll without downtime</div>
                    <p className="step-content-text">New platform versions deploy as rolling updates via your account's CI/CD pipeline. Zero downtime. Full version history. Rollback in one command if needed.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="deploy-visual fade-up">
              <div className="aws-badge">
                <div className="aws-title">Deployment Region</div>
                <div className="aws-value">ap-south-1 (Mumbai)</div>
                <div className="aws-sub">Data sovereignty — all data stays in India</div>
              </div>
              <div className="aws-badge">
                <div className="aws-title">Encryption</div>
                <div className="aws-value">AWS KMS — Customer Managed Keys</div>
                <div className="aws-sub">You hold the keys. We cannot access your data.</div>
              </div>
              <div className="aws-badge">
                <div className="aws-title">Compliance Logs</div>
                <div className="aws-value">7-Year Immutable Audit Trail</div>
                <div className="aws-sub">Cryptographically hashed. SEBI RA Regulation compliant.</div>
              </div>
              <div className="aws-badge">
                <div className="aws-title">Infrastructure as Code</div>
                <div className="aws-value">AWS CDK (TypeScript)</div>
                <div className="aws-sub">Your DevOps team can read, audit, and extend every resource.</div>
              </div>
              <div className="escrow-note"><span>Source code held in independent escrow</span> (NCC Group / Iron Mountain). Release triggered by clearly defined conditions. Your investment in the platform is protected.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="section" id="roles">
        <div className="container">
          <div className="center fade-up">
            <div className="section-label">Built for Your Team</div>
            <h2 className="section-title">Every role has a purpose.<br/>Every action is tracked.</h2>
            <p className="section-sub">AlphaSynth is not one-size-fits-all. Role-based access ensures every member of your team sees exactly what they need — and nothing they shouldn't.</p>
          </div>
          <div className="roles-grid">
            <div className="role-card fade-up delay-1">
              <div className="role-icon">🏦</div>
              <div className="role-title">CIO / Fund Manager</div>
              <div className="role-subtitle">Strategic Oversight</div>
              <p className="role-text">Portfolio-level intelligence, attribution, and risk management. See the health of every portfolio and the quality of every analyst's recommendations — historically verified.</p>
              <div className="role-features">
                <div className="role-feature">Portfolio Health Score across all mandates</div>
                <div className="role-feature">Analyst recommendation accuracy tracking</div>
                <div className="role-feature">Brinson attribution by sector and stock</div>
                <div className="role-feature">VaR, CVaR, and stress test reports</div>
              </div>
            </div>
            <div className="role-card fade-up delay-2">
              <div className="role-icon">🔬</div>
              <div className="role-title">Senior Research Analyst</div>
              <div className="role-subtitle">Checker / Approver</div>
              <p className="role-text">Before approving any recommendation, see the full research trail, the analyst's historical hit rate, and the six-pillar conviction score. Approve, reject, or modify with a full audit trail.</p>
              <div className="role-features">
                <div className="role-feature">Maker-checker approval workflow</div>
                <div className="role-feature">Analyst historical accuracy overlay</div>
                <div className="role-feature">SEBI conflict-of-interest disclosure verification</div>
                <div className="role-feature">One-click report approval with digital signature</div>
              </div>
            </div>
            <div className="role-card fade-up delay-3">
              <div className="role-icon">📝</div>
              <div className="role-title">Research Analyst</div>
              <div className="role-subtitle">Maker / Creator</div>
              <p className="role-text">The full AlphaSynth toolkit — all six sections, guided suggestions, module chatbots, and research report generation. AlphaSynth improves your analysis by nudging you deeper at every step.</p>
              <div className="role-features">
                <div className="role-feature">Full access to all six platform sections</div>
                <div className="role-feature">Guided suggestions based on analysis gaps</div>
                <div className="role-feature">Module chatbots with persistent memory</div>
                <div className="role-feature">Research depth score and badge system</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gamification */}
      <section className="game-section">
        <div className="container">
          <div className="game-grid">
            <div>
              <div className="section-label" style={{color:'rgba(255,255,255,0.5)'}}>Research Excellence</div>
              <h2 className="game-title">Great research<br/>should feel like it.</h2>
              <p className="game-sub">AlphaSynth gamifies the research process — not to make it a game, but to make depth rewarding, consistency visible, and quality measurable. The best analysts in your organisation will stand out.</p>
              <div className="game-features">
                <div className="game-feat">
                  <div className="game-feat-icon">🎯</div>
                  <div className="game-feat-title">Research Depth Score</div>
                  <p className="game-feat-text">Each stock has a completeness score (0–100%). Completing all six analytical pillars unlocks the full conviction badge.</p>
                </div>
                <div className="game-feat">
                  <div className="game-feat-icon">🏆</div>
                  <div className="game-feat-title">Accuracy Leaderboard</div>
                  <p className="game-feat-text">Monthly ranking by recommendation hit rate within your organisation. Resets to zero every month.</p>
                </div>
                <div className="game-feat">
                  <div className="game-feat-icon">🔥</div>
                  <div className="game-feat-title">Research Streak</div>
                  <p className="game-feat-text">Daily active analysis streak. Gamified consistency — because the best analysts don't take days off during earnings season.</p>
                </div>
                <div className="game-feat">
                  <div className="game-feat-icon">🛡️</div>
                  <div className="game-feat-title">Achievement Badges</div>
                  <p className="game-feat-text">Forensic Investigator. Macro Watcher. Portfolio Architect. Badges signal genuine analytical capability, not just usage.</p>
                </div>
              </div>
            </div>
            <div className="game-visual">
              <div className="badge-row">
                <div className="badge badge-earned">🛡️ Forensic Investigator</div>
                <div className="badge badge-earned">📊 Valuation Master</div>
                <div className="badge">🌏 Macro Watcher</div>
              </div>
              <div className="badge-row" style={{marginTop:'0'}}>
                <div className="badge badge-earned">🔬 Deep Dive · 50 stocks</div>
                <div className="badge">🏆 Top Analyst</div>
              </div>
              <div className="streak-card mt-16">
                <div><div className="streak-label">Research Streak</div><div className="streak-val">14 days</div></div>
                <div style={{textAlign:'right'}}><div className="streak-label">Hit Rate (90 days)</div><div className="streak-val">73%</div></div>
              </div>
              <div className="depth-meter mt-16">
                <div className="depth-label"><span>Research Depth · RELIANCE</span><span style={{color:'white',fontWeight:'700'}}>72% complete</span></div>
                <div className="depth-bar-bg"><div className="depth-bar-fill"></div></div>
                <div className="depth-steps">
                  <div className="depth-step done">Economy ✓</div>
                  <div className="depth-step done">Industry ✓</div>
                  <div className="depth-step done">Financials ✓</div>
                  <div className="depth-step done">Valuation ✓</div>
                  <div className="depth-step">Forensic</div>
                  <div className="depth-step">Sentiment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="cta">
        <div className="container">
          <div className="section-label center">Get Started</div>
          <h2 className="section-title center">Ready to build the research<br/>infrastructure you deserve?</h2>
          <p className="section-sub center">AlphaSynth is available for pilot deployment to select Indian investment firms. Onboarding takes two to four weeks. Your team is productive from day one.</p>
          <div className="cta-actions">
            <a href="#" className="btn-cta">Request a Demo</a>
            <a href="#" className="btn-cta-outline">Download Platform Overview</a>
          </div>
          <p className="cta-note">Competitive pricing structured for Indian fund houses. Per-seat and enterprise licensing available. <a href="#" style={{color:'var(--teal)'}}>Talk to us about your team size →</a></p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">Alpha<span>Synth</span></div>
              <p className="footer-desc">Investment intelligence platform for India's equity professionals. NSE-certified data. Deterministic calculations. Zero hallucinations. Deployed in your AWS environment.</p>
              <div style={{marginTop:'20px',display:'flex',gap:'12px'}}>
                <span className="footer-badge">NSE Certified</span>
                <span className="footer-badge">SEBI Compliant</span>
                <span className="footer-badge">AWS Deployed</span>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Platform</div>
              <div className="footer-links">
                <a href="#">Discover &amp; Screen</a>
                <a href="#">Market Intelligence</a>
                <a href="#">Company Research</a>
                <a href="#">Technical Analysis</a>
                <a href="#">Portfolio Management</a>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Company</div>
              <div className="footer-links">
                <a href="#">About Intellectus AI Labs</a>
                <a href="#">Architecture Overview</a>
                <a href="#">Security &amp; Compliance</a>
                <a href="#">Code Escrow Policy</a>
                <a href="#">Careers</a>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Legal</div>
              <div className="footer-links">
                <a href="#">Terms of Service</a>
                <a href="#">Privacy Policy</a>
                <a href="#">SEBI RA Disclosure</a>
                <a href="#">Data Processing Agreement</a>
                <a href="#">Contact</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">© 2025 Intellectus AI Labs Pvt. Ltd. AlphaSynth is a registered product. All calculations are deterministic and verifiable. Not an investment advisor.</div>
            <div className="footer-badges">
              <span className="footer-badge">ap-south-1 (Mumbai)</span>
              <span className="footer-badge">v2.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
