import * as actionType from "./productConstants";

export const getProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actionType.GET_PRODUCTS_REQUEST:
      return {
        products: [],
        loading: true,
      };

    case actionType.GET_PRODUCTS_SUCCESS:
      return {
        products: action.payload,
        loading: false,
      };

    case actionType.GET_PRODUCTS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actionType.GET_PRODUCT_DETAILS_REQUEST:
      return {
        product: {},
        loading: true,
      };

    case actionType.GET_PRODUCT_DETAILS_SUCCESS:
      return {
        product: action.payload,
        loading: false,
      };

    case actionType.GET_PRODUCT_DETAILS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    case actionType.GET_PRODUCT_DETAILS_RESET:
      return {
        product: {},
      };

    default:
      return state;
  }
};
