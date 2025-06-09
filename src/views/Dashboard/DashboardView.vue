<template>
  <div class="dashboard">
    <Sidebar />

    
    <div
      v-if="sidebarOpen && !isDesktop"
      class="overlay"
      @click="toggleSidebar"
    ></div>

    <div class="main" :class="{ 'main--sidebar-open': sidebarOpen && !isDesktop }">
      <Header />
      <main class="main__content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, onMounted } from 'vue';
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';

const sidebarOpen = ref(false);
const isDesktop = ref(window.innerWidth >= 768);

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

function closeSidebarOnMobile() {
  if (!isDesktop.value) sidebarOpen.value = false;
}

function handleResize() {
  isDesktop.value = window.innerWidth >= 768;
  if (isDesktop.value) {
    sidebarOpen.value = true;
  } else {
    sidebarOpen.value = false;
  }
}

onMounted(() => {
  handleResize(); 
  window.addEventListener('resize', handleResize);
});

provide('sidebarOpen', sidebarOpen);
provide('toggleSidebar', toggleSidebar);
provide('closeSidebarOnMobile', closeSidebarOnMobile);
provide('isDesktop', isDesktop);
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  width: 100%;
}

@media (min-width: 768px) {
  .main {
    margin-left: 250px; 
  }
}

.main--sidebar-open {
  transform: translateX(250px);
}

.main__content {
  padding: 1rem;
  flex: 1;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
</style>