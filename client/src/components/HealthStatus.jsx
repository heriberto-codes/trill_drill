import { useEffect, useState } from "react";

export default function HealthStatus() {
    // set state variables
    const [health, setHealth] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    // run component life cycle
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/health");
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                setHealth(await res.json());
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // return jsx 
    return (
        <section style={{ marginTop: 16 }}>
            <h2>Health Check</h2>
            {loading && <p>Loading..</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {!loading && !error && <pre>{JSON.stringify(health, null, 2)}</pre>}
        </section>
    )
}