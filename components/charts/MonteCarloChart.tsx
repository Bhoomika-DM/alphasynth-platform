'use client'

import { useEffect, useRef } from 'react'

interface MonteCarloChartProps {
  currentPrice: number
  paths?: number
}

export default function MonteCarloChart({ currentPrice, paths = 100 }: MonteCarloChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Generate Monte Carlo paths
    const days = 90
    const volatility = 0.28 / Math.sqrt(252) // Daily volatility
    const drift = 0.212 / 252 // Daily drift

    const allPaths: number[][] = []
    let minPrice = currentPrice
    let maxPrice = currentPrice

    for (let p = 0; p < paths; p++) {
      const path = [currentPrice]
      let price = currentPrice

      for (let d = 1; d <= days; d++) {
        const randomShock = (Math.random() - 0.5) * 2 // -1 to 1
        const dailyReturn = drift + volatility * randomShock
        price = price * (1 + dailyReturn)
        path.push(price)
        minPrice = Math.min(minPrice, price)
        maxPrice = Math.max(maxPrice, price)
      }

      allPaths.push(path)
    }

    // Add some padding to price range
    const priceRange = maxPrice - minPrice
    minPrice -= priceRange * 0.1
    maxPrice += priceRange * 0.1

    // Draw grid
    ctx.strokeStyle = 'rgba(31, 41, 51, 0.1)'
    ctx.lineWidth = 1
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // Draw paths
    allPaths.forEach((path, pathIndex) => {
      ctx.beginPath()
      path.forEach((price, day) => {
        const x = padding + (chartWidth / days) * day
        const y = padding + chartHeight - ((price - minPrice) / (maxPrice - minPrice)) * chartHeight

        if (day === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      // Color based on final outcome
      const finalPrice = path[path.length - 1]
      const alpha = 0.15
      if (finalPrice > currentPrice * 1.1) {
        ctx.strokeStyle = `rgba(34, 197, 94, ${alpha})` // Green for bull
      } else if (finalPrice < currentPrice * 0.9) {
        ctx.strokeStyle = `rgba(239, 68, 68, ${alpha})` // Red for bear
      } else {
        ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})` // Blue for base
      }
      ctx.lineWidth = 1
      ctx.stroke()
    })

    // Draw current price line
    const currentY = padding + chartHeight - ((currentPrice - minPrice) / (maxPrice - minPrice)) * chartHeight
    ctx.beginPath()
    ctx.moveTo(padding, currentY)
    ctx.lineTo(width - padding, currentY)
    ctx.strokeStyle = 'rgba(31, 41, 51, 0.4)'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.stroke()
    ctx.setLineDash([])

    // Draw labels
    ctx.fillStyle = '#1F2933'
    ctx.font = '11px Plus Jakarta Sans'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'

    for (let i = 0; i <= 5; i++) {
      const price = minPrice + ((maxPrice - minPrice) / 5) * (5 - i)
      const y = padding + (chartHeight / 5) * i
      ctx.fillText(`$${price.toFixed(0)}`, padding - 10, y)
    }

    // Draw time labels
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillText('Today', padding, height - padding + 10)
    ctx.fillText('90D', width - padding, height - padding + 10)
  }, [currentPrice, paths])

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={300}
      className="w-full h-full rounded-xl"
    />
  )
}
