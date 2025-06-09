<template>
  <header class="header">
    <button
      class="hamburger"
      @click="toggleSidebar"
      v-if="!isDesktop"
      aria-label="Abrir menú"
    >
      ☰
    </button>
    <h1 class="header__title">Panel de Control</h1>
    <UserMenu />
  </header>
</template>

<script setup>
import { inject } from 'vue';
import UserMenu from './UserMenu.vue';

const toggleSidebar = inject('toggleSidebar');
const isDesktop = inject('isDesktop');
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border-bottom: 1px solid #ddd;
  position: sticky;
  top: 0;
  z-index: 15;
  gap: 1rem;
}

.hamburger {
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
}

.header__title {
  font-size: 1.25rem;
  font-weight: bold;
  flex-grow: 1;
  margin: 0;
}
</style>