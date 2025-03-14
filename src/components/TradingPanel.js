import React, { useState } from 'react';
import { useTimeNavigation } from '../context/TimeContext';

const TradingPanel = ({ symbol = 'AAPL' }) => {
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
    
    const result = executeTrade(symbol, quantity, 'buy');
    setMessage(result.success ? 'Purchase successful!' : result.message);
  };
  
  const handleSell = () => {
    if (!currentData) {
      setMessage('No price data available');
      return;
    }
    
    const result = executeTrade(symbol, quantity, 'sell');
    setMessage(result.success ? 'Sale successful!' : result.message);
  };
  

  const calculateTotalCost = () => {
    if (!currentData) return 0;
    return currentData.close * quantity;
  };
  
  const totalCost = calculateTotalCost();
  const canBuy = cash >= totalCost && currentData;
  
  return (
    <div className="trading-panel">
      <h3>Trading Panel - {symbol}</h3>
      
      <div className="price-display">
        <p><strong>Current Price:</strong> ${currentData ? currentData.close.toFixed(2) : 'N/A'}</p>
        <p><strong>Cash Balance:</strong> ${cash.toFixed(2)}</p>
      </div>
      
      <div className="trading-controls">
        <div className="input-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        
        <div className="cost-preview">
          <p>Total Cost: ${totalCost.toFixed(2)}</p>
          {!canBuy && totalCost > 0 && (
            <p className="insufficient-funds">Insufficient funds</p>
          )}
        </div>
        
        <div className="trading-buttons">
          <button 
            className="buy-button"
            onClick={handleBuy}
            disabled={!canBuy}
          >
            Buy
          </button>
          <button 
            className="sell-button"
            onClick={handleSell}
          >
            Sell
          </button>
        </div>
      </div>
      
      {message && (
        <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default TradingPanel;