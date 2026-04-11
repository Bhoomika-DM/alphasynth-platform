'use client'

export default function Globe() {
  return (
    <div 
      className="absolute bottom-[-18%] left-1/2 z-[3] pointer-events-none animate-globe-float"
      style={{ 
        transform: 'translateX(-50%)',
        perspective: '1000px'
      }}
    >
      <svg
        width="780"
        height="780"
        viewBox="0 0 780 780"
        className="animate-globe-spin"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <defs>
          <radialGradient id="globeGradient" cx="38%" cy="35%">
            <stop offset="0%" stopColor="#0a2e1a" />
            <stop offset="60%" stopColor="#031208" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
          
          <filter id="globeGlow">
            <feDropShadow dx="0" dy="0" stdDeviation="20" floodColor="#22c55e" floodOpacity="0.25"/>
          </filter>
          
          <filter id="dotGlow">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#22c55e" floodOpacity="0.6"/>
          </filter>
        </defs>

        {/* Outer glow ring */}
        <circle
          cx="390"
          cy="390"
          r="385"
          fill="none"
          stroke="rgba(34,197,94,0.2)"
          strokeWidth="2"
          filter="url(#globeGlow)"
        />

        {/* Main globe */}
        <circle
          cx="390"
          cy="390"
          r="380"
          fill="url(#globeGradient)"
          stroke="rgba(34,197,94,0.15)"
          strokeWidth="1"
        />

        {/* Latitude lines */}
        {Array.from({ length: 9 }, (_, i) => {
          const y = 390 + (i - 4) * 80
          const rx = Math.abs(390 - y) < 380 ? Math.sqrt(380 * 380 - (390 - y) * (390 - y)) : 0
          return rx > 0 ? (
            <ellipse
              key={`lat-${i}`}
              cx="390"
              cy={y}
              rx={rx}
              ry={rx * 0.3}
              fill="none"
              stroke="rgba(34,197,94,0.07)"
              strokeWidth="0.5"
            />
          ) : null
        })}

        {/* Longitude lines */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30) * Math.PI / 180
          const x1 = 390 + 380 * Math.cos(angle)
          const y1 = 390 + 380 * Math.sin(angle)
          const x2 = 390 - 380 * Math.cos(angle)
          const y2 = 390 - 380 * Math.sin(angle)
          
          return (
            <path
              key={`lon-${i}`}
              d={`M ${x1} ${y1} Q 390 ${390 + (i % 2 === 0 ? -50 : 50)} ${x2} ${y2}`}
              fill="none"
              stroke="rgba(34,197,94,0.07)"
              strokeWidth="0.5"
            />
          )
        })}

        {/* Simplified continent shapes */}
        <path
          d="M 200 300 Q 250 280 300 300 L 320 350 Q 280 370 200 350 Z"
          fill="rgba(34,197,94,0.08)"
          stroke="rgba(34,197,94,0.15)"
          strokeWidth="0.5"
        />
        <path
          d="M 450 250 Q 500 240 550 260 L 570 310 Q 520 330 450 310 Z"
          fill="rgba(34,197,94,0.08)"
          stroke="rgba(34,197,94,0.15)"
          strokeWidth="0.5"
        />
        <path
          d="M 350 450 Q 400 440 450 460 L 470 510 Q 420 530 350 510 Z"
          fill="rgba(34,197,94,0.08)"
          stroke="rgba(34,197,94,0.15)"
          strokeWidth="0.5"
        />

        {/* Hot dots (pulsing) */}
        <circle cx="250" cy="320" r="3" fill="#22c55e" opacity="0.8" className="animate-dot-pulse" />
        <circle cx="500" cy="270" r="3" fill="#22c55e" opacity="0.8" className="animate-dot-pulse" style={{ animationDelay: '0.5s' }} />
        <circle cx="400" cy="470" r="3" fill="#22c55e" opacity="0.8" className="animate-dot-pulse" style={{ animationDelay: '1s' }} />
        <circle cx="320" cy="380" r="3" fill="#22c55e" opacity="0.8" className="animate-dot-pulse" style={{ animationDelay: '1.5s' }} />
        <circle cx="480" cy="350" r="3" fill="#22c55e" opacity="0.8" className="animate-dot-pulse" style={{ animationDelay: '2s' }} />
      </svg>
    </div>
  )
}
