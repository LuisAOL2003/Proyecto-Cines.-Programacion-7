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
            <div v-for="schedule in schedules" :key="schedule.ID_horario" class="schedule-card">
              <p><strong>Fecha:</strong> {{ new Date(schedule.fecha).toLocaleDateString() }}</p>
              <p><strong>Hora Inicio:</strong> {{ schedule.horainicio }}</p>
              <p><strong>Hora Fin:</strong> {{ schedule.horafin }}</p>
              <p><strong>Sala:</strong> {{ schedule.nombre_sala }}</p>
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
  };
  </script>
  
  <style scoped>
  .movie-details {
    background-color: #f5f5f5;
    padding: 20px 0;
    width: 100%;
    margin-top: 0; /* Sin margen superior para ajustar el contenido hacia arriba */
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px; /* Ajusta el espaciado interno si es necesario */
  }
  
  .title {
    text-align: center;
    color: #000; /* Color del texto en negro */
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
    border: 2px solid #000; /* Borde negro */
  }
  
  .info {
    flex-grow: 1;
    color: #000; /* Color del texto en negro */
  }
  
  .description {
    margin-bottom: 20px;
    color: #000; /* Color del texto en negro */
  }
  
  .additional-info {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .additional-info p {
    flex: 1 1 45%;
    color: #000; /* Color del texto en negro */
  }
  
  /* Nuevo estilo para la sección de horarios */
  .schedule-section {
    margin-top: 40px;
  }
  
  .schedule-title {
    text-align: center;
    color: #000;
    font-weight: bold; /* Negrita */
    font-size: 1.5rem; /* Tamaño de fuente más grande */
    margin-bottom: 10px;
  }
  
  .schedule-subtitle {
    color: #333;
    font-weight: bold; /* Negrita */
    font-size: 1.2rem; /* Tamaño de fuente más grande */
    margin-bottom: 20px;
  }
  
  .schedules {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .schedule-card {
    background-color: #fff;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex: 1 1 calc(25% - 20px); /* Cuatro cuadros por fila, con espacio entre ellos */
    margin-bottom: 20px;
  }
  
  .schedule-card p {
    margin: 5px 0;
    color: #000;
  }
  </style>
  