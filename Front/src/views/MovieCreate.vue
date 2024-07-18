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
        <p><strong>Director:</strong> {{ addedMovie.director }}</p>
        <p><strong>Año:</strong> {{ addedMovie.year }}</p>
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
      handleAddMovie(movie) {
        this.addedMovie = movie;
        this.isModalActive = false;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Aquí puedes agregar estilos adicionales si es necesario */
  </style>