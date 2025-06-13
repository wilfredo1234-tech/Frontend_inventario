<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <h2>Crear Nuevo Producto</h2>
      <form @submit.prevent="handleSubmit">
        
        <div class="form-group">
          <label for="category">Categoría*</label>
          <select 
            id="category" 
            v-model.number="formData.category_id" 
            @focus="fetchCategories"
            required
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
          <label for="name">Nombre*</label>
          <input 
            id="name" 
            v-model="formData.name" 
            type="text" 
            required
          >
        </div>

        <div class="form-group">
          <label for="sku">SKU*</label>
          <input 
            id="sku" 
            v-model="formData.sku" 
            type="text" 
            required
          >
        </div>

        <div class="form-group">
          <label for="description">Descripción</label>
          <textarea 
            id="description" 
            v-model="formData.description"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="price">Precio*</label>
          <input 
            id="price" 
            v-model="formData.price" 
            type="number" 
            step="0.01" 
            min="0" 
            required
          >
        </div>

        <div class="form-group">
          <label for="stock">Stock*</label>
          <input 
            id="stock" 
            v-model="formData.stock" 
            type="number" 
            min="0" 
            required
          >
        </div>

        <div class="form-group form-checkbox">
          <input 
            id="status" 
            v-model="formData.status" 
            type="checkbox"
          >
          <label for="status">Activo</label>
        </div>

        <div class="modal-actions">
          <button type="button" @click="closeModal" class="btn-cancel">
            Cancelar
          </button>
          <button type="submit" class="btn-submit">
            Crear
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCategories } from '@/composables/useCategories';

const props = defineProps({
  show: Boolean
});

const emit = defineEmits(['create', 'close']);

const { categories, fetchCategories } = useCategories();

const formData = ref({
  category_id: null,
  name: '',
  sku: '',
  description: '',
  price: 0,
  stock: 0,
  status: true
});

const handleSubmit = () => {
  emit('create', { ...formData.value });
  closeModal();
};

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
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

h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

input, textarea, select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

textarea {
  min-height: 80px;
}

.form-checkbox {
  display: flex;
  align-items: center;
}

.form-checkbox input {
  width: auto;
  margin-right: 8px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;
}

.btn-cancel {
  padding: 8px 16px;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-submit {
  padding: 8px 16px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
