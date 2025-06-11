import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { useLoadingStore } from "@/stores/loadingStore";

const API_URL = "http://localhost:8000/api/categories";

export function useCategories() {
  const categories = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const auth = useAuthStore();
  const globalLoading = useLoadingStore(); 

  const getAllCategories = async () => {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    return response.data;
  };

  const deleteCategoryById = async (id) => {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
  };

  const updateCategoryById = async (id, updatedData) => {
    await axios.put(`${API_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
  };

  const createCategory = async (categoryData) => {
    await axios.post(API_URL, categoryData, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
  };

  const fetchCategories = async () => {
    loading.value = true;
    error.value = null;
    globalLoading.startLoading(); 
    try {
      categories.value = await getAllCategories();
    } catch (err) {
      error.value = "Error al cargar categorías.";
      console.error(err);
    } finally {
      loading.value = false;
      globalLoading.stopLoading(); // 
    }
  };

  const removeCategory = async (id) => {
    globalLoading.startLoading(); 
    try {
      await deleteCategoryById(id);
      await fetchCategories();
    } catch (err) {
      console.error("Error al eliminar categoría:", err);
      error.value = "No se pudo eliminar la categoría.";
      throw err;
    } finally {
      globalLoading.stopLoading(); 
    }
  };

  const updateCategory = async (id, updatedData) => {
    globalLoading.startLoading(); 
    try {
      await updateCategoryById(id, updatedData);
      await fetchCategories();
    } catch (err) {
      console.error("Error al actualizar categoría:", err);
      error.value = "No se pudo actualizar la categoría.";
      throw err;
    } finally {
      globalLoading.stopLoading(); 
    }
  };

  const addCategory = async (categoryData) => {
    globalLoading.startLoading(); 
    try {
      await createCategory(categoryData);
      await fetchCategories();
    } catch (err) {
      console.error("Error al crear categoría:", err);
      error.value = "No se pudo crear la categoría.";
      throw err;
    } finally {
      globalLoading.stopLoading(); 
    }
  };

  onMounted(fetchCategories);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    removeCategory,
    updateCategory,
    addCategory,
  };
}
