import "./OrdersPage.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const orders = useSelector((state) => state.user.loggedInUser.orders);

  return (
    <div className="orderspage">
      <p className="allPagesHeadings">My Orders</p>
      <div className="orderspage__body">
        {orders.map((ord) => {
          return ord.ordered_products.map((ord_pro) => {
            return (
              <div
                className="orderspage__orderedProduct"
                key={ord_pro._id}
              >
                <img src={ord_pro.imageUrl[0]} alt="" />
                <p className="order__title">{ord_pro.title}</p>
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
