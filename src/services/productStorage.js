// Check whether an admin product catalogue has already been created.
export const hasStoredProducts = () => {
  return localStorage.getItem("adminProducts") !== null;
};

// Retrieve admin-managed products from LocalStorage.
export const getStoredProducts = () => {
  try {
    const storedProducts = localStorage.getItem("adminProducts");

    return storedProducts ? JSON.parse(storedProducts) : [];
  } catch (error) {
    console.error("Error retrieving products:", error);
    return [];
  }
};

// Save admin-managed products to LocalStorage.
export const saveStoredProducts = (products) => {
  try {
    localStorage.setItem("adminProducts", JSON.stringify(products));
  } catch (error) {
    console.error("Error saving products:", error);

    throw new Error("Unable to save products. Please try again.");
  }
};

// Add a new product while preserving existing products.
export const addProduct = (product) => {
  const previousProducts = getStoredProducts();

  // Prevent duplicate product IDs.
  const productExists = previousProducts.some(
    (item) => String(item.id) === String(product.id),
  );

  if (productExists) {
    throw new Error("A product with this ID already exists.");
  }

  const updatedProducts = [...previousProducts, product];

  saveStoredProducts(updatedProducts);

  return updatedProducts;
};

// Update an existing product using its ID.
export const updateProduct = (updatedProduct) => {
  const previousProducts = getStoredProducts();

  // Check whether the product exists.
  const productExists = previousProducts.some(
    (product) => String(product.id) === String(updatedProduct.id),
  );

  if (!productExists) {
    throw new Error("Product not found.");
  }

  const updatedProducts = previousProducts.map((product) =>
    String(product.id) === String(updatedProduct.id)
      ? updatedProduct
      : product,
  );

  saveStoredProducts(updatedProducts);

  return updatedProducts;
};

// Delete a product using its ID.
export const deleteProduct = (productId) => {
  const previousProducts = getStoredProducts();

  const updatedProducts = previousProducts.filter(
    (product) => String(product.id) !== String(productId),
  );

  saveStoredProducts(updatedProducts);

  return updatedProducts;
};