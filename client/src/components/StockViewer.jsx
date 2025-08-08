// import { useEffect, useState } from "react";

// export default function StockViewer({ defaultSymbol = "IBM"}) {
//     const [symbol, setSymbol] = useState(defaultSymbol);
//     const [stock, setStock] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     async function fetchStock(sym) {
//         setLoading(true);
//         setError(null);
//         try {
//            const res = await fetch(`/api/stock/${encodeURIComponent(sym)}`);
//            if (!res.ok) throw new Error(`HTTP ${res.status}`);
//            setStock(await res.json());
//         } catch (e) {
//             setError(e.message);
//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         fetchStock(symbol);
//     }, []);

//     return (
//         <section style={{ marginTop: 16 }}>
//             <h2>Stock Data</h2>
//             <form onSubmit={(e) => {
//                 e.preventDefault();
//                 fetchStock(symbol);
//             }}
//             style={{ marginBottom: 12 }}    
//         >
//             <label>
//                 Symbol:&nbsp;
//                 <input 
//                     value={symbol}
//                     onChange={(e) => setSymbol(e.target.value.toUpperCase())}
//                     placeholder="e.g. IBM"
//                 />
//             </label>
//             <button type="submit" style={{ marginLeft: 8 }}>Fetch</button>
//             </form>

//             {loading && <p>Loading…</p>}
//             {error && <p style={{ color: "red" }}>Error: {error}</p>}
//             {stock && <pre>{JSON.stringify(stock, null, 2)}</pre>}
//         </section>
//     )
// }

// client/src/components/StockViewer.jsx
import { useEffect, useState } from "react";
import StockChart from "./StockChart";
import { normalizeIntraday } from "../utils/alphaVantage";

export default function StockViewer({ defaultSymbol = "IBM" }) {
  const [symbol, setSymbol] = useState(defaultSymbol);
  const [stockRaw, setStockRaw] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchStock(sym) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/stock/${encodeURIComponent(sym)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      setStockRaw(json);
      setChartData(normalizeIntraday(json));
    } catch (e) {
      setError(e.message);
      setStockRaw(null);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStock(symbol);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section style={{ marginTop: 16 }}>
      <h2>Stock Data</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchStock(symbol);
        }}
        style={{ marginBottom: 12, display: "flex", gap: 8, alignItems: "center" }}
      >
        <label>
          Symbol:&nbsp;
          <input
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="e.g. IBM"
          />
        </label>
        <button type="submit">Fetch</button>
      </form>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {chartData.length > 0 && <StockChart data={chartData} />}

      {stockRaw && (
        <div style={{ marginTop: 12 }}>
            <p><strong>Symbol:</strong> {stockRaw["Meta Data"]["2. Symbol"]}</p>
            <p><strong>Last Refreshed:</strong> {stockRaw["Meta Data"]["3. Last Refreshed"]}</p>
        </div>
    )}

      {/* Keep raw JSON visible if you want to debug */}
      {/* {stockRaw && <pre style={{ marginTop: 12 }}>{JSON.stringify(stockRaw, null, 2)}</pre>} */}
    </section>
  );
}