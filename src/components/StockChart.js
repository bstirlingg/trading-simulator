import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTimeNavigation } from '../context/TimeContext';

const StockChart = () => {
  const { currentData, currentIndex, stockData } = useTimeNavigation();
  
  // Display last 30 data points or less if not enough data
  const dataToDisplay = () => {
    const startIndex = Math.max(0, currentIndex - 29);
    return stockData.slice(startIndex, currentIndex + 1);
  };
  
  // Format date for display
  const formatXAxis = (date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="stock-chart" style={{ width: '100%', height: '400px' }}>
      <h3>Price Chart</h3>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          data={dataToDisplay()}
          margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatXAxis}
            label={{ value: 'Date', position: 'insideBottomRight', offset: -10 }}
          />
          <YAxis 
            domain={['auto', 'auto']}
            label={{ value: 'Price ($)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            formatter={(value) => [`$${value}`, 'Close']}
            labelFormatter={(date) => `Date: ${new Date(date).toLocaleDateString()}`}
          />
          <Line 
            type="monotone" 
            dataKey="close" 
            stroke="#8884d8" 
            dot={false} 
            activeDot={{ r: 8 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;