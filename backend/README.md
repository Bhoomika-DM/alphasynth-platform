# NSE Data Proxy Server - Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Create Environment File

Create a `.env` file in the backend directory:

```env
PORT=3001
NODE_ENV=development
```

### 3. Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3001`

### 4. Test the Server

Open your browser or use curl:

```bash
# Health check
curl http://localhost:3001/health

# Get TCS stock quote
curl http://localhost:3001/api/quote/TCS

# Get market status
curl http://localhost:3001/api/market-status

# Get NIFTY 50 data
curl http://localhost:3001/api/index/NIFTY%2050

# Get top gainers
curl http://localhost:3001/api/top-gainers
```

## Frontend Integration

### 1. Update Frontend Environment

Create/update `frontend/.env.local`:

```env
NEXT_PUBLIC_NSE_API_URL=http://localhost:3001
```

### 2. Use in Components

```typescript
import { useStockQuote } from '@/hooks/useNSEData'

function MyComponent() {
  const { data, loading, error } = useStockQuote('TCS', 30000) // Refresh every 30s
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <div>
      <h1>{data.symbol}</h1>
      <p>Price: ₹{data.lastPrice}</p>
      <p>Change: {data.pChange}%</p>
    </div>
  )
}
```

## Available Endpoints

### GET /health
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### GET /api/quote/:symbol
Get stock quote for a symbol

**Example:** `/api/quote/TCS`

**Response:**
```json
{
  "source": "nse",
  "data": {
    "symbol": "TCS",
    "lastPrice": 3542.30,
    "change": 78.60,
    "pChange": 2.28,
    "previousClose": 3463.70,
    "open": 3470.00,
    "dayHigh": 3550.00,
    "dayLow": 3465.00,
    ...
  }
}
```

### GET /api/market-status
Get current market status

**Response:**
```json
{
  "source": "nse",
  "data": {
    "marketState": "Open",
    "tradeDate": "15-Jan-2024",
    ...
  }
}
```

### GET /api/index/:indexName
Get index data (NIFTY 50, BANK NIFTY, etc.)

**Example:** `/api/index/NIFTY%2050`

**Response:**
```json
{
  "source": "nse",
  "data": {
    "name": "NIFTY 50",
    "last": 21450.50,
    "variation": 125.30,
    "percentChange": 0.59,
    ...
  }
}
```

### GET /api/top-gainers
Get top gaining stocks

**Response:**
```json
{
  "source": "nse",
  "data": [
    {
      "symbol": "TATAMOTORS",
      "ltp": 850.50,
      "netPrice": 5.25,
      ...
    },
    ...
  ]
}
```

### GET /api/top-losers
Get top losing stocks

### GET /api/historical/:symbol?from=DD-MM-YYYY&to=DD-MM-YYYY
Get historical data for a symbol

**Example:** `/api/historical/TCS?from=01-01-2024&to=31-01-2024`

### GET /api/corporate-actions/:symbol
Get corporate actions (dividends, splits, etc.)

**Example:** `/api/corporate-actions/TCS`

### POST /api/quotes/batch
Get multiple quotes at once

**Request Body:**
```json
{
  "symbols": ["TCS", "INFY", "WIPRO", "HCLTECH"]
}
```

**Response:**
```json
{
  "quotes": [
    {
      "symbol": "TCS",
      "data": { ... },
      "source": "nse"
    },
    ...
  ]
}
```

## Caching

The server uses in-memory caching with the following TTLs:
- Stock quotes: 30 seconds
- Market status: 30 seconds
- Index data: 30 seconds
- Top gainers/losers: 30 seconds
- Historical data: 5 minutes
- Corporate actions: 10 minutes

## Error Handling

The server implements automatic fallback:
1. Try NSE official endpoints
2. If NSE fails, try Yahoo Finance
3. If both fail, return cached data (if available)
4. If no cache, return error

## Rate Limiting

NSE may rate limit requests. The server:
- Maintains a session with NSE
- Refreshes session every 5 minutes
- Caches responses to reduce API calls
- Implements exponential backoff (future enhancement)

## Production Deployment

### Using PM2

```bash
npm install -g pm2
pm2 start server.js --name nse-proxy
pm2 save
pm2 startup
```

### Using Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t nse-proxy .
docker run -p 3001:3001 nse-proxy
```

### Environment Variables for Production

```env
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
```

## Monitoring

Add logging and monitoring:

```bash
npm install winston morgan
```

## Security Considerations

1. **CORS:** Configure allowed origins in production
2. **Rate Limiting:** Add rate limiting middleware
3. **API Keys:** If using paid APIs, store keys in environment variables
4. **HTTPS:** Use HTTPS in production
5. **Authentication:** Add authentication if needed

## Troubleshooting

### NSE Session Fails
- Check if NSE website is accessible
- Verify headers are correct
- Try refreshing session manually

### CORS Errors
- Ensure backend is running
- Check CORS configuration
- Verify frontend URL is allowed

### Data Not Updating
- Check cache TTL settings
- Verify refresh intervals
- Check network connectivity

### High Memory Usage
- Reduce cache size
- Implement cache eviction policy
- Monitor memory usage

## Support

For issues or questions:
1. Check server logs
2. Test endpoints with curl
3. Verify NSE website is accessible
4. Check network connectivity

## License

MIT
