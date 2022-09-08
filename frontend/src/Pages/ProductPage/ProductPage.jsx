import "./ProductPage.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";

// Actions
import { getProductDetails } from "../../Redux/App/product/productAction";
import { addToCart, selectFromCart } from "../../Redux/App/cart/cartAction";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  console.log(id);
  const selectedCartItems = useSelector(
    (state) => state.cart.selectedCartItems
  );
  const singleProductDetails = useSelector((state) => state.products);
  const { isLoading, error, singleProduct } = singleProductDetails;
  console.log(singleProductDetails);

  const addToCartHandler = () => {
    dispatch(addToCart(singleProduct, qty));
    let isPresent = selectedCartItems.find(
      (item) => item._id === singleProduct._id
    );
    if (isPresent) {
      dispatch(selectFromCart(singleProduct, qty));
    }
    navigate("/cart");
  };

  const goToCheckout = () => {
    dispatch(selectFromCart(singleProduct, qty));
    dispatch(addToCart(singleProduct, qty));
    navigate("/checkout");
  };

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [id]);
  console.log(singleProduct);

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
                src={singleProduct.imageUrl[0]}
                alt="Product"
              />
            </div>
            <div className="left__info">
              <p className="left__name p">{singleProduct.title}</p>
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
                Description: <span>{singleProduct.overview}</span>
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
                  className="right__addToCart clicked__button"
                  type="button"
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </button>
                <button
                  onClick={goToCheckout}
                  className="right__buyNow"
                  type="button"
                >
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
