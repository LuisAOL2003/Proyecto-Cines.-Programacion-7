<template>
  <nav class="navbar container" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <!-- Logo -->
      <a class="navbar-item" href="/">
        <img src="../../assets/logosmall.png" alt="Logo Cinecity" style="max-height: 2rem; max-width: 2rem; margin-right: 10px;">
        <strong class="is-size-4 has-text-white">Cinecity: Tu cine, Tu Película</strong>
      </a>
      <!-- Menú hamburguesa para dispositivos móviles -->
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarMenu"
        @click="toggleMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <!-- Menú de navegación -->
    <div id="navbarMenu" class="navbar-menu" :class="{'is-active': isMenuActive}">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">Home</router-link>
        <router-link to="/about" class="navbar-item">About</router-link>
      </div>
      <!-- Botones en la esquina derecha -->
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <button v-if="!isAdminView" class="button is-dark" @click="$router.push('/login')">
              <strong>Sign In</strong>
            </button>
            <button v-else class="button is-dark" @click="logout">
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
  props: {
    isAdminView: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isMenuActive: false, // Estado para manejar el despliegue del menú
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },
    logout() {
      this.$emit('logout');
      this.$router.push('/'); // Redirige a la página de inicio
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  margin-top: 0;
  margin-bottom: 10px;
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
        flex-direction: column; /* Asegura que los elementos se apilen verticalmente */
        .navbar-item {
          color: #ffffff;
          padding: 10px 20px; /* Espaciado para cada elemento */
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

