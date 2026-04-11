'use client'

import { useEffect, useRef } from 'react'
import { createChart, ColorType, IChartApi, ISeriesApi } from 'lightweight-charts'

interface ChartData {
  time: string | number
  value: number
}

interface LightweightAreaChartProps {
  data: ChartData[]
  height?: number
  isPositive?: boolean // Whether the overall change is positive or negative
}

export default function LightweightAreaChart({ data, height = 320, isPositive = true }: LightweightAreaChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<'Area'> | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    // Prevent double initialization
    if (chartRef.current) {
      // Update existing chart data and colors
      if (seriesRef.current) {
        const lineColor = isPositive ? '#6B9E5D' : '#C85A54' // Sage green for profit, Terracotta for loss
        const topColor = isPositive ? 'rgba(107, 158, 93, 0.4)' : 'rgba(200, 90, 84, 0.4)'
        const bottomColor = isPositive ? 'rgba(107, 158, 93, 0.05)' : 'rgba(200, 90, 84, 0.05)'
        
        seriesRef.current.applyOptions({
          lineColor,
          topColor,
          bottomColor,
        })
        seriesRef.current.setData(data as any)
        chartRef.current.timeScale().fitContent()
      }
      return
    }

    // Determine colors based on profit/loss
    const lineColor = isPositive ? '#6B9E5D' : '#C85A54' // Sage green for profit, Terracotta for loss
    const topColor = isPositive ? 'rgba(107, 158, 93, 0.4)' : 'rgba(200, 90, 84, 0.4)'
    const bottomColor = isPositive ? 'rgba(107, 158, 93, 0.05)' : 'rgba(200, 90, 84, 0.05)'

    // Create chart only once
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#FFFFFF' },
        textColor: '#1F2933',
        fontFamily: 'Inter',
      },
      width: chartContainerRef.current.clientWidth,
      height: height,
      grid: {
        vertLines: { color: '#E5E7EB', style: 1 },
        horzLines: { color: '#E5E7EB', style: 1 },
      },
      rightPriceScale: {
        borderColor: '#E5E7EB',
      },
      timeScale: {
        borderColor: '#E5E7EB',
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        vertLine: {
          color: isPositive ? '#6B9E5D' : '#C85A54',
          width: 1,
          style: 3,
          labelBackgroundColor: isPositive ? '#6B9E5D' : '#C85A54',
        },
        horzLine: {
          color: isPositive ? '#6B9E5D' : '#C85A54',
          width: 1,
          style: 3,
          labelBackgroundColor: isPositive ? '#6B9E5D' : '#C85A54',
        },
      },
    })

    // Create area series with dynamic colors
    const areaSeries = chart.addAreaSeries({
      lineColor,
      topColor,
      bottomColor,
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: true,
    })

    // Set data
    areaSeries.setData(data as any)
    chart.timeScale().fitContent()

    chartRef.current = chart
    seriesRef.current = areaSeries

    // Handle resize with ResizeObserver
    resizeObserverRef.current = new ResizeObserver(entries => {
      if (entries.length === 0 || entries[0].target !== chartContainerRef.current) return
      const newRect = entries[0].contentRect
      chart.applyOptions({ width: newRect.width })
    })

    resizeObserverRef.current.observe(chartContainerRef.current)

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }
      if (chartRef.current) {
        chartRef.current.remove()
        chartRef.current = null
        seriesRef.current = null
      }
    }
  }, [])

  // Update data and colors when they change
  useEffect(() => {
    if (seriesRef.current && chartRef.current) {
      const lineColor = isPositive ? '#6B9E5D' : '#C85A54'
      const topColor = isPositive ? 'rgba(107, 158, 93, 0.4)' : 'rgba(200, 90, 84, 0.4)'
      const bottomColor = isPositive ? 'rgba(107, 158, 93, 0.05)' : 'rgba(200, 90, 84, 0.05)'
      
      seriesRef.current.applyOptions({
        lineColor,
        topColor,
        bottomColor,
      })
      
      chartRef.current.applyOptions({
        crosshair: {
          vertLine: {
            color: isPositive ? '#6B9E5D' : '#C85A54',
            width: 1,
            style: 3,
            labelBackgroundColor: isPositive ? '#6B9E5D' : '#C85A54',
          },
          horzLine: {
            color: isPositive ? '#6B9E5D' : '#C85A54',
            width: 1,
            style: 3,
            labelBackgroundColor: isPositive ? '#6B9E5D' : '#C85A54',
          },
        },
      })
      
      seriesRef.current.setData(data as any)
      chartRef.current.timeScale().fitContent()
    }
  }, [data, isPositive])

  return (
    <div 
      ref={chartContainerRef} 
      className="w-full rounded-lg border border-[#5A8A4E]/10"
      style={{ height: `${height}px` }}
    />
  )
}


