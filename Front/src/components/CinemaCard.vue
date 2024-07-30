<template>
  <div class="event-card">
    <div :style="{ backgroundImage: 'url(' + (event.imagenurl || 'https://via.placeholder.com/300') + ')' }" class="card">
      <div class="card-content">
        <h2 class="is-size-4 has-text-weight-bold">{{ event.título }}</h2>
        <button class="buy-ticket-button" @click="goToDetails">Comprar Boleto</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToDetails() {
      const movieId = this.event.id_pelicula || this.event.id_cartelera;

      console.log('ID de la película:', movieId); // Verifica el ID de la película
      console.log('Evento:', this.event);

      if (!movieId) {
        console.error('ID no disponible para la navegación.');
        return;
      }
      
      // Si hay un token, permitir la navegación a los detalles de la película
      this.$router.push({ name: 'MovieDetails', params: { id: movieId } }).catch(error => {
        console.error('Redirection to MovieDetails failed:', error);
      });
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
  }
};
</script>

<style lang="scss" scoped>
.event-card {
  width: 100%;
  padding-bottom: 100%;
  position: relative;
}

.card {
  height: 100%;
  background-position: center;
  background-size: cover;
  text-align: center;
  position: absolute;
  width: 100%;
  transition: transform 0.3s;
  display: flex;
  align-items: flex-end;
  
  &:hover {
    transform: scale(1.05);
  }

  .card-content {
    position: relative;
    width: 100%;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 10px;
    opacity: 0;
    transition: opacity 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    &:hover {
      opacity: 1;
    }
    
    .buy-ticket-button {
      margin-top: 10px;
      padding: 10px 20px;
      background-color: #ff6347;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #ff4500;
      }
    }
  }
}

h2 {
  margin: 0;
}
</style>



