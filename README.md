# trill_drill
Trillium Second-Round Interview Prep Stock App

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
 
