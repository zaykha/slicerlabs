import { createSlice } from '@reduxjs/toolkit';
import cloneDeep from 'lodash/cloneDeep';
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
      const { id, fileName, model, dimensions, options, pricePerUnit } = action.payload; 
      // const clonedModel = cloneDeep(model);
      state.cartItems.push({
        id,
        fileName,
        model,
        dimensions,
        options,
        pricePerUnit
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
        (item) => item.id === ProductId
      );
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].options.quantity++;
      }
      console.log(ProductId, itemIndex, state.cartItems)
    },
    decreaseQuantity(state, action) {
      const { ProductId } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === ProductId
      );
      if (itemIndex !== -1 && state.cartItems[itemIndex].options.quantity > 1) {
        state.cartItems[itemIndex].options.quantity--;
      }
    },
    updateMaterial(state, action) {
      const { ProductId, newMaterial } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === ProductId
      );
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].options.material = newMaterial;
      }
    },
    updateColor(state, action) {
      const { ProductId, newColor } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === ProductId
      );
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].options.color = newColor;
      }
    },
    updateDimensions(state, action) {
      const { ProductId, width, height, depth } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === ProductId
      );
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].options.dimensions.width = width;
        state.cartItems[itemIndex].options.dimensions.height = height;
        state.cartItems[itemIndex].options.dimensions.depth = depth;
      }
    },
    updatePrice(state, action) {
      const { ProductId, newPrice } = action.payload;
      console.log(ProductId, newPrice)
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === ProductId
      );
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].pricePerUnit = newPrice;
      }
    },
    updateModel(state, action){
      const { ProductId, newModel } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === ProductId
      );
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].model = newModel;
      }
    },
    deleteModel(state, action) {
      const modelIdToDelete = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== modelIdToDelete);
      // if (state.tempModelId === modelIdToDelete) {
      //   state.tempModelId = null;
      // } 
    },
    resetCartState(state) {
      return initialState; // Reset the state to the initial value
    },
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
  updatePrice,
  updateModel,
  deleteModel,
  resetCartState
} = cartSlice.actions;
export default cartSlice.reducer;
