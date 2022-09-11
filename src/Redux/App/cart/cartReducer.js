import * as actionTypes from "./cartActionTypes";

const initialState = {
  cartItems: [],
  selectedCartItems: [],
  isLoading: false,
  error: "",
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_TO_CART_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.ADD_TO_CART_SUCCESS:
      const existItem = state.cartItems.find((x) => x._id === payload._id);
      if (existItem) {
        return {
          ...state,
          isLoading: false,
          cartItems: state.cartItems.map((x) =>
            x._id === existItem._id ? payload : x
          ),
        };
      } else {
        return {
          ...state,
          isLoading: false,
          cartItems: [...state.cartItems, payload],
        };
      }

    case actionTypes.ADD_TO_CART_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case actionTypes.REMOVE_FROM_CART_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.REMOVE_FROM_CART_SUCCESS:
      let removedCartItems = state.cartItems.filter(
        (item) => item._id !== payload
      );
      let removedItemExistInSelected = state.selectedCartItems.find(
        (item) => item._id === payload
      );
      if (removedItemExistInSelected) {
        state.selectedCartItems.splice(
          state.selectedCartItems.indexOf(removedItemExistInSelected),
          1
        );
      }
      return {
        ...state,
        isLoading: false,
        cartItems: removedCartItems,
      };
    case actionTypes.REMOVE_FROM_CART_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case actionTypes.SELECT_FROM_CART_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.SELECT_FROM_CART_SUCCESS:
      let existSelectedItem = state.selectedCartItems.find(
        (item) => item._id === payload._id
      );
      if (existSelectedItem) {
        if (existSelectedItem.qty === payload.qty) {
          return {
            ...state,
            isLoading: false,
            selectedCartItems: state.selectedCartItems.filter(
              (item) => item._id !== payload._id
            ),
          };
        } else {
          return {
            ...state,
            isLoading: false,
            selectedCartItems: state.selectedCartItems.map((item) =>
              item._id === payload._id ? payload : item
            ),
          };
        }
      } else {
        return {
          ...state,
          isLoading: false,
          selectedCartItems: [...state.selectedCartItems, payload],
        };
      }

    case actionTypes.SELECT_FROM_CART_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
