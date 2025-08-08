# trill_drill
Trillium mock stock app

## Overview
This is a simple full-stack demo application that fetches intraday stock data from Alpha Vantage and presents it via a React/Vite frontend with interactive charts.

## Backend (Node.js + Express)
- **GET /api/health**: health-check endpoint returning status and timestamp.
- **GET /api/stock/:symbol**: proxies TIME_SERIES_INTRADAY data (5‑minute interval) from Alpha Vantage.

## Frontend (React + Vite)
- Displays health status and an interactive intraday stock chart.
- Uses Recharts for rendering price and volume charts.

# API used
[https://www.alphavantage.co/documentation/](https://www.alphavantage.co/documentation/)
 
## Deployment to Fly.io

This app can be deployed on Fly.io with Docker. Ensure you have [flyctl](https://fly.io/docs/getting-started/install/) installed and authenticated.

1. Build & launch (without deploy):
   ```bash
   flyctl launch --dockerfile Dockerfile --name your-app-name --region YOUR_REGION --no-deploy
   ```
2. Set environment secrets:
   ```bash
   flyctl secrets set ALPHA_VANTAGE_KEY=your_api_key_here
   flyctl secrets set SENTRY_DSN=your_server_dsn_here
   flyctl secrets set VITE_SENTRY_DSN=your_browser_dsn_here
   ```
3. Deploy:
   ```bash
   flyctl deploy
   ```

After deployment, visit your Fly URL (e.g. `https://your-app-name.fly.dev/`) for the React UI, or append `/api/health` or `/api/stock/IBM` for API endpoints.

## Error Monitoring with Sentry

This project uses Sentry to capture errors and performance traces in both backend and frontend.

### Local setup
1. Set your server DSN:
   ```bash
   export SENTRY_DSN=your_server_dsn_here
   ```
2. In the `client/` folder, create a `.env` file:
   ```dotenv
   VITE_SENTRY_DSN=your_browser_dsn_here
   ```

### Production setup
Set Sentry DSNs as Fly.io secrets (see above) before deploying.
