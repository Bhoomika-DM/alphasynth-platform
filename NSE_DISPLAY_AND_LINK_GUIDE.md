# NSE Display & Link Integration Guide

## Your Requirement Summary

✅ **Display NSE data** in AlphaSynth (with your Sage & Gold design)
✅ **Click for details** → Opens NSE website in new tab
✅ **Simple approach** - No complex backend analysis

## How It Works

```
┌─────────────────────────────────────┐
│   AlphaSynth Dashboard              │
│                                     │
│   TCS - ₹3,542.30 (+2.28%)         │
│   [View on NSE →]                   │
└─────────────────────────────────────┘
           ↓ (User clicks)
┌─────────────────────────────────────┐
│   NSE Website (New Tab)             │
│   https://www.nseindia.com/...      │
│   (Full details from official NSE)  │
└─────────────────────────────────────┘
```

## Implementation

### 1. Helper Functions (Already Created)
File: `frontend/lib/nseLinks.ts`

```typescript
import { getNSEStockUrl, openNSEStock } from '@/lib/nseLinks'

// Get URL
const url = getNSEStockUrl('TCS')
// https://www.nseindia.com/get-quotes/equity?symbol=TCS

// Open in new tab
openNSEStock('TCS')
```

### 2. Reusable Button Component (Already Created)
File: `frontend/components/ui/ViewOnNSEButton.tsx`

```typescript
import ViewOnNSEButton from '@/components/ui/ViewOnNSEButton'
import { getNSEStockUrl } from '@/lib/nseLinks'

<ViewOnNSEButton 
  url={getNSEStockUrl('TCS')} 
  label="View on NSE"
  variant="primary"  // or "secondary" or "link"
  size="md"          // or "sm" or "lg"
/>
```

## Where to Add NSE Links

### Dashboard Components

#### 1. Market Summary
```typescript
// Add button at top right
<ViewOnNSEButton 
  url={getNSEMarketDataUrl()} 
  label="View on NSE"
  variant="link"
  size="sm"
/>

// Add button at bottom
<ViewOnNSEButton 
  url={getNSEMarketDataUrl()} 
  label="View Full Market Data on NSE"
  variant="primary"
  className="w-full"
/>
```

#### 2. Top Movers (Each Stock Card)
```typescript
{topMovers.map((stock) => (
  <div className="stock-card">
    <h3>{stock.symbol}</h3>
    <p>₹{stock.price}</p>
    
    {/* Add NSE link */}
    <ViewOnNSEButton 
      url={getNSEStockUrl(stock.symbol)} 
      label="View Details"
      variant="secondary"
      size="sm"
    />
  </div>
))}
```

#### 3. Index Cards (NIFTY 50, BANK NIFTY)
```typescript
<div className="index-card">
  <h3>NIFTY 50</h3>
  <p>21,450.50</p>
  
  {/* Add NSE link */}
  <ViewOnNSEButton 
    url={getNSEIndexUrl('NIFTY 50')} 
    label="View on NSE"
    variant="link"
  />
</div>
```

#### 4. Watchlist Stocks
```typescript
{watchlist.map((stock) => (
  <div className="watchlist-item">
    <span>{stock.symbol}</span>
    <span>₹{stock.price}</span>
    
    {/* Add quick link */}
    <button onClick={() => openNSEStock(stock.symbol)}>
      <IconExternalLink />
    </button>
  </div>
))}
```

### Stock Analysis Page

#### 1. Stock Header
```typescript
<div className="stock-header">
  <h1>TCS - Tata Consultancy Services</h1>
  <p>₹3,542.30 (+2.28%)</p>
  
  {/* Add prominent NSE button */}
  <ViewOnNSEButton 
    url={getNSEStockUrl('TCS')} 
    label="View Full Details on NSE"
    variant="primary"
    size="lg"
  />
</div>
```

#### 2. Corporate Actions Section
```typescript
<div className="corporate-actions">
  <h3>Corporate Actions</h3>
  <p>Dividends, Splits, Bonuses</p>
  
  {/* Link to NSE corporate actions */}
  <ViewOnNSEButton 
    url={getNSECorporateActionsUrl('TCS')} 
    label="View on NSE"
    variant="secondary"
  />
</div>
```

#### 3. Financial Results Section
```typescript
<div className="financial-results">
  <h3>Financial Results</h3>
  <p>Quarterly & Annual Reports</p>
  
  {/* Link to NSE financial results */}
  <ViewOnNSEButton 
    url={getNSEFinancialResultsUrl('TCS')} 
    label="View on NSE"
    variant="secondary"
  />
</div>
```

#### 4. Historical Data Section
```typescript
<div className="historical-data">
  <h3>Historical Data</h3>
  <p>Price history & charts</p>
  
  {/* Link to NSE historical data */}
  <ViewOnNSEButton 
    url={getNSEHistoricalDataUrl('TCS')} 
    label="View on NSE"
    variant="secondary"
  />
</div>
```

## Complete Example: Stock Card Component

