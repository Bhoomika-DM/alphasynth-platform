# NSE Data Integration Guide

## Overview
This guide explains how to fetch real-time data from NSE (National Stock Exchange of India) and integrate it into AlphaSynth.

## Architecture Options

### Option 1: Direct Frontend Fetch (Simple but Limited)
**Pros:** Easy to implement, no backend needed
**Cons:** CORS issues, rate limiting, no API key security

### Option 2: Backend API Proxy (Recommended)
**Pros:** Secure, handles CORS, can cache data, rate limit control
**Cons:** Requires backend setup

### Option 3: Third-Party Data Providers (Most Reliable)
**Pros:** Official APIs, reliable, comprehensive data
**Cons:** May have costs, API key management

---

## Implementation Plan

### Phase 1: Backend API Setup (Node.js/Express)

Create a backend API that fetches NSE data and serves it to your frontend.

#### File Structure:
```
backend/
├── server.js
├── routes/
│   └── nse.js
├── services/
│   └── nseService.js
└── package.json
```

#### Install Dependencies:
```bash
npm install express axios cors dotenv node-cache
```

---

## Phase 2: NSE Data Service

### Multiple Data Source Strategy

1. **Primary Source:** NSE Official Endpoints (when available)
2. **Fallback 1:** Yahoo Finance API
3. **Fallback 2:** Alpha Vantage
4. **Fallback 3:** Cached data

---

## Available NSE Endpoints

### 1. Market Status
```
GET https://www.nseindia.com/api/marketStatus
```

### 2. Stock Quote
```
GET https://www.nseindia.com/api/quote-equity?symbol=TCS
```

### 3. Market Data
```
GET https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050
```

### 4. Historical Data
```
GET https://www.nseindia.com/api/historical/cm/equity?symbol=TCS&series=[%22EQ%22]&from=01-01-2024&to=31-12-2024
```

### 5. Corporate Actions
```
GET https://www.nseindia.com/api/corporates-corporateActions?index=equities&symbol=TCS
```

### 6. Top Gainers/Losers
```
GET https://www.nseindia.com/api/live-analysis-variations?index=gainers
GET https://www.nseindia.com/api/live-analysis-variations?index=losers
```

---

## Important Notes

### CORS & Headers
NSE blocks direct browser requests. You MUST:
1. Use a backend proxy
2. Include proper headers:
   - User-Agent
   - Accept
   - Accept-Language
   - Referer (optional)

### Rate Limiting
- NSE may rate limit requests
- Implement caching (5-60 seconds for real-time data)
- Use exponential backoff for retries

### Legal Considerations
- Check NSE Terms of Service
- For commercial use, consider official data vendors
- Respect rate limits and fair use

---

## Alternative Data Providers

### 1. **Upstox API** (Recommended for Indian Markets)
- Official broker API
- Real-time data
- Free for registered users
- https://upstox.com/developer/api-documentation/

### 2. **Zerodha Kite Connect**
- Reliable Indian market data
- WebSocket support for real-time
- Paid service
- https://kite.trade/

### 3. **Alpha Vantage**
- Free tier: 5 API calls/minute
- Supports Indian stocks (.BSE, .NS)
- https://www.alphavantage.co/

### 4. **Finnhub**
- Free tier available
- Good coverage of Indian stocks
- https://finnhub.io/

### 5. **Yahoo Finance (yfinance)**
- Free, no API key needed
- Good for historical data
- Symbol format: TCS.NS (NSE), TCS.BO (BSE)

---

## Data You Can Fetch

### Real-time Data
- Current price
- Day high/low
- Open price
- Previous close
- Volume
- Market cap
- P/E ratio
- 52-week high/low

### Historical Data
- OHLCV (Open, High, Low, Close, Volume)
- Adjusted close
- Dividends
- Stock splits

### Fundamental Data
- Financial statements
- Balance sheet
- Cash flow
- Income statement
- Key ratios

### Market Data
- Index values (NIFTY 50, SENSEX)
- Sector performance
- Top gainers/losers
- Most active stocks
- Market breadth

### Corporate Actions
- Dividends
- Bonus issues
- Stock splits
- Rights issues
- Board meetings

---

## Next Steps

1. **Choose Your Approach:**
   - Quick prototype: Use Yahoo Finance directly
   - Production app: Build backend proxy + use multiple sources
   - Enterprise: Use official broker APIs (Upstox/Zerodha)

2. **Set Up Backend:**
   - Create Express server
   - Implement NSE service with fallbacks
   - Add caching layer
   - Handle errors gracefully

3. **Update Frontend:**
   - Create API client
   - Update components to use real data
   - Add loading states
   - Handle errors

4. **Testing:**
   - Test with multiple symbols
   - Test error scenarios
   - Test rate limiting
   - Monitor performance

---

## Cost Considerations

### Free Options:
- Yahoo Finance (unlimited, no key)
- NSE website scraping (risky, may break)
- Alpha Vantage (5 calls/min)
- Finnhub (60 calls/min)

### Paid Options:
- Upstox API (~₹2000/month)
- Zerodha Kite Connect (₹2000/month)
- Alpha Vantage Premium ($49.99/month)
- Professional data vendors (expensive)

---

## Recommended Stack for AlphaSynth

**For MVP/Development:**
```
Frontend (Next.js) → Yahoo Finance API (free)
```

**For Production:**
```
Frontend (Next.js) → Backend API (Node.js/Express) → Multiple Sources:
  1. NSE endpoints (primary)
  2. Yahoo Finance (fallback)
  3. Alpha Vantage (fallback)
  4. Redis Cache (5-60s TTL)
```

**For Enterprise:**
```
Frontend → Backend → Upstox/Zerodha API → WebSocket for real-time
```
