import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/login/LoginView.vue';
import RegisterView from '@/views/register/RegisterView.vue';
import DashboardView from '@/views/Dashboard/DashboardView.vue';
import DashboardHome from '@/views/Dashboard/components/DashboardHome.vue';
import ProductsView from '@/views/Products/Products.vue';
import CategoriesView from '@/views/Categories/Categories.vue'; // Nueva importación
import { useAuthStore } from '@/stores/auth';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard-home',
        component: DashboardHome,
      },
      {
        path: 'productos',
        name: 'productos',
        component: ProductsView,
      },
      {
        path: 'categorias',
        name: 'categorias',
        component: CategoriesView,
      },
      {
  path: 'perfil',
  name: 'perfil',
  component: () => import('@/views/Profile/ProfileView.vue'),
},

    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next('/login');
  }

  next();
});

export default router;