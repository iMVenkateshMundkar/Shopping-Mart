import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducers
import { cartReducer } from "./reducers/cartReducers";
import {
  getProductDetailsReducer,
  getProductsReducer,
} from "./reducers/productReducers";
// import {
//   userLogInReducer,
//   userRegisterReducer,
//   getUserProfileReducer,
// } from "./reducers/userReducer";

const reducer = combineReducers({
  cart: cartReducer,
  allProducts: getProductsReducer,
  singleProductDetails: getProductDetailsReducer,
  // userLogin: userLogInReducer,
  // userRegister: userRegisterReducer,
  // userProfile: getUserProfileReducer,
});

const middleware = [thunk];

const cartFromLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
// const userInfoFromLocalStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

const INITIAL_STATE = {
  cart: {
    cartItems: cartFromLocalStorage,
  },
  // userLogin: {
  //   userInfo: userInfoFromLocalStorage,
  // },
};

const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
