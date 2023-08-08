export const setUserDetails = (userDetails) => ({
  type: "SET_USER_DETAILS",
  payload: userDetails,
});

export const updateUserEmail = (newEmail) => ({
  type: "UPDATE_EMAIL",
  payload: {
    email: newEmail,
  },
});

export const resetUserDetails = () => ({
  type: "RESET_USER_DETAILS",
});
