import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity || 1;
      } else {
        state.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
    },
    removeFromCart: (state, action) => state.filter(i => i.id !== action.payload),
    updateQuantity: (state, action) => {
      const item = state.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: () => [],
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 