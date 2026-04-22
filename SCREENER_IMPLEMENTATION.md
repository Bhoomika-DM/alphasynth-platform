# Automated & Manual Screener Implementation

## Overview
Replaced "High-Conviction Ideas" and "Logic Builder" with "Automated Screener" and "Manual Screener" in the onboarding modal, matching the design from the provided screenshots.

## Changes Made

### 1. Updated Onboarding Config
**File:** `frontend/components/onboarding/onboarding-config.ts`

**Replaced Options:**
- ❌ High-Conviction Ideas → ✅ Automated Screener
- ❌ Logic Builder → ✅ Manual Screener

**New Configuration:**
```typescript
discover: [
  {
    id: 'screener',
    title: 'Stock Screener',
    route: '/institutional-screener?tab=prebuilt',
  },
  {
    id: 'automated-screener',
    title: 'Automated Screener',
    subtitle: 'Pattern-based trade ideas across NIFTY-50 & Next-50',
    route: '/screener/automated',
  },
  {
    id: 'manual-screener',
    title: 'Manual Screener',
    subtitle: 'Build custom criteria and filter stocks',
    route: '/screener/manual',
  },
  {
    id: 'compare',
    title: 'Compare Stocks',
    route: '/institutional-screener?tab=custom&action=compare',
  },
]
```

---

## 2. Automated Screener Page

### File: `frontend/app/screener/automated/page.tsx`

### Features:

#### **View Toggle**
- Switch between Automated and Manual Screener
- Prominent toggle buttons at the top

#### **Stats Dashboard**
- **Patterns Detected:** Total patterns found (71)
- **Bullish (BUY):** High-conviction buy signals
- **Bearish (SELL):** High-conviction sell signals
- **Forming (WATCH):** Approaching breakout patterns

#### **Filters**
- Search by stock, pattern, or sector
- Signal type filter (BUY, SELL, WATCH)
- Sector dropdown (All, IT, Banking, FMCG, Energy)
- Confidence filter (65%+, 75%+, 85%+)

#### **Signal Cards**
Each card displays:
- **Stock Info:** Symbol, name, sector
- **Pattern:** Technical pattern detected (e.g., INVERSE HEAD & SHOULDERS, RISING WEDGE)
- **Signal Type:** BUY SIGNAL, SELL SIGNAL, or WATCH
- **Description:** Detailed explanation of the pattern
- **Price Levels:**
  - Entry price
  - Target price
  - Stop loss
- **Metrics:**
  - Risk:Reward ratio
  - Win-rate percentage
  - Confidence score (0-100)
  - Volume confirmation

#### **Sample Signals:**

1. **HINDUNILVR - BUY SIGNAL**
   - Pattern: INVERSE HEAD & SHOULDERS
   - Entry: ₹2,368.80
   - Target: ₹2,568.30
   - Stop: ₹2,306.43
   - Risk:Reward: 1:3.20
   - Confidence: 80/100

2. **TECHM - SELL SIGNAL**
   - Pattern: RISING WEDGE
   - Entry: ₹1,462.60
   - Target: ₹1,391.36
   - Stop: ₹1,559.29
   - Risk:Reward: 1:0.74
   - Confidence: 86/100

3. **RELIANCE - BUY SIGNAL**
   - Pattern: DOUBLE BOTTOM
   - Entry: ₹2,245.50
   - Target: ₹2,450.00
   - Stop: ₹2,180.00
   - Risk:Reward: 1:3.12
   - Confidence: 75/100

4. **HDFCBANK - WATCH**
   - Pattern: ASCENDING TRIANGLE
   - Entry: ₹1,650.00
   - Target: ₹1,780.00
   - Stop: ₹1,600.00
   - Risk:Reward: 1:2.60
   - Confidence: 69/100

#### **Actions**
- Refresh button to update signals
- Run Full Scan button to trigger new analysis
- Star button to add to watchlist

---

## 3. Manual Screener Page

### File: `frontend/app/screener/manual/page.tsx`

### Features:

#### **View Toggle**
- Switch between Automated and Manual Screener
- Consistent navigation with Automated Screener

