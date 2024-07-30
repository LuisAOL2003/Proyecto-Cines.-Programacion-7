<template>
  <nav class="navbar container" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <!-- Logo -->
      <a class="navbar-item" href="/">
        <img src="../../assets/logosmall.png" alt="Logo Cinecity" style="max-height: 2.5rem; max-width: 2.5rem; margin-right: 10px;">
        <strong class="is-size-4 has-text-white">Cinecity: Tu cine, Tu Película (Admin)</strong>
      </a>
      <!-- Menú hamburguesa para dispositivos móviles -->
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarAdminMenu"
        @click="toggleMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <!-- Menú de navegación -->
    <div id="navbarAdminMenu" class="navbar-menu" :class="{'is-active': isMenuActive}">
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
  data() {
    return {
      isMenuActive: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },
    async logout() {
      try {
        const token = Cookies.get('accessToken');
        if (!token) {
          console.error('No se encontró el token');
          return;
        }

        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.id;

        await axios.post('http://localhost:3000/api/auth/logout', { id: userId });

        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');

        this.$router.push('/login');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  margin-top: 25px;
  margin-bottom: 30px;
  background-color: #2c3e50;
  &.is-active {
    background-color: #2c3e50;
  }
  .navbar-brand, .navbar-menu {
    height: 60px;
    line-height: 60px;
  }
  .navbar-item {
    font-weight: bold;
    color: #ffffff;
    &.router-link-exact-active {
      color: #d88d00;
    }
  }
  .navbar-burger {
    color: #ffffff;
    span {
      background-color: #ffffff;
    }
  }
  .navbar-menu {
    &.is-active {
      display: block;
      position: absolute;
      top: 60px;
      left: 0;
      width: 100%;
      background-color: #2c3e50;
      z-index: 10;
      .navbar-start,
      .navbar-end {
        display: flex;
        flex-direction: column;
        .navbar-item {
          color: #ffffff;
          padding: 10px 20px;
        }
      }
    }
  }
}

.buttons .button {
  background-color: #ff6347;
}

.buttons .button:hover {
  background-color: #e5533c;
}
</style>
