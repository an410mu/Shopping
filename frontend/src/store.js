import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productOneReducer,
} from "./reducers/productReducer.js";
import { cartReducer } from "./reducers/cartReducer.js";
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
});

const carItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: { cartItems: carItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

//const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
