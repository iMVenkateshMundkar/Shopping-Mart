import * as actionTypes from "./cartConstants";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product_id: data._id,
      name: data.name,
      imageUrl: data.imageUrl,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem(
    "cartProductsForCheckout",
    JSON.stringify(getState().cart.productsForCheckout)
  );
};

export const selectProductsForCheckout =
  (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);
    console.log(data);
    dispatch({
      type: actionTypes.SELECT_PRODUCTS_FOR_CHECKOUT,
      payload: {
        product_id: data._id,
        name: data.name,
        imageUrl: data.imageUrl,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });

    localStorage.setItem("cart", JSON.stringify(getState().cart));
  };
