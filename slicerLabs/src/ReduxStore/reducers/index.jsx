import { combineReducers } from 'redux';
import userDetailsReducer from './userDetails';
import authenticationReducer from './Authentication';
const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
  authentication: authenticationReducer,
  // Add other reducers here if needed
});

export default rootReducer;
