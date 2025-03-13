import React, { useEffect, useState } from 'react';
import './App.css';
import TimeNavigation from './components/TimeNavigation';
import { TimeProvider } from './context/TimeContext';
import { getHistoricalData } from './services/DataService';

function App() {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getHistoricalData('AAPL');
        setStockData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Trading Simulation Game</h1>
      </header>
      
      <main>
        <TimeProvider initialData={stockData}>
          <TimeNavigation />
        </TimeProvider>
      </main>
    </div>
  );
}

export default App;