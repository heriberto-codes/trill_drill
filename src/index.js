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

// routes 
app.use("/health", healthRouter)
app.use("/stock", stockRouter)

// start up server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
})
