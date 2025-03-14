import React, { useEffect, useState } from 'react';
import './App.css';
import TimeNavigation from './components/TimeNavigation';
import StockChart from './components/StockChart';
import TradingPanel from './components/TradingPanel';
import PortfolioDisplay from './components/PortfolioDisplay';
import { TimeProvider } from './context/TimeContext';
import { getHistoricalData } from './services/DataService';

function App() {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStock, setSelectedStock] = useState('AAPL');
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getHistoricalData(selectedStock);
        setStockData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    loadData();
  }, [selectedStock]);
  
  const handleStockChange = (symbol) => {
    setSelectedStock(symbol);
  };
  
  if (loading) return <div className="loading-screen">Loading stock data...</div>;
  if (error) return <div className="error-screen">Error: {error}</div>;
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Trading Simulation Game</h1>
        <div className="stock-selector">
          <label htmlFor="stock-select">Select Stock: </label>
          <select 
            id="stock-select"
            value={selectedStock}
            onChange={(e) => handleStockChange(e.target.value)}
          >
            <option value="AAPL">Apple (AAPL)</option>
            <option value="MSFT">Microsoft (MSFT)</option>
            <option value="GOOGL">Google (GOOGL)</option>
            <option value="NVDA">NVIDIA (NVDA)</option>
            <option value="META">Meta (META)</option>
          </select>
        </div>
      </header>
      
      <main>
        <TimeProvider initialData={stockData}>
          <div className="app-layout">
            <div className="chart-section">
              <StockChart />
            </div>
            <div className="trading-section">
              <TradingPanel symbol={selectedStock} />
              <PortfolioDisplay />
              <TimeNavigation />
            </div>
          </div>
        </TimeProvider>
      </main>
      <footer>
        <p>Trading Simulator - Created with React</p>
      </footer>
    </div>
  );
}

export default App;