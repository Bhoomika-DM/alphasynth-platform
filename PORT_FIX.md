# Port Configuration Fix

## Problem
The application is trying to run on port 5173 (Vite's default) instead of port 3000 (Next.js default). This causes:
- Yahoo Finance API proxy returning 500 errors
- Favicon 404 errors
- All API routes failing

## Root Cause
The error logs show:
```
GET http://localhost:5173/api/yahoo-proxy?symbol=%5ENSEBANK&type=quote 500
GET http://localhost:5173/favicon.ico 404
```

This means something is running the app on port 5173 instead of port 3000.

## Solution

### Step 1: Stop All Running Processes
```bash
# Kill any process on port 5173
# Windows (PowerShell):
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process -Force

# Or find and kill manually:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Also check port 3000:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Step 2: Start Next.js Dev Server Correctly
```bash
cd frontend
npm run dev
```

This should start the server on **http://localhost:3000**

### Step 3: Verify
Open your browser and navigate to:
```
http://localhost:3000
```

NOT `http://localhost:5173`

## Why Port 5173?

Port 5173 is Vite's default development port. This suggests:
1. You might have accidentally run `vite` or `npm run dev` from a Vite project
2. There's a conflicting process from a previous Vite setup
3. The Next.js dev server isn't starting correctly

## Next.js Default Port

Next.js uses port **3000** by default. You can verify this in:
- `frontend/package.json` - check the `dev` script
- Should be: `"dev": "next dev"`

## If Port 3000 is Taken

If you need to use a different port:

```bash
# Option 1: Specify port in command
cd frontend
npm run dev -- -p 3001

# Option 2: Set PORT environment variable
PORT=3001 npm run dev
```

Then update your browser URL accordingly.

## Current Status

Based on the errors, you need to:
1. ✅ Stop whatever is running on port 5173
2. ✅ Start Next.js dev server (should use port 3000)
3. ✅ Access the app at http://localhost:3000

## Quick Commands

```bash
# Navigate to frontend
cd frontend

# Install dependencies (if needed)
npm install

# Start dev server
npm run dev

# Expected output:
# ▲ Next.js 14.x.x
# - Local:        http://localhost:3000
# - Network:      http://192.168.x.x:3000
```

## After Fix

Once running on the correct port:
- ✅ Yahoo Finance API will work
- ✅ All API routes will work
- ✅ Favicon will load
- ✅ Authentication will work
- ✅ Dashboard will load market data
