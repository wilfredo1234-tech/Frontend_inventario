<template>
  <div class="productos-container">
    <div class="productos-header">
      <h1 class="productos-title">📦 Productos</h1>
      <button @click="showCreateModal = true" class="btn-primary">
        + Nuevo Producto
      </button>
    </div>

    <div v-if="loading" class="productos-loading">
      <div class="spinner"></div>
      <p>Cargando productos...</p>
    </div>

    <div v-else-if="error" class="alert-error">
      {{ error }}
    </div>

    <div v-else>
      <ProductTable :products="products" @refresh="fetchProducts" />
    </div>

   
    <CreateProductModal 
      v-if="showCreateModal" 
      :show="showCreateModal" 
      @create="handleCreateProduct"
      @close="showCreateModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import ProductTable from "./components/ProductTable.vue";
import CreateProductModal from "./components/CreateProductModal.vue";
import { useProducts } from "@/composables/useProducts";

const { products, loading, error, fetchProducts, addProduct } = useProducts();
const showCreateModal = ref(false);

const handleCreateProduct = async (newProduct) => {
  try {
    await addProduct(newProduct);
    showCreateModal.value = false;
    fetchProducts();
  } catch (error) {
    alert("Error al crear el producto");
  }
};
</script>

<style scoped>
.productos-container {
  padding: 24px;
}

.productos-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.productos-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.btn-primary {
  background-color: #2c3e50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #1565c0;
}

.productos-loading {
  text-align: center;
  padding: 32px;
}

.spinner {
  display: inline-block;
  width: 32px;
  height: 32px;
  border: 4px solid #1976d2;
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.alert-error {
  background-color: #fdecea;
  border-left: 4px solid #f44336;
  color: #b71c1c;
  padding: 12px;
  margin-bottom: 16px;
}
</style>
