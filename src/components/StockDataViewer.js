import React, { useState, useEffect } from 'react';
import { getStockSymbols, getHistoricalData } from '../services/DataService';

const StockDataViewer = () => {
  const [symbols] = useState(getStockSymbols());
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!selectedSymbol) return;
    
    let isMounted = true;
    
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const stockData = await getHistoricalData(selectedSymbol);

        if (isMounted) {
          setData(stockData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setData([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    loadData();
    
    return () => {
      isMounted = false;
    };
  }, [selectedSymbol]);
  
  const handleSymbolChange = (e) => {
    setSelectedSymbol(e.target.value);
  };
  
  return (
    <div className="stock-data-viewer">
      <h2>Stock Data Viewer</h2>
      
      <div className="stock-selector">
        <label htmlFor="stock-select">Select a stock: </label>
        <select 
          id="stock-select"
          value={selectedSymbol}
          onChange={handleSymbolChange}
        >
          <option value="">-- Select --</option>
          {symbols.map(symbol => (
            <option key={symbol} value={symbol}>{symbol}</option>
          ))}
        </select>
      </div>
      
      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      
      {!loading && !error && data.length > 0 && (
        <div className="data-table">
          <h3>{selectedSymbol} Historical Data</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.open.toFixed(2)}</td>
                  <td>{item.high.toFixed(2)}</td>
                  <td>{item.low.toFixed(2)}</td>
                  <td>{item.close.toFixed(2)}</td>
                  <td>{item.volume.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Showing first 10 of {data.length} records</p>
        </div>
      )}
    </div>
  );
};

export default StockDataViewer;