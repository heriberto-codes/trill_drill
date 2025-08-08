export function normalizeIntraday(json) {
  const series = json["Time Series (5min)"] || {};
  const rows = Object.entries(series).map(([ts, v]) => ({
    time: ts,                                   // "2025-08-07 19:55:00"
    open: Number(v["1. open"]),
    high: Number(v["2. high"]),
    low: Number(v["3. low"]),
    close: Number(v["4. close"]),
    volume: Number(v["5. volume"]),
  }));

  // Ascending by time so charts draw left→right
  rows.sort((a, b) => new Date(a.time) - new Date(b.time));
  return rows;
}