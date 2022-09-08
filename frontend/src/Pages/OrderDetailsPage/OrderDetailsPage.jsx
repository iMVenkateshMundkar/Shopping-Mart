import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import "./OrderDetailsPage.css";

const OrderDetailsPage = () => {
  const orders = useSelector((state) => state.user.loggedInUser.orders);
  const [searchParams, setSearchParams] = useSearchParams();
  const order_id = searchParams.get("order_id");
  let orderedProducts = [];
  const product_id = searchParams.get("product_id");
  const [currentOrder, setCurrentOrder] = useState({});
  const [currentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    if (order_id) {
      const tempOrder = orders?.find((item) => item.order_id === order_id);
      tempOrder && setCurrentOrder(tempOrder);
    }
  }, [order_id, orders]);
  if (currentOrder) {
    orderedProducts = currentOrder.ordered_products;
  }
  // console.log(orderedProducts);

  useEffect(() => {
    if (product_id && orderedProducts) {
      const tempProduct = orderedProducts.find(
        (item) => item._id === product_id
      );
      tempProduct && setCurrentProduct(tempProduct);
    }
  });
  // console.log(currentProduct);

  return (
    <div className="orderdetailspage">
      <div className="orderdetails__address">
        <p className="orderdetails__address__head">Delivery Address</p>
        {currentOrder.order_id && (
          <div className="orderdetails__address__body">
            <p className="orderdetails__body_name">
              {currentOrder.delieveryAddress.aName}{" "}
              <span>{currentOrder.delieveryAddress.aMobile}</span>
            </p>
            <p>
              {currentOrder.delieveryAddress.aArea}{" "}
              {currentOrder.delieveryAddress.aCity}{" "}
              {currentOrder.delieveryAddress.aState}
            </p>
            <p className="orderdetails__pincode">
              {currentOrder.delieveryAddress.aPincode}
            </p>
          </div>
        )}
      </div>
      {/* <div className="orderdetails__selectedProduct">{order}</div> */}
    </div>
  );
};

export default OrderDetailsPage;
