// React Hook for NSE Data
// Easy-to-use hooks for fetching NSE data in components

import { useState, useEffect, useCallback } from 'react';
import { nseApi, StockQuote, MarketStatus, IndexData, TopMover } from '@/lib/nseApi';

/**
 * Hook to fetch stock quote
 */
export function useStockQuote(symbol: string, refreshInterval?: number) {
  const [data, setData] = useState<StockQuote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'nse' | 'yahoo' | 'cache' | null>(null);

  const fetchData = useCallback(async () => {
    if (!symbol) return;

    try {
      setLoading(true);
      setError(null);
      const response = await nseApi.getQuote(symbol);
      setData(response.data);
      setSource(response.source);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch stock quote');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    fetchData();

    // Set up auto-refresh if interval is provided
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refreshInterval]);

  return { data, loading, error, source, refetch: fetchData };
}

/**
 * Hook to fetch market status
 */
export function useMarketStatus(refreshInterval?: number) {
  const [data, setData] = useState<MarketStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await nseApi.getMarketStatus();
      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch market status');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refreshInterval]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to fetch index data
 */
export function useIndexData(indexName: string, refreshInterval?: number) {
  const [data, setData] = useState<IndexData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!indexName) return;

    try {
      setLoading(true);
      setError(null);
      const response = await nseApi.getIndex(indexName);
      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch index data');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [indexName]);

  useEffect(() => {
    fetchData();

    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refreshInterval]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to fetch top gainers
 */
export function useTopGainers(refreshInterval?: number) {
  const [data, setData] = useState<TopMover[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await nseApi.getTopGainers();
      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch top gainers');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refreshInterval]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to fetch top losers
 */
export function useTopLosers(refreshInterval?: number) {
  const [data, setData] = useState<TopMover[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await nseApi.getTopLosers();
      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch top losers');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refreshInterval]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to fetch multiple stock quotes at once
 */
export function useBatchQuotes(symbols: string[], refreshInterval?: number) {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!symbols || symbols.length === 0) return;

    try {
      setLoading(true);
      setError(null);
      const response = await nseApi.getBatchQuotes(symbols);
      setData(response.quotes);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch batch quotes');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [symbols]);

  useEffect(() => {
    fetchData();

    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refreshInterval]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to fetch historical data
 */
export function useHistoricalData(symbol: string, from: string, to: string) {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!symbol || !from || !to) return;

    try {
      setLoading(true);
      setError(null);
      const response = await nseApi.getHistoricalData(symbol, from, to);
      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch historical data');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [symbol, from, to]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to fetch corporate actions
 */
export function useCorporateActions(symbol: string) {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!symbol) return;

    try {
      setLoading(true);
      setError(null);
      const response = await nseApi.getCorporateActions(symbol);
      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch corporate actions');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
