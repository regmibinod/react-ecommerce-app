import { useState, useEffect } from "react";
import { getProducts } from "../services/productApi";
import "../styles/products.css";
import ProductCard from "../componesnts/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log("Failed to load products", error);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on the user's search input.

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return <p className="Loading Products">Products Loading............... </p>;
  }
  if (error) {
    return <p className="error-loading">{error}</p>;
  }

  return (
    <div className="products-container">
      <h1 className="page-title">Our Products</h1>
      <p className="page-subtitle">Explore our latest products.</p>

      <div className="search-container">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="products-grid">
        {/* Display a product or an empty state message */}
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No Products found. Try a different search.</p>
        )}
      </div>
    </div>
  );
}

export default Products;
