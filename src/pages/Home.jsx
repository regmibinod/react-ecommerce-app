import { Link } from "react-router-dom";
import Products from "./Products";
import "../styles/home.css";

function Home() {
  return (
    <div className="home-page">
      {/* Hero section */}
      <section className="home-hero">
        <div className="hero-content">
          <span className="hero-label">WELCOME TO BinodShopZone</span>

          <h1>
            Discover Products
            <span> You'll Love.</span>
          </h1>

          <p>
            Explore our collection of products and discover something
            special for yourself. Shopping made simple, convenient
            and enjoyable.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="hero-btn primary-btn">
              Shop Now
            </Link>

            <Link to="/categories" className="hero-btn secondary-btn">
              Explore Categories
            </Link>
          </div>
        </div>

        <div className="hero-decoration">
          <div className="hero-circle">
            <span>🛍️</span>
          </div>

          <div className="hero-small-circle">✨</div>
        </div>
      </section>

      {/* Shopping benefits */}
      <section className="home-benefits">
        <div className="benefit-item">
          <span>🚚</span>
          <div>
            <h3>Convenient Shopping</h3>
            <p>Browse products with ease.</p>
          </div>
        </div>

        <div className="benefit-item">
          <span>🔒</span>
          <div>
            <h3>Simple Checkout</h3>
            <p>Enjoy a straightforward checkout experience.</p>
          </div>
        </div>

        <div className="benefit-item">
          <span>💳</span>
          <div>
            <h3>Easy Ordering</h3>
            <p>Manage your shopping cart effortlessly.</p>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="home-products">
        <div className="home-section-heading">
          <span>OUR COLLECTION</span>
          <h2>Explore Our Products</h2>
          <p>Find something that matches your style and needs.</p>
        </div>

        <Products />
      </section>
    </div>
  );
}

export default Home;