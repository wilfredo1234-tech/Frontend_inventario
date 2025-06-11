import { defineStore } from 'pinia';
import { getUser, logout } from '@/api/auth';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null, 
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    async fetchUser() {
      if (!this.token) {
        this.user = null;
        return;
      }
      try {
        const res = await getUser();
        this.user = res.data.user || res.data;
      } catch (err) {
        console.error('Error al obtener el usuario:', err);
        this.user = null;
      }
    },
    async logoutUser() {
  try {
    await logout();
  } catch (err) {
    console.error('Error al cerrar sesión en el backend:', err);
  }
  this.user = null;
  this.token = null;
  localStorage.removeItem('token');
}

  },
});
