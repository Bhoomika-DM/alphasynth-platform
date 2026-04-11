// NSE Website Links Helper
// Generate URLs to NSE website for deep linking

/**
 * Get NSE stock quote page URL
 * @param symbol - Stock symbol (e.g., "TCS", "INFY")
 * @returns URL to NSE stock quote page
 */
export function getNSEStockUrl(symbol: string): string {
  return `https://www.nseindia.com/get-quotes/equity?symbol=${symbol}`
}

/**
 * Get NSE index page URL
 * @param index - Index name (e.g., "NIFTY 50", "NIFTY BANK")
 * @returns URL to NSE index page
 */
export function getNSEIndexUrl(index: string): string {
  return `https://www.nseindia.com/market-data/live-equity-market?symbol=${encodeURIComponent(index)}`
}

/**
 * Get NSE market data page URL
 * @returns URL to NSE live market data page
 */
export function getNSEMarketDataUrl(): string {
  return 'https://www.nseindia.com/market-data/live-equity-market'
}

/**
 * Get NSE corporate actions page URL
 * @param symbol - Stock symbol (optional)
 * @returns URL to NSE corporate actions page
 */
export function getNSECorporateActionsUrl(symbol?: string): string {
  if (symbol) {
    return `https://www.nseindia.com/companies-listing/corporate-filings-actions?symbol=${symbol}`
  }
  return 'https://www.nseindia.com/companies-listing/corporate-filings-actions'
}

/**
 * Get NSE historical data page URL
 * @param symbol - Stock symbol
 * @returns URL to NSE historical data page
 */
export function getNSEHistoricalDataUrl(symbol: string): string {
  return `https://www.nseindia.com/report-detail/eq_security?symbol=${symbol}`
}

/**
 * Get NSE financial results page URL
 * @param symbol - Stock symbol
 * @returns URL to NSE financial results page
 */
export function getNSEFinancialResultsUrl(symbol: string): string {
  return `https://www.nseindia.com/companies-listing/corporate-filings-financial-results?symbol=${symbol}`
}

/**
 * Get NSE shareholding pattern page URL
 * @param symbol - Stock symbol
 * @returns URL to NSE shareholding pattern page
 */
export function getNSEShareholdingUrl(symbol: string): string {
  return `https://www.nseindia.com/companies-listing/corporate-filings-shareholding-pattern?symbol=${symbol}`
}

/**
 * Get NSE board meetings page URL
 * @param symbol - Stock symbol
 * @returns URL to NSE board meetings page
 */
export function getNSEBoardMeetingsUrl(symbol: string): string {
  return `https://www.nseindia.com/companies-listing/corporate-filings-board-meetings?symbol=${symbol}`
}

/**
 * Get NSE announcements page URL
 * @param symbol - Stock symbol
 * @returns URL to NSE announcements page
 */
export function getNSEAnnouncementsUrl(symbol: string): string {
  return `https://www.nseindia.com/companies-listing/corporate-filings-announcements?symbol=${symbol}`
}

/**
 * Get NSE top gainers page URL
 * @returns URL to NSE top gainers page
 */
export function getNSETopGainersUrl(): string {
  return 'https://www.nseindia.com/market-data/live-equity-market?symbol=gainers'
}

/**
 * Get NSE top losers page URL
 * @returns URL to NSE top losers page
 */
export function getNSETopLosersUrl(): string {
  return 'https://www.nseindia.com/market-data/live-equity-market?symbol=losers'
}

/**
 * Get NSE most active page URL
 * @returns URL to NSE most active stocks page
 */
export function getNSEMostActiveUrl(): string {
  return 'https://www.nseindia.com/market-data/live-equity-market?symbol=volume'
}

/**
 * Open NSE URL in new tab
 * @param url - URL to open
 */
export function openNSEUrl(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer')
}

/**
 * Open NSE stock page in new tab
 * @param symbol - Stock symbol
 */
export function openNSEStock(symbol: string): void {
  openNSEUrl(getNSEStockUrl(symbol))
}

/**
 * Open NSE index page in new tab
 * @param index - Index name
 */
export function openNSEIndex(index: string): void {
  openNSEUrl(getNSEIndexUrl(index))
}
