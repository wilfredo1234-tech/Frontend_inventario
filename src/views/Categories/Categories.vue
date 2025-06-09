<template>
  <div class="categories-container">
    <div class="categories-header">
      <h1 class="categories-title"> Categorías</h1>
      <router-link to="/dashboard/categorias/nueva" class="new-category-btn">
        + Nueva Categoría
      </router-link>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Cargando categorías...</p>
    </div>
    <div v-else-if="error" class="error-state">
      {{ error }}
    </div>
    <div v-else>
      <CategoriesTable :categories="categories" @refresh="fetchCategories" />
    </div>
  </div>
</template>

<script setup>
import CategoriesTable from "./components/CategoriesTable.vue";
import { useCategories } from "@/composables/useCategories";

const { categories, loading, error, fetchCategories } = useCategories();
</script>

<style scoped>
.categories-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.categories-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.categories-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
}

.new-category-btn {
  background-color: #2c3e50;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;
}

.new-category-btn:hover {
  background-color: #1a252f;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  color: #666;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

.error-state {
  padding: 16px;
  background-color: #ffebee;
  border-left: 4px solid #f44336;
  color: #f44336;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>