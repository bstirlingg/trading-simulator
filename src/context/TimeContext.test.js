import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TimeProvider, useTimeNavigation } from './TimeContext';

// Test component that uses the context
const TestComponent = () => {
  const { currentIndex, currentData, next, previous, reset } = useTimeNavigation();
  
  return (
    <div>
      <div data-testid="current-index">{currentIndex}</div>
      <div data-testid="current-date">{currentData ? currentData.date : 'no data'}</div>
      <button onClick={next}>Next</button>
      <button onClick={previous}>Previous</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

describe('TimeContext', () => {
  const mockData = [
    { date: '2023-01-01', close: 100 },
    { date: '2023-01-02', close: 105 },
    { date: '2023-01-03', close: 103 },
  ];

  test('should provide time navigation functions to components', () => {
    render(
      <TimeProvider initialData={mockData}>
        <TestComponent />
      </TimeProvider>
    );
    
    // Initial state
    expect(screen.getByTestId('current-index')).toHaveTextContent('0');
    expect(screen.getByTestId('current-date')).toHaveTextContent('2023-01-01');
    
    // Test next
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByTestId('current-index')).toHaveTextContent('1');
    expect(screen.getByTestId('current-date')).toHaveTextContent('2023-01-02');
    
    // Test previous
    fireEvent.click(screen.getByText('Previous'));
    expect(screen.getByTestId('current-index')).toHaveTextContent('0');
    expect(screen.getByTestId('current-date')).toHaveTextContent('2023-01-01');
    
    // Test reset after navigation
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByTestId('current-index')).toHaveTextContent('0');
  });
});