
<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <h2>Eliminar Producto</h2>
      <p>¿Estás seguro de que deseas eliminar el producto "{{ productName }}"? Esta acción no se puede deshacer.</p>
      <div class="modal-actions">
        <button type="button" @click="closeModal" class="btn-cancel">Cancelar</button>
        <button type="button" @click="confirmDelete" class="btn-delete">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  productName: String
});

const emit = defineEmits(['confirmDelete', 'close']);

const confirmDelete = () => {
  emit('confirmDelete');
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

h2 {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 18px;
  color: #333;
}

p {
  margin-bottom: 24px;
  color: #333;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.btn-cancel {
  padding: 8px 16px;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-delete {
  padding: 8px 16px;
  background: #d32f2f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>