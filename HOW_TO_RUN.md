# How to Run AlphaSynth Frontend

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Development Server

Run the development server on port 5173 (required for Google OAuth):

```bash
npm run dev -- --port 5173
```

Or if using yarn:
```bash
yarn dev --port 5173
```

The application will be available at: `http://localhost:5173`

## Important Notes

- Port 5173 is REQUIRED because Google OAuth is configured for this port
- The app uses Yahoo Finance API for real NSE market data (no API key needed)
- All API calls go through Next.js API routes to bypass CORS
- No backend server is needed - this is a frontend-only deployment

## Features

- Real-time NSE market data from Yahoo Finance
- NIFTY indices tracking (NIFTY 50, BANK NIFTY, etc.)
- Stock quotes and historical data
- Top gainers/losers
- Authentication with Supabase
- Onboarding flow for new users

## Troubleshooting

### If you see errors about volume.toFixed:
- Clear your browser cache (Ctrl+Shift+Delete)
- Do a hard refresh (Ctrl+Shift+R)
- Restart the dev server

### If Yahoo Finance API returns 500 errors:
- Check the terminal logs for detailed error messages
- The proxy route at `/api/yahoo-proxy` logs all requests
- Some symbols may not be available on Yahoo Finance

### If Google OAuth doesn't work:
- Make sure you're running on port 5173
- Check that the redirect URL in Google Console is set to `http://localhost:5173/auth/callback`

## Deployment to Netlify

This frontend can be deployed to Netlify without any backend:

1. Build the project:
```bash
npm run build
```

2. Deploy the `.next` folder to Netlify

3. Configure environment variables in Netlify dashboard (Supabase keys, etc.)

## Environment Variables

Create a `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
