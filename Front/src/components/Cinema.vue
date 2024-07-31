<template>
  <div class="cartCinema mb-10">
    <ul class="cartCinema-showcase">
      <li class="cartCinema-showcase-item">
        <div class="seat"></div>
        <small>Disponible</small>
      </li>
      <li class="cartCinema-showcase-item">
        <div class="seat selected"></div>
        <small>Seleccionada</small>
      </li>
      <li class="cartCinema-showcase-item">
        <div class="seat occupied"></div>
        <small>Ocupada</small>
      </li>
    </ul>

    <div class="cartCinema-container">
      <div class="seat-headers">
        <div class="seat-header-empty"></div>
        <div v-for="num in leftColumns" :key="'header-left-' + num" class="seat-header">{{ num }}</div>
        <div v-for="num in middleColumns" :key="'header-middle-' + num" class="seat-header">{{ num + leftColumns }}</div>
        <div v-for="num in rightColumns" :key="'header-right-' + num" class="seat-header">{{ num + leftColumns + middleColumns }}</div>
      </div>

      <div class="cartCinema-container_screen">Pantalla</div>

      <div v-for="row in totalRows" :key="'row-' + row" class="seat-row">
        <div class="seat-label">{{ numToChar(row) }}</div>
        <div class="cartCinema-container_seatsRow">
          <div
            v-for="seat in getSeatsForRow(numToChar(row))"
            :key="seat.id_asiento"
            :class="['seat', seat.disponible ? (isSelected(seat) ? 'selected' : '') : 'occupied']"
            :title="`${seat.fila}${seat.numero}`"
            @click="selectSeat(seat)"
          ></div>
        </div>
      </div>
    </div>

    <p class="flex justify-center px-5 uppercase font-bold w-full">
      Butacas seleccionadas: {{ selected.map(row=>row.label).join(', ') }}
    </p>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';

export default {
  name: 'Seats',
  props: {
    leftColumns: Number,
    middleColumns: Number,
    rightColumns: Number,
    totalRows: Number,
    seats: {
      type: Array,
      default: () => []
    },
    selectedRef: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selected: this.selectedRef || [],
    };
  },
  methods: {
    numToChar(number) {
      const code = 'A'.charCodeAt(0) - 1;
      return String.fromCharCode(code + number);
    },
    getSeatsForRow(row) {
      return this.seats.filter(seat => seat.fila === row);
    },
    selectSeat(seat) {
      if (!seat.disponible) return;

      const seatLabel = `${seat.fila}${seat.numero}`;
      const seatIndex = this.selected.indexOf(seatLabel);
      const seatId = seat.id_asiento

      if (!this.selected.find(seat=>seat.id===seatId)) {
        this.selected.push({
          label:seatLabel,
          id: seatId
        });
      } else {
        this.selected.splice(seatIndex, 1);
      }

      this.$emit('update:selectedRef', this.selected);
    },
    isSelected(seat) {
      return this.selected.find(row=>row.id===seat.id_asiento);
    },
    confirmSelection() {
      this.$emit('confirm');
      this.confirmReservation();
    },
    getUserIdFromToken() {
      const token = this.getCookie('accessToken');
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.id;
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

      const selectedSeats = this.selected.map(seat => {
        const seatDetails = this.seats.find(s => s.fila === seat.fila && s.numero === seat.numero);
        return seatDetails ? seatDetails.id_asiento : null;
      }).filter(id => id !== null);

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
          userId,
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
.cartCinema {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cartCinema-showcase {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.cartCinema-showcase-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
}
.cartCinema-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.cartCinema-container_screen {
  width: 100%;
  height: 40px;
  background: #000;
  color: white;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  margin-bottom: 10px;
}
.seat-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.cartCinema-container_seatsRow {
  display: flex;
  flex-direction: row;
}
.seat {
  width: 30px;
  height: 30px;
  margin: 2px;
  cursor: pointer;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 5px;
  background-image: url('@/assets/butaca-de-cine disponibles.png');
}
.seat.selected {
  background-image: url('@/assets/butaca-de-cine seleccionada.png');
}
.seat.occupied {
  background-image: url('@/assets/butaca-de-cine ocupada.png');
}
.seat.invisible {
  visibility: hidden;
}
.seat-headers {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  align-items: center;
}
.seat-header, .seat-header-empty {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #444;
}
.seat-label {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #444;
  margin-right: 5px;
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
