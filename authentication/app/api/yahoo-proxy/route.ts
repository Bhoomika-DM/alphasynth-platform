// Yahoo Finance Proxy API Route
// This bypasses CORS by making requests from the server side

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const symbol = searchParams.get('symbol');
  const type = searchParams.get('type') || 'quote';
  const range = searchParams.get('range') || '1d';

  console.log('[Yahoo Proxy] Request:', { symbol, type, range });

  if (!symbol) {
    console.error('[Yahoo Proxy] Missing symbol parameter');
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  try {
    let url = '';
    
    if (type === 'quote') {
      url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`;
    } else if (type === 'historical') {
      url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=${range}`;
    } else {
      console.error('[Yahoo Proxy] Invalid type:', type);
      return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }

    console.log('[Yahoo Proxy] Fetching:', url);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json',
      },
    });

    console.log('[Yahoo Proxy] Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Yahoo Proxy] Yahoo Finance API error:', response.status, errorText);
      throw new Error(`Yahoo Finance API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Check if Yahoo returned an error in the response
    if (data.chart?.error) {
      console.error('[Yahoo Proxy] Yahoo Finance returned error:', data.chart.error);
      throw new Error(`Yahoo Finance error: ${data.chart.error.description || 'Unknown error'}`);
    }

    console.log('[Yahoo Proxy] Success for symbol:', symbol);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('[Yahoo Proxy] Error details:', {
      message: error.message,
      symbol,
      type,
      stack: error.stack
    });
    return NextResponse.json(
      { 
        error: 'Failed to fetch data from Yahoo Finance', 
        message: error.message,
        symbol,
        type
      },
      { status: 500 }
    );
  }
}
