import "../styles/productcard.css"

import { CartContext } from "../context/CartContex";
import { useContext } from "react";
function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      <div key={product.id} className="product-card">
        <div className="product-image-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />

          <button className="favorite-btn">❤️</button>
        </div>

        <div className="product-content">
          <span className="product-category">{product.title}</span>

          <h2 className="product-name">{product.name}</h2>

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
