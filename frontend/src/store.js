import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productOneReducer,
} from "./reducers/productReducer.js";

const reducer = combineReducers({
  productList: productListReducer,
  productOne: productOneReducer,
});

const initialState = {};

//const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;