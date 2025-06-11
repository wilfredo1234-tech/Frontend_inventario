import { useRouter } from 'vue-router';
import { logoutUser } from '@/api/logout';
import { useLoadingStore } from '@/stores/loadingStore';

export function useLogout() {
  const router = useRouter();
  const loading = useLoadingStore();

  const logout = async () => {
    try {
      loading.startLoading();
      await logoutUser();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      localStorage.removeItem('token');
      loading.stopLoading(); 
      router.push('/login');
    }
  };

  return {
    logout,
  };
}
