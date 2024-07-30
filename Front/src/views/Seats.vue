<template>
  <div class="container">
    <h2>ACA ESTAN LOS ASIENTOS PARA LA PELICULA: {{ movieTitle }}</h2>
    <Cinema
      :leftInitial="0"
      :leftColumns="4"
      :middleInitial="4"
      :middleColumns="12"
      :rightInitial="0"
      :rightColumns="4"
      :totalRows="10"
      :maxSeats="50"
      :selectedRef="selectedRef"
      :ocupados="ocupados"
      :seats="seats"
      @update:selectedRef="updateSelectedRef"
    />
    <button class="confirm-button" @click="confirmReservation">Confirmar Reserva</button>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';
import Cinema from '../components/Cinema.vue';

export default {
  name: 'Seats',
  components: {
    Cinema,
  },
  data() {
    return {
      selectedRef: [], // Cambia esto para almacenar los valores de fila y número de los asientos seleccionados
      ocupados: [],
      movieTitle: 'Error al cargar el título',
      seats: []  // Inicializar seats como un array vacío
    };
  },
  async created() {
    try {
      const idHorario = this.$route.params.id_horario;
      console.log('ID de horario:', idHorario);

      if (!idHorario) {
        throw new Error('ID de horario no está disponible.');
      }

      // Obtener la información del horario de la película
      const scheduleResponse = await fetch(`http://localhost:3000/api/schedules/${idHorario}`);
      if (!scheduleResponse.ok) {
        throw new Error('Error al obtener los detalles del horario.');
      }

      const schedule = await scheduleResponse.json();
      console.log('Información del horario:', schedule);

      // Obtener el título de la película usando el ID_pelicula
      const movieResponse = await fetch(`http://localhost:3000/api/movies/${schedule.id_pelicula}`);
      if (!movieResponse.ok) {
        throw new Error('Error al obtener el título de la película.');
      }

      const movie = await movieResponse.json();
      console.log('Información de la película:', movie);

      if (movie.título) {
        this.movieTitle = movie.título;
      } else {
        this.movieTitle = 'Título no disponible';
        throw new Error('Título de la película no disponible en los detalles del horario.');
      }

      // Obtener los asientos disponibles para un horario específico
      const seatsResponse = await fetch(`http://localhost:3000/api/seats/${schedule.id_sala}/${schedule.id_pelicula}`);
      if (!seatsResponse.ok) {
        throw new Error('Error al obtener los asientos.');
      }

      const seats = await seatsResponse.json();
      this.seats = seats;  // Asigna los datos obtenidos a this.seats
      this.ocupados = seats.filter(seat => !seat.disponible).map(seat => seat.id_asiento);

      console.log('Asientos cargados:', seats);

    } catch (error) {
      console.error('Error en Seats.vue:', error.message);
      this.movieTitle = 'Error al cargar el título';
    }
  },
  methods: {
    updateSelectedRef(selected) {
      this.selectedRef = selected; // Asegúrate de que selectedRef contenga los valores correctos
      console.log(this.selectedRef);
    },
    getUserIdFromToken() {
      const token = this.getCookie('accessToken');
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.id;  // Ajusta esto según la estructura de tu token
      }
      return null;
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
    async confirmReservation() {
      const userId = this.getUserIdFromToken();
      if (!userId) {
        alert('No estás autenticado.');
        return;
      }

      // Verifica los datos de los asientos seleccionados
      console.log('Asientos seleccionados:', this.selectedRef);

      // Convertir los asientos seleccionados a IDs
      const selectedSeats = this.selectedRef.map(seat => {
        console.log('Buscando asiento:', seat);
        // Encuentra el ID del asiento basado en la fila y número seleccionados
        const seatDetails = this.seats.find(s => s.fila === seat.fila && s.numero === seat.numero);
        console.log('Asiento encontrado:', seatDetails);
        return seatDetails ? seatDetails.id_asiento : null;
      }).filter(id => id !== null);

      console.log('IDs de asientos seleccionados:', selectedSeats);

      if (selectedSeats.length === 0) {
        alert('No se encontraron asientos válidos.');
        return;
      }

      const response = await fetch(`http://localhost:3000/api/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_usuario: userId,  // Asegúrate de que el campo se llama 'id_usuario' en el backend
          id_asientos: selectedSeats,
          id_horario: this.$route.params.id_horario
        }),
      });

      if (response.ok) {
        alert('Reserva confirmada exitosamente.');
      } else {
        alert('Error al confirmar la reserva.');
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}
.confirm-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.confirm-button:hover {
  background-color: #e5533c;
}
</style>
