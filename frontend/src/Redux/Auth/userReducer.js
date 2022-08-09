import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "./userActionTypes";

const initialState = {
  loggedInUser: {},
  isAuth: false,
  token: "",
  isLoading: false,
  error: "",
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case USER_SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOGIN_SUCCESS:
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
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        token: "",
        isAuth: false,
        loggedInUser: {},
        error: payload,
      };
    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOGOUT_SUCCESS:
      localStorage.removeItem("userinfo");
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        token: "",
        loggedInUser: {},
      };
    case USER_LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        erro: payload,
      };

    default:
      return state;
  }
};