#### **Criteria Builder**
- Add multiple criteria with AND logic
- Each criterion has:
  - **Field:** Market Cap, P/E Ratio, P/B Ratio, Dividend Yield, ROE, ROCE, etc.
  - **Operator:** >, <, >=, <=, =, !=
  - **Value:** User input
- Add/Remove criteria dynamically
- Visual AND connector between criteria

#### **Available Fields:**
- Market Cap
- P/E Ratio
- P/B Ratio
- Dividend Yield
- ROE (Return on Equity)
- ROCE (Return on Capital Employed)
- Debt to Equity
- Current Ratio
- Revenue Growth
- Profit Growth
- Price
- 52W High/Low
- Volume
- Beta

#### **Saved Screens**
Pre-built screens for quick access:
- Quality Compounders (23 stocks)
- Value Stocks (45 stocks)
- High Growth (18 stocks)
- Dividend Aristocrats (12 stocks)

#### **Results Table**
Displays matching stocks with:
- Symbol
- Name
- Current Price
- Change %
- Market Cap
- P/E Ratio
- Sector
- Analyze button (links to stock detail page)

#### **Actions**
- Run Screen button
- Save Screen button
- Reset button
- Export results button

#### **Sample Results:**
1. RELIANCE - ₹2,450.50 (+2.3%)
2. TCS - ₹3,650.80 (+1.8%)
3. HDFCBANK - ₹1,650.20 (-0.5%)
4. INFY - ₹1,480.40 (+1.2%)
5. HINDUNILVR - ₹2,368.80 (+0.8%)

---

## Design System

### Colors
- **Primary Teal:** `#0D7C8C`
- **Navy:** `#1B2A4A`
- **Green (Buy):** `#1A6B3A`
- **Red (Sell):** `#8C1A1A`
- **Orange (Watch):** `#B8860B`
- **Background:** `#F8F9FB`
- **Text:** `#2D3748`
- **Muted:** `#718096`

### Components
- Consistent header with NavigationHeader
- Toggle buttons for view switching
- Stats cards with icons
- Filter controls
- Signal cards with color-coded borders
- Results table with hover effects

---

## User Flow

### Automated Screener Flow:
1. User selects "Automated Screener" from onboarding modal
2. Lands on `/screener/automated`
3. Views pattern-based signals with stats
4. Filters by signal type (BUY/SELL/WATCH)
5. Filters by sector and confidence
6. Reviews signal cards with detailed analysis
7. Can switch to Manual Screener

### Manual Screener Flow:
1. User selects "Manual Screener" from onboarding modal
2. Lands on `/screener/manual`
3. Builds custom criteria using dropdowns
4. Adds multiple criteria with AND logic
5. Runs screen to see matching stocks
6. Reviews results in table format
7. Can save screen for future use
8. Can click "Analyze" to view stock details
9. Can switch to Automated Screener

---

## Navigation Integration

### From Onboarding Modal:
- "Automated Screener" → `/screener/automated`
- "Manual Screener" → `/screener/manual`

### Between Screeners:
- Toggle buttons allow seamless switching
- State is preserved when switching views

---

## Technical Implementation

### Technologies:
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Icons:** Tabler Icons
- **Styling:** Tailwind CSS
- **State Management:** React useState

### Key Features:
- Client-side rendering (`'use client'`)
- Dynamic filtering and search
- Responsive grid layouts
- Interactive cards and tables
- Real-time updates

---

## Future Enhancements

1. **Backend Integration:**
   - Connect to real pattern detection API
   - Live market data integration
   - Real-time signal updates

2. **Advanced Features:**
   - Backtesting for patterns
   - Alert notifications
   - Portfolio integration
   - Historical performance tracking

3. **Manual Screener:**
   - OR logic support
   - Complex nested conditions
   - Custom formulas
   - Comparison operators

4. **Export Options:**
   - PDF reports
   - Excel exports
   - Email alerts
   - API access

---

## Files Created

1. `frontend/app/screener/automated/page.tsx` - Automated pattern-based screener
2. `frontend/app/screener/manual/page.tsx` - Manual criteria-based screener

## Files Modified

1. `frontend/components/onboarding/onboarding-config.ts` - Updated discover options

---

**Status:** ✅ Complete - Both screeners implemented and linked through onboarding modal
