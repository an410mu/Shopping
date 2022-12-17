import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_ONE_FAIL,
  PRODUCT_ONE_REQUEST,
  PRODUCT_ONE_SUCCESS,
} from "../constants/productConstants.js";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, prdocuts: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productOneReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_ONE_REQUEST:
      return { loading: true, prdocut: {} };
    case PRODUCT_ONE_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_ONE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
