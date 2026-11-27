import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import "../styles/navbar.css";
import { CartContext } from "../context/CartContex";
import { FavouriteContext } from "../context/FavouriteContext";

function Navbar() {
  const { cart } = useContext(CartContext);
  const { favourites } = useContext(FavouriteContext);

  // Track whether the mobile navigation menu is open.
  const [menuOpen, setMenuOpen] = useState(false);

  // Calculate the total number of items in the cart.
  const totalCartItems = cart.reduce(
    (acc, current) => acc + current.quantity,
    0,
  );

  // Calculate the total number of favourite products.
  const totalNumberOfFavourites = favourites.length;

  // Close the mobile menu after selecting a navigation link.
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="main-navbar">
      {/* Website logo */}
      <div className="logo">
        <h2>BinodShopZone</h2>
      </div>

      {/* Main navigation links */}
      <ul className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
        <li>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/products" onClick={closeMenu}>
            Products
          </NavLink>
        </li>

        <li>
          <NavLink to="/categories" onClick={closeMenu}>
            Categories
          </NavLink>
        </li>

        <li>
          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>
        </li>

        <li>
          <NavLink to="/orders" onClick={closeMenu}>
            My Orders
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin" onClick={closeMenu}>
            Admin Demo
          </NavLink>
        </li>
      </ul>

      {/* Favourite and shopping cart icons */}
      <div className="nav-icons">
        <NavLink to="/favourites" aria-label="Favourites">
          {totalNumberOfFavourites >= 1 ? "❤️" : "♡"}

          {totalNumberOfFavourites > 0 && (
            <span>{totalNumberOfFavourites}</span>
          )}
        </NavLink>

        <NavLink to="/cart" aria-label="Shopping cart">
          🛒

          {totalCartItems > 0 && <span>{totalCartItems}</span>}
        </NavLink>
      </div>

      {/* Mobile hamburger menu button */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen((previous) => !previous)}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? "✕" : "☰"}
      </button>
    </nav>
  );
}

export default Navbar;