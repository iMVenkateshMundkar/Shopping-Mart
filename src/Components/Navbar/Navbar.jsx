import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = ({ click }) => {
  const user = useSelector((state) => state.user);
  const { isAuth, loggedInUser } = user;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [loginUrl, setLoginUrl] = useState("");

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
  };
  useEffect(() => {
    if (isAuth) {
      setLoginUrl(`/user/${loggedInUser._id}`);
    } else {
      setLoginUrl("/login");
    }
  }, [isAuth, loggedInUser._id]);

  return (
    <div className="navbar">
      {/* logo */}
      <div className="navbar__logo hover">
        <Link to={"/"}>
          <h3>Shopping Mart</h3>
        </Link>
      </div>
      <SearchBar />
      {/* links */}
      <ul className="navbar__links">
        <li>
          <Link to={loginUrl}>
            {isAuth ? (
              <div className="sidedrawer__login">
                <AccountCircleIcon />
                <span className="sidedrawer__op2">{loggedInUser.username}</span>
              </div>
            ) : (
              <div className="sidedrawer__login">
                <span className="sidedrawer__op1">Hello Guest</span>
                <span className="sidedrawer__op2">Log In</span>
              </div>
            )}
          </Link>
        </li>
        <li>
          <Link to={"/order-history"}>
            <div className="orders hover">
              <span className="op1">My</span>
              <span className="op2">Orders</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to={"/cart"} className="cart__icon">
            {/* Icon */}
            <Badge badgeContent={getCartCount()} color="primary">
              <ShoppingCartIcon sx={{ fontSize: 28 }} />
            </Badge>
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
