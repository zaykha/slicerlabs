import { combineReducers } from 'redux';
import userDetailsReducer from './userDetails';
import authenticationReducer from './Authentication';
import cartCountReducer from './cartCountReducer';
import CartItemReducer from './CartItemReducer';
const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
  authentication: authenticationReducer,
  cartCount: cartCountReducer,
  cartItems: CartItemReducer
  // Add other reducers here if needed
});

export default rootReducer;
