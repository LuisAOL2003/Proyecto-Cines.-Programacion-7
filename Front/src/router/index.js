import { createRouter, createWebHistory } from 'vue-router';
import jwtDecode from 'jwt-decode';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LoginRegister from '../views/LoginRegister.vue';
import AdminRegistered from '../views/AdminRegistered.vue';
import UserRegistered from '../views/UserRegistered.vue'; 
import MovieCreate from '../views/MovieCreate.vue';
import AssignFunctions from '../views/AssignFunctions.vue'; 
import MovieDetail from '../views/MovieDetail.vue';
import Seats from '../views/Seats.vue';
import TicketDetails from '../views/TicketDetails.vue'; 

// Helper function to get the token from cookies
function getTokenFromCookies() {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; accessToken=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

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
      isClientView: true,
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
    meta: {
      isClientView: true,
    },
    props: true
  },
  { 
    path: '/seats/:id_horario', 
    name: 'Seats', 
    component: Seats, 
    meta: { 
      isAdminView: false, 
    }, 
  }, 
  {
    path: '/ticket-details/:id_reserva',
    name: 'TicketDetails',
    component: TicketDetails,
    meta: {
      isClientView: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Guard de navegación para proteger rutas
router.beforeEach((to, from, next) => {
  const isAdminView = to.matched.some(record => record.meta.isAdminView);
  
  // Obtener el token de las cookies
  const token = getTokenFromCookies();
  let userRole = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userRole = decoded.role;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  if (isAdminView && userRole !== 'Administrador') {
    next({ name: 'login' }); // Redirigir al login si no es administrador
  } else {
    next(); // Permitir la navegación
  }
});

export default router;
