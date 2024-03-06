// reducer.js

import { SET_CURRENT_ITEM_INDEX } from "../actions/cartCountActions";

const initialState =  { currentItem: 0 };

const CurrentItemIndexReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ITEM_INDEX:
      return {
        ...state,
        currentItem: action.payload,
      };
    default:
      return state;
  }
};

export default CurrentItemIndexReducer;
