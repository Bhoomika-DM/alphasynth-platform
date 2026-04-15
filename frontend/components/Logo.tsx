import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="block">
      <div className="flex items-center gap-3 mb-1">
        {/* Logo Image */}
        <div className="relative w-8 h-8">
          <img 
            src="/logo.jpeg" 
            alt="AlphaSynth Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-2xl font-semibold tracking-tight">
          <span className="text-[#1B2A4A]">Alpha</span>
          <span className="text-[#0D7C8C]">Synth</span>
        </span>
      </div>
      <div className="text-[9px] text-[#718096] tracking-[0.15em] uppercase pl-11">
        Powered by Intellectus AI Labs
      </div>
    </Link>
  )
}

