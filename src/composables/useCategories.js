import { ref, onMounted } from "vue";
import { getAllCategories } from "@/api/categories";
import { useAuthStore } from "@/stores/auth";

export function useCategories() {
  const categories = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const auth = useAuthStore();

  const fetchCategories = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await getAllCategories(auth.token);
      categories.value = data;
    } catch (err) {
      error.value = "Error al cargar categorías.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchCategories);

  return {
    categories,
    loading,
    error,
    fetchCategories,
  };
}