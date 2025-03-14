import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { useTimeNavigation } from '../context/TimeContext';

const StockChart = () => {
  const { currentData, currentIndex, stockData } = useTimeNavigation();

  // Display last 30 data points or fewer if not enough data
  const dataToDisplay = () => {
    const startIndex = Math.max(0, currentIndex - 29);
    return stockData.slice(startIndex, currentIndex + 1);
  };

  // Format date for display
  const formatXAxis = (date) => 
    new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="stock-chart" style={{ width: '100%', height: '400px' }}>
      <h3>Price Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart 
          data={dataToDisplay()} 
          margin={{ top: 10, right: 20, left: 10, bottom: 25 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatXAxis} 
            tick={{ fontSize: 12 }} 
            tickMargin={10} 
          />
          <YAxis 
            domain={['auto', 'auto']} 
            tick={{ fontSize: 12 }} 
            tickFormatter={(value) => `$${value}`} 
            width={60} 
          />
          <Tooltip 
            formatter={(value) => [`$${value.toFixed(2)}`, 'Price']} 
            labelFormatter={(date) => `Date: ${new Date(date).toLocaleDateString()}`} 
          />
          <Line 
            type="monotone" 
            dataKey="close" 
            stroke="#4a6fff" 
            strokeWidth={1.5} 
            dot={false} 
            activeDot={{ r: 6, strokeWidth: 1 }} 
            isAnimationActive={false} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
