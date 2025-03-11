import { getStockSymbols, getHistoricalData } from './DataService';

// Mock fetch for testing
global.fetch = jest.fn();

describe('DataService', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('should provide list of available stock symbols', () => {
    const symbols = getStockSymbols();
    expect(Array.isArray(symbols)).toBe(true);
    expect(symbols.length).toBe(5);
    expect(symbols).toContain('NVDA');
    expect(symbols).toContain('AAPL');
    expect(symbols).toContain('GOOGL');
    expect(symbols).toContain('META');
    expect(symbols).toContain('MSFT');
  });
  
  test('should load historical data for a stock', async () => {
    // Mock successful fetch response with MarketWatch data
    const mockData = [
      { date: '2025-03-07', open: 392.32, high: 394.80, low: 385.54, close: 393.31, volume: 22034090 }
    ];
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });
    
    const data = await getHistoricalData('MSFT');
    
    expect(fetch).toHaveBeenCalledWith('/data/MSFT.json');
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(1);
    
    // Test data point structure matches MarketWatch format
    const point = data[0];
    expect(point).toHaveProperty('date');
    expect(point).toHaveProperty('open');
    expect(point).toHaveProperty('high');
    expect(point).toHaveProperty('low');
    expect(point).toHaveProperty('close');
    expect(point).toHaveProperty('volume');
  });
  
  test('should throw error for invalid stock symbol', async () => {
    await expect(getHistoricalData('INVALID')).rejects.toThrow();
  });
  
  test('should throw error when fetch fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    });
    
    await expect(getHistoricalData('MSFT')).rejects.toThrow();
  });
});