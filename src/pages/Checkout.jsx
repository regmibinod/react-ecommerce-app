
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import "../styles/checkout.css";
import countries from "../data/countries";
import OrderSummary from "../components/OrderSummary";

import { CartContext } from "../context/CartContex";
import { saveOrder } from "../services/orderStorage";

function Checkout() {
  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    country: "",
  });

  // Access cart information and the function to clear the cart.
  const { cart, clearCart } = useContext(CartContext);

  // Allow navigation to the order confirmation page.
  const navigate = useNavigate();

  // Update the corresponding customer field whenever the user types.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  // Validate the form and create a new order.
  const handleSubmit = (event) => {
    event.preventDefault();

    // Prevent customers from placing an order with an empty cart.
    if (cart.length === 0) {
      return;
    }

    // Calculate the order subtotal.
    const subtotal = cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    // Calculate shipping and the final order total.
    const shippingCost = 20;
    const total = subtotal + shippingCost;

    // Create an order containing customer and product information.
    const order = {
      id: `ORD-${Date.now()}`,
      customer: { ...customer },
      items: [...cart],
      subtotal,
      shippingCost,
      total,
      status: "Processing",
      orderDate: new Date().toISOString(),
    };

    // Save the order using our reusable storage service.
    saveOrder(order);

    // Clear the cart after successfully creating the order.
    clearCart();

    // Navigate to the confirmation page with the order information.
    navigate("/orderconfirmation", {
      state: { order },
    });
  };

  // Redirect customers to the products page if their cart is empty.
  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="checkout-empty-icon">🛒</div>

        <h1>Your cart is empty</h1>

        <p>
          You need to add some products before proceeding to checkout.
        </p>

        <Link to="/products" className="checkout-empty-button">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Secure Checkout</h1>

      <p className="checkout-description">
        Complete your information below to place your order.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Customer contact information */}
        <section className="customer-information">
          <h2>Contact Information</h2>

          <div>
            <label htmlFor="fullName">Full Name</label>

            <input
              type="text"
              id="fullName"
              name="fullName"
              value={customer.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email Address</label>

            <input
              type="email"
              id="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="phone">Phone Number</label>

            <input
              type="tel"
              id="phone"
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              autoComplete="tel"
              required
            />
          </div>
        </section>

        {/* Customer shipping information */}
        <section className="shipping-info">
          <h2>Shipping Information</h2>

          <div>
            <label htmlFor="address">Street Address</label>

            <input
              type="text"
              id="address"
              name="address"
              value={customer.address}
              onChange={handleChange}
              placeholder="Enter your street address"
              autoComplete="street-address"
              required
            />
          </div>

          <div>
            <label htmlFor="city">City</label>

            <input
              type="text"
              id="city"
              name="city"
              value={customer.city}
              onChange={handleChange}
              placeholder="Enter your city"
              autoComplete="address-level2"
              required
            />
          </div>

          <div>
            <label htmlFor="postcode">Postcode</label>

            <input
              type="text"
              id="postcode"
              name="postcode"
              value={customer.postcode}
              onChange={handleChange}
              placeholder="Enter your postcode"
              autoComplete="postal-code"
              required
            />
          </div>

          <div>
            <label htmlFor="country">Country</label>

            <input
              type="text"
              id="country"
              name="country"
              value={customer.country}
              onChange={handleChange}
              placeholder="Start typing your country..."
              list="country-list"
              autoComplete="country-name"
              required
            />

            <datalist id="country-list">
              {countries.map((country) => (
                <option key={country} value={country} />
              ))}
            </datalist>
          </div>
        </section>

        <button type="submit" className="checkout-submit-button">
          Place Order
        </button>
      </form>

      {/* Display the customer's order details and total. */}
      <OrderSummary />
    </div>
  );
}

export default Checkout;
