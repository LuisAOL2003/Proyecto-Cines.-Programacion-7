<template>
    <div class="search-modal">
      <input type="text" v-model="searchQuery" @input="searchMovie" placeholder="Buscar película..." />
      <div v-if="movie">
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.description }}</p>
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
            const response = await fetch(`https://api.example.com/movies?search=${this.searchQuery}`);
            const data = await response.json();
            this.movie = data.length ? data[0] : null;
          } catch (error) {
            console.error('Error fetching movie data:', error);
          }
        } else {
          this.movie = null;
        }
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
  
  .search-modal input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .search-modal h3 {
    margin: 0 0 10px 0;
    color: #333;
  }
  
  .search-modal p {
    margin: 0;
    color: #666;
  }
  </style>
  