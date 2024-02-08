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
     
    const userDetailsToUpload = action.payload;
    console.log(userDetailsToUpload, action.payload)
    // Create a new object to hold the updated state
    const newState = { ...state };

    // Loop through userDetailsToUpload and update the newState object
    for (const key in userDetailsToUpload) {
      newState[key] = userDetailsToUpload[key];
    }

    return newState;
      // return updatedState;
    case "UPDATE_EMAIL":
      // console.log(action.payload);
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
