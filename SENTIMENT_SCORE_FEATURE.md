# Composite Sentiment Score Feature

## Overview
Added a comprehensive Composite Sentiment Score (CSS) section below the Monte Carlo Simulation in the ticker detail modal. This feature provides a 20-factor weighted sentiment analysis framework with interactive scoring.

## Key Features Implemented

### 1. Score/Re-score Button
- **Initial State:** "Score sentiment" button (blue)
- **After Scoring:** Button changes to "Re-score"
- **Functionality:** Toggles sentiment analysis display on/off
- **Location:** Top-right of the sentiment section header

### 2. Circular Sentiment Gauge
**Visual Design:**
- Large circular progress indicator (2.7 out of 5.0)
- Orange/yellow gradient background
- SVG-based circular gauge with partial fill
- Score displayed in center (5xl font, orange color)

**Status Indicator:**
- Yellow dot + "Neutral" label
- Score interpretation: 0.0 (Neutral)
- Data confidence: "28% of factors have live market data · 7:50:20 PM"
- FA Score adjustment: 0.00

### 3. Factor Category Scores
Four main categories displayed as cards:

**MACRO (Blue - 2.9)**
- Factors 1,2,4,17
- Economic indicators

**GEOPOLITICAL (Red - 3.3)**
- Factors 5,10-16
- Political and regional risks

**FLOWS (Green - 2.8)**
- Factors 3,18-20
- Capital flows and liquidity

**SENTIMENT (Purple - 2.9)**
- Factors 6-9
- Market sentiment indicators

### 4. Buy/Sell Signal Reliability
Two cards showing signal reliability:

**BUY SIGNAL (Green)**
- Reliability at this CSS: standard
- Green background with border

**SELL SIGNAL (Red)**
- Reliability at this CSS: standard
- Red background with border

### 5. Three-Tab Interface

**Tab 1: Score Summary (Default)**
Shows "Most Impactful Factors (by deviation from neutral 3.0)":

Each factor row displays:
- Rank number (blue badge)
- Factor name (e.g., "Market Narratives", "Circuit Breakers")
- Weight (e.g., "w=19%")
- Confidence level (e.g., "conf=high")
- Score value (colored: green for low, red for high)
- Deviation bar (visual progress bar)
- Deviation number
- Confidence badge (high/medium/low with color coding)

**Example Factors:**
1. Market Narratives - w=19%, conf=high, score 1.3, dev 1.7 (green, high)
2. Circuit Breakers - w=5%, conf=high, score 4.5, dev 1.5 (red, high)
19. FII Inflows/Outflows - w=10%, conf=medium, score 1.8, dev 1.2 (green, medium)
14. Pandemics/Public Health - w=2%, conf=medium, score 4.0, dev 1.0 (red, medium)
15. Terrorism - w=2%, conf=low, score 4.0, dev 1.0 (red, low)

**Tab 2: All 20 Factors**
- Placeholder: "All 20 factors view coming soon"

**Tab 3: CSS Adjustment Guide**
- Placeholder: "CSS Adjustment Guide coming soon"

## Technical Implementation

### State Management
```typescript
const [sentimentScored, setSentimentScored] = useState(false)
const [sentimentTab, setSentimentTab] = useState('summary')
```

### CSS Scale
- 1.0 = Extreme Fear
- 2.7 = Neutral (current example)
- 5.0 = Extreme Greed

### Color Coding
- **Green factors:** Bullish sentiment (scores < 3.0)
- **Red factors:** Bearish sentiment (scores > 3.0)
- **Confidence levels:**
  - High: Green badge
  - Medium: Yellow badge
  - Low: Red badge

### Circular Gauge Calculation
```typescript
strokeDasharray={`${(2.7 / 5) * 440} 440`}
// 2.7 out of 5.0 = 54% of circle filled
// 440 = circumference of circle (2 * π * radius)
```

## Visual Design

### Layout
- 2-column grid for gauge + factor scores
- Full-width cards for buy/sell signals
- Tabbed interface for different views
- Factor list with horizontal layout

### Styling
- Gradient backgrounds (orange/yellow for gauge)
- Glass morphism effects
- Smooth animations (fade-in on score)
- Hover effects on factor rows
- Color-coded badges and progress bars

### Typography
- Jakarta font family throughout
- Bold headings (xl, 2xl, 5xl sizes)
- Small text for metadata (xs size)
- Uppercase tracking for labels

## User Flow

1. **Initial State:**
   - User sees "Score sentiment" button
   - No sentiment data displayed

2. **After Clicking "Score sentiment":**
   - Button changes to "Re-score"
   - Sentiment section animates in (fade-in)
   - Circular gauge shows 2.7 score
   - Four factor categories displayed
   - Buy/Sell signal cards shown
   - Score Summary tab active by default
   - Top 5 impactful factors listed

3. **Clicking "Re-score":**
   - Hides sentiment data
   - Button reverts to "Score sentiment"
   - Can be clicked again to re-display

4. **Tab Navigation:**
   - Click "All 20 Factors" or "CSS Adjustment Guide"
   - Tab content switches
   - Active tab highlighted with blue border

## Files Modified

1. **`frontend/app/portfolio-results/page.tsx`**
   - Added sentiment state management
   - Implemented complete sentiment score section
   - Added after Monte Carlo Simulation in Overview tab

2. **`frontend/app/analysis/page.tsx`**
   - Added sentiment state management
   - Placeholder sentiment section (simplified version)

## Data Structure

### Factor Object
```typescript
{
  rank: number,           // 1-20
  name: string,          // "Market Narratives"
  weight: string,        // "w=19%"
  conf: string,          // "conf=high"
  score: number,         // 1.3 (1.0-5.0 scale)
  deviation: number,     // 1.7 (from neutral 3.0)
  color: 'green'|'red',  // Based on score
  level: 'high'|'medium'|'low'  // Confidence level
}
```

## Future Enhancements

1. **All 20 Factors Tab:**
   - Complete list of all 20 sentiment factors
   - Detailed descriptions for each
   - Historical trend charts

2. **CSS Adjustment Guide:**
   - How to interpret CSS scores
   - Trading strategies for different CSS levels
   - Historical CSS performance data

3. **Real-time Updates:**
   - Live data feeds for factors
   - Auto-refresh sentiment scores
   - Timestamp updates

4. **Interactive Features:**
   - Click factor to see detailed breakdown
   - Adjust factor weights manually
   - Compare CSS across multiple tickers

5. **Historical Analysis:**
   - CSS trend over time
   - Correlation with price movements
   - Backtesting results

## Attribution
20-factor weighted framework · CSS 1.0 (extreme fear) → 5.0 (extreme greed) · Fully deterministic
