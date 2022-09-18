import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import store from "./Redux/store";
import { Provider } from "react-redux";
import axios from "axios";

// axios.defaults.baseURL = "https://vm-shopping-mart.herokuapp.com//";
axios.defaults.baseURL = "http://localhost:5500";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);

reportWebVitals();
