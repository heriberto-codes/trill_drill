import { Router } from "express";

const router = Router();

router.get("/:symbol", async (req, res) => {
    try {
        const symbol = req.params.symbol.toUpperCase();
        const apiKey = process.env.ALPHA_VANTAGE_KEY;
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`
        
        const response = await fetch(url)
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
    
        const data = await response.json()
        res.json(data);
    } catch {
        console.error(error)
        res.status(500).json({ error: "Failed to fetch stock data" })
    }
});

export default router;