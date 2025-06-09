<template>
  <table class="product-table">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>SKU</th>
        <th>Precio</th>
        <th>Stock</th>
        <th>Categoría</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.name }}</td>
        <td>{{ product.sku }}</td>
        <td>${{ product.price }}</td>
        <td>{{ product.stock }}</td>
        <td>{{ product.category?.name || 'Sin categoría' }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  products: Array,
});
</script>

<style>
.product-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
}

.product-table thead {
  background-color: #2a4365; 
  color: white;
}

.product-table th,
.product-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.product-table tbody tr:hover {
  background-color: #ebf4ff; 
  cursor: default;
}

.product-table tbody tr:last-child td {
  border-bottom: none;
}

.product-table th {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
