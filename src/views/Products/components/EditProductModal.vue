<template>
  <div v-if="show" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Editar Producto</h2>
        <button class="close-btn" @click="closeModal">
          <svg viewBox="0 0 24 24" class="icon">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Nombre*</label>
          <input id="name" v-model="formData.name" type="text" required class="form-input">
        </div>

        <div class="form-group">
          <label for="sku">SKU*</label>
          <input id="sku" v-model="formData.sku" type="text" required class="form-input">
        </div>

        <div class="form-group">
          <label for="price">Precio*</label>
          <input id="price" v-model.number="formData.price" type="number" step="0.01" required class="form-input">
        </div>

        <div class="form-group">
          <label for="stock">Stock*</label>
          <input id="stock" v-model.number="formData.stock" type="number" min="0" required class="form-input">
        </div>
<div class="form-group">
  <label for="category_id">Categoría*</label>
  <select 
    id="category_id" 
    v-model.number="formData.category_id" 
    required 
    class="form-input"
    @focus="fetchCategories"
  >
    <option disabled value="">Seleccione una categoría</option>
    <option 
      v-for="category in categories" 
      :key="category.id" 
      :value="category.id"
    >
      {{ category.name }}
    </option>
  </select>


         
        </div>

        <div class="form-group">
          <label for="description">Descripción</label>
          <textarea id="description" v-model="formData.description" class="form-textarea"></textarea>
        </div>

        <div class="form-group checkbox-group">
          <input id="status" v-model="formData.status" type="checkbox">
          <label for="status">¿Activo?</label>
        </div>

        <div class="modal-actions">
          <button type="button" @click="closeModal" class="btn-cancel">Cancelar</button>
          <button type="submit" class="btn-submit">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useCategories } from '@/composables/useCategories';

const { categories, fetchCategories } = useCategories();

const props = defineProps({
  show: Boolean,
  product: Object
});

const emit = defineEmits(['update', 'close']);

const formData = ref({
  id: null,
  name: '',
  sku: '',
  description: '',
  price: 0,
  stock: 0,
  category_id: null,
  status: true
});

watch(() => props.product, (newVal) => {
  if (newVal) {
    formData.value = { ...newVal };
  }
}, { immediate: true });

const handleSubmit = () => {
  emit('update', formData.value);
  closeModal();
};

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>

.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
}

.icon {
  width: 20px;
  height: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-textarea {
  min-height: 80px;
  resize: vertical;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}

.btn-cancel, .btn-submit {
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
}

.btn-cancel {
  background-color: #eee;
  border: 1px solid #ccc;
}

.btn-submit {
  background-color: #007bff;
  color: white;
  border: none;
}
</style>
