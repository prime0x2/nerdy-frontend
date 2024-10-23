import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'register',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/verify',
      name: 'verify',
      component: () => import('../views/VerificationView.vue'),
    },
    {
      path: '/another',
      name: 'another',
      component: () => import('../views/AnotherView.vue'),
    },
  ],
});

export default router;
