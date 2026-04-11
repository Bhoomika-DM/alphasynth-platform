# Complete NSE Integration Plan

## Strategy

### For Implemented Features:
✅ Fetch real data from NSE
✅ Display in your cloned UI
✅ Auto-refresh every 30-60 seconds

### For Unimplemented Features:
✅ Add "View on NSE" button/link
✅ Opens official NSE page in new tab
✅ User gets full details from source

---

## Dashboard Page (`/dashboard`)

### Section 1: Top Ticker Bar
**Status:** ✅ Implement with real data
**Data needed:**
- NIFTY 50, SENSEX, BANK NIFTY, etc.
- Current price, change, % change

**Implementation:**
```typescript
import { useBatchQuotes } from '@/hooks/useNSEData'

const symbols = ['NIFTY 50', 'SENSEX', 'NIFTY BANK', ...]
const { data: indices } = useBatchQuotes(symbols, 30000)
```

---

### Section 2: NIFTY Indices Carousel
**Status:** ✅ Implement with real data
**Data needed:**
- NIFTY 50, NIFTY NEXT 50, NIFTY FIN SERVICE, NIFTY BANK, NIFTY 100

**Implementation:**
```typescript
import { useIndexData } from '@/hooks/useNSEData'

const { data: nifty50 } = useIndexData('NIFTY 50', 30000)
const { data: niftyNext50 } = useIndexData('NIFTY NEXT 50', 30000)
// ... etc
```

---

### Section 3: Main Chart (Selected Index)
**Status:** ✅ Implement with real data
**Data needed:**
- Historical price data for selected index
- OHLC data

**Implementation:**
```typescript
import { useHistoricalData } from '@/hooks/useNSEData'

const { data: chartData } = useHistoricalData(
  selectedIndex, 
  fromDate, 
  toDate
)
```

---

### Section 4: Market Statistics
**Status:** ✅ Implement with real data
**Data needed:**
- Advances, Declines
- 52 Week High/Low
- Upper/Lower Circuit
- Registered Investors
- Market Capitalization

**Implementation:**
```typescript
import { useMarketStatus } from '@/hooks/useNSEData'

const { data: marketStats } = useMarketStatus(60000)
```

---

### Section 5: Market Snapshot (Gainers/Losers)
**Status:** ✅ Implement with real data
**Data needed:**
- Top gainers
- Top losers
- Most active by value/volume

**Implementation:**
```typescript
import { useTopGainers, useTopLosers } from '@/hooks/useNSEData'

const { data: gainers } = useTopGainers(60000)
const { data: losers } = useTopLosers(60000)
```

---

### Section 6: Corporate Info
**Status:** ❌ Link to NSE
**Reason:** Complex data, multiple sub-sections

**Implementation:**
```typescript
import ViewOnNSEButton from '@/components/ui/ViewOnNSEButton'
import { getNSECorporateActionsUrl } from '@/lib/nseLinks'

<div className="corporate-info-section">
  <h3>Corporate Info</h3>
  <p>View latest corporate announcements, actions, and financial results</p>
  
  <ViewOnNSEButton 
    url={getNSECorporateActionsUrl()} 
    label="View Corporate Info on NSE"
    variant="primary"
  />
</div>
```

---

### Section 7: Reference Rates
**Status:** ❌ Link to NSE
**Reason:** Currency, interest rates, commodity data - complex

**Implementation:**
```typescript
<div className="reference-rates-section">
  <h3>Reference Rates</h3>
  <p>Currency spot rates, interest rates, and commodity prices</p>
  
  <ViewOnNSEButton 
    url="https://www.nseindia.com/market-data/reference-rates" 
    label="View Reference Rates on NSE"
    variant="primary"
  />
</div>
```

---

### Section 8: Currency Snapshot
**Status:** ❌ Link to NSE
**Reason:** Currency derivatives data

**Implementation:**
```typescript
<div className="currency-snapshot-section">
  <h3>Currency Snapshot</h3>
  <p>INR contracts and cross-currency contracts</p>
  
  <ViewOnNSEButton 
    url="https://www.nseindia.com/market-data/currency-derivatives" 
    label="View Currency Data on NSE"
    variant="primary"
  />
</div>
```

---

## Stock Page (`/stock/[symbol]`)

### Section 1: Stock Header
**Status:** ✅ Implement with real data
**Data needed:**
- Stock name, ISIN
- Current price, change, % change
- Prev Close, Open, High, Low, Close, VWAP

**Implementation:**
```typescript
import { useStockQuote } from '@/hooks/useNSEData'

const { data: stockData } = useStockQuote(symbol, 30000)
```

---

### Section 2: Stock Chart
**Status:** ✅ Implement with real data
**Data needed:**
- Historical OHLC data
- Different timeframes (1D, 1W, 1M, 3M, 6M, 1Y, 5Y)

**Implementation:**
```typescript
import { useHistoricalData } from '@/hooks/useNSEData'

const { data: chartData } = useHistoricalData(
  symbol,
  getFromDate(selectedPeriod),
  getTodayDate()
)
```

---

### Section 3: Order Book
**Status:** ❌ Link to NSE
**Reason:** Real-time order book requires WebSocket/paid API

