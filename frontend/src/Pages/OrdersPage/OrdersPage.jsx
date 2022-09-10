import "./OrdersPage.css";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const OrdersPage = () => {
  const orders = useSelector((state) => state.user.loggedInUser.orders);
  const navigate = useNavigate();

  return (
    <div className="orderspage">
      <p className="allPagesHeadings">Order Details</p>
      <div className="orderspage__body">
        {orders.map((ord) => {
          return ord.ordered_products.map((ord_pro) => {
            return (
              <div
                className="orderspage__orderedProduct hover"
                key={ord_pro._id}
                onClick={() =>
                  navigate({
                    pathname: `/order-details`,
                    search: `?order_id=${ord.order_id}&product_id=${ord_pro._id}`,
                  })
                }
              >
                <img src={ord_pro.imageUrl[0]} alt="" />
                <p>{ord_pro.title}</p>
                <p>${ord_pro.priceDiscount}</p>
                <p className="orderspage__orderStatus">{ord.order_status}</p>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};

export default OrdersPage;
