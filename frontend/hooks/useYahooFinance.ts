// React Hooks for Yahoo Finance Data
// Works directly in frontend - perfect for Netlify deployment

import { useState, useEffect, useCallback } from 'react';
import {
  fetchStockQuote,
  fetchIndexData,
  fetchBatchQuotes,
  fetchHistoricalData,
  fetchTopMovers,
  isMarketOpen,
  StockQuote,
  IndexData,
  HistoricalDataPoint,
} from '@/lib/yahooFinance';

/**
 * Hook to fetch stock quote with auto-refresh
 */
export function useStockQuote(symbol: string, refreshInterval: number = 30000) {
  const [data, setData] = useState<StockQuote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!symbol) return;

    try {
      setLoading(true);
      setError(null);
      const quote = await fetchStockQuote(symbol);
      setData(quote);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch stock quote');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    fetchData();

    // Auto-refresh only if market is open
    if (refreshInterval > 0 && isMarketOpen()) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refreshInterval]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to fetch index data with auto-refresh
 */
export function useIndexData(indexSymbol: string, refreshInterval: number = 30000) {
  const [data, setData] = useState<IndexData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!indexSymbol) return;

    try {
      setLoading(true);
      setError(null);
      const indexData = await fetchIndexData(indexSymbol);
      setData(indexData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch index data');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [indexSymbol]);

  useEffect(() => {
    fetchData();

    if (refreshInterval > 0 && isMarketOpen()) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refreshInterval]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to fetch multiple indices at once
 */
export function useMultipleIndices(indexSymbols: string[], refreshInterval: number = 30000) {
  const [data, setData] = useState<(IndexData | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Convert array to stable string key to avoid infinite loops
  const symbolsKey = indexSymbols.join(',');

  useEffect(() => {
    const fetchData = async () => {
      if (!indexSymbols || indexSymbols.length === 0) return;

      try {
        setLoading(true);
        setError(null);
        const promises = indexSymbols.map(symbol => fetchIndexData(symbol));
        const results = await Promise.all(promises);
        setData(results);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch indices');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    if (refreshInterval > 0 && isMarketOpen()) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [symbolsKey, refreshInterval]);

  const refetch = useCallback(async () => {
    if (!indexSymbols || indexSymbols.length === 0) return;

    try {
      setLoading(true);
      setError(null);
      const promises = indexSymbols.map(symbol => fetchIndexData(symbol));
      const results = await Promise.all(promises);
      setData(results);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch indices');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [symbolsKey]);

  return { data, loading, error, refetch };
}

/**
 * Hook to fetch batch stock quotes
 */
export function useBatchQuotes(symbols: string[], refreshInterval: number = 30000) {
  const [data, setData] = useState<(StockQuote | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Convert array to stable string key to avoid infinite loops
  const symbolsKey = symbols.join(',');

  useEffect(() => {
    const fetchData = async () => {
      if (!symbols || symbols.length === 0) return;

      try {
        setLoading(true);
        setError(null);
        const quotes = await fetchBatchQuotes(symbols);
        setData(quotes);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch batch quotes');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    if (refreshInterval > 0 && isMarketOpen()) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [symbolsKey, refreshInterval]);

  const refetch = useCallback(async () => {
    if (!symbols || symbols.length === 0) return;

    try {
      setLoading(true);
      setError(null);
      const quotes = await fetchBatchQuotes(symbols);
      setData(quotes);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch batch quotes');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [symbolsKey]);

  return { data, loading, error, refetch };
}

/**
 * Hook to fetch historical data
 */
export function useHistoricalData(
  symbol: string,
  range: '1d' | '5d' | '1mo' | '3mo' | '6mo' | '1y' | '5y' = '1mo'
) {
  const [data, setData] = useState<HistoricalDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!symbol) return;

    try {
      setLoading(true);
      setError(null);
      const historicalData = await fetchHistoricalData(symbol, range);
      setData(historicalData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch historical data');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [symbol, range]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to fetch top gainers or losers
 */
export function useTopMovers(type: 'gainers' | 'losers' = 'gainers', refreshInterval: number = 60000) {
  const [data, setData] = useState<StockQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const movers = await fetchTopMovers(type);
      setData(movers);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch top movers');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchData();

    if (refreshInterval > 0 && isMarketOpen()) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refreshInterval]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to check market status
 */
export function useMarketStatus() {
  const [isOpen, setIsOpen] = useState(isMarketOpen());

  useEffect(() => {
    // Check market status every minute
    const interval = setInterval(() => {
      setIsOpen(isMarketOpen());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return { isOpen };
}

