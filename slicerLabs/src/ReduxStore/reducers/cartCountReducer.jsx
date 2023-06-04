const initialState = 0;

export default function cartCountReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT_CART_COUNT":
      return state + 1;

    case "DECREMENT_CART_COUNT":
      return state - 1;

    case "RESET_CART_COUNT":
      return initialState;

    case "SET_CART_COUNT":
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
}
