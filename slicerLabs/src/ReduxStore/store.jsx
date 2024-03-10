import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [
          "cart/updateQuantity",
          "cart/updatePrice",
          "cart/updateColor",
          "cart/updatePrice",
          "cart/updateMaterial",
          "cart/addModel"
        ], // Add the action type of your addModel reducer
        ignoredPaths: ["payload.model", "cartItems.cartItems.0.model"], // Add the path to the model field
        ignoredActionPaths: [
          "cart/addMaterialOptions.cartItems.cartItems.*.model",
        ],
      },
    }),
});

export default store;
