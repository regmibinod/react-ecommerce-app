import { Link, useParams } from "react-router-dom";
import { getProductById } from "../services/productApi";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContex";
import "../styles/productdetails.css";

function ProductDetails() {
  // Get the product ID from the URL.
  const { id } = useParams();

  // Get the addToCart function from CartContext.
  const { addToCart } = useContext(CartContext);

  // Store product information and page status.
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Track the quantity selected by the customer.
  const [quantity, setQuantity] = useState(1);

  // Fetch product details whenever the URL ID changes.
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        setProduct(null);
        setQuantity(1);

        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        setError("Failed to load the product details.");
        console.error("Failed to fetch the product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Increase the selected quantity.
  const increaseQuantity = () => {
    setQuantity((previous) => previous + 1);
  };

  // Prevent the quantity from going below one.
  const decreaseQuantity = () => {
    setQuantity((previous) => Math.max(1, previous - 1));
  };

  // Add the selected quantity to the shopping cart.
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  // Display loading status.
  if (loading) {
    return <p className="pd-status">Loading product details...</p>;
  }

  // Display API error.
  if (error) {
    return <p className="pd-status pd-error">{error}</p>;
  }

  // Display a message when the product does not exist.
  if (!product) {
    return <p className="pd-status">No product details found.</p>;
  }

  return (
    <div className="product-details">
      <div className="pd-card">
        {/* Product image */}
        <div className="pd-image-box">
          <img
            className="pd-image"
            src={product.image}
            alt={product.title}
          />
        </div>

        {/* Product information */}
        <div className="pd-info">
          <span className="pd-category">{product.category}</span>

          <h1 className="pd-title">{product.title}</h1>

          {/* Display rating only when available. */}
          {product.rating && (
            <div className="pd-rating">
              <span className="pd-stars">
                ⭐ {product.rating.rate}
              </span>

              <span className="pd-reviews">
                ({product.rating.count} reviews)
              </span>
            </div>
          )}

          <p className="pd-price">
            ${Number(product.price).toFixed(2)}
          </p>

          <p className="pd-description">{product.description}</p>

          {/* Quantity selection */}
          <div className="pd-quantity-section">
            <span className="pd-quantity-label">Quantity:</span>

            <div className="pd-quantity-control">
              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity === 1}
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span aria-live="polite">{quantity}</span>

              <button
                type="button"
                onClick={increaseQuantity}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Purchase and navigation actions */}
          <div className="pd-actions">
            <button
              type="button"
              className="cart-btn"
              onClick={handleAddToCart}
            >
              🛒 Add to Cart
            </button>

            <Link to="/products" className="pd-back-btn">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;