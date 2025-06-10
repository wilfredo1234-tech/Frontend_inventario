<template>
  <div class="products-table-wrapper">
    <table class="products-table">
      <thead>
        <tr>
          <th>Producto</th>
          <th>SKU</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>
            <div class="product-name-cell">
              <div class="product-icon">
                <svg viewBox="0 0 24 24" class="icon">
                  <path d="M16 6V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2H0v2h24V6h-8zM4 8v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8H4z"/>
                </svg>
              </div>
              <div>
                <div class="product-name">{{ product.name }}</div>
                <div class="product-id">ID: {{ product.id }}</div>
              </div>
            </div>
          </td>
          <td>{{ product.sku }}</td>
          <td>${{ product.price }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.category?.name || 'Sin categoría' }}</td>
          <td>
            <ActionButtons
              @edit="() => editProduct(product)"
              @delete="() => prepareDeleteProduct(product)"
            />
          </td>
        </tr>
      </tbody>
    </table>

   
    <EditProductModal 
      :show="showEditModal" 
      :product="productToEdit"
      @update="handleUpdate"
      @close="showEditModal = false"
    />
    
    <DeleteProductModal 
      :show="showDeleteModal" 
      :productName="productToDeleteName"
      @confirmDelete="handleDelete"
      @close="showDeleteModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ActionButtons from '@/components/ActionButtons.vue';
import EditProductModal from './EditProductModal.vue';
import DeleteProductModal from './DeleteProductModal.vue';
import { useProducts } from '@/composables/useProducts';

const { products, updateProduct, removeProduct } = useProducts();

const showEditModal = ref(false);
const showDeleteModal = ref(false);
const productToEdit = ref(null);
const productToDeleteId = ref(null);
const productToDeleteName = ref('');

const editProduct = (product) => {
  productToEdit.value = { ...product };
  showEditModal.value = true;
};

const prepareDeleteProduct = (product) => {
  productToDeleteId.value = product.id;
  productToDeleteName.value = product.name;
  showDeleteModal.value = true;
};

const handleUpdate = async (updatedProduct) => {
  try {
    await updateProduct(updatedProduct.id, updatedProduct);
    showEditModal.value = false;
  } catch (err) {
    console.error('Error al actualizar producto:', err);
  }
};

const handleDelete = async () => {
  try {
    await removeProduct(productToDeleteId.value);
    showDeleteModal.value = false;
  } catch (err) {
    console.error('Error al eliminar producto:', err);
  }
};
</script>

<style scoped>
.products-table-wrapper {
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.products-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.products-table th,
.products-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.products-table th {
  background-color: #f5f5f5;
  font-weight: 600;
  color: #333;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.5px;
}

.products-table tbody tr:hover {
  background-color: #f9f9f9;
}

.product-name-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product-icon {
  width: 36px;
  height: 36px;
  background-color: #fce4ec;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.product-icon .icon {
  width: 18px;
  height: 18px;
  fill: #d81b60;
}

.product-name {
  font-weight: 500;
  color: #333;
}

.product-id {
  font-size: 12px;
  color: #757575;
}
</style>
