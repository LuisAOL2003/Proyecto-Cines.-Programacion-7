<template> 
    <div class="container"> 
      <NavAdmin /> 
      <h2>ACA ESTAN LOS ASIENTOS PARA LA PELICULA : PLACEHOLDER</h2> 
      <Cinema 
        :leftInitial="0" 
        :leftColumns="4" 
        :middleInitial="4" 
        :middleColumns="12" 
        :rightInitial="0" 
        :rightColumns="4" 
        :totalRows="20" 
        :maxSeats="50" 
        :selectedRef="selectedRef" 
        :ocupados="ocupados" 
        @update:selectedRef="updateSelectedRef" 
      /> 
      <Footer /> 
    </div> 
  </template> 
   
  <script> 
  import NavAdmin from '../components/partials/NavAdmin.vue'; 
  import Footer from '../components/partials/Footer.vue'; 
  import Cinema from '../components/Cinema.vue'; 
   
  export default { 
    name: 'Seats', 
    components: { 
      NavAdmin, 
      Footer, 
      Cinema, 
    }, 
    data() { 
      return { 
        selectedRef: [], 
        ocupados: [], // Asientos ocupados pueden ser definidos aquí o pasados como prop 
      }; 
    }, 
    methods: { 
      updateSelectedRef(selected) { 
        this.selectedRef = selected; 
      }, 
    }, 
  }; 
  </script> 
   
  <style scoped> 
  .container { 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    padding: 20px; 
  } 
  </style>