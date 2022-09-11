import "./CartItem.css";
import { Link, useLocation } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
const CartItem = ({
  backGround,
  item,
  qtyChangeHandler,
  removeHandler,
  selctedCartItemHandler,
}) => {
  let isSelected;
  const selectedCartItems = useSelector(
    (state) => state.cart.selectedCartItems
  );
  const location = useLocation();
  const cameFrom = location.pathname;
  if (selectedCartItems.find((x) => x._id === item._id)) {
    isSelected = true;
  } else {
    isSelected = false;
  }

  return (
    <div className="cartitem" style={{ backgroundColor: backGround }}>
      {cameFrom === "/checkout" ? (
        <span className="dots"></span>
      ) : (
        <input
          type="checkBox"
          defaultChecked={isSelected}
          onChange={() => selctedCartItemHandler(item, item.qty)}
        />
      )}

      <div className="cartitem__img">
        <img className="product__img" src={item.imageUrl[0]} alt={item.title} />
      </div>
      <Link to={`/product/${item._id}`} className="cartitem__name">
        <p>{item.title}</p>
      </Link>
      <p className="cartitem__price">${item.priceDiscount}</p>
      <div className="cartitem__qty">
      <p className="hover" onClick={() => {
              if (item.qty > 1){ 
              qtyChangeHandler(item, item.qty-1);
              }
              }}>-</p>
            <p>{item.qty}</p>
            <p className="hover" onClick={() => {
              if (item.qty < item.countInStock){ 
              qtyChangeHandler(item, item.qty+1);
              }
              }}>+</p></div>
      {cameFrom === "/checkout" ? (
        <button
          className="cartitem__removeitem"
          onClick={() => removeHandler(item, item.qty)}
        >
          <i>
            <DeleteIcon fontSize="small" />
          </i>
        </button>
      ) : (
        <button
          className="cartitem__removeitem"
          onClick={() => removeHandler(item._id)}
        >
          <i>
            <DeleteIcon fontSize="small" />
          </i>
        </button>
      )}
    </div>
  );
};

export default CartItem;
