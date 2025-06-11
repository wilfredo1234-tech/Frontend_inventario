import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getCsrfToken, login } from '@/api/auth';
import { useAuthStore } from '@/stores/auth';
import { useLoadingStore } from '@/stores/loadingStore'; 

export function useLogin() {
  const error = ref(null);
  const router = useRouter();
  const auth = useAuthStore();
  const loading = useLoadingStore(); 

  const loginUser = async (credentials) => {
    error.value = null;
    try {
      loading.startLoading(); 

      await getCsrfToken();
      const response = await login(credentials);

      const token = response.data.access_token; 
      auth.setToken(token);

      await auth.fetchUser();

      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      error.value = err.response?.data?.message || 'Error al iniciar sesión';
    } finally {
      loading.stopLoading();
    }
  };

  return { loginUser, error };
}
