<template> 
    <div class="cartCinema mb-10"> 
      <ul class="cartCinema-showcase"> 
        <li> 
          <div class="seat"></div> 
          <small>Disponible</small> 
        </li> 
        <li> 
          <div class="seat selected"></div> 
          <small>Seleccionada</small> 
        </li> 
        <li> 
          <div class="seat occupied"></div> 
          <small>Ocupada</small> 
        </li> 
      </ul> 
   
      <div class="cartCinema-container" @click="onClick"> 
        <!-- Cabeceras de Asientos --> 
        <div class="seat-headers"> 
          <div class="seat-header-empty"></div> <!-- Empty corner for alignment --> 
          <div v-for="num in leftColumns" :key="'header-left-' + num" class="seat-header">{{ num }}</div> 
          <div v-for="num in middleColumns" :key="'header-middle-' + num" class="seat-header">{{ num + leftColumns }}</div> 
          <div v-for="num in rightColumns" :key="'header-right-' + num" class="seat-header">{{ num + leftColumns + middleColumns }}</div> 
        </div> 
   
        <!-- Fila de Asientos --> 
        <div v-for="i in totalRows" :key="i" class="seat-row"> 
          <div class="seat-label">{{ numToChar(i) }}</div> <!-- Etiqueta de la Fila --> 
   
          <!-- Asientos --> 
          <div class="cartCinema-container_seatsRow"> 
            <div v-for="j in leftColumns" :key="'left-' + j" 
                 :class="['seat', (j <= leftColumns && leftInitial <= i) ? ocupados.includes(`${numToChar(i)}${j}`) ? 'occupied' : '' : 'invisible']" 
                 :title="`${numToChar(i)}${j}`"> 
            </div> 
            <div v-for="j in middleColumns" :key="'middle-' + j" 
                 :class="['seat', (j <= middleColumns && middleInitial <= i) ? ocupados.includes(`${numToChar(i)}${j + leftColumns}`) ? 'occupied' : '' : 'invisible']" 
                 :title="`${numToChar(i)}${j + leftColumns}`"> 
            </div> 
            <div v-for="j in rightColumns" :key="'right-' + j" 
                 :class="['seat', (j <= rightColumns && rightInitial <= i) ? ocupados.includes(`${numToChar(i)}${j + leftColumns + middleColumns}`) ? 'occupied' : '' : 'invisible']" 
                 :title="`${numToChar(i)}${j + leftColumns + middleColumns}`"> 
            </div> 
          </div> 
        </div> 
      </div> 
   
      <p class="flex justify-center px-5 uppercase font-bold w-full"> 
        Butacas seleccionadas: {{ selected.join(', ') }} 
      </p> 
    </div> 
  </template> 
   
  <script> 
  export default { 
    name: 'Cinema', 
    props: { 
      leftInitial: Number, 
      leftColumns: Number, 
      middleInitial: Number, 
      middleColumns: Number, 
      rightInitial: Number, 
      rightColumns: Number, 
      totalRows: { 
        type: Number, 
        default: 20 
      }, 
      maxSeats: Number, 
      ocupados: Array, 
      selectedRef: Array, 
    }, 
    data() { 
      return { 
        selected: this.selectedRef || [], 
      }; 
    }, 
    methods: { 
      onClick(e) { 
        if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) { 
          if (!e.target.classList.contains('selected')) { 
            if (this.selected.length === this.maxSeats) { 
              this.showToast('Ya elegiste todos los asientos!'); 
            } else { 
              e.target.classList.add('selected'); 
              this.selected.push(e.target.title); 
            } 
          } else { 
            e.target.classList.remove('selected'); 
            const index = this.selected.indexOf(e.target.title); 
            if (index > -1) this.selected.splice(index, 1); 
          } 
          this.$emit('update:selectedRef', this.selected); 
        } 
      }, 
      showToast(message) { 
        this.$toast.open({ 
          message: message, 
          type: 'error', 
        }); 
      }, 
      numToChar(number) { 
        const code = 'A'.charCodeAt(0); 
        return String.fromCharCode(code + number - 1); 
      }, 
    }, 
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
    background: #444; 
    margin: 2px; 
    cursor: pointer; 
  } 
  .seat.selected { 
    background: #6feaf6; 
  } 
  .seat.occupied { 
    background: #fff; 
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
  </style>