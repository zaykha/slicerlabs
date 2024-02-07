// Define the initial state
const initialState = {
    isAdding: false,
  };
  
  // Reducer function
  const addingMoreModelsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADDING_MORE_MODELS':
        return {
          ...state,
          isAdding: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default addingMoreModelsReducer;
  