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
      state.cartItems.push(options);
      state.tempModelId = null; // Reset the tempModelId
    },
    increaseQuantity(state, action) {
      const { ProductId } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.ProductId === ProductId
      );
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity++;
      }
    },
    decreaseQuantity(state, action) {
      const { ProductId } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.ProductId === ProductId
      );
      if (itemIndex !== -1 && state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity--;
      }
    },
    updateMaterial(state, action) {
      const { ProductId, newMaterial } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.ProductId === ProductId
      );
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].material = newMaterial;
      }
    },
    updateColor(state, action) {
      const { ProductId, newColor } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.ProductId === ProductId
      );
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].color = newColor;
      }
    },
    updateDimensions(state, action) {
      const { ProductId, width, height, depth } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.ProductId === ProductId
      );
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].width = width;
        state.cartItems[itemIndex].height = height;
        state.cartItems[itemIndex].depth = depth;
      }
    },
    // other reducers...
  },
});

export const {
  addModelToTempState,
  addMaterialOptions,
  increaseQuantity,
  decreaseQuantity,
  updateMaterial,
  updateColor,
  updateDimensions,
} = cartSlice.actions;
export default cartSlice.reducer;
