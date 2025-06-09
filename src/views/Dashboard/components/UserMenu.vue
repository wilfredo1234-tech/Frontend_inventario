<template>
  <div class="user-menu-container">
    <button class="user-btn" @click="toggleUserMenu" aria-label="Menú de usuario">
      <img src="https://i.pravatar.cc/40" alt="Avatar usuario" class="avatar" />
    </button>
    <div v-if="userMenuOpen" class="user-dropdown">
      <router-link to="/dashboard/perfil" class="dropdown-item" @click="userMenuOpen = false">Perfil</router-link>
      <button class="dropdown-item" @click="logout">Cerrar sesión</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const userMenuOpen = ref(false);
const router = useRouter();
const auth = useAuthStore();

function toggleUserMenu() {
  userMenuOpen.value = !userMenuOpen.value;
}

function logout() {
  auth.logout();
  router.push('/login');
}
</script>

<style scoped>
.user-menu-container {
  position: relative;
}

.user-btn {
  background: none;
  border: none;
}

.avatar {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.user-dropdown {
  position: absolute;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 0.5rem;
  padding: 0.5rem 0;
  z-index: 20;
}

.dropdown-item {
  display: block;
  padding: 0.5rem 1rem;
  color: #333;
  text-decoration: none;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>
