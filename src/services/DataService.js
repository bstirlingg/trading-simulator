import { validateStockData } from '../models/StockData';

const AVAILABLE_SYMBOLS = ['NVDA', 'AAPL', 'GOOGL', 'META', 'MSFT'];

export function getStockSymbols() {
    
  return [...AVAILABLE_SYMBOLS];
}

export async function getHistoricalData(symbol) {
  if (!AVAILABLE_SYMBOLS.includes(symbol)) {
    throw new Error(`Invalid stock symbol: ${symbol}`);
  }
  
  try {

    const response = await fetch(`${process.env.PUBLIC_URL}/data/${symbol}.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to load data for ${symbol}: ${response.status}`);
    }
    
    const data = await response.json();
    validateStockData(data);
    return data;
  } catch (error) {
    throw new Error(`Error loading data for ${symbol}: ${error.message}`);
  }
}