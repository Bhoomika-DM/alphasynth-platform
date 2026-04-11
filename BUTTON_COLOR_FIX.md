# Button Color Fix - All Buttons to Sage Theme

## ✅ Already Updated

1. **Button Component** (`frontend/components/ui/Button.tsx`)
   - Primary variant: Changed to sage (#9CAF88)
   - Ghost variant: Changed hover to sage
   - Outline-green variant: Changed to sage
   - Focus rings: Changed to sage
   - Shadows: Changed to sage

2. **Authentication Pages**
   - All signin/signup/forgot-password buttons now use sage
   - Both app-level and authentication folder

3. **Dashboard Page**
   - Quick Navigate button now uses sage

4. **Error Boundary**
   - Reload button now uses sage

## 🔧 Global Find & Replace Needed

Use your IDE's find & replace (Ctrl+Shift+H) with these patterns:

### 1. Button Backgrounds
```
Find: bg-\[#6A994E\]
Replace: bg-[#9CAF88]

Find: bg-green-600
Replace: bg-[#9CAF88]

Find: bg-green-500
Replace: bg-[#9CAF88]
```

### 2. Text Colors
```
Find: text-\[#6A994E\]
Replace: text-[#9CAF88]

Find: text-green-400
Replace: text-[#9CAF88]

Find: text-green-500
Replace: text-[#9CAF88]
```

### 3. Border Colors
```
Find: border-\[#6A994E\]
Replace: border-[#9CAF88]

Find: border-green-600
Replace: border-[#9CAF88]

Find: border-green-500
Replace: border-[#9CAF88]
```

### 4. Focus Rings
```
Find: focus:ring-\[#6A994E\]
Replace: focus:ring-[#9CAF88]

Find: focus:ring-green
Replace: focus:ring-[#9CAF88]
```

### 5. Hover States
```
Find: hover:bg-green
Replace: hover:bg-[#9CAF88]

Find: hover:text-green
Replace: hover:text-[#9CAF88]

Find: hover:border-green
Replace: hover:border-[#9CAF88]
```

### 6. Background Opacity
```
Find: bg-green-500/10
Replace: bg-[#9CAF88]/10

Find: bg-green-500/20
Replace: bg-[#9CAF88]/20

Find: bg-green-600/20
Replace: bg-[#9CAF88]/20
```

## 📋 Files That Need Manual Updates

### High Priority - Navigation & Buttons
1. `frontend/components/dashboard/NavigationHeader.tsx`
   - Lines 35, 46, 57, 68, 79: Change `bg-green-600` to `bg-[#9CAF88]`

2. `frontend/app/page.tsx` (Landing page)
   - "Start Trading" button
   - "Analyze My Portfolio" button

### Medium Priority - Status Indicators
3. `frontend/components/dashboard/SentimentCard.tsx`
   - Bullish indicator dot (line 119)

4. `frontend/components/dashboard/Portfolio.tsx`
   - Positive P&L indicators (line 103, 129)

5. `frontend/components/dashboard/Heatmap.tsx`
   - Positive change colors (lines 39-40, 48, 54)

### Low Priority - Charts & Visualizations
6. `frontend/components/charts/StockMindmap.tsx`
   - Strong score indicators (lines 286, 336)

7. `frontend/components/sentiment/*` files
   - Various green indicators for bullish signals

## 🎨 Color Reference

**OLD (Green):**
- Primary: #6A994E
- Tailwind: green-500, green-600, green-400

**NEW (Sage):**
- Primary: #9CAF88
- Always use: `bg-[#9CAF88]`, `text-[#9CAF88]`, `border-[#9CAF88]`

## 🚨 Important Notes

1. **Keep Red for Loss/Danger**: Don't change red colors (#BC4749)
2. **Profit Indicators**: Change from green to sage
3. **Active States**: Change from green to sage
4. **Focus Rings**: Change from green to sage
5. **Hover Effects**: Change from green to sage

## ✅ Testing Checklist

After making all changes:
- [ ] All buttons show sage color
- [ ] Hover states work with sage
- [ ] Focus rings are sage
- [ ] Active navigation items are sage
- [ ] Profit indicators are sage
- [ ] No green colors remain (except in charts if needed)
- [ ] Red colors for loss/danger are unchanged

## 🔄 After Updates

1. Delete `.next` folder: `rm -rf .next`
2. Restart dev server: `npm run dev`
3. Test all pages
4. Verify button interactions

---

**Status**: Core components updated, need global find & replace for remaining files
