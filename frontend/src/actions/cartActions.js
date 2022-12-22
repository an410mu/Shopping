import axios from "axios";
import { CAR_ADD_ITEM, CART_REMOVE_ITEM } from "./constants/cartConstants.js";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  //getState will provide entire state tree

  const { data } = await axios.get(`/products/${id}`);

  dispach({
    type: CAR_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  //need to use JSON.stringify for local storage, need to parse back to get data
};
