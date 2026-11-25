import { useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../services/orderStorage";
import "../styles/admindashboard.css";
function AdminDashboard() {
  // Retrieve saved orders from LocalStorage.
 // Store orders in React state.
const [orders, setOrders] = useState(() => getOrders());

  // Calculate the total number of orders.
  const totalOrders = orders.length;
// Refresh dashboard data from LocalStorage.
const handleRefresh = () => {
  const latestOrders = getOrders();

  setOrders(latestOrders);
};
  //   Retrieve the five most recent orders.

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
    .slice(0, 5);

  // Calculate revenue, excluding cancelled orders.
  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((total, order) => total + order.total, 0);
  // Calculate the number of orders that contribute to revenue.
  const revenueOrders = orders.filter((order) => order.status !== "Cancelled");

  // Calculate the average order value.
  const averageOrderValue =
    revenueOrders.length > 0 ? totalRevenue / revenueOrders.length : 0;

  // Calculate revenue from Processing orders.
  const processingRevenue = orders
    .filter((order) => order.status === "Processing")
    .reduce((total, order) => total + order.total, 0);

  // Calculate revenue from Shipped orders.
  const shippedRevenue = orders
    .filter((order) => order.status === "Shipped")
    .reduce((total, order) => total + order.total, 0);

  // Calculate revenue from Delivered orders.
  const deliveredRevenue = orders
    .filter((order) => order.status === "Delivered")
    .reduce((total, order) => total + order.total, 0);

  // Count orders based on their current status.
  const processingOrders = orders.filter(
    (order) => order.status === "Processing",
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.status === "Shipped",
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered",
  ).length;
  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled",
  ).length;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
<button type="button" onClick={handleRefresh}>
  Refresh Dashboard
</button>
      <p>Welcome to your ABShopZone administration panel.</p>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>

        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>${totalRevenue.toFixed(2)} USD</p>
        </div>

        <div className="stat-card">
          <h3>Processing Orders</h3>
          <p>{processingOrders}</p>
        </div>

        <div className="stat-card">
          <h3>Shipped Orders</h3>
          <p>{shippedOrders}</p>
        </div>

        <div className="stat-card">
          <h3>Delivered Orders</h3>
          <p>{deliveredOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Cancelled Orders</h3>
          <p>{cancelledOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Average Order Value</h3>
          <p>${averageOrderValue.toFixed(2)} USD</p>
        </div>
        {/* Revenue breakdown by order status */}
        <div className="revenue-breakdown">
          <h2>Revenue Breakdown</h2>

          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Processing Revenue</h3>
              <p>${processingRevenue.toFixed(2)} USD</p>
            </div>

            <div className="stat-card">
              <h3>Shipped Revenue</h3>
              <p>${shippedRevenue.toFixed(2)} USD</p>
            </div>

            <div className="stat-card">
              <h3>Delivered Revenue</h3>
              <p>${deliveredRevenue.toFixed(2)} USD</p>
            </div>
          </div>
        </div>
      </div>
      {/* Display the five most recent customer orders. */}
      <div className="recent-orders">
        <h2>Recent Orders</h2>

        {recentOrders.length === 0 ? (
          <p>No orders have been placed yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer.fullName}</td>
                  <td>
                    {new Date(order.orderDate).toLocaleDateString("en-NZ")}
                  </td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>
                    <span
                      className={`status status-${(order.status || "Processing").toLowerCase()}`}
                    >
                      {order.status || "Processing"}
                    </span>
                  </td>
                  <td>
                    <Link to={`/orders/${order.id}`}>View Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Link to="/admin/orders">Manage All Orders</Link>
    </div>
  );
}

export default AdminDashboard;
