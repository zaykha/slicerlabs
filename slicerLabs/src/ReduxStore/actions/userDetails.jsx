export const setUserDetails = (userDetails) => ({
    type: 'SET_USER_DETAILS',
    payload: userDetails,
  });
  
  export const resetUserDetails = () => ({
    type: 'RESET_USER_DETAILS',
  });