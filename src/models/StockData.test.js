import { StockDataModel, validateStockData } from './StockData';

describe('StockDataModel', () => {
  // Tests that model correctly stores all properties when given valid data
  test('should create a valid stock data point', () => {
    const dataPoint = new StockDataModel({
      date: '2025-03-07',  
      open: 392.32,
      high: 394.80,
      low: 385.54,
      close: 393.31,
      volume: 22034090
    });
    
    expect(dataPoint.date).toBe('2025-03-07');
    expect(dataPoint.open).toBe(392.32);
    expect(dataPoint.high).toBe(394.80);
    expect(dataPoint.low).toBe(385.54);
    expect(dataPoint.close).toBe(393.31);
    expect(dataPoint.volume).toBe(22034090);
  });

  // Tests that model throws error when numeric field contains string value
  test('should throw error when creating with invalid data', () => {
    expect(() => {
      new StockDataModel({
        date: '2025-03-07',
        open: 'invalid', 
        high: 394.80,
        low: 385.54,
        close: 393.31,
        volume: 22034090
      });
    }).toThrow();
  });
});

describe('validateStockData', () => {
  // Tests that validation passes for array with valid data points
  test('should validate correct stock data array', () => {
    const data = [
      { date: '2025-03-07', open: 392.32, high: 394.80, low: 385.54, close: 393.31, volume: 22034090 },
      { date: '2025-03-06', open: 394.28, high: 402.15, low: 392.68, close: 393.97, volume: 22775825 }
    ];
    
    expect(validateStockData(data)).toBe(true);
  });
  
  // Tests that validation throws error if any data point in array is invalid
  test('should reject invalid stock data array', () => {
    const data = [
      { date: '2025-03-07', open: 392.32, high: 394.80, low: 385.54, close: 393.31, volume: 22034090 },
      { date: '2025-03-06', open: 394.28, high: 'invalid', low: 392.68, close: 393.97, volume: 22775825 }
    ];
    
    expect(() => validateStockData(data)).toThrow();
  });
});