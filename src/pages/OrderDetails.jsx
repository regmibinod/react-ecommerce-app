import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/orderdetails.css";
import { getOrders, updateOrderStatus } from "../services/orderStorage";
function OrderDetails() {
  // Retrieve the order ID from the URL.
  const { id } = useParams();

  // Retrieve the requested order from saved orders.

  const [order, setOrder] = useState(() =>
    getOrders().find((item) => item.id === id),
  );

  // Store the status selected in the dropdown
  const [selectedStatus, setSelectedStatus] = useState(
    order?.status || "Processing",
  );
  // Update the order status and handle possible errors.
  const handleStatusUpdate = () => {
    try {
      // Save the updated status to LocalStorage.
      updateOrderStatus(order.id, selectedStatus);

      // Update the React state.
      setOrder((prevOrder) => ({
        ...prevOrder,
        status: selectedStatus,
      }));

      alert("Order status updated successfully!");
    } catch (error) {
      // Display a helpful message if the status update fails.
      alert(error.message);

      // Restore the dropdown to the actual order status.
      setSelectedStatus(order.status);
    }
  };

  // Allow customers to cancel orders that are still Processing.
  const handleCancelOrder = () => {
    // Prevent cancellation if the order is no longer Processing.
    if (order.status !== "Processing") {
      alert("Only Processing orders can be cancelled.");
      return;
    }

    // Ask the customer to confirm cancellation.
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmCancel) return;

    try {
      // Update the order status in LocalStorage.
      updateOrderStatus(order.id, "Cancelled");

      // Update the React state.
      setOrder((prevOrder) => ({
        ...prevOrder,
        status: "Cancelled",
      }));

      // Synchronise the dropdown.
      setSelectedStatus("Cancelled");

      alert("Your order has been cancelled successfully!");
    } catch (error) {
      // Handle any errors during cancellation.
      alert(error.message);
    }
  };

  // Handle cases where the requested order does not exist.
  if (!order) {
    return (
      <div>
        <h1>Order not found</h1>
        <Link to="/orders">Back to My Orders</Link>
      </div>
    );
  }

  const orderDate = new Date(order.orderDate).toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="order-details">
      <h1>Order Details</h1>

      <h2>Order #{order.id}</h2>

      <p>Order Date: {orderDate}</p>
      <div className="order-status-management">
        <h3>Order Status</h3>

        <p>
          Current Status:{" "}
          <span
            className={`status status-${(order.status || "Processing").toLowerCase()}`}
          >
            {order.status || "Processing"}
          </span>
        </p>

        <select
          value={selectedStatus}
          disabled={["Delivered", "Cancelled"].includes(order.status)}
          onChange={(event) => setSelectedStatus(event.target.value)}
        >
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button type="button" onClick={handleStatusUpdate}>
          Update Status
        </button>
        {order.status === "Processing" && (
          <button type="button" onClick={handleCancelOrder}>
            Cancel Order
          </button>
        )}
      </div>
      <h3>Customer Information</h3>

      <p>Name: {order.customer.fullName}</p>
      <p>Email: {order.customer.email}</p>
      <p>Phone: {order.customer.phone}</p>

      <h3>Shipping Address</h3>

      <p>{order.customer.address}</p>
      <p>{order.customer.city}</p>
      <p>{order.customer.postcode}</p>
      <p>{order.customer.country}</p>

      <h3>Products Ordered</h3>

      {order.items.map((item) => (
        <div key={item.id}>
          <img src={item.image} alt={item.title} width="80" />

          <p>{item.title}</p>
          <p>Price: ${item.price.toFixed(2)}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}

      <hr />

      <p>Subtotal: ${order.subtotal.toFixed(2)}</p>
      <p>Shipping: ${order.shippingCost.toFixed(2)}</p>

      <h2>Total: ${order.total.toFixed(2)} USD</h2>

      <Link to="/orders">Back to My Orders</Link>
    </div>
  );
}

export default OrderDetails;
