import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['cart/addModel'], // Add the action type of your addModel reducer
      ignoredPaths: ['cartItems.cartItems.*.model'], // Add the path to the model field
      ignoredActionPaths: ['cart/addMaterialOptions.cartItems.cartItems.*.model'],
    },
  })
});

export default store;
