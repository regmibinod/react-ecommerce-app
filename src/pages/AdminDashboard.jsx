import { useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../services/orderStorage";
import "../styles/admindashboard.css";

// Format all monetary values consistently in NZD.
const formatPrice = (amount) =>
  new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
  }).format(Number(amount) || 0);

// Format order dates for New Zealand.
const formatDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-NZ", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function AdminDashboard() {
  // Retrieve saved orders from LocalStorage.
  const [orders, setOrders] = useState(() => getOrders());

  // Refresh dashboard data from LocalStorage.
  const handleRefresh = () => {
    setOrders(getOrders());
  };

  // Calculate the total number of orders.
  const totalOrders = orders.length;

  // Exclude cancelled orders from revenue calculations.
  const revenueOrders = orders.filter((order) => order.status !== "Cancelled");

  const totalRevenue = revenueOrders.reduce(
    (total, order) => total + (Number(order.total) || 0),
    0,
  );

  // Calculate the average order value.
  const averageOrderValue =
    revenueOrders.length > 0 ? totalRevenue / revenueOrders.length : 0;

  // Calculate revenue for each order status.
  const processingRevenue = orders
    .filter((order) => order.status === "Processing")
    .reduce((total, order) => total + (Number(order.total) || 0), 0);

  const shippedRevenue = orders
    .filter((order) => order.status === "Shipped")
    .reduce((total, order) => total + (Number(order.total) || 0), 0);

  const deliveredRevenue = orders
    .filter((order) => order.status === "Delivered")
    .reduce((total, order) => total + (Number(order.total) || 0), 0);

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

  // Retrieve the five most recent orders.
  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime(),
    )
    .slice(0, 5);

  return (
    <main className="admin-dashboard">
      {/* Dashboard heading */}
      <section className="admin-dashboard-header">
        <div>
          <span className="admin-eyebrow">STORE MANAGEMENT</span>

          <h1>Admin Dashboard</h1>

          <p>Welcome to your BinodShopZone administration panel.</p>
        </div>

        <button
          type="button"
          className="dashboard-refresh-button"
          onClick={handleRefresh}
        >
          <span aria-hidden="true">↻</span> Refresh Dashboard
        </button>
      </section>

      {/* Main dashboard statistics */}
      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <h2>Store Overview</h2>
            <p>A quick overview of your store performance.</p>
          </div>
        </div>

        <div className="dashboard-stats">
          <article className="stat-card stat-orders">
            <div className="stat-card-icon">📦</div>
            <h3>Total Orders</h3>
            <p>{totalOrders}</p>
            <span>All customer orders</span>
          </article>

          <article className="stat-card stat-revenue">
            <div className="stat-card-icon">💰</div>
            <h3>Total Revenue</h3>
            <p>{formatPrice(totalRevenue)}</p>
            <span>Excluding cancelled orders</span>
          </article>

          <article className="stat-card stat-average">
            <div className="stat-card-icon">📊</div>
            <h3>Average Order Value</h3>
            <p>{formatPrice(averageOrderValue)}</p>
            <span>Per active order</span>
          </article>

          <article className="stat-card stat-processing">
            <div className="stat-card-icon">⏳</div>
            <h3>Processing Orders</h3>
            <p>{processingOrders}</p>
            <span>Awaiting fulfilment</span>
          </article>

          <article className="stat-card stat-shipped">
            <div className="stat-card-icon">🚚</div>
            <h3>Shipped Orders</h3>
            <p>{shippedOrders}</p>
            <span>On their way</span>
          </article>

          <article className="stat-card stat-delivered">
            <div className="stat-card-icon">✅</div>
            <h3>Delivered Orders</h3>
            <p>{deliveredOrders}</p>
            <span>Successfully delivered</span>
          </article>

          <article className="stat-card stat-cancelled">
            <div className="stat-card-icon">❌</div>
            <h3>Cancelled Orders</h3>
            <p>{cancelledOrders}</p>
            <span>Cancelled transactions</span>
          </article>
        </div>
      </section>

      {/* Revenue breakdown */}
      <section className="revenue-breakdown">
        <div className="dashboard-section-heading">
          <div>
            <h2>Revenue Breakdown</h2>
            <p>Revenue grouped by current order status.</p>
          </div>
        </div>

        <div className="revenue-grid">
          <article className="revenue-card">
            <span className="revenue-indicator processing-indicator"></span>
            <div>
              <h3>Processing Revenue</h3>
              <p>{formatPrice(processingRevenue)}</p>
            </div>
          </article>

          <article className="revenue-card">
            <span className="revenue-indicator shipped-indicator"></span>
            <div>
              <h3>Shipped Revenue</h3>
              <p>{formatPrice(shippedRevenue)}</p>
            </div>
          </article>

          <article className="revenue-card">
            <span className="revenue-indicator delivered-indicator"></span>
            <div>
              <h3>Delivered Revenue</h3>
              <p>{formatPrice(deliveredRevenue)}</p>
            </div>
          </article>
        </div>
      </section>

      {/* Recent customer orders */}
      <section className="recent-orders">
        <div className="recent-orders-header">
          <div>
            <h2>Recent Orders</h2>
            <p>View the latest customer orders placed in your store.</p>
          </div>

          <Link to="/admin/orders" className="view-all-orders">
            View All Orders →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="dashboard-empty-state">
            <span>📭</span>
            <h3>No orders yet</h3>
            <p>Customer orders will appear here when they are placed.</p>
          </div>
        ) : (
          <div className="recent-orders-table-wrapper">
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
                {recentOrders.map((order) => {
                  const status = order.status || "Processing";

                  return (
                    <tr key={order.id}>
                      <td className="order-id-cell">{order.id}</td>

                      <td className="customer-name-cell">
                        {order.customer?.fullName || "Unknown Customer"}
                      </td>

                      <td>{formatDate(order.orderDate)}</td>

                      <td className="order-total-cell">
                        {formatPrice(order.total)}
                      </td>

                      <td>
                        <span
                          className={`status status-${status.toLowerCase()}`}
                        >
                          {status}
                        </span>
                      </td>

                      <td>
                        <Link
                          to={`/orders/${order.id}`}
                          className="view-order-link"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="manage-orders-footer">
          <Link to="/admin/orders" className="manage-orders-button">
            Manage All Orders
          </Link>

          <Link to="/admin/products" className="manage-orders-button">
            Manage Products
          </Link>
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;
