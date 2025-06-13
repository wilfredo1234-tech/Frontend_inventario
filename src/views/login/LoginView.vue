<template>
  <div class="overlay">
    <div class="login-card">
      <!-- Lado izquierdo: Formulario -->
      <div class="left">
        <h2 class="title">Iniciar Sesión</h2>
        <form @submit.prevent="handleSubmit" class="form">
          <input
            v-model="form.email"
            type="email"
            placeholder="Correo electrónico"
            class="input"
          />
          <span v-if="validationErrors.email" class="error-msg">
            {{ validationErrors.email }}
          </span>

          <input
            v-model="form.password"
            type="password"
            placeholder="Contraseña"
            class="input"
          />
          <span v-if="validationErrors.password" class="error-msg">
            {{ validationErrors.password }}
          </span>

          <button type="submit" class="btn">Entrar</button>
          <p v-if="error" class="error-msg">{{ error }}</p>
        </form>

        <p class="register-link">
          ¿No tienes cuenta?
          <a href="/register">Regístrate aquí</a>
        </p>
      </div>

      <!-- Lado derecho: Información -->
      <div class="right">
        <LoginInfo />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useLogin } from '@/composables/useLogin';
import { useLoginValidation } from '@/composables/useLoginValidation';
import LoginInfo from './components/LoginInfo.vue';

const form = reactive({ email: '', password: '' });
const { loginUser, error } = useLogin();
const { validateForm, validationErrors } = useLoginValidation();

const handleSubmit = () => {
  const isValid = validateForm(form);
  if (!isValid) return;
  loginUser(form);
};
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: linear-gradient(to right, #dfe9f3, #ffffff);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  z-index: 9999;
  overflow: hidden;
}

.login-card {
  display: flex;
  width: 100%;
  max-width: 900px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  min-height: 480px;
  position: relative;
  z-index: 10;
}

/* Lado izquierdo: formulario */
.left {
  flex: 1;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
  word-break: break-word;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input {
  padding: 12px 15px;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;
}

.input:focus {
  border-color: #3498db;
  box-shadow: 0 0 5px #3498db;
}

.btn {
  background-color: #2980b9;
  color: white;
  padding: 14px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #1c5980;
}

.error-msg {
  color: #e74c3c;
  font-size: 0.9rem;
  font-weight: 600;
}

.register-link {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #34495e;
  text-align: center;
}

.register-link a {
  color: #2980b9;
  text-decoration: none;
  font-weight: bold;
}

.register-link a:hover {
  text-decoration: underline;
}

/* Lado derecho: información */
.right {
  flex: 1;
  background: linear-gradient(135deg, #4a90e2, #6a11cb);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

/* Responsive: móviles */
@media (max-width: 768px) {
  .login-card {
    flex-direction: column;
    min-height: auto;
    max-height: 95vh;
    overflow-y: auto;
  }

  .left,
  .right {
    padding: 2rem;
  }

  .title {
    font-size: 1.6rem;
  }

  .input {
    font-size: 0.95rem;
  }

  .btn {
    font-size: 1rem;
    padding: 12px;
  }
}
</style>