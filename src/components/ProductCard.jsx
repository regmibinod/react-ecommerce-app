import { Link } from "react-router-dom";
import "../styles/productcard.css";
import { CartContext } from "../context/CartContex";
import { FavouriteContext } from "../context/FavouriteContext";
import { useContext } from "react";
function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { favourites, toggleFavourite } = useContext(FavouriteContext);
  const isFav = favourites.some((item) => item.id === product.id);
  return (
    <div>
      <div className="product-card">
        <div className="product-image-wrapper">
          <Link to={`/products/${product.id}`}>
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
          </Link>

          {/* Toggle the product's favourite status. */}
          <button
            type="button"
            className="favorite-btn"
            onClick={() => toggleFavourite(product)}
            aria-label={
              isFav
                ? `Remove ${product.title} from favourites`
                : `Add ${product.title} to favourites`
            }
            aria-pressed={isFav}
          >
            {isFav ? "❤️" : "🤍"}
          </button>
        </div>

        <div className="product-content">
          <span className="product-category">{product.category}</span>

          <Link to={`/products/${product.id}`}>
            <h2 className="product-name">{product.title}</h2>
          </Link>

          <div className="product-rating">
            ⭐ {product.rating.rate}
            <span className="review-count">
              ({product.rating.count} Reviews)
            </span>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-footer">
            <span className="product-price">${product.price}</span>

            <button className="cart-btn" onClick={() => addToCart(product)}>
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
