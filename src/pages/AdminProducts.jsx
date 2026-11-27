import { useEffect, useState } from "react";
import "../styles/adminproducts.css";
import {
  getProducts,
} from "../services/productApi";

import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/productStorage";

function AdminProducts() {
  // Store the product catalogue.
  const [products, setProducts] = useState([]);

  // Track loading and error states.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Manage product search and category filtering.
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Control the add/edit form.
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Store product form information.
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  // Store form validation and action messages.
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch products when the page loads.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Generate the next available numeric product ID.
  const generateProductId = () => {
    const numericIds = products
      .map((product) => Number(product.id))
      .filter((id) => Number.isFinite(id));

    return numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;
  };

  // Update form fields when the user types.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Open the form for creating a new product.
  const handleAddClick = () => {
    setEditingProduct(null);

    setFormData({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });

    setFormError("");
    setSuccessMessage("");
    setShowForm(true);
  };

  // Open the form with the selected product's information.
  const handleEditClick = (product) => {
    setEditingProduct(product);

    setFormData({
      title: product.title,
      price: String(product.price),
      description: product.description,
      category: product.category,
      image: product.image,
    });

    setFormError("");
    setSuccessMessage("");
    setShowForm(true);
  };

  // Validate and save a new or updated product.
  const handleSubmit = (event) => {
    event.preventDefault();

    setFormError("");
    setSuccessMessage("");

    const price = Number(formData.price);

    // Validate required product information.
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.category.trim() ||
      !formData.image.trim() ||
      formData.price.trim() === "" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      setFormError("Please enter valid information in every field.");
      return;
    }

    try {
      if (editingProduct) {
        // Preserve the existing product ID and rating.
        const updatedProduct = {
          ...editingProduct,
          ...formData,
          price,
        };

        const updatedProducts = updateProduct(updatedProduct);

        setProducts(updatedProducts);
        setSuccessMessage("Product updated successfully!");
      } else {
        // Create a new product with a unique ID.
        const newProduct = {
          id: generateProductId(),
          ...formData,
          price,
          rating: {
            rate: 0,
            count: 0,
          },
        };

        const updatedProducts = addProduct(newProduct);

        setProducts(updatedProducts);
        setSuccessMessage("Product added successfully!");
      }

      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error saving product:", error);
      setFormError(error.message || "Unable to save product.");
    }
  };

  // Delete a product after confirmation.
  const handleDelete = (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    try {
      const updatedProducts = deleteProduct(productId);

      setProducts(updatedProducts);
      setSuccessMessage("Product deleted successfully!");
      setFormError("");
    } catch (error) {
      console.error("Error deleting product:", error);
      setFormError(error.message || "Unable to delete product.");
    }
  };

  // Close the product form.
  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
    setFormError("");
  };

  // Create a list of unique product categories.
  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  // Apply search and category filters.
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="admin-products-page">
      <header className="admin-products-header">
        <div>
          <h1>Product Management</h1>
          <p>Manage your store products from one place.</p>
        </div>

        <button type="button" onClick={handleAddClick}>
          + Add New Product
        </button>
      </header>

      {/* Display product action messages. */}
      {successMessage && (
        <p role="status" className="admin-success-message">
          {successMessage}
        </p>
      )}

      {formError && (
        <p role="alert" className="admin-error-message">
          {formError}
        </p>
      )}

      {/* Product summary. */}
      <section className="admin-products-summary">
        <h2>Total Products: {products.length}</h2>
        <p>Showing {filteredProducts.length} products</p>
      </section>

      {/* Add and edit product form. */}
      {showForm && (
        <section className="admin-product-form-section">
          <h2>
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Product Name</label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="price">Price (NZD)</label>
              <input
                id="price"
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. electronics"
                required
              />
            </div>

            <div>
              <label htmlFor="image">Image URL</label>
              <input
                id="image"
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>

            <div className="admin-product-form-actions">
              <button type="submit">
                {editingProduct ? "Update Product" : "Save Product"}
              </button>

              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Search and category filters. */}
      <section className="admin-products-filters">
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search products"
        />

        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          aria-label="Filter products by category"
        >
          <option value="all">All Categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </section>

      {/* Product management table. */}
      <section className="admin-products-table-section">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="admin-products-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.image}
                        alt={product.title}
                        width="55"
                      />
                    </td>

                    <td>{product.title}</td>
                    <td>{product.category}</td>

                    <td>
                      {new Intl.NumberFormat("en-NZ", {
                        style: "currency",
                        currency: "NZD",
                      }).format(product.price)}
                    </td>

                    <td>
                      <button
                        type="button"
                        onClick={() => handleEditClick(product)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminProducts;