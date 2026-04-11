'use client'

import { useEffect, useRef, useState } from 'react'
import { createChart, ColorType, IChartApi, ISeriesApi, LineStyle } from 'lightweight-charts'

interface CandlestickChartProps {
  data: Array<{
    time: string
    open: number
    high: number
    low: number
    close: number
  }>
  showRSI?: boolean
  showEMA?: boolean
}

export default function CandlestickChart({ data, showRSI: showRSIProp = false, showEMA: showEMAProp = true }: CandlestickChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const rsiChartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const rsiChartRef = useRef<IChartApi | null>(null)
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)
  const ema20SeriesRef = useRef<ISeriesApi<'Line'> | null>(null)
  const ema50SeriesRef = useRef<ISeriesApi<'Line'> | null>(null)
  
  const showEMA = showEMAProp
  const showRSI = showRSIProp

  // Calculate EMA
  const calculateEMA = (data: any[], period: number) => {
    const k = 2 / (period + 1)
    const emaData = []
    let ema = data[0].close

    for (let i = 0; i < data.length; i++) {
      ema = data[i].close * k + ema * (1 - k)
      emaData.push({ time: data[i].time, value: ema })
    }
    return emaData
  }

  // Calculate RSI
  const calculateRSI = (data: any[], period: number = 14) => {
    const rsiData = []
    const changes = []
    
    for (let i = 1; i < data.length; i++) {
      changes.push(data[i].close - data[i - 1].close)
    }

    for (let i = period; i < changes.length; i++) {
      const gains = []
      const losses = []
      
      for (let j = i - period; j < i; j++) {
        if (changes[j] > 0) gains.push(changes[j])
        else losses.push(Math.abs(changes[j]))
      }

      const avgGain = gains.length > 0 ? gains.reduce((a, b) => a + b, 0) / period : 0
      const avgLoss = losses.length > 0 ? losses.reduce((a, b) => a + b, 0) / period : 0

      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss
      const rsi = 100 - (100 / (1 + rs))

      rsiData.push({ time: data[i + 1].time, value: rsi })
    }

    return rsiData
  }

  useEffect(() => {
    if (!chartContainerRef.current) return

    // Create main chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#1F2933',
      },
      grid: {
        vertLines: { color: 'rgba(31, 41, 51, 0.1)', style: LineStyle.Dotted },
        horzLines: { color: 'rgba(31, 41, 51, 0.15)', style: LineStyle.Dotted },
      },
      width: chartContainerRef.current.clientWidth,
      height: showRSI ? 300 : 400,
      timeScale: {
        borderColor: 'rgba(31, 41, 51, 0.2)',
        timeVisible: true,
        visible: !showRSI,
      },
      rightPriceScale: {
        borderColor: 'rgba(31, 41, 51, 0.2)',
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: 'rgba(31, 41, 51, 0.4)',
          width: 1,
          style: LineStyle.Dashed,
        },
        horzLine: {
          color: 'rgba(31, 41, 51, 0.4)',
          width: 1,
          style: LineStyle.Dashed,
        },
      },
    })

    chartRef.current = chart

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderUpColor: '#22c55e',
      borderDownColor: '#ef4444',
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    })

    candlestickSeriesRef.current = candlestickSeries
    candlestickSeries.setData(data)

    // Add EMA lines
    if (showEMA) {
      const ema20Series = chart.addLineSeries({
        color: '#f97316',
        lineWidth: 2,
        title: 'EMA 20',
      })
      ema20SeriesRef.current = ema20Series
      const ema20Data = calculateEMA(data, 20)
      ema20Series.setData(ema20Data)

      const ema50Series = chart.addLineSeries({
        color: '#3b82f6',
        lineWidth: 2,
        title: 'EMA 50',
      })
      ema50SeriesRef.current = ema50Series
      const ema50Data = calculateEMA(data, 50)
      ema50Series.setData(ema50Data)
    }

    chart.timeScale().fitContent()

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth })
      }
      if (rsiChartContainerRef.current && rsiChartRef.current && showRSI) {
        rsiChartRef.current.applyOptions({ width: rsiChartContainerRef.current.clientWidth })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (chartRef.current) {
        chartRef.current.remove()
      }
    }
  }, [data, showEMA, showRSI])

  // RSI Chart Effect
  useEffect(() => {
    if (!showRSI || !rsiChartContainerRef.current) {
      if (rsiChartRef.current) {
        rsiChartRef.current.remove()
        rsiChartRef.current = null
      }
      return
    }

    // Create RSI chart
    const rsiChart = createChart(rsiChartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#1F2933',
      },
      grid: {
        vertLines: { color: 'rgba(31, 41, 51, 0.1)', style: LineStyle.Dotted },
        horzLines: { color: 'rgba(31, 41, 51, 0.15)', style: LineStyle.Dotted },
      },
      width: rsiChartContainerRef.current.clientWidth,
      height: 150,
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
          color: 'rgba(31, 41, 51, 0.4)',
          width: 1,
          style: LineStyle.Dashed,
        },
        horzLine: {
          color: 'rgba(31, 41, 51, 0.4)',
          width: 1,
          style: LineStyle.Dashed,
        },
      },
    })

    rsiChartRef.current = rsiChart

    // Add RSI line
    const rsiSeries = rsiChart.addLineSeries({
      color: '#A7C4A0',
      lineWidth: 2,
      title: 'RSI(14)',
    })

    const rsiData = calculateRSI(data, 14)
    rsiSeries.setData(rsiData)

    // Add overbought line (70)
    const overboughtSeries = rsiChart.addLineSeries({
      color: '#ef444440',
      lineWidth: 1,
      lineStyle: LineStyle.Dashed,
      title: 'Overbought',
    })
    overboughtSeries.setData(rsiData.map(d => ({ time: d.time, value: 70 })))

    // Add oversold line (30)
    const oversoldSeries = rsiChart.addLineSeries({
      color: '#22c55e40',
      lineWidth: 1,
      lineStyle: LineStyle.Dashed,
      title: 'Oversold',
    })
    oversoldSeries.setData(rsiData.map(d => ({ time: d.time, value: 30 })))

    rsiChart.timeScale().fitContent()

    // Sync time scales
    if (chartRef.current) {
      chartRef.current.timeScale().subscribeVisibleLogicalRangeChange((timeRange) => {
        if (rsiChartRef.current && timeRange) {
          rsiChartRef.current.timeScale().setVisibleLogicalRange(timeRange)
        }
      })

      rsiChart.timeScale().subscribeVisibleLogicalRangeChange((timeRange) => {
        if (chartRef.current && timeRange) {
          chartRef.current.timeScale().setVisibleLogicalRange(timeRange)
        }
      })
    }

    return () => {
      if (rsiChartRef.current) {
        rsiChartRef.current.remove()
        rsiChartRef.current = null
      }
    }
  }, [data, showRSI])

  return (
    <div className="space-y-2">
      {/* Chart Controls */}
      <div className="flex items-center gap-2 text-xs text-[#6B7280]">
        <span>Zoom • Drag to pan • Hover for price</span>
      </div>
      
      {/* Main Chart Container */}
      <div ref={chartContainerRef} className="w-full" />

      {/* RSI Chart Container */}
      {showRSI && (
        <div className="space-y-1">
          <div className="text-xs font-jakarta text-[#6B7280] px-2">
            RSI(14) — above 70 = overbought · below 30 = oversold
          </div>
          <div ref={rsiChartContainerRef} className="w-full" />
        </div>
      )}
    </div>
  )
}
