'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-[#1B2A4A] mb-4">Something went wrong!</h2>
        <p className="text-[#718096] mb-6">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-[#0D7C8C] text-white rounded-lg hover:bg-[#0A6B7A] transition-all"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
