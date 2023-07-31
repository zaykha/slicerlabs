// actionTypes.js
export const SET_AUTHENTICATION_STATUS = "SET_AUTHENTICATION_STATUS";
export const SET_SUCCESSPAYMENT_STATUS = "SET_SUCCESSPAYMENT_STATUS";

export const setAuthenticationStatus = (isAuthenticated) => ({
  type: SET_AUTHENTICATION_STATUS,
  payload: isAuthenticated,
});

export const setSuccessPaymentState = (isSuccessPaymentDone)=>({
  type: SET_SUCCESSPAYMENT_STATUS,
  payload: isSuccessPaymentDone,
});