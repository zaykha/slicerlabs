import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['cart/addModel'], // Add the action type of your addModel reducer
      ignoredPaths: ['cartItems.cartItems.0.model'], // Add the path to the model field
    },
  })
});

export default store;
