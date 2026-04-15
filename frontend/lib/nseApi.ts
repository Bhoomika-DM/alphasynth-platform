// NSE API Client for Frontend
// This client communicates with the backend proxy server

const API_BASE_URL = process.env.NEXT_PUBLIC_NSE_API_URL || 'http://localhost:3001';

interface ApiResponse<T> {
  source: 'nse' | 'yahoo' | 'cache';
  data: T;
  error?: string;
}

class NSEApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async fetchApi<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('NSE API Client Error:', error);
      throw error;
    }
  }

  private async postApi<T>(endpoint: string, body: any): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('NSE API Client Error:', error);
      throw error;
    }
  }

  /**
   * Get stock quote for a single symbol
   */
  async getQuote(symbol: string) {
    return this.fetchApi(`/api/quote/${symbol}`);
  }

  /**
   * Get market status (open/closed)
   */
  async getMarketStatus() {
    return this.fetchApi('/api/market-status');
  }

  /**
   * Get index data (NIFTY 50, BANK NIFTY, etc.)
   */
  async getIndex(indexName: string) {
    return this.fetchApi(`/api/index/${encodeURIComponent(indexName)}`);
  }

  /**
   * Get top gainers
   */
  async getTopGainers() {
    return this.fetchApi('/api/top-gainers');
  }

  /**
   * Get top losers
   */
  async getTopLosers() {
    return this.fetchApi('/api/top-losers');
  }

  /**
   * Get historical data for a symbol
   */
  async getHistoricalData(symbol: string, from: string, to: string) {
    return this.fetchApi(
      `/api/historical/${symbol}?from=${from}&to=${to}`
    );
  }

  /**
   * Get corporate actions (dividends, splits, etc.)
   */
  async getCorporateActions(symbol: string) {
    return this.fetchApi(`/api/corporate-actions/${symbol}`);
  }

  /**
   * Get multiple quotes at once (batch request)
   */
  async getBatchQuotes(symbols: string[]) {
    return this.postApi('/api/quotes/batch', { symbols });
  }

  /**
   * Health check
   */
  async healthCheck() {
    return this.fetchApi('/health');
  }
}

// Export singleton instance
export const nseApi = new NSEApiClient();

// Export types
export interface StockQuote {
  symbol: string;
  companyName: string;
  lastPrice: number;
  change: number;
  pChange: number;
  previousClose: number;
  open: number;
  dayHigh: number;
  dayLow: number;
  totalTradedVolume: number;
  totalTradedValue: number;
  lastUpdateTime: string;
  yearHigh: number;
  yearLow: number;
  perChange365d: number;
  perChange30d: number;
}

export interface MarketStatus {
  marketState: string;
  tradeDate: string;
  index: string;
  last: number;
  variation: number;
  percentChange: number;
  marketStatusMessage: string;
}

export interface IndexData {
  name: string;
  last: number;
  variation: number;
  percentChange: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  yearHigh: number;
  yearLow: number;
  pe: number;
  pb: number;
  dy: number;
}

export interface TopMover {
  symbol: string;
  series: string;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  ltp: number;
  previousPrice: number;
  netPrice: number;
  tradedQuantity: number;
  turnoverInLakhs: number;
  lastCorpAnnouncementDate: string;
  lastCorpAnnouncement: string;
}

export interface HistoricalData {
  symbol: string;
  series: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  last: number;
  previousClose: number;
  totalTradedQuantity: number;
  totalTradedValue: number;
  timestamp: string;
}

export interface CorporateAction {
  symbol: string;
  company: string;
  industry: string;
  series: string;
  faceVal: number;
  subject: string;
  exDate: string;
  recordDate: string;
  bcStartDate: string;
  bcEndDate: string;
  ndStartDate: string;
  ndEndDate: string;
  actualPaymentDate: string;
  purpose: string;
}

