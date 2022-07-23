import React from "react";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { fromSetString } from "requirejs";

const Navbar = ({ click }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
  };

  return (
    <div className="navbar">
      {/* logo */}
      <div className="navbar__logo hover">
        <Link to={"/"}>
          <h3>Shopping Mart</h3>
        </Link>
      </div>
      {/* links */}
      <ul className="navbar__links">
        <li>
          <Link to={"/signin"}>
            <div className="signin hover">
              <span className="op1">Hello Guest</span>
              <span className="op2">Sign In</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to={"/order-history"}>
            <div className="orders hover">
              <span className="op1">Returns</span>
              <span className="op2">& Orders</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to={"/cart"} className="cart__icon">
            {/* Icon */}
            <ShoppingCartIcon />
            {/* <AddShoppingCartIcon /> */}
            <span className="cart__link">
              Cart
              <span className="cart__totalProducts">{getCartCount()}</span>
            </span>
          </Link>
        </li>
      </ul>
      {/* hamburger menu */}
      <div className="menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Navbar;
