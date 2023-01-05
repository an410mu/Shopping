import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productOneReducer,
} from "./reducers/productReducer.js";
import { cartReducer } from "./reducers/cartReducer.js";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
} from "./reducers/orderReducer.js";
import {
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/userReducer.js";

const reducer = combineReducers({
  productList: productListReducer,
  productOne: productOneReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
});

const carItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingFromStorage = localStorage.getItem("shipping")
  ? JSON.parse(localStorage.getItem("shipping"))
  : {};

const paymentFromStorage = localStorage.getItem("payment")
  ? JSON.parse(localStorage.getItem("payment"))
  : {};

const initialState = {
  //shipping is part of cart, need to modify the props for cart reducer
  cart: {
    cartItems: carItemsFromStorage,
    shipping: shippingFromStorage,
    payment: paymentFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

//const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
