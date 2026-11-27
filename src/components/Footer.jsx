import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Brand information */}
        <div className="footer-brand">
          <h2>BinodShopZone</h2>

          <p>
            Discover great products and enjoy a simple, convenient
            online shopping experience.
          </p>
        </div>

        {/* Quick navigation links */}
        <div className="footer-links">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/about">About Us</Link>
        </div>

        {/* Customer links */}
        <div className="footer-links">
          <h3>Customer Area</h3>

          <Link to="/orders">My Orders</Link>
          <Link to="/cart">Shopping Cart</Link>
          <Link to="/favourites">My Favourites</Link>
        </div>

        {/* Project information */}
        <div className="footer-project">
          <h3>Project Information</h3>

          <p>
            A React-based e-commerce application built to demonstrate
            modern front-end development skills.
          </p>

          <a
            href="https://github.com/regmibinod/react-ecommerce-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub ↗
          </a>
        </div>
      </div>

      {/* Copyright section */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} BinodShopZone. All rights reserved.
        </p>

        <p>Built with React.js ❤️</p>
      </div>
    </footer>
  );
}

export default Footer;