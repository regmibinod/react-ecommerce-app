import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
function Navbar() {
  return (
    <nav>
      <div className="logo">
        <h2>ABShopZone</h2>
      </div>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/products">Products</NavLink></li>
        <li><NavLink to="/categories">Categories</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
      </ul>

      <div className="nav-icons">
        <NavLink to="/favourites">♡</NavLink>
        <NavLink to="/cart">🛒</NavLink>

      </div>
    </nav>
  );
}

export default Navbar;
