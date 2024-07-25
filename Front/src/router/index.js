import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LoginRegister from '../views/LoginRegister.vue';
import AdminRegistered from '../views/AdminRegistered.vue';
import UserRegistered from '../views/UserRegistered.vue'; 
import MovieCreate from '../views/MovieCreate.vue';
import CinemaSingle from '../views/CinemaSingle.vue';
import AssignFunctions from '../views/AssignFunctions.vue'; 
import MovieDetail from '../views/MovieDetail.vue';
import Seats from '../views/Seats.vue';


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
    path: '/assign-functions',
    name: 'assignFunctions',
    component: AssignFunctions,
    meta: {
      isAdminView: true, 
    },
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: MovieDetail,
    props: true
  },
  { 
    path: '/seats', 
    name: 'Seats', 
    component: Seats, // Asegúrate de que esta línea esté correcta 
    meta: { 
      isAdminView: false, 
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
