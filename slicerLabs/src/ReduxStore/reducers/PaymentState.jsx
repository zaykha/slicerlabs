// reducer.js
import { SET_SUCCESSPAYMENT_STATUS } from "../actions/Authentication"

const initialState = {
    isSuccessPaymentDone: false,
};

const paymentStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUCCESSPAYMENT_STATUS:
      return {
        ...state,
        isSuccessPaymentDone: action.payload,
      };
    default:
      return state;
  }
};

export default paymentStateReducer;
