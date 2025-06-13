<template>
  <aside
    class="sidebar"
    :class="{ 'sidebar--open': sidebarOpen || isDesktop }"
  >
    <div class="sidebar__header">
      <h2>Mi Empresa</h2>
      <button 
        v-if="!isDesktop" 
        class="sidebar__close-btn"
        @click="toggleSidebar"
        aria-label="Cerrar menú"
      >
        ×
      </button>
    </div>
    <nav class="sidebar__nav">
      <router-link
        v-for="link in links"
        :key="link.path"
        :to="link.path"
        class="sidebar__link"
        :class="{ active: isActive(link.path) }"
        @click="closeSidebarOnMobile"
      >
        {{ link.label }}
      </router-link>

      
      <button class="sidebar__link logout-button" @click="logout">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon-logout" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5" />
        </svg>
        Cerrar sesión
      </button>
    </nav>
  </aside>
</template>

<script setup>
import { inject } from 'vue';
import { useRoute } from 'vue-router';
import { useLogout } from '@/composables/useLogout';

const { logout } = useLogout();

const sidebarOpen = inject('sidebarOpen');
const toggleSidebar = inject('toggleSidebar');
const closeSidebarOnMobile = inject('closeSidebarOnMobile');
const isDesktop = inject('isDesktop');

const route = useRoute();

const links = [
  { path: '/dashboard', label: 'Inicio' },
  { path: '/dashboard/productos', label: 'Productos' },
  { path: '/dashboard/categorias', label: 'Categorías' },
  { path: '/dashboard/perfil', label: 'Perfil' }
];

function isActive(path) {
  return route.path === path;
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100vh;
  background-color: #222;
  color: white;
  transition: left 0.3s ease;
  z-index: 20;
  display: flex;
  flex-direction: column;
}

.sidebar--open {
  left: 0;
}

@media (min-width: 768px) {
  .sidebar {
    left: 0;
    position: fixed;
  }
}

.sidebar__header {
  padding: 1rem;
  border-bottom: 1px solid #444;
  text-align: center;
  background-color: #111;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar__close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 0.5rem;
}

.sidebar__nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow-y: auto;
}

.sidebar__link {
  color: white;
  text-decoration: none;
  padding: 0.75rem;
  margin-bottom: 0.25rem;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s;
  background: none;
  border: none;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sidebar__link:hover,
.sidebar__link.active {
  color: #00bcd4;
  background-color: rgba(255, 255, 255, 0.1);
}


.logout-button {
  margin-top: auto;
  color: #ff4d4d;
  font-weight: 600;
}

.logout-button:hover {
  background-color: rgba(248, 113, 113, 0.15);
 color: #ff1a1a;
}

.icon-logout {
  width: 20px;
  height: 20px;
}
</style>
