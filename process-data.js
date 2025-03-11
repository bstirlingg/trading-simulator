const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Stock symbols matching CSV files
const symbols = ['AAPL', 'GOOGL', 'META', 'MSFT', 'NVDA'];
const inputDir = path.join(__dirname, 'public/data');
const outputDir = path.join(__dirname, 'public/data');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

symbols.forEach(symbol => {
  const results = [];
  
  const csvFilePath = path.join(inputDir, `${symbol}.csv`);
  
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => {
      // Date in MM/DD/YYYY format with quotes and commas in numeric values
      try {
        const row = {
          // Parse MM/DD/YYYY to standard YYYY-MM-DD
          date: formatDate(data.Date),
          
          // Remove quotes and commas from numeric values
          open: parseFloat(data.Open.replace(/[",]/g, '')),
          high: parseFloat(data.High.replace(/[",]/g, '')),
          low: parseFloat(data.Low.replace(/[",]/g, '')),
          close: parseFloat(data.Close.replace(/[",]/g, '')),
          volume: parseInt(data.Volume.replace(/[",]/g, ''))
        };
        
        // Only add rows with valid data
        if (!isNaN(row.open) && !isNaN(row.high) && 
            !isNaN(row.low) && !isNaN(row.close) && 
            !isNaN(row.volume)) {
          results.push(row);
        }
      } catch (error) {
        console.error(`Error processing row for ${symbol}:`, error, data);
      }
    })
    .on('end', () => {

      results.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      // Reverse to get oldest first for the app
      const sortedResults = [...results].reverse();
      
      // Write to JSON file
      fs.writeFileSync(
        path.join(outputDir, `${symbol}.json`),
        JSON.stringify(sortedResults, null, 2)
      );
      console.log(`Processed ${symbol}: ${results.length} data points`);
    });
});

// Function to convert MM/DD/YYYY to YYYY-MM-DD
function formatDate(dateString) {
  const [month, day, year] = dateString.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}