import axios from "axios";

const API_URL = "http://localhost:8000/api/profile";

export const getProfile = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (error) {
    throw error.response?.data?.message || "Error al obtener perfil";
  }
};

export const updateProfile = async (token, profileData) => {
  try {
    const response = await axios.put(API_URL, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (error) {
    throw error.response?.data?.message || "Error al actualizar perfil";
  }
};
