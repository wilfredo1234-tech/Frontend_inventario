// src/composables/useProfile.js
import { computed, onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { getUser } from '@/api/auth';

export function useProfile() {
  const auth = useAuthStore();
  const loading = ref(false);
  const error = ref(null);

  const fetchProfile = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await getUser();
      auth.user = response.data.user || response.data;
    } catch (err) {
      console.error('Error al obtener el perfil:', err);
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    if (!auth.user && auth.token) {
      fetchProfile();
    }
  });

  return {
    profile: computed(() => auth.user), 
    isAuthenticated: computed(() => auth.isAuthenticated),
    loading,
    error,
    fetchProfile,
  };
}
