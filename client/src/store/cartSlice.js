import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // { id, title, price, quantity }
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload; // { id, title, price }
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalPrice += newItem.price;
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;

        state.items = state.items.filter(item => item.id !== id);
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
