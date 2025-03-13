import React, { createContext, useContext, useState, useEffect } from 'react';
import { TimeController } from '../services/TimeController';

const TimeContext = createContext();

export const TimeProvider = ({ children, initialData = [] }) => {
  // Initialize controller
  const [controller] = useState(() => new TimeController(initialData));
  
  // Time state
  const [currentIndex, setCurrentIndex] = useState(controller.getCurrentIndex());
  const [currentData, setCurrentData] = useState(controller.getCurrentData());
  
  // Portfolio state
  const [cash, setCash] = useState(10000);
  const [positions, setPositions] = useState({});
  
  // Subscribe to controller updates
  useEffect(() => {
    const unsubscribe = controller.subscribe(state => {
      setCurrentIndex(state.currentIndex);
      setCurrentData(state.currentData);
    });
    
    return unsubscribe;
  }, [controller]);
  
  // Navigation functions
  const next = () => controller.next();
  const previous = () => controller.previous();
  const reset = () => controller.reset();
  
  // Trade execution function
  const executeTrade = (symbol, quantity, action) => {
    if (!currentData) return { success: false, message: 'No price data available' };
    
    const price = currentData.close;
    const totalCost = price * quantity;
    
    if (action === 'buy') {
      // Validate sufficient funds
      if (totalCost > cash) {
        return { success: false, message: 'Insufficient funds' };
      }
      
      // Update cash and positions
      setCash(prevCash => prevCash - totalCost);
      setPositions(prevPositions => {
        const updatedPositions = { ...prevPositions };
        updatedPositions[symbol] = (updatedPositions[symbol] || 0) + quantity;
        return updatedPositions;
      });
      
      return { success: true };
    } 
    else if (action === 'sell') {
      // Validate sufficient shares
      if (!positions[symbol] || positions[symbol] < quantity) {
        return { success: false, message: 'Insufficient shares' };
      }
      
      // Update cash and positions
      setCash(prevCash => prevCash + totalCost);
      setPositions(prevPositions => {
        const updatedPositions = { ...prevPositions };
        updatedPositions[symbol] = updatedPositions[symbol] - quantity;
        
        // Remove position if quantity is 0
        if (updatedPositions[symbol] === 0) {
          delete updatedPositions[symbol];
        }
        
        return updatedPositions;
      });
      
      return { success: true };
    }
    
    return { success: false, message: 'Invalid action' };
  };
  
  // Context value
  const value = {
    currentIndex,
    currentData,
    next,
    previous,
    reset,
    stockData: initialData, 
    cash,
    positions,
    executeTrade
  };
  
  return (
    <TimeContext.Provider value={value}>
      {children}
    </TimeContext.Provider>
  );
};

// Custom hook for using the context
export const useTimeNavigation = () => {
  const context = useContext(TimeContext);
  
  if (!context) {
    throw new Error('useTimeNavigation must be used within a TimeProvider');
  }
  
  return context;
};