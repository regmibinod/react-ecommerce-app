import { NavLink } from "react-router-dom";
import { useContext } from "react";
import "../styles/navbar.css";
import {CartContext} from "../context/CartContex";
function Navbar() {
  const {cart} = useContext(CartContext);

  // calculate the total number of items in the cart
  const totalCartItems = cart.reduce((acc, current)=>acc + current.quantity, 0);

  return (
    <nav>
      {/* Website logo */}
      <div className="logo">
        <h2>ABShopZone</h2>
      </div>
      {/* Main navigation links */}
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/products">Products</NavLink></li>
        <li><NavLink to="/categories">Categories</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
      </ul>
{/* Favourite and shopping cart icons */}
      <div className="nav-icons">
        <NavLink to="/favourites">♡</NavLink>
        <NavLink to="/cart">🛒 <span className="total-cart-items">{totalCartItems}</span></NavLink>

      </div>
    </nav>
  );
}

export default Navbar;
