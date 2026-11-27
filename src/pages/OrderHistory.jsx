
import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/orderhistory.css";
import { getOrders } from "../services/orderStorage";

function OrderHistory() {
  // Retrieve previously saved orders from LocalStorage.
  const [orders] = useState(() => getOrders());

  // Format currency using New Zealand dollars.
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NZ", {
      style: "currency",
      currency: "NZD",
    }).format(Number(price));
  };

  // Display a friendly date for each order.
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-NZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Return a CSS class based on the order status.
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "processing":
        return "status-processing";

      case "shipped":
        return "status-shipped";

      case "delivered":
        return "status-delivered";

      case "cancelled":
        return "status-cancelled";

      default:
        return "status-default";
    }
  };

  // Display a friendly empty state when no orders exist.
  if (orders.length === 0) {
    return (
      <div className="order-history">
        <div className="order-history-empty">
          <div className="order-empty-icon">📦</div>

          <h1>No Orders Yet</h1>

          <p>
            You haven't placed any orders yet.
            Start shopping to see your purchases here.
          </p>

          <Link to="/products" className="order-history-button">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history">
      {/* Page heading */}
      <div className="order-history-header">
        <h1>My Orders</h1>

        <p>
          You have placed {orders.length}{" "}
          {orders.length === 1 ? "order" : "orders"}.
        </p>
      </div>

      {/* Display all previously saved orders. */}
      <div className="order-history-list">
        {orders.map((order) => {
          const status = order.status || "Processing";

          return (
            <article className="order-history-card" key={order.id}>
              {/* Order header */}
              <div className="order-card-header">
                <div>
                  <span className="order-card-label">Order Number</span>

                  <h2>{order.id}</h2>
                </div>

                <span
                  className={`order-status ${getStatusClass(status)}`}
                >
                  {status}
                </span>
              </div>

              {/* Order information */}
              <div className="order-card-info">
                <div>
                  <span className="order-card-label">Order Date</span>
                  <p>{formatDate(order.orderDate)}</p>
                </div>

                <div>
                  <span className="order-card-label">Products</span>
                  <p>
                    {order.items.length}{" "}
                    {order.items.length === 1 ? "item" : "items"}
                  </p>
                </div>

                <div>
                  <span className="order-card-label">Total Amount</span>
                  <p className="order-card-total">
                    {formatPrice(order.total)}
                  </p>
                </div>
              </div>

              {/* Products included in this order */}
              <div className="order-products">
                <h3>Products Ordered</h3>

                {order.items.map((item) => (
                  <div className="order-product-item" key={item.id}>
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                    />

                    <div className="order-product-info">
                      <p className="order-product-name">
                        {item.title}
                      </p>

                      <p>Quantity: {item.quantity}</p>
                    </div>

                    <span className="order-product-price">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order details navigation */}
              <div className="order-card-footer">
                <Link
                  to={`/orders/${order.id}`}
                  className="order-details-button"
                >
                  View Order Details →
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/* Continue shopping */}
      <div className="order-history-actions">
        <Link to="/products" className="order-history-button">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderHistory;
