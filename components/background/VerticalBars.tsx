'use client'

const barHeights = [28, 45, 38, 62, 52, 71, 44, 80, 35, 68, 56, 42, 75, 48, 60, 33, 55, 40]

export default function VerticalBars() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none flex items-end px-[4%] gap-[clamp(6px,0.8vw,14px)]" style={{ height: '75vh' }}>
      {barHeights.map((height, index) => (
        <div
          key={index}
          className="flex-1 origin-bottom animate-bar-rise"
          style={{
            height: `${height}vh`,
            background: 'linear-gradient(to top, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.06) 60%, transparent 100%)',
            borderTop: '1px solid rgba(34,197,94,0.3)',
            borderRadius: '2px 2px 0 0',
            animationDelay: `${0.04 * index}s`,
            animationFillMode: 'both',
          }}
        >
          <div
            className="w-full h-full origin-bottom animate-bar-breathe"
            style={{
              animationDelay: `${0.3 * index}s`,
            }}
          />
        </div>
      ))}
    </div>
  )
}
