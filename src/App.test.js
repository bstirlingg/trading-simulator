import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import App from './App';

jest.mock('./services/DataService', () => ({
  getHistoricalData: jest.fn().mockResolvedValue([
    { date: '2023-01-01', close: 100 },
    { date: '2023-01-02', close: 105 }
  ])
}));

test('renders trading simulator title', async () => {
  await act(async () => {
    render(<App />);
  });
  
  await waitFor(() => {
    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
  });
  
  const titleElement = screen.getByText(/Trading Simulation Game/i);
  expect(titleElement).toBeInTheDocument();
});