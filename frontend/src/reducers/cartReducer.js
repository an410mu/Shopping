import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants.js";

export const cartReducer = (
  state = { cartItems: [], shipping: {}, payment: {} },
  action
) => {
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
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (ele) => ele.product !== action.payload
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shipping: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        payment: action.payload,
      };
    default:
      return state;
  }
};
