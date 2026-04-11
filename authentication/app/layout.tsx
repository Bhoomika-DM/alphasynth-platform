import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AlphaSynth - AI-Powered Trading Platform',
  description: 'Advanced AI trading signals and analytics platform for professional traders.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
