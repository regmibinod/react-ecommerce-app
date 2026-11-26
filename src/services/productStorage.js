import { act } from "react";

// Retrieve admin managed Products from Local-Storage
export const getStoredProducts = () => {
  try {
    const storeProducts = localStorage.getItem("adminProducts");
    return storeProducts ? JSON.parse(storeProducts) : [];
  } catch (error) {
    console.log("Error retrieving the store product", error);
    return [];
  }
};

// Save admin-managed products to LocalStorage.

export const saveStoredProducts = (products) => {
  try {
    localStorage.setItem("adminProducts", JSON.stringify(products));
  } catch (error) {
    console.log("Error saving products:", error);
    throw new error("Unable to save products. Please try again.");
  }
};

// Add a new product while preserving previously stored products.

export const addProduct = (product) => {
  try {
    const previousProducts = getStoredProducts();
    const updatedProducts = [...previousProducts, product];
    saveStoredProducts(updatedProducts);
    return [];
  } catch (error) {
    console.error("Error adding product:", error);

    throw error;
  }
};

// Update an existing product using it ID.

export const updateProduct = (updatedProduct) => {
  try {
    const previousProducts = getStoredProducts();
    const updatedProducts = previousProducts.map((product) =>
      product.id === updatedProduct.id ? updateProduct : product,
    );
    saveStoredProducts(updatedProducts);
    return updatedProducts;
  } catch (error) {
    console.log("Error updating   product", error);
  }
};


// Delete product using id 

