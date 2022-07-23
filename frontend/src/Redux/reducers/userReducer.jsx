import * as actionTypes from "../constants/userConstants";

export const userLogInReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_REQUEST:
      return {
        loading: true,
      };

    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };

    case actionTypes.USER_LOGIN_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    case actionTypes.USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case actionTypes.USER_REGISTER_REQUEST:
      return {
        loading: true,
      };

    case actionTypes.USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };

    case actionTypes.USER_REGISTER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getUserProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case actionTypes.USER_PROFILE_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case actionTypes.USER_PROFILE_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };

    case actionTypes.USER_PROFILE_DETAILS_RESET:
      return {
        user: {},
      };

    case actionTypes.USER_PROFILE_DETAILS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
