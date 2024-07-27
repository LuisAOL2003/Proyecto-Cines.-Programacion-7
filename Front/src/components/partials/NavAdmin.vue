<template>
  <nav class="navbar container" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <!-- Logo -->
      <a class="navbar-item" href="/">
        <img src="../../assets/logosmall.png" alt="Logo Cinecity" style="max-height: 2.5rem; max-width: 2.5rem; margin-right: 10px;">
        <strong class="is-size-4 has-text-white">Cinecity: Tu cine, Tu Película (Admin)</strong>
      </a>
      <!-- Menú hamburguesa para dispositivos móviles -->
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <!-- Menú de navegación -->
    <div id="navbar" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/admin" class="navbar-item">Home</router-link>
        <router-link to="/movie-create" class="navbar-item">Peliculas</router-link>
        <router-link to="/assign-functions" class="navbar-item">Funciones</router-link>
      </div>
      <!-- Botones en la esquina derecha -->
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <button class="button is-dark" @click="logout">
              <strong>Log Out</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  name: 'NavAdmin',
  methods: {
    async logout() {
      try {
        // Obtener el ID del usuario del token decodificado
        const token = Cookies.get('accessToken');
        if (!token) {
          console.error('No se encontró el token');
          return;
        }

        // Decodificar el token para obtener el ID del usuario
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.id;

        // Realizar la solicitud de cierre de sesión al backend
        await axios.post('http://localhost:3000/api/auth/logout', { id: userId });

        // Limpiar cookies y cualquier estado del usuario en el frontend
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');

        // Redirigir a la página de inicio o login
        this.$router.push('/login');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

nav {
  margin-top: 25px;
  margin-bottom: 30px;
  background-color: #2c3e50; 
  a {
    font-weight: bold;
    color: #ffffff; 
    &.router-link-exact-active {
      color: #d88d00;
    }
  }
}

button {
  background-color: #ff6347;
}

button:hover {
  background-color: #e5533c;
}
</style>
