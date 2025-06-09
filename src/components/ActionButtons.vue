<template>
  <div class="action-buttons">
    <button
      class="action-btn edit-btn"
      @click.stop="$emit('edit')"
      title="Editar"
    >
      <svg viewBox="0 0 24 24" class="icon">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
      </svg>
    </button>
    <button
      class="action-btn delete-btn"
      @click.stop="$emit('delete')"
      title="Eliminar"
    >
      <svg viewBox="0 0 24 24" class="icon">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
defineEmits(['edit', 'delete']);
</script>

<style scoped>
.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  padding: 0;
  transition: transform 0.2s, opacity 0.2s;
}

.action-btn:hover {
  transform: scale(1.1);
  opacity: 0.9;
}

.edit-btn {
  background-color: #e3f2fd;
}

.edit-btn .icon {
  width: 16px;
  height: 16px;
  fill: #1976d2;
}

.delete-btn {
  background-color: #ffebee;
}

.delete-btn .icon {
  width: 16px;
  height: 16px;
  fill: #d32f2f;
}
</style>