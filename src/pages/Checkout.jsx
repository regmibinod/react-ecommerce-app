import { useState } from "react";
import "../styles/checkout.css";
import countries from "../data/countries";
import OrderSummary from "../components/OrderSummary";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContex";
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

  // Access the cart information and access the function to clear cart

  const { cart, clearCart } = useContext(CartContext);

  // Allow navigation to the order confirmation page.

  const navigate = useNavigate();

  // Update corresponding field whenever the customer types.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prevCustomer) => ({ ...prevCustomer, [name]: value }));
  };

  //   Validate the form before allowing checkout to continue.
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

    // Create an order object containing customer and product information.
    const order = {
      id: `ORD-${Date.now()}`,
      customer: { ...customer },
      items: [...cart],
      subtotal,
      shippingCost,
      total,
      orderDate: new Date().toISOString(),
    };

    // Clear the cart after creating the order.
    clearCart();

    // Navigate to confirmation and pass the order information.
    navigate("/orderconfirmation", {
      state: { order },
    });
  };
  // End of handle submit function

  // Redirect customers to shopping if their cart is empty.
  if (cart.length === 0) {
    return (
      <div>
        <h1>Your cart is empty</h1>
        <p>Add some products before checking out.</p>
        <Link to="/products">Browse Products</Link>
      </div>
    );
  }
  return (
    <div className="checkout-container">
      <h1>Checkout Page</h1>
      <p>Complete your information to place your order.</p>
      <form onSubmit={handleSubmit}>
        <div className="customer-information">
          <div>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={customer.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              value={customer.email}
              placeholder="Enter your email"
              id="email"
              onChange={handleChange}
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
            />
          </div>
        </div>
        {/* Shipping Information */}
        <div className="shipping-info">
          <h2>Shipping Information</h2>
          <div>
            <label htmlFor="address">Street Address</label>
            <input
              type="text"
              name="address"
              value={customer.address}
              onChange={handleChange}
              id="address"
              placeholder="Enter your street address"
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
              placeholder="Enter your city."
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
              placeholder="Enter your postcode."
            />
          </div>
          {/* <div>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={customer.country}
              onChange={handleChange}
              placeholder="Enter your country."
            />
          </div> */}
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
            />

            <datalist id="country-list">
              {countries.map((country) => (
                <option key={country} value={country} />
              ))}
            </datalist>
          </div>
        </div>

        <button type="submit">Place Order</button>
      </form>
      <OrderSummary />
    </div>
  );
}

export default Checkout;
