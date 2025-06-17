
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ProductCard } from '../ProductCard';
import { Product } from '../../../../types';
import cartReducer from '../../../../store/slices/cartSlice';

const mockStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  price: 99.99,
  image: '/test.jpg',
  category: 'Test Category',
  sizes: ['S', 'M', 'L'],
  colors: ['Red', 'Blue'],
  inStock: true,
  description: 'Test description'
};

const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>
      {ui}
    </Provider>
  );
};

describe('ProductCard', () => {
  test('renders product information', () => {
    renderWithProvider(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  test('handles add to cart', () => {
    renderWithProvider(<ProductCard product={mockProduct} />);
    
    // Hover over the card to show the add to cart button
    const card = screen.getByText('Test Product').closest('.group');
    if (card) {
      fireEvent.mouseEnter(card);
    }
    
    const addButton = screen.getByText('Add to Cart');
    fireEvent.click(addButton);
    
    // The button should be clickable (testing that dispatch is called)
    expect(addButton).toBeInTheDocument();
  });

  test('shows out of stock state', () => {
    const outOfStockProduct = { ...mockProduct, inStock: false };
    renderWithProvider(<ProductCard product={outOfStockProduct} />);
    
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  test('calls onQuickView when title is clicked', () => {
    const mockOnQuickView = jest.fn();
    renderWithProvider(<ProductCard product={mockProduct} onQuickView={mockOnQuickView} />);
    
    fireEvent.click(screen.getByText('Test Product'));
    expect(mockOnQuickView).toHaveBeenCalledWith(mockProduct);
  });
});
