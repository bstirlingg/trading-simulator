import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StockDataViewer from './StockDataViewer';
import * as DataService from '../services/DataService';
import { act } from 'react-dom/test-utils';

// Mock the DataService
jest.mock('../services/DataService');

describe('StockDataViewer', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock getStockSymbols
    DataService.getStockSymbols.mockReturnValue(['AAPL', 'NVDA', 'GOOGL', 'META', 'MSFT']);
    
    // Mock getHistoricalData with data that matches what the test expects
    DataService.getHistoricalData.mockResolvedValue([
      { date: '2025-03-07', open: 392.32, high: 394.80, low: 385.54, close: 393.31, volume: 22034090 },
      { date: '2025-03-06', open: 394.28, high: 402.15, low: 392.68, close: 393.97, volume: 22775825 }
    ]);
  });
  
  test('should render stock selector', () => {
    render(<StockDataViewer />);
    
    expect(screen.getByText(/Select a stock/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
  
  test('should load and display data when stock is selected', async () => {
    render(<StockDataViewer />);
    
    // Select a stock
    await act(async () => {
      const select = screen.getByRole('combobox');
      userEvent.selectOptions(select, 'MSFT');
    });
    
    // Wait for all UI updates to complete after data is loaded
    await waitFor(() => {
      expect(DataService.getHistoricalData).toHaveBeenCalledWith('MSFT');
      expect(screen.getByText('2025-03-07')).toBeInTheDocument();
      expect(screen.getByText('393.31')).toBeInTheDocument(); // Close price
    }, { timeout: 3000 });
  });
});