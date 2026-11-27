import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/orderdetails.css";
import { getOrders, updateOrderStatus } from "../services/orderStorage";

function OrderDetails() {
  // Retrieve the order ID from the URL.
  const { id } = useParams();

  // Find the requested order in LocalStorage.
  const [order, setOrder] = useState(() =>
    getOrders().find((item) => item.id === id),
  );

  // Keep track of the status selected in the dropdown.
  const [selectedStatus, setSelectedStatus] = useState(
    order?.status || "Processing",
  );

  // Format prices consistently using New Zealand dollars.
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NZ", {
      style: "currency",
      currency: "NZD",
    }).format(Number(price) || 0);

  // Update the order status in LocalStorage and React state.
  const handleStatusUpdate = () => {
    if (!order || selectedStatus === order.status) return;

    try {
      updateOrderStatus(order.id, selectedStatus);

      setOrder((previousOrder) => ({
        ...previousOrder,
        status: selectedStatus,
      }));

      alert("Order status updated successfully!");
    } catch (error) {
      alert(error.message);
      setSelectedStatus(order.status);
    }
  };

  // Allow customers to cancel orders that are still Processing.
  const handleCancelOrder = () => {
    if (order.status !== "Processing") {
      alert("Only Processing orders can be cancelled.");
      return;
    }

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmCancel) return;

    try {
      updateOrderStatus(order.id, "Cancelled");

      setOrder((previousOrder) => ({
        ...previousOrder,
        status: "Cancelled",
      }));

      setSelectedStatus("Cancelled");

      alert("Your order has been cancelled successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  // Display a helpful message if the requested order does not exist.
  if (!order) {
    return (
      <div className="order-details-empty">
        <div className="order-details-empty-icon">📦</div>
        <h2>Order Not Found</h2>
        <p>We couldn't find the order you're looking for.</p>
        <Link to="/orders" className="order-back-button">
          Back to My Orders
        </Link>
      </div>
    );
  }

  const customer = order.customer || {};
  const orderStatus = order.status || "Processing";

  const orderDate = new Date(order.orderDate).toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="order-details-page">
      {/* Order heading and basic information */}
      <div className="order-details-header">
        <div>
          <Link to="/orders" className="order-breadcrumb">
            ← Back to My Orders
          </Link>

          <h1>Order Details</h1>
          <p>Review your order information and delivery details.</p>
        </div>

        <div className="order-header-info">
          <span>Order Number</span>
          <strong>#{order.id}</strong>
          <span>Placed on {orderDate}</span>
        </div>
      </div>

      {/* Order status management */}
      <section className="order-status-management">
        <div className="order-status-heading">
          <div>
            <h2>Order Status</h2>
            <p>Track the current progress of your order.</p>
          </div>

          <span className={`status status-${orderStatus.toLowerCase()}`}>
            {orderStatus}
          </span>
        </div>

        <div className="order-status-controls">
          <label htmlFor="order-status">Update order status</label>

          <div className="order-status-actions">
            <select
              id="order-status"
              value={selectedStatus}
              disabled={["Delivered", "Cancelled"].includes(orderStatus)}
              onChange={(event) => setSelectedStatus(event.target.value)}
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <button
              type="button"
              className="order-update-button"
              onClick={handleStatusUpdate}
              disabled={
                ["Delivered", "Cancelled"].includes(orderStatus) ||
                selectedStatus === orderStatus
              }
            >
              Update Status
            </button>

            {orderStatus === "Processing" && (
              <button
                type="button"
                className="order-cancel-button"
                onClick={handleCancelOrder}
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Customer and shipping information */}
      <div className="order-information-grid">
        <section className="order-information-card">
          <div className="order-section-heading">
            <span className="order-section-icon">👤</span>
            <h2>Customer Information</h2>
          </div>

          <div className="order-information-content">
            <div>
              <span>Full Name</span>
              <strong>{customer.fullName || "Not provided"}</strong>
            </div>

            <div>
              <span>Email Address</span>
              <strong>{customer.email || "Not provided"}</strong>
            </div>

            <div>
              <span>Phone Number</span>
              <strong>{customer.phone || "Not provided"}</strong>
            </div>
          </div>
        </section>

        <section className="order-information-card">
          <div className="order-section-heading">
            <span className="order-section-icon">📍</span>
            <h2>Shipping Address</h2>
          </div>

          <div className="order-information-content">
            <div>
              <span>Street Address</span>
              <strong>{customer.address || "Not provided"}</strong>
            </div>

            <div>
              <span>City</span>
              <strong>{customer.city || "Not provided"}</strong>
            </div>

            <div>
              <span>Postcode</span>
              <strong>{customer.postcode || "Not provided"}</strong>
            </div>

            <div>
              <span>Country</span>
              <strong>{customer.country || "Not provided"}</strong>
            </div>
          </div>
        </section>
      </div>

      {/* Products included in this order */}
      <section className="order-products-section">
        <div className="order-section-heading">
          <span className="order-section-icon">🛍️</span>
          <h2>Products Ordered</h2>
        </div>

        <div className="order-products-list">
          {(order.items || []).map((item) => (
            <div className="order-product-row" key={item.id}>
              <img
                src={item.image}
                alt={item.title}
                className="order-product-image"
              />

              <div className="order-product-info">
                <h3>{item.title}</h3>
                <p>Quantity: {item.quantity}</p>
                <span>{formatPrice(item.price)} each</span>
              </div>

              <strong className="order-product-subtotal">
                {formatPrice(item.price * item.quantity)}
              </strong>
            </div>
          ))}
        </div>
      </section>

      {/* Order payment summary */}
      <section className="order-summary-section">
        <h2>Order Summary</h2>

        <div className="order-summary-row">
          <span>Subtotal</span>
          <strong>{formatPrice(order.subtotal)}</strong>
        </div>

        <div className="order-summary-row">
          <span>Shipping</span>
          <strong>{formatPrice(order.shippingCost)}</strong>
        </div>

        <div className="order-summary-total">
          <span>Total</span>
          <strong>{formatPrice(order.total)}</strong>
        </div>

        <p className="order-summary-note">
          This order was created using the BinodShopZone demo checkout.
        </p>
      </section>

      <div className="order-details-footer">
        <Link to="/orders" className="order-back-button">
          Back to My Orders
        </Link>
      </div>
    </main>
  );
}

export default OrderDetails;