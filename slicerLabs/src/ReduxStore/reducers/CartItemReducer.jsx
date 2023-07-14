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
    addModel(state, action) {
      const { id, model } = action.payload; 
      const deserializedModel = JSON.parse(model);
      state.cartItems.push({
        id,
        model: deserializedModel
      });
      state.tempModelId = id;
    },
    addMaterialOptions(state, action) {
      const { checkID, options } = action.payload;
    
      const updatedCartItems = state.cartItems.map(item => {
        if (item.id === checkID) {
          console.log("found", options, checkID, item.id)
          return {
            ...item,
            options: options
          };
        }
        console.log("not found")
        return item;
      });
      console.log(updatedCartItems)
      state.cartItems = updatedCartItems;
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
    updateModel(state, action){
      const { ProductId, newModel } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.ProductId === ProductId
      );
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].model = newModel;
      }
    }
    // other reducers...
  },
});

export const {
  addModelToTempState,
  addModel,
  addMaterialOptions,
  increaseQuantity,
  decreaseQuantity,
  updateMaterial,
  updateColor,
  updateDimensions,
  updateModel
} = cartSlice.actions;
export default cartSlice.reducer;
