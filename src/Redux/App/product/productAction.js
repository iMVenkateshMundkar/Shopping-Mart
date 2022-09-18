import * as actionTypes from "./productActionTypes";
import axios from "axios";

export const getProducts = ({ pageNumber, sortBy, query }) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });
  return await axios
    .get(`/api/products/?page=${pageNumber}&sort=${sortBy}&brand=${query}`)
    .then((r) =>
      dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: r.data })
    )
    .catch((e) =>
      dispatch({
        type: actionTypes.GET_PRODUCTS_FAILURE,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      })
    );
};

export const getProductDetails = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });
  return await axios
    .get(`/api/products/product/${id}`)
    .then((r) => {
      dispatch({
        type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
        payload: r.data,
      });
    })
    .catch((e) =>
      dispatch({
        type: actionTypes.GET_PRODUCT_DETAILS_FAILURE,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      })
    );
};

export const getBrands = () => async (dispatch) => {
  dispatch({ type: actionTypes.GET_BRANDS_REQUEST });
  return await axios
    .get("/api/products/brands")
    .then(r => dispatch({
      type: actionTypes.GET_BRANDS_SUCCESS,
      payload: r.data[0].allBrands
    }))
    .catch(e => dispatch({
      type: actionTypes.GET_BRANDS_FAILURE,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    }))
}