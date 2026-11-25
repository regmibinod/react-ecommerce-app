import { useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../services/orderStorage";
import "../styles/AdminOrders.css";
function AdminOrders() {
  // Retrieve all saved customer orders.
  const [orders] = useState(() => getOrders());

  // Store the search input.
  const [search, setSearch] = useState("");

  // Store the selected order status filter.
  const [statusFilter, setStatusFilter] = useState("All");
  // Track the currently selected page.
  const [currentPage, setCurrentPage] = useState(1);

  // Define how many orders should appear on each page.
  const ordersPerPage = 5;
  // Filter orders based on search input and selected status.
  const filteredOrders = orders.filter((order) => {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm) ||
      order.customer.fullName.toLowerCase().includes(searchTerm);

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  //   Calculate the total number of pages.
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // calculate  the starting and ending positions.
  const startIndex = (currentPage - 1) * ordersPerPage;

  // Retrieve orders from the current page.
  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + ordersPerPage,
  );

 
  return (
    <div className="admin-orders">
      <h1>Manage Orders</h1>

      <p>View and manage all customer orders.</p>

      <div className="order-filters">
        <input
          type="text"
          placeholder="Search by order ID or customer name..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
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

      <p>Showing {filteredOrders.length} orders</p>
      {/* Pagination information */}
      <p>
        Page {currentPage} of {totalPages || 1}
      </p>

      {/* Pagination navigation */}
      <div className="pagination">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
        >
          Previous
        </button>

        <button
          type="button"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
        >
          Next
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <p>No matching orders found.</p>
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
            {currentOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer.fullName}</td>
                <td>{new Date(order.orderDate).toLocaleDateString("en-NZ")}</td>
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

      <Link to="/admin">Back to Dashboard</Link>
    </div>
  );
}

export default AdminOrders;
