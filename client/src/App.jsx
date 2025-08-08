import "./App.css";
import HealthStatus from "./components/HealthStatus";
import StockViewer from "./components/StockViewer";

export default function App() {
  
  return (
    <div style={{ padding: 24 }}>
      <h1>API Test</h1>
      <HealthStatus />
      <StockViewer defaultSymbol="IBM" />
    </div>
  )
}
