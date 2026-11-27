import { Link } from "react-router-dom";
import { useContext } from "react";

import "../styles/productcard.css";

import { CartContext } from "../context/CartContex";
import { FavouriteContext } from "../context/FavouriteContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { favourites, toggleFavourite } = useContext(FavouriteContext);

  // Check whether this product is already in the user's favourites.
  const isFav = favourites.some((item) => item.id === product.id);

  // Safely handle products that may not have rating information.
  const rating = product.rating?.rate;
  const reviewCount = product.rating?.count;

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <Link to={`/products/${product.id}`} aria-label={`View ${product.title}`}>
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
            loading="lazy"
          />
        </Link>

        {/* Toggle the product's favourite status. */}
        <button
          type="button"
          className={`favorite-btn ${isFav ? "is-favourite" : ""}`}
          onClick={() => toggleFavourite(product)}
          aria-label={
            isFav
              ? `Remove ${product.title} from favourites`
              : `Add ${product.title} to favourites`
          }
          aria-pressed={isFav}
        >
          {isFav ? "❤️" : "♡"}
        </button>
      </div>

      <div className="product-content">
        <span className="product-category">
          {product.category}
        </span>

        <Link
          to={`/products/${product.id}`}
          className="product-title-link"
        >
          <h2 className="product-name">{product.title}</h2>
        </Link>

        {rating !== undefined && (
          <div className="product-rating">
            <span className="rating-stars">★</span>
            <span className="rating-value">{rating}</span>

            <span className="review-count">
              ({reviewCount ?? 0} reviews)
            </span>
          </div>
        )}

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-footer">
          <span className="product-price">
            ${Number(product.price).toFixed(2)}
          </span>

          <button
            type="button"
            className="cart-btn"
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.title} to cart`}
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;