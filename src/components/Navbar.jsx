import { NavLink } from "react-router-dom";
import { useContext } from "react";
import "../styles/navbar.css";
import { CartContext } from "../context/CartContex";
import { FavouriteContext } from "../context/FavouriteContext";

function Navbar() {
  const { cart } = useContext(CartContext);
  const { favourites } = useContext(FavouriteContext);

  // calculate the total number of items in the cart
  const totalCartItems = cart.reduce(
    (acc, current) => acc + current.quantity,
    0,
  );

  // total number of favourites products
  const totalNumberOfFavourites = favourites.length;

  return (
    <nav>
      {/* Website logo */}
      <div className="logo">
        <h2>ABShopZone</h2>
      </div>
      {/* Main navigation links */}
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/products">Products</NavLink>
        </li>
        <li>
          <NavLink to="/categories">Categories</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/orders">My Orders</NavLink>
        </li>
      </ul>
      {/* Favourite and shopping cart icons */}
      <div className="nav-icons">
        <NavLink to="/favourites">
          {totalNumberOfFavourites >= 1 ? "❤️" : "♡"}{" "}
          {totalNumberOfFavourites > 0 && (
            <span>{totalNumberOfFavourites}</span>
          )}
        </NavLink>
        <NavLink to="/cart">
          🛒 {totalCartItems > 0 && <span>{totalCartItems}</span>}
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