```typescript
'use client'

import ViewOnNSEButton from '@/components/ui/ViewOnNSEButton'
import { getNSEStockUrl } from '@/lib/nseLinks'

interface StockCardProps {
  symbol: string
  name: string
  price: number
  change: number
  pChange: number
}

export default function StockCard({ symbol, name, price, change, pChange }: StockCardProps) {
  return (
    <div className="bg-white border-2 border-[#6A994E]/10 rounded-xl p-6 hover:border-[#6A994E]/30 transition-all">
      {/* Header with NSE link */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-[#1F2933]">{symbol}</h3>
          <p className="text-xs text-[#6B7280]">{name}</p>
        </div>
        <ViewOnNSEButton 
          url={getNSEStockUrl(symbol)} 
          label="NSE"
          variant="link"
          size="sm"
        />
      </div>

      {/* Price Info */}
      <div className="mb-4">
        <div className="text-3xl font-bold text-[#1F2933] mb-1">
          ₹{price.toFixed(2)}
        </div>
        <div className={`text-sm font-bold ${
          pChange >= 0 ? 'text-[#6B9E5D]' : 'text-[#C85A54]'
        }`}>
          {pChange >= 0 ? '+' : ''}{change.toFixed(2)} ({pChange.toFixed(2)}%)
        </div>
      </div>

      {/* View Details Button */}
      <ViewOnNSEButton 
        url={getNSEStockUrl(symbol)} 
        label="View Full Details on NSE"
        variant="primary"
        size="md"
        className="w-full"
      />
    </div>
  )
}
```

## Available NSE URLs

### Stock Pages
```typescript
getNSEStockUrl('TCS')
// → https://www.nseindia.com/get-quotes/equity?symbol=TCS

getNSECorporateActionsUrl('TCS')
// → https://www.nseindia.com/companies-listing/corporate-filings-actions?symbol=TCS

getNSEFinancialResultsUrl('TCS')
// → https://www.nseindia.com/companies-listing/corporate-filings-financial-results?symbol=TCS

getNSEHistoricalDataUrl('TCS')
// → https://www.nseindia.com/report-detail/eq_security?symbol=TCS

getNSEShareholdingUrl('TCS')
// → https://www.nseindia.com/companies-listing/corporate-filings-shareholding-pattern?symbol=TCS
```

### Market Pages
```typescript
getNSEMarketDataUrl()
// → https://www.nseindia.com/market-data/live-equity-market

getNSETopGainersUrl()
// → https://www.nseindia.com/market-data/live-equity-market?symbol=gainers

getNSETopLosersUrl()
// → https://www.nseindia.com/market-data/live-equity-market?symbol=losers

getNSEIndexUrl('NIFTY 50')
// → https://www.nseindia.com/market-data/live-equity-market?symbol=NIFTY%2050
```

## Button Variants

### Primary (Sage Green)
```typescript
<ViewOnNSEButton 
  url={url} 
  variant="primary"  // Green button with border
/>
```

### Secondary (White with Border)
```typescript
<ViewOnNSEButton 
  url={url} 
  variant="secondary"  // White button with green border
/>
```

### Link (Text Link)
```typescript
<ViewOnNSEButton 
  url={url} 
  variant="link"  // Just text with icon, no button
/>
```

## Implementation Checklist

### Phase 1: Add Helper Files (Done ✅)
- [x] `lib/nseLinks.ts` - URL generator functions
- [x] `components/ui/ViewOnNSEButton.tsx` - Reusable button

### Phase 2: Update Dashboard Components
- [ ] `components/dashboard/MarketSummary.tsx` - Add NSE link
- [ ] `components/dashboard/TopMovers.tsx` - Add NSE links to each stock
- [ ] `components/dashboard/MarketSnapshot.tsx` - Add NSE links to indices
- [ ] `components/dashboard/Watchlist.tsx` - Add NSE links to watchlist items

### Phase 3: Update Stock Analysis Page
- [ ] `app/stock-analysis/page.tsx` - Add NSE button in header
- [ ] Add NSE links to each section (Corporate Actions, Financial Results, etc.)

### Phase 4: Update Trading Dashboard
- [ ] `app/trading/page.tsx` - Add NSE links to stock cards

### Phase 5: Test Everything
- [ ] Test all NSE links open correctly
- [ ] Test buttons work on mobile
- [ ] Test new tab opens properly
- [ ] Verify URLs are correct

## Quick Implementation Steps

### Step 1: Copy Files (Already Done)
```bash
# Files already created:
# - frontend/lib/nseLinks.ts
# - frontend/components/ui/ViewOnNSEButton.tsx
```

### Step 2: Update One Component (Example)
```typescript
// In any component, add:
import ViewOnNSEButton from '@/components/ui/ViewOnNSEButton'
import { getNSEStockUrl } from '@/lib/nseLinks'

// Then use:
<ViewOnNSEButton 
  url={getNSEStockUrl('TCS')} 
  label="View on NSE"
/>
```

### Step 3: Test
```bash
npm run dev
# Click the button
# Should open NSE website in new tab
```

## Benefits of This Approach

✅ **Simple** - Just add buttons, no complex backend
✅ **Fast** - Direct links, no API calls needed
✅ **Accurate** - Official NSE data (user sees source)
✅ **Legal** - Just linking, not scraping
✅ **Maintainable** - NSE updates their site, links still work
✅ **User-friendly** - Clear "View on NSE" buttons everywhere

## Next Steps

1. I can update all your components to add NSE links
2. Takes about 30 minutes to add buttons everywhere
3. Test and deploy

Would you like me to:
1. Update all dashboard components with NSE links?
2. Update stock analysis page with NSE links?
3. Both?

Let me know and I'll implement it right away!
