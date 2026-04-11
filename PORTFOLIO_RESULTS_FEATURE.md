# Portfolio Results Feature Documentation

## Overview
The Portfolio Results page provides comprehensive portfolio analysis with interactive stock detail modals. This feature includes advanced visualizations using TradingView Lightweight Charts and custom canvas-based charts.

## File Structure

```
frontend/
├── app/
│   └── portfolio-results/
│       └── page.tsx                    # Main portfolio results page
├── components/
│   └── charts/
│       ├── StockChart.tsx              # TradingView candlestick chart
│       ├── RadarChart.tsx              # Multi-factor radar visualization
│       └── MonteCarloChart.tsx         # Monte Carlo simulation paths
```

## Main Page Features

### 1. Summary Cards (6 cards in grid)
- **Composite Score**: 71/100 with progress bar
- **Recommendation**: Buy More with confidence indicator
- **30-Day Outlook**: Bullish with trending icon
- **Top Pick**: MSFT with watch list (TSLA)
- **Macro Regime**: Goldilocks with Fed rate & CPI
- **Portfolio Risk**: Beta (1.61) and Diversification (0.50)

### 2. Holdings Breakdown Table
Interactive table with clickable tickers:
- Symbol and company name
- Signal (Buy/Sell button)
- Score (large green number)
- Fund allocation (progress bar with percentage)
- EA column
- Arrow indicator for details

**Holdings Data:**
```typescript
const holdings = [
  { symbol: 'AAPL', name: 'Apple Inc.', signal: 'Buy', score: 70, fund: 83, ea: '—' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', signal: 'Buy', score: 74, fund: 86, ea: '—' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', signal: 'Buy', score: 76, fund: 91, ea: '—' },
  { symbol: 'TSLA', name: 'Tesla, Inc.', signal: 'Buy', score: 63, fund: 59, ea: '—' },
]
```

### 3. Factor Deep Dive (6 factors)
- Fundamentals — Valuation & Health (blue)
- Earnings Momentum (green)
- Technicals — Price Action & Volume (purple)
- Sentiment — Crowd Intelligence (orange)
- Macro Sensitivity (cyan)
- Geopolitical & Regional (red)

### 4. Portfolio Risks & Rebalancing
Two-column grid:
- **Portfolio Risks**: Interest rate sensitivity, Earnings risk, Concentration risk
- **Rebalancing Suggestions**: Consult individual stock deep dives

### 5. Macro Context
Economic indicators with 4 metric cards:
- Fed Funds: 4.33%
- CPI YoY: 3.1%
- Unemployment: 3.9%
- GDP Growth: 4.20%

## Stock Detail Modal

### Modal Trigger
Clicking any ticker in the Holdings Breakdown table opens a full-screen modal with detailed analysis.

### Modal Header (Sticky)
- Stock symbol (large, bold)
- Buy signal badge (blue)
- High Confidence badge (green)
- Company name and sector
- Current price: $248.80
- Daily change: -1.6% (red)
- Close button (X)

### Tabs
- Overview (default)
- Mindmap
- Deep Research
- Financials

### Overview Tab Content

#### 1. Interactive Stock Chart
**Component**: `StockChart.tsx`
- TradingView Lightweight Charts integration
- Candlestick visualization
- Green candles for up days, red for down days
- Timeframe buttons: 1M, 3M, 6M, 1Y, 3Y (active button highlighted in blue)
- Scroll to zoom, drag to pan
- Crosshair for precise data inspection

**Technical Details:**
```typescript
- Library: lightweight-charts v4.2.0
- Chart type: Candlestick
- Colors: Green (rgb(34, 197, 94)), Red (rgb(239, 68, 68))
- Background: rgba(0, 0, 0, 0.4)
- Grid: rgba(255, 255, 255, 0.05)
- Crosshair: Blue (rgba(59, 130, 246, 0.5))
```

#### 2. Predictions (3 cards)
- **30-Day Outlook**: Bear $258, Base $245, Bull $271, P(gain): 60.3%
- **60-Day Outlook**: Bear $246, Base $268, Bull $296, P(gain): 64.4%
- **90-Day Outlook**: Bear $234, Base $266, Bull $296, P(gain): 67.4%

#### 3. Factor Breakdown & Multi-Factor Radar
Two-column grid:

**Factor Breakdown** (left):
- 6 factors with progress bars
- Fundamentals: 83 (blue)
- Earnings Mom.: 72 (green)
- Technical: 60 (purple)
- Sentiment: 55 (orange)
- Macro Sens.: 80 (cyan)
- Geopolitical: 60 (red)

