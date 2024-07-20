<template>
  <div class="search-modal">
    <h2 class="modal-title">Buscar película</h2>
    <input type="text" v-model="searchQuery" @input="searchMovie" placeholder="Buscar película..." />
    <div v-if="movie">
      <h3>{{ movie.title }}</h3>
      <img v-if="movie.imageUrl" :src="movie.imageUrl" alt="Poster de la película" class="movie-image" />
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

        <button type="submit">Guardar Película</button>
      </form>
    </div>
  </div>
</template>

<script>
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
    submitForm() {
      this.$emit('add-movie', this.movie);
    },
  },
};
</script>

<style scoped>
.search-modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  margin: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-title {
  margin-bottom: 20px;
  color: #333;
}

.search-modal input,
.search-modal textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-modal label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.search-modal h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.movie-image {
  width: 100%;
  height: auto;
  margin: 10px 0;
}

.search-modal button {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
