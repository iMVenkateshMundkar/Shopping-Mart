import "../Styles/SideDrawer.css";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";

const SideDrawer = ({ show, click }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
  };

  const sideDrawerClass = ["sidedrawer"];
  if (show) {
    sideDrawerClass.push("show");
  }
  return (
    <div className={sideDrawerClass.join(" ")}>
      <ul className="sidedrawer__links" onClick={click}>
        <li>
          <Link to="/signin">
            <div className="sidedrawer__signin">
              <span className="sidedrawer__op1">Hello Guest</span>
              <span className="sidedrawer__op2">Sign In</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/order-history">
            <div className="sidedrawer__orders">
              <span className="sidedrawer__op1">Returns</span>
              <span className="sidedrawer__op2">& Orders</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <ShoppingCartIcon />
            <span>
              Cart{" "}
              <span className="sidedrawer__cartTotalProducts">
                {getCartCount()}
              </span>
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideDrawer;
