'use client'

export default function AuroraBands() {
  return (
    <>
      {/* Aurora Band A */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '700px',
          height: '400px',
          top: '-10%',
          left: '-10%',
          background: 'radial-gradient(ellipse, rgba(34,197,94,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(120px)',
          mixBlendMode: 'screen',
          animation: 'aurora-drift 18s ease-in-out infinite alternate',
        }}
      />

      {/* Aurora Band B */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '500px',
          height: '300px',
          top: '20%',
          right: '5%',
          background: 'radial-gradient(ellipse, rgba(74,222,128,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(120px)',
          mixBlendMode: 'screen',
          animation: 'aurora-drift-reverse 24s ease-in-out infinite alternate-reverse',
        }}
      />

      {/* Aurora Band C (Deep) */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '900px',
          height: '500px',
          bottom: '-20%',
          left: '20%',
          background: 'radial-gradient(ellipse, rgba(34,197,94,0.06) 0%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(120px)',
          mixBlendMode: 'screen',
          animation: 'aurora-drift-deep 30s ease-in-out infinite',
        }}
      />
    </>
  )
}

