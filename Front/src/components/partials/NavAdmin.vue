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
          <router-link to="/" class="navbar-item">Home</router-link>
          <router-link to="/about" class="navbar-item">About</router-link>
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
  export default {
    name: 'NavAdmin',
    methods: {
      logout() {
        console.log('Implementar lógica de cierre de sesión aquí');
        this.$router.push('/'); // Redirigir a la página de inicio
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  /* Estilos específicos para NavAdmin.vue */
  nav {
    margin-top: 25px;
    margin-bottom: 30px;
    background-color: #2c3e50; /* Fondo oscuro para mejorar contraste */
    a {
      font-weight: bold;
      color: #ffffff; /* Texto blanco */
      &.router-link-exact-active {
        color: #d88d00;
      }
    }
  }
  </style>