import axios from "axios";

import {
  getStoredProducts,
  saveStoredProducts,
  hasStoredProducts,
} from "./productStorage";

const API_URL = "https://fakestoreapi.com";

// Retrieve products from LocalStorage or initialise the catalogue from the API.
export const getProducts = async () => {
  // Check whether the catalogue has previously been initialised.
  if (hasStoredProducts()) {
    return getStoredProducts();
  }

  // Fetch the initial catalogue when no saved catalogue exists.
  const response = await axios.get(`${API_URL}/products`);

  // Save the initial products for future requests.
  saveStoredProducts(response.data);

  return response.data;
};

// Retrieve a single product using its ID.
export const getProductById = async (id) => {
  const products = await getProducts();

  return products.find((product) => String(product.id) === String(id));
};