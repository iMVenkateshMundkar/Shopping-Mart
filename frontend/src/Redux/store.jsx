import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducers
import { cartReducer } from "./App/cartReducers/cartReducer";
import {
  getProductDetailsReducer,
  getProductsReducer,
} from "./App/productReducers/productReducer";
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

const cartFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const productForCheckOutFromLocalStorage = localStorage.getItem(
  "cartProductForCheckout"
)
  ? JSON.parse(localStorage.getItem("cartProductForCheckout"))
  : [];
// const userInfoFromLocalStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

const INITIAL_STATE = {
  cart: {
    cartItems: cartFromLocalStorage,
    productsForCheckout: productForCheckOutFromLocalStorage,
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
