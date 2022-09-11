import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducers
import { cartReducer } from "./App/cart/cartReducer";
import { getProductsReducer } from "./App/product/productReducer";
import { authReducer } from "./Auth/userReducer";

const reducer = combineReducers({
  cart: cartReducer,
  products: getProductsReducer,
  user: authReducer,
});

const cartFromLocalStorage = localStorage.getItem("cartPageData")
  ? JSON.parse(localStorage.getItem("cartPageData"))
  : {
      cartItems: [],
      selectedCartItems: [],
    };
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {
      loggedInUser: {},
      isAuth: false,
      token: "",
    };

const INITIAL_STATE = {
  cart: {
    cartItems: cartFromLocalStorage.cartItems,
    selectedCartItems: cartFromLocalStorage.selectedCartItems,
  },
  user: {
    loggedInUser: userInfoFromLocalStorage.loggedInUser,
    isAuth: userInfoFromLocalStorage.isAuth,
    token: userInfoFromLocalStorage.token,
  },
};

const store = legacy_createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
