'use client'

import { useEffect, useRef } from 'react'
import { createChart, ColorType, IChartApi, ISeriesApi } from 'lightweight-charts'

interface StockChartProps {
  symbol: string
  timeframe?: '1M' | '3M' | '6M' | '1Y' | '3Y'
}

export default function StockChart({ symbol, timeframe = '1Y' }: StockChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'rgba(255, 255, 255, 0.5)' },
        textColor: '#2D3748',
      },
      grid: {
        vertLines: { color: 'rgba(31, 41, 51, 0.1)' },
        horzLines: { color: 'rgba(31, 41, 51, 0.1)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      timeScale: {
        borderColor: 'rgba(31, 41, 51, 0.2)',
        timeVisible: true,
      },
      rightPriceScale: {
        borderColor: 'rgba(31, 41, 51, 0.2)',
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: 'rgba(59, 130, 246, 0.5)',
          width: 1,
          style: 2,
        },
        horzLine: {
          color: 'rgba(59, 130, 246, 0.5)',
          width: 1,
          style: 2,
        },
      },
    })

    chartRef.current = chart

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: 'rgb(34, 197, 94)',
      downColor: 'rgb(239, 68, 68)',
      borderUpColor: 'rgb(34, 197, 94)',
      borderDownColor: 'rgb(239, 68, 68)',
      wickUpColor: 'rgb(34, 197, 94)',
      wickDownColor: 'rgb(239, 68, 68)',
    })

    candlestickSeriesRef.current = candlestickSeries

    // Generate sample data based on timeframe
    const data = generateSampleData(timeframe)
    candlestickSeries.setData(data)

    // Fit content
    chart.timeScale().fitContent()

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [timeframe])

  return (
    <div className="w-full">
      <div ref={chartContainerRef} className="rounded-xl overflow-hidden" />
    </div>
  )
}

// Generate sample candlestick data
function generateSampleData(timeframe: string) {
  const now = new Date()
  const data = []
  let days = 365

  switch (timeframe) {
    case '1M':
      days = 30
      break
    case '3M':
      days = 90
      break
    case '6M':
      days = 180
      break
    case '1Y':
      days = 365
      break
    case '3Y':
      days = 1095
      break
  }

  let basePrice = 200
  const volatility = 0.02

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue

    const timestamp = Math.floor(date.getTime() / 1000)
    
    // Random walk with slight upward bias
    const change = (Math.random() - 0.48) * basePrice * volatility
    basePrice += change

    const open = basePrice
    const close = basePrice + (Math.random() - 0.5) * basePrice * volatility
    const high = Math.max(open, close) + Math.random() * basePrice * volatility * 0.5
    const low = Math.min(open, close) - Math.random() * basePrice * volatility * 0.5

    data.push({
      time: timestamp as any,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
    })
  }

  return data
}

