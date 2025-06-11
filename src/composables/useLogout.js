import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'; 
import { useLoadingStore } from '@/stores/loadingStore';

export function useLogout() {
  const router = useRouter();
  const loading = useLoadingStore();
  const auth = useAuthStore(); 

  const logout = async () => {
    try {
      loading.startLoading();
      await auth.logoutUser(); 
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      loading.stopLoading(); 
      router.push('/login'); 
    }
  };

  return {
    logout,
  };
}
