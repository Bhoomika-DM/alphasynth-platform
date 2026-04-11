'use client'

import { useState, useEffect, useRef } from 'react'
import { createChart, ColorType, IChartApi, ISeriesApi } from 'lightweight-charts'

interface MarketTrendChartProps {
  title?: string
  height?: number
}

interface SectorData {
  id: string
  name: string
  value: string
  change: string
  positive: boolean
  color: string
}

const sectors: SectorData[] = [
  { id: 'nifty', name: 'NIFTY 50', value: '₹24,410', change: '+4.48%', positive: true, color: 'rgb(34, 197, 94)' },
  { id: 'tech', name: 'TECH', value: '+3.1%', change: '+3.1%', positive: true, color: 'rgb(34, 197, 94)' },
  { id: 'finchart', name: 'FINCHART', value: '+2.0%', change: '+2.0%', positive: true, color: 'rgb(34, 197, 94)' },
  { id: 'pharma', name: 'PHARMA(RR)', value: '-2.0%', change: '-2.0%', positive: false, color: 'rgb(239, 68, 68)' },
  { id: 'consumer', name: 'CONSUMER', value: '-2.5%', change: '-2.5%', positive: false, color: 'rgb(239, 68, 68)' },
]

export default function MarketTrendChart({ 
  title = '30-day chart', 
  height = 300 
}: MarketTrendChartProps) {
  const [selectedSector, setSelectedSector] = useState('nifty')
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const areaSeriesRef = useRef<ISeriesApi<'Area'> | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#1F2933',
      },
      grid: {
        vertLines: { color: 'rgba(31, 41, 51, 0.1)' },
        horzLines: { color: 'rgba(31, 41, 51, 0.1)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: height,
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
          color: 'rgba(106, 153, 78, 0.5)',
          width: 1,
          style: 2,
        },
        horzLine: {
          color: 'rgba(106, 153, 78, 0.5)',
          width: 1,
          style: 2,
        },
      },
    })

    chartRef.current = chart

    // Add area series
    const selectedSectorData = sectors.find(s => s.id === selectedSector)!
    const areaSeries = chart.addAreaSeries({
      lineColor: selectedSectorData.color,
      topColor: selectedSectorData.color.replace('rgb', 'rgba').replace(')', ', 0.4)'),
      bottomColor: selectedSectorData.color.replace('rgb', 'rgba').replace(')', ', 0.0)'),
      lineWidth: 2,
      priceLineVisible: false,
    })

    areaSeriesRef.current = areaSeries

    // Generate data for selected sector
    const data = generateSectorData(selectedSector)
    areaSeries.setData(data)

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
  }, [height, selectedSector])

  const handleSectorClick = (sectorId: string) => {
    setSelectedSector(sectorId)
  }

  return (
    <div className="bg-white border border-[#A7C4A0]/30 rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="mb-4">
        <h3 className="text-base font-jakarta font-bold text-[#1F2933] mb-3">{title}</h3>
        <div className="flex items-center gap-2 flex-wrap">
          {sectors.map((sector) => (
            <button
              key={sector.id}
              onClick={() => handleSectorClick(sector.id)}
              className={`px-3 py-2 rounded-md text-xs font-jakarta font-semibold transition-all duration-200 ${
                selectedSector === sector.id
                  ? 'bg-[#A7C4A0] text-[#1F2933] border-2 border-[#6A994E]'
                  : 'bg-white text-[#6B7280] border-2 border-[#A7C4A0]/30 hover:border-[#A7C4A0] hover:text-[#1F2933]'
              }`}
            >
              <span className="font-bold">{sector.name}</span>
              <span className="ml-1.5">{sector.change}</span>
            </button>
          ))}
        </div>
      </div>
      <div ref={chartContainerRef} className="rounded-xl overflow-hidden" />
    </div>
  )
}

// Generate sector-specific data with different patterns
function generateSectorData(sectorId: string) {
  const data = []
  const now = Math.floor(Date.now() / 1000)
  const oneDay = 24 * 60 * 60
  
  let basePrice = 24000
  let volatility = 200
  let trend = 30
  
  // Different patterns for different sectors
  switch (sectorId) {
    case 'nifty':
      basePrice = 24000
      volatility = 200
      trend = 30 // Strong uptrend
      break
    case 'tech':
      basePrice = 15000
      volatility = 300
      trend = 25 // Moderate uptrend
      break
    case 'finchart':
      basePrice = 18000
      volatility = 150
      trend = 20 // Mild uptrend
      break
    case 'pharma':
      basePrice = 12000
      volatility = 250
      trend = -15 // Downtrend
      break
    case 'consumer':
      basePrice = 10000
      volatility = 180
      trend = -20 // Stronger downtrend
      break
  }
  
  for (let i = 30; i >= 0; i--) {
    const time = now - (i * oneDay)
    
    // Create realistic market movement
    const randomChange = (Math.random() - 0.48) * volatility
    basePrice += randomChange
    
    // Add trend
    if (i > 15) {
      basePrice -= trend * 0.5 // First half
    } else {
      basePrice += trend // Second half (stronger trend)
    }
    
    // Keep price in reasonable range
    const minPrice = basePrice * 0.95
    const maxPrice = basePrice * 1.05
    basePrice = Math.max(minPrice, Math.min(maxPrice, basePrice))
    
    data.push({
      time: time as any,
      value: parseFloat(basePrice.toFixed(2))
    })
  }
  
  return data
}
