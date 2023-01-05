import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_ONE_FAIL,
  PRODUCT_ONE_REQUEST,
  PRODUCT_ONE_SUCCESS,
  PRODUCT_CREATE_REV_FAIL,
  PRODUCT_CREATE_REV_REQUEST,
  PRODUCT_CREATE_REV_SUCCESS,
} from "../constants/productConstants.js";
import axios from "axios";

//originally in HomePage, we fetch with useState and update state in Homepage
//now with redux, we are going to dispach the action in reducer, then update with the action payload

//redux thunk we can pass a function within a function
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("/products");

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const oneProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ONE_REQUEST });
    const { data } = await axios.get(`/products/${id}`);

    dispatch({ type: PRODUCT_ONE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_ONE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REV_REQUEST });

      const { userLogin } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userLogin.userInfo.token}`,
        },
      };

      await axios.post(`/products/${productId}/reviews`, review, config);

      dispatch({ type: PRODUCT_CREATE_REV_SUCCESS });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REV_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
