import api from '@/api/axiosConfig'; 

export async function logoutUser() {
  return await api.post('api/logout');
}
