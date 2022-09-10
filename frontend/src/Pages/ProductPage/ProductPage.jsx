import React from 'react';
import "./ProductPage.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetails } from '../../Redux/App/product/productAction';
import { useState } from 'react';
import { addToCart, selectFromCart } from '../../Redux/App/cart/cartAction';

function ProductPage() {
  const singleProduct = useSelector(state => state.products.singleProduct);
  const selectedCartItems = useSelector(
    (state) => state.cart.selectedCartItems
  );
  const [fullImageUrl, setFullImageUrl] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addToCart(singleProduct, qty));
    let isPresent = selectedCartItems.find(
      (item) => item._id === singleProduct._id
    );
    if (isPresent) {
      dispatch(selectFromCart(singleProduct, qty));
    }
    navigate("/cart");
  }

  useEffect(() => {
    if (id || singleProduct?.title === undefined) {
      dispatch(getProductDetails(id));
      if (singleProduct?.imageUrl?.length > 0) {
        setFullImageUrl(singleProduct.imageUrl[0]);
      }
    }
  }, [id, singleProduct?.title, singleProduct?.imageUrl?.length])

  console.log(singleProduct);

  return (
    <div className='productpage'>
      {singleProduct?.title !== undefined && <><div className='product__image'>
        <div className='product__image__list'>
          {singleProduct.imageUrl.map((image, index) =>
            <img className={fullImageUrl === image && "selected"} onClick={() => setFullImageUrl(image)} key={index} src={image} alt="" />
          )}
        </div>
        <div className='product__image__full'>
          <img src={fullImageUrl} alt="" />
        </div>
      </div>
        <div className='productpage__info'>
          <p className='productpage__title'>{singleProduct.title}</p>
          {singleProduct.price !== singleProduct.priceDiscount && 
          <p className='productpage__price'>MSRP: ${singleProduct.price.toFixed(2)}</p>
        }
          <p className='productpage__priceDiscount'>${singleProduct.priceDiscount.toFixed(2)}</p>
          <p className='save__price'>Save: ${(singleProduct.price-singleProduct.priceDiscount).toFixed(2)}</p>
          <p className='productpage__quantity'>Quantity</p>
          <div className='productpage__quantity__change'>
            <button className={qty === 1 ? "disabled" : "hover"} onClick={() => {
              if (qty > 1){ 
              setQty(prv => prv-1)
              }
              }}>-</button>
            <div>{qty}</div>
            <button className={qty === singleProduct.countInStock ? "disabled" : "hover"} onClick={() => {
              if (qty < singleProduct.countInStock){ 
              setQty(prv => prv+1)
              }
              }}>+</button>
          </div>
          <p className='product__overview'>{singleProduct.overview}</p>
          <div onClick={handleAddToCart} className='clicked__button' style={{textAlign: "center"}}>ADD TO CART</div>
        </div>
        </>}

    </div>
  )
}

export default ProductPage