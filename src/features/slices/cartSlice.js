import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, image, quantity = 1 } = action.payload;
      const item = state.find(i => i.id === id);
      if (item) {
        item.quantity += quantity;
      } else {
        state.push({ id, name, price, image, quantity });
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