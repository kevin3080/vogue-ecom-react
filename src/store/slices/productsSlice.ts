
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';

interface ProductsState {
  items: Product[];
  loading: boolean;
  selectedCategory: string;
  searchQuery: string;
}

const initialState: ProductsState = {
  items: [
    {
      id: '1',
      name: 'Classic White Shirt',
      price: 79.99,
      image: '/placeholder.svg',
      category: 'shirts',
      description: 'Elegant white cotton shirt perfect for any occasion',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['White', 'Blue', 'Black'],
      inStock: true
    },
    {
      id: '2',
      name: 'Slim Fit Jeans',
      price: 119.99,
      image: '/placeholder.svg',
      category: 'jeans',
      description: 'Premium denim jeans with perfect fit',
      sizes: ['28', '30', '32', '34', '36'],
      colors: ['Blue', 'Black', 'Gray'],
      inStock: true
    },
    {
      id: '3',
      name: 'Summer Dress',
      price: 89.99,
      image: '/placeholder.svg',
      category: 'dresses',
      description: 'Light and comfortable summer dress',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Floral', 'Red', 'Navy'],
      inStock: true
    },
    {
      id: '4',
      name: 'Leather Jacket',
      price: 299.99,
      image: '/placeholder.svg',
      category: 'jackets',
      description: 'Premium leather jacket for style and comfort',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Brown'],
      inStock: true
    }
  ],
  loading: false,
  selectedCategory: 'all',
  searchQuery: ''
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    }
  }
});

export const { setProducts, setLoading, setSelectedCategory, setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;
