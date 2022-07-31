import "../Styles/ProductPage.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

// Actions
import { getProductDetails } from "../Redux/App/product/productAction";
// import { addToCart } from "../Redux/actions/cartActions";
import { addToCart, selectFromCart } from "../Redux/App/cart/cartAction";
import Rating from "@mui/material/Rating";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const selectedCartItems = useSelector(
    (state) => state.cart.selectedCartItems
  );
  const singleProductDetails = useSelector(
    (state) => state.singleProductDetails
  );
  const { isLoading, error, singleProduct } = singleProductDetails;

  useEffect(() => {
    if (singleProduct && id !== singleProduct._id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, getProductDetails]);

  const addToCartHandler = () => {
    if (singleProduct) {
      // dispatch(addToCart(product._id, qty));
      dispatch(addToCart(singleProduct, qty));
      let isPresent = selectedCartItems.find(
        (item) => item._id === singleProduct._id
      );
      if (isPresent) {
        dispatch(selectFromCart(singleProduct, qty));
      }
      navigate("/cart");
    }
  };

  return (
    <div className="productpage">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="productpage__left">
            <div className="left__img">
              <img
                className="product__img"
                src={singleProduct.imageUrl}
                alt="Product"
              />
            </div>
            <div className="left__info">
              <p className="left__name p">{singleProduct.name}</p>
              <p className="left__price p">
                Price: <span>${singleProduct.price}</span>
              </p>
              <div className="left__rating p">
                <Rating
                  name="half-rating-read"
                  defaultValue={singleProduct.rating}
                  precision={0.5}
                  style={{ color: "#f4511e" }}
                  readOnly
                />
              </div>
              <p className="left__description p">
                Description: <span>{singleProduct.description}</span>
              </p>
            </div>
          </div>
          <div className="productpage__right">
            <div className="right__info">
              <p className="right__price">
                Total Price: <span>${singleProduct.price * qty}</span>
              </p>
              <p className="right__status">
                Status:{" "}
                <span>
                  {singleProduct.countInStock ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              <p className="right__qty">
                Qty
                <span>
                  <select value={qty} onChange={(e) => setQty(e.target.value)}>
                    {[...Array(singleProduct.countInStock).keys()].map((x) => (
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

export default ProductPage;
