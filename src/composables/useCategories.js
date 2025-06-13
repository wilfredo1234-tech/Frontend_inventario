import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useLoadingStore } from "@/stores/loadingStore";
import {
  getAllCategories,
  deleteCategoryById,
  updateCategoryById,
  createCategory,
} from "@/api/categories"; 

export function useCategories() {
  const categories = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const auth = useAuthStore();
  const globalLoading = useLoadingStore();

  const fetchCategories = async () => {
    loading.value = true;
    error.value = null;
    globalLoading.startLoading();
    try {
      categories.value = await getAllCategories(auth.token);
    } catch (err) {
      error.value = "Error al cargar categorías.";
      console.error(err);
    } finally {
      loading.value = false;
      globalLoading.stopLoading();
    }
  };

  const removeCategory = async (id) => {
    globalLoading.startLoading();
    try {
      await deleteCategoryById(id, auth.token);
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
      await updateCategoryById(id, updatedData, auth.token);
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
      await createCategory(categoryData, auth.token);
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
