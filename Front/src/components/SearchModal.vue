<template>
  <div class="search-modal">
    <h2>Buscar película</h2>
    <input type="text" v-model="searchQuery" @input="searchMovie" placeholder="Buscar película..." />
    <div v-if="movie">
      <h3>{{ movie.title }}</h3>
      <img :src="movie.imageUrl" :alt="movie.title" class="movie-image" />
      <form @submit.prevent="submitForm">
        <label for="title">Título</label>
        <input type="text" id="title" v-model="movie.title" />

        <label for="description">Descripción</label>
        <textarea id="description" v-model="movie.description"></textarea>

        <label for="duration">Duración</label>
        <input type="text" id="duration" v-model="movie.duration" />

        <label for="classification">Clasificación</label>
        <input type="text" id="classification" v-model="movie.classification" />

        <label for="genre">Género</label>
        <input type="text" id="genre" v-model="movie.genre" />

        <label for="releaseDate">Fecha de Estreno</label>
        <input type="text" id="releaseDate" v-model="movie.releaseDate" />

        <label for="originalLanguage">Idioma Original</label>
        <input type="text" id="originalLanguage" v-model="movie.originalLanguage" />

        <div class="button-container">
          <button type="submit">Guardar Película</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'SearchModal',
  data() {
    return {
      searchQuery: '',
      movie: null,
    };
  },
  methods: {
    async searchMovie() {
      if (this.searchQuery.length > 2) {
        try {
          const response = await fetch(`http://localhost:3000/api/movies/search/${this.searchQuery}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          this.movie = data.length ? data[0] : null;
        } catch (error) {
          console.error('Error fetching movie data:', error);
        }
      } else {
        this.movie = null;
      }
    },
    async submitForm() {
      try {
        const response = await fetch('http://localhost:3000/api/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(this.movie),
        });
        if (!response.ok) {
          throw new Error('Error saving movie');
        }
        const data = await response.json();
        this.$emit('add-movie', data);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'La película se ha guardado con éxito',
        });
      } catch (error) {
        console.error('Error saving movie:', error);
      }
    },
  },
};
</script>

<style scoped>
.search-modal {
  background-color: #2a2a2a;
  padding: 20px;
  border-radius: 8px;
  max-width: 700px; /* Ampliar el modal */
  margin: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  margin-bottom: 20px; /* Margen inferior para evitar cercanía al footer */
  margin-top: 50px; /* Ajustar este valor para mover el contenido hacia arriba */
}

.search-modal h2 {
  margin-bottom: 20px;
  text-align: center;
  color: rgb(248, 246, 246); /* Color blaco para el h2 */
  font-size: 24px; /* Tamaño de fuente más grande para el h2 */
}

.search-modal input,
.search-modal textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-modal textarea {
  height: 150px; /* Altura más grande para la descripción */
  resize: none; /* Eliminar la capacidad de redimensionar */
}

.search-modal label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: rgb(255, 247, 247); /* Color negro para los labels */
}

.search-modal h3 {
  margin: 0 0 10px 0;
  color: #fffdfd;
}

.search-modal img.movie-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto; /* Centrar la imagen */
}

.button-container {
  display: flex;
  justify-content: center;
}

.search-modal button {
  background-color: #ff6347;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>



