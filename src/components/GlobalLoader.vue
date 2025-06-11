<template>
  <div v-if="isLoading" class="loader-overlay">
    <div class="loader"></div>
  </div>
</template>

<script setup>
import { useLoadingStore } from '@/stores/loadingStore';
import { storeToRefs } from 'pinia'; 

const loadingStore = useLoadingStore();
const { isLoading } = storeToRefs(loadingStore); 
</script>

<style scoped>
.loader-overlay {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.8); 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
