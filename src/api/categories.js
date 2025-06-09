import axios from "axios";

const API_URL = "http://localhost:8000/api/categories";

export const getAllCategories = async (token) => {
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