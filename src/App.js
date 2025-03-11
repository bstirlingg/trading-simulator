import React from 'react';
import './App.css';
import StockDataViewer from './components/StockDataViewer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Trading Simulation Game</h1>
        <p>TDD Project Setup with MarketWatch Data</p>
      </header>
      <main>
        <StockDataViewer />
      </main>
    </div>
  );
}

export default App;