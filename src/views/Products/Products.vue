<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">📦 Productos</h1>

    <div v-if="loading">Cargando productos...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    
    <ProductTable :products="products" />
  </div>
</template>

<script setup>
import ProductTable from "./components/ProductTable.vue";
import { useProducts } from "@/composables/useProducts";

const { products, loading, error } = useProducts();
</script>
