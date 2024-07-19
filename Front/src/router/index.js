import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LoginRegister from '../views/LoginRegister.vue';
import AdminRegistered from '../views/AdminRegistered.vue';
import UserRegistered from '../views/UserRegistered.vue'; // Aquí cambia el nombre para el componente UserRegistered
import MovieCreate from '../views/MovieCreate.vue';
import CinemaSingle from '../views/CinemaSingle.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      isAdminView: false,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      isAdminView: false,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginRegister,
    meta: {
      isAdminView: false,
    },
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminRegistered,
    meta: {
      isAdminView: true,
    },
  },
  {
    path: '/user',
    name: 'user',
    component: UserRegistered,
    meta: {
      isAdminView: false,
    },
  },
  {
    path: '/movie-create',
    name: 'movieCreate',
    component: MovieCreate,
    meta: {
      isAdminView: true,
    },
  },
  {
    path: '/event/:id',
    name: 'eventSingle',
    component: CinemaSingle,
    meta: {
      isAdminView: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
