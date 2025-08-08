// import dependencies
import express from "express";
import dotenv from "dotenv";
import healthRouter from "./routes/health.js";
import stockRouter from "./routes/intradaySTOCK.js"

// load environment variables
dotenv.config() 

// save instace of express to variable 
const app = express()

// middleware to parse JSON 
app.use(express.json())

// API routes
app.use("/api/health", healthRouter)
app.use("/api/stock", stockRouter)

// Serve static frontend (React/Vite build)
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(join(__dirname, 'client/dist')));
app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, 'client/dist/index.html'));
});

// start up server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
