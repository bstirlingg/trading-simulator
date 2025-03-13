import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TimeNavigation from './TimeNavigation';
import { TimeProvider } from '../context/TimeContext';

describe('TimeNavigation', () => {
  const mockData = [
    { date: '2023-01-01', close: 100 },
    { date: '2023-01-02', close: 105 },
    { date: '2023-01-03', close: 103 },
  ];

  test('should render navigation controls', () => {
    render(
      <TimeProvider initialData={mockData}>
        <TimeNavigation />
      </TimeProvider>
    );
    
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
    expect(screen.getByTestId('current-date')).toHaveTextContent('2023-01-01');
  });

  test('should navigate through data points', () => {
    render(
      <TimeProvider initialData={mockData}>
        <TimeNavigation />
      </TimeProvider>
    );
    
    // Test next button
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByTestId('current-date')).toHaveTextContent('2023-01-02');
    
    // Test previous button
    fireEvent.click(screen.getByText('Previous'));
    expect(screen.getByTestId('current-date')).toHaveTextContent('2023-01-01');
    
    // Test reset button
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByTestId('current-date')).toHaveTextContent('2023-01-01');
  });
});