<template>
  <div class="overlay">
    <div class="register-window">
      <h2 class="title">📝 Registro</h2>
      <form @submit.prevent="handleSubmit" class="form">
        <input
          v-model="form.name"
          type="text"
          placeholder="👤 Nombre completo"
          required
          class="input"
        />
        <p v-if="validationErrors.name" class="error-msg">{{ validationErrors.name }}</p>

        <input
          v-model="form.email"
          type="email"
          placeholder="📧 Correo electrónico"
          required
          class="input"
        />
        <p v-if="validationErrors.email" class="error-msg">{{ validationErrors.email }}</p>

        <input
          v-model="form.password"
          type="password"
          placeholder="🔒 Contraseña"
          required
          class="input"
        />
        <p v-if="validationErrors.password" class="error-msg">{{ validationErrors.password }}</p>

        <div v-if="form.password" class="password-rules-list">
          <p :class="{'valid': rules.minLength, 'invalid': !rules.minLength}">
            {{ rules.minLength ? '✅' : '❌' }} Mínimo 6 caracteres
          </p>
          <p :class="{'valid': rules.uppercase, 'invalid': !rules.uppercase}">
            {{ rules.uppercase ? '✅' : '❌' }} Al menos una mayúscula
          </p>
          <p :class="{'valid': rules.lowercase, 'invalid': !rules.lowercase}">
            {{ rules.lowercase ? '✅' : '❌' }} Al menos una minúscula
          </p>
          <p :class="{'valid': rules.number, 'invalid': !rules.number}">
            {{ rules.number ? '✅' : '❌' }} Al menos un número
          </p>
          <p :class="{'valid': rules.specialChar, 'invalid': !rules.specialChar}">
            {{ rules.specialChar ? '✅' : '❌' }} Al menos un carácter especial
          </p>
        </div>

        <input
          v-model="form.password_confirmation"
          type="password"
          placeholder="🔒 Confirmar contraseña"
          required
          class="input"
        />
        <p v-if="validationErrors.password_confirmation" class="error-msg">{{ validationErrors.password_confirmation }}</p>

        <p class="forgot">¿Olvidaste tu contraseña? <a href="#">Click aquí</a></p>

        <button type="submit" class="btn">Registrar</button>

        <p v-if="error" class="error-msg">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useRegister } from "@/composables/useRegister";
import { useRegisterValidation } from "@/composables/useRegisterValidation";

const form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const { registerUser, error } = useRegister();
const { validateRegisterForm, validationErrors } = useRegisterValidation();

const handleSubmit = () => {
  if (validateRegisterForm(form)) {
    registerUser(form);
  }
};

// Validación en tiempo real
const rules = computed(() => ({
  minLength: form.password.length >= 6,
  uppercase: /[A-Z]/.test(form.password),
  lowercase: /[a-z]/.test(form.password),
  number: /\d/.test(form.password),
  specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(form.password),
}));
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  z-index: 9999;
}

.register-window {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  padding: 2.5rem 3rem;
  max-width: 420px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input {
  padding: 12px 15px;
  font-size: 1rem;
  border: 2px solid #bdc3c7;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.input:focus {
  border-color: #3498db;
  box-shadow: 0 0 6px #3498db;
}

.forgot {
  font-size: 0.85rem;
  text-align: left;
  color: #7f8c8d;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
}

.forgot a {
  color: #2980b9;
  text-decoration: none;
  font-weight: 600;
}

.btn {
  background-color: #2980b9;
  color: white;
  padding: 14px 0;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #1c5980;
}

.error-msg {
  color: #e74c3c;
  font-weight: 600;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.password-rules-list {
  font-size: 0.85rem;
  margin-top: -0.3rem;
  margin-bottom: 0.5rem;
  text-align: left;
  line-height: 1.5;
}

.valid {
  color: #27ae60; /* verde */
}

.invalid {
  color: #95a5a6; /* gris */
}
</style>
