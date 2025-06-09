import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getCsrfToken, login } from '@/api/auth';
import { useAuthStore } from '@/stores/auth';

export function useLogin() {
  const error = ref(null);
  const router = useRouter();
  const auth = useAuthStore();

  const loginUser = async (credentials) => {
    error.value = null;
    try {
      await getCsrfToken();
      const response = await login(credentials);

      const token = response.data.access_token; 
      auth.setToken(token);

      await auth.fetchUser();
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      error.value = err.response?.data?.message || 'Error al iniciar sesión';
    }
  };

  return { loginUser, error };
}
