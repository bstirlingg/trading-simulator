import React from 'react';
import { useTimeNavigation } from '../context/TimeContext';

const PortfolioDisplay = () => {
  const { cash, positions, currentData } = useTimeNavigation();
  
  // Calculate total portfolio value and position values
  const calculatePositionValues = () => {
    if (!currentData || Object.keys(positions).length === 0) {
      return { positionValues: {}, totalPositionsValue: 0 };
    }
    
    const positionValues = {};
    let totalPositionsValue = 0;
    
    for (const symbol in positions) {
      const quantity = positions[symbol];
      const value = quantity * currentData.close;
      positionValues[symbol] = value;
      totalPositionsValue += value;
    }
    
    return { positionValues, totalPositionsValue };
  };
  
  const { positionValues, totalPositionsValue } = calculatePositionValues();
  const totalPortfolioValue = cash + totalPositionsValue;
  
  return (
    <div className="portfolio-display">
      <h3>Portfolio Summary</h3>
      
      <div className="portfolio-summary">
        <p><strong>Cash Balance:</strong> ${cash.toFixed(2)}</p>
        <p><strong>Portfolio Value:</strong> ${totalPortfolioValue.toFixed(2)}</p>
      </div>
      
      {Object.keys(positions).length > 0 ? (
        <div className="positions-list">
          <h4>Your Positions</h4>
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Quantity</th>
                <th>Current Price</th>
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(positions).map(([symbol, quantity]) => (
                <tr key={symbol}>
                  <td>{symbol}</td>
                  <td>{quantity}</td>
                  <td>${currentData ? currentData.close.toFixed(2) : 'N/A'}</td>
                  <td>${positionValues[symbol] ? positionValues[symbol].toFixed(2) : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No positions yet. Use the trading panel to buy stocks.</p>
      )}
    </div>
  );
};

export default PortfolioDisplay;