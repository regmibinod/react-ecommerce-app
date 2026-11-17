import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavouriteContext } from "../context/FavouriteContext";
import ProductCard from "../components/ProductCard";
import "../styles/productcard.css"; // ProductCard styles live here
import "../styles/favourite.css";

function Favourites() {
  const { favourites } = useContext(FavouriteContext);

  // Empty state
  if (favourites.length === 0) {
    return (
      <div className="fav-container">
        <div className="fav-empty">
          <span className="fav-empty-icon">🤍</span>
          <h2>No favourites yet</h2>
          <p>Tap the heart on any product to save it here.</p>
          <Link to="/products" className="fav-shop-btn">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fav-container">
      <div className="fav-header">
        <h1 className="fav-title">❤️ My Favourites</h1>
        <span className="fav-count">
          {favourites.length} {favourites.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="fav-grid">
        {favourites.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}

export default Favourites;