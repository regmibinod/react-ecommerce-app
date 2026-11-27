
import { useLocation, Link } from "react-router-dom";
import "../styles/orderconfirmation.css";

function OrderConfirmation() {
  // Retrieve order information passed from the checkout page.
  const location = useLocation();
  const navigationOrder = location.state?.order;

  // Retrieve previously saved orders safely from localStorage.
  let savedOrders = [];

  try {
    savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");

    // Ensure the retrieved data is an array.
    if (!Array.isArray(savedOrders)) {
      savedOrders = [];
    }
  } catch (error) {
    console.error("Unable to retrieve saved orders:", error);
  }

  // Use the newly placed order or fall back to the latest saved order.
  const order =
    navigationOrder || savedOrders[savedOrders.length - 1];

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

  // Format currency using New Zealand dollars.
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NZ", {
      style: "currency",
      currency: "NZD",
    }).format(Number(price));
  };

  // Format the order date for display.
  const orderDate = new Date(order.orderDate).toLocaleDateString(
    "en-NZ",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div className="oc-container">
      {/* Display the successful order confirmation message. */}
      <div className="oc-hero">
        <div className="oc-check" aria-label="Order successful">
          ✓
        </div>

        <h1 className="oc-title">Thank you for your order!</h1>

        <p className="oc-subtitle">
          Your order has been placed successfully.
        </p>

        <span className="oc-id">{order.id}</span>
      </div>

      <div className="oc-card">
        {/* Display customer and shipping information. */}
        <div className="oc-info-grid">
          <div className="oc-info-block">
            <span className="oc-label">Customer</span>
            <span className="oc-value">
              {order.customer.fullName}
            </span>
          </div>

          <div className="oc-info-block">
            <span className="oc-label">Email</span>
            <span className="oc-value">
              {order.customer.email}
            </span>
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

        {/* Display all products included in the order. */}
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
                  {formatPrice(item.price)} × {item.quantity}
                </p>
              </div>

              <p className="oc-item-price">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        {/* Display the order subtotal, shipping and final total. */}
        <div className="oc-totals">
          <div className="oc-row">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>

          <div className="oc-row">
            <span>Shipping</span>
            <span>{formatPrice(order.shippingCost)}</span>
          </div>

          <div className="oc-row oc-total">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      {/* Allow customers to continue shopping. */}
      <div className="oc-actions">
        <Link to="/products" className="oc-primary-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;
