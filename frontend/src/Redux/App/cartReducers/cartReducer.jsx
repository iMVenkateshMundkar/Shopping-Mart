import * as actionType from "./cartConstants";
const InitialState = {
  cartItems: [],
  productsForCheckout: [],
};

export const cartReducer = (state = InitialState, action) => {
  switch (action.type) {
    case actionType.ADD_TO_CART:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case actionType.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case actionType.SELECT_PRODUCTS_FOR_CHECKOUT:
      const itemForCheckOut = action.payload;
      const existItemForCheckout = state.productsForCheckout.find(
        (x) => x.product === itemForCheckOut.product
      );

      if (existItemForCheckout) {
        return {
          ...state,
          productsForCheckout: state.productsForCheckout.filter(
            (p) => p.product !== existItemForCheckout.product
          ),
        };
      } else {
        return {
          ...state,
          productsForCheckout: [
            ...state.productsForCheckout,
            existItemForCheckout,
          ],
        };
      }

    default:
      return state;
  }
};
