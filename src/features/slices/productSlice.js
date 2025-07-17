import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => action.payload,
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer; 