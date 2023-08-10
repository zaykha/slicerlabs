const initialState = {
  userUID: "",
  userName: "",
  occupation: "",
  phone: "",
  email: "",
  postalCode: "",
  blkNumber: "",
  flatNumber: "",
};

const userDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DETAILS":
      console.log(action.payload)
      const updatedState = { ...state };
      for (const key in action.payload) {
        if (key === "userDetails") {
          // If the key is userDetails, merge the nested object with the state's userDetails
          updatedState.userDetails = {
            ...updatedState.userDetails,
            ...action.payload.userDetails,
          };
        } else {
          updatedState[key] = action.payload[key];
        }
      }
      console.log(updatedState);
      return updatedState;
    case "UPDATE_EMAIL":
      console.log(action.payload);
      return {
        ...state,
        email: action.payload,
      };

    case "RESET_USER_DETAILS":
      return initialState; // Reset the state to the initial value

    default:
      return state;
  }
};

export default userDetailsReducer;
