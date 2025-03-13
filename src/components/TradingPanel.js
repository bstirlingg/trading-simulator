import React, { useState } from 'react';
import { useTimeNavigation } from '../context/TimeContext';

const TradingPanel = () => {
  const { currentData, cash, executeTrade } = useTimeNavigation();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  const handleBuy = () => {
    if (!currentData) {
      setMessage('No price data available');
      return;
    }
    
    const result = executeTrade('AAPL', quantity, 'buy');
    setMessage(result.success ? 'Purchase successful!' : result.message);
  };
  
  const handleSell = () => {
    if (!currentData) {
      setMessage('No price data available');
      return;
    }
    
    const result = executeTrade('AAPL', quantity, 'sell');
    setMessage(result.success ? 'Sale successful!' : result.message);
  };
  
  return (
    <div className="trading-panel">
      <h3>Trading Panel</h3>
      
      <div className="price-display">
        <p><strong>Current Price:</strong> ${currentData ? currentData.close.toFixed(2) : 'N/A'}</p>
        <p><strong>Cash Balance:</strong> ${cash.toFixed(2)}</p>
      </div>
      
      <div className="trading-controls">
        <label htmlFor="quantity">Quantity:</label>
        <input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
        
        <div className="trading-buttons">
          <button 
            onClick={handleBuy}
            disabled={!currentData || currentData.close * quantity > cash}
          >
            Buy
          </button>
          <button onClick={handleSell}>Sell</button>
        </div>
      </div>
      
      {message && (
        <div className="message">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default TradingPanel;