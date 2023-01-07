import React from "react";
import { render } from "react-dom";
import "./bootstrap.min.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
