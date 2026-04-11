'use client'

import ProfessionalGlobe from './ProfessionalGlobe'

interface AnimatedBackgroundProps {
  showGlobe?: boolean
}

export default function AnimatedBackground({ showGlobe = true }: AnimatedBackgroundProps) {
  // 25 wide bars with varied heights for natural trading chart look
  const barHeights = [
    0.32, 0.48, 0.38, 0.58, 0.42, 0.65, 0.45, 0.72, 0.52, 0.68,
    0.40, 0.60, 0.70, 0.50, 0.58, 0.44, 0.66, 0.54, 0.75, 0.58,
    0.48, 0.62, 0.52, 0.70, 0.60
  ]

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* LAYER 1: Bar Chart - BEHIND globe */}
      <div 
        className="absolute inset-0 flex items-end justify-center gap-[2vw] px-[5%] pb-0" 
        style={{ zIndex: 1 }}
      >
        {barHeights.map((height, index) => (
          <div
            key={index}
            className="flex-1 max-w-[4vw]"
            style={{
              height: `${height * 60}vh`,
              background: `linear-gradient(to top, 
                rgba(34, 197, 94, ${0.10 + height * 0.06}) 0%, 
                rgba(34, 197, 94, ${0.04 + height * 0.03}) 70%, 
                transparent 100%)`,
              borderTopLeftRadius: '6px',
              borderTopRightRadius: '6px',
              borderTop: `1.5px solid rgba(34, 197, 94, ${0.12 + height * 0.08})`,
            }}
          />
        ))}
      </div>

      {/* LAYER 2: Professional Globe - IN FRONT of bars, BEHIND gradient */}
      {showGlobe && <ProfessionalGlobe />}

      {/* LAYER 3: Bottom gradient - ON TOP of everything */}
      <div 
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          zIndex: 3,
          height: '25%',
          background: 'linear-gradient(to top, rgba(34, 197, 94, 0.10) 0%, rgba(34, 197, 94, 0.04) 65%, transparent 100%)'
        }}
      />
    </div>
  )
}
