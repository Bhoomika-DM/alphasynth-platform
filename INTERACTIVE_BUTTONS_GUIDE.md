# Interactive Buttons Guide - Portfolio Results Modal

This document describes all interactive buttons in the stock detail modal and their functionality.

## Button Overview

The portfolio results modal contains 4 main interactive analysis buttons that trigger comprehensive analysis components:

1. **Score sentiment** / **Re-score** - Composite Sentiment Score
2. **Run visual TA** / **Re-run** - Visual Technical Analysis  
3. **Run deep analysis** / **Re-run** - Deep Analysis
4. **Run TA robustness** - Model Robustness & Statistical Validation

---

## 1. Composite Sentiment Score

### Button
- **Label**: "Score sentiment" (initial) / "Re-score" (after execution)
- **Location**: Top-right of Composite Sentiment Score section
- **Color**: Blue gradient (`from-blue-600 to-blue-700`)
- **Animation**: Scale on hover/tap

### What It Does
Triggers a comprehensive 20-factor sentiment analysis framework that evaluates market sentiment from extreme fear (1.0) to extreme greed (5.0).

### Expanded Content
When clicked, the component expands to show:

#### Main Gauge Section
- **Sentiment Gauge**: Circular gauge showing score (e.g., 2.7/5.0)
- **Status**: Neutral/Fear/Greed indicator with color coding
- **FA Score Adjustment**: Real-time adjustment value (e.g., 0.00)
- **Data Confidence**: Percentage of factors with live market data
- **Timestamp**: Last update time

#### Factor Category Cards (4 cards in 2x2 grid)
1. **MACRO** (Blue)
   - Score: 2.8
   - Factors: 1,2,4,17
   
2. **GEOPOLITICAL** (Red)
   - Score: 3.0
   - Factors: 5,10-16
   
3. **FLOWS** (Green)
   - Score: 2.8
   - Factors: 3,18-20
   
4. **SENTIMENT** (Purple)
   - Score: 2.9
   - Factors: 6-9

#### Signal Reliability Cards
- **BUY SIGNAL RELIABILITY**: Shows reliability level (standard/high/low)
- **SELL SIGNAL RELIABILITY**: Shows reliability level (standard/high/low)

#### Tab Navigation (3 tabs)

**Tab 1: Score Summary**
- Most Impactful Factors list (by deviation from neutral 3.0)
- Shows top 5 factors with:
  - Rank number
  - Factor name
  - Weight percentage
  - Confidence level (high/medium/low)
  - Score value
  - Deviation bar visualization

Example factors:
1. Market Narratives (w=19%, high confidence, score 1.3, deviation 1.7)
2. Circuit Breakers (w=5%, high confidence, score 4.5, deviation 1.5)
19. FII Inflows/Outflows (w=10%, medium confidence, score 1.8, deviation 1.2)

**Tab 2: All 20 Factors**
- Complete list of all 20 sentiment factors
- Each factor shows:
  - Factor number and name
  - Current score
  - Weight in calculation
  - Confidence level

**Tab 3: CSS Adjustment Guide**
- Instructions for manual CSS adjustments
- Guidelines for interpreting scores
- Best practices for using sentiment data

### Animation
- Smooth expand/collapse with height animation
- Fade-in effects for each section
- Staggered animations for factor cards
- Tab switching with slide transitions

---

## 2. Visual Technical Analysis

### Button
- **Label**: "Run visual TA" (initial) / "Re-run" (after execution)
- **Location**: Top-right of Visual Technical Analysis section
- **Color**: Blue gradient
- **Loading State**: Shows "Running..." during 2-second analysis

### What It Does
Performs comprehensive technical analysis across 5 weighted categories, analyzing chart patterns, indicators, and price action.

### Analysis Results

#### Composite TA Score
- **Score Display**: Large circular gauge (e.g., 38/100)
- **Signal**: SELL/HOLD/BUY with color coding
- **Description**: "Higher = stronger buy signs"

#### Radar Chart
- **5 Metrics Visualization**:
  1. Trend (65)
  2. Momentum (58)
  3. Volume (72)
  4. Volatility (45)
  5. Support (68)
- **Interactive**: Hover to see values
- **Visual**: Blue gradient fill with stroke

