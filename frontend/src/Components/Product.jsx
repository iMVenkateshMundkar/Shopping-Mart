import "../Styles/Product.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

const Product = ({ name, imageUrl, description, price, productId, rating }) => {
  return (
    <Link to={`/product/${productId}`}>
      <div className="product">
        <img className="product__img" src={imageUrl} alt={name} />
        <div className="product__info">
          <div className="product__namePrice">
            <p className="product__name">{name}</p>
            <p className="product__price">${price}</p>
          </div>
          <div className="product__rating">
            <Rating
              name="half-rating-read"
              defaultValue={rating}
              precision={0.5}
              style={{ color: "#f4511e" }}
              readOnly
            />
          </div>
          <p className="product__description">
            {description.substring(0, 100)}...{" "}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Product;
