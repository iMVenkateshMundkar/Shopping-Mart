import * as actionTypes from "./cartActionTypes";

export const addToCart = (data, qty) => (dispatch, getState) => {
  dispatch({ type: actionTypes.ADD_TO_CART_REQUEST });
  try {
    dispatch({
      type: actionTypes.ADD_TO_CART_SUCCESS,
      payload: {
        ...data,
        qty,
      },
    });
    localStorage.setItem("cartPageData", JSON.stringify(getState().cart));
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_TO_CART_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: actionTypes.REMOVE_FROM_CART_REQUEST });
  try {
    dispatch({ type: actionTypes.REMOVE_FROM_CART_SUCCESS, payload: id });
    localStorage.setItem("cartPageData", JSON.stringify(getState().cart));
  } catch (error) {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const selectFromCart = (data, qty) => (dispatch, getState) => {
  dispatch({ type: actionTypes.SELECT_FROM_CART_REQUEST });
  try {
    dispatch({
      type: actionTypes.SELECT_FROM_CART_SUCCESS,
      payload: {
        ...data,
        qty,
      },
    });
    localStorage.setItem("cartPageData", JSON.stringify(getState().cart));
  } catch (error) {
    dispatch({
      type: actionTypes.SELECT_FROM_CART_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
