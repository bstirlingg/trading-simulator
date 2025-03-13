import React, { createContext, useContext, useState, useEffect } from 'react';
import { TimeController } from '../services/TimeController';

const TimeContext = createContext();

export const TimeProvider = ({ children, initialData = [] }) => {

  const [controller] = useState(() => new TimeController(initialData));
  
  const [currentIndex, setCurrentIndex] = useState(controller.getCurrentIndex());
  const [currentData, setCurrentData] = useState(controller.getCurrentData());
  
  useEffect(() => {
    const unsubscribe = controller.subscribe(state => {
      setCurrentIndex(state.currentIndex);
      setCurrentData(state.currentData);
    });
    
    return unsubscribe;
  }, [controller]);
  
  const next = () => controller.next();
  const previous = () => controller.previous();
  const reset = () => controller.reset();

  const value = {
    currentIndex,
    currentData,
    next,
    previous, 
    reset
  };
  
  return (
    <TimeContext.Provider value={value}>
      {children}
    </TimeContext.Provider>
  );
};


export const useTimeNavigation = () => {
  const context = useContext(TimeContext);
  
  if (!context) {
    throw new Error('useTimeNavigation must be used within a TimeProvider');
  }
  
  return context;
};