// actionTypes.js
export const SET_AUTHENTICATION_STATUS = "SET_AUTHENTICATION_STATUS";

export const setAuthenticationStatus = (isAuthenticated) => ({
  type: SET_AUTHENTICATION_STATUS,
  payload: isAuthenticated,
});

