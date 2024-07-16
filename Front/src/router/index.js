import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import About from '../views/AboutView.vue';
import LoginRegister from '../views/LoginRegister.vue'; // Cambiamos la importación a LoginRegister.vue

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/event/:id',
    name: 'eventSingle',
    component: () => import('../views/CinemaSingle.vue'),
  },
  {
    path: '/login', // Ruta para la página de login-register
    name: 'login',
    component: LoginRegister,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;