import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/orders.css";
import { getOrders } from "../services/orderStorage";
function OrderHistory() {
  // Retrieve previously saved  orders from LocalStorage

  const [orders] = useState(() => getOrders());

  if (orders.length === 0) {
    return (
      <div className="order-history">
        <h1>My Orders</h1>
        <p>You haven't placed any orders yet.</p>

        <Link to="/products">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="order-history">
      <h1>My Orders</h1>

      <p>You have placed {orders.length} order(s).</p>

      {/* Display each previously saved order. */}
      {orders.map((order) => {
        const orderDate = new Date(order.orderDate).toLocaleDateString(
          "en-NZ",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          },
        );

        return (
          <div className="order-history-card" key={order.id}>
            <h2>Order #{order.id}</h2>

            <p>Order Date: {orderDate}</p>
            <p>Order Status: {order.status || "Processing"}</p>
            <p>Products: {order.items.length}</p>

            <p>Total: ${order.total.toFixed(2)} USD</p>

            <h3>Products Ordered</h3>

            {order.items.map((item) => (
              <div key={item.id}>
                <p>{item.title}</p>
                <p>Quantity: {item.quantity}</p>
                <Link to={`/orders/${order.id}`}>View Order Details →</Link>
              </div>
            ))}
          </div>
        );
      })}

      <Link to="/products">Continue Shopping</Link>
    </div>
  );
}

export default OrderHistory;
