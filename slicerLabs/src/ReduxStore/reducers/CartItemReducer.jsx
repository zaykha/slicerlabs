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
    addModelToCart: {
      reducer(state, action) {
        const { modelIdfromDropZone } = action.payload;
        const newItem = {
          id: modelIdfromDropZone,
          materialOptions: null,
        };
        state.cartItems.push(newItem);
      },
      prepare(modelIdfromDropZone) {
        return {
          payload: {
            modelIdfromDropZone,
          },
        };
      },
    },
    addMaterialOptions(state, action) {
      const { modelId, options } = action.payload;
      const updatedCartItems = state.cartItems.map((item) => {
        if (item.id === modelId) {
          return {
            ...item,
            materialOptions: options,
          };
        }
        return item;
      });
      state.cartItems = updatedCartItems;
      state.tempModelId = null; // Reset the tempModelId
    },
    // other reducers...
  },
});

export const { addModelToTempState, addModelToCart, addMaterialOptions } = cartSlice.actions;
export default cartSlice.reducer;
