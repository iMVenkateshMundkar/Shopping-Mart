import "../Styles/ProductScreen.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

// Actions
import { getProductDetails } from "../Redux/App/productReducers/productActions";
import { addToCart } from "../Redux/App/cartReducers/cartActions";
import Rating from "@mui/material/Rating";

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const singleProductDetails = useSelector(
    (state) => state.singleProductDetails
  );
  const { loading, error, product } = singleProductDetails;

  useEffect(() => {
    if (product && id !== product._id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch]);
  // const { rating } = product;
  // console.log("hii", rating);

  const addToCartHandler = () => {
    if (product !== {}) {
      dispatch(addToCart(product._id, qty));
      navigate("/cart");
    }
  };

  return (
    <div className="productScreen">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="productScreen__left">
            <div className="left__img">
              <img
                className="product__img"
                src={product.imageUrl}
                alt="Product"
              />
            </div>
            <div className="left__info">
              <p className="left__name p">{product.name}</p>
              <p className="left__price p">
                Price: <span>${product.price}</span>
              </p>
              <div className="left__rating p">
                <Rating
                  name="half-rating-read"
                  defaultValue={product.rating}
                  precision={0.5}
                  style={{ color: "#f4511e" }}
                  readOnly
                />
              </div>
              <p className="left__description p">
                Description: <span>{product.description}</span>
              </p>
            </div>
          </div>
          <div className="productScreen__right">
            <div className="right__info">
              <p className="right__price">
                Total Price: <span>${product.price * qty}</span>
              </p>
              <p className="right__status">
                Status:{" "}
                <span>
                  {product.countInStock ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              <p className="right__qty">
                Qty
                <span>
                  <select value={qty} onChange={(e) => setQty(e.target.value)}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </span>
              </p>
              <p className="right__button">
                <button
                  className="right__addToCart"
                  type="button"
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </button>
                <button className="right__buyNow" type="button">
                  Buy Now
                </button>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
