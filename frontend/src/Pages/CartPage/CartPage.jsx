import "./CartPage.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// Components
import CartItem from "../../Components/CartItem/CartItem";

// Actions
// import { addToCart, removeFromCart } from "../Redux/actions/cartActions";
import {
  addToCart,
  removeFromCart,
  selectFromCart,
} from "../../Redux/App/cart/cartAction";

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
        <p className="allPagesHeadings">Shopping Cart</p>
        {cartItems.length === 0 ? (
          <div className="emptyCart">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8BuEm44LyVtvT35TqKQF3ANmRzACogr6WiQ&usqp=CAU"
              alt=""
            />
            <p>Your Cart is Empty</p>
            <Link to="/" className="backToShopping">
              <span>Continue Shopping</span>
            </Link>
          </div>
        ) : (
          cartItems.map((item) => (
            <CartItem
              backGround={"#fff"}
              key={item._id}
              item={item}
              qtyChangeHandler={qtyChangeHandler}
              removeHandler={removeFromCartHandler}
              selctedCartItemHandler={selectedCartItemHandler}
            />
          ))
        )}
      </div>
      {cartItems.length > 0 && (
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
              {selectedCartItems.length ? (
                <>
                  <p>Selected ( {getCartCount(false)} items )</p>
                  <p>${getCartSubTotal(false).toFixed(2)}</p>
                </>
              ) : (
                <>
                  <p style={{ color: "red" }}>
                    Selected ( {getCartCount(false)} items )
                  </p>
                  <p style={{ color: "red" }}>
                    ${getCartSubTotal(false).toFixed(2)}
                  </p>
                </>
              )}
            </div>
            <hr />
            <button
              type="button"
              onClick={checkOutHandler}
              disabled={selectedCartItems.length === 0}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
