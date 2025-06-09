<template>
  <div v-if="show" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Editar Categoría</h2>
        <button class="close-btn" @click="closeModal">
          <svg viewBox="0 0 24 24" class="icon">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Nombre*</label>
          <input 
            id="name" 
            v-model="formData.name" 
            type="text" 
            required
            class="form-input"
          >
        </div>
        <div class="form-group">
          <label for="slug">Slug*</label>
          <input 
            id="slug" 
            v-model="formData.slug" 
            type="text" 
            required
            class="form-input"
          >
        </div>
        <div class="form-group">
          <label for="description">Descripción</label>
          <textarea 
            id="description" 
            v-model="formData.description"
            class="form-textarea"
          ></textarea>
        </div>
        <div class="modal-actions">
          <button type="button" @click="closeModal" class="btn-cancel">
            Cancelar
          </button>
          <button type="submit" class="btn-submit">
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  show: Boolean,
  category: Object
});

const emit = defineEmits(['update', 'close']);

const formData = ref({
  id: '',
  name: '',
  slug: '',
  description: ''
});

watch(() => props.category, (newVal) => {
  if (newVal) {
    formData.value = {
      id: newVal.id,
      name: newVal.name,
      slug: newVal.slug,
      description: newVal.description || ''
    };
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 500px;
  max-width: 95%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: slideUp 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.close-btn .icon {
  width: 20px;
  height: 20px;
  fill: #757575;
  transition: fill 0.2s;
}

.close-btn:hover .icon {
  fill: #d32f2f;
}

form {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #2c3e50;
  font-size: 0.875rem;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e0e0e0;
}

.btn-cancel, .btn-submit {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel {
  background-color: #f5f5f5;
  color: #2c3e50;
  border: 1px solid #e0e0e0;
}

.btn-cancel:hover {
  background-color: #e0e0e0;
}

.btn-submit {
  background-color: #1976d2;
  color: white;
  border: 1px solid #1976d2;
}

.btn-submit:hover {
  background-color: #1565c0;
  border-color: #1565c0;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    transform: translateY(20px);
    opacity: 0.8;
  }
  to { 
    transform: translateY(0);
    opacity: 1;
  }
}
</style>