**Multi-Factor Radar** (right):
**Component**: `RadarChart.tsx`
- Canvas-based radar chart
- 6-axis visualization
- Blue gradient fill with stroke
- Interactive data points
- Labels positioned around perimeter

**Technical Details:**
```typescript
- Canvas size: 400x400
- Background circles: 5 levels
- Gradient: Radial from center (rgba(59, 130, 246, 0.3) to 0.05)
- Stroke: rgba(59, 130, 246, 0.8)
- Data points: 4px radius circles
```

#### 4. Individual Scores (2 cards)
- **F-Score**: 7/9 (Above-average fundamentals)
- **Altman Z-Score**: 10.01 (safe, green background)

#### 5. Monte Carlo Simulation
**Component**: `MonteCarloChart.tsx`
- 5,000 paths simulation over 90-day horizon
- Probability of positive return: 62.5%
- Annual volatility: 28.1%

**Scenario Cards:**
- Bear (P10): $211.00, -15.2%
- Base (P50): $262.38, +5.5%
- Bull (P90): $324.84, +30.5%

**Chart Visualization:**
- Canvas-based rendering
- 200 visible paths (performance optimized)
- Color-coded paths:
  - Green: Bull scenarios (>10% gain)
  - Red: Bear scenarios (>10% loss)
  - Blue: Base scenarios
- Current price reference line (dashed white)
- Price axis labels on left
- Time axis labels (Today → 90D)

**Technical Details:**
```typescript
- Canvas size: 800x300
- Volatility: 28% annual (normalized to daily)
- Drift: 21.2% annual (normalized to daily)
- Path transparency: 0.15 alpha
- Grid: 5 horizontal lines
```

#### 6. Composite Sentiment Score
**Component**: `CompositeSentimentScore.tsx`
- Interactive button: "Score sentiment" / "Re-score"
- Expands to show full sentiment analysis when clicked
- Features:
  - Sentiment Gauge with score (2.7/5.0)
  - 4 Factor Category Cards (Macro, Geopolitical, Flows, Sentiment)
  - Buy/Sell Signal Reliability indicators
  - 3 Tabs: Score Summary, All 20 Factors, CSS Adjustment Guide
  - Most Impactful Factors list with deviation bars
  - Animated transitions and hover effects

**Technical Details:**
```typescript
- Uses framer-motion for animations
- State management for scored/unscored views
- Tab navigation with AnimatePresence
- Gradient backgrounds and glassmorphic design
- Real-time factor scoring visualization
```

#### 7. Visual Technical Analysis
**Component**: `VisualTechnicalAnalysis.tsx`
- Interactive button: "Run visual TA" / "Re-run"
- Runs 2-second analysis animation
- Features:
  - Composite TA Score gauge (38/100 with SELL signal)
  - Radar chart showing 5 metrics (Trend, Momentum, Volume, Volatility, Support)
  - Indicators & Oscillators section (47/100)
    - 200 EMA, MA Crossover, RSI, MACD, Bollinger Bands
  - Elliott Wave & Fibonacci section (35/100)
    - Wave position analysis
    - Fibonacci retracement levels
    - Support/resistance levels
  - Chart Patterns (25/100)
  - Candlestick Patterns (50/100)
  - BB Squeeze warning indicator

**Technical Details:**
```typescript
- Uses recharts for radar visualization
- Animated loading state during analysis
- Color-coded signals (SELL/HOLD/NEUTRAL)
- Hover tooltips for indicator descriptions
```

#### 8. Deep Analysis
**Component**: `DeepAnalysis.tsx`
- Interactive button: "Run deep analysis" / "Re-run"
- Download PDF button appears after analysis
- 4 Section tabs:
  1. **Golden cross & Fibonacci**
     - Golden Cross status with MA-50, MA-200, Gap
     - Estimated days to next crossover
     - 9 Fibonacci levels (support/resistance)
  2. **Bull vs Bear thesis**
     - Bullish arguments (4 points)
     - Bearish arguments (3 points)
  3. **Red team (Integrity audit)**
     - Mind map verification
     - Data integrity checks
     - Model assumptions validation
  4. **Simulation**
     - 5-day and 21-day price predictions
     - Risk/Reward setup with entry, stop loss, targets

**Technical Details:**
```typescript
- Tab-based navigation
- Animated section transitions
- Color-coded thesis sections (green/red)
- Detailed Fibonacci level breakdown
```

