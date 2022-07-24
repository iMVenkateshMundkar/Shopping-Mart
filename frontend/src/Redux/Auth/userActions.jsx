import * as actionTypes from "../constants/userConstants";
import axios from "axios";
import { json } from "express";

export const userLogIn = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Context-Type": "application/json",
      },
    };

    const { data, token } = await axios.post(
      "/api/login",
      { email, password },
      config
    );

    dispatch({ type: actionTypes.USER_LOGIN_SUCCESS, payload: data, token });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userLogOut = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: actionTypes.USER_LOGOUT });
  window.location.href = "/login";
};

export const userRegister = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Context-Type": "application/json",
      },
    };

    const { data, token } = await axios.post(
      `/api/register/`,
      { name, email, password },
      config
    );

    dispatch({ type: actionTypes.USER_REGISTER_SUCCESS, payload: data, token });
    dispatch({ type: actionTypes.USER_LOGIN_SUCCESS, payload: data, token });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.USER_REGISTER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAndUpdateUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.USER_PROFILE_DETAILS_REQUEST });

    const {
      userLogIn: { userInfo },
    } = getState();

    const config = {
      headers: {
        Autherization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/profile/${id}`, config);

    dispatch({ type: actionTypes.USER_PROFILE_DETAILS_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Bearer token was not provided") {
      dispatch(userLogOut());
    }
    dispatch({
      type: USER_PROFILE_DETAILS_FAILURE,
      payload: message,
    });
  }
};
