import { combineReducers } from 'redux';
import userDetailsReducer from './userDetails';
import authenticationReducer from './Authentication';
import cartCountReducer from './cartCountReducer';
import CartItemReducer from './CartItemReducer';
import PaymentStateReducer from './PaymentState';
import AddressReducer from './MapServicesReducer';
import addingMoreModelsReducer from './addingModelReduxer';
const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
  authentication: authenticationReducer,
  cartCount: cartCountReducer,
  cartItems: CartItemReducer,
  LocationStorage: AddressReducer,
  paymentState: PaymentStateReducer,
  addingMoreModel: addingMoreModelsReducer
  // Add other reducers here if needed
});

export default rootReducer;
