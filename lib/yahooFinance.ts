// Yahoo Finance API Client - Uses Next.js API Route as Proxy
// Bypasses CORS issues by making requests from server side

const USE_PROXY = true; // Set to true to use Next.js API proxy (fixes CORS)
const PROXY_BASE = '/api/yahoo-proxy';
const YAHOO_API_BASE = 'https://query1.finance.yahoo.com/v8/finance';

// Helper to convert NSE symbol to Yahoo format (e.g., TCS -> TCS.NS)
export const toYahooSymbol = (symbol: string): string => {
  return symbol.includes('.') ? symbol : `${symbol}.NS`;
};

// Helper to convert Yahoo symbol back to NSE format
export const toNSESymbol = (yahooSymbol: string): string => {
  return yahooSymbol.replace('.NS', '').replace('.BO', '');
};

export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  previousClose: number;
  open: number;
  dayHigh: number;
  dayLow: number;
  volume: number;
  marketCap: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  pe: number;
  updatedAt: string;
}

export interface IndexData {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
}

export interface HistoricalDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

/**
 * Fetch stock quote from Yahoo Finance
 */
export async function fetchStockQuote(symbol: string): Promise<StockQuote | null> {
  try {
    const yahooSymbol = toYahooSymbol(symbol);
    
    let url = '';
    if (USE_PROXY) {
      url = `${PROXY_BASE}?symbol=${yahooSymbol}&type=quote`;
    } else {
      url = `${YAHOO_API_BASE}/chart/${yahooSymbol}?interval=1d&range=1d`;
    }
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch stock data');
    
    const data = await response.json();
    const result = data.chart.result[0];
    const meta = result.meta;
    const quote = result.indicators.quote[0];
    
    return {
      symbol: toNSESymbol(meta.symbol),
      name: meta.longName || meta.symbol,
      price: meta.regularMarketPrice || 0,
      change: meta.regularMarketPrice - meta.previousClose || 0,
      changePercent: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose * 100) || 0,
      previousClose: meta.previousClose || 0,
      open: quote.open[0] || meta.regularMarketPrice || 0,
      dayHigh: quote.high[0] || meta.regularMarketPrice || 0,
      dayLow: quote.low[0] || meta.regularMarketPrice || 0,
      volume: quote.volume[0] || 0,
      marketCap: 0,
      fiftyTwoWeekHigh: 0,
      fiftyTwoWeekLow: 0,
      pe: 0,
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    return null;
  }
}

/**
 * Fetch index data (NIFTY 50, BANK NIFTY, etc.)
 */
export async function fetchIndexData(indexSymbol: string): Promise<IndexData | null> {
  try {
    // Map common index names to Yahoo symbols
    const indexMap: { [key: string]: string } = {
      'NIFTY 50': '^NSEI',
      'NIFTY BANK': '^NSEBANK',
      'NIFTY IT': '^CNXIT',
      'NIFTY NEXT 50': '^NSMIDCP',
      'NIFTY FIN SERVICE': '^CNXFIN',
      'NIFTY MIDCAP 100': '^NSEMDCP50',
      'NIFTY 100': '^CNX100',
    };
    
    const yahooSymbol = indexMap[indexSymbol] || indexSymbol;
    
    console.log(`[Yahoo Finance] Fetching index: ${indexSymbol} -> ${yahooSymbol}`);
    
    let url = '';
    if (USE_PROXY) {
      url = `${PROXY_BASE}?symbol=${encodeURIComponent(yahooSymbol)}&type=quote`;
    } else {
      url = `${YAHOO_API_BASE}/chart/${encodeURIComponent(yahooSymbol)}?interval=1d&range=1d`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`[Yahoo Finance] Failed to fetch ${indexSymbol}: ${response.status}`);
      throw new Error('Failed to fetch index data');
    }
    
    const data = await response.json();
    
    // Check for errors in response
    if (data.chart?.error) {
      console.error(`[Yahoo Finance] Yahoo error for ${indexSymbol}:`, data.chart.error);
      throw new Error(data.chart.error.description || 'Yahoo Finance error');
    }
    
    const result = data.chart.result[0];
    const meta = result.meta;
    const quote = result.indicators.quote[0];
    
    return {
      symbol: indexSymbol,
      name: indexSymbol,
      value: meta.regularMarketPrice || 0,
      change: meta.regularMarketPrice - meta.previousClose || 0,
      changePercent: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose * 100) || 0,
      open: quote.open[0] || meta.regularMarketPrice || 0,
      high: quote.high[0] || meta.regularMarketPrice || 0,
      low: quote.low[0] || meta.regularMarketPrice || 0,
      previousClose: meta.previousClose || 0,
    };
  } catch (error) {
    console.error('Error fetching index data:', error);
    return null;
  }
}

