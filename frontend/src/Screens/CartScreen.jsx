import "../Styles/CartScreen.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Components
import CartItem from "../Components/CartItem";

// Actions
import {
  addToCart,
  removeFromCart,
  selectProductsForCheckout,
} from "../Redux/App/cartReducers/cartActions";

const CartScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { productForCheckout } = cart;

  const checkBoxHandler = (id, qty) => {
    console.log(id);
    dispatch(selectProductsForCheckout(id, qty));
  };

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };
  console.log(productForCheckout);

  return (
    <div className="cartScreen">
      <div className="cartScreen__left">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div className="emptyCart">
            Your Cart Is Empty{" "}
            <Link to="/" className="backToShopping">
              <span> Go Back</span>
            </Link>
          </div>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item.product}
              item={item}
              qtyChangeHandler={qtyChangeHandler}
              removeFromCartHandler={removeFromCartHandler}
              checkBoxHandler={checkBoxHandler}
            />
          ))
        )}
      </div>
      <div className="cartScreen__right">
        <div className="cartScreen__info">
          <p>Subtotal ({getCartCount()}) items</p>
          <p>${getCartSubTotal().toFixed(2)}</p>
        </div>
        <div>
          <Link to={"/checkout"}>
            <button>Proceed To Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
