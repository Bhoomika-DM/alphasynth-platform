# Stock Detail Page Layout Swap - Instructions

## Current Structure
The stock detail page currently has this layout:

1. **Stock Header** (price, series badges, buttons)
2. **Grid with 2 columns:**
   - Left (col-span-2): Chart Section with OHLC data, tabs, chart, AND Corporate Announcements tab content
   - Right: Order Book
3. **Below Grid (col-span-3):** Stock Details Section with:
   - Header with stock info
   - Stock Absolute Returns & NIFTY 50 Absolute Returns
   - Three columns: Trade Information, Price Information, Securities Information

## Required Change
**SWAP the positions:**

### New Structure Should Be:
1. **Stock Header** (stays the same)
2. **Grid with 2 columns:**
   - Left (col-span-2): Chart Section with OHLC data, tabs, and chart ONLY (remove tab content from here)
   - Right: Order Book
3. **Below Grid - FIRST Section:** Stock Details Section (move this UP if needed, or keep it here)
   - Header with stock info
   - Stock Absolute Returns & NIFTY 50 Absolute Returns  
   - Three columns: Trade Information, Price Information, Securities Information
4. **Below Grid - SECOND Section:** Corporate Announcements Tabs Section (move this DOWN, extract from chart)
   - All tab navigation (Dashboard, Announcements, XBRL, Board Meetings, Corporate Actions, More)
   - All tab content for each sub-tab

## Implementation Steps:
1. Extract the Corporate Announcements tab content from inside the chart section
2. Keep only the tab navigation buttons in the chart section (or remove them entirely)
3. Create a new full-width section below the Stock Details section
4. Place all the Corporate Announcements tab content in this new section
5. Ensure the Stock Details section appears ABOVE the Corporate Announcements section

## Visual Order (Top to Bottom):
```
[Stock Header]
[Chart (left) | Order Book (right)]
[Stock Details Section - Full Width] ← THIS FIRST
[Corporate Announcements Tabs - Full Width] ← THIS SECOND
```

The user wants the section with returns and trade/price/securities info to appear BEFORE the announcements tabs.
