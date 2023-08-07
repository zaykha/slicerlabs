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
      const updatedState = { ...state };
      const payloadKeys = Object.keys(action.payload);
      console.log(action.payload);
      payloadKeys.forEach((key) => {
        if (state.hasOwnProperty(key)) {
          updatedState[key] = action.payload[key];
        } 
        // else {
        //   // If key does not exist in current state, add it to the updatedState
        //   updatedState[key] = action.payload[key];
        // }
      });

      return updatedState;

    case "RESET_USER_DETAILS":
      return initialState; // Reset the state to the initial value

    default:
      return state;
  }
};

export default userDetailsReducer;
