<template>
  <div class="overlay">
    <div class="login-window">
      <h2 class="title"> Iniciar Sesión</h2>
      <form @submit.prevent="loginUser(form)" class="form">
        <input
          v-model="form.email"
          type="email"
          placeholder=" Correo electrónico"
          required
          class="input"
        />
        <input
          v-model="form.password"
          type="password"
          placeholder=" Contraseña"
          required
          class="input"
        />
        <button type="submit" class="btn">Entrar</button>
        <p v-if="error" class="error-msg">{{ error }}</p>
      </form>
      <p class="register-link">
        ¿No tienes cuenta? 
        <a href="/register">Regístrate aquí</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useLogin } from "@/composables/useLogin";

const form = reactive({ email: "", password: "" });
const { loginUser, error } = useLogin();
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


.login-window {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  padding: 2.5rem 3rem;
  max-width: 400px;
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


.register-link {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #34495e;
}

.register-link a {
  color: #2980b9;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.register-link a:hover {
  color: #1c5980;
  text-decoration: underline;
}
</style>
