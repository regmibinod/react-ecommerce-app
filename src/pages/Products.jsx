import { useState, useEffect } from "react";
import { getProducts } from "../services/productApi";
import "../styles/product.css";
import ProductCard from "../componesnts/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
