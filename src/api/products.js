// src/api/products.js
import axios from "axios";

const API_URL = "http://localhost:8000/api/products";

export const getAllProducts = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