#### 9. Model Robustness
**Component**: `ModelRobustness.tsx`
- 3 Tab sections with interactive buttons:
  1. **TA Signal Accuracy**
     - Button: "Run TA robustness"
     - Shows: Precision, Recall, F1 Score, Signal Sharpe, Signals Tested
     - Tests signals on 2 years of historical data
  2. **Monte Carlo Validity**
     - Button: "Validate Monte Carlo"
     - Shows: MAPE (Mean Absolute Percentage Error): 8.44%
  3. **Factor Weight IC**
     - Button: "Run IC analysis"
     - Shows: Best Predictive Factor (Earnings Momentum, IC: 0.42)

**Technical Details:**
```typescript
- Tab-based interface with state management
- Loading states for each analysis type
- Results display after execution
- Color-coded tabs (blue for active)
```

## State Management

```typescript
const [user, setUser] = useState<any>(null)
const [loading, setLoading] = useState(true)
const [selectedStock, setSelectedStock] = useState<string | null>(null)
const [activeTab, setActiveTab] = useState('overview')
const [chartTimeframe, setChartTimeframe] = useState<'1M' | '3M' | '6M' | '1Y' | '3Y'>('1Y')
```

## Navigation Integration

The page is accessible via:
1. NavigationHeader "Portfolio Results" button
2. Analysis page "Analyze Portfolio" button → navigates to `/portfolio-results`

## Design System

### Colors
- Background: Black with glassmorphic cards
- Cards: `from-white/[0.07] to-white/[0.02]` with `border-white/[0.08]`
- Primary accent: Blue (#3B82F6)
- Success: Green (#22C55E)
- Warning: Red (#EF4444)
- Text: White with various opacity levels

### Typography
- Font: `font-jakarta` (Plus Jakarta Sans)
- Headers: `font-black` weight
- Body: Regular weight
- Labels: `text-xs` with `text-white/60`

### Spacing
- Page padding: `px-6 py-8`
- Card padding: `p-6`
- Grid gaps: `gap-4` or `gap-6`
- Section margins: `mb-6`

## Dependencies

```json
{
  "lightweight-charts": "^4.2.0",
  "lucide-react": "^0.577.0",
  "@supabase/supabase-js": "^2.38.0",
  "framer-motion": "^12.38.0",
  "recharts": "^3.8.1"
}
```

## Component Props

### StockChart
```typescript
interface StockChartProps {
  symbol: string
  timeframe?: '1M' | '3M' | '6M' | '1Y' | '3Y'
}
```

### RadarChart
```typescript
interface RadarChartProps {
  data: Array<{ name: string; value: number; color: string }>
}
```

### MonteCarloChart
```typescript
interface MonteCarloChartProps {
  currentPrice: number
  paths?: number
}
```

### CompositeSentimentScore
```typescript
interface CompositeSentimentScoreProps {
  ticker: string
}
```

### VisualTechnicalAnalysis
```typescript
interface VisualTechnicalAnalysisProps {
  ticker: string
}
```

### DeepAnalysis
```typescript
interface DeepAnalysisProps {
  ticker: string
}
```

### ModelRobustness
```typescript
interface ModelRobustnessProps {
  ticker: string
}
```

## Key Features

1. **Responsive Design**: All components adapt to screen size
2. **Interactive Charts**: Real-time updates and user interactions
3. **Performance Optimized**: Canvas rendering for complex visualizations
4. **Modular Architecture**: Reusable chart components
5. **Type Safety**: Full TypeScript support
6. **Authentication**: Supabase integration with user checks
7. **Smooth Animations**: Hover effects and transitions with framer-motion
8. **Interactive Analysis Tools**: 
   - Click-to-run sentiment scoring
   - Visual technical analysis with detailed breakdowns
   - Deep analysis with multiple perspectives
   - Model robustness validation with statistical metrics
9. **State Management**: Proper state handling for all interactive components
10. **Loading States**: Visual feedback during analysis execution

## Future Enhancements

- [ ] Real-time data integration via API
- [ ] Export portfolio report as PDF
- [ ] Custom date range selection for charts
- [ ] Additional technical indicators
- [ ] Portfolio comparison feature
- [ ] Historical performance tracking
- [ ] Alert notifications for price targets
- [ ] Mobile-optimized modal layout

## Notes

- Modal excludes Factor Deep Dive, Portfolio Risks, and Macro Context (these remain on main page only)
- All charts use sample/generated data for demonstration
- Charts are optimized for dark theme
- Font standardization: All components use `font-jakarta`
- Navigation buttons use uniform green color when active
- Dev server runs on port 5173

## Last Updated
June 30, 2026
