'use client'

import ScreenerSidebar from '@/components/screener/ScreenerSidebar'

export default function AboutPage() {
  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      <ScreenerSidebar />

      <div className="flex-1 ml-64">
        {/* Header */}
        <div className="bg-white border-b border-[#E2E8F0] px-8 py-6">
          <h1 className="text-3xl font-black text-[#1B2A4A] mb-2">About AlphaSynth</h1>
          <p className="text-sm text-[#718096]">
            Institutional-grade intelligence, stripped of the jargon.
          </p>
        </div>

        <div className="p-8">
          {/* Divider Line */}
          <div className="w-full h-px bg-gradient-to-r from-[#0D7C8C] to-[#10B981] mb-8"></div>

          {/* Feature Section */}
          <div className="bg-white rounded-lg border border-[#E2E8F0] p-8 mb-8">
            <h2 className="text-xl font-bold text-[#1B2A4A] mb-6">Feature 1.3 — Chart Pattern Auto-Detection</h2>
            
            <div className="space-y-4 text-[#2D3748] leading-relaxed">
              <p>
                AlphaSynth scans every liquid NSE stock every time you hit <span className="font-bold">Run Full Scan</span> and looks for 11 classical chart patterns — Head & Shoulders, Inverse H&S, Double Top/Bottom, three kinds of Triangles, Flags, Pennants, Wedges and Cup & Handle. Each pattern is cross-checked against volume, OBV and the prevailing Dow Theory phase before it is graded GREEN, AMBER or RED.
              </p>
              
              <p>
                Built for portfolio managers, family offices and self-directed investors who want a <span className="font-bold">single dashboard of conviction-ranked ideas</span> — without spending hours reading charts.
              </p>
            </div>
          </div>

          {/* Additional Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
              <h3 className="text-lg font-bold text-[#1B2A4A] mb-4">Institutional Quality</h3>
              <p className="text-sm text-[#718096] leading-relaxed">
                Professional-grade pattern recognition algorithms combined with volume analysis and market structure assessment to deliver institutional-quality insights.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
              <h3 className="text-lg font-bold text-[#1B2A4A] mb-4">Real-Time Scanning</h3>
              <p className="text-sm text-[#718096] leading-relaxed">
                Continuous monitoring of liquid NSE stocks with real-time pattern detection and confidence scoring based on multiple technical factors.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
              <h3 className="text-lg font-bold text-[#1B2A4A] mb-4">Multi-Factor Analysis</h3>
              <p className="text-sm text-[#718096] leading-relaxed">
                Each pattern is validated against volume confirmation, On-Balance Volume trends, and prevailing Dow Theory phases for higher accuracy.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
              <h3 className="text-lg font-bold text-[#1B2A4A] mb-4">Conviction Ranking</h3>
              <p className="text-sm text-[#718096] leading-relaxed">
                Advanced scoring system that ranks opportunities by conviction level, helping you focus on the highest-probability setups.
              </p>
            </div>
          </div>

          {/* Pattern Types */}
          <div className="bg-white rounded-lg border border-[#E2E8F0] p-8 mb-8">
            <h3 className="text-lg font-bold text-[#1B2A4A] mb-6">Supported Chart Patterns</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                'Head & Shoulders',
                'Inverse Head & Shoulders',
                'Double Top',
                'Double Bottom',
                'Ascending Triangle',
                'Descending Triangle',
                'Symmetrical Triangle',
                'Bull Flag',
                'Bear Flag',
                'Pennant',
                'Rising Wedge',
                'Falling Wedge',
                'Cup & Handle'
              ].map((pattern, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-[#F8F9FB] rounded-lg">
                  <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                  <span className="text-sm font-medium text-[#2D3748]">{pattern}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <div className="bg-white rounded-lg border border-[#E2E8F0] p-8">
            <h3 className="text-lg font-bold text-[#1B2A4A] mb-6">Technology & Methodology</h3>
            
            <div className="space-y-4 text-sm text-[#718096] leading-relaxed">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#0D7C8C] rounded-full mt-2 flex-shrink-0"></div>
                <p><span className="font-semibold text-[#2D3748]">Pattern Recognition:</span> Advanced algorithms identify classical chart patterns with high precision across multiple timeframes.</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#0D7C8C] rounded-full mt-2 flex-shrink-0"></div>
                <p><span className="font-semibold text-[#2D3748]">Volume Analysis:</span> On-Balance Volume (OBV) and volume confirmation ensure patterns have institutional backing.</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#0D7C8C] rounded-full mt-2 flex-shrink-0"></div>
                <p><span className="font-semibold text-[#2D3748]">Market Structure:</span> Dow Theory phase analysis provides context for pattern reliability and trend direction.</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#0D7C8C] rounded-full mt-2 flex-shrink-0"></div>
                <p><span className="font-semibold text-[#2D3748]">Risk Management:</span> Automated calculation of entry points, targets, and stop-losses based on pattern geometry.</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-[#0D7C8C] to-[#10B981] rounded-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-sm opacity-90 mb-6">
                Join thousands of investors using AlphaSynth for smarter trading decisions.
              </p>
              <button className="px-8 py-3 bg-white text-[#0D7C8C] rounded-lg font-bold hover:bg-gray-100 transition-all">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}