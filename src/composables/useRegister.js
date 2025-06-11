import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getCsrfToken, register } from '@/api/auth';
import { useAuthStore } from '@/stores/auth';
import { useLoadingStore } from '@/stores/loadingStore'; 

export function useRegister() {
  const error = ref(null);
  const router = useRouter();
  const auth = useAuthStore();
  const loading = useLoadingStore(); 

  const registerUser = async (data) => {
    error.value = null;
    try {
      loading.startLoading(); 

      await getCsrfToken();
      await register(data);
      await auth.fetchUser();

      router.push('/login');
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al registrarse';
    } finally {
      loading.stopLoading(); 
    }
  };

  return { registerUser, error };
}
