<template>
  <div id="app">
    <Nav v-if="!isAdminView" />
    <NavAdmin v-if="isAdminView" @logout="handleLogout" />
    <router-view @routeChanged="handleRouteChange" />
    <Footer v-if="!isAdminView" />
  </div>
</template>

<script> 
import Nav from './components/partials/Nav.vue'; 
import NavAdmin from './components/partials/NavAdmin.vue'; 
import Footer from './components/partials/Footer.vue'; 
import { ref, onMounted, watch } from 'vue'; 
import { useRoute, useRouter } from 'vue-router'; 
 
export default { 
  name: 'App', 
  components: { 
    Nav, 
    NavAdmin, 
    Footer, 
  }, 
  setup() { 
    const isAdminView = ref(false); 
    const isMovieCreateView = ref(false); 
    const route = useRoute(); 
    const router = useRouter(); 
 
    function handleRouteChange(route) { 
      isAdminView.value = route.meta.isAdminView || false; 
      isMovieCreateView.value = route.name === 'movieCreate'; 
    } 
 
    function handleLogout() { 
      isAdminView.value = false; 
      isMovieCreateView.value = false; 
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
      isMovieCreateView, 
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

