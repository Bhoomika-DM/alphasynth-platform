# NSE Data Integration - Implementation Checklist

## ✅ Phase 1: Backend Setup (30 minutes)

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Start Backend Server
```bash
npm run dev
```

### Step 3: Test Backend
Open browser: `http://localhost:3001/health`

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Step 4: Test NSE Data Fetch
```bash
curl http://localhost:3001/api/quote/TCS
```

---

## ✅ Phase 2: Frontend Integration (20 minutes)

### Step 1: Update Environment Variables
Create `frontend/.env.local`:
```env
NEXT_PUBLIC_NSE_API_URL=http://localhost:3001
```

### Step 2: Test API Client
Create a test page: `frontend/app/test-nse/page.tsx`

```typescript
'use client'
import NSEDataExample from '@/components/examples/NSEDataExample'

export default function TestNSEPage() {
  return <NSEDataExample />
}
```

### Step 3: Visit Test Page
Navigate to: `http://localhost:3173/test-nse`

---

## ✅ Phase 3: Update Existing Components (1-2 hours)

### Components to Update:

#### 1. Dashboard - Market Summary
**File:** `frontend/components/dashboard/MarketSummary.tsx`

**Replace mock data with:**
```typescript
import { useIndexData } from '@/hooks/useNSEData'

const { data: nifty50 } = useIndexData('NIFTY 50', 30000)
const { data: bankNifty } = useIndexData('NIFTY BANK', 30000)
```

#### 2. Dashboard - Top Movers
**File:** `frontend/components/dashboard/TopMovers.tsx`

**Replace mock data with:**
```typescript
import { useTopGainers, useTopLosers } from '@/hooks/useNSEData'

const { data: gainers } = useTopGainers(60000)
const { data: losers } = useTopLosers(60000)
```

#### 3. Stock Analysis Page
**File:** `frontend/app/stock-analysis/page.tsx`

**Add real-time data:**
```typescript
import { useStockQuote } from '@/hooks/useNSEData'

const { data: stockData } = useStockQuote(ticker, 30000)
```

#### 4. Trading Dashboard
**File:** `frontend/app/trading/page.tsx`

**Update with real prices:**
```typescript
import { useBatchQuotes } from '@/hooks/useNSEData'

const watchlistSymbols = ['TCS', 'INFY', 'WIPRO', 'HCLTECH']
const { data: quotes } = useBatchQuotes(watchlistSymbols, 30000)
```

---

## ✅ Phase 4: Add Real-Time Features (1 hour)

### 1. Market Status Indicator
Add to navbar:
```typescript
import { useMarketStatus } from '@/hooks/useNSEData'

const { data: marketStatus } = useMarketStatus(60000)

// Show green dot if market is open, red if closed
```

### 2. Live Price Updates
Add WebSocket support (future enhancement):
```typescript
// Use Socket.io or WebSocket for real-time updates
// Update prices every second instead of polling
```

### 3. Price Alerts
Add notification system:
```typescript
// Alert user when stock reaches target price
// Use browser notifications API
```

---

## ✅ Phase 5: Testing & Optimization (1 hour)

### Test Cases:

1. **Market Hours Testing**
   - Test during market open (9:15 AM - 3:30 PM IST)
   - Test during market closed
   - Test on weekends/holidays

2. **Error Handling**
   - Disconnect internet
   - Stop backend server
   - Test with invalid symbols

3. **Performance**
   - Monitor API call frequency
   - Check cache hit rate
   - Measure page load times

4. **Data Accuracy**
   - Compare with NSE website
   - Verify calculations (% change, etc.)
   - Check timestamp accuracy

---

## ✅ Phase 6: Production Deployment

### Backend Deployment Options:

