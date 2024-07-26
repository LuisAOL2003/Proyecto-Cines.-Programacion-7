<template>
  <div class="search-modal">
    <h2 class="title is-3">Buscar película</h2>
    <input class="input is-dark" type="text" v-model="searchQuery" @input="searchMovie" placeholder="Buscar película..." />
    <div v-if="movie">
      <h3 class="title is-4">{{ movie.title }}</h3>
      <figure class="image is-4by3">
        <img :src="movie.imageUrl" :alt="movie.title" class="movie-image" />
      </figure>
      <form @submit.prevent="submitForm">
        <div class="field">
          <label class="label" for="title">Título</label>
          <div class="control">
            <input class="input is-dark" type="text" id="title" v-model="movie.title" />
          </div>
        </div>

        <div class="field">
          <label class="label" for="description">Descripción</label>
          <div class="control">
            <textarea class="textarea is-dark" id="description" v-model="movie.description"></textarea>
          </div>
        </div>

        <div class="field">
          <label class="label" for="duration">Duración</label>
          <div class="control">
            <input class="input is-dark" type="text" id="duration" v-model="movie.duration" />
          </div>
        </div>

        <div class="field">
          <label class="label" for="classification">Clasificación</label>
          <div class="control">
            <input class="input is-dark" type="text" id="classification" v-model="movie.classification" />
          </div>
        </div>

        <div class="field">
          <label class="label" for="genre">Género</label>
          <div class="control">
            <input class="input is-dark" type="text" id="genre" v-model="movie.genre" />
          </div>
        </div>

        <div class="field">
          <label class="label" for="releaseDate">Fecha de Estreno</label>
          <div class="control">
            <input class="input is-dark" type="text" id="releaseDate" v-model="movie.releaseDate" />
          </div>
        </div>

        <div class="field">
          <label class="label" for="originalLanguage">Idioma Original</label>
          <div class="control">
            <input class="input is-dark" type="text" id="originalLanguage" v-model="movie.originalLanguage" />
          </div>
        </div>

        <div class="button-container">
          <button class="button is-dark" type="submit">Guardar Película</button>
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
  max-width: 700px;
  margin: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 50px; /* Ajustar este valor para mover el contenido hacia arriba */
}

.search-modal .title {
  color: white;
  text-align: center;
}

.input.is-dark,
.textarea.is-dark {
  background-color: #3a3a3a;
  border: 1px solid #4a4a4a;
  color: white;
}

.input.is-dark::placeholder,
.textarea.is-dark::placeholder {
  color: #a0a0a0;
}

.label {
  color: #a0a0a0;
}

.button.is-dark {
  background-color: #4a4a4a;
  border: none;
  color: white;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.movie-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>



