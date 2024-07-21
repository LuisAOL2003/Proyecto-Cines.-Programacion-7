<template>
  <div>
    <!-- Contenido principal -->
    <main class="main-content">
      <h1 class="title">Asignar funciones</h1>

      <section class="form-section">
        <h2 class="section-title">Asignar horarios</h2>
        <form @submit.prevent="submitScheduleForm">
          <label for="movieId">Película</label>
          <select id="movieId" v-model="schedule.id_pelicula">
            <option v-for="movie in movies" :key="movie.id_pelicula" :value="movie.id_pelicula">
              {{ movie.título }}
            </option>
          </select>

          <label for="roomId">Sala</label>
          <select id="roomId" v-model="schedule.id_sala">
            <option v-for="hall in halls" :key="hall.id_sala" :value="hall.id_sala">
              {{ hall.nombre }}
            </option>
          </select>

          <label for="date">Fecha</label>
          <input type="date" id="date" v-model="schedule.fecha" :min="currentDate" />

          <label for="startTime">Hora de Inicio</label>
          <input type="time" id="startTime" v-model="schedule.horaInicio" />

          <label for="endTime">Hora de Fin</label>
          <input type="time" id="endTime" v-model="schedule.horaFin" />

          <button type="submit">Guardar Funcion</button>
        </form>
      </section>

      <section class="form-section">
        <h2 class="section-title">Categoría de Película</h2>
        <form @submit.prevent="submitCategoryForm">
          <label for="movieIdCategory">Película</label>
          <select id="movieIdCategory" v-model="category.ID_Película">
            <option v-for="movie in movies" :key="movie.id_pelicula" :value="movie.id_pelicula">
              {{ movie.título }}
            </option>
          </select>

          <label for="startDate">Fecha de Inicio</label>
          <input type="date" id="startDate" v-model="category.FechaInicio" :min="currentDate" />

          <label for="endDate">Fecha de Fin</label>
          <input type="date" id="endDate" v-model="category.FechaFin" :min="currentDate" />

          <label for="type">Tipo</label>
          <select id="type" v-model="category.Tipo">
            <option value="Cartelera">Cartelera</option>
            <option value="Próximo estreno">Próximo estreno</option>
          </select>

          <button type="submit">Guardar Categoría</button>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'AssignFunctions',
  data() {
    return {
      schedule: {
        id_pelicula: '',
        id_sala: '',
        fecha: '',
        horaInicio: '',
        horaFin: ''
      },
      category: {
        ID_Película: '',
        FechaInicio: '',
        FechaFin: '',
        Tipo: ''
      },
      movies: [], // Aquí se llenarán los datos de películas
      halls: [],  // Aquí se llenarán los datos de salas
      currentDate: new Date().toISOString().split('T')[0] // Fecha actual en formato YYYY-MM-DD
    };
  },
  async created() {
    try {
      const [moviesResponse, hallsResponse] = await Promise.all([
        fetch('http://localhost:3000/api/movies'),
        fetch('http://localhost:3000/api/halls')
      ]);

      this.movies = await moviesResponse.json();
      this.halls = await hallsResponse.json();
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  },
  methods: {
    async submitScheduleForm() {
      try {
        const response = await fetch('http://localhost:3000/api/schedules', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(this.schedule)
        });
        if (!response.ok) throw new Error('Error al guardar Funcion');
        const data = await response.json();
        console.log('Funcion guardada:', data);

        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Funcion creada correctamente',
        });

        // Limpiar formulario
        this.schedule = {
          id_pelicula: '',
          id_sala: '',
          fecha: '',
          horaInicio: '',
          horaFin: ''
        };
      } catch (error) {
        console.error('Error al guardar horario:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al guardar horario',
        });
      }
    },
    async submitCategoryForm() {
      try {
        const response = await fetch('http://localhost:3000/api/cartelera', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(this.category)
        });
        if (!response.ok) throw new Error('Error al guardar categoría');
        const data = await response.json();
        console.log('Categoría guardada:', data);

        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Categoría de película creada correctamente',
        });

        // Limpiar formulario
        this.category = {
          ID_Película: '',
          FechaInicio: '',
          FechaFin: '',
          Tipo: ''
        };
      } catch (error) {
        console.error('Error al guardar categoría:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al guardar categoría',
        });
      }
    }
  }
};
</script>

<style scoped>
/* Contenido principal */
.main-content {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

/* Título principal */
.title {
  text-align: center;
  font-size: 32px;
  margin-bottom: 30px;
  color: rgb(255, 255, 255);
}

/* Sección de formularios */
.form-section {
  margin-bottom: 40px;
}

.section-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: rgb(255, 255, 255);
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  font-weight: bold;
  color: rgb(255, 255, 255);
}

input,
select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
