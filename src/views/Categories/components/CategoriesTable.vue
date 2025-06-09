<template>
  <div class="categories-table-wrapper">
    <table class="categories-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Slug</th>
          <th>Descripción</th>
          <th>Productos</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>
            <div class="category-name-cell">
              <div class="category-icon">
                <svg viewBox="0 0 24 24" class="icon">
                  <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                </svg>
              </div>
              <div>
                <div class="category-name">{{ category.name }}</div>
                <div class="category-id">ID: {{ category.id }}</div>
              </div>
            </div>
          </td>
          <td>{{ category.slug }}</td>
          <td>{{ category.description || 'Sin descripción' }}</td>
          <td>
            <span class="products-count">{{ category.products_count || 0 }} productos</span>
          </td>
          <td>
            <ActionButtons
              @edit="() => editCategory(category)"
              @delete="() => prepareDeleteCategory(category)"
            />
          </td>
        </tr>
      </tbody>
    </table>

    
    <EditCategoryModal 
      :show="showEditModal" 
      :category="categoryToEdit"
      @update="handleUpdate"
      @close="showEditModal = false"
    />
    
    <DeleteCategoryModal 
      :show="showDeleteModal" 
      :categoryName="categoryToDeleteName"
      @confirmDelete="handleDelete"
      @close="showDeleteModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCategories } from '@/composables/useCategories';
import EditCategoryModal from './EditCategoryModal.vue';
import DeleteCategoryModal from './DeleteCategoryModal.vue';
import ActionButtons from '@/components/ActionButtons.vue';

const { categories, loading, error, removeCategory, updateCategory, fetchCategories } = useCategories();


const showEditModal = ref(false);
const showDeleteModal = ref(false);
const categoryToEdit = ref(null);
const categoryToDeleteName = ref('');
const categoryToDeleteId = ref(null);


const handleUpdate = async (categoryData) => {
  try {
    await updateCategory(categoryData.id, categoryData);
    showEditModal.value = false;
  } catch (err) {
    console.error('Error al actualizar categoría:', err);
  }
};

const handleDelete = async () => {
  try {
    await removeCategory(categoryToDeleteId.value);
    showDeleteModal.value = false;
  } catch (err) {
    console.error('Error al eliminar categoría:', err);
  }
};

const prepareDeleteCategory = (category) => {
  categoryToDeleteId.value = category.id;
  categoryToDeleteName.value = category.name;
  showDeleteModal.value = true;
};

const editCategory = (category) => {
  console.log('Editando categoría:', category);
  categoryToEdit.value = { ...category };
  showEditModal.value = true;
};
</script>

<style scoped>
.add-category-btn {
  margin-bottom: 16px;
  padding: 8px 16px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.categories-table-wrapper {
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.categories-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.categories-table th,
.categories-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.categories-table th {
  background-color: #f5f5f5;
  font-weight: 600;
  color: #333;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.5px;
}

.categories-table tbody tr:hover {
  background-color: #f9f9f9;
}

.category-name-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-icon {
  width: 36px;
  height: 36px;
  background-color: #e3f2fd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.category-icon .icon {
  width: 18px;
  height: 18px;
  fill: #1976d2;
}

.category-name {
  font-weight: 500;
  color: #333;
}

.category-id {
  font-size: 12px;
  color: #757575;
}

.products-count {
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}
</style>
