// reducer.js
import { SET_AUTHENTICATION_STATUS } from "../actions/Authentication"

const initialState = {
  isAuthenticated: false,
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATION_STATUS:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    default:
      return state;
  }
};

export default authenticationReducer;
