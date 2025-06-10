<template>
  <div class="profile-container">
    <h1 class="profile-title">👤 Mi Perfil</h1>

    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Cargando perfil...</p>
    </div>

    <div v-else-if="error" class="error-state">
      {{ error }}
    </div>

    <div v-else-if="profile" class="profile-card">
      <div class="profile-avatar">
        <div class="avatar-circle">{{ profileInitials }}</div>
        <h2>{{ profile.name }}</h2>
        <p>{{ profile.email }}</p>
      </div>
      <div class="profile-details">
        <p><strong>ID:</strong> {{ profile.id }}</p>
        <p><strong>Registrado:</strong> {{ formattedDate }}</p>
        <p>
          <strong>Email:</strong>
          <span :class="{ verified: profile.email_verified_at, unverified: !profile.email_verified_at }">
            {{ profile.email_verified_at ? "Verificado" : "No verificado" }}
          </span>
        </p>
        <button class="edit-profile-btn" @click="showEditModal = true">
          ✏️ Editar Perfil
        </button>
      </div>
    </div>

   
    <EditProfileModal
      :visible="showEditModal"
      :user="profile"
      :token="token"
      @close="showEditModal = false"
      @updated="fetchProfile"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import EditProfileModal from './components/EditProfileModal.vue';
import { useProfile } from '@/composables/useProfile';

const { profile, loading, error, fetchProfile } = useProfile();

const token = localStorage.getItem('token');
const showEditModal = ref(false);

const profileInitials = computed(() => {
  if (!profile.value?.name) return '';
  return profile.value.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
});

const formattedDate = computed(() => {
  if (!profile.value?.created_at) return '';
  const date = new Date(profile.value.created_at);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});
</script>

<style scoped>
.profile-container {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}
.profile-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
.loading-state {
  text-align: center;
  color: #555;
}
.loading-spinner {
  border: 4px solid #eee;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: auto;
  animation: spin 1s linear infinite;
}
.error-state {
  color: red;
  background: #ffecec;
  padding: 12px;
  border-left: 4px solid red;
}
.profile-card {
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}
.profile-avatar {
  background: #6e8efb;
  color: white;
  padding: 30px;
  text-align: center;
}
.avatar-circle {
  background: rgba(255, 255, 255, 0.2);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  line-height: 100px;
  font-size: 36px;
  font-weight: bold;
  margin: 0 auto 10px;
}
.profile-details {
  padding: 20px;
}
.verified {
  color: green;
}
.unverified {
  color: red;
}
.edit-profile-btn {
  display: inline-block;
  margin-top: 20px;
  background: #2c3e50;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  cursor: pointer;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
