
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, OrderSummary } from '../../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  orderSummary: OrderSummary;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  orderSummary: {
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0
  }
};

const calculateOrderSummary = (items: CartItem[], shippingCost: number = 10, taxRate: number = 0.08): OrderSummary => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = items.length > 0 ? shippingCost : 0;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  return { subtotal, shipping, tax, total };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'id' | 'quantity'>>) => {
      const existingItem = state.items.find(
        item => item.productId === action.payload.productId && 
                item.size === action.payload.size && 
                item.color === action.payload.color
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const newItem: CartItem = {
          ...action.payload,
          id: `${action.payload.productId}-${action.payload.size}-${action.payload.color}`,
          quantity: 1
        };
        state.items.push(newItem);
      }

      state.orderSummary = calculateOrderSummary(state.items);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.orderSummary = calculateOrderSummary(state.items);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity);
        if (item.quantity === 0) {
          state.items = state.items.filter(i => i.id !== action.payload.id);
        }
      }
      state.orderSummary = calculateOrderSummary(state.items);
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    clearCart: (state) => {
      state.items = [];
      state.orderSummary = calculateOrderSummary([]);
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, toggleCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
