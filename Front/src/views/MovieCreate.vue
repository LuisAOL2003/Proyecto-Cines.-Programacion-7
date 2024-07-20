<template>
  <div>
    <SearchModal
      :isActive="isModalActive"
      @close="isModalActive = false"
      @add-movie="handleAddMovie"
    />
    <div v-if="addedMovie">
      <h2 class="title">{{ addedMovie.title }}</h2>
      <p>{{ addedMovie.description }}</p>
      <p><strong>Duración:</strong> {{ addedMovie.duration }}</p>
      <p><strong>Clasificación:</strong> {{ addedMovie.classification }}</p>
      <p><strong>Género:</strong> {{ addedMovie.genre }}</p>
      <p><strong>Fecha de Estreno:</strong> {{ addedMovie.releaseDate }}</p>
      <p><strong>Idioma Original:</strong> {{ addedMovie.originalLanguage }}</p>
      <img :src="addedMovie.imageUrl" alt="Movie Poster" v-if="addedMovie.imageUrl" />
      <!-- Agregar más campos según la estructura de tu API -->
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
/* Aquí puedes agregar estilos adicionales si es necesario */
</style>
