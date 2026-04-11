# Replace Mock Data with Real NSE Data - Implementation Plan

## Current Situation

✅ **UI is perfect** - Cloned from NSE website
❌ **Data is mock** - Hardcoded values
✅ **Need real data** - Fetch from NSE and populate

## Pages to Update

### 1. Dashboard Page (`/dashboard`)
**Mock data to replace:**
- NIFTY indices (NIFTY 50, NIFTY NEXT 50, NIFTY FIN SERVICE, etc.)
- Market Statistics (Advances, Declines, 52 Week High/Low, etc.)
- Top Gainers/Losers
- Corporate Info
- Reference Rates
- Currency Snapshot

### 2. Stock Page (`/stock/[symbol]`)
**Mock data to replace:**
- Stock price, change, % change
- OHLC (Open, High, Low, Close)
- VWAP, Previous Close
- Chart data
- Order book
- Corporate actions

## Solution: Use Backend Proxy + React Hooks

### Step 1: Start Backend Server
```bash
cd backend
npm install
npm run dev
```

### Step 2: Update Dashboard with Real Data

Replace this mock data:
```typescript
const niftyIndices = [
  { name: 'NIFTY 50', value: 22968.25, change: 255.15, ... }, // MOCK
  ...
]
```

With real data fetch:
```typescript
import { useIndexData, useTopGainers, useTopLosers } from '@/hooks/useNSEData'

// Fetch real NIFTY 50 data
const { data: nifty50 } = useIndexData('NIFTY 50', 30000)

// Fetch real top gainers
const { data: gainers } = useTopGainers(60000)

// Fetch real top losers
const { data: losers } = useTopLosers(60000)
```

### Step 3: Update Stock Page with Real Data

Replace this mock data:
```typescript
const stockData = {
  'TCS': {
    price: 2543.50,  // MOCK
    change: 69.60,   // MOCK
    ...
  }
}
```

With real data fetch:
```typescript
import { useStockQuote } from '@/hooks/useNSEData'

// Fetch real TCS data
const { data: stockData } = useStockQuote(symbol, 30000)
```

## Implementation Steps

### Phase 1: Dashboard Page (1 hour)

1. Import hooks at top
2. Replace `niftyIndices` array with real data
3. Replace market statistics with real data
4. Replace top movers with real data
5. Test and verify

### Phase 2: Stock Page (1 hour)

1. Import hooks at top
2. Replace `stockData` object with real data
3. Update chart data generation
4. Test with multiple symbols (TCS, INFY, RELIANCE)

### Phase 3: Testing (30 minutes)

1. Test during market hours
2. Test during market closed
3. Test with different symbols
4. Verify data accuracy

## Total Time: 2.5 hours

Would you like me to implement this now?
