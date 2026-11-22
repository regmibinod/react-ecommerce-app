import { useContext } from "react";
import { CartContext } from "../context/CartContex";
import "../styles/ordersummary.css";
function OrderSummary() {
  // Access cart products from CartContext
  const { cart } = useContext(CartContext);
  // Calculate the  total price of all cart products.
  const subTotal = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  // used a fixed shipping cost for our checkout demonstration.

  const shippingCost = 20;

  // Calculate the final order total.

  const total = subTotal + shippingCost;

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>

      {/* Display each product included in the order. */}
      <div className="order-items">
        {cart.map((item) => (
          <div className="order-item" key={item.id}>
            <img src={item.image} alt={item.title} />

            <div>
              <h3>{item.title}</h3>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Display the order cost breakdown. */}
      <div className="order-totals">
        <p>
          <span>Subtotal</span>
          <span>${subTotal.toFixed(2)}</span>
        </p>
        <p>
          <span>Shipping</span>
          <span>${shippingCost.toFixed(2)}</span>
        </p>
        <h3>Total: ${total.toFixed(2)} NZD</h3>
      </div>
    </div>
  );
}

export default OrderSummary;
