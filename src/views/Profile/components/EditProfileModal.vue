<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <h2>Editar Perfil</h2>

      <form @submit.prevent="submitUpdate">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input v-model="form.name" id="name" type="text" required />
        </div>

        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input v-model="form.email" id="email" type="email" required />
        </div>

        <div class="form-group">
          <label for="password">Nueva Contraseña</label>
          <input v-model="form.password" id="password" type="password" />
        </div>

        <div class="form-group">
          <label for="password_confirmation">Confirmar Contraseña</label>
          <input v-model="form.password_confirmation" id="password_confirmation" type="password" />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-save">Guardar Cambios</button>
          <button type="button" class="btn-cancel" @click="closeModal">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import { updateProfile } from '@/api/profile';

const props = defineProps({
  visible: Boolean,
  user: Object,
  token: String
});
const emit = defineEmits(['close', 'updated']);

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
});

// Cargar datos del usuario cuando se abra el modal
watch(() => props.visible, (val) => {
  if (val && props.user) {
    form.value.name = props.user.name;
    form.value.email = props.user.email;
    form.value.password = '';
    form.value.password_confirmation = '';
  }
});

const closeModal = () => emit('close');

const submitUpdate = async () => {
  try {
    await updateProfile(props.token, form.value);
    emit('updated');
    closeModal();
  } catch (err) {
    alert(err);
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}
.form-group input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.btn-save {
  background: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.btn-cancel {
  background: #ccc;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
