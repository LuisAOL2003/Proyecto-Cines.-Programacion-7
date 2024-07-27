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
import NavCliente from './components/partials/NavCliente.vue'; 
import Footer from './components/partials/Footer.vue';
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'App',
  components: {
    Nav,
    NavAdmin,
    NavCliente, 
    Footer,
  },
  setup() {
    const isAdminView = ref(false);
    const isSeatsView = ref(false);
    const isClientView = ref(false); 
    const route = useRoute();
    const router = useRouter();

    function handleRouteChange(route) {
      isAdminView.value = route.meta.isAdminView || false;
      isSeatsView.value = route.name === 'Seats';
      isClientView.value = route.meta.isClientView || false; 
    }

    function handleLogout() {
      isAdminView.value = false;
      isSeatsView.value = false;
      isClientView.value = false; 
      localStorage.removeItem('token'); 
      router.push('/'); 
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
  color: #fdfdfd; 
  background-color: #14161a; 
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
}

router-view {
  flex: 1; 
}
</style>
