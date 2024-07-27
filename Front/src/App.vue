<template>
  <div id="app">
    <Nav v-if="!isAdminView && !isSeatsView && !isClientView" />
    <NavAdmin v-if="isAdminView || isSeatsView" @logout="handleLogout" />
    <NavCliente v-if="isClientView" @logout="handleLogout" />
    <router-view @routeChanged="handleRouteChange" />
    <Footer />
  </div>
</template>

<script>
import Nav from './components/partials/Nav.vue';
import NavAdmin from './components/partials/NavAdmin.vue';
import NavCliente from './components/partials/NavCliente.vue'; // Importar el nuevo componente
import Footer from './components/partials/Footer.vue';
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'App',
  components: {
    Nav,
    NavAdmin,
    NavCliente, // Registrar el nuevo componente
    Footer,
  },
  setup() {
    const isAdminView = ref(false);
    const isSeatsView = ref(false);
    const isClientView = ref(false); // Agregar esta variable
    const route = useRoute();
    const router = useRouter();

    function handleRouteChange(route) {
      isAdminView.value = route.meta.isAdminView || false;
      isSeatsView.value = route.name === 'Seats';
      isClientView.value = route.meta.isClientView || false; // Actualizar según meta
    }

    function handleLogout() {
      isAdminView.value = false;
      isSeatsView.value = false;
      isClientView.value = false; // Limpiar estado del cliente
      localStorage.removeItem('token'); // Asegúrate de cerrar sesión correctamente
      router.push('/'); // Redirigir a la página de inicio después de cerrar sesión
    }

    watch(route, () => {
      handleRouteChange(route);
    });

    onMounted(() => {
      handleRouteChange(route);
    });

    return {
      isAdminView,
      isSeatsView,
      isClientView,
      handleRouteChange,
      handleLogout,
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fdfdfd; /* Usamos el color del primer App.vue */
  background-color: #14161a; /* Fondo oscuro del primer App.vue */
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Asegura que #app ocupe todo el alto de la ventana */
}

router-view {
  flex: 1; /* Permite que el router-view ocupe el espacio restante */
}
</style>
