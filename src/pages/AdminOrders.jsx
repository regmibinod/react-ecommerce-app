import { useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../services/orderStorage";
import "../styles/adminorders.css";

// Format prices consistently in New Zealand dollars.
const formatPrice = (amount) =>
  new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
  }).format(Number(amount) || 0);

// Format order dates.
const formatDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-NZ", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function AdminOrders() {
  // Retrieve all saved customer orders.
  const [orders, setOrders] = useState(() => getOrders());

  // Store search and filter values.
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Track the currently selected page.
  const [currentPage, setCurrentPage] = useState(1);

  // Define how many orders appear on each page.
  const ordersPerPage = 5;

  // Refresh orders from LocalStorage.
  const handleRefresh = () => {
    setOrders(getOrders());
    setCurrentPage(1);
  };

  // Clear search and status filters.
  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setCurrentPage(1);
  };

  // Filter orders using the search term and selected status.
  const filteredOrders = orders.filter((order) => {
    const searchTerm = search.toLowerCase().trim();

    const orderId = String(order.id || "").toLowerCase();
    const customerName = String(
      order.customer?.fullName || "",
    ).toLowerCase();

    const matchesSearch =
      orderId.includes(searchTerm) ||
      customerName.includes(searchTerm);

    const matchesStatus =
      statusFilter === "All" ||
      (order.status || "Processing") === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate pagination values.
  const totalPages = Math.ceil(
    filteredOrders.length / ordersPerPage,
  );

  // Keep the current page within valid limits.
  const safeCurrentPage = Math.min(
    currentPage,
    Math.max(totalPages, 1),
  );

  const startIndex = (safeCurrentPage - 1) * ordersPerPage;

  // Retrieve orders belonging to the current page.
  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + ordersPerPage,
  );

  return (
    <main className="admin-orders">
      {/* Page heading */}
      <section className="admin-orders-header">
        <div>
          <span className="admin-orders-eyebrow">
            STORE MANAGEMENT
          </span>

          <h1>Manage Orders</h1>

          <p>
            View, search and manage all customer orders
            from your store.
          </p>
        </div>

        <button
          type="button"
          className="admin-refresh-button"
          onClick={handleRefresh}
        >
          <span aria-hidden="true">↻</span>
          Refresh Orders
        </button>
      </section>

      {/* Search and filtering */}
      <section className="admin-order-toolbar">
        <div className="admin-order-search">
          <label htmlFor="order-search">
            Search Orders
          </label>

          <input
            id="order-search"
            type="search"
            placeholder="Search by order ID or customer name..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="admin-order-filter">
          <label htmlFor="order-status-filter">
            Filter by Status
          </label>

          <select
            id="order-status-filter"
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Orders</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <button
          type="button"
          className="admin-clear-filters"
          onClick={handleClearFilters}
          disabled={search === "" && statusFilter === "All"}
        >
          Clear Filters
        </button>
      </section>

      {/* Order results */}
      <section className="admin-orders-content">
        <div className="admin-orders-results-header">
          <div>
            <h2>All Orders</h2>

            <p>
              {filteredOrders.length}{" "}
              {filteredOrders.length === 1 ? "order" : "orders"} found
            </p>
          </div>

          <span className="admin-orders-count">
            {filteredOrders.length} Total
          </span>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="admin-orders-empty">
            <span className="admin-orders-empty-icon">
              📭
            </span>

            <h3>No matching orders found</h3>

            <p>
              Try changing your search term or selecting
              a different order status.
            </p>

            <button
              type="button"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            {/* Orders table */}
            <div className="admin-orders-table-wrapper">
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
                  {currentOrders.map((order) => {
                    const status = order.status || "Processing";

                    return (
                      <tr key={order.id}>
                        <td className="admin-order-id">
                          {order.id}
                        </td>

                        <td className="admin-order-customer">
                          {order.customer?.fullName || "Unknown Customer"}
                        </td>

                        <td>{formatDate(order.orderDate)}</td>

                        <td className="admin-order-total">
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
                            className="admin-view-order"
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

            {/* Pagination */}
            <div className="admin-orders-pagination">
              <p>
                Showing {startIndex + 1}–
                {Math.min(
                  startIndex + ordersPerPage,
                  filteredOrders.length,
                )}{" "}
                of {filteredOrders.length} orders
              </p>

              <div className="admin-pagination-controls">
                <button
                  type="button"
                  disabled={safeCurrentPage === 1}
                  onClick={() =>
                    setCurrentPage((previous) => previous - 1)
                  }
                >
                  ← Previous
                </button>

                <span>
                  Page {safeCurrentPage} of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={safeCurrentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((previous) => previous + 1)
                  }
                >
                  Next →
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Back to dashboard */}
      <div className="admin-orders-footer">
        <Link to="/admin" className="admin-back-dashboard">
          ← Back to Dashboard
        </Link>
      </div>
    </main>
  );
}

export default AdminOrders;