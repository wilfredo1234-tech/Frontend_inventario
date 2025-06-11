import { ref, onMounted } from "vue";
import { 
  getAllProducts, 
  createProduct, 
  updateProductById, 
  deleteProductById 
} from "@/api/products";
import { useAuthStore } from "@/stores/auth";
import { useLoadingStore } from "@/stores/loadingStore"; 

export function useProducts() {
  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const auth = useAuthStore();
  const globalLoading = useLoadingStore(); 

  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;
    globalLoading.startLoading(); 
    try {
      products.value = await getAllProducts(auth.token);
    } catch (err) {
      error.value = "Error al cargar productos";
      console.error(err);
    } finally {
      loading.value = false;
      globalLoading.stopLoading(); 
    }
  };

  const addProduct = async (productData) => {
    globalLoading.startLoading(); 
    try {
      await createProduct(productData, auth.token);
      await fetchProducts();
    } catch (err) {
      console.error("Error al crear producto:", err);
      error.value = "No se pudo crear el producto";
      throw err;
    } finally {
      globalLoading.stopLoading(); 
    }
  };

  const updateProduct = async (id, updatedData) => {
    globalLoading.startLoading(); 
    try {
      await updateProductById(id, updatedData, auth.token);
      await fetchProducts();
    } catch (err) {
      console.error("Error al actualizar producto:", err);
      error.value = "No se pudo actualizar el producto";
      throw err;
    } finally {
      globalLoading.stopLoading(); 
    }
  };

  const removeProduct = async (id) => {
    globalLoading.startLoading(); 
    try {
      await deleteProductById(id, auth.token);
      await fetchProducts();
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      error.value = "No se pudo eliminar el producto";
      throw err;
    } finally {
      globalLoading.stopLoading(); 
    }
  };

  onMounted(fetchProducts);

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    removeProduct,
  };
}
