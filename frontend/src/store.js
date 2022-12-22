import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productOneReducer,
} from "./reducers/productReducer.js";
import { cartReducer } from "./reducers/cartReducer.js";

const reducer = combineReducers({
  productList: productListReducer,
  productOne: productOneReducer,
  cart: cartReducer,
});

const carItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cart: { cartItems: carItemsFromStorage },
};

//const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