#### Indicators & Oscillators (47/100) - 30% of composite
Shows 6 key indicators:
1. **200 EMA**: $250.3 - SELL
   - Description: 200-day exponential moving average
2. **MA Crossover**: above 200 - HOLD
   - Description: Bullish when price crosses above 200-day MA
3. **RSI (14)**: <30 - NEUTRAL
   - Description: Relative Strength Index
4. **RSI Divergence**: none - HOLD
   - Description: Bearish Strength Index
5. **MACD**: -0.61 - NEUTRAL
   - Description: Moving Average Convergence
6. **Bollinger**: middle - NEUTRAL
   - Description: Bands show volatility

#### Elliott Wave & Fibonacci (35/100) - 30% of composite
- **Trend**: downtrend - SELL
  - Wave 2 — Corrective wave
- **Wave position**: unknown - NEUTRAL
  - Wave 3 — strongest and most powerful wave
- **Strategy**: none
  - Wave 5 and ABC correction
- **Nearest support**: $0.0 - BUY
- **Nearest resist.**: $0.0 - SELL
- **Fib zone**: unknown
- **Fibonacci levels** (5 levels):
  - 0.786: $241.2 - ALL
  - 0.618: $239.8 - BUY
  - 0.500: $238.5 - BUY
  - 0.382: $237.2 - BUY
  - 0.236: $235.8 - BUY

#### Chart Patterns (25/100) - 20% of composite
- Pattern recognition and analysis
- Bullish/Bearish pattern identification

#### Candlestick Patterns (50/100) - 20% of composite
- Japanese candlestick pattern detection
- Signal strength and reliability

#### Warnings
- **BB Squeeze**: "⚠️ explosive move imminent, direction unknown"

### Animation
- 2-second loading animation with emoji
- Fade-in for results
- Smooth transitions between sections

---

## 3. Deep Analysis

### Buttons
- **Primary**: "Run deep analysis" / "Re-run"
- **Secondary**: "Download PDF" (appears after analysis)
- **Location**: Top-right of Deep Analysis section
- **Loading State**: Shows "Running..." with 🔍 emoji during 2.5-second analysis

### What It Does
Comprehensive multi-perspective analysis including golden cross detection, Fibonacci levels, bull/bear thesis, red team audit, and price simulations.

### Section Tabs (4 tabs)

#### Tab 1: Golden cross & Fibonacci

**Golden Cross Status**
- **Status**: GOLDEN CROSS / DEATH CROSS
- **Confidence**: high/medium/low
- **MA-50**: $260.21
- **MA-200**: $247.70
- **Gap**: +5.0%
- **Estimated crossover**: ~29 days to next crossover

**Fibonacci Levels** (9 levels)
Support levels (red):
- F 2.618: $178.27 ↑ support
- F 2.000: $203.68 ↑ support
- F 1.618: $219.39 ↑ support
- F 1.272: $233.62 ↑ support

Resistance levels (green):
- R 0.236: $254.51 ↑ resistance
- R 0.382: $260.51 ↑ resistance
- R 0.500: $265.36 ↑ resistance
- R 0.618: $270.21 ↑ resistance
- R 0.786: $277.12 ↑ resistance

#### Tab 2: Bull vs Bear thesis

**Bullish Thesis** (Green section)
- ✓ Strong fundamentals with F-Score of 7/9
- ✓ Golden cross formation indicates bullish momentum
- ✓ Altman Z-Score of 10.01 shows financial safety
- ✓ Monte Carlo shows 62.5% probability of positive return

**Bearish Thesis** (Red section)
- ✗ High volatility (28.1% annual) increases downside risk
- ✗ Technical indicators show mixed signals
- ✗ Sentiment score below neutral at 2.7/5.0

#### Tab 3: Red team (Integrity audit)

**Audit Checks** (Orange section)
1. **Mind map**
   - Logical consistency verified across all analysis components
2. **Data integrity**
   - All data points cross-referenced and validated
3. **Model assumptions**
   - Assumptions documented and stress-tested

#### Tab 4: Simulation

**Price Movement Prediction (GBM Model)**

5-day range:
- Bear: $233.81
- Bull: $266.36

