'use client'

export default function NoiseOverlay() {
  const noiseDataUrl = `data:image/svg+xml;base64,${btoa(`
    <svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'>
      <filter id='noise'>
        <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/>
        <feColorMatrix type='saturate' values='0'/>
      </filter>
      <rect width='300' height='300' filter='url(#noise)' opacity='1'/>
    </svg>
  `)}`

  return (
    <div
      className="fixed inset-0 z-[4] pointer-events-none opacity-[0.028]"
      style={{
        backgroundImage: `url("${noiseDataUrl}")`,
        backgroundRepeat: 'repeat',
        mixBlendMode: 'overlay',
      }}
    />
  )
}

