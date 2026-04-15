import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // You can integrate with various market data APIs:
    // 1. TradingView API (requires authentication)
    // 2. Alpha Vantage API
    // 3. Yahoo Finance API
    // 4. Finnhub API
    // 5. IEX Cloud API
    
    // Example with Alpha Vantage (free tier available)
    // const API_KEY = process.env.ALPHA_VANTAGE_API_KEY
    
    // For now, returning simulated real-time data
    // Replace this with actual API calls
    
    const nifty50Stocks = [
      'RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK',
      'HINDUNILVR', 'ITC', 'SBIN', 'BHARTIARTL', 'KOTAKBANK',
      'LT', 'AXISBANK', 'ASIANPAINT', 'MARUTI', 'TITAN'
    ]
    
    // Simulate market data with realistic changes
    const generateMarketData = () => {
      const allStocks = nifty50Stocks.map(symbol => ({
        symbol,
        change: (Math.random() - 0.5) * 8 // -4% to +4%
      }))
      
      // Sort by change
      allStocks.sort((a, b) => b.change - a.change)
      
      // Get losers in ascending order (smallest loss first)
      const losersData = allStocks.slice(-4)
      
      return {
        gainers: allStocks.slice(0, 4).map(s => ({
          symbol: s.symbol,
          change: parseFloat(s.change.toFixed(2))
        })),
        losers: losersData.map(s => ({
          symbol: s.symbol,
          change: parseFloat(s.change.toFixed(2))
        }))
      }
    }
    
    const data = generateMarketData()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching market data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch market data' },
      { status: 500 }
    )
  }
}

