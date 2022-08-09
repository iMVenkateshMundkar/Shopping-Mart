import axios from "axios";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_PROFILE_UPDATE_FAILURE,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "./userActionTypes";
export const userSignup = (params) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST });
  return await axios({
    method: "post",
    url: "/api/signup",
    baseURL: "http://localhost:5000",
    data: params,
  })
    .then((r) => dispatch({ type: USER_SIGNUP_SUCCESS, payload: r.data }))
    .catch((e) =>
      dispatch({
        type: USER_SIGNUP_FAILURE,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      })
    );
};

export const userLogin = (params) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  return await axios({
    method: "post",
    url: "/api/login",
    baseURL: "http://localhost:5000",
    data: params,
  })
    .then((r) => dispatch({ type: USER_LOGIN_SUCCESS, payload: r.data }))
    .catch((e) =>
      dispatch({
        type: USER_LOGIN_FAILURE,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      })
    );
};

export const userLogout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT_REQUEST });
  try {
    dispatch({ type: USER_LOGOUT_SUCCESS });
  } catch (e) {
    dispatch({
      type: USER_LOGOUT_FAILURE,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const userProfileUpdate = (id, newUser) => async (dispatch) => {
  dispatch({ type: USER_PROFILE_UPDATE_REQUEST });
  return await axios({
    method: "post",
    url: "/api/update",
    baseURL: "http://localhost:5000",
    data: { id, newUser },
  })
    .then((r) =>
      dispatch({ type: USER_PROFILE_UPDATE_SUCCESS, payload: r.data })
    )
    .catch((e) =>
      dispatch({
        type: USER_PROFILE_UPDATE_FAILURE,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      })
    );
};
