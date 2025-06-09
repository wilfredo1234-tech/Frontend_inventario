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
    </nav>
  </aside>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

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
}

.sidebar__link:hover,
.sidebar__link.active {
  color: #00bcd4;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>