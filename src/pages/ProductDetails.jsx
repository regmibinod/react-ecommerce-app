import { Link, useParams } from "react-router-dom";
import { getProductById } from "../services/productApi";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContex";
import "../styles/productdetails.css";

function ProductDetails() {
  // Get the product ID from the URL.
  const { id } = useParams();
  //   getting addToCart function from cartContext API
  const { addToCart } = useContext(CartContext);

  // Store the selected product.
  const [product, setProduct] = useState(null);

  // Track the API Loading status.
  const [loading, setLoading] = useState(true);

  // Store any API Error Message
  const [error, setError] = useState("");

  // Fetch the product details whenever the URL ID changes.
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        setError("Failed to load the product details.");
        console.log("failed to fetch the product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Display Loading message while fetching product
  if (loading) {
    return <p className="pd-status">Loading product details...</p>;
  }
  // Display error message if fetching API fails.
  if (error) {
    return <p className="pd-status pd-error">{error}</p>;
  }
  // Display no product found message if the requested product does not exist
  if (!product) {
    return <p className="pd-status">No product details found.</p>;
  }

  return (
    <div className="product-details">
      <div className="pd-card">
        <div className="pd-image-box">
          <img className="pd-image" src={product.image} alt={product.title} />
        </div>

        <div className="pd-info">
          <span className="pd-category">{product.category}</span>
          <h1 className="pd-title">{product.title}</h1>

          <div className="pd-rating">
            <span className="pd-stars">⭐ {product.rating.rate}</span>
            <span className="pd-reviews">({product.rating.count} reviews)</span>
          </div>

          <p className="pd-price">${product.price}</p>
          <p className="pd-description">{product.description}</p>
          {/* Product purchase and navigation actions. */}
          <div className="pd-actions">
            <button className="cart-btn" onClick={() => addToCart(product)}>
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
