'use client'

interface DividerProps {
  text: string
}

export default function Divider({ text }: DividerProps) {
  return (
    <div className="relative flex items-center my-6">
      <div className="flex-1 h-px bg-white/7" />
      <span className="px-4 text-xs text-text-muted uppercase tracking-wide">
        {text}
      </span>
      <div className="flex-1 h-px bg-white/7" />
    </div>
  )
}