21-day range:
- Bear: $220.47
- Bull: $288.00

**Risk/Reward Setup**
- Entry: $248.80
- Stop loss: $241.18 (-3.1% risk)
- Target 1: $254.51 · R/R 0.75:1
- Target 2: $178.27 · R/R -9.26:1

### Animation
- 2.5-second loading with search emoji
- Tab switching with smooth transitions
- Fade-in for each section
- Download PDF button slides in after analysis

---

## 4. Model Robustness & Statistical Validation

### Tab Structure
3 independent tabs, each with its own button and analysis:

#### Tab 1: TA Signal Accuracy

**Button**: "Run TA robustness"
**Loading**: Shows "Running..." during execution

**What It Tests**
Tests all signals on 2 years of historical data across stock universe.

**Metrics Displayed** (6 cards):
1. **Signal Icon**: N/A (when no data)
2. **Precision**: 0.0% (% profitable)
3. **Recall**: 0.0%
4. **F1 Score**: 0.000 (harmonic mean of precision & recall)
5. **Signal Sharpe**: 0.00
6. **Signals Tested**: 0

**Note**: Shows "Insufficient data for robustness analysis" when no historical data available

#### Tab 2: Monte Carlo Validity

**Button**: "Validate Monte Carlo"
**Loading**: Shows "Validating..." during execution

**What It Shows**
- **MAPE**: 8.44% (Mean Absolute Percentage Error)
- Validates accuracy of Monte Carlo simulation predictions

#### Tab 3: Factor Weight IC

**Button**: "Run IC analysis"
**Loading**: Shows "Running..." during execution

**What It Shows**
- **Best Predictive Factor**: Earnings Momentum (IC: 0.42)
- Information Coefficient analysis for factor weights
- Identifies which factors have strongest predictive power

### Animation
- Tab switching with smooth transitions
- Button loading states
- Results fade-in after execution
- Color-coded tabs (blue for active)

---

## Button Interaction Flow

### General Pattern
All analysis buttons follow this pattern:

1. **Initial State**: Button shows action label (e.g., "Score sentiment")
2. **Click**: User clicks button
3. **Loading State**: 
   - Button becomes disabled
   - Shows "Running..." or "Validating..."
   - Loading animation displays (emoji + text)
4. **Results State**:
   - Content expands/appears with animation
   - Button label changes to "Re-run" or "Re-score"
   - Additional buttons may appear (e.g., "Download PDF")
5. **Re-run**: User can click again to refresh analysis

### State Management
Each component maintains its own state:
- `isRunning`: Boolean for loading state
- `showResults`: Boolean for results visibility
- `activeTab`: String for tab navigation (where applicable)
- `activeSection`: String for section navigation (where applicable)

### Animation Timing
- Composite Sentiment: Instant expand
- Visual TA: 2-second analysis
- Deep Analysis: 2.5-second analysis
- Model Robustness: 2-second per tab analysis

---

## Design Consistency

### Button Styling
All primary action buttons share:
- Blue gradient background (`from-blue-600 to-blue-700`)
- Hover effect (scale 1.05)
- Tap effect (scale 0.95)
- Shadow: `shadow-lg shadow-blue-500/30`
- Font: `font-jakarta font-bold`
- Rounded: `rounded-xl`
- Padding: `px-6 py-2`

### Disabled State
- Opacity: 50%
- Cursor: not-allowed
- No hover effects

### Color Coding
- **Blue**: Primary actions, neutral signals
- **Green**: Bullish signals, positive metrics
- **Red**: Bearish signals, negative metrics
- **Yellow/Orange**: Warnings, medium confidence
- **Purple**: Sentiment-related
- **Cyan**: Macro-related

---

## Technical Implementation

### Dependencies
- `framer-motion`: Animations and transitions
- `recharts`: Radar chart visualization
- `lucide-react`: Icons (Download, X, TrendingUp)

### Performance
- Lazy loading of analysis results
- Optimized re-renders with proper state management
- Smooth 60fps animations
- Efficient canvas rendering for charts

### Accessibility
- Keyboard navigation support
- Focus states on buttons
- ARIA labels for interactive elements
- Color contrast compliance

---

## Last Updated
June 30, 2026
