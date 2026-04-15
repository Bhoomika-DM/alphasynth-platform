'use client'

import { useEffect, useRef, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { gsap } from 'gsap'

interface TopMoversProps {
}

interface StockData {
  symbol: string
  change: number
}

export default function TopMovers({}: TopMoversProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [gainers, setGainers] = useState<StockData[]>([
    { symbol: 'MSFT', change: 4.2 },
    { symbol: 'NVDA', change: 3.8 },
    { symbol: 'TSLA', change: 3.5 },
    { symbol: 'AAPL', change: 3.2 }
  ])
  const [losers, setLosers] = useState<StockData[]>([
    { symbol: 'META', change: -2.1 },
    { symbol: 'GOOGL', change: -2.5 },
    { symbol: 'AMZN', change: -2.8 },
    { symbol: 'NFLX', change: -3.2 }
  ])

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.5 }
      )
    }

    // Fetch real data from TradingView or market API
    const fetchMarketData = async () => {
      try {
        const response = await fetch('/api/market/top-movers')
        if (response.ok) {
          const data = await response.json()
          setGainers(data.gainers)
          setLosers(data.losers)
        }
      } catch (error) {
        console.error('Error fetching market data:', error)
      }
    }

    fetchMarketData()
    // Refresh data every 5 minutes
    const interval = setInterval(fetchMarketData, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  const verticalBarOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params: any) => {
        let result = `<div style="font-family: Inter; padding: 8px;">`
        params.forEach((param: any) => {
          if (param.value !== undefined && param.value !== null) {
            const color = param.seriesName === 'Gainers' ? '#16a34a' : '#dc2626'
            result += `
              <div style="color: ${color}; font-weight: bold; margin-bottom: 4px;">
                ${param.seriesName}: ${param.value > 0 ? '+' : ''}${param.value.toFixed(2)}%
              </div>
            `
          }
        })
        result += `</div>`
        return result
      }
    },
    legend: {
      data: ['Gainers', 'Losers'],
      textStyle: {
        color: '#2D3748',
        fontFamily: 'Inter',
        fontSize: 13,
        fontWeight: 'bold'
      },
      top: 10,
      left: 'center'
    },
    grid: {
      left: '10%',
      right: '10%',
      top: '20%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: [...gainers.map(g => g.symbol).reverse(), ...losers.map(l => l.symbol)],
      axisLabel: {
        color: '#2D3748',
        fontSize: 12,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        rotate: 0
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(31, 41, 51, 0.1)'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#2D3748',
        fontSize: 11,
        fontFamily: 'Inter',
        formatter: '{value}%'
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(31, 41, 51, 0.08)'
        }
      },
      axisLine: {
        show: false
      }
    },
    series: [
      {
        name: 'Gainers',
        type: 'bar',
        data: [
          ...gainers.map(g => g.change).reverse(),
          ...Array(losers.length).fill(null)
        ],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#22c55e' },
              { offset: 1, color: '#16a34a' }
            ]
          },
          borderRadius: [8, 8, 0, 0]
        },
        label: {
          show: true,
          position: 'top',
          color: '#15803d',
          fontSize: 12,
          fontFamily: 'Inter',
          fontWeight: 'bold',
          formatter: (params: any) => params.value ? '+' + params.value.toFixed(1) + '%' : ''
        },
        barWidth: '35%'
      },
      {
        name: 'Losers',
        type: 'bar',
        data: [
          ...Array(gainers.length).fill(null),
          ...losers.map(l => l.change)
        ],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#dc2626' },
              { offset: 1, color: '#ef4444' }
            ]
          },
          borderRadius: [8, 8, 0, 0]
        },
        label: {
          show: true,
          position: 'top',
          color: '#b91c1c',
          fontSize: 12,
          fontFamily: 'Inter',
          fontWeight: 'bold',
          formatter: (params: any) => params.value ? params.value.toFixed(1) + '%' : ''
        },
        barWidth: '35%'
      }
    ]
  }

  return (
    <div
      ref={cardRef}
      className="relative group bg-white border border-[#0D7C8C]/30 rounded-2xl p-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-200"
    >
      
      <div className="relative space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-[#2D3748] mb-1">Top Movers</h3>
            <p className="text-xs text-[#718096] uppercase tracking-[0.15em]">
              Nifty 50 Performance
            </p>
          </div>
        </div>

        {/* Vertical Bar Chart */}
        <div className="h-96 bg-white rounded-xl p-4">
          <ReactECharts option={verticalBarOption} style={{ height: '100%', width: '100%' }} />
        </div>
      </div>
    </div>
  )
}


