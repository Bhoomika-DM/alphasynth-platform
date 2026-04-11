// NSE Data Proxy Server
// This server acts as a proxy to fetch NSE data and serve it to the frontend

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const NodeCache = require('node-cache');
require('dotenv').config();

const app = express();
const cache = new NodeCache({ stdTTL: 30 }); // Cache for 30 seconds

// Middleware
app.use(cors());
app.use(express.json());

// NSE Headers (required to bypass CORS and access NSE endpoints)
const NSE_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'Accept': 'application/json',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Referer': 'https://www.nseindia.com/',
  'X-Requested-With': 'XMLHttpRequest'
};

// Create axios instance with session management
const nseClient = axios.create({
  baseURL: 'https://www.nseindia.com',
  headers: NSE_HEADERS,
  timeout: 10000
});

// Session cookie management
let sessionCookies = '';

// Initialize session by visiting homepage
async function initializeSession() {
  try {
    const response = await nseClient.get('/');
    sessionCookies = response.headers['set-cookie']?.join('; ') || '';
    console.log('NSE session initialized');
  } catch (error) {
    console.error('Failed to initialize NSE session:', error.message);
  }
}

// Initialize session on server start
initializeSession();

// Refresh session every 5 minutes
setInterval(initializeSession, 5 * 60 * 1000);

// Helper function to make NSE requests
async function fetchFromNSE(endpoint) {
  try {
    const response = await nseClient.get(endpoint, {
      headers: {
        ...NSE_HEADERS,
        Cookie: sessionCookies
      }
    });
    return response.data;
  } catch (error) {
    console.error(`NSE API Error (${endpoint}):`, error.message);
    throw error;
  }
}

// Fallback to Yahoo Finance
async function fetchFromYahoo(symbol) {
  try {
    const response = await axios.get(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.NS?interval=1d&range=1d`
    );
    return response.data;
  } catch (error) {
    console.error('Yahoo Finance Error:', error.message);
    throw error;
  }
}

// ==================== ROUTES ====================

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get stock quote
app.get('/api/quote/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const cacheKey = `quote_${symbol}`;

  try {
    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({ source: 'cache', data: cached });
    }

    // Try NSE first
    try {
      const data = await fetchFromNSE(`/api/quote-equity?symbol=${symbol}`);
      cache.set(cacheKey, data);
      return res.json({ source: 'nse', data });
    } catch (nseError) {
      console.log('NSE failed, trying Yahoo Finance...');
      
      // Fallback to Yahoo Finance
      const yahooData = await fetchFromYahoo(symbol);
      cache.set(cacheKey, yahooData);
      return res.json({ source: 'yahoo', data: yahooData });
    }
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch stock data', 
      message: error.message 
    });
  }
});

// Get market status
app.get('/api/market-status', async (req, res) => {
  const cacheKey = 'market_status';

  try {
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({ source: 'cache', data: cached });
    }

    const data = await fetchFromNSE('/api/marketStatus');
    cache.set(cacheKey, data);
    res.json({ source: 'nse', data });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch market status', 
      message: error.message 
    });
  }
});

// Get index data (NIFTY 50, BANK NIFTY, etc.)
app.get('/api/index/:indexName', async (req, res) => {
  const { indexName } = req.params;
  const cacheKey = `index_${indexName}`;

  try {
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({ source: 'cache', data: cached });
    }

    const data = await fetchFromNSE(`/api/equity-stockIndices?index=${encodeURIComponent(indexName)}`);
    cache.set(cacheKey, data);
    res.json({ source: 'nse', data });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch index data', 
      message: error.message 
    });
  }
});

// Get top gainers
app.get('/api/top-gainers', async (req, res) => {
  const cacheKey = 'top_gainers';

  try {
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({ source: 'cache', data: cached });
    }

    const data = await fetchFromNSE('/api/live-analysis-variations?index=gainers');
    cache.set(cacheKey, data);
    res.json({ source: 'nse', data });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch top gainers', 
      message: error.message 
    });
  }
});

// Get top losers
app.get('/api/top-losers', async (req, res) => {
  const cacheKey = 'top_losers';

  try {
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({ source: 'cache', data: cached });
    }

    const data = await fetchFromNSE('/api/live-analysis-variations?index=losers');
    cache.set(cacheKey, data);
    res.json({ source: 'nse', data });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch top losers', 
      message: error.message 
    });
  }
});

// Get historical data
app.get('/api/historical/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const { from, to } = req.query;
  const cacheKey = `historical_${symbol}_${from}_${to}`;

  try {
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({ source: 'cache', data: cached });
    }

    const data = await fetchFromNSE(
      `/api/historical/cm/equity?symbol=${symbol}&series=["EQ"]&from=${from}&to=${to}`
    );
    cache.set(cacheKey, data, 300); // Cache for 5 minutes
    res.json({ source: 'nse', data });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch historical data', 
      message: error.message 
    });
  }
});

// Get corporate actions
app.get('/api/corporate-actions/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const cacheKey = `corporate_${symbol}`;

  try {
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({ source: 'cache', data: cached });
    }

    const data = await fetchFromNSE(
      `/api/corporates-corporateActions?index=equities&symbol=${symbol}`
    );
    cache.set(cacheKey, data, 600); // Cache for 10 minutes
    res.json({ source: 'nse', data });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch corporate actions', 
      message: error.message 
    });
  }
});

// Get multiple quotes at once
app.post('/api/quotes/batch', async (req, res) => {
  const { symbols } = req.body;

  if (!Array.isArray(symbols) || symbols.length === 0) {
    return res.status(400).json({ error: 'Invalid symbols array' });
  }

  try {
    const results = await Promise.allSettled(
      symbols.map(async (symbol) => {
        const cacheKey = `quote_${symbol}`;
        const cached = cache.get(cacheKey);
        
        if (cached) {
          return { symbol, data: cached, source: 'cache' };
        }

        try {
          const data = await fetchFromNSE(`/api/quote-equity?symbol=${symbol}`);
          cache.set(cacheKey, data);
          return { symbol, data, source: 'nse' };
        } catch {
          const yahooData = await fetchFromYahoo(symbol);
          cache.set(cacheKey, yahooData);
          return { symbol, data: yahooData, source: 'yahoo' };
        }
      })
    );

    const quotes = results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return { 
          symbol: symbols[index], 
          error: result.reason.message,
          data: null 
        };
      }
    });

    res.json({ quotes });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch batch quotes', 
      message: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    error: 'Internal server error', 
    message: err.message 
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`NSE Data Proxy Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
