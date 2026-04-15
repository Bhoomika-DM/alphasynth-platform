'use client'

import { useEffect, useRef } from 'react'

interface RadarChartProps {
  data: Array<{ name: string; value: number; color: string }>
}

export default function RadarChart({ data }: RadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 40

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw background circles
    ctx.strokeStyle = 'rgba(31, 41, 51, 0.15)'
    ctx.lineWidth = 1
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath()
      ctx.arc(centerX, centerY, (radius / 5) * i, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Draw axes
    const angleStep = (Math.PI * 2) / data.length
    data.forEach((item, index) => {
      const angle = angleStep * index - Math.PI / 2
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius

      // Draw axis line
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.strokeStyle = 'rgba(31, 41, 51, 0.15)'
      ctx.stroke()

      // Draw label
      const labelX = centerX + Math.cos(angle) * (radius + 25)
      const labelY = centerY + Math.sin(angle) * (radius + 25)
      ctx.fillStyle = '#2D3748'
      ctx.font = '11px Plus Jakarta Sans'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(item.name, labelX, labelY)
    })

    // Draw data polygon
    ctx.beginPath()
    data.forEach((item, index) => {
      const angle = angleStep * index - Math.PI / 2
      const value = item.value / 100 // Normalize to 0-1
      const x = centerX + Math.cos(angle) * radius * value
      const y = centerY + Math.sin(angle) * radius * value

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.closePath()

    // Fill with gradient
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)')
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)')
    ctx.fillStyle = gradient
    ctx.fill()

    // Stroke the polygon
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)'
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw data points
    data.forEach((item, index) => {
      const angle = angleStep * index - Math.PI / 2
      const value = item.value / 100
      const x = centerX + Math.cos(angle) * radius * value
      const y = centerY + Math.sin(angle) * radius * value

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = 'rgb(59, 130, 246)'
      ctx.fill()
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 2
      ctx.stroke()
    })
  }, [data])

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      className="w-full h-full"
      style={{ maxWidth: '400px', maxHeight: '400px' }}
    />
  )
}

