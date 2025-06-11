<template>
  <div class="user-menu-container">
    <button class="user-btn" @click="toggleUserMenu" aria-label="Menú de usuario">
      <img src="https://i.pravatar.cc/40" alt="Avatar usuario" class="avatar" />
    </button>
    <div v-if="userMenuOpen" class="user-dropdown">
      <router-link to="/dashboard/perfil" class="dropdown-item" @click="userMenuOpen = false">
        Perfil
      </router-link>
      <button class="dropdown-item" @click="logout">
        Cerrar sesión
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useLogout } from '@/composables/useLogout';

const userMenuOpen = ref(false);
const { logout } = useLogout();

function toggleUserMenu() {
  userMenuOpen.value = !userMenuOpen.value;
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
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  margin-top: 0.5rem;
  padding: 0.5rem 0;
  z-index: 20;
  min-width: 180px;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #111827; 
  text-decoration: none;
  width: 100%;
  text-align: left;
  font-size: 0.95rem;
  font-weight: 500;
  transition: background-color 0.2s ease, color 0.2s ease;
  background-color: transparent;
  border: none;
}

.dropdown-item:hover {
  background-color: #f9fafb; 
  color: #1f2937;
  cursor: pointer;
}
</style>
