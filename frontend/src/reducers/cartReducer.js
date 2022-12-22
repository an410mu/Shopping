import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants.js";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (ele) => ele.product === item.product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((ele) =>
            ele.product === existItem.product ? item : ele
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    default:
      return state;
  }
};
