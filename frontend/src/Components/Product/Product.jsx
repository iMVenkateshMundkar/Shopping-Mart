import "./Product.css";
import { Link, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFromCart } from "../../Redux/App/cart/cartAction";

const Product = ({ product }) => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const selectedCartItems = useSelector(state => state.cart.selectedCartItems);
  const dispatch = useDispatch();

  const handleFocus = (value) => {
    if (product.imageUrl.length > 1 && value) {
      setIndex(1);
    } else {
      setIndex(0);
    }
  };

  const handleQuickBuy = () => {
    dispatch(selectFromCart(product, 1));
    navigate("/checkout");
  }
  return (
    <div className="product">
      <Link to={`/product/${product._id}`}>
        <div>
          <div
            className="products__img"
          >
            <img
              onMouseEnter={() => handleFocus(true)}
              onMouseLeave={() => handleFocus(false)}
              src={product.imageUrl[index]}
              alt={product.title}
            />
          </div>
          <div className="product__info">
            <div className="product__namePrice">
              <p className="product__name">{product.title}</p>
            </div>
            <div className="product__rating">
              <Rating
                name="half-rating-read"
                defaultValue={product.rating}
                precision={0.5}
                style={{ color: "#f4511e" }}
                readOnly
              />
              <p className="product__price">${product.price}</p>
            </div>
            <p className="product__overview">
              {product.overview.substring(0, 100)}...{" "}
            </p>
          </div>
        </div>
      </Link >
      <button onClick={() => handleQuickBuy()} className="clicked__button product__buy">Buy Now</button>
    </div >
  );
};

export default Product;
