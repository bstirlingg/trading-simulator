export class StockDataModel {
    constructor(data) {
      // Validate input
      if (typeof data.date !== 'string') throw new Error('date must be a string');
      if (typeof data.open !== 'number') throw new Error('open must be a number');
      if (typeof data.high !== 'number') throw new Error('high must be a number');
      if (typeof data.low !== 'number') throw new Error('low must be a number');
      if (typeof data.close !== 'number') throw new Error('close must be a number');
      if (typeof data.volume !== 'number') throw new Error('volume must be a number');
      
      // Assign properties
      this.date = data.date;
      this.open = data.open;
      this.high = data.high;
      this.low = data.low;
      this.close = data.close;
      this.volume = data.volume;
    }
  }
  
  /**
   * Validates an array of stock data
   * @param {Array} dataArray Array of stock data objects
   * @returns {boolean} True if valid, throws error if invalid
   */
  
  export function validateStockData(dataArray) {
    if (!Array.isArray(dataArray)) {
      throw new Error('Data must be an array');
    }
    
    for (const item of dataArray) {
      try {
  
        new StockDataModel(item);
      } catch (error) {
        throw new Error(`Invalid data point: ${error.message}`);
      }
    }
    
    return true;
  }