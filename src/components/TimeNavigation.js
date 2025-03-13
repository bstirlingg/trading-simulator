import React from 'react';
import { useTimeNavigation } from '../context/TimeContext';

const TimeNavigation = () => {
  const { currentData, next, previous, reset } = useTimeNavigation();
  
  return (
    <div className="time-navigation">
      <div className="time-display">
        <span>Current Date: </span>
        <span data-testid="current-date">
          {currentData ? currentData.date : 'No data'}
        </span>
      </div>
      
      <div className="navigation-controls">
        <button onClick={previous}>Previous</button>
        <button onClick={next}>Next</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default TimeNavigation;