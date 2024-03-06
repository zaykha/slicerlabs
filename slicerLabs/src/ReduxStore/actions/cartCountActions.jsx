export const INCREMENT_CART_COUNT = "INCREMENT_CART_COUNT";
export const DECREMENT_CART_COUNT = "DECREMENT_CART_COUNT";
export const RESET_CART_COUNT = "RESET_CART_COUNT";
export const SET_CURRENT_ITEM_INDEX ="SET_CURRENT_ITEM_INDEX"

export function incrementCartCount() {
  return { type: INCREMENT_CART_COUNT };
}

export function decrementCartCount() {
  return { type: DECREMENT_CART_COUNT };
}

export function resetCartCount() {
  return { type: RESET_CART_COUNT };
}
export const setCartCount = (count) => {
  return {
    type: "SET_CART_COUNT",
    payload: count,
  };
};
export const setCurrentItemIndex = (count) => {
  return {
    type: "SET_CURRENT_ITEM_INDEX",
    payload: count,
  };
};