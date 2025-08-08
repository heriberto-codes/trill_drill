import { useEffect, useState } from "react";

export default function StockViewer({ defaultSymbol = "IBM"}) {
    const [symbol, setSymbol] = useState(defaultSymbol);
    const [stock, setStock] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchStock(sym) {
        setLoading(true);
        setError(null);
        try {
           const res = await fetch(`/api/stock/${encodeURIComponent(sym)}`);
           if (!res.ok) throw new Error(`HTTP ${res.status}`);
           setStock(await res.json());
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStock(symbol);
    }, []);

    return (
        <section style={{ marginTop: 16 }}>
            <h2>Stock Data</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                fetchStock(symbol);
            }}
            style={{ marginBottom: 12 }}    
        >
            <label>
                Symbol:&nbsp;
                <input 
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    placeholder="e.g. IBM"
                />
            </label>
            <button type="submit" style={{ marginLeft: 8 }}>Fetch</button>
            </form>

            {loading && <p>Loading…</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {stock && <pre>{JSON.stringify(stock, null, 2)}</pre>}
        </section>
    )
}