#### Option 1: Vercel (Serverless)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy backend
cd backend
vercel
```

#### Option 2: Railway
1. Go to railway.app
2. Create new project
3. Connect GitHub repo
4. Deploy backend folder

#### Option 3: DigitalOcean/AWS
```bash
# Use PM2 for process management
npm install -g pm2
pm2 start server.js
pm2 save
pm2 startup
```

### Frontend Deployment:
```bash
cd frontend
vercel --prod
```

### Update Environment Variables:
```env
# Production
NEXT_PUBLIC_NSE_API_URL=https://your-backend-url.com
```

---

## 📊 Data Sources Priority

### Primary: NSE Official Endpoints
- ✅ Free
- ✅ Real-time
- ❌ No official API
- ❌ May break

### Fallback 1: Yahoo Finance
- ✅ Free
- ✅ Reliable
- ✅ No API key needed
- ⚠️ 15-minute delay

### Fallback 2: Alpha Vantage
- ✅ Official API
- ⚠️ 5 calls/minute (free tier)
- ❌ Requires API key

### Production: Upstox/Zerodha
- ✅ Official broker API
- ✅ Real-time
- ✅ WebSocket support
- ❌ Paid (~₹2000/month)

---

## 🚀 Quick Commands

### Start Everything:
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev
```

### Test Endpoints:
```bash
# Health check
curl http://localhost:3001/health

# Stock quote
curl http://localhost:3001/api/quote/TCS

# Market status
curl http://localhost:3001/api/market-status

# NIFTY 50
curl http://localhost:3001/api/index/NIFTY%2050

# Top gainers
curl http://localhost:3001/api/top-gainers
```

---

## 📝 Next Steps After Integration

1. **Add More Indices:**
   - NIFTY BANK
   - NIFTY IT
   - NIFTY AUTO
   - SENSEX

2. **Add More Data Points:**
   - Options data
   - Futures data
   - FII/DII data
   - Bulk deals
   - Block deals

3. **Add Charts:**
   - Integrate with TradingView
   - Use lightweight-charts
   - Add technical indicators

4. **Add Alerts:**
   - Price alerts
   - Volume alerts
   - News alerts

5. **Add Analytics:**
   - Track API usage
   - Monitor error rates
   - Measure response times

---

## 🐛 Common Issues & Solutions

### Issue: CORS Error
**Solution:** Ensure backend is running and CORS is configured

### Issue: NSE Session Expired
**Solution:** Backend auto-refreshes every 5 minutes, wait or restart

### Issue: Data Not Updating
**Solution:** Check cache TTL, verify refresh interval

### Issue: 429 Too Many Requests
**Solution:** Increase cache TTL, reduce refresh frequency

### Issue: Invalid Symbol
**Solution:** Use NSE symbol format (e.g., TCS, not TCS.NS)

---

## 📚 Resources

- NSE Website: https://www.nseindia.com
- Yahoo Finance: https://finance.yahoo.com
- Alpha Vantage: https://www.alphavantage.co
- Upstox API: https://upstox.com/developer
- Zerodha Kite: https://kite.trade

---

## ✨ Success Criteria

- [ ] Backend server running without errors
- [ ] Frontend can fetch data from backend
- [ ] Real-time data updates every 30 seconds
- [ ] Fallback to Yahoo Finance works
- [ ] Cache reduces API calls
- [ ] Error handling works properly
- [ ] Data matches NSE website
- [ ] Performance is acceptable (<2s load time)
- [ ] Works during market hours
- [ ] Works during market closed

---

## 🎯 Estimated Timeline

- **Phase 1 (Backend):** 30 minutes
- **Phase 2 (Frontend):** 20 minutes
- **Phase 3 (Components):** 1-2 hours
- **Phase 4 (Features):** 1 hour
- **Phase 5 (Testing):** 1 hour
- **Phase 6 (Deployment):** 1 hour

**Total:** 4-6 hours for complete integration

---

## 💡 Pro Tips

1. Start backend before frontend
2. Test with one component first
3. Use cache to reduce API calls
4. Monitor console for errors
5. Check network tab in DevTools
6. Test during market hours for best results
7. Keep backend logs visible
8. Use React DevTools to debug hooks
9. Test error scenarios
10. Document any custom changes

---

Good luck with your NSE data integration! 🚀
