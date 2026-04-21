import { render, screen } from '@testing-library/react';
import { App } from './app/App';

test('renders home page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /CoffeeWithAI/i })).toBeInTheDocument();
});
