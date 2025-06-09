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
            <div class="actions">
              <router-link 
                :to="`/dashboard/categorias/editar/${category.id}`" 
                class="edit-btn"
              >
                Editar
              </router-link>
              <button 
                @click="deleteCategory(category.id)" 
                class="delete-btn"
              >
                Eliminar
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  categories: Array,
});

const emit = defineEmits(['refresh']);

const deleteCategory = async (id) => {
  if (confirm('¿Estás seguro de eliminar esta categoría?')) {
    try {
      
      console.log('Eliminando categoría con ID:', id);
      
      emit('refresh');
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
    }
  }
};
</script>

<style scoped>
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

.actions {
  display: flex;
  gap: 8px;
}

.edit-btn {
  color: #1976d2;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.edit-btn:hover {
  background-color: #e3f2fd;
}

.delete-btn {
  color: #d32f2f;
  background: none;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.delete-btn:hover {
  background-color: #ffebee;
}
</style>