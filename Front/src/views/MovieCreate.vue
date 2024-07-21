<template>
  <div class="movie-create-container">
    <SearchModal
      :isActive="isModalActive"
      @close="isModalActive = false"
      @add-movie="handleAddMovie"
    />
    <div v-if="addedMovie" class="movie-details">
      <h2 class="title">{{ addedMovie.title }}</h2>
      <p>{{ addedMovie.description }}</p>
      <p><strong>Duración:</strong> {{ addedMovie.duration }}</p>
      <p><strong>Clasificación:</strong> {{ addedMovie.classification }}</p>
      <p><strong>Género:</strong> {{ addedMovie.genre }}</p>
      <p><strong>Fecha de Estreno:</strong> {{ addedMovie.releaseDate }}</p>
      <p><strong>Idioma Original:</strong> {{ addedMovie.originalLanguage }}</p>
      <img :src="addedMovie.imageUrl" alt="Movie Poster" v-if="addedMovie.imageUrl" />
    </div>
  </div>
</template>

<script>
import SearchModal from '../components/SearchModal.vue';

export default {
  name: 'MovieCreate',
  components: {
    SearchModal,
  },
  data() {
    return {
      isModalActive: true,
      addedMovie: null,
    };
  },
  methods: {
    async handleAddMovie(movie) {
      try {
        const response = await fetch('http://localhost:3000/api/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(movie),
        });
        const data = await response.json();
        this.addedMovie = data;
        this.isModalActive = false;
      } catch (error) {
        console.error('Error saving movie:', error);
      }
    },
  },
};
</script>

<style scoped>
.movie-create-container {
  min-height: 80vh; /* Asegurar que el contenedor tenga una altura mínima */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px; /* Agregar margen inferior */
}

.movie-details {
  text-align: center;
  margin-top: 20px;
}

.movie-details img {
  max-width: 100%;
  height: auto;
  margin-top: 20px;
}

.movie-details .title {
  font-size: 24px;
  margin-bottom: 10px;
}
</style>

