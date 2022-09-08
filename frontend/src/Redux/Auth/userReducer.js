import * as actionTypes from "./userActionTypes";

const initialState = {
  loggedInUser: {},
  isAuth: false,
  token: "",
  isLoading: false,
  error: "",
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.USER_SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.USER_SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case actionTypes.USER_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.USER_LOGIN_SUCCESS:
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          loggedInUser: payload.user,
          isAuth: true,
          token: payload.token,
        })
      );
      return {
        ...state,
        token: payload.token,
        isAuth: true,
        loggedInUser: payload.user,
        isLoading: false,
      };
    case actionTypes.USER_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        token: "",
        isAuth: false,
        loggedInUser: {},
        error: payload,
      };
    case actionTypes.USER_PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.USER_PROFILE_UPDATE_SUCCESS:
      let userFromLocalStorage = JSON.parse(localStorage.getItem("userInfo"));
      localStorage.removeItem("userInfo");
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          loggedInUser: payload,
          isAuth: userFromLocalStorage.isAuth,
          token: userFromLocalStorage.token,
        })
      );
      return {
        ...state,
        token: userFromLocalStorage.token,
        isAuth: true,
        loggedInUser: payload,
        isLoading: false,
      };
    case actionTypes.USER_PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case actionTypes.USER_LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.USER_LOGOUT_SUCCESS:
      localStorage.removeItem("userInfo");
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        token: "",
        loggedInUser: {},
      };
    case actionTypes.USER_LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        erro: payload,
      };

    default:
      return state;
  }
};
