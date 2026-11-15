import { useState, useEffect } from "react";
import { getProducts } from "../services/productApi";
import "../styles/products.css";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  // Store the currently selected product category.
  const [selectedCategory, setSelectedCategory] = useState("all");
  // Store the sorting option selected by the customer
  const [sortOption, setSortOption] = useState("default");

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

  // Extract the unique categories from the products return by the api

  const categories = ["all", ...new Set(products.map((item) => item.category))];

  // Filter products by both selected category and search text.

  const filteredProducts = products.filter((product) => {
    // check wether the product belongs to the slected category.
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    // Check whether the product title matches the search text.
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    // Keep products that match both conditions.
    return matchesCategory && matchesSearch;
  });

  // Sort the filtered products without modifying the original array.

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
     case "price-low-high" : return a.price - b.price;
     case "price-high-low" : return b.price - a.price;
     case "name-a-z" : return a.title.localeCompare(b.title);
     case "name-z-a" : return b.title.localeCompare(a.title)

     // keep the original order when no sorting option is  selected
     default : return 0;
    }
  });

  if (loading) {
    return <p className="loading">Products Loading............... </p>;
  }
  if (error) {
    return <p className="error-loading">{error}</p>;
  }

  return (
    <div className="products-container">
      <h1 className="page-title">Our Products</h1>
      <p className="page-subtitle">Explore our latest products.</p>
      {/* Allow customer to select a product cateogry.  */}
      <div className="category-filter">
        <label htmlFor="category">Filter by category: </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "all" ? "All Categories" : category}
            </option>
          ))}
        </select>
      </div>
      {/* Allow customers to sort products. */}
      {/* Allow customers to sort products. */}
      <div className="sort-filter">
        <label htmlFor="sort">Sort products: </label>

        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="name-a-z">Name: A to Z</option>
          <option value="name-z-a">Name: Z to A</option>
        </select>
      </div>
      {/* Allow user to search product */}
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
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
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
