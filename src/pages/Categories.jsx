import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productApi";
import "../styles/categories.css";

function Categories() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products to calculate the number of products in each category.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
        setError("Unable to load categories. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Connect the display names to the exact category values used by the API.
  const categoriesList = [
    {
      name: "Jewellery",
      value: "jewelery",
      description:
        "Discover elegant rings, necklaces, bracelets, and accessories for every occasion.",
      icon: "💎",
    },
    {
      name: "Men's Clothing",
      value: "men's clothing",
      description:
        "Explore stylish shirts, jackets, jeans, and fashion essentials for men.",
      icon: "👔",
    },
    {
      name: "Electronics",
      value: "electronics",
      description:
        "Browse the latest gadgets, smartphones, laptops, and electronic accessories.",
      icon: "💻",
    },
    {
      name: "Women's Clothing",
      value: "women's clothing",
      description:
        "Find trendy dresses, tops, footwear, and fashion collections for women.",
      icon: "👗",
    },
  ];

  if (loading) {
    return <p className="loading">Loading categories...</p>;
  }

  if (error) {
    return <p className="error-loading">{error}</p>;
  }

  return (
    <div className="category-container">
      <div className="category-heading">
        <span>EXPLORE OUR COLLECTION</span>
        <h1>Shop by Category</h1>
        <p>Discover something special from our range of collections.</p>
      </div>

      <div className="category-grid">
        {categoriesList.map((category) => {
          // Calculate how many products belong to this category.
          const productCount = products.filter(
            (product) => product.category === category.value,
          ).length;

          return (
            <Link
              to={`/products?category=${encodeURIComponent(category.value)}`}
              className="category-card"
              key={category.value}
            >
              <span className="category-icon">{category.icon}</span>

              <h2>{category.name}</h2>

              <p>{category.description}</p>

              <span className="category-count">
                {productCount} Products
              </span>

              <span className="category-link">
                Explore Collection →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Categories;