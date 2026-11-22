import { useState, useEffect } from "react";
import "../styles/home.css";

function Home() {
  const [customer, setCutomer] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCutomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h1>Welcome to ShopZone</h1>
      <p>Discover amazing products at great prices.</p>

      <div className="display">
        <h2>This is a test check out page</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            name="FullName"
            id="fullName"
            onChange={handleChange}
            value={customer.fullName}
            placeholder="Please enter a full name"
          />
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={customer.email}
            placeholder="please enter email"
            onChange={handleChange}
          />
          <label htmlFor="phone">phone: </label>
          <input
            type="tel"
            id="phone"
            placeholder="enter a phone numer"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
          />
          <button type="submit">Place a onder</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
