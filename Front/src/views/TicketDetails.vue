<template>
  <div class="ticket-details-container">
    <div class="ticket-type-section">
      <h3 class="section-title">Tipos de tickets</h3>
      <div class="ticket-type" v-for="(type, index) in ticketTypes" :key="index">
        <div class="ticket-info">
          <h3>{{ type.name }}</h3>
          <p>Precio: ${{ type.price }}</p>
        </div>
        <div class="quantity-controls">
          <button @click="updateQuantity(type.name, -1)">-</button>
          <span>{{ type.quantity }}</span>
          <button @click="updateQuantity(type.name, 1)">+</button>
        </div>
      </div>
    </div>
    <div class="movie-details-section">
      <h3 class="section-title">Detalles del Boleto</h3>
      <div class="movie-image">
        <img :src="details.imagen_pelicula || movieImage" alt="Imagen de la Película">
      </div>
      <div class="movie-info">
        <p><strong>Título:</strong> {{ details.titulo_pelicula }}</p>
        <p><strong>Sala:</strong> {{ details.nombre_sala }}</p>
        <p><strong>Hora de inicio:</strong> {{ details.horainicio }}</p>
        <p><strong>Hora de fin:</strong> {{ details.horafin }}</p>
        <p><strong>Fecha:</strong> {{ new Date(details.fecha_reserva).toLocaleDateString() }}</p>
        <p><strong>Asientos:</strong> {{ selectedSeats.map(seat => seat.label).join(', ') }}</p>
        <p><strong>Usuario:</strong> {{ details.usuario_email }}</p>
        <p><strong>Total de la compra:</strong> ${{ total }}</p>
      </div>
      <div class="buy-tickets-container">
        <button class="buy-tickets-button" @click="buyTickets">Comprar Boletos</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicketDetails',
  data() {
    return {
      details: {},
      ticketTypes: [
        { name: 'Infantil', price: 5, quantity: 0 },
        { name: 'Adulto', price: 10, quantity: 0 },
        { name: 'Adulto Mayor', price: 7, quantity: 0 }
      ],
      selectedSeats: this.$route.params.selectedSeats || []
    };
  },
  computed: {
    total() {
      return this.ticketTypes.reduce((sum, type) => sum + (type.price * type.quantity), 0);
    }
  },
  methods: {
    async fetchDetails() {
      try {
        const response = await fetch(`http://localhost:3000/api/reservations/details/${this.$route.params.id_reserva}`);
        const data = await response.json();
        console.log('Detalles del ticket:', data); // Verificar detalles del ticket
        this.details = {
          ...data,
          asientos: data.asientos || []
        };

        // Aquí, se deben convertir los IDs de los asientos a objetos con una propiedad 'label'
        this.selectedSeats = data.asientos.map(id => ({
          id,
          label: `Asiento ${id}` // Ajusta esto según cómo deseas mostrar los asientos
        }));
        
        console.log('Asientos seleccionados:', this.selectedSeats); // Verificar asientos seleccionados

      } catch (error) {
        console.error('Error fetching ticket details:', error);
      }
    },
    updateQuantity(type, change) {
      const ticketType = this.ticketTypes.find(t => t.name === type);
      if (ticketType) {
        ticketType.quantity = Math.max(ticketType.quantity + change, 0);
      }
    },
    async buyTickets() {
      if (this.total === 0) {
        alert('No has seleccionado boletos.');
        return;
      }

      const selectedTickets = this.ticketTypes.flatMap(type =>
        Array(type.quantity).fill(type.name)
      );

      try {
        const response = await fetch(`http://localhost:3000/api/reservations/details/${this.$route.params.id_reserva}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            movie_id: this.details.id_pelicula,
            schedule_id: this.details.id_horario,
            tickets: selectedTickets
          })
        });

        if (response.ok) {
          alert('Compra realizada exitosamente.');
          this.$router.push('/confirmation');
        } else {
          alert('Error al realizar la compra.');
        }
      } catch (error) {
        console.error('Error en la compra de boletos:', error);
      }
    }
  },
  created() {
    this.fetchDetails();
  }
};
</script>


<style scoped>
.ticket-details-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
  background-color: #f0f0f0;
}

.ticket-type-section {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 48%;
  margin-bottom: 20px;
  box-sizing: border-box;
}

.movie-details-section {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 48%;
  margin-bottom: 20px;
  box-sizing: border-box;
}

.section-title {
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
}

.ticket-type {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.ticket-info {
  display: flex;
  flex-direction: column;
}

.ticket-info h3,
.ticket-info p {
  margin: 0;
}

.ticket-type h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.ticket-type p {
  font-size: 16px;
}

.quantity-controls {
  display: flex;
  align-items: center;
}

.quantity-controls button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 4px;
}

.quantity-controls span {
  font-size: 16px;
  margin: 0 10px;
}

.buy-tickets-button {
  padding: 10px 20px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.buy-tickets-button:hover {
  background-color: #e5533c;
}

/* Estilo adicional para asegurar que el texto sea negro */
.ticket-type-section,
.movie-details-section {
  color: black;
}

/* Centrar el título y poner en negrita */
.movie-details-section h3 {
  text-align: center;
  font-weight: bold;
}

/* Poner en negrita las palabras Título, Sala, etc. */
.movie-details-section p strong {
  font-weight: bold;
}

/* Estilo para la imagen de la película */
.movie-image {
  text-align: center;
  margin-bottom: 20px;
}

.movie-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Centrar el botón de comprar boletos */
.buy-tickets-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
