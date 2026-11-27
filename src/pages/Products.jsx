import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../services/productApi";
import ProductCard from "../components/ProductCard";
import "../styles/products.css";

function Products() {
  // Read the selected category from the URL.
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category") || "all";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  // Display eight products on each page.
  const productsPerPage = 8;

  // Fetch products from the API or local storage.
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
      setError("Unable to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Synchronise the selected category with the URL.
  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  // Reset pagination whenever the filters change.
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, search, sortOption]);

  // Extract unique categories from the available products.
  const categories = [
    "all",
    ...new Set(products.map((item) => item.category)),
  ];

  // Filter products by category and search text.
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sort products without modifying the original array.
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low-high":
        return a.price - b.price;

      case "price-high-low":
        return b.price - a.price;

      case "name-a-z":
        return a.title.localeCompare(b.title);

      case "name-z-a":
        return b.title.localeCompare(a.title);

      default:
        return 0;
    }
  });

  // Calculate pagination information.
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Keep the current page within the available page range.
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Display only the products belonging to the current page.
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  // Show a loading state while products are being fetched.
  if (loading) {
    return (
      <main className="products-state">
        <div className="products-spinner"></div>
        <h2>Loading Products</h2>
        <p>Please wait while we prepare our collection.</p>
      </main>
    );
  }

  // Show an error state if the product request fails.
  if (error) {
    return (
      <main className="products-state products-error-state">
        <span className="products-state-icon">⚠️</span>
        <h2>Something went wrong</h2>
        <p>{error}</p>

        <button
          type="button"
          className="products-retry-button"
          onClick={() => {
            setError("");
            setLoading(true);
            fetchProducts();
          }}
        >
          Try Again
        </button>
      </main>
    );
  }

  return (
    <main className="products-container">
      {/* Catalogue heading */}
      <section className="products-hero">
        <span className="products-eyebrow">DISCOVER OUR COLLECTION</span>

        <h1 className="page-title">Explore Our Products</h1>

        <p className="page-subtitle">
          Discover quality products and find exactly what you're looking for.
        </p>

        <div className="products-total-badge">
          {products.length} Products Available
        </div>
      </section>

      {/* Search and filtering controls */}
      <section className="products-toolbar">
        <div className="products-search-section">
          <label htmlFor="product-search">Search Products</label>

          <div className="search-box">
            <span className="search-icon" aria-hidden="true">
              🔍
            </span>

            <input
              id="product-search"
              type="search"
              className="search-input"
              placeholder="Search by product name..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {search && (
              <button
                type="button"
                className="search-clear-button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className="products-filter-group">
          <div className="category-filter">
            <label htmlFor="category">Category</label>

            <select
              id="category"
              value={selectedCategory}
              onChange={(event) => {
                const category = event.target.value;

                setSelectedCategory(category);

                // Update the URL so the selected category can be shared.
                if (category === "all") {
                  setSearchParams({});
                } else {
                  setSearchParams({ category });
                }
              }}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all"
                    ? "All Categories"
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="sort-filter">
            <label htmlFor="sort">Sort By</label>

            <select
              id="sort"
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
            >
              <option value="default">Recommended</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
            </select>
          </div>
        </div>
      </section>

      {/* Results information */}
      <section className="products-results-header">
        <div>
          <h2>Our Collection</h2>
          <p>
            Showing {sortedProducts.length}{" "}
            {sortedProducts.length === 1 ? "product" : "products"}
          </p>
        </div>

        {(search || selectedCategory !== "all") && (
          <button
            type="button"
            className="clear-filters-button"
            onClick={() => {
              setSearch("");
              setSelectedCategory("all");
              setSearchParams({});
            }}
          >
            Clear Filters
          </button>
        )}
      </section>

      {/* Product catalogue */}
      {currentProducts.length > 0 ? (
        <section className="products-grid">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <section className="products-empty">
          <span className="products-empty-icon">🔎</span>
          <h2>No Products Found</h2>
          <p>
            We couldn't find any products matching your search or selected
            category.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedCategory("all");
              setSearchParams({});
            }}
          >
            View All Products
          </button>
        </section>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <nav className="pagination" aria-label="Product pagination">
          <button
            type="button"
            onClick={() => setCurrentPage((previous) => previous - 1)}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          <span>
            Page <strong>{currentPage}</strong> of {totalPages}
          </span>

          <button
            type="button"
            onClick={() => setCurrentPage((previous) => previous + 1)}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </nav>
      )}
    </main>
  );
}

export default Products;