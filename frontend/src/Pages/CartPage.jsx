import "../Styles/CartPage.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// Components
import CartItem from "../Components/CartItem";

// Actions
// import { addToCart, removeFromCart } from "../Redux/actions/cartActions";
import {
  addToCart,
  removeFromCart,
  selectFromCart,
} from "../Redux/App/cart/cartAction";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { cartItems } = cart;
  const { selectedCartItems } = cart;
  const qtyChangeHandler = (product, qty) => {
    dispatch(addToCart(product, qty));
    let isPresent = selectedCartItems.find((item) => item._id === product._id);
    if (isPresent) {
      dispatch(selectFromCart(product, qty));
    }
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const selectedCartItemHandler = (product, qty) => {
    dispatch(selectFromCart(product, qty));
  };

  const checkOutHandler = () => {
    if (selectedCartItems.length) {
      navigate("/checkout");
    } else {
      alert("Select Products For Checkout");
    }
  };

  const getCartCount = (check) => {
    if (check) {
      return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
    }
    return selectedCartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = (check) => {
    if (check) {
      return cartItems.reduce(
        (price, item) => item.price * item.qty + price,
        0
      );
    }
    return selectedCartItems.reduce(
      (price, item) => item.price * item.qty + price,
      0
    );
  };
  return (
    <div className="cartpage">
      <div className="cartpage__left">
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
              key={item._id}
              item={item}
              qtyChangeHandler={qtyChangeHandler}
              removeHandler={removeFromCartHandler}
              selctedCartItemHandler={selectedCartItemHandler}
            />
          ))
        )}
      </div>
      <div className="cartpage__right">
        <div className="cartpage__right__heading">
          <h4>PRICE DETAILS</h4>
        </div>
        <div className="cartpage__info">
          <div>
            <p>Total ( {getCartCount(true)} items )</p>
            <p>${getCartSubTotal(true).toFixed(2)}</p>
          </div>
          <div>
            <p>Selected ( {getCartCount(false)} items )</p>
            <p>${getCartSubTotal(false).toFixed(2)}</p>
          </div>
          <hr />
          <div>
            <button onClick={checkOutHandler}>Proceed To Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
