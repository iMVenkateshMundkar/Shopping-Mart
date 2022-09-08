import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "../../Components/CartItem/CartItem";
import { selectFromCart, addToCart } from "../../Redux/App/cart/cartAction";
import "./CheckOutPage.css";
import { v4 } from "uuid";
import { userProfileUpdate } from "../../Redux/Auth/userActions";
import AddIcon from "@mui/icons-material/Add";
import AddEditAddress from "../../Components/AddEditAddress/AddEditAddress";

let current_year = new Date().getFullYear().toString();
current_year = current_year[2] + current_year[3];
const months = new Array(12).fill(0).map((e, i) => i + 1);
const years = new Array(30).fill(0).map((e, i) => i + Number(current_year));

const initialState = {
  aName: "",
  aMobile: "",
  aPincode: "",
  aArea: "",
  aCity: "",
  aState: "",
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "aName":
      return {
        ...state,
        aName: payload,
      };
    case "aMobile":
      return {
        ...state,
        aMobile: payload,
      };
    case "aPincode":
      return {
        ...state,
        aPincode: payload,
      };
    case "aArea":
      return {
        ...state,
        aArea: payload,
      };
    case "aCity":
      return {
        ...state,
        aCity: payload,
      };
    case "aState":
      return {
        ...state,
        aState: payload,
      };
    default:
      return state;
  }
};

const CheckOutPage = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const { address } = loggedInUser;
  const [state, setter] = useReducer(reducer, initialState);
  const [isReadyToAddAddress, setIsReadyToAddAddress] = useState(false);
  const [cardNum, setCardNum] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [mm, setMM] = useState("");
  const [yy, setYY] = useState("");
  const [cvv, setCvv] = useState("");
  const [delieveryAddress, setDelieveryAddress] = useState({});
  const selectedCartItems = useSelector(
    (state) => state.cart.selectedCartItems
  );
  const navigate = useNavigate();

  const handleAddAddress = (e) => {
    e.preventDefault();
    setIsReadyToAddAddress(false);
    state.a_id = v4();
    dispatch(
      userProfileUpdate(loggedInUser._id, {
        address: [...loggedInUser.address, state],
      })
    );
  };

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

  const handleDelieveryAddress = (dAddress) => {
    setDelieveryAddress(dAddress);
  };

  const handlePlacedOrder = () => {
    if (!delieveryAddress.a_id) {
      setCardNum("");
      setCvv("");
      setCardHolder("");
      setMM("");
      setYY("");
      return alert("Select address for delievery");
    }
    if (
      cardNum.length !== 16 ||
      cvv.length !== 3 ||
      mm === "" ||
      yy === "" ||
      cardHolder.length === 0
    ) {
      setCardNum("");
      setCvv("");
      setCardHolder("");
      setMM("");
      setYY("");
      return alert("Invalid Card Details");
    }
    dispatch(
      userProfileUpdate(loggedInUser._id, {
        orders: [
          ...loggedInUser.orders,
          {
            order_id: v4(),
            ordered_products: selectedCartItems,
            delieveryAddress,
            order_date: new Date(),
            order_status: "On the way",
          },
        ],
      })
    );
    navigate("/order-history");
  };

  useEffect(() => {
    if (selectedCartItems?.length === 0) {
      navigate("/cart");
    }
  }, [selectedCartItems?.length]);

  return (
    <div className="checkout">
      <div className="checkout__left">
        <div className="checkout__address__details">
          <p className="allPagesHeadings">Address Details</p>
          <div className="checkout__addAddress">
            {isReadyToAddAddress ? (
              <AddEditAddress
                heading={"ADD A NEW ADDRESS"}
                setter={setter}
                state={state}
                setReadyState={setIsReadyToAddAddress}
                handleAddAddress={handleAddAddress}
                operation={"ADD"}
              />
            ) : (
              <div
                onClick={() => {
                  setIsReadyToAddAddress(true);
                }}
                className="address__add address__p"
              >
                <AddIcon /> ADD A NEW ADDRESS
              </div>
            )}
          </div>
          <div className="checkout__showAddress">
            {address.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {address.map((ad, i) => (
                  <div
                    key={i}
                    onChange={() => handleDelieveryAddress(ad)}
                    className="checkout__address"
                  >
                    <input
                      type="radio"
                      value={ad}
                      name="delieveryAddress"
                      defaultChecked={delieveryAddress.a_id === ad.a_id}
                    />
                    <div className="address__showBlock">
                      <div className="address__showBlockHead">
                        <p className="head__name">{ad.aName}</p>
                        <p className="head__mobile">{ad.aMobile}</p>
                      </div>
                      <p className="body__area">
                        {ad.aArea}, {ad.aCity}, {ad.aState}
                      </p>
                      <p className="body__pincode">{ad.aPincode}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No address added</p>
            )}
          </div>
        </div>
        <div className="checkout__products__summery">
          <p className="allPagesHeadings">Products For Checkout</p>
          {selectedCartItems.map((item) => (
            <CartItem
              backGround={"rgb(241, 241, 241)"}
              key={item._id}
              item={item}
              qtyChangeHandler={qtyChangeHandler}
              removeHandler={selectedCartItemHandler}
            />
          ))}
        </div>
        <div className="checkout__payment__modes">
          <p className="allPagesHeadings">Payment Modes</p>
          <div className="card__payment">
            <p>Credit / Debit / ATM Card</p>
            <input
              type="number"
              className="card__num"
              placeholder="Enter Card Number"
              required
              maxLength={16}
              value={cardNum}
              onChange={(e) => setCardNum(e.target.value)}
            />
            <input
              type="text"
              className="card__num"
              placeholder="Enter Card Holder Name"
              required
              value={cardHolder}
              maxLength="16"
              onChange={(e) => setCardHolder(e.target.value)}
            />
            <div>
              <div className="validity">
                <select
                  name="month"
                  value={mm}
                  onChange={(e) => setMM(e.target.value)}
                  className="month hover"
                >
                  <option value="MM">MM</option>
                  {months.map((e, i) => (
                    <option key={i} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
                <select
                  name="year"
                  value={yy}
                  onChange={(e) => setYY(e.target.value)}
                  className="year hover"
                >
                  <option value="YY">YY</option>
                  {years.map((e, i) => (
                    <option key={i} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="number"
                placeholder="CVV"
                required
                className="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button onClick={handlePlacedOrder} className="placeOrder__button">
          Pay {getCartSubTotal().toFixed(2)} & Place Order
        </button>
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