**Implementation:**
```typescript
<div className="order-book-section">
  <h3>Order Book</h3>
  <p>Real-time bid/ask orders</p>
  
  <ViewOnNSEButton 
    url={getNSEStockUrl(symbol)} 
    label="View Live Order Book on NSE"
    variant="primary"
  />
</div>
```

---

### Section 4: Corporate Actions
**Status:** ❌ Link to NSE
**Reason:** Multiple sub-sections (announcements, board meetings, etc.)

**Implementation:**
```typescript
<div className="corporate-actions-tabs">
  {/* Dashboard Tab */}
  <ViewOnNSEButton 
    url={getNSECorporateActionsUrl(symbol)} 
    label="View on NSE"
    variant="link"
  />
  
  {/* Announcements Tab */}
  <ViewOnNSEButton 
    url={getNSEAnnouncementsUrl(symbol)} 
    label="View on NSE"
    variant="link"
  />
  
  {/* Board Meetings Tab */}
  <ViewOnNSEButton 
    url={getNSEBoardMeetingsUrl(symbol)} 
    label="View on NSE"
    variant="link"
  />
  
  {/* Financial Results Tab */}
  <ViewOnNSEButton 
    url={getNSEFinancialResultsUrl(symbol)} 
    label="View on NSE"
    variant="link"
  />
</div>
```

---

## Implementation Priority

### Phase 1: High Priority (Implement with Real Data)
1. ✅ Top ticker bar (indices)
2. ✅ NIFTY indices carousel
3. ✅ Main chart
4. ✅ Market statistics
5. ✅ Top gainers/losers
6. ✅ Stock header (price, OHLC)
7. ✅ Stock chart

**Time:** 3-4 hours

---

### Phase 2: Medium Priority (Add NSE Links)
1. ✅ Corporate info section
2. ✅ Reference rates
3. ✅ Currency snapshot
4. ✅ Order book
5. ✅ Corporate actions tabs

**Time:** 1 hour

---

### Phase 3: Polish & Testing
1. ✅ Test all real data displays correctly
2. ✅ Test all NSE links open correctly
3. ✅ Test during market hours
4. ✅ Test during market closed
5. ✅ Test with different symbols

**Time:** 1 hour

---

## Total Implementation Time: 5-6 hours

---

## File Changes Summary

### Files to Modify:
1. `app/dashboard/page.tsx` - Replace mock data, add NSE links
2. `app/stock/[symbol]/page.tsx` - Replace mock data, add NSE links

### Files Already Created:
1. ✅ `lib/nseLinks.ts` - URL generators
2. ✅ `components/ui/ViewOnNSEButton.tsx` - Reusable button
3. ✅ `hooks/useNSEData.ts` - React hooks for data fetching
4. ✅ `lib/nseApi.ts` - API client
5. ✅ `backend/server.js` - Proxy server

---

## Quick Start Commands

### 1. Start Backend
```bash
cd backend
npm install
npm run dev
```

### 2. Update Frontend Environment
```bash
# frontend/.env.local
NEXT_PUBLIC_NSE_API_URL=http://localhost:3001
```

### 3. Start Frontend
```bash
cd frontend
npm run dev
```

---

## Example: Dashboard Page Update

### Before (Mock Data):
```typescript
const niftyIndices = [
  { name: 'NIFTY 50', value: 22968.25, change: 255.15, ... }, // MOCK
]
```

### After (Real Data):
```typescript
import { useIndexData } from '@/hooks/useNSEData'

const { data: nifty50, loading } = useIndexData('NIFTY 50', 30000)

// Use real data
const niftyIndices = [
  {
    name: 'NIFTY 50',
    value: nifty50?.last || 0,
    change: nifty50?.variation || 0,
    changePercent: nifty50?.percentChange || 0,
    ...
  }
]
```

---

## Example: Stock Page Update

### Before (Mock Data):
```typescript
const stockData = {
  'TCS': {
    price: 2543.50,  // MOCK
    change: 69.60,   // MOCK
  }
}
```

### After (Real Data):
```typescript
import { useStockQuote } from '@/hooks/useNSEData'

const { data: stockData, loading } = useStockQuote(symbol, 30000)

// Use real data directly
const price = stockData?.lastPrice || 0
const change = stockData?.change || 0
```

---

## Example: Add NSE Link to Unimplemented Section

```typescript
import ViewOnNSEButton from '@/components/ui/ViewOnNSEButton'
import { getNSECorporateActionsUrl } from '@/lib/nseLinks'

<div className="corporate-info-section">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-bold">Corporate Info</h3>
    <ViewOnNSEButton 
      url={getNSECorporateActionsUrl()} 
      label="View on NSE"
      variant="link"
      size="sm"
    />
  </div>
  
  <p className="text-sm text-[#6B7280] mb-4">
    View detailed corporate announcements, actions, and financial results on NSE website
  </p>
  
  <ViewOnNSEButton 
    url={getNSECorporateActionsUrl()} 
    label="View Full Corporate Info on NSE"
    variant="primary"
    className="w-full"
  />
</div>
```

---

## Ready to Implement?

I can now:
1. ✅ Update dashboard page with real data + NSE links
2. ✅ Update stock page with real data + NSE links
3. ✅ Test everything works

Should I proceed with the implementation? 🚀
