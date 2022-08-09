import "../Styles/SideDrawer.css";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const SideDrawer = ({ show, click }) => {
  const user = useSelector((state) => state.user);
  const { isAuth, loggedInUser } = user;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [loginUrl, setLoginUrl] = useState("");

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
  };

  const sideDrawerClass = ["sidedrawer"];
  if (show) {
    sideDrawerClass.push("show");
  }

  useEffect(() => {
    if (isAuth) {
      setLoginUrl(`/user/${loggedInUser.id}`);
    } else {
      setLoginUrl("/login");
    }
  }, [isAuth, loggedInUser.id]);

  return (
    <div className={sideDrawerClass.join(" ")}>
      <ul className="sidedrawer__links" onClick={click}>
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
          <Link to="/order-history">
            <div className="sidedrawer__orders">
              <span className="sidedrawer__op1">My</span>
              <span className="sidedrawer__op2">Orders</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <Badge badgeContent={getCartCount()} color="primary">
              <ShoppingCartIcon sx={{ fontSize: 30 }} />
            </Badge>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideDrawer;
