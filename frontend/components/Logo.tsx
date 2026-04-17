import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="alphasynth-logo">
      <div className="alphasynth-logo-wrapper">
        {/* Logo Image */}
        <div className="alphasynth-logo-image">
          <img 
            src="/logo.jpeg" 
            alt="AlphaSynth Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <span className="alphasynth-logo-text">
          <span className="alphasynth-logo-alpha">Alpha</span>
          <span className="alphasynth-logo-synth">Synth</span>
        </span>
      </div>
      <div className="alphasynth-logo-subtitle">
        Powered by Intellectus AI Labs
      </div>
    </Link>
  )
}

