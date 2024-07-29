<template>
  <div class="container">
    <h2>ACA ESTAN LOS ASIENTOS PARA LA PELICULA: {{ movieTitle }}</h2>
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
  </div>
</template>

<script>
import Cinema from '../components/Cinema.vue';

export default {
  name: 'Seats',
  components: {
    Cinema,
  },
  data() {
    return {
      selectedRef: [],
      ocupados: [],
      movieTitle: 'Error al cargar el título',
    };
  },
  async created() {
    try {
      const idHorario = this.$route.params.id_horario;

      console.log('ID de horario:', idHorario);

      if (!idHorario) {
        throw new Error('ID de horario no está disponible.');
      }

      // Obtener la información del horario de la película
      const scheduleResponse = await fetch(`http://localhost:3000/api/schedules/${idHorario}`);
      if (!scheduleResponse.ok) {
        throw new Error('Error al obtener los detalles del horario.');
      }

      const schedule = await scheduleResponse.json();
      console.log('Información del horario:', schedule);

      // Obtener el título de la película usando el ID_pelicula
      const movieResponse = await fetch(`http://localhost:3000/api/movies/${schedule.id_pelicula}`);
      if (!movieResponse.ok) {
        throw new Error('Error al obtener el título de la película.');
      }

      const movie = await movieResponse.json();
      console.log('Información de la película:', movie);

      if (movie.título) {
        this.movieTitle = movie.título;
      } else {
        this.movieTitle = 'Título no disponible';
        throw new Error('Título de la película no disponible en los detalles del horario.');
      }

      // Obtener los asientos disponibles para un horario específico
      const seatsResponse = await fetch(`http://localhost:3000/api/seats/${schedule.id_sala}/${idHorario}`);
      if (!seatsResponse.ok) {
        throw new Error('Error al obtener los asientos.');
      }

      const seats = await seatsResponse.json();
      this.ocupados = seats.filter(seat => !seat.disponible).map(seat => `${seat.fila}${seat.numero}`);

    } catch (error) {
      console.error('Error en Seats.vue:', error.message);
      this.movieTitle = 'Error al cargar el título';
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

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
</style>

