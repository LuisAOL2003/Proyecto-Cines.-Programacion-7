<template>
    <div class="ticket-details-container">
      <div class="ticket-type-section">
        <h3 class="section-title">Tipos de tickets</h3>
        <div class="ticket-type">
          <div class="ticket-info">
            <h3>Infantil</h3>
            <p>Precio: $XX</p>
          </div>
          <div class="quantity-controls">
            <button>-</button>
            <span>0</span>
            <button>+</button>
          </div>
        </div>
        <div class="ticket-type">
          <div class="ticket-info">
            <h3>Adulto</h3>
            <p>Precio: $XX</p>
          </div>
          <div class="quantity-controls">
            <button>-</button>
            <span>0</span>
            <button>+</button>
          </div>
        </div>
        <div class="ticket-type">
          <div class="ticket-info">
            <h3>Adulto Mayor</h3>
            <p>Precio: $XX</p>
          </div>
          <div class="quantity-controls">
            <button>-</button>
            <span>0</span>
            <button>+</button>
          </div>
        </div>
      </div>
      <div class="movie-details-section">
        <h3 class="section-title">Detalles de la Película</h3>
        <div class="movie-image">
          <img src="../assets/cine.png" alt="Imagen de la Película">
        </div>
        <div class="movie-info">
          <p><strong>Título:</strong> Nombre de la Película</p>
          <p><strong>Sala:</strong> Sala 1</p>
          <p><strong>Hora de inicio:</strong> 7:00 PM</p>
          <p><strong>Hora de fin:</strong> 9:00 PM</p>
          <p><strong>Fecha:</strong> 01/01/2022</p>
          <p><strong>Asientos:</strong> A1, A2</p>
          <p><strong>Usuario:</strong> Nombre del Usuario</p>
          <p><strong>Total de la compra:</strong> $XXX</p>
        </div>
        <div class="buy-tickets-container">
          <button class="buy-tickets-button">Comprar Boletos</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TicketDetails',
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
    box-sizing: border-box; /* Incluye padding y border en el cálculo del ancho y altura */
  }
  
  .movie-details-section {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 48%;
    margin-bottom: 20px;
    box-sizing: border-box; /* Incluye padding y border en el cálculo del ancho y altura */
  }
  
  .section-title {
    text-align: center;
    font-weight: bold;
    font-size: 24px; /* Ajusta el tamaño del título según sea necesario */
    margin-bottom: 20px; /* Espacio adicional para separar el título del contenido */
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
  