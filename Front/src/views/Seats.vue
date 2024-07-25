<template>
  <div class="container">
    <NavAdmin />
    <h2>ACA ESTAN LOS ASIENTOS PARA LA PELICULA : {{ movieTitle }}</h2>
    <Cinema
      :leftInitial="0"
      :leftColumns="4"
      :middleInitial="4"
      :middleColumns="12"
      :rightInitial="0"
      :rightColumns="4"
      :totalRows="20"
      :maxSeats="50"
      :selectedRef="selectedRef"
      :ocupados="ocupados"
      @update:selectedRef="updateSelectedRef"
    />
    <Footer />
  </div>
</template>

<script>
import NavAdmin from '../components/partials/NavAdmin.vue';
import Footer from '../components/partials/Footer.vue';
import Cinema from '../components/Cinema.vue';

export default {
  name: 'Seats',
  components: {
    NavAdmin,
    Footer,
    Cinema,
  },
  props: {
    movieTitle: {
      type: String,
      default: 'Película'
    }
  },
  data() {
    return {
      selectedRef: [],
      ocupados: [],
    };
  },
  async created() {
    try {
      const idPelicula = this.$route.params.id_pelicula;

      if (!idPelicula) {
        throw new Error('ID de película no está disponible.');
      }

      const occupiedResponse = await fetch(`http://localhost:3000/api/reservations/projection/${idPelicula}`);
      if (!occupiedResponse.ok) {
        throw new Error('Error al obtener las reservas.');
      }

      const reservations = await occupiedResponse.json();
      console.log('Reservas obtenidas:', reservations); // Depuración
      this.ocupados = reservations.map(reservation => reservation.ID_asiento);
      console.log('Asientos ocupados:', this.ocupados); // Depuración
    } catch (error) {
      console.error(error.message);
    }
  },
  methods: {
    updateSelectedRef(selected) {
      this.selectedRef = selected;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
</style>
