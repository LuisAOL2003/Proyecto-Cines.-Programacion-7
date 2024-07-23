<template>
  <div class="movie-details">
    <div class="container">
      <h1 class="title">{{ movie.título }}</h1>
      <div class="details">
        <img :src="movie.imagenurl" alt="Movie Image" class="movie-image" />
        <div class="info">
          <p class="description">{{ movie.descripción }}</p>
          <div class="additional-info">
            <p v-if="movie.duración"><strong>Duración:</strong> {{ movie.duración }} minutos</p>
            <p v-if="movie.clasificación"><strong>Clasificación:</strong> {{ movie.clasificación }}</p>
            <p v-if="movie.género"><strong>Género:</strong> {{ movie.género }}</p>
            <p v-if="movie.fechaestreno"><strong>Fecha de Estreno:</strong> {{ new Date(movie.fechaestreno).toLocaleDateString() }}</p>
            <p v-if="movie.idiomaoriginal"><strong>Idioma Original:</strong> {{ movie.idiomaoriginal }}</p>
          </div>
        </div>
      </div>
      <!-- Nuevo contenido -->
      <div class="schedule-section">
        <h2 class="schedule-title">Seleccione su horario y sala</h2>
        <div class="schedule-subtitle">Horarios y salas disponibles</div>
        <!-- Horarios -->
        <div class="schedules">
          <div v-for="schedule in schedules" :key="schedule.ID_horario" class="schedule-box">
            <p class="schedule-date"><strong>Fecha:</strong> {{ new Date(schedule.fecha).toLocaleDateString() }}</p>
            <div class="schedule-times">
              <p><strong>Hora Inicio:</strong> {{ schedule.horainicio }}</p>
              <p><strong>Hora Fin:</strong> {{ schedule.horafin }}</p>
            </div>
            <p class="schedule-room"><strong>Sala:</strong> {{ schedule.nombre_sala }}</p>
            <button @click="selectSchedule(schedule.ID_horario)">Seleccionar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieDetails',
  data() {
    return {
      movie: {},
      schedules: [], // Añadimos este estado para los horarios
    };
  },
  async created() {
    const id = this.$route.params.id;
    const type = this.$route.query.tipo || 'peliculas';

    try {
      const url = type === 'Cartelera' || type === 'Próximo estreno'
        ? `http://localhost:3000/api/cartelera/${id}`
        : `http://localhost:3000/api/movies/${id}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      this.movie = await response.json();

      // Obtener los horarios de la película
      const schedulesResponse = await fetch(`http://localhost:3000/api/schedules/movie/${id}`);
      if (!schedulesResponse.ok) {
        throw new Error(`HTTP error! Status: ${schedulesResponse.status}`);
      }
      this.schedules = await schedulesResponse.json();
    } catch (error) {
      console.error('Error al cargar los detalles:', error);
    }
  },
  methods: {
    selectSchedule() {
      this.$router.push(`/seats`);
    }
  }
};
</script>

<style scoped>
.movie-details {
  background-color: #f5f5f5;
  padding: 20px 0;
  width: 100%;
  margin-top: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.title {
  text-align: center;
  color: #000;
}

.details {
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
  width: 100%;
}

.movie-image {
  max-width: 200px;
  margin-right: 20px;
  border: 2px solid #000;
}

.info {
  flex-grow: 1;
  color: #000;
}

.description {
  margin-bottom: 20px;
  color: #000;
}

.additional-info {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.additional-info p {
  flex: 1 1 45%;
  color: #000;
}

.schedule-section {
  margin-top: 40px;
}

.schedule-title {
  text-align: center;
  color: #000;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.schedule-subtitle {
  color: #333;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.schedules {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.schedule-box {
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1 1 calc(25% - 20px);
  margin-bottom: 20px;
  text-align: center;
}

.schedule-box p {
  margin: 5px 0;
  color: #000;
}

.schedule-date,
.schedule-room {
  font-weight: bold;
}

.schedule-times {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.schedule-box button {
  background-color: #ff6347;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.schedule-box button:hover {
  background-color: #e5533c;
}
</style>
