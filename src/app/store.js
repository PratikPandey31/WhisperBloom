import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/slices/productSlice';
import cartReducer from '../features/slices/cartSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
}); 