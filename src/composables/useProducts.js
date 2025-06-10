import { ref, onMounted } from "vue";
import { 
  getAllProducts, 
  createProduct, 
  updateProductById, 
  deleteProductById 
} from "@/api/products";
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
      products.value = await getAllProducts(auth.token);
    } catch (err) {
      error.value = "Error al cargar productos";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const addProduct = async (productData) => {
    try {
      await createProduct(productData, auth.token);
      await fetchProducts();
    } catch (err) {
      console.error("Error al crear producto:", err);
      error.value = "No se pudo crear el producto";
      throw err;
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      await updateProductById(id, updatedData, auth.token);
      await fetchProducts();
    } catch (err) {
      console.error("Error al actualizar producto:", err);
      error.value = "No se pudo actualizar el producto";
      throw err;
    }
  };

  const removeProduct = async (id) => {
    try {
      await deleteProductById(id, auth.token);
      await fetchProducts();
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      error.value = "No se pudo eliminar el producto";
      throw err;
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