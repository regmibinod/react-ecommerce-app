import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavouriteContext } from "../context/FavouriteContext";
import ProductCard from "../components/ProductCard";
import "../styles/productcard.css";
import "../styles/favourite.css";

function Favourites() {
  const { favourites } = useContext(FavouriteContext);

  // Display an empty state when there are no saved favourites.
  if (favourites.length === 0) {
    return (
      <main className="fav-container">
        <div className="fav-empty">
          <div className="fav-empty-icon">♡</div>

          <h1>Your favourites list is empty</h1>

          <p>
            Save the products you love by clicking the heart icon.
            You can easily find them here whenever you return.
          </p>

          <Link to="/products" className="fav-shop-btn">
            Explore Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="fav-container">
      {/* Page heading and favourites count */}
      <section className="fav-hero">
        <div>
          <span className="fav-eyebrow">YOUR PERSONAL COLLECTION</span>
          <h1 className="fav-title">My Favourites</h1>

          <p className="fav-description">
            Keep track of the products you love and come back to them anytime.
          </p>
        </div>

        <div className="fav-count-card">
          <span className="fav-count-icon">♥</span>

          <div>
            <strong>{favourites.length}</strong>
            <span>
              {favourites.length === 1 ? "Saved item" : "Saved items"}
            </span>
          </div>
        </div>
      </section>

      {/* Display saved products using the reusable ProductCard component */}
      <section className="fav-products-section">
        <div className="fav-section-heading">
          <h2>Your Saved Products</h2>
          <Link to="/products">Continue Shopping →</Link>
        </div>

        <div className="fav-grid">
          {favourites.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Favourites;