// Retrieve all previously saved orders from LocalStorage

export const getOrders = () => {
  try {
    const savedOrders = localStorage.getItem("orders");

    return savedOrders ? JSON.parse(savedOrders) : [];
  } catch (error) {
    console.log("Failed to retrive orders", error);
    return [];
  }
};

// Save a new order while preserving previous

export const saveOrder = (newOrder) => {
  try {
    const previousOrder = getOrders();
    const updatedOrder = [...previousOrder, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrder));
    return updatedOrder;
  } catch (error) {
    console.log("failed to load save order", error);
    throw error;
  }
};

// Update the status of an existing order.
export const updateOrderStatus = (orderID, newStatus) => {
  try {
    // Define the valid order statuses.
    const validStatuses = ["Processing", "Shipped", "Delivered", "Cancelled"];

    // Prevent invalid status values.
    if (!validStatuses.includes(newStatus)) {
      throw new Error("Invalid order status.");
    }

    // Retrieve all existing orders.
    const orders = getOrders();

    // Check whether the requested order exists.
    const orderExists = orders.some((order) => order.id === orderID);
    // Find the existing order.
    const existingOrder = orders.find((order) => order.id === orderID);

    // Define permitted status transitions.
    const allowedTransitions = {
      Processing: ["Shipped", "Cancelled"],
      Shipped: ["Delivered"],
      Delivered: [],
      Cancelled: [],
    };

    // Prevent invalid status transitions.
    if (
      existingOrder.status !== newStatus &&
      !allowedTransitions[existingOrder.status].includes(newStatus)
    ) {
      throw new Error(
        `Cannot change status from ${existingOrder.status} to ${newStatus}.`,
      );
    }
    if (!orderExists) {
      throw new Error("Order not found.");
    }
    //

    // Update only the matching order.
    const updatedOrders = orders.map((order) =>
      order.id === orderID ? { ...order, status: newStatus } : order,
    );

    // Save updated orders to LocalStorage.
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // Return the updated orders.
    return updatedOrders;
  } catch (error) {
    console.error("Failed to update order status:", error);
    throw error;
  }
};
