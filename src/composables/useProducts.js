// src/composables/useProducts.js
import { ref, onMounted } from "vue";
import { getAllProducts } from "@/api/products";
import { useAuthStore } from "@/stores/auth";

export function useProducts() {
  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const auth = useAuthStore();

  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await getAllProducts(auth.token);
      products.value = data;
    } catch (err) {
      error.value = "Error al cargar productos.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchProducts);

  return {
    products,
    loading,
    error,
    fetchProducts,
  };
}
