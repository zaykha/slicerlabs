import { combineReducers } from 'redux';
import userDetailsReducer from './userDetails';
import authenticationReducer from './Authentication';
import cartCountReducer from './cartCountReducer';
import CartItemReducer from './CartItemReducer';
import AddressReducer from './MapServicesReducer';
const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
  authentication: authenticationReducer,
  cartCount: cartCountReducer,
  cartItems: CartItemReducer,
  LocationStorage: AddressReducer
  // Add other reducers here if needed
});

export default rootReducer;
