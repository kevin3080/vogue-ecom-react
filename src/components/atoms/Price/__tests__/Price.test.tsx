
import { render, screen } from '@testing-library/react';
import { Price } from '../Price';

describe('Price', () => {
  test('renders price with default currency', () => {
    render(<Price amount={99.99} />);
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  test('renders price with custom currency', () => {
    render(<Price amount={99.99} currency="€" />);
    expect(screen.getByText('€99.99')).toBeInTheDocument();
  });

  test('renders with different sizes', () => {
    render(<Price amount={99.99} size="lg" />);
    const price = screen.getByText('$99.99');
    expect(price).toHaveClass('text-lg', 'font-semibold');
  });

  test('renders with strikethrough', () => {
    render(<Price amount={99.99} strikethrough />);
    const price = screen.getByText('$99.99');
    expect(price).toHaveClass('line-through');
  });

  test('formats price correctly', () => {
    render(<Price amount={99} />);
    expect(screen.getByText('$99.00')).toBeInTheDocument();
  });
});
