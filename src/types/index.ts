
// Domain types following SOLID principles
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface AppConfig {
  currency: string;
  language: string;
  shippingCost: number;
  taxRate: number;
}
