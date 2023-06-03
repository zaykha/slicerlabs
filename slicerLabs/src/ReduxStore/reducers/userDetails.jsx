const initialState = {
    userName: '',
    occupation: '',
    phone: '',
    email: '',
    postalCode: '',
    blkNumber: '',
    flatNumber: '',
  };
  
  const userDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_DETAILS':
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userDetailsReducer;
  