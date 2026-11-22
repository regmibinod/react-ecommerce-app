import { useLocation, Link } from "react-router-dom";
import "../styles/orderconfirmation.css";

function OrderConfirmation() {
  // Retrieve order information passed from the checkout page.
  const location = useLocation();
  console.log(location.pathname)
  const order = location.state?.order;
console.log(order)
  // Prevent direct access when no order information is available.
  if (!order) {
    return (
      <div className="oc-container">
        <div className="oc-empty">
          <span className="oc-empty-icon">📭</span>
          <h1>No order found</h1>
          <p>It looks like you haven't placed an order yet.</p>
          <Link to="/products" className="oc-primary-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Show the date in a friendly format, e.g. "18 November 2026".
  const orderDate = new Date(order.orderDate).toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="oc-container">
      {/* Success header */}
      <div className="oc-hero">
        <div className="oc-check">✓</div>
        <h1 className="oc-title">Thank you for your order!</h1>
        <p className="oc-subtitle">
          Your order has been placed successfully.
        </p>
        <span className="oc-id">{order.id}</span>
      </div>

      <div className="oc-card">
        {/* Customer and shipping details */}
        <div className="oc-info-grid">
          <div className="oc-info-block">
            <span className="oc-label">Customer</span>
            <span className="oc-value">{order.customer.fullName}</span>
          </div>
          <div className="oc-info-block">
            <span className="oc-label">Email</span>
            <span className="oc-value">{order.customer.email}</span>
          </div>
          <div className="oc-info-block">
            <span className="oc-label">Order Date</span>
            <span className="oc-value">{orderDate}</span>
          </div>
          <div className="oc-info-block">
            <span className="oc-label">Shipping To</span>
            <span className="oc-value">
              {order.customer.address}, {order.customer.city}{" "}
              {order.customer.postcode}, {order.customer.country}
            </span>
          </div>
        </div>

        {/* Items */}
        <h2 className="oc-section-title">Items Ordered</h2>

        <div className="oc-items">
          {order.items.map((item) => (
            <div className="oc-item" key={item.id}>
              <img
                className="oc-item-image"
                src={item.image}
                alt={item.title}
              />
              <div className="oc-item-info">
                <p className="oc-item-name">{item.title}</p>
                <p className="oc-item-meta">
                  ${item.price.toFixed(2)} × {item.quantity}
                </p>
              </div>
              <p className="oc-item-price">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="oc-totals">
          <div className="oc-row">
            <span>Subtotal</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="oc-row">
            <span>Shipping</span>
            <span>${order.shippingCost.toFixed(2)}</span>
          </div>
          <div className="oc-row oc-total">
            <span>Total</span>
            <span>${order.total.toFixed(2)} NZD</span>
          </div>
        </div>
      </div>

      <div className="oc-actions">
        <Link to="/products" className="oc-primary-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;