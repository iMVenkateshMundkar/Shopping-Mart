import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddressCheckout from "../Components/AddressCheckout";
import CartItem from "../Components/CartItem";
import PaymentModeCheckout from "../Components/PaymentModeCheckout";
import SelectedCheckOutItem from "../Components/SelectedCheckOutItem";
import { selectFromCart, addToCart } from "../Redux/App/cart/cartAction";
import "../Styles/CheckOutPage.css";

const CheckOutPage = () => {
  const dispatch = useDispatch();
  const selectedCartItems = useSelector(
    (state) => state.cart.selectedCartItems
  );
  const navigate = useNavigate();

  const qtyChangeHandler = (product, qty) => {
    dispatch(addToCart(product, qty));
    dispatch(selectFromCart(product, qty));
  };

  const selectedCartItemHandler = (product, qty) => {
    dispatch(selectFromCart(product, qty));
  };

  const getCartCount = () => {
    return selectedCartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return selectedCartItems.reduce(
      (price, item) => item.price * item.qty + price,
      0
    );
  };

  useEffect(() => {
    if (selectedCartItems?.length === 0) {
      navigate("/cart");
    }
  }, [selectedCartItems?.length]);
  return (
    <div className="checkout">
      <div className="checkout__left">
        <AddressCheckout />
        <PaymentModeCheckout />
        <h2>Products For Checkout</h2>
        {selectedCartItems.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            qtyChangeHandler={qtyChangeHandler}
            removeHandler={selectedCartItemHandler}
          />
        ))}
      </div>
      <div className="checkout__right">
        <div className="checkout__right__heading">
          <h4>PRICE DETAILS</h4>
        </div>
        <div className="checkout__right__info">
          <div>
            <p>
              Price ( <span>{getCartCount()}</span> items )
            </p>
            <p>${getCartSubTotal().toFixed(2)}</p>
          </div>
          <div>
            <p>Delievery Charges</p>
            <p className="free">FREE</p>
          </div>
          <hr />
          <div className="checkout__right__totalPrice">
            <p>Total Price</p>
            <p>${getCartSubTotal().toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
