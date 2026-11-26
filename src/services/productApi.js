import axios from "axios";

const API_URL = "https://fakestoreapi.com";

// Fetch all products from the API.

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);

  return response.data;
};

// Fetch a single product using it ID.

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);

  return response.data;
};

