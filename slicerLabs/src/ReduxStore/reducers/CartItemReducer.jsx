import { createSlice } from '@reduxjs/toolkit';

// Redux store
const initialState = {
  cartItems: [],
  tempModelId: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addModelToTempState(state, action) {
      state.tempModelId = action.payload;
    },
    addMaterialOptions(state, action) {
      const { options } = action.payload;
      state.cartItems.push( options);
      state.tempModelId = null; // Reset the tempModelId
    },
    increaseQuantity(state, action) {
      const { ProductId } = action.payload;
      const item = state.cartItems.find(item => item.ProductId === ProductId);
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity(state, action) {
      const { ProductId } = action.payload;
      const item = state.cartItems.find(item => item.ProductId === ProductId);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
    
    // other reducers...
  },
});

export const { addModelToTempState, addMaterialOptions } = cartSlice.actions;
export default cartSlice.reducer;