/**
 * Fetch multiple stock quotes at once
 */
export async function fetchBatchQuotes(symbols: string[]): Promise<(StockQuote | null)[]> {
  try {
    const promises = symbols.map(symbol => fetchStockQuote(symbol));
    return await Promise.all(promises);
  } catch (error) {
    console.error('Error fetching batch quotes:', error);
    return symbols.map(() => null);
  }
}

/**
 * Fetch historical data for a stock
 */
export async function fetchHistoricalData(
  symbol: string,
  range: '1d' | '5d' | '1mo' | '3mo' | '6mo' | '1y' | '5y' = '1mo'
): Promise<HistoricalDataPoint[]> {
  try {
    const yahooSymbol = toYahooSymbol(symbol);
    
    let url = '';
    if (USE_PROXY) {
      url = `${PROXY_BASE}?symbol=${yahooSymbol}&type=historical&range=${range}`;
    } else {
      url = `${YAHOO_API_BASE}/chart/${yahooSymbol}?interval=1d&range=${range}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch historical data');
    
    const data = await response.json();
    const result = data.chart.result[0];
    const timestamps = result.timestamp;
    const quote = result.indicators.quote[0];
    
    return timestamps.map((timestamp: number, index: number) => ({
      date: new Date(timestamp * 1000).toISOString().split('T')[0],
      open: quote.open[index] || 0,
      high: quote.high[index] || 0,
      low: quote.low[index] || 0,
      close: quote.close[index] || 0,
      volume: quote.volume[index] || 0,
    }));
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return [];
  }
}

/**
 * Fetch top gainers/losers from NIFTY 50
 */
export async function fetchTopMovers(type: 'gainers' | 'losers' = 'gainers'): Promise<StockQuote[]> {
  try {
    // Common NIFTY 50 stocks
    const nifty50Symbols = [
      'RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK',
      'HINDUNILVR', 'ITC', 'SBIN', 'BHARTIARTL', 'KOTAKBANK',
      'LT', 'AXISBANK', 'ASIANPAINT', 'MARUTI', 'TITAN',
      'SUNPHARMA', 'ULTRACEMCO', 'NESTLEIND', 'BAJFINANCE', 'WIPRO'
    ];
    
    const quotes = await fetchBatchQuotes(nifty50Symbols);
    const validQuotes = quotes.filter((q): q is StockQuote => q !== null);
    
    // Sort by change percent
    validQuotes.sort((a, b) => {
      return type === 'gainers' 
        ? b.changePercent - a.changePercent 
        : a.changePercent - b.changePercent;
    });
    
    return validQuotes.slice(0, 5);
  } catch (error) {
    console.error('Error fetching top movers:', error);
    return [];
  }
}

/**
 * Check if market is open (simplified - checks IST time)
 */
export function isMarketOpen(): boolean {
  const now = new Date();
  const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const hours = istTime.getHours();
  const minutes = istTime.getMinutes();
  const day = istTime.getDay();
  
  // Market closed on weekends
  if (day === 0 || day === 6) return false;
  
  // Market hours: 9:15 AM to 3:30 PM IST
  const marketStart = 9 * 60 + 15; // 9:15 AM in minutes
  const marketEnd = 15 * 60 + 30; // 3:30 PM in minutes
  const currentTime = hours * 60 + minutes;
  
  return currentTime >= marketStart && currentTime <= marketEnd;
}
