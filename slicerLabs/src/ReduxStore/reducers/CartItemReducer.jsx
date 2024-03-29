import { createSlice } from "@reduxjs/toolkit";
import cloneDeep from "lodash/cloneDeep";
// Redux store
const initialState = {
  cartItems: [],
  tempModelId: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addModelToTempState(state, action) {
      state.tempModelId = action.payload;
    },
    addModel(state, action) {
      const { id, fileName, model, dimensions, options, pricePerUnit } =
        action.payload;
      // const clonedModel = cloneDeep(model);
      // state.cartItems.push({
      //   id,
      //   fileName,
      //   model,
      //   dimensions,
      //   options,
      //   pricePerUnit
      // });
      // state.tempModelId = id;
      const newCartItem = {
        id,
        fileName,
        model, // Keep this field as is
        dimensions,
        options,
        pricePerUnit,
      };
      return {
        ...state,
        cartItems: [...state.cartItems, newCartItem],
      };
    },
    addMaterialOptions(state, action) {
      const { checkID, options } = action.payload;

      const updatedCartItems = state.cartItems.map((item) => {
        if (item.id === checkID) {
          console.log("found", options, checkID, item.id);
          return {
            ...item,
            options: options,
          };
        }
        console.log("not found");
        return item;
      });
      // console.log(updatedCartItems)
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
      // console.log(ProductId, itemIndex, state.cartItems)
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
    updateQuantity(state, action) {
      const { ProductId, newQuantity } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === ProductId
      );
      if (itemIndex !== -1 && newQuantity > 0) {
        state.cartItems[itemIndex].options.quantity = newQuantity;
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
      // console.log(ProductId, newPrice)
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === ProductId
      );
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].pricePerUnit = newPrice;
      }
    },
    updateModel(state, action) {
      const { ProductId, newModel } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === ProductId
      );
      // if (itemIndex !== -1) {
      //   state.cartItems[itemIndex].model = newModel;
      // }
      if (itemIndex !== -1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[itemIndex] = {
          ...updatedCartItems[itemIndex],
          model: newModel,
        };
        return {
          ...state,
          cartItems: updatedCartItems,
        };
      }
      return state;
    },
    updateCartItem(state, action) {
      const { updatedCartItems } = action.payload;
      state.cartItems = updatedCartItems;
    },
    deleteModel(state, action) {
      const modelIdToDelete = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== modelIdToDelete
      );
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
  updateQuantity,
  updateMaterial,
  updateColor,
  updateDimensions,
  updatePrice,
  updateModel,
  updateCartItem,
  deleteModel,
  resetCartState,
} = cartSlice.actions;
export default cartSlice.reducer;
